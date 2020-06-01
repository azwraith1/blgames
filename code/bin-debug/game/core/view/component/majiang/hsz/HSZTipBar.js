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
var majiang;
(function (majiang) {
    var HSZTipBar = (function (_super) {
        __extends(HSZTipBar, _super);
        function HSZTipBar(type) {
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.skinName = new HSZSucTipSkin();
            return _this;
        }
        HSZTipBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bgImage.source = RES.getRes("hsz_tip" + this.type + "_png");
            this.showTypeAni();
        };
        HSZTipBar.prototype.showTypeAni = function () {
            var time = 1100;
            switch (this.type) {
                case 0:
                    this.group1.visible = true;
                    egret.Tween.get(this.group1).to({
                        rotation: 360
                    }, 1000, egret.Ease.circOut);
                    break;
                case 1:
                    this.group2.visible = true;
                    egret.Tween.get(this.group2).to({
                        rotation: -360
                    }, 1000, egret.Ease.circOut);
                    break;
                case 2:
                    this.group3.visible = true;
                    egret.Tween.get(this.topImage).to({
                        y: this.topImage.y - 300
                    }, 600, egret.Ease.circOut);
                    egret.Tween.get(this.bottomImage).to({
                        y: this.bottomImage.y + 300
                    }, 600, egret.Ease.circOut);
                    break;
            }
        };
        return HSZTipBar;
    }(game.BaseUI));
    majiang.HSZTipBar = HSZTipBar;
    __reflect(HSZTipBar.prototype, "majiang.HSZTipBar");
})(majiang || (majiang = {}));
