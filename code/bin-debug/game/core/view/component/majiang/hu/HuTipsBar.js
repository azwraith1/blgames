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
    var HuTipsBar = (function (_super) {
        __extends(HuTipsBar, _super);
        function HuTipsBar() {
            var _this = _super.call(this) || this;
            _this.skinName = new HuTipsBarSkin();
            return _this;
        }
        HuTipsBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.visible = false;
            this.horizontalCenter = 0;
            this.bottom = 150;
        };
        HuTipsBar.prototype.showBar = function (arr) {
            this.itemGroup.removeChildren();
            for (var i = 0; i < arr.length; i++) {
                var data = arr[i];
                var item = new majiang.HuTipsItem(data);
                this.itemGroup.addChild(item);
            }
            this.bgImage.width = this.itemGroup.width + 36;
            this.visible = arr.length > 0;
        };
        HuTipsBar.prototype.hideBar = function () {
            this.itemGroup.removeChildren();
            this.visible = false;
        };
        return HuTipsBar;
    }(eui.Component));
    majiang.HuTipsBar = HuTipsBar;
    __reflect(HuTipsBar.prototype, "majiang.HuTipsBar");
})(majiang || (majiang = {}));
