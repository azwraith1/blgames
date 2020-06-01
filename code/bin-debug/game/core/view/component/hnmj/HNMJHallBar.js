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
var HNMJHallBar = (function (_super) {
    __extends(HNMJHallBar, _super);
    function HNMJHallBar(data, index, gameType) {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.config = data;
        _this.index = index;
        _this.gameType = gameType;
        _this.skinName = "HNMJHallBarSkin";
        return _this;
    }
    HNMJHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    HNMJHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showBarByConfig(this.config);
    };
    HNMJHallBar.prototype.onTouchEnded = function () {
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
        RotationLoading.instance.load(["hnmj_game"], "", function () {
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(_this.gameType), sceneId: _this.config.id, diFen: _this.config.bet_base, zhun: _this.config.gold_min });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
    };
    HNMJHallBar.prototype.showBarByConfig = function (num) {
        this.dizhuLabel.text = num.bet_base;
        this.zhunruLabel.text = num.gold_min;
        this.dbGroup.touchEnabled = false;
        var dbComponent = GameCacheManager.instance.getCache("hnmj_xc_" + this.index);
        if (!dbComponent) {
            dbComponent = new DBComponent(this.getDBName());
            dbComponent.touchEnabled = false;
            dbComponent.touchChildren = false;
        }
        dbComponent.playByFilename(0);
        this.dbGroup.addChild(dbComponent);
        if (this.index == 4) {
            dbComponent.x = -20;
        }
        dbComponent.resetPosition();
    };
    HNMJHallBar.prototype.getDBName = function () {
        switch (this.index) {
            case 1:
                this.contentGroup.x = 8;
                return "hnmj_cjc";
            case 2:
                this.contentGroup.x = 8;
                return "hnmj_zjc";
            case 3:
                this.contentGroup.x = 12;
                return "hnmj_gjc";
            case 4:
                this.contentGroup.x = 12;
                return "hnmj_thc";
        }
    };
    return HNMJHallBar;
}(game.BaseUI));
__reflect(HNMJHallBar.prototype, "HNMJHallBar");
