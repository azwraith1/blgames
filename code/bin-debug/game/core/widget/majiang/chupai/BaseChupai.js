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
    var BaseChupai = (function (_super) {
        __extends(BaseChupai, _super);
        function BaseChupai() {
            return _super.call(this) || this;
        }
        BaseChupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.maskRect.mask = this.bgImage1;
        };
        BaseChupai.prototype.dianpaoAni = function () {
            var _this = this;
            var mc1 = GameCacheManager.instance.getMcCache("hu_up1", this.direction + "_hu_up1", null); //game.MCUtils.getMc("hu_up1");
            var mc2 = GameCacheManager.instance.getMcCache("hu_up2", this.direction + "_hu_up2", null); //game.MCUtils.getMc("hu_up2");
            this.addChild(mc2);
            this.addChild(this.bgImage);
            this.addChild(this.colorImage);
            this.addChild(mc1);
            mc2.scaleX = mc2.scaleX = 1.5;
            mc2.x = this.width / 2;
            mc2.y = this.height / 2;
            mc1.scaleX = mc1.scaleY = 1.5;
            mc1.x = this.width / 2;
            mc1.y = this.height / 2 - 20;
            var mcCallback1 = function () {
                mc1.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback1, _this);
                game.UIUtils.removeSelf(mc1);
            };
            mc1.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback1, this);
            var mcCallback2 = function () {
                mc2.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback2, _this);
                game.UIUtils.removeSelf(mc2);
            };
            mc2.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback2, this);
            mc1.play(1);
            mc2.play(1);
            this.setAutoTimeout(function () {
                game.UIUtils.removeSelf(_this);
            }, this, 400);
            return 400;
        };
        BaseChupai.prototype.showMaskRect = function (value) {
            this.maskRect.visible = this.value == value;
        };
        return BaseChupai;
    }(game.BaseUI));
    majiang.BaseChupai = BaseChupai;
    __reflect(BaseChupai.prototype, "majiang.BaseChupai");
})(majiang || (majiang = {}));
