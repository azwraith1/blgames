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
 * @Date: 2019-03-27 13:58:06
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-11-26 17:39:20
 * @Description:
 */
var dntg;
(function (dntg) {
    var DNTGScene1 = (function (_super) {
        __extends(DNTGScene1, _super);
        function DNTGScene1() {
            var _this = _super.call(this) || this;
            _this.commomScore = new eui.BitmapLabel();
            _this.bet = 1; //用于计数bet
            _this.ownGold = 0; //玩家拥有的金钱
            // public winnerAtr: Array<Array<number>>; //
            //开始旋转
            _this.runningType = 3;
            _this.isTest = false;
            _this.spinTest = 0;
            _this.winGold = 0; //每次赢得的金币
            _this.scatterIcon = 0; //玉帝图标的数量
            _this.scatter = 0; //是否中免费游戏
            _this.clickTime = 0;
            _this.isFastGame = false;
            _this.fastEnd = false; // 快速结束条件 true/false
            _this.isInScatter = false; //是否是scatter播放判断条件 true/false
            _this.toFreeAni = new dragonBones.EgretArmatureDisplay(); //进入免费游戏的猴子动画
            _this.isStopAni = false;
            _this.skinName = new DNTGGameScene1Skin();
            return _this;
        }
        ;
        DNTGScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            if (game.LaohuUtils.isAutoGame) {
                this.resetBtnColor();
                game.LaohuUtils.isAutoGame = false;
            }
            egret.clearTimeout(this.autogameTimeout);
            egret.clearTimeout(this.messageTimeOut);
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.showIconTimeOut);
            // CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            CF.rE(ENo.DNTG_ENTER_COMMON_GAME, this.free2Common, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
            egret.clearTimeout(this.showIconTimeOut);
            this.removeEvent();
            this.scroller.removeScroller();
            this.resizeGroup.removeChildren();
        };
        DNTGScene1.prototype.eventResize = function () {
            _super.prototype.eventResize.call(this);
            // this.scroller.y = GameConfig.CURRENT_HEIGHT / 2 - this.scroller.height / 2;
        };
        DNTGScene1.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            SoundManager.getInstance().playMusic("background_mus_dntg_mp3");
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
            // CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.DNTG_ENTER_COMMON_GAME, this.free2Common, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
        };
        DNTGScene1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = false;
            this.setBtnColor();
            game.LaohuUtils.scoreguang = DBComponent.create("dntg_scoreguang", "dntg_bigwin_guang");
            game.LaohuUtils.titaleChangeAni = DBComponent.create("dntg_titaleChangeAni", "win_change");
            // game.LaohuUtils.scoreguang = new DBComponent("dntg_bigwin_guang");
            // game.LaohuUtils.titaleChangeAni = new DBComponent("win_change");
            this.startGame();
            this.scroller.showFirst(1);
            var isPC = NativeApi.instance.IsPC();
            //判断是否为pc端
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            //进入游戏判断是否为测试账号
            if (Global.playerProxy.playerData.nickname == "test004" || Global.playerProxy.playerData.nickname == "test001" || Global.playerProxy.playerData.nickname == "test002" || Global.playerProxy.playerData.nickname == "test003" || Global.playerProxy.playerData.nickname == "test005" || Global.playerProxy.playerData.nickname == "test006" || Global.playerProxy.playerData.nickname == "test007" || Global.playerProxy.playerData.nickname == "test008" || Global.playerProxy.playerData.nickname == "test009" || Global.playerProxy.playerData.nickname == "test010") {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.QA_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.testGroup.visible = true;
                }
            }
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this.back2HallBtn.visible = false;
            }
            //添加按钮动画
            this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
            if (!this.mouseOn) {
                this.mouseOn = new DBComponent("onmouseon");
                GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
            }
            this.mouseOn.touchEnabled = false;
            this.mouseOn.touchChildren = false;
            this.mouseOn.play("onmouseon", 0);
            this.mouseOn.x = 76.5;
            this.mouseOn.y = 69;
            this.runGroup.addChild(this.mouseOn);
        };
        /**
         * 鼠标悬浮事件
         */
        DNTGScene1.prototype.addMouseOnEvent = function () {
            this.menuBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.menuBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.settingBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.settingBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.betAddBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.betAddBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.betSubBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.betSubBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.yazhu_ima.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.yazhu_ima.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoRunBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoRunBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.gameRecord.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.gameRecord.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this.back2HallBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this.back2HallBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        };
        DNTGScene1.prototype.removeEvent = function () {
            this.menuBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.menuBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.settingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.settingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.betAddBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.betAddBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.betSubBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.betSubBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.yazhu_ima.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.yazhu_ima.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoRunBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoRunBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.gameRecord.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.gameRecord.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this.back2HallBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this.back2HallBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        };
        DNTGScene1.prototype.changeMenuBtn = function () {
            this.menuBtn.currentState = "down";
        };
        DNTGScene1.prototype.changeMenuBtn2 = function () {
            this.menuBtn.currentState = "up";
        };
        DNTGScene1.prototype.changesettingBtn = function () {
            this.settingBtn.currentState = "down";
        };
        DNTGScene1.prototype.changesettingBtn2 = function () {
            this.settingBtn.currentState = "up";
        };
        DNTGScene1.prototype.changetipsBtn = function () {
            this.tipsBtn.currentState = "down";
        };
        DNTGScene1.prototype.changetipsBtn2 = function () {
            this.tipsBtn.currentState = "up";
        };
        DNTGScene1.prototype.changeBetAddBtn = function () {
            this.betAddBtn.currentState = "down";
            this.betTtipsGroup.visible = true;
        };
        DNTGScene1.prototype.changeBetAddBtn2 = function () {
            var _this = this;
            this.betAddBtn.currentState = "up";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
        };
        DNTGScene1.prototype.changeBetSubBtn = function () {
            this.betSubBtn.currentState = "down";
            this.betTtipsGroup.visible = true;
        };
        DNTGScene1.prototype.changeBetSubBtn2 = function () {
            var _this = this;
            this.betSubBtn.currentState = "up";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
        };
        DNTGScene1.prototype.changeyazhuBtn = function () {
            this.yazhu_ima.source = RES.getRes("dntg_scene1_bet2_png");
        };
        DNTGScene1.prototype.changeyazhuBtn2 = function () {
            this.yazhu_ima.source = RES.getRes("dntg_scene1_bet1_png");
        };
        DNTGScene1.prototype.changeAutoRunBtn = function () {
            this.autoRunBtn.currentState = "down";
        };
        DNTGScene1.prototype.changeAutoRunBtn2 = function () {
            this.autoRunBtn.currentState = "up";
        };
        DNTGScene1.prototype.changeGameRecord = function () {
            this.gameRecord.currentState = "down";
        };
        DNTGScene1.prototype.changeGameRecord2 = function () {
            this.gameRecord.currentState = "up";
        };
        DNTGScene1.prototype.changeOutBtn = function () {
            this.back2HallBtn.currentState = "donw";
        };
        DNTGScene1.prototype.changeOutBtn2 = function () {
            this.back2HallBtn.currentState = "up";
        };
        /**
         * @param  {egret.TouchEvent} e
         * 点击事件
         */
        DNTGScene1.prototype.onTouchTap = function (e) {
            switch (e.target) {
                //开始游戏按钮
                case this.startBtn:
                    this.startBtnTouch();
                    break;
                //菜单按钮
                case this.menuBtn:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    if (this.menuGroup.visible == false) {
                        this.menuGroup.visible = true;
                    }
                    else {
                        this.menuGroup.visible = false;
                    }
                    break;
                //设置按钮
                case this.settingBtn:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    CF.sN(PanelNotify.OPEN_SETTING);
                    this.menuGroup.visible = false;
                    break;
                //tips窗口按钮
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    CF.sN(PanelNotify.OPEN_LAOHUGAME_TIPS);
                    this.menuGroup.visible = false;
                    break;
                //加注按钮
                case this.betAddBtn:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    this.addBet();
                    break;
                //减注按钮
                case this.betSubBtn:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    this.reduceBet();
                    break;
                //最大倍数按钮
                case this.yazhu_ima:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    this.maxBet();
                    break;
                //自动游戏按钮
                case this.autoRunBtn:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    this.menuGroup.visible = false;
                    this.openAutoGame();
                    break;
                //游戏记录
                case this.gameRecord:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    this.openGameRecord();
                    this.menuGroup.visible = false;
                    break;
                //返回大厅
                case this.back2HallBtn:
                    SoundManager.getInstance().playEffect("button_dntg_mp3");
                    this.backtoHall();
                    this.menuGroup.visible = false;
                    break;
                //scroller快速停止
                case this.maskRect:
                    this.scrollerFastGame();
                    break;
                //测试按钮
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        };
        /**
         * 超时未下注请出房间
         */
        DNTGScene1.prototype.kickGame = function () {
            var text = "你已超过5分钟局未下注,请重新进入游戏";
            Global.alertMediator.addAlert(text, function () {
                Global.playerProxy.playerData.gold = game.LaohuUtils.ToTalMoney;
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_DNTG);
                CF.sN(PanelNotify.CLOSE_LAOHU_AUTO_PANEL);
                CF.sN(PanelNotify.CLOSE_LAOHUGAME_TIPS);
                CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            }, "", true);
            return;
        };
        //进入游戏发送c_enter请求
        DNTGScene1.prototype.startGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, resp, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": 1001 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp) {
                                if (resp.error.code != 0) {
                                    CF.sN(SceneNotify.CLOSE_DNTG);
                                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                    text = resp.error.msg;
                                    Global.alertMediator.addAlert(text, function () {
                                    }, "", true);
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                CF.sN(SceneNotify.CLOSE_DNTG);
                                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        //进入游戏接收处理
        /**
         * @param  {egret.Event} e
         */
        DNTGScene1.prototype.enterGame = function (e) {
            var resp = e.data;
            var playerIdnex = resp.playerInfo.playerIndex;
            var players = {};
            game.LaohuUtils.bets = [];
            game.LaohuUtils.muls = [];
            for (var key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.LaohuUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            for (var j = 0; j < resp.roomInfo.gamePayTable.muls.length; j++) {
                game.LaohuUtils.muls.push(resp.roomInfo.gamePayTable.muls[j]);
            }
            //gamepayTable非空判断
            if (resp.roomInfo.gamePayTable) {
                game.LaohuUtils.FreeTimeMul = [];
                for (var k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.LaohuUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.LaohuUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.LaohuUtils.FreeTimeMul = game.LaohuUtils.FreeTimeMul[game.LaohuUtils.FreeTimeMulIndex];
                game.LaohuUtils.freeTimes = players.freeTimes;
                this.ownGold = players.gold;
            }
            this.numAccisiable.text = NumberFormat.handleFloatDecimal(players.gold) + "";
            this.ownGold = players.gold;
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
            //本地存储玩家信息
            game.LaohuUtils.ToTalMoney = this.ownGold;
            game.LaohuUtils.bet = game.LaohuUtils.bets[0];
            game.LaohuUtils.mul = game.LaohuUtils.muls[0];
            //判断是否为免费游戏
            if (players.isScatter == 1 && players.freeTimes == 0) {
                game.LaohuUtils.bet = players.lastBet;
                game.LaohuUtils.mul = players.lastMul;
                CF.dP(ENo.DNTG_ENTER_FREE_GAME);
            }
            else if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.bet = players.lastBet;
                game.LaohuUtils.mul = players.lastMul;
                CF.dP(ENo.DNTG_START_FREE_GAME);
            }
            switch ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) {
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
            this.totalBetLabel.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) + "";
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.maxWinLabel.text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        };
        /**
         * 点击开始游戏按钮
         */
        DNTGScene1.prototype.startBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data1, text, data;
                return __generator(this, function (_a) {
                    if (this.runningType == RUNNING_TYPE.EMPTY) {
                        this.menuGroup.visible = false;
                        data1 = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
                        if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                            text = "金币不足";
                            Global.alertMediator.addAlert(text, function () {
                                _this.startBtn.currentState = "up";
                                _this.resetBtnColor();
                                if (!_this.mouseOn) {
                                    _this.mouseOn = new DBComponent("onmouseon");
                                    GameCacheManager.instance.setCache("onmouseon", _this.mouseOn);
                                }
                                _this.mouseOn.touchEnabled = false;
                                _this.mouseOn.touchChildren = false;
                                _this.mouseOn.play("onmouseon", 0);
                                _this.mouseOn.x = 76.5;
                                _this.mouseOn.y = 69;
                                _this.runGroup.addChild(_this.mouseOn);
                            }, "", true);
                            return [2 /*return*/];
                        }
                        //自动游戏条件判断
                        if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                            this.resetBtnColor();
                            this.startBtn.currentState = "up";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                            if (!this.mouseOn) {
                                this.mouseOn = new DBComponent("onmouseon");
                                GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                            }
                            this.mouseOn.touchEnabled = false;
                            this.mouseOn.touchChildren = false;
                            this.mouseOn.play("onmouseon", 0);
                            this.mouseOn.x = 76.5;
                            this.mouseOn.y = 69;
                            this.runGroup.addChild(this.mouseOn);
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
                            return [2 /*return*/];
                        }
                        if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                            if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                                game.LaohuUtils.isAutoGame = false;
                                this.resetBtnColor();
                                this.startBtn.currentState = "up";
                                this.timesLabel.text = "";
                                game.LaohuUtils.downTime2 = 400;
                                game.LaohuUtils.downTime3 = 800;
                                game.LaohuUtils.downTime4 = 1200;
                                game.LaohuUtils.downTime5 = 1600;
                                game.LaohuUtils.speed = 48;
                                this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                                if (!this.mouseOn) {
                                    this.mouseOn = new DBComponent("onmouseon");
                                    GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                                }
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.mouseOn.touchEnabled = false;
                                this.mouseOn.touchChildren = false;
                                this.mouseOn.play("onmouseon", 0);
                                this.mouseOn.x = 76.5;
                                this.mouseOn.y = 69;
                                this.runGroup.addChild(this.mouseOn);
                                this.runningType = RUNNING_TYPE.EMPTY;
                                SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
                                return [2 /*return*/];
                            }
                        }
                        if (game.LaohuUtils.totalWin && game.LaohuUtils.isAutoGame) {
                            if (game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetBtnColor();
                                this.startBtn.currentState = "up";
                                this.timesLabel.text = "";
                                game.LaohuUtils.downTime2 = 400;
                                game.LaohuUtils.downTime3 = 800;
                                game.LaohuUtils.downTime4 = 1200;
                                game.LaohuUtils.downTime5 = 1600;
                                game.LaohuUtils.speed = 48;
                                this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                                if (!this.mouseOn) {
                                    this.mouseOn = new DBComponent("onmouseon");
                                    GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                                }
                                this.mouseOn.touchEnabled = false;
                                this.mouseOn.touchChildren = false;
                                this.mouseOn.play("onmouseon", 0);
                                this.mouseOn.x = 76.5;
                                this.mouseOn.y = 69;
                                this.runGroup.addChild(this.mouseOn);
                                this.runningType = RUNNING_TYPE.EMPTY;
                                SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
                                return [2 /*return*/];
                            }
                        }
                        this.isTest = false;
                        this.spinTest = 0;
                        this.setBtnColor();
                        SoundManager.getInstance().playEffect("reel_dntg_mp3");
                        this.runningType = RUNNING_TYPE.LOOP;
                        this.removeLastAni();
                        this.scroller.stopIconDb();
                        SoundManager.getInstance().playEffect("button_dntg_mp3");
                        this.isStopAni = true;
                        if (game.LaohuUtils.isAutoGame) {
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
                            if (this.commomScore) {
                                game.UIUtils.removeSelf(this.commomScore);
                            }
                            game.LaohuUtils.auto_times -= 1;
                            game.LaohuUtils.totalBet += game.LaohuUtils.bet * game.LaohuUtils.mul * 50;
                        }
                        data = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
                        this.ownGold -= NumberFormat.handleFloatDecimal(data);
                        this.numAccisiable.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.winnum.text = 0 + "";
                        this.scroller.run();
                        this.messageSend();
                    }
                    else if (this.runningType == RUNNING_TYPE.RESULT) {
                        if (game.LaohuUtils.isAutoGame && this.scatterIcon >= 2) {
                            this.startBtn.currentState == "up";
                            this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                            if (!this.mouseOn) {
                                this.mouseOn = new DBComponent("onmouseon");
                                GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                            }
                            this.mouseOn.touchEnabled = false;
                            this.mouseOn.touchChildren = false;
                            this.mouseOn.play("onmouseon", 0);
                            this.mouseOn.x = 76.5;
                            this.mouseOn.y = 69;
                            this.runGroup.addChild(this.mouseOn);
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.auto_times = 0;
                            this.timesLabel.text = "";
                        }
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
        /**
         * 测试按钮
         */
        DNTGScene1.prototype.startBtnTouch0 = function () {
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
                    this.setBtnColor();
                    this.removeLastAni();
                    this.scroller.stopIconDb();
                    this.scroller.run();
                    this.messageSend();
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 点击按钮快速停止游戏
         */
        DNTGScene1.prototype.fastGame = function () {
            if (this.scatterIcon >= 2) {
                this.fastEnd = true;
                egret.clearTimeout(this.scatter4timeout);
                egret.clearTimeout(this.scatter5timeout);
                SoundManager.getInstance().stopEffectByName("reel_fast_spin_none_mp3");
                SoundManager.getInstance().stopEffectByName("reel_fast_spin_win_mp3");
                this.scroller.removeScatterAni();
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                this.scroller.runResultFast();
            }
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.speed = 48;
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                egret.clearTimeout(this.autogameTimeout);
                if (this.scatter != 1)
                    this.resetBtnColor();
                if (this.db_run && this.db_run.parent) {
                    this.db_run.parent.removeChild(this.db_run);
                }
                if (this.db_runguang && this.db_runguang.parent) {
                    this.db_runguang.parent.removeChild(this.db_runguang);
                }
                this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                if (!this.mouseOn) {
                    this.mouseOn = new DBComponent("onmouseon");
                    GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                }
                this.mouseOn.touchEnabled = false;
                this.mouseOn.touchChildren = false;
                this.mouseOn.play("onmouseon", 0);
                this.mouseOn.x = 76.5;
                this.mouseOn.y = 69;
                this.runGroup.addChild(this.mouseOn);
                var stopAutoAni_1 = DBComponent.create("dntg_stopAutoAni", "button_stop");
                // let stopAutoAni = new DBComponent("button_stop");
                stopAutoAni_1.play("", 1);
                stopAutoAni_1.x = 76.5;
                stopAutoAni_1.y = 73.5;
                this.runGroup.addChild(stopAutoAni_1);
                stopAutoAni_1.addEventListener(egret.Event.COMPLETE, function () {
                    if (stopAutoAni_1 && stopAutoAni_1.parent) {
                        stopAutoAni_1.parent.removeChild(stopAutoAni_1);
                    }
                }, this);
                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.auto_times = 0;
                this.startBtn.currentState = "up";
            }
            else {
                this.bonusRect.touchEnabled = false;
                this.runningType = RUNNING_TYPE.LOOP;
                this.scroller.runResultFast();
            }
        };
        /**
         * 点击转轴区域快速停止游戏
         */
        DNTGScene1.prototype.scrollerFastGame = function () {
            if (this.runningType == RUNNING_TYPE.RESULT) {
                if (this.scatterIcon >= 2) {
                    if (this.scatterIcon >= 2) {
                        this.fastEnd = true;
                        egret.clearTimeout(this.scatter4timeout);
                        egret.clearTimeout(this.scatter5timeout);
                        SoundManager.getInstance().stopEffectByName("reel_fast_spin_none_mp3");
                        SoundManager.getInstance().stopEffectByName("reel_fast_spin_win_mp3");
                        this.scroller.removeScatterAni();
                        this.scroller.item4.speed = 48;
                        this.scroller.item5.speed = 48;
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        // this.scroller.runResultFast();
                    }
                }
                ;
                this.scroller.runResultFast();
            }
        };
        /**
         * 移除旋转中奖上次动画
         */
        DNTGScene1.prototype.removeLastAni = function () {
            this.setBtnColor();
            this.fastEnd = false;
            this.scroller.stopIconDb();
            game.UIUtils.removeSelf(this.commomScore);
        };
        //打开自动游戏窗口
        DNTGScene1.prototype.openAutoGame = function () {
            if (!game.LaohuUtils.isAutoGame) {
                CF.sN(PanelNotify.OPEN_LAOHU_AUTO_PANEL);
            }
        };
        //开始自动游戏
        DNTGScene1.prototype.startAutoGame = function () {
            this.changeAutoBtnState();
            if (game.LaohuUtils.bet * game.LaohuUtils.mul * 50 > this.ownGold) {
                var text = "金币不足";
                this.resetBtnColor();
                this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                if (!this.mouseOn) {
                    this.mouseOn = new DBComponent("onmouseon");
                    GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                }
                this.mouseOn.touchEnabled = false;
                this.mouseOn.touchChildren = false;
                this.mouseOn.play("onmouseon", 0);
                this.mouseOn.x = 76.5;
                this.mouseOn.y = 69;
                this.runGroup.addChild(this.mouseOn);
                Global.alertMediator.addAlert(text, function () {
                }, "", true);
                return;
            }
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.speed = 85;
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
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
         * 自动游戏按钮状态
         */
        DNTGScene1.prototype.changeAutoBtnState = function () {
            this.startBtn.currentState = "down";
            this.mouseOn.visible = false;
        };
        /**
         * 转动游戏收发消息
         */
        DNTGScene1.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, quitResp, text_1, resp1, i, i, j, aaa, str_lingshi, temp, temp2, arr, k, scatternum, i, j, i, j, colorMatrix, colorFlilter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // this.winnerAtr = [];
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
                                    data2 = { "spinType": this.spinTest, "bet": game.LaohuUtils.bet, "multiple": game.LaohuUtils.mul, "lineCount": 243, "activityId": 0, "freeWheel": this.wheel };
                                }
                                else {
                                    data2 = { "spinType": this.spinTest, "bet": game.LaohuUtils.bet, "multiple": game.LaohuUtils.mul, "lineCount": 243, "activityId": 0, "wheel": this.wheel };
                                }
                            }
                            else {
                                data2 = { "spinType": 0, "bet": game.LaohuUtils.bet, "multiple": game.LaohuUtils.mul, "lineCount": 243, "activityId": 0 };
                            }
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (!resp2.error) return [3 /*break*/, 3];
                            text = resp2.error.msg;
                            Global.alertMediator.addAlert(text, "", "", true);
                            if (resp2.error.code == -22) {
                                CF.sN(SceneNotify.CLOSE_DNTG);
                                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 2:
                            quitResp = _a.sent();
                            if (quitResp) {
                                if (quitResp.error && quitResp.error.code != 0) {
                                    text_1 = TextUtils.instance.getCurrentTextById(105);
                                    Global.alertMediator.addAlert(text_1, function () {
                                    }, null, true);
                                    return [2 /*return*/];
                                }
                                Global.gameProxy.clearRoomInfo();
                                if (quitResp.gold != undefined && quitResp.gold != null) {
                                    Global.playerProxy.playerData.gold = quitResp.gold;
                                }
                            }
                            //关闭其他窗口
                            CF.sN(SceneNotify.OPEN_MAIN_HALL);
                            CF.sN(SceneNotify.CLOSE_DNTG);
                            CF.sN(PanelNotify.CLOSE_LAOHU_AUTO_PANEL);
                            CF.sN(PanelNotify.CLOSE_LAOHUGAME_TIPS);
                            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
                            return [2 /*return*/];
                        case 3:
                            resp1 = resp2.spinRes[0];
                            //结果展示数组
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
                            this.messageTimeOut = egret.setTimeout(function () {
                                _this.scroller.runResult(_this.showAtr);
                                _this.runningType = RUNNING_TYPE.RESULT;
                                if (_this.isFastGame) {
                                    _this.scroller.runResultFast();
                                }
                            }, this, 300);
                            this.winGold = resp2.winCount;
                            this.ownGold = resp2.own_gold;
                            if (this.winGold > 0) {
                                this.lineTime = 2000;
                            }
                            else {
                                this.lineTime = 1000;
                            }
                            game.LaohuUtils.ToTalMoney = this.ownGold;
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
                            this.isStopAni = false;
                            if (game.LaohuUtils.isAutoGame) {
                                game.LaohuUtils.totoalWinGold += this.winGold;
                            }
                            colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            if (!game.LaohuUtils.isAutoGame) {
                                this.db_run.filters = [colorFlilter];
                            }
                            else {
                                this.startBtn.filters = [colorFlilter];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        //旋转时按钮设灰
        DNTGScene1.prototype.setBtnColor = function () {
            // this.startBtn.touchEnabled = false;
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.showIconTimeOut);
            if (this.commomScore && this.commomScore.parent) {
                this.commomScore.parent.removeChild(this.commomScore);
            }
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.menuBtn.filters = [colorFlilter];
            this.menuBtn.touchEnabled = this.yazhu_ima.touchEnabled = this.betAddBtn.touchEnabled = this.betSubBtn.touchEnabled = this.autoRunBtn.touchEnabled = this.tipsBtn.touchEnabled = this.back2HallBtn.touchEnabled = false;
            this.yazhu_ima.filters = [colorFlilter];
            this.betAddBtn.filters = [colorFlilter];
            this.betSubBtn.filters = [colorFlilter];
            this.autoRunBtn.filters = [colorFlilter];
            this.tipsBtn.filters = [colorFlilter];
            //判断是否为自动游戏
            if (!game.LaohuUtils.isAutoGame) {
                if (!this.db_runguang) {
                    this.db_runguang = new DBComponent("ongamerun");
                    GameCacheManager.instance.setCache("ongamerun", this.db_runguang);
                }
                this.db_runguang.touchEnabled = false;
                this.db_runguang.touchChildren = false;
                this.db_runguang.play("runguang", 1);
                this.db_runguang.x = 76.7;
                this.db_runguang.y = 68;
                this.runGroup.addChild(this.db_runguang);
                this.db_run = GameCacheManager.instance.getCache("ongamerun1");
                if (!this.db_run) {
                    this.db_run = new DBComponent("ongamerun");
                    GameCacheManager.instance.setCache("ongamerun1", this.db_run);
                }
                this.db_run.touchEnabled = false;
                this.db_run.touchChildren = false;
                this.db_run.playNamesAndLoop(["ongamerun"]);
                this.db_run.x = 76.7;
                this.db_run.y = 68;
                this.runGroup.addChild(this.db_run);
                this.db_run.filters = [colorFlilter];
            }
            else {
                this.startBtn.filters = [colorFlilter];
            }
        };
        //旋转完成后按钮还原
        /**
         */
        DNTGScene1.prototype.resetBtnColor = function () {
            this.startBtn.touchEnabled = true;
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            if (this.scatter != 1)
                this.back2HallBtn.touchEnabled = true;
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.menuBtn.filters = [colorFlilter];
            this.menuBtn.touchEnabled = this.yazhu_ima.touchEnabled = this.betAddBtn.touchEnabled = this.betSubBtn.touchEnabled = this.autoRunBtn.touchEnabled = this.tipsBtn.touchEnabled = this.back2HallBtn.touchEnabled = true;
            this.yazhu_ima.filters = [colorFlilter];
            this.betAddBtn.filters = [colorFlilter];
            this.betSubBtn.filters = [colorFlilter];
            this.autoRunBtn.filters = [colorFlilter];
            this.tipsBtn.filters = [colorFlilter];
            if (this.db_run && this.db_run.parent) {
                this.db_run.parent.removeChild(this.db_run);
            }
            if (this.db_runguang && this.db_runguang.parent) {
                this.db_runguang.parent.removeChild(this.db_runguang);
            }
            this.runGroup.addChild(this.mouseOn);
        };
        /**
         * @param  {egret.Event} e
         */
        DNTGScene1.prototype.scrollerEnd = function (e) {
            var _this = this;
            var data = e.data;
            if (data.sceneIndex != 1) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    //自动游戏继续下一把
                    if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                        if (this.winGold >= game.LaohuUtils.oneMax) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                            this.resetBtnColor();
                            this.startBtn.currentState = "up";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                            if (!this.mouseOn) {
                                this.mouseOn = new DBComponent("onmouseon");
                                GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                            }
                            this.mouseOn.touchEnabled = false;
                            this.mouseOn.touchChildren = false;
                            this.mouseOn.play("onmouseon", 0);
                            this.mouseOn.x = 76.5;
                            this.mouseOn.y = 69;
                            this.runGroup.addChild(this.mouseOn);
                            this.runningType = RUNNING_TYPE.EMPTY;
                        }
                    }
                    SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
                    if (this.showAtr) {
                        if (this.showAtr.length != 0) {
                            for (var i = 0; i < this.showAtr[4].length; i++) {
                                //判断第5列上是否有scatter
                                if (this.showAtr[4][i] == 2) {
                                    for (var j = 0; j < 3; j++) {
                                        if (this.showAtr[2][j] == 2) {
                                            for (var k = 0; k < 3; k++) {
                                                if (this.showAtr[0][k] == 2) {
                                                    SoundManager.getInstance().playEffect("scat_dntg_mp3");
                                                    this.scroller.addFoGuang(5, i, "foguang");
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                                }
                            }
                        }
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            this.winnum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this.checkBonusIcon();
                                return;
                            }
                            egret.setTimeout(function () {
                                LogUtils.logD("empty4");
                                if (_this.scatter != 1)
                                    _this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                            if (this.winGold > 0) {
                                this.autogameTimeout = egret.setTimeout(this.startBtnTouch, this, 2000);
                            }
                            else {
                                this.autogameTimeout = egret.setTimeout(this.startBtnTouch, this, 1000);
                            }
                        }
                        else {
                            if (this.scatter != 1 && !game.LaohuUtils.isAutoGame)
                                this.resetBtnColor();
                            if (this.db_run && this.db_run.parent) {
                                this.db_run.parent.removeChild(this.db_run);
                            }
                            if (this.db_runguang && this.db_runguang.parent) {
                                this.db_runguang.parent.removeChild(this.db_runguang);
                            }
                            this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                            if (!this.mouseOn) {
                                this.mouseOn = new DBComponent("onmouseon");
                                GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                            }
                            this.mouseOn.touchEnabled = false;
                            this.mouseOn.touchChildren = false;
                            this.mouseOn.play("onmouseon", 0);
                            this.mouseOn.x = 76.5;
                            this.mouseOn.y = 69;
                            this.runGroup.addChild(this.mouseOn);
                            this.winnum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            this.bonusRect.touchEnabled = false;
                            egret.setTimeout(function () {
                                LogUtils.logD("empty5");
                                if (_this.scatter != 1)
                                    _this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                        }
                        this.numAccisiable.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
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
                                        SoundManager.getInstance().playEffect("scat_dntg_mp3");
                                        this.scroller.addFoGuang(3, i, "foguang");
                                    }
                                }
                            }
                            else {
                                SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                            }
                        }
                        //是否可能中scatter，4,5列加速
                        if (this.scatterIcon >= 2 && !this.isFastGame) {
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
                            SoundManager.getInstance().playEffect("reel_fast_spin_none_mp3");
                            if (!Global.runBack) {
                                this.scatter4timeout = egret.setTimeout(function () {
                                    item4_1.changeResult(_this.showAtr[3]);
                                    _this.scroller.removeScatterAni(4);
                                    _this.scroller.addScatterAni(5);
                                    if (_this.scatter != 1) {
                                        SoundManager.getInstance().playEffect("reel_fast_spin_none_mp3");
                                    }
                                    else {
                                        SoundManager.getInstance().playEffect("reel_fast_spin_win_mp3");
                                    }
                                }, this, 2500);
                                this.scatter5timeout = egret.setTimeout(function () {
                                    item5_1.changeResult(_this.showAtr[4]);
                                    if (_this.scatter == 1)
                                        SoundManager.getInstance().playEffect("scat_dntg_mp3");
                                    _this.scroller.removeScatterAni(5);
                                    egret.clearTimeout(_this.autogameTimeout);
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
                                SoundManager.getInstance().playEffect("scat_dntg_mp3");
                                this.scroller.addFoGuang(1, i, "foguang");
                            }
                            else {
                                SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                            }
                        }
                    }
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("reelstop1_dntg_mp3");
                    break;
            }
        };
        //旋转完成中奖、免费游戏判断
        DNTGScene1.prototype.checkBonusIcon = function () {
            var _this = this;
            //判断是否有中bigwin
            // this.removeLastAni();
            if (this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                egret.clearTimeout(this.autogameTimeout);
                this.startBtn.touchEnabled = false;
                this.menuBtn.touchEnabled = this.yazhu_ima.touchEnabled = this.betAddBtn.touchEnabled = this.betSubBtn.touchEnabled = this.autoRunBtn.touchEnabled = this.tipsBtn.touchEnabled = this.back2HallBtn.touchEnabled = false;
                /**
                 * bigwin窗口点击事件
                 */
                var func_1 = function () {
                    _this.bigWinPanel.touchEnabled = false;
                    _this.bigWinPanel.bigwinStopRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                    if (_this.scatter != 1)
                        _this.startBtn.touchEnabled = true;
                    if (!game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                        _this.runningType = RUNNING_TYPE.EMPTY;
                    }
                    /**
                     * bigwin结束窗口效果
                     */
                    _this.bigWinPanel.stopShowBigWin(function () {
                        if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                            _this.scroller.stopIconDb();
                            _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                            _this.autogameTimeout = egret.setTimeout(function () {
                                _this.startBtnTouch();
                            }, _this, 1700);
                            if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                _this.askAutoGame();
                            }
                            ;
                        }
                        if (_this.scatter != 1) {
                            _this.startBtn.touchEnabled = true;
                            _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                        }
                        if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame)
                            _this.menuBtn.touchEnabled = _this.yazhu_ima.touchEnabled = _this.betAddBtn.touchEnabled = _this.betSubBtn.touchEnabled = _this.autoRunBtn.touchEnabled = _this.tipsBtn.touchEnabled = _this.back2HallBtn.touchEnabled = true;
                        if (_this.scatter == 1)
                            _this.addEachLineAni();
                    });
                };
                this.bigWinPanel = new dntg.DNTGBigwinGroup();
                this.bigWinPanel.showpanel();
                this.bigWinPanel.touchEnabled = false;
                egret.setTimeout(function () {
                    _this.bigWinPanel.touchEnabled = true;
                    _this.bigWinPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                }, this, 1500);
                /**
                 * bigwin窗口
                 * @param score,callback?
                 */
                this.bigWinPanel.scoreShow(this.winGold, function () {
                    _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                    if (_this.commomScore && _this.commomScore.parent) {
                        _this.commomScore.parent.removeChild(_this.commomScore);
                    }
                    if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                        _this.scroller.stopIconDb();
                        _this.autogameTimeout = egret.setTimeout(function () {
                            _this.startBtnTouch();
                        }, _this, 1500);
                        if (_this.clickTime >= 3 && !game.LaohuUtils.isTips && !game.LaohuUtils.isTips) {
                            _this.askAutoGame();
                        }
                        ;
                    }
                    if (_this.scatter != 1) {
                        _this.startBtn.touchEnabled = true;
                        _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                    }
                    if (!game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                        _this.runningType = RUNNING_TYPE.EMPTY;
                    }
                    if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame)
                        _this.menuBtn.touchEnabled = _this.yazhu_ima.touchEnabled = _this.betAddBtn.touchEnabled = _this.betSubBtn.touchEnabled = _this.autoRunBtn.touchEnabled = _this.tipsBtn.touchEnabled = _this.back2HallBtn.touchEnabled = true;
                    if (_this.scatter == 1)
                        _this.addEachLineAni();
                });
                this.resizeGroup.addChild(this.bigWinPanel);
            }
            else {
                //未中bigwin逐个展示中奖图标
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    if (this.scatter == 1)
                        this.runningType = RUNNING_TYPE.STOP;
                    SoundManager.getInstance().playEffect("win_dntg_mp3");
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    this.commomScore = new eui.BitmapLabel();
                    this.commomScore.font = "dntg_win_gold_fnt";
                    var data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.commomScore.textAlign = "center";
                    this.commomScore.verticalCenter = 0;
                    this.commomScore.horizontalCenter = 0;
                    this.scroller.addChild(this.commomScore);
                    if (!Global.runBack) {
                        this.removeScoreTimeout = egret.setTimeout(function () {
                            if (_this.commomScore && _this.commomScore.parent) {
                                _this.commomScore.parent.removeChild(_this.commomScore);
                            }
                            _this.addEachLineAni();
                        }, this, 2000);
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            this.askAutoGame();
                        }
                    }
                }
                else {
                    //未中奖后进入免费游戏
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        this.back2HallBtn.touchEnabled = false;
                        this.scroller.addFoGuang(1, this.yudiAtr[0], "icon_2");
                        this.scroller.addFoGuang(3, this.yudiAtr[1], "icon_2");
                        this.scroller.addFoGuang(5, this.yudiAtr[2], "icon_2");
                        this.toFreeAni = this.showAllIcon("freegame");
                        this.toFreeAni.x = 700;
                        this.toFreeAni.y = 300;
                        this.toFreeAni.addEventListener(egret.Event.COMPLETE, function () {
                            CF.dP(ENo.DNTG_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            if (_this.toFreeAni && _this.toFreeAni.parent) {
                                _this.toFreeAni.parent.removeChild(_this.toFreeAni);
                            }
                        }, this);
                        egret.setTimeout(function () { _this.toFreeAni.animation.play("freegame", 1); _this.resizeGroup.addChild(_this.toFreeAni); }, this, 1200);
                        SoundManager.getInstance().playEffect("scatin_dntg_mp3");
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
         * 免费游戏回到正常游戏场景处理
         */
        DNTGScene1.prototype.free2Common = function () {
            var _this = this;
            SoundManager.getInstance().playMusic("background_mus_dntg_mp3");
            this.startBtn.touchEnabled = true;
            if (this["quitBtn"]) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this["quitBtn"].visible = true;
                    ;
                }
            }
            /**
             * 继续自动游戏
             */
            if (game.LaohuUtils.isAutoGame) {
                egret.setTimeout(function () { _this.startAutoGame(); }, this, 1000);
            }
            else {
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.resetBtnColor();
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.currentState = "up";
                this.timesLabel.text = "";
                this.mouseOn = GameCacheManager.instance.getCache("onmouseon");
                /**
                 * 添加按钮动画
                 */
                if (!this.mouseOn) {
                    this.mouseOn = new DBComponent("onmouseon");
                    GameCacheManager.instance.setCache("onmouseon", this.mouseOn);
                }
                this.mouseOn.touchEnabled = false;
                this.mouseOn.touchChildren = false;
                this.mouseOn.play("onmouseon", 0);
                this.mouseOn.x = 76.5;
                this.mouseOn.y = 69;
                this.runGroup.addChild(this.mouseOn);
            }
            this.numAccisiable.text = NumberFormat.handleFloatDecimal(game.LaohuUtils.ToTalMoney) + "";
            this.ownGold = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.LaohuUtils.freeWin;
            game.LaohuUtils.freeWin = 0;
        };
        /**
         * 每条连线动画
         */
        DNTGScene1.prototype.addEachLineAni = function () {
            var _this = this;
            // this.removeLastAni();
            // 非空判断
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                var count_1 = 0;
                async.eachSeries(this.bonusAtr, function (index, callback) {
                    if (_this.isStopAni)
                        return;
                    if (_this.commomScore && _this.commomScore.parent) {
                        _this.commomScore.parent.removeChild(_this.commomScore);
                    }
                    for (var j = 0; j < index.length; j++) {
                        var k = j + 1;
                        _this.scroller["item" + k].showAni(index[j]);
                        // this.commomScore = new eui.BitmapLabel();
                        _this.commomScore.font = "font_gold_fnt";
                        var data = Number(new Big(_this.eachLineScore[count_1]).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        _this.commomScore.verticalCenter = ((index[2] - 1)) * 172 - 12;
                        _this.commomScore.horizontalCenter = 0;
                        _this.commomScore.textAlign = "center";
                        _this.commomScore.scaleX = 0.8;
                        _this.commomScore.scaleY = 0.8;
                        _this.resizeGroup.addChild(_this.commomScore);
                    }
                    if (_this.bonusAtr.length == 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 1500);
                    }
                    if (_this.bonusAtr.length > 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            egret.setTimeout(function () {
                                if (_this.commomScore && _this.commomScore.parent) {
                                    _this.commomScore.parent.removeChild(_this.commomScore);
                                }
                            }, _this, 1500);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2500);
                    }
                    count_1++;
                }, function () {
                    if (_this.scatter == 1) {
                        if (_this.commomScore && _this.commomScore.parent) {
                            _this.commomScore.parent.removeChild(_this.commomScore);
                        }
                        // this.startBtn.touchEnabled = false;
                        _this.back2HallBtn.touchEnabled = false;
                        _this.runningType = RUNNING_TYPE.STOP;
                        _this.scroller.addFoGuang(1, _this.yudiAtr[0], "icon_2");
                        _this.scroller.addFoGuang(3, _this.yudiAtr[1], "icon_2");
                        _this.scroller.addFoGuang(5, _this.yudiAtr[2], "icon_2");
                        _this.toFreeAni = _this.showAllIcon("freegame");
                        _this.toFreeAni.x = 700;
                        _this.toFreeAni.y = 300;
                        _this.toFreeAni.addEventListener(egret.Event.COMPLETE, function () {
                            CF.dP(ENo.DNTG_ENTER_FREE_GAME, { isfast: _this.isFastGame });
                            if (_this.toFreeAni && _this.toFreeAni.parent) {
                                _this.toFreeAni.parent.removeChild(_this.toFreeAni);
                            }
                        }, _this);
                        egret.setTimeout(function () {
                            _this.toFreeAni.animation.play("freegame", 1);
                            SoundManager.getInstance().playEffect("scatin_dntg_mp3");
                            _this.resizeGroup.addChild(_this.toFreeAni);
                        }, _this, 1200);
                    }
                    else {
                        count_1 = 0;
                        if (_this.commomScore && _this.commomScore.parent) {
                            _this.commomScore.parent.removeChild(_this.commomScore);
                        }
                        return _this.addEachLineAni();
                    }
                });
            }
        };
        //增加bet
        DNTGScene1.prototype.addBet = function () {
            var _this = this;
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                SoundManager.getInstance().playEffect("button_dntg_mp3");
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
            else {
            }
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.totalBetLabel.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) + "";
            this.betTtipsGroup.visible = true;
            this.maxWinLabel.text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
            var data1 = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.reduceBet();
            }
        };
        //减少bet
        DNTGScene1.prototype.reduceBet = function () {
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
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.totalBetLabel.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) + "";
            this.betTtipsGroup.visible = true;
            this.maxWinLabel.text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
        };
        //返回dbegretArmature对象
        /**
         * @param  {string} str
         * @param  {number} x?
         * @param  {number} y?
         */
        DNTGScene1.prototype.showAllIcon = function (str, x, y) {
            var scycle = new dragonBones.EgretArmatureDisplay();
            scycle = DBFactory.instance.getDBAsync1(str);
            return scycle;
        };
        //直接选中最大bet
        DNTGScene1.prototype.maxBet = function () {
            var _this = this;
            var bet = game.LaohuUtils.bets[4];
            var mul = game.LaohuUtils.muls[9];
            var data1 = Number(new Big(bet * mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.LaohuUtils.bet = game.LaohuUtils.bets[4];
            game.LaohuUtils.mul = game.LaohuUtils.muls[9];
            this.betTtipsGroup.visible = true;
            this.maxWinLabel.text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBetLabel.text = NumberFormat.handleFloatDecimal(game.LaohuUtils.bet * game.LaohuUtils.mul * 50) + "";
            egret.setTimeout(function () { _this.betTtipsGroup.visible = false; }, this, 5000);
            this.bet = 10;
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
        };
        /**
         * 打开游戏记录
         */
        DNTGScene1.prototype.openGameRecord = function () {
            // let record: dntg.DNTGGameRecordPanel = new DNTGGameRecordPanel();
            CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
        };
        /**
         * 返回大厅
         */
        DNTGScene1.prototype.backtoHall = function () {
            game.releaseSlotRes.currentSlotName = "dntg";
            if (ServerConfig.OP_RETURN_TYPE == "2") {
                FrameUtils.goHome();
                return;
            }
            CF.sN(PanelNotify.OPEN_LEAVE_LAOHU_PANEL);
        };
        DNTGScene1.prototype.askAutoGame = function () {
            var _this = this;
            var slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            this.resizeGroup.addChild(slotTips);
            game.LaohuUtils.isTips = true;
            if (game.LaohuUtils.isAutoGame) {
                egret.clearTimeout(this.autogameTimeout);
            }
            var func = function () {
                // CF.sN(this.AUTOGAME_NOTIFY);
                if (game.LaohuUtils.isAutoGame)
                    _this.autogameTimeout = egret.setTimeout(_this.startBtnTouch, _this, _this.lineTime);
                _this.isFastGame = true;
                game.UIUtils.removeSelf(slotTips);
                _this.clickTime = 0;
            };
            var func2 = function () {
                if (game.LaohuUtils.isAutoGame)
                    _this.autogameTimeout = egret.setTimeout(_this.startBtnTouch, _this, _this.lineTime);
                game.UIUtils.removeSelf(slotTips);
                slot.SlotAutoTips._instance = null;
            };
            slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            slotTips.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
            slotTips.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
        };
        return DNTGScene1;
    }(game.BaseScene));
    dntg.DNTGScene1 = DNTGScene1;
    __reflect(DNTGScene1.prototype, "dntg.DNTGScene1");
})(dntg || (dntg = {}));
var RUNNING_TYPE;
(function (RUNNING_TYPE) {
    RUNNING_TYPE[RUNNING_TYPE["LOOP"] = 0] = "LOOP";
    RUNNING_TYPE[RUNNING_TYPE["RESULT"] = 1] = "RESULT";
    RUNNING_TYPE[RUNNING_TYPE["STOP"] = 2] = "STOP";
    RUNNING_TYPE[RUNNING_TYPE["EMPTY"] = 3] = "EMPTY"; //无状态可以开始
})(RUNNING_TYPE || (RUNNING_TYPE = {}));
