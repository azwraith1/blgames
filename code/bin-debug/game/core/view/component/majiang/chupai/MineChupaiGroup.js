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
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-16 19:12:14
 * @Description: 本家出牌集合组
 */
var majiang;
(function (majiang) {
    var MineChupaiGroup = (function (_super) {
        __extends(MineChupaiGroup, _super);
        function MineChupaiGroup() {
            var _this = _super.call(this) || this;
            _this.chupais = [];
            return _this;
            // this.skinName = new majiang.MineChupaiGroupSkin();
        }
        MineChupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 根据一定的结构算法，显示层级
         */
        MineChupaiGroup.prototype.sortByJieGou = function () {
            var sort = [0, 1, 2, 3, 6, 5, 4];
            this.sortByXIndexByGroup(sort, this.group1);
            this.sortByXIndexByGroup(sort, this.group2);
            this.sortByXIndexByGroup(sort, this.group3);
        };
        MineChupaiGroup.prototype.createByArr = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                var value = arr[i];
                this.createMineChupaiByIndex(i, value);
            }
            // this.sortByXIndexByGroup(this.group1);
            this.sortByJieGou();
        };
        MineChupaiGroup.prototype.createMineChupaiByIndex = function (index, value) {
            //列数
            var cow = Math.floor(index / 7) + 1;
            //行数
            var row = index % 7 + 1;
            var mineChupai;
            if (cow <= 3) {
                mineChupai = new majiang.MineChupai(value);
                mineChupai.initWithIndex(row);
                this['group' + cow].addChild(mineChupai);
                mineChupai.setByRecord(this.recordsJson[index + 1]);
                mineChupai.settingColors(index + 1);
            }
            else {
                mineChupai = new majiang.MineChupai(value);
                mineChupai.initWithIndex(21);
                mineChupai.settingColors(21);
                cow = 3;
                mineChupai.skewX = -1;
                mineChupai.x = 266 + (index - 20) * 45;
                mineChupai.y = 8;
                this['group' + 3].addChild(mineChupai);
            }
            this.chupais.push(mineChupai);
            return mineChupai;
        };
        MineChupaiGroup.prototype.addChupai = function (value) {
            var mineChupai = new majiang.MineChupai(value);
            var index = this.chupais.length;
            return this.createMineChupaiByIndex(index, value);
        };
        MineChupaiGroup.prototype.sortByXIndexByGroup = function (sort, group) {
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
        return MineChupaiGroup;
    }(majiang.BaseChupaiGroup));
    majiang.MineChupaiGroup = MineChupaiGroup;
    __reflect(MineChupaiGroup.prototype, "majiang.MineChupaiGroup");
})(majiang || (majiang = {}));
