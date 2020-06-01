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
 * @Author: he bing
 * @Date: 2018-07-31 15:05:10
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-05-11 14:30:42
 * @Description:
 */
var HelpPanel = (function (_super) {
    __extends(HelpPanel, _super);
    function HelpPanel() {
        var _this = _super.call(this) || this;
        //记录选择的游戏帮助的按钮
        _this.btnTimer = 0;
        _this.skinName = new HelpSkin();
        return _this;
    }
    HelpPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showOrFalse(1);
        this.leftBtnChose(1);
        this.textNums();
    };
    HelpPanel.prototype.onTouchTap = function (e) {
        e.stopPropagation();
        switch (e.target) {
            case this.xl_up:
            case this.xl_upw:
            case this.xl_down:
            case this.xl_downw:
                this.help_scroller.stopAnimation();
                this.help_scroller.viewport.scrollV = 0;
                majiang.MajiangUtils.playClick(); //管理声音的
                this.textGroup.removeChildren();
                this.leftBtnChose(1);
                this.showOrFalse(1);
                ImageUtils.showRes(this.texts, this.imageSource(1));
                this.btnTimer = 0;
                this.textGroup.addChild(this.texts);
                this.texts.width = 473;
                this.texts.height = 893;
                break;
            case this.xz_up:
            case this.xz_upw:
            case this.xz_down:
            case this.xz_downw:
                this.help_scroller.stopAnimation();
                this.help_scroller.viewport.scrollV = 0;
                majiang.MajiangUtils.playClick(); //管理声音的
                this.textGroup.removeChildren();
                this.leftBtnChose(2);
                this.showOrFalse(1);
                ImageUtils.showRes(this.texts, this.imageSource(4));
                this.btnTimer = 1;
                this.textGroup.addChild(this.texts);
                this.texts.width = 473;
                this.texts.height = 944;
                break;
            case this.jbgz_1:
            case this.jbgz:
                this.help_scroller.stopAnimation();
                this.help_scroller.viewport.scrollV = 0;
                majiang.MajiangUtils.playClick(); //管理声音的
                this.showOrFalse(1);
                this.textGroup.removeChildren();
                if (this.btnTimer == 0) {
                    ImageUtils.showRes(this.texts, this.imageSource(1));
                    this.texts.height = 893;
                }
                else {
                    ImageUtils.showRes(this.texts, this.imageSource(4));
                    this.texts.height = 944;
                }
                this.textGroup.addChild(this.texts);
                this.texts.width = 473;
                break;
            case this.pxjs_1:
            case this.pxjs:
                this.help_scroller.stopAnimation();
                this.help_scroller.viewport.scrollV = 0;
                majiang.MajiangUtils.playClick(); //管理声音的
                this.showOrFalse(2);
                this.textGroup.removeChildren();
                ImageUtils.showRes(this.texts, this.imageSource(2));
                this.texts.height = 1704.5;
                this.textGroup.addChild(this.texts);
                this.texts.width = 473;
                break;
            case this.tsgz_1:
            case this.tsgz:
                this.help_scroller.stopAnimation();
                this.help_scroller.viewport.scrollV = 0;
                majiang.MajiangUtils.playClick(); //管理声音的
                this.showOrFalse(3);
                this.textGroup.removeChildren();
                ImageUtils.showRes(this.texts, this.imageSource(3));
                this.textGroup.addChild(this.texts);
                this.texts.width = 473;
                this.texts.height = 623.5;
                break;
            case this.closebtn:
            case this.rects:
                this.rects.visible = false;
                CF.sN(PanelNotify.CLOSE_HELP);
                break;
        }
    };
    HelpPanel.prototype.textNums = function () {
        ImageUtils.showRes(this.texts, this.imageSource(1));
        this.texts.width = 473;
        this.texts.height = 893;
    };
    /**
     * 是否显示或者隐藏文字类容
     */
    HelpPanel.prototype.showOrFalse = function (number) {
        switch (number) {
            case 1:
                this.jbgz.visible = true;
                this.jbgz_1.visible = false;
                this.pxjs_1.visible = true;
                this.tsgz_1.visible = true;
                break;
            case 2:
                this.pxjs.visible = true;
                this.pxjs_1.visible = false;
                this.jbgz_1.visible = true;
                this.tsgz_1.visible = true;
                break;
            case 3:
                this.tsgz.visible = true;
                this.tsgz_1.visible = false;
                this.jbgz_1.visible = true;
                this.pxjs_1.visible = true;
                break;
        }
    };
    /**
     * 左边按钮组互斥
     */
    HelpPanel.prototype.leftBtnChose = function (num) {
        if (num == 1) {
            this.xl_up.visible = true;
            this.xl_upw.visible = true;
            this.xz_down.visible = true;
            this.xz_downw.visible = true;
            this.xl_down.visible = false;
            this.xl_downw.visible = false;
            this.xz_up.visible = false;
            this.xz_upw.visible = false;
        }
        else {
            this.xl_down.visible = true;
            this.xl_downw.visible = true;
            this.xz_up.visible = true;
            this.xz_upw.visible = true;
            this.xl_up.visible = false;
            this.xl_upw.visible = false;
            this.xz_down.visible = false;
            this.xz_downw.visible = false;
        }
    };
    HelpPanel.prototype.imageSource = function (Image_number) {
        switch (Image_number) {
            case 1:
                return "mj_1_png";
            case 2:
                return "mj_2_png";
            case 3:
                return "mj_3_png";
            case 4:
                return "mj_4_png";
            case 5:
                return "mj_5_png";
        }
    };
    HelpPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    return HelpPanel;
}(game.BaseComponent));
__reflect(HelpPanel.prototype, "HelpPanel");
