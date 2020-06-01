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
    var GYZJMineShoupai = (function (_super) {
        __extends(GYZJMineShoupai, _super);
        function GYZJMineShoupai(value) {
            return _super.call(this, value) || this;
        }
        return GYZJMineShoupai;
    }(majiang.MineShoupai));
    majiang.GYZJMineShoupai = GYZJMineShoupai;
    __reflect(GYZJMineShoupai.prototype, "majiang.GYZJMineShoupai");
})(majiang || (majiang = {}));
