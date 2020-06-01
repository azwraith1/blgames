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
var BDZCMList = (function (_super) {
    __extends(BDZCMList, _super);
    function BDZCMList() {
        var _this = _super.call(this) || this;
        _this.cmList = [];
        return _this;
    }
    BDZCMList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 显示金币堆
     * @param  {} total 总量
     * @param  {} order 单价
     */
    BDZCMList.prototype.showGolds = function (rule) {
        var unit = rule.unit;
        var total = rule.total;
        var type = rule.type;
        var num = Math.floor(total / unit);
        while (this.cmList.length > 0) {
            var cm = this.cmList.pop();
            game.UIUtils.removeSelf(cm);
            ObjectPool.reclaim("bdz_cm", cm);
        }
        for (var i = 0; i < num; i++) {
            var cm = ObjectPool.produce("bdz_cm", BDZCM);
            if (!cm) {
                cm = new BDZCM();
            }
            cm.changeGold(unit);
            cm.changeColor(type);
            this.addChild(cm);
            this.cmList.push(cm);
            cm.y = -1 * i * 6;
        }
    };
    return BDZCMList;
}(eui.Component));
__reflect(BDZCMList.prototype, "BDZCMList");
