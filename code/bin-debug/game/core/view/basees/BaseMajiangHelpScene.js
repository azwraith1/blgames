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
var BaseMajiangHelpScene = (function (_super) {
    __extends(BaseMajiangHelpScene, _super);
    /**
     * @param  {} skinName 皮肤
     * @param  {} tabName
     */
    function BaseMajiangHelpScene(skinName, tabName, gameName) {
        var _this = _super.call(this) || this;
        _this.skinName = skinName;
        _this.gameName = gameName;
        _this.imageName = tabName + "_tab_img";
        _this.tabName1 = tabName + "_tab1_";
        _this.tabName2 = tabName + "_tab2_";
        return _this;
    }
    BaseMajiangHelpScene.getInstance = function (skinName, tabName, gameName) {
        if (!BaseMajiangHelpScene._instance) {
            BaseMajiangHelpScene._instance = new BaseMajiangHelpScene(skinName, tabName, gameName);
        }
        return BaseMajiangHelpScene._instance;
    };
    BaseMajiangHelpScene.prototype.show = function () {
        var _this = this;
        RotationLoading.instance.load(["majiang_common"], "", function () {
            GameLayerManager.gameLayer().panelLayer.addChild(_this);
        });
    };
    BaseMajiangHelpScene.prototype.hide = function () {
        game.UIUtils.removeFromParent(this);
        BaseMajiangHelpScene._instance = null;
    };
    BaseMajiangHelpScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.selectIndex(1);
        this.scroller.scrollPolicyH = "off";
    };
    BaseMajiangHelpScene.prototype.selectIndex = function (number) {
        if (this.currentIndex == number) {
            return;
        }
        if (!this.gameName) {
            return;
        }
        this.currentIndex = number;
        for (var i = 1; i <= 2; i++) {
            var tab = this["tab" + i];
            if (i == number) {
                tab.source = this["tabName" + i] + "1_png";
            }
            else {
                tab.source = this["tabName" + i] + "2_png";
            }
        }
        this.scroller.stopAnimation();
        this.scroller.viewport.scrollV = 0;
        if (this.gameName == "gyzjmj") {
            this.contentImage.scaleX = 0.94;
            this.contentImage.scaleY = 0.94;
        }
        this.contentImage.source = RES.getRes(this.gameName + "_help_" + number + "_png");
    };
    BaseMajiangHelpScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.tab1:
                majiang.MajiangUtils.playClick();
                this.selectIndex(1);
                break;
            case this.tab2:
                majiang.MajiangUtils.playClick();
                this.selectIndex(2);
                break;
            case this.closeBtn:
            case this.rects:
                this.hide();
                break;
        }
    };
    return BaseMajiangHelpScene;
}(game.BaseComponent));
__reflect(BaseMajiangHelpScene.prototype, "BaseMajiangHelpScene");
