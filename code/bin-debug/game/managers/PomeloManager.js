var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-07-02 10:10:54
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-10 11:07:08
 * @Description: 服务器通讯类
 */
var game;
(function (game) {
    var PomeloManager = (function () {
        function PomeloManager() {
            this.state = PomeloStateEnum.INIT;
            this.pomeloFuncmap = new HashMap();
            this.lockReq = false;
            this.lockResp = false;
            this.ping = 0;
            if (PomeloManager._instance) {
                throw new Error("PomeloManager使用单例");
            }
        }
        Object.defineProperty(PomeloManager, "instance", {
            get: function () {
                if (!PomeloManager._instance) {
                    PomeloManager._instance = new PomeloManager();
                    PomeloManager._instance.pomelo = new PomeloForEgret.Pomelo();
                    PomeloManager._instance.listenOnAll();
                    Global.pomelo = PomeloManager._instance;
                    CF.aE(PomeloForEgret.Pomelo.EVENT_CLOSE, PomeloManager._instance.onClose, this);
                    CF.aE("disconnect", PomeloManager._instance.reConnect, this);
                    CF.aE(PomeloForEgret.Pomelo.EVENT_IO_ERROR, PomeloManager._instance.onError, this);
                }
                return PomeloManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        PomeloManager.prototype.onClose = function () {
            PomeloManager._instance.clearRequestOutTime();
            if (Global.runBack) {
                // console.log("type5 dianxian");
                // Global.alertMediator.addAlert("网络错误请重新连接", () => {
                PomeloManager._instance.reConnect();
                // }, null, true);
            }
            // Global.pomelo.state = PomeloStateEnum.DISCONNECT;
        };
        PomeloManager.prototype.clearLastLock = function () {
            clearTimeout(this.lastLockTimeout);
            this.lastRequestHandler = null;
        };
        PomeloManager.prototype.startRequestOutTime = function () {
            if (this.requestTimeout) {
                return;
            }
            this.requestTimeout = setTimeout(function () {
                Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(68), function () {
                    console.log("type4 dianxian");
                    PomeloManager._instance.reConnect();
                }, null, true);
            }, 8000);
        };
        PomeloManager.prototype.clearRequestOutTime = function () {
            clearTimeout(this.requestTimeout);
            this.requestTimeout = null;
        };
        /**
         * 发送请求
         * @param  {string} roteName
         * @param  {any} param
         */
        PomeloManager.prototype.request = function (roteName, param, needLock) {
            var _this = this;
            if (needLock === void 0) { needLock = true; }
            return new Promise(function (resolve, reject) {
                if (!param) {
                    param = {};
                }
                if (_this.lastRequestHandler == roteName && needLock) {
                    resolve({ error: { code: ErrorCode.BUSY_REQUEST, msg: TextUtils.instance.getCurrentTextById(115) } });
                    return;
                }
                else {
                    _this.lastRequestHandler = null;
                }
                //过滤cbet
                if (roteName.indexOf("c_bet") < 0) {
                    _this.lastRequestHandler = roteName;
                    _this.lastLockTimeout = setTimeout(function () {
                        _this.lastRequestHandler = null;
                    }, 1000);
                }
                LogUtils.logD(roteName + "请求参数 %j=", param);
                param.token = Global.playerProxy.token;
                if (Global.playerProxy.gametoken) {
                    param.sdkToken = Global.playerProxy.gametoken;
                }
                _this.startRequestOutTime();
                _this.pomelo.request(roteName, param, function (resp) {
                    _this.clearRequestOutTime();
                    LogUtils.logD(roteName + "反悔 %j=", resp);
                    if (resp && resp.code === 500 && roteName != ServerPostPath.game_roomHandler_c_queryRoomInfo) {
                        if (roteName == ServerPostPath.game_mjHandler_c_pingGame) {
                            return;
                        }
                        if (roteName == ServerPostPath.game_roomHandler_c_quitRoom) {
                            return;
                        }
                        NetErrorTips.instance.show(TextUtils.instance.getCurrentTextById(66));
                        return;
                    }
                    if (resp.error && resp.error.code && resp.error.code == -107) {
                        Global.alertMediator.addAlert(resp.error.msg, function () {
                            FrameUtils.flushWindow();
                            // resolve(null);
                        }, null, true);
                    }
                    if (roteName == ServerPostPath.hall_sceneHandler_c_enter) {
                        if (resp.error && resp.error.code != 0 && resp.error.code != -213) {
                            if (resp.error.code == -19 || resp.error.code == -22) {
                                Global.alertMediator.addAlert(resp.error.msg, function () {
                                }, null, true);
                                resolve(resp);
                                return;
                            }
                            if (resp.error.code == -9) {
                                resolve(resp);
                                return;
                            }
                            if (resp.error.code == -219) {
                                resolve(resp);
                                return;
                            }
                            if (resp.error.code == -101) {
                                Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(65), function () {
                                    // FrameUtils.flushWindow();
                                    resolve(null);
                                }, null, true);
                                return;
                            }
                            Global.alertMediator.addAlert(resp.error.msg, function () {
                                // FrameUtils.flushWindow();
                                resolve(null);
                            }, null, true);
                            return;
                        }
                    }
                    if (resp.data) {
                        if (resp.data.serverTime) {
                            game.DateTimeManager.instance.updateServerTime(resp.data.serverTime);
                        }
                        resolve(resp.data);
                    }
                    else if (resp.error) {
                        resolve(resp);
                    }
                    else {
                        resolve({ error: { code: 0 } });
                    }
                });
            });
        };
        PomeloManager.prototype.requestByCallback = function (roteName, param, callback) {
            var _this = this;
            if (!param) {
                param = {};
            }
            if (this.lastRequestHandler == roteName) {
                return;
            }
            this.lastRequestHandler = roteName;
            setTimeout(function () {
                _this.lastRequestHandler = null;
            }, 500);
            LogUtils.logD(roteName + "请求参数 %j=", param);
            param.token = Global.playerProxy.token;
            if (Global.playerProxy.gametoken) {
                param.sdkToken = Global.playerProxy.gametoken;
            }
            this.startRequestOutTime();
            this.pomelo.request(roteName, param, function (resp) {
                _this.clearRequestOutTime();
                LogUtils.logD(roteName + "反悔 %j=", _.clone(resp));
                if (resp && resp.code === 500 && (roteName != ServerPostPath.game_roomHandler_c_queryRoomInfo)) {
                    if (roteName == ServerPostPath.game_roomHandler_c_quitRoom) {
                        return;
                    }
                    if (roteName == ServerPostPath.game_mjHandler_c_pingGame) {
                        return;
                    }
                    NetErrorTips.instance.show(TextUtils.instance.getCurrentTextById(66));
                    return;
                }
                if (resp.error && resp.error.code && resp.error.code == -107) {
                    Global.alertMediator.addAlert(resp.error.msg, function () {
                        FrameUtils.flushWindow();
                        // resolve(null);
                    }, null, true);
                }
                if (roteName == ServerPostPath.hall_sceneHandler_c_enter) {
                    if (resp.error && resp.error.code != 0 && resp.error.code != -213) {
                        Global.alertMediator.addAlert(resp.error.msg, function () {
                            // FrameUtils.flushWindow();
                            callback && callback(null);
                        }, null, true);
                        return;
                    }
                }
                if (resp.data) {
                    callback && callback(resp.data);
                }
                else if (resp.error) {
                    callback && callback(resp.error);
                }
                else {
                    callback && callback({ error: { code: 0 } });
                }
            });
        };
        PomeloManager.prototype.listenOnAll = function () {
            var allNotify = _.extendOwn(ServerNotify);
            for (var key in allNotify) {
                this.pomelo.on(allNotify[key], function (event, resp) {
                    var data = JSON.stringify(resp);
                    if (event != "s_broadcast") {
                        LogUtils.logD(Date.now() + "," + event + "收到推送:  %j=", JSON.parse(data));
                    }
                    if (event == ServerNotify.s_robLogin) {
                        game.NetReconnect.instance.active = false;
                        NetErrorTips.instance.show(TextUtils.instance.getCurrentTextById(67));
                        return;
                    }
                    //提示 以小博大 smart
                    if (event == ServerNotify.s_overloadBackInfo) {
                        var initGold = resp.initGold;
                        var curGainGold = resp.curGainGold;
                        var overloadBackGold = resp.overloadBackGold;
                        var text = "\u672C\u5C40\u643A\u5E26\u91D1\u989D\u4E3A" + initGold + "\uFF0C\u5F53\u524D\u8D62\u53D6" + curGainGold + "\uFF0C\u4EE5\u5C0F\u535A\u5927\u9000\u8FD8" + overloadBackGold;
                        Global.alertMediator.addColorAller({ "initGold": initGold, "curGainGold": curGainGold, "overloadBackGold": overloadBackGold }, true, null, null, true);
                        return;
                    }
                    /**退税 smart */
                    if (event == ServerNotify.s_leaveBackGold) {
                        var types = _.uniq(resp.types);
                        var gaingold = resp.gainGold;
                        if (Global.playerProxy.playerData)
                            Global.playerProxy.playerData.gold = resp["ownGold"];
                        CF.dP(ServerNotify.s_payGold, { "ownGold": resp["ownGold"] });
                        var txtVal = "";
                        for (var i = 0; i < types.length; ++i) {
                            var temptVal = Owen.UtilsString.getType(Number(types[i]));
                            var pot = "";
                            if (i > 0) {
                                pot = "、";
                            }
                            var realVal = pot + temptVal;
                            txtVal += realVal;
                        }
                        var showTxt = "历史对局玩家未胡牌，" + txtVal + "金额[" + gaingold + "]元已自动到账!";
                        Global.alertMediator.addAlert(showTxt, null, null, true);
                    }
                    if (event == ServerNotify.s_pushRaceStartCountDown) {
                        TipsCompoment.instance.show(resp["raceName"] + "还有" + resp["time"] + "分钟开始,超时将自动放弃哦~");
                        return;
                    }
                    if (event == ServerNotify.s_kickPlayer) {
                        Global.alertMediator.addAlert(resp.reason, function () {
                            FrameUtils.flushWindow();
                        }, null, true);
                        return;
                    }
                    if (event == ServerNotify.s_roomInfo) {
                        var players1 = Global.gameProxy.getAllPlayers();
                        var players2 = Global.roomProxy.getAllPlayers();
                        var players3 = resp.players;
                        if (players3 && _.keys(players3).length > 0) {
                            if (players1) {
                                for (var key_1 in players1) {
                                    players1[key_1].gold = players3[key_1].gold;
                                }
                            }
                            if (players2) {
                                for (var key_2 in players2) {
                                    players2[key_2].gold = players3[key_2].gold;
                                }
                            }
                        }
                    }
                    if (event == ServerNotify.s_payGold) {
                        if (resp.ownGold != null && resp.ownGold != undefined) {
                            LogUtils.logD("修改玩家金币:" + resp.ownGold);
                            Global.playerProxy.playerData.gold = resp.ownGold;
                            CF.dP(event, resp);
                            return;
                        }
                    }
                    // if (this.lockReq) {
                    // 	return;
                    // }
                    CF.dP(event, resp);
                });
            }
        };
        PomeloManager.prototype.listenOn = function (funcName, callback) {
            this.pomelo.on(funcName, function (resp) {
            });
        };
        /**
         * 取消监听
         * @param  {string} funcName
         */
        PomeloManager.prototype.listenOff = function (funcName) {
            this.pomelo.off(funcName, null);
        };
        /**
         * 请求服务器，无返回
         * @param  {string} roteName
         * @param  {any} param
         * @param  {boolean} isShow?
         */
        PomeloManager.prototype.notify = function (roteName, param, isShow) {
            // if (!isShow) {
            // 	Global.showWaritPanel();
            // }
            this.pomelo.notify(roteName, param);
        };
        /**
         * 初始化服务器
         * @param  {} host
         * @param  {} port
         */
        PomeloManager.prototype.initServer = function (host, port) {
            var _this = this;
            host = host; //ServerConfig.PATH_CONFIG.socket_path;
            port = port;
            return new Promise(function (resolve, reject) {
                _this.pomelo.init({
                    host: host,
                    port: port,
                    log: true
                }, function (socket) {
                    if (socket.code == 200) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            });
        };
        PomeloManager.prototype.disConnect = function () {
            console.log("type1 dianxian");
            if (Global.pomelo.state != PomeloStateEnum.DISCONNECT) {
                Global.pomelo.state = PomeloStateEnum.DISCONNECT;
                this.pomelo.disconnect();
                this.clearRequestOutTime();
                this.reConnect();
            }
        };
        PomeloManager.prototype.disConnectBySelf = function () {
            console.log("type2 dianxian");
            Global.pomelo.state = PomeloStateEnum.DISCONNECT;
            this.pomelo.disconnect();
        };
        PomeloManager.prototype.reConnect = function () {
            console.log("type6 dianxian");
            //  &&
            if (!Global.runBack && Global.pomelo.state == PomeloStateEnum.DISCONNECT) {
                game.NetReconnect.instance.show();
            }
            else {
                Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(66), function () {
                    game.NetReconnect.instance.show();
                }, null, true);
                Global.pomelo.state = PomeloStateEnum.DISCONNECT;
            }
        };
        PomeloManager.prototype.onError = function () {
            Global.pomelo.state = PomeloStateEnum.DISCONNECT;
            NetErrorTips.instance.show(TextUtils.instance.getCurrentTextById(66));
        };
        PomeloManager.prototype.disConnectAndReconnect = function () {
            console.log("type3 dianxian");
            var self = this;
            if (Global.pomelo.state != PomeloStateEnum.DISCONNECT) {
                Global.pomelo.state = PomeloStateEnum.DISCONNECT;
                this.pomelo.disconnect();
                this.clearRequestOutTime();
                setTimeout(function () {
                    self.reConnect();
                }, 200);
            }
        };
        PomeloManager.prototype.startPingTime = function () {
            var _this = this;
            if (Global.runGame) {
                this.pingGame();
            }
            else {
                this.pingHall();
            }
            setTimeout(function () {
                _this.startPingTime();
            }, 10000);
        };
        PomeloManager.prototype.pingHall = function () {
            var _this = this;
            this.lastPingTime = Date.now();
            var routeName = ServerPostPath.connector_entryHandler_c_ping;
            this.pomelo.request(routeName, {}, function (resp) {
                _this.ping = Date.now() - _this.lastPingTime;
                GameLayerManager.gameLayer().showPingTime();
            });
        };
        PomeloManager.prototype.pingGame = function () {
            var _this = this;
            this.lastPingTime = Date.now();
            var routeName = ServerPostPath.game_mjHandler_c_pingGame;
            var param = {};
            param.ping = this.ping;
            this.pomelo.request(routeName, param, function (resp) {
                _this.ping = Date.now() - _this.lastPingTime;
                GameLayerManager.gameLayer().showPingTime();
            });
        };
        /**
         * 断开的原因
         * @param  {} code
         */
        PomeloManager.prototype.sendReconnectReason = function (code) {
            this.lastPingTime = Date.now();
            var routeName = ServerPostPath.game_mjHandler_c_pingGame;
            LogUtils.logD("sendReconnectReason");
            var param = {};
            param.ping = code;
            Global.pomelo.requestByCallback(routeName, param, function () { });
        };
        return PomeloManager;
    }());
    game.PomeloManager = PomeloManager;
    __reflect(PomeloManager.prototype, "game.PomeloManager");
})(game || (game = {}));
// BILL_TYPE: {
//         TF: 0, //桌费用
//         GANG: 1, //杠牌
//         HU: 2, //胡牌
//         PEI_JIAO: 3, //陪叫
//         HUA_ZHU: 4, //花猪
//         BACK_TAX: 5, //退税
//         TRANSFER: 6, //呼叫转移
//         ROUND_SETTLEMENT: 7, //牌局结算
//         ROUND_BET: 8, //牌局投注
//         GU_ZHU_YI_ZHI_BACK: 9, //孤注一掷返还
//         SPECIAL_PATTERN_REWARD: 10, // (喜钱)当赢家牌型为特定牌型时，系统为额外为玩家加一定数量分数
//         ROUND_SETTLEMENT_BACK: 11, // 结算返还
//         SYNC: 12, // 金币同步
//         BUY_MA: 13, //买马
//         INSURANCE: 14,// 保险结算
//         CATCH_BIRD: 15,// 抓鸟
//         CATCH_CHICK: 16,// 捉鸡
//         OVERLOAD_BACK: 17,// 以小博大
//     }, 
