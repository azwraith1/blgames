/*
 * @Author: real MC Lee 
 * @Date: 2019-07-04 10:56:48 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-10-12 11:01:41
 * @Description: 
 */
module wszw {
    export class WSZWAutoGame extends game.BaseComponent {
        private close_btn: eui.Image;
        private auto_5: eui.Button;
        private auto_10: eui.Button;
        private auto_25: eui.Button;
        private auto_50: eui.Button;
        private auto_100: eui.Button;
        private start_auto_play: eui.Button;
        private oneMax: eui.HSlider;
        private totalAdd: eui.HSlider;
        private totalWin: eui.HSlider;
        private totalWin_num: eui.Label;
        private max_num: eui.Label;
        private totalAdd_num: eui.Label;
        public hstiao: egret.Bitmap;
        private auto_wuqiong: eui.Button;
        private stopAutoBtn: eui.Image;
        private gouImag: eui.Image;
        private autoStopGroup: eui.Group;
        public constructor() {
            super();
            this.skinName = "WSZWAutoGameSkin";
        }

        public createChildren() {
            super.createChildren();
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.start_auto_play.filters = [colorFlilter];
            this.start_auto_play.touchEnabled = false;
            this.oneMax.maximum = parseInt(50 * game.WSZWUtils.bet + "");
            this.oneMax.minimum = 0;
            this.totalAdd.maximum = game.WSZWUtils.ToTalMoney;
            this.totalAdd.minimum = (game.WSZWUtils.bet * 0.5);
            this.totalWin.maximum = parseInt(100 * game.WSZWUtils.bet + "");
            this.totalWin.minimum = 0;
            this.totalAdd_num.text = 0 + "";
            this.max_num.text = 0 + "";
            this.totalWin_num.text = 0 + "";
            game.LaohuUtils.oneMax = 0;
            game.LaohuUtils.totalAdd = 0;
            game.LaohuUtils.totalWin = 0;
            this.oneMax.addEventListener(eui.UIEvent.CHANGE, this.changeHandler1, this);
            this.totalAdd.addEventListener(eui.UIEvent.CHANGE, this.changeHandler2, this);
            this.totalWin.addEventListener(eui.UIEvent.CHANGE, this.changeHandler3, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_autoGamePanel, this);
            this.auto_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_5, this);
            this.auto_10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_10, this);
            this.auto_25.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_25, this);
            this.auto_50.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_50, this);
            this.auto_100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_100, this);
            this.auto_wuqiong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTimeWuqiong, this);
            this.start_auto_play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startPlay, this);
            // this.autoStopGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setStopAuto, this);
        }
        public onadded() {
            super.onAdded();
        }

        public onremoved() {
            super.onRemoved();
            this.oneMax.removeEventListener(eui.UIEvent.CHANGE, this.changeHandler1, this);
            this.totalAdd.removeEventListener(eui.UIEvent.CHANGE, this.changeHandler2, this);
            this.totalWin.removeEventListener(eui.UIEvent.CHANGE, this.changeHandler3, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_autoGamePanel, this);
            this.auto_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_5, this);
            this.auto_10.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_10, this);
            this.auto_25.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_25, this);
            this.auto_50.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_50, this);
            this.auto_100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTime_100, this);
            this.auto_wuqiong.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.autoTimeWuqiong, this);
            this.start_auto_play.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startPlay, this);
            // this.autoStopGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setStopAuto, this);
        }

        private changeHandler1(evt: eui.UIEvent) {
            game.LaohuUtils.oneMax = evt.target.value;
            this.max_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        }
        private changeHandler2(evt: eui.UIEvent) {
            game.LaohuUtils.totalAdd = evt.target.value;
            this.totalAdd_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        }
        private changeHandler3(evt: eui.UIEvent) {
            game.LaohuUtils.totalWin = evt.target.value;
            this.totalWin_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        }

        public close_autoGamePanel() {
            game.LaohuUtils.free_time_times = 0;
            game.LaohuUtils.isAutoGame = false;
            game.LaohuUtils.totalAdd = 0;
            game.LaohuUtils.oneMax = 0;
            game.LaohuUtils.totalWin = 0;
            game.LaohuUtils.auto_times = 0;
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            CF.sN(PanelNotify.CLOSE_WSZW_AUTO_PANEL);
        }

        private autoTime_5() {
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.start_auto_play.filters = [colorFlilter];
            this.start_auto_play.touchEnabled = true;
            this.auto_5.currentState = "down";
            this.auto_10.currentState = this.auto_25.currentState = this.auto_50.currentState = this.auto_100.currentState = this.auto_wuqiong.currentState = "up";
            game.LaohuUtils.auto_times = 5;
        }
        private autoTime_10() {
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.start_auto_play.filters = [colorFlilter];
            this.start_auto_play.touchEnabled = true;
            this.auto_10.currentState = "down";
            this.auto_5.currentState = this.auto_25.currentState = this.auto_50.currentState = this.auto_100.currentState = this.auto_wuqiong.currentState = "up";
            game.LaohuUtils.auto_times = 10;
        }
        private autoTime_25() {
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.start_auto_play.filters = [colorFlilter];
            this.start_auto_play.touchEnabled = true;
            this.auto_25.currentState = "down";
            this.auto_10.currentState = this.auto_5.currentState = this.auto_50.currentState = this.auto_100.currentState = this.auto_wuqiong.currentState = "up";
            game.LaohuUtils.auto_times = 25;
        }
        private autoTime_50() {
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.start_auto_play.filters = [colorFlilter];
            this.start_auto_play.touchEnabled = true;
            this.auto_50.currentState = "down";
            this.auto_10.currentState = this.auto_25.currentState = this.auto_5.currentState = this.auto_100.currentState = this.auto_wuqiong.currentState = "up";
            game.LaohuUtils.auto_times = 50;
        }
        private autoTime_100() {
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.start_auto_play.filters = [colorFlilter];
            this.start_auto_play.touchEnabled = true;
            this.auto_100.currentState = "down";
            this.auto_10.currentState = this.auto_25.currentState = this.auto_50.currentState = this.auto_5.currentState = this.auto_wuqiong.currentState = "up";
            game.LaohuUtils.auto_times = 100;
        }
        private autoTimeWuqiong() {
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.start_auto_play.filters = [colorFlilter];
            this.start_auto_play.touchEnabled = true;
            this.auto_wuqiong.currentState = "down";
            this.auto_10.currentState = this.auto_25.currentState = this.auto_50.currentState = this.auto_5.currentState = this.auto_100.currentState = "up";
            game.LaohuUtils.auto_times = 999999999;
        }

        private startPlay() {
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            CF.sN(PanelNotify.CLOSE_WSZW_AUTO_PANEL);
            CF.dP(ENo.AUTO_GAME);
        }
        private setStopAuto() {
            if (!game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = true;
                this.gouImag.visible = true;
            } else {
                game.LaohuUtils.stopAuto = false;
                this.gouImag.visible = false;
            }
        }
    }
}