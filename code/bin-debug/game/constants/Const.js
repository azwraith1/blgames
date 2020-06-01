var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Const = (function () {
    function Const() {
    }
    //最后几分钟提示
    Const.LAST_TIME_RACE = 5 * 60 * 1000;
    return Const;
}());
__reflect(Const.prototype, "Const");
/**
 * 常用方法
 */
var CF = (function () {
    function CF() {
    }
    Object.defineProperty(CF, "tic", {
        /**
         * 获取语言png后缀
         */
        get: function () {
            return TextUtils.instance.currentPngStr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CF, "tij", {
        /**
         * 获取语言jpg后缀
         */
        get: function () {
            return TextUtils.instance.currentJPGStr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CF, "tis", {
        /**
         * 获取皮肤文件后缀
         */
        get: function () {
            return TextUtils.instance.currentSkinStr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CF, "tiAni", {
        /**
         * 获取龙骨动画后缀后缀
         */
        get: function () {
            return TextUtils.instance.currentAniStr;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 发送命令
     */
    CF.sN = function (notify, data) {
        game.AppFacade.getInstance().sendNotification(notify, data);
    };
    /**
     * 添加监听
     */
    CF.aE = function (type, callback, targetObject) {
        EventManager.instance.addEvent(type, callback, targetObject);
    };
    /**
     * 移除监听
     */
    CF.rE = function (type, callback, targetObject) {
        EventManager.instance.removeEvent(type, callback, targetObject);
    };
    /**
     * 发出监听事件
     */
    CF.dP = function (type, data) {
        EventManager.instance.dispatch(type, data);
    };
    /**
     * 根据id获取国际化文本值
     */
    CF.tigc = function (id) {
        return TextUtils.instance.getCurrentTextById(id);
    };
    return CF;
}());
__reflect(CF.prototype, "CF");
