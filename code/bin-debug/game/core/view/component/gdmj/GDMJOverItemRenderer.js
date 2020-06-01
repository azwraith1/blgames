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
 * @Author: MC Lee
 * @Date: 2019-07-04 16:55:32
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-04 16:58:59
 * @Description: 流水条
 */
var GDMJOverItemRenderer = (function (_super) {
    __extends(GDMJOverItemRenderer, _super);
    function GDMJOverItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "GDMJOverItemRendererSkin";
        return _this;
    }
    GDMJOverItemRenderer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 显示文本
     * @param  {} text1
     * @param  {} text2
     * @param  {} text3
     * @param  {} color
     */
    GDMJOverItemRenderer.prototype.showText = function (text1, text2, text3, isWin, type) {
        if (type === void 0) { type = 1; }
        if (isWin) {
            this.label1.textColor = this.label2.textColor = this.label3.textColor = 0XFEF6C8;
            this.lineImage.source = RES.getRes("gdmj_over_line_1_png");
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
        //如果是以小博大 不显示本家
        if (type == 17) {
            this.label2.visible = false;
        }
    };
    return GDMJOverItemRenderer;
}(eui.Component));
__reflect(GDMJOverItemRenderer.prototype, "GDMJOverItemRenderer");
