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
    var HZMJMineShoupai = (function (_super) {
        __extends(HZMJMineShoupai, _super);
        function HZMJMineShoupai(value) {
            var _this = _super.call(this, value) || this;
            /**显示杭州麻将的癞子标示 */
            _this.otherImage.source = RES.getRes("hzmj_tip_lai_png");
            return _this;
        }
        return HZMJMineShoupai;
    }(majiang.GDMJMineShoupai));
    majiang.HZMJMineShoupai = HZMJMineShoupai;
    __reflect(HZMJMineShoupai.prototype, "majiang.HZMJMineShoupai");
})(majiang || (majiang = {}));
