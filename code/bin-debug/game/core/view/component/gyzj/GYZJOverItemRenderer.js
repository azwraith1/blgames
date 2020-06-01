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
var GYZJOverItemRenderer = (function (_super) {
    __extends(GYZJOverItemRenderer, _super);
    function GYZJOverItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/component/gyzj/GYZJOverItemRenderSkin.exml";
        return _this;
    }
    /**
 * 显示文本
 * @param  {} text1
 * @param  {} text2
 * @param  {} text3
 * @param  {} color
 */
    GYZJOverItemRenderer.prototype.showText = function (text1, text2, text3, isWin) {
        if (isWin) {
            this.label1.textColor = this.label2.textColor = this.label3.textColor = 0XFEF6C8;
            this.lineImage.source = RES.getRes("gyzj_over_line_1_png");
        }
        if (!text3) {
            this.label1.text = text1;
            this.label3.text = text2;
        }
        else {
            this.label1.text = text1;
            this.label2.text = text2;
            this.label3.text = text3;
        }
    };
    return GYZJOverItemRenderer;
}(GDMJOverItemRenderer));
__reflect(GYZJOverItemRenderer.prototype, "GYZJOverItemRenderer");
