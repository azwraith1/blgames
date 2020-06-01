var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimeoutHandler = (function () {
    function TimeoutHandler() {
        //暂停方法 {fn: xx, thisobj};
        this.mPauseFns = [];
        //定时器list
        this.autoTimeoutList = [];
    }
    /**
     * 游戏APP暂停调用
     */
    TimeoutHandler.prototype.onPause = function () {
        this.execAllPauseFn();
        this.execAllAutoTimeout();
    };
    TimeoutHandler.prototype.onResume = function () {
    };
    /**
     * 添加暂停后调用的函数（后台运行立即执行）
     */
    TimeoutHandler.prototype.addPauseFn = function (fn, thisObj) {
        if (Global.runBack) {
            fn.call(thisObj);
        }
        else {
            this.mPauseFns.push({ fn: fn, fnThis: thisObj });
        }
    };
    /**
     * 移除暂停函数
     */
    TimeoutHandler.prototype.removePauseFn = function (fn, thisObj) {
        for (var i = this.mPauseFns, a = i.length - 1; a >= 0; a--)
            i[a].fn == fn && i[a].fnThis == thisObj && i.splice(a, 1);
    };
    /**
     * 清除所有暂停函数
     */
    TimeoutHandler.prototype.clearAllPauseFn = function () {
        if (this.mPauseFns) {
            this.mPauseFns.length = 0;
        }
    };
    /**
     * 执行所有暂停函数
     */
    TimeoutHandler.prototype.execAllPauseFn = function () {
        if (this.mPauseFns) {
            for (var e = this.mPauseFns, t = 0; t < e.length; t++) {
                var i = e[t];
                i.fn.call(i.fnThis);
            }
            e.length = 0;
        }
    };
    /**
     * 添加延迟函数(后台则立即执行)
     * @param  {} fn
     * @param  {} thisObj
     * @param  {} time
     */
    TimeoutHandler.prototype.setAutoTimeout = function (fn, thisObj, time) {
        if (!this.autoTimeoutList) {
            return;
        }
        for (var n = this, s = [], r = 3; r < arguments.length; r++)
            s[r - 3] = arguments[r];
        var o = -1;
        return Global.runBack ? fn.apply(thisObj, s) : (o = egret.setTimeout(function () {
            n.clearAutoTimeout(o), fn.apply(thisObj, s);
        }, this, time), this.autoTimeoutList.push({ timeId: o, listener: fn, thisObj: thisObj, param: s })), o;
    };
    /**
     * 清除延迟函数
     * @param  {} timeId
     */
    TimeoutHandler.prototype.clearAutoTimeout = function (timeId) {
        egret.clearTimeout(timeId);
        for (var t = this.autoTimeoutList, i = 0; i < t.length; i++)
            if (t[i].timeId == timeId) {
                t.splice(i, 1);
                break;
            }
    };
    /**
     * 执行延迟函数
     * @param  {} timeId
     */
    TimeoutHandler.prototype.execAutoTimeout = function (timeId) {
        if (this.autoTimeoutList)
            for (var t = this.autoTimeoutList, i = void 0, a = 0; a < t.length; a++)
                if (i = t[a], i.timeId == timeId) {
                    egret.clearTimeout(i.timeId), i.listener.call(i.thisObj, i.param), t.splice(a, 1);
                    break;
                }
    };
    /**
     * 执行所有延迟函数
     */
    TimeoutHandler.prototype.execAllAutoTimeout = function () {
        if (this.autoTimeoutList) {
            for (var e = this.autoTimeoutList, t = void 0, i = 0; i < e.length; i++)
                t = e[i], egret.clearTimeout(t.timeId), t.listener.call(t.thisObj, t.param);
            e.length = 0;
        }
    };
    /**
     * 清除所有延迟函数
     */
    TimeoutHandler.prototype.clearAllAutoTimeout = function () {
        if (this.autoTimeoutList) {
            for (var e = 0, t = this.autoTimeoutList; e < t.length; e++) {
                var i = t[e];
                egret.clearTimeout(i.timeId);
            }
            this.autoTimeoutList.length = 0;
        }
    };
    /**
     * 销毁
     */
    TimeoutHandler.prototype.destroy = function () {
        this.clearAllAutoTimeout(), this.autoTimeoutList = null, this.clearAllPauseFn(), this.mPauseFns = null;
    };
    return TimeoutHandler;
}());
__reflect(TimeoutHandler.prototype, "TimeoutHandler");
