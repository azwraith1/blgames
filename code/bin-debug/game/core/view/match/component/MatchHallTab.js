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
 * @Author: MC Lee
 * @Date: 2019-11-25 15:54:07
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-11-25 16:42:57
 * @Description: 左侧条
 */
var MatchHallTab = (function (_super) {
    __extends(MatchHallTab, _super);
    function MatchHallTab() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchHallTabBarSkin();
        return _this;
    }
    MatchHallTab.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
    };
    MatchHallTab.prototype.changeImageId = function (gameId) {
        this.gameId = gameId;
        this.changeImage();
    };
    MatchHallTab.prototype.changeImage = function () {
        if (GameConst.MATCH_TAB_INDEX == this.gameId) {
            this.tabImage.source = RES.getRes("match_hall_type" + this.gameId + "_1_png");
        }
        else {
            this.tabImage.source = RES.getRes("match_hall_type" + this.gameId + "_2_png");
        }
    };
    MatchHallTab.prototype.touchTap = function () {
        CF.dP(ENo.MATCH_TAB_TOUCH, this.gameId);
    };
    return MatchHallTab;
}(game.BaseUI));
__reflect(MatchHallTab.prototype, "MatchHallTab");
