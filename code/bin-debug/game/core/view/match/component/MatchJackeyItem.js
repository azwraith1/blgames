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
var MatchJackeyItem = (function (_super) {
    __extends(MatchJackeyItem, _super);
    function MatchJackeyItem(index, scoreData) {
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.scoreData = scoreData;
        _this.skinName = new MatchJackeyItemSkin();
        return _this;
    }
    MatchJackeyItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.dbImage.source = "match_jackey_type_" + (this.index + 1) + "_png";
        this.winLabel.text = this.scoreData.maxWinGold;
        this.needLabel.text = this.scoreData.entryFeeGold;
        switch (this.index) {
            case 1:
            case 2:
                this.pointImage.x = 123;
                break;
            case 0:
                this.pointImage.x = 120;
                break;
            case 3:
                this.pointImage.x = 122;
                break;
        }
        this.showPoint();
    };
    MatchJackeyItem.prototype.showPoint = function (index) {
        if (index === void 0) { index = MatchManager.instance.selectIndex; }
        this.selectImage.visible = this.pointImage.visible = this.index == index;
    };
    MatchJackeyItem.prototype.changeConfig = function (scoreData) {
        this.scoreData = scoreData;
        this.winLabel.text = this.scoreData.maxWinGold;
        this.needLabel.text = this.scoreData.entryFeeGold;
    };
    MatchJackeyItem.prototype.onTouchTap = function (e) {
        CF.dP(ENo.JACKEY_ITEM_TOUCH, this.index);
    };
    return MatchJackeyItem;
}(game.BaseUI));
__reflect(MatchJackeyItem.prototype, "MatchJackeyItem");
