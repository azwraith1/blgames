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
 * 甲由路
 */
var bjle;
(function (bjle) {
    var BjlLd5Panel = (function (_super) {
        __extends(BjlLd5Panel, _super);
        function BjlLd5Panel() {
            var _this = _super.call(this) || this;
            _this.newList = [];
            _this.index = 0;
            _this.maxLie = 0;
            _this.startLength = 1; //第几列
            _this.MaxLength = 6; //每列最大长度
            _this.idx = 1;
            return _this;
        }
        BjlLd5Panel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BjlLd5Panel.prototype.testNums = function (num) {
            var index = 1;
            //数据格式定义：1庄赢，2庄对，3闲对 ，4庄闲对；
            //				5闲赢，6庄对，7闲对，8庄闲对；
            //             9和局 ，10庄对，11闲对，12庄闲对。
            var dataArr1 = [9, 9, 1, 1, 1, 1, 1, 1, 5,
                1, 5, 1, 9, 1, 1, 1, 1, 5, 5, 9, 5, 1,
                5, 1, 5, 5, 1, 1, 1, 5, 1, 1, 5, 5, 1,
                1, 5, 9, 1, 1, 1, 1, 5, 1, 5, 1, 1];
            var newList = bjle.BaseBjlLd.changVlue(num.concat(this.newList));
            var lists = bjle.BaseBjlLd.arryIntoArry(newList);
            if (lists.length <= 4) {
                if (lists[3]) {
                    var list = lists[3];
                    if (!list[1]) {
                        return;
                    }
                }
                else {
                    return;
                }
            }
            var ResultArray = lists.concat([]);
            for (var i = 0; i < ResultArray.length; i++) {
                var list = ResultArray[i];
                bjle.BaseBjlLd.removeArryByValue(list);
            }
            var arry = bjle.BaseBjlLd.initQizi_dyxyjy(ResultArray, 5);
            var arry1 = bjle.BaseBjlLd.arryIntoArry(arry);
            if (ResultArray.length <= 24) {
                this.initQizi(arry1);
            }
            else {
                var index_1 = 0;
                var nums = arry1.splice(-24);
                var num_1 = nums[nums.length - 1];
                if (num_1.length > 6) {
                    index_1 = num_1.length - 6;
                }
                var nums1 = nums.splice((-24 + index_1));
                this.initQizi(nums1);
            }
        };
        BjlLd5Panel.prototype.initQizi = function (arryList) {
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
                    qizi.width = qizi.height = 7;
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
                        qizi.initNums(list[j], 5);
                        this.startLength++;
                        if (this.startLength > this.maxLie) {
                            this.maxLie = this.startLength;
                        }
                        if (this["item" + this.startLength]) {
                            this["item" + this.startLength].setPosition(qizi, this.MaxLength + 1);
                            this["item" + this.startLength].addChild(qizi);
                        }
                        this.index++;
                    }
                    else {
                        this.index++;
                        qizi.initNums(list[j], 5);
                        this["item" + (i + 1)].setPosition(qizi, this.index);
                        this["item" + (i + 1)].addChild(qizi);
                    }
                }
            }
        };
        BjlLd5Panel.prototype.chushihua = function () {
            this.MaxLength = 6;
            for (var i = 0; i < 24; i++) {
                this["item" + (i + 1)].removeChildren();
            }
        };
        return BjlLd5Panel;
    }(eui.Component));
    bjle.BjlLd5Panel = BjlLd5Panel;
    __reflect(BjlLd5Panel.prototype, "bjle.BjlLd5Panel");
})(bjle || (bjle = {}));
