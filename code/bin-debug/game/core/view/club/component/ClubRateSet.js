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
var ClubRateSet = (function (_super) {
    __extends(ClubRateSet, _super);
    function ClubRateSet() {
        var _this = _super.call(this) || this;
        _this.clubItems = [];
        _this.skinName = "ClubRateSetSkin";
        return _this;
    }
    ClubRateSet.prototype.flushUI = function () {
        this.clubRateitemGroup.removeChildren();
        var clubIds = ClubManager.instance.clubIds;
        LogUtils.logD("===ClubRateSet==" + clubIds);
        for (var i = 0; i < clubIds.length; i++) {
            var item = new ClubRateItemCom(clubIds[i]);
            this.clubRateitemGroup.addChild(item);
            this.clubItems.push(item);
        }
    };
    ClubRateSet.prototype.flushInputRate = function (data) {
        for (var i = 0; i < this.clubItems.length; ++i) {
            var club = this.clubItems[i];
            club.setInputRate(data);
        }
    };
    return ClubRateSet;
}(game.BaseComponent));
__reflect(ClubRateSet.prototype, "ClubRateSet");
