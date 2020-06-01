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
var dzmj;
(function (dzmj) {
    var DZMJGameRecordBar = (function (_super) {
        __extends(DZMJGameRecordBar, _super);
        function DZMJGameRecordBar(data) {
            var _this = _super.call(this) || this;
            _this.values = data;
            _this.skinName = new DZMJGameRecordBarSkin();
            return _this;
        }
        DZMJGameRecordBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var num = this.values;
            this.paijunumber.text = num["roomId"];
            this.room.text = this.choseField(num["sceneId"]);
            if (num["gainGold"] >= 0) {
                this.winOrLose.text = "+" + NumberFormat.handleFloatDecimal(num["gainGold"]);
                this.winOrLose.textColor = 0xe70909;
            }
            else {
                this.winOrLose.text = NumberFormat.handleFloatDecimalStr(num["gainGold"]);
                this.winOrLose.textColor = 0x0a790a;
            }
            this.gametimes.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
        };
        DZMJGameRecordBar.prototype.choseField = function (value) {
            var val = Number(value);
            switch (val) {
                case 1001:
                    return "初级场";
                case 1002:
                    return "中级场";
                case 1003:
                    return "高级场";
                case 1004:
                    return "土豪场";
            }
        };
        return DZMJGameRecordBar;
    }(game.BaseUI));
    dzmj.DZMJGameRecordBar = DZMJGameRecordBar;
    __reflect(DZMJGameRecordBar.prototype, "dzmj.DZMJGameRecordBar");
})(dzmj || (dzmj = {}));
