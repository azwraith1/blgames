var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: li mengchan
 * @Date: 2018-07-09 18:46:46
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-27 18:02:52
 * @Description: 定时器管理器
 */
var game;
(function (game) {
    var DateTimeManager = (function () {
        function DateTimeManager() {
            /**
             * 服务器延迟时间
             */
            this.delayTime = 0;
            if (DateTimeManager._instance) {
                throw new Error("DateTimer使用单例");
            }
        }
        Object.defineProperty(DateTimeManager, "instance", {
            get: function () {
                if (!DateTimeManager._instance) {
                    DateTimeManager._instance = new DateTimeManager();
                }
                return DateTimeManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        DateTimeManager.prototype.updateServerTime = function (val) {
            this.delayTime = Date.now() - val;
        };
        DateTimeManager.prototype.updateServerTimeByLogin = function (val) {
            this.delayTime = Date.now() - val;
        };
        Object.defineProperty(DateTimeManager.prototype, "now", {
            get: function () {
                return Math.floor(Date.now() - this.delayTime);
            },
            enumerable: true,
            configurable: true
        });
        DateTimeManager.prototype.run = function () {
            this.run1sTicker();
            this.runTicker();
        };
        /**
         * 启动1s计时器
         */
        DateTimeManager.prototype.run1sTicker = function () {
            var timer = new egret.Timer(1000);
            timer.addEventListener(egret.TimerEvent.TIMER, this.onOneSecondTimer, this);
            timer.start();
            this._last1sTime = egret.getTimer();
        };
        DateTimeManager.prototype.onOneSecondTimer = function () {
            var now = egret.getTimer();
            var dt = now - this._last1sTime;
            this._last1sTime = now;
            //1s定时器更新
            game.UpdateTickerManager.onesec.update(dt);
        };
        DateTimeManager.prototype.runTicker = function () {
            var timer = new egret.Timer(33);
            timer.addEventListener(egret.TimerEvent.TIMER, this.onEnterFrameTimer, this);
            timer.start();
            this._lastFpsTime = egret.getTimer();
        };
        DateTimeManager.prototype.onEnterFrameTimer = function () {
            var now = egret.getTimer();
            var dt = now - this._lastFpsTime;
            this._lastFpsTime = now;
            //1s定时器更新
            game.UpdateTickerManager.instance.update(dt);
        };
        return DateTimeManager;
    }());
    game.DateTimeManager = DateTimeManager;
    __reflect(DateTimeManager.prototype, "game.DateTimeManager");
})(game || (game = {}));
