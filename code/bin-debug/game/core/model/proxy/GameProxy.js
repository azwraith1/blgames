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
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:26:11
 * @Last Modified by: li mengchan
 * @Description: 游戏数据代理，所有游戏数据都从这里获取
 */
var game;
(function (game) {
    var GameProxy = (function (_super) {
        __extends(GameProxy, _super);
        function GameProxy() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.reconnect = false;
            //当前对局玩法
            _this.lastGameConfig = {};
            //选择的是血流还是血战
            _this.gameType = 0;
            //血流和血战的请求次数。一分钟刷新一次。
            _this.gameRecord_time = 0;
            _this.gameRecord_time1 = 0;
            return _this;
        }
        GameProxy.prototype.init = function () {
            Global.gameProxy = this;
            this.listenOnCall();
        };
        /**
         * 根据str返回游戏ID
         * @param  {} strName
         */
        GameProxy.prototype.getSceneNameByStr = function (strName) {
            if (!this.gameIds) {
                return strName;
            }
            return this.gameIds[strName];
        };
        /**
         */
        GameProxy.prototype.checkBackHallSceneName = function (gameId) {
            for (var i = 0; i < this.sceneList.length; i++) {
                var sceneConfig = this.sceneList[i];
                var subGames = sceneConfig.subGames;
                if (subGames.indexOf(gameId) > -1) {
                    return sceneConfig.gameId;
                }
            }
            return gameId;
        };
        // public getSceneConfigByGame(gameId, sceneId) {
        // 	return this.gameNums[gameId][sceneId];
        // }
        GameProxy.prototype.getSceneExist = function (gameId) {
            for (var i = 0; i < this.sceneList.length; i++) {
                var sceneConfig = this.sceneList[i];
                if (sceneConfig.gameId == gameId) {
                    return true;
                }
                var subGames = sceneConfig.subGames;
                if (subGames.indexOf(gameId) > -1) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 主动拉取更新房间信息
         */
        GameProxy.prototype.req2updateRoom = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var handler, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handler = ServerPostPath.game_roomHandler_c_queryRoomInfo;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, this.lastGameConfig)];
                        case 1:
                            resp = _a.sent();
                            LogUtils.logD("resp %j=", resp);
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    if (resp && resp.roomInfo) {
                                        _this.playerInfo = resp.playerInfo;
                                        resp.reconnect = true;
                                        _this.setRoomInfo(resp);
                                        resolve();
                                    }
                                })];
                    }
                });
            });
        };
        /**
         * 重新连接room
         */
        GameProxy.prototype.reconnectRoom = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var handler, config, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            LogUtils.logD("center_1");
                            handler = ServerPostPath.hall_sceneHandler_c_enter;
                            config = this.lastGameConfig;
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
                                    else if (resp && resp.roomInfo) {
                                        _this.setRoomInfo(resp);
                                        resolve(true);
                                    }
                                })];
                    }
                });
            });
        };
        /**
         * 获取玩家本人的index
         */
        GameProxy.prototype.getMineIndex = function () {
            if (!this.playerInfo) {
                return null;
            }
            return this.playerInfo.playerIndex;
        };
        /**
         * 获取玩家本人的游戏数据
         */
        GameProxy.prototype.getMineGameData = function () {
            if (!this.roomInfo) {
                return;
            }
            return this.roomInfo.players[this.getMineIndex()];
        };
        GameProxy.prototype.listenOnCall = function () {
            CF.aE(ServerNotify.s_publicCardChanged, this.updatePublicCardPush, this);
        };
        /**
         * 更新剩余手牌数量
         * @param  {egret.Event} e
         */
        GameProxy.prototype.updatePublicCardPush = function (e) {
            var data = e.data;
            if (this.roomInfo) {
                this.roomInfo.publicCardNum = data.cardNum;
            }
        };
        /**
         * 更新剩余手牌数量
         * @param  {egret.Event} e
         */
        GameProxy.prototype.addPublicCardPush = function (num) {
            if (this.roomInfo) {
                this.roomInfo.publicCardNum += num;
                // EventManager.instanc
                return this.roomInfo.publicCardNum;
            }
            return 0;
        };
        /**
         * 设置游戏玩家数据
         * @param  {} playerInfo
         */
        GameProxy.prototype.setPlayerInfo = function (playerInfo) {
            this.playerInfo = playerInfo;
        };
        /**
         * 玩家加入房间
         * @param  {majiang.PlayerGameDataBean} playerGameDataBean
         */
        GameProxy.prototype.joinPlayer = function (index, playerGameDataBean) {
            if (this.roomInfo) {
                this.roomInfo.players[index] = playerGameDataBean;
            }
        };
        /**
         * 获取玩家
         * @param  {} playerIndex
         */
        GameProxy.prototype.getPlayerByIndex = function (playerIndex) {
            if (!this.roomInfo) {
                return;
            }
            return this.roomInfo.players[playerIndex];
        };
        GameProxy.prototype.getPlayers = function () {
            if (!this.roomInfo) {
                return [];
            }
            return this.roomInfo.players;
        };
        GameProxy.prototype.getAllPlayers = function () {
            if (!this.roomInfo) {
                return null;
            }
            return this.roomInfo.players;
        };
        /**
         * 设置游戏房间数据
         * @param  {} roomInfo
         */
        GameProxy.prototype.setRoomInfo = function (enterSceneResp) {
            this.clearRoomInfo();
            LogUtils.logDJ(enterSceneResp);
            Global.gameProxy.currentSceneId = enterSceneResp.roomInfo.sceneId;
            if (enterSceneResp.reconnect != undefined) {
                this.reconnect = enterSceneResp.reconnect;
            }
            this.playerInfo = enterSceneResp.playerInfo;
            if (this.roomInfo == null) {
                this.roomInfo = enterSceneResp.roomInfo;
            }
            if (enterSceneResp.roomInfo['serverTime']) {
                game.DateTimeManager.instance.updateServerTime(enterSceneResp.roomInfo['serverTime']);
            }
        };
        GameProxy.prototype.clearRoomInfo = function () {
            this.reconnect = null;
            this.playerInfo = null;
            this.roomInfo = null;
        };
        /**
         * 获取玩家手牌
         */
        GameProxy.prototype.getMineShuopaiArr = function () {
            var mineData = Global.gameProxy.getMineGameData();
            var cards = mineData.cards;
            var queCards = [];
            var cardsArr = [];
            var zipaiArr = [];
            var huapaiArr = [];
            var lastMajiang = mineData.lastCard;
            for (var key in cards) {
                var num = cards[key];
                for (var i = 0; i < num; i++) {
                    var color = Math.floor(parseInt(key) / 10);
                    if (color == mineData.selectColor) {
                        queCards.push(parseInt(key));
                    }
                    else {
                        if (color == 4) {
                            zipaiArr.push(parseInt(key));
                        }
                        else if (color == 5) {
                            huapaiArr.push(parseInt(key));
                        }
                        else {
                            cardsArr.push(parseInt(key));
                        }
                    }
                }
            }
            var returnCard = cardsArr.concat(zipaiArr).concat(huapaiArr).concat(queCards);
            if (mineData.lastCard) {
                game.Utils.removeArrayItem(returnCard, lastMajiang);
                returnCard.push(lastMajiang);
            }
            return returnCard;
        };
        GameProxy.prototype.getShoupaiSortByLzcards = function (cards) {
            var laizi = [];
            var cardsArr = [];
            var zipaiArr = [];
            var huapaiArr = [];
            for (var key in cards) {
                var num = cards[key];
                for (var i = 0; i < num; i++) {
                    var color = Math.floor(parseInt(key) / 10);
                    if (this.roomInfo.baoCards && this.roomInfo.baoCards.length > 0 && game.Utils.valueEqual(key, this.roomInfo.baoCards[0])) {
                        laizi.push(parseInt(key));
                    }
                    else {
                        if (color == 4) {
                            zipaiArr.push(parseInt(key));
                        }
                        else if (color == 5) {
                            huapaiArr.push(parseInt(key));
                        }
                        else {
                            cardsArr.push(parseInt(key));
                        }
                    }
                }
            }
            var returnCard = laizi.concat(cardsArr).concat(zipaiArr).concat(huapaiArr);
            return returnCard;
        };
        /**
         * 癞子牌手牌排序
         */
        GameProxy.prototype.getMineSHoupaiArrLz = function () {
            var mineData = Global.gameProxy.getMineGameData();
            var cards = mineData.cards;
            var laizi = [];
            var cardsArr = [];
            var zipaiArr = [];
            var huapaiArr = [];
            var lastMajiang = mineData.lastCard;
            for (var key in cards) {
                var num = cards[key];
                for (var i = 0; i < num; i++) {
                    var color = Math.floor(parseInt(key) / 10);
                    if (this.roomInfo.baoCards && this.roomInfo.baoCards.length > 0 && game.Utils.valueEqual(key, this.roomInfo.baoCards[0])) {
                        laizi.push(parseInt(key));
                    }
                    else {
                        if (color == 4) {
                            zipaiArr.push(parseInt(key));
                        }
                        else if (color == 5) {
                            huapaiArr.push(parseInt(key));
                        }
                        else {
                            cardsArr.push(parseInt(key));
                        }
                    }
                }
            }
            var returnCard = laizi.concat(cardsArr).concat(zipaiArr).concat(huapaiArr);
            if (mineData.lastCard) {
                game.Utils.removeArrayItem(returnCard, lastMajiang);
                returnCard.push(lastMajiang);
            }
            return returnCard;
        };
        /**
         * 获取其他玩家手牌
         */
        GameProxy.prototype.getOthersShuopaiArr = function (index) {
            var otherData = Global.gameProxy.getPlayerByIndex(index);
            var cards = otherData.cards;
            var queCards = [];
            var cardsArr = [];
            var lastMajiang = otherData.lastCard;
            for (var key in cards) {
                var num = cards[key];
                for (var i = 0; i < num; i++) {
                    if (Math.floor(parseInt(key) / 10) == otherData.selectColor) {
                        queCards.push(parseInt(key));
                    }
                    else {
                        cardsArr.push(parseInt(key));
                    }
                }
            }
            var returnCard = cardsArr.concat(queCards);
            if (otherData.lastCard) {
                game.Utils.removeArrayItem(returnCard, lastMajiang);
                returnCard.push(lastMajiang);
            }
            return returnCard;
        };
        /**
         * 更新玩家手牌
         * @param  {} value
         */
        GameProxy.prototype.updateWanjiaShoupai = function (value, addNum) {
            var mineData = Global.gameProxy.getMineGameData();
            var cards = mineData.cards;
            var num = cards[value];
            if (!num) {
                if (addNum > 0) {
                    cards[value] = addNum;
                }
            }
            else {
                num += addNum;
                if (num < 1) {
                    delete cards[value];
                }
                else {
                    cards[value] = num;
                }
            }
        };
        GameProxy.prototype.checkCardIsLaizi = function (card) {
            var baoCards = this.roomInfo.baoCards;
            if (baoCards && baoCards.length > 0 && baoCards.indexOf(card) > -1) {
                return true;
            }
            return false;
        };
        /**
         * 更新玩家手牌
         * @param  {} value
         */
        GameProxy.prototype.updateWanjiaShoupaiByIndex = function (value, addNum, playerIndex) {
            var mineData = Global.gameProxy.getPlayerByIndex(playerIndex);
            var cards = mineData.cards;
            if (!cards) {
                return;
            }
            var num = cards[value];
            if (!num) {
                if (addNum > 0) {
                    cards[value] = addNum;
                }
            }
            else {
                num += addNum;
                if (num < 1) {
                    delete cards[value];
                }
                else {
                    cards[value] = num;
                }
            }
        };
        /**
         * 检查是否轮到我
         */
        GameProxy.prototype.checkIsRoundMe = function () {
            return game.Utils.valueEqual(this.roomInfo.curPlay, this.playerInfo.playerIndex);
        };
        /**
         * 当前Index是否是我自己
         * @param  {} index
         */
        GameProxy.prototype.checkIndexIsMe = function (index) {
            return game.Utils.valueEqual(index, this.playerInfo.playerIndex);
        };
        GameProxy.prototype.recordPlayerChis = function (playerIndex, playCard, maxCard, chiData) {
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            if (playerData.cards) {
                for (var i = 0; i < 3; i++) {
                    var value = maxCard - i;
                    if (value != playCard) {
                        Global.gameProxy.updateWanjiaShoupaiByIndex(value, -1, playerIndex);
                    }
                }
            }
            playerData.cardNum -= 2;
            if (!playerData.chiCards) {
                playerData.chiCards = [];
            }
            playerData.chiCards.push(chiData);
        };
        /**
         * 抢杠杠变成碰
         */
        GameProxy.prototype.changeGang2Peng = function (card) {
            var playerData = Global.gameProxy.getMineGameData();
            var index = playerData.gangCards.indexOf(card);
            if (index > -1) {
                game.Utils.removeArrayItem(playerData.gangCards, card);
                playerData.pengCards.push(card);
            }
        };
        /**
         * 记录玩家碰牌
         * @param  {} playerIndex
         * @param  {} card
         */
        GameProxy.prototype.recordPlayerPengs = function (playerIndex, card, from) {
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            if (playerData.cards) {
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            playerData.cardNum -= 2;
            if (!playerData.pengCards) {
                playerData.pengCards = [];
            }
            for (var i = 0; i < playerData.pengCards.length; i++) {
                var pengCard = playerData.pengCards[0];
                if (pengCard == card) {
                    LogUtils.logI("碰牌错误");
                    game.PomeloManager.instance.disConnect();
                }
            }
            // LogUtils.logI("pengCards" + card, thi s.getMineShuopaiArr());
            playerData.pengCards.push(card);
        };
        /**
         * 点炮的玩家移除最后一张
         * @param  {} playerIndex
         * @param  {} card
         */
        GameProxy.prototype.recordChu2Dianpao = function (playerIndex) {
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.playCards.pop();
        };
        /**
         * 记录玩家杠牌
         * @param  {} resp
         */
        GameProxy.prototype.recordPlayerGang = function (resp, isRealGang) {
            if (isRealGang === void 0) { isRealGang = false; }
            var card = resp.card;
            var playerIndex = resp.playerIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            if (playerData.cards) {
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            var type = isRealGang ? resp.realGang : resp.gang;
            switch (type) {
                case 1:
                    playerData.cardNum -= 1;
                    game.Utils.removeArrayItem(playerData.pengCards, card);
                    break;
                case 2:
                    playerData.cardNum -= 4;
                    break;
                case 3:
                    playerData.cardNum -= 3;
                    break;
                case 4:
                    playerData.cardNum -= 3;
                    break;
            }
            if (resp.cardNum) {
                playerData.cardNum = resp.cardNum;
            }
            if (!playerData.gangCards) {
                playerData.gangCards = [];
            }
            for (var i = 0; i < playerData.gangCards.length; i++) {
                var gangCardData = playerData.gangCards[0];
                if (gangCardData.card == card) {
                    LogUtils.logI("杠牌错误");
                    game.PomeloManager.instance.disConnect();
                }
            }
            playerData.gangCards.push(resp);
        };
        GameProxy.prototype.clearCurPlay = function () {
            this.roomInfo.curPlay = 0;
        };
        GameProxy.prototype.clearTasks = function () {
            var mine = Global.gameProxy.getMineGameData();
            mine.hangupTasks = {};
            this.roomInfo.hangupTaskSource = null;
        };
        GameProxy.prototype.clearLastPai = function () {
            this.getMineGameData().lastCard = 0;
        };
        GameProxy.prototype.updatePlayer = function (index, player) {
            if (!this.roomInfo) {
                return;
            }
            this.roomInfo.players[index] = player;
        };
        GameProxy.prototype.addRecord = function (record) {
            var mine = Global.gameProxy.getMineGameData();
            if (!mine.bills) {
                mine.bills = [];
            }
            mine.bills.push(record);
        };
        GameProxy.prototype.getSceneConfig = function (sceneId) {
            return this.gameNums[sceneId];
        };
        GameProxy.prototype.getSceneConfigByGame = function (gameId, sceneId) {
            return this.gameNums[gameId][sceneId];
        };
        /**
         * 获取低注
         */
        GameProxy.prototype.getSceneDizhu = function () {
            return this.gameNums[this.roomInfo.sceneId].bet_base;
        };
        /**
         * 玩家出牌
         * @param  {} playerIndex
         * @param  {} value
         */
        GameProxy.prototype.addPlayerCard = function (playerIndex, value) {
            var player = this.roomInfo.players[playerIndex];
            player.playCards.push(value);
        };
        GameProxy.prototype.addHuTasks = function (task) {
            this.roomInfo.huTasks.push(task);
        };
        /**
         * 获取玩家手牌
         */
        GameProxy.prototype.getCardArrByIndex = function (playerIndex) {
            var playerData = this.getPlayerByIndex(playerIndex);
            var cards = playerData.cards;
            var queCards = [];
            var cardsArr = [];
            var lastMajiang = playerData.lastCard;
            for (var key in cards) {
                var num = cards[key];
                for (var i = 0; i < num; i++) {
                    if (Math.floor(parseInt(key) / 10) == playerData.selectColor) {
                        queCards.push(parseInt(key));
                    }
                    else {
                        cardsArr.push(parseInt(key));
                    }
                }
            }
            var returnCard = cardsArr.concat(queCards);
            if (playerData.lastCard) {
                game.Utils.removeArrayItem(returnCard, lastMajiang);
                returnCard.push(lastMajiang);
            }
            return returnCard;
        };
        /**
         * 更新在线人数。
         */
        GameProxy.prototype.people = function () {
            return __awaiter(this, void 0, void 0, function () {
                var route, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            route = ServerPostPath.hall_sceneHandler_c_getGameOnlineCountInfo;
                            return [4 /*yield*/, Global.pomelo.request(route, null)];
                        case 1:
                            resp = _a.sent();
                            Global.pomelo.clearLastLock();
                            if (resp != null) {
                                this.peoplesCounts = resp;
                                CF.dP(ENo.UPDATE_PLAYER_COUNT);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        GameProxy.prototype.findHasQueColor = function () {
            var playerData = this.getPlayerByIndex(this.getMineIndex());
            if (playerData.huCards.length > 0) {
                return false;
            }
            var cards = playerData.cards;
            var queCards = [];
            var lastMajiang = playerData.lastCard;
            if (Math.floor(parseInt(key) / 10) == lastMajiang) {
                return true;
            }
            for (var key in cards) {
                var num = cards[key];
                for (var i = 0; i < num; i++) {
                    if (Math.floor(parseInt(key) / 10) == playerData.selectColor) {
                        return true;
                    }
                }
            }
            return false;
        };
        GameProxy.prototype.clearAllRoomInfo = function () {
            Global.gameProxy.roomState = { state: 0 };
            Global.gameProxy.clearRoomInfo();
            Global.roomProxy.clearRoomInfo();
        };
        GameProxy.prototype.clearLastGameConfig = function () {
            Global.gameProxy.lastGameConfig = null;
            Global.gameProxy.roomState = { state: 0 };
        };
        GameProxy.NAME = "GameProxy";
        return GameProxy;
    }(ResourceProxyBase));
    game.GameProxy = GameProxy;
    __reflect(GameProxy.prototype, "game.GameProxy");
})(game || (game = {}));
