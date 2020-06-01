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
var NetStatus = (function (_super) {
    __extends(NetStatus, _super);
    function NetStatus() {
        var _this = _super.call(this) || this;
        _this.skinName = new NetStatusSkin();
        return _this;
    }
    NetStatus.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.ycGroup1.addEventListener(egret.TouchEvent.TOUCH_END, this.ycGroup1Touch, this);
    };
    NetStatus.prototype.ycGroup1Touch = function () {
        var _this = this;
        egret.clearTimeout(this.outTimeout);
        if (!this.ycGroup2.visible) {
            this.outTimeout = egret.setTimeout(function () {
                _this.ycGroup2.visible = false;
            }, this, 2000);
        }
        this.ycGroup2.visible = !this.ycGroup2.visible;
    };
    NetStatus.prototype.changePings = function (ping) {
        this.ping = ping;
        if (ping <= 200) {
            this.countLabel.textColor = 0X00CC00;
            this.ycImage.source = RES.getRes("main_yc1_png");
        }
        else if (ping <= 400) {
            this.countLabel.textColor = 0Xf2ca0d;
            this.ycImage.source = RES.getRes("main_yc2_png");
        }
        else if (ping <= 600) {
            this.countLabel.textColor = 0Xf2ca0d;
            this.ycImage.source = RES.getRes("main_yc3_png");
        }
        else if (ping <= 1000) {
            this.countLabel.textColor = 0Xea0101;
            this.ycImage.source = RES.getRes("main_yc4_png");
        }
        else {
            this.countLabel.textColor = 0Xea0101;
            this.ycImage.source = RES.getRes("main_yc5_png");
        }
        this.countLabel.text = TextUtils.instance.getCurrentTextById(103) + " " + this.ping + "ms";
    };
    NetStatus.prototype.changePositions = function (top, bottom, left, right) {
        var parent = this.parent;
        game.UIUtils.removeSelf(this);
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        parent.addChild(this);
    };
    NetStatus.prototype.changePositionVH = function (verticalCenter, horizontalCenter) {
        this.verticalCenter = verticalCenter;
        this.horizontalCenter = horizontalCenter;
        this.top = null;
        this.bottom = null;
        this.left = null;
        this.right = null;
    };
    return NetStatus;
}(eui.Component));
__reflect(NetStatus.prototype, "NetStatus");
