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
    var RBWarZSPattern = (function (_super) {
        __extends(RBWarZSPattern, _super);
        function RBWarZSPattern() {
            var _this = _super.call(this) || this;
            _this.skinName = new RBWarZSPatternSkin();
            return _this;
        }
        RBWarZSPattern.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RBWarZSPattern.prototype.showContent = function (label) {
            this.contentLabel.text = label;
        };
        RBWarZSPattern.prototype.initModel = function (colorType) {
            if (!colorType) {
                this.dbImage.source = RES.getRes("rbw_qs_db4_png");
                this.contentLabel.textColor = 0xffffff;
            }
            else {
                this.dbImage.source = RES.getRes("rbw_qs_db2_png");
                this.contentLabel.textColor = 0x552409;
            }
        };
        return RBWarZSPattern;
    }(eui.Component));
    rbwar.RBWarZSPattern = RBWarZSPattern;
    __reflect(RBWarZSPattern.prototype, "rbwar.RBWarZSPattern");
})(rbwar || (rbwar = {}));
