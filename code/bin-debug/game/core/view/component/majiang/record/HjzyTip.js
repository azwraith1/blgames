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
    var HjzyTip = (function (_super) {
        __extends(HjzyTip, _super);
        function HjzyTip() {
            var _this = _super.call(this) || this;
            _this.skinName = new HjzyTipSkin();
            return _this;
        }
        HjzyTip.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.UIUtils.setAnchorPot(this);
        };
        HjzyTip.prototype.showText = function (value) {
            if (value > 0) {
                this.tipImage.visible = false;
                this.valueText.font = "ying_font_fnt";
            }
            else {
                this.tipImage.visible = true;
                this.valueText.font = "shu_font_fnt";
            }
            var text = value;
            if (value >= 0) {
                text = "+" + NumberFormat.handleFloatDecimalStr(value);
            }
            this.valueText.text = text;
        };
        /**
         * 展现动画
         */
        HjzyTip.prototype.showAni = function () {
            var _this = this;
            var pos = { alpha: 1 };
            if (this.horizontalCenter) {
                pos['horizontalCenter'] = this.horizontalCenter + 30;
            }
            else if (this.left) {
                pos['left'] = this.left + 30;
            }
            else if (this.right) {
                pos['right'] = this.right - 30;
            }
            this.alpha = 0;
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to(pos, 300).to({
                alpha: 0
            }, 1000).call(function () {
                game.UIUtils.removeSelf(_this);
            });
        };
        return HjzyTip;
    }(eui.Component));
    majiang.HjzyTip = HjzyTip;
    __reflect(HjzyTip.prototype, "majiang.HjzyTip");
})(majiang || (majiang = {}));
