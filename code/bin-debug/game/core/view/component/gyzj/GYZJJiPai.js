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
var GYZJJiPai = (function (_super) {
    __extends(GYZJJiPai, _super);
    function GYZJJiPai(cardVal, paiNum, isJiaoZui, ischong) {
        if (ischong === void 0) { ischong = false; }
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/component/gyzj/GYZJJiPaiSkin.exml";
        _this.paiValue = cardVal;
        _this.initWithData();
        _this.setJiPaiNum(cardVal, paiNum, ischong);
        return _this;
    }
    /**设置鸡牌的数量 */
    GYZJJiPai.prototype.setJiPaiNum = function (cardType, val, ischong) {
        var content;
        if (ischong)
            this.jiPaiChong.visible = true;
        switch (cardType) {
            case 21:
                content = "幺鸡";
                break;
            case 18:
                content = "八筒";
                break;
            default:
                content = "翻牌鸡";
                break;
        }
        this.paiNumLable.text = content + "✖" + val;
    };
    /**手牌数据 */
    GYZJJiPai.prototype.initWithData = function () {
        if (this.paiValue <= 0) {
            this.visible = false;
        }
        this.colorImage.source = RES.getRes("color_value_" + this.paiValue + "_png");
    };
    GYZJJiPai.prototype.setFont = function (iswin) {
        if (iswin)
            this.paiNumLable.textColor = 0Xffd87c;
    };
    return GYZJJiPai;
}(eui.Component));
__reflect(GYZJJiPai.prototype, "GYZJJiPai");
