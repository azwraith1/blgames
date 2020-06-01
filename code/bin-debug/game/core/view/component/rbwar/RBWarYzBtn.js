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
    var RBWarYzBtn = (function (_super) {
        __extends(RBWarYzBtn, _super);
        function RBWarYzBtn(isNew) {
            var _this = _super.call(this) || this;
            if (isNew) {
                _this.skinName = new RBWarYzBtnSkin();
            }
            return _this;
        }
        RBWarYzBtn.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOn, this);
        };
        RBWarYzBtn.prototype.touchOn = function () {
            CF.dP(ENo.RBWAR_CM_TOUCH, this.value);
        };
        RBWarYzBtn.prototype.setContent = function (value) {
            this.value = value;
            if (value < 1000) {
                this.valueLabel.scaleX = this.valueLabel.scaleY = 1;
            }
            else if (value >= 1000 && value < 10000) {
                this.valueLabel.scaleX = this.valueLabel.scaleY = 0.8;
            }
            else {
                this.valueLabel.scaleX = this.valueLabel.scaleY = 0.7;
            }
            this.valueLabel.text = value;
        };
        RBWarYzBtn.prototype.setIndex = function (index) {
            this.index = index;
            this.dbImage.source = RES.getRes("game_cm_" + index + "_1_png");
        };
        RBWarYzBtn.prototype.setTouchon = function (value) {
            this.lightImage.visible = this.value == value;
        };
        return RBWarYzBtn;
    }(eui.Component));
    rbwar.RBWarYzBtn = RBWarYzBtn;
    __reflect(RBWarYzBtn.prototype, "rbwar.RBWarYzBtn");
})(rbwar || (rbwar = {}));
