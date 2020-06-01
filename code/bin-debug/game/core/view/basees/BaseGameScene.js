var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
 * @Author: MC Lee
 * @Date: 2019-05-22 10:20:39
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-19 15:28:12
 * @Description: 游戏场景基本类--主要实现功能 重连 -> 退出游戏-> 重新开始
 */
var game;
(function (game) {
    var BaseGameScene = (function (_super) {
        __extends(BaseGameScene, _super);
        function BaseGameScene() {
            var _this = _super.call(this) || this;
            _this.isClubGame = false;
            _this.isLuckeyGame = false;
            return _this;
        }
        BaseGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            Global.runGame = true;
            CF.aE(ServerNotify.s_pushRaceInvite, this.s_pushRaceInvite, this);
            CF.aE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
            //解散俱乐部 smart
            CF.aE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
            // //牌桌销毁 smart
            CF.aE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
            CF.aE(ServerNotify.s_pushLuckySettlement, this.s_pushLuckySettlement, this);
        };
        BaseGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            Global.runGame = false;
            CF.rE(ServerNotify.s_pushRaceInvite, this.s_pushRaceInvite, this);
            CF.rE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
            //解散俱乐部
            CF.rE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
            // //牌桌销毁 smart
            CF.rE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
            CF.rE(ServerNotify.s_pushLuckySettlement, this.s_pushLuckySettlement, this);
        };
        BaseGameScene.prototype.s_pushLuckySettlement = function (e) {
            // let data = e.data;
            // let players = data.players;
            // let mineGold = players[(this.proxy as RoomProxy).getMineIndex()];
            // if (mineGold.ownGold) Global.playerProxy.playerData.gold = mineGold.ownGold;
            // MatchJackeyResultPanel.instance.checkGoldBySHow(mineGold.gainGold);
            // for (let index in players) {
            // 	let goldData = players[index];
            // 	let header = this.getHeaderByDirection(index) as WidgetHeader;
            // 	goldData.ownGold = goldData.ownGold;
            // 	header.updateGold(goldData.ownGold);
            // }
        };
        BaseGameScene.prototype.showLuckPoint = function () {
            this.luckyPoint = new MatchLuckeyPoint(this.proxy.roomInfo.backGold);
            this.setLuckPointPos();
            MatchManager.instance.selectGameId = this.proxy.roomInfo.codeId;
            MatchManager.instance.selectIndex = this.proxy.roomInfo.sceneIndex;
            MatchManager.instance.selectGameGold = this.proxy.roomInfo.entryFeeGold;
            GameConst.MATCH_TAB_INDEX = 2;
        };
        BaseGameScene.prototype.setLuckPointPos = function () {
        };
        /**服务器销毁新桌子*/
        BaseGameScene.prototype.s_pushDestoryTables = function (e) {
            var data = e.data;
            var tableIds = data["tableIds"];
            if (tableIds) {
                ClubManager.instance.clearTableData(tableIds);
                // //刷新列表
                for (var i = 0; i < tableIds.length; ++i) {
                    var tableID = tableIds[i];
                    if (tableID == this.proxy.roomInfo["tableId"]) {
                        CF.sN(this.CLOSE_NOTIFY);
                        ClubInnerHallScene.instance.show();
                        Toast.launch(TextUtils.instance.getCurrentTextById(24), 1);
                    }
                }
            }
        };
        BaseGameScene.prototype.dstoryClub = function (e) {
            if (this.isClubGame) {
                Toast.launch(TextUtils.instance.getCurrentTextById(56), 1);
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(SceneNotify.OPEN_CLUB_HALL);
            }
        };
        BaseGameScene.prototype.s_pushRaceInvite = function () {
            egret.setTimeout(function () {
                MatchInvitePanel.instance.show();
            }, this, 2000);
        };
        BaseGameScene.prototype.s_clubTablePlayerLeave = function (e) {
            if (this.isClubGame) {
                var data = e.data.playerInfo;
                var seatId = data.seatId;
                //smart
                if (!this.proxy.roomInfo)
                    return;
                //smart
                if (this.proxy.roomInfo.tableId == e.data.tableId && this.proxy.getMineIndex() == seatId && data.reason) {
                    Global.gameProxy.clearAllRoomInfo();
                    CF.dP(ENo.CLOSE_ALL);
                    Global.alertMediator.addAlert(data.reason, null, null, true);
                    if (data.type == 3) {
                        CF.sN(SceneNotify.OPEN_CLUB_HALL);
                    }
                    else {
                        ClubInnerHallScene.instance.show();
                    }
                }
            }
        };
        /**
         * 屏幕旋转
         * */
        BaseGameScene.prototype.oritationChange = function (e) {
            var _data = e.data;
            var currentSceneName = this.GAME_SCENE_NOTIFY;
            var sceneName;
            //横屏
            if (_data == "H") {
                sceneName = currentSceneName + "_HORIZON";
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(sceneName);
            }
            else {
                sceneName = currentSceneName.replace("_HORIZON", "");
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(sceneName);
            }
        };
        /**
         * 重连上来的回调
         * @param  {} reqData
         */
        BaseGameScene.prototype.reconnectCall = function (reqData, proxy) {
            if (proxy === void 0) { proxy = Global.roomProxy; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    Global.playerProxy.updatePlayerInfo(function () { return __awaiter(_this, void 0, void 0, function () {
                        var handler, resp, text;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (this.allowBack) {
                                        return [2 /*return*/];
                                    }
                                    // let queryHandler = ServerPostPath.hall_sceneHandler_c_queryGameState;
                                    // let resp1: any = await game.PomeloManager.instance.request(queryHandler, reqData);
                                    // if(resp1.state == 0){
                                    // 	return;
                                    // }
                                    LogUtils.logD("center_3");
                                    handler = ServerPostPath.hall_sceneHandler_c_enter;
                                    reqData['isContinue'] = false;
                                    if (proxy.roomInfo.sceneId) {
                                        reqData.sceneId = proxy.roomInfo.sceneId;
                                    }
                                    if (proxy.roomInfo['codeId']) {
                                        reqData.gameId = proxy.roomInfo['codeId'];
                                    }
                                    return [4 /*yield*/, game.PomeloManager.instance.request(handler, reqData)];
                                case 1:
                                    resp = _a.sent();
                                    LogUtils.logDJ(resp);
                                    if (!resp) {
                                        return [2 /*return*/];
                                    }
                                    if (!resp.error) {
                                        resp.error = {};
                                        resp.error.code = 0;
                                    }
                                    //游戏房间已经解散
                                    if (resp.error.code == -213) {
                                        text = TextUtils.instance.getCurrentTextById(63);
                                        Global.alertMediator.addAlert(text, null, null, true);
                                        this.backHall();
                                        //弹出提示
                                    }
                                    else if (resp.error.code == 0) {
                                        proxy.setRoomInfo(resp);
                                        this.reloadGame();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 换桌按钮
         */
        BaseGameScene.prototype.restartBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var quitResp, data, quitResp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.restartBtn.touchEnabled = false;
                            delete Global.gameProxy.lastGameConfig['roomId'];
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {}, false)];
                        case 1:
                            quitResp = _a.sent();
                            if (!quitResp) return [3 /*break*/, 3];
                            if (quitResp.gold != undefined && quitResp.gold != null) {
                                Global.playerProxy.playerData.gold = quitResp.gold;
                            }
                            if (quitResp.error && quitResp.error.code != ErrorCode.ROOM_NOT_EXIST) {
                                // Global.alertMediator.addAlert(quitResp.error.msg, null, null, true);
                                if (quitResp.error.code != ErrorCode.ROOM_PLAYING) {
                                    this.backHall();
                                }
                                this.restartBtn.touchEnabled = true;
                                return [2 /*return*/];
                            }
                            data = Global.gameProxy.lastGameConfig;
                            LogUtils.logD("center_4");
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 2:
                            quitResp1 = _a.sent();
                            if (!quitResp1) {
                                this.backHall();
                                return [2 /*return*/];
                            }
                            if (quitResp1 && quitResp1.error && quitResp1.error.code != 0) {
                                Global.alertMediator.addAlert(quitResp1.error.msg);
                                if (quitResp1.error.code == ErrorCode.GOLD_TOO_LOW) {
                                    this.backHall();
                                }
                                this.restartBtn.touchEnabled = true;
                                return [2 /*return*/];
                            }
                            else {
                                if (quitResp1 == null) {
                                    this.backHall();
                                    return [2 /*return*/];
                                }
                                this.backMatching();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            this.restartBtn.touchEnabled = true;
                            Global.alertMediator.addAlert("操作失败,请重新操作!");
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 返回按钮
         */
        BaseGameScene.prototype.backBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var text, quitResp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.allowBack) {
                                text = TextUtils.instance.getCurrentTextById(105);
                                Global.alertMediator.addAlert(text, null, null, true);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {}, false)];
                        case 1:
                            quitResp = _a.sent();
                            if (quitResp) {
                                if (quitResp.error && quitResp.error.code != ErrorCode.ROOM_NOT_EXIST) {
                                    // Global.alertMediator.addAlert(quitResp.error.msg, null, null, true);
                                    if (quitResp.error.code != ErrorCode.ROOM_PLAYING && quitResp.error.code != ErrorCode.CLUB_GAMING_PLAYING) {
                                        Global.gameProxy.clearLastGameConfig();
                                        this.backHall();
                                    }
                                    else {
                                        Global.alertMediator.addAlert(quitResp.error.msg, null, null, true);
                                    }
                                    return [2 /*return*/];
                                }
                                if (quitResp.gold != undefined && quitResp.gold != null) {
                                    Global.playerProxy.playerData.gold = quitResp.gold;
                                }
                                this.backHall();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 返回对应游戏大厅
         */
        BaseGameScene.prototype.backHall = function () {
            if (this.isClubGame) {
                ClubInnerHallScene.instance.show();
                CF.sN(this.CLOSE_NOTIFY);
                return;
            }
            if (this.isLuckeyGame) {
                MatchJackeyResultPanel.instance.hide();
                CF.sN(SceneNotify.OPEN_MATCH_HALL);
                CF.sN(this.CLOSE_NOTIFY);
                return;
            }
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.HALL_SCENE_NOTIFY);
        };
        /**
         * 返回对应的匹配
         */
        BaseGameScene.prototype.backMatching = function () {
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.MATCHING_SCENE_NOTIFY);
        };
        /**
         * 重新打开当前界面
         */
        BaseGameScene.prototype.reloadGame = function () {
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.GAME_SCENE_NOTIFY);
        };
        /**
         * 房间结束停止发送pinggame
         * @param  {egret.Event} e
         */
        BaseGameScene.prototype.roomGameOver = function (e) {
            Global.runGame = false;
        };
        BaseGameScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.proxy = Global.gameProxy;
            if (this.proxy.roomInfo && this.proxy.roomInfo.club) {
                this.recordBtn.visible = false;
            }
        };
        /**
         * 返回准备界面
         */
        BaseGameScene.prototype.back2ReadyScene = function (successCall, failCall) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ClubManager.instance.flushClubTable(successCall, failCall)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return BaseGameScene;
    }(game.BaseScene));
    game.BaseGameScene = BaseGameScene;
    __reflect(BaseGameScene.prototype, "game.BaseGameScene");
})(game || (game = {}));
