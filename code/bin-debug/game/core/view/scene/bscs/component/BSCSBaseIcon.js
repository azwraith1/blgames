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
 * @Date: 2019-07-31 13:49:24
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-09-10 14:51:19
 * @Description:
 */
var bscs;
(function (bscs) {
    var BSCSBaseIcon = (function (_super) {
        __extends(BSCSBaseIcon, _super);
        function BSCSBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "bscs";
            _this.dbName = "bscq_icon_2_guang";
            _this.scatterLightX = 102;
            _this.scatterLightY = 81;
            _this.scatterLightY2 = 81;
            return _this;
        }
        return BSCSBaseIcon;
    }(game.BaseSlotIcon));
    bscs.BSCSBaseIcon = BSCSBaseIcon;
    __reflect(BSCSBaseIcon.prototype, "bscs.BSCSBaseIcon");
})(bscs || (bscs = {}));
