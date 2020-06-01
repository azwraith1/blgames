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
/*
 * @Author: Li MengChan
 * @Date: 2018-07-02 16:29:08
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-08-23 18:09:07
 * @Description: 对面玩家手牌
 */
var majiang;
(function (majiang) {
    var TopShoupai = (function (_super) {
        __extends(TopShoupai, _super);
        function TopShoupai() {
            var _this = _super.call(this) || this;
            _this.skinName = new majiang.TopShoupaiSkin();
            return _this;
        }
        TopShoupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        TopShoupai.prototype.changeBgResource = function (index) {
            if (index < 1 || index > 13 || !index) {
                index = 13;
            }
            this.index = index;
            this.bgImage.source = RES.getRes("top_shoupai_" + this.index + "_png");
        };
        return TopShoupai;
    }(eui.Component));
    majiang.TopShoupai = TopShoupai;
    __reflect(TopShoupai.prototype, "majiang.TopShoupai");
})(majiang || (majiang = {}));
