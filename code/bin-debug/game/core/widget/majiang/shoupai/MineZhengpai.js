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
    var MineZhengpai = (function (_super) {
        __extends(MineZhengpai, _super);
        function MineZhengpai() {
            return _super.call(this) || this;
            // this.skinName = new majiang.MineZhengPaiSkin();
        }
        MineZhengpai.prototype.changeColor = function (color) {
            this.colorImage.source = RES.getRes("color_value_" + color + "_png");
        };
        return MineZhengpai;
    }(eui.Component));
    majiang.MineZhengpai = MineZhengpai;
    __reflect(MineZhengpai.prototype, "majiang.MineZhengpai");
})(majiang || (majiang = {}));
