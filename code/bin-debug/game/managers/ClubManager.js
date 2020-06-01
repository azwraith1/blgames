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
 * @Author: MC Lee
 * @Date: 2020-01-06 17:30:31
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-15 17:32:40
 * @Description: 俱乐部管理器
 */
var ClubManager = (function () {
    function ClubManager() {
        this.clubTableData = {};
        this.currentClub = {};
        this.canShowPoint = false;
        this.list = [];
        /**
         * 返回club
         */
        this.lockBack = false;
        if (ClubManager._instance) {
            throw new Error("SocketManager使用单例");
        }
    }
    Object.defineProperty(ClubManager, "instance", {
        get: function () {
            if (!ClubManager._instance) {
                ClubManager._instance = new ClubManager();
            }
            return ClubManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubManager.prototype.setClubData = function (clubData) {
        this.clubIds = clubData.openGameId;
        //smart 可以设置得游戏ID
        this.supportOpenGameId = clubData.supportOpenGameId;
        //smart
        for (var i = 0; i < clubData.tableList.length; i++) {
            var data = clubData.tableList[i];
            this.clubTableData[data.tableId] = data;
        }
        if (clubData.clubInfo) {
            this.currentClub = clubData.clubInfo;
        }
    };
    ClubManager.prototype.addTableData = function (tableList) {
        for (var i = 0; i < tableList.length; i++) {
            var data = tableList[i];
            this.clubTableData[data.tableId] = data;
        }
    };
    ClubManager.prototype.clearTableData = function (tableId) {
        LogUtils.logD("====clearTableData===" + tableId);
        for (var i = 0; i < tableId.length; ++i) {
            var temptID = tableId[i];
            if (this.clubTableData[temptID]) {
                delete this.clubTableData[temptID];
            }
        }
    };
    ClubManager.prototype.clearClubDatas = function () {
        this.clubIds = [];
        this.clubTableData = [];
        this.currentClub = {};
    };
    //smart
    ClubManager.prototype.clearOpenGameClubDatas = function () {
        this.clubIds = [];
        this.clubTableData = [];
        this.lastClubGameId = null;
    };
    ClubManager.prototype.flushClubTable = function (successCall, failCall) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var handler, data, resp, roomInfo, players, i, player;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.lockBack) {
                            return [2 /*return*/];
                        }
                        this.lockBack = true;
                        this.lockTimeout = egret.setTimeout(function () {
                            _this.lockBack = false;
                        }, this, 5000);
                        handler = ServerPostPath.hall_clubHandler_c_getPlayerCurTableInfo;
                        data = {};
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                    case 1:
                        resp = _a.sent();
                        egret.clearTimeout(this.lockTimeout);
                        egret.setTimeout(function () {
                            _this.lockBack = false;
                        }, this, 1000);
                        if (resp.error && resp.error.code != 0) {
                            failCall && failCall();
                            ClubInnerHallScene.instance.show();
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                            return [2 /*return*/];
                        }
                        roomInfo = resp.roomInfo;
                        //进游戏了
                        if (roomInfo.state == 3) {
                            this.back2Game(roomInfo, successCall, failCall);
                        }
                        else {
                            players = {};
                            for (i = 0; i < resp.roomInfo.players.length; i++) {
                                player = resp.roomInfo.players[i];
                                players[player.seatId] = player;
                            }
                            resp.roomInfo.players = players;
                            successCall && successCall();
                            switch (roomInfo.gameId) {
                                case GAME_ID.ZJH:
                                    Global.roomProxy.setRoomInfo(resp);
                                    ZJHClubReadyScene.instance.show(false);
                                    break;
                                case GAME_ID.ERMJ:
                                    Global.gameProxy.setRoomInfo(resp);
                                    ERenClubReadyScene.instance.show(false);
                                    break;
                                case GAME_ID.BLNN:
                                    Global.roomProxy.setRoomInfo(resp);
                                    QZNNClubReadyScene.instance.show(false);
                                    break;
                                case GAME_ID.MJXZDD:
                                    Global.gameProxy.setRoomInfo(resp);
                                    XZDDClubReadyScene.instance.show(false);
                                    break;
                                case GAME_ID.HBMJ:
                                    Global.gameProxy.setRoomInfo(resp);
                                    HBMJClubReadyScene.instance.show(false);
                                    break;
                                case GAME_ID.BDZ:
                                    Global.roomProxy.setRoomInfo(resp);
                                    BDZClubReadyScene.instance.show(false);
                                    break;
                                case GAME_ID.GDMJ:
                                    Global.gameProxy.setRoomInfo(resp);
                                    GDMJClubReadyScene.instance.show(false);
                                    break;
                                case GAME_ID.BAICAO:
                                    Global.roomProxy.setRoomInfo(resp);
                                    BAICAOClubReadyScene.instance.show(false);
                                    break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubManager.prototype.back2Game = function (roomInfo, successCall, failCall) {
        return __awaiter(this, void 0, void 0, function () {
            var handler, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = ServerPostPath.hall_sceneHandler_c_enter;
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, { gameId: roomInfo.gameId, sceneId: GAME_SCENEID.CLUB })];
                    case 1:
                        resp = _a.sent();
                        if (resp.error) {
                            Global.gameProxy.clearAllRoomInfo();
                            Global.alertMediator.addAlert(resp.error.msg, function () {
                            }, null, true);
                            failCall && failCall();
                            ClubInnerHallScene.instance.show();
                            return [2 /*return*/];
                        }
                        HallForwardFac.redirectScene(resp, Global.gameProxy.roomState, function (isPlaying) {
                            if (isPlaying) {
                            }
                            else {
                                Global.gameProxy.clearAllRoomInfo();
                                CF.sN(SceneNotify.OPEN_CLUB_HALL);
                            }
                            successCall && successCall();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubManager.prototype.getTableListByGameId = function (gameId) {
        var result = [];
        for (var key in this.clubTableData) {
            var data = this.clubTableData[key];
            if (data.gameId == gameId) {
                result.push(data);
            }
        }
        return result;
    };
    ClubManager.prototype.setTableNum = function (data) {
        for (var i = 0; i < data.length; ++i) {
            var tempt = data[i];
            tempt["tableNum"] = i + 1;
        }
    };
    ClubManager.prototype.getTableData = function (tableId) {
        var clubData = this.clubTableData[tableId];
        return clubData;
    };
    ClubManager.prototype.playerSiteDown = function (data) {
        var clubData = this.clubTableData[data.tableId];
        this.removePlayerData(data);
        clubData.tableListPlayerInfo.push(data.playerInfo);
        clubData.usedSeatNum = clubData.tableListPlayerInfo.length;
        return clubData;
    };
    ClubManager.prototype.removePlayerData = function (data) {
        var clubData = this.clubTableData[data.tableId];
        if (!clubData) {
            return clubData;
        }
        var playerList = clubData.tableListPlayerInfo;
        for (var i = 0; i < playerList.length; i++) {
            var player = playerList[i];
            if (player.uid == data.playerInfo.uid) {
                game.Utils.removeArrayItem(playerList, player);
                i--;
            }
        }
        clubData.usedSeatNum = clubData.tableListPlayerInfo.length;
        return clubData;
    };
    ClubManager.prototype.playerLeave = function (data) {
        return this.removePlayerData(data);
    };
    return ClubManager;
}());
__reflect(ClubManager.prototype, "ClubManager");
