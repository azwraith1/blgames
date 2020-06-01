var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Utils = (function () {
        function Utils() {
        }
        /**
         * 数组元素坐标对换
         * @param  {any[]} arr
         * @param  {} value1
         * @param  {} value2
         */
        Utils.arrChangePos = function (arr, value1, value2) {
            var pos1 = arr.indexOf(value1);
            var pos2 = arr.indexOf(value2);
            arr.splice.apply(arr, [pos1, 1].concat(arr.splice(pos2, 1, arr[pos1])));
        };
        /**
         * 获取从min-max之间的值
         * @param min
         * @param max
         */
        Utils.rang = function (min, max) {
            return Math.round(Math.random() * (max - min) + min);
        };
        /**
         * 判断是否在范围
         * @param val
         * @param min
         * @param max
         * @returns {boolean}
         */
        Utils.isRang = function (val, min, max) {
            return val >= min && val <= max;
        };
        /**
        * 产生包含min,max的随机数
        * @param min 最小值
        * @param max 最大值
        * @param isFloat 是否返回Float值
        * @param decimal 保留小数位 默认保留2位小数
        * @returns {number} 数值
        */
        Utils.random = function (min, max, isFloat, decimal) {
            return isFloat ? (min + parseFloat((Math.random() * (max - min)).toFixed(decimal ? decimal : 2))) : (min + Math.round(Math.random() * (max - min)));
        };
        /**
         * 将val的值限制起来
         * @param val
         * @param min
         * @param max
         * @returns {number}
         */
        Utils.limit = function (val, min, max) {
            return Math.max(min, Math.min(max, val));
        };
        /**
         * 角度转化弧度
         * @param val
         */
        Utils.ang2rad = function (val) {
            return val / 180 * Math.PI;
        };
        /**
         * 弧度转化角度
         * @param val
         */
        Utils.rad2ang = function (val) {
            return val / Math.PI * 180;
        };
        /**
         * 返回大数据的显示方式
         * @param num
         * @returns {string}
         */
        Utils.getBigNumberShow = function (num) {
            if (num < 10000) {
                return num + "";
            }
            else {
                num /= 1000;
                return num.toFixed(1) + "K";
            }
        };
        /**
         * 元素是否包含在Array里
         * @param el
         * @param arr
         * @returns {boolean}
         */
        Utils.isElinArr = function (el, arr) {
            return arr.indexOf(el) > -1;
        };
        /**
         * 2个Array是否有相交元素
         * @param arr1
         * @param arr2
         */
        Utils.isArrCrossing = function (arr1, arr2) {
            for (var i = 0; i < arr1.length; i++) {
                if (Utils.isElinArr(arr1[i], arr2)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 从地址上获取key
         * @param name {string} 要获取的key名称
         * @returns {string} key值
         * @platform Web
         * @code utf-8
         */
        Utils.getURLQueryString = function (name) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var url = decodeURIComponent(window.location.href);
                url = url.replace(/&quot/g, "\"");
                var r;
                if (url.indexOf("#?") > 0) {
                    url = url.replace("#?", "&");
                    r = url.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
                }
                else {
                    r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
                }
                return r ? r[2] : null;
            }
        };
        Utils.S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        Utils.guid = function () {
            return (Utils.S4() + Utils.S4() + "-" + Utils.S4() + "-" + Utils.S4() + "-" + Utils.S4() + "-" + Utils.S4() + Utils.S4() + Utils.S4());
        };
        Utils.getMaxStr = function (str) {
            if (str.length <= 5) {
                return str;
            }
            return str.substr(0, 5) + "...";
        };
        Utils.removeArrayItem = function (arr, item) {
            var index = arr.indexOf(item);
            if (index > -1) {
                arr.splice(index, 1);
            }
        };
        /**
* 两矩形碰撞
* @param x1 {number} 方1x
* @param y1 {number} 方1y
* @param w1 {number} 方1宽
* @param h1 {number} 方1高
* @param x2 {number} 方2x
* @param y2 {number} 方2y
* @param w2 {number} 方2宽
* @param h2 {number} 方2高
*/
        Utils.isCollsionRect2 = function (x1, y1, w1, h1, x2, y2, w2, h2) {
            return ((x1 >= x2 && x1 >= x2 + w2) || (x1 <= x2 && x1 + w1 <= x2) || (y1 >= y2 && y1 >= y2 + h2) || (y1 <= y2 && y1 + h1 <= y2)) ? false : true;
        };
        Utils.rect1CollsionRect2 = function (rect1, rect2) {
            return Utils.isCollsionRect2(rect1.x, rect1.y, rect1.width, rect1.height, rect2.x, rect2.y, rect2.width, rect2.height);
        };
        Utils.getRotationXy = function (r, rotaion) {
            var result;
            var rad = Utils.ang2rad(90 - Math.abs(rotaion));
            if (rotaion < 0) {
                result = {
                    x: (r * Math.cos(rad)),
                    y: (r * Math.sin(rad))
                };
            }
            else {
                result = {
                    x: -(r * Math.cos(rad)),
                    y: (r * Math.sin(rad))
                };
            }
            return result;
        };
        Utils.valueEqual = function (value1, value2) {
            if (value1 == null || value2 == null) {
                return false;
            }
            return value1.toString() == value2.toString();
        };
        Utils.sleepTime = function (time) {
            var _this = this;
            return new Promise(function (resolove, rejecr) {
                egret.setTimeout(function () {
                    resolove();
                }, _this, time);
            });
        };
        /**
         * 勾股定理
         */
        Utils.ggdl = function (x1, y1, x2, y2) {
            var lengthX = Math.abs(x1 - x2);
            var lengthY = Math.abs(y1 - y2);
            return Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2));
        };
        Utils.deepCopy = function (obj) {
            if (obj) {
                if (obj instanceof String) {
                    return _.clone(obj);
                }
                if (obj instanceof Array) {
                    return _.clone(obj);
                }
                if (obj instanceof Object) {
                    var str = JSON.stringify(obj);
                    return JSON.parse(str);
                }
            }
            return _.clone(obj);
        };
        /**
         * 根据自己的位子获取方位
         * @param  {number} mineIndex
         */
        Utils.getDirectionByMine = function (mineIndex, playerLength) {
            var directionTrue = {};
            var dirArr = [];
            for (var i = mineIndex; i <= playerLength; i++) {
                dirArr.push(i);
            }
            for (var i = 1; i < mineIndex; i++) {
                dirArr.push(i);
            }
            for (var i = 0; i < dirArr.length; i++) {
                var data = dirArr[i];
                directionTrue[data] = (i + 1) + "";
            }
            return directionTrue;
        };
        /**
        * 格式化时间戳
        * @param  {string} fmt 格式化模版
        * @param  {number} time    单位秒
        * @return string
        */
        Utils.dateFormatMS = function (fmt, time) {
            var date = new Date(time);
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        };
        return Utils;
    }());
    game.Utils = Utils;
    __reflect(Utils.prototype, "game.Utils");
})(game || (game = {}));
