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
/*
 * @Author: real MC Lee
 * @Date: 2019-07-04 10:56:48
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 17:19:14
 * @Description:
 */
var ayls;
(function (ayls) {
    var AYLSAutoGamePanel = (function (_super) {
        __extends(AYLSAutoGamePanel, _super);
        function AYLSAutoGamePanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "AYLSAutoGameSkin";
            return _this;
        }
        AYLSAutoGamePanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.start_auto_play.filters = [colorFlilter];
            this.start_auto_play.touchEnabled = false;
            this.oneMax.maximum = parseInt(0.1 * game.AYLSUtils.bet * 4000 + "");
            this.oneMax.minimum = 0;
            this.totalAdd.maximum = game.AYLSUtils.ToTalMoney;
            this.totalAdd.minimum = (game.AYLSUtils.bet * 2);
            this.totalWin.maximum = parseInt(0.1 * game.AYLSUtils.bet * 4000 + "");
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
            this.autoStopGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setStopAuto, this);
        };
        AYLSAutoGamePanel.prototype.onadded = function () {
            _super.prototype.onAdded.call(this);
        };
        AYLSAutoGamePanel.prototype.onremoved = function () {
            _super.prototype.onRemoved.call(this);
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
            this.autoStopGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setStopAuto, this);
        };
        AYLSAutoGamePanel.prototype.changeHandler1 = function (evt) {
            game.LaohuUtils.oneMax = evt.target.value;
            this.max_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        };
        AYLSAutoGamePanel.prototype.changeHandler2 = function (evt) {
            game.LaohuUtils.totalAdd = evt.target.value;
            this.totalAdd_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        };
        AYLSAutoGamePanel.prototype.changeHandler3 = function (evt) {
            game.LaohuUtils.totalWin = evt.target.value;
            this.totalWin_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        };
        AYLSAutoGamePanel.prototype.close_autoGamePanel = function () {
            game.LaohuUtils.free_time_times = 0;
            game.LaohuUtils.isAutoGame = false;
            game.LaohuUtils.totalAdd = 0;
            game.LaohuUtils.oneMax = 0;
            game.LaohuUtils.totalWin = 0;
            game.LaohuUtils.auto_times = 0;
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            CF.sN(PanelNotify.CLOSE_AYLS_AUTO_PANEL);
        };
        AYLSAutoGamePanel.prototype.autoTime_5 = function () {
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
        };
        AYLSAutoGamePanel.prototype.autoTime_10 = function () {
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
        };
        AYLSAutoGamePanel.prototype.autoTime_25 = function () {
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
        };
        AYLSAutoGamePanel.prototype.autoTime_50 = function () {
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
        };
        AYLSAutoGamePanel.prototype.autoTime_100 = function () {
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
        };
        AYLSAutoGamePanel.prototype.autoTimeWuqiong = function () {
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
        };
        AYLSAutoGamePanel.prototype.startPlay = function () {
            SoundManager.getInstance().playEffect("rdsg_button_mp3");
            CF.sN(PanelNotify.CLOSE_AYLS_AUTO_PANEL);
            CF.dP(ENo.AUTO_GAME);
        };
        AYLSAutoGamePanel.prototype.setStopAuto = function () {
            if (!game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = true;
                this.gouImag.visible = true;
            }
            else {
                game.LaohuUtils.stopAuto = false;
                this.gouImag.visible = false;
            }
        };
        return AYLSAutoGamePanel;
    }(game.BaseComponent));
    ayls.AYLSAutoGamePanel = AYLSAutoGamePanel;
    __reflect(AYLSAutoGamePanel.prototype, "ayls.AYLSAutoGamePanel");
})(ayls || (ayls = {}));
