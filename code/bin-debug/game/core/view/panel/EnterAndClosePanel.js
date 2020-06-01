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
 * @Date: 2019-12-10 17:52:31
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-10 17:54:38
 * @Description: 只有一个通用的慢板的
 */
var EnterAndClosePanel = (function (_super) {
    __extends(EnterAndClosePanel, _super);
    function EnterAndClosePanel(skinName) {
        var _this = _super.call(this) || this;
        _this.skinName = skinName;
        return _this;
    }
    EnterAndClosePanel.getInstance = function (skinName) {
        if (!EnterAndClosePanel._instance) {
            EnterAndClosePanel._instance = new EnterAndClosePanel(skinName);
        }
        return EnterAndClosePanel._instance;
    };
    EnterAndClosePanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    EnterAndClosePanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
            case this.enterBtn:
                this.hide();
                break;
        }
    };
    EnterAndClosePanel.prototype.show = function () {
        GameLayerManager.gameLayer().panelLayer.addChild(this);
    };
    EnterAndClosePanel.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        EnterAndClosePanel._instance = null;
    };
    return EnterAndClosePanel;
}(BaseScalePanel));
__reflect(EnterAndClosePanel.prototype, "EnterAndClosePanel");
