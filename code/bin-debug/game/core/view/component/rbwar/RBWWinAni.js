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
var RBWWinAni = (function (_super) {
    __extends(RBWWinAni, _super);
    function RBWWinAni() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/widget/rbwar/RBWWinAniSkin.exml";
        return _this;
    }
    RBWWinAni.prototype.showWinAni = function (isHong) {
        var _this = this;
        if (isHong === void 0) { isHong = true; }
        if (!isHong) {
            this.winImg.source = RES.getRes("hhdz_game_hei_png");
            this.xinImg.source = RES.getRes("hhdz_game_heixin_png");
            this.xinImg.y = -26;
        }
        else {
            this.winImg.source = RES.getRes("hhdz_game_hong_png");
            this.xinImg.source = RES.getRes("hhdz_game_hongxin_png");
            this.xinImg.y = -25;
        }
        this.winImg.anchorOffsetX = this.winImg.width / 2;
        this.winImg.anchorOffsetY = this.winImg.height / 2;
        this.winImg.scaleX = 2;
        this.winImg.scaleY = 2;
        egret.Tween.get(this.winImg).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceOut).wait(300).call(function () {
            _this.shengImg.visible = true;
        }, this);
    };
    return RBWWinAni;
}(eui.Component));
__reflect(RBWWinAni.prototype, "RBWWinAni");
