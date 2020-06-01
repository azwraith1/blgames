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
/**
 * 庄闲问路
 */
var bjle;
(function (bjle) {
    var BjlLd6Panel = (function (_super) {
        __extends(BjlLd6Panel, _super);
        function BjlLd6Panel() {
            var _this = _super.call(this) || this;
            _this.newList = [];
            return _this;
        }
        BjlLd6Panel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BjlLd6Panel.prototype.testNums = function (num, num2, num1) {
            //数据格式定义：1庄赢，2庄对，3闲对 ，4庄闲对；
            //				5闲赢，6庄对，7闲对，8庄闲对；
            //             9和局 ，10庄对，11闲对，12庄闲对。
            var newList = bjle.BaseBjlLd.changVlue(num.concat([num2]));
            var lists = bjle.BaseBjlLd.arryIntoArry(newList);
            if (lists.length < 5) {
                return;
            }
            var ResultArray = lists.concat([]);
            for (var i = 0; i < ResultArray.length; i++) {
                var list = ResultArray[i];
                bjle.BaseBjlLd.removeArryByValue(list);
            }
            // let arry: any[];
            // if (ResultArray.length <= 24) {
            // 	arry = bjle.BaseBjlLd.initQizi_dyxyjy(ResultArray, num1);
            // } else {
            // 	let nums = ResultArray.splice(-24);
            // 	arry = bjle.BaseBjlLd.initQizi_dyxyjy(ResultArray, num1);
            // }
            // let arry1 = bjle.BaseBjlLd.arryIntoArry(arry);
            // return arry1;
            var arry = bjle.BaseBjlLd.initQizi_dyxyjy(ResultArray, num1);
            var arry1 = bjle.BaseBjlLd.arryIntoArry(arry);
            if (ResultArray.length <= 24) {
                return arry1;
            }
            else {
                var index = 0;
                var nums = arry1.splice(-24);
                return nums;
            }
        };
        /**
         * 庄赢情况呢
         */
        BjlLd6Panel.prototype.zhangWin = function (num) {
            var arry = this.testNums(num, 1, 3);
            var arry1 = this.testNums(num, 1, 4);
            var arry2 = this.testNums(num, 1, 5);
            this.zhangWin1(arry, 1, 3);
            this.zhangWin1(arry1, 2, 4);
            this.zhangWin1(arry2, 3, 5);
        };
        /**
         * 闲赢情况呢
         */
        BjlLd6Panel.prototype.xianWin = function (num) {
            var arry = this.testNums(num, 5, 3);
            var arry1 = this.testNums(num, 5, 4);
            var arry2 = this.testNums(num, 5, 5);
            this.xianWin1(arry, 1, 3);
            this.xianWin1(arry1, 2, 4);
            this.xianWin1(arry2, 3, 5);
        };
        BjlLd6Panel.prototype.zhangWin1 = function (arry, index, index1) {
            if (!arry) {
                return;
            }
            if (arry.length == 0) {
                return;
            }
            var a1 = arry[arry.length - 1];
            var num = a1[a1.length - 1];
            switch (index1) {
                case 3:
                    if (num == 1) {
                        this["zitem" + index].source = RES.getRes("bjl_red_big_quan_png");
                    }
                    else {
                        this["zitem" + index].source = RES.getRes("bjl_blue_big_quan_png");
                    }
                    break;
                case 4:
                    if (num == 1) {
                        this["zitem" + index].source = RES.getRes("bjl_red_big_dian_png");
                    }
                    else {
                        this["zitem" + index].source = RES.getRes("bjl_blue_big_dian_png");
                    }
                    break;
                case 5:
                    if (num == 1) {
                        this["zitem" + index].source = RES.getRes("bjl_red_xie_png");
                    }
                    else {
                        this["zitem" + index].source = RES.getRes("bjl_blue_xie_png");
                    }
                    break;
            }
        };
        BjlLd6Panel.prototype.xianWin1 = function (arry, index, index1) {
            if (!arry) {
                return;
            }
            var a1 = arry[arry.length - 1];
            var num = a1[a1.length - 1];
            switch (index1) {
                case 3:
                    if (num == 1) {
                        this["xitem" + index].source = RES.getRes("bjl_red_big_quan_png");
                    }
                    else {
                        this["xitem" + index].source = RES.getRes("bjl_blue_big_quan_png");
                    }
                    break;
                case 4:
                    if (num == 1) {
                        this["xitem" + index].source = RES.getRes("bjl_red_big_dian_png");
                    }
                    else {
                        this["xitem" + index].source = RES.getRes("bjl_blue_big_dian_png");
                    }
                    break;
                case 5:
                    if (num == 1) {
                        this["xitem" + index].source = RES.getRes("bjl_red_xie_png");
                    }
                    else {
                        this["xitem" + index].source = RES.getRes("bjl_blue_xie_png");
                    }
                    break;
            }
        };
        return BjlLd6Panel;
    }(eui.Component));
    bjle.BjlLd6Panel = BjlLd6Panel;
    __reflect(BjlLd6Panel.prototype, "bjle.BjlLd6Panel");
})(bjle || (bjle = {}));
