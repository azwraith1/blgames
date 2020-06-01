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
var dntg;
(function (dntg) {
    var DNTGScens3 = (function (_super) {
        __extends(DNTGScens3, _super);
        function DNTGScens3() {
            var _this = _super.call(this) || this;
            _this.sendTime = false; //桃子选择条件 true/false
            _this.isFastGame = false;
            _this.freeTimes = 0;
            _this.selelcted = false;
            return _this;
            // this.skinName = new DNTGGameScene3Skin();
        }
        DNTGScens3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.listenOn();
            this.scroller.showFreeFirst(3);
            this.selectPeachAni = DBComponent.create("dntg_selectPeachAni", "freeani");
            // this.selectPeachAni = new DBComponent("freeani");
            this.selectPeachAni.x = 500;
            this.selectPeachAni.y = 120;
            this.resizeGroup.addChild(this.selectPeachAni);
            this.selectPeachAni.visible = false;
            this.peach_0.touchEnabled = this.peach_1.touchEnabled = this.peach_2.touchEnabled = this.peach_3.touchEnabled = false;
        };
        /**
         * @param  {egret.TouchEvent} e
         */
        DNTGScens3.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.peach_0:
                    this.selectPeach(1);
                    break;
                case this.peach_1:
                    this.selectPeach(3);
                    break;
                case this.peach_2:
                    this.selectPeach(2);
                    break;
                case this.peach_3:
                    this.selectPeach(0);
                    break;
            }
        };
        DNTGScens3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.listenOn();
        };
        DNTGScens3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            if (game.LaohuUtils.freeTimes > 0) {
                SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
                egret.clearTimeout(this.freegameTimeout);
            }
            egret.clearTimeout(this.freegameTimeout);
            egret.clearTimeout(this.messageTimeOut);
            this.listenOFF();
            this.scroller.removeScroller();
            this.resizeGroup.removeChildren();
        };
        /**
         * 初始化监听事件
         */
        DNTGScens3.prototype.listenOn = function () {
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.DNTG_ENTER_FREE_GAME_SCENE, this.selectPeachTween, this);
            CF.aE(ENo.DNTG_START_FREE_GAME_SCENE, this.startFreeGame, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
        };
        /**
         * 移除监听事件
         */
        DNTGScens3.prototype.listenOFF = function () {
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.DNTG_ENTER_FREE_GAME_SCENE, this.selectPeachTween, this);
            CF.rE(ENo.DNTG_START_FREE_GAME_SCENE, this.startFreeGame, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
        };
        /**
         * 选择桃子，发送消息
         */
        DNTGScens3.prototype.selectPeachTween = function (e) {
            var _this = this;
            if (!this.sendTime) {
                if (e.data) {
                    this.isFastGame = e.data.isfast;
                }
                this.selectPeachAni.visible = true;
                // this.selectPeachAni = new DBComponent("freeani");
                this.sendTime = true;
                SoundManager.getInstance().playMusic("sactbackground_mus_dntg_mp3");
                this.selectPeachAni.x = 500;
                this.selectPeachAni.y = 120;
                this.setAutoTimeout(function () {
                    _this.selectPeachAni.play("", 1);
                    _this.setAutoTimeout(function () { SoundManager.getInstance().playEffect("freegame1_dntg_mp3"); }, _this, 1600);
                    _this.resizeGroup.addChild(_this.selectPeachAni);
                }, this, 1000);
                this.setAutoTimeout(function () {
                    egret.Tween.get(_this.peach_3)
                        .to({ x: 100 }, 200)
                        .to({ x: 140 }, 200);
                    egret.Tween.get(_this.peach_0)
                        .to({ x: 420 }, 200)
                        .to({ x: 460 }, 200);
                    egret.Tween.get(_this.peach_2)
                        .to({ x: 740 }, 200)
                        .to({ x: 780 }, 200);
                    egret.Tween.get(_this.peach_1)
                        .to({ x: 1060 }, 200)
                        .to({ x: 1100 }, 200).call(function () {
                        egret.Tween.get(_this.peachGroup)
                            .to({ bottom: 180 }, 800, egret.Ease.sineIn)
                            .to({ bottom: 150 }, 150)
                            .to({ bottom: 190 }, 150)
                            .to({ bottom: 185 }, 100)
                            .to({ bottom: 180 }, 100).call(function () {
                            _this.peach_0.touchEnabled = _this.peach_1.touchEnabled = _this.peach_2.touchEnabled = _this.peach_3.touchEnabled = true;
                            _this.selectPeachAni.visible = false;
                            _this.peachTipGroup.visible = true;
                            _this.clickTips0.visible = true;
                            if (game.LaohuUtils.free_time_times == 0) {
                            }
                        });
                    });
                    _this.setAutoTimeout(function () {
                        if (game.LaohuUtils.free_time_times != 0) {
                            if (game.LaohuUtils.free_time_times && game.LaohuUtils.isAutoGame) {
                                switch (game.LaohuUtils.free_time_times) {
                                    case 5:
                                        _this.selectPeach(3);
                                        break;
                                    case 10:
                                        _this.selectPeach(2);
                                        break;
                                    case 15:
                                        _this.selectPeach(1);
                                        break;
                                    case 20:
                                        _this.selectPeach(0);
                                        break;
                                }
                            }
                        }
                    }, _this, 1900);
                }, this, 2500);
            }
        };
        /**
         * 超时未下注请出房间
         */
        DNTGScens3.prototype.kickGame = function () {
            var text = "你已超过5分钟局未下注,请重新进入游戏";
            Global.alertMediator.addAlert(text, function () {
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_DNTG);
                CF.sN(PanelNotify.CLOSE_LAOHU_AUTO_PANEL);
                CF.sN(PanelNotify.CLOSE_LAOHUGAME_TIPS);
                CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            }, "", true);
            return;
        };
        /**
         * 进场后继续免费游戏
         */
        DNTGScens3.prototype.startFreeGame = function () {
            this.freeTimes = game.LaohuUtils.freeTimes;
            this.freemul0.text = game.LaohuUtils.FreeTimeMul[0] + "倍";
            this.freemul1.text = game.LaohuUtils.FreeTimeMul[1] + "倍";
            this.freemul2.text = game.LaohuUtils.FreeTimeMul[2] + "倍";
            if (game.LaohuUtils.freeWin) {
                this.freeWin = game.LaohuUtils.freeWin;
                this.free_total_win0.text = game.LaohuUtils.freeWin + "";
            }
            else {
                this.freeWin = 0;
            }
            this.removeTreeGroup();
        };
        /**
         * 发送selectBonusIndex
         * @param  {number} time
         */
        DNTGScens3.prototype.selectPeach = function (time) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.selelcted) return [3 /*break*/, 2];
                            this.freeTimes = 0;
                            this.selelcted = true;
                            this.freeWin = 0;
                            game.LaohuUtils.freeWin = 0;
                            this.peach_0.touchEnabled = this.peach_1.touchEnabled = this.peach_2.touchEnabled = this.peach_3.touchEnabled = true;
                            SoundManager.getInstance().playEffect("button_dntg_mp3");
                            game.LaohuUtils.FreeTimeMul = [];
                            data2 = { "bonusIndex": time };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_selectBonusGame, data2)];
                        case 1:
                            resp = _a.sent();
                            this.freeTimes = resp.freeGameTimes;
                            this.free_spin_label0.text = this.freeTimes + "";
                            for (i = 0; i < resp.freeGameMuls.length; i++) {
                                game.LaohuUtils.FreeTimeMul.push(resp.freeGameMuls[i]);
                            }
                            //添加桃子移动放大动画
                            switch (time) {
                                case 3:
                                    this.freeGame0.visible = this.freeGame1.visible = this.freeGame2.visible = false;
                                    this.peach_2.visible = this.peach_3.visible = this.peach_0.visible = false;
                                    egret.Tween.get(this.freeGame3).to({ x: 496 }, 500);
                                    egret.Tween.get(this.peach_1).to({ x: 518 }, 500).call(function () {
                                        egret.Tween.get(_this.peach_1).to({ scaleX: 2, scaleY: 2, y: -99 }, 500).call(function () {
                                            _this.setAutoTimeout(function () {
                                                _this.peachGroup.visible = false;
                                                SoundManager.getInstance().playEffect("freegame3_dntg_mp3");
                                                _this.removeTreeGroup();
                                            }, _this, 1000);
                                        });
                                    });
                                    break;
                                case 2:
                                    this.freeGame0.visible = this.freeGame1.visible = this.freeGame3.visible = false;
                                    this.peach_1.visible = this.peach_3.visible = this.peach_0.visible = false;
                                    egret.Tween.get(this.freeGame2).to({ x: 496 }, 500);
                                    egret.Tween.get(this.peach_2).to({ x: 518 }, 500).call(function () {
                                        egret.Tween.get(_this.peach_2).to({ scaleX: 2, scaleY: 2, y: -99 }, 500).call(function () {
                                            _this.setAutoTimeout(function () {
                                                _this.peachGroup.visible = false;
                                                SoundManager.getInstance().playEffect("freegame3_dntg_mp3");
                                                _this.removeTreeGroup();
                                            }, _this, 1000);
                                        });
                                    });
                                    break;
                                case 1:
                                    this.freeGame0.visible = this.freeGame2.visible = this.freeGame3.visible = false;
                                    this.peach_1.visible = this.peach_3.visible = this.peach_2.visible = false;
                                    egret.Tween.get(this.freeGame1).to({ x: 496 }, 500);
                                    egret.Tween.get(this.peach_0).to({ x: 518 }, 500).call(function () {
                                        egret.Tween.get(_this.peach_0).to({ scaleX: 2, scaleY: 2, y: -99 }, 500).call(function () {
                                            _this.setAutoTimeout(function () {
                                                _this.peachGroup.visible = false;
                                                SoundManager.getInstance().playEffect("freegame3_dntg_mp3");
                                                _this.removeTreeGroup();
                                            }, _this, 1000);
                                        });
                                    });
                                    break;
                                case 0:
                                    this.freeGame3.visible = this.freeGame2.visible = this.freeGame1.visible = false;
                                    this.peach_1.visible = this.peach_0.visible = this.peach_2.visible = false;
                                    egret.Tween.get(this.freeGame0).to({ x: 496 }, 500);
                                    egret.Tween.get(this.peach_3).to({ x: 518 }, 500).call(function () {
                                        egret.Tween.get(_this.peach_3).to({ scaleX: 2, scaleY: 2, y: -99 }, 500).call(function () {
                                            _this.setAutoTimeout(function () {
                                                _this.peachGroup.visible = false;
                                                SoundManager.getInstance().playEffect("freegame3_dntg_mp3");
                                                _this.removeTreeGroup();
                                            }, _this, 1000);
                                        });
                                    });
                                    break;
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param  {string} str
         * @param  {number} x?
         * @param  {number} y?
         */
        DNTGScens3.prototype.showAllIcon = function (str, x, y) {
            var scycle = new dragonBones.EgretArmatureDisplay();
            scycle = DBFactory.instance.getDBAsync1(str);
            return scycle;
        };
        /**
         * 入场动画移除
         */
        DNTGScens3.prototype.removeTreeGroup = function () {
            var _this = this;
            this.suijibeishuGroup0.visible = true;
            this.freemul0.text = game.LaohuUtils.FreeTimeMul[0] + "倍";
            this.freemul1.text = game.LaohuUtils.FreeTimeMul[1] + "倍";
            this.freemul2.text = game.LaohuUtils.FreeTimeMul[2] + "倍";
            this.peachGroup.visible = false;
            egret.Tween.get(this.peachTipGroup).to({ visible: false }, 200);
            this.clickTips0.visible = false;
            egret.Tween.get(this.bg0).to({ alpha: 0 }, 800);
            egret.Tween.get(this.treeBg0).to({ alpha: 0 }, 800);
            egret.Tween.get(this.free01imag0).to({ right: -1280 }, 800);
            egret.Tween.get(this.free03imag0).to({ right: -1136 }, 800);
            egret.Tween.get(this.free02imag0).to({ left: -1280 }, 800);
            egret.Tween.get(this.free05imag0).to({ left: -1280 }, 800).call(function () {
                SoundManager.getInstance().playMusic("freespinbackground_mus_dntg_mp3");
                _this.setAutoTimeout(function () {
                    _this.playFreeRound();
                }, _this, 1000);
            });
            ;
            this.bottomCloud0.visible = false;
        };
        /**
         * 发送免费游戏的消息
         */
        DNTGScens3.prototype.connectSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, resp1, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [];
                            this.bonusAtr = [];
                            this.winGold = 0;
                            data2 = { "spinType": 1, "bet": game.LaohuUtils.bet, "multiple": game.LaohuUtils.mul, "lineCount": 243, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_DNTG);
                                SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
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
                            this.freeWin += this.winGold;
                            game.LaohuUtils.ToTalMoney = resp2.own_gold;
                            this.setAutoTimeout(function () {
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
         * 开始播放免费游戏
         */
        DNTGScens3.prototype.playFreeRound = function () {
            var _this = this;
            this.removeLastAni();
            //免费游戏条件判断
            if (this.freeTimes <= 0) {
                this.free_spin_label0.text = 0 + "";
                LogUtils.logD(this.freeTimes + "   freetime");
                this.showTotalwin();
                return;
            }
            this.freeTimes -= 1;
            this.free_spin_label0.text = this.freeTimes + "";
            this.freegameTimeout = egret.setTimeout(function () {
                SoundManager.getInstance().playEffect("reel_dntg_mp3");
                _this.scroller.run();
                _this.connectSend();
            }, this, 500);
            // if (this.isFastGame) {
            // 	this.askAutoGame();
            // }
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            // this.messageTimeOut = this.setAutoTimeout(() => { this.scroller.runResult(this.showAtr); }, this, 300);
        };
        /**
         * 移除上次转动动画
         */
        DNTGScens3.prototype.removeLastAni = function () {
            this.scroller.stopIconDb();
            if (this.winCount && this.winCount.parent) {
                this.winCount.parent.removeChild(this.winCount);
            }
        };
        /**
         * 转动结束
         * @param  {egret.Event} e
         */
        DNTGScens3.prototype.scrollerEnd = function (e) {
            var data = e.data;
            if (data.sceneIndex != 3) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                    SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
                    this.addFreeBonusAni();
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                    break;
            }
        };
        /**
         * 免费游戏连线动画
         */
        DNTGScens3.prototype.addFreeBonusAni = function () {
            var _this = this;
            this.free_total_win0.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
            if (this.winGold > 0) {
                SoundManager.getInstance().playEffect("win_dntg_mp3");
                //判断满足bigwin条件
                if (this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                    this.bigWinPanel = new dntg.DNTGBigwinGroup();
                    this.bigWinPanel.showpanel();
                    this.bigWinPanel.touchEnabled = false;
                    this.setAutoTimeout(function () {
                        _this.bigWinPanel.touchEnabled = true;
                        _this.bigWinPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                    }, this, 1500);
                    this.bigWinPanel.scoreShow(this.winGold, function () {
                        _this.scroller.stopIconDb();
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                        _this.winTimeout = _this.setAutoTimeout(_this.playFreeRound, _this, 1500);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                    var func_1 = function () {
                        if (!_this.bigWinPanel.touchEnabled)
                            return;
                        _this.bigWinPanel.touchEnabled = false;
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        _this.bigWinPanel.stopShowBigWin(function () {
                            _this.scroller.stopIconDb();
                            _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                            egret.clearTimeout(_this.winTimeout);
                            _this.winTimeout = _this.setAutoTimeout(_this.playFreeRound, _this, 2000);
                        });
                    };
                }
                else {
                    this.winCount = new eui.BitmapLabel();
                    this.winCount.font = "dntg_win_gold_fnt";
                    this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                    var data = Number(new Big(this.winGold).mul(100));
                    this.winCount.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.winCount.textAlign = "center";
                    this.winCount.verticalCenter = 0;
                    this.winCount.horizontalCenter = 0;
                    this.scroller.addChild(this.winCount);
                    if (!Global.runBack) {
                        this.freegameTimeout = this.setAutoTimeout(function () {
                            game.UIUtils.removeSelf(_this.winCount);
                            _this.playFreeRound();
                        }, this, 2000);
                    }
                }
                //展示免费游戏中间倍数
                if (this.freeMulIndex == 0) {
                    var free_mul_texiao_1 = this.showAllIcon("back_light1");
                    free_mul_texiao_1.animation.play("", 1);
                    free_mul_texiao_1.x = 300;
                    free_mul_texiao_1.y = 80;
                    this.suijibeishuGroup0.addChild(free_mul_texiao_1);
                    this.suijibeishuGroup0.addChild(this.freemul0);
                    free_mul_texiao_1.addEventListener(egret.Event.COMPLETE, function () {
                        if (free_mul_texiao_1.parent && free_mul_texiao_1) {
                            free_mul_texiao_1.parent.removeChild(free_mul_texiao_1);
                        }
                    }, this);
                    egret.Tween.get(this.freemul0).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
                }
                if (this.freeMulIndex == 1) {
                    var free_mul_texiao_2 = this.showAllIcon("back_light1");
                    free_mul_texiao_2.animation.play("", 1);
                    free_mul_texiao_2.x = 439;
                    free_mul_texiao_2.y = 80;
                    this.suijibeishuGroup0.addChild(free_mul_texiao_2);
                    this.suijibeishuGroup0.addChild(this.freemul1);
                    free_mul_texiao_2.addEventListener(egret.Event.COMPLETE, function () {
                        if (free_mul_texiao_2.parent && free_mul_texiao_2) {
                            free_mul_texiao_2.parent.removeChild(free_mul_texiao_2);
                        }
                    }, this);
                    egret.Tween.get(this.freemul1).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
                }
                if (this.freeMulIndex == 2) {
                    var free_mul_texiao_3 = this.showAllIcon("back_light1");
                    free_mul_texiao_3.animation.play("", 1);
                    free_mul_texiao_3.x = 610;
                    free_mul_texiao_3.y = 80;
                    this.suijibeishuGroup0.addChild(free_mul_texiao_3);
                    this.suijibeishuGroup0.addChild(this.freemul2);
                    free_mul_texiao_3.addEventListener(egret.Event.COMPLETE, function () {
                        if (free_mul_texiao_3.parent && free_mul_texiao_3) {
                            free_mul_texiao_3.parent.removeChild(free_mul_texiao_3);
                        }
                    }, this);
                    egret.Tween.get(this.freemul2).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
                }
            }
            else {
                this.freegameTimeout = this.setAutoTimeout(function () { _this.playFreeRound(); }, this, 1000);
            }
        };
        /**
         * 免费游戏完成，初始化免费场景
         */
        DNTGScens3.prototype.showTotalwin = function () {
            var _this = this;
            var totalGroup = new eui.Group();
            totalGroup.horizontalCenter = 0;
            totalGroup.verticalCenter = 0;
            this.resizeGroup.addChild(totalGroup);
            var totalWin = new eui.Image("dntg_scene3_bg_3_png");
            var winLabel = new eui.Label();
            totalWin.x = 0;
            totalWin.y = 0;
            totalGroup.addChild(totalWin);
            winLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
            winLabel.textColor = 0xd3ad4c;
            winLabel.fontFamily = "PingFang SC Bold";
            winLabel.size = 120;
            winLabel.verticalCenter = 50;
            winLabel.horizontalCenter = 0;
            totalGroup.addChild(winLabel);
            SoundManager.getInstance().playEffect("scatwin_dntg_mp3");
            game.LaohuUtils.freeWin = this.freeWin;
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.auto_times = 0;
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.totoalWinGold = 0;
                game.LaohuUtils.free_time_times = 0;
            }
            if (game.LaohuUtils.oneMax && this.freeWin >= game.LaohuUtils.oneMax) {
                game.LaohuUtils.auto_times = 0;
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.totoalWinGold = 0;
                game.LaohuUtils.free_time_times = 0;
            }
            if (game.LaohuUtils.totalWin && this.freeWin + game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                game.LaohuUtils.auto_times = 0;
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.totoalWinGold = 0;
                game.LaohuUtils.free_time_times = 0;
            }
            this.setAutoTimeout(function () {
                if (totalGroup && totalGroup.parent) {
                    totalGroup.parent.removeChild(totalGroup);
                }
                CF.dP(ENo.DNTG_QUIT_FREE_GAME);
                _this.setAutoTimeout(function () {
                    _this.freeWin = 0;
                    _this.sendTime = false;
                    _this.selelcted = false;
                    _this.bottomCloud0.visible = true;
                    _this.peach_0.touchEnabled = _this.peach_1.touchEnabled = _this.peach_2.touchEnabled = _this.peach_3.touchEnabled = false;
                    _this.suijibeishuGroup0.visible = false;
                    _this.free_total_win0.text = 0 + "";
                    _this.bg0.alpha = 1;
                    _this.treeBg0.alpha = 1;
                    _this.free01imag0.right = 0;
                    _this.free03imag0.right = 0;
                    _this.free02imag0.left = 0;
                    _this.free05imag0.left = 0;
                    _this.peachGroup.y = 0;
                    _this.peachGroup.visible = true;
                    _this.peach_1.scaleX = _this.peach_2.scaleX = _this.peach_0.scaleX = _this.peach_3.scaleX = 1;
                    _this.peach_1.scaleY = _this.peach_2.scaleY = _this.peach_0.scaleY = _this.peach_3.scaleY = 1;
                    _this.peach_1.visible = _this.peach_2.visible = _this.peach_0.visible = _this.peach_3.visible = true;
                    _this.peach_1.y = _this.peach_2.y = _this.peach_3.y = _this.peach_0.y = 0;
                    _this.peachGroup.bottom = 620;
                    _this.peach_3.x = 120;
                    _this.peach_0.x = 440;
                    _this.peach_2.x = 760;
                    _this.peach_1.x = 1080;
                    _this.freeGame3.x = 1019;
                    _this.freeGame0.x = 58.55;
                    _this.freeGame1.x = 399;
                    _this.freeGame2.x = 716.89;
                    _this.freeGame0.visible = _this.freeGame1.visible = _this.freeGame2.visible = _this.freeGame3.visible = true;
                }, _this, 300);
            }, this, 4500);
        };
        DNTGScens3.prototype.askAutoGame = function () {
            var _this = this;
            var slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            this.resizeGroup.addChild(slotTips);
            if (this.isFastGame) {
                egret.clearTimeout(this.freegameTimeout);
            }
            var func = function () {
                // CF.sN(this.AUTOGAME_NOTIFY);
                _this.isFastGame = true;
                game.UIUtils.removeSelf(slotTips);
                _this.freegameTimeout = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("reel_dntg_mp3", true);
                    _this.scroller.run();
                    _this.connectSend();
                }, _this, 500);
            };
            var func2 = function () {
                _this.freegameTimeout = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("reel_dntg_mp3", true);
                    _this.scroller.run();
                    _this.connectSend();
                }, _this, 500);
                game.UIUtils.removeSelf(slotTips);
                slot.SlotAutoTips._instance = null;
            };
            slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            slotTips.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
            slotTips.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
        };
        return DNTGScens3;
    }(game.BaseComponent));
    dntg.DNTGScens3 = DNTGScens3;
    __reflect(DNTGScens3.prototype, "dntg.DNTGScens3");
})(dntg || (dntg = {}));
