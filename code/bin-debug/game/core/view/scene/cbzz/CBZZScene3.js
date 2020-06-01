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
 * @Author: wangtao
 * @Date: 2019-05-07 17:48:53
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-20 18:54:12
 * @Description:
 */
var cbzz;
(function (cbzz) {
    var CBZZScene3 = (function (_super) {
        __extends(CBZZScene3, _super);
        function CBZZScene3() {
            var _this = _super.call(this) || this;
            _this.isFastGame = false;
            _this.isSelected = false; //防止重复选择
            _this.isReconnect = true; //判断是否为断线重连
            _this.isMessaged = false; //防止重复发送免费旋转消息
            _this.freeWins = 0; //免费游戏总赢取
            _this.isPlayingMusic = false;
            _this.skinName = new CBZZScene3Skin();
            return _this;
        }
        /**
         * 场景创建
         */
        CBZZScene3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            this.freeBgAni1 = DBComponent.create("freeBgAni", "cbzz_freebg_ani1");
            this.bgAni1 = DBComponent.create("cbzz_bg", "cbzz_bg_ani1");
            this.bgAni1.horizontalCenter = 0;
            this.bgAni1.bottom = 300;
            this.bgAni1.play("", 0);
            this.freeBgAni1.play("", 0);
            this.freeBgAni1.horizontalCenter = 0;
            this.freeBgAni1.bottom = -10;
            this.effectGroup2.addChild(this.freeBgAni1);
            this.effectGroup1.addChild(this.freeBgAni1);
            this.effectGroup1.addChild(this.bgAni1);
            this.bgAni1.resetPosition();
            this.freeBgAni1.touchEnabled = false;
            this.freeMulAni = DBComponent.create("cbfreemulani", "cbzz_freemul_ani");
            this.bonusmouseon = DBComponent.create("cb_bonusmouseon", "cbzz_sle_mouseon");
            this.bonusSelect1 = DBComponent.create("cb_bonusSelect1", "cbzz_sel_bon_ani1");
            this.bonusSelect2 = DBComponent.create("cb_bonusSelect2", "cbzz_sel_bon_ani2");
            this.bonusmouseon.touchEnabled = false;
            this.freeBgAni1.resetPosition();
            this.scroller.showFreeFirst(3);
        };
        /**
         * 场景添加
         */
        CBZZScene3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.CBZZ_ENTER_FREE_GAME, this.enterFreeGame, this);
            CF.aE(ENo.CBZZ_START_FREE_GAME, this.startFreeGame, this);
        };
        /**
         * 场景移除
         */
        CBZZScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.CBZZ_ENTER_FREE_GAME, this.enterFreeGame, this);
            CF.rE(ENo.CBZZ_START_FREE_GAME, this.startFreeGame, this);
            this.resizeGroup.removeChildren();
            this.scroller.removeScroller();
            this.removeEvent();
        };
        /**
         * 添加鼠标悬浮效果
         */
        CBZZScene3.prototype.addMouseOnEvent = function () {
            this.group20.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.add20mouseon, this);
            this.group15.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.add15mouseon, this);
            this.group10.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.add10mouseon, this);
            this.group5.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.add5mouseon, this);
            this.group20.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.add20mouseon2, this);
            this.group15.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.add15mouseon2, this);
            this.group10.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.add10mouseon2, this);
            this.group5.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.add5mouseon2, this);
        };
        CBZZScene3.prototype.removeEvent = function () {
            this.group20.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.add20mouseon, this);
            this.group15.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.add15mouseon, this);
            this.group10.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.add10mouseon, this);
            this.group5.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.add5mouseon, this);
            this.group20.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.add20mouseon2, this);
            this.group15.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.add15mouseon2, this);
            this.group10.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.add10mouseon2, this);
            this.group5.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.add5mouseon2, this);
        };
        /**
         * 添加20次免费游戏鼠标特效
         */
        CBZZScene3.prototype.add20mouseon = function () {
            this.bonusmouseon.play("", 0);
            this.bonusmouseon.horizontalCenter = -5;
            this.bonusmouseon.bottom = 315;
            this.group20.addChild(this.bonusmouseon);
            this.bonusmouseon.resetPosition();
        };
        /**
         * 移除20次免费游戏鼠标特效
         */
        CBZZScene3.prototype.add20mouseon2 = function () {
            game.UIUtils.removeSelf(this.bonusmouseon);
        };
        /**
         * 添加15次免费游戏鼠标特效
         */
        CBZZScene3.prototype.add15mouseon = function () {
            this.bonusmouseon.play("", 0);
            this.bonusmouseon.horizontalCenter = -5;
            this.bonusmouseon.bottom = 315;
            this.group15.addChild(this.bonusmouseon);
            this.bonusmouseon.resetPosition();
        };
        /**
         * 移除15次免费游戏鼠标特效
         */
        CBZZScene3.prototype.add15mouseon2 = function () {
            game.UIUtils.removeSelf(this.bonusmouseon);
        };
        /**
         * 添加10次免费游戏鼠标特效
         */
        CBZZScene3.prototype.add10mouseon = function () {
            this.bonusmouseon.play("", 0);
            this.bonusmouseon.horizontalCenter = -5;
            this.bonusmouseon.bottom = 315;
            this.group10.addChild(this.bonusmouseon);
            this.bonusmouseon.resetPosition();
        };
        /**
         * 移除10次免费游戏鼠标特效
         */
        CBZZScene3.prototype.add10mouseon2 = function () {
            game.UIUtils.removeSelf(this.bonusmouseon);
        };
        /**
         * 添加5次免费游戏鼠标特效
         */
        CBZZScene3.prototype.add5mouseon = function () {
            this.bonusmouseon.play("", 0);
            this.bonusmouseon.horizontalCenter = -5;
            this.bonusmouseon.bottom = 315;
            this.group5.addChild(this.bonusmouseon);
            this.bonusmouseon.resetPosition();
        };
        /**
         * 移除5次免费游戏鼠标特效
         */
        CBZZScene3.prototype.add5mouseon2 = function () {
            game.UIUtils.removeSelf(this.bonusmouseon);
        };
        /**
         * 点击事件
         * @param  {egret.TouchEvent} e
         */
        CBZZScene3.prototype.onTouchTap = function (e) {
            if (game.LaohuUtils.free_time_times != 0) {
                return;
            }
            switch (e.target) {
                case this.group5:
                    this.selectPeachs(3);
                    break;
                case this.group10:
                    this.selectPeachs(2);
                    break;
                case this.group15:
                    this.selectPeachs(1);
                    break;
                case this.group20:
                    this.selectPeachs(0);
                    break;
            }
        };
        /**
         * 进入免费游戏效果
         */
        CBZZScene3.prototype.enterFreeGame = function (e) {
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            SoundManager.getInstance().playMusic("cbzz_seltbackground_mus_mp3");
            if (game.LaohuUtils.free_time_times != 0) {
                switch (game.LaohuUtils.free_time_times + "") {
                    case "20":
                        this.selectPeachs(0);
                        break;
                    case "15":
                        this.selectPeachs(1);
                        break;
                    case "10":
                        this.selectPeachs(2);
                        break;
                    case "5":
                        this.selectPeachs(3);
                        break;
                }
            }
        };
        /**
         * 发送选择桃子index
         * @param  {number} index
         */
        CBZZScene3.prototype.selectPeachs = function (index) {
            return __awaiter(this, void 0, void 0, function () {
                var data2, resp, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.isSelected) return [3 /*break*/, 2];
                            this.isSelected = true;
                            data2 = { "bonusIndex": index };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_selectBonusGame, data2)];
                        case 1:
                            resp = _a.sent();
                            this.freeTimes = resp.freeGameTimes;
                            game.CBZZUtils.freeTimes = this.freeTimes;
                            game.CBZZUtils.freeWin = 0;
                            this.freeTimesLabel.text = this.freeTimes + "";
                            for (i = 0; i < resp.freeGameMuls.length; i++) {
                                game.CBZZUtils.FreeTimeMul.push(resp.freeGameMuls[i]);
                            }
                            this.freeMul1.text = resp.freeGameMuls[0] + "";
                            this.freeMul2.text = resp.freeGameMuls[1] + "";
                            this.freeMul3.text = resp.freeGameMuls[2] + "";
                            this.isReconnect = false;
                            switch (index) {
                                case 0:
                                    this.select20();
                                    break;
                                case 1:
                                    this.select15();
                                    break;
                                case 2:
                                    this.select10();
                                    break;
                                case 3:
                                    this.select5();
                                    break;
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 选择20次免费游戏播放效果
         */
        CBZZScene3.prototype.select20 = function () {
            var _this = this;
            this.bonusSelect1.play("", 1);
            this.bonusSelect2.play("", 0);
            this.bonusSelect2.horizontalCenter = -490;
            this.bonusSelect1.horizontalCenter = -5;
            this.bonusSelect1.bottom = 225;
            this.bonusSelect2.bottom = 200;
            this.group20.addChild(this.bonusSelect1);
            this.bonusSelect1.resetPosition();
            this["effectGroup3"].addChild(this.bonusSelect2);
            this.bonusSelect2.resetPosition();
            SoundManager.getInstance().playEffect("cbzz_freegame3_mp3");
            this.bonusSelect1.callback = function () {
                egret.Tween.get(_this.group15).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
                egret.Tween.get(_this.group10).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
                egret.Tween.get(_this.group5).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
            };
            egret.setTimeout(function () {
                game.UIUtils.removeSelf(_this.bonusSelect2);
                _this.selectGroup.visible = false;
                _this.resizeGroup.addChild(_this.freeWinGroup);
                _this.startFreeGame();
            }, this, 4000);
        };
        /**
         * 选择15次免费游戏播放效果
         */
        CBZZScene3.prototype.select15 = function () {
            var _this = this;
            this.bonusSelect1.play("", 1);
            this.bonusSelect2.play("", 0);
            this.bonusSelect2.horizontalCenter = -170;
            this.bonusSelect1.horizontalCenter = -5;
            this.bonusSelect1.bottom = 225;
            this.bonusSelect2.bottom = 200;
            this.group15.addChild(this.bonusSelect1);
            this.bonusSelect1.resetPosition();
            this["effectGroup3"].addChild(this.bonusSelect2);
            SoundManager.getInstance().playEffect("cbzz_freegame3_mp3");
            this.bonusSelect2.resetPosition();
            this.bonusSelect1.callback = function () {
                egret.Tween.get(_this.group20).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
                egret.Tween.get(_this.group10).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
                egret.Tween.get(_this.group5).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
            };
            egret.setTimeout(function () {
                game.UIUtils.removeSelf(_this.bonusSelect2);
                _this.selectGroup.visible = false;
                _this.resizeGroup.addChild(_this.freeWinGroup);
                _this.startFreeGame();
            }, this, 4000);
        };
        /**
         * 选择10次免费游戏播放效果
         */
        CBZZScene3.prototype.select10 = function () {
            var _this = this;
            this.bonusSelect1.play("", 1);
            this.bonusSelect2.play("", 0);
            this.bonusSelect2.horizontalCenter = 155;
            this.bonusSelect1.horizontalCenter = -5;
            this.bonusSelect1.bottom = 225;
            this.bonusSelect2.bottom = 200;
            this.group10.addChild(this.bonusSelect1);
            this.bonusSelect1.resetPosition();
            this["effectGroup3"].addChild(this.bonusSelect2);
            this.bonusSelect2.resetPosition();
            SoundManager.getInstance().playEffect("cbzz_freegame3_mp3");
            this.bonusSelect1.callback = function () {
                egret.Tween.get(_this.group15).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
                egret.Tween.get(_this.group20).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
                egret.Tween.get(_this.group5).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
            };
            egret.setTimeout(function () {
                game.UIUtils.removeSelf(_this.bonusSelect2);
                _this.selectGroup.visible = false;
                _this.resizeGroup.addChild(_this.freeWinGroup);
                _this.startFreeGame();
            }, this, 4000);
        };
        /**
         * 选择5次免费游戏播放效果
         */
        CBZZScene3.prototype.select5 = function () {
            var _this = this;
            this.bonusSelect1.play("", 1);
            this.bonusSelect2.play("", 0);
            this.bonusSelect2.horizontalCenter = 470;
            this.bonusSelect1.horizontalCenter = -5;
            this.bonusSelect1.bottom = 225;
            this.bonusSelect2.bottom = 200;
            this.group5.addChild(this.bonusSelect1);
            this.bonusSelect1.resetPosition();
            this["effectGroup3"].addChild(this.bonusSelect2);
            this.bonusSelect2.resetPosition();
            SoundManager.getInstance().playEffect("cbzz_freegame3_mp3");
            this.bonusSelect1.callback = function () {
                egret.Tween.get(_this.group15).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
                egret.Tween.get(_this.group10).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
                egret.Tween.get(_this.group20).to({ top: -(GameConfig.CURRENT_HEIGHT), bottom: GameConfig.CURRENT_HEIGHT }, 200);
            };
            egret.setTimeout(function () {
                game.UIUtils.removeSelf(_this.bonusSelect2);
                _this.selectGroup.visible = false;
                _this.resizeGroup.addChild(_this.freeWinGroup);
                _this.startFreeGame();
            }, this, 4000);
        };
        /**
         * 移除选择动画和重连直接开始游戏的动画
         */
        CBZZScene3.prototype.startFreeGame = function () {
            SoundManager.getInstance().playMusic("cbzz_freespinbackground_mus_mp3");
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            if (!this.isReconnect) {
                egret.setTimeout(this.playFreeGame, this, 1500);
            }
            else {
                this.freeMul1.text = game.CBZZUtils.FreeTimeMul[0] + "";
                this.freeMul2.text = game.CBZZUtils.FreeTimeMul[1] + "";
                this.freeMul3.text = game.CBZZUtils.FreeTimeMul[2] + "";
                this.freeWins = game.LaohuUtils.freeWin;
                this.freeWin.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                this.freeTimes = game.LaohuUtils.freeTimes;
                this.freeTimesLabel.text = this.freeTimes + "";
                this.selectGroup.visible = false;
                egret.setTimeout(this.playFreeGame, this, 1500);
            }
        };
        /**
         * 移除上次旋转动画
         */
        CBZZScene3.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.lineScoreGroup.visible = false;
                this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
            }
            this.scroller.stopIconDb();
        };
        /**
         * 免费游戏旋转，次数判断
         */
        CBZZScene3.prototype.playFreeGame = function () {
            var _this = this;
            //防止重复发消息
            if (!this.isMessaged) {
                this.removeLastAni();
                if (this.freeTimes <= 0) {
                    this.freeTimesLabel.text = 0 + "";
                    LogUtils.logD(this.freeTimes + "   freetime");
                    this.showTotalwin();
                    return;
                }
                this.isMessaged = true;
                this.freeTimes -= 1;
                this.freeTimesLabel.text = this.freeTimes + "";
                this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("cbzz_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                    egret.setTimeout(function () { _this.isMessaged = false; }, _this, 600);
                }, this, 500);
                // if (this.isFastGame) {
                //     this.askAutoGame();
                // }
            }
        };
        /**
         * 发送免费游戏旋转消息
         */
        CBZZScene3.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, resp1, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [];
                            this.bonusAtr = [];
                            this.winGold = 0;
                            data2 = { "spinType": 1, "bet": game.CBZZUtils.bet, "multiple": game.CBZZUtils.mul, "lineCount": 243, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_CBZZ);
                                SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
                                return [2 /*return*/];
                            }
                            resp1 = resp2.spinRes[0];
                            if (resp1.rmIndex) {
                                for (i in resp1.rmIndex) {
                                    this.bonusAtr.push(resp1.rmIndex[i]);
                                }
                            }
                            else {
                                this.bonusAtr = [];
                            }
                            this.winGold = resp2.winCount;
                            this.freeMulIndex = resp1.freeMulIndex;
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
                            this.freeWins += this.winGold;
                            game.CBZZUtils.ToTalMoney = resp2.own_gold;
                            egret.setTimeout(function () {
                                _this.scroller.runResult(_this.showAtr);
                                if (_this.isFastGame) {
                                    _this.scroller.runResultFast();
                                }
                            }, this, 300);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 各个转轴结束监听
         * @param  {egret.Event} e
         */
        CBZZScene3.prototype.scrollerEnd = function (e) {
            var _this = this;
            var data = e.data;
            //场景id判断
            if (data.sceneIndex != 3) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
                    SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) * 15)
                            egret.setTimeout(function () { _this.lineScoreGroup.visible = false; _this.removeLastAni(); }, this, 1600);
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 2000);
                    }
                    else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 1000);
                    }
                    this.addFreeBonusAni();
                    this.freeWin.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                    break;
            }
        };
        /**
         * 免费游戏中奖连线
         */
        CBZZScene3.prototype.addFreeBonusAni = function () {
            var _this = this;
            //判断是否为bigwin
            if (this.winGold >= (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) * 15) {
                egret.clearTimeout(this.freeGameTimeOut);
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    var func_1 = function () {
                        if (!_this.bigWinPanel.touchEnabled)
                            return;
                        _this.bigWinPanel.touchEnabled = false;
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        /**
                         * bigwin结束窗口效果
                         */
                        _this.bigWinPanel.stopShowBigWin(function () {
                            _this.scroller.stopIconDb();
                            _this.scroller.setIconHui();
                            _this.scroller.removeIconHui(_this.bonusAtr);
                            _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                            _this.addTittleMul();
                            egret.clearTimeout(_this.freeGameTimeOut);
                            _this.freeGameTimeOut = egret.setTimeout(function () {
                                _this.playFreeGame();
                            }, _this, 2000);
                        });
                    };
                    this.bigWinPanel = new cbzz.CBZZBigwinGroup();
                    this.bigWinPanel.touchEnabled = false;
                    egret.setTimeout(function () {
                        _this.bigWinPanel.touchEnabled = true;
                        _this.bigWinPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                    }, this, 1500);
                    /**
                     * bigwin窗口
                     * @param score,callback?
                     */
                    this.bigWinPanel.showScore(this.winGold, function () {
                        _this.scroller.setIconHui();
                        _this.scroller.removeIconHui(_this.bonusAtr);
                        _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                        _this.addTittleMul();
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        _this.freeGameTimeOut = egret.setTimeout(_this.playFreeGame, _this, 1710);
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            else if (this.bonusAtr.length > 0 && this.winGold > 0) {
                SoundManager.getInstance().playEffect("cbzz_win_mp3");
                this.scroller.setIconHui();
                this.scroller.removeIconHui(this.bonusAtr);
                this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                var data = Number(new Big(this.winGold).mul(100));
                this.lineNum.text = NumberFormat.handleFloatDecimal(data) + "";
                this.lineScoreGroup.visible = true;
                this.addTittleMul();
            }
            // }
        };
        /**
         * 提出的免费游戏倍数特效
         */
        CBZZScene3.prototype.addTittleMul = function () {
            var _this = this;
            if (this.winGold > 0) {
                if (this.freeMulIndex == 0) {
                    this.freeMulAni.horizontalCenter = -230;
                    this.freeMulAni.bottom = -50;
                    this.freeMulAni.play("", 3);
                    this.freeMulAni.callback = function () {
                        game.UIUtils.removeSelf(_this.freeMulAni);
                    };
                    this.freeMulGroup.addChild(this.freeMulAni);
                    this.freeMulAni.resetPosition();
                    this.freeMulGroup.addChild(this.freeMulbei1);
                    this.freeMulGroup.addChild(this.freeMul1);
                    egret.Tween.get(this.freeMulbei1).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                    egret.Tween.get(this.freeMul1).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                }
                else if (this.freeMulIndex == 1) {
                    this.freeMulAni.horizontalCenter = 0;
                    this.freeMulAni.play("", 3);
                    this.freeMulAni.bottom = -50;
                    this.freeMulAni.callback = function () {
                        game.UIUtils.removeSelf(_this.freeMulAni);
                    };
                    this.freeMulGroup.addChild(this.freeMulAni);
                    this.freeMulAni.resetPosition();
                    this.freeMulGroup.addChild(this.freeMulbei2);
                    this.freeMulGroup.addChild(this.freeMul2);
                    egret.Tween.get(this.freeMulbei2).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                    egret.Tween.get(this.freeMul2).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                }
                else if (this.freeMulIndex == 2) {
                    this.freeMulAni.horizontalCenter = 230;
                    this.freeMulAni.play("", 3);
                    this.freeMulAni.bottom = -50;
                    this.freeMulAni.callback = function () {
                        game.UIUtils.removeSelf(_this.freeMulAni);
                    };
                    this.freeMulGroup.addChild(this.freeMulAni);
                    this.freeMulAni.resetPosition();
                    this.freeMulGroup.addChild(this.freeMulbei3);
                    this.freeMulGroup.addChild(this.freeMul3);
                    egret.Tween.get(this.freeMulbei3).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                    egret.Tween.get(this.freeMul3).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                }
            }
        };
        /**
         * 免费游戏结束，初始化免费游戏场景
         */
        CBZZScene3.prototype.showTotalwin = function () {
            var _this = this;
            this.group5.top = this.group20.top = this.group10.top = this.group15.top = 0;
            this.group5.bottom = this.group20.bottom = this.group10.bottom = this.group15.bottom = 0;
            this.isSelected = false;
            this.totalgroup.visible = true;
            this.resizeGroup.addChild(this.totalgroup);
            this.freeGroup.addChild(this.freeWinGroup);
            game.CBZZUtils.freeWin = this.freeWins;
            this.totalWin.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playEffect("cbzz_scatwin_mp3");
            egret.setTimeout(function () {
                //恢复背景音乐
                SoundManager.getInstance().remuseMusic();
                _this.freeWins = 0;
                _this.freeWin.text = 0 + "";
                CF.dP(ENo.CBZZ_QUIT_FREE_GAME);
                _this.selectGroup.visible = true;
                _this.totalgroup.visible = false;
            }, this, 8000);
        };
        CBZZScene3.prototype.askAutoGame = function () {
            var _this = this;
            var slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            this.resizeGroup.addChild(slotTips);
            if (this.isFastGame) {
                egret.clearTimeout(this.freeGameTimeOut);
            }
            var func = function () {
                // CF.sN(this.AUTOGAME_NOTIFY);
                _this.isFastGame = true;
                game.UIUtils.removeSelf(slotTips);
                _this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("cbzz_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                }, _this, 500);
            };
            var func2 = function () {
                _this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("cbzz_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                }, _this, 500);
                game.UIUtils.removeSelf(slotTips);
                slot.SlotAutoTips._instance = null;
            };
            slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            slotTips.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
            slotTips.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
        };
        return CBZZScene3;
    }(game.BaseScene));
    cbzz.CBZZScene3 = CBZZScene3;
    __reflect(CBZZScene3.prototype, "cbzz.CBZZScene3");
})(cbzz || (cbzz = {}));
