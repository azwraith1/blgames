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
var BlackJHallBar = (function (_super) {
    __extends(BlackJHallBar, _super);
    function BlackJHallBar() {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.skinName = "BlackJHallBarSkin" + CF.tis;
        return _this;
    }
    BlackJHallBar.prototype.showBarByConfig = function (config, index, color) {
        this.index = index;
        var name = this.getEffectNameByIndex(index);
        var mc = GameCacheManager.instance.getCache(name + index);
        if (!mc) {
            mc = new DBComponent(name);
            GameCacheManager.instance.setCache(name, mc);
        }
        mc.touchEnabled = false;
        this.dbGroup.addChild(mc);
        mc.playByFilename(-1);
        this.mc = mc;
        this.visible = true;
        this.config = config;
        var id = config.id;
        var gold_min = config.gold_min;
        this.bottomScore.text = config.bet_base;
        this.bottomScore.font = RES.getRes("blackj_hall_score" + index + "_fnt");
        this.difenImage.texture = RES.getRes("blackj_hall_bar_df" + index + CF.tic);
        this.zhunruImage.texture = RES.getRes("blackj_hall_bar_zr" + index + CF.tic);
        this.zhunruLabel.text = gold_min;
        this.zhunruLabel.strokeColor = color;
    };
    BlackJHallBar.prototype.resetPosition = function () {
        this.mc.x = 606;
        this.mc.y = 207;
        switch (this.index) {
            case 1:
                this.y = -15 + this.anchorOffsetY;
                this.fenGroup.y = 53;
                break;
            case 2:
                this.y = 225 + this.anchorOffsetY;
                this.fenGroup.y = 39;
                break;
            case 3:
                this.y = 460 + this.anchorOffsetY;
                this.fenGroup.y = 39;
                break;
            case 4:
                this.y = 703 + this.anchorOffsetY;
                this.mc.x = 630;
                this.fenGroup.y = 30;
                break;
        }
    };
    BlackJHallBar.prototype.getEffectNameByIndex = function (index) {
        switch (index) {
            case 1:
                return "21d_xsc" + TextUtils.instance.currentAniStr;
            case 2:
                return "21d_cjc" + TextUtils.instance.currentAniStr;
            case 3:
                return "21d_gjc" + TextUtils.instance.currentAniStr;
            case 4:
                return "21d_thc" + TextUtils.instance.currentAniStr;
        }
    };
    BlackJHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    BlackJHallBar.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    BlackJHallBar.prototype.onTouchEnded = function () {
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
        RotationLoadingShu.instance.load(["blackjack_game"], "", function () {
            CF.dP(ENo.ENTER_GOLD_SCENE, { sceneId: _this.config.id, diFen: _this.config.bet_base });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
    };
    return BlackJHallBar;
}(game.BaseUI));
__reflect(BlackJHallBar.prototype, "BlackJHallBar");
