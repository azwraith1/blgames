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
    var RBWarQSBar = (function (_super) {
        __extends(RBWarQSBar, _super);
        function RBWarQSBar() {
            return _super.call(this) || this;
        }
        RBWarQSBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.qsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qsBtnTouch, this);
        };
        RBWarQSBar.prototype.qsBtnTouch = function () {
            CF.sN(PanelNotify.OPEN_RBWARZS);
        };
        RBWarQSBar.prototype.init = function () {
            for (var i = 0; i < this.pointGroup.numChildren; i++) {
                this.pointGroup.getChildAt(i).visible = false;
            }
            for (var i = 0; i < this.textGroup.numChildren; i++) {
                this.textGroup.getChildAt(i).visible = false;
            }
        };
        /**
         * 更新趋势榜
         */
        RBWarQSBar.prototype.update = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            var report = roomInfo.lastRBReport;
            for (var i = 0; i < this.pointGroup.numChildren; i++) {
                var image = this.pointGroup.getChildAt(i);
                var portIndex = report.length - 20 + i;
                var result = report[portIndex];
                if (result) {
                    var text = result == 1 ? "rb_poing_red_png" : "rb_point_black_png";
                    image.source = RES.getRes(text);
                    image.visible = true;
                }
                else {
                    image.visible = false;
                }
            }
            var patterns = roomInfo.lastWinPattern;
            for (var i = 0; i < this.textGroup.numChildren; i++) {
                var image = this.textGroup.getChildAt(i);
                var patternData = patterns[10 + i];
                var result = patterns[10 + i].pattern;
                if (result || result > -1) {
                    if (patternData.pump == true) {
                        //对7
                        image.visible = true;
                        image.changeTongsha();
                    }
                    else {
                        image.visible = true;
                        image.showText(RBW_PATTERN[result]);
                        image.changeBg(patterns[10 + i].luckyWin);
                    }
                }
                else {
                    image.visible = false;
                }
            }
        };
        return RBWarQSBar;
    }(eui.Component));
    rbwar.RBWarQSBar = RBWarQSBar;
    __reflect(RBWarQSBar.prototype, "rbwar.RBWarQSBar");
})(rbwar || (rbwar = {}));
