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
// TypeScript file
var ObjToast = (function (_super) {
    __extends(ObjToast, _super);
    function ObjToast() {
        var _this = _super.call(this) || this;
        _this.content = new eui.Label();
        _this.bg = new eui.Rect();
        _this.bg.fillColor = 0x1E1E1E;
        _this.bg.alpha = 0.8;
        _this.bg.ellipseWidth = 15;
        _this.bg.ellipseHeight = 15;
        _this.addChild(_this.bg);
        _this.content.fontFamily = 'Microsoft Yahei';
        _this.content.size = 20;
        _this.content.lineSpacing = 8;
        _this.content.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.content);
        return _this;
    }
    Object.defineProperty(ObjToast.prototype, "abxca", {
        set: function (value) {
            if (this.content) {
                this.content.textFlow = new egret.HtmlTextParser().parser(value);
            }
            this.bg.width = this.content.width + 50;
            this.bg.height = this.content.height + 20;
            this.content.x = (this.bg.width - this.content.width) / 2;
            this.content.y = (this.bg.height - this.content.height) / 2;
        },
        enumerable: true,
        configurable: true
    });
    return ObjToast;
}(eui.Component));
__reflect(ObjToast.prototype, "ObjToast");
