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
var bjle;
(function (bjle) {
    var BJLCmBtn = (function (_super) {
        __extends(BJLCmBtn, _super);
        function BJLCmBtn(isNew) {
            var _this = _super.call(this) || this;
            if (isNew) {
                _this.skinName = new BJLCmSkin();
            }
            return _this;
        }
        BJLCmBtn.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOn, this);
        };
        BJLCmBtn.prototype.touchOn = function () {
            CF.dP(ENo.RBWAR_CM_TOUCH, this.value);
        };
        /**
         * 根据筹码的值的大小修改值的大小
         */
        BJLCmBtn.prototype.setContent = function (value) {
            this.value = value;
            var temp = value;
            if (value < 1000) {
                this.valueLabel.scaleX = this.valueLabel.scaleY = 1;
            }
            else if (value >= 1000 && value < 10000) {
                temp = value / 1000 + "K";
                //this.valueLabel.scaleX = this.valueLabel.scaleY = 0.8;
                //this.valueLabel.scaleX = this.valueLabel.scaleY = 0.9;
            }
            else {
                temp = value / 10000 + "W";
                // this.valueLabel.scaleX = this.valueLabel.scaleY = 0.8;
            }
            //this.valueLabel.text = value;
            if (temp.toString().length == 4) {
                this.valueLabel.scaleX = this.valueLabel.scaleY = 0.85;
            }
            if (temp.toString().length > 4) {
                this.valueLabel.scaleX = this.valueLabel.scaleY = 0.75;
            }
            this.valueLabel.text = temp;
        };
        /**
         * 筹码设值
         */
        BJLCmBtn.prototype.setIndex = function (index) {
            this.index = index;
            this.dbImage.source = RES.getRes("bjle_cm_" + index + "_png");
        };
        BJLCmBtn.prototype.setTouchon = function (value) {
            this.lightImage.visible = this.value == value;
        };
        return BJLCmBtn;
    }(eui.Component));
    bjle.BJLCmBtn = BJLCmBtn;
    __reflect(BJLCmBtn.prototype, "bjle.BJLCmBtn");
})(bjle || (bjle = {}));
