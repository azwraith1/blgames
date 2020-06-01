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
var rbwar;
(function (rbwar) {
    var RBWHallBar = (function (_super) {
        __extends(RBWHallBar, _super);
        function RBWHallBar(data) {
            var _this = _super.call(this) || this;
            _this.lock = false;
            _this.config = data;
            _this.skinName = new RBWHallBarSkin();
            return _this;
        }
        RBWHallBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            game.UIUtils.setAnchorPot(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
        };
        RBWHallBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var t = this.config.bet_base;
            var t1 = this.config.bet_max;
            var t2 = this.config.icon;
            this.zhunru.text = this.config.gold_min;
            var endshow = this.config.enable;
            this.showBarByConfig(t, t1, t2, endshow);
        };
        RBWHallBar.prototype.onTouchEnded = function () {
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
            RotationLoading.instance.load(["rbwar_game"], "", function () {
                CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10008, sceneId: _this.config.id });
            });
            egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        RBWHallBar.prototype.showBarByConfig = function (tz1, tz2, index, endshow) {
            if (!endshow) {
                this.rbw_zh.source = RES.getRes("rbw_select_gh_png");
                return;
            }
            this.tzfflable.text = tz1 + "-" + tz2;
            var dbComponent = GameCacheManager.instance.getCache("rbw_main_" + index);
            if (!dbComponent) {
                dbComponent = new DBComponent("rbw_main_" + index);
                dbComponent.touchEnabled = false;
            }
            dbComponent.playDefault(0);
            this.dbGroup.addChild(dbComponent);
            dbComponent.resetPosition();
            this.width = dbComponent.width;
            this.height = dbComponent.height;
            if (index == 2) {
                this.zhunru.y = 380;
                this.zhunruText.y = 380;
            }
            else if (index == 3) {
                this.zhunru.visible = this.zhunruText.visible = false;
            }
            // dbComponent.y += 60;
            // this.cc_wz.source = RES.getRes(`rbw_s${index}_${index}_png`)
            // this.cc_image.source = RES.getRes(`rbw_s${index}_png`)
        };
        return RBWHallBar;
    }(game.BaseUI));
    rbwar.RBWHallBar = RBWHallBar;
    __reflect(RBWHallBar.prototype, "rbwar.RBWHallBar");
})(rbwar || (rbwar = {}));
