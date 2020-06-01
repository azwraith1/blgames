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
    var RBWarXyBtn = (function (_super) {
        __extends(RBWarXyBtn, _super);
        function RBWarXyBtn() {
            var _this = _super.call(this) || this;
            _this.canTouch = false;
            return _this;
        }
        ;
        RBWarXyBtn.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOn, this);
        };
        RBWarXyBtn.prototype.touchOn = function () {
            if (this.canTouch) {
                CF.dP(ENo.RBWAR_XUYA);
            }
        };
        RBWarXyBtn.prototype.setGray = function (gray) {
            this.canTouch = !gray;
            if (gray) {
                this.dbImage.source = RES.getRes("game_cm_6_2_png");
            }
            else {
                this.dbImage.source = RES.getRes("game_cm_6_1_png");
            }
        };
        return RBWarXyBtn;
    }(eui.Component));
    rbwar.RBWarXyBtn = RBWarXyBtn;
    __reflect(RBWarXyBtn.prototype, "rbwar.RBWarXyBtn");
})(rbwar || (rbwar = {}));
