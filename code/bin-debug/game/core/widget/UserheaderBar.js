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
// TypeScript file
var UserheaderBar = (function (_super) {
    __extends(UserheaderBar, _super);
    function UserheaderBar() {
        var _this = _super.call(this) || this;
        _this.skinName = new UserHeaderBarSkin();
        return _this;
    }
    UserheaderBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOn, this);
    };
    UserheaderBar.prototype.touchOn = function () {
        var info = { figureUrl: this.value, sex: this.sex };
        CF.dP(ENo.CHANG_PLAYER, info);
    };
    UserheaderBar.prototype.setContent = function (value, sex) {
        this.value = value;
        this.sex = sex;
        this.playerImage.source = "hall_header_" + sex + "_" + value + "_png";
    };
    UserheaderBar.prototype.setTouchon = function (value) {
        this.select_kuang.visible = this.value == value;
        this.chose.visible = this.value == value;
    };
    UserheaderBar.prototype.defut = function () {
        this.select_kuang.visible = true;
        this.chose.visible = true;
    };
    return UserheaderBar;
}(eui.Component));
__reflect(UserheaderBar.prototype, "UserheaderBar");
