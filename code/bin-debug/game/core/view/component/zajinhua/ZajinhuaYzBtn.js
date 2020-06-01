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
    var ZajinhuaYzBtn = (function (_super) {
        __extends(ZajinhuaYzBtn, _super);
        function ZajinhuaYzBtn(isNew) {
            var _this = _super.call(this) || this;
            _this.values = [];
            if (isNew) {
                _this.skinName = new ZajinhuaYZBtn();
            }
            return _this;
        }
        ZajinhuaYzBtn.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        ZajinhuaYzBtn.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOn, this);
        };
        ZajinhuaYzBtn.prototype.addTouchOn = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOn, this);
        };
        ZajinhuaYzBtn.prototype.touchOn = function () {
            CF.dP(ENo.ZJH_CM_TOUCH, this.value);
        };
        ZajinhuaYzBtn.prototype.setContent = function (value) {
            this.value = value;
            if (value < 100) {
                this.valueLabel.scaleX = this.valueLabel.scaleY = 0.9;
            }
            else if (value >= 100 && value < 1000) {
                this.valueLabel.scaleX = this.valueLabel.scaleY = 0.8;
            }
            else {
                this.valueLabel.scaleX = 0.7;
                this.valueLabel.scaleY = 0.8;
            }
            this.valueLabel.text = value;
        };
        ZajinhuaYzBtn.prototype.setIndex = function (index) {
            this.index = index;
            this.dbImage.source = RES.getRes("zjh_cm" + index + "_png");
        };
        ZajinhuaYzBtn.prototype.setTouchon = function (value) {
            //this.lightImage.visible = 1 == value;
            this.touchEnabled = 1 == value;
        };
        return ZajinhuaYzBtn;
    }(game.BaseUI));
    zajinhua.ZajinhuaYzBtn = ZajinhuaYzBtn;
    __reflect(ZajinhuaYzBtn.prototype, "zajinhua.ZajinhuaYzBtn");
})(zajinhua || (zajinhua = {}));
