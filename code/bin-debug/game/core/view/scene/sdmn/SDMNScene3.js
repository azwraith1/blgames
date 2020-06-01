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
 * @Date: 2019-05-27 18:43:59
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-28 17:14:26
 * @Description:
 */
var sdmn;
(function (sdmn) {
    var SDMNScene3 = (function (_super) {
        __extends(SDMNScene3, _super);
        function SDMNScene3() {
            var _this = _super.call(this) || this;
            _this.isSelected = false; //防止重复选择
            _this.isReconnect = true; //判断是否为断线重连
            _this.isMessaged = false; //防止重复发送免费旋转消息
            _this.freeWins = 0; //免费游戏总赢取
            _this.isFastGame = false;
            _this.commomScore = new eui.BitmapLabel();
            _this.skinName = "SDMNScene3Skin";
            return _this;
        }
        SDMNScene3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.SDMN_ENTER_FREE_GAME, this.enterFreeGame, this);
            CF.aE(ENo.SDMN_START_FREE_GAME, this.startFreeGame, this);
        };
        SDMNScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.SDMN_ENTER_FREE_GAME, this.enterFreeGame, this);
            CF.rE(ENo.SDMN_START_FREE_GAME, this.startFreeGame, this);
            this.scroller.removeScroller();
            this.removeMouseOnEvent();
            egret.clearTimeout(this.freeGameTimeOut);
            this.resizeGroup.removeChildren();
        };
        SDMNScene3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.role1.showRoleAni("sdmn_role1");
            this.role2.showRoleAni("sdmn_role2");
            this.role3.showRoleAni("sdmn_role3");
            this.role4.showRoleAni("sdmn_role4");
            var isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            this.freewinRole0 = DBComponent.create("sdmn_sdmn_win_role0", "sdmn_win_role1");
            this.freewinRole1 = DBComponent.create("sdmn_sdmn_win_role1", "sdmn_win_role2");
            this.freewinRole2 = DBComponent.create("sdmn_sdmn_win_role2", "sdmn_win_role3");
            this.freewinRole3 = DBComponent.create("sdmn_sdmn_win_role3", "sdmn_win_role4");
            this.freewinBeiAni = DBComponent.create("sdmn_freewinBeiAni", "sdmn_freebei_ani");
            this.selectLeaveAni = DBComponent.create("sdmn_selectLeaveAni", "sdmn_select3");
            this.rolewenzi0 = DBComponent.create("sdmn_role1wenzi", "sdmn_role1_wenzi");
            this.rolewenzi1 = DBComponent.create("sdmn_role2wenzi", "sdmn_role2_wenzi");
            this.rolewenzi2 = DBComponent.create("sdmn_role3wenzi", "sdmn_role3_wenzi");
            this.rolewenzi3 = DBComponent.create("sdmn_role4wenzi", "sdmn_role4_wenzi");
            this.rolewenzi0.horizontalCenter = -450;
            this.rolewenzi0.bottom = 320;
            this.rolewenzi1.horizontalCenter = -450;
            this.rolewenzi1.bottom = 350;
            this.rolewenzi2.horizontalCenter = -450;
            this.rolewenzi2.bottom = 330;
            this.rolewenzi3.horizontalCenter = -450;
            this.rolewenzi3.bottom = 350;
            this.selectLeaveAni.horizontalCenter = 9;
            this.selectLeaveAni.bottom = 0;
            // this.freewinRole0.scaleX = this.freewinRole0.scaleY = 2;
            this.freewinRole0.bottom = this.freewinRole1.bottom = this.freewinRole2.bottom = this.freewinRole3.bottom = 100;
            this.freewinRole0.horizontalCenter = this.freewinRole1.horizontalCenter = this.freewinRole2.horizontalCenter = this.freewinRole3.horizontalCenter = -500;
            this.selectAni = DBComponent.create("sdmn_selectAni", "sdmn_select2");
            this.scroller.showFreeFirst(3);
        };
        /**
         * 鼠标悬浮动画
         */
        SDMNScene3.prototype.addMouseOnEvent = function () {
            var _this = this;
            this.rect1.addEventListener(mouse.MouseEvent.MOUSE_OVER, function () { _this.mouseOverHandle(1); }, this);
            this.rect1.addEventListener(mouse.MouseEvent.MOUSE_OUT, function () { _this.mouseOutHandle(1); }, this);
            this.rect2.addEventListener(mouse.MouseEvent.MOUSE_OVER, function () { _this.mouseOverHandle(2); }, this);
            this.rect2.addEventListener(mouse.MouseEvent.MOUSE_OUT, function () { _this.mouseOutHandle(2); }, this);
            this.rect3.addEventListener(mouse.MouseEvent.MOUSE_OVER, function () { _this.mouseOverHandle(3); }, this);
            this.rect3.addEventListener(mouse.MouseEvent.MOUSE_OUT, function () { _this.mouseOutHandle(3); }, this);
            this.rect4.addEventListener(mouse.MouseEvent.MOUSE_OVER, function () { _this.mouseOverHandle(4); }, this);
            this.rect4.addEventListener(mouse.MouseEvent.MOUSE_OUT, function () { _this.mouseOutHandle(4); }, this);
        };
        SDMNScene3.prototype.removeMouseOnEvent = function () {
            var _this = this;
            this.rect1.removeEventListener(mouse.MouseEvent.MOUSE_OVER, function () { _this.mouseOverHandle(1); }, this);
            this.rect1.removeEventListener(mouse.MouseEvent.MOUSE_OUT, function () { _this.mouseOutHandle(1); }, this);
            this.rect2.removeEventListener(mouse.MouseEvent.MOUSE_OVER, function () { _this.mouseOverHandle(2); }, this);
            this.rect2.removeEventListener(mouse.MouseEvent.MOUSE_OUT, function () { _this.mouseOutHandle(2); }, this);
            this.rect3.removeEventListener(mouse.MouseEvent.MOUSE_OVER, function () { _this.mouseOverHandle(3); }, this);
            this.rect3.removeEventListener(mouse.MouseEvent.MOUSE_OUT, function () { _this.mouseOutHandle(3); }, this);
            this.rect4.removeEventListener(mouse.MouseEvent.MOUSE_OVER, function () { _this.mouseOverHandle(4); }, this);
            this.rect4.removeEventListener(mouse.MouseEvent.MOUSE_OUT, function () { _this.mouseOutHandle(4); }, this);
        };
        /**
         * 鼠标悬浮动画
         * @param  {number} num
         */
        SDMNScene3.prototype.mouseOverHandle = function (num) {
            if (!this.isSelected) {
                this["roleSelectbg" + num].visible = true;
            }
        };
        /**
         * 鼠标移除动画
         * @param  {number} num
         */
        SDMNScene3.prototype.mouseOutHandle = function (num) {
            if (!this.isSelected) {
                this["roleSelectbg" + num].visible = false;
            }
        };
        /**
      * 进入免费游戏效果
      */
        SDMNScene3.prototype.enterFreeGame = function (e) {
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            SoundManager.getInstance().playMusic("sdmn_sactbackground_mus_mp3");
            if (game.LaohuUtils.free_time_times != 0) {
                switch (game.LaohuUtils.free_time_times + "") {
                    case "20":
                        this.selectPeachs(0);
                        break;
                    case "15":
                        this.selectPeachs(1);
                        break;
                    case "10":
                        this.selectPeachs(2);
                        break;
                    case "5":
                        this.selectPeachs(3);
                        break;
                }
            }
        };
        /**
         * 点击事件
         * @param  {egret.TouchEvent} e
         */
        SDMNScene3.prototype.onTouchTap = function (e) {
            /**
             * 已选择免费次数 退出
             */
            if (game.LaohuUtils.free_time_times != 0) {
                return;
            }
            switch (e.target) {
                case this["rect1"]:
                    this.selectPeachs(0);
                    break;
                case this["rect2"]:
                    this.selectPeachs(1);
                    break;
                case this["rect3"]:
                    this.selectPeachs(2);
                    break;
                case this["rect4"]:
                    this.selectPeachs(3);
                    break;
            }
        };
        /**
        * 发送选择桃子index
        * @param  {number} index
        */
        SDMNScene3.prototype.selectPeachs = function (index) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.isSelected) return [3 /*break*/, 2];
                            this.isSelected = true;
                            data2 = { "bonusIndex": index };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_selectBonusGame, data2)];
                        case 1:
                            resp = _a.sent();
                            this.freeTimes = resp.freeGameTimes;
                            game.SDMNUtils.freeTimes = this.freeTimes;
                            game.SDMNUtils.freeWin = 0;
                            this.freeTimesLabel.text = this.freeTimes + "";
                            for (i = 0; i < resp.freeGameMuls.length; i++) {
                                game.SDMNUtils.FreeTimeMul.push(resp.freeGameMuls[i]);
                            }
                            this.freemul0.text = resp.freeGameMuls[0] + "";
                            this.freemul1.text = resp.freeGameMuls[1] + "";
                            this.freemul2.text = resp.freeGameMuls[2] + "";
                            this.isReconnect = false;
                            this.selectAni.bottom = this.selectAni.top = 0;
                            switch (index) {
                                case 0:
                                    this.selectAni.play("", 1);
                                    this.selectAni.horizontalCenter = -470;
                                    this.selectAniGroup.addChild(this.selectAni);
                                    this.selectAni.resetPosition();
                                    break;
                                case 1:
                                    this.selectAni.play("", 1);
                                    this.selectAni.top = -10;
                                    this.selectAni.horizontalCenter = -150;
                                    this.selectAniGroup.addChild(this.selectAni);
                                    this.selectAni.resetPosition();
                                    break;
                                case 2:
                                    this.selectAni.play("", 1);
                                    this.selectAni.horizontalCenter = 160;
                                    this.selectAniGroup.addChild(this.selectAni);
                                    this.selectAni.resetPosition();
                                    break;
                                case 3:
                                    this.selectAni.play("", 1);
                                    this.selectAni.horizontalCenter = 480;
                                    this.selectAniGroup.addChild(this.selectAni);
                                    this.selectAni.resetPosition();
                                    break;
                            }
                            SoundManager.getInstance().playEffect("sdmn_freegame_3_mp3");
                            this.index = index;
                            this.roleSelectAni(index);
                            this.roleEffectGroup.addChild(this["freewinRole" + this.index]);
                            this["freewinRole" + this.index].resetPosition();
                            this.roleEffectGroup.addChild(this["rolewenzi" + this.index]);
                            this["rolewenzi" + this.index].resetPosition();
                            this.freeBgAni = DBComponent.create("sdmn_freebgAni" + index, "sdmn_freebg" + (index + 2));
                            this.freeBgAni.horizontalCenter = 0;
                            this.freeBgAni.bottom = 0;
                            this.freeBgAni.play("", 0);
                            this["bgEffectGroup"].addChild(this.freeBgAni);
                            this.freeBgAni.resetPosition();
                            this.freebg.source = RES.getRes("sdmn_freebg" + (index + 1) + "_png");
                            this.gameBg.source = "sdmn_freebg_" + index + "_png";
                            egret.setTimeout(function () {
                                game.UIUtils.removeSelf(_this.selectAni);
                                _this.selectGroup.visible = false;
                                _this.startFreeGame();
                            }, this, 3330);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 正常流程开始游戏&&重连后继续免费游戏
         */
        SDMNScene3.prototype.startFreeGame = function () {
            this.freeGroup.visible = true;
            this.selectGroup.visible = false;
            this.selectLeaveAni.play("", 1);
            this.resizeGroup.addChild(this.selectLeaveAni);
            this.selectLeaveAni.resetPosition();
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            if (!this.isReconnect) {
                switch (this.index) {
                    case 0:
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_01_mp3");
                        break;
                    case 1:
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_02_mp3");
                        break;
                    case 2:
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_03_mp3");
                        break;
                    case 3:
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_04_mp3");
                        break;
                }
                egret.setTimeout(this.playFreeGame, this, 1500);
            }
            else {
                this.freeWins = game.LaohuUtils.freeWin;
                this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                this.freeTimes = game.LaohuUtils.freeTimes;
                this.freeTimesLabel.text = this.freeTimes + "";
                this.freemul0.text = game.SDMNUtils.FreeTimeMul[0] + "";
                this.freemul1.text = game.SDMNUtils.FreeTimeMul[1] + "";
                this.freemul2.text = game.SDMNUtils.FreeTimeMul[2] + "";
                var index = void 0;
                switch (game.SDMNUtils.FreeTimeMul[0]) {
                    case 2:
                        this.index = 0;
                        index = 0;
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_01_mp3");
                        break;
                    case 3:
                        this.index = 1;
                        index = 1;
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_02_mp3");
                    case 5:
                        this.index = 2;
                        index = 2;
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_03_mp3");
                        break;
                    case 10:
                        this.index = 3;
                        index = 3;
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_04_mp3");
                        break;
                }
                this.roleEffectGroup.addChild(this["freewinRole" + this.index]);
                this["freewinRole" + this.index].resetPosition();
                this.freeBgAni = DBComponent.create("sdmn_freebgAni" + index, "sdmn_freebg" + (index + 2));
                this.freeBgAni.horizontalCenter = 0;
                this.freeBgAni.bottom = 0;
                this.freeBgAni.play("", 0);
                this["bgEffectGroup"].addChild(this.freeBgAni);
                this.freeBgAni.resetPosition();
                this.freebg.source = RES.getRes("sdmn_freebg" + (index + 1) + "_png");
                this.gameBg.source = "sdmn_freebg_" + index + "_png";
                this.selectGroup.visible = false;
                egret.setTimeout(this.playFreeGame, this, 3000);
            }
        };
        /**
         * 选择次数后播放角色动画
         */
        SDMNScene3.prototype.roleSelectAni = function (index) {
            this["role" + (index + 1)].roleAni(index);
        };
        /**
         * 免费游戏旋转，次数判断
         */
        SDMNScene3.prototype.playFreeGame = function () {
            var _this = this;
            //防止重复发消息
            if (!this.isMessaged) {
                this.removeLastAni();
                if (this.freeTimes <= 0) {
                    this.freeTimesLabel.text = 0 + "";
                    LogUtils.logD(this.freeTimes + "   freetime");
                    this.showTotalwin();
                    return;
                }
                this.isMessaged = true;
                this.freeTimes -= 1;
                this.freeTimesLabel.text = this.freeTimes + "";
                this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("sdmn_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                    egret.setTimeout(function () { _this.isMessaged = false; }, _this, 600);
                }, this, 500);
                // if (this.isFastGame) {
                //     this.askAutoGame();
                // }
            }
        };
        /**
         * 上次动画移除
         */
        SDMNScene3.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                game.UIUtils.removeSelf(this.commomScore);
                // this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
            }
            this.scroller.stopIconDb();
        };
        /**
         * 发送免费游戏旋转消息
         */
        SDMNScene3.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, resp1, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [];
                            this.bonusAtr = [];
                            this.winGold = 0;
                            data2 = { "spinType": 1, "bet": game.SDMNUtils.bet, "multiple": game.SDMNUtils.mul, "lineCount": 243, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_SDMN);
                                SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                                return [2 /*return*/];
                            }
                            resp1 = resp2.spinRes[0];
                            if (resp1.rmIndex) {
                                for (i in resp1.rmIndex) {
                                    this.bonusAtr.push(resp1.rmIndex[i]);
                                }
                            }
                            else {
                                this.bonusAtr = [];
                            }
                            this.winGold = resp2.winCount;
                            this.freeMulIndex = resp1.freeMulIndex;
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
                            this.freeWins += this.winGold;
                            this.freeMulBei = resp1.freeMul;
                            game.SDMNUtils.ToTalMoney = resp2.own_gold;
                            egret.setTimeout(function () {
                                _this.scroller.runResult(_this.showAtr);
                                if (_this.isFastGame) {
                                    _this.scroller.runResultFast();
                                }
                            }, this, 100);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 各个转轴结束监听
         * @param  {egret.Event} e
         */
        SDMNScene3.prototype.scrollerEnd = function (e) {
            var data = e.data;
            //场景id判断
            if (data.sceneIndex != 3) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 15) {
                            // egret.setTimeout(() => { this.lineScoreGroup.visible = false; this.removeLastAni(); }, this, 1600);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 3500);
                    }
                    else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 1000);
                    }
                    this.addFreeBonusAni();
                    this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
            }
        };
        /**
         * 免费游戏中奖连线
         */
        SDMNScene3.prototype.addFreeBonusAni = function () {
            var _this = this;
            //判断是否为bigwin
            if (this.winGold >= (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 15) {
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
                            // this.scroller.setIconHui();
                            // this.scroller.removeIconHui(this.bonusAtr);
                            _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                            _this.addTittleMul();
                            egret.clearTimeout(_this.freeGameTimeOut);
                            _this.freeGameTimeOut = egret.setTimeout(function () {
                                _this.playFreeGame();
                            }, _this, 3500);
                        });
                    };
                    this.bigWinPanel = new sdmn.SDMNBigwinPanel();
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
                        // this.scroller.setIconHui();
                        // this.scroller.removeIconHui(this.bonusAtr);
                        _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                        _this.addTittleMul();
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        _this.freeGameTimeOut = egret.setTimeout(_this.playFreeGame, _this, 3500);
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            else if (this.bonusAtr.length > 0 && this.winGold > 0) {
                SoundManager.getInstance().playEffect("sdmn_win_mp3");
                // this.scroller.setIconHui();
                // this.scroller.removeIconHui(this.bonusAtr);
                this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                this.addTittleMul();
            }
            // }
        };
        /**
         * 四大美女免费游戏倍数效果
         */
        SDMNScene3.prototype.addTittleMul = function () {
            var _this = this;
            this.commomScore.font = "sdmn_wingold_big_fnt";
            this.scoreAni = DBComponent.create("sdmn_scoreAni2", "sdmn_win_gunang");
            this.scoreAni2 = DBComponent.create("sdmn_scoreAni", "sdxl_gold_diguang");
            this.scoreAni2.horizontalCenter = this.scoreAni.horizontalCenter = 0;
            this.scoreAni.bottom = 130;
            this.scoreAni2.bottom = 120;
            var data = Number(new Big(this.winGold).mul(100).div(this.freeMulBei));
            this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
            this.commomScore.textAlign = "center";
            this.commomScore.verticalCenter = 0;
            this.commomScore.horizontalCenter = 0;
            this["scoreGroup"].addChild(this.commomScore);
            this.scoreAni2.play("", 1);
            this.scroller.addChild(this.scoreAni2);
            this.scoreAni2.resetPosition();
            this["freewinRole" + this.index].play("", 1);
            this["freewinRole" + this.index].callback = function () {
                _this.roleEffectGroup.addChild(_this["freewinRole" + _this.index]);
                _this["freewinRole" + _this.index].resetPosition();
                _this["rolewenzi" + _this.index].bottom = 95;
                _this.roleEffectGroup.addChild(_this["rolewenzi" + _this.index]);
                _this["rolewenzi" + _this.index].resetPosition();
            };
            this["rolewenzi" + this.index].play("", 1);
            SoundManager.getInstance().playEffect("sdmn_mulhighlight_mp3");
            this.freewinBeiAni.bottom = 6;
            this.freewinBeiAni.horizontalCenter = (this.freeMulIndex - 1) * 78;
            this.freewinBeiAni.play("", 1);
            this["freeMulAniGroup"].addChild(this.freewinBeiAni);
            this.freewinBeiAni.resetPosition();
            egret.Tween.get(this["bei" + this.freeMulIndex])
                .to({ scaleX: 1.2, scaleY: 1.2 }, 400)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 200)
                .to({ scaleX: 4.1, scaleY: 4.1, horizontalCenter: 0 }, 100, egret.Ease.sineIn)
                .to({ scaleX: 4, scaleY: 4 }, 80)
                .call(function () {
                egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("sdmn_mul_flying_mp3");
                    egret.Tween.get(_this["bei" + _this.freeMulIndex]).to({ horizontalCenter: 560, bottom: 230 }, 500, egret.Ease.sineOut)
                        .call(function () {
                        var data2 = Number(new Big(data).mul(_this.freeMulBei));
                        _this.commomScore.text = NumberFormat.handleFloatDecimal(data2) + "";
                        SoundManager.getInstance().playEffect("sdmn_win_mp3");
                        egret.Tween.get(_this.commomScore).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 80);
                        _this.scoreAni.play("", 1);
                        _this.scroller.addChild(_this.scoreAni);
                        _this.scoreAni.resetPosition();
                        _this["scoreGroup"].addChild(_this.commomScore);
                        //倍数位置对应的横坐标位置
                        var horizontalCenterPosition = 0;
                        switch (_this.freeMulIndex) {
                            case 0:
                                horizontalCenterPosition = -78;
                                break;
                            case 1:
                                horizontalCenterPosition = 0;
                                break;
                            case 2:
                                horizontalCenterPosition = 78;
                                break;
                        }
                        egret.Tween.get(_this["bei" + _this.freeMulIndex]).to({ horizontalCenter: horizontalCenterPosition, bottom: 20, scaleX: 1, scaleY: 1 }, 10);
                    });
                }, _this, 500);
            });
        };
        /**
        * 免费游戏结束，初始化免费游戏场景
        */
        SDMNScene3.prototype.showTotalwin = function () {
            var _this = this;
            this["totalGroup"].visible = true;
            this["totalWin"].text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            game.SDMNUtils.freeWin = this.freeWins;
            this.isSelected = false;
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playEffect("sdmn_scat_win_mp3");
            this["roleSelectbg4"].visible = this["roleSelectbg3"].visible = this["roleSelectbg2"].visible = this["roleSelectbg1"].visible = false;
            egret.setTimeout(function () {
                _this.freeWins = 0;
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(_this["freewinRole" + _this.index]);
                _this.freewinLabel.text = 0 + "";
                _this.selectGroup.visible = true;
                _this.freeGroup.visible = false;
                _this["totalGroup"].visible = false;
                game.UIUtils.removeSelf(_this.freeBgAni);
                CF.dP(ENo.SDMN_QUIT_FREE_GAME);
            }, this, 8000);
        };
        SDMNScene3.prototype.askAutoGame = function () {
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
                    SoundManager.getInstance().playEffect("sdmn_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                }, _this, 500);
            };
            var func2 = function () {
                _this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("sdmn_reel_mp3", true);
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
        return SDMNScene3;
    }(game.BaseScene));
    sdmn.SDMNScene3 = SDMNScene3;
    __reflect(SDMNScene3.prototype, "sdmn.SDMNScene3");
})(sdmn || (sdmn = {}));
