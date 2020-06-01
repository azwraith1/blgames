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
    var BSCSScene1 = (function (_super) {
        __extends(BSCSScene1, _super);
        function BSCSScene1() {
            var _this = _super.call(this) || this;
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BSCS;
            _this.AUTOGAME_NOTIFY = PanelNotify.OPEN_BSCS_AUTO_PANEL;
            _this.TIPS_NOTIFY = PanelNotify.OPEN_BSCS_TIPS_PANEL;
            _this.RECORD_NOTIFY = PanelNotify.OPEN_DNTG_RECORD_PANEL;
            _this.SETING_NOTIFY = PanelNotify.OPEN_SETTING;
            _this.QUIT_NOTIFY = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
            _this.bet = 1;
            _this.HuiAtr = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
            _this.sceneId = 1009;
            _this.lineSmall = "ayls_line1";
            _this.lineMid = "ayls_line2";
            _this.lineBig = "ayls_line3";
            _this.lineHuge = "ayls_line4";
            _this.buttonEffect = "bscs_startreel_mp3";
            _this.scrollerFastEffect = "bscs_reel_fast_spin_mp3";
            _this.lineAniXArray = [-345, -172, 0, 171, 340];
            _this.lineAniYArray = [347, 204, 60];
            _this.lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
            _this.firstLineX = -490;
            _this.lastLineX = 340;
            _this.utilsTotalMoney = game.BSCSUtils.ToTalMoney;
            _this.utilsBet = game.BSCSUtils.bet;
            _this.fixpositionY = [];
            _this.fastSpeedTime = 4500;
            _this.isSetHui = true;
            _this.gameId = "bscs";
            _this.isFreeBack = false;
            _this.isTest = false;
            _this.spinTest = 0;
            _this.fastEnd = false;
            _this.runningType = 3; //选择类型
            _this.winGold = 0;
            _this.commomScore = new eui.BitmapLabel(); //中奖展示金额数字
            _this.isStopAni = false; //播放stop动画flag
            _this.fastItemIndex = 0;
            _this.eachLineIconIndex = []; //20条线中奖连线中中奖的图标index
            _this.allLine = []; //20线总中奖连线
            _this.lineTime = 2000;
            _this.ownGold = 0; //玩家当前金钱
            _this.lineImaArr = [];
            _this.skinName = "BSCSScene1Skin";
            return _this;
        }
        BSCSScene1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            SoundManager.getInstance().playMusic("bscs_background_mus_mp3");
            if (Global.playerProxy.playerData.nickname == "test004" || Global.playerProxy.playerData.nickname == "test001" || Global.playerProxy.playerData.nickname == "test002" || Global.playerProxy.playerData.nickname == "test003" || Global.playerProxy.playerData.nickname == "test005" || Global.playerProxy.playerData.nickname == "test006" || Global.playerProxy.playerData.nickname == "test007" || Global.playerProxy.playerData.nickname == "test008" || Global.playerProxy.playerData.nickname == "test009" || Global.playerProxy.playerData.nickname == "test010") {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.QA_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.testGroup.visible = true;
                }
            }
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this["quitBtn"].visible = false;
            }
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            this.setOtherBtn();
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = false;
            this.startGame();
            this.initAni();
            this.scroller.showFirst(1);
        };
        BSCSScene1.prototype.initAni = function () {
            this.bgDB = new DBComponent("bscq_bg01");
            this.bgDB.play("", 0);
            this.bgDB.horizontalCenter = 0;
            this.bgDB.bottom = 135;
            this.bgDB.touchEnabled = false;
            this.resizeGroup.addChild(this.bgDB);
            this.bgDB.resetPosition();
            this.resizeGroup.addChild(this.quitBtn);
            this.spinDefaultAni = new DBComponent("bscq_spin01");
            this.spinRunningAni = new DBComponent("bscq_spin03");
            this.spinStartAni = new DBComponent("bscq_spin02");
            this.spinStopAni = new DBComponent("bscq_spin04");
            this.spinDefaultAni.touchEnabled = this.spinRunningAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinDefaultAni.horizontalCenter = -3;
            this.spinDefaultAni.bottom = 54;
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
            // this.spinStopAni.horizontalCenter = 0; this.spinStopAni.bottom = 88;
            // this.spinGroup.addChild(this.spinStopAni);
            // this.spinStopAni.resetPosition();
        };
        BSCSScene1.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.BSCS_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        };
        BSCSScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.BSCS_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        };
        /**
         * @param  {egret.Event} e
         */
        BSCSScene1.prototype.enterGame = function (e) {
            var resp = e.data;
            game.BSCSUtils.bets = [];
            var playerIdnex = resp.playerInfo.playerIndex;
            var players = {};
            for (var key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.BSCSUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.BSCSUtils.FreeTimeMul = [];
                for (var k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.BSCSUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.BSCSUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.BSCSUtils.FreeTimeMul = game.BSCSUtils.FreeTimeMul[game.BSCSUtils.FreeTimeMulIndex];
                game.LaohuUtils.freeTimes = players.freeTimes;
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
            this.ownGold = players.gold;
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
            game.BSCSUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.BSCSUtils.ToTalMoney;
            game.BSCSUtils.bet = game.BSCSUtils.bets[0];
            //判断是否为免费游戏
            if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.BSCSUtils.bet = players.lastBet;
                CF.dP(ENo.BSCS_START_FREE_GAME_SCENE);
            }
            //重连后倍数判断
            switch (game.BSCSUtils.bet) {
                case 0.25:
                    this.bet = 1;
                    break;
                case 0.5:
                    this.bet = 2;
                    break;
                case 0.75:
                    this.bet = 3;
                    break;
                case 1:
                    this.bet = 4;
                    break;
                case 5:
                    this.bet = 5;
                    break;
                case 10:
                    this.bet = 6;
                    break;
                case 20:
                    this.bet = 7;
                    break;
                case 25:
                    this.bet = 8;
                    break;
                case 50:
                    this.bet = 9;
                    break;
                case 100:
                    this.bet = 10;
                    break;
            }
            this.utilsBet = game.BSCSUtils.bet;
            var data = Number(new Big(game.BSCSUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.BSCSUtils.bet + "";
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.BSCSUtils.bet * 4000 + "");
            "";
        };
        /**
         * spin旋转
         */
        BSCSScene1.prototype.startBtnTouch = function () {
            var _this = this;
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.BSCSUtils.bet * 2 > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, function () {
                    _this.startBtn.source = "bscq_spin_1_png";
                    game.LaohuUtils.isAutoGame = false;
                    _this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    _this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
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
                        this.startBtn.source = "bscq_spin_1_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "bscq_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
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
                            this.startBtn.source = "bscq_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.BSCSUtils.bet * 2;
                    if (game.LaohuUtils.auto_times > 1000) {
                        this.timesLabel.text = "s";
                    }
                }
                else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                    this.timesLabel.visible = false;
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.startBtn.source = "bscq_spin_1_png";
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
                this.removeLastAni();
                this.scroller.stopIconDb();
                this.isStopAni = true;
                this.setOtherBtn();
                this.scroller.run();
                SoundManager.getInstance().playEffect("bscs_reel_mp3", true);
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
        BSCSScene1.prototype.startBtnTouch0 = function () {
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
        BSCSScene1.prototype.fastGame = function () {
            var _this = this;
            //转轴加速情况
            if (this.scatterIcon >= 2) {
                this.fastEnd = true;
                egret.clearTimeout(this.scatter3timeout);
                egret.clearTimeout(this.scatter4timeout);
                egret.clearTimeout(this.scatter5timeout);
                this.removeScatterAni();
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                this.startBtn.source = "bscq_spin_1_png";
                this.scroller.runResultFast();
                for (var i = 1; i <= 4; i++) {
                    this.scroller["item" + i].resetSpecilHui();
                }
            }
            //自动游戏情况
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                egret.clearTimeout(this.autoGameTimeout);
                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                if (this.scatter != 1)
                    this.resetOtherBtn();
                this.resetStartBtn();
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "bscq_spin_1_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spinStopAni.play("", 1);
                this.spinStopAni.horizontalCenter = 0;
                this.spinStopAni.bottom = 88;
                this.spinGroup.addChild(this.spinStopAni);
                this.spinStopAni.resetPosition();
                this.spinStopAni.callback = function () {
                    game.UIUtils.removeSelf(_this.spinStopAni);
                };
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            else {
                this.startBtn.source = "bscq_spin_1_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }
            }
            SoundManager.getInstance().stopEffectByName("bscs_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
        };
        /**
         * 点击转轴区域快速停止游戏
         */
        BSCSScene1.prototype.scrollerFastGame = function () {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
                if (this.scatterIcon >= 2) {
                    this.fastEnd = true;
                    egret.clearTimeout(this.scatter3timeout);
                    egret.clearTimeout(this.scatter4timeout);
                    egret.clearTimeout(this.scatter5timeout);
                    this.removeScatterAni();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    this.scroller.item4.speed = 48;
                    this.scroller.item5.speed = 48;
                    for (var i = 1; i <= 4; i++) {
                        this.scroller["item" + i].resetSpecilHui();
                    }
                }
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("bscs_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
            }
        };
        /**
         * 上次游戏效果移除
         */
        BSCSScene1.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore);
                egret.clearTimeout(this.sethuiTimeout);
                for (var i = 1; i <= 5; i++) {
                    this.scroller["item" + i].resetSpecilHui();
                }
                this.clearLineImaPool();
            }
            game.UIUtils.removeSelf(this.commomScore);
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
        };
        /**
        * 开始按钮动画
        */
        BSCSScene1.prototype.setStartBtn = function () {
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.spinRunningAni.play("", 0);
            this.spinRunningAni.bottom = 54;
            this.spinRunningAni.horizontalCenter = -3;
            this.spinGroup.addChild(this.spinRunningAni);
            this.spinRunningAni.resetPosition();
            this.spinStartAni.play("", 1);
            this.spinStartAni.horizontalCenter = 0;
            this.spinStartAni.bottom = 88;
            this.spinGroup.addChild(this.spinStartAni);
            this.spinStartAni.resetPosition();
        };
        /**
         * 还原开始按钮
         */
        BSCSScene1.prototype.resetStartBtn = function () {
            game.UIUtils.removeSelf(this.spinRunningAni);
            this.spinDefaultAni.play("", 0);
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
        };
        /**
        * 发送c_bet请求
        */
        BSCSScene1.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, colorMatrix, colorFlilter, resp1, i, i, j, aaa, str_lingshi, str_lingshi2, temp, temp1, temp2, arr, k, k, flag, _loop_1, this_1, i, scatternum, i, j, i, j, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [[], [], [], [], []];
                            this.bonusAtr = [];
                            this.scatterIcon = 0;
                            this.eachLineScore = [];
                            this.lineImaArr = [];
                            this.yudiAtr = [];
                            this.allAtr = [[], [], [], [], []];
                            this.scatter = 0;
                            this.allLine = [];
                            this.eachLineIconIndex = [];
                            this.fastItemIndex = 0;
                            this.lineTime = 2800;
                            //测试专用消息
                            if (this.isTest) {
                                if (this.spinTest == 1) {
                                    data2 = { "spinType": this.spinTest, "bet": game.BSCSUtils.bet, "lineCount": 20, "activityId": 0, "freeWheel": this.wheel };
                                }
                                else {
                                    data2 = { "spinType": this.spinTest, "bet": game.BSCSUtils.bet, "lineCount": 20, "activityId": 0, "wheel": this.wheel };
                                }
                            }
                            else {
                                data2 = { "spinType": 0, "bet": game.BSCSUtils.bet, "lineCount": 20, "activityId": 0 };
                            }
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
                            this.ownGold -= game.BSCSUtils.bet * 2;
                            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
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
                            this.messageTimeOut = egret.setTimeout(function () {
                                _this.scroller.runResult(_this.showAtr);
                                if (_this.isFastGame) {
                                    _this.scroller.runResultFast();
                                }
                            }, this, 300);
                            this.runningType = RUNNING_TYPE.RESULT;
                            this.winGold = resp2.winCount;
                            this.ownGold = resp2.own_gold;
                            game.BSCSUtils.ToTalMoney = this.ownGold;
                            this.utilsTotalMoney = game.BSCSUtils.ToTalMoney;
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
                                            this.eachLineScore.push(temp2);
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
                            if (this.winGold > 0) {
                                this.lineTime = 2800;
                            }
                            else {
                                this.lineTime = 1000;
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
                                game.LaohuUtils.freeTimes = resp2.freeTimes;
                            }
                            this.yudiAtrHui = [];
                            this.yudiAtrHui2 = [];
                            for (i = 0; i <= 4; i++) {
                                for (j = 0; j < this.showAtr[i].length; j++) {
                                    if (this.showAtr[i][j] == 2) {
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
         * @param  {egret.Event} e
         */
        BSCSScene1.prototype.scrollerEnd = function (e) {
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
                                this.startBtn.source = "bscq_spin_1_png";
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
                        this.scroller.removeIconHui(this.HuiAtr);
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                        //自动游戏自动次数大于0
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this.quitBtn.touchEnabled = false;
                                this.checkBonusIcon();
                                return;
                            }
                            egret.setTimeout(function () {
                                LogUtils.logD("empty4");
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
                            if (this.scatter != 1 && !game.LaohuUtils.isAutoGame)
                                this.resetOtherBtn();
                            this.resetStartBtn();
                            egret.setTimeout(function () {
                                LogUtils.logD("empty5");
                                if (_this.scatter != 1)
                                    _this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                        }
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.checkBonusIcon();
                    }
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
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 5 && !this.isFastGame)
                        this.scrollerItemFast(this.fastItemIndex, this.showAtr);
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
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2) {
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd)
                                return;
                            if (this.fastItemIndex == 4 && !this.isFastGame)
                                this.scrollerItemFast(this.fastItemIndex, this.showAtr);
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
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 3 && !this.isFastGame)
                        this.scrollerItemFast(this.fastItemIndex, this.showAtr);
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
       * 播放总连线
       */
        BSCSScene1.prototype.checkBonusIcon = function () {
            var _this = this;
            //满足bigwin
            if (this.winGold >= (game.BSCSUtils.bet * 2) * 15) {
                egret.clearTimeout(this.autoGameTimeout);
                //非空判断
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
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
                            if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                                _this.autoGameTimeout = egret.setTimeout(function () {
                                    _this.startBtnTouch();
                                }, _this, _this.lineTime);
                            }
                            //未中scatter，播放一次总连线                            
                            if (_this.scatter != 1) {
                                _this.scroller.setIconHui();
                                _this.scroller.removeIconHui(_this.allAtr);
                                _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                                if (_this.lineImaArr) {
                                    for (var i = 0; i < _this.lineImaArr.length; i++) {
                                        _this.lineUseImag(_this.lineImaArr[i]);
                                    }
                                }
                                if (!game.LaohuUtils.isAutoGame) {
                                    egret.clearTimeout(_this.eachLineTimeOut);
                                    _this.eachLineTimeOut = egret.setTimeout(function () {
                                        _this.addEachLineAni();
                                    }, _this, _this.lineTime);
                                }
                                if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                    _this.askAutoGame();
                                }
                                ;
                            }
                            if (!game.LaohuUtils.isAutoGame) {
                                _this.runningType = RUNNING_TYPE.EMPTY;
                            }
                            if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame)
                                _this.memuBtn.touchEnabled = _this.maxBet.touchEnabled = _this.addbet.touchEnabled = _this.subbet.touchEnabled = _this.autoGameBtn.touchEnabled = _this.tipsBtn.touchEnabled = _this["quitBtn"].touchEnabled = true;
                            if (_this.scatter == 1) {
                                egret.clearTimeout(_this.eachLineTimeOut);
                                _this.addEachLineAni();
                            }
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
                        game.UIUtils.removeSelf(_this.commomScore);
                        //自动游戏bigwin后开始下一把
                        if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                            _this.autoGameTimeout = egret.setTimeout(function () {
                                _this.startBtnTouch();
                            }, _this, _this.lineTime);
                        }
                        if (_this.scatter != 1) {
                            _this.startBtn.touchEnabled = true;
                            _this.scroller.stopIconDb();
                            _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                            if (_this.lineImaArr) {
                                for (var i = 0; i < _this.lineImaArr.length; i++) {
                                    _this.lineUseImag(_this.lineImaArr[i]);
                                }
                            }
                            if (!game.LaohuUtils.isAutoGame) {
                                egret.clearTimeout(_this.eachLineTimeOut);
                                _this.eachLineTimeOut = egret.setTimeout(function () {
                                    if (!game.LaohuUtils.isAutoGame)
                                        _this.addEachLineAni();
                                }, _this, _this.lineTime);
                            }
                            if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                _this.askAutoGame();
                            }
                            ;
                        }
                        if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                            _this.memuBtn.touchEnabled = _this.maxBet.touchEnabled = _this.addbet.touchEnabled = _this.subbet.touchEnabled = _this.autoGameBtn.touchEnabled = _this.tipsBtn.touchEnabled = _this["quitBtn"].touchEnabled = true;
                        }
                        if (!game.LaohuUtils.isAutoGame) {
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        }
                        if (_this.scatter == 1) {
                            egret.clearTimeout(_this.eachLineTimeOut);
                            _this.addEachLineAni();
                        }
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            else {
                //展示图标非空判断
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    SoundManager.getInstance().playEffect("bscs_win_mp3");
                    if (this.scatter == 1)
                        this.runningType = RUNNING_TYPE.STOP;
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
                    this.removeScoreTimeout = egret.setTimeout(function () {
                        game.UIUtils.removeSelf(_this.commomScore);
                        _this.scroller.stopIconDb();
                        if (!game.LaohuUtils.isAutoGame || _this.scatter == 1) {
                            _this.addEachLineAni();
                            if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                _this.askAutoGame();
                            }
                        }
                    }, this, this.lineTime);
                }
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        game.BSCSUtils.comm2FreeModel = this.showAtr;
                        SoundManager.getInstance().playMusic("bscs_changeground_mus_mp3");
                        for (var i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "bscs_icon_2");
                        }
                        egret.setTimeout(function () {
                            _this.free_times.source = "bscs_enter_free_" + game.LaohuUtils.freeTimes + "_png";
                            _this.freeTimeGroup.visible = true;
                            egret.Tween.get(_this.freeTimeGroup).to({ alpha: 1 }, 2000);
                        }, this, 2000);
                        egret.setTimeout(function () {
                            _this.freeTimeGroup.visible = false;
                            _this.freeTimeGroup.alpha = 0;
                            CF.dP(ENo.BSCS_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            _this["quitBtn"].visible = false;
                        }, this, 6000);
                    }
                    else {
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            this.askAutoGame();
                        }
                    }
                }
            }
        };
        /**
       * 每条连线动画
       */
        BSCSScene1.prototype.addEachLineAni = function () {
            var _this = this;
            //非空判断
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) {
                    this["quitBtn"].touchEnabled = false;
                    this.resetStartBtn();
                }
                this.scroller.stopIconDb();
                var count_1 = 0;
                var eachLineArray_1;
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, function (index, callback) {
                    if (_this.isStopAni)
                        return;
                    _this.scroller.setSpecilHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                    for (var j = 0; j < index.length; j++) {
                        var k = j + 1;
                        _this.scroller["item" + k].resetIconHui(index[j]);
                        _this.scroller["item" + k].showAni(index[j]);
                        _this.commomScore.font = "bscs_wingold_2_fnt";
                        var data = Number(new Big(_this.eachLineScore[count_1]).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        _this.commomScore.verticalCenter = ((index[2] - 1)) * 155;
                        _this.commomScore.horizontalCenter = 0;
                        _this.commomScore.textAlign = "center";
                        // this.gameGroup.addChild(this[`lineImag`]);
                        _this.gameGroup.addChild(_this.commomScore);
                    }
                    //单一连线
                    if (_this.bonusAtr.length == 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        eachLineArray_1 = _this.lineImaArr[count_1];
                        _this.lineUseImag(eachLineArray_1);
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                _this.scroller.setIconHui();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 2300);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2300);
                    }
                    //多条连线
                    if (_this.bonusAtr.length > 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        eachLineArray_1 = _this.lineImaArr[count_1];
                        _this.lineUseImag(eachLineArray_1);
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                _this.scroller.setIconHui();
                                _this.scroller.stopIconDb();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 2300);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2300);
                    }
                    count_1++;
                }, function () {
                    //callback 判断结果是否为scatter
                    if (_this.scatter == 1) {
                        game.UIUtils.removeSelf(_this.commomScore);
                        _this.runningType = RUNNING_TYPE.STOP;
                        SoundManager.getInstance().playMusic("bscs_changeground_mus_mp3");
                        _this.removeLineTimeOUt = egret.setTimeout(_this.clearAniPool, _this, 2000);
                        _this.scroller.removeIconHui(_this.HuiAtr);
                        for (var i = 0; i < _this.yudiAtr2.length; i++) {
                            _this.scroller.addFoGuang(_this.yudiAtr2[i], _this.yudiAtr[i], "bscs_icon_2");
                        }
                        game.BSCSUtils.comm2FreeModel = _this.showAtr;
                        egret.setTimeout(function () {
                            _this.free_times.source = "bscs_enter_free_" + game.LaohuUtils.freeTimes + "_png";
                            _this.freeTimeGroup.visible = true;
                            egret.Tween.get(_this.freeTimeGroup).to({ alpha: 1 }, 2000);
                        }, _this, 2000);
                        egret.setTimeout(function () {
                            _this.freeTimeGroup.visible = false;
                            _this.freeTimeGroup.alpha = 0;
                            CF.dP(ENo.BSCS_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            _this.resetOtherBtn();
                        }, _this, 6000);
                        if (!game.LaohuUtils.isAutoGame)
                            _this.resetStartBtn();
                    }
                    else {
                        count_1 = 0;
                        _this.scroller.setIconHui();
                        game.UIUtils.removeSelf(_this.commomScore);
                        _this.clearAniPool();
                        return _this.addEachLineAni();
                    }
                });
            }
        };
        /**
       * 免费游戏结束后到正常游戏
       */
        BSCSScene1.prototype.free2Commom = function () {
            var _this = this;
            this.scatter = 0;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.BSCSUtils.ToTalMoney) + "";
            this.ownGold = game.BSCSUtils.ToTalMoney;
            this.utilsTotalMoney = game.BSCSUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.BSCSUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().playMusic("bscs_background_mus_mp3");
            this.checkQuitVisible();
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "bscq_spin_1_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.BSCSUtils.freeWin >= game.LaohuUtils.oneMax) {
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
                this.startBtn.source = "bscq_spin_1_png";
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
                    this.startBtn.source = "bscq_spin_1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
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
                    this.startBtn.source = "bscq_spin_1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                game.UIUtils.removeSelf(this.spinDefaultAni);
                this.isFreeBack = true;
                egret.setTimeout(function () { _this.startAutoGame(); }, this, 1000);
            }
            else {
                this.resetOtherBtn();
            }
        };
        /**
         * 开始自动游戏
         */
        BSCSScene1.prototype.startAutoGame = function () {
            //余额判断
            if (game.BSCSUtils.bet * 2 > this.ownGold) {
                this.isFreeBack = false;
                this.startBtn.source = "bscq_spin_1_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "bscq_spin_2_png";
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
        BSCSScene1.prototype.addbetTouch = function () {
            var _this = this;
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 8) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[0];
                        break;
                    case 2:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[1];
                        break;
                    case 3:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[2];
                        break;
                    case 4:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[3];
                        break;
                    case 5:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[4];
                        break;
                    case 6:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[5];
                        break;
                    case 7:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[6];
                        break;
                    case 8:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[7];
                        break;
                    case 9:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[8];
                        break;
                    case 10:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[9];
                        break;
                }
            }
            var data = Number(new Big(game.BSCSUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.BSCSUtils.bet + "";
            this.utilsBet = game.BSCSUtils.bet;
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.BSCSUtils.bet * 4000 + "");
            "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            if ((game.BSCSUtils.bet * 2) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.subBetTouch();
            }
        };
        /**
         * 玩家减注
         */
        BSCSScene1.prototype.subBetTouch = function () {
            var _this = this;
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
                        game.BSCSUtils.bet = game.BSCSUtils.bets[0];
                        break;
                    case 2:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[1];
                        break;
                    case 3:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[2];
                        break;
                    case 4:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[3];
                        break;
                    case 5:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[4];
                        break;
                    case 6:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[5];
                        break;
                    case 7:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[6];
                        break;
                    case 8:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[7];
                        break;
                    case 9:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[8];
                        break;
                    case 10:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[9];
                        break;
                }
            }
            var data = Number(new Big(game.BSCSUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this["betTtipsGroup"].visible = true;
            this.beishu.text = game.BSCSUtils.bet + "";
            this.utilsBet = game.BSCSUtils.bet;
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.BSCSUtils.bet * 4000 + "");
            "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        /**
         * 设置最大倍数
         */
        BSCSScene1.prototype.setMaxBet = function () {
            var _this = this;
            SoundManager.getInstance().playEffect(this.buttonEffect);
            var bet = game.BSCSUtils.bets[8];
            //金币是否满足条件
            if (2 * bet > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.BSCSUtils.bet = game.BSCSUtils.bets[8];
            this["betTtipsGroup"].visible = true;
            this.utilsBet = game.BSCSUtils.bet;
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.BSCSUtils.bet * 4000 + "");
            "";
            var data = Number(new Big(game.BSCSUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.bet = 9;
            this.beishu.text = game.BSCSUtils.bet + "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        return BSCSScene1;
    }(game.BaseSlotScene));
    bscs.BSCSScene1 = BSCSScene1;
    __reflect(BSCSScene1.prototype, "bscs.BSCSScene1");
})(bscs || (bscs = {}));
