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
var bscs;
(function (bscs) {
    var BSCSScene3 = (function (_super) {
        __extends(BSCSScene3, _super);
        /**
         * 免费游戏中免费游戏动画
         */
        // public addFreeTimeAni: DBComponent;
        function BSCSScene3() {
            var _this = _super.call(this) || this;
            _this.lineAniXArray = [-345, -172, 0, 171, 340];
            _this.lineAniYArray = [347, 204, 60];
            _this.lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
            _this.firstLineX = -490;
            _this.lastLineX = 340;
            _this.utilsTotalMoney = game.BSCSUtils.ToTalMoney;
            _this.utilsBet = game.BSCSUtils.bet;
            _this.fixpositionY = [40, 40, 20, 20];
            _this.addedFreeTime = 0;
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BSCS;
            _this.AUTOGAME_NOTIFY = PanelNotify.OPEN_BSCS_AUTO_PANEL;
            _this.TIPS_NOTIFY = PanelNotify.OPEN_BSCS_TIPS_PANEL;
            _this.RECORD_NOTIFY = PanelNotify.OPEN_DNTG_RECORD_PANEL;
            _this.SETING_NOTIFY = PanelNotify.OPEN_SETTING;
            _this.QUIT_NOTIFY = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
            _this.lineSmall = "ayls_line1";
            _this.lineMid = "ayls_line2";
            _this.lineBig = "ayls_line3";
            _this.lineHuge = "ayls_line4";
            _this.scrollerFastEffect = "bscs_reel_fast_spin_mp3";
            _this.gameId = "bscs";
            _this.isReconnect = true; //判断是否为断线重连
            _this.freeWins = 0; //免费游戏总赢取
            _this.scatter = 0;
            _this.eachLineIconIndex = []; //20条线中奖连线中中奖的图标index
            _this.allLine = []; //20线总中奖连线
            _this.fastItemIndex = 0;
            _this.lineTime = 3000;
            _this.lineImaArr = [];
            _this.commomScore = new eui.BitmapLabel(); //中奖展示金额数字
            _this.skinName = "BSCSScene3Skin";
            return _this;
        }
        BSCSScene3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.addFreeTimeAni = DBComponent.create("ayls_addfreetimeani", "ayls_freespins_n");
            this.enterFreeAni = new DBComponent("bscq_bg02");
            this.scroller.showFreeFirst(3);
            this.enterFreeAni.play("", 0);
            this.enterFreeAni.touchEnabled = false;
            this.effectGroup1.addChild(this.enterFreeAni);
            this.enterFreeAni.resetPosition();
            this.waterAni = DBComponent.create("bscs_water", "bscs_water");
            this.waterAni.play("", 0);
            this.waterAni.horizontalCenter = 0;
            this.waterAni.bottom = -450;
            this.resizeGroup.addChild(this.waterAni);
            this.waterAni.resetPosition();
            this.waterAni.touchEnabled = false;
        };
        BSCSScene3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.BSCS_START_FREE_GAME, this.startFreeGame, this);
        };
        BSCSScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.BSCS_START_FREE_GAME, this.startFreeGame, this);
        };
        /**
         * 转轴转动结束
         * @param  {egret.Event} e
         */
        BSCSScene3.prototype.scrollerEnd = function (e) {
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
                    SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                    //图标数组非空校验
                    if (this.showAtr.length != 0) {
                        for (var i = 0; i < this.showAtr[4].length; i++) {
                            //判断第5列上是否有scatter
                            if (this.showAtr[4][i] == 2) {
                                if (this.scatter == 1) {
                                    if (this.yudiAtr2[1] <= 4) {
                                        SoundManager.getInstance().playEffect("bscs_scat_appear2_mp3");
                                    }
                                    else {
                                        SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                    }
                                }
                                else {
                                    SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                }
                                this.scroller.addFoGuang1(5, i, "bscs_icon_2_guang");
                            }
                            else {
                                SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                            }
                        }
                    }
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.BSCSUtils.bet * 2) * 15) {
                            egret.setTimeout(function () {
                                // this.lineScoreGroup.visible = false; 
                                _this.removeLastAni();
                            }, this, this.lineTime);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                    }
                    else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                    }
                    this.addFreeBonusAni();
                    this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    for (var i = 0; i < this.showAtr[3].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[3][i] == 2) {
                            if (this.scatter == 1) {
                                if (this.yudiAtr2[1] <= 3) {
                                    SoundManager.getInstance().playEffect("bscs_scat_appear2_mp3");
                                }
                                else {
                                    SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                }
                            }
                            else {
                                SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                            }
                            this.scroller.addFoGuang1(4, i, "bscs_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                        }
                    }
                    break;
                case 3:
                    for (var i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            for (var j = 0; j < 3; j++) {
                                if (this.scatter == 1) {
                                    if (this.yudiAtr2[1] <= 2) {
                                        SoundManager.getInstance().playEffect("bscs_scat_appear2_mp3");
                                    }
                                    else {
                                        SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                    }
                                }
                                else {
                                    SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                }
                                this.scroller.addFoGuang1(3, i, "bscs_icon_2_guang");
                            }
                        }
                        else {
                            SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                        }
                    }
                    break;
                case 2:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[1][i] == 2) {
                            SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                            this.scroller.addFoGuang1(2, i, "bscs_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                        }
                    }
                    break;
                case 1:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                            this.scroller.addFoGuang1(1, i, "bscs_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                        }
                    }
                    break;
            }
        };
        /**
         * 开始免费游戏
         */
        BSCSScene3.prototype.startFreeGame = function (e) {
            var _this = this;
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            this.scroller.showFreeFirst(3);
            this.waterAni.bottom = -450;
            egret.setTimeout(function () {
                game.LaohuUtils.downTime2 = 300;
                game.LaohuUtils.downTime3 = 600;
                game.LaohuUtils.downTime4 = 900;
                game.LaohuUtils.downTime5 = 1200;
                game.LaohuUtils.speed = 85;
                if (!_this.isReconnect) {
                    egret.Tween.get(_this.waterAni).to({ bottom: -300 }, 2000).call(function () {
                        _this.playFreeGame();
                    });
                }
                else {
                    egret.Tween.get(_this.waterAni).to({ bottom: -300 }, 2000).call(function () {
                        _this.playFreeGame();
                    });
                }
            }, this, 300);
            this.freeWins = game.LaohuUtils.freeWin;
            this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            this.freeTimes = game.LaohuUtils.freeTimes;
            this.freeTimesLabel.text = this.freeTimes + "";
            SoundManager.getInstance().playMusic("bscs_freespinbackground_mus_mp3");
            /**
             * 是否为免费游戏重连
             */
        };
        /**
         * 免费游戏旋转，次数判断
         */
        BSCSScene3.prototype.playFreeGame = function () {
            var _this = this;
            //防止重复发消息
            if (!this.isMessaged) {
                this.removeLastAni();
                if (this.freeTimes <= 0) {
                    this.freeTimesLabel.text = 0 + "";
                    LogUtils.logD(this.freeTimes + "   freetime");
                    this.showTotalWin();
                    return;
                }
                this.isMessaged = true;
                this.freeTimes -= 1;
                game.LaohuUtils.freeTimes = this.freeTimes;
                this.freeTimesLabel.text = this.freeTimes + "";
                this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("bscs_reel_mp3", true);
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
        BSCSScene3.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, resp1, i, j, aaa, str_lingshi, str_lingshi2, temp, temp1, temp2, arr, k, k, flag, _loop_1, this_1, i, scatternum, i, j, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [[], [], [], [], []];
                            this.bonusAtr = [];
                            this.allLine = [];
                            this.lineImaArr = [];
                            this.eachLineIconIndex = [];
                            this.allAtr = [[], [], [], [], []];
                            this.fastItemIndex = 0;
                            this.yudiAtr = [];
                            this.scatterIcon = 0;
                            this.winGold = 0;
                            data2 = { "spinType": 1, "bet": game.BSCSUtils.bet, "lineCount": 243, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_BSCS);
                                SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                                return [2 /*return*/];
                            }
                            resp1 = resp2.spinRes[0];
                            this.scatter = resp2.sactter;
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
                            if (resp1.winnerInfo) {
                                for (i = 0; i < resp1.winnerInfo.length; i++) {
                                    for (j = 0; j < resp1.winnerInfo[i].length; j++) {
                                        resp1.winnerInfo[i][j] = resp1.winnerInfo[i][j].myReplace(" ", "");
                                        aaa = resp1.winnerInfo[i][j];
                                        str_lingshi = [];
                                        str_lingshi2 = [];
                                        temp = [];
                                        temp1 = void 0;
                                        // let temp3: any = [];
                                        temp1 = resp1.winnerInfo[i][j].split(":")[0];
                                        if (temp1 != 0) {
                                            this.lineImaArr.push(parseInt(temp1));
                                            temp = resp1.winnerInfo[i][j].split(":")[2];
                                            temp2 = resp1.winnerInfo[i][j].split(":")[1];
                                            // temp3 = resp1.winnerInfo[i][j].split(":")[3];
                                            temp = temp.myReplace("{", "");
                                            temp = temp.myReplace("}", "");
                                            arr = temp.split(",");
                                            for (k = 0; k < resp1.winnerInfo[i][j].split(":")[3]; k++) {
                                                str_lingshi.push(parseInt(arr[k]));
                                            }
                                            for (k = 0; k < arr.length; k++) {
                                                str_lingshi2.push(parseInt(arr[k]));
                                            }
                                            this.bonusAtr.push(str_lingshi);
                                            this.allLine.push(str_lingshi2);
                                        }
                                    }
                                }
                            }
                            else {
                                this.bonusAtr = [];
                            }
                            flag = false;
                            if (this.bonusAtr) {
                                _loop_1 = function (i) {
                                    var _loop_2 = function (j) {
                                        flag = false;
                                        this_1.allAtr[j].forEach(function (item) {
                                            if (item == _this.bonusAtr[i][j]) {
                                                flag = true;
                                            }
                                        });
                                        if (!flag)
                                            this_1.allAtr[j].push(this_1.bonusAtr[i][j]);
                                    };
                                    for (var j = 0; j < this_1.bonusAtr[i].length; j++) {
                                        _loop_2(j);
                                    }
                                };
                                this_1 = this;
                                for (i = 0; i < this.bonusAtr.length; i++) {
                                    _loop_1(i);
                                }
                            }
                            //是否为scatter
                            if (resp2.sactter == 1) {
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
                            if (this.winGold > 0 && this.scatter != 1)
                                this.lineTime = 3000;
                            else if (this.winGold == 0 && this.scatter != 1)
                                this.lineTime = 1500;
                            if (this.scatter == 1)
                                this.lineTime += 1500;
                            this.freeMulIndex = resp1.freeMulIndex;
                            this.freeTimes = resp2.freeTimes;
                            this.addedFreeTime = this.freeTimes - game.LaohuUtils.freeTimes;
                            this.freeWins += this.winGold;
                            game.BSCSUtils.ToTalMoney = resp2.own_gold;
                            this.messageTimeOut = egret.setTimeout(function () {
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
         * 移除之前动画
         */
        BSCSScene3.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore);
                this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                this.clearLineImaPool();
            }
            this.scroller.stopIconDb();
        };
        /**
         * 免费游戏中奖连线
         */
        BSCSScene3.prototype.addFreeBonusAni = function () {
            var _this = this;
            if (this.winGold > game.BSCSUtils.bet * 2 * 15) {
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
                            _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                            if (_this.scatter == 1) {
                                _this.addFreeTime();
                                _this.freeTimesLabel.text = _this.freeTimes + "";
                            }
                            if (_this.lineImaArr) {
                                for (var i = 0; i < _this.lineImaArr.length; i++) {
                                    _this.lineUseImag(_this.lineImaArr[i]);
                                }
                            }
                            egret.clearTimeout(_this.freeGameTimeOut);
                            _this.freeGameTimeOut = egret.setTimeout(function () {
                                _this.playFreeGame();
                            }, _this, _this.lineTime);
                        });
                    };
                    this.bigWinPanel = new bscs.BSCSBigwinGroup();
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
                        if (_this.lineImaArr) {
                            for (var i = 0; i < _this.lineImaArr.length; i++) {
                                _this.lineUseImag(_this.lineImaArr[i]);
                            }
                        }
                        if (_this.scatter == 1) {
                            _this.addFreeTime();
                            _this.freeTimesLabel.text = _this.freeTimes + "";
                        }
                        _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        _this.freeGameTimeOut = egret.setTimeout(_this.playFreeGame, _this, _this.lineTime);
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            else {
                if (this.winGold > 0) {
                    SoundManager.getInstance().playEffect("bscs_win_mp3");
                    if (this.scatter == 1) {
                        this.addFreeTime();
                        this.freeTimesLabel.text = this.freeTimes + "";
                    }
                    this.scroller.setIconHui();
                    this.scroller.removeIconHui(this.allAtr);
                    if (this.lineImaArr) {
                        for (var i = 0; i < this.lineImaArr.length; i++) {
                            this.lineUseImag(this.lineImaArr[i]);
                        }
                    }
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    var data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.font = "bscs_wingold_1_fnt";
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.commomScore.textAlign = "center";
                    this.commomScore.verticalCenter = 0;
                    this.commomScore.horizontalCenter = 0;
                    this.gameGroup.addChild(this.commomScore);
                }
                else {
                    if (this.scatter == 1) {
                        this.addFreeTime();
                        this.freeTimesLabel.text = this.freeTimes + "";
                    }
                }
            }
        };
        /**
         * 免费游戏结算
         */
        BSCSScene3.prototype.showTotalWin = function () {
            var _this = this;
            this.totalGroup.visible = true;
            this.resizeGroup.addChild(this.totalGroup);
            game.BSCSUtils.freeWin = this.freeWins;
            SoundManager.getInstance().pauseMusic();
            this.totalwinLable.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            SoundManager.getInstance().playEffect("bscs_free_win_mp3");
            egret.setTimeout(function () {
                //恢复背景音乐
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(_this.totalWinAni);
                _this.freeWins = 0;
                _this.winNumLabel.text = 0 + "";
                CF.dP(ENo.BSCS_QUIT_FREE_GAME);
                _this.totalGroup.visible = false;
            }, this, 8000);
        };
        /**
         * 免费游戏中scatter添加特效
         */
        BSCSScene3.prototype.addFreeTime = function () {
            var _this = this;
            egret.clearTimeout(this.freeGameTimeOut);
            this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.bonusAtr.length * 500 + 3500);
            // egret.setTimeout(() => {
            this.freegetFreeGroup.visible = true;
            this.freegetFreeGroup.alpha = 1;
            this.freewinFreeTime.text = "+" + this.addedFreeTime;
            egret.setTimeout(function () {
                egret.Tween.get(_this.freegetFreeGroup).to({ alpha: 0 }, 1000, egret.Ease.circIn).call(function () {
                    _this.freegetFreeGroup.visible = false;
                });
            }, this, 500);
        };
        return BSCSScene3;
    }(game.BaseSlotScene3));
    bscs.BSCSScene3 = BSCSScene3;
    __reflect(BSCSScene3.prototype, "bscs.BSCSScene3");
})(bscs || (bscs = {}));
