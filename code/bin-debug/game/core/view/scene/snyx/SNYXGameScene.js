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
var snyx;
(function (snyx) {
    var SNYXGameScene = (function (_super) {
        __extends(SNYXGameScene, _super);
        function SNYXGameScene() {
            var _this = _super.call(this) || this;
            _this.gameId = "snyx";
            _this.closeTipsNotify = PanelNotify.CLOSE_SNYX_TIPS_PANEL;
            _this.enterFreeNotify = ENo.SNYX_ENTER_FREE_GAME;
            _this.quitFreeNotify = ENo.SNYX_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.SNYX_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_SNYX;
            _this.closeAutNotify = PanelNotify.CLOSE_SNYX_AUTO_PANEL;
            _this.pmdKey = "slot";
            _this.skinName = new SNYXGameSceneSkin();
            return _this;
        }
        SNYXGameScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scene1 = new snyx.SNYXScene1();
            this.scene3 = new snyx.SNYXScene3();
            this.scene1.left = this.scene1.right = this.scene1.bottom = this.scene1.top = 0;
            this.scene3.left = this.scene3.right = this.scene3.bottom = this.scene3.top = 0;
            this.scene3.visible = false;
            this.resizeGroup.addChild(this.scene3);
            this.resizeGroup.addChild(this.scene1);
            this.resizeGroup.addChild(this["free2comGroup"]);
            this.resizeGroup.addChild(this.deskMate);
            game.LaohuUtils.currentSceneId = 1016;
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        };
        SNYXGameScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_SNYX);
            CF.sN(PanelNotify.CLOSE_SNYX_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SNYX_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
        };
        SNYXGameScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            var isfast = false;
            var atr = [];
            if (e.data) {
                isfast = e.data.isfast;
                atr = e.data.atr;
            }
            this.free2comGroup.visible = true;
            this.freetimeIma.text = game.LaohuUtils.freeTimes + "";
            this.scene3.freeWin = game.LaohuUtils.freeWin;
            this.scene3.freewinLabel.text = game.LaohuUtils.freeWin + "";
            SoundManager.getInstance().playEffect("snyx_freegame_start_mp3");
            egret.Tween.get(this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(function () {
                egret.setTimeout(function () {
                    _this.scene3.visible = true;
                    _this.scene1.visible = false;
                    if (isfast) {
                        if (atr) {
                            CF.dP(ENo.SNYX_START_FREE_GAME, { isfast: isfast, atr: atr });
                        }
                        else {
                            CF.dP(ENo.SNYX_START_FREE_GAME, { isfast: isfast });
                        }
                    }
                    else {
                        if (atr) {
                            CF.dP(ENo.SNYX_START_FREE_GAME, { isfast: isfast, atr: atr });
                        }
                        else {
                            CF.dP(ENo.SNYX_START_FREE_GAME);
                        }
                    }
                    _this.free2comGroup.visible = false;
                    _this.free2commGroup.scaleX = _this.free2commGroup.scaleY = 0;
                }, _this, 3500);
            });
        };
        SNYXGameScene.prototype.startFreeGame = function () {
            // this.enterFreeGame();
        };
        SNYXGameScene.prototype.quitFreeGame = function () {
            var _this = this;
            // this.chanegSceneAni.play("", 1);
            // this[`free2CommomGroup`].addChild(this.chanegSceneAni);
            // this.chanegSceneAni.resetPosition();
            egret.setTimeout(function () {
                _this.scene1.visible = true;
                _this.scene3.visible = false;
                CF.dP(ENo.SNYX_ENTER_COMMOM_GAME);
            }, this, 500);
        };
        return SNYXGameScene;
    }(game.BaseSlotMainScene));
    snyx.SNYXGameScene = SNYXGameScene;
    __reflect(SNYXGameScene.prototype, "snyx.SNYXGameScene");
})(snyx || (snyx = {}));
