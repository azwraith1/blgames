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
 * @Author: real MC Lee
 * @Date: 2019-06-04 16:24:30
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-04 13:59:12
 * @Description:
 */
var bskg;
(function (bskg) {
    var BSKGScene3 = (function (_super) {
        __extends(BSKGScene3, _super);
        function BSKGScene3() {
            var _this = _super.call(this) || this;
            _this.isFastGame = false;
            _this.isMessaged = false; //防止重复发送免费旋转消息
            _this.freeWins = 0; //免费游戏总赢取
            _this.commomScore = new eui.BitmapLabel();
            _this.skinName = "BSKGScene3Skin";
            return _this;
        }
        BSKGScene3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.showFreeFirst(3);
            this.initAni();
        };
        BSKGScene3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.BSKG_START_FREE_GAME, this.startFreeGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
        };
        BSKGScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.BSKG_START_FREE_GAME, this.startFreeGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
        };
        /**
         * 初始化免费场景特效缓存
         */
        BSKGScene3.prototype.initAni = function () {
            game.BSKGUtils.bskgDust1 = DBComponent.create("bskg_dust1", "bskg_dust_1");
            game.BSKGUtils.bskgDust2 = DBComponent.create("bskg_dust2", "bskg_dust_2");
            game.BSKGUtils.bskgDust1.horizontalCenter = 0;
            game.BSKGUtils.bskgDust1.bottom = 150;
            game.BSKGUtils.bskgDust2.horizontalCenter = 0;
            game.BSKGUtils.bskgDust2.bottom = 200;
            game.BSKGUtils.bskgDust1.touchEnabled = game.BSKGUtils.bskgDust2.touchEnabled = false;
            this.bskgFreeBgAni = DBComponent.create("bskg_bskgFreeBgAni", "bskg_freebgani");
            this.bskgFreeBgAni.play("", 0);
            this.bskgFreeBgAni.horizontalCenter = 0;
            this.bskgFreeBgAni.bottom = 280;
            this.effectGroup.addChild(this.bskgFreeBgAni);
            this.bskgFreeBgAni.resetPosition();
        };
        /**
         * 准备开始免费游戏
         */
        BSKGScene3.prototype.startFreeGame = function (e) {
            var _this = this;
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            SoundManager.getInstance().playMusic("bskg_freespinbackground_mus_mp3");
            game.BSKGUtils.bskgRoleAni1.play("", 0);
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            this.freeWins = game.LaohuUtils.freeWin;
            this.freeWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            game.BSKGUtils.bskgRoleAni1.horizontalCenter = game.BSKGUtils.bskgRoleAni1.bottom = 0;
            this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni1);
            game.BSKGUtils.bskgRoleAni1.resetPosition();
            egret.setTimeout(function () {
                _this.playFreeGame();
            }, this, 2000);
        };
        /**
         * 上次中奖效果移除
         */
        BSKGScene3.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.freeMulGroup0.top = -85;
                this.lineScoreGroup.visible = false;
                this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
            }
            this.scroller.stopIconDb();
        };
        /**
         * 免费游戏旋转，次数判断
         */
        BSKGScene3.prototype.playFreeGame = function () {
            var _this = this;
            //防止重复发消息
            if (!this.isMessaged) {
                this.scroller.showIconBg();
                this.removeLastAni();
                if (game.BSKGUtils.freeTimes <= 0) {
                    this.freeTimesLabel.text = 0 + "";
                    LogUtils.logD(game.BSKGUtils.freeTimes + "   freetime");
                    this.showTotalwin();
                    return;
                }
                this.isMessaged = true;
                game.BSKGUtils.freeTimes -= 1;
                this.freeTimesLabel.text = game.BSKGUtils.freeTimes + "";
                this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("bskg_reel_mp3", true);
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
        BSKGScene3.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, resp1, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [];
                            this.bonusAtr = [];
                            this.winGold = 0;
                            data2 = { "spinType": 1, "bet": game.BSKGUtils.bet, "multiple": game.BSKGUtils.mul, "lineCount": 243, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_BSKG);
                                SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
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
                            this.freeMulBei = resp1.freeMul;
                            game.BSKGUtils.ToTalMoney = resp2.own_gold;
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
        BSKGScene3.prototype.scrollerEnd = function (e) {
            var data = e.data;
            //场景id判断
            if (data.sceneIndex != 3) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 15) {
                            // egret.setTimeout(() => { this.lineScoreGroup.visible = false; this.removeLastAni(); }, this, 1600);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 3500);
                    }
                    else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 1000);
                    }
                    this.addFreeBonusAni();
                    this.freeWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
            }
        };
        /**
         * 免费游戏中奖连线
         */
        BSKGScene3.prototype.addFreeBonusAni = function () {
            var _this = this;
            //判断是否为bigwin
            if (this.winGold >= (game.BSKGUtils.bet * game.BSKGUtils.mul * 50) * 15) {
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
                            game.BSKGUtils.screamLittleShake(_this.shakeGroup);
                            game.BSKGUtils.bskgDust1.play("", 1);
                            _this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                            game.BSKGUtils.bskgDust1.resetPosition();
                            SoundManager.getInstance().playEffect("bskg_bom_mp3");
                            game.BSKGUtils.bskgRoleAni1.visible = false;
                            game.BSKGUtils.bskgRoleAni1.visible = true;
                            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);
                            egret.clearTimeout(_this.freeGameTimeOut);
                            _this.freeGameTimeOut = egret.setTimeout(function () {
                                _this.playFreeGame();
                            }, _this, 3500);
                        });
                    };
                    this.bigWinPanel = new bskg.BSKGBigwinPanel();
                    // let i;
                    // i = Math.floor(Math.random() * 2);
                    SoundManager.getInstance().playEffect("bskg_role_cheer1_mp3");
                    game.BSKGUtils.bskgRoleAni3.play("", 0);
                    this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni3);
                    game.BSKGUtils.bskgRoleAni1.visible = false;
                    game.BSKGUtils.bskgRoleAni3.resetPosition();
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
                        game.BSKGUtils.screamLittleShake(_this.shakeGroup);
                        game.BSKGUtils.bskgDust1.play("", 1);
                        _this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                        game.BSKGUtils.bskgDust1.resetPosition();
                        SoundManager.getInstance().playEffect("bskg_bom_mp3");
                        _this.scroller.removeIconHui(_this.bonusAtr);
                        _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                        _this.addTittleMul();
                        game.BSKGUtils.bskgRoleAni1.visible = true;
                        game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);
                        _this.freeGameTimeOut = egret.setTimeout(_this.playFreeGame, _this, 3410);
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            else if (this.bonusAtr.length > 0 && this.winGold > 0) {
                SoundManager.getInstance().playEffect("bskg_win_mp3");
                game.BSKGUtils.screamLittleShake(this.shakeGroup);
                game.BSKGUtils.bskgDust1.play("", 1);
                this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                game.BSKGUtils.bskgDust1.resetPosition();
                SoundManager.getInstance().playEffect("bskg_bom_mp3");
                this.scroller.setIconHui();
                this.scroller.removeIconHui(this.bonusAtr);
                this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                var data = Number(new Big(this.winGold).mul(100));
                this.lineNum.text = NumberFormat.handleFloatDecimal(data) + "";
                this.lineScoreGroup.visible = true;
                game.BSKGUtils.bskgRoleAni1.visible = false;
                game.BSKGUtils.bskgRoleAni2.play("", 1);
                var i_1;
                i_1 = Math.ceil(Math.random() * 2);
                egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("bskg_role_win" + i_1 + "_mp3");
                }, this, 800);
                this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni2);
                game.BSKGUtils.bskgRoleAni2.resetPosition();
                game.BSKGUtils.bskgRoleAni2.callback = function () {
                    game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni2);
                    game.BSKGUtils.bskgRoleAni1.visible = true;
                };
                this.addTittleMul();
            }
            // }
        };
        /**
         * 中奖倍数
         */
        BSKGScene3.prototype.addTittleMul = function () {
            this.bei.text = this.freeMulBei + "倍";
            egret.Tween.get(this.freeMulGroup0).to({ top: 25 }, 100).to({ top: 0 }, 80).to({ top: 15 }, 40).to({ top: 0 }, 10);
        };
        /**
        * 免费游戏结束，初始化免费游戏场景
        */
        BSKGScene3.prototype.showTotalwin = function () {
            var _this = this;
            this.totalWinGroup.visible = true;
            this.totalWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            game.LaohuUtils.totoalWinGold = this.freeWins;
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playEffect("bskg_free_win_mp3");
            // SoundManager.getInstance().playEffect("bskg_role_freenend_mp3");
            egret.setTimeout(function () {
                _this.freeWins = 0;
                SoundManager.getInstance().remuseMusic();
                _this.totalWinLabel.text = 0 + "";
                _this.freeWinGroup.visible = false;
                _this.totalWinGroup.visible = false;
                _this.freeWinLabel.text = 0 + "";
                CF.dP(ENo.BSKG_QUIT_FREE_GAME);
            }, this, 5000);
        };
        BSKGScene3.prototype.askAutoGame = function () {
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
                    SoundManager.getInstance().playEffect("bskg_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                }, _this, 500);
            };
            var func2 = function () {
                _this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("bskg_reel_mp3", true);
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
        return BSKGScene3;
    }(game.BaseScene));
    bskg.BSKGScene3 = BSKGScene3;
    __reflect(BSKGScene3.prototype, "bskg.BSKGScene3");
})(bskg || (bskg = {}));
