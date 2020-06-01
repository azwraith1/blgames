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
// TypeScript file
var ClubIconItem = (function (_super) {
    __extends(ClubIconItem, _super);
    function ClubIconItem() {
        var _this = _super.call(this) || this;
        _this.skinName = new ClubHeadIconItemSkin();
        return _this;
    }
    ClubIconItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.clubHeadIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseIcon, this);
    };
    ClubIconItem.prototype.initIcon = function (source) {
        if (ClubIconItem.clubIconIdex && source == ClubIconItem.clubIconIdex) {
            this.choosed.visible = this.gou.visible = true;
        }
        this.clubHeadIcon.source = "club_icon_" + source + "_png";
        this.clubHeadIcon.name = source + "";
    };
    ClubIconItem.prototype.chooseIcon = function () {
        if (parseInt(this.clubHeadIcon.name) == ClubIconItem.clubIconIdex)
            return;
        ClubIconItem.clubIconIdex = parseInt(this.clubHeadIcon.name);
        this.choosed.visible = this.gou.visible = true;
        for (var i = 0; i < this.parent.numChildren; i++) {
            var item = this.parent.getChildAt(i);
            item.chooseOtherIcon();
        }
        game.UIUtils.removeSelf(this.parent);
        game.UIUtils.removeSelf(ClubChangeIconPanel._instance);
        ClubChangeIconPanel._instance = null;
        if (ClubIconItem.clubIconIdex) {
            CF.dP(ENo.CLUB_CHANGE_ICON);
        }
    };
    ClubIconItem.prototype.chooseOtherIcon = function () {
        if (parseInt(this.clubHeadIcon.name) == ClubIconItem.clubIconIdex)
            return;
        this.choosed.visible = this.gou.visible = false;
    };
    ClubIconItem.clubIconIdex = 3;
    return ClubIconItem;
}(eui.Component));
__reflect(ClubIconItem.prototype, "ClubIconItem");
