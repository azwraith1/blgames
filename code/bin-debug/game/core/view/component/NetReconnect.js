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
 * @Author: li mengchan
 * @Date: 2018-07-24 10:37:37
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-22 16:06:04
 * @Description: 断线重连
 */
var game;
(function (game) {
    var NetReconnect = (function (_super) {
        __extends(NetReconnect, _super);
        function NetReconnect() {
            var _this = _super.call(this) || this;
            //5次计数如果没有打开则弹开面板
            _this.count = 5;
            _this.active = false;
            _this.skinName = new NetReConnectSkin();
            return _this;
        }
        Object.defineProperty(NetReconnect, "instance", {
            get: function () {
                if (!NetReconnect._instance) {
                    NetReconnect._instance = new NetReconnect();
                    NetReconnect._instance.name = "netReconnect";
                    NetReconnect._instance.visible = false;
                    GameLayerManager.gameLayer().maskLayer.addChild(NetReconnect._instance);
                }
                return NetReconnect._instance;
            },
            enumerable: true,
            configurable: true
        });
        NetReconnect.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        NetReconnect.prototype.hide = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.visible = false;
                    egret.Tween.removeTweens(this.tipImage);
                    egret.clearInterval(this.connectInterval);
                    this.connectInterval = null;
                    game.PomeloManager.instance.lockResp = false;
                    CF.sN(PanelNotify.CLOSE_ALERT);
                    return [2 /*return*/];
                });
            });
        };
        NetReconnect.prototype.show = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var count;
                return __generator(this, function (_a) {
                    if (this.visible && this.active) {
                        return [2 /*return*/];
                    }
                    this.active = true;
                    // if (this.active) {
                    game.PomeloManager.instance.lockResp = true;
                    LogUtils.logD("重新连接");
                    egret.clearInterval(this.connectInterval);
                    this.connectInterval = null;
                    this.visible = true;
                    egret.Tween.removeTweens(this.tipImage);
                    egret.Tween.get(this.tipImage, { loop: true }).to({
                        rotation: this.tipImage.rotation + 360
                    }, 3000);
                    count = 0;
                    this.connectInterval = egret.setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            //重新连接
                            count++;
                            if (count >= 2) {
                                egret.clearInterval(this.connectInterval);
                                this.connectInterval = null;
                                this.showReconnectFailTips();
                                return [2 /*return*/];
                            }
                            this.connect();
                            return [2 /*return*/];
                        });
                    }); }, this, 6000);
                    this.connect();
                    return [2 /*return*/];
                });
            });
        };
        NetReconnect.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var suc, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, game.PomeloManager.instance.initServer(Global.gameProxy.connectorInfo.host, Global.gameProxy.connectorInfo.port)];
                        case 1:
                            suc = _a.sent();
                            if (!suc) {
                                return [2 /*return*/];
                            }
                            else {
                                egret.clearInterval(this.connectInterval);
                                this.connectInterval = null;
                            }
                            return [4 /*yield*/, game.PomeloManager.instance.request('connector.entryHandler.c_connect', {
                                    token: Global.playerProxy.token,
                                })];
                        case 2:
                            resp = _a.sent();
                            if (resp && !resp.error) {
                                resp.error = {};
                                resp.error.code = 0;
                            }
                            if (resp) {
                                if (resp.error && resp.error.code != 0) {
                                    egret.clearInterval(this.connectInterval);
                                    this.connectInterval = null;
                                    return [2 /*return*/];
                                }
                                if (Global.runGame) {
                                    setTimeout(function () {
                                        Global.pomelo.sendReconnectReason(-1);
                                    }, 5000);
                                }
                                this.active = false;
                                LogUtils.logD("重连成功");
                                game.PomeloManager.instance.state = PomeloStateEnum.CONNECT;
                                NetErrorTips.instance.hide();
                                game.NetReconnect.instance.hide();
                                CF.dP(ENo.RECONNECT_SUC, {});
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 重新连接失败
         */
        NetReconnect.prototype.showReconnectFailTips = function () {
            var _this = this;
            this.hide();
            var text = TextUtils.instance.getCurrentTextById(69);
            Global.alertMediator.addAlert(text, function () {
                _this.show();
            }, null, true);
        };
        return NetReconnect;
    }(game.BaseComponent));
    game.NetReconnect = NetReconnect;
    __reflect(NetReconnect.prototype, "game.NetReconnect");
})(game || (game = {}));
