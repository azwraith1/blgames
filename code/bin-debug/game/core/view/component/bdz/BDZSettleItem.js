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
var BDZSettleItem = (function (_super) {
    __extends(BDZSettleItem, _super);
    function BDZSettleItem() {
        var _this = _super.call(this) || this;
        _this.skinName = new BDZSettleItemBarSkin();
        return _this;
    }
    BDZSettleItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    BDZSettleItem.prototype.showText = function (name, roundStr, gold, isWin, isMine) {
        this.nameLabel.text = name;
        this.typeLabel.text = roundStr;
        this.goldLabel.text = gold >= 0 ? "+" + gold : gold;
        if (isWin) {
            this.winImage.visible = true;
            this.nameLabel.textColor = this.typeLabel.textColor = this.goldLabel.textColor = 0xFBC145;
        }
        if (isMine) {
            this.mineImage.visible = true;
        }
    };
    return BDZSettleItem;
}(eui.Component));
__reflect(BDZSettleItem.prototype, "BDZSettleItem");
