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
var ayls;
(function (ayls) {
    var AYLSMainScene = (function (_super) {
        __extends(AYLSMainScene, _super);
        function AYLSMainScene() {
            var _this = _super.call(this) || this;
            _this.gameId = "ayls";
            _this.closeTipsNotify = PanelNotify.CLOSE_AYLS_TIPS_PANEL;
            _this.enterFreeNotify = ENo.AYLS_ENTER_FREE_GAME;
            _this.quitFreeNotify = ENo.AYLS_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.AYLS_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_AYLS;
            _this.closeAutNotify = PanelNotify.CLOSE_AYLS_AUTO_PANEL;
            _this.pmdKey = "slot";
            _this.skinName = "AYLSMainSceneSkin";
            return _this;
        }
        AYLSMainScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1007;
            this.toFreeAni = DBComponent.create("ayls_2freeani", "ayls_freeani");
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);
        };
        AYLSMainScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_AYLS);
            CF.sN(PanelNotify.CLOSE_AYLS_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_AYLS_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("ayls_reel_mp3");
        };
        /**
         * 进入免费游戏
         */
        AYLSMainScene.prototype.enterFreeGame = function (e) {
            this.toFreeAni.play("", 1);
            this.toFreeAni.horizontalCenter = 0;
            this.toFreeAni.bottom = -230;
            this.resizeGroup.addChild(this.toFreeAni);
            SoundManager.getInstance().playEffect("ayls_thunder_mp3");
            this.toFreeAni.resetPosition();
            this.scene3.visible = true;
            this.scene1.visible = false;
            if (e.data) {
                var isfast = e.data.isfast;
                CF.dP(ENo.AYLS_START_FREE_GAME, { isfast: isfast });
            }
            else {
                CF.dP(ENo.AYLS_START_FREE_GAME);
            }
        };
        AYLSMainScene.prototype.startFreeGame = function () {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.AYLS_START_FREE_GAME);
        };
        /**
         * 退出免费游戏
         */
        AYLSMainScene.prototype.quitFreeGame = function () {
            this.scene1.visible = true;
            this.scene3.visible = false;
            CF.dP(ENo.AYLS_ENTER_COMMOM_GAME);
        };
        return AYLSMainScene;
    }(game.BaseSlotMainScene));
    ayls.AYLSMainScene = AYLSMainScene;
    __reflect(AYLSMainScene.prototype, "ayls.AYLSMainScene");
})(ayls || (ayls = {}));
