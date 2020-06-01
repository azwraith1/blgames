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
 * @Date: 2019-12-02 17:02:30
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-02 17:28:36
 * @Description:
 */
var MatchWaitingItem = (function (_super) {
    __extends(MatchWaitingItem, _super);
    function MatchWaitingItem() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchWaitItemSkin();
        return _this;
    }
    MatchWaitingItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchWaitingItem.prototype.showData = function (rewardData, totalMoney) {
        var rankLevel = rewardData[0];
        if (rankLevel <= 3) {
            this.rankImage.visible = true;
            this.rankImage.source = RES.getRes("m_wait_" + rankLevel + "_png");
        }
        else {
            this.rankImage.visible = false;
        }
        var countNumber = rewardData[1] - rewardData[0] + 1;
        var gold = Math.floor(totalMoney * rewardData[2] / countNumber / 100);
        var countStr = countNumber == 1 ? "" + rewardData[0] : rewardData[0] + "-" + rewardData[1];
        this.contentLabel.text = gold + "元";
        this.rankLabel.text = "\u7B2C" + countStr + "\u540D:";
    };
    return MatchWaitingItem;
}(eui.Component));
__reflect(MatchWaitingItem.prototype, "MatchWaitingItem");
