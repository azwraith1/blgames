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
var sangong;
(function (sangong) {
    var SangongHallSceneBar = (function (_super) {
        __extends(SangongHallSceneBar, _super);
        function SangongHallSceneBar() {
            var _this = _super.call(this) || this;
            _this.lock = false;
            return _this;
        }
        SangongHallSceneBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            game.UIUtils.setAnchorPot(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
        };
        SangongHallSceneBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SangongHallSceneBar.prototype.onTouchEnded = function () {
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
            if (playerGold < this.config.gold_min) {
                var text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
                Global.alertMediator.addAlert(text, null, null, true);
                return;
            }
            //横竖
            //	if (game.BaseComponent.oritation == "V") {
            RotationLoadingShu.instance.load(["sangong_game"], "", function () {
                CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10004, sceneId: _this.config.id, diFen: _this.config.bet_base });
            });
            // }
            // else {
            // RotationLoading.instance.load(["sangong_game"], "", () => {
            // 	CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10004, sceneId: this.config.id, diFen: this.config.bet_base });
            // });
            // }
            egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        SangongHallSceneBar.prototype.showBarByConfig = function (config, index) {
            // let mc: DBComponent = GameCacheManager.instance.getCache("sg_xc_" + index);
            // if (!mc) {
            var mc = new DBComponent("sg_xc_" + index);
            GameCacheManager.instance.setCache("sg_xc_" + index, mc);
            // }
            this.effcGroup.addChild(mc);
            if (index == 5) {
                mc.x = mc.width / 2 - 20;
            }
            else if (index == 4) {
                mc.x = mc.width / 2;
            }
            else {
                mc.x = mc.width / 2 - 15;
            }
            mc.y = mc.height / 2 - 10;
            if (index % 2 == 0) {
                mc.y = mc.height / 2 - 13;
            }
            mc.playDefault(-1);
            this.visible = true;
            this.config = config;
            var bet_base = config.bet_base;
            var icon = config.icon;
            var id = config.id;
            var gold_min = config.gold_min;
            this.zhunruLabel.text = "准入:" + gold_min;
            var betStr = bet_base + "";
            switch (index) {
                case 1:
                    this.zhunruLabel.horizontalCenter = -15;
                    this.zhunruLabel.verticalCenter = 120;
                    break;
                case 2:
                    this.zhunruLabel.horizontalCenter = 5;
                    this.zhunruLabel.verticalCenter = 117;
                    break;
                case 3:
                    this.zhunruLabel.horizontalCenter = -13;
                    this.zhunruLabel.verticalCenter = 120;
                    break;
                case 4:
                    this.zhunruLabel.horizontalCenter = 5;
                    this.zhunruLabel.verticalCenter = 120;
                    break;
                case 5:
                    this.zhunruLabel.horizontalCenter = 6;
                    this.zhunruLabel.verticalCenter = 135;
                    break;
            }
        };
        return SangongHallSceneBar;
    }(game.BaseUI));
    sangong.SangongHallSceneBar = SangongHallSceneBar;
    __reflect(SangongHallSceneBar.prototype, "sangong.SangongHallSceneBar");
})(sangong || (sangong = {}));
