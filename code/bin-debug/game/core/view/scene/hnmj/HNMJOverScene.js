/*
 * @Author: He Bing
 * @Date: 2018-07-06 16:29:49
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-08-23 11:14:04
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
    var HNMJOverScene = (function (_super) {
        __extends(HNMJOverScene, _super);
        function HNMJOverScene(settleData) {
            var _this = _super.call(this) || this;
            _this.currentIndex = 0;
            _this.maxIndex = 0;
            _this.settleData = settleData;
            LogUtils.logDJ(_this.settleData);
            _this.skinName = new HNMJOverSceneSkin();
            return _this;
        }
        HNMJOverScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            Global.runGame = false;
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        HNMJOverScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        HNMJOverScene.prototype.resetPosition = function (e) {
            var data = e.data;
        };
        HNMJOverScene.prototype.showWinPlayerInfos = function (winPlayers) {
            var mineIndex = Global.gameProxy.getMineIndex();
            for (var i = 0; i < winPlayers.length; i++) {
                var winIndex = winPlayers[i];
                var direction = this.directions[winIndex];
                var winPlayerData = this.settleData.players[winIndex];
                //创建一个图片一个倍数
                var item = this["item" + winIndex];
                item.showWinInfo(winPlayerData);
            }
        };
        /**
         * 展示赢家的牌
         */
        HNMJOverScene.prototype.showWinPlayers = function (winPlayerIndex) {
            var winPlayerData = this.settleData.players[winPlayerIndex];
            var index = this.settleData.winPlayer[this.currentIndex];
            var direction = this.directions[index];
            //创建一个图片一个倍数
            var image = new eui.Image(RES.getRes("gdmj_over_hutip_" + direction + "_png"));
            this.huInfoGroup.addChild(image);
            var label = new eui.BitmapLabel(winPlayerData.roundPatternScore + "b");
            label.font = RES.getRes("gdmj_over_count_fnt");
            label.scaleX = label.scaleY = 1.05;
            this.huInfoGroup.addChild(label);
        };
        /**
         * 展示买马的
         */
        HNMJOverScene.prototype.showMaInfos = function () {
            var buyMaInfo = this.settleData.buyMaInfo;
            for (var key in buyMaInfo) {
                var mineData = buyMaInfo[key][0];
                var item = this["item" + key];
                var mineIndex = Number(key);
                item.showMaInfo(buyMaInfo, mineIndex);
            }
        };
        /**
         * 显示玩家名称头像
         */
        HNMJOverScene.prototype.showPlayerInfos = function (index) {
            var playerData = Global.gameProxy.getPlayerByIndex(index);
            var item = this["item" + index];
            item.showPlayerDatas(playerData);
        };
        HNMJOverScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var mineIndex = Global.gameProxy.getMineIndex();
            var item = this["item" + mineIndex];
            item.change2Win();
            this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
            this.huInfoGroup.removeChildren();
            var lossPlayer = this.settleData.lossPlayer || [];
            var winPlayer = this.settleData.winPlayer || [];
            var winFlag = this.settleData.winFlag;
            //赢家
            for (var i = 0; i < winPlayer.length; i++) {
                var winIndex = winPlayer[i];
                var item_1 = this["item" + winIndex];
                for (var j = 0; j < lossPlayer.length; j++) {
                    var loseIndex = lossPlayer[j];
                    var winPlayerData = this.settleData.players[loseIndex];
                    if (item_1.showWinFlag) {
                        item_1.showWinFlag(winFlag, true, winPlayerData.gainGold, loseIndex, winIndex);
                    }
                }
            }
            //输家
            for (var i = 0; i < lossPlayer.length; i++) {
                var loseIndex = lossPlayer[i];
                var item_2 = this["item" + loseIndex];
                for (var j = 0; j < winPlayer.length; j++) {
                    var winPlayerIndex = winPlayer[j];
                    var winPlayerData = this.settleData.players[winPlayerIndex];
                    if (item_2.showWinFlag) {
                        item_2.showWinFlag(winFlag, false, winPlayerData.gainGold, winPlayerIndex, loseIndex);
                    }
                }
            }
            this.showWinPlayerInfos(winPlayer);
            var players = this.settleData.players;
            for (var key in players) {
                var playerData = players[key];
                var item_3 = this["item" + key];
                item_3.showScore(playerData.gainGold);
                item_3.showPlayerBillsByHNMJ(playerData.bills, Number(key), this.settleData);
                this.showPlayerInfos(key);
                if (playerData.isDefeat) {
                    item_3.showDefeat(true);
                }
            }
            // this.showMaInfos();
            this.currentIndex = 0;
            if (winPlayer.length > 0) {
                this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
                this.maxIndex = this.settleData.winPlayer.length;
                this.showPais(this.settleData.players[this.settleData.winPlayer[0]]);
                this.flushBtn.visible = this.maxIndex > 1;
            }
            this.paiGroup.touchChildren = false;
            this.paiGroup.touchThrough = false;
            this.alpha = 0;
            egret.Tween.get(this).to({
                alpha: 1
            }, 1000, egret.Ease.circIn);
        };
        HNMJOverScene.prototype.createPai = function (value) {
            var shoupai = new majiang.GDMJMineShoupai(value);
            shoupai.resetValue(value);
            shoupai.scaleX = shoupai.scaleY = 0.45;
            this.paiGroup.addChild(shoupai);
            return shoupai;
        };
        HNMJOverScene.prototype.showPais = function (playerData) {
            //吃 碰 杠
            var labelText = "";
            var roundPattern = playerData.roundPattern;
            var roundPatternScoreArray = playerData.roundPatternScoreArray;
            for (var i = 0; i < roundPattern.length; i++) {
                labelText += HNMJPattern[roundPattern[i]] + " X" + roundPatternScoreArray[i] + "    ";
            }
            var winFlag = this.settleData.winFlag;
            if (winFlag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
                var winPlayerData = this.settleData.players[this.settleData.winPlayer[0]];
                // if (winPlayerData.isShowZiMo) {
                labelText += " 自摸 X2";
                // }
            }
            this.huInfoLabel.text = labelText;
            var x = 0;
            var pengCards = playerData.pengCards; //number
            for (var i = 0; i < pengCards.length; i++) {
                for (var j = 2; j >= 0; j--) {
                    var shoupai_1 = this.createPai(pengCards[i]);
                    shoupai_1.x = x;
                    x += shoupai_1.width * shoupai_1.scaleX - 0.75;
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
                            var shoupai_2 = this.createPai(gangCards[i].card);
                            shoupai_2.x = x;
                            x += shoupai_2.width * shoupai_2.scaleX - 0.75;
                        }
                    }
                    else {
                        var shoupai_3 = this.createPai(gangCards[i].card);
                        shoupai_3.x = x;
                        x += shoupai_3.width * shoupai_3.scaleX - 0.75;
                    }
                }
                x += 5;
            }
            // return;
            var handCards = playerData.handCards; //number	
            //癞子
            var baoCard = Global.gameProxy.roomInfo.baoCards[0];
            var handCount = handCards[baoCard];
            for (var i = 0; i < handCount; i++) {
                var shoupai_4 = this.createPai(baoCard);
                shoupai_4.x = x;
                x += shoupai_4.width * shoupai_4.scaleX - 0.75;
                shoupai_4.showLaiziImage();
            }
            // handCards = { 12: 2, 13: 3, 14: 2 };
            for (var key in handCards) {
                if (key == baoCard + "") {
                    continue;
                }
                var handCount_1 = handCards[key];
                for (var i = 0; i < handCount_1; i++) {
                    var shoupai_5 = this.createPai(Number(key));
                    shoupai_5.x = x;
                    x += shoupai_5.width * shoupai_5.scaleX - 0.75;
                }
            }
            //间隔
            x += 5;
            var huCards = playerData.huCards; //number	
            // huCards = [13];
            var shoupai = this.createPai(huCards[0]);
            shoupai.showHuImage();
            shoupai.x = x;
            x += shoupai.width * shoupai.scaleX - 0.75 + 5;
            var birdCards = this.settleData.birdCardInfo;
            for (var i = 0; i < birdCards.length; i++) {
                var shoupai_6 = this.createPai(Number(birdCards[i]));
                shoupai_6.x = x;
                x += shoupai_6.width * shoupai_6.scaleX - 0.75;
                shoupai_6.showOtherImageByRes("hnmj_icon_bird_png");
            }
        };
        /**
         * 判断分数正负颜色
         */
        HNMJOverScene.prototype.socreW2L = function (color) {
            if (color < 0) {
                return 0x9EAEEE;
            }
            else {
                return 0xffffff;
            }
        };
        HNMJOverScene.prototype.nextBtnTouch = function () {
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
                                CF.sN(SceneNotify.CLOSE_HNMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_HNMJ);
                                CF.sN(SceneNotify.OPEN_HNMJ_HALL);
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
                            if (quitResp.gold) {
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
                            LogUtils.logD("center_6");
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 3:
                            quitResp1 = _a.sent();
                            if (quitResp1) {
                                CF.sN(SceneNotify.OPEN_HNMJ_MATCHING, Global.gameProxy.lastGameConfig);
                                CF.sN(SceneNotify.CLOSE_HNMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_HNMJ);
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
        HNMJOverScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    e.stopPropagation();
                    switch (e.target) {
                        case this.playBtn://下一局
                            this.nextBtnTouch();
                            break;
                        case this.backBtn://退出
                            // let quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
                            // if (quitResp.gold) {
                            // 	Global.playerProxy.playerData.gold = quitResp.gold;
                            // }
                            // Global.gameProxy.clearLastGameConfig();
                            // if (quitResp) {
                            // 	CF.sN(SceneNotify.CLOSE_HNMJ_OVER);
                            // 	CF.sN(SceneNotify.CLOSE_HNMJ);
                            // 	CF.sN(SceneNotify.OPEN_HNMJ_HALL);
                            // } else {
                            // 	CF.sN(SceneNotify.CLOSE_HNMJ_OVER);
                            // 	CF.sN(SceneNotify.CLOSE_HNMJ);
                            // 	CF.sN(SceneNotify.OPEN_HNMJ_HALL);
                            // }
                            CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
                            CF.sN(SceneNotify.CLOSE_HNMJ_OVER);
                            break;
                        case this.flushBtn:
                            this.showNext();
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        HNMJOverScene.prototype.showNext = function () {
            this.currentIndex++;
            if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = 0;
            }
            this.paiGroup.removeChildren();
            this.huInfoGroup.removeChildren();
            this.showPais(this.settleData.players[this.settleData.winPlayer[this.currentIndex]]);
            this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
        };
        return HNMJOverScene;
    }(game.BaseComponent));
    majiang.HNMJOverScene = HNMJOverScene;
    __reflect(HNMJOverScene.prototype, "majiang.HNMJOverScene");
})(majiang || (majiang = {}));
