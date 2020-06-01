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
 * @Author: li mengchan
 * @Date: 2018-07-31 10:27:36
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-09-19 17:55:08
 * @Description: 战绩流水
 */
var majiang;
(function (majiang) {
    var RecordBar = (function (_super) {
        __extends(RecordBar, _super);
        function RecordBar() {
            var _this = _super.call(this) || this;
            _this.skinName = new majiang.RecordBarSkin();
            return _this;
        }
        RecordBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.scrollPolicyH = 'off';
            this.recordList.dataProvider = null;
            this.recordList.itemRenderer = majiang.RecordItemRender;
            this.visible = false;
        };
        RecordBar.prototype.show = function () {
            var records = Global.gameProxy.getMineGameData().bills || [];
            var filterRecord = _.filter(records, function (data) {
                return data['type'] > 0;
            });
            this.recordList.dataProvider = new eui.ArrayCollection(filterRecord);
            this.visible = true;
            var count = 0;
            for (var i = 0; i < filterRecord.length; i++) {
                count += records[i].info.gainGold;
            }
            var countStr = count > 0 ? "+" + count.toFixed(2) : count.toFixed(2);
            this.recordLabel.text = "总输赢 : " + countStr;
        };
        RecordBar.prototype.hide = function () {
            // this.recordList.removeChildren();
            this.visible = false;
        };
        return RecordBar;
    }(game.BaseUI));
    majiang.RecordBar = RecordBar;
    __reflect(RecordBar.prototype, "majiang.RecordBar");
})(majiang || (majiang = {}));
