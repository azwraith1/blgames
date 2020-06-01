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
var BaiCaoHallBar = (function (_super) {
    __extends(BaiCaoHallBar, _super);
    function BaiCaoHallBar() {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.skinName = "BaiCaoHallBarSkin";
        return _this;
    }
    BaiCaoHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    BaiCaoHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.zhunruLabel.text = "";
    };
    BaiCaoHallBar.prototype.onTouchEnded = function () {
        var _this = this;
        majiang.MajiangUtils.playClick(); //管理声音的
        if (this.lock) {
            return;
        }
        this.lock = true;
        egret.setTimeout(function () {
            this.lock = false;
        }, this, 1000);
        var playerGold = Global.playerProxy.playerData.gold;
        if (playerGold < this.config.gold_min) {
            var text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
            var txt = TextUtils.instance.getCurrentTextById(139);
            Global.alertMediator.addAlert(txt, null, null, true);
            return;
        }
        RotationLoadingShu.instance.load(["baicao_game"], "", function () {
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: GAME_ID.BAICAO, sceneId: _this.config.id, diFen: _this.config.bet_base });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
    };
    BaiCaoHallBar.prototype.showBarByConfig = function (config, index, color) {
        var dbname = "ynbc_xc" + index;
        var mc = new DBComponent(dbname);
        this.effcGroup.addChild(mc);
        this.hallbarBg.source = dbname + "_png";
        mc.playByFilename(-1);
        this.visible = true;
        this.config = config;
        var id = config.id;
        var gold_min = config.gold_min;
        this.zhunruLabel.text = gold_min;
    };
    return BaiCaoHallBar;
}(game.BaseUI));
__reflect(BaiCaoHallBar.prototype, "BaiCaoHallBar");
