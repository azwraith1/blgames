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
/*
 * @Author: real MC Lee
 * @Date: 2019-06-04 16:24:50
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-12 17:27:33
 * @Description:
 */
var bskg;
(function (bskg) {
    var BSKGIcon = (function (_super) {
        __extends(BSKGIcon, _super);
        function BSKGIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = "BSKGIconSkin";
            return _this;
        }
        BSKGIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        BSKGIcon.prototype.showRect = function () {
            this.rect.visible = true;
            this.addChild(this.rect);
        };
        BSKGIcon.prototype.hideRect = function () {
            this.rect.visible = false;
        };
        return BSKGIcon;
    }(bskg.BSKGBaseIcon));
    bskg.BSKGIcon = BSKGIcon;
    __reflect(BSKGIcon.prototype, "bskg.BSKGIcon");
})(bskg || (bskg = {}));
