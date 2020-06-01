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
var majiang;
(function (majiang) {
    var MineShoupaiCopy = (function (_super) {
        __extends(MineShoupaiCopy, _super);
        function MineShoupaiCopy(colorValue) {
            var _this = _super.call(this) || this;
            _this.value = colorValue;
            _this.skinName = new majiang.MineShoupaiSkin();
            return _this;
        }
        MineShoupaiCopy.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchEnabled = true;
            this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
        };
        return MineShoupaiCopy;
    }(eui.Component));
    majiang.MineShoupaiCopy = MineShoupaiCopy;
    __reflect(MineShoupaiCopy.prototype, "majiang.MineShoupaiCopy");
})(majiang || (majiang = {}));
