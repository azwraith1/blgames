/**
 * 面板基类
 */
module game {
    export class BaseComponent extends eui.Component {
        protected resGroup: string;
        public resizeGroup: eui.Group;
        protected fullScreenBtn: eui.Button;
        public pauseHandler: TimeoutHandler = new TimeoutHandler();
        private tweenList: any[] = [];
        protected goldLabel: eui.Label;
        public constructor() {
            super();
            this.width = GameConfig.curWidth();
            this.height = GameConfig.curHeight();
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            //  this.potraitToHorizon();
        }
        public static oritation: string = null;
        /**横竖屏切换 smart*/
        protected potraitToHorizon() {
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
            }
        }

        protected changeLanguageUI(){

        }

        public onAdded() {
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
        }

        protected parseGame() {
            this.execAllPauseFn(), this.execAllAutoTimeout();
        }

        protected remuseGame() {
            // this.removeAllAnimation(), 
            this.removeAllEffectList();
            // this.removeAllTimeList(), this.removeAllIntervalList();
        }

        public deleteTweenList(tweenObj) {
            var tweenIndex = this.tweenList.indexOf(tweenObj);
            tweenIndex > -1 && (-1 != this[tweenIndex] && egret.Tween.removeTweens(this[tweenIndex]), this.tweenList.splice(tweenIndex, 1))
        }

        public pushTweenList(tweenObj) {
            this.deleteTweenList(tweenObj);
            this.tweenList.indexOf(tweenObj) < 0 && this.tweenList.push(tweenObj)
        }


        public removeAllEffectList() {
            for (var e = 0, t = this.tweenList, i = t.length; i > e; e++) -1 != this[t[e]] && egret.Tween.removeTweens(this[t[e]]);
            this.tweenList = []
        }

        public updateGold() {
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
        }


        public onRemoved() {
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
        }

        protected clickSoundName = "ui_click_mp3";
        protected createChildren() {
            super.createChildren();
            if (this.fullScreenBtn) {
                this.fullScreenBtn.visible = window['screenfull'].enabled;
            }
            UIUtils.addButtonScaleEffects(this, this.clickSoundName);
            this.bindTouchEnded(this);
            TextUtils.instance.languageInter(this);
            this.changeLanguageUI();
        }

        protected fullScreenBtnTouch() {
            game.UIUtils.windowFullscreen();
        }

        public onEnterFrame(delayTime: number): void {

        }

        protected onTouchTap(e: egret.TouchEvent) {
        }

        public bindTouchEnded(p: egret.DisplayObjectContainer) {
            if (!p) return;
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>p.getChildAt(i);
                this.bindTouchEnded(ch);
            }
        }

        /**
         * 销毁
         */
        protected destroy() {
            this.pauseHandler.destroy();
        }
        protected dbRelease() {

        }

        /**
         * 适配代码
         */
        public eventResize() {
            if (this.resizeGroup) {
                game.UIUtils.fullscreen(this.resizeGroup);
            }
        }

        /**
         * 添加暂停后调用的函数（后台运行立即执行）
         */
        protected addPauseFn(fn: Function, thisObj) {
            this.pauseHandler.addPauseFn(fn, thisObj);
        }

        /**
         * 移除暂停函数
         */
        protected removePauseFn(fn: Function, thisObj) {
            this.pauseHandler.removePauseFn(fn, thisObj);
        }

        /**
         * 执行所有暂停函数
         */
        protected execAllPauseFn() {
            this.pauseHandler.execAllPauseFn();
        }

        /**
         * 游戏APP暂停调用
         */
        protected onPause() {
            this.pauseHandler.onPause();
        }

        /**
         * 添加延迟函数(后台则立即执行)
         * @param  {} fn
         * @param  {} thisObj
         * @param  {} time
         */
        protected setAutoTimeout(fn, thisObj, time: number) {
            for (var a = [], n = 3; n < arguments.length; n++) a[n - 3] = arguments[n];
            return (s = this.pauseHandler).setAutoTimeout.apply(s, [fn, thisObj, time].concat(a));
            var s
        }

        /**
         * 清除延迟函数
         * @param  {} timeId
         */
        protected clearAutoTimeout(timeId) {
            this.pauseHandler.clearAutoTimeout(timeId);
        }

        /**
         * 执行延迟函数
         * @param  {} timeId
         */
        protected execAutoTimeout(timeId) {
            this.pauseHandler.execAutoTimeout(timeId);
        }

        /**
         * 执行所有延迟函数
         */
        protected execAllAutoTimeout() {
            this.pauseHandler.execAllAutoTimeout();
        }

        /**
         * 清除所有延迟函数
         */
        protected clearAllAutoTimeout() {
            this.pauseHandler.clearAllAutoTimeout();
        }
    }

}


