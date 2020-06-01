var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PMDBean = (function () {
    function PMDBean() {
    }
    return PMDBean;
}());
__reflect(PMDBean.prototype, "PMDBean");
var PMDFactory = (function () {
    function PMDFactory() {
        this.pmdInterval = null; //定时器
        this.waitingList = []; //等待列表是个数组
        this.runningPmd = null; //正在提示的框
        if (PMDFactory._instance) {
            throw new Error("DateTimer使用单例");
        }
    }
    Object.defineProperty(PMDFactory, "instance", {
        get: function () {
            if (!PMDFactory._instance) {
                PMDFactory._instance = new PMDFactory();
            }
            return PMDFactory._instance;
        },
        enumerable: true,
        configurable: true
    });
    PMDFactory.prototype.run = function () {
        this.startInterVal();
        this.waitingList = [];
    };
    PMDFactory.prototype.getSize = function () {
        return this.waitingList.length;
    };
    PMDFactory.prototype.startInterVal = function () {
        var self = this;
        this.pmdInterval = setInterval(function () {
            self.checkHasPMD();
        }, 100);
    };
    PMDFactory.prototype.goNext = function () {
        this.runningPmd = null;
    };
    PMDFactory.prototype.deleteMsg = function () {
        this.waitingList = [];
        clearInterval(this.pmdInterval);
        this.pmdInterval = null;
        return;
    };
    PMDFactory.prototype.checkHasPMD = function () {
        if (this.runningPmd) {
            return;
        }
        if (!this.waitingList || this.waitingList.length < 1) {
            clearInterval(this.pmdInterval);
            this.pmdInterval = null;
            return;
        }
        this.runningPmd = this.waitingList.shift();
        if (this.runningPmd.type == 2) {
            if (this.runningPmd.key != PMDComponent.currentRunningScene) {
                PMDComponent.instance.showCloseAni();
                this.runningPmd = null;
                return;
            }
        }
        PMDComponent.instance.show(this.runningPmd);
    };
    /**
     * 收到维护消息时的做法，unshift(pmdData);加到第一条播
     *
     */
    PMDFactory.prototype.addPMD = function (pmdData) {
        if (!this.waitingList) {
            this.waitingList = [];
        }
        if (pmdData.type == 1) {
            this.waitingList.unshift(pmdData);
        }
        else {
            this.waitingList.push(pmdData);
        }
        if (!this.pmdInterval) {
            this.startInterVal();
        }
    };
    PMDFactory.prototype.clearWaitList = function () {
        this.waitingList = [];
    };
    return PMDFactory;
}());
__reflect(PMDFactory.prototype, "PMDFactory");
