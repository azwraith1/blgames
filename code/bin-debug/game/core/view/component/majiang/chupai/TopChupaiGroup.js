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
 * @Last Modified time: 2018-09-14 10:11:43
 * @Description: 本家出牌集合组
 */
var majiang;
(function (majiang) {
    var TopChupaiGroup = (function (_super) {
        __extends(TopChupaiGroup, _super);
        function TopChupaiGroup() {
            var _this = _super.call(this) || this;
            _this.chupais = [];
            return _this;
            // this.skinName = new TopChupaiGroupSkin();
        }
        TopChupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 根据一定的结构算法，显示层级
         */
        TopChupaiGroup.prototype.sortByJieGou = function () {
            var sort = [0, 1, 2, 3, 6, 5, 4];
            this.sortByXIndexByGroup(sort, this.group1);
            this.sortByXIndexByGroup(sort, this.group2);
            this.sortByXIndexByGroup(sort, this.group3);
        };
        TopChupaiGroup.prototype.createByArr = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                var value = arr[i];
                this.createMineChupaiByIndex(i, value);
            }
            // this.sortByXIndexByGroup(this.group1);
            this.sortByJieGou();
        };
        TopChupaiGroup.prototype.createMineChupaiByIndex = function (index, value) {
            //行数
            var rows = Math.floor(index / 7) + 1;
            //列数
            var col = index % 7 + 1;
            var mineChupai;
            if (rows <= 3) {
                mineChupai = new majiang.TopChupai(value);
                mineChupai.initWithIndex(rows);
                this['group' + rows].addChild(mineChupai);
                mineChupai.setByRecord(this.recordsJson[index + 1]);
                mineChupai.settingColors(index + 1);
            }
            else {
                mineChupai = new majiang.TopChupai(value);
                mineChupai.initWithIndex(21);
                rows = 3;
                mineChupai.y = -1;
                mineChupai.x = -(index - 20) * 37;
                this['group' + 3].addChild(mineChupai);
            }
            this.chupais.push(mineChupai);
            return mineChupai;
        };
        TopChupaiGroup.prototype.addChupai = function (value) {
            var index = this.chupais.length;
            return this.createMineChupaiByIndex(index, value);
        };
        TopChupaiGroup.prototype.sortByXIndexByGroup = function (sort, group) {
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
        return TopChupaiGroup;
    }(majiang.BaseChupaiGroup));
    majiang.TopChupaiGroup = TopChupaiGroup;
    __reflect(TopChupaiGroup.prototype, "majiang.TopChupaiGroup");
})(majiang || (majiang = {}));
