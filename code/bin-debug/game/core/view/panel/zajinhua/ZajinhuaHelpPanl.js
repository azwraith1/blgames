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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaHelpPanl = (function (_super) {
        __extends(ZajinhuaHelpPanl, _super);
        function ZajinhuaHelpPanl() {
            var _this = _super.call(this) || this;
            _this.skinName = new ZajinhuaHelpSkin();
            return _this;
        }
        ZajinhuaHelpPanl.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.jbgzBtn.selected = true;
            this.images.source = RES.getRes(this.imageSource(1));
            this.imageGroup.addChild(this.images);
            // this.images.width = 680;
            // this.images.height = 803;
            this.scor.scrollPolicyH = "off";
            // this.scor.bounces = false;
        };
        ZajinhuaHelpPanl.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.pxsmBtn:
                    this.images.source = RES.getRes(this.imageSource(2));
                    this.scor.viewport.scrollV = 0;
                    // this.imageGroup.addChild(this.images);
                    break;
                case this.jbgzBtn:
                    this.scor.viewport.scrollV = 0;
                    this.images.source = RES.getRes(this.imageSource(1));
                    // this.imageGroup.addChild(this.images);
                    break;
                case this.closeBtn:
                case this.rects:
                    this.rects.visible = false;
                    CF.sN(PanelNotify.CLOSE_ZJHHELP);
                    break;
            }
        };
        ZajinhuaHelpPanl.prototype.textNums = function () {
        };
        /**
         * 是否显示或者隐藏文字类容
         */
        ZajinhuaHelpPanl.prototype.showOrFalse = function (number) {
        };
        /**
         * 左边按钮组互斥
         */
        ZajinhuaHelpPanl.prototype.leftBtnChose = function (num) {
        };
        ZajinhuaHelpPanl.prototype.imageSource = function (Image_number) {
            switch (Image_number) {
                case 1:
                    return "zjh_rule_png";
                case 2:
                    return "zjh_pxjs_png";
            }
        };
        ZajinhuaHelpPanl.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        return ZajinhuaHelpPanl;
    }(game.BaseComponent));
    zajinhua.ZajinhuaHelpPanl = ZajinhuaHelpPanl;
    __reflect(ZajinhuaHelpPanl.prototype, "zajinhua.ZajinhuaHelpPanl");
})(zajinhua || (zajinhua = {}));
