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
var majiang;
(function (majiang) {
    var HBMJMatchingScene = (function (_super) {
        __extends(HBMJMatchingScene, _super);
        function HBMJMatchingScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "mjxlch";
            _this.bgMusic = "playingingame_mp3";
            _this.GAME_ID = "hbmj";
            _this.players = {};
            /**
             * 关闭匹配通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_HBMJ_MATCHING;
            /**
             * 打开游戏大厅
             */
            _this.GAME_HALL_NOTIFY = SceneNotify.OPEN_HBMJ_HALL;
            /**
             * 进入游戏通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_HBMJ;
            _this.isStart = false;
            _this.isInitHand = false;
            _this.skinName = new MajiangMatchingSceneSkin();
            return _this;
        }
        HBMJMatchingScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    this.paiQiang.hidePaiQiang();
                    this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen;
                    this.wanfaImage.source = RES.getRes("hbmj_wanfa_png");
                    this.wanfaImage.verticalCenter -= 10;
                    return [2 /*return*/];
                });
            });
        };
        HBMJMatchingScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
            CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
        };
        HBMJMatchingScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
            CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        };
        HBMJMatchingScene.prototype.s_startNewRound = function (e) {
            var data = e.data;
            Global.gameProxy.roomInfo.dealer = data.dealer;
            this.isStart = true;
            this.checkStart();
        };
        HBMJMatchingScene.prototype.playerEnter = function (e) {
            var data = e.data;
            this.players[data.playerIndex] = data.player;
            Global.gameProxy.updatePlayer(data.playerIndex, data.player);
        };
        HBMJMatchingScene.prototype.enterResult = function (e) {
            this.allowBack = false;
            var data = e.data;
            if (data.code && data.code != 0) {
                this.clearJoinTimeout();
                this.backHall();
                Global.alertMediator.addAlert(data.msg, function () {
                }, null, true);
                return;
            }
            Global.gameProxy.setRoomInfo(e.data);
            Global.gameProxy.roomInfo.playing = true;
        };
        /**
         * 发牌
         * 收到发牌的消息跳转界面
         * @param  {egret.Event} e
         */
        HBMJMatchingScene.prototype.initHandCards = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var data, roomInfo, hua, mineData, key, playerData;
                return __generator(this, function (_a) {
                    data = e.data;
                    roomInfo = Global.gameProxy.roomInfo;
                    hua = data.hua;
                    mineData = Global.gameProxy.getMineGameData();
                    mineData.cards = data.cards;
                    for (key in roomInfo.players) {
                        if (!game.Utils.valueEqual(key, Global.gameProxy.getMineIndex())) {
                            playerData = roomInfo.players[key];
                            if (game.Utils.valueEqual(key, roomInfo.dealer)) {
                                playerData.cardNum = 14;
                            }
                            else {
                                playerData.cardNum = 13;
                            }
                        }
                    }
                    this.isInitHand = true;
                    this.checkStart();
                    return [2 /*return*/];
                });
            });
        };
        HBMJMatchingScene.prototype.checkStart = function () {
            if (this.isInitHand && this.isStart) {
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(this.GAME_SCENE_NOTIFY);
            }
        };
        /**
         * 玩家加入
         * @param  {egret.Event} e
         */
        HBMJMatchingScene.prototype.playerjoin = function (e) {
            var resp = e.data;
            Global.gameProxy.joinPlayer(resp.playerIndex, resp.player);
        };
        return HBMJMatchingScene;
    }(game.BaseMatchingScene));
    majiang.HBMJMatchingScene = HBMJMatchingScene;
    __reflect(HBMJMatchingScene.prototype, "majiang.HBMJMatchingScene");
})(majiang || (majiang = {}));
