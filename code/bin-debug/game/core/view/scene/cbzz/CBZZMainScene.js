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
 * @Date: 2019-05-20 10:59:56
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:20:48
 * @Description:
 */
var cbzz;
(function (cbzz) {
    var CBZZMainScene = (function (_super) {
        __extends(CBZZMainScene, _super);
        function CBZZMainScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "slot";
            _this.gameId = "cbzz";
            _this.closeTipsNotify = PanelNotify.CLOSE_CBZZ_TIPS_PANEL;
            _this.enterFreeNotify = ENo.CBZZ_ENTER_FREE_GAME_SCENE;
            _this.quitFreeNotify = ENo.CBZZ_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.CBZZ_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_CBZZ;
            _this.closeAutNotify = PanelNotify.CLOSE_CBZZ_AUTO_PANEL;
            _this.bgMusic = null;
            _this.skinName = new CBZZMainSceneSkin();
            return _this;
        }
        CBZZMainScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1003;
            this.tofreeAni = DBComponent.create("cb_tofree", "cbzz_tofree_ani");
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        };
        CBZZMainScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_CBZZ);
            CF.sN(PanelNotify.CLOSE_CBZZ_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_CBZZ_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
        };
        // protected parseGame() {
        //     super.parseGame();
        //     Global.pomelo.disConnect();
        // }
        /**
         * 免费游戏入场
         */
        CBZZMainScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            SoundManager.getInstance().playEffect("cbzz_freesel_mp3");
            this.tofreeAni.play("", 1);
            this.tofreeAni.horizontalCenter = 0;
            this.tofreeAni.bottom = -280;
            this.effectGroup.addChild(this.tofreeAni);
            this.tofreeAni.resetPosition();
            this.effectGroup.visible = true;
            egret.setTimeout(function () {
                _this.scene3.visible = true;
                _this.scene1.visible = false;
            }, this, 300);
            this.tofreeAni.callback = function () {
                game.UIUtils.removeSelf(_this.tofreeAni);
                _this.effectGroup.visible = false;
                if (e.data) {
                    var isfast = e.data.isfast;
                    CF.dP(ENo.CBZZ_ENTER_FREE_GAME, { isfast: isfast });
                }
                else {
                    CF.dP(ENo.CBZZ_ENTER_FREE_GAME);
                }
            };
        };
        /**
         * 退出免费游戏
         */
        CBZZMainScene.prototype.quitFreeGame = function () {
            this.scene3.visible = false;
            this.scene1.visible = true;
            CF.dP(ENo.CBZZ_ENTER_COMMOM_GAME);
        };
        /**
         * 直接进入免费游戏
         */
        CBZZMainScene.prototype.startFreeGame = function () {
            // this.scene3.visible = true;
            // this.scene3.bottom = this.scene3.top = 0;
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.CBZZ_START_FREE_GAME);
        };
        return CBZZMainScene;
    }(game.BaseSlotMainScene));
    cbzz.CBZZMainScene = CBZZMainScene;
    __reflect(CBZZMainScene.prototype, "cbzz.CBZZMainScene");
})(cbzz || (cbzz = {}));
