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
var GDMJBaoCardAni = (function (_super) {
    __extends(GDMJBaoCardAni, _super);
    function GDMJBaoCardAni(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        _this.skinName = "GDMJBaoCardAniSkin";
        return _this;
    }
    GDMJBaoCardAni.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.pai.resetValue(this.color);
        this.pai.hideLaiziImage();
        game.UIUtils.setAnchorPot(this.pai);
        this.pai.scaleX = this.pai.scaleY = 0;
        egret.Tween.get(this.pai).to({
            scaleX: 1.23,
            scaleY: 1.23
        }, 300, egret.Ease.sineIn);
        this.setAutoTimeout(function () {
            _this.createDb();
        }, this, 200);
    };
    GDMJBaoCardAni.prototype.createDb = function () {
        var db = new DBComponent("gdmj_laizi");
        this.dbGroup.addChild(db);
        db.playByFilename(0);
        db.y = -10;
        this.db = db;
    };
    GDMJBaoCardAni.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        this.db.stop();
        game.UIUtils.removeSelf(this.db);
        this.db = null;
    };
    return GDMJBaoCardAni;
}(game.BaseUI));
__reflect(GDMJBaoCardAni.prototype, "GDMJBaoCardAni");
