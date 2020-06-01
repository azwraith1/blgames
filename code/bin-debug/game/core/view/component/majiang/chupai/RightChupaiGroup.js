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
 * @Last Modified time: 2018-09-14 10:11:37
 * @Description: 右边玩家出牌集合组
 */
var majiang;
(function (majiang_1) {
    var RightChupaiGroup = (function (_super) {
        __extends(RightChupaiGroup, _super);
        function RightChupaiGroup() {
            var _this = _super.call(this) || this;
            _this.chupais = [];
            return _this;
            // this.skinName = new majiang.RightChupaiGroupSkin();
        }
        RightChupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 根据一定的结构算法，显示层级
         */
        RightChupaiGroup.prototype.sortByJieGou = function () {
            this.sortByXIndexByGroup(this.group1);
            this.sortByXIndexByGroup(this.group2);
            this.sortByXIndexByGroup(this.group3);
        };
        RightChupaiGroup.prototype.createByArr = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                var value = arr[i];
                this.createMineChupaiByIndex(i, value);
            }
            // this.sortByXIndexByGroup(this.group1);
            this.sortByJieGou();
        };
        RightChupaiGroup.prototype.createMineChupaiByIndex = function (index, value) {
            //行数
            var row = Math.floor(index / 7) + 1;
            //行数
            var col = index % 7 + 1;
            var mineChupai;
            if (row <= 3) {
                mineChupai = new majiang_1.RightChupai(value, row, col);
                this['group' + row].addChild(mineChupai);
                mineChupai.setByRecord(this.recordsJson[index + 1]);
                mineChupai.index = index;
                // this.sortByXIndexByGroup(this['group' + row]);
                mineChupai.settingColors(index + 1);
            }
            else {
                row = 3;
                mineChupai = new majiang_1.RightChupai(value, 3, col);
                mineChupai.useBgSouce();
                mineChupai.x = 14 - (index - 20) * 3;
                mineChupai.y = (index - 20) * -28;
                this['group' + 3].addChild(mineChupai);
                mineChupai.index = index;
                //  this.sortByXIndexByGroup(this['group' + row]);
            }
            this.chupais.push(mineChupai);
            return mineChupai;
        };
        RightChupaiGroup.prototype.addChupai = function (value) {
            var index = this.chupais.length;
            var majiang = this.createMineChupaiByIndex(index, value);
            // this.sor
            this.sortByJieGou();
            return majiang;
        };
        RightChupaiGroup.prototype.sortByXIndexByGroup = function (group) {
            // var sortList = [];
            // for (var i = group.numChildren - 1; i >= 0; i--) {
            //     let index: any = i;
            //     var item = group.getChildAt(index);
            //     if (item) {
            //         sortList.push(item);
            //     }
            // }
            for (var i = this.chupais.length - 1; i >= 0; i--) {
                this.chupais[i].parent.addChild(this.chupais[i]);
            }
            // for (var i = 0; i < sortList.length; i++) {
            //     group.addChild(sortList[i]);
            // }
        };
        return RightChupaiGroup;
    }(majiang_1.BaseChupaiGroup));
    majiang_1.RightChupaiGroup = RightChupaiGroup;
    __reflect(RightChupaiGroup.prototype, "majiang.RightChupaiGroup");
})(majiang || (majiang = {}));
