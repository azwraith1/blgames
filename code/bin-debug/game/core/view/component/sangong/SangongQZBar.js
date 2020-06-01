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
    var SangongQZBar = (function (_super) {
        __extends(SangongQZBar, _super);
        function SangongQZBar() {
            var _this = _super.call(this) || this;
            _this.qzList = [];
            _this.skinName = new SangongQZBarSkin();
            return _this;
        }
        SangongQZBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SangongQZBar.prototype.show = function () {
            this.visible = true;
            // egret.Tween.get(this.btn0).to({
            // 	x: 57,
            // 	y: 57,
            // 	scaleX: 1,
            // 	scaleY: 1	
            // },  200, egret.Ease.quadOut);
            // egret.Tween.get(this.btn1).to({
            // 	x: 207,
            // 	y: 57,
            // 	scaleX: 1,
            // 	scaleY: 1	
            // }, 200, egret.Ease.quadOut);
        };
        SangongQZBar.prototype.setRoot = function (root) {
            this.rootScene = root;
        };
        SangongQZBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.btn0:
                    //不抢
                    this.rootScene.sendQZReq(0);
                    break;
                case this.btn1:
                    //第一个按钮
                    this.rootScene.sendQZReq(1);
                    break;
            }
        };
        return SangongQZBar;
    }(game.BaseUI));
    sangong.SangongQZBar = SangongQZBar;
    __reflect(SangongQZBar.prototype, "sangong.SangongQZBar");
})(sangong || (sangong = {}));
