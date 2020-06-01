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
// TypeScript file SGWSMainSceneSkin
var sgws;
(function (sgws) {
    var SGWSGameScene = (function (_super) {
        __extends(SGWSGameScene, _super);
        function SGWSGameScene() {
            var _this = _super.call(this) || this;
            _this.gameId = "sgws";
            _this.closeTipsNotify = PanelNotify.CLOSE_SGWS_TIPS_PANEL;
            _this.enterFreeNotify = ENo.SGWS_ENTER_FREE_GAME;
            _this.quitFreeNotify = ENo.SGWS_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.SGWS_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_SGWS;
            _this.closeAutNotify = PanelNotify.CLOSE_SGWS_AUTO_PANEL;
            _this.pmdKey = "slot";
            _this.skinName = "SGWSMainSceneSkin";
            return _this;
        }
        SGWSGameScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1017;
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
            this.chanegSceneAni = DBComponent.create("xcbs_changesceneani", "rdsg_comm2freeani");
        };
        SGWSGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        SGWSGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        SGWSGameScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_SGWS);
            CF.sN(PanelNotify.CLOSE_SGWS_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SGWS_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
        };
        SGWSGameScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            // this.chanegSceneAni.play("", 1);
            // this[`free2CommomGroup`].addChild(this.chanegSceneAni);
            // this.chanegSceneAni.resetPosition();
            this.scene3.freeWin = game.LaohuUtils.freeWin;
            this.scene3.winNumLabel.text = game.LaohuUtils.freeWin + "";
            egret.setTimeout(function () {
                _this.scene3.visible = true;
                _this.scene1.visible = false;
                if (e.data) {
                    var isfast = e.data.isfast;
                    CF.dP(ENo.SGWS_START_FREE_GAME, { isfast: isfast });
                }
                else {
                    CF.dP(ENo.SGWS_START_FREE_GAME);
                }
            }, this, 500);
        };
        SGWSGameScene.prototype.startFreeGame = function () {
            // this.enterFreeGame();
        };
        SGWSGameScene.prototype.quitFreeGame = function () {
            var _this = this;
            // this.chanegSceneAni.play("", 1);
            // this[`free2CommomGroup`].addChild(this.chanegSceneAni);
            // this.chanegSceneAni.resetPosition();
            egret.setTimeout(function () {
                _this.scene1.visible = true;
                _this.scene3.visible = false;
                CF.dP(ENo.SGWS_ENTER_COMMOM_GAME);
            }, this, 500);
        };
        return SGWSGameScene;
    }(game.BaseSlotMainScene));
    sgws.SGWSGameScene = SGWSGameScene;
    __reflect(SGWSGameScene.prototype, "sgws.SGWSGameScene");
})(sgws || (sgws = {}));
