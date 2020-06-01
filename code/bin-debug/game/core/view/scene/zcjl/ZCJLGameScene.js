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
var zcjl;
(function (zcjl) {
    var ZCJLGameScene = (function (_super) {
        __extends(ZCJLGameScene, _super);
        function ZCJLGameScene() {
            var _this = _super.call(this) || this;
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_ZCJL;
            _this.AUTOGAME_NOTIFY = PanelNotify.OPEN_ZCJL_AUTO_PANEL;
            _this.TIPS_NOTIFY = "";
            _this.RECORD_NOTIFY = PanelNotify.OPEN_DNTG_RECORD_PANEL;
            _this.SETING_NOTIFY = PanelNotify.OPEN_SETTING;
            _this.QUIT_NOTIFY = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
            _this.bet = 1;
            _this.sceneId = 1011;
            _this.pmdKey = "slot";
            _this.spinTest = 0; //测试模式
            _this.lineSmall = "";
            _this.lineMid = "";
            _this.lineBig = "";
            _this.lineHuge = "";
            _this.buttonEffect = "zcjl_button_mp3";
            _this.scrollerFastEffect = "";
            _this.lineAniXArray = [];
            _this.lineAniYArray = [];
            _this.lineAniRotation = [];
            _this.firstLineX = -490;
            _this.lastLineX = 340;
            _this.utilsTotalMoney = game.ZCJLUtils.ToTalMoney;
            _this.utilsBet = game.ZCJLUtils.bet;
            _this.fixpositionY = [];
            _this.fastSpeedTime = 4500;
            _this.isSetHui = false;
            _this.gameId = "zcjl";
            _this.ownGold = 0; //玩家当前金钱
            _this.isTest = false;
            _this.fastEnd = false;
            _this.runningType = 3; //选择类型
            _this.winGold = 0;
            _this.commomScore = new eui.BitmapLabel(); //中奖展示金额数字
            _this.isStopAni = false; //播放stop动画flag
            _this.fastItemIndex = 0;
            _this.eachLineIconIndex = []; //20条线中奖连线中中奖的图标index
            _this.allLine = []; //20线总中奖连线
            _this.lineTime = 2000;
            _this.lineImaArr = [];
            _this.skinName = new ZCJLGameSceneSkin();
            return _this;
        }
        ZCJLGameScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.showFirst(1);
            game.LaohuUtils.currentSceneId = 1011;
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
            this.initAni();
            this.startGame();
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        };
        ZCJLGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            SoundManager.getInstance().playMusic("zcjl_background_mus_mp3");
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_enterOtherSlotScene, this.enterOtherGame, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        };
        ZCJLGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            egret.clearInterval(this.logoaninterval);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_enterOtherSlotScene, this.enterOtherGame, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
            game.LaohuUtils.isAutoGame = false;
            this.timesLabel.visible = false;
            game.LaohuUtils.auto_times = 0;
        };
        /**
         * 初始化招财锦鲤动画
         */
        ZCJLGameScene.prototype.initAni = function () {
            this.bgAni = DBComponent.create("zcjl_bgani", "zcjl_bg");
            this.bgAni.play("", 0);
            this.bgAni.bottom = 80;
            this.bgAni.horizontalCenter = 0;
            this.effectGroup.addChild(this.bgAni);
            this.bgAni.resetPosition();
            this.logoaninterval = egret.setInterval(this.logoAniFun, this, 4000);
            this.spinDefault = DBComponent.create("zcjl_spinDefault", "zcjl_spin01");
            this.spinStartRun = DBComponent.create("zcjl_spinStartRun", "zcjl_spin02");
            this.spinRunning = DBComponent.create("zcjl_spinRunning", "zcjl_spin03");
            this.spinStopRun = DBComponent.create("zcjl_spinStopRun", "zcjl_spin04");
            // this.spinStopRun.play("",0);
            // this.spinStopRun.horizontalCenter = -3;
            // this.spinStopRun.bottom = 47;
            // this.spinGroup.addChild(this.spinStopRun);
            // this.spinStopRun.resetPosition();
            this.spinDefault.touchEnabled = this.spinStartRun.touchEnabled = this.spinRunning.touchEnabled = this.spinStopRun.touchEnabled = false;
            this.spinDefault.play("", 0);
            this.spinDefault.horizontalCenter = -3;
            this.spinDefault.bottom = 90;
            this.spinGroup.addChild(this.spinDefault);
            this.spinDefault.resetPosition();
        };
        ZCJLGameScene.prototype.logoAniFun = function () {
            game.UIUtils.removeSelf(this.logoAni);
            this.logoAni = DBComponent.create("zcjl_logoAni", "zcjl_logo");
            this.logoAni.play("", 1);
            this.effectGroup.addChild(this.logoAni);
            this.logoAni.horizontalCenter = 85;
            this.logoAni.bottom = 625;
            this.logoAni.resetPosition();
        };
        /**
        * 开始按钮动画
        */
        ZCJLGameScene.prototype.setStartBtn = function () {
            game.UIUtils.removeSelf(this.spinDefault);
            this.spinRunning.play("", 0);
            this.spinRunning.bottom = 47;
            this.spinRunning.horizontalCenter = 0;
            this.spinGroup.addChild(this.spinRunning);
            this.spinRunning.resetPosition();
            this.spinStartRun.play("", 1);
            this.spinStartRun.horizontalCenter = 0;
            this.spinStartRun.bottom = 47;
            this.spinGroup.addChild(this.spinStartRun);
            this.spinStartRun.resetPosition();
        };
        /**
         * 还原开始按钮
         */
        ZCJLGameScene.prototype.resetStartBtn = function () {
            game.UIUtils.removeSelf(this.spinRunning);
            this.spinDefault.play("", 0);
            this.spinGroup.addChild(this.spinDefault);
            this.spinDefault.resetPosition();
        };
        /**
         * 掉线重连成功返回大厅
         * @param  {egret.Event} e
         */
        ZCJLGameScene.prototype.reconnectSuc = function (e) {
            game.LaohuUtils.auto_times = 0;
            this.closeGame("请重新进入游戏");
        };
        ZCJLGameScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_ZCJL);
            CF.sN(PanelNotify.CLOSE_ZCJL_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
        };
        /**
        * @param  {egret.Event} e
        */
        ZCJLGameScene.prototype.enterGame = function (e) {
            var resp = e.data;
            game.ZCJLUtils.bets = [];
            // let playerIdnex = resp.playerInfo.playerIndex;
            for (var key in resp.roomInfo.players) {
                var players_1 = {};
                // if (key != playerIdnex) {
                players_1 = resp.roomInfo.players[key];
                game.LaohuUtils.slotDeskGid.push(key);
                var head = "hall_header_" + players_1.sex + "_" + players_1.figureUrl + "_png";
                game.LaohuUtils.slotDeskHead.push(head);
                game.LaohuUtils.slotDeskName.push(players_1.nickname);
                this.deskMate.initDeskMate();
                // }
            }
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.ZCJLUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.ZCJLUtils.FreeTimeMul = [];
                for (var k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.ZCJLUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.ZCJLUtils.FreeTimeMulIndex = resp.roomInfo.players.freeMulIndex;
                game.ZCJLUtils.FreeTimeMul = game.ZCJLUtils.FreeTimeMul[game.ZCJLUtils.FreeTimeMulIndex];
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
            game.ZCJLUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.ZCJLUtils.ToTalMoney;
            game.ZCJLUtils.bet = game.ZCJLUtils.bets[0];
            //重连后倍数判断
            switch (game.ZCJLUtils.bet) {
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
                case 20:
                    this.bet = 5;
                    break;
                case 40:
                    this.bet = 6;
                    break;
                case 80:
                    this.bet = 7;
                    break;
                case 100:
                    this.bet = 8;
                    break;
                case 200:
                    this.bet = 9;
                    break;
                case 400:
                    this.bet = 10;
                    break;
            }
            var data = Number(new Big(game.ZCJLUtils.bet).mul(0.5));
            this.utilsBet = game.ZCJLUtils.bet;
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.ZCJLUtils.bet + "";
            this.goldFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 50) + "";
            this.redFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 25) + "";
            this.greenFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 12.5) + "";
            this.chockFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 2.5) + "";
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.ZCJLUtils.bet * 50 + ""); "";
        };
        /**
         * 移除上次转动特效
         */
        ZCJLGameScene.prototype.removeLastAni = function () {
            if (this.winGold >= 50 * game.ZCJLUtils.bet) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore);
                SoundManager.getInstance().playMusic("zcjl_background_mus_mp3");
                this.bigwinAniGroup.visible = false;
                this.bigwinAniGroup.removeChildren();
                egret.clearInterval(this.timer2);
                ObjectPool.cancelPool("zcjl_fire01");
                ObjectPool.cancelPool("zcjl_fire02");
            }
            game.UIUtils.removeSelf(this.commomScore);
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
            SoundManager.getInstance().stopEffectByName("zcjl_fireworks_mp3");
            SoundManager.getInstance().stopEffectByName("zcjl_largewin_mp3");
            SoundManager.getInstance().stopEffectByName("zcjl_mediumwin_mp3");
            SoundManager.getInstance().stopEffectByName("zcjl_smallwin_mp3");
        };
        /**
         * spin旋转
         */
        ZCJLGameScene.prototype.startBtnTouch = function () {
            var _this = this;
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.ZCJLUtils.bet * 0.5 > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, function () {
                    _this.startBtn.source = "zcjl_game_spin_png";
                    game.LaohuUtils.isAutoGame = false;
                    _this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.speed = 50;
                    _this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                    _this.resetStartBtn();
                    _this.resetOtherBtn();
                    Global.playerProxy.playerData.gold = _this.ownGold;
                }, "", true);
                return;
            }
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            //转轴是否准备就绪
            if (this.runningType == RUNNING_TYPE.EMPTY) {
                // 判断是否为免费游戏并且是否有剩余的免费次数
                if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times >= 1) {
                    if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                        game.LaohuUtils.isAutoGame = false;
                        game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                        game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                        this.resetOtherBtn();
                        this.startBtn.source = "zcjl_game_spin_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.speed = 50;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "zcjl_game_spin_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.speed = 50;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
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
                            this.startBtn.source = "zcjl_game_spin_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.speed = 50;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.ZCJLUtils.bet * 0.5;
                    if (game.LaohuUtils.auto_times > 1000) {
                        this.timesLabel.text = "s";
                    }
                }
                else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                    this.timesLabel.visible = false;
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.startBtn.source = "zcjl_game_spin_png";
                    this.resetOtherBtn();
                    this.resetStartBtn();
                    return;
                } //为满足完成自动游戏条件，开始自动游戏旋转
                else if (!game.LaohuUtils.isAutoGame) {
                    this.setStartBtn();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.speed = 50;
                }
                this.isTest = false;
                this.winNum.text = 0 + "";
                this.startBtn.filters = [colorFlilter];
                this.runningType = RUNNING_TYPE.LOOP;
                this.removeLastAni();
                this.scroller.stopIconDb();
                this.isStopAni = true;
                this.setOtherBtn();
                this.scroller.run();
                SoundManager.getInstance().playEffect("zcjl_reel_mp3");
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
        /**
         * 测试按钮转动
         */
        ZCJLGameScene.prototype.startBtnTouch0 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, i, j, l, m, n, data2;
                return __generator(this, function (_a) {
                    this.isTest = true;
                    this.wheel = [[], [], []];
                    data = this.spinresult.text;
                    for (i = 0; i < 3; i++) {
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
         * 快速结束游戏
         */
        ZCJLGameScene.prototype.fastGame = function () {
            var _this = this;
            //自动游戏情况
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.speed = 50;
                egret.clearTimeout(this.autoGameTimeout);
                game.LaohuUtils.isAutoGame = false;
                this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "zcjl_game_spin_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            else {
                this.startBtn.source = "zcjl_game_spin_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }
            }
            this.spinStopRun.play("", 1);
            this.spinStopRun.horizontalCenter = -3;
            this.spinStopRun.bottom = 47;
            this.spinGroup.addChild(this.spinStopRun);
            this.spinStopRun.resetPosition();
            this.spinStopRun.callback = function () {
                game.UIUtils.removeSelf(_this.spinStopRun);
            };
            SoundManager.getInstance().stopEffectByName("ayls_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
        };
        ZCJLGameScene.prototype.scrollerFastGame = function () {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("ayls_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
            }
        };
        /**
       * 发送c_bet请求
       */
        ZCJLGameScene.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, colorMatrix, colorFlilter, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [[], [], [], [], []];
                            this.lineImaArr = [];
                            this.bonusAtr = [];
                            this.scatterIcon = 0;
                            this.eachLineScore = [];
                            this.yudiAtr = [];
                            this.allAtr = [[], [], [], [], []];
                            this.scatter = 0;
                            this.allLine = [];
                            this.eachLineIconIndex = [];
                            this.fastItemIndex = 0;
                            //测试专用消息
                            if (this.isTest) {
                                if (this.spinTest == 1) {
                                    data2 = { "spinType": this.spinTest, "bet": game.ZCJLUtils.bet, "lineCount": 1, "activityId": 0, "freeWheel": this.wheel };
                                }
                                else {
                                    data2 = { "spinType": this.spinTest, "bet": game.ZCJLUtils.bet, "lineCount": 1, "activityId": 0, "wheel": this.wheel };
                                }
                            }
                            else {
                                data2 = { "spinType": 0, "bet": game.ZCJLUtils.bet, "lineCount": 1, "activityId": 0 };
                            }
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                this.closeGame("");
                                return [2 /*return*/];
                            }
                            this.ownGold -= game.ZCJLUtils.bet * 0.5;
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
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2]];
                            this.messageTimeOut = egret.setTimeout(function () {
                                _this.scroller.runResult(_this.showAtr);
                                if (_this.isFastGame) {
                                    _this.scroller.runResultFast();
                                }
                            }, this, 300);
                            this.runningType = RUNNING_TYPE.RESULT;
                            this.winGold = resp2.winCount;
                            this.ownGold = resp2.own_gold;
                            if (this.winGold >= game.ZCJLUtils.bet * 50) {
                                this.lineTime = 12000;
                            }
                            else {
                                this.lineTime = 2000;
                            }
                            game.ZCJLUtils.ToTalMoney = this.ownGold;
                            this.utilsTotalMoney = game.ZCJLUtils.ToTalMoney;
                            this.scatter = resp2.sactter;
                            if (this.winGold > 0) {
                                this.bonusAtr = [[1], [1], [1]];
                            }
                            //自动游戏情况下累加赢取金额
                            if (game.LaohuUtils.isAutoGame) {
                                game.LaohuUtils.totoalWinGold += this.winGold;
                            }
                            this.isStopAni = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * @param  {egret.Event} e
        */
        ZCJLGameScene.prototype.scrollerEnd = function (e) {
            var _this = this;
            var data = e.data;
            //场景判断
            if (data.sceneIndex != 1) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 3:
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "zcjl_game_spin_png";
                                this.timesLabel.text = "";
                                game.LaohuUtils.downTime2 = 400;
                                game.LaohuUtils.downTime3 = 800;
                                game.LaohuUtils.speed = 50;
                                this.runningType = RUNNING_TYPE.EMPTY;
                                this.resetStartBtn();
                            }
                        }
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                        SoundManager.getInstance().playEffect("zcjl_reelstop_mp3");
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
                            if (this.scatter != 1)
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
                case 2:
                    SoundManager.getInstance().playEffect("zcjl_reelstop_mp3");
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 3)
                        this.scrollerItemFast(this.fastItemIndex, this.showAtr);
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("zcjl_reelstop_mp3");
                    break;
            }
        };
        /**
      * 播放总连线
      */
        ZCJLGameScene.prototype.checkBonusIcon = function () {
            if (this.winGold > 0) {
                if (this.winGold >= game.ZCJLUtils.bet * 50) {
                    this.bigwinAni();
                    this.eachLineFun();
                    SoundManager.getInstance().playEffect("zcjl_largewin_mp3");
                    SoundManager.getInstance().playMusic("zcjl_fire_mp3");
                    SoundManager.getInstance().playEffect("zcjl_fireworks_mp3", true);
                }
                else if (this.winGold > 12.5 * game.ZCJLUtils.bet && this.winGold <= game.ZCJLUtils.bet * 25) {
                    SoundManager.getInstance().playEffect("zcjl_mediumwin_mp3");
                    this.eachLineFun();
                }
                else if (this.winGold > 0 && this.winGold <= game.ZCJLUtils.bet * 12.5) {
                    SoundManager.getInstance().playEffect("zcjl_smallwin_mp3");
                    this.eachLineFun();
                }
            }
            if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                this.askAutoGame();
            }
            ;
        };
        ZCJLGameScene.prototype.eachLineFun = function () {
            var _this = this;
            this.scroller.stopIconDb();
            this.scroller.addBonusAni(this.bonusAtr);
            game.UIUtils.removeSelf(this.commomScore);
            this.commomScore.font = "zcjl_paylistnum_fnt";
            this.commomScore.letterSpacing = -20;
            this.commomScore.text = this.winGold + "";
            this.commomScore.verticalCenter = this.commomScore.horizontalCenter = 0;
            this.gameGroup.addChild(this.commomScore);
            egret.clearTimeout(this.eachLineTimeOut);
            if (!game.LaohuUtils.isAutoGame) {
                this.eachLineTimeOut = egret.setTimeout(function () {
                    _this.eachLineFun();
                }, this, this.lineTime);
            }
        };
        /**
         * 中了金鲤鱼特效
         */
        ZCJLGameScene.prototype.bigwinAni = function () {
            var _this = this;
            this.bigwinAniGroup.visible = true;
            this.timer2 = egret.setInterval(function () {
                if (_this.bigwinAniGroup.numChildren < 8) {
                    var gold_right1 = game.GoldDownPanel.createZcjlGold("zcjl_fire01");
                    _this.bigwinAniGroup.addChild(gold_right1);
                    var gold_right2 = game.GoldDownPanel.createZcjlGold("zcjl_fire02");
                    _this.bigwinAniGroup.addChild(gold_right2);
                }
            }, this, 250);
        };
        /**
         * 开始自动游戏
         */
        ZCJLGameScene.prototype.startAutoGame = function () {
            //余额判断
            if (game.ZCJLUtils.bet * 0.5 > this.ownGold) {
                this.startBtn.source = "zcjl_game_spin_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.speed = 50;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefault);
            this.startBtn.source = "zcjl_game_spin2_png";
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.speed = 100;
            //无穷次数情况
            if (game.LaohuUtils.auto_times > 1000) {
                this.timesLabel.text = "s";
            }
            else {
                this.timesLabel.text = game.LaohuUtils.auto_times + "";
            }
            this.startBtnTouch();
        };
        /**
         * 设置最大倍数
         */
        ZCJLGameScene.prototype.setMaxBet = function () {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            var bet = game.ZCJLUtils.bets[9];
            //金币是否满足条件
            if (0.5 * bet > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.ZCJLUtils.bet = game.ZCJLUtils.bets[9];
            this.utilsBet = game.ZCJLUtils.bet;
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.ZCJLUtils.bet * 50 + ""); "";
            var data = Number(new Big(game.ZCJLUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.bet = 10;
            this.beishu.text = game.ZCJLUtils.bet + "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.goldFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 50) + "";
            this.redFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 25) + "";
            this.greenFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 12.5) + "";
            this.chockFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 2.5) + "";
        };
        /**
         * 加注
         */
        ZCJLGameScene.prototype.addbetTouch = function () {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[0];
                        break;
                    case 2:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[1];
                        break;
                    case 3:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[2];
                        break;
                    case 4:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[3];
                        break;
                    case 5:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[4];
                        break;
                    case 6:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[5];
                        break;
                    case 7:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[6];
                        break;
                    case 8:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[7];
                        break;
                    case 9:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[8];
                        break;
                    case 10:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[9];
                        break;
                }
            }
            var data = Number(new Big(game.ZCJLUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.ZCJLUtils.bet + "";
            this.utilsBet = game.ZCJLUtils.bet;
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.ZCJLUtils.bet * 50 + ""); "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            if ((game.ZCJLUtils.bet * 0.5) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.subBetTouch();
            }
            this.goldFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 50) + "";
            this.redFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 25) + "";
            this.greenFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 12.5) + "";
            this.chockFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 2.5) + "";
        };
        /**
         * 减注
         */
        ZCJLGameScene.prototype.subBetTouch = function () {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 1) {
                return;
            }
            else {
                game.LaohuUtils.totalWin = 0;
                this.bet -= 1;
                switch (this.bet) {
                    case 1:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[0];
                        break;
                    case 2:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[1];
                        break;
                    case 3:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[2];
                        break;
                    case 4:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[3];
                        break;
                    case 5:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[4];
                        break;
                    case 6:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[5];
                        break;
                    case 7:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[6];
                        break;
                    case 8:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[7];
                        break;
                    case 9:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[8];
                        break;
                    case 10:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[9];
                        break;
                }
            }
            var data = Number(new Big(game.ZCJLUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            // this[`betTtipsGroup`].visible = true;
            this.beishu.text = game.ZCJLUtils.bet + "";
            this.utilsBet = game.ZCJLUtils.bet;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.ZCJLUtils.bet * 50 + ""); "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.goldFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 50) + "";
            this.redFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 25) + "";
            this.greenFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 12.5) + "";
            this.chockFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 2.5) + "";
        };
        return ZCJLGameScene;
    }(game.BaseSlotScene));
    zcjl.ZCJLGameScene = ZCJLGameScene;
    __reflect(ZCJLGameScene.prototype, "zcjl.ZCJLGameScene");
})(zcjl || (zcjl = {}));
