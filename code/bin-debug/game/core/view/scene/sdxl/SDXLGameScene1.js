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
 * @Date: 2019-04-03 11:05:27
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-11-26 17:39:52
 * @Description:
 */
var sdxl;
(function (sdxl) {
    var SDXLGameScene1 = (function (_super) {
        __extends(SDXLGameScene1, _super);
        function SDXLGameScene1() {
            var _this = _super.call(this) || this;
            _this.bet = 1;
            _this.clickTime = 0;
            _this.isFastGame = false;
            _this.runningType = 3;
            /**
             * 测试按钮
             */
            _this.isTest = false;
            _this.spinTest = 0;
            _this.HuiAtr = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
            _this.isFreeBack = false;
            _this.winGold = 0; //每次赢得的金币
            _this.scatterIcon = 0; //小龙女图标的数量
            _this.scatter = 0; //是否中免费游戏
            /**
             * 旋转结果
             */
            _this.fastEnd = false;
            _this.commomScore = new eui.BitmapLabel();
            _this.isStopAni = false;
            _this.skinName = new SDXLGameScene1Skin();
            return _this;
        }
        SDXLGameScene1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            this.setBtncolor();
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = false;
            //进入游戏判断是否为测试账号
            if (Global.playerProxy.playerData.nickname == "test004" || Global.playerProxy.playerData.nickname == "test001" || Global.playerProxy.playerData.nickname == "test002" || Global.playerProxy.playerData.nickname == "test003" || Global.playerProxy.playerData.nickname == "test005" || Global.playerProxy.playerData.nickname == "test006" || Global.playerProxy.playerData.nickname == "test007" || Global.playerProxy.playerData.nickname == "test008" || Global.playerProxy.playerData.nickname == "test009" || Global.playerProxy.playerData.nickname == "test010") {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.QA_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.testGroup.visible = true;
                }
            }
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this.quitBtn.visible = false;
            }
            game.SDXLUtils.sakura = DBComponent.create("sakura", "sdxl_bigwin_sakura");
            game.SDXLUtils.titleChaneAni = DBComponent.create("titleChaneAni", "sdxl_bigwin_guang");
            // game.SDXLUtils.sakura = new DBComponent("sdxl_bigwin_sakura");
            // game.SDXLUtils.titleChaneAni = new DBComponent("sdxl_bigwin_guang");
            this.startGame();
            this.scroller.showFirst(1);
            var isPC = NativeApi.instance.IsPC();
            //判断是否为pc端
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            this.bgDb = DBComponent.create("bgDb", "sdxl_denglong");
            this.winGoldDiAni = DBComponent.create("winGoldDiAni", "sdxl_gold_diguang");
            // this.bgDb = new DBComponent("sdxl_denglong");
            // this.winGoldDiAni = new DBComponent("sdxl_gold_diguang");
            this.winGoldDiAni.bottom = 85;
            this.winGoldDiAni.horizontalCenter = 0;
            this.btnStopAni = DBComponent.create("btnStopAni", "sdxl_spin_guang");
            // this.btnStopAni = new DBComponent("sdxl_spin_guang");
            this.btnStopAni.horizontalCenter = 17;
            this.btnStopAni.bottom = 80;
            this.bgDb.play("", 0);
            this.bgDb.horizontalCenter = 0;
            this.bgDb.bottom = 120;
            this.effecttGroup.addChild(this.bgDb);
            this.bgDb.resetPosition();
            this.bgDb.touchEnabled = false;
            this.dbMouseOn = DBComponent.create("sdxl_mouseon", "sdxl_mouseon");
            // this.dbMouseOn = new DBComponent("sdxl_mouseon");
            this.dbMouseOn.play("", 0);
            this.dbMouseOn.horizontalCenter = 17;
            this.dbMouseOn.bottom = 35;
            this.runGroup.addChild(this.dbMouseOn);
            this.dbMouseOn.resetPosition();
            this.dbMouseOn.touchEnabled = false;
        };
        SDXLGameScene1.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
            CF.aE(ENo.SDXL_ENTER_COMMON_GAME, this.free2Common, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
        };
        SDXLGameScene1.prototype.addMouseOnEvent = function () {
            this.muneBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.muneBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.sdxlSettingBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.sdxlSettingBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.addBet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.addBet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.subBet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.subBet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.maxBet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.maxBet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoGameBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoGameBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.sdxlRecordBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.sdxlRecordBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this.quitBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this.quitBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        };
        SDXLGameScene1.prototype.removeEvent = function () {
            this.muneBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.muneBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.sdxlSettingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.sdxlSettingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.addBet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.addBet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.subBet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.subBet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.maxBet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.maxBet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoGameBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoGameBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.sdxlRecordBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.sdxlRecordBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this.quitBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this.quitBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        };
        SDXLGameScene1.prototype.changeMenuBtn = function () {
            this.muneBtn.currentState = "down";
        };
        SDXLGameScene1.prototype.changeMenuBtn2 = function () {
            this.muneBtn.currentState = "up";
        };
        SDXLGameScene1.prototype.changesettingBtn = function () {
            this.sdxlSettingBtn.currentState = "down";
        };
        SDXLGameScene1.prototype.changesettingBtn2 = function () {
            this.sdxlSettingBtn.currentState = "up";
        };
        SDXLGameScene1.prototype.changetipsBtn = function () {
            this.tipsBtn.currentState = "down";
        };
        SDXLGameScene1.prototype.changetipsBtn2 = function () {
            this.tipsBtn.currentState = "up";
        };
        SDXLGameScene1.prototype.changeBetAddBtn = function () {
            this.addBet.currentState = "down";
            this.betTtipsGroup.visible = true;
        };
        SDXLGameScene1.prototype.changeBetAddBtn2 = function () {
            var _this = this;
            this.addBet.currentState = "up";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
        };
        SDXLGameScene1.prototype.changeBetSubBtn = function () {
            this.subBet.currentState = "down";
            this.betTtipsGroup.visible = true;
        };
        SDXLGameScene1.prototype.changeBetSubBtn2 = function () {
            var _this = this;
            this.subBet.currentState = "up";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
        };
        SDXLGameScene1.prototype.changeyazhuBtn = function () {
            this.maxBet.source = RES.getRes("sdxl_bet2_png");
        };
        SDXLGameScene1.prototype.changeyazhuBtn2 = function () {
            this.maxBet.source = RES.getRes("sdxl_bet1_png");
        };
        SDXLGameScene1.prototype.changeAutoRunBtn = function () {
            this.autoGameBtn.currentState = "down";
        };
        SDXLGameScene1.prototype.changeAutoRunBtn2 = function () {
            this.autoGameBtn.currentState = "up";
        };
        SDXLGameScene1.prototype.changeGameRecord = function () {
            this.sdxlRecordBtn.currentState = "down";
        };
        SDXLGameScene1.prototype.changeGameRecord2 = function () {
            this.sdxlRecordBtn.currentState = "up";
        };
        SDXLGameScene1.prototype.changeOutBtn = function () {
            this.quitBtn.currentState = "donw";
        };
        SDXLGameScene1.prototype.changeOutBtn2 = function () {
            this.quitBtn.currentState = "up";
        };
        SDXLGameScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            CF.rE(ENo.SDXL_ENTER_COMMON_GAME, this.free2Common, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
            this.removeEvent();
            egret.clearTimeout(this.showIconTimeOut);
            egret.clearTimeout(this.eachLineTimeOut);
            this.scroller.removeScroller();
            this.resizeGroup.removeChildren();
        };
        /**
         * 进入游戏发送c_enter
         */
        SDXLGameScene1.prototype.startGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp1, data, resp, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                        case 1:
                            resp1 = _a.sent();
                            data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": 1002 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 2:
                            resp = _a.sent();
                            if (resp) {
                                if (resp.error.code != 0) {
                                    text = resp.error.msg;
                                    CF.sN(SceneNotify.CLOSE_SDXL);
                                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                    Global.alertMediator.addAlert(text, function () {
                                    }, "", true);
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                CF.sN(SceneNotify.CLOSE_SDXL);
                                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                            }
                            SoundManager.getInstance().playMusic("sdxl_background_mus_mp3");
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 超时未下注请出房间
         */
        SDXLGameScene1.prototype.kickGame = function () {
            var text = "你已超过5分钟局未下注,请重新进入游戏";
            Global.alertMediator.addAlert(text, function () {
                Global.playerProxy.playerData.gold = game.SDXLUtils.ToTalMoney;
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_SDXL);
            }, "", true);
            return;
        };
        /**
         * 进入游戏初始化玩家信息
         * @param  {egret.Event} e
         */
        SDXLGameScene1.prototype.enterGame = function (e) {
            var resp = e.data;
            game.SDXLUtils.bets = [];
            game.SDXLUtils.muls = [];
            var playerIdnex = resp.playerInfo.playerIndex;
            var players = {};
            for (var key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.SDXLUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            for (var j = 0; j < resp.roomInfo.gamePayTable.muls.length; j++) {
                game.SDXLUtils.muls.push(resp.roomInfo.gamePayTable.muls[j]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.SDXLUtils.FreeTimeMul = [];
                for (var k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.SDXLUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.SDXLUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.SDXLUtils.FreeTimeMul = game.SDXLUtils.FreeTimeMul[game.SDXLUtils.FreeTimeMulIndex];
                game.SDXLUtils.freeTimes = players.freeTimes;
                game.SDXLUtils.freeWin = players.freeWinGold;
            }
            this.ownGold = players.gold;
            this.playerMoney.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = true;
            this.resetBtnColor();
            game.SDXLUtils.ToTalMoney = this.ownGold;
            game.SDXLUtils.bet = game.SDXLUtils.bets[0];
            game.SDXLUtils.mul = game.SDXLUtils.muls[0];
            //判断是否为免费游戏
            if (players.isScatter == 1 && players.freeTimes == 0) {
                game.SDXLUtils.bet = players.lastBet;
                game.SDXLUtils.mul = players.lastMul;
                CF.dP(ENo.SDXL_ENTER_FREE_GAME_SCENE);
            }
            else if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.SDXLUtils.bet = players.lastBet;
                game.SDXLUtils.mul = players.lastMul;
                CF.dP(ENo.SDXL_START_FREE_GAME_SCENE);
            }
            switch ((game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
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
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) + "";
            this.beishu.text = parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 + "") + "";
            this.maxWinLabel.text = "最高可得: " + parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        };
        /**
         * @param  {egret.TouchEvent} e
         */
        SDXLGameScene1.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.muneBtn:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    if (this.menuGroup.visible == false) {
                        this.menuGroup.visible = true;
                    }
                    else {
                        this.menuGroup.visible = false;
                    }
                    break;
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    CF.sN(PanelNotify.OPEN_SDXL_TIPS);
                    break;
                case this.startBtn:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.startBtnTouch();
                    break;
                case this.quitBtn:
                    if (this.scatter == 1)
                        return;
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    if (ServerConfig.OP_RETURN_TYPE == "2") {
                        FrameUtils.goHome();
                        return;
                    }
                    game.releaseSlotRes.currentSlotName = "sdxl";
                    CF.sN(PanelNotify.OPEN_LEAVE_LAOHU_PANEL);
                    break;
                case this.addBet:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.addBets();
                    break;
                case this.subBet:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.reduceBet();
                    break;
                case this.autoGameBtn:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    CF.sN(PanelNotify.OPEN_SDXL_AUTO_PANEL);
                    break;
                case this.maskRect:
                    this.scrollerFastGame();
                    break;
                case this.sdxlSettingBtn:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    CF.sN(PanelNotify.OPEN_SETTING);
                    this.menuGroup.visible = false;
                    break;
                case this.sdxlRecordBtn:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.openGameRecord();
                    this.menuGroup.visible = false;
                    break;
                case this.maxBet:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.setMaxBet();
                    break;
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        };
        /**
         * 开始转动
         */
        SDXLGameScene1.prototype.startBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data1, text, colorMatrix, colorFlilter, data1_1;
                return __generator(this, function (_a) {
                    data1 = Number(new Big(game.SDXLUtils.bet * game.SDXLUtils.mul).mul(50));
                    if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                        text = "金币不足";
                        Global.alertMediator.addAlert(text, function () {
                            _this.resetBtnColor();
                            Global.playerProxy.playerData.gold = _this.ownGold;
                            if (game.LaohuUtils.isAutoGame) {
                                _this.resetStartBtn();
                                _this.startBtn.source = "sdxl_startbtn_png";
                                _this.timesLabel.text = "";
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                game.LaohuUtils.speed = 48;
                                _this.runningType = RUNNING_TYPE.EMPTY;
                            }
                        }, "", true);
                        return [2 /*return*/];
                    }
                    this.isFreeBack = false;
                    this.menuGroup.visible = false;
                    colorMatrix = [
                        0.3, 0.6, 0, 0, 0,
                        0.3, 0.6, 0, 0, 0,
                        0.3, 0.6, 0, 0, 0,
                        0, 0, 0, 1, 0
                    ];
                    colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    if (this.runningType == RUNNING_TYPE.EMPTY) {
                        if (this.scatter == 1)
                            return [2 /*return*/];
                        if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times >= 1) {
                            if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetBtnColor();
                                this.startBtn.source = "sdxl_startbtn_png";
                                this.timesLabel.text = "";
                                game.LaohuUtils.downTime2 = 400;
                                game.LaohuUtils.downTime3 = 800;
                                game.LaohuUtils.downTime4 = 1200;
                                game.LaohuUtils.downTime5 = 1600;
                                game.LaohuUtils.speed = 48;
                                this.runningType = RUNNING_TYPE.EMPTY;
                                SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                                this.resetStartBtn();
                                return [2 /*return*/];
                            }
                            if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                                if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                                    game.LaohuUtils.isAutoGame = false;
                                    game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                    this.resetBtnColor();
                                    this.startBtn.source = "sdxl_startbtn_png";
                                    this.timesLabel.text = "";
                                    game.LaohuUtils.downTime2 = 400;
                                    game.LaohuUtils.downTime3 = 800;
                                    game.LaohuUtils.downTime4 = 1200;
                                    game.LaohuUtils.downTime5 = 1600;
                                    game.LaohuUtils.speed = 48;
                                    this.runningType = RUNNING_TYPE.EMPTY;
                                    SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                                    this.resetStartBtn();
                                    return [2 /*return*/];
                                }
                            }
                            if (game.LaohuUtils.totalWin && game.LaohuUtils.isAutoGame) {
                                if (game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                                    game.LaohuUtils.isAutoGame = false;
                                    game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                    this.resetBtnColor();
                                    this.startBtn.source = "sdxl_startbtn_png";
                                    this.timesLabel.text = "";
                                    game.LaohuUtils.downTime2 = 400;
                                    game.LaohuUtils.downTime3 = 800;
                                    game.LaohuUtils.downTime4 = 1200;
                                    game.LaohuUtils.downTime5 = 1600;
                                    game.LaohuUtils.speed = 48;
                                    this.runningType = RUNNING_TYPE.EMPTY;
                                    SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                                    this.resetStartBtn();
                                    return [2 /*return*/];
                                }
                            }
                            game.UIUtils.removeSelf(this.dbMouseOn);
                            game.LaohuUtils.auto_times -= 1;
                            this.timesLabel.visible = true;
                            this.timesLabel.text = game.LaohuUtils.auto_times + "";
                            game.LaohuUtils.totalBet += game.SDXLUtils.bet * game.SDXLUtils.mul * 50;
                            if (game.LaohuUtils.auto_times > 1000) {
                                this.timesLabel.text = "s";
                            }
                        }
                        else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                            this.timesLabel.visible = false;
                            game.LaohuUtils.isAutoGame = false;
                            this.startBtn.source = "sdxl_startbtn_png";
                            this.resetBtnColor();
                            this.resetStartBtn();
                            return [2 /*return*/];
                        }
                        else if (!game.LaohuUtils.isAutoGame) {
                            this.setStartBtn();
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.dbGameRun.filters = [colorFlilter];
                        }
                        this.winNum.text = 0 + "";
                        this.startBtn.filters = [colorFlilter];
                        this.runningType = RUNNING_TYPE.LOOP;
                        this.removeLastAni();
                        this.scroller.stopIconDb();
                        this.isStopAni = true;
                        this.setBtncolor();
                        this.scroller.run();
                        data1_1 = Number(new Big(game.SDXLUtils.bet * game.SDXLUtils.mul).mul(50));
                        this.ownGold -= NumberFormat.handleFloatDecimal(data1_1);
                        this.playerMoney.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        SoundManager.getInstance().playEffect("sdxl_reel_mp3", true);
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
                    return [2 /*return*/];
                });
            });
        };
        SDXLGameScene1.prototype.startBtnTouch0 = function () {
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
        //移除旋转中奖上次动画
        SDXLGameScene1.prototype.removeLastAni = function () {
            this.setBtncolor();
            // this.setBgColor();
            if (this.winGold > 0) {
                egret.clearTimeout(this.sethuiTimeout);
                for (var i = 1; i <= 5; i++) {
                    this.scroller["item" + i].resetSpecilHui();
                }
            }
            game.UIUtils.removeSelf(this.commomScore);
            this.fastEnd = false;
            this.scroller.stopIconDb();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
            game.UIUtils.removeSelf(this.commomScore);
            game.UIUtils.removeSelf(this.winGoldDiAni);
        };
        /**
         * 非免费游戏更换按钮动画
         */
        SDXLGameScene1.prototype.setStartBtn = function () {
            game.UIUtils.removeSelf(this.dbMouseOn);
            if (!this.dbGameRun) {
                this.dbGameRun = new DBComponent("sdxl_db_run");
                GameCacheManager.instance.setCache("sdxl_db_run", this.dbGameRun);
            }
            this.dbGameRun.horizontalCenter = 17;
            this.dbGameRun.bottom = 35;
            this.dbGameRun.play("", 0);
            if (!this.dbSpinGuang) {
                this.dbSpinGuang = new DBComponent("sdxl_spin_guang");
                GameCacheManager.instance.setCache("sdxl_spin_guang", this.dbSpinGuang);
            }
            this.dbSpinGuang.horizontalCenter = 17;
            this.dbSpinGuang.bottom = 80;
            this.dbSpinGuang.play("", 1);
            this.runGroup.addChild(this.dbGameRun);
            this.dbGameRun.resetPosition();
            this.runGroup.addChild(this.dbSpinGuang);
            this.dbSpinGuang.resetPosition();
            this.dbGameRun.touchEnabled = this.dbSpinGuang.touchEnabled = false;
        };
        /**
         * 正常转动完成spin按钮播放初始动画
         */
        SDXLGameScene1.prototype.resetStartBtn = function () {
            game.UIUtils.removeSelf(this.dbGameRun);
            if (!this.dbMouseOn) {
                this.dbMouseOn = new DBComponent("sdxl_mouseon");
                GameCacheManager.instance.setCache("sdxl_mouseon", this.dbMouseOn);
            }
            this.dbMouseOn.horizontalCenter = 17;
            this.dbMouseOn.bottom = 35;
            this.dbMouseOn.play("", 0);
            this.runGroup.addChild(this.dbMouseOn);
            this.dbMouseOn.resetPosition();
            this.dbMouseOn.touchEnabled = false;
        };
        /**
         * 游戏开始按钮置灰
         */
        SDXLGameScene1.prototype.setBtncolor = function () {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.muneBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addBet.filters = this.subBet.filters = this.maxBet.filters = [colorFlilter];
            this.quitBtn.touchEnabled = this.muneBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addBet.touchEnabled = this.subBet.touchEnabled = this.maxBet.touchEnabled = false;
        };
        /**
         * 转动完成按钮变成原来颜色
         */
        SDXLGameScene1.prototype.resetBtnColor = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.muneBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addBet.filters = this.subBet.filters = this.maxBet.filters = [colorFlilter];
            this.quitBtn.touchEnabled = this.muneBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addBet.touchEnabled = this.subBet.touchEnabled = this.maxBet.touchEnabled = true;
        };
        /**
         * 开始自动游戏
         */
        SDXLGameScene1.prototype.startAutoGame = function () {
            if (game.SDXLUtils.bet * game.SDXLUtils.mul * 50 > this.ownGold) {
                this.isFreeBack = false;
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            this.startBtn.source = "sdxl_stop_png";
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
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
         * c_bet消息收发
         */
        SDXLGameScene1.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, colorMatrix, colorFlilter, resp1, i, i, j, aaa, str_lingshi, temp, temp2, arr, k, scatternum, i, j, i, j;
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
                                    data2 = { "spinType": this.spinTest, "bet": game.SDXLUtils.bet, "multiple": game.SDXLUtils.mul, "lineCount": 243, "activityId": 0, "freeWheel": this.wheel };
                                }
                                else {
                                    data2 = { "spinType": this.spinTest, "bet": game.SDXLUtils.bet, "multiple": game.SDXLUtils.mul, "lineCount": 243, "activityId": 0, "wheel": this.wheel };
                                }
                            }
                            else {
                                data2 = { "spinType": 0, "bet": game.SDXLUtils.bet, "multiple": game.SDXLUtils.mul, "lineCount": 243, "activityId": 0 };
                            }
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_SDXL);
                                SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                                return [2 /*return*/];
                            }
                            colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            this.startBtn.filters = [colorFlilter];
                            if (!game.LaohuUtils.isAutoGame)
                                this.dbGameRun.filters = [colorFlilter];
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
                                this.lineTime = 2000;
                            }
                            else {
                                this.lineTime = 1000;
                            }
                            game.SDXLUtils.ToTalMoney = resp2.own_gold;
                            // this.ownGold -= game.SDXLUtils.bet * game.SDXLUtils.mul * 50;
                            game.SDXLUtils.ToTalMoney = this.ownGold;
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
                            if (game.LaohuUtils.isAutoGame && game.LaohuUtils.totalWin) {
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
                                        // this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fastGame, this);
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
         * 快速结束转动
         */
        SDXLGameScene1.prototype.fastGame = function () {
            var _this = this;
            if (this.scatterIcon >= 2) {
                this.fastEnd = true;
                egret.clearTimeout(this.scatter4timeout);
                egret.clearTimeout(this.scatter5timeout);
                SoundManager.getInstance().stopEffectByName("reel_fast_spin_none_mp3");
                SoundManager.getInstance().stopEffectByName("reel_fast_spin_win_mp3");
                this.scroller.removeScatterAni();
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                this.startBtn.source = "sdxl_startbtn_png";
                this.scroller.runResultFast();
                for (var i = 1; i <= 4; i++) {
                    this.scroller["item" + i].resetSpecilHui();
                }
            }
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.speed = 48;
                egret.clearTimeout(this.autoGameTimeout);
                if (this.scatter != 1)
                    this.resetBtnColor();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.auto_times = 0;
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.startBtn.source = "sdxl_startbtn_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.btnStopAni.play("", 1);
                this.runGroup.addChild(this.btnStopAni);
                this.btnStopAni.resetPosition();
                this.btnStopAni.callback = function () {
                    game.UIUtils.removeSelf(_this.btnStopAni);
                };
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            else {
                this.startBtn.source = "sdxl_startbtn_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }
                SoundManager.getInstance().stopEffectByName("sdxl_reel_fast_spin_none_mp3");
                SoundManager.getInstance().stopEffectByName("sdxl_reel_fast_spin_win_mp3");
            }
        };
        /**
         * 点击转轴区域快速停止游戏
         */
        SDXLGameScene1.prototype.scrollerFastGame = function () {
            if (this.runningType == RUNNING_TYPE.RESULT) {
                if (this.scatterIcon >= 2) {
                    if (this.scatterIcon >= 2) {
                        this.fastEnd = true;
                        egret.clearTimeout(this.scatter4timeout);
                        egret.clearTimeout(this.scatter5timeout);
                        this.scroller.removeScatterAni();
                        this.scroller.item4.speed = 48;
                        this.scroller.item5.speed = 48;
                        for (var i = 1; i <= 4; i++) {
                            this.scroller["item" + i].resetSpecilHui();
                        }
                        // this.scroller.runResultFast();
                    }
                }
                // this.setBgColor();
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("sdxl_reel_fast_spin_none_mp3");
                SoundManager.getInstance().stopEffectByName("sdxl_reel_fast_spin_win_mp3");
            }
        };
        /**
         * @param  {egret.Event} e
         * 每个转轴转动结束
         */
        SDXLGameScene1.prototype.scrollerEnd = function (e) {
            var _this = this;
            var data = e.data;
            if (data.sceneIndex != 1) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                        if (this.winGold >= game.LaohuUtils.oneMax) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                            this.resetBtnColor();
                            this.startBtn.source = "sdxl_startbtn_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                            this.resetStartBtn();
                        }
                    }
                    this.scroller.removeIconHui(this.HuiAtr);
                    this.playerMoney.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                    SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                    if (this.showAtr) {
                        if (this.showAtr.length != 0) {
                            for (var i = 0; i < this.showAtr[4].length; i++) {
                                //判断第5列上是否有scatter
                                if (this.showAtr[4][i] == 2) {
                                    for (var j = 0; j < 3; j++) {
                                        if (this.showAtr[2][j] == 2) {
                                            for (var k = 0; k < 3; k++) {
                                                if (this.showAtr[0][k] == 2) {
                                                    SoundManager.getInstance().playEffect("sdxl_scat_dntg_mp3");
                                                    this.scroller.addFoGuang1(5, i, "sdxl_icon1_di");
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                                }
                            }
                        }
                        this.winNum.text = this.winGold + "";
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
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, 2000);
                            }
                            else {
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, 1000);
                            }
                        }
                        else {
                            if (this.scatter != 1 && !game.LaohuUtils.isAutoGame)
                                this.resetBtnColor();
                            this.resetStartBtn();
                            egret.setTimeout(function () {
                                LogUtils.logD("empty5");
                                if (_this.scatter != 1)
                                    _this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                        }
                        this.checkBonusIcon();
                    }
                    break;
                case 3:
                    //判断玉帝数量，是否添加scatter特效
                    if (this.showAtr) {
                        for (var i = 0; i < this.showAtr[2].length; i++) {
                            //判断第三列上是否有scatter
                            if (this.showAtr[2][i] == 2) {
                                for (var j = 0; j < 3; j++) {
                                    if (this.showAtr[0][j] == 2) {
                                        SoundManager.getInstance().playEffect("sdxl_scat_dntg_mp3");
                                        this.scroller.addFoGuang1(3, i, "sdxl_icon1_di");
                                    }
                                }
                            }
                            else {
                                SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                            }
                        }
                        //是否可能中scatter，4,5列加速
                        if (this.scatterIcon >= 2 && !this.isFastGame) {
                            var atr = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
                            this.scroller.setSpecilHui(atr);
                            // this.setBGHui();
                            if (this.fastEnd)
                                return;
                            // this.scroller.item4.runModel = RUN_MODEL.LOOP
                            // this.scroller.item5.runModel = RUN_MODEL.LOOP
                            this.scroller.item4.clearDownTimeOut();
                            this.scroller.item5.clearDownTimeOut();
                            this.scroller.item4.speed = 85;
                            this.scroller.item5.speed = 85;
                            // this.scroller.speed = 64;		
                            this.scroller.addScatterAni(4);
                            this.scroller.speed = 85;
                            var item4_1 = this.scroller["item" + 4];
                            var item5_1 = this.scroller["item" + 5];
                            SoundManager.getInstance().playEffect("sdxl_reel_fast_spin_none_mp3");
                            if (!Global.runBack) {
                                this.scatter4timeout = egret.setTimeout(function () {
                                    item4_1.changeResult(_this.showAtr[3]);
                                    _this.scroller.removeScatterAni(4);
                                    _this.scroller.addScatterAni(5);
                                    _this.scroller.setSpecilHui([[], [], [], [0, 1, 2], []]);
                                    if (_this.scatter != 1) {
                                        SoundManager.getInstance().playEffect("sdxl_reel_fast_spin_none_mp3");
                                    }
                                    else {
                                        SoundManager.getInstance().playEffect("sdxl_reel_fast_spin_win_mp3");
                                    }
                                }, this, 2500);
                                this.scatter5timeout = egret.setTimeout(function () {
                                    item5_1.changeResult(_this.showAtr[4]);
                                    _this.scroller.removeScatterAni(5);
                                    if (_this.scatter != 1) {
                                        SoundManager.getInstance().stopEffectByName("sdxl_reel_fast_spin_none_mp3");
                                    }
                                    else {
                                        SoundManager.getInstance().stopEffectByName("sdxl_reel_fast_spin_win_mp3");
                                    }
                                    egret.clearTimeout(_this.autoGameTimeout);
                                    _this.scroller.removeIconHui(_this.HuiAtr);
                                    // this.setBgColor();
                                }, this, 5000);
                            }
                        }
                    }
                    break;
                case 1:
                    if (this.showAtr) {
                        for (var i = 0; i < this.showAtr[0].length; i++) {
                            //判断第1列上是否有scatter
                            if (this.showAtr[0][i] == 2) {
                                SoundManager.getInstance().playEffect("sdxl_scat_dntg_mp3");
                                this.scroller.addFoGuang1(1, i, "sdxl_icon1_di");
                            }
                            else {
                                SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                            }
                        }
                    }
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                    break;
            }
        };
        /**
         * 转动完成开始展示奖励
         */
        SDXLGameScene1.prototype.checkBonusIcon = function () {
            var _this = this;
            //是否满足bigwin条件
            if (this.winGold >= (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) * 15) {
                // this.setBGHui();
                egret.clearTimeout(this.autoGameTimeout);
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
                                }, _this, 2000);
                            }
                            if (!game.LaohuUtils.isAutoGame) {
                                _this.runningType = RUNNING_TYPE.EMPTY;
                            }
                            if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame)
                                _this.muneBtn.touchEnabled = _this.maxBet.touchEnabled = _this.addBet.touchEnabled = _this.subBet.touchEnabled = _this.autoGameBtn.touchEnabled = _this.tipsBtn.touchEnabled = _this.quitBtn.touchEnabled = true;
                            if (_this.scatter == 1)
                                _this.addEachLineAni();
                            if (_this.scatter != 1) {
                                _this.scroller.setIconHui();
                                _this.scroller.removeIconHui(_this.allAtr);
                                _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                                if (!game.LaohuUtils.isAutoGame) {
                                    _this.eachLineTimeOut = egret.setTimeout(function () {
                                        _this.addEachLineAni();
                                    }, _this, 1710);
                                    if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                        _this.askAutoGame();
                                    }
                                    ;
                                }
                            }
                        });
                    };
                    this.bigWinPanel = new sdxl.SDXLBigWinGroup();
                    this.bigWinPanel.showPanel();
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
                        if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                            _this.autoGameTimeout = egret.setTimeout(function () {
                                _this.startBtnTouch();
                            }, _this, 1500);
                        }
                        if (_this.scatter != 1) {
                            _this.startBtn.touchEnabled = true;
                            _this.scroller.stopIconDb();
                            _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                        }
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        if (!game.LaohuUtils.isAutoGame) {
                            _this.runningType = RUNNING_TYPE.EMPTY;
                            if (_this.scatter != 1) {
                                _this.muneBtn.touchEnabled = _this.maxBet.touchEnabled = _this.addBet.touchEnabled = _this.subBet.touchEnabled = _this.autoGameBtn.touchEnabled = _this.tipsBtn.touchEnabled = _this.quitBtn.touchEnabled = true;
                            }
                            if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                _this.askAutoGame();
                            }
                            ;
                        }
                        if (_this.scatter == 1)
                            _this.addEachLineAni();
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                } //bigwin后中免费游戏 
                else {
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        this.quitBtn.touchEnabled = false;
                        this.scroller.addFoGuang(1, this.yudiAtr[0], "sdxl_icon_2");
                        this.scroller.addFoGuang(3, this.yudiAtr[1], "sdxl_icon_2");
                        this.scroller.addFoGuang(5, this.yudiAtr[2], "sdxl_icon_2");
                        CF.dP(ENo.SDXL_ENTER_FREE_GAME_SCENE, { isfast: this.isFastGame });
                        // this.resetBtnColor();
                        if (!game.LaohuUtils.isAutoGame)
                            this.resetStartBtn();
                    }
                }
            } //未中bigwin 
            else {
                //中奖
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    // this.setBGHui();
                    SoundManager.getInstance().playEffect("sdxl_win_dntg_mp3");
                    if (this.scatter == 1)
                        this.runningType = RUNNING_TYPE.STOP;
                    this.scroller.setIconHui();
                    this.scroller.removeIconHui(this.allAtr);
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    this.commomScore.font = "sdxl_wingold_fnt";
                    var data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.commomScore.textAlign = "center";
                    this.commomScore.verticalCenter = 0;
                    this.commomScore.horizontalCenter = 0;
                    this.winGoldDiAni.play("", 1);
                    this.sethuiTimeout = egret.setTimeout(function () { _this.scroller.setIconHui(); }, this, 1700);
                    this.scroller.addChild(this.winGoldDiAni);
                    this.winGoldDiAni.resetPosition();
                    this.scroller.addChild(this.commomScore);
                    if (!Global.runBack) {
                        this.removeScoreTimeout = egret.setTimeout(function () {
                            game.UIUtils.removeSelf(_this.commomScore);
                            game.UIUtils.removeSelf(_this.winGoldDiAni);
                            _this.addEachLineAni();
                        }, this, 2500);
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            this.askAutoGame();
                        }
                    }
                }
                else {
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        this.quitBtn.touchEnabled = false;
                        this.scroller.addFoGuang(1, this.yudiAtr[0], "sdxl_icon_2");
                        this.scroller.addFoGuang(3, this.yudiAtr[1], "sdxl_icon_2");
                        this.scroller.addFoGuang(5, this.yudiAtr[2], "sdxl_icon_2");
                        egret.setTimeout(function () {
                            CF.dP(ENo.SDXL_ENTER_FREE_GAME_SCENE, { isfast: _this.isFastGame });
                            // if (!game.LaohuUtils.isAutoGame) this.resetBtnColor();
                        }, this, 2700);
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
         * 中奖图标播放每条连线
         */
        SDXLGameScene1.prototype.addEachLineAni = function () {
            var _this = this;
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) {
                    this.quitBtn.touchEnabled = false;
                    this.resetStartBtn();
                }
                var count_1 = 0;
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, function (index, callback) {
                    if (_this.isStopAni)
                        return;
                    game.UIUtils.removeSelf(_this.commomScore);
                    _this.scroller.setSpecilHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                    for (var j = 0; j < index.length; j++) {
                        var k = j + 1;
                        _this.scroller["item" + k].resetIconHui(index[j]);
                        _this.scroller["item" + k].showAni(index[j]);
                        // this.commomScore = new eui.BitmapLabel();
                        _this.commomScore.font = "sdxl_wingold_fnt";
                        var data = Number(new Big(_this.eachLineScore[count_1]).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        _this.commomScore.verticalCenter = ((index[2] - 1)) * 184;
                        _this.commomScore.horizontalCenter = 0;
                        _this.commomScore.textAlign = "center";
                        _this.commomScore.scaleX = 0.8;
                        _this.commomScore.scaleY = 0.8;
                        _this.scroller.addChild(_this.commomScore);
                    }
                    if (_this.bonusAtr.length == 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                _this.scroller.setIconHui();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 1710);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2210);
                    }
                    if (_this.bonusAtr.length > 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                _this.scroller.setIconHui();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 1710);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2210);
                    }
                    count_1++;
                }, function () {
                    //callback 判断结果是否为scatter
                    if (_this.scatter == 1) {
                        game.UIUtils.removeSelf(_this.commomScore);
                        // this.startBtn.touchEnabled = false;
                        _this.quitBtn.touchEnabled = false;
                        _this.runningType = RUNNING_TYPE.STOP;
                        _this.scroller.removeIconHui(_this.HuiAtr);
                        _this.scroller.addFoGuang(1, _this.yudiAtr[0], "sdxl_icon_2");
                        _this.scroller.addFoGuang(3, _this.yudiAtr[1], "sdxl_icon_2");
                        _this.scroller.addFoGuang(5, _this.yudiAtr[2], "sdxl_icon_2");
                        egret.setTimeout(function () {
                            CF.dP(ENo.SDXL_ENTER_FREE_GAME_SCENE, { isfast: _this.isFastGame });
                        }, _this, 2700);
                        // this.resetBtnColor();
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
         * 免费游戏结束后回到正常游戏
         */
        SDXLGameScene1.prototype.free2Common = function () {
            var _this = this;
            this.scatter = 0;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            this.playerMoney.text = NumberFormat.handleFloatDecimal(game.SDXLUtils.ToTalMoney) + "";
            this.ownGold = game.SDXLUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.SDXLUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.LaohuUtils.freeWin = 0;
            this.resetBtnColor();
            if (this["quitBtn"]) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this["quitBtn"].visible = true;
                    ;
                }
            }
            SoundManager.getInstance().playMusic("sdxl_background_mus_mp3");
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.startBtn.source = "sdxl_startbtn_png";
                this.timesLabel.text = "";
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.resetStartBtn();
                this.resetBtnColor();
            }
            if (game.LaohuUtils.oneMax && game.SDXLUtils.freeWin >= game.LaohuUtils.oneMax) {
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
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "sdxl_startbtn_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetBtnColor();
            }
            if (game.LaohuUtils.totalWin && game.LaohuUtils.isAutoGame) {
                if (game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.resetBtnColor();
                    this.startBtn.source = "sdxl_startbtn_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.resetBtnColor();
                    this.startBtn.source = "sdxl_startbtn_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            if (game.LaohuUtils.isAutoGame) {
                game.UIUtils.removeSelf(this.dbMouseOn);
                egret.setTimeout(function () { _this.isFreeBack = true; _this.startAutoGame(); }, this, 1000);
            }
        };
        /**
         * 打开游戏记录
         */
        SDXLGameScene1.prototype.openGameRecord = function () {
            // let record: dntg.DNTGGameRecordPanel = new DNTGGameRecordPanel();
            CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
        };
        /**
         * 增加倍数
         */
        SDXLGameScene1.prototype.addBets = function () {
            var _this = this;
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                SoundManager.getInstance().playEffect("button_dntg_mp3");
                switch (this.bet) {
                    case 1:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[0];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[0];
                        break;
                    case 2:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[0];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[1];
                        break;
                    case 3:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[0];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[3];
                        break;
                    case 4:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[0];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[9];
                        break;
                    case 5:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[1];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[9];
                        break;
                    case 6:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[2];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[5];
                        break;
                    case 7:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[3];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[5];
                        break;
                    case 8:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[3];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[9];
                        break;
                    case 9:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[4];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[6];
                        break;
                    case 10:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[4];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[9];
                        break;
                }
            }
            this.beishu.text = parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) + "";
            this.betTtipsGroup.visible = true;
            this.maxWinLabel.text = "最高可得: " + parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
            var data1 = Number(new Big(game.SDXLUtils.bet * game.SDXLUtils.mul).mul(50));
            if ((NumberFormat.handleFloatDecimal(data1)) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.reduceBet();
            }
        };
        /**
         * 减少倍数
         */
        SDXLGameScene1.prototype.reduceBet = function () {
            var _this = this;
            if (this.bet <= 1) {
                return;
            }
            else {
                game.LaohuUtils.totalWin = 0;
                SoundManager.getInstance().playEffect("button_dntg_mp3");
                this.bet -= 1;
                switch (this.bet) {
                    case 1:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[0];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[0];
                        break;
                    case 2:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[0];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[1];
                        break;
                    case 3:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[0];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[3];
                        break;
                    case 4:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[0];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[9];
                        break;
                    case 5:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[1];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[9];
                        break;
                    case 6:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[2];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[5];
                        break;
                    case 7:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[3];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[5];
                        break;
                    case 8:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[3];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[9];
                        break;
                    case 9:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[4];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[6];
                        break;
                    case 10:
                        game.SDXLUtils.bet = game.SDXLUtils.bets[4];
                        game.SDXLUtils.mul = game.SDXLUtils.muls[9];
                        break;
                }
            }
            this.beishu.text = parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) + "";
            this.betTtipsGroup.visible = true;
            this.maxWinLabel.text = "最高可得: " + parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
        };
        /**
         * 最大倍数
         */
        SDXLGameScene1.prototype.setMaxBet = function () {
            var _this = this;
            var bet = game.SDXLUtils.bets[4];
            var mul = game.SDXLUtils.muls[9];
            var data1 = Number(new Big(bet * mul).mul(50));
            if ((NumberFormat.handleFloatDecimal(data1)) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.SDXLUtils.bet = game.SDXLUtils.bets[4];
            game.SDXLUtils.mul = game.SDXLUtils.muls[9];
            this.betTtipsGroup.visible = true;
            this.maxWinLabel.text = "最高可得: " + parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(game.SDXLUtils.bet * game.SDXLUtils.mul * 50) + "";
            this.bet = 10;
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
            this.beishu.text = parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 + "") + "";
        };
        SDXLGameScene1.prototype.askAutoGame = function () {
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
        return SDXLGameScene1;
    }(game.BaseScene));
    sdxl.SDXLGameScene1 = SDXLGameScene1;
    __reflect(SDXLGameScene1.prototype, "sdxl.SDXLGameScene1");
})(sdxl || (sdxl = {}));
