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
 * @Date: 2019-09-23 10:43:14
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-24 19:36:30
 * @Description: 卡五星灯泡提示
 */
var HBMJLightTip = (function (_super) {
    __extends(HBMJLightTip, _super);
    function HBMJLightTip() {
        return _super.call(this) || this;
    }
    HBMJLightTip.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.tipBtn.visible = this.tipScroller.visible = false;
    };
    HBMJLightTip.prototype.setPlayerIndex = function (index) {
        this.playerIndex = index;
    };
    HBMJLightTip.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.tipBtn:
                this.tipBtnTouch();
                break;
        }
    };
    HBMJLightTip.prototype.tipBtnTouch = function () {
        if (this.tipScroller.visible) {
            this.tipScroller.visible = false;
        }
        else {
            var playerData = Global.gameProxy.getPlayerByIndex(this.playerIndex);
            var cards = playerData.canHuCards;
            for (var i = 0; i < cards.length; i++) {
                var cardData = cards[i];
                var count = majiang.MajiangUtils.findValueLess(cardData.card);
                cardData["count"] = count;
            }
            this.tipScroller.showBar(playerData.canHuCards, 3);
        }
    };
    HBMJLightTip.prototype.showLightTip = function () {
        this.tipBtn.visible = true;
        this.visible = true;
    };
    return HBMJLightTip;
}(game.BaseUI));
__reflect(HBMJLightTip.prototype, "HBMJLightTip");
