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
var baicao;
(function (baicao) {
    var BaiCaoTimebar = (function (_super) {
        __extends(BaiCaoTimebar, _super);
        function BaiCaoTimebar() {
            var _this = _super.call(this) || this;
            _this.progressMaxWidth = 172;
            return _this;
        }
        BaiCaoTimebar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.progressBar.mask = this.progressBarMask;
        };
        BaiCaoTimebar.prototype.reseateMask = function () {
            this.progressBarMask.width = 172;
            this.visible = false;
        };
        BaiCaoTimebar.prototype.restartTime = function () {
            this.progressBarMask.width = 172;
            this.visible = true;
        };
        BaiCaoTimebar.prototype.update = function (dt) {
            if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
                var endTime = Global.roomProxy.roomInfo.countdown.end;
                var startTime = game.DateTimeManager.instance.now;
                var start = Global.roomProxy.roomInfo.countdown.s;
                if (!start) {
                    start = Global.roomProxy.roomInfo.countdown.end - Global.roomProxy.roomInfo.countdown.start;
                }
                var cha = endTime - startTime;
                var value = cha / start;
                if (cha <= 0) {
                    this.timeLabel.text = "00";
                    return;
                }
                this.timeLabel.text = NumberFormat.getNNTimeStr(cha);
                this.progressBarMask.width = 172 * value;
                this.progressBar.mask = this.progressBarMask;
            }
        };
        return BaiCaoTimebar;
    }(rbwar.RBWarTimebar));
    baicao.BaiCaoTimebar = BaiCaoTimebar;
    __reflect(BaiCaoTimebar.prototype, "baicao.BaiCaoTimebar");
})(baicao || (baicao = {}));
