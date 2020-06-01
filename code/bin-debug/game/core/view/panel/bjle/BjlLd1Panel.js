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
 * 珠盘路
 */
var bjle;
(function (bjle) {
    var BjlLd1Panel = (function (_super) {
        __extends(BjlLd1Panel, _super);
        function BjlLd1Panel() {
            return _super.call(this) || this;
        }
        BjlLd1Panel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BjlLd1Panel.prototype.testNums = function (num) {
            var index = 1;
            //数据格式定义：1庄赢，2庄对，3闲对 ，4庄闲对；
            //				5闲赢，6庄对，7闲对，8庄闲对；
            //             9和局 ，10庄对，11闲对，12庄闲对。
            var dataArr1 = [9, 9, 1, 1, 1, 1, 1, 1, 5,
                1, 5, 1, 9, 1, 1, 1, 1, 5, 5, 9, 5, 1,
                5, 1, 5, 5, 1, 1, 1, 5, 1, 1, 5, 5, 1,
                1, 5, 9, 1, 1, 1, 1, 5, 1, 5, 1, 1];
            var dataArr = num.concat([]);
            var leght = dataArr.length;
            if (leght <= 48) {
                this.initQizi(dataArr);
            }
            else {
                var nums = dataArr.splice(-48);
                this.initQizi(nums);
            }
        };
        /**
         * 初始化棋子，并装入到对应的组里面。
         */
        BjlLd1Panel.prototype.initQizi = function (arryList) {
            this.chushihua();
            var index = 1;
            for (var i = 0; i < arryList.length; i++) {
                //创建棋子。
                var qizi = new bjle.BJLResult();
                qizi.initNums(arryList[i]);
                var point1 = i + 1;
                var point2 = (index - 1) * 6;
                this["item" + index].setPosition(qizi, point1 - point2);
                this["item" + index].addChild(qizi);
                if ((i + 1) % 6 == 0) {
                    index++;
                }
            }
        };
        BjlLd1Panel.prototype.chushihua = function () {
            for (var i = 0; i < 8; i++) {
                this["item" + (i + 1)].removeChildren();
            }
        };
        return BjlLd1Panel;
    }(eui.Component));
    bjle.BjlLd1Panel = BjlLd1Panel;
    __reflect(BjlLd1Panel.prototype, "bjle.BjlLd1Panel");
})(bjle || (bjle = {}));
