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
 * @Author: MC Lee
 * @Date: 2019-05-21 17:10:27
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-09 15:39:01
 * @Description: 匹配界面基础类
 */
var game;
(function (game) {
    var BaseMatchingScene = (function (_super) {
        __extends(BaseMatchingScene, _super);
        function BaseMatchingScene() {
            var _this = _super.call(this) || this;
            /**
             * 是否允许退出
             */
            _this.allowBack = true;
            return _this;
        }
        BaseMatchingScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.startRotationImage();
            this.startJoinTimeout();
            if (this.mineHeader && this.mineHeader.initWithData) {
                this.mineHeader.initWithData(Global.gameProxy.getMineGameData(), "mine");
            }
        };
        BaseMatchingScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        };
        BaseMatchingScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.clearJoinTimeout();
            this.clearReconnectTimeout();
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        };
        /**
         * 开始旋转
         */
        BaseMatchingScene.prototype.startRotationImage = function () {
            egret.Tween.get(this.rotationImage, { loop: true }).to({
                rotation: 360
            }, 3000);
        };
        /**
         * 更新金币
         */
        BaseMatchingScene.prototype.updateGold = function () {
            if (this.mineHeader) {
                this.mineHeader.updateGold(Global.playerProxy.playerData.gold);
            }
        };
        BaseMatchingScene.prototype.clearJoinTimeout = function () {
            if (this.joinTimeout) {
                egret.clearTimeout(this.joinTimeout);
                this.joinTimeout = null;
            }
        };
        BaseMatchingScene.prototype.clearReconnectTimeout = function () {
            if (this.reconnectTimeout) {
                egret.clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = null;
            }
        };
        BaseMatchingScene.prototype.startReconnectTimeout = function () {
            var _this = this;
            this.clearReconnectTimeout();
            this.joinTimeout = egret.setTimeout(function () {
                _this.reconnectSuc();
            }, this, 5000);
        };
        BaseMatchingScene.prototype.startJoinTimeout = function () {
            var _this = this;
            this.clearJoinTimeout();
            this.joinTimeout = egret.setTimeout(function () {
                // if (!this.allowBack) {
                // 	this.startReconnectTimeout();
                // 	return;
                // }
                _this.allowBack = true;
                _this.reconnectSuc();
            }, this, 20000);
        };
        BaseMatchingScene.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.backBtn:
                    this.backBtnTouch();
                    break;
                case this.settingBtn:
                    this.showBtnsType(1);
                    CF.sN(this.SETTING_NOTIFY);
                    break;
                case this.recordBtn:
                    this.showBtnsType(1);
                    CF.sN(this.RECORD_NOTIFY, Global.gameProxy.gameIds[this.GAME_ID]);
                    break;
                case this.helpBtn:
                    this.showBtnsType(1);
                    CF.sN(PanelNotify.OPEN_HELP_SHU, { type: this.GAME_ID });
                    break;
                case this.xlbtn:
                    this.showBtnsType(2);
                    break;
                case this.xlbtn1:
                    this.showBtnsType(1);
                    break;
            }
        };
        /**
         * 超时匹配或者断线重连
         */
        BaseMatchingScene.prototype.reconnectSuc = function () {
            return __awaiter(this, void 0, void 0, function () {
                var matchSuc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.startJoinTimeout();
                            return [4 /*yield*/, Global.gameProxy.reconnectRoom()];
                        case 1:
                            matchSuc = _a.sent();
                            if (matchSuc) {
                                if (Global.gameProxy.roomInfo.playing) {
                                    CF.sN(this.CLOSE_NOTIFY);
                                    CF.sN(this.GAME_SCENE_NOTIFY);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        BaseMatchingScene.prototype.backHall = function () {
            Global.roomProxy.clearRoomInfo();
            Global.gameProxy.clearRoomInfo();
            Global.gameProxy.clearLastGameConfig();
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.GAME_HALL_NOTIFY);
        };
        BaseMatchingScene.prototype.backBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var handler, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.allowBack) {
                                Global.alertMediator.addAlert(CF.tigc(144), null, null, true);
                                return [2 /*return*/];
                            }
                            handler = ServerPostPath.hall_sceneHandler_c_leave;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, null)];
                        case 1:
                            resp1 = _a.sent();
                            game.PomeloManager.instance.clearLastLock();
                            if (resp1 && resp1.error) {
                                if (resp1.error.code == 0) {
                                    Global.roomProxy.clearRoomInfo();
                                    Global.gameProxy.clearRoomInfo();
                                    Global.gameProxy.clearLastGameConfig();
                                    CF.sN(this.CLOSE_NOTIFY);
                                    CF.sN(this.GAME_HALL_NOTIFY);
                                }
                                else if (resp1.error.code != -10000) {
                                    Global.alertMediator.addAlert(CF.tigc(144), null, null, true);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return BaseMatchingScene;
    }(game.BaseScene));
    game.BaseMatchingScene = BaseMatchingScene;
    __reflect(BaseMatchingScene.prototype, "game.BaseMatchingScene");
})(game || (game = {}));
