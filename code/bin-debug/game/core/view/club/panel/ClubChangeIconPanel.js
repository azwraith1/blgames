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
var ClubChangeIconPanel = (function (_super) {
    __extends(ClubChangeIconPanel, _super);
    function ClubChangeIconPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ClubChangeHeadPanelSkin";
        return _this;
    }
    ClubChangeIconPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.headScroller.scrollPolicyV = "off";
        this.initList();
    };
    Object.defineProperty(ClubChangeIconPanel, "instance", {
        get: function () {
            if (!ClubChangeIconPanel._instance) {
                ClubChangeIconPanel._instance = new ClubChangeIconPanel();
            }
            return ClubChangeIconPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubChangeIconPanel.prototype.initList = function () {
        for (var i = 1; i <= CLUB_HEAD.length; i++) {
            var item = new ClubIconItem();
            item.initIcon(i);
            if (i % 2 == 1) {
                item.x = Math.floor((i - 1) / 2) * (136 + 20);
                item.y = 10;
                this.iconGroup.addChild(item);
            }
            else {
                item.x = Math.floor((i - 1) / 2) * (136 + 20);
                item.y = 137 + 20;
                this.iconGroup.addChild(item);
            }
        }
    };
    ClubChangeIconPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.outrect:
                game.UIUtils.removeSelf(this);
                game.UIUtils.removeSelf(ClubChangeIconPanel._instance);
                ClubChangeIconPanel._instance = null;
                if (ClubIconItem.clubIconIdex) {
                    CF.dP(ENo.CLUB_CHANGE_ICON);
                }
                ClubIconItem.clubIconIdex = 3;
                break;
        }
    };
    return ClubChangeIconPanel;
}(game.BaseComponent));
__reflect(ClubChangeIconPanel.prototype, "ClubChangeIconPanel");
var CLUB_HEAD = [1, 2, 3, 4, 5, 6, 7, 8, 9];
