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
var sdmn;
(function (sdmn) {
    var SDMNAniItem = (function (_super) {
        __extends(SDMNAniItem, _super);
        function SDMNAniItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "SDMNAniItemSkin";
            return _this;
        }
        SDMNAniItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return SDMNAniItem;
    }(game.BaseComponent));
    sdmn.SDMNAniItem = SDMNAniItem;
    __reflect(SDMNAniItem.prototype, "sdmn.SDMNAniItem");
})(sdmn || (sdmn = {}));
