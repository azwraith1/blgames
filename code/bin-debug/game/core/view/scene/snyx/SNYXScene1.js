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
var snyx;
(function (snyx) {
    var SNYXScene1 = (function (_super) {
        __extends(SNYXScene1, _super);
        function SNYXScene1() {
            var _this = _super.call(this) || this;
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SNYX;
            _this.AUTOGAME_NOTIFY = PanelNotify.OPEN_SNYX_AUTO_PANEL;
            _this.TIPS_NOTIFY = PanelNotify.OPEN_SNYX_TIPS_PANEL;
            _this.RECORD_NOTIFY = PanelNotify.OPEN_DNTG_RECORD_PANEL;
            _this.SETING_NOTIFY = PanelNotify.OPEN_SETTING;
            _this.QUIT_NOTIFY = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
            _this.lineSmall = "";
            _this.lineMid = "";
            _this.lineBig = "";
            _this.lineHuge = "";
            _this.buttonEffect = "snyx_button_mp3";
            _this.scrollerFastEffect = "sgws_reel_fast_spin_mp3";
            _this.lineAniXArray = [-345, -172, 0, 171, 340];
            _this.lineAniYArray = [347, 204, 60];
            _this.lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
            _this.firstLineX = -490;
            _this.lastLineX = 340;
            _this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            _this.utilsBet = game.LaohuUtils.bet;
            _this.fixpositionY = [40, 40, 20, 20];
            _this.fastSpeedTime = 4000;
            _this.isSetHui = false;
            _this.sceneId = 1018;
            _this.gameId = "snyx";
            _this.bet = 1;
            _this.HuiAtr = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
            _this.fastEnd = false;
            _this.runningType = 3; //选择类型
            _this.winGold = 0;
            _this.fastItemIndex = 0;
            _this.eachLineIconIndex = []; //20条线中奖连线中中奖的图标index
            _this.allLine = []; //20线总中奖连线
            _this.lineTime = 1500;
            _this.ownGold = 0; //玩家当前金钱
            _this.isFreeBack = false;
            _this.isTest = false;
            _this.spinTest = 0;
            _this.lastSmahs = 0;
            _this.skinName = "SNYXScene1Skin";
            return _this;
        }
        SNYXScene1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            SoundManager.getInstance().playMusic("snyx_bgm_mp3");
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
            // this.scroller.addBonusAni([[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2]]);
            this.roleAniFuc("snyx_role1_de", 0, true);
            this.roleAniFuc("snyx_role2_de", 0, false);
        };
        SNYXScene1.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.SNYX_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        };
        SNYXScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.SNYX_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        };
        SNYXScene1.prototype.initAni = function () {
            this.bgAni1 = DBComponent.create("snyx_bg01", "snyx_bg01");
            this.bgAni1.play("", 0);
            this.bgAni1.bottom = 0;
            this.bgAni1.horizontalCenter = -7;
            this.bgAni1.touchEnabled = false;
            this.roleAniGroup.addChild(this.bgAni1);
            this.bgAni1.resetPosition();
            this.spinDefaultAni = DBComponent.create("snyx_spin01", "snyx_spin01");
            this.spinDefaultAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinDefaultAni.horizontalCenter = 2;
            this.spinDefaultAni.bottom = 70;
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
            this.spinStartAni = DBComponent.create("snyx_spin02", "snyx_spin02");
            this.spinRunningAni = DBComponent.create("snyx_spin03", "snyx_spin03");
            this.spinStopAni = DBComponent.create("snyx_spin04", "snyx_spin04");
        };
        /**
         * @param  {egret.Event} e
         */
        SNYXScene1.prototype.enterGame = function (e) {
            var resp = e.data;
            game.LaohuUtils.bets = [];
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.LaohuUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
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
            this.lastSmahs = players.isSmashing;
            if (players.isSmashing) {
                this.wildAtr = players.smashingMatrix;
                if (players.freeTimes == 0)
                    this.wildKuang(this.wildAtr);
            }
            else {
                this.wildAtr = [];
            }
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold, 3) + "";
            game.LaohuUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.bet = game.LaohuUtils.bets[0];
            //判断是否为免费游戏
            if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.LaohuUtils.bet = players.lastBet;
                this.setOtherBtn();
                this.startBtn.touchEnabled = false;
                // this.roleAniFuc("sgws_role_disappear", 1, () => {
                //     game.UIUtils.removeSelf(this.roleAni);
                //     SoundManager.getInstance().playEffect("sgws_role_intofree_mp3");
                CF.dP(ENo.SNYX_ENTER_FREE_GAME, { isfast: this.isFastGame, atr: this.wildAtr });
                // })
            }
            //重连后倍数判断
            switch (game.LaohuUtils.bet) {
                case 1:
                    this.bet = 1;
                    break;
                case 2:
                    this.bet = 2;
                    break;
                case 3:
                    this.bet = 4;
                    break;
                case 4:
                    this.bet = 10;
                    break;
                case 5:
                    this.bet = 20;
                    break;
                case 6:
                    this.bet = 30;
                    break;
                case 7:
                    this.bet = 60;
                    break;
                case 8:
                    this.bet = 100;
                    break;
                case 9:
                    this.bet = 140;
                    break;
                case 10:
                    this.bet = 200;
                    break;
            }
            this.utilsBet = game.LaohuUtils.bet;
            var data1 = Number(new Big(game.LaohuUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data1) + "";
            this.beishu.text = game.LaohuUtils.bet + "";
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        };
        /**
         * spin旋转
         */
        SNYXScene1.prototype.startBtnTouch = function () {
            var _this = this;
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.LaohuUtils.bet * 0.5 > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, function () {
                    _this.startBtn.source = "snyx_spin_1_png";
                    game.LaohuUtils.isAutoGame = false;
                    _this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    _this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
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
                        this.startBtn.source = "snyx_spin_1_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                        this.resetStartBtn();
                        var colorMatrix = [
                            1, 0, 0, 0, 0,
                            0, 1, 0, 0, 0,
                            0, 0, 1, 0, 0,
                            0, 0, 0, 1, 0
                        ];
                        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                        this.startBtn.filters = [colorFlilter];
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "snyx_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                            this.resetStartBtn();
                            var colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            this.startBtn.filters = [colorFlilter];
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
                            this.startBtn.source = "snyx_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                            this.resetStartBtn();
                            var colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            this.startBtn.filters = [colorFlilter];
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.LaohuUtils.bet * 0.5;
                    if (game.LaohuUtils.auto_times > 1000) {
                        this.timesLabel.text = "s";
                    }
                }
                else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                    this.timesLabel.visible = false;
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.startBtn.source = "snyx_spin_1_png";
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
                this.setOtherBtn();
                this.scroller.run();
                // SoundManager.getInstance().playEffect("sgws_reelstart_mp3");
                SoundManager.getInstance().playEffect("snyx_reel_mp3");
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
        SNYXScene1.prototype.startBtnTouch0 = function () {
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
        SNYXScene1.prototype.fastGame = function () {
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
                this.startBtn.source = "snyx_spin_1_png";
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
                if (this.scatter != 1)
                    this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "snyx_spin_1_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spinStopAni.play("", 1);
                this.spinStopAni.horizontalCenter = 2;
                this.spinStopAni.bottom = 40;
                this.spinGroup.addChild(this.spinStopAni);
                this.spinStopAni.resetPosition();
                this.spinStopAni.callback = function () {
                    game.UIUtils.removeSelf(_this.spinStopAni);
                };
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            else {
                this.startBtn.source = "snyx_spin_1_png";
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }
            }
            SoundManager.getInstance().stopEffectByName("snyx_firework_mp3");
            SoundManager.getInstance().stopEffectByName("snyx_reel_fast_mp3");
            SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
        };
        /**
         * 点击转轴区域快速停止游戏
         */
        SNYXScene1.prototype.scrollerFastGame = function () {
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
                SoundManager.getInstance().stopEffectByName("snyx_firework_mp3");
                SoundManager.getInstance().stopEffectByName("snyx_reel_fast_mp3");
                SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
            }
        };
        /**
         * 上次游戏效果移除
         */
        SNYXScene1.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.isStopLine = true;
                this.commondi.visible = this.commomScore.visible = false;
                egret.clearTimeout(this.sethuiTimeout);
                this.clearLineImaPool();
                this.scroller.removeSmashingDb();
            }
            this.scroller.visible = true;
            // this.scroller.hideIcon();
            this.fastEnd = false;
            this.scroller.stopIconDb();
            // this.scroller.setIconHui();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
        };
        /**
        * 开始按钮动画
        */
        SNYXScene1.prototype.setStartBtn = function () {
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.spinRunningAni.play("", 0);
            this.spinRunningAni.bottom = 45;
            this.spinRunningAni.horizontalCenter = 0;
            this.spinGroup.addChild(this.spinRunningAni);
            this.spinRunningAni.resetPosition();
            this.spinStartAni.play("", 1);
            this.spinStartAni.horizontalCenter = 0;
            this.spinStartAni.bottom = 40;
            this.spinGroup.addChild(this.spinStartAni);
            this.spinStartAni.resetPosition();
        };
        /**
         * 还原开始按钮
         */
        SNYXScene1.prototype.resetStartBtn = function () {
            game.UIUtils.removeSelf(this.spinRunningAni);
            this.spinDefaultAni.play("", 0);
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
        };
        /**
         * 发送c_bet请求
         */
        SNYXScene1.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, data, colorMatrix, colorFlilter, resp1, isbonus, i, i, i, j, aaa, str_lingshi, temp, temp2, arr, k, scatternum, i, j, i, j;
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
                            //测试专用消息
                            data2 = { "spinType": 0, "bet": game.LaohuUtils.bet, "lineCount": 243, "activityId": 0 };
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
                            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold, 3) + "";
                            colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            this.startBtn.filters = [colorFlilter];
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
                                SoundManager.getInstance().playEffect("snyx_happy_mp3");
                                this.roleAniFuc("snyx_role1_await", 0, true);
                                this.roleAniFuc("snyx_role2_await", 0, false);
                                this.changeBgAni();
                                this.messageTimeOut = egret.setTimeout(function () {
                                    _this.scroller.runResult(_this.showAtr);
                                    _this.wildKuang(_this.wildAtr);
                                    _this.runningType = RUNNING_TYPE.RESULT;
                                    game.UIUtils.removeSelf(_this.bgAni2);
                                    _this.roleAniFuc("snyx_role1_de", 0, true);
                                    _this.roleAniFuc("snyx_role2_de", 0, false);
                                }, this, 4800);
                                for (i = 0; i < this.wildAtr.length; i++) {
                                    if (this.wildAtr[i] >= 0) {
                                        this.wildWin(i);
                                        SoundManager.getInstance().playEffect("snyx_firework_mp3");
                                    }
                                }
                            }
                            else if (this.isSmash == 1 && this.lastSmahs == 1 && isbonus == 0) {
                                this.messageTimeOut = egret.setTimeout(function () {
                                    _this.runningType = RUNNING_TYPE.RESULT;
                                    _this.scroller.runResult(_this.showAtr);
                                }, this, 300);
                            }
                            else {
                                this.messageTimeOut = egret.setTimeout(function () {
                                    _this.runningType = RUNNING_TYPE.RESULT;
                                    _this.scroller.runResult(_this.showAtr);
                                    if (_this.isFastGame) {
                                        _this.scroller.runResultFast();
                                    }
                                }, this, 300);
                                this.scroller.removeWild();
                            }
                            this.lastSmahs = this.isSmash;
                            this.winGold = resp2.winCount;
                            this.ownGold = resp2.own_gold;
                            if (this.winGold > 0) {
                                this.lineTime = 1500;
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
                            //是否为scatter
                            if (resp2.sactter == 1) {
                                scatternum = 0;
                                this.yudiAtr = [];
                                for (i = 0; i <= 4; i++) {
                                    for (j = 0; j < this.showAtr[i].length; j++) {
                                        if (this.showAtr[i][j] == 2) {
                                            this.yudiAtr.push(j);
                                            this.yudiAtr2.push(i + 1);
                                        }
                                    }
                                }
                                game.LaohuUtils.freeTimes = resp2.freeTimes;
                            }
                            //免费游戏情况下累加赢取金额
                            if (game.LaohuUtils.isAutoGame) {
                                game.LaohuUtils.totoalWinGold += this.winGold;
                            }
                            for (i = 0; i < 3; i++) {
                                for (j = 0; j < this.showAtr2[i].length; j++) {
                                    //判断前三列几个玉帝
                                    if (this.showAtr2[i][j] == 2) {
                                        this.scatterIcon++;
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
        SNYXScene1.prototype.changeBgAni = function () {
            this.bgAni2 = DBComponent.create("snyx_bg02", "snyx_bg02");
            this.bgAni2.play("", 0);
            this.bgAni2.bottom = 0;
            this.bgAni2.horizontalCenter = 0;
            this.bgAni2.touchEnabled = false;
            this.roleAniGroup.addChild(this.bgAni2);
            this.bgAni2.resetPosition();
        };
        /**
         * @param  {egret.Event} e
         */
        SNYXScene1.prototype.scrollerEnd = function (e) {
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
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "snyx_spin_1_png";
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
                                    SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                                    this.scroller.addFoGuang1(5, i, "snyx_icon_2_guang");
                                }
                                else {
                                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                                }
                            }
                        }
                        // this.scroller.removeIconHui(this.HuiAtr);
                        this.winNum.text = this.winGold + "";
                        // if (this.isSmash) this.scroller.wildIcon(this.wildAtr);
                        SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                        //自动游戏自动次数大于0
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            // this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this.quitBtn.touchEnabled = false;
                                this.startBtn.touchEnabled = false;
                                // this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
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
                            this.resetOtherBtn();
                            this.resetStartBtn();
                            egret.setTimeout(function () {
                                LogUtils.logD("empty5");
                                if (_this.scatter != 1)
                                    _this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                        }
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold, 3) + "";
                        // if (this.winGold > 0) { this.startBtn.touchEnabled = false };
                        this.checkBonusIcon();
                    }
                    break;
                case 4:
                    for (var i = 0; i < this.showAtr[3].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[3][i] == 2) {
                            SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                            this.scroller.addFoGuang1(4, i, "snyx_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                        }
                    }
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 5 && !this.isFastGame) {
                        this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                    }
                    break;
                case 3:
                    for (var i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                            this.scroller.addFoGuang1(3, i, "snyx_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
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
                            if (this.fastItemIndex == 4 && !this.isFastGame) {
                                this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                            }
                        }
                    }
                    break;
                case 2:
                    for (var i = 0; i < this.showAtr[1].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[1][i] == 2) {
                            SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                            this.scroller.addFoGuang1(2, i, "snyx_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                        }
                    }
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 3 && !this.isFastGame) {
                        this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                    }
                    break;
                case 1:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                            this.scroller.addFoGuang1(1, i, "snyx_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                        }
                    }
                    break;
            }
        };
        /**
         * 游戏中奖结算
         */
        SNYXScene1.prototype.checkBonusIcon = function () {
            if (this.isSmash == 1 && this.lastSmahs == 0) {
                // this.wildWin();
            }
            this.commwin();
        };
        /**
         * wild游戏的框
         * @param  {Array<number>} smashAtr
         */
        SNYXScene1.prototype.wildKuang = function (smashAtr) {
            for (var i = 0; i < smashAtr.length; i++) {
                if (smashAtr[i] >= 0)
                    this.scroller.wildKuang(i, smashAtr[i]);
            }
        };
        SNYXScene1.prototype.wildDown = function (smashAtr) {
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
         * wild 中奖主界面烟花效果
         */
        SNYXScene1.prototype.wildWin = function (i) {
            // for (let i = 0; i < 5; i++) {
            var wildAni = new DBComponent("snyx_wild");
            wildAni.play("", 1);
            wildAni.horizontalCenter = (i - 2) * 170;
            wildAni.bottom = 290;
            this.roleAniGroup.addChild(wildAni);
            wildAni.resetPosition();
            // }
        };
        /**
         * 普通中奖效果
         */
        SNYXScene1.prototype.commwin = function () {
            var _this = this;
            if (this.winGold >= game.LaohuUtils.bet * 30) {
                this.bigwin();
            }
            else {
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    if (this.scatter == 1)
                        this.runningType = RUNNING_TYPE.STOP;
                    this.commomScore.visible = this.commondi.visible = true;
                    var data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                    SoundManager.getInstance().playEffect("snyx_award_mp3");
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    this.roleAniFuc("snyx_role1_happy", 1, true, function () {
                        _this.roleAniFuc("snyx_role1_de", 0, true);
                    });
                    this.roleAniFuc("snyx_role2_happy", 1, false, function () {
                        _this.roleAniFuc("snyx_role2_de", 0, false);
                    });
                    var m = Math.ceil(Math.random() * 2);
                    SoundManager.getInstance().playEffect("snyx_laugh" + m + "_mp3");
                    this.removeScoreTimeout = egret.setTimeout(function () {
                        if (!game.LaohuUtils.isAutoGame || _this.scatter == 1) {
                            _this.addEachLineAni();
                        }
                    }, this, 2500);
                    if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                        this.askAutoGame();
                    }
                }
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        SoundManager.getInstance().playEffect("snyx_happy_mp3");
                        this.roleAniFuc("snyx_role1_cheer", 1, true, function () {
                            _this.roleAniFuc("snyx_role1_de", 0, true);
                        });
                        this.roleAniFuc("snyx_role2_cheer", 1, false, function () {
                            _this.roleAniFuc("snyx_role2_de", 0, false);
                        });
                        for (var i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "snyx_icon_2");
                        }
                        egret.setTimeout(function () {
                            CF.dP(ENo.SNYX_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                        }, this, 2500);
                    }
                    else {
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            this.askAutoGame();
                        }
                    }
                }
            }
        };
        SNYXScene1.prototype.addEachLineAni = function () {
            var _this = this;
            //非空判断
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) {
                    this.quitBtn.touchEnabled = false;
                    this.resetStartBtn();
                }
                this.scroller.stopIconDb();
                var count_1 = 0;
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, function (index, callback) {
                    // if (this.isStopAni) return;
                    for (var j = 0; j < index.length; j++) {
                        var k = j + 1;
                        _this.scroller["item" + k].showAni(index[j]);
                        var data = Number(new Big(_this.eachLineScore[count_1]).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                        _this.commomScore.visible = _this.commondi.visible = true;
                    }
                    //单一连线
                    if (_this.bonusAtr.length == 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                _this.commomScore.visible = _this.commondi.visible = false;
                            }, _this, 1500);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2500);
                    }
                    //多条连线
                    if (_this.bonusAtr.length > 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                _this.scroller.stopIconDb();
                                _this.commomScore.visible = _this.commondi.visible = false;
                            }, _this, 2100);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2500);
                    }
                    count_1++;
                }, function () {
                    //callback 判断结果是否为scatter
                    if (_this.scatter == 1) {
                        _this.commomScore.visible = _this.commondi.visible = false;
                        _this.runningType = RUNNING_TYPE.STOP;
                        SoundManager.getInstance().playEffect("snyx_happy_mp3");
                        _this.roleAniFuc("snyx_role1_cheer", 1, true, function () {
                            _this.roleAniFuc("snyx_role1_de", 0, true);
                        });
                        _this.roleAniFuc("snyx_role2_cheer", 1, false, function () {
                            _this.roleAniFuc("snyx_role2_de", 0, false);
                        });
                        for (var i = 0; i < _this.yudiAtr2.length; i++) {
                            _this.scroller.addFoGuang(_this.yudiAtr2[i], _this.yudiAtr[i], "snyx_icon_2");
                        }
                        egret.setTimeout(function () {
                            CF.dP(ENo.SNYX_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            _this.resetOtherBtn();
                        }, _this, 2500);
                        if (!game.LaohuUtils.isAutoGame)
                            _this.resetStartBtn();
                    }
                    else {
                        count_1 = 0;
                        _this.commomScore.visible = _this.commondi.visible = false;
                        return _this.addEachLineAni();
                    }
                });
            }
        };
        SNYXScene1.prototype.bigwin = function () {
            var _this = this;
            egret.clearTimeout(this.autoGameTimeout);
            var func = function () {
                _this.bigWinPanel.touchEnabled = false;
                // game.UIUtils.removeSelf(this.bigWinPanel);
                _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, _this);
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
                    _this.roleAniFuc("snyx_role1_de", 0, true);
                    _this.roleAniFuc("snyx_role2_de", 0, false);
                    //自动游戏bigwin后开始下一把
                    if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                        _this.autoGameTimeout = egret.setTimeout(function () {
                            _this.startBtnTouch();
                        }, _this, 2000);
                    }
                    if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
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
                        egret.clearTimeout(_this.eachLineTimeOut);
                        _this.eachLineTimeOut = egret.setTimeout(function () {
                            _this.addEachLineAni();
                        }, _this, _this.lineTime);
                    }
                    if (!game.LaohuUtils.isAutoGame) {
                        _this.runningType = RUNNING_TYPE.EMPTY;
                    }
                    if (_this.scatter == 1) {
                        egret.clearTimeout(_this.eachLineTimeOut);
                        _this.addEachLineAni();
                        _this.commondi.visible = _this.commomScore.visible = true;
                        var data = Number(new Big(_this.winGold).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
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
                _this.playerGold.text = NumberFormat.handleFloatDecimal(_this.ownGold, 3) + "";
                _this.roleAniFuc("snyx_role1_de", 0, true);
                _this.roleAniFuc("snyx_role2_de", 0, false);
                //自动游戏bigwin后开始下一把
                if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                    _this.autoGameTimeout = egret.setTimeout(function () {
                        _this.startBtnTouch();
                    }, _this, 2000);
                }
                if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                    if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
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
                    egret.clearTimeout(_this.eachLineTimeOut);
                    _this.eachLineTimeOut = egret.setTimeout(function () {
                        _this.addEachLineAni();
                    }, _this, _this.lineTime);
                }
                ;
                if (_this.scatter == 1) {
                    egret.clearTimeout(_this.eachLineTimeOut);
                    _this.addEachLineAni();
                    _this.winNum.text = NumberFormat.handleFloatDecimal(_this.winGold, 3) + "";
                    _this.commondi.visible = _this.commomScore.visible = true;
                    var data = Number(new Big(_this.winGold).mul(100));
                    _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                }
                else {
                    if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                        _this.askAutoGame();
                    }
                    ;
                }
                game.UIUtils.removeSelf(_this.bigWinPanel);
            });
            this.roleAniFuc("snyx_role1_cheer", 0, true);
            this.roleAniFuc("snyx_role2_cheer", 0, false);
            this.resizeGroup.addChild(this.bigWinPanel);
        };
        /**
       * 免费游戏结束后到正常游戏
       */
        SNYXScene1.prototype.free2Commom = function () {
            var _this = this;
            this.scatter = 0;
            this.startBtn.touchEnabled = true;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.LaohuUtils.ToTalMoney, 3) + "";
            this.ownGold = game.LaohuUtils.ToTalMoney;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.LaohuUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold, 3) + "";
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().playMusic("snyx_bgm_mp3");
            this.checkQuitVisible();
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "snyx_spin_1_png";
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
                this.startBtn.source = "snyx_spin_1_png";
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
                    this.startBtn.source = "snyx_spin_1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                    this.resetStartBtn();
                    var colorMatrix = [
                        1, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 1, 0, 0,
                        0, 0, 0, 1, 0
                    ];
                    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    this.startBtn.filters = [colorFlilter];
                    var colorMatrix = [
                        1, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 1, 0, 0,
                        0, 0, 0, 1, 0
                    ];
                    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    this.startBtn.filters = [colorFlilter];
                    return;
                }
            }
            //判断是否为免费游戏并且是否有满足总下注条件
            if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    this.resetOtherBtn();
                    this.startBtn.source = "snyx_spin_1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                    this.resetStartBtn();
                    var colorMatrix = [
                        1, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 1, 0, 0,
                        0, 0, 0, 1, 0
                    ];
                    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    this.startBtn.filters = [colorFlilter];
                    return;
                }
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                this.setOtherBtn();
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
        SNYXScene1.prototype.startAutoGame = function () {
            //余额判断
            if (game.LaohuUtils.bet * 0.5 > this.ownGold) {
                this.isFreeBack = false;
                this.startBtn.source = "snyx_spin_1_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "snyx_spin_2_png";
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
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
        SNYXScene1.prototype.addbetTouch = function () {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        break;
                    case 2:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[1];
                        break;
                    case 3:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[2];
                        break;
                    case 4:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        break;
                    case 5:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        break;
                    case 6:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[5];
                        break;
                    case 7:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[6];
                        break;
                    case 8:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[7];
                        break;
                    case 9:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[8];
                        break;
                    case 10:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[9];
                        break;
                }
            }
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * 0.5)) + "";
            this.beishu.text = game.LaohuUtils.bet + "";
            this.utilsBet = game.LaohuUtils.bet;
            if ((game.LaohuUtils.bet * 0.5) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.subBetTouch();
            }
        };
        /**
         * 玩家减注
         */
        SNYXScene1.prototype.subBetTouch = function () {
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
                        break;
                    case 2:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[1];
                        break;
                    case 3:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[2];
                        break;
                    case 4:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        break;
                    case 5:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        break;
                    case 6:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[5];
                        break;
                    case 7:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[6];
                        break;
                    case 8:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[7];
                        break;
                    case 9:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[8];
                        break;
                    case 10:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[9];
                        break;
                }
            }
            var data = Number(new Big(game.LaohuUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * 0.5)) + "";
            this.beishu.text = game.LaohuUtils.bet + "";
            this.utilsBet = game.LaohuUtils.bet;
        };
        /**
         * 设置最大倍数
         */
        SNYXScene1.prototype.setMaxBet = function () {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            var bet = game.LaohuUtils.bets[9];
            var data1 = Number(new Big(bet).mul(0.5));
            //金币是否满足条件
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.LaohuUtils.bet = game.LaohuUtils.bets[9];
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(data1) + "";
            this.bet = 10;
            this.beishu.text = game.LaohuUtils.bet + "";
            this.utilsBet = game.LaohuUtils.bet;
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        };
        /**
         * 老鼠角色动画
         * @param  {string} dbname3
         * @param  {number} loop
         * @param  {} callback
         */
        SNYXScene1.prototype.roleAniFuc = function (dbname, loop, isMale, callback) {
            if (isMale) {
                game.UIUtils.removeSelf(this.roleAniMale);
                this.roleAniMale = DBComponent.create(dbname, dbname);
                this.roleAniMale.play("", loop);
                this.roleAniGroup.addChild(this.roleAniMale);
                this.roleAniMale.horizontalCenter = 500;
                this.roleAniMale.bottom = 90;
                this.roleAniMale.resetPosition();
            }
            else {
                game.UIUtils.removeSelf(this.roleAniFemale);
                this.roleAniFemale = DBComponent.create(dbname, dbname);
                this.roleAniFemale.play("", loop);
                this.roleAniGroup.addChild(this.roleAniFemale);
                this.roleAniFemale.horizontalCenter = -500;
                this.roleAniFemale.bottom = 90;
                this.roleAniFemale.resetPosition();
            }
            if (loop == 1) {
                this.roleAniFemale.callback = function () {
                    callback && callback();
                };
                this.roleAniMale.callback = function () {
                    callback && callback();
                };
            }
        };
        return SNYXScene1;
    }(game.BaseSlotScene));
    snyx.SNYXScene1 = SNYXScene1;
    __reflect(SNYXScene1.prototype, "snyx.SNYXScene1");
})(snyx || (snyx = {}));
