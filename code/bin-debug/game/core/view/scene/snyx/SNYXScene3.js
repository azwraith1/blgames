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
var snyx;
(function (snyx) {
    var SNYXScene3 = (function (_super) {
        __extends(SNYXScene3, _super);
        function SNYXScene3() {
            var _this = _super.call(this) || this;
            _this.addedFreeTime = 0;
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SNYX;
            _this.AUTOGAME_NOTIFY = PanelNotify.OPEN_SNYX_AUTO_PANEL;
            _this.TIPS_NOTIFY = PanelNotify.OPEN_SNYX_TIPS_PANEL;
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
            _this.reconnectArray = [];
            _this.fastEnd = false;
            _this.runningType = 3; //选择类型
            _this.winGold = 0;
            _this.isStopAni = false; //播放stop动画flag
            _this.fastItemIndex = 0;
            _this.eachLineIconIndex = []; //20条线中奖连线中中奖的图标index
            _this.allLine = []; //20线总中奖连线
            _this.lineTime = 1500;
            _this.ownGold = 0; //玩家当前金钱
            _this.scatterNum = 0;
            _this.lastSmahs = 0;
            _this.skinName = "SNYXScene3Skin";
            return _this;
        }
        SNYXScene3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.showFreeFirst(3);
            this.initAni();
        };
        SNYXScene3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.SNYX_START_FREE_GAME, this.startFreeGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
        };
        SNYXScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.SNYX_START_FREE_GAME, this.startFreeGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
        };
        /**
         * 超时未下注请出房间
         */
        SNYXScene3.prototype.kickGame = function () {
            var text = "你已超过5分钟局未下注,请重新进入游戏";
            Global.alertMediator.addAlert(text, function () {
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_SNYX);
                CF.sN(PanelNotify.CLOSE_SNYX_AUTO_PANEL);
                CF.sN(PanelNotify.CLOSE_SNYX_TIPS_PANEL);
                CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            }, "", true);
            return;
        };
        SNYXScene3.prototype.initAni = function () {
            this.freeBgAni = DBComponent.create("snyx_bg03", "snyx_bg03");
            this.freeBgAni.play("", 0);
            this.freeBgAni.bottom = 27;
            this.freeBgAni.horizontalCenter = 0;
            this.resizeGroup.addChild(this.freeBgAni);
            this.freeBgAni.resetPosition();
        };
        /**
        * 进场后继续免费游戏
        */
        SNYXScene3.prototype.startFreeGame = function (e) {
            var _this = this;
            if (!this.isMessaged) {
                if (e.data) {
                    this.isFastGame = e.data.isfast;
                    if (e.data.atr)
                        this.reconnectArray = e.data.atr;
                }
                if (this.reconnectArray) {
                    this.wildKuang(this.reconnectArray);
                    this.lastSmahs = 1;
                }
                SoundManager.getInstance().playMusic("snyx_freegame_bgm_mp3");
                this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                if (game.LaohuUtils.freeWin) {
                    this.freeWin = game.LaohuUtils.freeWin;
                    this.freewinLabel.text = game.LaohuUtils.freeWin + "";
                }
                else {
                    this.freeWin = 0;
                    this.freewinLabel.text = game.LaohuUtils.freeWin + "";
                }
                egret.setTimeout(function () {
                    _this.playFreeRound();
                }, this, 1500);
            }
        };
        /**
         * 开始播放免费游戏
         */
        SNYXScene3.prototype.playFreeRound = function () {
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
            this.freeGameTimeOut = egret.setTimeout(function () {
                game.LaohuUtils.freeTimes -= 1;
                _this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                // SoundManager.getInstance().playEffect("sgws_reelstart_mp3");
                SoundManager.getInstance().playEffect("snyx_reel_mp3");
                _this.scroller.run();
                _this.messageSend();
                egret.setTimeout(function () { _this.isMessaged = false; }, _this, 600);
            }, this, 500);
        };
        /**
         * 发送免费游戏旋转消息
         */
        SNYXScene3.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, data, colorMatrix, colorFlilter, resp1, isbonus, i, i, i, j, aaa, str_lingshi, temp, temp2, arr, k, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [[], [], [], [], []];
                            this.showAtr2 = [[], [], [], [], []];
                            this.bonusAtr = [];
                            this.scatterIcon = 0;
                            this.eachLineScore = [];
                            this.yudiAtr = [];
                            this.yudiAtr2 = [];
                            this.allAtr = [];
                            this.wildAtr = [];
                            this.scatter = 0;
                            this.scatterNum = 0;
                            //测试专用消息
                            data2 = { "spinType": 1, "bet": game.LaohuUtils.bet, "lineCount": 243, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_SNYX);
                                SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                                return [2 /*return*/];
                            }
                            data = Number(new Big(game.LaohuUtils.bet).mul(0.5));
                            this.ownGold -= NumberFormat.handleFloatDecimal(data);
                            colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            resp1 = resp2.spinRes[0];
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
                            this.wildAtr = resp2.smashingMatrix;
                            isbonus = resp2.isBonus;
                            if (this.isSmash == 1) {
                                this.lastSmahs = 1;
                            }
                            if (this.lastSmahs && isbonus == 0) {
                                this.wildDown(resp2.smashingMatrix);
                            }
                            this.isSmash = resp2.isSmashing;
                            if (this.isSmash) {
                                this.showAtr2 = [resp1.matrix1[0], resp1.matrix1[1], resp1.matrix1[2], resp1.matrix1[3], resp1.matrix1[4]];
                                this.showAtr = this.showAtr2;
                            }
                            //第一次出现wild
                            if (this.isSmash == 1 && isbonus == 1) {
                                if (this.lastSmahs == 1) {
                                    this.scroller.removeWild();
                                }
                                this.messageTimeOut = egret.setTimeout(function () {
                                    _this.scroller.runResult(_this.showAtr);
                                    _this.wildKuang(_this.wildAtr);
                                    _this.runningType = RUNNING_TYPE.RESULT;
                                }, this, 4500);
                                for (i = 0; i < this.wildAtr.length; i++) {
                                    if (this.wildAtr[i] >= 0) {
                                        this.wildWin(i);
                                        SoundManager.getInstance().playEffect("snyx_firework_mp3");
                                    }
                                }
                            }
                            else if (this.isSmash == 1 && isbonus == 0) {
                                this.messageTimeOut = egret.setTimeout(function () {
                                    _this.scroller.runResult(_this.showAtr);
                                    _this.runningType = RUNNING_TYPE.RESULT;
                                }, this, 300);
                            }
                            else if (this.isSmash == 0) {
                                this.messageTimeOut = egret.setTimeout(function () {
                                    _this.scroller.runResult(_this.showAtr);
                                    if (_this.isFastGame) {
                                        _this.scroller.runResultFast();
                                    }
                                }, this, 300);
                                this.runningType = RUNNING_TYPE.RESULT;
                                this.scroller.removeWild();
                            }
                            this.lastSmahs = this.isSmash;
                            this.winGold = resp2.winCount;
                            this.freeWin += resp2.winCount;
                            game.LaohuUtils.freeTimes = resp2.freeTimes;
                            if (this.winGold > 0) {
                                this.lineTime = 2000;
                            }
                            else {
                                this.lineTime = 1000;
                            }
                            game.LaohuUtils.ToTalMoney = resp2.own_gold;
                            this.scatter = resp2.sactter;
                            if (resp1.rmIndex) {
                                for (i in resp1.rmIndex) {
                                    this.allAtr.push(resp1.rmIndex[i]);
                                }
                            }
                            //消息判断
                            if (resp1.winnerInfo) {
                                for (i = 0; i < resp1.winnerInfo.length; i++) {
                                    for (j = 0; j < resp1.winnerInfo[i].length; j++) {
                                        resp1.winnerInfo[i][j] = resp1.winnerInfo[i][j].myReplace(" ", "");
                                        aaa = resp1.winnerInfo[i][j];
                                        str_lingshi = [];
                                        temp = [];
                                        temp = resp1.winnerInfo[i][j].split(":")[2];
                                        temp2 = resp1.winnerInfo[i][j].split(":")[1];
                                        temp = temp.myReplace("{", "");
                                        temp = temp.myReplace("}", "");
                                        arr = temp.split(",");
                                        this.eachLineScore.push(temp2);
                                        for (k = 0; k < arr.length; k++) {
                                            str_lingshi.push(parseInt(arr[k]));
                                        }
                                        this.bonusAtr.push(str_lingshi);
                                    }
                                }
                            }
                            else {
                                this.bonusAtr = [];
                            }
                            if (resp2.sactter == 1) {
                                for (i = 0; i <= 4; i++) {
                                    for (j = 0; j < this.showAtr[i].length; j++) {
                                        if (this.showAtr[i][j] == 2) {
                                            this.yudiAtr.push(j);
                                            this.yudiAtr2.push(i + 1);
                                            this.scatterNum += 1;
                                        }
                                    }
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param  {egret.Event} e
         */
        SNYXScene3.prototype.scrollerEnd = function (e) {
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
                    SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
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
                    // if (this.isSmash) this.scroller.wildIcon(this.wildAtr);
                    this.addFreeBonusAni();
                    // this.isMessaged = true;
                    this.isMessaged = false;
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    break;
            }
        };
        /**
       * 移除之前动画
       */
        SNYXScene3.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.commondi.visible = this.commomScore.visible = false;
                this.commomScore.text = "";
            }
            // this.scroller.hideIcon();
            SoundManager.getInstance().stopEffectByName("snyx_firework_mp3");
            this.scroller.stopIconDb();
        };
        SNYXScene3.prototype.addFreeBonusAni = function () {
            if (this.isSmash == 1 && this.lastSmahs == 0) {
                // this.wildWin();
                // this.wildKuang(this.wildAtr);
            }
            this.commwin();
        };
        /**
         * wild游戏的框
         * @param  {Array<number>} smashAtr
         */
        SNYXScene3.prototype.wildKuang = function (smashAtr) {
            for (var i = 0; i < smashAtr.length; i++) {
                if (smashAtr[i] >= 0)
                    this.scroller.wildKuang(i, smashAtr[i]);
            }
        };
        SNYXScene3.prototype.wildDown = function (smashAtr) {
            for (var i = 0; i < smashAtr.length; i++) {
                if (smashAtr[i] == -1) {
                    this.scroller.removeWild(i);
                }
                else {
                    this.scroller.wildMove(i, smashAtr[i]);
                }
            }
        };
        /**
        * 普通中奖效果
        */
        SNYXScene3.prototype.commwin = function () {
            var _this = this;
            if (this.winGold >= game.LaohuUtils.bet * 30) {
                this.bigwin();
            }
            else {
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    this.commomScore.visible = this.commondi.visible = true;
                    var data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    SoundManager.getInstance().playEffect("snyx_award_mp3");
                    if (this.scatter == 1) {
                        egret.clearTimeout(this.freeGameTimeOut);
                        switch (this.scatterNum) {
                            case 3:
                                this.freetimeIma.source = "snyx_free" + 10 + "_png";
                                break;
                            case 4:
                                this.freetimeIma.source = "snyx_free" + 15 + "_png";
                                break;
                            case 5:
                                this.freetimeIma.source = "snyx_free" + 20 + "_png";
                                break;
                        }
                        egret.setTimeout(function () {
                            egret.Tween.get(_this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(function () {
                                egret.setTimeout(function () { _this.free2commGroup.scaleX = _this.free2commGroup.scaleY = 0; }, _this, 2800);
                                _this.freeGameTimeOut = egret.setTimeout(_this.playFreeRound, _this, 3000);
                            });
                        }, this, 2100);
                        for (var i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "snyx_icon_2");
                        }
                    }
                }
                else {
                    if (this.scatter == 1) {
                        egret.clearTimeout(this.freeGameTimeOut);
                        switch (this.scatterNum) {
                            case 3:
                                this.freetimeIma.source = "snyx_free" + 10 + "_png";
                                break;
                            case 4:
                                this.freetimeIma.source = "snyx_free" + 15 + "_png";
                                break;
                            case 5:
                                this.freetimeIma.source = "snyx_free" + 20 + "_png";
                                break;
                        }
                        egret.Tween.get(this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(function () {
                            egret.setTimeout(function () { _this.free2commGroup.scaleX = _this.free2commGroup.scaleY = 0; }, _this, 2800);
                            _this.freeGameTimeOut = egret.setTimeout(_this.playFreeRound, _this, 3000);
                        });
                        for (var i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "snyx_icon_2");
                        }
                    }
                }
            }
            this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
        };
        SNYXScene3.prototype.bigwin = function () {
            var _this = this;
            egret.clearTimeout(this.freeGameTimeOut);
            var func = function () {
                _this.bigWinPanel.touchEnabled = false;
                _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, _this);
                if (!game.LaohuUtils.isAutoGame) {
                    _this.runningType = RUNNING_TYPE.EMPTY;
                }
                /**
                 * bigwin结束窗口效果
                 */
                _this.bigWinPanel.stopShowBigWin(function () {
                    _this.commomScore.visible = _this.commondi.visible = false;
                    //自动游戏bigwin后开始下一把
                    if (_this.scatter == 1) {
                        egret.clearTimeout(_this.freeGameTimeOut);
                        switch (_this.scatterNum) {
                            case 3:
                                _this.freetimeIma.source = "snyx_free" + 10 + "_png";
                                break;
                            case 4:
                                _this.freetimeIma.source = "snyx_free" + 15 + "_png";
                                break;
                            case 5:
                                _this.freetimeIma.source = "snyx_free" + 20 + "_png";
                                break;
                        }
                        egret.Tween.get(_this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(function () {
                            egret.setTimeout(function () { _this.free2commGroup.scaleX = _this.free2commGroup.scaleY = 0; }, _this, 2800);
                            _this.freeGameTimeOut = egret.setTimeout(_this.playFreeRound, _this, 3000);
                        });
                    }
                    else {
                        _this.freeGameTimeOut = egret.setTimeout(function () {
                            _this.playFreeRound();
                        }, _this, 800);
                    }
                    game.UIUtils.removeSelf(_this.bigWinPanel);
                    _this.freewinLabel.text = NumberFormat.handleFloatDecimal(_this.freeWin) + "";
                });
            };
            this.bigWinPanel = new snyx.SNYXBigwinPanel();
            this.bigWinPanel.touchEnabled = false;
            egret.setTimeout(function () {
                _this.bigWinPanel.touchEnabled = true;
                _this.bigWinPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, func, _this);
            }, this, 1500);
            /**
             * bigwin窗口
             * @param score,callback?
             */
            this.bigWinPanel.showScore(this.winGold, function () {
                _this.commomScore.visible = _this.commondi.visible = false;
                _this.freewinLabel.text = NumberFormat.handleFloatDecimal(_this.freeWin, 3) + "";
                //自动游戏bigwin后开始下一把
                if (_this.scatter == 1) {
                    egret.clearTimeout(_this.freeGameTimeOut);
                    switch (_this.scatterNum) {
                        case 3:
                            _this.freetimeIma.source = "snyx_free" + 10 + "_png";
                            break;
                        case 4:
                            _this.freetimeIma.source = "snyx_free" + 15 + "_png";
                            break;
                        case 5:
                            _this.freetimeIma.source = "snyx_free" + 20 + "_png";
                            break;
                    }
                    egret.Tween.get(_this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(function () {
                        egret.setTimeout(function () { _this.free2commGroup.scaleX = _this.free2commGroup.scaleY = 0; }, _this, 2800);
                        _this.freeGameTimeOut = egret.setTimeout(_this.playFreeRound, _this, 3000);
                    });
                }
                else {
                    _this.freeGameTimeOut = egret.setTimeout(function () {
                        _this.playFreeRound();
                    }, _this, 800);
                }
                game.UIUtils.removeSelf(_this.bigWinPanel);
            });
            this.resizeGroup.addChild(this.bigWinPanel);
        };
        /**
         * wild 中奖主界面烟花效果
         */
        SNYXScene3.prototype.wildWin = function (i) {
            var wildAni = new DBComponent("snyx_wild");
            wildAni.play("", 1);
            wildAni.horizontalCenter = (i - 2) * 170;
            wildAni.bottom = 290;
            this["roleAniGroup"].addChild(wildAni);
            wildAni.resetPosition();
        };
        /**
        * 免费游戏结束展示总赢取
        */
        SNYXScene3.prototype.showToalWin = function () {
            var _this = this;
            egret.setTimeout(function () {
                _this.freeTotalWin.text = NumberFormat.handleFloatDecimal(_this.freeWin) + "";
                _this.totalwinGroup.visible = true;
                SoundManager.getInstance().pauseMusic();
                SoundManager.getInstance().playEffect("snyx_freegame_end_mp3");
            }, this, 1000);
            egret.setTimeout(function () {
                CF.dP(ENo.SNYX_QUIT_FREE_GAME);
                _this.totalwinGroup.visible = false;
                _this.scroller.removeWild();
                _this.freeWin = 0;
                _this.freewinLabel.text = 0 + "";
            }, this, 10000);
        };
        return SNYXScene3;
    }(game.BaseSlotScene3));
    snyx.SNYXScene3 = SNYXScene3;
    __reflect(SNYXScene3.prototype, "snyx.SNYXScene3");
})(snyx || (snyx = {}));
