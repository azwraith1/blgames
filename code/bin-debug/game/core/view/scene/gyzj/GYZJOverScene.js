/*
 * @Author: He Bing
 * @Date: 2018-07-06 16:29:49
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-31 16:22:24
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
    var GYZJOverScene = (function (_super) {
        __extends(GYZJOverScene, _super);
        function GYZJOverScene(settleData) {
            var _this = _super.call(this) || this;
            _this.currentIndex = 0;
            _this.maxIndex = 0;
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.CLOSE_GYZJMJ;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_GYZJMJ_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_GYZJMJ_OVER;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_GYZJ_MATCHING;
            _this.settleData = settleData;
            //this.settleData = this.testJieSuanData;
            _this.skinName = "resource/skins/scene/gyzj/GYZJOverSceneSkin.exml";
            return _this;
        }
        GYZJOverScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            Global.runGame = false;
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        GYZJOverScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        GYZJOverScene.prototype.resetPosition = function (e) {
            var data = e.data;
        };
        GYZJOverScene.prototype.showWinPlayerInfos = function (winPlayers) {
            var mineIndex = Global.gameProxy.getMineIndex();
            for (var i = 0; i < winPlayers.length; i++) {
                var winIndex = winPlayers[i];
                var direction = this.directions[winIndex];
                var winPlayerData = this.settleData.players[winIndex];
                //创建一个图片一个倍数
                var item = this["item" + direction];
                item.showWinInfo(winPlayerData);
            }
        };
        /**
         * 展示赢家的牌
         */
        GYZJOverScene.prototype.showWinPlayers = function (winPlayerIndex) {
            var winPlayerData = this.settleData.players[winPlayerIndex];
            var index = this.settleData.winPlayer[this.currentIndex];
            var direction = this.directions[index];
            //创建一个图片一个倍数
            var image = new eui.Image(RES.getRes("gyzj_over_hutip_" + direction + "_png"));
            this.huInfoGroup.addChild(image);
            // let label = new eui.BitmapLabel(`${winPlayerData.score}b`);
            // label.font = `gyzj_over_font_fnt`;
            // label.scaleX = label.scaleY = 1.05;
            // this.huInfoGroup.addChild(label);
        };
        /**
         * 显示玩家名称头像
         */
        GYZJOverScene.prototype.showPlayerInfos = function (index, item) {
            var playerData = Global.gameProxy.getPlayerByIndex(index);
            item.showPlayerDatas(playerData);
        };
        GYZJOverScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var mineIndex = Global.gameProxy.getMineIndex();
            this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
            this.huInfoGroup.removeChildren();
            var lossPlayer = this.settleData.lossPlayer || [];
            var winPlayer = this.settleData.winPlayer || [];
            var winFlag = this.settleData.winFlag;
            var baotingArr = [];
            this.liuju.visible = winPlayer.length <= 0;
            //赢家
            for (var i = 0; i < winPlayer.length; i++) {
                var playerIndex = winPlayer[i];
                var _direction = this.directions[playerIndex];
                var item = this["item" + _direction];
                //	let item = this[`item${playerIndex}`] as GYZJOverItem;
                var winPlayerData = this.settleData.players[playerIndex];
                var roundScoreRules = winPlayerData.roundScoreRules;
                item.showWinFlag(roundScoreRules, true);
                baotingArr.push(playerIndex);
                if (lossPlayer.length == 1) {
                    for (var j = 0; j < lossPlayer.length; j++) {
                        var loseIndex = lossPlayer[j];
                        var losePlayerData = this.settleData.players[loseIndex];
                        var _direction = this.directions[loseIndex];
                        var loseitem = this["item" + _direction];
                        // let loseitem = this[`item${loseIndex}`] as GYZJOverItem;
                        // loseitem.showWinFlag(["1"]);
                        loseitem.showWinFlag([{ "rule": 1 }]);
                        baotingArr.push(loseIndex);
                    }
                    var difArr = _.difference([1, 2, 3, 4], baotingArr);
                    this.showBaoTingFlag(difArr);
                }
                else {
                    this.showBaoTingFlag(lossPlayer);
                }
            }
            var players = this.settleData.players;
            if (winPlayer.length < 1 && lossPlayer.length < 1) {
                this.showBaoTingFlag([1, 2, 3, 4]);
            }
            this.showWinPlayerInfos(winPlayer);
            for (var key in players) {
                var playerData = players[key];
                var _direction = this.directions[key];
                var item = this["item" + _direction];
                item.showScore(playerData.gainGold);
                item.setBeiShu(playerData.score);
                if (_direction == "1") {
                    item.showPlayerBills(playerData.bills, Number(key), this.settleData, roundScoreRules);
                }
                item.setWeiZhiLable(_direction);
                this.showPlayerInfos(key, item);
                if (playerData.ownGold <= 0) {
                    item.showDefeat(true);
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
            this.group1.alpha = this.group2.alpha = this.group4.alpha = 0;
            egret.Tween.get(this.group1).to({ alpha: 0 }).to({ alpha: 1 }, 500);
            egret.Tween.get(this.group2).wait(200).to({ alpha: 0 }).to({ alpha: 1 }, 500);
            egret.Tween.get(this.group4).wait(600).to({ alpha: 0 }).to({ alpha: 1 }, 500);
        };
        GYZJOverScene.prototype.createPai = function (value) {
            //LogUtils.logD("current value ====" + value);
            var shoupai = new majiang.GDMJMineShoupai(value);
            shoupai.resetValue(value);
            shoupai.maskRect.visible = false;
            shoupai.scaleX = shoupai.scaleY = 0.45;
            this.paiGroup.addChild(shoupai);
            var chicheckCards = this.settleData.chickCards;
            if (chicheckCards) {
                var _index = chicheckCards.indexOf(value);
                //LogUtils.logD("jipai====" + JSON.stringify(chicheckCards));
                if (_index >= 0) {
                    //LogUtils.logD("current index>0 ====" + value);
                    shoupai.setLihight(true);
                    //改变颜色为橙色
                    shoupai.maskRect.fillColor = 0XDD650B;
                }
            }
            return shoupai;
        };
        GYZJOverScene.prototype.showBaoTingFlag = function (data) {
            for (var j = 0; j < data.length; j++) {
                var loseIndex = data[j];
                var losePlayerData = this.settleData.players[loseIndex];
                var _direction = this.directions[loseIndex];
                var loseitem = this["item" + _direction];
                //	let loseitem = this[`item${loseIndex}`] as GYZJOverItem;
                var jiaozui = losePlayerData.isTing;
                //test
                loseitem.chooseBaoTingFlag(jiaozui);
            }
        };
        GYZJOverScene.prototype.showPais = function (playerData) {
            //吃 碰 杠
            var labelText = "";
            var roundPattern = playerData.roundPattern;
            var roundPatternScore = playerData.roundPatternScore;
            var roundScoreRules = playerData.roundScoreRules;
            var isBaoTing = false;
            for (var i = 0; i < roundScoreRules.length; ++i) {
                var _data = roundScoreRules[i];
                var content;
                switch (_data.rule) {
                    case 2:
                        content = "自摸";
                        break;
                    case 105:
                        content = "天胡";
                        break;
                    case 107:
                        content = "地胡";
                        break;
                    case 101:
                        content = "杠上花";
                        break;
                    case 102:
                        content = "热炮";
                        break;
                    case 103:
                        content = " 抢杠胡";
                        break;
                    case 104:
                        if (roundPattern == 1) {
                            isBaoTing = true;
                            content = "平胡(报听)";
                        }
                        else {
                            content = "报听";
                        }
                        break;
                    default:
                        content = "没有这个胡牌类型";
                        break;
                }
                if (_data.rule != 1) {
                    labelText += content + " +" + _data.score + "    ";
                }
            }
            if (roundPattern == 1 && isBaoTing) {
                isBaoTing = false;
            }
            else {
                //	if (roundScoreRules.length == 0) {
                labelText += GYZJMJPattern[roundPattern] + " +" + roundPatternScore + "    ";
                //	}
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
            for (var key in handCards) {
                var handCount = handCards[key];
                for (var i = 0; i < handCount; i++) {
                    var shoupai_4 = this.createPai(Number(key));
                    shoupai_4.x = x;
                    x += shoupai_4.width * shoupai_4.scaleX - 0.75;
                }
            }
            //间隔
            x += 5;
            var huCards = playerData.huCards; //number	
            // huCards = [13];
            var shoupai = this.createPai(huCards[0]);
            shoupai.showHuImage();
            shoupai.x = x;
        };
        /**
         * 判断分数正负颜色
         */
        GYZJOverScene.prototype.socreW2L = function (color) {
            if (color < 0) {
                return 0x9EAEEE;
            }
            else {
                return 0xffffff;
            }
        };
        GYZJOverScene.prototype.showNext = function () {
            this.currentIndex++;
            if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = 0;
            }
            this.paiGroup.removeChildren();
            this.huInfoGroup.removeChildren();
            this.showPais(this.settleData.players[this.settleData.winPlayer[this.currentIndex]]);
            this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
        };
        GYZJOverScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, quitResp;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e.stopPropagation();
                            _a = e.target;
                            switch (_a) {
                                case this.restartBtn: return [3 /*break*/, 1];
                                case this.backBtn: return [3 /*break*/, 2];
                                case this.closeBtn: return [3 /*break*/, 4];
                                case this.flushBtn: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 6];
                        case 1:
                            this.restartBtnTouch();
                            return [3 /*break*/, 6];
                        case 2: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 3:
                            quitResp = _b.sent();
                            if (quitResp.gold != undefined && quitResp.gold != null) {
                                Global.playerProxy.playerData.gold = quitResp.gold;
                            }
                            this.backHall();
                            return [3 /*break*/, 6];
                        case 4:
                            CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
                            CF.sN(this.CLOSE_NOTIFY);
                            return [3 /*break*/, 6];
                        case 5:
                            this.showNext();
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 返回对应游戏大厅
         */
        GYZJOverScene.prototype.backHall = function () {
            CF.sN(this.GAME_SCENE_NOTIFY);
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.HALL_SCENE_NOTIFY);
        };
        /**
         * 返回对应的匹配
         */
        GYZJOverScene.prototype.backMatching = function () {
            CF.sN(this.GAME_SCENE_NOTIFY);
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.MATCHING_SCENE_NOTIFY);
        };
        return GYZJOverScene;
    }(game.BaseGameScene));
    majiang.GYZJOverScene = GYZJOverScene;
    __reflect(GYZJOverScene.prototype, "majiang.GYZJOverScene");
})(majiang || (majiang = {}));
