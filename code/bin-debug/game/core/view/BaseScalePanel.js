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
 * @Date: 2019-11-26 14:23:18
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-10 18:43:39
 * @Description: 带有自动放大缩小的面板
 */
var BaseScalePanel = (function (_super) {
    __extends(BaseScalePanel, _super);
    function BaseScalePanel() {
        return _super.call(this) || this;
    }
    BaseScalePanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.onShow();
    };
    BaseScalePanel.prototype.onShow = function () {
        var beforeScale = this.scaleGroup.scaleX;
        this.scaleGroup.scaleX = this.scaleGroup.scaleY = beforeScale - 0.2;
        egret.Tween.get(this.scaleGroup).to({
            scaleX: beforeScale,
            scaleY: beforeScale
        }, 300, egret.Ease.backOut);
    };
    BaseScalePanel.prototype.closeBtnTouch = function () {
    };
    return BaseScalePanel;
}(game.BaseScene));
__reflect(BaseScalePanel.prototype, "BaseScalePanel");
