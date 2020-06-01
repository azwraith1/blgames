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
var majiang;
(function (majiang) {
    var HZMJHelpPanel = (function (_super) {
        __extends(HZMJHelpPanel, _super);
        function HZMJHelpPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = new DZMJHelpPanelSkin();
            return _this;
        }
        HZMJHelpPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.jbgzBtn.selected = true;
            this.images.source = RES.getRes(this.imageSource(1));
            this.images.scaleX = this.images.scaleY = 0.5;
            // this.imageGroup.addChild(this.images);
            this.scor.scrollPolicyH = "off";
        };
        HZMJHelpPanel.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.pxgzBtn:
                    this.images.source = RES.getRes(this.imageSource(2));
                    this.scor.stopAnimation();
                    this.scor.viewport.scrollV = 0;
                    this.images.scaleX = this.images.scaleY = 1;
                    // this.imageGroup.addChild(this.images);
                    break;
                case this.jbgzBtn:
                    this.scor.stopAnimation();
                    this.scor.viewport.scrollV = 0;
                    this.images.source = RES.getRes(this.imageSource(1));
                    this.images.scaleX = this.images.scaleY = 0.5;
                    // this.imageGroup.addChild(this.images);
                    break;
                case this.closeBtn:
                case this.rects:
                    this.rects.visible = false;
                    CF.sN(PanelNotify.CLOSE_DZMJ_HELP);
                    break;
            }
        };
        HZMJHelpPanel.prototype.textNums = function () {
        };
        /**
         * 是否显示或者隐藏文字类容
         */
        HZMJHelpPanel.prototype.showOrFalse = function (number) {
        };
        /**
         * 左边按钮组互斥
         */
        HZMJHelpPanel.prototype.leftBtnChose = function (num) {
        };
        HZMJHelpPanel.prototype.imageSource = function (Image_number) {
            switch (Image_number) {
                case 1:
                    return "dzmj_help_jbgz_png";
                case 2:
                    return "dzmj_help_fxgz_png";
            }
        };
        HZMJHelpPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        return HZMJHelpPanel;
    }(game.BaseComponent));
    majiang.HZMJHelpPanel = HZMJHelpPanel;
    __reflect(HZMJHelpPanel.prototype, "majiang.HZMJHelpPanel");
})(majiang || (majiang = {}));
