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
var DZMJHallBar = (function (_super) {
    __extends(DZMJHallBar, _super);
    function DZMJHallBar(data, index, gameType) {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.config = data;
        _this.index = index;
        _this.gameType = gameType;
        _this.skinName = new DZMJHallBarSkin();
        return _this;
        //	this.skinName = "resource/skins/widget/hzmj/HZMJHallBarSkin.exml";
    }
    DZMJHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    DZMJHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showBarByConfig(this.config);
    };
    DZMJHallBar.prototype.onTouchEnded = function () {
        var _this = this;
        majiang.MajiangUtils.playClick(); //管理声音的
        if (!this.config.enable) {
            Global.alertMediator.addAlert("即将开放,敬请期待", null, null, true);
            return;
        }
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
            Global.alertMediator.addAlert(text, null, null, true);
            return;
        }
        RotationLoading.instance.load(["majiang_game"], "", function () {
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(_this.gameType), sceneId: _this.config.id, diFen: _this.config.bet_base, zhun: _this.config.gold_min });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
    };
    DZMJHallBar.prototype.showBarByConfig = function (num) {
        this.difenLabel.text = num.bet_base;
        this.zhunruLabel.text = num.gold_min;
        var dbComponent = GameCacheManager.instance.getCache("dzmj_xc_" + this.index);
        if (!dbComponent) {
            dbComponent = new DBComponent("dzmj_xc_" + this.index);
            dbComponent.touchEnabled = false;
        }
        dbComponent.touchChildren = false;
        dbComponent.playDefault(0);
        this.dbGroup.addChild(dbComponent);
        dbComponent.resetPosition();
        this.titleImage.source = RES.getRes("dzmj_scene_tip" + this.index + "_png");
        this.difenImage.source = RES.getRes("dzmj_scene_df" + this.index + "_png");
        this.zhunruImage.source = RES.getRes("dzmj_scene_zr" + this.index + "_png");
        this.difenLabel.font = "dzmj_scene_difen" + this.index + "_fnt";
        this.zhunruLabel.font = "dzmj_scene_zhunru" + this.index + "_fnt";
    };
    return DZMJHallBar;
}(game.BaseUI));
__reflect(DZMJHallBar.prototype, "DZMJHallBar");
