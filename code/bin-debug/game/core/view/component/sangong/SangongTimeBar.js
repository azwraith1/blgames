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
var sangong;
(function (sangong) {
    var SangongTimeBar = (function (_super) {
        __extends(SangongTimeBar, _super);
        function SangongTimeBar() {
            var _this = _super.call(this) || this;
            _this.angle = 0;
            _this.time = 0;
            _this.skinName = new SangongTimeBarSkin();
            return _this;
        }
        SangongTimeBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addChild(this.timeLabel);
        };
        SangongTimeBar.prototype.startTime = function (root) {
            this.root = root;
            game.UpdateTickerManager.instance.add(this);
        };
        SangongTimeBar.prototype.update = function (dt) {
            if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
                var endTime = Global.roomProxy.roomInfo.countdown.end;
                var startTime = game.DateTimeManager.instance.now;
                var start = Global.roomProxy.roomInfo.countdown.s;
                if (!start) {
                    start = Global.roomProxy.roomInfo.countdown.end - Global.roomProxy.roomInfo.countdown.start;
                }
                var cha = endTime - startTime;
                if (cha <= 0) {
                    this.timeLabel.text = "00";
                    return;
                }
                this.timeLabel.text = NumberFormat.getNNTimeStr(cha);
            }
        };
        SangongTimeBar.prototype.updateTimeLabel = function () {
            this.update(0);
        };
        SangongTimeBar.prototype.removeTimer = function () {
            game.UpdateTickerManager.instance.remove(this);
        };
        return SangongTimeBar;
    }(game.BaseUI));
    sangong.SangongTimeBar = SangongTimeBar;
    __reflect(SangongTimeBar.prototype, "sangong.SangongTimeBar", ["IUpdate"]);
})(sangong || (sangong = {}));
