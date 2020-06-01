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
var GYZJHallBar = (function (_super) {
    __extends(GYZJHallBar, _super);
    function GYZJHallBar(data, index, gameType) {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.config = data;
        _this.index = index;
        _this.gameType = gameType;
        //	this.skinName = new DZMJHallBarSkin();
        _this.skinName = "resource/skins/widget/gyzj/GYZJHallBarSkin.exml";
        return _this;
    }
    GYZJHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.touchRect5.touchEnabled = true;
        this.touchRect5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    GYZJHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showBarByConfig(this.config);
    };
    GYZJHallBar.prototype.onTouchEnded = function () {
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
        RotationLoading.instance.load(["gyzjmj_game"], "", function () {
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(_this.gameType), sceneId: _this.config.id, diFen: _this.config.bet_base, zhun: _this.config.gold_min });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50); //50
    };
    GYZJHallBar.prototype.showBarByConfig = function (num) {
        this.diZhuTxt.text = "底注:" + num.bet_base;
        this.zhunRuLable.text = "准入:" + num.gold_min;
        //this.setChildrenSortMode(num);
        var dbComponent = GameCacheManager.instance.getCache(this.DBName);
        if (!dbComponent) {
            dbComponent = new DBComponent(this.DBName);
            dbComponent.touchEnabled = false;
        }
        dbComponent.playByFilename(0);
        this.dbGroup.addChild(dbComponent);
        this.dbGroup.touchEnabled = false;
        this.dbGroup.touchChildren = false;
        //this.dbGroup.width=270;
        dbComponent.resetPosition();
        //this.setChildIndex(this.touchCom,this.numChildren);
        //this.titleImage.source = RES.getRes(`hzmj_scene_tip${this.index}_png`)
        // this.difenImage.source = RES.getRes(`dzmj_scene_df${this.index}_png`);
        // this.zhunruImage.source = RES.getRes(`dzmj_scene_zr${this.index}_png`);
        // this.difenLabel.font = `dzmj_scene_difen${this.index}_fnt`;
        // this.zhunruLabel.font = `dzmj_scene_zhunru${this.index}_fnt`;
    };
    Object.defineProperty(GYZJHallBar.prototype, "DBName", {
        get: function () {
            switch (this.index) {
                case 1:
                    return "gyzj_xsc";
                case 2:
                    return "gyzj_zjc";
                case 3:
                    return "gyzj_gjc";
                case 4:
                    return "gyzj_thc";
            }
        },
        enumerable: true,
        configurable: true
    });
    return GYZJHallBar;
}(game.BaseUI));
__reflect(GYZJHallBar.prototype, "GYZJHallBar");
