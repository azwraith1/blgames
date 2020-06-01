var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NiuniuGuaJiConfig = (function () {
    function NiuniuGuaJiConfig() {
        this.isAutoStatus = false;
        this.qzArr = [];
        this.yzArr = [];
    }
    Object.defineProperty(NiuniuGuaJiConfig, "Instance", {
        get: function () {
            if (!NiuniuGuaJiConfig.instance) {
                NiuniuGuaJiConfig.instance = new NiuniuGuaJiConfig();
            }
            return NiuniuGuaJiConfig.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NiuniuGuaJiConfig.prototype, "autoStatus", {
        get: function () {
            return this.isAutoStatus;
        },
        enumerable: true,
        configurable: true
    });
    NiuniuGuaJiConfig.prototype.setAutoStatus = function (isAuto) {
        this.isAutoStatus = isAuto;
    };
    Object.defineProperty(NiuniuGuaJiConfig.prototype, "remainCount", {
        get: function () {
            return this.remainAutoCount;
        },
        enumerable: true,
        configurable: true
    });
    NiuniuGuaJiConfig.prototype.setRemainCount = function (count) {
        this.remainAutoCount = count;
    };
    Object.defineProperty(NiuniuGuaJiConfig.prototype, "yzIndex", {
        // private yzIndex: number;
        get: function () {
            this.yzValue = this.yzArr[Math.round(Math.random() * (this.yzArr.length - 1))];
            LogUtils.logD("====倍数==" + this.yzValue, "index:" + this.sendYzQuest(this.yzValue) + "数组得：==" + this.yzArr);
            return this.sendYzQuest(this.yzValue);
        },
        enumerable: true,
        configurable: true
    });
    /**设置抢庄arr */
    NiuniuGuaJiConfig.prototype.setQZArr = function (arr) {
        this.qzArr = arr;
    };
    /**设置押注arr */
    NiuniuGuaJiConfig.prototype.setYZArr = function (arr) {
        this.yzArr = arr;
    };
    Object.defineProperty(NiuniuGuaJiConfig.prototype, "yzVal", {
        get: function () {
            this.yzValue = this.yzArr[Math.round(Math.random() * (this.yzArr.length - 1))];
            LogUtils.logD("yz数组" + this.yzArr + "qzvalue:" + this.yzValue);
            return this.yzValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NiuniuGuaJiConfig.prototype, "qzVal", {
        get: function () {
            this.qzValue = this.qzArr[Math.round(Math.random() * (this.qzArr.length - 1))];
            LogUtils.logD("qz数组" + this.qzArr + "qzvalue:" + this.qzValue);
            return this.qzValue;
        },
        enumerable: true,
        configurable: true
    });
    NiuniuGuaJiConfig.prototype.sendYzQuest = function (yzVal) {
        var index;
        switch (yzVal) {
            case "1":
                //不抢
                index = 0;
                ;
                break;
            case "2":
                //第一个按钮
                index = 1;
                break;
            case "4":
                index = 2;
                //第二个按钮
                break;
            case "8":
                index = 3;
                //第三个按钮
                break;
            case "10":
                index = 4;
                //第三个按钮
                break;
        }
        return index;
    };
    return NiuniuGuaJiConfig;
}());
__reflect(NiuniuGuaJiConfig.prototype, "NiuniuGuaJiConfig");
