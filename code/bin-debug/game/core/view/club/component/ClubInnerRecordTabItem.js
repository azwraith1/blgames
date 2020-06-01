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
var ClubInnerRecordTabItem = (function (_super) {
    __extends(ClubInnerRecordTabItem, _super);
    function ClubInnerRecordTabItem(gameId) {
        var _this = _super.call(this) || this;
        _this.isSelect = false;
        _this.gameId = gameId;
        _this.skinName = "ClubInnerRecordTabItemSkin";
        return _this;
    }
    Object.defineProperty(ClubInnerRecordTabItem.prototype, "gameID", {
        get: function () {
            return this.gameId;
        },
        enumerable: true,
        configurable: true
    });
    ClubInnerRecordTabItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ClubInnerRecordTabItem.prototype.showStatus = function (isSeelect) {
        this.isSelect = isSeelect;
        if (isSeelect) {
            this.gameIdImage.source = "club_game_" + this.gameId + "_down_png";
        }
        else {
            this.gameIdImage.source = "club_game_" + this.gameId + "_up_png";
        }
        if (TextUtils.instance.currentLanguage == "ko_kr") {
            TextUtils.instance.changeImage(this.gameIdImage);
        }
    };
    ClubInnerRecordTabItem.prototype.onTouchTap = function (e) {
        if (this.isSelect) {
            return;
        }
        CF.dP(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this);
    };
    return ClubInnerRecordTabItem;
}(game.BaseUI));
__reflect(ClubInnerRecordTabItem.prototype, "ClubInnerRecordTabItem");
