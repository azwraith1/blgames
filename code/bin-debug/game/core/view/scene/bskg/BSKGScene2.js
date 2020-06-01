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
 * @Date: 2019-06-04 16:24:26
 * @Last Modified by:   real MC Lee
 * @Last Modified time: 2019-06-04 16:24:26
 * @Description:
 */
var bskg;
(function (bskg) {
    var BSKGScene2 = (function (_super) {
        __extends(BSKGScene2, _super);
        function BSKGScene2() {
            var _this = _super.call(this) || this;
            _this.skinName = "BSKGScene2Skin";
            return _this;
        }
        return BSKGScene2;
    }(game.BaseScene));
    bskg.BSKGScene2 = BSKGScene2;
    __reflect(BSKGScene2.prototype, "bskg.BSKGScene2");
})(bskg || (bskg = {}));
