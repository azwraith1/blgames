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
 * @Date: 2019-07-04 10:56:42
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-03 10:24:06
 * @Description:
 */
var rdsg;
(function (rdsg) {
    var RDSGScene3 = (function (_super) {
        __extends(RDSGScene3, _super);
        function RDSGScene3() {
            var _this = _super.call(this) || this;
            _this.lineTime = 1800;
            _this.fastItemIndex = 0;
            _this.isReconnect = true; //判断是否为断线重连
            _this.freeWins = 0; //免费游戏总赢取
            _this.scatter = 0;
            _this.isMessaged = false; //防止重复发送免费旋转消息
            _this.eachLineIconIndex = []; //20条线中奖连线中中奖的图标index
            _this.allLine = []; //20线总中奖连线
            _this.commomScore = new eui.BitmapLabel(); //中奖展示金额数字
            _this.i = 0;
            _this.j = 0;
            _this.atr1 = [];
            _this.atr2 = [];
            _this.aniPool = [];
            _this.isStopLine = false;
            _this.isFastGame = false;
            _this.skinName = "RDSGScene3Skin";
            return _this;
        }
        RDSGScene3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.freeBgAni = DBComponent.create("rdsg_freeBgAni", "rdsg_commombg2");
            this.freeBgAni.horizontalCenter = 0;
            this.freeBgAni.bottom = -640;
            this.freeBgAni.play("", 0);
            this.freegameAniGroup.addChild(this.freeBgAni);
            this.freeBgAni.resetPosition();
            this.scrollerAni = DBComponent.create("rdsg_scrollerAni_2", "rdsg_commonback");
            this.scrollerAni.play("", 0);
            this.scrollerAni.horizontalCenter = -8;
            this.scrollerAni.bottom = 100;
            this.effectGroup2.addChild(this.scrollerAni);
            this.scrollerAni.resetPosition();
            this.friutAni = DBComponent.create("rdsg_friutAni_2", "rdsg_logoturn");
            this.friutAni.play("", 0);
            this.friutAni.horizontalCenter = -3;
            this.friutAni.verticalCenter = -333;
            this.resizeGroup.addChild(this.friutAni);
            this.friutAni.resetPosition();
            this.totalWinAni = DBComponent.create("rdsg_totalWinAni", "rdsg_lights");
        };
        RDSGScene3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.RDSG_START_FREE_GAME, this.startFreeGame, this);
        };
        RDSGScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.RDSG_START_FREE_GAME, this.startFreeGame, this);
        };
        /**
         * 转轴转动结束
         * @param  {egret.Event} e
         */
        RDSGScene3.prototype.scrollerEnd = function (e) {
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
                    game.UIUtils.removeSelf(this.scrollerAni);
                    SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                    //图标数组非空校验
                    if (this.showAtr.length != 0) {
                        for (var i = 0; i < this.showAtr[4].length; i++) {
                            //判断第5列上是否有scatter
                            if (this.showAtr[4][i] == 2) {
                                if (this.scatter == 1) {
                                    if (this.yudiAtr2[1] <= 4) {
                                        SoundManager.getInstance().playEffect("rdsg_scatdown_mp3");
                                    }
                                    else {
                                        SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                    }
                                }
                                else {
                                    SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                }
                                this.scroller.addFoGuang1(5, i, "rdsg_icon_2_guang");
                            }
                            else {
                                SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
                            }
                        }
                    }
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.RDSGUtils.bet * 2) * 15) {
                            egret.setTimeout(function () {
                                // this.lineScoreGroup.visible = false; 
                                _this.removeLastAni();
                            }, this, this.lineTime - 300);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                    }
                    else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                    }
                    this.addFreeBonusAni();
                    this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    for (var i = 0; i < this.showAtr[3].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[3][i] == 2) {
                            if (this.scatter == 1) {
                                if (this.yudiAtr2[1] <= 3) {
                                    SoundManager.getInstance().playEffect("rdsg_scatdown_mp3");
                                }
                                else {
                                    SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                }
                            }
                            else {
                                SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                            }
                            this.scroller.addFoGuang1(4, i, "rdsg_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
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
                                        SoundManager.getInstance().playEffect("rdsg_scatdown_mp3");
                                    }
                                    else {
                                        SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                    }
                                }
                                else {
                                    SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                }
                                this.scroller.addFoGuang1(3, i, "rdsg_icon_2_guang");
                            }
                        }
                        else {
                            SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
                        }
                    }
                    break;
                case 2:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[1][i] == 2) {
                            SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                            this.scroller.addFoGuang1(2, i, "rdsg_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
                        }
                    }
                    break;
                case 1:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                            this.scroller.addFoGuang1(1, i, "rdsg_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
                        }
                    }
                    break;
            }
        };
        /**
         * 开始免费游戏
         */
        RDSGScene3.prototype.startFreeGame = function (e) {
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            this.scroller.showFreeFirst(3);
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            game.LaohuUtils.speed = 85;
            this.freeWins = game.LaohuUtils.freeWin;
            this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            this.freeTimes = game.LaohuUtils.freeTimes;
            this.freeTimesLabel.text = this.freeTimes + "";
            SoundManager.getInstance().playMusic("rdsg_freespinbackground_mus_mp3");
            if (!this.isReconnect) {
                egret.setTimeout(this.playFreeGame, this, 2500);
            }
            else {
                egret.setTimeout(this.playFreeGame, this, 2500);
            }
        };
        /**
         * 免费游戏旋转，次数判断
         */
        RDSGScene3.prototype.playFreeGame = function () {
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
                    SoundManager.getInstance().playEffect("rdsg_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                    _this.scrollerAni.horizontalCenter = -8;
                    _this.scrollerAni.bottom = 100;
                    _this.effectGroup2.addChild(_this.scrollerAni);
                    _this.scrollerAni.resetPosition();
                    egret.setTimeout(function () { _this.isMessaged = false; }, _this, 600);
                }, this, 500);
                // if (this.isFastGame) {
                //     this.askAutoGame();
                // }
            }
        };
        /**
         * 移除中奖连线动画
         */
        RDSGScene3.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore);
                this.clearAniPool();
                this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
            }
            this.scroller.stopIconDb();
        };
        /**
         * 发送免费游戏旋转消息
         */
        RDSGScene3.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, resp1, i, j, aaa, str_lingshi, str_lingshi2, temp, temp1, temp2, arr, k, k, flag, _loop_1, this_1, i, scatternum, i, j, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [[], [], [], [], []];
                            this.bonusAtr = [];
                            this.allLine = [];
                            this.eachLineIconIndex = [];
                            this.allAtr = [[], [], [], [], []];
                            this.fastItemIndex = 0;
                            this.yudiAtr = [];
                            this.scatterIcon = 0;
                            this.winGold = 0;
                            this.lineTime = 1500;
                            data2 = { "spinType": 1, "bet": game.RDSGUtils.bet, "lineCount": 243, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_RDSG);
                                SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                            this.lineTime = this.lineTime + this.bonusAtr.length * 500;
                            this.winGold = resp2.winCount;
                            this.freeMulIndex = resp1.freeMulIndex;
                            this.freeTimes = resp2.freeTimes;
                            this.freeWins += this.winGold;
                            game.RDSGUtils.ToTalMoney = resp2.own_gold;
                            this.messageTimeOut = egret.setTimeout(function () {
                                _this.scroller.runResult(_this.showAtr);
                                if (_this.isFastGame) {
                                    _this.scroller.runResultFast();
                                }
                            }, this, 400);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 免费游戏中奖连线
         */
        RDSGScene3.prototype.addFreeBonusAni = function () {
            var _this = this;
            //判断是否为bigwin
            if (this.winGold >= (game.RDSGUtils.bet * 2) * 15) {
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
                                _this.freeAddtimesimag.source = "rdsg_freespin_+" + (_this.freeTimes - game.LaohuUtils.freeTimes) + "_png";
                                egret.Tween.get(_this.freeAddTimesGroup).to({ alpha: 1 }, 1000).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
                                _this.freeTimesLabel.text = _this.freeTimes + "";
                            }
                            _this.winLine(_this.winLineGroup, _this.allLine);
                            egret.clearTimeout(_this.freeGameTimeOut);
                            _this.freeGameTimeOut = egret.setTimeout(function () {
                                _this.playFreeGame();
                            }, _this, _this.lineTime);
                        });
                    };
                    this.bigWinPanel = new rdsg.RDSGBigwinGroup();
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
                        _this.winLine(_this.winLineGroup, _this.allLine);
                        if (_this.scatter == 1) {
                            _this.freeAddtimesimag.source = "rdsg_freespin_+" + (_this.freeTimes - game.LaohuUtils.freeTimes) + "_png";
                            egret.Tween.get(_this.freeAddTimesGroup).to({ alpha: 1 }, 1000).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500).call(function () { SoundManager.getInstance().playEffect("rdsg_words_mp3"); });
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
            else if (this.bonusAtr.length > 0 && this.winGold > 0) {
                SoundManager.getInstance().playEffect("rdsg_win_mp3");
                if (this.scatter == 1) {
                    this.freeAddtimesimag.source = "rdsg_freespin_+" + (this.freeTimes - game.LaohuUtils.freeTimes) + "_png";
                    egret.Tween.get(this.freeAddTimesGroup).to({ alpha: 1 }, 1000).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500).call(function () { SoundManager.getInstance().playEffect("rdsg_words_mp3"); });
                    this.freeTimesLabel.text = this.freeTimes + "";
                }
                this.winLine(this.winLineGroup, this.allLine);
                this.scroller.addBonusAni(this.allAtr, this.winGold);
                var data = Number(new Big(this.winGold).mul(100));
                this.commomScore.font = "rdsg_winnum_big_fnt";
                this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                this.commomScore.textAlign = "center";
                this.commomScore.verticalCenter = 0;
                this.commomScore.horizontalCenter = 0;
                this.gameGroup.addChild(this.commomScore);
            }
            else {
                if (this.scatter == 1) {
                    this.freeAddtimesimag.source = "rdsg_freespin_+" + (this.freeTimes - game.LaohuUtils.freeTimes) + "_png";
                    egret.Tween.get(this.freeAddTimesGroup).to({ alpha: 1 }, 1000).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500).call(function () { SoundManager.getInstance().playEffect("rdsg_words_mp3"); });
                    this.freeTimesLabel.text = this.freeTimes + "";
                }
            }
            // }
        };
        /**
         * 免费游戏结算
         */
        RDSGScene3.prototype.showTotalWin = function () {
            var _this = this;
            this.totalWinGroup.visible = true;
            this.resizeGroup.addChild(this.totalWinGroup);
            game.RDSGUtils.freeWin = this.freeWins;
            this.totalWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            this.totalWinAni.play("", 0);
            this.totalWinAni.horizontalCenter = 0;
            this.totalWinAni.bottom = 80;
            this.totalWinGroup.addChild(this.totalWinAni);
            this.totalWinAni.resetPosition();
            this.totalWinGroup.addChild(this.totalimag);
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playEffect("rdsg_free_win_mp3");
            egret.setTimeout(function () {
                //恢复背景音乐
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(_this.totalWinAni);
                _this.freeWins = 0;
                _this.freewinLabel.text = 0 + "";
                CF.dP(ENo.RDSG_QUIT_FREE_GAME);
                _this.totalWinGroup.visible = false;
            }, this, 8000);
        };
        /**
         * 中奖连线
         * @param  {Array<Array<number>>} str
         * @param  {egret.DisplayObject} object
         */
        RDSGScene3.prototype.winLine = function (object, str) {
            this.array1 = [];
            this.array2 = [];
            this.aniPool = [];
            for (var i = 0; i < str.length; i++) {
                this.array1.push(str[i][0]);
                this.array2.push(str[i][4]);
            }
            this.j = 0;
            this.atr1 = [];
            this.atr2 = [];
            this.allLineHanlde(object, str);
        };
        /**
         * 总连线
         * @param  {any} object?
         * @param  {Array<Array<number>>} atr?
         */
        RDSGScene3.prototype.allLineHanlde = function (object, atr) {
            if (atr)
                this.atr1 = atr;
            if (this.j < this.atr1.length) {
                this.addFirstAni(this.array1[this.j]);
                this.i = 0;
                this.eachLineHandle(object, this.atr1[this.j]);
                this.j++;
            }
        };
        /**
         * 每条连线
         * @param  {any} object?
         * @param  {Array<number>} atr?
         */
        RDSGScene3.prototype.eachLineHandle = function (object, atr) {
            if (atr)
                this.atr2 = atr;
            if (!this.isStopLine) {
                if (this.i < this.atr2.length - 1) {
                    switch (Math.abs(this.atr2[this.i] - this.atr2[this.i + 1])) {
                        case 2:
                            this.hugeLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 1:
                            this.bigLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 0:
                            this.midLineHandle(object, this.atr2[this.i]);
                            // this.routationHandle(0);
                            break;
                    }
                    this.i++;
                }
                else {
                    if (this.array2[this.j - 1] != null) {
                        this.addLastAni(this.array2[this.j - 1]);
                    }
                    this.allLineHanlde();
                }
            }
        };
        /**
         * 连线旋转角度处理
         * @param  {number} num
         */
        RDSGScene3.prototype.routationHandle = function (num) {
            if (num == 2) {
                return -62.18;
            }
            else if (num == -2) {
                return 62.18;
            }
            else if (num == 1) {
                return -43.47;
            }
            else if (num == -1) {
                return 43.47;
            }
            else if (num == 0) {
                return 0;
            }
        };
        /**
         * 长连线播放
         */
        RDSGScene3.prototype.hugeLineHandle = function (object, position, postion2) {
            var _this = this;
            var rdsgLineHuge = new DBComponent("rdsg_line_huge");
            rdsgLineHuge.play("rdsg_line_huge_1", 1);
            rdsgLineHuge.bottom = this.aniPositionYHandle(position);
            rdsgLineHuge.horizontalCenter = this.aniPositionXHandle(this.i);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineHuge.rotation = this.routationHandle(2);
            }
            else {
                rdsgLineHuge.rotation = this.routationHandle(-2);
            }
            rdsgLineHuge.callback = function () {
                rdsgLineHuge.play("rdsg_line_huge_2", 0);
                _this.eachLineHandle();
            };
            this.winLineGroup.addChild(rdsgLineHuge);
            rdsgLineHuge.resetPosition();
            this.aniPool.push(rdsgLineHuge);
        };
        /**
         * 中连线播放
         */
        RDSGScene3.prototype.bigLineHandle = function (object, position, position2) {
            var _this = this;
            var rdsgLineBig = new DBComponent("rdsg_line_big");
            rdsgLineBig.play("rdsg_line_big_1", 1);
            rdsgLineBig.bottom = this.aniPositionYHandle(position);
            rdsgLineBig.horizontalCenter = this.aniPositionXHandle(this.i);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineBig.rotation = this.routationHandle(1);
            }
            else {
                rdsgLineBig.rotation = this.routationHandle(-1);
            }
            rdsgLineBig.callback = function () {
                rdsgLineBig.play("rdsg_line_big_2", 0);
                _this.eachLineHandle();
            };
            this.winLineGroup.addChild(rdsgLineBig);
            rdsgLineBig.resetPosition();
            this.aniPool.push(rdsgLineBig);
        };
        /**
         * 短连线播放
         */
        RDSGScene3.prototype.midLineHandle = function (object, position) {
            var _this = this;
            var rdsgLineMid = new DBComponent("rdsg_line_mid");
            rdsgLineMid.play("rdsg_line_mid_1", 1);
            rdsgLineMid.bottom = this.aniPositionYHandle(position);
            rdsgLineMid.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineMid.callback = function () {
                rdsgLineMid.play("rdsg_line_mid_2", 0);
                _this.eachLineHandle();
            };
            this.winLineGroup.addChild(rdsgLineMid);
            rdsgLineMid.resetPosition();
            this.aniPool.push(rdsgLineMid);
        };
        /**
         * 开头连线链接
         * @param  {Array<any>} str
         */
        RDSGScene3.prototype.addFirstAni = function (str) {
            var rdsgLineSmall = new DBComponent("rdsg_line_small");
            rdsgLineSmall.play("rdsg_line_small_1", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = -420;
            rdsgLineSmall.callback = function () {
                rdsgLineSmall.play("rdsg_line_small_2", 0);
            };
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        };
        /**
         * 末端连线连接
         * @param  {Array<any>} str
         */
        RDSGScene3.prototype.addLastAni = function (str) {
            var rdsgLineSmall = new DBComponent("rdsg_line_small");
            rdsgLineSmall.play("rdsg_line_small_1", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = 340;
            rdsgLineSmall.callback = function () {
                rdsgLineSmall.play("rdsg_line_small_2", 0);
            };
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        };
        /**
         * 设置连线bottom属性
         * @param  {any} postion
         */
        RDSGScene3.prototype.aniPositionYHandle = function (postion) {
            if (postion == 0) {
                return 390;
            }
            else if (postion == 1) {
                return 228;
            }
            else if (postion == 2) {
                return 68;
            }
        };
        /**
         * 动画horizonCenter设置
         * @param  {any} x
         */
        RDSGScene3.prototype.aniPositionXHandle = function (x) {
            if (x == 0) {
                return -340;
            }
            else if (x == 1) {
                return -168;
            }
            else if (x == 2) {
                return 0;
            }
            else if (x == 3) {
                return 170;
            }
            else if (x == 4) {
                return 400;
            }
        };
        RDSGScene3.prototype.clearAniPool = function () {
            if (this.aniPool) {
                for (var i = 0; i < this.aniPool.length; i++) {
                    game.UIUtils.removeSelf(this.aniPool[i]);
                    this.aniPool[i] = null;
                }
            }
        };
        /**
         * 部分转轴加速
         * @param  {number} index
         */
        RDSGScene3.prototype.scrollerItemFast = function (index) {
            var _this = this;
            var item3 = this.scroller.item3;
            var item4 = this.scroller.item4;
            var item5 = this.scroller.item5;
            item3.downTimeout.stop();
            item4.downTimeout.stop();
            item5.downTimeout.stop();
            if (item3.downTimeout)
                LogUtils.logD("true3");
            if (item4.downTimeout)
                LogUtils.logD("true4");
            if (item5.downTimeout)
                LogUtils.logD("true5");
            egret.clearTimeout(this.scatter3timeout);
            egret.clearTimeout(this.scatter4timeout);
            egret.clearTimeout(this.scatter5timeout);
            switch (index) {
                case 3:
                    this.scroller.addScatterAni(3, 0);
                    SoundManager.getInstance().playEffect("rdsg_reel_fast_spin_mp3", true);
                    this.scatter3timeout = egret.setTimeout(function () {
                        item3.changeResult(_this.showAtr[2]);
                        _this.scroller.removeScatterAni(3);
                        _this.scroller.addScatterAni(4, 0);
                    }, this, 3000);
                    this.scatter4timeout = egret.setTimeout(function () {
                        item4.changeResult(_this.showAtr[3]);
                        _this.scroller.removeScatterAni(4);
                        _this.scroller.addScatterAni(5, 0);
                    }, this, 6000);
                    this.scatter5timeout = egret.setTimeout(function () {
                        item5.changeResult(_this.showAtr[4]);
                        _this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3");
                    }, this, 9000);
                    break;
                case 4:
                    this.scroller.addScatterAni(4, 0);
                    SoundManager.getInstance().playEffect("rdsg_reel_fast_spin_mp3", true);
                    this.scatter4timeout = egret.setTimeout(function () {
                        item4.changeResult(_this.showAtr[3]);
                        _this.scroller.removeScatterAni(4);
                        _this.scroller.addScatterAni(5, 0);
                    }, this, 3000);
                    this.scatter5timeout = egret.setTimeout(function () {
                        item5.changeResult(_this.showAtr[4]);
                        _this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3");
                    }, this, 6000);
                    break;
                case 5:
                    this.scroller.addScatterAni(5, 0);
                    SoundManager.getInstance().playEffect("rdsg_reel_fast_spin_mp3", true);
                    this.scatter5timeout = egret.setTimeout(function () {
                        item5.changeResult(_this.showAtr[4]);
                        _this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3");
                    }, this, 3000);
                    break;
            }
        };
        RDSGScene3.prototype.askAutoGame = function () {
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
                    SoundManager.getInstance().playEffect("rdsg_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                }, _this, 500);
            };
            var func2 = function () {
                _this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("rdsg_reel_mp3", true);
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
        return RDSGScene3;
    }(game.BaseScene));
    rdsg.RDSGScene3 = RDSGScene3;
    __reflect(RDSGScene3.prototype, "rdsg.RDSGScene3");
})(rdsg || (rdsg = {}));
