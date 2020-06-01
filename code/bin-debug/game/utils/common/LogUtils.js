var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: li mengchan
 * @Date: 2018-09-10 10:30:35
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-18 10:35:28
 * @Description: 日志输出等级  1 debug 2 info 3 error
 */
var LogUtils = (function () {
    function LogUtils() {
    }
    /**
     * 输出DEBUG JSON格式日志
     */
    LogUtils.logDJ = function (data) {
        if (LogUtils.loglevel == LogUtils.DEBUG) {
            console.log("json param=%j", game.Utils.deepCopy(data));
        }
    };
    /**
     * 输出DEBUG日志
     */
    LogUtils.logD = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (LogUtils.loglevel == LogUtils.DEBUG) {
            console.log("debug" + message, game.Utils.deepCopy(optionalParams));
        }
    };
    /**
     * 输出错误日志
     * @param  {} data
     */
    LogUtils.logE = function (data) {
        if (LogUtils.loglevel == LogUtils.ERROR) {
            console.error(data);
        }
    };
    /**
     * 输出info等级日志
     * @param  {} data
     */
    LogUtils.logI = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (LogUtils.loglevel == LogUtils.INFO) {
            console.log("info" + message, optionalParams);
        }
    };
    LogUtils.DEBUG = 1;
    LogUtils.INFO = 2;
    LogUtils.ERROR = 3;
    LogUtils.loglevel = 1;
    return LogUtils;
}());
__reflect(LogUtils.prototype, "LogUtils");
