var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NumberFormat = (function () {
    function NumberFormat() {
    }
    NumberFormat.formatGold = function (gold, id) {
        if (TextUtils.instance.currentLanguage != "zh_cn") {
            return this.fNumber2KM(gold);
        }
        if (id == 1) {
            var str = "" + Number(new Big(gold).round(2, 0));
            return str.replace(".00", "");
        }
        else {
            gold = Number(new Big(gold).round(2, 0));
            if (gold < 10000) {
                return gold;
            }
            var baiWan = Math.floor(gold / 10000);
            var bai = Math.floor((gold % 10000) / 100);
            var baiStr = bai + "";
            if (bai < 10) {
                baiStr = "0" + baiStr;
            }
            var str = baiWan + "." + baiStr + "万";
            return str;
        }
    };
    NumberFormat.formatGold_scence = function (gold, id) {
        if (TextUtils.instance.currentLanguage != "zh_cn") {
            return this.fNumber2KM(gold);
        }
        if (id == 1) {
            var str = "" + Number(new Big(gold).round(2, 0));
            return str.replace(".00", "");
        }
        else {
            gold = Number(new Big(gold).round(2, 0));
            if (gold < 10000) {
                return gold;
            }
            var baiWan = Math.floor(gold / 10000);
            var bai = Math.floor((gold % 10000) / 100);
            var baiStr = bai + "";
            if (bai < 10) {
                baiStr = "0" + baiStr;
            }
            var str = baiWan + "." + baiStr + "万";
            return str;
        }
    };
    NumberFormat.getNNTimeStr = function (time) {
        var time1 = Math.ceil(time / 1000);
        if (time1 < 10) {
            if (time1 == 1) {
                return "0" + time1;
            }
            return "0" + time1;
        }
        if (time1 <= 0) {
            return "00";
        }
        return time1 + "";
    };
    NumberFormat.fNumber = function (number) {
        return Math.floor(Number(new Big(number).round(0, 0)));
    };
    NumberFormat.fNumberStr = function (number) {
        return Number(new Big(number).round(0, 0)) + "";
    };
    NumberFormat.getTimeStr = function (time) {
        var time1 = Math.ceil(time / 1000);
        if (time1 < 10) {
            if (time1 == 1) {
                return "0 " + time1;
            }
            return "0" + time1;
        }
        if (time1 <= 0) {
            return "00";
        }
        return time1 + "";
    };
    NumberFormat.getTimeStrByDown = function (time) {
        var time1 = Math.floor(time / 1000);
        if (time1 < 10) {
            if (time1 == 1) {
                return "0 " + time1;
            }
            return "0" + time1;
        }
        if (time1 <= 0) {
            return "00";
        }
        return time1 + "";
    };
    /**
     * 拆分分数
     */
    NumberFormat.chaifenScore = function (arrList, value) {
        var scores = _.clone(arrList);
        var chujinScore;
        var jishu;
        if (value % arrList[0] != 0) {
            for (var i = 0; i < scores.length; i++) {
                if (scores[i] % arrList[0] != 0) {
                    jishu = scores[i];
                    value -= jishu;
                    break;
                }
            }
        }
        for (var i = 0; i < scores.length; i++) {
            if (value % scores[i] == 0) {
                chujinScore = scores[i];
                break;
            }
        }
        if (!chujinScore) {
            console.log("分数不合法");
            return;
        }
        var numbers = {};
        var scoreFunc = function (lastScore) {
            var max = Math.floor(value / lastScore);
            if (max > 0) {
                //	let use = Math.floor(_.random(Math.ceil(max / 2), max));
                var use = max;
                if (lastScore == chujinScore) {
                    use = max;
                    var total = use * lastScore;
                    numbers[lastScore] = use;
                    value -= total;
                }
                else {
                    var total = use * lastScore;
                    if ((value - total) % chujinScore == 0) {
                        numbers[lastScore] = use;
                        value -= total;
                    }
                }
            }
        };
        while (scores.length > 0) {
            var lastScore = scores.pop();
            scoreFunc(lastScore);
        }
        if (jishu) {
            if (!numbers[jishu]) {
                numbers[jishu] = 1;
            }
            else {
                numbers[jishu]++;
            }
        }
        return numbers;
    };
    /**
     * 浮点数保留指定位数，不四舍五入
     * @param x
     * @param precision
     * @returns {number}
     */
    NumberFormat.handleFloatDecimal = function (x, precision) {
        if (precision === void 0) { precision = 2; }
        if (x == null) {
            return 0;
        }
        return Number(new Big(x).round(precision, 0));
    };
    NumberFormat.toNonExponential = function (num) {
        //处理非数字
        if (isNaN(num)) {
            return num;
        }
        //处理不需要转换的数字
        var str = '' + num;
        if (!/e/i.test(str)) {
            return num;
        }
        return (num).toFixed(18).replace(/\.?0+$/, "");
    };
    NumberFormat.handleFloatDecimalStr = function (x, precision) {
        if (precision === void 0) { precision = 2; }
        if (x == null) {
            return "";
        }
        var s_x = this.toNonExponential(x);
        s_x = s_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            return s_x;
        }
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        else {
            s_x = s_x.substring(0, pos_decimal + 1 + precision);
        }
        while (s_x.length <= pos_decimal + precision) {
            s_x += '0';
        }
        if (s_x == 0) {
            s_x = '0.';
            var pos_decimal_1 = s_x.indexOf('.');
            while (s_x.length <= pos_decimal_1 + precision) {
                s_x += '0';
            }
        }
        return s_x;
    };
    NumberFormat.fNumberBDZStr = function (number) {
        if (TextUtils.instance.currentLanguage != "zh_cn") {
            return this.fNumber2KM(number);
        }
        var str = "";
        var yuanGold = Math.floor(number / KOREA_GOLD.YUAN);
        if (yuanGold > 0) {
            str += yuanGold + "y";
        }
        var jiaoGold = Math.floor((number - yuanGold * KOREA_GOLD.YUAN) / KOREA_GOLD.JIAO);
        if (jiaoGold > 0) {
            str += jiaoGold + "f";
        }
        else {
            var fenGold = Math.floor(number - (jiaoGold * KOREA_GOLD.JIAO) - (yuanGold * KOREA_GOLD.YUAN));
            if (fenGold > 0) {
                str += fenGold;
            }
        }
        return str;
    };
    NumberFormat.fNumberBDZStr2 = function (number) {
        if (TextUtils.instance.currentLanguage != "zh_cn") {
            return this.fNumber2KM(number);
        }
        return number;
    };
    NumberFormat.BaiCaoCoin = function (number) {
        if (TextUtils.instance.currentLanguage != "zh_cn") {
            return this.fNumber2KMCoin(number);
        }
        return number;
    };
    NumberFormat.fNumberBDZStr3 = function (number) {
        var str = "";
        var yuanGold = Math.floor(number / KOREA_GOLD.YUAN);
        var jiaoGold = Math.floor((number - yuanGold * KOREA_GOLD.YUAN) / KOREA_GOLD.JIAO);
        if (jiaoGold > 0) {
            str += jiaoGold + "j";
        }
        var fenGold = Math.floor(number - (jiaoGold * KOREA_GOLD.JIAO) - (yuanGold * KOREA_GOLD.YUAN));
        if (fenGold > 0) {
            str += fenGold;
        }
        return str;
    };
    NumberFormat.getTimeDaojishi = function (leftTime) {
        var fen = parseInt((leftTime / 1000 / 60 % 60) + "");
        var seconds = parseInt((leftTime / 1000 % 60) + "");
        if (fen < 10) {
            fen = "0" + fen;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return [fen, seconds];
    };
    /**coin 金币换算 */
    NumberFormat.fNumber2KMCoin = function (size) {
        var num = 1000.00; //byte
        if (size < num)
            return size;
        if (size < Math.pow(num, 2))
            return Number(new Big(size / num).round(2, 0)) + "K"; //kb
        if (size < Math.pow(num, 3))
            return Number(new Big(size / Math.pow(num, 2)).round(2, 0)) + "M"; //M
        if (size < Math.pow(num, 4))
            return Number(new Big(size / Math.pow(num, 3)).round(2, 0)) + "G"; //G
        return Number(new Big(size / Math.pow(num, 4)).round(2, 0)) + "T"; //T
    };
    NumberFormat.fNumber2KM = function (size) {
        var num = 1000.00; //byte
        if (size < num)
            return new Big(size).round(2, 0);
        if (size < Math.pow(num, 2))
            return Number(new Big(size / num).round(2, 0)) + "K"; //kb
        if (size < Math.pow(num, 3))
            return Number(new Big(size / Math.pow(num, 2)).round(2, 0)) + "M"; //M
        if (size < Math.pow(num, 4))
            return Number(new Big(size / Math.pow(num, 3)).round(2, 0)) + "G"; //G
        return Number(new Big(size / Math.pow(num, 4)).round(2, 0)) + "T"; //T
    };
    return NumberFormat;
}());
__reflect(NumberFormat.prototype, "NumberFormat");
