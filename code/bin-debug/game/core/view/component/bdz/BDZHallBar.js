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
var BDZHallBar = (function (_super) {
    __extends(BDZHallBar, _super);
    function BDZHallBar(data, index) {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.config = data;
        _this.index = index;
        _this.skinName = new BDZHallBarSkin();
        return _this;
    }
    BDZHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
        this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    };
    BDZHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showBarByConfig(this.config);
    };
    BDZHallBar.prototype.onTouchEnded = function () {
        var _this = this;
        game.AudioManager.getInstance().playSound("ui_click_mp3");
        ; //管理声音的
        if (this.lock) {
            return;
        }
        this.lock = true;
        egret.setTimeout(function () {
            this.lock = false;
        }, this, 1000);
        RotationLoading.instance.load(["bdz_game"], "", function () {
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10009, sceneId: _this.config.id });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
    };
    BDZHallBar.prototype.showBarByConfig = function (num) {
        this.zrLabel.text = num.bet_base; //NumberFormat.fNumberBDZStr3(num.bet_base);
        var dbComponent = GameCacheManager.instance.getCache("bdz_xc_" + this.index);
        if (!dbComponent) {
            dbComponent = new DBComponent("bdz_xc_" + this.index, false);
            dbComponent.touchEnabled = false;
        }
        dbComponent.play("default", -1);
        // dbComponent.playDefault(0);
        this.dbGroup.addChild(dbComponent);
        dbComponent.resetPosition();
        switch (this.index) {
            case 1:
                // dbComponent.x = -15;
                this.horizontalCenter = -360;
                break;
            case 2:
                // dbComponent.x = -28;
                // dbComponent.y = -24;
                this.horizontalCenter = 0;
                break;
            case 3:
                // dbComponent.x = -53;
                // dbComponent.y = -33;
                this.horizontalCenter = 360;
                break;
        }
    };
    return BDZHallBar;
}(game.BaseUI));
__reflect(BDZHallBar.prototype, "BDZHallBar");
