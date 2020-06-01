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
 * @Date: 2019-06-12 11:36:05
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 11:58:00
 * @Description: 筹码组
 */
var BlackJCMGroup = (function (_super) {
    __extends(BlackJCMGroup, _super);
    function BlackJCMGroup() {
        var _this = _super.call(this) || this;
        _this.coinLists = [];
        return _this;
    }
    BlackJCMGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.tipLabel.text = CF.tigc(143);
    };
    BlackJCMGroup.prototype.init = function (index) {
        this.index = index;
        this.indexLabel.text = index;
    };
    /**
     * 可以下注的提示
     * @param  {} visible
     */
    BlackJCMGroup.prototype.showCanYZTip = function (visible) {
        this.tipImage.visible = visible;
        if (visible) {
            egret.Tween.get(this.tipImage, { loop: true }).to({
                y: -54
            }, 300).to({
                y: -44
            }, 300);
        }
        else {
            egret.Tween.removeTweens(this.tipImage);
            this.tipImage.y = -44;
            game.UIUtils.removeSelf(this.tipImage);
        }
    };
    BlackJCMGroup.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.tipImage:
                return;
        }
        this.cmTouch();
    };
    /**
     * 可以押注的时候点击
     */
    BlackJCMGroup.prototype.cmTouch = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        if (roomInfo.roomState == BLACK_J_ROUND_STATUS.ADD_BET) {
            CF.dP(ENo.CMGROUP_TOUCH, this.index);
        }
    };
    BlackJCMGroup.prototype.addCm = function (coin) {
        var point = this.cmGroup.globalToLocal(coin.x, coin.y);
        coin.x = point.x;
        coin.y = point.y;
        this.cmGroup.addChild(coin);
        this.coinLists.push(coin);
    };
    BlackJCMGroup.prototype.findCoin = function () {
        return this.coinLists.pop();
    };
    return BlackJCMGroup;
}(game.BaseUI));
__reflect(BlackJCMGroup.prototype, "BlackJCMGroup");
