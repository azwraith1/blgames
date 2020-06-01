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
 * @Author: wangtao
 * @Date: 2019-04-08 12:07:17
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-21 14:40:20
 * @Description:
 */
var sdxl;
(function (sdxl) {
    var SDXLAutoGamePanel = (function (_super) {
        __extends(SDXLAutoGamePanel, _super);
        function SDXLAutoGamePanel() {
            var _this = _super.call(this) || this;
            _this.skinName = new FreeGameSetSkin();
            return _this;
        }
        SDXLAutoGamePanel.prototype.createChildren = function () {
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
            this.oneMax.maximum = parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 * 540 + "");
            this.oneMax.minimum = 0;
            this.totalAdd.maximum = game.SDXLUtils.ToTalMoney;
            this.totalAdd.minimum = (game.SDXLUtils.bet * 50) * game.SDXLUtils.mul;
            this.totalWin.maximum = parseInt(game.SDXLUtils.bet * game.SDXLUtils.mul * 100 * 540 + "");
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
            this.select_kuang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectFreeStop, this);
            this.free_times_20.addEventListener(egret.TouchEvent.TOUCH_TAP, this.free_20, this);
            this.free_times_15.addEventListener(egret.TouchEvent.TOUCH_TAP, this.free_15, this);
            this.free_times_10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.free_10, this);
            this.free_times_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.free_5, this);
        };
        SDXLAutoGamePanel.prototype.onadded = function () {
            _super.prototype.onAdded.call(this);
        };
        SDXLAutoGamePanel.prototype.onremoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        SDXLAutoGamePanel.prototype.changeHandler1 = function (evt) {
            game.LaohuUtils.oneMax = evt.target.value;
            this.max_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        };
        SDXLAutoGamePanel.prototype.changeHandler2 = function (evt) {
            game.LaohuUtils.totalAdd = evt.target.value;
            this.totalAdd_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        };
        SDXLAutoGamePanel.prototype.changeHandler3 = function (evt) {
            game.LaohuUtils.totalWin = evt.target.value;
            this.totalWin_num.text = NumberFormat.handleFloatDecimal(evt.target.value) + "";
        };
        SDXLAutoGamePanel.prototype.close_autoGamePanel = function () {
            game.LaohuUtils.free_time_times = 0;
            game.LaohuUtils.isAutoGame = false;
            game.LaohuUtils.totalAdd = 0;
            game.LaohuUtils.oneMax = 0;
            game.LaohuUtils.totalWin = 0;
            game.LaohuUtils.auto_times = 0;
            // SoundManager.getInstance().playEffect("button_dntg_mp3");
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
            CF.sN(PanelNotify.CLOSE_SDXL_AUTO_PANEL);
            // CF.dP(ENo.AUTO_GAME);
        };
        SDXLAutoGamePanel.prototype.autoTime_5 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
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
        SDXLAutoGamePanel.prototype.autoTime_10 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
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
        SDXLAutoGamePanel.prototype.autoTime_25 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
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
        SDXLAutoGamePanel.prototype.autoTime_50 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
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
        SDXLAutoGamePanel.prototype.autoTime_100 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
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
        SDXLAutoGamePanel.prototype.autoTimeWuqiong = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
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
        SDXLAutoGamePanel.prototype.startPlay = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
            CF.sN(PanelNotify.CLOSE_SDXL_AUTO_PANEL);
            CF.dP(ENo.AUTO_GAME);
        };
        SDXLAutoGamePanel.prototype.selectFreeStop = function () {
            var _this = this;
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
            this.select_ima.visible = true;
            game.LaohuUtils.stopAuto = true;
            this.select_ima.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.select_ima.visible = false; game.LaohuUtils.stopAuto = false; }, this);
        };
        SDXLAutoGamePanel.prototype.free_20 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
            game.LaohuUtils.free_time_times = 20;
            this.free_times_20.currentState = "down";
            this.free_times_15.currentState = this.free_times_10.currentState = this.free_times_5.currentState = "up";
        };
        SDXLAutoGamePanel.prototype.free_15 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
            game.LaohuUtils.free_time_times = 15;
            this.free_times_15.currentState = "down";
            this.free_times_20.currentState = this.free_times_10.currentState = this.free_times_5.currentState = "up";
        };
        SDXLAutoGamePanel.prototype.free_10 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
            game.LaohuUtils.free_time_times = 10;
            this.free_times_10.currentState = "down";
            this.free_times_15.currentState = this.free_times_20.currentState = this.free_times_5.currentState = "up";
        };
        SDXLAutoGamePanel.prototype.free_5 = function () {
            SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
            game.LaohuUtils.free_time_times = 5;
            this.free_times_5.currentState = "down";
            this.free_times_15.currentState = this.free_times_10.currentState = this.free_times_20.currentState = "up";
        };
        return SDXLAutoGamePanel;
    }(game.BaseComponent));
    sdxl.SDXLAutoGamePanel = SDXLAutoGamePanel;
    __reflect(SDXLAutoGamePanel.prototype, "sdxl.SDXLAutoGamePanel");
})(sdxl || (sdxl = {}));
