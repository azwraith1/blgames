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
var MatchSettleItem = (function (_super) {
    __extends(MatchSettleItem, _super);
    function MatchSettleItem() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchSettleItemSkin();
        return _this;
    }
    MatchSettleItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchSettleItem.prototype.showItemData = function (bill, type, key) {
        if (type == 1) {
            this.label1.textColor = this.label2.textColor = 0xfbf5db;
            this.label1.strokeColor = this.label2.strokeColor = 0x92430b;
        }
        else {
            this.label1.textColor = this.label2.textColor = 0xfcfcf8;
            this.label1.strokeColor = this.label2.strokeColor = 0x0e5e62;
        }
        this.showXZDDData(bill, key);
    };
    MatchSettleItem.prototype.showXZDDData = function (bill, key) {
        var type = bill.type;
        var info = bill.info;
        if (type == 6) {
            this.label1.text = "呼叫转移";
        }
        else {
            this.label1.text = majiang.MajiangUtils.getMatchBiliTypeStr(type, info.gainGold, info.from, key);
        }
        if (info.gainGold > 0) {
            this.label2.text = "+" + NumberFormat.formatGold_scence(info.gainGold);
        }
        else {
            this.label2.text = NumberFormat.formatGold_scence(info.gainGold);
        }
        if (info.gangType) {
            if (type == 6) {
                this.label1.text = "呼叫转移";
            }
            else {
                this.label1.text = majiang.MajiangUtils.getGangTypeStr(info.gangType, info.gainGold);
            }
        }
    };
    return MatchSettleItem;
}(eui.Component));
__reflect(MatchSettleItem.prototype, "MatchSettleItem");
