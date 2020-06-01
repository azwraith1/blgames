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
 * @Author: reel MC Lee
 * @Date: 2019-08-08 18:40:53
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-30 10:20:36
 * @Description: slot mainscene 基类
 */
var game;
(function (game) {
    var BaseSlotMainScene = (function (_super) {
        __extends(BaseSlotMainScene, _super);
        function BaseSlotMainScene() {
            return _super.call(this) || this;
        }
        BaseSlotMainScene.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
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
        };
        BaseSlotMainScene.prototype.s_pushRaceInvite = function () {
        };
        BaseSlotMainScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_enterOtherSlotScene, this.enterOtherGame, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
            CF.aE(this.enterFreeNotify, this.enterFreeGame, this);
            CF.aE(this.quitFreeNotify, this.quitFreeGame, this);
            CF.aE(this.startFreeSceneNotify, this.startFreeGame, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.aE(ServerNotify.s_playerQuitRoom, this.playerQuit, this);
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ServerNotify.s_playerBigWin, this.deskmateBigwin, this);
        };
        BaseSlotMainScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            egret.clearTimeout(this.closeDeskTimeOut);
            game.LaohuUtils.isTips = false;
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_enterOtherSlotScene, this.enterOtherGame, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
            CF.rE(this.enterFreeNotify, this.enterFreeGame, this);
            CF.rE(this.quitFreeNotify, this.quitFreeGame, this);
            CF.rE(this.startFreeSceneNotify, this.startFreeGame, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.rE(ServerNotify.s_playerQuitRoom, this.playerQuit, this);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            this.deskMate.openrect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openDesk, this);
            this.deskMate.openrect.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.touchOn, this);
            this.deskMate.openrect.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.touchOff, this);
            CF.rE(ServerNotify.s_playerBigWin, this.deskmateBigwin, this);
            this.clearDeskArray();
        };
        BaseSlotMainScene.prototype.clearDeskArray = function () {
            game.LaohuUtils.slotDeskGid = [];
            game.LaohuUtils.slotDeskHead = [];
            game.LaohuUtils.slotDeskName = [];
            game.LaohuUtils.playerEnter = {
                gid: 0, head: "", name: ""
            };
        };
        /**
        * 重连成功后退回大厅
        * @param  {egret.Event} e
        */
        BaseSlotMainScene.prototype.reconnectSuc = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var webviewType;
                return __generator(this, function (_a) {
                    game.LaohuUtils.auto_times = 0;
                    SoundManager.getInstance().stopEffectByName(this.gameId + "_reel_mp3");
                    webviewType = game.Utils.getURLQueryString("webview");
                    if (webviewType == "app" || ServerConfig.OP_RETURN_TYPE == "3") {
                        Global.alertMediator.addAlert("请刷新页面重新进入游戏", function () {
                            FrameUtils.flushWindow();
                        }, null, true);
                    }
                    else {
                        CF.sN(SceneNotify.OPEN_MAIN_HALL);
                    }
                    CF.sN(this.closeSceneNotify);
                    CF.sN(this.closeAutNotify);
                    CF.sN(this.closeTipsNotify);
                    CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
                    CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
                    game.LaohuUtils.isAutoGame = game.LaohuUtils.stopAuto = false;
                    game.LaohuUtils.oneMax = game.LaohuUtils.totalAdd = game.LaohuUtils.totalWin = 0;
                    return [2 /*return*/];
                });
            });
        };
        /**
        * 其他slot游戏
        * @param  {egret.Event} e
        */
        BaseSlotMainScene.prototype.enterOtherGame = function (e) {
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
            else if (resp.sceneId == 1003) {
                if (resp.isScatter) {
                    text = "您在“赤壁之战”中还有未完成的免费游戏，请先去完成吧";
                }
                else if (resp.freeTimes) {
                    text = "您在“赤壁之战”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
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
                    _this.closeGame();
                }, "", true);
            }
        };
        BaseSlotMainScene.prototype.closeGame = function (text) {
            var _this = this;
            if (text === void 0) { text = null; }
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
        /**
         * 超时未下注请出房间
         */
        BaseSlotMainScene.prototype.kickGame = function (e) {
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
                        CF.sN(SceneNotify.OPEN_MAIN_HALL);
                        CF.sN(this.closeSceneNotify);
                        CF.sN(this.closeAutNotify);
                        CF.sN(this.closeTipsNotify);
                        CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
                        CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
                        game.LaohuUtils.isAutoGame = game.LaohuUtils.stopAuto = false;
                        game.LaohuUtils.oneMax = game.LaohuUtils.totalAdd = game.LaohuUtils.totalWin = 0;
                        return [2 /*return*/];
                    });
                }); });
                // CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            }, "", true);
            return;
        };
        /**
         * 进入免费游戏
         */
        BaseSlotMainScene.prototype.enterFreeGame = function (e) {
        };
        BaseSlotMainScene.prototype.startFreeGame = function () {
        };
        BaseSlotMainScene.prototype.openDesk = function () {
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
        /**
        * 退出免费游戏
        */
        BaseSlotMainScene.prototype.quitFreeGame = function () {
        };
        BaseSlotMainScene.prototype.enterGame = function (e) {
            var resp = e.data;
            // let playerIdnex = resp.playerInfo.playerIndex;
            for (var key in resp.roomInfo.players) {
                var players = {};
                // if (key != playerIdnex) {
                players = resp.roomInfo.players[key];
                game.LaohuUtils.slotDeskGid.push(key);
                var head = "hall_header_" + players.sex + "_" + players.figureUrl + "_png";
                game.LaohuUtils.slotDeskHead.push(head);
                game.LaohuUtils.slotDeskName.push(players.nickname);
                this.deskMate.initDeskMate();
                // }
            }
        };
        BaseSlotMainScene.prototype.playerEnter = function (e) {
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
        BaseSlotMainScene.prototype.playerQuit = function (e) {
            var player = e.data;
            game.LaohuUtils.playerEnter = {
                gid: player.playerIndex,
                name: "",
                head: ""
            };
            this.deskMate.playerLeave();
        };
        BaseSlotMainScene.prototype.touchOn = function () {
            this.deskMate.touchOn();
        };
        BaseSlotMainScene.prototype.touchOff = function () {
            this.deskMate.touchOff();
        };
        BaseSlotMainScene.prototype.deskmateBigwin = function (e) {
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
        return BaseSlotMainScene;
    }(game.BaseScene));
    game.BaseSlotMainScene = BaseSlotMainScene;
    __reflect(BaseSlotMainScene.prototype, "game.BaseSlotMainScene");
})(game || (game = {}));
