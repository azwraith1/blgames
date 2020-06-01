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
var ClubInnerTabItem = (function (_super) {
    __extends(ClubInnerTabItem, _super);
    function ClubInnerTabItem(gameId) {
        var _this = _super.call(this) || this;
        _this.gameId = gameId;
        _this.skinName = new ClubInnerTabItemSkin();
        return _this;
    }
    ClubInnerTabItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ClubInnerTabItem.prototype.showStatus = function (isSeelect) {
        if (isSeelect) {
            this.selectImage.visible = true;
            this.gameIdImage.source = RES.getRes("club_game_" + this.gameId + "_2_png");
        }
        else {
            this.selectImage.visible = false;
            this.gameIdImage.source = RES.getRes("club_game_" + this.gameId + "_1_png");
        }
    };
    ClubInnerTabItem.prototype.onTouchTap = function (e) {
        if (this.selectImage.visible) {
            return;
        }
        CF.dP(ENo.CLUB_INNER_ITEM_TOUCH, this);
    };
    return ClubInnerTabItem;
}(game.BaseUI));
__reflect(ClubInnerTabItem.prototype, "ClubInnerTabItem");
