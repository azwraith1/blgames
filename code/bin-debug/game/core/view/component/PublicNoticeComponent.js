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
var PublicNoticeComponent = (function (_super) {
    __extends(PublicNoticeComponent, _super);
    function PublicNoticeComponent() {
        var _this = _super.call(this) || this;
        _this.skinName = new PublicNoticeComponentSkin();
        return _this;
    }
    PublicNoticeComponent.prototype.createChildren = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.createChildren.call(this);
                return [2 /*return*/];
            });
        });
    };
    PublicNoticeComponent.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    PublicNoticeComponent.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
    };
    PublicNoticeComponent.prototype.paomadeng = function (e) {
        var resp = e.data;
        if (!resp) {
            return;
        }
        this.publicNoticeLable.text = resp.content;
        this.timer = Number(resp.expire_time) * 1000;
        this.enable = resp.enable;
        if (this.enable == 0) {
            this.closeNotice(2);
            this.movieLable(2);
        }
        else {
            this.movieLable(1);
        }
    };
    PublicNoticeComponent.prototype.movieLable = function (num) {
        var _this = this;
        if (game.DateTimeManager.instance.now < this.timer) {
            egret.Tween.removeTweens(this.publicNoticeLable);
            if (num == 1) {
                egret.Tween.get(this.publicNoticeBg).to({ visible: false }, 50).to({ visible: true }, 200).call(function () {
                    _this.publicNoticeLable.visible = true;
                    _this.publicNoticeBgLaBa.visible = true;
                    _this.rects.visible = true;
                    _this.publicNoticeLable.mask = _this.rects; //定义遮罩。
                    //egret.Tween.get(this.publicNoticeBgLaBa, { loop: true }).to({ visible: false }, 150).to({ visible: true }, 150);
                    egret.Tween.get(_this.publicNoticeLable, { loop: true }).to({ x: 650 }, 50).to({ x: _this.rects.x - _this.publicNoticeLable.width }, 15000);
                    egret.setTimeout(function () {
                        _this.closeNotice(num);
                    }, _this, 45000);
                });
            }
            else {
                this.timer = this.timer / 1000;
                //	egret.Tween.get(this.publicNoticeBgLaBa, { loop: true }).to({ visible: false }, 150).to({ visible: false }, 150);
                egret.Tween.get(this.publicNoticeBg).to({ visible: false }, 50).to({ visible: false }, 200).call(function () {
                    _this.publicNoticeLable.visible = false;
                    _this.publicNoticeBgLaBa.visible = false;
                    _this.rects.visible = false;
                    _this.publicNoticeLable.mask = _this.rects; //定义遮罩。
                    _this.closeNotice(num);
                });
            }
        }
    };
    PublicNoticeComponent.prototype.closeNotice = function (num) {
        var _this = this;
        this.publicNoticeLable.visible = false;
        this.publicNoticeBgLaBa.visible = false;
        this.publicNoticeBg.visible = false;
        if (num == 1) {
            var idTime = egret.setTimeout(function () {
                _this.movieLable(1);
            }, this, 60000);
        }
    };
    return PublicNoticeComponent;
}(game.BaseUI));
__reflect(PublicNoticeComponent.prototype, "PublicNoticeComponent");
