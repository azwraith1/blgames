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
var rdsg;
(function (rdsg) {
    var RDSGScene1 = (function (_super) {
        __extends(RDSGScene1, _super);
        function RDSGScene1() {
            var _this = _super.call(this) || this;
            _this.bet = 1;
            _this.lineTime = 1500;
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
            _this.isFreeBack = false;
            _this.i = 0;
            _this.j = 0;
            _this.atr1 = [];
            _this.atr2 = [];
            _this.aniPool = [];
            _this.isStopLine = false;
            _this.clickTime = 0;
            _this.isFastGame = false;
            _this.skinName = "RDSGScene1Skin";
            return _this;
        }
        RDSGScene1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            SoundManager.getInstance().playMusic("rdsg_background_mus_mp3");
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            this.setOtherBtn();
            if (Global.playerProxy.playerData.nickname == "test004" || Global.playerProxy.playerData.nickname == "test001" || Global.playerProxy.playerData.nickname == "test002" || Global.playerProxy.playerData.nickname == "test003" || Global.playerProxy.playerData.nickname == "test005" || Global.playerProxy.playerData.nickname == "test006" || Global.playerProxy.playerData.nickname == "test007" || Global.playerProxy.playerData.nickname == "test008" || Global.playerProxy.playerData.nickname == "test009" || Global.playerProxy.playerData.nickname == "test010") {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.QA_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.testGroup.visible = true;
                }
            }
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this["quitBtn"].visible = false;
            }
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = false;
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this.quitBtn.visible = false;
            }
            this.startGame();
            var isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            this.scroller.showFirst(1);
            this.initAni();
        };
        RDSGScene1.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.RDSG_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
        };
        RDSGScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.RDSG_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
        };
        /**
       * 鼠标手势库
       */
        RDSGScene1.prototype.addMouseOnEvent = function () {
            this.memuBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.memuBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.setingBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.setingBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.addbet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.addbet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.subbet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.subbet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.maxBet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.maxBet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoGameBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoGameBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.recordBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.recordBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this["quitBtn"].addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this["quitBtn"].addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        };
        RDSGScene1.prototype.removeEvent = function () {
            this.memuBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.memuBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.setingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.setingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.addbet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.addbet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.subbet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.subbet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.maxBet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.maxBet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoGameBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoGameBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.recordBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.recordBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this["quitBtn"].removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this["quitBtn"].removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        };
        RDSGScene1.prototype.changeMenuBtn = function () {
            this.memuBtn.currentState = "down";
        };
        RDSGScene1.prototype.changeMenuBtn2 = function () {
            this.memuBtn.currentState = "up";
        };
        RDSGScene1.prototype.changesettingBtn = function () {
            this.setingBtn.currentState = "down";
        };
        RDSGScene1.prototype.changesettingBtn2 = function () {
            this.setingBtn.currentState = "up";
        };
        RDSGScene1.prototype.changetipsBtn = function () {
            this.tipsBtn.currentState = "down";
        };
        RDSGScene1.prototype.changetipsBtn2 = function () {
            this.tipsBtn.currentState = "up";
        };
        RDSGScene1.prototype.changeBetAddBtn = function () {
            var _this = this;
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + "");
            "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            this.addbet.currentState = "down";
            this["betTtipsGroup"].visible = true;
        };
        RDSGScene1.prototype.changeBetAddBtn2 = function () {
            var _this = this;
            this.addbet.currentState = "up";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        RDSGScene1.prototype.changeBetSubBtn = function () {
            var _this = this;
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + "");
            "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            this.subbet.currentState = "down";
            this["betTtipsGroup"].visible = true;
        };
        RDSGScene1.prototype.changeBetSubBtn2 = function () {
            var _this = this;
            this.subbet.currentState = "up";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        RDSGScene1.prototype.changeyazhuBtn = function () {
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + ""); "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.maxBet.source = RES.getRes("sdxl_bet2_png");
        };
        RDSGScene1.prototype.changeyazhuBtn2 = function () {
            this.maxBet.source = RES.getRes("sdxl_bet1_png");
        };
        RDSGScene1.prototype.changeAutoRunBtn = function () {
            this.autoGameBtn.currentState = "down";
        };
        RDSGScene1.prototype.changeAutoRunBtn2 = function () {
            this.autoGameBtn.currentState = "up";
        };
        RDSGScene1.prototype.changeGameRecord = function () {
            this.recordBtn.currentState = "down";
        };
        RDSGScene1.prototype.changeGameRecord2 = function () {
            this.recordBtn.currentState = "up";
        };
        RDSGScene1.prototype.changeOutBtn = function () {
            this["quitBtn"].currentState = "donw";
        };
        RDSGScene1.prototype.changeOutBtn2 = function () {
            this["quitBtn"].currentState = "up";
        };
        /**
         * 初始化特效
         */
        RDSGScene1.prototype.initAni = function () {
            this.spinDefaultAni = DBComponent.create("rdsg_spinDefaultAni", "rdsg_spin_default");
            this.spinRunningAni = DBComponent.create("rdsg_spinRunningAni", "rdsg_spining");
            this.spinStartAni = DBComponent.create("rdsg_spinStartAni", "rdsg_spin_start");
            this.spinStopAni = DBComponent.create("rdsg_spinStopAni", "rdsg_spin_stop");
            this.scrollerAni = DBComponent.create("rdsg_scrollerAni", "rdsg_commonback");
            this.friutAni = DBComponent.create("rdsg_friutAni", "rdsg_logoturn");
            this.spinDefaultAni.touchEnabled = this.spinRunningAni.touchEnabled = this.spinStartAni.touchEnabled = this.spinStopAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinStopAni.horizontalCenter = this.spinStartAni.horizontalCenter = this.spinRunningAni.horizontalCenter = this.spinDefaultAni.horizontalCenter = 0;
            this.spinStopAni.bottom = this.spinStartAni.bottom = this.spinRunningAni.bottom = this.spinDefaultAni.bottom = 55;
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
            this.bgAni = new DBComponent("rdsg_commombg1");
            this.bgAni.play("", 0);
            this.bgAni.horizontalCenter = 0;
            this.bgAni.bottom = -995;
            this.effectGroup.addChild(this.bgAni);
            this.bgAni.resetPosition();
            this.friutAni.play("", 0);
            this.friutAni.horizontalCenter = 2;
            this.friutAni.verticalCenter = -333;
            this.resizeGroup.addChild(this.friutAni);
            this.friutAni.resetPosition();
        };
        /**
        * 开始游戏发送请求
        */
        RDSGScene1.prototype.startGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp1, data, resp, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                        case 1:
                            resp1 = _a.sent();
                            data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": 1006 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 2:
                            resp = _a.sent();
                            if (resp) {
                                if (resp.error.code != 0) {
                                    text = resp.error.msg;
                                    CF.sN(SceneNotify.CLOSE_RDSG);
                                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                    Global.alertMediator.addAlert(text, function () {
                                    }, "", true);
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                CF.sN(SceneNotify.CLOSE_RDSG);
                                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * 进入游戏数据处理
        * @param  {egret.Event} e
        */
        RDSGScene1.prototype.enterGame = function (e) {
            var resp = e.data;
            game.RDSGUtils.bets = [];
            var playerIdnex = resp.playerInfo.playerIndex;
            var players = {};
            for (var key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.RDSGUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.RDSGUtils.FreeTimeMul = [];
                for (var k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.RDSGUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.RDSGUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.RDSGUtils.FreeTimeMul = game.RDSGUtils.FreeTimeMul[game.RDSGUtils.FreeTimeMulIndex];
                game.RDSGUtils.freeTimes = players.freeTimes;
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
            game.RDSGUtils.ToTalMoney = this.ownGold;
            game.RDSGUtils.bet = game.RDSGUtils.bets[0];
            //判断是否为免费游戏
            if (players.isScatter == 1 && players.freeTimes == 0) {
                // CF.dP(ENo.CBZZ_ENTER_FREE_GAME_SCENE);
            }
            else if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.RDSGUtils.bet = players.lastBet;
                CF.dP(ENo.RDSG_START_FREE_GAME_SCENE);
            }
            //重连后倍数判断
            switch (game.RDSGUtils.bet) {
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
            var data = Number(new Big(game.RDSGUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.RDSGUtils.bet + "";
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + "");
            "";
        };
        RDSGScene1.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.startBtn:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    this.startBtnTouch();
                    break;
                case this["quitBtn"]:
                    if (this.scatter == 1)
                        return;
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_LEAVE_LAOHU_PANEL);
                    break;
                case this.memuBtn:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    if (this["menuGroup"].visible == false) {
                        this["menuGroup"].visible = true;
                    }
                    else {
                        this["menuGroup"].visible = false;
                    }
                    break;
                //游戏记录按钮
                case this["recordBtn"]:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
                    this["menuGroup"].visible = false;
                    break;
                //游戏设置按钮
                case this["setingBtn"]:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_SETTING);
                    this["menuGroup"].visible = false;
                    break;
                //转轴快速停止
                case this["maskRect"]:
                    this.scrollerFastGame();
                    break;
                //赔付表按钮
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_RDSG_TIPS_PANEL);
                    break;
                //最大bet按钮
                case this.maxBet:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    this.setMaxBet();
                    break;
                //减少bet按钮
                case this.subbet:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    this.reduceBet();
                    break;
                //增加bet按钮
                case this.addbet:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    this.addBetFunc();
                    break;
                //自动游戏窗口
                case this.autoGameBtn:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_RDSG_AUTO_PANEL);
                    break;
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        };
        RDSGScene1.prototype.startBtnTouch0 = function () {
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
         * 开始转动
         */
        RDSGScene1.prototype.startBtnTouch = function () {
            var _this = this;
            //判断余额
            if (game.RDSGUtils.bet * 2 > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, function () {
                    _this.startBtn.source = "rdsg_startbtn_png";
                    game.LaohuUtils.isAutoGame = false;
                    _this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    _this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                        this.startBtn.source = "rdsg_startbtn_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "rdsg_startbtn_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                            this.startBtn.source = "rdsg_startbtn_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.downTime2 = 200;
                    game.LaohuUtils.downTime3 = 400;
                    game.LaohuUtils.downTime4 = 600;
                    game.LaohuUtils.downTime5 = 800;
                    game.LaohuUtils.speed = 85;
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.RDSGUtils.bet * 2;
                    if (game.LaohuUtils.auto_times > 1000) {
                        this.timesLabel.text = "s";
                    }
                }
                else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                    this.timesLabel.visible = false;
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.startBtn.source = "rdsg_startbtn_png";
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
                this.scrollerAni.play("", 0);
                this.scrollerAni.horizontalCenter = 0;
                this.scrollerAni.bottom = 100;
                this.effectGroup2.addChild(this.scrollerAni);
                this.scrollerAni.resetPosition();
                SoundManager.getInstance().playEffect("rdsg_reel_mp3", true);
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
            // else if (this.runningType == RUNNING_TYPE.LOOP) {
            //     let slotTips = slot.SlotAutoTips.instance;
            //     slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            //     this.resizeGroup.addChild(slotTips);
            //     let func = () => {
            //         CF.sN(PanelNotify.OPEN_RDSG_AUTO_PANEL);
            //         game.UIUtils.removeSelf(slotTips);
            //     }
            //     slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            // }
        };
        /**
        * 快速结束转动
        */
        RDSGScene1.prototype.fastGame = function () {
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
                this.startBtn.source = "rdsg_startbtn_png";
                this.scroller.runResultFast();
                for (var i = 1; i <= 4; i++) {
                    // this.scroller[`item${i}`].resetSpecilHui();
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
                if (this.scatter != 1)
                    this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "rdsg_startbtn_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spinStopAni.play("", 1);
                this.spinGroup.addChild(this.spinStopAni);
                this.spinStopAni.resetPosition();
                this.spinStopAni.callback = function () {
                    game.UIUtils.removeSelf(_this.spinStopAni);
                };
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            else {
                this.startBtn.source = "rdsg_startbtn_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }
            }
            SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
        };
        /**
         * 点击转轴区域快速停止游戏
         */
        RDSGScene1.prototype.scrollerFastGame = function () {
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
                    // this.scroller[`item${i}`].resetSpecilHui();
                    // }
                    // this.scroller.runResultFast();
                }
                // this.setBgColor();
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
            }
        };
        /**
         * 上次游戏效果移除
         */
        RDSGScene1.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore);
                egret.clearTimeout(this.sethuiTimeout);
            }
            this.clearAniPool();
            game.UIUtils.removeSelf(this.commomScore);
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
        };
        /**
        * 功能按钮屏蔽效果
        */
        RDSGScene1.prototype.setOtherBtn = function () {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this["quitBtn"].touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = false;
        };
        /**
         * 功能按钮效果还原
         */
        RDSGScene1.prototype.resetOtherBtn = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this["quitBtn"].touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = true;
        };
        /**
        * 开始按钮动画
        */
        RDSGScene1.prototype.setStartBtn = function () {
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.spinRunningAni.play("", 0);
            this.spinGroup.addChild(this.spinRunningAni);
            this.spinRunningAni.resetPosition();
            this.spinStartAni.play("", 1);
            this.spinGroup.addChild(this.spinStartAni);
            this.spinStartAni.resetPosition();
        };
        /**
         * 还原开始按钮
         */
        RDSGScene1.prototype.resetStartBtn = function () {
            game.UIUtils.removeSelf(this.spinRunningAni);
            this.spinDefaultAni.play("", 0);
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
        };
        // private HuiAtr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
        /**
        * 发送c_bet请求
        */
        RDSGScene1.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, colorMatrix, colorFlilter, resp1, i, i, j, aaa, str_lingshi, str_lingshi2, temp, temp1, temp2, arr, k, k, flag, _loop_1, this_1, i, scatternum, i, j, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [[], [], [], [], []];
                            this.bonusAtr = [];
                            this.scatterIcon = 0;
                            this.eachLineScore = [];
                            this.yudiAtr = [];
                            this.allAtr = [[], [], [], [], []];
                            this.scatter = 0;
                            this.allLine = [];
                            this.eachLineIconIndex = [];
                            this.fastItemIndex = 0;
                            this.lineTime = 1500;
                            //测试专用消息
                            if (this.isTest) {
                                if (this.spinTest == 1) {
                                    data2 = { "spinType": this.spinTest, "bet": game.RDSGUtils.bet, "lineCount": 20, "activityId": 0, "freeWheel": this.wheel };
                                }
                                else {
                                    data2 = { "spinType": this.spinTest, "bet": game.RDSGUtils.bet, "lineCount": 20, "activityId": 0, "wheel": this.wheel };
                                }
                            }
                            else {
                                data2 = { "spinType": 0, "bet": game.RDSGUtils.bet, "lineCount": 20, "activityId": 0 };
                            }
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
                            this.ownGold -= game.RDSGUtils.bet * 2;
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
                            game.RDSGUtils.ToTalMoney = this.ownGold;
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
                            this.lineTime = this.lineTime + this.bonusAtr.length * 400;
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
         * 每列转轴结束监听
         * @param  {egret.Event} e
         */
        RDSGScene1.prototype.scrollerEnd = function (e) {
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
                    game.UIUtils.removeSelf(this.scrollerAni);
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "rdsg_startbtn_png";
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
                        // this.scroller.removeIconHui(this.HuiAtr);
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 5 && !this.isFastGame)
                        this.scrollerItemFast(this.fastItemIndex);
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
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2) {
                            var atr = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
                            // this.scroller.setSpecilHui(atr);
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd)
                                return;
                            if (this.fastItemIndex == 4 && !this.isFastGame)
                                this.scrollerItemFast(this.fastItemIndex);
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
                    if (this.fastEnd)
                        return;
                    if (this.fastItemIndex == 3 && !this.isFastGame)
                        this.scrollerItemFast(this.fastItemIndex);
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
        * 播放总连线
        */
        RDSGScene1.prototype.checkBonusIcon = function () {
            var _this = this;
            //满足bigwin
            if (this.winGold >= (game.RDSGUtils.bet * 2) * 15) {
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
                                // this.scroller.setIconHui();
                                // this.scroller.removeIconHui(this.allAtr);
                                _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                                _this.winLine(_this.winLineGroup, _this.allLine);
                                _this.removeLineTimeOUt = egret.setTimeout(_this.clearAniPool, _this, _this.lineTime);
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
                    this.bigWinPanel = new rdsg.RDSGBigwinGroup();
                    // let i;
                    // i = Math.floor(Math.random() * 2);
                    // SoundManager.getInstance().playEffect("bskg_role_cheer1_mp3");
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
                        // SoundManager.getInstance().playEffect("bskg_bom_mp3");
                        if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                            _this.autoGameTimeout = egret.setTimeout(function () {
                                _this.startBtnTouch();
                            }, _this, _this.lineTime);
                        }
                        if (_this.scatter != 1) {
                            _this.startBtn.touchEnabled = true;
                            _this.scroller.stopIconDb();
                            // this.scroller.setIconHui();
                            // this.scroller.removeIconHui(this.allAtr);
                            _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                            _this.winLine(_this.winLineGroup, _this.allLine);
                            _this.removeLineTimeOUt = egret.setTimeout(_this.clearAniPool, _this, _this.lineTime);
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
                    SoundManager.getInstance().playEffect("rdsg_win_mp3");
                    if (this.scatter == 1)
                        this.runningType = RUNNING_TYPE.STOP;
                    // this.scroller.setIconHui();
                    // this.scroller.removeIconHui(this.allAtr);
                    this.winLine(this.winLineGroup, this.allLine);
                    this.removeLineTimeOUt = egret.setTimeout(this.clearAniPool, this, 2000);
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    var data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.font = "rdsg_winnum_big_fnt";
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.commomScore.textAlign = "center";
                    this.commomScore.verticalCenter = 0;
                    this.commomScore.horizontalCenter = 0;
                    this.gameGroup.addChild(this.commomScore);
                    this.removeScoreTimeout = egret.setTimeout(function () {
                        game.UIUtils.removeSelf(_this.commomScore);
                        _this.scroller.stopIconDb();
                        if (!game.LaohuUtils.isAutoGame || _this.scatter == 1)
                            _this.addEachLineAni();
                        if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            _this.askAutoGame();
                        }
                    }, this, this.lineTime);
                }
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        game.RDSGUtils.comm2FreeModel = this.showAtr;
                        SoundManager.getInstance().playEffect("rdsg_scat_mp3");
                        for (var i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "rdsg_icon_2");
                            SoundManager.getInstance().playEffect("rdsg_ding_mp3");
                        }
                        egret.setTimeout(function () {
                            CF.dP(ENo.RDSG_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            _this["quitBtn"].visible = false;
                        }, this, 4000);
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
        RDSGScene1.prototype.addEachLineAni = function () {
            var _this = this;
            //非空判断
            this.clearAniPool();
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) {
                    this["quitBtn"].touchEnabled = false;
                    this.resetStartBtn();
                }
                this.scroller.stopIconDb();
                var count_1 = 0;
                var eachLineArray_1 = [];
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, function (index, callback) {
                    if (_this.isStopAni)
                        return;
                    eachLineArray_1 = [];
                    // this.scroller.setSpecilHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                    for (var j = 0; j < index.length; j++) {
                        var k = j + 1;
                        // this.scroller[`item${k}`].resetIconHui(index[j]);
                        _this.scroller["item" + k].showAni(index[j]);
                        _this.commomScore.font = "rdsg_winnum_samll_fnt";
                        var data = Number(new Big(_this.eachLineScore[count_1]).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        _this.commomScore.verticalCenter = ((index[2] - 1)) * 163;
                        _this.commomScore.horizontalCenter = 0;
                        _this.commomScore.textAlign = "center";
                        // this.gameGroup.addChild(this[`lineImag`]);
                        _this.gameGroup.addChild(_this.commomScore);
                    }
                    //单一连线
                    if (_this.bonusAtr.length == 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        eachLineArray_1.push(_this.allLine[count_1]);
                        _this.winLine(_this.winLineGroup, eachLineArray_1);
                        _this.removeLineTimeOUt = egret.setTimeout(_this.clearAniPool, _this, 2000);
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                // this.scroller.setIconHui();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 2000);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2300);
                    }
                    //多条连线
                    if (_this.bonusAtr.length > 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        eachLineArray_1.push(_this.allLine[count_1]);
                        _this.winLine(_this.winLineGroup, eachLineArray_1);
                        _this.removeLineTimeOUt = egret.setTimeout(_this.clearAniPool, _this, 2000);
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                // this.scroller.setIconHui();
                                _this.scroller.stopIconDb();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 2000);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2300);
                    }
                    count_1++;
                    eachLineArray_1 = [];
                }, function () {
                    //callback 判断结果是否为scatter
                    if (_this.scatter == 1) {
                        game.UIUtils.removeSelf(_this.commomScore);
                        _this.runningType = RUNNING_TYPE.STOP;
                        _this.removeLineTimeOUt = egret.setTimeout(_this.clearAniPool, _this, 2000);
                        // this.scroller.removeIconHui(this.HuiAtr);
                        SoundManager.getInstance().playEffect("rdsg_scat_mp3");
                        for (var i = 0; i < _this.yudiAtr2.length; i++) {
                            _this.scroller.addFoGuang(_this.yudiAtr2[i], _this.yudiAtr[i], "rdsg_icon_2");
                            SoundManager.getInstance().playEffect("rdsg_ding_mp3");
                        }
                        game.RDSGUtils.comm2FreeModel = _this.showAtr;
                        egret.setTimeout(function () {
                            CF.dP(ENo.RDSG_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            _this.resetOtherBtn();
                        }, _this, 4000);
                        if (!game.LaohuUtils.isAutoGame)
                            _this.resetStartBtn();
                    }
                    else {
                        count_1 = 0;
                        eachLineArray_1 = [];
                        // this.scroller.setIconHui();
                        game.UIUtils.removeSelf(_this.commomScore);
                        _this.clearAniPool();
                        return _this.addEachLineAni();
                    }
                });
            }
        };
        /**
         * 设置最大倍数
         */
        RDSGScene1.prototype.setMaxBet = function () {
            var _this = this;
            var bet = game.RDSGUtils.bets[8];
            //金币是否满足条件
            if (2 * bet > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.RDSGUtils.bet = game.RDSGUtils.bets[8];
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + "");
            "";
            var data = Number(new Big(game.RDSGUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.bet = 9;
            this.beishu.text = game.RDSGUtils.bet + "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        /**
        * 减少倍数
        */
        RDSGScene1.prototype.reduceBet = function () {
            var _this = this;
            //倍数判断
            if (this.bet <= 1) {
                return;
            }
            else {
                game.LaohuUtils.totalWin = 0;
                this.bet -= 1;
                switch (this.bet) {
                    case 1:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[0];
                        break;
                    case 2:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[1];
                        break;
                    case 3:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[2];
                        break;
                    case 4:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[3];
                        break;
                    case 5:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[4];
                        break;
                    case 6:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[5];
                        break;
                    case 7:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[6];
                        break;
                    case 8:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[7];
                        break;
                    case 9:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[8];
                        break;
                    case 10:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[9];
                        break;
                }
            }
            var data = Number(new Big(game.RDSGUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this["betTtipsGroup"].visible = true;
            this.beishu.text = game.RDSGUtils.bet + "";
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + "");
            "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        RDSGScene1.prototype.addBetFunc = function () {
            var _this = this;
            //是否超出倍数范围
            if (this.bet <= 8) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[0];
                        break;
                    case 2:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[1];
                        break;
                    case 3:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[2];
                        break;
                    case 4:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[3];
                        break;
                    case 5:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[4];
                        break;
                    case 6:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[5];
                        break;
                    case 7:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[6];
                        break;
                    case 8:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[7];
                        break;
                    case 9:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[8];
                        break;
                    case 10:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[9];
                        break;
                }
            }
            var data = Number(new Big(game.RDSGUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.RDSGUtils.bet + "";
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + "");
            "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            if ((game.RDSGUtils.bet * 2) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.reduceBet();
            }
        };
        /**
         * 开始免费游戏
         */
        RDSGScene1.prototype.startAutoGame = function () {
            //余额判断
            if (game.RDSGUtils.bet * 2 > this.ownGold) {
                this.isFreeBack = false;
                this.startBtn.source = "rdsg_startbtn_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "rdsg_stopbtn_png";
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
         * 部分转轴加速
         * @param  {number} index
         */
        RDSGScene1.prototype.scrollerItemFast = function (index) {
            var _this = this;
            if (this.isFastGame)
                return;
            var item3 = this.scroller["item" + 3];
            var item4 = this.scroller["item" + 4];
            var item5 = this.scroller["item" + 5];
            switch (index) {
                case 3:
                    this.scroller.item3.clearDownTimeOut();
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item3.speed = 85;
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(3, 0);
                    this.scroller.speed = 85;
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
                        egret.clearTimeout(_this.autoGameTimeout);
                    }, this, 9000);
                    break;
                case 4:
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(4, 0);
                    this.scroller.speed = 85;
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
                        egret.clearTimeout(_this.autoGameTimeout);
                    }, this, 6000);
                    break;
                case 5:
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(5, 0);
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect("rdsg_reel_fast_spin_mp3", true);
                    this.scatter5timeout = egret.setTimeout(function () {
                        item5.changeResult(_this.showAtr[4]);
                        _this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3");
                        egret.clearTimeout(_this.autoGameTimeout);
                    }, this, 3000);
                    break;
            }
        };
        /**
       * 免费游戏结束后到正常游戏
       */
        RDSGScene1.prototype.free2Commom = function () {
            var _this = this;
            this.scatter = 0;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.RDSGUtils.ToTalMoney) + "";
            this.ownGold = game.RDSGUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.RDSGUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().playMusic("rdsg_background_mus_mp3");
            if (this["quitBtn"]) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this["quitBtn"].visible = true;
                    ;
                }
            }
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "rdsg_startbtn_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.RDSGUtils.freeWin >= game.LaohuUtils.oneMax) {
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
                this.startBtn.source = "rdsg_startbtn_png";
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
                    this.startBtn.source = "rdsg_startbtn_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                    this.startBtn.source = "rdsg_startbtn_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
         * 中奖连线
         * @param  {Array<Array<number>>} str
         * @param  {egret.DisplayObject} object
         */
        RDSGScene1.prototype.winLine = function (object, str) {
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
        RDSGScene1.prototype.allLineHanlde = function (object, atr) {
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
        RDSGScene1.prototype.eachLineHandle = function (object, atr) {
            if (atr)
                this.atr2 = atr;
            if (!this.isStopLine) {
                if (this.i < this.atr2.length - 1) {
                    switch (Math.abs(this.atr2[this.i] - this.atr2[this.i + 1])) {
                        case 2:
                            if (!this.isStopLine)
                                this.hugeLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 1:
                            if (!this.isStopLine)
                                this.bigLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 0:
                            if (!this.isStopLine)
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
        RDSGScene1.prototype.routationHandle = function (num) {
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
        RDSGScene1.prototype.hugeLineHandle = function (object, position, postion2) {
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
                if (!_this.isStopLine)
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
        RDSGScene1.prototype.bigLineHandle = function (object, position, position2) {
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
                if (!_this.isStopLine)
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
        RDSGScene1.prototype.midLineHandle = function (object, position) {
            var _this = this;
            var rdsgLineMid = new DBComponent("rdsg_line_mid");
            rdsgLineMid.play("rdsg_line_mid_1", 1);
            rdsgLineMid.bottom = this.aniPositionYHandle(position);
            rdsgLineMid.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineMid.callback = function () {
                if (!_this.isStopLine)
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
        RDSGScene1.prototype.addFirstAni = function (str) {
            var _this = this;
            var rdsgLineSmall = new DBComponent("rdsg_line_small");
            rdsgLineSmall.play("rdsg_line_small_1", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = -420;
            rdsgLineSmall.callback = function () {
                if (!_this.isStopLine)
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
        RDSGScene1.prototype.addLastAni = function (str) {
            var _this = this;
            var rdsgLineSmall = new DBComponent("rdsg_line_small");
            rdsgLineSmall.play("rdsg_line_small_1", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = 340;
            rdsgLineSmall.callback = function () {
                if (!_this.isStopLine)
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
        RDSGScene1.prototype.aniPositionYHandle = function (postion) {
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
        RDSGScene1.prototype.aniPositionXHandle = function (x) {
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
        RDSGScene1.prototype.clearAniPool = function () {
            if (this.aniPool) {
                for (var i = 0; i < this.aniPool.length; i++) {
                    game.UIUtils.removeSelf(this.aniPool[i]);
                    this.aniPool[i] = null;
                }
            }
        };
        RDSGScene1.prototype.askAutoGame = function () {
            var _this = this;
            var slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            this.resizeGroup.addChild(slotTips);
            game.LaohuUtils.isTips = true;
            if (game.LaohuUtils.isAutoGame) {
                egret.clearTimeout(this.autoGameTimeout);
            }
            var func = function () {
                // CF.sN(this.AUTOGAME_NOTIFY);
                if (game.LaohuUtils.isAutoGame)
                    _this.autoGameTimeout = egret.setTimeout(_this.startBtnTouch, _this, _this.lineTime);
                _this.isFastGame = true;
                game.UIUtils.removeSelf(slotTips);
                _this.clickTime = 0;
            };
            var func2 = function () {
                if (game.LaohuUtils.isAutoGame)
                    _this.autoGameTimeout = egret.setTimeout(_this.startBtnTouch, _this, _this.lineTime);
                game.UIUtils.removeSelf(slotTips);
                slot.SlotAutoTips._instance = null;
            };
            slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            slotTips.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
            slotTips.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
        };
        return RDSGScene1;
    }(game.BaseScene));
    rdsg.RDSGScene1 = RDSGScene1;
    __reflect(RDSGScene1.prototype, "rdsg.RDSGScene1");
})(rdsg || (rdsg = {}));
