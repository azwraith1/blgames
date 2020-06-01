/*
 * @Author: he bing
 * @Date: 2018-08-13 11:05:43
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-21 11:40:28
 * @Description: 游戏记录
 */
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
var majiang;
(function (majiang) {
    var GameRecordPanel = (function (_super) {
        __extends(GameRecordPanel, _super);
        function GameRecordPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = new GameRecordSkin();
            return _this;
        }
        GameRecordPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.showGameByType("血流成河");
            //	this.showGame();
        };
        GameRecordPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.init();
        };
        GameRecordPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.remove();
        };
        GameRecordPanel.prototype.init = function () {
            /**
             * 监听在滑动列表里面的值，只需要过程。
             */
            //this.sc_scroller.addEventListener(egret.Event.CHANGE, this.showGame, this);
        };
        GameRecordPanel.prototype.remove = function () {
            /**
                 * 监听在滑动列表里面的值，只需要过程。
                 */
            //this.sc_scroller.removeEventListener(egret.Event.CHANGE, this.showGame, this);
        };
        GameRecordPanel.prototype.showGameByType = function (txt) {
            if (txt == "血流成河") {
                this.chuShiHua("mjxlch", Global.gameProxy.gameRecord_time);
            }
            else {
                this.chuShiHua("mjxzdd", Global.gameProxy.gameRecord_time1);
            }
        };
        /**
         * 初始化赋值
         */
        GameRecordPanel.prototype.chuShiHua = function (txt, times) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, handler, nums, resp;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = times;
                            switch (_a) {
                                case 0: return [3 /*break*/, 1];
                                case 1: return [3 /*break*/, 3];
                            }
                            return [3 /*break*/, 4];
                        case 1:
                            handler = ServerPostPath.hall_userHandler_c_getReportInfo;
                            nums = {
                                gameId: Global.gameProxy.gameIds[txt],
                                skip: 0,
                                limit: 10,
                            };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, nums)];
                        case 2:
                            resp = _b.sent();
                            if (txt == "mjxlch") {
                                Global.gameProxy.gameRecord_time = 1;
                                Global.gameProxy.gameRecord_xl = resp;
                                this.fuZhi(1);
                            }
                            else {
                                Global.gameProxy.gameRecord_time1 = 1;
                                Global.gameProxy.gameRecord_xz = resp;
                                this.fuZhi(2);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            if (txt == "mjxlch") {
                                this.fuZhi(1);
                            }
                            else {
                                this.fuZhi(2);
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            egret.setTimeout(function () {
                                Global.gameProxy.gameRecord_time = 0;
                                Global.gameProxy.gameRecord_time1 = 0;
                            }, this, 60000);
                            return [2 /*return*/];
                    }
                });
            });
        };
        GameRecordPanel.prototype.fuZhi = function (num) {
            this.recordGroup.removeChildren();
            this.tishiyu.visible = false;
            if (num == 1) {
                if (Global.gameProxy.gameRecord_xl.length == 0) {
                    this.tishiyu.visible = true;
                }
                else {
                    for (var i = 0; i < Global.gameProxy.gameRecord_xl.length; i++) {
                        var items = new majiang.GameRecordRenderer(Global.gameProxy.gameRecord_xl[i], i);
                        this.recordGroup.addChild(items);
                    }
                }
            }
            else {
                if (Global.gameProxy.gameRecord_xz.length == 0) {
                    this.tishiyu.visible = true;
                }
                else {
                    for (var i = 0; i < Global.gameProxy.gameRecord_xz.length; i++) {
                        var items = new majiang.GameRecordRenderer(Global.gameProxy.gameRecord_xz[i], i);
                        this.recordGroup.addChild(items);
                    }
                }
            }
        };
        GameRecordPanel.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            if (e.target == this.closeBtn || e.target == this.rects) {
                this.rects.visible = false;
                CF.sN(PanelNotify.CLOSE_GAMERECORD);
            }
            switch (e.target) {
                case this.xzdd:
                case this.lable_one:
                case this.rect_jt:
                    if (this.lable_two.visible) {
                        this.lable_two.visible = false;
                        this.xlch.visible = false;
                    }
                    else {
                        this.lable_two.visible = true;
                        this.xlch.visible = true;
                        this.exchangeName(this.lable_one.text);
                    }
                    break;
                case this.xlch:
                case this.lable_two:
                    this.lable_two.visible = false;
                    this.xlch.visible = false;
                    this.lable_one.text = this.lable_two.text;
                    this.showGameByType(this.lable_two.text);
                case this.rect_bg:
                    this.lable_two.visible = false;
                    this.xlch.visible = false;
                    break;
            }
        };
        /**
         * 改变选择按钮的值。
         */
        GameRecordPanel.prototype.exchangeName = function (text) {
            if (text == "血流成河") {
                this.lable_one.text = text;
                this.lable_two.text = "血战到底";
            }
            else {
                this.lable_two.text = "血流成河";
                this.lable_one.text = text;
            }
        };
        return GameRecordPanel;
    }(game.BaseComponent));
    majiang.GameRecordPanel = GameRecordPanel;
    __reflect(GameRecordPanel.prototype, "majiang.GameRecordPanel");
})(majiang || (majiang = {}));
