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
/*
 * @Author: real MC Lee
 * @Date: 2019-05-27 18:44:35
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:20:41
 * @Description:
 */
var sdmn;
(function (sdmn) {
    var SDMNMainScene = (function (_super) {
        __extends(SDMNMainScene, _super);
        function SDMNMainScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "slot";
            _this.gameId = "sdmn";
            _this.closeTipsNotify = PanelNotify.CLOSE_SDMN_TIPS_PANEL;
            _this.enterFreeNotify = ENo.SDMN_ENTER_FREE_GAME_SCENE;
            _this.quitFreeNotify = ENo.SDMN_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.SDMN_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_SDMN;
            _this.closeAutNotify = PanelNotify.CLOSE_SDMN_AUTO_PANEL;
            _this.skinName = "SDMNMainSceneSkin";
            return _this;
        }
        SDMNMainScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1004;
            this.toFreeAni = DBComponent.create("sdmn_toFreeAni", "sdmn_select1");
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        };
        /**
        * 免费游戏入场
        */
        SDMNMainScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            this.scene1.visible = false;
            this.toFreeAni.horizontalCenter = 8;
            this.toFreeAni.bottom = 8;
            this.toFreeAni.play("", 1);
            this.resizeGroup.addChild(this.toFreeAni);
            this.toFreeAni.resetPosition();
            this.toFreeAni.callback = function () {
                game.UIUtils.removeSelf(_this.toFreeAni);
                _this.scene3.visible = true;
                if (e.data) {
                    var isfast = e.data.isfast;
                    CF.dP(ENo.SDMN_ENTER_FREE_GAME, { isfast: isfast });
                }
                else {
                    CF.dP(ENo.SDMN_ENTER_FREE_GAME);
                }
            };
        };
        // protected parseGame() {
        //     super.parseGame();
        //     Global.pomelo.disConnect();
        // }
        /**
        * 直接进入免费游戏
        */
        SDMNMainScene.prototype.startFreeGame = function () {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.SDMN_START_FREE_GAME);
        };
        /**
         * 退出免费游戏
         */
        SDMNMainScene.prototype.quitFreeGame = function () {
            this.scene3.visible = false;
            this.scene1.visible = true;
            CF.dP(ENo.SDMN_ENTER_COMMOM_GAME);
        };
        SDMNMainScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_SDMN);
            CF.sN(PanelNotify.CLOSE_SDMN_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SDMN_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
        };
        return SDMNMainScene;
    }(game.BaseSlotMainScene));
    sdmn.SDMNMainScene = SDMNMainScene;
    __reflect(SDMNMainScene.prototype, "sdmn.SDMNMainScene");
})(sdmn || (sdmn = {}));
