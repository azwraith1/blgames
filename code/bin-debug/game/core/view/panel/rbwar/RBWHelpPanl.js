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
var rbwar;
(function (rbwar) {
    var RBWHelpPanl = (function (_super) {
        __extends(RBWHelpPanl, _super);
        function RBWHelpPanl() {
            var _this = _super.call(this) || this;
            _this.skinName = new RBWHelpPanlSkin();
            return _this;
        }
        RBWHelpPanl.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.jbgzBtn.selected = true;
            this.images.source = RES.getRes(this.imageSource(1));
            this.imageGroup.addChild(this.images);
            this.images.width = 792;
            // this.images.height = 800;
            this.scor.bounces = true;
        };
        RBWHelpPanl.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            this.scor.viewport.scrollV = 0;
            switch (e.target) {
                case this.pfBtn:
                    this.images.source = RES.getRes(this.imageSource(3));
                    this.imageGroup.addChild(this.images);
                    this.images.width = 792;
                    // this.images.height = 800;
                    break;
                case this.pxsmBtn:
                    this.images.source = RES.getRes(this.imageSource(2));
                    this.imageGroup.addChild(this.images);
                    this.images.width = 792;
                    // this.images.height = 800;
                    break;
                case this.jbgzBtn:
                    this.images.source = RES.getRes(this.imageSource(1));
                    this.imageGroup.addChild(this.images);
                    this.images.width = 792;
                    // this.images.height = 800;
                    break;
                case this.closeBtn:
                case this.rects:
                    this.rects.visible = false;
                    CF.sN(PanelNotify.CLOSE_RBWARHELP);
                    break;
            }
        };
        RBWHelpPanl.prototype.textNums = function () {
        };
        /**
         * 是否显示或者隐藏文字类容
         */
        RBWHelpPanl.prototype.showOrFalse = function (number) {
        };
        /**
         * 左边按钮组互斥
         */
        RBWHelpPanl.prototype.leftBtnChose = function (num) {
        };
        RBWHelpPanl.prototype.imageSource = function (Image_number) {
            switch (Image_number) {
                case 1:
                    return "rbw_1_png";
                case 2:
                    return "rbw_2_png";
                case 3:
                    return "rbw_3_png";
            }
        };
        RBWHelpPanl.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        return RBWHelpPanl;
    }(game.BaseComponent));
    rbwar.RBWHelpPanl = RBWHelpPanl;
    __reflect(RBWHelpPanl.prototype, "rbwar.RBWHelpPanl");
})(rbwar || (rbwar = {}));
