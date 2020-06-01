var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
 * @Author: li mengchan
 * @Date: 2018-10-19 11:08:11
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-24 18:16:57
 * @Description: 统一界面跳转
 */
var HallForwardFac = (function () {
    function HallForwardFac() {
    }
    HallForwardFac.redirectHall = function (callback, sceneName) {
        if (sceneName === void 0) { sceneName = ServerConfig.gid; }
        if (ServerConfig.gid) {
            var isOpen = Global.gameProxy.getSceneExist(ServerConfig.gid);
            if (!isOpen) {
                Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(74), function () {
                    FrameUtils.flushWindow();
                }, null, true);
                return;
            }
            sceneName = Global.gameProxy.checkBackHallSceneName(ServerConfig.gid);
        }
        if (sceneName == "slot") {
            var scene = game.Utils.getURLQueryString("scene") || "";
            switch (scene) {
                case "dntg":
                    RotationLoading.instance.load(["dntg_hall"], "", function () {
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.dntg).load("dntg_game", function () {
                            RES.loadGroup("dntg_back");
                            RES.loadGroup("slot_hall_new");
                            CF.sN(SceneNotify.OPEN_DNTG);
                        });
                    });
                    break;
                case "sdxl":
                    RotationLoading.instance.load(["sdxl_hall"], "", function () {
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sdxl).load("sdxl_game", function () {
                            RES.loadGroup("sdxl_back");
                            RES.loadGroup("slot_hall_new");
                            CF.sN(SceneNotify.OPEN_SDXL);
                        });
                    });
                    break;
                case "cbzz":
                    RotationLoading.instance.load(["cbzz_hall"], "", function () {
                        RES.loadGroup("cbzz_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.cbzz).load("cbzz_game", function () {
                            CF.sN(SceneNotify.OPEN_CBZZ);
                        });
                    });
                    break;
                case "sdmn":
                    RotationLoading.instance.load(["sdmn_hall"], "", function () {
                        RES.loadGroup("sdmn_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sdmn).load("sdmn_game", function () {
                            CF.sN(SceneNotify.OPEN_SDMN);
                        });
                    });
                    break;
                case "bskg":
                    RotationLoading.instance.load(["bskg_hall"], "", function () {
                        RES.loadGroup("bskg_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.bskg).load("bskg_game", function () {
                            CF.sN(SceneNotify.OPEN_BSKG);
                        });
                    });
                    break;
                case "rdsg":
                    RotationLoading.instance.load(["rdsg_hall"], "", function () {
                        RES.loadGroup("rdsg_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.rdsg).load("rdsg_game", function () {
                            CF.sN(SceneNotify.OPEN_RDSG);
                        });
                    });
                    break;
                case "ayls":
                    RotationLoading.instance.load(["ayls_hall"], "", function () {
                        RES.loadGroup("ayls_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.ayls).load("ayls_game", function () {
                            CF.sN(SceneNotify.OPEN_AYLS);
                        });
                    });
                    break;
                case "gdzw":
                    RotationLoading.instance.load(["gdzw_hall"], "", function () {
                        RES.loadGroup("gdzw_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.gdzw).load("gdzw_game", function () {
                            CF.sN(SceneNotify.OPEN_GDZW);
                        });
                    });
                    break;
                case "bscs":
                    RotationLoading.instance.load(["bscs_hall"], "", function () {
                        RES.loadGroup("bscs_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.bscs).load("bscs_game", function () {
                            CF.sN(SceneNotify.OPEN_BSCS);
                        });
                    });
                    break;
                case "ceby":
                    RotationLoading.instance.load(["ceby_hall"], "", function () {
                        RES.loadGroup("ceby_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.ceby).load("ceby_game", function () {
                            CF.sN(SceneNotify.OPEN_CEBY);
                        });
                    });
                    break;
                case "zcjl":
                    RotationLoading.instance.load(["zcjl_hall"], "", function () {
                        RES.loadGroup("zcjl_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.zcjl).load("zcjl_game", function () {
                            CF.sN(SceneNotify.OPEN_ZCJL);
                        });
                    });
                    break;
                case "wszw":
                    RotationLoading.instance.load(["wszw_hall"], "", function () {
                        RES.loadGroup("wszw_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.wszw).load("wszw_game", function () {
                            CF.sN(SceneNotify.OPEN_WSZW);
                        });
                    });
                    break;
                case "lucky7":
                    RotationLoading.instance.load(["lucky7_hall"], "", function () {
                        RES.loadGroup("lucky7_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.lucky7).load("lucky7_game", function () {
                            CF.sN(SceneNotify.OPEN_LUCKY7);
                        });
                    });
                    break;
                case "csd":
                    RotationLoading.instance.load(["csd_hall"], "", function () {
                        RES.loadGroup("csd_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.csd).load("csd_game", function () {
                            CF.sN(SceneNotify.OPEN_CSD);
                        });
                    });
                    break;
                case "xysg":
                    RotationLoading.instance.load(["xysg_hall"], "", function () {
                        RES.loadGroup("xysg_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.xysg).load("xysg_game", function () {
                            CF.sN(SceneNotify.OPEN_XYSG);
                        });
                    });
                    break;
                case "xcbs":
                    RotationLoading.instance.load(["xcbs_hall"], "", function () {
                        RES.loadGroup("xcbs_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.xcbs).load("xcbs_game", function () {
                            CF.sN(SceneNotify.OPEN_XCBS);
                        });
                    });
                    break;
                case "sgws":
                    RotationLoading.instance.load(["sgws_hall"], "", function () {
                        RES.loadGroup("sgws_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sgws).load("sgws_game", function () {
                            CF.sN(SceneNotify.OPEN_SGWS);
                        });
                    });
                    break;
                case "snyx":
                    RotationLoading.instance.load(["snyx_hall"], "", function () {
                        RES.loadGroup("snyx_back");
                        RES.loadGroup("slot_hall_new");
                        SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.snyx).load("snyx_game", function () {
                            CF.sN(SceneNotify.OPEN_SNYX);
                        });
                    });
                    break;
                default:
                    RotationLoading.instance.load(["slot_hall_new"], "", function () {
                        CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                    });
                    break;
            }
        }
        else {
            var resConfig = ResGroupConf[sceneName];
            if (!resConfig) {
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
            }
            else {
                console.log("resConfig:" + resConfig.hall);
                RotationLoading.instance.load(resConfig.hall, "", function () {
                    CF.sN("OPEN_" + ServerConfig.gid.toLocaleUpperCase() + "_HALL");
                });
            }
        }
        callback && callback();
    };
    HallForwardFac.redirectRaceScene = function (resp, data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var roomInfo, gameId;
            return __generator(this, function (_a) {
                roomInfo = resp.roomInfo;
                gameId = roomInfo.gameId;
                Global.gameProxy.roomState = null;
                switch (gameId) {
                    case "mjxzdd":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.gameProxy.setRoomInfo(resp);
                        Global.gameProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["match_" + gameId], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("match_hall");
                                        return [4 /*yield*/, Global.gameProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.gameProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN("OPEN_MATCH_" + gameId.toUpperCase());
                                        }
                                        else {
                                            Global.gameProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert("比赛已经结束或者你已被淘汰", null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    HallForwardFac.redirectScene = function (resp, data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var roomInfo, gameId;
            return __generator(this, function (_a) {
                roomInfo = resp.roomInfo;
                gameId = roomInfo.gameId;
                Global.gameProxy.roomState = null;
                switch (gameId) {
                    case "blnn":
                        Global.roomProxy.currentSceneId = data.sceneId;
                        Global.roomProxy.setRoomInfo(resp);
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        // Global.roomProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        RotationLoadingShu.instance.load(["niuniu_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("niuniu_hall");
                                        return [4 /*yield*/, Global.roomProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.roomProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            if (roomInfo.playway == 0) {
                                                CF.sN(SceneNotify.OPEN_NIUNIUGAMES);
                                            }
                                            else {
                                                CF.sN(SceneNotify.OPEN_NIUNIUJSGAMES);
                                            }
                                        }
                                        else {
                                            Global.roomProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "sangong":
                        Global.roomProxy.currentSceneId = data.sceneId;
                        Global.roomProxy.setRoomInfo(resp);
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        RotationLoadingShu.instance.load(["sangong_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("sangong_hall");
                                        return [4 /*yield*/, Global.roomProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.roomProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN(SceneNotify.OPEN_SANGONG_GAME);
                                        }
                                        else {
                                            Global.roomProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "mjxlch":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.gameProxy.setRoomInfo(resp);
                        Global.gameProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["majiang_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo, sceneName;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("majiang_hall");
                                        RES.loadGroup("majiang_common");
                                        return [4 /*yield*/, Global.gameProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.gameProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            sceneName = Global.gameProxy.checkBackHallSceneName(roomInfo.gameId) + "";
                                            CF.sN("OPEN_" + sceneName.toUpperCase());
                                        }
                                        else {
                                            Global.gameProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "mjxzdd":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.gameProxy.setRoomInfo(resp);
                        Global.gameProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["majiang_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo, sceneName;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("xzdd_hall");
                                        RES.loadGroup("majiang_common");
                                        return [4 /*yield*/, Global.gameProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.gameProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            sceneName = Global.gameProxy.checkBackHallSceneName(roomInfo.gameId) + "";
                                            CF.sN("OPEN_" + sceneName.toUpperCase());
                                        }
                                        else {
                                            Global.gameProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "dzmj":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.gameProxy.setRoomInfo(resp);
                        Global.gameProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["majiang_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("dzmj_hall");
                                        return [4 /*yield*/, Global.gameProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.gameProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN(SceneNotify.OPEN_DZMJ);
                                        }
                                        else {
                                            Global.gameProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    /**杭州麻将*/
                    case "hzmj":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.gameProxy.setRoomInfo(resp);
                        Global.gameProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["hzmj_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("hzmj_hall");
                                        return [4 /*yield*/, Global.gameProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.gameProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN(SceneNotify.OPEN_HZMJ);
                                        }
                                        else {
                                            Global.gameProxy.clearRoomInfo();
                                            CF.sN(SceneNotify.OPEN_HZMJ_MATCHING);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "zjh":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.roomProxy.setRoomInfo(resp);
                        Global.roomProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["zhajinhua_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("zhajinhua_hall");
                                        return [4 /*yield*/, Global.roomProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.roomProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN(SceneNotify.OPEN_ZJHGAME);
                                        }
                                        else {
                                            Global.roomProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "blackjack":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.roomProxy.setRoomInfo(resp);
                        Global.roomProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["blackjack_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("blackjack_hall");
                                        return [4 /*yield*/, Global.roomProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.roomProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN(SceneNotify.OPEN_BLACKJ_GAME);
                                        }
                                        else {
                                            Global.roomProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "baicao":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.roomProxy.setRoomInfo(resp);
                        Global.roomProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["baicao_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("baicao_hall");
                                        return [4 /*yield*/, Global.roomProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.roomProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN(SceneNotify.OPEN_BAICAO_GAME);
                                        }
                                        else {
                                            Global.roomProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "superbaicao":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.roomProxy.setRoomInfo(resp);
                        Global.roomProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["superbaicao_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("superbaicao_hall");
                                        return [4 /*yield*/, Global.roomProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.roomProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN(SceneNotify.OPEN_SUPERBAICAO_GAME);
                                        }
                                        else {
                                            Global.roomProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "hnmj":
                    case "gdmj":
                    case "hbmj":
                    case "gyzjmj":
                    case "ermj":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.gameProxy.setRoomInfo(resp);
                        Global.gameProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load([gameId + "_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup(gameId + "_hall");
                                        return [4 /*yield*/, Global.gameProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.gameProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN("OPEN_" + gameId.toLocaleUpperCase());
                                        }
                                        else {
                                            Global.gameProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "bdz":
                        Global.gameProxy.currentSceneId = data.sceneId;
                        Global.roomProxy.setRoomInfo(resp);
                        Global.roomProxy.diWen = resp.roomInfo.gameId;
                        game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
                        Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
                        Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
                        //如果是重连并且是游戏中得状态
                        RotationLoading.instance.load(["bdz_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                            var roomInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        RES.loadGroup("bdz_hall");
                                        return [4 /*yield*/, Global.roomProxy.req2updateRoom()];
                                    case 1:
                                        _a.sent();
                                        roomInfo = Global.roomProxy.roomInfo;
                                        if (roomInfo && roomInfo.playing) {
                                            CF.sN(SceneNotify.OPEN_BDZ);
                                        }
                                        else {
                                            Global.roomProxy.clearRoomInfo();
                                            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
                                        }
                                        callback && callback(roomInfo.playing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    return HallForwardFac;
}());
__reflect(HallForwardFac.prototype, "HallForwardFac");
