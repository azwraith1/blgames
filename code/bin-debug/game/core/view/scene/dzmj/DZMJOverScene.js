/*
 * @Author: He Bing
 * @Date: 2018-07-06 16:29:49
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-27 19:42:11
 @Description: 麻将结算界面
 */
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
    var DZMJOverScene = (function (_super) {
        __extends(DZMJOverScene, _super);
        function DZMJOverScene(settleData) {
            var _this = _super.call(this) || this;
            _this.settleData = settleData;
            _this.skinName = new DZMJOverSceneSkin();
            return _this;
        }
        DZMJOverScene.prototype.onAdded = function () {
            // roundPatternScore
            // roundPattern
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        DZMJOverScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        DZMJOverScene.prototype.resetPosition = function (e) {
            var data = e.data;
        };
        DZMJOverScene.prototype.initHeaders = function () {
            //排序
            var roomInfo = Global.gameProxy.roomInfo;
            var players = roomInfo.players;
            var settlePlayers = this.settleData.players;
            //赢家和第一的换
            var winSettle = [];
            var failSettle = [];
            for (var key in settlePlayers) {
                var settle = settlePlayers[key];
                if (settle.gainGold > 0) {
                    winSettle.push(key);
                }
                else {
                    failSettle.push(key);
                }
            }
            for (var i = 0; i < winSettle.length; i++) {
                var index = winSettle[i];
                var playerData = players[index];
                this.header1.initWithData(playerData, null);
                this.header1.hideGold();
                var settle = settlePlayers[index];
                this.score1.text = "+" + NumberFormat.handleFloatDecimal(settle.gainGold);
                this.fanLabel.text = settle.roundPatternScore;
                // this.showPais(settle);
                this.showFans(settle.roundPattern, settle.roundPatternScoreArray);
            }
            var headerIndex = 2;
            for (var i = 0; i < failSettle.length; i++, headerIndex++) {
                var index = failSettle[i];
                var playerData = players[index];
                var header = this["header" + headerIndex];
                header.initWithData(playerData, null);
                header.hideGold();
                var settle = settlePlayers[index];
                if (Global.gameProxy.checkIndexIsMe(index)) {
                    this["tip" + headerIndex].visible = true;
                }
                this["score" + headerIndex].text = NumberFormat.handleFloatDecimal(settle.gainGold);
                this["score" + headerIndex].textColor = this.socreW2L(settle.gainGold);
            }
        };
        DZMJOverScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.showPais(this.settleData.players[this.settleData.winPlayer]);
            this.initHeaders();
            this.paiGroup.touchChildren = false;
            this.paiGroup.touchThrough = false;
            this.alpha = 0;
            egret.Tween.get(this).to({
                alpha: 1
            }, 1000, egret.Ease.circIn);
        };
        DZMJOverScene.prototype.showFans = function (fans, scores) {
            for (var i = 0; i < fans.length; i = i + 2) {
                var fanCount = new DZMJOverItem(fans[i], scores[i], fans[i + 1], scores[i + 1]);
                this.contentGroup.addChild(fanCount);
            }
        };
        DZMJOverScene.prototype.createPai = function (value) {
            var shoupai = new majiang.MineShoupai(value);
            shoupai.resetValue(value);
            shoupai.scaleX = shoupai.scaleY = 0.45;
            this.paiGroup.addChild(shoupai);
            return shoupai;
        };
        DZMJOverScene.prototype.showPais = function (playerData) {
            //吃 碰 杠
            var x = 0;
            var chiCards = playerData.chiCards; //selectCard
            // chiCards = [14];
            for (var i = 0; i < chiCards.length; i++) {
                for (var j = 2; j >= 0; j--) {
                    var shoupai_1 = this.createPai(chiCards[i].selectCard - j);
                    shoupai_1.x = x;
                    x += shoupai_1.width * shoupai_1.scaleX - 0.75;
                }
                x += 5;
            }
            var pengCards = playerData.pengCards; //number
            for (var i = 0; i < pengCards.length; i++) {
                for (var j = 2; j >= 0; j--) {
                    var shoupai_2 = this.createPai(pengCards[i]);
                    shoupai_2.x = x;
                    x += shoupai_2.width * shoupai_2.scaleX - 0.75;
                }
                x += 5;
            }
            var gangCards = playerData.gangCards; //card
            // gangCards = [14];
            for (var i = 0; i < gangCards.length; i++) {
                var gangData = gangCards[i];
                for (var j = 1; j <= 4; j++) {
                    if (gangData.gang == 2 || gangData.gang == 4) {
                        if (j == 4) {
                            var card = new eui.Image("mj_paibei_png");
                            card.scaleX = card.scaleY = 0.45;
                            card.x = x + 0.75;
                            card.y = 1;
                            this.paiGroup.addChild(card);
                            x += card.width * card.scaleX - 0.75;
                        }
                        else {
                            var shoupai_3 = this.createPai(gangCards[i].card);
                            shoupai_3.x = x;
                            x += shoupai_3.width * shoupai_3.scaleX - 0.75;
                        }
                    }
                    else {
                        var shoupai_4 = this.createPai(gangCards[i].card);
                        shoupai_4.x = x;
                        x += shoupai_4.width * shoupai_4.scaleX - 0.75;
                    }
                }
                x += 5;
            }
            // return;
            var huaCards = playerData.huaCards; //Number
            // huaCards = [55, 56, 57, 58];
            for (var i = 0; i < huaCards.length; i++) {
                var shoupai_5 = this.createPai(huaCards[i]);
                shoupai_5.x = x;
                x += shoupai_5.width * shoupai_5.scaleX - 0.75;
                // x += 5;
            }
            x += 5;
            // return;
            var handCards = playerData.handCards; //number	
            // handCards = { 12: 2, 13: 3, 14: 2 };
            for (var key in handCards) {
                var handCount = handCards[key];
                for (var i = 0; i < handCount; i++) {
                    var shoupai_6 = this.createPai(Number(key));
                    shoupai_6.x = x;
                    x += shoupai_6.width * shoupai_6.scaleX - 0.75;
                }
            }
            //间隔
            x += 5;
            var huCards = playerData.huCards; //number	
            // huCards = [13];
            var shoupai = this.createPai(huCards[0]);
            shoupai.x = x;
        };
        /**
         * 判断分数正负颜色
         */
        DZMJOverScene.prototype.socreW2L = function (color) {
            if (color < 0) {
                return 0x9EAEEE;
            }
            else {
                return 0xffffff;
            }
        };
        DZMJOverScene.prototype.nextBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var backHall, roomInfo, sceneConfig, betMin, quitResp, data, quitResp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.lockReq) {
                                return [2 /*return*/];
                            }
                            this.lockReq = true;
                            backHall = function () {
                                CF.sN(SceneNotify.CLOSE_DZMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_DZMJ);
                                CF.sN(SceneNotify.OPEN_DZMJ_HALL);
                            };
                            egret.setTimeout(function () {
                                _this.lockReq = false;
                            }, this, 5000);
                            roomInfo = Global.gameProxy.roomInfo;
                            sceneConfig = Global.gameProxy.getSceneConfigByGame(roomInfo.gameId, roomInfo.sceneId);
                            betMin = sceneConfig.gold_min;
                            if (!(Global.playerProxy.playerData.gold <= 0 || Global.playerProxy.playerData.gold < betMin)) return [3 /*break*/, 1];
                            Global.alertMediator.addAlert("金币不足", null, null, true);
                            backHall();
                            return [2 /*return*/];
                        case 1: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 2:
                            quitResp = _a.sent();
                            if (quitResp.gold != undefined && quitResp.gold != null) {
                                Global.playerProxy.playerData.gold = quitResp.gold;
                            }
                            if (!quitResp) return [3 /*break*/, 4];
                            if (quitResp.error && quitResp.error.code != ErrorCode.ROOM_NOT_EXIST) {
                                if (quitResp.error.code != ErrorCode.ROOM_PLAYING) {
                                    backHall();
                                }
                                Global.alertMediator.addAlert(quitResp.error.msg, function () {
                                }, null, true);
                                return [2 /*return*/];
                            }
                            delete Global.gameProxy.lastGameConfig['roomId'];
                            data = _.clone(Global.gameProxy.lastGameConfig);
                            data['isContinue'] = true;
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 3:
                            quitResp1 = _a.sent();
                            if (quitResp1) {
                                CF.sN(SceneNotify.OPEN_DZMJ_MATCHING, Global.gameProxy.lastGameConfig);
                                CF.sN(SceneNotify.CLOSE_DZMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_DZMJ);
                            }
                            else {
                                Global.alertMediator.addAlert("开始失败，请重新开始!", function () {
                                    backHall();
                                }, null, true);
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            Global.alertMediator.addAlert("开始失败，请重新开始!", function () {
                                backHall();
                            }, null, true);
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 点击方法
         */
        DZMJOverScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, quitResp;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e.stopPropagation();
                            _a = e.target;
                            switch (_a) {
                                case this.playBtn: return [3 /*break*/, 1];
                                case this.backBtn: return [3 /*break*/, 2];
                            }
                            return [3 /*break*/, 4];
                        case 1:
                            this.nextBtnTouch();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 3:
                            quitResp = _b.sent();
                            if (quitResp.gold != undefined && quitResp.gold != null) {
                                Global.playerProxy.playerData.gold = quitResp.gold;
                            }
                            Global.gameProxy.clearLastGameConfig();
                            if (quitResp) {
                                CF.sN(SceneNotify.CLOSE_DZMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_DZMJ);
                                CF.sN(SceneNotify.OPEN_DZMJ_HALL);
                            }
                            else {
                                CF.sN(SceneNotify.CLOSE_DZMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_DZMJ);
                                CF.sN(SceneNotify.OPEN_DZMJ_HALL);
                            }
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return DZMJOverScene;
    }(game.BaseComponent));
    majiang.DZMJOverScene = DZMJOverScene;
    __reflect(DZMJOverScene.prototype, "majiang.DZMJOverScene");
})(majiang || (majiang = {}));
