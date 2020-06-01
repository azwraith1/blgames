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
var HZMJHallBar = (function (_super) {
    __extends(HZMJHallBar, _super);
    function HZMJHallBar(data, index, gameType) {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.config = data;
        _this.index = index;
        _this.gameType = gameType;
        //	this.skinName = new DZMJHallBarSkin();
        _this.skinName = "resource/skins/widget/hzmj/HZMJHallBarSkin.exml";
        return _this;
    }
    HZMJHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.touchRect5.touchEnabled = true;
        this.touchRect5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    HZMJHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showBarByConfig(this.config);
    };
    /**设置字体的颜色 大小*/
    HZMJHallBar.prototype.setTxtColor = function (index) {
        this.zhunRuLable.bold = true;
        this.zhunRuLable.size = 24;
        switch (index) {
            case 1:
                this.zhunRuLable.textColor = 0Xc3fde1;
                break;
            case 2:
                this.zhunRuLable.textColor = 0Xd1e8fe;
                break;
            case 3:
                this.zhunRuLable.textColor = 0Xfcea9a;
                break;
            case 4:
                this.zhunRuLable.textColor = 0Xfcea9a;
                break;
            default:
                break;
        }
    };
    HZMJHallBar.prototype.onTouchEnded = function () {
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
        RotationLoading.instance.load(["hzmj_game"], "", function () {
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(_this.gameType), sceneId: _this.config.id, diFen: _this.config.bet_base, zhun: _this.config.gold_min });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50); //50
    };
    HZMJHallBar.prototype.showBarByConfig = function (num) {
        this.diZhuTxt.text = "底注:" + num.bet_base;
        this.zhunRuLable.text = "准入:" + num.gold_min;
        this.setTxtColor(num);
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
    Object.defineProperty(HZMJHallBar.prototype, "DBName", {
        get: function () {
            switch (this.index) {
                case 1:
                    return "hzmj_cjc";
                case 2:
                    return "hzmj_zjc";
                case 3:
                    return "hzmj_gjc";
                case 4:
                    return "hzmj_thc";
            }
        },
        enumerable: true,
        configurable: true
    });
    return HZMJHallBar;
}(game.BaseUI));
__reflect(HZMJHallBar.prototype, "HZMJHallBar");
