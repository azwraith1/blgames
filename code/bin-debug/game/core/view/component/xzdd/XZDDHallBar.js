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
var XZDDHallBar = (function (_super) {
    __extends(XZDDHallBar, _super);
    function XZDDHallBar(data, index, gameType) {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.config = data;
        _this.index = index;
        _this.gameType = gameType;
        _this.skinName = "XZDDHallBarSkin";
        return _this;
    }
    XZDDHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    XZDDHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showBarByConfig(this.config);
    };
    XZDDHallBar.prototype.onTouchEnded = function () {
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
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 50).to({ scaleX: 1.12, scaleY: 1.12 }, 50);
    };
    XZDDHallBar.prototype.showBarByConfig = function (num) {
        this.dizhuLabel.text = num.bet_base;
        this.dizhuLabel.stroke = 2;
        this.zhunruLabel.text = "准入:" + num.gold_min;
        var dbComponent = GameCacheManager.instance.getCache("db_mj" + this.config.icon);
        if (!dbComponent) {
            dbComponent = new DBComponent("db_mj");
            GameCacheManager.instance.setCache("db_mj" + this.config.icon, dbComponent);
        }
        dbComponent.touchEnabled = false;
        dbComponent.touchChildren = false;
        dbComponent.play("ani" + this.config.icon, -1);
        this.dbGroup.addChild(dbComponent);
        dbComponent.resetPosition();
    };
    return XZDDHallBar;
}(game.BaseUI));
__reflect(XZDDHallBar.prototype, "XZDDHallBar");
