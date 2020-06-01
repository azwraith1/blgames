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
var xcbs;
(function (xcbs) {
    var XCBSScene1 = (function (_super) {
        __extends(XCBSScene1, _super);
        function XCBSScene1() {
            var _this = _super.call(this) || this;
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_XCBS;
            _this.AUTOGAME_NOTIFY = PanelNotify.OPEN_XCBS_AUTO_PANEL;
            _this.TIPS_NOTIFY = PanelNotify.OPEN_XCBS_TIPS_PANEL;
            _this.RECORD_NOTIFY = PanelNotify.OPEN_DNTG_RECORD_PANEL;
            _this.SETING_NOTIFY = PanelNotify.OPEN_SETTING;
            _this.QUIT_NOTIFY = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
            _this.lineSmall = "ayls_line1";
            _this.lineMid = "ayls_line2";
            _this.lineBig = "ayls_line3";
            _this.lineHuge = "ayls_line4";
            _this.buttonEffect = "xcbs_button_mp3";
            _this.scrollerFastEffect = "xcbs_reel_fast_spin_mp3";
            _this.lineAniXArray = [-345, -172, 0, 171, 340];
            _this.lineAniYArray = [347, 204, 60];
            _this.lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
            _this.firstLineX = -490;
            _this.lastLineX = 340;
            _this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            _this.utilsBet = game.LaohuUtils.bet;
            _this.fixpositionY = [40, 40, 20, 20];
            _this.fastSpeedTime = 3000;
            _this.isSetHui = false;
            _this.sceneId = 1016;
            _this.gameId = "xcbs";
            _this.bet = 1;
            _this.HuiAtr = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
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
            _this.isFreeBack = false;
            _this.isTest = false;
            _this.spinTest = 0;
            _this.lineImaArr = [];
            _this.skinName = "XCBSScene1Skin";
            return _this;
        }
        XCBSScene1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            SoundManager.getInstance().playMusic("xcbs_background_mus_mp3");
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this["quitBtn"].visible = false;
            }
            this.setOtherBtn();
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = false;
            this.startGame();
            this.initAni();
            this.scroller.showFirst(1);
        };
        XCBSScene1.prototype.initAni = function () {
            this.bgDB = DBComponent.create("xcbs_bg01", "xcbs_bg01");
            this.smashingAni = DBComponent.create("xcbs_icon_1_long", "xcbs_icon_1_long");
            this.smashbg = DBComponent.create("xcbs_bg_wild_tex", "xcbs_bg_wild");
            this.smashKuangAni = DBComponent.create("xcbs_wild_1", "xcbs_wild_1");
            this.bgDB.play("", 0);
            this.bgDB.horizontalCenter = 20;
            this.bgDB.bottom = -860;
            this.bgDB.touchEnabled = false;
            this.resizeGroup.addChild(this.bgDB);
            this.bgDB.resetPosition();
            this.effectGroup.addChild(this.quitBtn);
            this.bgDb2 = DBComponent.create("xcbs_bg01", "xcbs_bg01");
            this.bgDb2.play("", 0);
            this.bgDb2.horizontalCenter = -20;
            this.bgDb2.bottom = -870;
            this.bgDb2.touchEnabled = false;
            this.effectGroup.addChild(this.bgDb2);
            this.bgDb2.resetPosition();
            this.resizeGroup.addChild(this.quitBtn);
            this.bgDB.touchEnabled = this.bgDb2.touchEnabled = false;
            this.spinDefaultAni = new DBComponent("xcbs_spin01");
            this.spinRunningAni = new DBComponent("xcbs_spin03");
            this.spinStartAni = new DBComponent("xcbs_spin02");
            this.spinStopAni = new DBComponent("xcbs_spin04");
            this.spinDefaultAni.touchEnabled = this.spinRunningAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinDefaultAni.horizontalCenter = 2;
            this.spinDefaultAni.bottom = 56;
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
            this.logoAni = new DBComponent("xcbs_logo");
            this.logoAni.play("", 0);
            this.logoAni.bottom = 645;
            this.logoAni.touchEnabled = false;
            this.logoAni.horizontalCenter = 0;
            this.resizeGroup.addChild(this.logoAni);
            this.logoAni.resetPosition();
        };
        XCBSScene1.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ServerNotify.s_playerBigWin, this.bigwin2, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.XCBS_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        };
        XCBSScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.XCBS_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
            egret.clearTimeout(this.messageTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
            egret.clearTimeout(this.sethuiTimeout);
            egret.clearTimeout(this.removeLineTimeOUt);
        };
        /**
         * @param  {egret.Event} e
         */
        XCBSScene1.prototype.enterGame = function (e) {
            var resp = e.data;
            game.LaohuUtils.bets = [];
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.LaohuUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            for (var j = 0; j < resp.roomInfo.gamePayTable.muls.length; j++) {
                game.LaohuUtils.muls.push(resp.roomInfo.gamePayTable.muls[j]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.LaohuUtils.FreeTimeMul = [];
                for (var k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.LaohuUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.LaohuUtils.FreeTimeMulIndex = resp.roomInfo.players.freeMulIndex;
                game.LaohuUtils.FreeTimeMul = game.LaohuUtils.FreeTimeMul[game.LaohuUtils.FreeTimeMulIndex];
                game.LaohuUtils.freeTimes = resp.roomInfo.players.freeTimes;
            }
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = true;
            this.resetOtherBtn();
            var playerIdnex = resp.playerInfo.playerIndex;
            var players = {};
            for (var key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            this.ownGold = players.gold;
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
            game.LaohuUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.bet = game.LaohuUtils.bets[0];
            game.LaohuUtils.mul = game.LaohuUtils.muls[0];
            //判断是否为免费游戏
            if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.LaohuUtils.bet = players.lastBet;
                game.LaohuUtils.mul = players.lastMul;
                this.setOtherBtn();
                this.startBtn.touchEnabled = false;
                CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: this.isFastGame });
            }
            //重连后倍数判断
            switch (game.LaohuUtils.mul) {
                case 1:
                    this.bet = 1;
                    break;
                case 2:
                    this.bet = 2;
                    break;
                case 3:
                    this.bet = 3;
                    break;
                case 4:
                    this.bet = 4;
                    break;
                case 5:
                    this.bet = 5;
                    break;
                case 5:
                    this.bet = 6;
                    break;
                case 6:
                    this.bet = 7;
                    break;
                case 7:
                    this.bet = 8;
                    break;
                case 8:
                    this.bet = 9;
                    break;
                case 10:
                    this.bet = 10;
                    break;
            }
            this.utilsBet = game.LaohuUtils.bet;
            var data = Number(new Big(game.LaohuUtils.bet).mul(2));
            var data1 = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data1) + "";
            this.beishu.text = parseInt(data1 * 2 + "") + "";
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        };
        XCBSScene1.prototype.bigwin2 = function (e) {
            var resp = e.data;
        };
        /**
         * spin旋转
         */
        XCBSScene1.prototype.startBtnTouch = function () {
            var _this = this;
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.LaohuUtils.bet * game.LaohuUtils.mul * 50 > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, function () {
                    _this.startBtn.source = "xcbs_spin_2_png";
                    game.LaohuUtils.isAutoGame = false;
                    _this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    _this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                    _this.resetStartBtn();
                    _this.resetOtherBtn();
                    Global.playerProxy.playerData.gold = _this.ownGold;
                }, "", true);
                return;
            }
            this.isFreeBack = false;
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            //转轴是否准备就绪
            if (this.runningType == RUNNING_TYPE.EMPTY) {
                if (this.scatter == 1)
                    return;
                this.isTest = false;
                // 判断是否为免费游戏并且是否有剩余的免费次数
                if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times >= 1) {
                    if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                        game.LaohuUtils.isAutoGame = false;
                        game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                        game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                        this.resetOtherBtn();
                        this.startBtn.source = "xcbs_spin_2_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "xcbs_spin_2_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    //判断是否为免费游戏并且是否有满足总赢取条件
                    if (game.LaohuUtils.totalWin && game.LaohuUtils.isAutoGame) {
                        //自动游戏总赢取条件满足
                        if (game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "xcbs_spin_2_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.LaohuUtils.bet * game.LaohuUtils.mul * 50;
                    if (game.LaohuUtils.auto_times > 1000) {
                        this.timesLabel.text = "s";
                    }
                }
                else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                    this.timesLabel.visible = false;
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.startBtn.source = "xcbs_spin_2_png";
                    this.resetOtherBtn();
                    this.resetStartBtn();
                    return;
                } //为满足完成自动游戏条件，开始自动游戏旋转
                else if (!game.LaohuUtils.isAutoGame) {
                    this.setStartBtn();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                }
                this.winNum.text = 0 + "";
                this.startBtn.filters = [colorFlilter];
                this.runningType = RUNNING_TYPE.LOOP;
                game.LaohuUtils.isScatter = false;
                this.removeLastAni();
                this.scroller.stopIconDb();
                this.isStopAni = true;
                this.setOtherBtn();
                this.scroller.run();
                SoundManager.getInstance().playEffect("xcbs_reelstart_mp3");
                SoundManager.getInstance().playEffect("xcbs_reel_mp3");
                this.messageSend();
            }
            else if (this.runningType == RUNNING_TYPE.RESULT) {
                game.LaohuUtils.auto_times = 0;
                this.timesLabel.text = "";
                this.fastGame();
                if (this.scroller.lastClick) {
                    this.clickTime += 1;
                }
                else {
                    this.clickTime = 1;
                }
                game.LaohuUtils.isAutoGame = false;
            }
            else if (this.runningType == RUNNING_TYPE.STOP) {
            }
        };
        XCBSScene1.prototype.startBtnTouch0 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, i, j, l, m, n, data2;
                return __generator(this, function (_a) {
                    this.isTest = true;
                    this.wheel = [[], [], [], [], []];
                    data = this.spinresult.text;
                    for (i = 0; i < 5; i++) {
                        j = data.split(":")[i];
                        l = j.split(",");
                        for (m = 0; m < l.length; m++) {
                            n = parseInt(l[m]);
                            this.wheel[i].push(n);
                        }
                    }
                    data2 = this.pscen1.text;
                    this.spinTest = parseInt(data2);
                    this.removeLastAni();
                    this.setStartBtn();
                    this.setOtherBtn();
                    this.scroller.stopIconDb();
                    this.scroller.run();
                    this.messageSend();
                    return [2 /*return*/];
                });
            });
        };
        /**
        * 快速结束转动
        */
        XCBSScene1.prototype.fastGame = function () {
            var _this = this;
            //转轴加速情况
            if (this.scatterIcon >= 2) {
                this.fastEnd = true;
                egret.clearTimeout(this.scatter3timeout);
                egret.clearTimeout(this.scatter4timeout);
                egret.clearTimeout(this.scatter5timeout);
                this.scroller.removeScatterAni();
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                this.startBtn.source = "xcbs_spin_2_png";
                this.scroller.runResultFast();
                // for (let i = 1; i <= 4; i++) {
                //     this.scroller[`item${i}`].resetSpecilHui();
                // }
            }
            //自动游戏情况
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                egret.clearTimeout(this.autoGameTimeout);
                game.LaohuUtils.isAutoGame = false;
                if (this.scatter != 1 && this.winGold == 0)
                    this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "xcbs_spin_2_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spinStopAni.play("", 1);
                this.spinStopAni.horizontalCenter = 0;
                this.spinStopAni.bottom = 56;
                this.spinGroup.addChild(this.spinStopAni);
                this.spinStopAni.resetPosition();
                this.spinStopAni.callback = function () {
                    game.UIUtils.removeSelf(_this.spinStopAni);
                };
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
                if (this.smashingReelIndex) {
                    this.smashingReelIndex = 0;
                }
            }
            else {
                this.startBtn.source = "xcbs_spin_2_png";
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }
            }
            SoundManager.getInstance().stopEffectByName("xcbs_wildfengbao_mp3");
            SoundManager.getInstance().stopEffectByName("xcbs_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
        };
        /**
         * 点击转轴区域快速停止游戏
         */
        XCBSScene1.prototype.scrollerFastGame = function () {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
                if (this.scatterIcon >= 2) {
                    this.fastEnd = true;
                    egret.clearTimeout(this.scatter3timeout);
                    egret.clearTimeout(this.scatter4timeout);
                    egret.clearTimeout(this.scatter5timeout);
                    this.scroller.removeScatterAni();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    this.scroller.item4.speed = 48;
                    this.scroller.item5.speed = 48;
                    // for (let i = 1; i <= 4; i++) {
                    //     this.scroller[`item${i}`].resetSpecilHui();
                    // }
                }
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("xcbs_wildfengbao_mp3");
                SoundManager.getInstance().stopEffectByName("xcbs_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
            }
        };
        /**
         * 上次游戏效果移除
         */
        XCBSScene1.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.isStopLine = true;
                this.commondi.visible = this.commomScore.visible = false;
                egret.clearTimeout(this.sethuiTimeout);
                // for (let i = 1; i <= 5; i++) {
                //     this.scroller[`item${i}`].resetSpecilHui();
                // }
                this.clearLineImaPool();
            }
            this.smashingReelIndex = 0;
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            game.UIUtils.removeSelf(this.smashbg);
            game.UIUtils.removeSelf(this.smashingAni);
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
        };
        /**
        * 开始按钮动画
        */
        XCBSScene1.prototype.setStartBtn = function () {
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.spinRunningAni.play("", 0);
            this.spinRunningAni.bottom = 56;
            this.spinRunningAni.horizontalCenter = 2;
            this.spinGroup.addChild(this.spinRunningAni);
            this.spinRunningAni.resetPosition();
            this.spinStartAni.play("", 1);
            this.spinStartAni.horizontalCenter = 0;
            this.spinStartAni.bottom = 56;
            this.spinGroup.addChild(this.spinStartAni);
            this.spinStartAni.resetPosition();
        };
        /**
         * 还原开始按钮
         */
        XCBSScene1.prototype.resetStartBtn = function () {
            game.UIUtils.removeSelf(this.spinRunningAni);
            this.spinDefaultAni.play("", 0);
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
        };
        /**
        * 发送c_bet请求
        */
        XCBSScene1.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, data, colorMatrix, colorFlilter, showAtr2, flag, scatternum, i, j, i, j, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [[], [], [], [], []];
                            this.bonusAtr = [];
                            this.scatterIcon = 0;
                            this.eachLineScore = [];
                            this.lineImaArr = [];
                            this.yudiAtr = [];
                            this.allAtr = [];
                            this.scatter = 0;
                            this.allLine = [];
                            this.eachLineIconIndex = [];
                            this.fastItemIndex = 0;
                            this.lineTime = 1500;
                            this.addwin = 0;
                            //测试专用消息
                            if (this.isTest) {
                                if (this.spinTest == 1) {
                                    data2 = { "spinType": this.spinTest, "bet": game.LaohuUtils.bet, "lineCount": 20, "activityId": 0, "freeWheel": this.wheel };
                                }
                                else {
                                    data2 = { "spinType": this.spinTest, "bet": game.LaohuUtils.bet, "lineCount": 20, "activityId": 0, "wheel": this.wheel };
                                }
                            }
                            else {
                                data2 = { "spinType": 0, "bet": game.LaohuUtils.bet, "multiple": game.LaohuUtils.mul, "lineCount": 0, "activityId": 0 };
                            }
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_XCBS);
                                SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                                return [2 /*return*/];
                            }
                            data = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
                            this.ownGold -= NumberFormat.handleFloatDecimal(data);
                            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                            colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            this.startBtn.filters = [colorFlilter];
                            showAtr2 = this.respShowAtr(resp2.spinRes[0]);
                            this.c_betResp(resp2);
                            this.showAtr = this.respShowAtr(resp2.spinRes[resp2.spinRes.length - 1]);
                            this.winGold = resp2.winCount;
                            this.ownGold = resp2.own_gold;
                            this.lineTime = (resp2.spinRes.length - 1) * 3300 + 1500;
                            if (resp2.isSmashing == 1) {
                                this.lineTime = 5300;
                                SoundManager.getInstance().pauseMusic();
                                SoundManager.getInstance().playEffect("xcbs_wildfengbao_mp3");
                                this.showSmashingAni();
                                this.smashingReelIndex = resp2.smashingReelIndex + 1;
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
                            game.LaohuUtils.ToTalMoney = this.ownGold;
                            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
                            this.scatter = resp2.sactter;
                            flag = false;
                            //是否为scatter
                            if (resp2.sactter == 1) {
                                game.LaohuUtils.isScatter = true;
                                scatternum = 0;
                                this.yudiAtr = [];
                                this.yudiAtr2 = [];
                                for (i = 0; i <= 4; i++) {
                                    for (j = 0; j < showAtr2[i].length; j++) {
                                        if (showAtr2[i][j] == 2) {
                                            this.yudiAtr.push(j);
                                            this.yudiAtr2.push(i + 1);
                                        }
                                    }
                                }
                                game.LaohuUtils.freeTimes = resp2.freeTimes;
                            }
                            this.yudiAtrHui = [];
                            this.yudiAtrHui2 = [];
                            for (i = 0; i <= 4; i++) {
                                for (j = 0; j < showAtr2[i].length; j++) {
                                    if (showAtr2[i][j] == 2) {
                                        this.yudiAtrHui.push(j);
                                        this.yudiAtrHui2.push(i + 1);
                                    }
                                }
                            }
                            //免费游戏情况下累加赢取金额
                            if (game.LaohuUtils.isAutoGame) {
                                game.LaohuUtils.totoalWinGold += this.winGold;
                            }
                            this.isStopAni = false;
                            for (i = 0; i < 4; i++) {
                                for (j = 0; j < this.showAtr[i].length; j++) {
                                    //判断前三列几个玉帝
                                    if (this.showAtr[i][j] == 2) {
                                        this.scatterIcon++;
                                        if (this.scatterIcon == 2) {
                                            this.fastItemIndex = i + 2;
                                        }
                                    }
                                    else {
                                        this.startBtn.touchEnabled = true;
                                        this.scroller.touchEnabled = true;
                                    }
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 冰球联盟resp处理
         * @param  {} resp
         */
        XCBSScene1.prototype.c_betResp = function (resp) {
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
         * 每次消除完成展示数组
         * @param  {} resp
         */
        XCBSScene1.prototype.respShowAtr = function (resp) {
            var showAtr = [resp.matrix1[0], resp.matrix1[1], resp.matrix1[2], resp.matrix1[3], resp.matrix1[4]];
            return showAtr;
        };
        /**
         * @param  {egret.Event} e
         */
        XCBSScene1.prototype.scrollerEnd = function (e) {
            var _this = this;
            var data = e.data;
            //场景判断
            if (data.sceneIndex != 1) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    this.isStopLine = false;
                    game.UIUtils.removeSelf(this.smashbg);
                    game.UIUtils.removeSelf(this.smashKuangAni);
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "xcbs_spin_2_png";
                                this.timesLabel.text = "";
                                game.LaohuUtils.downTime2 = 400;
                                game.LaohuUtils.downTime3 = 800;
                                game.LaohuUtils.downTime4 = 1200;
                                game.LaohuUtils.downTime5 = 1600;
                                game.LaohuUtils.speed = 48;
                                this.runningType = RUNNING_TYPE.EMPTY;
                                this.resetStartBtn();
                            }
                        }
                        //图标数组非空校验
                        if (this.showAtr.length != 0) {
                            for (var i = 0; i < this.showAtr[4].length; i++) {
                                //判断第5列上是否有scatter
                                if (this.showAtr[4][i] == 2) {
                                    SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                                    this.scroller.addFoGuang1(5, i, "xcbs_icon_2_guang");
                                }
                                else {
                                    SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                                }
                            }
                        }
                        // this.scroller.removeIconHui(this.HuiAtr);
                        // this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                        //自动游戏自动次数大于0
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            // this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this.quitBtn.touchEnabled = false;
                                this.startBtn.touchEnabled = false;
                                // this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                                this.scroller.sort1();
                                this.checkBonusIcon();
                                return;
                            }
                            egret.setTimeout(function () {
                                if (_this.scatter != 1)
                                    _this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                            if (this.winGold > 0) {
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, this.lineTime);
                            }
                            else {
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, this.lineTime);
                            }
                        }
                        else {
                            if (this.scatter != 1 && this.winGold == 0) {
                                this.resetOtherBtn();
                            }
                            this.resetStartBtn();
                            egret.setTimeout(function () {
                                LogUtils.logD("empty5");
                                if (_this.scatter != 1)
                                    _this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                        }
                        // this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.scroller.sort1();
                        if (this.winGold > 0) {
                            this.startBtn.touchEnabled = false;
                        }
                        ;
                        this.checkBonusIcon();
                    }
                    break;
                case 4:
                    for (var i = 0; i < this.showAtr[3].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[3][i] == 2) {
                            SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                            this.scroller.addFoGuang1(4, i, "xcbs_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                        }
                    }
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 5 && !this.isFastGame)
                        this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                    break;
                case 3:
                    for (var i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                            this.scroller.addFoGuang1(3, i, "xcbs_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                        }
                    }
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2) {
                            var atr = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
                            // this.scroller.setSpecilHui(atr);
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd)
                                return;
                            if (this.fastItemIndex == 4 && !this.isFastGame)
                                this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                        }
                    }
                    break;
                case 2:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[1][i] == 2) {
                            SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                            this.scroller.addFoGuang1(2, i, "xcbs_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                        }
                    }
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 3 && !this.isFastGame)
                        this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                    break;
                case 1:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                            this.scroller.addFoGuang1(1, i, "xcbs_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                        }
                    }
                    break;
            }
        };
        /**
       * 播放总连线
       */
        XCBSScene1.prototype.checkBonusIcon = function () {
            if (game.LaohuUtils.winGolds[0] > 0) {
                this.eachLine();
            }
            else {
                if (this.scatter == 1) {
                    this.showBigwin();
                }
                else {
                    if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                        this.askAutoGame();
                    }
                }
            }
        };
        /**
         * 消除/smashing
         */
        XCBSScene1.prototype.eachLine = function () {
            var _this = this;
            SoundManager.getInstance().playEffect("xcbs_win_mp3");
            this.addwin = 0;
            if (!this.smashingReelIndex) {
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                this.startBtn.filters = [colorFlilter];
                var count_1 = 0;
                async.eachSeries(game.LaohuUtils.allAtrs, function (item, callback) {
                    for (var i = 0; i < item.length; i++) {
                        for (var j = 0; j < item[i].length; j++) {
                            _this.scroller["item" + (i + 1)].showAni(game.LaohuUtils.allAtrs[count_1][i][j]);
                        }
                    }
                    if (game.LaohuUtils.winGolds[count_1] > 0) {
                        _this.commondi.visible = _this.commomScore.visible = true;
                        var data = Number(new Big(game.LaohuUtils.winGolds[count_1]).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    }
                    else {
                        _this.commomScore.text = "";
                        _this.commondi.visible = _this.commomScore.visible = false;
                    }
                    if (count_1 < game.LaohuUtils.showAtrs.length - 1) {
                        egret.setTimeout(function () {
                            SoundManager.getInstance().playEffect("xcbs_clear_mp3");
                        }, _this, 2700);
                    }
                    _this.addwin += game.LaohuUtils.winGolds[count_1];
                    _this.winNum.text = NumberFormat.handleFloatDecimal(_this.addwin) + "";
                    if (_this.scatter != 1)
                        _this.runningType = RUNNING_TYPE.EMPTY;
                    _this.showIconTimeOut = egret.setTimeout(function () {
                        _this.scroller.eliminateIcons(game.LaohuUtils.allAtrs[count_1], game.LaohuUtils.showAtrs[count_1 + 1]);
                        count_1 += 1;
                        callback && callback();
                    }, _this, 3300);
                    if (item == game.LaohuUtils.allAtrs[game.LaohuUtils.allAtrs.length - 1]) {
                        egret.clearTimeout(_this.showIconTimeOut);
                        callback && callback();
                    }
                }, function () {
                    if (_this.scatter == 0) {
                        if (_this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                            egret.setTimeout(_this.showBigwin, _this, 1000);
                        }
                        else {
                            _this.commomScore.text = "";
                            _this.commondi.visible = _this.commomScore.visible = false;
                            _this.scroller.setIconHui();
                            _this.playerGold.text = NumberFormat.handleFloatDecimal(_this.ownGold) + "";
                            egret.setTimeout(function () {
                                if (!game.LaohuUtils.isAutoGame)
                                    _this.resetOtherBtn();
                                var colorMatrix = [
                                    1, 0, 0, 0, 0,
                                    0, 1, 0, 0, 0,
                                    0, 0, 1, 0, 0,
                                    0, 0, 0, 1, 0
                                ];
                                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                                _this.startBtn.filters = [colorFlilter];
                                _this.startBtn.touchEnabled = true;
                            }, _this, 1000);
                            if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                _this.askAutoGame();
                            }
                        }
                        count_1 = 0;
                    }
                    else if (_this.scatter == 1) {
                        if (_this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                            _this.showBigwin();
                        }
                        else {
                            SoundManager.getInstance().playEffect("xcbs_scat_mp3");
                            _this.winNum.text = NumberFormat.handleFloatDecimal(_this.winGold) + "";
                            _this.commondi.visible = _this.commomScore.visible = true;
                            var data = (_this.winGold - _this.addwin) * 100;
                            _this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                            _this.playerGold.text = NumberFormat.handleFloatDecimal(_this.ownGold) + "";
                            for (var i = 0; i < _this.yudiAtr2.length; i++) {
                                _this.scroller.addFoGuang(_this.yudiAtr2[i], _this.yudiAtr[i], "xcbs_icon_2");
                            }
                            egret.setTimeout(function () {
                                _this.commondi.visible = _this.commomScore.visible = false;
                                CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            }, _this, 4000);
                        }
                        count_1 = 0;
                    }
                });
            }
            else if (this.smashingReelIndex) {
                SoundManager.getInstance().stopEffectByName("xcbs_wildfengbao_mp3");
                SoundManager.getInstance().remuseMusic();
                if (this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                    egret.setTimeout(this.showBigwin, this, 1000);
                    this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                }
                else {
                    if (!game.LaohuUtils.isAutoGame)
                        this.resetOtherBtn();
                    this.startBtn.touchEnabled = true;
                    this.commondi.visible = this.commomScore.visible = true;
                    var data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                    this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                    this.showIconTimeOut = egret.setTimeout(function () {
                        _this.commondi.visible = _this.commomScore.visible = false;
                        _this.commomScore.text = "";
                    }, this, 1500);
                    if (this.scatter == 1) {
                        this.scroller.smashingDBani(game.LaohuUtils.allAtrs[0], 1);
                        SoundManager.getInstance().playEffect("xcbs_scat_mp3");
                        this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                        this.commondi.visible = this.commomScore.visible = true;
                        var data_1 = (this.winGold - this.addwin) * 100;
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data_1) + "";
                        for (var i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "xcbs_icon_2");
                        }
                        egret.setTimeout(function () {
                            _this.commondi.visible = _this.commomScore.visible = false;
                            CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                        }, this, 4000);
                    }
                    else {
                        var colorMatrix = [
                            1, 0, 0, 0, 0,
                            0, 1, 0, 0, 0,
                            0, 0, 1, 0, 0,
                            0, 0, 0, 1, 0
                        ];
                        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                        this.startBtn.filters = [colorFlilter];
                        this.scroller.smashingDBani(game.LaohuUtils.allAtrs[0], 0);
                    }
                }
            }
        };
        /**
         * bigwin
         */
        XCBSScene1.prototype.showBigwin = function () {
            var _this = this;
            //非空判断
            if (this.winGold > 0) {
                egret.clearTimeout(this.autoGameTimeout);
                var func_1 = function () {
                    _this.bigWinPanel.touchEnabled = false;
                    // game.UIUtils.removeSelf(this.bigWinPanel);
                    _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                    if (_this.scatter != 1)
                        _this.startBtn.touchEnabled = true;
                    if (!game.LaohuUtils.isAutoGame) {
                        _this.runningType = RUNNING_TYPE.EMPTY;
                    }
                    /**
                     * bigwin结束窗口效果
                     */
                    _this.bigWinPanel.stopShowBigWin(function () {
                        _this.commomScore.visible = _this.commondi.visible = false;
                        //自动游戏bigwin后开始下一把
                        if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                            _this.autoGameTimeout = egret.setTimeout(function () {
                                _this.startBtnTouch();
                            }, _this, 1500);
                        }
                        if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                            _this.scroller.setIconHui();
                            _this.resetOtherBtn();
                            var colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            _this.startBtn.filters = [colorFlilter];
                            _this.startBtn.touchEnabled = true;
                        }
                        if (!game.LaohuUtils.isAutoGame) {
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        }
                        if (_this.scatter == 1) {
                            egret.clearTimeout(_this.eachLineTimeOut);
                            _this.commondi.visible = _this.commomScore.visible = true;
                            var data = (_this.winGold - _this.addwin) * 100;
                            _this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                            _this.winNum.text = NumberFormat.handleFloatDecimal(_this.winGold) + "";
                            SoundManager.getInstance().playEffect("xcbs_scat_mp3");
                            for (var i = 0; i < _this.yudiAtr2.length; i++) {
                                _this.scroller.addFoGuang(_this.yudiAtr2[i], _this.yudiAtr[i], "xcbs_icon_2");
                            }
                            egret.setTimeout(function () {
                                _this.commondi.visible = _this.commomScore.visible = false;
                                CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            }, _this, 4000);
                        }
                        else {
                            if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                _this.askAutoGame();
                            }
                            ;
                        }
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                        _this.playerGold.text = NumberFormat.handleFloatDecimal(_this.ownGold) + "";
                    });
                };
                this.bigWinPanel = new xcbs.XCBSBigwinGroup();
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
                    _this.commomScore.visible = _this.commondi.visible = false;
                    _this.playerGold.text = NumberFormat.handleFloatDecimal(_this.ownGold) + "";
                    //自动游戏bigwin后开始下一把
                    if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                        _this.autoGameTimeout = egret.setTimeout(function () {
                            _this.startBtnTouch();
                        }, _this, 1500);
                    }
                    if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                        if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                            _this.scroller.setIconHui();
                            _this.resetOtherBtn();
                            var colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            _this.startBtn.filters = [colorFlilter];
                            _this.startBtn.touchEnabled = true;
                        }
                    }
                    if (!game.LaohuUtils.isAutoGame) {
                        _this.runningType = RUNNING_TYPE.EMPTY;
                    }
                    if (_this.scatter == 1) {
                        egret.clearTimeout(_this.eachLineTimeOut);
                        _this.winNum.text = NumberFormat.handleFloatDecimal(_this.winGold) + "";
                        SoundManager.getInstance().playEffect("xcbs_scat_mp3");
                        _this.commondi.visible = _this.commomScore.visible = true;
                        var data = (_this.winGold - _this.addwin) * 100;
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                        for (var i = 0; i < _this.yudiAtr2.length; i++) {
                            _this.scroller.addFoGuang(_this.yudiAtr2[i], _this.yudiAtr[i], "xcbs_icon_2");
                        }
                        egret.setTimeout(function () {
                            _this.commondi.visible = _this.commomScore.visible = false;
                            CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                        }, _this, 4000);
                    }
                    else {
                        if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            _this.askAutoGame();
                        }
                        ;
                    }
                    game.UIUtils.removeSelf(_this.bigWinPanel);
                });
                this.resizeGroup.addChild(this.bigWinPanel);
            }
        };
        /**
       * 免费游戏结束后到正常游戏
       */
        XCBSScene1.prototype.free2Commom = function () {
            var _this = this;
            this.scatter = 0;
            this.startBtn.touchEnabled = true;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.LaohuUtils.ToTalMoney) + "";
            this.ownGold = game.LaohuUtils.ToTalMoney;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.LaohuUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().playMusic("xcbs_background_mus_mp3");
            this.checkQuitVisible();
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "xcbs_spin_2_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.LaohuUtils.freeWin >= game.LaohuUtils.oneMax) {
                game.LaohuUtils.auto_times = 0;
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.startBtn.source = "xcbs_spin_2_png";
                this.timesLabel.text = "";
                this.runningType = RUNNING_TYPE.EMPTY;
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            //判断是否为免费游戏并且是否有满足总赢取条件
            if (game.LaohuUtils.totalWin && game.LaohuUtils.isAutoGame) {
                //自动游戏总赢取条件满足
                if (game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.resetOtherBtn();
                    this.startBtn.source = "xcbs_spin_2_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            //判断是否为免费游戏并且是否有满足总下注条件
            if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    this.resetOtherBtn();
                    this.startBtn.source = "xcbs_spin_2_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                this.setOtherBtn();
                game.UIUtils.removeSelf(this.spinDefaultAni);
                this.isFreeBack = true;
                egret.setTimeout(function () { _this.startBtnTouch(); }, this, 1000);
            }
            else {
                this.resetOtherBtn();
                var colorMatrix = [
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                this.startBtn.filters = [colorFlilter];
            }
        };
        /**
         * 开始自动游戏
         */
        XCBSScene1.prototype.startAutoGame = function () {
            //余额判断
            if (game.LaohuUtils.bet * game.LaohuUtils.mul * 50 > this.ownGold) {
                this.isFreeBack = false;
                this.startBtn.source = "xcbs_spin_2_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "xcbs_spin_1_png";
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            this.smashingReelIndex = 0;
            //无穷次数情况
            if (game.LaohuUtils.auto_times > 1000) {
                this.timesLabel.text = "s";
            }
            else {
                this.timesLabel.text = game.LaohuUtils.auto_times + "";
            }
            if (!this.isFreeBack) {
                game.LaohuUtils.totoalWinGold = 0;
                game.LaohuUtils.totalBet = 0;
            }
            this.startBtnTouch();
        };
        /**
         * 玩家加注
         */
        XCBSScene1.prototype.addbetTouch = function () {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[0];
                        break;
                    case 2:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[1];
                        break;
                    case 3:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[3];
                        break;
                    case 4:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 5:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[1];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 6:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[2];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[5];
                        break;
                    case 7:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[5];
                        break;
                    case 8:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 9:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[6];
                        break;
                    case 10:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                }
            }
            var data1 = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) + "";
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.utilsBet = game.LaohuUtils.bet;
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            if ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.subBetTouch();
            }
        };
        /**
         * 玩家减注
         */
        XCBSScene1.prototype.subBetTouch = function () {
            //倍数判断
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 1) {
                return;
            }
            else {
                game.LaohuUtils.totalWin = 0;
                this.bet -= 1;
                switch (this.bet) {
                    case 1:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[0];
                        break;
                    case 2:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[1];
                        break;
                    case 3:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[3];
                        break;
                    case 4:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 5:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[1];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 6:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[2];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[5];
                        break;
                    case 7:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[5];
                        break;
                    case 8:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 9:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[6];
                        break;
                    case 10:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                }
            }
            var data = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) + "";
            // this[`betTtipsGroup`].visible = true;
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.utilsBet = game.LaohuUtils.bet;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        };
        /**
         * 设置最大倍数
         */
        XCBSScene1.prototype.setMaxBet = function () {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            var bet = game.LaohuUtils.bets[4];
            var mul = game.LaohuUtils.muls[9];
            var data1 = Number(new Big(bet * mul).mul(50));
            //金币是否满足条件
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.LaohuUtils.bet = game.LaohuUtils.bets[4];
            game.LaohuUtils.mul = game.LaohuUtils.muls[9];
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(data1) + "";
            this.bet = 10;
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.utilsBet = game.LaohuUtils.bet;
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        };
        /**
         * wild风暴特效
         */
        XCBSScene1.prototype.showSmashingAni = function () {
            var _this = this;
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.smashbg.play("", 0);
            this.smashbg.horizontalCenter = 0;
            this.smashbg.bottom = -80;
            this.smashKuangAni.horizontalCenter = 0;
            this.smashKuangAni.bottom = 60;
            this.smashKuangAni.play("", 0);
            this.gameGroup.addChild(this.smashKuangAni);
            this.resizeGroup.addChild(this.smashbg);
            this.smashbg.resetPosition();
            this.smashKuangAni.resetPosition();
            this.smashingAni = DBComponent.create("xcbs_icon_1_long", "xcbs_icon_1_long");
            egret.setTimeout(function () {
                _this.smashingAni.play("xcbs_icon_1_roll", 1);
                _this.gameGroup.addChild(_this.smashingAni);
                _this.gameGroup.addChild(_this.commondi);
                _this.gameGroup.addChild(_this.commomScore);
                _this.smashingAni.resetPosition();
                _this.smashingAni.bottom = 90;
                _this.smashingAni.touchEnabled = false;
                _this.smashingAni.horizontalCenter = (_this.smashingReelIndex - 3) * 193;
                _this.smashingAni.callback = function () {
                    _this.smashingAni.play("xcbs_icon_1_stop", 0);
                };
            }, this, 3000);
        };
        return XCBSScene1;
    }(game.BaseSlotScene));
    xcbs.XCBSScene1 = XCBSScene1;
    __reflect(XCBSScene1.prototype, "xcbs.XCBSScene1");
})(xcbs || (xcbs = {}));
