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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaRecordPanl = (function (_super) {
        __extends(ZajinhuaRecordPanl, _super);
        function ZajinhuaRecordPanl() {
            var _this = _super.call(this) || this;
            _this.skinName = new ZajinhuaJiluSkin();
            return _this;
        }
        ZajinhuaRecordPanl.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.chuShiHua(Global.roomProxy.zjhRecord_time);
        };
        /**
         * 初始化赋值
         */
        ZajinhuaRecordPanl.prototype.chuShiHua = function (times) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, id, handler, nums, resp;
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
                            id = 10005;
                            handler = ServerPostPath.hall_userHandler_c_getReportInfo;
                            nums = {
                                gameId: id,
                                skip: 0,
                                limit: 10,
                            };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, nums)];
                        case 2:
                            resp = _b.sent();
                            Global.roomProxy.zjhRecord_time = 1;
                            Global.roomProxy.zjh_rect = resp;
                            this.fuZhi();
                            return [3 /*break*/, 4];
                        case 3:
                            this.fuZhi();
                            _b.label = 4;
                        case 4:
                            egret.setTimeout(function () {
                                Global.roomProxy.zjhRecord_time = 0;
                            }, this, 60000);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ZajinhuaRecordPanl.prototype.fuZhi = function () {
            this.jiluGroup.removeChildren();
            if (Global.roomProxy.zjh_rect.length == 0) {
                this.zwjl.visible = true;
            }
            else {
                for (var i = 0; i < Global.roomProxy.zjh_rect.length; i++) {
                    var items = new zajinhua.ZajinhuaRecordBar(Global.roomProxy.zjh_rect[i]);
                    this.jiluGroup.addChild(items);
                }
            }
        };
        ZajinhuaRecordPanl.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            if (e.target == this.closeBtn || e.target == this.rect) {
                this.rect.visible = false;
                CF.sN(PanelNotify.CLOSE_ZJHRECORD);
            }
        };
        return ZajinhuaRecordPanl;
    }(game.BaseComponent));
    zajinhua.ZajinhuaRecordPanl = ZajinhuaRecordPanl;
    __reflect(ZajinhuaRecordPanl.prototype, "zajinhua.ZajinhuaRecordPanl");
})(zajinhua || (zajinhua = {}));
