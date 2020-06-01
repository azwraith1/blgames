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
 * 大路
 */
var bjle;
(function (bjle) {
    var BjlLd2Panel = (function (_super) {
        __extends(BjlLd2Panel, _super);
        function BjlLd2Panel() {
            var _this = _super.call(this) || this;
            _this.newList = [];
            /**
             * 初始化棋子，并装入到对应的组里面。
             */
            _this.tesu9 = 0;
            _this.maxLie = 0;
            _this.startLength = 1; //第几列
            _this.MaxLength = 6; //每列最大长度
            _this.index = 0;
            _this.idx = 1;
            return _this;
        }
        BjlLd2Panel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BjlLd2Panel.prototype.testNums = function (num) {
            var index = 1;
            //数据格式定义：1庄赢，2庄对，3闲对 ，4庄闲对；
            //				5闲赢，6庄对，7闲对，8庄闲对；
            //             9和局 ，10庄对，11闲对，12庄闲对。
            var dataArr1 = [9, 9, 9, 9, 1, 1, 1, 1, 1, 1, 5,
                1, 5, 1, 9, 1, 1, 1, 1, 5, 5, 9, 5, 1,
                5, 1, 5, 5, 1, 1, 1, 5, 1, 1, 5, 5, 1,
                1, 5, 9, 1, 1, 1, 1, 5, 1, 5, 1, 1];
            //数据处理
            var dataArr = num.concat([]);
            var newList = bjle.BaseBjlLd.changVlue(dataArr);
            var lists = bjle.BaseBjlLd.arryIntoArry(newList);
            var arry;
            if (lists.length <= 24) {
                this.initQizi(lists);
            }
            else {
                var index_1 = 0;
                var nums = lists.splice(-24);
                var num_1 = nums[nums.length - 1];
                if (num_1.length > 6) {
                    index_1 = num_1.length - 6;
                }
                var nums1 = nums.splice((-24 + index_1));
                this.initQizi(nums1);
            }
        };
        BjlLd2Panel.prototype.initQizi = function (arryList) {
            if (!arryList || arryList.length == 0) {
                return;
            }
            this.chushihua();
            var islock = true;
            for (var i = 0; i < arryList.length; i++) {
                if (i >= 24) {
                    return;
                }
                islock = true;
                this.startLength = i + 1;
                this.index = 0;
                var list = arryList[i];
                for (var j = 0; j < list.length; j++) {
                    var qizi = new bjle.BJLResult1();
                    if (this.maxLie <= i) {
                        this.MaxLength = 6;
                    }
                    if (this.index >= this.MaxLength) {
                        if (this.MaxLength < 2) {
                            return;
                        }
                        if (islock) {
                            this.MaxLength--;
                            islock = false;
                        }
                        qizi.initNums(list[j], 2);
                        if (list[j] == 9) {
                            this.startLength;
                        }
                        else {
                            this.startLength++;
                        }
                        if (this["item" + this.startLength]) {
                            this["item" + this.startLength].setPosition(qizi, this.MaxLength + 1);
                            this["item" + this.startLength].addChild(qizi);
                        }
                        if (this.startLength > this.maxLie) {
                            this.maxLie = this.startLength;
                        }
                        this.index++;
                    }
                    else {
                        if (list[j] == 9) {
                            if (j == 0) {
                                this["item" + (i + 1)].setPosition(qizi, 1);
                                this.tesu9 = 1;
                            }
                            else {
                                if (list[j - 1] == 9) {
                                    this["item" + (i + 1)].setPosition(qizi, this.tesu9);
                                }
                                else {
                                    this.index;
                                    this.tesu9 = this.index;
                                    this["item" + (i + 1)].setPosition(qizi, this.index);
                                }
                            }
                            qizi.initNums(list[j], 2);
                        }
                        else {
                            this.index++;
                            qizi.initNums(list[j], 2);
                            this["item" + (i + 1)].setPosition(qizi, this.index);
                        }
                        this["item" + (i + 1)].addChild(qizi);
                    }
                }
            }
        };
        BjlLd2Panel.prototype.chushihua = function () {
            this.tesu9 = 0;
            this.maxLie = 0;
            this.startLength = 1; //第几列
            this.MaxLength = 6; //每列最大长度
            this.index = 0;
            this.idx = 1;
            this.MaxLength = 6;
            for (var i = 0; i < 24; i++) {
                this["item" + (i + 1)].removeChildren();
            }
        };
        return BjlLd2Panel;
    }(eui.Component));
    bjle.BjlLd2Panel = BjlLd2Panel;
    __reflect(BjlLd2Panel.prototype, "bjle.BjlLd2Panel");
})(bjle || (bjle = {}));
