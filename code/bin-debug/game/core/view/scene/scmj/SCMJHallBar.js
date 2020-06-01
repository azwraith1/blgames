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
var majiang;
(function (majiang) {
    var SCMJHallBar = (function (_super) {
        __extends(SCMJHallBar, _super);
        function SCMJHallBar(data, gameType) {
            var _this = _super.call(this) || this;
            _this.lock = false;
            _this.data = data;
            _this.gameType = gameType;
            _this.skinName = "SCMJHallBarSkin";
            return _this;
        }
        SCMJHallBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var data = this.data;
            var db = GameCacheManager.instance.getCache("db_scmj" + data.icon);
            if (!db) {
                db = new DBComponent("db_mj");
                GameCacheManager.instance.setCache("db_scmj" + data.icon, db);
            }
            db.touchEnabled = false;
            db.touchChildren = false;
            db.play("ani" + data.icon, -1);
            this.bar.addChild(db);
            db.x = db.width / 2;
            db.y = db.height / 2;
            this.dizhu.text = this.data["bet_base"];
            this.dizhu.stroke = 2;
            this.dzGroup.horizontalCenter = 0;
            this.zuidiGold = this.data["gold_min"];
            this.zhunru.text = "准入:" + this.data["gold_min"];
            game.UIUtils.setAnchorPot(this);
            this.sceneId = data.id;
            // this.dizhu.y = 9;
        };
        /**
         * 底注，文字赋值不同的颜色
         */
        SCMJHallBar.prototype.showColor = function (num) {
            switch (num) {
                case 1:
                    return 0x9dff86;
                case 2:
                    return 0xfcd743;
                case 3:
                    return 0xffc1b9;
                case 4:
                    return 0xfebaff;
            }
        };
        /**
         *文字描边
         */
        SCMJHallBar.prototype.showColor1 = function (num) {
            switch (num) {
                case 1:
                    return 0x216132;
                case 2:
                    return 0x924700;
                case 3:
                    return 0x810f00;
                case 4:
                    return 0x760075;
            }
        };
        SCMJHallBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            majiang.MajiangUtils.playClick(); //管理声音的
            if (this.lock) {
                return;
            }
            this.lock = true;
            egret.setTimeout(function () {
                this.lock = false;
            }, this, 1000);
            var playerGold = Global.playerProxy.playerData.gold;
            if (playerGold < this.zuidiGold) {
                var text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
                Global.alertMediator.addAlert(text, null, null, true);
                return;
            }
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(this.gameType), sceneId: this.sceneId, diFen: this.data["bet_base"], diZhu: this.data["gold_min"] });
            egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        return SCMJHallBar;
    }(game.BaseUI));
    majiang.SCMJHallBar = SCMJHallBar;
    __reflect(SCMJHallBar.prototype, "majiang.SCMJHallBar");
})(majiang || (majiang = {}));
