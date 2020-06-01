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
 * @Date: 2019-06-04 16:24:14
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-11-26 17:40:34
 * @Description:
 */
var bskg;
(function (bskg) {
    var BSKGScene1 = (function (_super) {
        __extends(BSKGScene1, _super);
        function BSKGScene1() {
            var _this = _super.call(this) || this;
            _this.clickTime = 0;
            _this.isFastGame = false;
            _this.bet = 1;
            _this.isSelected = false;
            _this.fastEnd = false;
            _this.winGold = 0;
            _this.isTest = false;
            _this.spinTest = 0;
            _this.commomScore = new eui.BitmapLabel();
            _this.runningType = 3; //选择类型
            _this.isStopAni = false; //播放stop动画flag
            _this.HuiAtr = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
            _this.skinName = "BSKGScene1Skin";
            return _this;
        }
        BSKGScene1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initAni();
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
                this["quitBtn"].visible = false;
            }
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
            this.scroller.showFirst(1);
        };
        BSKGScene1.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            SoundManager.getInstance().playMusic("bskg_background_mus_mp3");
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.BSKG_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
        };
        BSKGScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.BSKG_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
        };
        BSKGScene1.prototype.addMouseOnEvent = function () {
            this.group5.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.select1, this);
            this.group10.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.select2, this);
            this.group15.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.select3, this);
            this.group20.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.select4, this);
            this.group5.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOutHandle, this);
            this.group10.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOutHandle, this);
            this.group15.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOutHandle, this);
            this.group20.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOutHandle, this);
        };
        BSKGScene1.prototype.removeMouseOnEvent = function () {
            this.group5.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.select1, this);
            this.group10.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.select2, this);
            this.group15.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.select3, this);
            this.group20.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.select4, this);
            this.group5.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOutHandle, this);
            this.group10.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOutHandle, this);
            this.group15.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOutHandle, this);
            this.group20.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOutHandle, this);
        };
        /**
        * 鼠标悬浮动画
        * @param  {number} num
        */
        BSKGScene1.prototype.select1 = function () {
            this.selectTime(0);
        };
        BSKGScene1.prototype.select2 = function () {
            this.selectTime(1);
        };
        BSKGScene1.prototype.select3 = function () {
            this.selectTime(2);
        };
        BSKGScene1.prototype.select4 = function () {
            this.selectTime(3);
        };
        BSKGScene1.prototype.selectTime = function (num) {
            this.boxDefaultAin.play("", 0);
            switch (num) {
                case 0:
                    this.group5.addChild(this.boxDefaultAin);
                    this.boxDefaultAin.resetPosition();
                    break;
                case 1:
                    this.group10.addChild(this.boxDefaultAin);
                    this.boxDefaultAin.resetPosition();
                    break;
                case 2:
                    this.group15.addChild(this.boxDefaultAin);
                    this.boxDefaultAin.resetPosition();
                    break;
                case 3:
                    this.group20.addChild(this.boxDefaultAin);
                    this.boxDefaultAin.resetPosition();
                    break;
            }
        };
        /**
         * 鼠标移除动画
         * @param  {number} num
         */
        BSKGScene1.prototype.mouseOutHandle = function () {
            game.UIUtils.removeSelf(this.boxDefaultAin);
        };
        /**
         * 开始游戏，请求数据
         */
        BSKGScene1.prototype.startGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp1, data, resp, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                        case 1:
                            resp1 = _a.sent();
                            data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": 1005 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 2:
                            resp = _a.sent();
                            //消息判断
                            if (resp) {
                                if (resp.error.code != 0) {
                                    text = resp.error.msg;
                                    CF.sN(SceneNotify.CLOSE_BSKG);
                                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                    Global.alertMediator.addAlert(text, function () {
                                    }, "", true);
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                CF.sN(SceneNotify.CLOSE_BSKG);
                                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 创建场景动画缓存
         */
        BSKGScene1.prototype.initAni = function () {
            this.bskgBgAni1 = DBComponent.create("bskg_bskgBgAni1", "bskg_bgani");
            this.bskgBgAni1.horizontalCenter = 0;
            this.bskgBgAni1.bottom = 220;
            this.bskgBgAni1.play("", 0);
            this.effectGroup.addChild(this.bskgBgAni1);
            this.bskgBgAni1.resetPosition();
            for (var i = 1; i <= 4; i++) {
                game.BSKGUtils["bskgRoleAni" + i] = DBComponent.create("bskg_bskgRoleAni" + i, "bskg_roleani" + i);
                game.BSKGUtils["bskgRoleAni" + i].bottom = game.BSKGUtils["bskgRoleAni" + i].horizontalCenter = 0;
            }
            game.BSKGUtils.bskgRoleAni1.play("", 0);
            this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni1);
            game.BSKGUtils.bskgRoleAni1.resetPosition();
            this.spinDefaultAni = DBComponent.create("bskg_spinDefaultAni", "bskg_spin_default");
            this.spinStartAni = DBComponent.create("bskg_spinStartAni", "bskg_spin_start_1");
            this.spinRunningAni = DBComponent.create("bskg_spinRunningAni", "bskg_spin_running");
            this.spinStopAni = DBComponent.create("bskg_spinStopAni", "bskg_spin_stop");
            this.spinRunningAni.horizontalCenter = this.spinStartAni.horizontalCenter = this.spinStopAni.horizontalCenter = this.spinDefaultAni.horizontalCenter = 0;
            this.spinRunningAni.bottom = this.spinStartAni.bottom = this.spinDefaultAni.bottom = 60;
            this.spinStopAni.bottom = 85;
            this.spinDefaultAni.touchEnabled = this.spinRunningAni.touchEnabled = this.spinStartAni.touchEnabled = this.spinStopAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
            this.boxDefaultAin = DBComponent.create("bskg_boxDefaultAin", "bskg_box_1");
            this.boxDefaultAin.horizontalCenter = 0;
            this.boxDefaultAin.bottom = 70;
            this.boxSelectAni = DBComponent.create("bskg_boxSelectAni", "bskg_box_2");
            this.boxSelectAni.horizontalCenter = 0;
            this.boxSelectAni.bottom = 40;
            this.boxDefaultAin.touchEnabled = this.boxSelectAni.touchEnabled = false;
            this.scatterBoomAni = DBComponent.create("bskg_scatterBoomAni", "bskg_boom_ani");
            this.scatterBoomAni.bottom = 50;
            this.scatterBoomAni.horizontalCenter = 0;
            game.BSKGUtils.bskgDust1 = DBComponent.create("bskg_dust1", "bskg_dust_1");
            game.BSKGUtils.bskgDust2 = DBComponent.create("bskg_dust2", "bskg_dust_2");
            game.BSKGUtils.bskgDust1.horizontalCenter = 0;
            game.BSKGUtils.bskgDust1.bottom = 150;
            game.BSKGUtils.bskgDust2.horizontalCenter = 0;
            game.BSKGUtils.bskgDust2.bottom = 200;
            game.BSKGUtils.bskgDust1.touchEnabled = game.BSKGUtils.bskgDust2.touchEnabled = false;
        };
        /**
         * 进入游戏消息
         * @param  {egret.Event} e
         */
        BSKGScene1.prototype.enterGame = function (e) {
            var resp = e.data;
            game.BSKGUtils.bets = [];
            game.BSKGUtils.muls = [];
            var playerIdnex = resp.playerInfo.playerIndex;
            var players = {};
            for (var key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (var i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.BSKGUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            for (var j = 0; j < resp.roomInfo.gamePayTable.muls.length; j++) {
                game.BSKGUtils.muls.push(resp.roomInfo.gamePayTable.muls[j]);
            }
            //免费游戏倍数
            game.BSKGUtils.bet = game.BSKGUtils.bets[0];
            game.BSKGUtils.mul = game.BSKGUtils.muls[0];
            if (resp.roomInfo.gamePayTable) {
                game.BSKGUtils.FreeTimeMul = [];
                for (var k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.BSKGUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.BSKGUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.BSKGUtils.FreeTimeMul = game.BSKGUtils.FreeTimeMul[game.BSKGUtils.FreeTimeMulIndex];
                game.BSKGUtils.freeTimes = players.freeTimes;
            }
            //判断是否为免费游戏
            if (players.isScatter == 1 && players.freeTimes == 0) {
                game.BSKGUtils.bet = players.lastBet;
                game.BSKGUtils.mul = players.lastMul;
                CF.dP(ENo.BSKG_ENTER_FREE_GAME_SCENE, { isfast: this.isFastGame });
            }
            else if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.BSKGUtils.bet = players.lastBet;
                game.BSKGUtils.mul = players.lastMul;
                CF.dP(ENo.BSKG_START_FREE_GAME_SCENE, { isfast: this.isFastGame });
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
            game.BSKGUtils.ToTalMoney = this.ownGold;
            //重连后倍数判断
            switch ((game.BSKGUtils.bet * game.BSKGUtils.mul * 50)) {
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
            this["beishu"].text = parseInt(game.BSKGUtils.bet * game.BSKGUtils.mul * 100 + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(game.BSKGUtils.bet * game.BSKGUtils.mul * 50) + "";
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
        };
        /**
         * 点击事件监听
         * @param  {egret.TouchEvent} e
         */
        BSKGScene1.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.startBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.startBtnTouch();
                    break;
                case this.group5:
                    if (game.LaohuUtils.free_time_times != 0) {
                        return;
                    }
                    this.removeMouseOnEvent();
                    this.selectPeachs(3);
                    break;
                case this.group10:
                    if (game.LaohuUtils.free_time_times != 0) {
                        return;
                    }
                    this.removeMouseOnEvent();
                    this.selectPeachs(2);
                    break;
                case this.group15:
                    if (game.LaohuUtils.free_time_times != 0) {
                        return;
                    }
                    this.removeMouseOnEvent();
                    this.selectPeachs(1);
                    break;
                case this.group20:
                    if (game.LaohuUtils.free_time_times != 0) {
                        return;
                    }
                    this.removeMouseOnEvent();
                    this.selectPeachs(0);
                    break;
                case this["quitBtn"]:
                    if (this.scatter == 1)
                        return;
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    if (ServerConfig.OP_RETURN_TYPE == "2") {
                        FrameUtils.goHome();
                        return;
                    }
                    CF.sN(PanelNotify.OPEN_LEAVE_LAOHU_PANEL);
                    break;
                case this.memuBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    if (this["menuGroup"].visible == false) {
                        this["menuGroup"].visible = true;
                    }
                    else {
                        this["menuGroup"].visible = false;
                    }
                    break;
                //游戏记录按钮
                case this["recordBtn"]:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
                    this["menuGroup"].visible = false;
                    break;
                //游戏设置按钮
                case this["setingBtn"]:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    CF.sN(PanelNotify.OPEN_SETTING);
                    this["menuGroup"].visible = false;
                    break;
                //转轴快速停止
                case this["maskRect"]:
                    this.scrollerFastGame();
                    break;
                //减少bet按钮
                case this.subbet:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.reduceBet();
                    break;
                //增加bet按钮
                case this.addbet:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.addBetFunc();
                    break;
                //自动游戏窗口
                case this.autoGameBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    CF.sN(PanelNotify.OPEN_BSKG_AUTO_PANEL);
                    break;
                //最大bet按钮
                case this.maxBet:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.setMaxBet();
                    break;
                //赔付表按钮
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    CF.sN(PanelNotify.OPEN_BSKG_TIPS_PANEL);
                    break;
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        };
        BSKGScene1.prototype.startBtnTouch0 = function () {
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
          * spin按钮点击处理
          */
        BSKGScene1.prototype.startBtnTouch = function () {
            var _this = this;
            //判断余额
            var data1 = Number(new Big(game.BSKGUtils.bet * game.BSKGUtils.mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, function () {
                    _this.resetOtherBtn();
                    Global.playerProxy.playerData.gold = _this.ownGold;
                    if (game.LaohuUtils.isAutoGame) {
                        _this.resetStartBtn();
                        _this.startBtn.source = "bskg_start1_png";
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
                this.scroller.showIconBg();
                this.isTest = false;
                // 判断是否为免费游戏并且是否有剩余的免费次数
                if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times >= 1) {
                    if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                        game.LaohuUtils.isAutoGame = false;
                        game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                        game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                        this.resetOtherBtn();
                        this.startBtn.source = "bskg_start1_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "bskg_start1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
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
                            this.startBtn.source = "bskg_start1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.BSKGUtils.bet * game.BSKGUtils.mul * 50;
                    if (game.LaohuUtils.auto_times > 1000) {
                        this.timesLabel.text = "s";
                    }
                }
                else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                    this.timesLabel.visible = false;
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.startBtn.source = "bskg_start1_png";
                    this.resetOtherBtn();
                    this.resetStartBtn();
                    return;
                } //为满足完成自动游戏条件，开始自动游戏旋转
                else if (!game.LaohuUtils.isAutoGame) {
                    this.setStartBtn();
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
                SoundManager.getInstance().playEffect("bskg_reel_mp3", true);
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
            // 	let slotTips = slot.SlotAutoTips.instance;
            // 	slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            // 	this.resizeGroup.addChild(slotTips);
            // 	let func = () => {
            // 		CF.sN(PanelNotify.OPEN_BSKG_AUTO_PANEL);
            // 		game.UIUtils.removeSelf(slotTips);
            // 	}
            // 	slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            // }
        };
        /**
         * 快速结束转动
         */
        BSKGScene1.prototype.fastGame = function () {
            var _this = this;
            //转轴加速情况
            if (this.scatterIcon >= 2) {
                this.fastEnd = true;
                egret.clearTimeout(this.scatter4timeout);
                egret.clearTimeout(this.scatter5timeout);
                this.scroller.removeScatterAni();
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                this.startBtn.source = "bskg_start1_png";
                this.scroller.runResultFast();
                for (var i = 1; i <= 4; i++) {
                    this.scroller["item" + i].resetSpecilHui();
                }
            }
            //自动游戏情况
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.speed = 48;
                egret.clearTimeout(this.autoGameTimeout);
                if (this.scatter != 1)
                    this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "bskg_start1_png";
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
                this.startBtn.source = "bskg_start1_png";
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }
            }
            game.BSKGUtils.bskgRoleAni1.visible = true;
            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni2);
            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);
            SoundManager.getInstance().stopEffectByName("bskg_reel_fast_spin1_mp3");
            SoundManager.getInstance().stopEffectByName("bskg_reel_fast_spin2_mp3");
            SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
        };
        /**
         * 点击转轴区域快速停止游戏
         */
        BSKGScene1.prototype.scrollerFastGame = function () {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
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
                }
                game.BSKGUtils.bskgRoleAni1.visible = true;
                game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni2);
                game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("bskg_reel_fast_spin1_mp3");
                SoundManager.getInstance().stopEffectByName("bskg_reel_fast_spin2_mp3");
                SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
            }
        };
        /**
         * 开始免费游戏
         */
        BSKGScene1.prototype.startAutoGame = function () {
            //余额判断
            if (game.BSKGUtils.bet * game.BSKGUtils.mul * 50 > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "bskg_start2_png";
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.speed = 74;
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
         * 上次游戏效果移除
         */
        BSKGScene1.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                this.lineScoreGroup.visible = false;
                egret.clearTimeout(this.sethuiTimeout);
                for (var i = 1; i <= 5; i++) {
                    this.scroller["item" + i].resetSpecilHui();
                    this.scroller["item" + i].showAllIcon();
                }
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
        * 功能按钮屏蔽效果
        */
        BSKGScene1.prototype.setOtherBtn = function () {
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
        BSKGScene1.prototype.resetOtherBtn = function () {
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
        BSKGScene1.prototype.setStartBtn = function () {
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
        BSKGScene1.prototype.resetStartBtn = function () {
            game.UIUtils.removeSelf(this.spinRunningAni);
            this.spinDefaultAni.play("", 0);
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
        };
        /**
        * 发送c_bet请求
        */
        BSKGScene1.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, resp1, data1, colorMatrix, colorFlilter, i, i, j, aaa, str_lingshi, temp, temp2, arr, k, scatternum, i, j, i, j;
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
                            if (this.isTest) {
                                if (this.spinTest == 1) {
                                    data2 = { "spinType": this.spinTest, "bet": game.BSKGUtils.bet, "multiple": game.BSKGUtils.mul, "lineCount": 243, "activityId": 0, "freeWheel": this.wheel };
                                }
                                else {
                                    data2 = { "spinType": this.spinTest, "bet": game.BSKGUtils.bet, "multiple": game.BSKGUtils.mul, "lineCount": 243, "activityId": 0, "wheel": this.wheel };
                                }
                            }
                            else {
                                data2 = { "spinType": 0, "bet": game.BSKGUtils.bet, "multiple": game.BSKGUtils.mul, "lineCount": 243, "activityId": 0 };
                            }
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_BSKG);
                                SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
                                return [2 /*return*/];
                            }
                            resp1 = resp2.spinRes[0];
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
                            this.messageTimeOut = egret.setTimeout(function () {
                                _this.scroller.runResult(_this.showAtr);
                                if (_this.isFastGame) {
                                    _this.scroller.runResultFast();
                                }
                            }, this, 300);
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
                            data1 = Number(new Big(game.BSKGUtils.bet * game.BSKGUtils.mul).mul(50));
                            this.ownGold -= NumberFormat.handleFloatDecimal(data1);
                            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                            colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            this.startBtn.filters = [colorFlilter];
                            this.runningType = RUNNING_TYPE.RESULT;
                            this.winGold = resp2.winCount;
                            this.ownGold = resp2.own_gold;
                            if (this.winGold > 0) {
                                this.lineTime = 2000;
                            }
                            else {
                                this.lineTime = 1000;
                            }
                            game.BSKGUtils.ToTalMoney = resp2.own_gold;
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
        BSKGScene1.prototype.scrollerEnd = function (e) {
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
                                game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "bskg_start1_png";
                                this.timesLabel.text = "";
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
                                                    SoundManager.getInstance().playEffect("bskg_scat_appear2_mp3");
                                                    this.scroller.addFoGuang1(5, i, "bskg_icon_2_guang");
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                                }
                            }
                        }
                        this.scroller.removeIconHui(this.HuiAtr);
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        game.BSKGUtils.ToTalMoney = this.ownGold;
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
                        //自动游戏自动次数大于0
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this["quitBtn"].touchEnabled = false;
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
                case 4:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
                case 3:
                    for (var i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            for (var j = 0; j < 3; j++) {
                                if (this.showAtr[0][j] == 2) {
                                    SoundManager.getInstance().playEffect("bskg_scat_appear1_mp3");
                                    this.scroller.addFoGuang1(3, i, "bskg_icon_2_guang");
                                }
                            }
                        }
                        else {
                            SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
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
                            this.scroller.item4.speed = 74;
                            this.scroller.item5.speed = 74;
                            this.scroller.addScatterAni(4);
                            this.scroller.speed = 74;
                            var item4_1 = this.scroller["item" + 4];
                            var item5_1 = this.scroller["item" + 5];
                            SoundManager.getInstance().playEffect("bskg_reel_fast_spin1_mp3", true);
                            if (!Global.runBack) {
                                this.scatter4timeout = egret.setTimeout(function () {
                                    item4_1.changeResult(_this.showAtr[3]);
                                    _this.scroller.removeScatterAni(4);
                                    _this.scroller.addScatterAni(5);
                                    _this.scroller.setSpecilHui([[], [], [], [0, 1, 2], []]);
                                    SoundManager.getInstance().stopEffectByName("bskg_reel_fast_spin1_mp3");
                                    SoundManager.getInstance().playEffect("bskg_reel_fast_spin2_mp3", true);
                                }, this, 4000);
                                this.scatter5timeout = egret.setTimeout(function () {
                                    item5_1.changeResult(_this.showAtr[4]);
                                    _this.scroller.removeScatterAni(5);
                                    SoundManager.getInstance().stopEffectByName("bskg_reel_fast_spin2_mp3");
                                    egret.clearTimeout(_this.autoGameTimeout);
                                    _this.scroller.removeIconHui(_this.HuiAtr);
                                }, this, 8000);
                            }
                        }
                    }
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
                case 1:
                    for (var i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("bskg_scat_appear1_mp3");
                            this.scroller.addFoGuang1(1, i, "bskg_icon_2_guang");
                        }
                        else {
                            SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                        }
                    }
                    break;
            }
        };
        /**
         * 播放总连线
         */
        BSKGScene1.prototype.checkBonusIcon = function () {
            var _this = this;
            //满足bigwin
            if (this.winGold >= (game.BSKGUtils.bet * game.BSKGUtils.mul * 50) * 15) {
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
                                }, _this, 3400);
                            }
                            game.BSKGUtils.screamLittleShake(_this.shakeGroup);
                            game.BSKGUtils.bskgDust1.play("", 1);
                            _this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                            game.BSKGUtils.bskgDust1.resetPosition();
                            SoundManager.getInstance().playEffect("bskg_bom_mp3");
                            //未中scatter，播放一次总连线                            
                            if (_this.scatter != 1) {
                                _this.scroller.setIconHui();
                                _this.scroller.removeIconHui(_this.allAtr);
                                _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                                if (!game.LaohuUtils.isAutoGame) {
                                    egret.clearTimeout(_this.eachLineTimeOut);
                                    _this.eachLineTimeOut = egret.setTimeout(function () {
                                        _this.addEachLineAni();
                                    }, _this, 2000);
                                }
                                if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                    _this.askAutoGame();
                                }
                                ;
                            }
                            game.BSKGUtils.bskgRoleAni1.visible = false;
                            game.BSKGUtils.bskgRoleAni1.visible = true;
                            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);
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
                    this.bigWinPanel = new bskg.BSKGBigwinPanel();
                    // let i;
                    // i = Math.floor(Math.random() * 2);
                    SoundManager.getInstance().playEffect("bskg_role_cheer1_mp3");
                    game.BSKGUtils.bskgRoleAni3.play("", 0);
                    this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni3);
                    game.BSKGUtils.bskgRoleAni3.resetPosition();
                    game.BSKGUtils.bskgRoleAni1.visible = false;
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
                        game.BSKGUtils.screamLittleShake(_this.shakeGroup);
                        game.BSKGUtils.bskgDust1.play("", 1);
                        _this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                        game.BSKGUtils.bskgDust1.resetPosition();
                        SoundManager.getInstance().playEffect("bskg_bom_mp3");
                        if (game.LaohuUtils.isAutoGame && _this.scatter != 1) {
                            _this.autoGameTimeout = egret.setTimeout(function () {
                                _this.startBtnTouch();
                            }, _this, 3400);
                        }
                        if (_this.scatter != 1) {
                            _this.startBtn.touchEnabled = true;
                            _this.scroller.stopIconDb();
                            _this.scroller.setIconHui();
                            _this.scroller.removeIconHui(_this.allAtr);
                            _this.scroller.addBonusAni(_this.allAtr, _this.winGold);
                            if (!game.LaohuUtils.isAutoGame) {
                                egret.clearTimeout(_this.eachLineTimeOut);
                                _this.eachLineTimeOut = egret.setTimeout(function () {
                                    _this.addEachLineAni();
                                }, _this, 2000);
                            }
                            if (_this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                _this.askAutoGame();
                            }
                            ;
                        }
                        if (_this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                            _this.memuBtn.touchEnabled = _this.maxBet.touchEnabled = _this.addbet.touchEnabled = _this.subbet.touchEnabled = _this.autoGameBtn.touchEnabled = _this.tipsBtn.touchEnabled = _this["quitBtn"].touchEnabled = true;
                        }
                        game.BSKGUtils.bskgRoleAni1.visible = true;
                        game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);
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
                    var i_1;
                    i_1 = Math.ceil(Math.random() * 2);
                    SoundManager.getInstance().playEffect("bskg_win_mp3");
                    game.BSKGUtils.screamLittleShake(this.shakeGroup);
                    game.BSKGUtils.bskgDust1.play("", 1);
                    this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                    game.BSKGUtils.bskgDust1.resetPosition();
                    SoundManager.getInstance().playEffect("bskg_bom_mp3");
                    if (this.scatter == 1)
                        this.runningType = RUNNING_TYPE.STOP;
                    this.scroller.setIconHui();
                    this.scroller.removeIconHui(this.allAtr);
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    game.BSKGUtils.bskgRoleAni1.visible = false;
                    game.BSKGUtils.bskgRoleAni2.play("", 1);
                    egret.setTimeout(function () {
                        SoundManager.getInstance().playEffect("bskg_role_win" + i_1 + "_mp3");
                    }, this, 800);
                    this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni2);
                    game.BSKGUtils.bskgRoleAni2.resetPosition();
                    game.BSKGUtils.bskgRoleAni2.callback = function () {
                        game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni2);
                        game.BSKGUtils.bskgRoleAni1.visible = true;
                    };
                    var data = Number(new Big(this.winGold).mul(100));
                    this.lineNum.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.lineScoreGroup.visible = true;
                    // this.sethuiTimeout = egret.setTimeout(() => { this.scroller.setIconHui(); }, this, 2000)
                    this.removeScoreTimeout = egret.setTimeout(function () {
                        _this.lineScoreGroup.visible = false;
                        _this.addEachLineAni();
                    }, this, 2300);
                    if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                        this.askAutoGame();
                    }
                }
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        SoundManager.getInstance().playEffect("bskg_scat_mp3");
                        this.scroller.addFoGuang(1, this.yudiAtr[0], "bskg_icon_2");
                        this.scroller.addFoGuang(3, this.yudiAtr[1], "bskg_icon_2");
                        this.scroller.addFoGuang(5, this.yudiAtr[2], "bskg_icon_2");
                        egret.setTimeout(function () {
                            game.BSKGUtils.screamLittleShake(_this.shakeGroup);
                        }, this, 800);
                        egret.setTimeout(function () {
                            _this.scatterBoomAni.play("", 1);
                            SoundManager.getInstance().playEffect("bskg_role_happy_mp3");
                            _this.resizeGroup.addChild(_this.scatterBoomAni);
                            _this.scatterBoomAni.resetPosition();
                            game.BSKGUtils.screamShake(_this.shakeGroup);
                            game.BSKGUtils.bskgDust2.play("", 1);
                            _this.effectGroup.addChild(game.BSKGUtils.bskgDust2);
                            game.BSKGUtils.bskgDust2.resetPosition();
                            game.BSKGUtils.bskgRoleAni1.visible = false;
                            game.BSKGUtils.bskgRoleAni3.play("", 1);
                            SoundManager.getInstance().playEffect("bskg_role_cheer1_mp3");
                            _this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni3);
                            game.BSKGUtils.bskgRoleAni3.resetPosition();
                            game.BSKGUtils.bskgRoleAni3.callback = function () {
                                game.BSKGUtils.bskgRoleAni1.visible = true;
                                game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);
                            };
                        }, this, 2000);
                        egret.setTimeout(function () {
                            CF.dP(ENo.BSKG_ENTER_FREE_GAME_SCENE, { isfast: _this.isFastGame });
                            _this["quitBtn"].visible = false;
                        }, this, 3100);
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
        BSKGScene1.prototype.addEachLineAni = function () {
            var _this = this;
            //非空判断
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                // if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) { this[`quitBtn`].touchEnabled = false; this.resetStartBtn(); }
                this.scroller.stopIconDb();
                var count_1 = 0;
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, function (index, callback) {
                    if (_this.isStopAni)
                        return;
                    _this.lineScoreGroup.visible = false;
                    for (var j = 0; j < index.length; j++) {
                        var k = j + 1;
                        _this.scroller["item" + k].resetIconHui(index[j]);
                        _this.scroller["item" + k].showAni(index[j]);
                        _this.commomScore.font = "bskg_win_num_mid_fnt";
                        var data = Number(new Big(_this.eachLineScore[count_1]).mul(100));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        _this.commomScore.verticalCenter = ((index[2] - 1)) * 149;
                        _this.commomScore.horizontalCenter = 0;
                        _this.commomScore.textAlign = "center";
                        _this.scroller.addChild(_this.commomScore);
                    }
                    //单一连线
                    if (_this.bonusAtr.length == 1) {
                        if (_this.scatter != 1)
                            _this.runningType = RUNNING_TYPE.EMPTY;
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
                        if (!Global.runBack) {
                            _this.sethuiTimeout = egret.setTimeout(function () {
                                // this.scroller.setIconHui();
                                game.UIUtils.removeSelf(_this.commomScore);
                            }, _this, 2000);
                        }
                        _this.showIconTimeOut = egret.setTimeout(callback, _this, 2300);
                    }
                    count_1++;
                }, function () {
                    //callback 判断结果是否为scatter
                    if (_this.scatter == 1) {
                        game.UIUtils.removeSelf(_this.commomScore);
                        _this.runningType = RUNNING_TYPE.STOP;
                        _this.scroller.removeIconHui(_this.HuiAtr);
                        SoundManager.getInstance().playEffect("bskg_scat_mp3");
                        _this.scroller.addFoGuang(1, _this.yudiAtr[0], "bskg_icon_2");
                        _this.scroller.addFoGuang(3, _this.yudiAtr[1], "bskg_icon_2");
                        _this.scroller.addFoGuang(5, _this.yudiAtr[2], "bskg_icon_2");
                        egret.setTimeout(function () {
                            game.BSKGUtils.screamLittleShake(_this.shakeGroup);
                        }, _this, 800);
                        egret.setTimeout(function () {
                            _this.scatterBoomAni.play("", 1);
                            SoundManager.getInstance().playEffect("bskg_role_happy_mp3");
                            _this.resizeGroup.addChild(_this.scatterBoomAni);
                            _this.scatterBoomAni.resetPosition();
                            game.BSKGUtils.screamShake(_this.shakeGroup);
                            game.BSKGUtils.bskgDust2.play("", 1);
                            _this.effectGroup.addChild(game.BSKGUtils.bskgDust2);
                            game.BSKGUtils.bskgDust2.resetPosition();
                            game.BSKGUtils.bskgRoleAni1.visible = false;
                            game.BSKGUtils.bskgRoleAni3.play("", 1);
                            SoundManager.getInstance().playEffect("bskg_role_cheer1_mp3");
                            _this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni3);
                            game.BSKGUtils.bskgRoleAni3.resetPosition();
                            game.BSKGUtils.bskgRoleAni3.callback = function () {
                                game.BSKGUtils.bskgRoleAni1.visible = true;
                                game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);
                            };
                        }, _this, 2000);
                        egret.setTimeout(function () {
                            CF.dP(ENo.BSKG_ENTER_FREE_GAME_SCENE, { isfast: _this.isFastGame });
                            _this.resetOtherBtn();
                            _this["quitBtn"].visible = false;
                        }, _this, 3100);
                        if (!game.LaohuUtils.isAutoGame)
                            _this.resetStartBtn();
                    }
                    else {
                        count_1 = 0;
                        // this.scroller.setIconHui();
                        game.UIUtils.removeSelf(_this.commomScore);
                        return _this.addEachLineAni();
                    }
                });
            }
        };
        BSKGScene1.prototype.freeTimeHandle = function (e) {
            switch (e) {
                case 20:
                    this.selectPeachs(0);
                    break;
                case 15:
                    this.selectPeachs(1);
                    break;
                case 10:
                    this.selectPeachs(2);
                    break;
                case 5:
                    this.selectPeachs(3);
                    break;
            }
        };
        /**
         * 选择免费游戏
         * @param  {number} index
         */
        BSKGScene1.prototype.selectPeachs = function (index) {
            return __awaiter(this, void 0, void 0, function () {
                var data2, resp, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.isSelected) return [3 /*break*/, 2];
                            SoundManager.getInstance().playEffect("bskg_select_mp3");
                            game.UIUtils.removeSelf(this.boxDefaultAin);
                            this.isSelected = true;
                            data2 = { "bonusIndex": index };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_selectBonusGame, data2)];
                        case 1:
                            resp = _a.sent();
                            game.BSKGUtils.freeTimes = resp.freeGameTimes;
                            game.BSKGUtils.freeWin = 0;
                            for (i = 0; i < resp.freeGameMuls.length; i++) {
                                game.BSKGUtils.FreeTimeMul.push(resp.freeGameMuls[i]);
                            }
                            this.boxSelectAni.play("", 2);
                            switch (index) {
                                case 0:
                                    this.box_20.source = "bskg_select1_3_png";
                                    this.group20.addChild(this.boxSelectAni);
                                    this.boxSelectAni.resetPosition();
                                    break;
                                case 1:
                                    this.box_15.source = "bskg_select2_2_png";
                                    this.group15.addChild(this.boxSelectAni);
                                    this.boxSelectAni.resetPosition();
                                    break;
                                case 2:
                                    this.box_10.source = "bskg_select3_2_png";
                                    this.group10.addChild(this.boxSelectAni);
                                    this.boxSelectAni.resetPosition();
                                    break;
                                case 3:
                                    this.box_5.source = "bskg_select4_2_png";
                                    this.group5.addChild(this.boxSelectAni);
                                    this.boxSelectAni.resetPosition();
                                    break;
                            }
                            ;
                            egret.setTimeout(function () {
                                CF.dP(ENo.BSKG_START_FREE_GAME_SCENE);
                            }, this, 2500);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 免费游戏回到正常游戏
         */
        BSKGScene1.prototype.free2Commom = function () {
            var _this = this;
            SoundManager.getInstance().playMusic("bskg_background_mus_mp3");
            if (this["quitBtn"]) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this["quitBtn"].visible = true;
                }
            }
            this.scroller.visible = this.bottomGroup.visible = this.gameGroup.visible = true;
            game.BSKGUtils.bskgRoleAni1.play("", 0);
            game.BSKGUtils.bskgRoleAni1.horizontalCenter = game.BSKGUtils.bskgRoleAni1.bottom = 0;
            this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni1);
            game.BSKGUtils.bskgRoleAni1.resetPosition();
            this.scatter = 0;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            this["quitBtn"].touchEnabled = true;
            this.scroller.speed = 48;
            this.addMouseOnEvent();
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "bskg_start1_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.BSKGUtils.freeWin >= game.LaohuUtils.oneMax) {
                game.LaohuUtils.auto_times = 0;
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.startBtn.source = "bskg_start1_png";
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
                    this.startBtn.source = "bskg_start1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
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
                    this.startBtn.source = "bskg_start1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    this.resetStartBtn();
                    return;
                }
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                game.UIUtils.removeSelf(this.spinDefaultAni);
                egret.setTimeout(function () { _this.startAutoGame(); }, this, 1000);
            }
            else {
                this.resetOtherBtn();
            }
            for (var i = 1; i <= 5; i++) {
                this.scroller["item" + i].showAllIcon();
            }
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.BSKGUtils.ToTalMoney) + "";
            this.ownGold = game.BSKGUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.LaohuUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.BSKGUtils.freeWin = 0;
        };
        /**
       * 设置最大倍数
       */
        BSKGScene1.prototype.setMaxBet = function () {
            var _this = this;
            //金币是否满足条件
            var bet = game.BSKGUtils.bets[4];
            var mul = game.BSKGUtils.muls[9];
            var data1 = Number(new Big(bet * mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.BSKGUtils.bet = game.BSKGUtils.bets[4];
            game.BSKGUtils.mul = game.BSKGUtils.muls[9];
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(game.BSKGUtils.bet * game.BSKGUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(game.BSKGUtils.bet * game.BSKGUtils.mul * 50) + "";
            this.bet = 10;
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            this["beishu"].text = parseInt(game.BSKGUtils.bet * game.BSKGUtils.mul * 100 + "") + "";
        };
        /**
         * 减少倍数
         */
        BSKGScene1.prototype.reduceBet = function () {
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
                        game.BSKGUtils.bet = game.BSKGUtils.bets[0];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[0];
                        break;
                    case 2:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[0];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[1];
                        break;
                    case 3:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[0];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[3];
                        break;
                    case 4:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[0];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[9];
                        break;
                    case 5:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[1];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[9];
                        break;
                    case 6:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[2];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[5];
                        break;
                    case 7:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[3];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[5];
                        break;
                    case 8:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[3];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[9];
                        break;
                    case 9:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[4];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[6];
                        break;
                    case 10:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[4];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[9];
                        break;
                }
            }
            this["betTtipsGroup"].visible = true;
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            this["beishu"].text = parseInt(game.BSKGUtils.bet * game.BSKGUtils.mul * 100 + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.BSKGUtils.bet * game.BSKGUtils.mul * 50)) + "";
            this["maxWinLabel"].text = "最高可得: " + parseInt(game.BSKGUtils.bet * game.BSKGUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        };
        /**
         * 增加倍数
         */
        BSKGScene1.prototype.addBetFunc = function () {
            var _this = this;
            //是否超出倍数范围
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[0];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[0];
                        break;
                    case 2:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[0];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[1];
                        break;
                    case 3:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[0];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[3];
                        break;
                    case 4:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[0];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[9];
                        break;
                    case 5:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[1];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[9];
                        break;
                    case 6:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[2];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[5];
                        break;
                    case 7:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[3];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[5];
                        break;
                    case 8:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[3];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[9];
                        break;
                    case 9:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[4];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[6];
                        break;
                    case 10:
                        game.BSKGUtils.bet = game.BSKGUtils.bets[4];
                        game.BSKGUtils.mul = game.BSKGUtils.muls[9];
                        break;
                }
            }
            this["beishu"].text = parseInt(game.BSKGUtils.bet * game.BSKGUtils.mul * 100 + "") + "";
            this["betTtipsGroup"].visible = true;
            this["maxWinLabel"].text = "最高可得: " + parseInt(game.BSKGUtils.bet * game.BSKGUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.BSKGUtils.bet * game.BSKGUtils.mul * 50)) + "";
            var data1 = Number(new Big(game.BSKGUtils.bet * game.BSKGUtils.mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                var text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.reduceBet();
            }
        };
        BSKGScene1.prototype.askAutoGame = function () {
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
        return BSKGScene1;
    }(game.BaseScene));
    bskg.BSKGScene1 = BSKGScene1;
    __reflect(BSKGScene1.prototype, "bskg.BSKGScene1");
})(bskg || (bskg = {}));
