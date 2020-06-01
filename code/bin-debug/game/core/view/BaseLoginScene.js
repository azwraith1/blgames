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
var game;
(function (game) {
    var BaseLoginScene = (function (_super) {
        __extends(BaseLoginScene, _super);
        function BaseLoginScene() {
            var _this = _super.call(this) || this;
            _this.totalLoader = 0;
            _this.currentLoader = 0;
            _this.resLoadedOK = false;
            _this.sceneConfigOK = false;
            /**
             * 正式环境登陆
             */
            _this.backGroups = [];
            return _this;
        }
        ;
        BaseLoginScene.prototype.clubInvite = function (e) {
        };
        BaseLoginScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initInternation();
            var node = document.getElementById("loadingDiv");
            node.parentNode.removeChild(node);
        };
        /**
        * 国际化
        * Create scene interface
        */
        BaseLoginScene.prototype.initInternation = function () {
            var language = game.Utils.getURLQueryString("lan");
            if (language) {
                language = language.toLocaleLowerCase();
            }
            else {
                language = "zh_cn";
            }
            TextUtils.instance.changeLanguage(language);
        };
        /**
         * 先登录
         */
        BaseLoginScene.prototype.startLogin = function () {
            if (!ServerConfig.PATH_CONFIG.token_login) {
                LogUtils.logD("测试环境登陆");
                this.devLogin();
            }
            else {
                LogUtils.logD("正式环境登陆");
                this.envLogin();
            }
        };
        /**
         *  用户登录成功
         */
        BaseLoginScene.prototype.userLoginSuc = function () {
            return __awaiter(this, void 0, void 0, function () {
                var publicMsg, club, handler, resp, club;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            publicMsg = PMDComponent.instance;
                            publicMsg.anchorOffsetY = 24;
                            publicMsg.horizontalCenter = 0;
                            publicMsg.top = 100;
                            GameLayerManager.gameLayer().loadLayer.addChild(publicMsg);
                            GameLayerManager.gameLayer().createNetStatus();
                            CF.dP(ServerNotify.s_broadcast, Global.gameProxy.pMd);
                            return [4 /*yield*/, Global.gameProxy.people()];
                        case 1:
                            _a.sent();
                            if (NativeApi.instance.isiOSDevice) {
                                if (NativeApi.instance.isSafari) {
                                    FrameUtils.checkSafariStart();
                                }
                                else if (NativeApi.instance.isChromeForIOS) {
                                    FrameUtils.postMessage("0");
                                }
                            }
                            game.PomeloManager.instance.startPingTime();
                            if (!(Global.gameProxy.roomState && Global.gameProxy.roomState.state == 1)) return [3 /*break*/, 3];
                            club = Global.gameProxy.roomState.club;
                            if (club) {
                                ClubManager.instance.currentClub = club;
                            }
                            handler = ServerPostPath.hall_sceneHandler_c_enter;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, Global.gameProxy.roomState)];
                        case 2:
                            resp = _a.sent();
                            if (resp.error) {
                                Global.gameProxy.clearAllRoomInfo();
                                Global.alertMediator.addAlert(resp.error.msg, function () {
                                }, null, true);
                                HallForwardFac.redirectHall(function () {
                                    CF.sN(SceneNotify.CLOSE_LOADING);
                                });
                                return [2 /*return*/];
                            }
                            if (resp.reconnect) {
                                if (Global.gameProxy.roomState.raceState == 2) {
                                    HallForwardFac.redirectRaceScene(resp, Global.gameProxy.roomState, function (isPlaying) {
                                        if (isPlaying) {
                                            CF.sN(SceneNotify.CLOSE_LOADING);
                                        }
                                        else {
                                            Global.gameProxy.clearAllRoomInfo();
                                            CF.sN(SceneNotify.OPEN_MATCH_HALL);
                                        }
                                    });
                                    return [2 /*return*/];
                                }
                                HallForwardFac.redirectScene(resp, Global.gameProxy.roomState, function (isPlaying) {
                                    if (isPlaying) {
                                        CF.sN(SceneNotify.CLOSE_LOADING);
                                    }
                                    else {
                                        Global.gameProxy.clearAllRoomInfo();
                                        CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                    }
                                });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 1) {
                                //可能会轮空
                                MatchPassPanel.instance.showLunKong();
                                CF.sN(SceneNotify.CLOSE_LOADING);
                            }
                            else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 4) {
                                MatchPassPanel.instance.showWating(Global.gameProxy.roomState.rank, Global.gameProxy.roomState.runingRaceNum);
                                CF.sN(SceneNotify.CLOSE_LOADING);
                            }
                            else if (Global.gameProxy.roomState && Global.gameProxy.roomState.club) {
                                club = Global.gameProxy.roomState.club;
                                ClubManager.instance.currentClub = club;
                                ClubManager.instance.flushClubTable(function () {
                                    CF.sN(SceneNotify.CLOSE_LOADING);
                                }, function () {
                                    CF.sN(SceneNotify.CLOSE_LOADING);
                                });
                            }
                            else {
                                HallForwardFac.redirectHall(function () {
                                    CF.sN(SceneNotify.CLOSE_LOADING);
                                });
                            }
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * 服务器获取授权
        * @param  {} data
        */
        BaseLoginScene.prototype.auth = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var gatePath, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            gatePath = ServerConfig.PATH_CONFIG.httpPath;
                            egret.clearTimeout(this.timeout);
                            this.timeout = egret.setTimeout(function () {
                                Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(68), function () {
                                    FrameUtils.flushWindow();
                                }, null, true);
                            }, this, 10000);
                            return [4 /*yield*/, Global.netProxy.sendRequestAsync(gatePath + "/gate/clientApi/auth", data)];
                        case 1:
                            resp = _a.sent();
                            egret.clearTimeout(this.timeout);
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    if (resp.error) {
                                        Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(69), function () {
                                            FrameUtils.flushWindow();
                                        }, null, true);
                                    }
                                    else {
                                        var playerInfo = resp.data.playerInfo;
                                        var connectInfo = resp.data.connectInfo;
                                        Global.playerProxy.playerData = playerInfo;
                                        Global.playerProxy.token = playerInfo.token;
                                        Global.playerProxy.gametoken = playerInfo.sdkToken;
                                        Global.gameProxy.connectorInfo = connectInfo;
                                        _this.showVersions(connectInfo.ver, GameConfig.JS_VERSION);
                                        ServerConfig.PATH_CONFIG.socketPath = connectInfo.ws;
                                        resolve();
                                    }
                                })];
                    }
                });
            });
        };
        BaseLoginScene.prototype.uploadPlayerAddress = function () {
            var browser = NativeApi.instance.getDeivice();
            var device = "PC";
            if (NativeApi.instance.isAndroidDevice) {
                device = "Android";
            }
            else if (NativeApi.instance.isiOSDevice) {
                device = "IOS";
            }
            var reqData = {
                token: Global.playerProxy.token,
                info: {
                    browser: browser,
                    devices: device,
                    game_id: ServerConfig.gid
                }
            };
            var gatePath = ServerConfig.PATH_CONFIG.httpPath;
            Global.netProxy.sendRequest(gatePath + "/gate/clientApi/uploadStatistics", reqData, null);
        };
        /**
         * 开发模式登陆
         */
        BaseLoginScene.prototype.devLogin = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data1, language, line, resp, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data1 = Date.now();
                            language = game.Utils.getURLQueryString("lan") || "zh_CN";
                            line = game.Utils.getURLQueryString("line") || "";
                            return [4 /*yield*/, this.auth({
                                    operatorId: 1,
                                    channel_id: 1,
                                    authData: {
                                        username: ServerConfig.USER_NAME,
                                        password: '123654',
                                        figure_url: Math.floor(_.random(1, 6)),
                                        sex: Math.floor(_.random(0, 1)),
                                        lan: language,
                                        line: line
                                    },
                                    devType: 2,
                                    devId: NativeApi.instance.getDeivice()
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.connect()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                        case 3:
                            resp = _a.sent();
                            Global.gameProxy.roomState = resp;
                            Global.gameProxy.lastGameConfig = resp;
                            if (!(Global.gameProxy.roomState && Global.gameProxy.roomState.raceState && Global.gameProxy.roomState.raceActivityId)) return [3 /*break*/, 5];
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_userHandler_c_raceScenes, { activityId: Global.gameProxy.roomState.raceActivityId })];
                        case 4:
                            resp1 = _a.sent();
                            if (resp1) {
                                Global.gameProxy.matchItemData = resp1.raceScenesArray[0];
                            }
                            _a.label = 5;
                        case 5:
                            this.calcResGroup();
                            this.beganLoadResGroup();
                            this.getSceneConfigInfo();
                            return [2 /*return*/];
                    }
                });
            });
        };
        BaseLoginScene.prototype.calcResGroup = function () {
            var res = RESUtils.getResNameByGid();
            LogUtils.logD("重连加载:" + JSON.stringify(res));
            if (res) {
                this.resGroups = res.now;
                this.backGroups = res.back.concat(["main"]);
            }
            else {
                this.resGroups = ["main"];
            }
            this.totalLoader = RESUtils.getGroupTotal(this.resGroups);
        };
        BaseLoginScene.prototype.showVersions = function (serverVer, clientVer) {
        };
        BaseLoginScene.prototype.beganLoadResGroup = function () {
        };
        BaseLoginScene.prototype.envLogin = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loginByToken()];
                        case 1:
                            _a.sent();
                            this.showVersions(ServerConfig.PATH_CONFIG.serverVersion, GameConfig.JS_VERSION);
                            // await this.queryEntry();
                            Global.gameProxy.connectorInfo = {
                                port: "",
                                host: ""
                            };
                            return [4 /*yield*/, this.connect()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                        case 3:
                            resp = _a.sent();
                            Global.gameProxy.roomState = resp;
                            Global.gameProxy.lastGameConfig = resp;
                            if (!(Global.gameProxy.roomState && Global.gameProxy.roomState.raceState && Global.gameProxy.roomState.raceActivityId)) return [3 /*break*/, 5];
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_userHandler_c_raceScenes, { activityId: Global.gameProxy.roomState.raceActivityId })];
                        case 4:
                            resp1 = _a.sent();
                            if (resp1) {
                                Global.gameProxy.matchItemData = resp1.raceScenesArray[0];
                            }
                            _a.label = 5;
                        case 5:
                            this.calcResGroup();
                            this.beganLoadResGroup();
                            this.getSceneConfigInfo();
                            return [2 /*return*/];
                    }
                });
            });
        };
        BaseLoginScene.prototype.loginByToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var gatePath, data, time, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            egret.clearTimeout(this.timeout);
                            gatePath = ServerConfig.PATH_CONFIG.httpPath;
                            data = { token: Global.playerProxy.token };
                            this.timeout = egret.setTimeout(function () {
                                Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(64), function () {
                                    FrameUtils.flushWindow();
                                }, null, true);
                            }, this, 60000);
                            time = Date.now();
                            return [4 /*yield*/, Global.netProxy.sendRequestAsync(gatePath + "/gate/clientApi/getPlayerInfo", data)];
                        case 1:
                            resp = _a.sent();
                            egret.clearTimeout(this.timeout);
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    if (resp.error) {
                                        if (resp.error.code && resp.error.code == -107) {
                                            Global.alertMediator.addAlert(resp.error.msg, function () {
                                                FrameUtils.flushWindow();
                                            }, null, true);
                                            return;
                                        }
                                        Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(65), function () {
                                            FrameUtils.flushWindow();
                                        }, null, true);
                                    }
                                    else {
                                        LogUtils.logD(resp);
                                        Global.playerProxy.playerData = resp.data;
                                        Global.playerProxy.token = data.token;
                                        resolve();
                                    }
                                })];
                    }
                });
            });
        };
        BaseLoginScene.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp_1, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            egret.clearTimeout(this.chaoshi);
                            //先握手
                            this.chaoshi = egret.setTimeout(function () {
                                Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(69), function () {
                                    FrameUtils.flushWindow();
                                }, null, true);
                            }, this, 30000);
                            return [4 /*yield*/, game.PomeloManager.instance.initServer(Global.gameProxy.connectorInfo.host, Global.gameProxy.connectorInfo.port)];
                        case 1:
                            _a.sent();
                            egret.clearTimeout(this.chaoshi);
                            this.chaoshi = null;
                            return [4 /*yield*/, game.PomeloManager.instance.request('connector.entryHandler.c_connect', {
                                    token: Global.playerProxy.token,
                                    version: GameConfig.JS_VERSION
                                })];
                        case 2:
                            resp_1 = _a.sent();
                            if (resp_1.error && resp_1.error.code != 0) {
                                Global.alertMediator.addAlert("当前客户端版本低于线上版本,请等待更新完成.", function () {
                                    FrameUtils.flushWindow();
                                }, null, true);
                                return [2 /*return*/];
                            }
                            egret.localStorage.setItem("firstlogin", "1");
                            this.uploadPlayerAddress();
                            Global.gameProxy.pMd = resp_1.broadcast;
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    if (resp_1) {
                                        if (resp_1.error && resp_1.error.code != 0) {
                                            alert(TextUtils.instance.getCurrentTextById(69));
                                            return;
                                        }
                                        game.PomeloManager.instance.state = PomeloStateEnum.CONNECT;
                                    }
                                    resolve();
                                })
                                //登陆成功
                            ];
                        case 3:
                            err_1 = _a.sent();
                            egret.clearTimeout(this.chaoshi);
                            this.chaoshi = null;
                            game.PomeloManager.instance.state = PomeloStateEnum.DISCONNECT;
                            egret.setTimeout(this.connect, this, 10000);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        BaseLoginScene.prototype.getSceneList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp, list, i, data, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, game.PomeloManager.instance.request('hall.sceneHandler.c_getGameListInfo', {})];
                        case 1:
                            resp = _a.sent();
                            list = [];
                            for (i = 0; i < resp.length; i++) {
                                data = resp[i];
                                if (data.grade != 6) {
                                    list.push(data);
                                }
                                if (data.groupCode) {
                                    data.gameId = data.groupCode;
                                }
                                if (data.gameCodes) {
                                    data.subGames = data.gameCodes;
                                }
                            }
                            Global.gameProxy.sceneList = list;
                            Global.gameProxy.backSceneList = resp;
                            // this.checkAddRace();
                            this.sceneConfigOK = true;
                            this.checkLoginOver();
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _a.sent();
                            egret.error('********* 获取金币场场配置信息 err=', err_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        BaseLoginScene.prototype.checkLoginOver = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.resLoadedOK && this.sceneConfigOK) {
                        this.userLoginSuc();
                    }
                    return [2 /*return*/];
                });
            });
        };
        //获取金币场场配置信息
        BaseLoginScene.prototype.getSceneConfigInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, game.PomeloManager.instance.request('hall.sceneHandler.c_getSceneConfigInfo', {})];
                        case 1:
                            resp = _a.sent();
                            if (resp.gameConfigs) {
                                Global.gameProxy.gameNums = resp.gameConfigs;
                                Global.gameProxy.gameIds = resp.gameIds;
                                if (resp.globalConfigs.slot) {
                                    Global.slotProxy = resp.globalConfigs.slot.SlotHallList;
                                    game.LaohuUtils.slotHallDataInit(Global.slotProxy);
                                }
                            }
                            else {
                                Global.gameProxy.gameNums = resp;
                            }
                            this.getSceneList();
                            return [3 /*break*/, 3];
                        case 2:
                            err_3 = _a.sent();
                            egret.error('********* 获取金币场场配置信息 err=', err_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return BaseLoginScene;
    }(game.BaseScene));
    game.BaseLoginScene = BaseLoginScene;
    __reflect(BaseLoginScene.prototype, "game.BaseLoginScene");
})(game || (game = {}));
