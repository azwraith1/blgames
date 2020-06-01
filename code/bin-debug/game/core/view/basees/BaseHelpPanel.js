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
 * @Date: 2019-05-28 18:08:32
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-28 18:38:58
 * @Description: 竖版造型的帮助界面
 */
var BaseHelpShuPanel = (function (_super) {
    __extends(BaseHelpShuPanel, _super);
    /**
     * @param  {} skinName 皮肤
     * @param  {} tabName
     */
    function BaseHelpShuPanel(skinName, tabName, language) {
        var _this = _super.call(this) || this;
        _this.skinName = skinName;
        _this.language = language;
        _this.imageName = tabName + "_tab_img";
        _this.tabName1 = tabName + "_tab1_";
        _this.tabName2 = tabName + "_tab2_";
        _this.tabName3 = tabName + "_tab3_";
        return _this;
    }
    BaseHelpShuPanel.getInstance = function (skinName, tabName, language) {
        if (language === void 0) { language = ""; }
        if (!BaseHelpShuPanel._instance) {
            BaseHelpShuPanel._instance = new BaseHelpShuPanel(skinName, tabName, language);
        }
        return BaseHelpShuPanel._instance;
    };
    BaseHelpShuPanel.prototype.show = function () {
        GameLayerManager.gameLayer().panelLayer.addChild(this);
    };
    BaseHelpShuPanel.prototype.hide = function () {
        game.UIUtils.removeFromParent(this);
        BaseHelpShuPanel._instance = null;
    };
    BaseHelpShuPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.selectIndex(1);
    };
    BaseHelpShuPanel.prototype.selectIndex = function (number) {
        if (this.currentIndex == number) {
            return;
        }
        this.currentIndex = number;
        for (var i = 1; i <= 3; i++) {
            var tab = this["tab" + i];
            if (i == number) {
                tab.source = this["tabName" + i] + ("1" + this.language);
            }
            else {
                tab.source = this["tabName" + i] + ("2" + this.language);
            }
        }
        this.scroller.stopAnimation();
        this.scroller.viewport.scrollV = 0;
        this.contentImage.source = RES.getRes("" + this.imageName + number + this.language);
    };
    BaseHelpShuPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.tab1:
                majiang.MajiangUtils.playClick();
                this.selectIndex(1);
                break;
            case this.tab2:
                majiang.MajiangUtils.playClick();
                this.selectIndex(2);
                break;
            case this.tab3:
                majiang.MajiangUtils.playClick();
                this.selectIndex(3);
                break;
            case this.closeBtn:
            case this.rects:
                this.rects.visible = false;
                this.hide();
                break;
        }
    };
    return BaseHelpShuPanel;
}(game.BaseComponent));
__reflect(BaseHelpShuPanel.prototype, "BaseHelpShuPanel");
