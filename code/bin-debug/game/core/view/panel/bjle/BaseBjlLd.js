var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var bjle;
(function (bjle) {
    var BaseBjlLd = (function () {
        function BaseBjlLd() {
        }
        /**
     * 数组装数组
     */
        BaseBjlLd.arryIntoArry = function (dataArr) {
            if (dataArr.length < 1) {
                return [];
            }
            var flag = false;
            for (var i = 0; i < dataArr.length; i++) {
                var data = dataArr[i];
                if (data != 9) {
                    flag = true;
                }
            }
            if (!flag) {
                return [];
            }
            var index = -1;
            var lastValue = 0;
            var arry9 = [];
            var dataResult = [];
            while (dataArr[0] == 9) {
                arry9.push(dataArr.shift());
            }
            while (dataArr.length > 0) {
                if (!dataResult[index] && index > -1) {
                    dataResult[index] = [];
                }
                var value = dataArr.shift();
                if (lastValue == value || value == 9) {
                    dataResult[index].push(value);
                }
                else {
                    index++;
                    if (!dataResult[index]) {
                        //如果dataResult[index]不存在，那个将把这个dataResult[index]初始化成一个数组。
                        dataResult[index] = [];
                    }
                    dataResult[index].push(value);
                    lastValue = value;
                }
            }
            while (arry9.length > 0) {
                if (dataResult[0] && dataResult[0].length > 0) {
                    dataResult[0].unshift(arry9.pop());
                }
            }
            return dataResult;
        };
        /**
         * 删除指定元素。
         */
        BaseBjlLd.removeArryByValue = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == 9) {
                    arr.splice(i, 1);
                }
            }
        };
        ;
        /**
         * 修改数据
         */
        BaseBjlLd.changVlue = function (newList) {
            for (var i = 0; i < newList.length; i++) {
                if (newList[i] < 5) {
                    newList[i] = 1;
                }
                else if (newList[i] < 9 && newList[i] >= 5) {
                    newList[i] = 5;
                }
                else {
                    newList[i] = 9;
                }
            }
            return newList;
        };
        BaseBjlLd.initQizi_dyxyjy = function (arryList, gameType) {
            if (!arryList || arryList.length == 0) {
                return;
            }
            for (var i = 0; i < arryList.length; i++) {
                if (arryList.length <= 2) {
                    if (arryList.length < 2) {
                        return;
                    }
                    if (!arryList[1]) {
                        return;
                    }
                }
                if (i > (gameType - 3)) {
                    var list = arryList[i - (gameType - 2)];
                    var qizi = new bjle.BJLResult1();
                    if (i == (gameType - 2)) {
                        if (arryList[i].length > 1) {
                            //length大于1，2个或者两个以上的元素的比较情况，这时候比较i-1对应list的j号与j-1号位元素。
                            for (var j = 1; j < arryList[i].length; j++) {
                                //从数组的第二个函数开始判断。
                                if (list[j] == list[j - 1]) {
                                    this.dylArrays.push(1);
                                }
                                else {
                                    this.dylArrays.push(2);
                                }
                            }
                        }
                    }
                    else {
                        if (arryList[i].length > 1) {
                            //length大于1，2个或者两个以上的元素的比较情况，这时候比较i-1对应list的j号与j-1号位元素。
                            for (var j = 0; j < arryList[i].length; j++) {
                                if (j == 0) {
                                    if (arryList[i - 1].length == arryList[i - (gameType - 1)].length) {
                                        this.dylArrays.push(1);
                                    }
                                    else {
                                        this.dylArrays.push(2);
                                    }
                                }
                                else {
                                    //从数组的第二个函数开始判断。
                                    if (list[j] == list[j - 1]) {
                                        this.dylArrays.push(1);
                                    }
                                    else {
                                        this.dylArrays.push(2);
                                    }
                                }
                            }
                        }
                        else {
                            //length等于1情况，这时候比较i-1对应list与i-2对应list的长度。
                            if (i >= (gameType - 1)) {
                                if (arryList[i - 1].length == arryList[i - (gameType - 1)].length) {
                                    this.dylArrays.push(1);
                                }
                                else {
                                    this.dylArrays.push(2);
                                }
                            }
                        }
                    }
                }
            }
            return this.dylArrays;
        };
        /**
         * 绘制成大眼路,小眼路，甲由路要的格式。
         */
        BaseBjlLd.dylArrays = [];
        return BaseBjlLd;
    }());
    bjle.BaseBjlLd = BaseBjlLd;
    __reflect(BaseBjlLd.prototype, "bjle.BaseBjlLd");
})(bjle || (bjle = {}));
