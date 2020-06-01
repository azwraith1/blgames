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
 * @Author: reel MC Lee
 * @Date: 2019-08-27 16:38:06
 * @Last Modified by:   reel MC Lee
 * @Last Modified time: 2019-08-27 16:38:06
 * @Description:
 */
var gdzw;
(function (gdzw) {
    var GDZWCardItem = (function (_super) {
        __extends(GDZWCardItem, _super);
        function GDZWCardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "GDZWCardSkin";
            return _this;
        }
        GDZWCardItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.cardAni = new DBComponent("gdzw_icon_1_cheek");
            this.cardAni.play("", 0);
            this.cardAni.x = 75.5;
            this.cardAni.y = 92.5;
            this.addChild(this.cardAni);
        };
        GDZWCardItem.prototype.removeCardAni = function () {
            game.UIUtils.removeSelf(this.cardAni);
        };
        return GDZWCardItem;
    }(game.BaseComponent));
    gdzw.GDZWCardItem = GDZWCardItem;
    __reflect(GDZWCardItem.prototype, "gdzw.GDZWCardItem");
})(gdzw || (gdzw = {}));
