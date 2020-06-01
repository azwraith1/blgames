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
var rbwar;
(function (rbwar) {
    var RBWarTimebar = (function (_super) {
        __extends(RBWarTimebar, _super);
        function RBWarTimebar() {
            var _this = _super.call(this) || this;
            _this.time = 0;
            return _this;
        }
        RBWarTimebar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RBWarTimebar.prototype.startTime = function (root) {
            this.root = root;
            game.UpdateTickerManager.instance.add(this);
        };
        RBWarTimebar.prototype.update = function (dt) {
            if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
                var endTime = Global.roomProxy.roomInfo.countdown.end;
                var startTime = game.DateTimeManager.instance.now;
                var start = Global.roomProxy.roomInfo.countdown.s;
                if (!start) {
                    start = Global.roomProxy.roomInfo.countdown.end - Global.roomProxy.roomInfo.countdown.start;
                }
                var cha = endTime - startTime;
                var value = Math.floor(360 * cha / start);
                if (cha <= 0) {
                    this.timeLabel.text = "00";
                    return;
                }
                this.timeLabel.text = NumberFormat.getNNTimeStr(cha);
            }
        };
        RBWarTimebar.prototype.removeTimer = function () {
            game.UpdateTickerManager.instance.remove(this);
        };
        return RBWarTimebar;
    }(game.BaseUI));
    rbwar.RBWarTimebar = RBWarTimebar;
    __reflect(RBWarTimebar.prototype, "rbwar.RBWarTimebar", ["IUpdate"]);
})(rbwar || (rbwar = {}));
