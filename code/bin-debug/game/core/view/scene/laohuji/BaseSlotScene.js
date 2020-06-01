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
 * @Date: 2019-07-16 13:49:06
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-03 17:29:34
 * @Description: slot基类
 */
var game;
(function (game) {
    var BaseSlotScene = (function (_super) {
        __extends(BaseSlotScene, _super);
        function BaseSlotScene() {
            var _this = _super.call(this) || this;
            _this.HuiAtr = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
            _this.clickTime = 0;
            _this.isFastGame = false;
            _this.i = 0;
            _this.j = 0;
            /**
             * 中奖数组的元素（数组）
             */
            _this.atr1 = [];
            /**
             * 中奖数组的数组的元素
             */
            _this.atr2 = [];
            /**
             * 中奖连线对象的存储数组
             */
            _this.aniPool = [];
            /**
             * 是否停止添加连线
             */
            _this.isStopLine = false;
            _this.lineImaPool = [];
            _this.lineTime = 1500;
            return _this;
        }
        BaseSlotScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            this.addDesk();
        };
        BaseSlotScene.prototype.addDesk = function () {
            var _this = this;
            if (this.sceneId < 1016 && this.sceneId > 1010) {
                this.deskMate = slot.SlotDeskMate.instance;
                this.deskMate.right = 0;
                this.deskMate.verticalCenter = -50;
                this.deskMate.openrect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDesk, this);
                this.deskMate.openrect.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.touchOn, this);
                this.deskMate.openrect.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.touchOff, this);
                this.resizeGroup.addChild(this.deskMate);
                this.closeDeskTimeOut = egret.setTimeout(function () {
                    egret.Tween.get(_this.deskMate).to({ right: -180 }, 500, egret.Ease.quadOut).call(function () {
                        _this.deskMate.deskopen.source = "slot_hall_opendesk_png";
                    });
                }, this, 5000);
            }
        };
        BaseSlotScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            if (this.sceneId < 1016 && this.sceneId > 1010) {
                CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
                CF.aE(ServerNotify.s_playerQuitRoom, this.playerQuit, this);
                CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
                CF.aE(ServerNotify.s_playerBigWin, this.deskmateBigwin, this);
            }
        };
        BaseSlotScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            if (this.sceneId < 1016 && this.sceneId > 1010) {
                CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
                CF.rE(ServerNotify.s_playerQuitRoom, this.playerQuit, this);
                CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
                this.deskMate.openrect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openDesk, this);
                this.deskMate.openrect.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.touchOn, this);
                this.deskMate.openrect.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.touchOff, this);
                CF.rE(ServerNotify.s_playerBigWin, this.deskmateBigwin, this);
                this.clearDeskArray();
            }
        };
        BaseSlotScene.prototype.clearDeskArray = function () {
            game.LaohuUtils.slotDeskGid = [];
            game.LaohuUtils.slotDeskHead = [];
            game.LaohuUtils.slotDeskName = [];
            game.LaohuUtils.playerEnter = {
                gid: 0, head: "", name: ""
            };
        };
        BaseSlotScene.prototype.enterGame = function (e) {
        };
        BaseSlotScene.prototype.deskmateBigwin = function (e) {
            var _this = this;
            var data = e.data;
            var _loop_1 = function (i) {
                if (game.LaohuUtils.slotDeskGid[i] == data.playerIndex) {
                    if (!this_1.deskMate.visible)
                        return { value: void 0 };
                    var slotdeskwin_1 = slot.SlotDeskWinIten.instance;
                    egret.Tween.get(slotdeskwin_1).to({ scaleX: 0, scaleY: 0 }, 10).to({
                        scaleX: 0.6, scaleY: 0.6
                    }, 300, egret.Ease.sineInOut);
                    slotdeskwin_1.showWin(data);
                    this_1.deskMate.visible = false;
                    this_1.deskMate.right = -180;
                    slotdeskwin_1.right = 0;
                    slotdeskwin_1.verticalCenter = -200;
                    this_1.resizeGroup.addChild(slotdeskwin_1);
                    egret.setTimeout(function () {
                        egret.Tween.get(slotdeskwin_1).to({ scaleX: 0.6, scaleY: 0.6 }, 10).to({
                            scaleX: 0, scaleY: 0
                        }, 300, egret.Ease.sineInOut).call(function () {
                            slotdeskwin_1.remove();
                        });
                        _this.deskMate.visible = true;
                        _this.deskMate.deskopen.source = "slot_hall_opendesk_png";
                    }, this_1, 8000);
                    egret.clearTimeout(this_1.closeDeskTimeOut);
                }
            };
            var this_1 = this;
            for (var i = 0; i < game.LaohuUtils.slotDeskGid.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        };
        BaseSlotScene.prototype.playerQuit = function (e) {
            var player = e.data;
            game.LaohuUtils.playerEnter = {
                gid: player.playerIndex,
                name: "",
                head: ""
            };
            this.deskMate.playerLeave();
        };
        BaseSlotScene.prototype.playerEnter = function (e) {
            var player = e.data;
            if (player.player.uid == Global.playerProxy.playerData.id)
                return;
            game.LaohuUtils.playerEnter = {
                gid: player.playerIndex,
                name: player.player.nickname,
                head: "hall_header_" + player.player.sex + "_" + player.player.figureUrl + "_png"
            };
            this.deskMate.playerEnter();
        };
        BaseSlotScene.prototype.openDesk = function () {
            var _this = this;
            egret.clearTimeout(this.closeDeskTimeOut);
            if (this.deskMate.right == 0) {
                egret.Tween.get(this.deskMate).to({ right: -180 }, 500, egret.Ease.quadOut).call(function () {
                    _this.deskMate.deskopen.source = "slot_hall_opendesk_png";
                });
            }
            else if (this.deskMate.right == -180) {
                egret.Tween.get(this.deskMate).to({ right: 0 }, 500, egret.Ease.quadOut).call(function () {
                    _this.deskMate.deskopen.source = "slot_hall_closedesk_png";
                });
            }
        };
        BaseSlotScene.prototype.touchOn = function () {
            this.deskMate.touchOn();
        };
        BaseSlotScene.prototype.touchOff = function () {
            this.deskMate.touchOff();
        };
        /**
        * 鼠标手势监听函数
        */
        BaseSlotScene.prototype.addMouseOnEvent = function () {
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
        /**
         * 鼠标手势监听移除
         */
        BaseSlotScene.prototype.removeEvent = function () {
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
         * 菜单按钮悬浮效果
         */
        BaseSlotScene.prototype.changeMenuBtn = function () {
            this.memuBtn.currentState = "down";
        };
        /**
         * 菜单按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changeMenuBtn2 = function () {
            this.memuBtn.currentState = "up";
        };
        /**
         * 设置按钮悬浮效果
         */
        BaseSlotScene.prototype.changesettingBtn = function () {
            this.setingBtn.currentState = "down";
        };
        /**
         * 设置按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changesettingBtn2 = function () {
            this.setingBtn.currentState = "up";
        };
        /**
         * 赔付表按钮悬浮效果
         */
        BaseSlotScene.prototype.changetipsBtn = function () {
            this.tipsBtn.currentState = "down";
        };
        /**
         * 赔付表按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changetipsBtn2 = function () {
            this.tipsBtn.currentState = "up";
        };
        /**
         * 加注按钮悬浮效果
         */
        BaseSlotScene.prototype.changeBetAddBtn = function () {
            var _this = this;
            this.addbet.currentState = "down";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            if (this.sceneId <= 1010) {
                this.betTtipsGroup.visible = true;
                this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * this.utilsBet * 4000 + "");
                "";
            }
            else if (this.sceneId >= 1016) {
                // "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            }
        };
        /**
         * 加注按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changeBetAddBtn2 = function () {
            this.addbet.currentState = "up";
        };
        /**
         * 减注按钮悬浮效果
         */
        BaseSlotScene.prototype.changeBetSubBtn = function () {
            var _this = this;
            this.subbet.currentState = "down";
            egret.setTimeout(function () { _this["betTtipsGroup"].visible = false; }, this, 5000);
            if (this.sceneId <= 1010) {
                this.betTtipsGroup.visible = true;
                this["maxWinLabel"].text = "最高可得: " + parseInt(0.1 * this.utilsBet * 4000 + "");
                "";
            }
            else if (this.sceneId >= 1016) {
                // "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            }
        };
        /**
         * 减注按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changeBetSubBtn2 = function () {
            this.subbet.currentState = "up";
        };
        /**
         * maxbet按钮悬浮效果
         */
        BaseSlotScene.prototype.changeyazhuBtn = function () {
            this.maxBet.source = RES.getRes("ayls_bet2_png");
        };
        /**
         * maxbet按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changeyazhuBtn2 = function () {
            this.maxBet.source = RES.getRes("ayls_bet1_png");
        };
        /**
         * 自动游戏按钮悬浮效果
         */
        BaseSlotScene.prototype.changeAutoRunBtn = function () {
            this.autoGameBtn.currentState = "down";
        };
        /**
         * 自动游戏按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changeAutoRunBtn2 = function () {
            this.autoGameBtn.currentState = "up";
        };
        /**
         * 游戏记录按钮悬浮效果
         */
        BaseSlotScene.prototype.changeGameRecord = function () {
            this.recordBtn.currentState = "down";
        };
        /**
         * 游戏记录按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changeGameRecord2 = function () {
            this.recordBtn.currentState = "up";
        };
        /**
         * 退出游戏按钮悬浮效果
         */
        BaseSlotScene.prototype.changeOutBtn = function () {
            this["quitBtn"].currentState = "donw";
        };
        /**
         * 退出游戏按钮悬浮效果移除
         */
        BaseSlotScene.prototype.changeOutBtn2 = function () {
            this["quitBtn"].currentState = "up";
        };
        BaseSlotScene.prototype.onTouchTap = function (e) {
            event.stopPropagation();
            switch (e.target) {
                case this.quitBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    if (game.LaohuUtils.isAutoGame)
                        return;
                    CF.sN(this.QUIT_NOTIFY);
                    break;
                case this.setingBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    this.menuGroup.visible = false;
                    CF.sN(this.SETING_NOTIFY);
                    break;
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    CF.sN(this.TIPS_NOTIFY);
                    break;
                case this.autoGameBtn:
                    if (this.sceneId <= 1010) {
                        if (this.utilsTotalMoney < this.utilsBet * 2) {
                            Global.alertMediator.addAlert("金币不足", function () {
                            }, "", true);
                            return;
                        }
                    }
                    else if (this.sceneId >= 1011) {
                        if (this.utilsTotalMoney < this.utilsBet * 0.5) {
                            Global.alertMediator.addAlert("金币不足", function () {
                            }, "", true);
                            return;
                        }
                    }
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    CF.sN(this.AUTOGAME_NOTIFY);
                    break;
                case this.recordBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    this.menuGroup.visible = false;
                    CF.sN(this.RECORD_NOTIFY);
                    break;
                case this.memuBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    if (this["menuGroup"].visible == false) {
                        this["menuGroup"].visible = true;
                    }
                    else {
                        this["menuGroup"].visible = false;
                    }
                    break;
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        };
        /**
       * 开始游戏发送请求
       */
        BaseSlotScene.prototype.startGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp1, data, resp, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                        case 1:
                            resp1 = _a.sent();
                            data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": this.sceneId };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 2:
                            resp = _a.sent();
                            if (resp) {
                                if (resp.error.code != 0) {
                                    text = resp.error.msg;
                                    CF.sN(this.CLOSE_NOTIFY);
                                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                    Global.alertMediator.addAlert(text, function () {
                                    }, "", true);
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                CF.sN(this.CLOSE_NOTIFY);
                                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 功能按钮效果还原
         */
        BaseSlotScene.prototype.resetOtherBtn = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.recordBtn.filters = this.setingBtn.filters = this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this.setingBtn.touchEnabled = this.recordBtn.touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = true;
            if (!game.LaohuUtils.isAutoGame)
                this["quitBtn"].touchEnabled = true;
        };
        /**
        * 功能按钮屏蔽效果
        */
        BaseSlotScene.prototype.setOtherBtn = function () {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.recordBtn.filters = this.setingBtn.filters = this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this.setingBtn.touchEnabled = this.recordBtn.touchEnabled = this.quitBtn.touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = false;
        };
        BaseSlotScene.prototype.startBtnTouch0 = function () {
        };
        /**
         * 中奖连线
         * @param  {Array<Array<number>>} str
         * @param  {egret.DisplayObject} object
         */
        BaseSlotScene.prototype.winLine = function (object, str) {
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
        BaseSlotScene.prototype.allLineHanlde = function (object, atr) {
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
        BaseSlotScene.prototype.eachLineHandle = function (object, atr) {
            if (atr)
                this.atr2 = atr;
            if (!this.isStopLine) {
                if (this.i < this.atr2.length - 1) {
                    /**
                     * 前一列减后一列取绝对值决定使用哪种线
                     */
                    switch (Math.abs(this.atr2[this.i] - this.atr2[this.i + 1])) {
                        case 2:
                            this.hugeLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 1:
                            this.bigLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 0:
                            this.midLineHandle(object, this.atr2[this.i]);
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
        BaseSlotScene.prototype.routationHandle = function (num) {
            /**
             * icon的宽/高取arctan值得到线动画rotation属性
             */
            if (num == 2) {
                return this.lineAniRotation[0];
            }
            else if (num == -2) {
                return this.lineAniRotation[1];
            }
            else if (num == 1) {
                return this.lineAniRotation[2];
            }
            else if (num == -1) {
                return this.lineAniRotation[3];
            }
            else if (num == 0) {
                return 0;
            }
        };
        /**
         * 长连线播放
         */
        BaseSlotScene.prototype.hugeLineHandle = function (object, position, postion2) {
            var _this = this;
            var rdsgLineHuge = new DBComponent(this.lineHuge);
            rdsgLineHuge.play(this.lineHuge + "_begin", 1);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineHuge.rotation = this.routationHandle(2);
                rdsgLineHuge.bottom = this.aniPositionYHandle(position, this.fixpositionY[0]);
            }
            else {
                rdsgLineHuge.rotation = this.routationHandle(-2);
                rdsgLineHuge.bottom = this.aniPositionYHandle(position, this.fixpositionY[1]);
            }
            rdsgLineHuge.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineHuge.callback = function () {
                rdsgLineHuge.play(_this.lineHuge + "_common", 0);
                _this.eachLineHandle();
            };
            this.winLineGroup.addChild(rdsgLineHuge);
            rdsgLineHuge.anchorOffsetY = rdsgLineHuge.height / 2;
            rdsgLineHuge.resetPosition();
            this.aniPool.push(rdsgLineHuge);
        };
        /**
         * 中连线播放
         */
        BaseSlotScene.prototype.bigLineHandle = function (object, position, position2) {
            var _this = this;
            var rdsgLineBig = new DBComponent(this.lineBig);
            rdsgLineBig.play(this.lineBig + "_begin", 1);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineBig.rotation = this.routationHandle(1);
                if (this.fixpositionY[3]) {
                    rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[3]);
                }
                else {
                    rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[2]);
                }
            }
            else {
                rdsgLineBig.rotation = this.routationHandle(-1);
                rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[2]);
            }
            rdsgLineBig.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineBig.callback = function () {
                rdsgLineBig.play(_this.lineBig + "_common", 0);
                _this.eachLineHandle();
            };
            this.winLineGroup.addChild(rdsgLineBig);
            rdsgLineBig.anchorOffsetY = rdsgLineBig.height / 2;
            rdsgLineBig.resetPosition();
            this.aniPool.push(rdsgLineBig);
        };
        /**
         * 短连线播放
         */
        BaseSlotScene.prototype.midLineHandle = function (object, position) {
            var _this = this;
            var rdsgLineMid = new DBComponent(this.lineMid);
            rdsgLineMid.play(this.lineMid + "_begin", 1);
            rdsgLineMid.bottom = this.aniPositionYHandle(position);
            rdsgLineMid.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineMid.callback = function () {
                rdsgLineMid.play(_this.lineMid + "_common", 0);
                _this.eachLineHandle();
            };
            this.winLineGroup.addChild(rdsgLineMid);
            rdsgLineMid.anchorOffsetY = rdsgLineMid.height / 2;
            rdsgLineMid.resetPosition();
            this.aniPool.push(rdsgLineMid);
        };
        /**
         * 开头连线链接
         * @param  {Array<any>} str
         */
        BaseSlotScene.prototype.addFirstAni = function (str) {
            var _this = this;
            var rdsgLineSmall = new DBComponent(this.lineSmall);
            rdsgLineSmall.play(this.lineSmall + "_begin", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = this.firstLineX;
            rdsgLineSmall.callback = function () {
                rdsgLineSmall.play(_this.lineSmall + "_common", 0);
            };
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        };
        /**
         * 末端连线连接
         * @param  {Array<any>} str
         */
        BaseSlotScene.prototype.addLastAni = function (str) {
            var _this = this;
            var rdsgLineSmall = new DBComponent(this.lineSmall);
            rdsgLineSmall.play(this.lineSmall + "_begin", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = this.lastLineX;
            rdsgLineSmall.callback = function () {
                rdsgLineSmall.play(_this.lineSmall + "_common", 0);
            };
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        };
        /**
         * 设置连线bottom属性
         * @param  {any} postion
         */
        BaseSlotScene.prototype.aniPositionYHandle = function (postion, fixposition) {
            if (postion == 0) {
                if (fixposition) {
                    return this.lineAniYArray[0] - fixposition;
                }
                return this.lineAniYArray[0];
            }
            else if (postion == 1) {
                if (fixposition) {
                    return this.lineAniYArray[1] - fixposition;
                }
                return this.lineAniYArray[1];
            }
            else if (postion == 2) {
                if (fixposition) {
                    return this.lineAniYArray[2] - fixposition;
                }
                return this.lineAniYArray[2];
            }
        };
        /**
         * 动画horizonCenter设置
         * @param  {any} x
         */
        BaseSlotScene.prototype.aniPositionXHandle = function (x) {
            if (x == 0) {
                return this.lineAniXArray[0];
            }
            else if (x == 1) {
                return this.lineAniXArray[1];
            }
            else if (x == 2) {
                return this.lineAniXArray[2];
            }
            else if (x == 3) {
                return this.lineAniXArray[3];
            }
            else if (x == 4) {
                return this.lineAniXArray[4];
            }
        };
        /**
         * 连线动画对象池清空
         */
        BaseSlotScene.prototype.clearAniPool = function () {
            if (this.aniPool) {
                for (var i = 0; i < this.aniPool.length; i++) {
                    game.UIUtils.removeSelf(this.aniPool[i]);
                    this.aniPool[i] = null;
                }
            }
        };
        /**
         * 所有中奖图标动画
         */
        BaseSlotScene.prototype.checkBonusIcon = function () { };
        /**
         * 每条连线动画展示
         */
        BaseSlotScene.prototype.addEachLineAni = function () { };
        BaseSlotScene.prototype.setAutoTimeout = function (fn, thisObj, time) {
            for (var a = [], n = 3; n < arguments.length; n++)
                a[n - 3] = arguments[n];
            return (s = this.pauseHandler).setAutoTimeout.apply(s, [fn, thisObj, time].concat(a));
            var s;
        };
        /**
         * 部分转轴加速
         * @param  {number} index
         */
        BaseSlotScene.prototype.scrollerItemFast = function (index, atr) {
            var _this = this;
            if (Global.runBack) {
                return;
            }
            var item3 = this.scroller["item" + 3];
            var item4 = this.scroller["item" + 4];
            var item5 = this.scroller["item" + 5];
            switch (index) {
                case 3:
                    this.scroller.item3.clearDownTimeOut();
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    var temp_atr = [[0, 1, 2], [0, 1, 2], [], [], []];
                    if (this.isSetHui)
                        this.scroller.setSpecilHui(temp_atr);
                    this.scroller.item1.resetIconHui(this.yudiAtrHui[0]);
                    this.scroller.item2.resetIconHui(this.yudiAtrHui[1]);
                    this.scroller.item3.speed = 85;
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    if (this.gameId == "bscs")
                        this.addScatterAni(3, 0);
                    else {
                        this.scroller.addScatterAni(3, 0);
                    }
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true);
                    this.scatter3timeout = this.setAutoTimeout(function () {
                        item3.changeResult(atr[2]);
                        if (_this.isSetHui)
                            _this.scroller.setSpecilHui([[], [], [0, 1, 2], [], []]);
                        if (_this.yudiAtrHui2[2] && _this.yudiAtrHui2[2] == 3)
                            _this.scroller.item3.resetIconHui(_this.yudiAtrHui[2]);
                        if (_this.gameId != "bscs")
                            _this.scroller.removeScatterAni(3);
                        else if (_this.gameId == "bscs")
                            _this.removeScatterAni(3);
                        if (_this.gameId == "bscs")
                            _this.addScatterAni(4, 0);
                        else {
                            _this.scroller.addScatterAni(4, 0);
                        }
                    }, this, this.fastSpeedTime);
                    this.scatter4timeout = this.setAutoTimeout(function () {
                        item4.changeResult(atr[3]);
                        if (_this.isSetHui)
                            _this.scroller.setSpecilHui([[], [], [], [0, 1, 2], []]);
                        if (_this.yudiAtrHui2[2] && _this.yudiAtrHui2[2] == 4)
                            _this.scroller.item4.resetIconHui(_this.yudiAtrHui[2]);
                        if (_this.yudiAtrHui2[3] && _this.yudiAtrHui2[3] == 4)
                            _this.scroller.item4.resetIconHui(_this.yudiAtrHui[3]);
                        if (_this.gameId != "bscs")
                            _this.scroller.removeScatterAni(4);
                        else if (_this.gameId == "bscs")
                            _this.removeScatterAni(4);
                        if (_this.gameId == "bscs")
                            _this.addScatterAni(5, 0);
                        else {
                            _this.scroller.addScatterAni(5, 0);
                        }
                    }, this, this.fastSpeedTime * 2);
                    this.scatter5timeout = this.setAutoTimeout(function () {
                        item5.changeResult(atr[4]);
                        if (_this.gameId != "bscs")
                            _this.scroller.removeScatterAni(5);
                        else if (_this.gameId == "bscs")
                            _this.removeScatterAni(5);
                        if (_this.isSetHui)
                            _this.scroller.removeIconHui(_this.HuiAtr);
                        SoundManager.getInstance().stopEffectByName(_this.scrollerFastEffect);
                    }, this, this.fastSpeedTime * 3);
                    break;
                case 4:
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    var temp_atr2 = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [], []];
                    if (this.isSetHui)
                        this.scroller.setSpecilHui(temp_atr2);
                    if (this.yudiAtrHui2[0] == 1)
                        this.scroller.item1.resetIconHui(this.yudiAtrHui[0]);
                    if (this.yudiAtrHui2[0] == 2)
                        this.scroller.item2.resetIconHui(this.yudiAtrHui[0]);
                    if (this.yudiAtrHui2[1] == 2)
                        this.scroller.item2.resetIconHui(this.yudiAtrHui[1]);
                    if (this.yudiAtrHui2[1] == 3)
                        this.scroller.item3.resetIconHui(this.yudiAtrHui[1]);
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    if (this.gameId == "bscs")
                        this.addScatterAni(4, 0);
                    else {
                        this.scroller.addScatterAni(4, 0);
                    }
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true);
                    this.scatter4timeout = this.setAutoTimeout(function () {
                        item4.changeResult(atr[3]);
                        if (_this.isSetHui)
                            _this.scroller.setSpecilHui([[], [], [], [0, 1, 2], []]);
                        for (var i = 0; i < _this.yudiAtrHui2.length; i++) {
                            if (_this.yudiAtrHui2[i] == 4) {
                                _this.scroller.item4.resetIconHui(_this.yudiAtrHui[_this.yudiAtrHui[i]]);
                            }
                        }
                        if (_this.gameId != "bscs")
                            _this.scroller.removeScatterAni(4);
                        else if (_this.gameId == "bscs")
                            _this.removeScatterAni(4);
                        if (_this.gameId == "bscs")
                            _this.addScatterAni(5, 0);
                        else {
                            _this.scroller.addScatterAni(5, 0);
                        }
                    }, this, this.fastSpeedTime);
                    this.scatter5timeout = this.setAutoTimeout(function () {
                        item5.changeResult(atr[4]);
                        if (_this.gameId != "bscs")
                            _this.scroller.removeScatterAni(5);
                        else if (_this.gameId == "bscs")
                            _this.removeScatterAni(5);
                        if (_this.isSetHui)
                            _this.scroller.removeIconHui(_this.HuiAtr);
                        SoundManager.getInstance().stopEffectByName(_this.scrollerFastEffect);
                    }, this, this.fastSpeedTime * 2);
                    break;
                case 5:
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item5.speed = 85;
                    if (this.gameId == "bscs")
                        this.addScatterAni(5, 0);
                    else {
                        this.scroller.addScatterAni(5, 0);
                    }
                    var temp_atr3 = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], []];
                    if (this.isSetHui)
                        this.scroller.setSpecilHui(temp_atr3);
                    for (var i = 0; i < this.yudiAtrHui2.length; i++) {
                        if (this.yudiAtrHui2[i] == 1) {
                            this.scroller.item1.resetIconHui(this.yudiAtrHui[i]);
                        }
                        else if (this.yudiAtrHui2[i] == 2) {
                            this.scroller.item2.resetIconHui(this.yudiAtrHui[i]);
                        }
                        else if (this.yudiAtrHui2[i] == 3) {
                            this.scroller.item3.resetIconHui(this.yudiAtrHui[i]);
                        }
                        else if (this.yudiAtrHui2[i] == 4) {
                            this.scroller.item4.resetIconHui(this.yudiAtrHui[i]);
                        }
                    }
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true);
                    this.scatter5timeout = this.setAutoTimeout(function () {
                        item5.changeResult(atr[4]);
                        if (_this.gameId != "bscs")
                            _this.scroller.removeScatterAni(5);
                        else if (_this.gameId == "bscs")
                            _this.removeScatterAni(5);
                        if (_this.isSetHui)
                            _this.scroller.removeIconHui(_this.HuiAtr);
                        SoundManager.getInstance().stopEffectByName(_this.scrollerFastEffect);
                    }, this, this.fastSpeedTime);
                    break;
            }
        };
        /**
         * 连线为图片时
         */
        BaseSlotScene.prototype.lineUseImag = function (lineIndex) {
            var Line = new eui.Image(this.gameId + "_line_" + lineIndex + "_png");
            Line.alpha = 0;
            Line.horizontalCenter = Line.verticalCenter = 0;
            this.winLineGroup.addChild(Line);
            this.lineImaPool.push(Line);
            egret.Tween.get(Line).to({ alpha: 1 }, 1000, egret.Ease.circOut).to({ alpha: 0 }, 1000, egret.Ease.circIn).call(function () {
                game.UIUtils.removeSelf(Line);
                Line = null;
            });
        };
        /**
         * 图片连线的移除，释放内存
         */
        BaseSlotScene.prototype.clearLineImaPool = function () {
            if (this.lineImaPool) {
                for (var i = 0; i < this.lineImaPool.length; i++) {
                    game.UIUtils.removeSelf(this.lineImaPool[i]);
                    this.lineImaPool[i] = null;
                }
            }
        };
        /**
         * @param  {number} index
         */
        BaseSlotScene.prototype.addScatterAni = function (index, fixPosition) {
            this.scatterAni = new DBComponent("bscq_reel_fast");
            switch (index) {
                case 3:
                    this.scatterAni.x = 508 - fixPosition;
                    this.scatterAni.y = 243;
                    this.scatterAni.scaleY = 1;
                    this.winLineGroup.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 4:
                    this.scatterAni.x = 712 - fixPosition;
                    this.scatterAni.y = 243;
                    this.scatterAni.scaleY = 1;
                    this.winLineGroup.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 5:
                    this.scatterAni.x = 916 - fixPosition;
                    this.scatterAni.y = 243;
                    this.winLineGroup.addChild(this.scatterAni);
                    this.scatterAni.scaleY = 1;
                    this.scatterAni.play("", 0);
                    break;
            }
        };
        /**
         * @param  {} index?
         */
        BaseSlotScene.prototype.removeScatterAni = function (index) {
            game.UIUtils.removeSelf(this.scatterAni);
        };
        BaseSlotScene.prototype.showSmashingAni = function () {
        };
        /**
        * 部分转轴加速
        * @param  {number} index
        */
        BaseSlotScene.prototype.scrollerFast = function (index, atr) {
            var _this = this;
            if (Global.runBack) {
                return;
            }
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
                    var temp_atr = [[0, 1, 2], [0, 1, 2], [], [], []];
                    this.scroller.item3.speed = 85;
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(3, 0);
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect);
                    this.scatter3timeout = this.setAutoTimeout(function () {
                        item3.changeResult(atr[2]);
                        _this.scroller.removeScatterAni(3);
                        _this.scroller.addScatterAni(4, 0);
                    }, this, this.fastSpeedTime);
                    this.scatter4timeout = this.setAutoTimeout(function () {
                        item4.changeResult(atr[3]);
                        _this.scroller.removeScatterAni(4);
                        _this.scroller.addScatterAni(5, 0);
                    }, this, this.fastSpeedTime * 2);
                    this.scatter5timeout = this.setAutoTimeout(function () {
                        item5.changeResult(atr[4]);
                        _this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName(_this.scrollerFastEffect);
                    }, this, this.fastSpeedTime * 3);
                    break;
                case 4:
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    var temp_atr2 = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [], []];
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(4, 0);
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect);
                    this.scatter4timeout = this.setAutoTimeout(function () {
                        item4.changeResult(atr[3]);
                        _this.removeScatterAni(4);
                        _this.scroller.addScatterAni(5, 0);
                    }, this, this.fastSpeedTime);
                    this.scatter5timeout = this.setAutoTimeout(function () {
                        item5.changeResult(atr[4]);
                        _this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName(_this.scrollerFastEffect);
                    }, this, this.fastSpeedTime * 2);
                    break;
                case 5:
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(5, 0);
                    var temp_atr3 = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], []];
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect);
                    this.scatter5timeout = this.setAutoTimeout(function () {
                        item5.changeResult(atr[4]);
                        _this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName(_this.scrollerFastEffect);
                    }, this, this.fastSpeedTime);
                    break;
            }
        };
        BaseSlotScene.prototype.startBtnTouch = function () { };
        ;
        BaseSlotScene.prototype.askAutoGame = function () {
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
        BaseSlotScene.prototype.checkQuitVisible = function () {
            if (this.quitBtn) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this["quitBtn"].visible = true;
                    ;
                }
            }
        };
        /**
         * 超时未下注请出房间
         */
        BaseSlotScene.prototype.kickGame = function (e) {
            var _this = this;
            var text = e.data.reason;
            var webviewType = game.Utils.getURLQueryString("webview");
            if (webviewType == "app" || ServerConfig.OP_RETURN_TYPE == "3") {
                Global.alertMediator.addAlert(text + ",请刷新页面重新进入游戏", function () {
                    FrameUtils.flushWindow();
                }, null, true);
                return;
            }
            Global.alertMediator.addAlert(text, function () {
                Global.playerProxy.updatePlayerInfo(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.closeGame("");
                        return [2 /*return*/];
                    });
                }); });
            }, "", true);
            return;
        };
        BaseSlotScene.prototype.closeGame = function (text) {
            var _this = this;
            var type = ServerConfig.OP_RETURN_TYPE == "3";
            var callback = function () {
                if (type) {
                    FrameUtils.flushWindow();
                }
                else {
                    _this.closeGameCall();
                }
            };
            if (text) {
                Global.alertMediator.addAlert(text, function () {
                    callback();
                }, null, true);
            }
            else {
                callback();
            }
        };
        BaseSlotScene.prototype.closeGameCall = function () {
        };
        BaseSlotScene.prototype.enterOtherGame = function (e) {
            var _this = this;
            var resp = e.data;
            var text;
            if (resp.sceneId == 1001) {
                if (resp.isScatter) {
                    text = "您在“大闹天宫”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“大闹天宫”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1002) {
                if (resp.isScatter) {
                    text = "您在“神雕侠侣”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“神雕侠侣”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1003) {
                if (resp.isScatter) {
                    text = "您在“赤壁之战”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“赤壁之战”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1004) {
                if (resp.isScatter) {
                    text = "您在“四大美女”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“四大美女”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1005) {
                if (resp.isScatter) {
                    text = "您在“宝石矿工”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“宝石矿工”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1006) {
                if (resp.isScatter) {
                    text = "您在“热带水果”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“热带水果”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1007) {
                if (resp.isScatter) {
                    text = "您在“暗夜猎手”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“暗夜猎手”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1008) {
                if (resp.isScatter) {
                    text = "您在“格斗之王”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“格斗之王”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1009) {
                if (resp.isScatter) {
                    text = "您在“白蛇传说”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“白蛇传说”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1010) {
                if (resp.isScatter) {
                    text = "您在“嫦娥奔月”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“嫦娥奔月”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1016) {
                if (resp.isScatter) {
                    text = "您在“星尘宝石”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“星尘宝石”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1017) {
                if (resp.isScatter) {
                    text = "您在“水果武士”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“水果武士”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1018) {
                if (resp.isScatter) {
                    text = "您在“鼠年有喜”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“鼠年有喜”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            if (resp) {
                Global.alertMediator.addAlert(text, function () {
                    _this.closeGame(null);
                }, "", true);
            }
        };
        return BaseSlotScene;
    }(game.BaseScene));
    game.BaseSlotScene = BaseSlotScene;
    __reflect(BaseSlotScene.prototype, "game.BaseSlotScene");
})(game || (game = {}));
