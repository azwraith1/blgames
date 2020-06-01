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
 * @Date: 2019-11-28 17:26:34
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-04 11:35:53
 * @Description: 晋级界面
 */
var MatchHelpPanel = (function (_super) {
    __extends(MatchHelpPanel, _super);
    function MatchHelpPanel() {
        var _this = _super.call(this) || this;
        _this.tabIndx = 1;
        _this.skinName = new MatchHelpPanelSkin();
        return _this;
    }
    Object.defineProperty(MatchHelpPanel, "instance", {
        get: function () {
            if (!MatchHelpPanel._instance) {
                MatchHelpPanel._instance = new MatchHelpPanel();
            }
            return MatchHelpPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchHelpPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showTab();
    };
    MatchHelpPanel.prototype.showTab = function () {
        this.scroller.stopAnimation();
        this.scroller.viewport.scrollV = 0;
        if (this.tabIndx == 1) {
            this.tab1.alpha = 1;
            this.tab2.alpha = 0;
            this.image.source = RES.getRes("match_hall_help_bg1_png");
        }
        else {
            this.tab1.alpha = 0;
            this.tab2.alpha = 1;
            this.image.source = RES.getRes("match_hall_help_bg3_png");
        }
    };
    MatchHelpPanel.prototype.show = function () {
        GameLayerManager.gameLayer().panelLayer.addChild(this);
    };
    MatchHelpPanel.prototype.hide = function () {
        if (MatchHelpPanel._instance) {
            game.UIUtils.removeSelf(this);
            MatchHelpPanel._instance = null;
        }
    };
    MatchHelpPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.tab1:
                this.tabIndx = 1;
                this.showTab();
                break;
            case this.tab2:
                this.tabIndx = 2;
                this.showTab();
                break;
            case this.closeBtn:
                this.hide();
                break;
        }
    };
    return MatchHelpPanel;
}(game.BaseScene));
__reflect(MatchHelpPanel.prototype, "MatchHelpPanel");
