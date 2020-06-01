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
 * @Date: 2019-05-31 16:24:57
 * @Last Modified by:   real MC Lee
 * @Last Modified time: 2019-05-31 16:24:57
 * @Description:
 */
var sdmn;
(function (sdmn) {
    var SDMNAni = (function (_super) {
        __extends(SDMNAni, _super);
        function SDMNAni() {
            var _this = _super.call(this) || this;
            _this.skinName = "SDMNAniSkin";
            return _this;
        }
        SDMNAni.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return SDMNAni;
    }(game.BaseComponent));
    sdmn.SDMNAni = SDMNAni;
    __reflect(SDMNAni.prototype, "sdmn.SDMNAni");
})(sdmn || (sdmn = {}));
