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
var xcbs;
(function (xcbs) {
    var XCBSGameScene = (function (_super) {
        __extends(XCBSGameScene, _super);
        function XCBSGameScene() {
            var _this = _super.call(this) || this;
            _this.gameId = "xcbs";
            _this.closeTipsNotify = PanelNotify.CLOSE_XCBS_TIPS_PANEL;
            _this.enterFreeNotify = ENo.XCBS_ENTER_FREE_GAME;
            _this.quitFreeNotify = ENo.XCBS_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.XCBS_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_XCBS;
            _this.closeAutNotify = PanelNotify.CLOSE_XCBS_AUTO_PANEL;
            _this.pmdKey = "slot";
            _this.skinName = "XCBSMainSceneSkin";
            return _this;
        }
        XCBSGameScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1016;
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
            this.chanegSceneAni = DBComponent.create("xcbs_changesceneani", "rdsg_comm2freeani");
        };
        XCBSGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        XCBSGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        XCBSGameScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_XCBS);
            CF.sN(PanelNotify.CLOSE_XCBS_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_XCBS_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
        };
        XCBSGameScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            this.chanegSceneAni.play("", 1);
            this["free2CommomGroup"].addChild(this.chanegSceneAni);
            this.chanegSceneAni.resetPosition();
            this.scene3.freeWin = game.LaohuUtils.freeWin;
            this.scene3.winNumLabel.text = game.LaohuUtils.freeWin + "";
            egret.setTimeout(function () {
                _this.scene3.visible = true;
                _this.scene1.visible = false;
                if (e.data) {
                    var isfast = e.data.isfast;
                    CF.dP(ENo.XCBS_START_FREE_GAME, { isfast: isfast });
                }
                else {
                    CF.dP(ENo.XCBS_START_FREE_GAME);
                }
            }, this, 500);
        };
        XCBSGameScene.prototype.startFreeGame = function () {
            // this.enterFreeGame();
        };
        XCBSGameScene.prototype.quitFreeGame = function () {
            var _this = this;
            this.chanegSceneAni.play("", 1);
            this["free2CommomGroup"].addChild(this.chanegSceneAni);
            this.chanegSceneAni.resetPosition();
            egret.setTimeout(function () {
                _this.scene1.visible = true;
                _this.scene3.visible = false;
                CF.dP(ENo.XCBS_ENTER_COMMOM_GAME);
            }, this, 500);
        };
        return XCBSGameScene;
    }(game.BaseSlotMainScene));
    xcbs.XCBSGameScene = XCBSGameScene;
    __reflect(XCBSGameScene.prototype, "xcbs.XCBSGameScene");
})(xcbs || (xcbs = {}));
