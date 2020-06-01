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
 * @Author: wangtao
 * @Date: 2019-05-08 15:29:07
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-11-26 17:40:21
 * @Description:
 */
var cbzz;
(function (cbzz) {
    var CBZZScene1 = (function (_super) {
        __extends(CBZZScene1, _super);
        function CBZZScene1() {
            var _this = _super.call(this) || this;
            _this.winGold = 0;
            _this.bet = 1;
            _this.HuiAtr = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
            _this.clickTime = 0;
            _this.isFastGame = false;
            /**
             * 测试按钮
             */
            _this.isTest = false;
            _this.spinTest = 0;
            _this.fastEnd = false;
            _this.commomScore = new eui.BitmapLabel(); //中奖展示金额数字
            _this.isStopAni = false; //播放stop动画flag
            _this.runningType = 3; //选择类型
            _this.skinName = new CBZZScene1Skin();
            return _this;
        }
        CBZZScene1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.startGame();
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
            //判断是否为pc端
            var isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            if (Global.playerProxy.playerData.nickname == "test004" || Global.playerProxy.playerData.nickname == "test001" || Global.playerProxy.playerData.nickname == "test002" || Global.playerProxy.playerData.nickname == "test003" || Global.playerProxy.playerData.nickname == "test005" || Global.playerProxy.playerData.nickname == "test006" || Global.playerProxy.playerData.nickname == "test007" || Global.playerProxy.playerData.nickname == "test008" || Global.playerProxy.playerData.nickname == "test009" || Global.playerProxy.playerData.nickname == "test010") {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.QA_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.testGroup.visible = true;
                }
            }
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this.quitBtn.visible = false;
            }
            this.bgAni1 = DBComponent.create("cbzz_bg1", "cbzz_bg_ani1");
            this.bgAni2 = DBComponent.create("cbzz_bg2", "cbzz_bg_ani2");
            this.spinAni1 = DBComponent.create("cb_spin1", "cbzz_mouseon");
            this.spinAni2 = DBComponent.create("cb_spin2", "cbzz_spin_ani1");
            this.spin2stop = DBComponent.create("cb_spin2stop", "cbzz_stop_stop");
            this.startSpinAni = DBComponent.create("cb_startSpinAni", "cbzz_spin_gunang");
            game.CBZZUtils.bigwinAni1 = DBComponent.create("cb_bigwinAni1", "cbzz_bigwin_ani1");
            this.spinAni1.touchEnabled = this.spinAni2.touchEnabled = this.startSpinAni.touchEnabled = this.spin2stop.touchEnabled = false;
            this.spinAni1.play("", 0);
            this.spinAni1.horizontalCenter = 1;
            this.spinAni1.bottom = 41;
            this.spinGroup.addChild(this.spinAni1);
            this.spinAni1.resetPosition();
            this.bgAni1.play("", 0);
            this.resizeGroup.addChild(this.bgAni1);
            this.bgAni1.horizontalCenter = 0;
            this.bgAni1.bottom = 300;
            this.bgAni2.horizontalCenter = this.bgAni2.bottom = 0;
            this.bgAni1.touchEnabled = this.bgAni2.touchEnabled = false;
            this.bgAni1.resetPosition();
            this.bgAni2.play("", 0);
            this.effectGroup.addChild(this.bgAni2);
            this.bgAni2.resetPosition();
            this.scroller.showFirst(1);
        };
        /**
         * 开始游戏发送请求
         */
        CBZZScene1.prototype.startGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp1, data, resp, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                        case 1:
                            resp1 = _a.sent();
                            data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": 1003 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 2:
                            resp = _a.sent();
                            if (resp) {
                                if (resp.error.code != 0) {
                                    text = resp.error.msg;
                                    CF.sN(SceneNotify.CLOSE_CBZZ);
                                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                    Global.alertMediator.addAlert(text, function () {
                                    }, "", true);
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                CF.sN(SceneNotify.CLOSE_CBZZ);
                                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        CBZZScene1.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            SoundManager.getInstance().playMusic("cbzz_background_mus_mp3");
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.CBZZ_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
        };
        CBZZScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.CBZZ_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            egret.clearTimeout(this.showIconTimeOut);
            this.resizeGroup.removeChildren();
            this.scroller.removeScroller();
            egret.clearTimeout(this.removeScoreTimeout);
            this.removeEvent();
        };
        CBZZScene1.prototype.removeEvent = function () {
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
            this.quitBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this.quitBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        };
        /**
         * 进入游戏数据处理
         * @param  {egret.Event} e
         */
        CBZZScene1.prototype.enterGame = function (e) {
            var resp = e.data;
            game.CBZZUtils.bets = [];
            game.CBZZUtils.muls = [];
            var playerIdnex = resp.playerInfo.playerIndex;
            var players = {};
            for (var key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.CBZZUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            for (var j = 0; j < resp.roomInfo.gamePayTable.muls.length; j++) {
                game.CBZZUtils.muls.push(resp.roomInfo.gamePayTable.muls[j]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.CBZZUtils.FreeTimeMul = [];
                for (var k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.CBZZUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.CBZZUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.CBZZUtils.FreeTimeMul = game.CBZZUtils.FreeTimeMul[game.CBZZUtils.FreeTimeMulIndex];
                game.CBZZUtils.freeTimes = players.freeTimes;
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
            game.CBZZUtils.ToTalMoney = this.ownGold;
            game.CBZZUtils.bet = game.CBZZUtils.bets[0];
            game.CBZZUtils.mul = game.CBZZUtils.muls[0];
            //判断是否为免费游戏
            if (players.isScatter == 1 && players.freeTimes == 0) {
                game.CBZZUtils.bet = players.lastBet;
                game.CBZZUtils.mul = players.lastMul;
                CF.dP(ENo.CBZZ_ENTER_FREE_GAME_SCENE);
            }
            else if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.CBZZUtils.bet = players.lastBet;
                game.CBZZUtils.mul = players.lastMul;
                CF.dP(ENo.CBZZ_START_FREE_GAME_SCENE);
            }
            //重连后倍数判断
            switch ((game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                case 0.5:
                    this.bet = 1;
                    break;
                case 1:
                    this.bet = 2;
                    break;
                case 2:
                    this.bet = 3;
                    break;
                case 5:
                    this.bet = 4;
                    break;
                case 10:
                    this.bet = 5;
                    break;
                case 15:
                    this.bet = 6;
                    break;
                case 30:
                    this.bet = 7;
                    break;
                case 50:
                    this.bet = 8;
                    break;
                case 70:
                    this.bet = 9;
                    break;
                case 100:
                    this.bet = 10;
                    break;
            }
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) + "";
            this.beishu.text = parseInt(game.CBZZUtils.bet * game.CBZZUtils.mul * 100 + "") + "";
            this["maxWinLabel"].text = "最高可得: " + parseInt(game.CBZZUtils.bet * game.CBZZUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        };
        /**
         * 鼠标手势库
         */
        CBZZScene1.prototype.addMouseOnEvent = function () {
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
            this.quitBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this.quitBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        };
        CBZZScene1.prototype.changeMenuBtn = function () {
            this.memuBtn.currentState = "down";
        };
        CBZZScene1.prototype.changeMenuBtn2 = function () {
            this.memuBtn.currentState = "up";
        };
        CBZZScene1.prototype.changesettingBtn = function () {
            this.setingBtn.currentState = "down";
        };
        CBZZScene1.prototype.changesettingBtn2 = function () {
            this.setingBtn.currentState = "up";
        };
        CBZZScene1.prototype.changetipsBtn = function () {
            this.tipsBtn.currentState = "down";
        };
        CBZZScene1.prototype.changetipsBtn2 = function () {
            this.tipsBtn.currentState = "up";
        };
        CBZZScene1.prototype.changeBetAddBtn = function () {
            this.addbet.currentState = "down";
            this["betTtipsGroup"].visible = true;
        };
        CBZZScene1.prototype.changeBetAddBtn2 = function () {
            var _this = this;
            this.addbet.currentState = "up";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        CBZZScene1.prototype.changeBetSubBtn = function () {
            this.subbet.currentState = "down";
            this["betTtipsGroup"].visible = true;
        };
        CBZZScene1.prototype.changeBetSubBtn2 = function () {
            var _this = this;
            this.subbet.currentState = "up";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        CBZZScene1.prototype.changeyazhuBtn = function () {
            this.maxBet.source = RES.getRes("sdxl_bet2_png");
        };
        CBZZScene1.prototype.changeyazhuBtn2 = function () {
            this.maxBet.source = RES.getRes("sdxl_bet1_png");
        };
        CBZZScene1.prototype.changeAutoRunBtn = function () {
            this.autoGameBtn.currentState = "down";
        };
        CBZZScene1.prototype.changeAutoRunBtn2 = function () {
            this.autoGameBtn.currentState = "up";
        };
        CBZZScene1.prototype.changeGameRecord = function () {
            this.recordBtn.currentState = "down";
        };
        CBZZScene1.prototype.changeGameRecord2 = function () {
            this.recordBtn.currentState = "up";
        };
        CBZZScene1.prototype.changeOutBtn = function () {
            this.quitBtn.currentState = "donw";
        };
        CBZZScene1.prototype.changeOutBtn2 = function () {
            this.quitBtn.currentState = "up";
        };
        /**
         * 点击事件
         * @param  {egret.TouchEvent} e
         */
        CBZZScene1.prototype.onTouchTap = function (e) {
            switch (e.target) {
                //spin按钮
                case this.startBtn:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    this.startBtnTouch();
                    break;
                //退出按钮
                case this.quitBtn:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    this.leaveCBZZ();
                    break;
                //最大bet按钮
                case this.maxBet:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    this.setMaxBet();
                    break;
                //赔付表按钮
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    this.opencbzzTips();
                    break;
                //减少bet按钮
                case this.subbet:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    this.reduceBet();
                    break;
                //增加bet按钮
                case this.addbet:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    this.addBetFunc();
                    break;
                //自动游戏窗口
                case this.autoGameBtn:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    CF.sN(PanelNotify.OPEN_CBZZ_AUTO_PANEL);
                    break;
                //转轴快速停止
                case this.maskRect:
                    this.scrollerFastGame();
                    break;
                //菜单按钮
                case this.memuBtn:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    if (this.menuGroup.visible == false) {
                        this.menuGroup.visible = true;
                    }
                    else {
                        this.menuGroup.visible = false;
                    }
                    break;
                //游戏记录按钮
                case this.recordBtn:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    this.openGameRecord();
                    this.menuGroup.visible = false;
                    break;
                //游戏设置按钮
                case this.setingBtn:
                    SoundManager.getInstance().playEffect("cbzz_button_mp3");
                    CF.sN(PanelNotify.OPEN_SETTING);
                    this.menuGroup.visible = false;
                    break;
                //测试按钮
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        };
        /**
         * spin按钮点击处理
         */
        CBZZScene1.prototype.startBtnTouch = function () {
            var _this = this;
            //判断余额
            var data = Number(new Big(game.CBZZUtils.bet * game.CBZZUtils.mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, function () {
                    _this.resetOtherBtn();
                    Global.playerProxy.playerData.gold = _this.ownGold;
                    if (game.LaohuUtils.isAutoGame) {
                        _this.resetStartBtn();
                        _this.startBtn.source = "cbzz_startbtn_png";
                        _this.timesLabel.text = "";
                        game.LaohuUtils.isAutoGame = false;
                        game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                        game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                        game.LaohuUtils.speed = 48;
                        _this.runningType = RUNNING_TYPE.EMPTY;
                    }
                }, "", true);
                return;
            }
            // this.menuGroup.visible = false;
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
                // 判断是否为免费游戏并且是否有剩余的免费次数
                if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times >= 1) {
                    if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                        game.LaohuUtils.isAutoGame = false;
                        game.LaohuUtils.stopAuto = false;
                        game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                        game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                        this.resetOtherBtn();
                        this.startBtn.source = "cbzz_startbtn_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.stopAuto = false;
                            game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "cbzz_startbtn_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    //判断是否为免费游戏并且是否有满足总赢取条件
                    if (game.LaohuUtils.totalWin && game.LaohuUtils.isAutoGame) {
                        //自动游戏总赢取条件满足
                        if (game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.stopAuto = false;
                            game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "cbzz_startbtn_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.CBZZUtils.bet * game.CBZZUtils.mul * 50;
                    if (game.LaohuUtils.auto_times > 1000) {
                        this.timesLabel.text = "s";
                    }
                }
                else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                    this.timesLabel.visible = false;
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.stopAuto = false;
                    game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.startBtn.source = "cbzz_startbtn_png";
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
                SoundManager.getInstance().playEffect("cbzz_reel_mp3", true);
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
            //         CF.sN(PanelNotify.OPEN_CBZZ_AUTO_PANEL);
            //         game.UIUtils.removeSelf(slotTips);
            //     }
            //     slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            // }
        };
        CBZZScene1.prototype.startBtnTouch0 = function () {
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
        CBZZScene1.prototype.fastGame = function () {
            var _this = this;
            //转轴加速情况
            if (this.scatterIcon >= 2) {
                this.fastEnd = true;
                egret.clearTimeout(this.scatter4timeout);
                egret.clearTimeout(this.scatter5timeout);
                this.scroller.removeScatterAni();
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                this.startBtn.source = "cbzz_startbtn_png";
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
                if (this.scatter != 1)
                    this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "cbzz_startbtn_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spin2stop.play("", 1);
                this.spin2stop.horizontalCenter = 1;
                this.spin2stop.bottom = 85;
                this.spinGroup.addChild(this.spin2stop);
                this.spin2stop.resetPosition();
                this.spin2stop.callback = function () {
                    game.UIUtils.removeSelf(_this.spin2stop);
                };
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            else {
                this.startBtn.source = "cbzz_startbtn_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }
            }
            SoundManager.getInstance().stopEffectByName("cbzz_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
        };
        /**
         * 点击转轴区域快速停止游戏
         */
        CBZZScene1.prototype.scrollerFastGame = function () {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
                if (this.scatterIcon >= 2) {
                    this.fastEnd = true;
                    egret.clearTimeout(this.scatter4timeout);
                    egret.clearTimeout(this.scatter5timeout);
                    this.scroller.removeScatterAni();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    this.scroller.item4.speed = 48;
                    this.scroller.item5.speed = 48;
                    for (var i = 1; i <= 4; i++) {
                        this.scroller["item" + i].resetSpecilHui();
                    }
                    // this.scroller.runResultFast();
                }
                // this.setBgColor();
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("cbzz_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
            }
        };
        /**
         * 置灰屏蔽其他按钮
         */
        CBZZScene1.prototype.setOtherBtn = function () {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this.quitBtn.touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = false;
        };
        /**
         * 还原其他按钮
         */
        CBZZScene1.prototype.resetOtherBtn = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this.quitBtn.touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = true;
        };
        /**
         * spin按钮旋转动画
         */
        CBZZScene1.prototype.setStartBtn = function () {
            game.UIUtils.removeSelf(this.spinAni1);
            this.startSpinAni.play("", 1);
            this.startSpinAni.horizontalCenter = 1;
            this.startSpinAni.bottom = 41;
            this.spinAni2.play("", 0);
            this.spinAni2.horizontalCenter = 1;
            this.spinAni2.bottom = 41;
            this.spinGroup.addChild(this.spinAni2);
            this.spinAni2.resetPosition();
            this.spinGroup.addChild(this.startSpinAni);
            this.startSpinAni.resetPosition();
        };
        /**
         * 开始免费游戏
         */
        CBZZScene1.prototype.startAutoGame = function () {
            //余额判断
            if (NumberFormat.handleFloatDecimal(game.CBZZUtils.bet) * NumberFormat.handleFloatDecimal(game.CBZZUtils.mul) * 50 > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinAni1);
            this.startBtn.source = "cbzz_stopbtn_png";
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
            game.LaohuUtils.totoalWinGold = 0;
            game.LaohuUtils.totalBet = 0;
            this.startBtnTouch();
        };
        /**
         * 还原spin按钮动画
         */
        CBZZScene1.prototype.resetStartBtn = function () {
            game.UIUtils.removeSelf(this.spinAni2);
            this.spinAni1.play("", 0);
            this.spinAni1.horizontalCenter = 1;
            this.spinAni1.bottom = 41;
            this.spinGroup.addChild(this.spinAni1);
            this.spinAni1.resetPosition();
        };
        CBZZScene1.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                egret.clearTimeout(this.sethuiTimeout);
                for (var i = 1; i <= 5; i++) {
                    this.scroller["item" + i].resetSpecilHui();
                }
            }
            game.UIUtils.removeSelf(this.commomScore);
            this.lineScoreGroup.visible = false;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
        };
        /**
         * 发送c_bet请求
         */
        CBZZScene1.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, data, colorMatrix, colorFlilter, resp1, i, i, j, aaa, str_lingshi, temp, temp2, arr, k, scatternum, i, j, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [];
                            this.bonusAtr = [];
                            this.scatterIcon = 0;
                            this.eachLineScore = [];
                            this.yudiAtr = [];
                            this.allAtr = [];
                            this.scatter = 0;
                            //测试专用消息
                            if (this.isTest) {
                                if (this.spinTest == 1) {
                                    data2 = { "spinType": this.spinTest, "bet": game.CBZZUtils.bet, "multiple": game.CBZZUtils.mul, "lineCount": 243, "activityId": 0, "freeWheel": this.wheel };
                                }
                                else {
                                    data2 = { "spinType": this.spinTest, "bet": game.CBZZUtils.bet, "multiple": game.CBZZUtils.mul, "lineCount": 243, "activityId": 0, "wheel": this.wheel };
                                }
                            }
                            else {
                                data2 = { "spinType": 0, "bet": game.CBZZUtils.bet, "multiple": game.CBZZUtils.mul, "lineCount": 243, "activityId": 0 };
                            }
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_CBZZ);
                                SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
                                return [2 /*return*/];
                            }
                            data = Number(new Big(game.CBZZUtils.bet * game.CBZZUtils.mul).mul(50));
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
                            if (this.winGold > 0) {
                                this.lineTime = 1500;
                            }
                            else {
                                this.lineTime = 1000;
                            }
                            game.CBZZUtils.ToTalMoney = resp2.own_gold;
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
                                        }
                                    }
                                }
                            }
                            //免费游戏情况下累加赢取金额
                            if (game.LaohuUtils.isAutoGame) {
                                game.LaohuUtils.totoalWinGold += this.winGold;
                            }
                            this.isStopAni = false;
                            for (i = 0; i < 3; i++) {
                                for (j = 0; j < this.showAtr[i].length; j++) {
                                    //判断前三列几个玉帝
                                    if (this.showAtr[i][j] == 2) {
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
        /**
         * 每列转轴结束监听
         * @param  {egret.Event} e
         */
        CBZZScene1.prototype.scrollerEnd = function (e) {
            var _this = this;
            var data = e.data;
            //场景判断
            if (data.sceneIndex != 1) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "cbzz_startbtn_png";
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
                                    for (var j = 0; j < 3; j++) {
                                        if (this.showAtr[2][j] == 2) {
                                            for (var k = 0; k < 3; k++) {
                                                if (this.showAtr[0][k] == 2) {
                                                    SoundManager.getInstance().playEffect("cbzz_scat_mp3");
                                                    this.scroller.addFoGuang1(5, i, "cbzz_icon_2_guang");
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                                }
                            }
                        }
                        this.scroller.removeIconHui(this.HuiAtr);
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
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
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, 1500);
                            }
                            else {
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, 1000);
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
                    SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                    break;
                case 3:
                    for (var i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            for (var j = 0; j < 3; j++) {
                                if (this.showAtr[0][j] == 2) {
                                    SoundManager.getInstance().playEffect("cbzz_scat_mp3");
                                    this.scroller.addFoGuang1(3, i, "cbzz_icon_2_guang");
                                }
                            }
                        }
                        else {
                            SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                        }
                    }
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2 && !this.isFastGame) {
                            var atr = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
                            this.scroller.setSpecilHui(atr);
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd)
                                return;
                            this.scroller.item4.clearDownTimeOut();
                            this.scroller.item5.clearDownTimeOut();
                            this.scroller.item4.speed = 85;
                            this.scroller.item5.speed = 85;
                            this.scroller.addScatterAni(4);
                            this.scroller.speed = 85;
                            var item4_1 = this.scroller["item" + 4];
                            var item5_1 = this.scroller["item" + 5];
                            SoundManager.getInstance().playEffect("cbzz_reel_fast_spin_mp3");
                            if (!Global.runBack) {
                                this.scatter4timeout = egret.setTimeout(function () {
                                    item4_1.changeResult(_this.showAtr[3]);
                                    _this.scroller.removeScatterAni(4);
                                    _this.scroller.addScatterAni(5);
                                    _this.scroller.setSpecilHui([[], [], [], [0, 1, 2], []]);
                                }, this, 2800);
                                this.scatter5timeout = egret.setTimeout(function () {
                                    item5_1.changeResult(_this.showAtr[4]);
                                    _this.scroller.removeScatterAni(5);
                                    SoundManager.getInstance().stopEffectByName("cbzz_reel_fast_spin_mp3");
                                    egret.clearTimeout(_this.autoGameTimeout);
                                    _this.scroller.removeIconHui(_this.HuiAtr);
                                }, this, 5400);
                            }
                        }
                    }
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                    break;
                case 1:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("cbzz_scat_mp3");
                            this.scroller.addFoGuang1(1, i, "cbzz_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("cbzz_reelstop1_mp3");
                        }
                    }
                    break;
            }
        };
        /**
         * 免费游戏结束后到正常游戏
         */
        CBZZScene1.prototype.free2Commom = function () {
            var _this = this;
            this.scatter = 0;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            if (this.quitBtn) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this["quitBtn"].visible = true;
                }
            }
            SoundManager.getInstance().playMusic("cbzz_background_mus_mp3");
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "cbzz_startbtn_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.CBZZUtils.freeWin >= game.LaohuUtils.oneMax) {
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
                this.startBtn.source = "cbzz_startbtn_png";
                this.timesLabel.text = "";
                this.runningType = RUNNING_TYPE.EMPTY;
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                game.UIUtils.removeSelf(this.spinAni1);
                egret.setTimeout(function () { _this.startAutoGame(); }, this, 1000);
            }
            else {
                this.resetOtherBtn();
            }
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.CBZZUtils.ToTalMoney) + "";
            this.ownGold = game.CBZZUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.CBZZUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.CBZZUtils.freeWin = 0;
        };
        /**
         * 播放总的中奖连线以及判断是否中bigwin
         */
        CBZZScene1.prototype.checkBonusIcon = function () {
            var _this = this;
            //满足bigwin
            if (this.winGold >= (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) * 15) {
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
                                }, _this, 1500);
                            }
                            if (!game.LaohuUtils.isAutoGame) {
                                _this.runningType = RUNNING_TYPE.EMPTY;
                            }
                            if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame)
                                _this.memuBtn.touchEnabled = _this.maxBet.touchEnabled = _this.addbet.touchEnabled = _this.subbet.touchEnabled = _this.autoGameBtn.touchEnabled = _this.tipsBtn.touchEnabled = _this.quitBtn.touchEnabled = true;
                            if (_this.scatter == 1)
                                _this.addEachLineAni();
                            if (_this.scatter != 1) {
                                _this.scroller.setIconHui();
                                _this.scroller.removeIconHui(_this.allAtr);
                                _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                                if (!game.LaohuUtils.isAutoGame) {
                                    _this.eachLineTimeOut = egret.setTimeout(function () {
                                        _this.addEachLineAni();
                                    }, _this, 1500);
                                }
                                if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                    _this.askAutoGame();
                                }
                                ;
                            }
                        });
                        //未中scatter，播放一次总连线
                    };
                    this.bigWinPanel = new cbzz.CBZZBigwinGroup();
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
                            }, _this, 1500);
                        }
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        if (_this.scatter != 1) {
                            _this.startBtn.touchEnabled = true;
                            _this.scroller.stopIconDb();
                            _this.scroller.setIconHui();
                            _this.scroller.removeIconHui(_this.allAtr);
                            _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                            if (!game.LaohuUtils.isAutoGame) {
                                _this.eachLineTimeOut = egret.setTimeout(function () {
                                    _this.addEachLineAni();
                                }, _this, 1500);
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
                        if (_this.scatter == 1)
                            _this.addEachLineAni();
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                } //bigwin后中免费游戏 
                else {
                    //中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        this.quitBtn.touchEnabled = false;
                        SoundManager.getInstance().playEffect("cbzz_scatin1_mp3");
                        this.scroller.addFoGuang(1, this.yudiAtr[0], "cbzz_icon_2");
                        this.scroller.addFoGuang(3, this.yudiAtr[1], "cbzz_icon_2");
                        this.scroller.addFoGuang(5, this.yudiAtr[2], "cbzz_icon_2");
                        CF.dP(ENo.CBZZ_ENTER_FREE_GAME_SCENE, { isfast: this.isFastGame });
                        // this.resetBtnColor();
                        if (!game.LaohuUtils.isAutoGame)
                            this.resetStartBtn();
                    }
                }
            }
            else {
                //展示图标非空判断
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    SoundManager.getInstance().playEffect("cbzz_win_mp3");
                    if (this.scatter == 1)
                        this.runningType = RUNNING_TYPE.STOP;
                    this.scroller.setIconHui();
                    this.scroller.removeIconHui(this.allAtr);
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    var data = Number(new Big(this.winGold).mul(100));
                    this.lineNum.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.lineScoreGroup.visible = true;
                    this.sethuiTimeout = egret.setTimeout(function () { _this.scroller.setIconHui(); }, this, 1500);
                    this.removeScoreTimeout = egret.setTimeout(function () {
                        _this.lineScoreGroup.visible = false;
                        _this.addEachLineAni();
                    }, this, 1600);
                    if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                        this.askAutoGame();
                    }
                }
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        // this.quitBtn.touchEnabled = false;
                        SoundManager.getInstance().playEffect("cbzz_scatin1_mp3");
                        this.scroller.addFoGuang(1, this.yudiAtr[0], "cbzz_icon_2");
                        this.scroller.addFoGuang(3, this.yudiAtr[1], "cbzz_icon_2");
                        this.scroller.addFoGuang(5, this.yudiAtr[2], "cbzz_icon_2");
                        egret.setTimeout(function () {
                            CF.dP(ENo.CBZZ_ENTER_FREE_GAME_SCENE, { isfast: _this.isFastGame });
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
        /**
         * 每条连线动画
         */
        CBZZScene1.prototype.addEachLineAni = function () {
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
                    if (_this.isStopAni)
                        return;
                    _this.lineScoreGroup.visible = false;
                    _this.scroller.setSpecilHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                    for (var j = 0; j < index.length; j++) {
                        var k = j + 1;
                        _this.scroller["item" + k].resetIconHui(index[j]);
                        _this.scroller["item" + k].showAni(index[j]);
                        _this.commomScore.font = "cbzz_commomnum_fnt";
                        var data = Number(new Big(_this.eachLineScore[count_1]).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        _this.commomScore.verticalCenter = ((index[2] - 1)) * 184;
                        _this.commomScore.horizontalCenter = 0;
                        _this.commomScore.textAlign = "center";
                        _this.commomScore.scaleX = 0.8;
                        _this.commomScore.scaleY = 0.8;
                        _this.scroller.addChild(_this.commomScore);
                    }
                    //单一连线
                    if (_this.bonusAtr.length == 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                _this.scroller.setIconHui();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 1500);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 1600);
                    }
                    //多条连线
                    if (_this.bonusAtr.length > 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                _this.scroller.setIconHui();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 1500);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 1600);
                    }
                    count_1++;
                }, function () {
                    //callback 判断结果是否为scatter
                    if (_this.scatter == 1) {
                        game.UIUtils.removeSelf(_this.commomScore);
                        _this.runningType = RUNNING_TYPE.STOP;
                        _this.scroller.removeIconHui(_this.HuiAtr);
                        SoundManager.getInstance().playEffect("cbzz_scatin1_mp3");
                        _this.scroller.addFoGuang(1, _this.yudiAtr[0], "cbzz_icon_2");
                        _this.scroller.addFoGuang(3, _this.yudiAtr[1], "cbzz_icon_2");
                        _this.scroller.addFoGuang(5, _this.yudiAtr[2], "cbzz_icon_2");
                        egret.setTimeout(function () {
                            CF.dP(ENo.CBZZ_ENTER_FREE_GAME_SCENE, { isfast: _this.isFastGame });
                            _this.resetOtherBtn();
                        }, _this, 2500);
                        if (!game.LaohuUtils.isAutoGame)
                            _this.resetStartBtn();
                    }
                    else {
                        count_1 = 0;
                        _this.scroller.setIconHui();
                        game.UIUtils.removeSelf(_this.commomScore);
                        return _this.addEachLineAni();
                    }
                });
            }
        };
        /**
         * 退出赤壁之战
         */
        CBZZScene1.prototype.leaveCBZZ = function () {
            if (this.scatter == 1)
                return;
            if (ServerConfig.OP_RETURN_TYPE == "2") {
                FrameUtils.goHome();
                return;
            }
            game.releaseSlotRes.currentSlotName = "cbzz";
            CF.sN(PanelNotify.OPEN_LEAVE_LAOHU_PANEL);
        };
        /**
         * 打开游戏记录
         */
        CBZZScene1.prototype.openGameRecord = function () {
            CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
        };
        /**
         * 设置最大倍数
         */
        CBZZScene1.prototype.setMaxBet = function () {
            var _this = this;
            //金币是否满足条件
            var bet = game.CBZZUtils.bets[4];
            var mul = game.CBZZUtils.muls[9];
            var data1 = Number(new Big(bet * mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.CBZZUtils.bet = game.CBZZUtils.bets[4];
            game.CBZZUtils.mul = game.CBZZUtils.muls[9];
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(game.CBZZUtils.bet * game.CBZZUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(game.CBZZUtils.bet * game.CBZZUtils.mul * 50) + "";
            this.bet = 10;
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            this.beishu.text = parseInt(game.CBZZUtils.bet * game.CBZZUtils.mul * 100 + "") + "";
        };
        /**
         * 减少倍数
         */
        CBZZScene1.prototype.reduceBet = function () {
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
                        game.CBZZUtils.bet = game.CBZZUtils.bets[0];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[0];
                        break;
                    case 2:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[0];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[1];
                        break;
                    case 3:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[0];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[3];
                        break;
                    case 4:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[0];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[9];
                        break;
                    case 5:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[1];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[9];
                        break;
                    case 6:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[2];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[5];
                        break;
                    case 7:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[3];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[5];
                        break;
                    case 8:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[3];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[9];
                        break;
                    case 9:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[4];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[6];
                        break;
                    case 10:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[4];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[9];
                        break;
                }
            }
            this.beishu.text = parseInt(game.CBZZUtils.bet * game.CBZZUtils.mul * 100 + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) + "";
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(game.CBZZUtils.bet * game.CBZZUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
        };
        CBZZScene1.prototype.addBetFunc = function () {
            var _this = this;
            //是否超出倍数范围
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[0];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[0];
                        break;
                    case 2:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[0];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[1];
                        break;
                    case 3:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[0];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[3];
                        break;
                    case 4:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[0];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[9];
                        break;
                    case 5:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[1];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[9];
                        break;
                    case 6:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[2];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[5];
                        break;
                    case 7:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[3];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[5];
                        break;
                    case 8:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[3];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[9];
                        break;
                    case 9:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[4];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[6];
                        break;
                    case 10:
                        game.CBZZUtils.bet = game.CBZZUtils.bets[4];
                        game.CBZZUtils.mul = game.CBZZUtils.muls[9];
                        break;
                }
            }
            this.beishu.text = parseInt(game.CBZZUtils.bet * game.CBZZUtils.mul * 100 + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) + "";
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(game.CBZZUtils.bet * game.CBZZUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            var data = Number(new Big(game.CBZZUtils.bet * game.CBZZUtils.mul).mul(50));
            if ((NumberFormat.handleFloatDecimal(data)) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.reduceBet();
            }
        };
        /**
         * 打开赤壁之战赔付表
         */
        CBZZScene1.prototype.opencbzzTips = function () {
            CF.sN(PanelNotify.OPEN_CBZZ_TIPS_PANEL);
        };
        CBZZScene1.prototype.askAutoGame = function () {
            var _this = this;
            var slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            game.LaohuUtils.isTips = true;
            this.resizeGroup.addChild(slotTips);
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
        return CBZZScene1;
    }(game.BaseScene));
    cbzz.CBZZScene1 = CBZZScene1;
    __reflect(CBZZScene1.prototype, "cbzz.CBZZScene1");
})(cbzz || (cbzz = {}));
