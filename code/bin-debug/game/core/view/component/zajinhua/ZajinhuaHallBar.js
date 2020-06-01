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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaHallBar = (function (_super) {
        __extends(ZajinhuaHallBar, _super);
        function ZajinhuaHallBar(data, index) {
            var _this = _super.call(this) || this;
            _this.lock = false;
            _this.config = data;
            _this.index = index;
            _this.skinName = new ZajinhuaHallbarSkin();
            return _this;
        }
        ZajinhuaHallBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            game.UIUtils.setAnchorPot(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
        };
        ZajinhuaHallBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.showBarByConfig(this.config);
        };
        ZajinhuaHallBar.prototype.onTouchEnded = function () {
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
            RotationLoading.instance.load(["zhajinhua_game"], "", function () {
                CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10005, sceneId: _this.config.id, diFen: _this.config.bet_base, zhun: _this.config.gold_min });
            });
            egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        ZajinhuaHallBar.prototype.getDBName = function () {
            switch (this.index) {
                case 1:
                    return "zjh_cjc";
                case 2:
                    return "zjh_zjc";
                case 3:
                    return "zjh_gjc";
                case 4:
                    return "zjh_wzc";
            }
            this.db1.source = this.db2.source = RES.getRes("zjh_hall_bar_db" + this.index + "_png");
        };
        ZajinhuaHallBar.prototype.showBarByConfig = function (num) {
            this.difen.text = "底分：" + num.bet_base;
            this.zhunru.text = "准入：" + num.gold_min;
            var dbComponent = GameCacheManager.instance.getCache(this.getDBName());
            if (!dbComponent) {
                dbComponent = new DBComponent(this.getDBName());
                dbComponent.touchEnabled = false;
            }
            dbComponent.playByFilename(0);
            this.dbGroup.addChild(dbComponent);
            dbComponent.resetPosition();
            this.dyImage.source = RES.getRes("zjh_hall_bar_daoying" + this.index + "_png");
        };
        return ZajinhuaHallBar;
    }(game.BaseUI));
    zajinhua.ZajinhuaHallBar = ZajinhuaHallBar;
    __reflect(ZajinhuaHallBar.prototype, "zajinhua.ZajinhuaHallBar");
})(zajinhua || (zajinhua = {}));
