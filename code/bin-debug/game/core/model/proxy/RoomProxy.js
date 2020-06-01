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
    var RoomProxy = (function (_super) {
        __extends(RoomProxy, _super);
        function RoomProxy() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.reconnect = false;
            //红黑记录时间
            _this.rbwRecord_time = 0;
            //扎金花记录时间
            _this.zjhRecord_time = 0;
            //扎金花押注
            _this.zjh_minbet = 0;
            _this.fcsIndex = 1;
            _this.playing = true;
            return _this;
        }
        RoomProxy.prototype.init = function () {
            Global.roomProxy = this;
            this.listenOnCall();
        };
        RoomProxy.prototype.listenOnCall = function () {
        };
        RoomProxy.prototype.req2updateRoom = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var handler, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handler = ServerPostPath.game_roomHandler_c_queryRoomInfo;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, Global.gameProxy.lastGameConfig)];
                        case 1:
                            resp = _a.sent();
                            // LogUtils.logD("resp %j=", resp)
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    if (resp && resp.roomInfo) {
                                        if (_this.roomInfo) {
                                            _this.clearRoomInfo();
                                        }
                                        resp.reconnect = true;
                                        _this.setRoomInfo(resp);
                                        if (resp.roomInfo['serverTime']) {
                                            game.DateTimeManager.instance.updateServerTime(resp.roomInfo['serverTime']);
                                        }
                                        resolve();
                                    }
                                })];
                    }
                });
            });
        };
        RoomProxy.prototype.isDealer = function (index) {
            return game.Utils.valueEqual(index, this.roomInfo.dealer);
        };
        /**
         * 重新连接room
         */
        RoomProxy.prototype.reconnectRoom = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var handler, config, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            LogUtils.logD("center_2");
                            handler = ServerPostPath.hall_sceneHandler_c_enter;
                            config = Global.gameProxy.lastGameConfig;
                            config['isContinue'] = false;
                            // if (!config.sceneId) {
                            // 	config.sceneId = this.roomInfo.sceneId;
                            // }
                            // if (!config.gameId || this.roomInfo['codeId']) {
                            // 	config.gameId = this.roomInfo['codeId'];
                            // }
                            if (this.roomInfo.sceneId) {
                                config.sceneId = this.roomInfo.sceneId;
                            }
                            if (this.roomInfo['codeId']) {
                                config.gameId = this.roomInfo['codeId'];
                            }
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, config)];
                        case 1:
                            resp = _a.sent();
                            // LogUtils.logD("reconnect %j=", resp)
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    if (resp && resp.code == 0) {
                                        //还在匹配中
                                        resolve(false);
                                        return;
                                    }
                                    else if (resp.roomInfo) {
                                        _this.reconnect = resp.reconnect;
                                        _this.setRoomInfo(resp);
                                        resolve(true);
                                    }
                                })];
                    }
                });
            });
        };
        /**
         * 设置游戏房间数据
         * @param  {} roomInfo
         */
        RoomProxy.prototype.setRoomInfo = function (enterSceneResp) {
            this.clearRoomInfo();
            LogUtils.logDJ(enterSceneResp);
            Global.roomProxy.currentSceneId = enterSceneResp.roomInfo.sceneId;
            if (enterSceneResp.reconnect != undefined) {
                this.reconnect = enterSceneResp.reconnect;
            }
            this.reconnect = enterSceneResp.reconnect;
            this.playerInfo = enterSceneResp.playerInfo;
            if (this.roomInfo == null) {
                this.roomInfo = enterSceneResp.roomInfo;
            }
            if (enterSceneResp.roomInfo['serverTime']) {
                game.DateTimeManager.instance.updateServerTime(enterSceneResp.roomInfo['serverTime']);
            }
        };
        RoomProxy.prototype.updatePlayer = function (index, player) {
            if (!this.roomInfo) {
                return;
            }
            this.roomInfo.players[index] = player;
        };
        RoomProxy.prototype.curIndexIsMe = function () {
            return game.Utils.valueEqual(this.roomInfo.curPlay, this.playerInfo.playerIndex);
        };
        /**
             * 获取玩家
             * @param  {} playerIndex
             */
        RoomProxy.prototype.getPlayerByIndex = function (playerIndex) {
            if (!this.roomInfo) {
                return;
            }
            return this.roomInfo.players[playerIndex];
        };
        /**
         * 得到游戏玩家
         */
        RoomProxy.prototype.getPlayers = function () {
            if (!this.roomInfo) {
                return [];
            }
            return this.roomInfo.players;
        };
        RoomProxy.prototype.getPlayersLength = function () {
            return _.keys(this.roomInfo.players).length;
        };
        /**
         * 获取玩家本人的index
         */
        RoomProxy.prototype.getMineIndex = function () {
            if (!this.playerInfo) {
                return null;
            }
            return this.playerInfo.playerIndex;
        };
        RoomProxy.prototype.getAllPlayers = function () {
            if (!this.roomInfo) {
                return null;
            }
            return this.roomInfo.players;
        };
        RoomProxy.prototype.getMineGameData = function () {
            if (!this.roomInfo) {
                return;
            }
            return this.roomInfo.players[this.getMineIndex()];
        };
        RoomProxy.prototype.getMineData = function () {
            if (!this.playerInfo) {
                return null;
            }
            return this.roomInfo.players[this.playerInfo.playerIndex];
        };
        /**
         * 当前Index是否是我自己
         * @param  {} index
         */
        RoomProxy.prototype.checkIndexIsMe = function (index) {
            return game.Utils.valueEqual(index, this.playerInfo.playerIndex);
        };
        RoomProxy.prototype.getMineInfo = function () {
            return this.roomInfo.players[this.playerInfo.playerIndex];
        };
        RoomProxy.prototype.getPlayerInfoByIndex = function (index) {
            return this.roomInfo.players[index];
        };
        RoomProxy.prototype.checkGold = function (gold) {
            var mine = this.getMineData();
            return mine.gold >= gold;
        };
        RoomProxy.prototype.clearRoomInfo = function () {
            this.roomInfo = null;
            this.playerInfo = null;
            this.reconnect = false;
        };
        /**
     * 根据自己的位子获取方位
     * @param  {number} mineIndex
     */
        RoomProxy.getDirectionByMine = function (mineIndex) {
            var direction = {};
            switch (mineIndex) {
                case 1:
                    direction["1"] = "1";
                    direction["2"] = "2";
                    direction["3"] = "3";
                    direction['4'] = "4";
                    break;
                case 2:
                    direction["2"] = "1";
                    direction["3"] = "2";
                    direction["4"] = "3";
                    direction['1'] = "4";
                    break;
                case 3:
                    direction["3"] = "1";
                    direction["4"] = "2";
                    direction["1"] = "3";
                    direction['2'] = "4";
                    break;
                case 4:
                    direction["4"] = "1";
                    direction["1"] = "2";
                    direction["2"] = "3";
                    direction['3'] = "4";
                    break;
            }
            return direction;
        };
        RoomProxy.NAME = "RoomProxy";
        return RoomProxy;
    }(ResourceProxyBase));
    game.RoomProxy = RoomProxy;
    __reflect(RoomProxy.prototype, "game.RoomProxy");
})(game || (game = {}));
