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
 * @Author: Li MengChan
 * @Date: 2018-06-28 10:27:19
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-09-14 10:11:56
 * @Description: 左边玩家出牌集合组
 */
var majiang;
(function (majiang) {
    var LeftChupaiGroup = (function (_super) {
        __extends(LeftChupaiGroup, _super);
        function LeftChupaiGroup() {
            var _this = _super.call(this) || this;
            _this.chupais = [];
            return _this;
            // this.skinName = new LeftChupaiGroupSkin();
        }
        LeftChupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 根据一定的结构算法，显示层级
         */
        LeftChupaiGroup.prototype.sortByJieGou = function () {
            var sort = [6, 5, 4, 3, 2, 1, 0];
            this.sortByXIndexByGroup(sort, this.group1);
            this.sortByXIndexByGroup(sort, this.group2);
            this.sortByXIndexByGroup(sort, this.group3);
        };
        LeftChupaiGroup.prototype.createByArr = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                var value = arr[i];
                this.createMineChupaiByIndex(i, value);
            }
            // this.sortZorder();
            // this.sortByXIndexByGroup(this.group1);
            // this.sortByJieGou();
        };
        LeftChupaiGroup.prototype.createMineChupaiByIndex = function (index, value) {
            //行数
            var row = Math.floor(index / 7) + 1;
            //行数
            var col = index % 7 + 1;
            var mineChupai;
            if (row <= 3) {
                mineChupai = new majiang.LeftChupai(value, row, col);
                this['group' + row].addChild(mineChupai);
                mineChupai.setByRecord(this.recordsJson[index + 1]);
                mineChupai.settingColors(index + 1);
            }
            else {
                row = 3;
                mineChupai = new majiang.LeftChupai(value, 3, col);
                mineChupai.useBgSouce();
                mineChupai.x = -49 - (index - 20) * 4;
                mineChupai.y = 170 + (index - 20) * 31;
                this['group' + 3].addChild(mineChupai);
            }
            this.chupais.push(mineChupai);
            return mineChupai;
        };
        LeftChupaiGroup.prototype.addChupai = function (value) {
            var index = this.chupais.length;
            return this.createMineChupaiByIndex(index, value);
        };
        LeftChupaiGroup.prototype.sortByXIndexByGroup = function (sort, group) {
            var sortList = [];
            var sortNum = group.numChildren;
            if (group.numChildren > sort.length) {
                sortNum = sort.length;
            }
            for (var i = 0; i < sortNum; i++) {
                var item = group.getChildByName("mj" + sort[i]);
                if (item) {
                    sortList.push(item);
                }
            }
            for (var i = 0; i < sortList.length; i++) {
                group.addChild(sortList[i]);
            }
        };
        return LeftChupaiGroup;
    }(majiang.BaseChupaiGroup));
    majiang.LeftChupaiGroup = LeftChupaiGroup;
    __reflect(LeftChupaiGroup.prototype, "majiang.LeftChupaiGroup");
})(majiang || (majiang = {}));
