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
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-31 18:49:16
 * @Description:
 */
var ayls;
(function (ayls) {
    var AYLSBaseIcon = (function (_super) {
        __extends(AYLSBaseIcon, _super);
        function AYLSBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dbName = "ayls_icon_2_guang";
            _this.scatterLightX = 85.5;
            _this.scatterLightY = 71.5;
            _this.scatterLightY2 = 71.5;
            _this.iconKey = "ayls";
            return _this;
        }
        return AYLSBaseIcon;
    }(game.BaseSlotIcon));
    ayls.AYLSBaseIcon = AYLSBaseIcon;
    __reflect(AYLSBaseIcon.prototype, "ayls.AYLSBaseIcon");
})(ayls || (ayls = {}));
