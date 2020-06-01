var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CountUpUtils = (function () {
    function CountUpUtils() {
    }
    CountUpUtils.start = function (label, startVal, endVal, duration, fixed) {
        if (fixed === void 0) { fixed = 2; }
        var countUp = new CountUp(label, startVal, endVal, fixed, duration, {
            useEasing: true,
            useGrouping: true,
            separator: "",
            decimal: "",
            prefix: "",
            suffix: "",
            formattingFn: function (e) {
                return NumberFormat.formatGold(e);
            }
        });
        countUp.start(function () {
            countUp = null;
        });
    };
    CountUpUtils.recordStart = function (label, startVal, endVal, duration, fixed) {
        if (fixed === void 0) { fixed = 2; }
        var countUp = new CountUp(label, startVal, endVal, fixed, duration, {
            useEasing: true,
            useGrouping: true,
            separator: "",
            decimal: "",
            prefix: "",
            suffix: "",
            formattingFn: function (e) {
                if (e > 0) {
                    return "+" + e;
                }
                return e + "";
            }
        });
        countUp.start(function () {
            countUp = null;
        });
    };
    return CountUpUtils;
}());
__reflect(CountUpUtils.prototype, "CountUpUtils");
