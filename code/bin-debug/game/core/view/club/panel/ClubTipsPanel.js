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
var ClubTipsPanel = (function (_super) {
    __extends(ClubTipsPanel, _super);
    function ClubTipsPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ClubTipsPanelSkin" + CF.tis;
        return _this;
    }
    Object.defineProperty(ClubTipsPanel, "instance", {
        get: function () {
            if (!ClubTipsPanel._instance) {
                ClubTipsPanel._instance = new ClubTipsPanel();
            }
            return ClubTipsPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubTipsPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.jeishaoBtn.currentState = "down";
        this.guizeBtn.currentState = "up";
        this.imag = new eui.Image("club_jieshao" + CF.tic);
        this.imag.y = 0;
        this.imag.horizontalCenter = -5;
        this.guizeGroup.addChild(this.imag);
    };
    ClubTipsPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.closeTipsBtn:
                game.UIUtils.removeSelf(this);
                game.UIUtils.removeSelf(ClubTipsPanel._instance);
                ClubTipsPanel._instance = null;
                break;
            case this.jeishaoBtn:
                this.switchRule("jieshao");
                break;
            case this.guizeBtn:
                this.switchRule("guize");
                break;
        }
    };
    ClubTipsPanel.prototype.switchRule = function (name) {
        switch (name) {
            case "jieshao":
                if (this.jeishaoBtn.currentState == "down")
                    return;
                this.jeishaoBtn.currentState = "down";
                this.guizeBtn.currentState = "up";
                game.UIUtils.removeSelf(this.imag);
                this.imag = new eui.Image("club_jieshao" + CF.tic);
                this.imag.y = 0;
                this.imag.horizontalCenter = -5;
                this.guizeGroup.addChild(this.imag);
                break;
            case "guize":
                if (this.guizeBtn.currentState == "down")
                    return;
                this.guizeBtn.currentState = "down";
                this.jeishaoBtn.currentState = "up";
                game.UIUtils.removeSelf(this.imag);
                this.imag = new eui.Image("club_ruler_png" + CF.tic);
                this.imag.y = 0;
                this.imag.horizontalCenter = -5;
                this.guizeGroup.addChild(this.imag);
                break;
        }
    };
    return ClubTipsPanel;
}(game.BaseComponent));
__reflect(ClubTipsPanel.prototype, "ClubTipsPanel");
