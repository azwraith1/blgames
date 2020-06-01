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
 * @Last Modified time: 2018-09-14 10:09:25
 * @Description: 右侧玩家手牌
 */
var majiang;
(function (majiang) {
    var RightShoupai = (function (_super) {
        __extends(RightShoupai, _super);
        function RightShoupai() {
            var _this = _super.call(this) || this;
            _this.value = 0;
            _this.skinName = new RightShoupaiSkin();
            return _this;
        }
        RightShoupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RightShoupai.prototype.changeBgResource = function (source) {
            this.bgImage.source = RES.getRes(source);
        };
        RightShoupai.prototype.showColor = function (value) {
            this.value = value;
            this.bgImage.visible = false;
        };
        return RightShoupai;
    }(eui.Component));
    majiang.RightShoupai = RightShoupai;
    __reflect(RightShoupai.prototype, "majiang.RightShoupai");
})(majiang || (majiang = {}));
