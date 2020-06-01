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
 * @Date: 2019-11-28 14:43:44
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-13 21:07:05
 * @Description: 比赛结束
 */
var MatchInvitePanel = (function (_super) {
    __extends(MatchInvitePanel, _super);
    function MatchInvitePanel() {
        var _this = _super.call(this) || this;
        if (GameConfig.CURRENT_ISSHU) {
            _this.skinName = new MatchInvitePanelShuSkin();
            return _this;
        }
        _this.skinName = new MatchInvitePanelSkin();
        return _this;
    }
    Object.defineProperty(MatchInvitePanel, "instance", {
        get: function () {
            if (!MatchInvitePanel._instance) {
                MatchInvitePanel._instance = new MatchInvitePanel();
            }
            return MatchInvitePanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchInvitePanel.prototype.show = function () {
        GameLayerManager.gameLayer().maskLayer.addChild(this);
    };
    MatchInvitePanel.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        MatchInvitePanel._instance = null;
    };
    MatchInvitePanel.prototype.s_pushRaceInvite = function () {
    };
    MatchInvitePanel.prototype.clubInvite = function (e) {
    };
    MatchInvitePanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.Tween.get(this.guangImage, { loop: true }).to({
            rotation: 360
        }, 5000);
    };
    MatchInvitePanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.enterBtn:
                this.enterBtnTouch();
                break;
            case this.closeBtn:
                this.closeBtnTouch();
                break;
        }
    };
    MatchInvitePanel.prototype.closeBtnTouch = function () {
        this.hide();
    };
    MatchInvitePanel.prototype.enterBtnTouch = function () {
        var _this = this;
        if (GameConfig.CURRENT_ISSHU) {
            RotationLoadingShu.instance.load(['match_hall'], "", function () {
                _this.hide();
                CF.dP(ENo.CLOSE_ALL);
                CF.sN(SceneNotify.OPEN_MATCH_HALL);
            });
        }
        else {
            RotationLoading.instance.load(['match_hall'], "", function () {
                _this.hide();
                CF.dP(ENo.CLOSE_ALL);
                CF.sN(SceneNotify.OPEN_MATCH_HALL);
            });
        }
    };
    return MatchInvitePanel;
}(BaseScalePanel));
__reflect(MatchInvitePanel.prototype, "MatchInvitePanel");
