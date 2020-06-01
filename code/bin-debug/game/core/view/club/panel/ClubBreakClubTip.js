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
var ClubBreakClubTip = (function (_super) {
    __extends(ClubBreakClubTip, _super);
    function ClubBreakClubTip() {
        var _this = _super.call(this) || this;
        _this.skinName = "ClubBreakClubPanelSkin" + CF.tis; //"ClubBreakClubPanelSkin";
        return _this;
    }
    ClubBreakClubTip.prototype.onTouchTap = function (e) {
        _super.prototype.onTouchTap.call(this, e);
        e.stopPropagation();
        switch (e.target) {
            case this.rejectBtn:
                this.hide();
                break;
            case this.saveBtn:
                if (this.onClickSave)
                    this.onClickSave.call(this.thisObj);
                this.hide();
                break;
        }
    };
    Object.defineProperty(ClubBreakClubTip, "instance", {
        get: function () {
            if (!ClubBreakClubTip._instance) {
                ClubBreakClubTip._instance = new ClubBreakClubTip();
            }
            return ClubBreakClubTip._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubBreakClubTip.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        ClubBreakClubTip._instance = null;
    };
    ClubBreakClubTip.prototype.show = function (content, onclickSave, thisObj) {
        if (onclickSave === void 0) { onclickSave = null; }
        if (thisObj === void 0) { thisObj = null; }
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.onClickSave = onclickSave;
        this.thisObj = thisObj;
        this.contentTxt.text = content;
    };
    return ClubBreakClubTip;
}(game.BaseComponent));
__reflect(ClubBreakClubTip.prototype, "ClubBreakClubTip");
