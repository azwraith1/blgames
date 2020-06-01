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
 * @Author: wangtao
 * @Date: 2019-04-08 12:07:03
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:20:55
 * @Description:
 */
var sdxl;
(function (sdxl) {
    var SDXLGameMain = (function (_super) {
        __extends(SDXLGameMain, _super);
        function SDXLGameMain() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "slot";
            _this.gameId = "sdxl";
            _this.closeTipsNotify = PanelNotify.CLOSE_SDXL_TIPS;
            _this.enterFreeNotify = ENo.SDXL_ENTER_FREE_GAME_SCENE;
            _this.quitFreeNotify = ENo.SDXL_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.SDXL_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_SDXL;
            _this.closeAutNotify = PanelNotify.CLOSE_SDXL_AUTO_PANEL;
            _this.skinName = new SDXLGameMainSkin();
            return _this;
        }
        SDXLGameMain.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1002;
            this.toFreeAni = DBComponent.create("toFreeAni", "sdxl_opensakura");
            game.SDXLUtils.sakura = DBComponent.create("sakura", "sdxl_bigwin_sakura");
            game.SDXLUtils.titleChaneAni = DBComponent.create("titleChaneAni", "sdxl_bigwin_guang");
            this.scene3.anchorOffsetX = this.scene3.width / 2;
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        };
        SDXLGameMain.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_SDXL);
            CF.sN(PanelNotify.CLOSE_SDXL_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SDXL_TIPS);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            CF.sN(PanelNotify.CLOSE_SDXL_AUTO_PANEL);
            SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
        };
        // protected parseGame() {
        // 	super.parseGame();
        // 	Global.pomelo.disConnect();
        // }
        /**
         * 播放免费游戏动画，开始免费游戏
         */
        SDXLGameMain.prototype.enterFreeGame = function (e) {
            var _this = this;
            this.scene1.quitBtn.touchEnabled = false;
            SoundManager.getInstance().playEffect("sdxl_scatin_dntg_mp3");
            this.toFreeAni.bottom = 325;
            this.toFreeAni.horizontalCenter = 0;
            this.toFreeAni.play("", 1);
            this.scene3.visible = true;
            this.resizeGroup.addChild(this.toFreeAni);
            this.toFreeAni.resetPosition();
            egret.Tween.get(this.scene3).to({ bottom: 0, top: 0 }, 1300);
            this.toFreeAni.callback = function () {
                SoundManager.getInstance().playMusic("sdxl_sactbackground_mus_dntg_mp3");
                if (e.data) {
                    var isfast = e.data.isfast;
                    CF.dP(ENo.SDXL_ENTER_FREE_GAME, { isfast: isfast });
                }
                else {
                    CF.dP(ENo.SDXL_ENTER_FREE_GAME);
                }
                game.UIUtils.removeSelf(_this.toFreeAni);
            };
        };
        /**
         * 退出神雕侠侣游戏
         */
        SDXLGameMain.prototype.quitFreeGame = function () {
            this.scene3.visible = false;
            this.scene3.bottom = -720;
            this.scene3.top = 720;
            CF.dP(ENo.SDXL_ENTER_COMMON_GAME);
        };
        /**
         * 直接进入免费游戏
         */
        SDXLGameMain.prototype.startFreeGame = function () {
            this.scene3.visible = true;
            this.scene3.bottom = this.scene3.top = 0;
            CF.dP(ENo.SDXL_START_FREE_GAME);
        };
        return SDXLGameMain;
    }(game.BaseSlotMainScene));
    sdxl.SDXLGameMain = SDXLGameMain;
    __reflect(SDXLGameMain.prototype, "sdxl.SDXLGameMain");
})(sdxl || (sdxl = {}));
