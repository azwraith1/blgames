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
// TypeScript file
var sgws;
(function (sgws) {
    var SGWSScene3 = (function (_super) {
        __extends(SGWSScene3, _super);
        function SGWSScene3() {
            var _this = _super.call(this) || this;
            _this.addedFreeTime = 0;
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SGWS;
            _this.AUTOGAME_NOTIFY = PanelNotify.OPEN_SGWS_AUTO_PANEL;
            _this.TIPS_NOTIFY = PanelNotify.OPEN_SGWS_TIPS_PANEL;
            _this.RECORD_NOTIFY = PanelNotify.OPEN_DNTG_RECORD_PANEL;
            _this.SETING_NOTIFY = PanelNotify.OPEN_SETTING;
            _this.QUIT_NOTIFY = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
            _this.lineSmall = "ayls_line1";
            _this.lineMid = "ayls_line2";
            _this.lineBig = "ayls_line3";
            _this.lineHuge = "ayls_line4";
            _this.scrollerFastEffect = "bscs_reel_fast_spin_mp3";
            _this.gameId = "sgws";
            _this.lineAniXArray = [-345, -172, 0, 171, 340];
            _this.lineAniYArray = [347, 204, 60];
            _this.lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
            _this.firstLineX = -490;
            _this.lastLineX = 340;
            _this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            _this.utilsBet = game.LaohuUtils.bet;
            _this.fixpositionY = [40, 40, 20, 20];
            _this.fastEnd = false;
            _this.runningType = 3; //选择类型
            _this.winGold = 0;
            _this.isStopAni = false; //播放stop动画flag
            _this.fastItemIndex = 0;
            _this.eachLineIconIndex = []; //20条线中奖连线中中奖的图标index
            _this.allLine = []; //20线总中奖连线
            _this.lineTime = 1500;
            _this.ownGold = 0; //玩家当前金钱
            _this.smashingReelIndex = 0;
            _this.eliminateTimeout = 0;
            _this.addwin = 0;
            _this.skinName = "SGWSScene3Skin";
            return _this;
        }
        SGWSScene3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.showFreeFirst(3);
            this.initAni();
        };
        SGWSScene3.prototype.initAni = function () {
            // this.smashingAni = DBComponent.create("xcbs_icon_1_long1", "xcbs_icon_1_long");
            this.freeBgAni = DBComponent.create("sgws_freebg_1", "sgws_freebg_1");
            // this.smashKuangAni = DBComponent.create("xcbs_wild_1", "xcbs_wild_1");
            // this.freemulLight = DBComponent.create("xcbs_shine_x", "xcbs_shine_x");
            this.freeBgAni.play("", 0);
            this.freebgGroup.addChild(this.freeBgAni);
            this.freeBgAni.resetPosition();
            this.freeBgAni.horizontalCenter = -40;
            this.freeBgAni.bottom = -280;
        };
        SGWSScene3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.SGWS_START_FREE_GAME, this.startFreeGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
        };
        SGWSScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.SGWS_START_FREE_GAME, this.startFreeGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
        };
        /**
         * 超时未下注请出房间
         */
        SGWSScene3.prototype.kickGame = function () {
            var text = "你已超过5分钟局未下注,请重新进入游戏";
            Global.alertMediator.addAlert(text, function () {
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_SGWS);
                CF.sN(PanelNotify.CLOSE_SGWS_AUTO_PANEL);
                CF.sN(PanelNotify.CLOSE_SGWS_TIPS_PANEL);
                CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            }, "", true);
            return;
        };
        /**
         * 进场后继续免费游戏
         */
        SGWSScene3.prototype.startFreeGame = function (e) {
            var _this = this;
            if (!this.isMessaged) {
                if (e.data) {
                    this.isFastGame = e.data.isfast;
                }
                SoundManager.getInstance().playMusic("sgws_freespinbackground_mus_mp3");
                this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                if (game.LaohuUtils.freeWin) {
                    this.freeWin = game.LaohuUtils.freeWin;
                    this.winNumLabel.text = game.LaohuUtils.freeWin + "";
                }
                else {
                    this.freeWin = 0;
                    this.winNumLabel.text = game.LaohuUtils.freeWin + "";
                }
                egret.setTimeout(function () {
                    _this.playFreeRound();
                    _this.roleAniFuc("sgws_role_appear", 1, function () {
                        _this.roleAniFuc("sgws_role_default", 0);
                    });
                }, this, 1500);
            }
        };
        /**
         * 开始播放免费游戏
         */
        SGWSScene3.prototype.playFreeRound = function () {
            var _this = this;
            this.removeLastAni();
            //免费游戏条件判断
            if (game.LaohuUtils.freeTimes <= 0) {
                this.freeTimesLabel.text = 0 + "";
                LogUtils.logD(game.LaohuUtils.freeTimes + "   freetime");
                game.XCBSUtils.isFreeGame = false;
                this.showToalWin();
                return;
            }
            game.LaohuUtils.freeTimes -= 1;
            this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
            this.freeGameTimeOut = egret.setTimeout(function () {
                SoundManager.getInstance().playEffect("sgws_reelstart_mp3");
                SoundManager.getInstance().playEffect("sgws_reel_mp3");
                _this.scroller.run();
                _this.messageSend();
                egret.setTimeout(function () { _this.isMessaged = false; }, _this, 600);
            }, this, 500);
            // if (this.isFastGame) {
            //     this.askAutoGame();
            // }
        };
        /**
         * c_bet
         */
        SGWSScene3.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, scatternum, i, j, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [[], [], [], [], []];
                            this.bonusAtr = [];
                            this.scatterIcon = 0;
                            this.eachLineScore = [];
                            this.yudiAtr = [];
                            this.allAtr = [];
                            this.scatter = 0;
                            this.allLine = [];
                            this.eachLineIconIndex = [];
                            this.fastItemIndex = 0;
                            this.lineTime = 1500;
                            data2 = { "spinType": 1, "bet": game.LaohuUtils.bet, "multiple": game.LaohuUtils.mul, "lineCount": 0, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_SGWS);
                                SoundManager.getInstance().stopEffectByName("sgws_reel_mp3");
                                return [2 /*return*/];
                            }
                            this.showAtr = this.respShowAtr(resp2.spinRes[resp2.spinRes.length - 1]);
                            this.smashingReelIndex = resp2.smashingReelIndex;
                            this.c_betResp(resp2);
                            if (resp2.isSmashing == 1) {
                                this.lineTime = 5300;
                                SoundManager.getInstance().pauseMusic();
                                SoundManager.getInstance().playEffect("sgws_wildstorm_mus_mp3");
                                this.showSmashingAni();
                                this.messageTimeOut = egret.setTimeout(function () {
                                    _this.scroller.runResult(game.LaohuUtils.showAtrs[0]);
                                    _this.runningType = RUNNING_TYPE.RESULT;
                                }, this, 6000);
                            }
                            else {
                                this.messageTimeOut = egret.setTimeout(function () {
                                    _this.scroller.runResult(game.LaohuUtils.showAtrs[0]);
                                    if (_this.isFastGame) {
                                        _this.scroller.runResultFast();
                                    }
                                }, this, 300);
                                this.runningType = RUNNING_TYPE.RESULT;
                            }
                            this.lineTime = (resp2.spinRes.length - 1) * 3000 + 2000;
                            //是否为scatter
                            if (resp2.sactter == 1) {
                                game.LaohuUtils.isScatter = true;
                                scatternum = 0;
                                this.yudiAtr = [];
                                this.yudiAtr2 = [];
                                for (i = 0; i <= 4; i++) {
                                    for (j = 0; j < this.showAtr[i].length; j++) {
                                        if (this.showAtr[i][j] == 2) {
                                            this.yudiAtr.push(j);
                                            this.yudiAtr2.push(i + 1);
                                        }
                                    }
                                }
                            }
                            //免费游戏情况下累加赢取金额
                            if (game.LaohuUtils.isAutoGame) {
                                game.LaohuUtils.totoalWinGold += this.winGold;
                            }
                            for (i = 0; i < 4; i++) {
                                for (j = 0; j < this.showAtr[i].length; j++) {
                                    //判断前三列几个玉帝
                                    if (this.showAtr[i][j] == 2) {
                                        this.scatterIcon++;
                                        if (this.scatterIcon == 2) {
                                            this.fastItemIndex = i + 2;
                                        }
                                    }
                                }
                            }
                            this.winGold = resp2.winCount;
                            game.LaohuUtils.freeTimes = resp2.freeTimes;
                            this.freeWin += this.winGold;
                            game.LaohuUtils.ToTalMoney = resp2.own_gold;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * 冰球联盟resp处理
        * @param  {} resp
        */
        SGWSScene3.prototype.c_betResp = function (resp) {
            game.LaohuUtils.allAtrs = [];
            game.LaohuUtils.showAtrs = [];
            game.LaohuUtils.winGolds = [];
            for (var i = resp.spinRes.length - 1; i >= 0; i--) {
                var resp1 = resp.spinRes[i];
                this.showAtr = this.respShowAtr(resp1);
                game.LaohuUtils.showAtrs.push(this.showAtr);
                if (resp1.rmIndex) {
                    for (var i_1 in resp1.rmIndex) {
                        this.allAtr.push(resp1.rmIndex[i_1]);
                    }
                }
                game.LaohuUtils.allAtrs.push(this.allAtr);
                this.allAtr = [];
                game.LaohuUtils.winGolds.push(resp1.winGold);
            }
        };
        /**
         *
         * 每次消除完成展示数组
         * @param  {} resp
         */
        SGWSScene3.prototype.respShowAtr = function (resp) {
            var showAtr = [resp.matrix1[0], resp.matrix1[1], resp.matrix1[2], resp.matrix1[3], resp.matrix1[4]];
            return showAtr;
        };
        /**
         * @param  {egret.Event} e
         */
        SGWSScene3.prototype.scrollerEnd = function (e) {
            var _this = this;
            var data = e.data;
            //场景id判断
            if (data.sceneIndex != 3) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    this.isStopLine = false;
                    SoundManager.getInstance().stopEffectByName("sgws_reel_mp3");
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                            egret.setTimeout(function () {
                                _this.removeLastAni();
                            }, this, this.lineTime);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, this.lineTime);
                    }
                    else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, this.lineTime);
                    }
                    this.scroller.sort1();
                    this.addFreeBonusAni();
                    // this.isMessaged = true;
                    this.isMessaged = false;
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
                    break;
            }
        };
        /**
        * 移除之前动画
        */
        SGWSScene3.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.commondi.visible = this.commomScore.visible = false;
                this.commomScore.text = "";
            }
            SoundManager.getInstance().stopEffectByName("sgws_wildstorm_mus_mp3");
            this.scroller.stopIconDb();
            this.smashingReelIndex = 0;
            game.UIUtils.removeSelf(this.smashingAni);
        };
        /**
         * wild风暴特效
         */
        SGWSScene3.prototype.showSmashingAni = function () {
            var _this = this;
            this.smashingAni = DBComponent.create("sgws_icon_2_long", "sgws_icon_2_long");
            this.roleAniFuc("sgws_role_await", 1, function () { _this.roleAniFuc("sgws_role_default", 0); });
            this.playRandomSmashWaitMus();
            egret.setTimeout(function () {
                SoundManager.getInstance().playEffect("sgws_role_shadow_mp3");
                _this.roleAniFuc("sgws_role_clear2", 1, function () {
                    game.UIUtils.removeSelf(_this.roleAni);
                });
            }, this, 1500);
            egret.setTimeout(function () {
                _this.smashingAni.play("", 1);
                SoundManager.getInstance().playEffect("sgws_wildstomswood_mp3");
                _this.scroller.smashHideIcon(_this.smashingReelIndex);
                _this.gameGroup.addChild(_this.smashingAni);
                _this.gameGroup.addChild(_this.commondi);
                _this.gameGroup.addChild(_this.commomScore);
                _this.smashingAni.resetPosition();
                _this.smashingAni.bottom = 230;
                _this.smashingAni.touchEnabled = false;
                _this.smashingAni.horizontalCenter = (_this.smashingReelIndex - 2) * 157 + 10;
                _this.smashingAni.callback = function () {
                    game.UIUtils.removeSelf(_this.smashingAni);
                    _this.smashingAni = new DBComponent("sgws_icon_2_long_g");
                    _this.roleAniFuc("sgws_role_appear", 1, function () {
                        _this.roleAniFuc("sgws_role_default", 0);
                    });
                    _this.gameGroup.addChild(_this.smashingAni);
                    _this.gameGroup.addChild(_this.commondi);
                    _this.gameGroup.addChild(_this.commomScore);
                    _this.smashingAni.play("", 0);
                    _this.smashingAni.resetPosition();
                    _this.smashingAni.bottom = 440;
                    _this.smashingAni.touchEnabled = false;
                    _this.smashingAni.horizontalCenter = (_this.smashingReelIndex - 2) * 157 + 10;
                };
            }, this, 3000);
        };
        /**
         * 中奖消除
         */
        SGWSScene3.prototype.addFreeBonusAni = function () {
            if (this.winGold > 0) {
                this.eachLine();
            }
        };
        SGWSScene3.prototype.eachLine = function () {
            var _this = this;
            if (this.winGold > 0)
                SoundManager.getInstance().playEffect("sgws_win_mp3");
            if (this.winGold && !this.smashingReelIndex) {
                var count_1 = 0;
                async.eachSeries(game.LaohuUtils.allAtrs, function (item, callback) {
                    var count2 = 0;
                    if (game.LaohuUtils.winGolds[count_1] > 0) {
                        _this.commondi.visible = _this.commomScore.visible = true;
                        var data = game.LaohuUtils.winGolds[count_1] * 100;
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    }
                    else {
                        _this.commomScore.text = "";
                        _this.commondi.visible = _this.commomScore.visible = false;
                    }
                    if (_this.scatter != 1)
                        _this.runningType = RUNNING_TYPE.EMPTY;
                    if (count_1 < game.LaohuUtils.allAtrs.length - 1) {
                        _this.showMulAni(count_1);
                        _this.swordAni();
                        egret.setTimeout(function () { SoundManager.getInstance().playEffect("sgws_role_swordlight_mp3"); }, _this, 750);
                        _this.playRandomClearMus();
                        egret.setTimeout(function () {
                            async.eachSeries(item, function (index, callback) {
                                _this.eliminateTimeout = egret.setTimeout(function () {
                                    for (var i = 0; i < index.length; i++) {
                                        _this.scroller["item" + (count2 + 1)].showAni(index[i]);
                                    }
                                    if (count2 < item.length - 1) {
                                        egret.setTimeout(function () {
                                            SoundManager.getInstance().playEffect("sgws_clear_mp3");
                                        }, _this, 710);
                                    }
                                    count2++;
                                    callback && callback();
                                }, _this, 200);
                            }, function () {
                                count2 = 0;
                                egret.clearTimeout(_this.eliminateTimeout);
                            });
                        }, _this, 300);
                        _this.roleAniFuc("sgws_role_clear", 1, function () {
                        });
                    }
                    _this.showIconTimeOut = egret.setTimeout(function () {
                        _this.scroller.eliminateIcons(game.LaohuUtils.allAtrs[count_1], game.LaohuUtils.showAtrs[count_1 + 1]);
                        count_1 += 1;
                        callback && callback();
                    }, _this, 3000);
                    if (item == game.LaohuUtils.allAtrs[game.LaohuUtils.allAtrs.length - 1]) {
                        egret.clearTimeout(_this.showIconTimeOut);
                        callback && callback();
                    }
                }, function () {
                    if (_this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                        egret.setTimeout(_this.showBigwin, _this, 1000);
                    }
                    else {
                        _this.roleAniFuc("sgws_role_default", 0);
                        _this.commomScore.text = "";
                        _this.commondi.visible = _this.commomScore.visible = false;
                        _this.scroller.setIconHui();
                        _this.winNumLabel.text = NumberFormat.handleFloatDecimal(_this.freeWin) + "";
                    }
                    count_1 = 0;
                });
            }
            else if (this.smashingReelIndex) {
                this.playRandomSmashWinMus();
                this.commondi.visible = this.commomScore.visible = true;
                var data = Number(new Big(this.winGold).mul(100));
                this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                this.showIconTimeOut = egret.setTimeout(function () {
                    _this.commondi.visible = _this.commomScore.visible = false;
                    _this.commomScore.text = "";
                }, this, 1500);
                this.scroller.smashingDBani(game.LaohuUtils.allAtrs[0], 1);
                this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
            }
        };
        SGWSScene3.prototype.playRandomClearMus = function () {
            var musIndex = Math.ceil(Math.random() * 2);
            SoundManager.getInstance().playEffect("sgws_role_att" + musIndex + "_mp3");
        };
        SGWSScene3.prototype.playRandomBingwinMus = function () {
            var musIndex = Math.ceil(Math.random() * 2);
            SoundManager.getInstance().playEffect("sgws_role_bigwin" + musIndex + "_mp3");
        };
        SGWSScene3.prototype.playRandomSmashWinMus = function () {
            var musIndex = Math.ceil(Math.random() * 2);
            SoundManager.getInstance().playEffect("sgws_role_laugh" + musIndex + "_mp3");
        };
        SGWSScene3.prototype.playRandomSmashWaitMus = function () {
            var musIndex = Math.ceil(Math.random() * 2);
            SoundManager.getInstance().playEffect("sgws_role_happy" + musIndex + "_mp3");
        };
        /**
         * bigwin
         */
        SGWSScene3.prototype.showBigwin = function () {
            var _this = this;
            //非空判断
            if (this.winGold > 0) {
                this.roleAniFuc("sgws_role_happy", 0);
                this.playRandomBingwinMus();
                egret.clearTimeout(this.freeGameTimeOut);
                if (this.winGold > 0) {
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
                            _this.roleAniFuc("sgws_role_default", 0);
                            _this.winNumLabel.text = NumberFormat.handleFloatDecimal(_this.freeWin) + "";
                            egret.clearTimeout(_this.freeGameTimeOut);
                            _this.freeGameTimeOut = egret.setTimeout(function () {
                                _this.playFreeRound();
                            }, _this, 1500);
                        });
                    };
                    this.bigWinPanel = new sgws.SGWSBigwinPanel();
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
                        _this.roleAniFuc("sgws_role_default", 0);
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        _this.winNumLabel.text = NumberFormat.handleFloatDecimal(_this.freeWin) + "";
                        _this.freeGameTimeOut = egret.setTimeout(_this.playFreeRound, _this, 1500);
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
        };
        SGWSScene3.prototype.showMulAni = function (index) {
            var _this = this;
            var mulImag = new eui.Image();
            if (index == 0) { }
            else if (index == 1) {
                mulImag.source = "sgws_mul_2_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0;
                mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -120, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(function () {
                    var mulAni = _this.creatmulAni(2);
                    mulAni.horizontalCenter = -118;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                });
            }
            else if (index == 2) {
                mulImag.source = "sgws_mul_3_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0;
                mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -60, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(function () {
                    var mulAni = _this.creatmulAni(3);
                    mulAni.horizontalCenter = -60;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                });
            }
            else if (index == 3) {
                mulImag.source = "sgws_mul_4_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0;
                mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -2, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(function () {
                    var mulAni = _this.creatmulAni(4);
                    mulAni.horizontalCenter = -2;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                });
            }
            else if (index == 4) {
                mulImag.source = "sgws_mul_5_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0;
                mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -55, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(function () {
                    var mulAni = _this.creatmulAni(5);
                    mulAni.horizontalCenter = 55;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                });
            }
            else if (index >= 5) {
                mulImag.source = "sgws_mul_10_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0;
                mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -114, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(function () {
                    var mulAni = _this.creatmulAni(10);
                    mulAni.horizontalCenter = 114;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                });
            }
        };
        SGWSScene3.prototype.creatmulAni = function (index) {
            var mulAni = new DBComponent("sgws_freemul_" + index);
            mulAni.play("", 1);
            this["mulGroup"].addChild(mulAni);
            mulAni.resetPosition();
            return mulAni;
        };
        /**
         * 免费游戏结束展示总赢取
         */
        SGWSScene3.prototype.showToalWin = function () {
            var _this = this;
            egret.setTimeout(function () {
                _this.freeTotalWin.text = NumberFormat.handleFloatDecimal(_this.freeWin) + "";
                _this.totalwinGroup.visible = true;
                SoundManager.getInstance().pauseMusic();
                SoundManager.getInstance().playEffect("sgws_freespinend_mus_mp3");
            }, this, 1000);
            egret.setTimeout(function () {
                CF.dP(ENo.SGWS_QUIT_FREE_GAME);
                _this.totalwinGroup.visible = false;
                _this.freeWin = 0;
                _this.winNumLabel.text = 0 + "";
            }, this, 7000);
        };
        /**
         * 忍者角色动画
         * @param  {string} dbname
         * @param  {number} loop
         * @param  {} callback
         */
        SGWSScene3.prototype.roleAniFuc = function (dbname, loop, callback) {
            game.UIUtils.removeSelf(this.roleAni);
            this.roleAni = DBComponent.create(dbname, dbname);
            this.roleAni.play("", loop);
            this.roleAniGroup.addChild(this.roleAni);
            this.roleAni.horizontalCenter = -530;
            this.roleAni.bottom = 100;
            if (dbname == "sgws_role_back") {
                this.roleAni.bottom = -150;
            }
            if (dbname == "sgws_role_clear") {
                this.roleAni.bottom = -580;
            }
            if (dbname == "sgws_role_appear") {
                this.roleAni.bottom = -155;
            }
            this.roleAni.resetPosition();
            if (loop == 1) {
                this.roleAni.callback = function () {
                    callback && callback();
                };
            }
        };
        SGWSScene3.prototype.swordAni = function () {
            var _this = this;
            this.sword = DBComponent.create("sgws_sword_1", "sgws_sword_1");
            // game.UIUtils.removeSelf(this.freeBgAni);
            SoundManager.getInstance().playEffect("sgws_bet_mp3");
            this.sword.play("", 1);
            this.sword.horizontalCenter = -40;
            this.sword.bottom = 260;
            this.freebgGroup.addChild(this.sword);
            this.sword.resetPosition();
            this.sword.callback = function () {
                game.UIUtils.removeSelf(_this.sword);
                // this.freeBgAni.play("", 0);
                // this.freebgGroup.addChild(this.freeBgAni);
                // this.freeBgAni.resetPosition();
                // this.freeBgAni.horizontalCenter = -40;
                // this.freeBgAni.bottom = -280;
            };
        };
        return SGWSScene3;
    }(game.BaseSlotScene3));
    sgws.SGWSScene3 = SGWSScene3;
    __reflect(SGWSScene3.prototype, "sgws.SGWSScene3");
})(sgws || (sgws = {}));
