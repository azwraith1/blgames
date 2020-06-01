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
var smart;
(function (smart) {
    var ButtonNew = (function (_super) {
        __extends(ButtonNew, _super);
        function ButtonNew() {
            var _this = _super.call(this) || this;
            _this.skinName = "NewButtonSkin";
            return _this;
        }
        ButtonNew.prototype.setUpImg = function (up, down) {
            this.upImg.source = up;
            this.downImg.source = down;
        };
        ButtonNew.prototype.setBitMapTxt = function (fontStyle, val) {
            this.bitmapTxt.font = fontStyle;
            this.bitmapTxt.text = val.toString();
        };
        ButtonNew.prototype.setTxt = function () {
        };
        return ButtonNew;
    }(eui.Button));
    smart.ButtonNew = ButtonNew;
    __reflect(ButtonNew.prototype, "smart.ButtonNew");
})(smart || (smart = {}));
