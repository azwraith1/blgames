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
var niuniu;
(function (niuniu) {
    var NiuNiuHallSceneBar = (function (_super) {
        __extends(NiuNiuHallSceneBar, _super);
        function NiuNiuHallSceneBar() {
            var _this = _super.call(this) || this;
            _this.lock = false;
            return _this;
        }
        NiuNiuHallSceneBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            game.UIUtils.setAnchorPot(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
        };
        NiuNiuHallSceneBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.zhunruLabel.text = "";
        };
        NiuNiuHallSceneBar.prototype.onTouchEnded = function () {
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
            RotationLoadingShu.instance.load(["niuniu_game"], "", function () {
                CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10003, sceneId: _this.config.id, diFen: _this.config.bet_base });
            });
            egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        NiuNiuHallSceneBar.prototype.showBarByConfig = function (config, index, color) {
            var _this = this;
            // let mc: DBComponent = GameCacheManager.instance.getCache("niuniu_xc" + index);
            // if (!mc) {
            var mc = new DBComponent("niuniu_xc" + index);
            GameCacheManager.instance.setCache("niuniu_xc" + index, mc);
            // }
            this.effcGroup.addChild(mc);
            mc.x = mc.width / 2;
            mc.y = mc.height / 2 + 55;
            mc.playDefault(-1);
            this.visible = true;
            this.config = config;
            var id = config.id;
            var gold_min = config.gold_min;
            egret.setTimeout(function () {
                switch (index) {
                    case 1:
                        _this.zhunruLabel.y = 225;
                        break;
                    case 2:
                        _this.zhunruLabel.y = 225;
                        break;
                    case 3:
                        _this.zhunruLabel.y = 225;
                        break;
                    case 4:
                        _this.zhunruLabel.y = 225;
                        break;
                    case 5:
                        _this.zhunruLabel.y = 240;
                        break;
                    case 6:
                        _this.zhunruLabel.y = 228;
                        break;
                }
                _this.zhunruLabel.text = "准入:" + gold_min;
            }, this, 500);
            this.zhunruLabel.textColor = color;
        };
        return NiuNiuHallSceneBar;
    }(game.BaseUI));
    niuniu.NiuNiuHallSceneBar = NiuNiuHallSceneBar;
    __reflect(NiuNiuHallSceneBar.prototype, "niuniu.NiuNiuHallSceneBar");
})(niuniu || (niuniu = {}));
