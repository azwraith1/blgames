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
    var RBWarRed = (function (_super) {
        __extends(RBWarRed, _super);
        function RBWarRed() {
            var _this = _super.call(this) || this;
            _this.mineScore = 0;
            _this.totalScore = 0;
            return _this;
        }
        RBWarRed.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchChildren = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        RBWarRed.prototype.init = function (root, index) {
            this.root = root;
            this.index = index;
            this.peillabel.text = "";
            this.mineLabel.text = "0";
            this.totalLabel.text = "0";
        };
        RBWarRed.prototype.onTouchTap = function () {
            if (this.index == 1) {
                this.root.yzRed();
            }
            else if (this.index == 2) {
                this.root.yzBlack();
            }
        };
        /**
         * 更新的我的押注
         */
        RBWarRed.prototype.updateMyValue = function (value, isAdd) {
            if (isAdd) {
                this.mineScore += value;
            }
            else {
                this.mineScore = value;
            }
            this.mineLabel.text = this.mineScore + "";
        };
        /**
         * 更新总押注
         */
        RBWarRed.prototype.updateTotalValue = function (value, isAdd) {
            if (isAdd) {
                this.totalScore += value;
            }
            else {
                this.totalScore = value;
            }
            this.totalLabel.text = this.totalScore + "";
        };
        RBWarRed.prototype.winAni = function () {
            var _this = this;
            this.blinkImage.visible = true;
            this.blinkImage.alpha = 1;
            egret.Tween.get(this.blinkImage, { loop: true }).to({
                alpha: 0
            }, 400).to({
                alpha: 1
            }, 400);
            egret.setTimeout(function () {
                egret.Tween.removeTweens(_this.blinkImage);
                _this.blinkImage.visible = false;
            }, this, 2000);
        };
        return RBWarRed;
    }(eui.Component));
    rbwar.RBWarRed = RBWarRed;
    __reflect(RBWarRed.prototype, "rbwar.RBWarRed");
})(rbwar || (rbwar = {}));
