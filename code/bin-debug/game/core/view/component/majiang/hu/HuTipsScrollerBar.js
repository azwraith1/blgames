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
    var HuTipsScrollerBar = (function (_super) {
        __extends(HuTipsScrollerBar, _super);
        function HuTipsScrollerBar() {
            var _this = _super.call(this) || this;
            _this.needCheck = false;
            _this.skinName = "HuTipsScrollerBarSkin";
            return _this;
        }
        HuTipsScrollerBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.visible = false;
            this.horizontalCenter = 0;
            if (!this.verticalCenter) {
                this.bottom = 150;
            }
        };
        HuTipsScrollerBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        HuTipsScrollerBar.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        HuTipsScrollerBar.prototype.enterFrame = function () {
            if (this.needCheck) {
                var scrollerX = this.scroller.viewport.scrollH;
                if (scrollerX == 0) {
                    this.leftImage.visible = false;
                }
                else if (scrollerX == (this.scroller.viewport.contentWidth - this.scroller.viewport.width)) {
                    this.rightImage.visible = false;
                }
                else {
                    this.rightImage.visible = true;
                    this.leftImage.visible = true;
                }
            }
        };
        HuTipsScrollerBar.prototype.showBar = function (arr, length) {
            if (length === void 0) { length = 8; }
            this.itemGroup.removeChildren();
            var width = 0;
            var width2 = 0;
            for (var i = 0; i < arr.length; i++) {
                var data = arr[i];
                var item = new majiang.HuTipsItem(data);
                this.itemGroup.addChild(item);
                if (i < length) {
                    // if (i != arr.length - 1) {
                    width += item.width + 40;
                    width2 += item.width + 30;
                    // }
                }
            }
            this.bgImage.width = width;
            this.scroller.width = width2 - 30;
            this.visible = arr.length > 0;
            this.needCheck = arr.length > 8;
            this.leftImage.visible = this.rightImage.visible = arr.length > length;
            this.leftImage.x = 20;
            this.rightImage.x = width - 10;
            this.scroller.viewport.scrollH = 0;
        };
        HuTipsScrollerBar.prototype.hideBar = function () {
            this.itemGroup.removeChildren();
            this.visible = false;
            this.needCheck = false;
        };
        return HuTipsScrollerBar;
    }(game.BaseUI));
    majiang.HuTipsScrollerBar = HuTipsScrollerBar;
    __reflect(HuTipsScrollerBar.prototype, "majiang.HuTipsScrollerBar");
})(majiang || (majiang = {}));
