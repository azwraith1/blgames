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
    var RBWarQSText = (function (_super) {
        __extends(RBWarQSText, _super);
        function RBWarQSText() {
            return _super.call(this) || this;
        }
        RBWarQSText.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RBWarQSText.prototype.showText = function (text) {
            this.textImage.text = text;
        };
        RBWarQSText.prototype.changeBg = function (luckWin) {
            if (!luckWin) {
                this.textImage.textColor = 0xFFFFFF;
                this.dbImage.source = RES.getRes("rb_qs_bar_png");
            }
            else {
                this.textImage.textColor = 0x552409;
                this.dbImage.source = RES.getRes("rb_qs_bar2_png");
            }
        };
        RBWarQSText.prototype.changeTongsha = function () {
            this.textImage.textColor = 0xFFFFFF;
            this.dbImage.source = RES.getRes("rb_qs_bar3_png");
            this.textImage.text = "对七";
        };
        return RBWarQSText;
    }(eui.Component));
    rbwar.RBWarQSText = RBWarQSText;
    __reflect(RBWarQSText.prototype, "rbwar.RBWarQSText");
})(rbwar || (rbwar = {}));
