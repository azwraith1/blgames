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
// TypeScript file
var BaseMJHallBar = (function (_super) {
    __extends(BaseMJHallBar, _super);
    function BaseMJHallBar(data, index, gameType, _loadGroups) {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.config = data;
        _this.index = index;
        _this.gameType = gameType;
        _this.loadGroups = _loadGroups;
        _this.skinName = "MaJiangCommonHallBarSkin";
        return _this;
    }
    BaseMJHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.touchRect5.touchEnabled = true;
        this.touchRect5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    BaseMJHallBar.prototype.showButtonAni = function (delay) {
        var _this = this;
        egret.Tween.removeTweens(this);
        this.scaleX = 0;
        this.scaleY = 0;
        this.alpha = 0;
        this.visible = false;
        egret.Tween.get(this).wait(delay).call(function () {
            _this.visible = true;
        }).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut).to({ scaleX: 0.95, scaleY: 0.95 }, 100, egret.Ease.quadOut).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.quadOut);
        egret.Tween.get(this).wait(delay).to({ alpha: 0.6 }, 280, egret.Ease.quadOut).to({ alpha: 0.95 }, 280, egret.Ease.quadOut).to({ alpha: 1 }, 50, egret.Ease.quadOut);
    };
    BaseMJHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showBarByConfig(this.config);
        this.mjBg.source = "mj_comom_" + this.index + "_png";
        this.showSpecialPlay(this.gameType);
    };
    BaseMJHallBar.prototype.showSpecialPlay = function (gameName) {
        switch (gameName) {
            case "gdmj":
                this.specialPlay.visible = true;
                this.specialPlay.source = "mj_hall_ypm_png";
                break;
            case "mjxlch":
            case "mjxzdd":
                this.specialPlay.visible = true;
                this.specialPlay.source = "mj_hall_hsz_png";
                break;
            default:
                this.specialPlay.visible = false;
                break;
        }
    };
    BaseMJHallBar.prototype.onTouchEnded = function () {
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
            if (!GameConfig.GAME_CONFIG)
                GameConfig.GAME_CONFIG = RES.getRes("client_json");
            var text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
            Global.alertMediator.addAlert(text, null, null, true);
            return;
        }
        RotationLoading.instance.load(this.loadGroups, "", function () {
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(_this.gameType), sceneId: _this.config.id, diFen: _this.config.bet_base, zhun: _this.config.gold_min });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50); //50
    };
    BaseMJHallBar.prototype.showBarByConfig = function (num) {
        this.setTxtColor(this.txtColor);
        this.diZhuTxt.text = "底注:" + num.bet_base;
        this.zhunRuLable.text = "准入:" + num.gold_min;
        var db = new DBComponent("dt20_majiang_xc");
        this.dbGroup.addChild(db);
        db.playByFilename(-1);
    };
    Object.defineProperty(BaseMJHallBar.prototype, "txtColor", {
        get: function () {
            switch (this.index) {
                case 1:
                    return 0x7cc097;
                case 2:
                    return 0x81abc7;
                case 3:
                    return 0xcb848d;
                case 4:
                    return 0xa279b6;
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseMJHallBar.prototype.setTxtColor = function (color) {
        this.diZhuTxt.textColor = color;
        this.zhunRuLable.textColor = color;
    };
    return BaseMJHallBar;
}(game.BaseUI));
__reflect(BaseMJHallBar.prototype, "BaseMJHallBar");
