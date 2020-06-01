var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 面板基类
 */
var game;
(function (game) {
    var BaseComponent = (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent() {
            var _this = _super.call(this) || this;
            _this.pauseHandler = new TimeoutHandler();
            _this.tweenList = [];
            _this.clickSoundName = "ui_click_mp3";
            _this.width = GameConfig.curWidth();
            _this.height = GameConfig.curHeight();
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
            //  this.potraitToHorizon();
        }
        /**横竖屏切换 smart*/
        BaseComponent.prototype.potraitToHorizon = function () {
            window["onorientationchange"] = function () {
                var or = window["orientation"];
                if (or == 90 || or == -90) {
                    Global.oritationChange = true;
                    CF.dP(ENo.STAGE_ORITATIONCHANGE, "H");
                    BaseComponent.oritation = "H";
                    //LogUtils.logD("=============横屏===============");
                    //alert("横屏");
                }
                else {
                    Global.oritationChange = true;
                    CF.dP(ENo.STAGE_ORITATIONCHANGE, "V");
                    BaseComponent.oritation = "V";
                    // LogUtils.logD("=============竖屏===============");
                    //	alert("竖屏");
                }
            };
        };
        BaseComponent.prototype.changeLanguageUI = function () {
        };
        BaseComponent.prototype.onAdded = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            if (this.resizeGroup) {
                this.eventResize();
                CF.aE(ENo.EVENT_RESIZE, this.eventResize, this);
            }
            if (this.fullScreenBtn) {
                this.fullScreenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fullScreenBtnTouch, this);
            }
            CF.aE(ENo.RUN_BACKEND, this.parseGame, this);
            CF.aE(ENo.RUN_FORTEND, this.remuseGame, this);
            CF.aE(ServerNotify.s_payGold, this.updateGold, this);
        };
        BaseComponent.prototype.parseGame = function () {
            this.execAllPauseFn(), this.execAllAutoTimeout();
        };
        BaseComponent.prototype.remuseGame = function () {
            // this.removeAllAnimation(), 
            this.removeAllEffectList();
            // this.removeAllTimeList(), this.removeAllIntervalList();
        };
        BaseComponent.prototype.deleteTweenList = function (tweenObj) {
            var tweenIndex = this.tweenList.indexOf(tweenObj);
            tweenIndex > -1 && (-1 != this[tweenIndex] && egret.Tween.removeTweens(this[tweenIndex]), this.tweenList.splice(tweenIndex, 1));
        };
        BaseComponent.prototype.pushTweenList = function (tweenObj) {
            this.deleteTweenList(tweenObj);
            this.tweenList.indexOf(tweenObj) < 0 && this.tweenList.push(tweenObj);
        };
        BaseComponent.prototype.removeAllEffectList = function () {
            for (var e = 0, t = this.tweenList, i = t.length; i > e; e++)
                -1 != this[t[e]] && egret.Tween.removeTweens(this[t[e]]);
            this.tweenList = [];
        };
        BaseComponent.prototype.updateGold = function () {
            if (this['goldLabel']) {
                if (Global.playerProxy.playerData) {
                    this['goldLabel'].text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
                }
            }
            if (this['goldLable']) {
                if (Global.playerProxy.playerData) {
                    this['goldLable'].text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
                }
            }
            if (this['lock']) {
                this['lock'] = false;
            }
        };
        BaseComponent.prototype.onRemoved = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTap, this);
            if (this.resizeGroup) {
                CF.rE(ENo.EVENT_RESIZE, this.eventResize, this);
            }
            if (this.fullScreenBtn) {
                this.fullScreenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fullScreenBtnTouch, this);
            }
            CF.rE(ServerNotify.s_payGold, this.updateGold, this);
            CF.rE(ENo.RUN_BACKEND, this.parseGame, this);
            CF.rE(ENo.RUN_FORTEND, this.remuseGame, this);
            this.destroy();
            this.dbRelease();
        };
        BaseComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.fullScreenBtn) {
                this.fullScreenBtn.visible = window['screenfull'].enabled;
            }
            game.UIUtils.addButtonScaleEffects(this, this.clickSoundName);
            this.bindTouchEnded(this);
            TextUtils.instance.languageInter(this);
            this.changeLanguageUI();
        };
        BaseComponent.prototype.fullScreenBtnTouch = function () {
            game.UIUtils.windowFullscreen();
        };
        BaseComponent.prototype.onEnterFrame = function (delayTime) {
        };
        BaseComponent.prototype.onTouchTap = function (e) {
        };
        BaseComponent.prototype.bindTouchEnded = function (p) {
            if (!p)
                return;
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch = p.getChildAt(i);
                this.bindTouchEnded(ch);
            }
        };
        /**
         * 销毁
         */
        BaseComponent.prototype.destroy = function () {
            this.pauseHandler.destroy();
        };
        BaseComponent.prototype.dbRelease = function () {
        };
        /**
         * 适配代码
         */
        BaseComponent.prototype.eventResize = function () {
            if (this.resizeGroup) {
                game.UIUtils.fullscreen(this.resizeGroup);
            }
        };
        /**
         * 添加暂停后调用的函数（后台运行立即执行）
         */
        BaseComponent.prototype.addPauseFn = function (fn, thisObj) {
            this.pauseHandler.addPauseFn(fn, thisObj);
        };
        /**
         * 移除暂停函数
         */
        BaseComponent.prototype.removePauseFn = function (fn, thisObj) {
            this.pauseHandler.removePauseFn(fn, thisObj);
        };
        /**
         * 执行所有暂停函数
         */
        BaseComponent.prototype.execAllPauseFn = function () {
            this.pauseHandler.execAllPauseFn();
        };
        /**
         * 游戏APP暂停调用
         */
        BaseComponent.prototype.onPause = function () {
            this.pauseHandler.onPause();
        };
        /**
         * 添加延迟函数(后台则立即执行)
         * @param  {} fn
         * @param  {} thisObj
         * @param  {} time
         */
        BaseComponent.prototype.setAutoTimeout = function (fn, thisObj, time) {
            for (var a = [], n = 3; n < arguments.length; n++)
                a[n - 3] = arguments[n];
            return (s = this.pauseHandler).setAutoTimeout.apply(s, [fn, thisObj, time].concat(a));
            var s;
        };
        /**
         * 清除延迟函数
         * @param  {} timeId
         */
        BaseComponent.prototype.clearAutoTimeout = function (timeId) {
            this.pauseHandler.clearAutoTimeout(timeId);
        };
        /**
         * 执行延迟函数
         * @param  {} timeId
         */
        BaseComponent.prototype.execAutoTimeout = function (timeId) {
            this.pauseHandler.execAutoTimeout(timeId);
        };
        /**
         * 执行所有延迟函数
         */
        BaseComponent.prototype.execAllAutoTimeout = function () {
            this.pauseHandler.execAllAutoTimeout();
        };
        /**
         * 清除所有延迟函数
         */
        BaseComponent.prototype.clearAllAutoTimeout = function () {
            this.pauseHandler.clearAllAutoTimeout();
        };
        BaseComponent.oritation = null;
        return BaseComponent;
    }(eui.Component));
    game.BaseComponent = BaseComponent;
    __reflect(BaseComponent.prototype, "game.BaseComponent");
})(game || (game = {}));
