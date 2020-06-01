/*
 * @Author: He Bing
 * @Date: 2018-07-06 16:29:49
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-13 17:52:15
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
    var GDMJOverScene = (function (_super) {
        __extends(GDMJOverScene, _super);
        function GDMJOverScene(settleData) {
            var _this = _super.call(this) || this;
            _this.currentIndex = 0;
            _this.maxIndex = 0;
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.CLOSE_GDMJ;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_GDMJ_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_GDMJ_OVER;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_GDMJ_MATCHING;
            _this.settleData = settleData;
            LogUtils.logDJ(_this.settleData);
            _this.skinName = "GDMJOverSceneSkin1";
            return _this;
        }
        GDMJOverScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            Global.runGame = false;
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        GDMJOverScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        GDMJOverScene.prototype.resetPosition = function (e) {
            var data = e.data;
        };
        GDMJOverScene.prototype.showWinPlayerInfos = function (winPlayers) {
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
        GDMJOverScene.prototype.showWinPlayers = function (winPlayerIndex) {
            var winPlayerData = this.settleData.players[winPlayerIndex];
            var index = this.settleData.winPlayer[this.currentIndex];
            var direction = this.directions[index];
            //创建一个图片一个倍数
            var image = new eui.Image(RES.getRes("gdmj_over_hutip_" + direction + "new_png"));
            this.huInfoGroup.addChild(image);
            var label = new eui.BitmapLabel(winPlayerData.roundPatternScore + "b");
            label.font = "gdmj_over_count_new_fnt";
            label.scaleX = label.scaleY = 1.05;
            this.huInfoGroup.addChild(label);
        };
        /**
         * 展示买马的
         */
        GDMJOverScene.prototype.showMaInfos = function () {
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
        GDMJOverScene.prototype.showPlayerInfos = function (index, item) {
            var playerData = Global.gameProxy.getPlayerByIndex(index);
            item.showPlayerDatas(playerData);
        };
        GDMJOverScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //clubnew
            this.isClubGame = Global.gameProxy.roomInfo.tableId != undefined;
            var mineIndex = Global.gameProxy.getMineIndex();
            var item = this["item" + mineIndex];
            this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
            this.huInfoGroup.removeChildren();
            var lossPlayer = this.settleData.lossPlayer || [];
            var winPlayer = this.settleData.winPlayer || [];
            var winFlag = this.settleData.winFlag;
            //赢家
            for (var i = 0; i < winPlayer.length; i++) {
                var playerIndex = winPlayer[i];
                var _direction = this.directions[playerIndex];
                var item_1 = this["item" + _direction];
                for (var j = 0; j < lossPlayer.length; j++) {
                    var loseIndex = lossPlayer[j];
                    var winPlayerData = this.settleData.players[loseIndex];
                    item_1.showWinFlag(winFlag, true, winPlayerData.gainGold, loseIndex, playerIndex);
                }
            }
            //输家
            for (var i = 0; i < lossPlayer.length; i++) {
                var playerIndex = lossPlayer[i];
                var _direction = this.directions[playerIndex];
                var item_2 = this["item" + _direction];
                for (var j = 0; j < winPlayer.length; j++) {
                    var winPlayerIndex = winPlayer[j];
                    var winPlayerData = this.settleData.players[winPlayerIndex];
                    item_2.showWinFlag(winFlag, false, winPlayerData.gainGold, winPlayerIndex, playerIndex);
                }
            }
            this.showWinPlayerInfos(winPlayer);
            var players = this.settleData.players;
            for (var key in players) {
                var playerData = players[key];
                var _direction = this.directions[key];
                var item_3 = this["item" + _direction];
                item_3.showScore(playerData.gainGold);
                if (_direction == "1") {
                    if (playerData.gainGold > 0)
                        item_3.change2Win();
                    item_3.showPlayerBills(playerData.bills, Number(key), this.settleData);
                }
                else {
                    item_3.winBg(playerData.gainGold);
                }
                item_3.setWeiZhiLable(_direction);
                this.showPlayerInfos(key, item_3);
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
        GDMJOverScene.prototype.createPai = function (value) {
            var shoupai = new majiang.GDMJMineShoupai(value);
            shoupai.resetValue(value);
            shoupai.scaleX = shoupai.scaleY = 0.45;
            this.paiGroup.addChild(shoupai);
            return shoupai;
        };
        GDMJOverScene.prototype.showPais = function (playerData) {
            //吃 碰 杠
            var labelText = "";
            var roundPattern = playerData.roundPattern;
            var roundPatternScoreArray = playerData.roundPatternScoreArray;
            for (var i = 0; i < roundPattern.length; i++) {
                labelText += GDMJPattern[roundPattern[i]] + " +" + roundPatternScoreArray[i] + "    ";
            }
            var winFlag = this.settleData.winFlag;
            if (winFlag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
                var winPlayerData = this.settleData.players[this.settleData.winPlayer[0]];
                if (winPlayerData.isShowZiMo) {
                    labelText += " 自摸 X2";
                }
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
        };
        /**获取总的倍数*/
        GDMJOverScene.prototype.getTotalScore = function (bills) {
            var infor;
            var total = 0;
            for (var key in bills) {
                var data = bills[key];
                for (var key in data) {
                    if (key == "info") {
                        infor = data[key];
                        total += infor["score"];
                    }
                }
            }
            return total;
        };
        /**
         * 判断分数正负颜色
         */
        GDMJOverScene.prototype.socreW2L = function (color) {
            if (color < 0) {
                return 0x9EAEEE;
            }
            else {
                return 0xffffff;
            }
        };
        GDMJOverScene.prototype.nextBtnTouch = function () {
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
                                CF.sN(SceneNotify.CLOSE_GDMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_GDMJ);
                                CF.sN(SceneNotify.OPEN_GDMJ_HALL);
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
                                CF.sN(SceneNotify.OPEN_GDMJ_MATCHING, Global.gameProxy.lastGameConfig);
                                CF.sN(SceneNotify.CLOSE_GDMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_GDMJ);
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
        GDMJOverScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    e.stopPropagation();
                    switch (e.target) {
                        case this.playBtn://下一局
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                    CF.sN(_this.GAME_SCENE_NOTIFY);
                                    GDMJClubReadyScene.instance.show(true);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                    CF.sN(_this.GAME_SCENE_NOTIFY);
                                });
                                return [2 /*return*/];
                            }
                            if (this.isClubGame) {
                                this.restartBtnTouch();
                            }
                            else {
                                this.nextBtnTouch();
                            }
                            //=================>
                            //this.nextBtnTouch();
                            break;
                        case this.backBtn://退出
                            CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
                            CF.sN(SceneNotify.CLOSE_GDMJ_OVER);
                            break;
                        case this.flushBtn:
                            this.showNext();
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        GDMJOverScene.prototype.showNext = function () {
            this.currentIndex++;
            if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = 0;
            }
            this.paiGroup.removeChildren();
            this.huInfoGroup.removeChildren();
            this.showPais(this.settleData.players[this.settleData.winPlayer[this.currentIndex]]);
            this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
        };
        return GDMJOverScene;
    }(game.BaseGameScene));
    majiang.GDMJOverScene = GDMJOverScene;
    __reflect(GDMJOverScene.prototype, "majiang.GDMJOverScene");
})(majiang || (majiang = {}));
