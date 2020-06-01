/*
 * @Author: he bing
 * @Date: 2018-08-21 16:03:30
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-09-14 10:11:19
 * @Description: 扣牌效果。
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
var majiang;
(function (majiang) {
    var MineKoupai = (function (_super) {
        __extends(MineKoupai, _super);
        function MineKoupai() {
            return _super.call(this) || this;
            // this.skinName = new MineKouPaiSkin();
        }
        MineKoupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return MineKoupai;
    }(eui.Component));
    majiang.MineKoupai = MineKoupai;
    __reflect(MineKoupai.prototype, "majiang.MineKoupai");
})(majiang || (majiang = {}));
