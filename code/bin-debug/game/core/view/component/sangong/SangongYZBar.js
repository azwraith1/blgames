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
    var SangongYZBar = (function (_super) {
        __extends(SangongYZBar, _super);
        function SangongYZBar() {
            var _this = _super.call(this) || this;
            _this.qzList = [];
            _this.points = {};
            _this.skinName = new SangongYZBarSkin();
            return _this;
        }
        SangongYZBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var p1 = { x: -155, y: 51 };
            var p2 = { x: -85, y: -61 };
            var p3 = { x: 55, y: -110 };
            var p4 = { x: 187, y: -61 };
            var p5 = { x: 250, y: 51 };
            this.points[1] = [p3];
            this.points[2] = [p2, p4];
            this.points[3] = [p2, p3, p4];
            this.points[4] = [p1, p2, p3, p4];
            this.points[5] = [p1, p2, p3, p4, p5];
            for (var i = 0; i <= 4; i++) {
                var btn = this['btn' + i];
                // btn.scaleX = btn.scaleY = 0;
                // btn.x = btn.y = 60;
                btn.visible = false;
            }
        };
        SangongYZBar.prototype.show = function (qzData) {
            this.qzList = [];
            for (var key in qzData) {
                if (qzData[key] == true) {
                    this.qzList.push(parseInt(key));
                }
            }
            var points = this.points[this.qzList.length];
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                var key = this.qzList[i];
                var button = this['btn' + i];
                button.labelDisplay.text = "x" + key;
                button.visible = true;
                // egret.Tween.get(button).to({
                // 	x: point.x,
                // 	y: point.y,
                // 	scaleX: 1,
                // 	scaleY: 1
                // }, 200+(i*35));
            }
            this.visible = true;
        };
        SangongYZBar.prototype.setRoot = function (root) {
            this.rootScene = root;
        };
        SangongYZBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.btn0:
                    //不抢
                    this.rootScene.sendYZReq(this.qzList[0]);
                    break;
                case this.btn1:
                    //第一个按钮
                    this.rootScene.sendYZReq(this.qzList[1]);
                    break;
                case this.btn2:
                    //第二个按钮
                    this.rootScene.sendYZReq(this.qzList[2]);
                    break;
                case this.btn3:
                    //第三个按钮
                    this.rootScene.sendYZReq(this.qzList[3]);
                    break;
                case this.btn4:
                    //第三个按钮
                    this.rootScene.sendYZReq(this.qzList[4]);
                    break;
            }
        };
        return SangongYZBar;
    }(game.BaseUI));
    sangong.SangongYZBar = SangongYZBar;
    __reflect(SangongYZBar.prototype, "sangong.SangongYZBar");
})(sangong || (sangong = {}));
