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
var DZMJOverItem = (function (_super) {
    __extends(DZMJOverItem, _super);
    function DZMJOverItem(count1, fan1, count2, fan2) {
        var _this = _super.call(this) || this;
        _this.count1 = count1;
        _this.count2 = count2;
        _this.fanCount1 = fan1;
        _this.fanCount2 = fan2;
        _this.skinName = new DZMJOverItemSkin();
        return _this;
    }
    DZMJOverItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.count1) {
            var countArr = MJConfig.FAN_XING[this.count1].split("|");
            this.type1.text = countArr[0];
            this.fan1.text = this.fanCount1 + "番";
        }
        if (this.count2) {
            var countArr = MJConfig.FAN_XING[this.count2].split("|");
            this.type2.text = countArr[0];
            this.fan2.text = this.fanCount2 + "番";
        }
    };
    return DZMJOverItem;
}(eui.Component));
__reflect(DZMJOverItem.prototype, "DZMJOverItem");
