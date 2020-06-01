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
 * @Author: Li MengChan
 * @Date: 2018-06-28 16:41:05
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-16 15:12:32
 * @Description: 麻将计时器带东西南北控制
 * ewsn: 暗色东西南北 EWSN 高亮东西南北
 */
var majiang;
(function (majiang) {
    var TimerDirectionBar = (function (_super) {
        __extends(TimerDirectionBar, _super);
        function TimerDirectionBar() {
            return _super.call(this) || this;
            // this.skinName = new TimerDirectionBarSkin();
        }
        TimerDirectionBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.changeToUnLight();
        };
        /**
         * 回复出事默认状态
         */
        TimerDirectionBar.prototype.changeToUnLight = function () {
            this.leftBg.visible = this.rightBg.visible = this.mineBg.visible = this.topBg.visible = false;
        };
        /**
         * 展现方向
         * @param  {} direcion
         */
        TimerDirectionBar.prototype.showLightByDirection = function (direcion) {
            if (!direcion) {
                return;
            }
            this.changeToUnLight();
            this[direcion + "Bg"].visible = true;
            this.removeAllTween();
            egret.Tween.get(this[direcion + "Bg"], { loop: true }).to({
                alpha: 0.5
            }, 300).to({
                alpha: 1
            }, 300);
        };
        TimerDirectionBar.prototype.removeAllTween = function () {
            egret.Tween.removeTweens(this.leftBg);
            this.leftBg.alpha = 1;
            egret.Tween.removeTweens(this.rightBg);
            this.rightBg.alpha = 1;
            egret.Tween.removeTweens(this.topBg);
            this.topBg.alpha = 1;
            egret.Tween.removeTweens(this.mineBg);
            this.mineBg.alpha = 1;
        };
        TimerDirectionBar.prototype.startTime = function (root) {
            this.root = root;
            game.UpdateTickerManager.instance.add(this);
        };
        TimerDirectionBar.prototype.update = function (dt) {
            if (Global.gameProxy.roomInfo && Global.gameProxy.roomInfo.countdown) {
                var endTime = Global.gameProxy.roomInfo.countdown.end;
                var startTime = game.DateTimeManager.instance.now;
                var cha = endTime - startTime;
                if (cha <= 0) {
                    this.timeLabel1.text = "00";
                    return;
                }
                this.timeLabel1.text = NumberFormat.getTimeStr(cha);
            }
        };
        TimerDirectionBar.prototype.removeTimer = function () {
            // this.timeLabel1.text = "00";
            game.UpdateTickerManager.instance.remove(this);
        };
        return TimerDirectionBar;
    }(eui.Component));
    majiang.TimerDirectionBar = TimerDirectionBar;
    __reflect(TimerDirectionBar.prototype, "majiang.TimerDirectionBar", ["IUpdate"]);
})(majiang || (majiang = {}));
