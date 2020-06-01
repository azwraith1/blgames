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
 * @Author: MC Lee
 * @Date: 2020-03-16 14:10:55
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-23 14:43:41
 * @Description: bdz时间进度条
 */
var BDZTimeBar = (function (_super) {
    __extends(BDZTimeBar, _super);
    function BDZTimeBar() {
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.skinName = new BDZTimeBarSkin();
        return _this;
    }
    BDZTimeBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.createDB();
    };
    BDZTimeBar.prototype.startTimer = function () {
        game.UpdateTickerManager.instance.add(this);
    };
    BDZTimeBar.prototype.stopTimer = function () {
        game.UpdateTickerManager.instance.remove(this);
    };
    BDZTimeBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    BDZTimeBar.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
    };
    BDZTimeBar.prototype.createDB = function () {
        this.kuangDb = new DBComponent("bdz_countdown", false);
        this.dbGroup.addChild(this.kuangDb);
        this.kuangDb.playByFilename(-1);
    };
    BDZTimeBar.prototype.showTime = function (time) {
        var _this = this;
        if (time === void 0) { time = 5000; }
        egret.clearTimeout(this.showTimeout);
        this.progressBar.width = 205;
        this.showTimeout = egret.setTimeout(function () {
            _this.isShow = true;
            _this.visible = true;
            SoundManager.getInstance().playEffect("bdz_timer_mp3", true);
        }, this, time);
    };
    BDZTimeBar.prototype.checkShow = function () {
        if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
            var startTime = Global.roomProxy.roomInfo.countdown.start;
            var nowTime = game.DateTimeManager.instance.now;
            var cha = nowTime - startTime;
            if (cha > 5000) {
                this.isShow = true;
                this.visible = true;
                this.progressBar.width = 205 * ((cha / ((Global.roomProxy.roomInfo.countdown.s - 5) * 1000)));
                SoundManager.getInstance().playEffect("bdz_timer_mp3", true);
            }
            else {
                this.showTime(5000 - cha);
            }
        }
    };
    BDZTimeBar.prototype.hideTimeBar = function () {
        egret.clearTimeout(this.showTimeout);
        this.isShow = this.visible = false;
        SoundManager.getInstance().stopEffectByName("bdz_timer_mp3");
    };
    BDZTimeBar.prototype.update = function (dt) {
        if (!this.isShow) {
            return;
        }
        if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
            var endTime = Global.roomProxy.roomInfo.countdown.end;
            var startTime = game.DateTimeManager.instance.now;
            var startTime1 = Global.roomProxy.roomInfo.countdown.start;
            this.visible = startTime - startTime1 > 5000;
            var cha = endTime - startTime;
            var percent = 0;
            var totalTime = (Global.roomProxy.roomInfo.countdown.s - 5) * 1000;
            if (cha <= totalTime) {
                percent = (cha / totalTime);
            }
            if (percent < 0) {
                percent = 0;
            }
            this.progressBar.width = Math.floor(205 * percent);
            this.pointImage.x = this.progressBar.width + 2;
        }
    };
    return BDZTimeBar;
}(game.BaseUI));
__reflect(BDZTimeBar.prototype, "BDZTimeBar", ["IUpdate"]);
