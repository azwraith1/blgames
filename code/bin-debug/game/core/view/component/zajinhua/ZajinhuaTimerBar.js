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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaTimerBar = (function (_super) {
        __extends(ZajinhuaTimerBar, _super);
        function ZajinhuaTimerBar() {
            var _this = _super.call(this) || this;
            _this.time = 0;
            _this.skinName = new ZajinhuaTimerBarSkin();
            return _this;
        }
        ZajinhuaTimerBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.timeShape = new egret.Shape();
            this.timeShape.rotation = -90;
            this.addChild(this.timeShape);
            this.timeShape.x = -40;
            this.timeShape.y = 135;
        };
        ZajinhuaTimerBar.prototype.showShapByPo = function (angle) {
            var shape = this.timeShape;
            shape.graphics.clear();
            shape.graphics.beginFill(0x53a7ce);
            shape.graphics.moveTo(90, 90);
            shape.graphics.drawArc(90, 90, 90, 0, angle * Math.PI / -180, true);
            shape.graphics.lineTo(90, 90);
            shape.graphics.endFill();
            this.djs_cirl.mask = shape;
        };
        ZajinhuaTimerBar.prototype.startTime = function (root) {
            this.root = root;
            game.UpdateTickerManager.instance.add(this);
        };
        ZajinhuaTimerBar.prototype.update = function (dt) {
            if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
                var endTime = Global.roomProxy.roomInfo.countdown.end;
                var startTime = game.DateTimeManager.instance.now;
                var start = Global.roomProxy.roomInfo.countdown.s * 1000;
                if (!start) {
                    start = Global.roomProxy.roomInfo.countdown.end - Global.roomProxy.roomInfo.countdown.start;
                }
                var cha = endTime - startTime;
                var value = Math.floor(360 * cha / start);
                if (value >= 0) {
                    this.showShapByPo(value);
                }
                if (cha <= 0) {
                    return;
                }
            }
        };
        ZajinhuaTimerBar.prototype.removeTimer = function () {
            game.UpdateTickerManager.instance.remove(this);
        };
        return ZajinhuaTimerBar;
    }(game.BaseUI));
    zajinhua.ZajinhuaTimerBar = ZajinhuaTimerBar;
    __reflect(ZajinhuaTimerBar.prototype, "zajinhua.ZajinhuaTimerBar", ["IUpdate"]);
})(zajinhua || (zajinhua = {}));
