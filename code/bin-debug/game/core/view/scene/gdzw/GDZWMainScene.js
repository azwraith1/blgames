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
var gdzw;
(function (gdzw) {
    var GDZWMainScene = (function (_super) {
        __extends(GDZWMainScene, _super);
        function GDZWMainScene() {
            var _this = _super.call(this) || this;
            _this.gameId = "gdzw";
            _this.closeTipsNotify = PanelNotify.CLOSE_GDZW_TIPS_PANEL;
            _this.enterFreeNotify = ENo.GDZW_ENTER_FREE_GAME;
            _this.quitFreeNotify = ENo.GDZW_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.GDZW_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_GDZW;
            _this.closeAutNotify = PanelNotify.CLOSE_GDZW_AUTO_PANEL;
            _this.pmdKey = "slot";
            _this.skinName = "GDZWMainSceneSkin";
            return _this;
        }
        GDZWMainScene.prototype.createChildren = function () {
            game.LaohuUtils.currentSceneId = 1008;
            _super.prototype.createChildren.call(this);
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);
        };
        GDZWMainScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_GDZW);
            CF.sN(PanelNotify.CLOSE_GDZW_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_GDZW_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("gdzw_reel_mp3");
        };
        /**
         * 进入免费游戏
         */
        GDZWMainScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            this.scene3.isReconnect = false;
            this.scatterAni();
            egret.setTimeout(function () {
                _this.scene3.visible = true;
                _this.scene1.visible = false;
                if (e.data) {
                    var isfast = e.data.isfast;
                    CF.dP(ENo.GDZW_START_FREE_GAME, { isfast: isfast });
                }
                else {
                    CF.dP(ENo.GDZW_START_FREE_GAME);
                }
            }, this, 6200 + this.scene1.yudiAtr2.length * 800);
        };
        /**
         * 免费游戏特效
         */
        GDZWMainScene.prototype.scatterAni = function () {
            var _this = this;
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playMusic("gdzw_scatmusic1_mp3");
            this.scatterGroup.visible = true;
            var arr = [];
            for (var i = 0; i < this.scene1.yudiAtr2.length; i++) {
                this.scene1.scroller.addFoGuang(this.scene1.yudiAtr2[i], this.scene1.yudiAtr[i], "gdzw_icon_2");
                var icon = new gdzw.GDZWCardItem();
                this.scatterGroup.addChild(icon);
                arr.push(icon);
                icon.x = (this.scene1.yudiAtr2[i] - 1) * 158;
                icon.y = 189 * this.scene1.yudiAtr[i] + 2;
            }
            SoundManager.getInstance().playEffect("gdzw_scat_move_mp3");
            egret.setTimeout(function () {
                _this.toFreeAni = DBComponent.create("gdzw_gdzw_free", "gdzw_free");
                _this.toFreeAni.play("gdzw_free_start", 1);
                _this.toFreeAni.horizontalCenter = 0;
                _this.toFreeAni.bottom = -450;
                _this.scene1.scaAniGroup.addChild(_this.toFreeAni);
                _this.toFreeAni.resetPosition();
                _this.toFreeAni.callback = function () {
                    _this.toFreeAni.play("gdzw_free_common", 0);
                };
                for (var i = 0; i < arr.length; i++) {
                    arr[i].removeCardAni();
                }
                var scatterInterval = egret.setInterval(function () {
                    if (j >= _this.scene1.yudiAtr2.length) {
                        SoundManager.getInstance().playEffect("gdzw_scat_mp3");
                        egret.clearInterval(scatterInterval);
                        var scatterAni = new DBComponent("gdzw_icon_2");
                        scatterAni.play("", 1);
                        scatterAni.horizontalCenter = 3;
                        scatterAni.bottom = -17;
                        _this.scatterGroup.addChild(scatterAni);
                        scatterAni.resetPosition();
                        scatterAni.callback = function () {
                            _this.scatterGroup.removeChildren();
                            _this.scatterGroup.visible = false;
                            _this.toFreeAni.play("gdzw_free", 1);
                            SoundManager.getInstance().playEffect("gdzw_light_mp3");
                            egret.setTimeout(function () {
                                game.UIUtils.removeSelf(_this.toFreeAni);
                                SoundManager.getInstance().stopEffectByName("gdzw_scat_move_mp3");
                            }, _this, 1170);
                        };
                        return;
                    }
                    scattermove = arr[j];
                    _this.scatterGroup.addChild(scattermove);
                    egret.Tween.get(scattermove).to({ x: 318, y: 398 }, 800, egret.Ease.circOut);
                    j++;
                }, _this, 800);
            }, this, 2000);
            var j = 0;
            var scattermove;
        };
        GDZWMainScene.prototype.startFreeGame = function () {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.GDZW_START_FREE_GAME);
        };
        /**
         * 退出免费游戏
         */
        GDZWMainScene.prototype.quitFreeGame = function () {
            this.scene1.visible = true;
            this.scene3.visible = false;
            this.scene1.scroller.showScatterHideIcon();
            CF.dP(ENo.GDZW_ENTER_COMMOM_GAME);
        };
        return GDZWMainScene;
    }(game.BaseSlotMainScene));
    gdzw.GDZWMainScene = GDZWMainScene;
    __reflect(GDZWMainScene.prototype, "gdzw.GDZWMainScene");
})(gdzw || (gdzw = {}));
