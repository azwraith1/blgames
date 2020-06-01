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
var niuniu;
(function (niuniu) {
    var NiuniuNewTimeBar = (function (_super) {
        __extends(NiuniuNewTimeBar, _super);
        function NiuniuNewTimeBar() {
            var _this = _super.call(this) || this;
            _this.angle = 0;
            _this.time = 0;
            _this.skinName = new NiuniuNewtimeDirectionBarSkin();
            return _this;
        }
        NiuniuNewTimeBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.timeShape = new egret.Shape();
            // this.timeShape.rotation = -90;
            // this.addChild(this.timeShape);
            // this.timeShape.x = -49.5;
            // this.timeShape.y = 144.5;
            // this.addChild(this.timeLabel);
        };
        NiuniuNewTimeBar.prototype.showShapByPo = function (angle) {
            var shape = this.timeShape;
            shape.graphics.clear();
            shape.graphics.beginFill(0x53a7ce);
            shape.graphics.moveTo(90, 90);
            shape.graphics.drawArc(90, 90, 32, 0, angle * Math.PI / 180, false);
            shape.graphics.lineTo(90, 90);
            shape.graphics.endFill();
        };
        NiuniuNewTimeBar.prototype.startTime = function (root) {
            this.root = root;
            game.UpdateTickerManager.instance.add(this);
        };
        NiuniuNewTimeBar.prototype.update = function (dt) {
            if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
                var endTime = Global.roomProxy.roomInfo.countdown.end;
                var startTime = game.DateTimeManager.instance.now;
                var start = Global.roomProxy.roomInfo.countdown.s;
                this.tim = start;
                if (!start) {
                    start = Global.roomProxy.roomInfo.countdown.end - Global.roomProxy.roomInfo.countdown.start;
                }
                var cha = endTime - startTime;
                var value = Math.floor(360 * cha / start);
                // * 360;
                // if (value >= 0) {
                // 	this.showShapByPo(value);
                // }
                if (cha <= 0) {
                    this.timeLabel.text = "00";
                    return;
                }
                this.timeLabel.text = NumberFormat.getNNTimeStr(cha);
            }
        };
        NiuniuNewTimeBar.prototype.removeTimer = function () {
            game.UpdateTickerManager.instance.remove(this);
        };
        return NiuniuNewTimeBar;
    }(game.BaseUI));
    niuniu.NiuniuNewTimeBar = NiuniuNewTimeBar;
    __reflect(NiuniuNewTimeBar.prototype, "niuniu.NiuniuNewTimeBar", ["IUpdate"]);
})(niuniu || (niuniu = {}));
