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
 * @Date: 2019-07-08 18:11:54
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-31 15:11:51
 * @Description:
 */
var rdsg;
(function (rdsg) {
    var RDSGMainScene = (function (_super) {
        __extends(RDSGMainScene, _super);
        function RDSGMainScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "slot";
            _this.gameId = "rdsg";
            _this.closeTipsNotify = PanelNotify.CLOSE_RDSG_TIPS_PANEL;
            _this.enterFreeNotify = ENo.RDSG_ENTER_FREE_GAME;
            _this.quitFreeNotify = ENo.RDSG_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.RDSG_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_RDSG;
            _this.closeAutNotify = PanelNotify.CLOSE_RDSG_AUTO_PANEL;
            _this.skinName = "RDSGMainSceneSkin";
            return _this;
        }
        RDSGMainScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1006;
            this.free2commAni = DBComponent.create("rdsg_free2commAni", "rdsg_comm2freeani");
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);
        };
        RDSGMainScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_RDSG);
            CF.sN(PanelNotify.CLOSE_RDSG_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_RDSG_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
            SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
        };
        /**
         * 进入免费游戏
         */
        RDSGMainScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            this.comm2freeGroup.visible = true;
            egret.Tween.get(this.toFreeGroup).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
            SoundManager.getInstance().playMusic("rdsg_intofree_mp3");
            this.freeTiemsImag.source = "rdsg_freespin_" + game.LaohuUtils.freeTimes + "_png";
            egret.setTimeout(function () {
                _this.free2commAni.play("", 1);
                _this.resizeGroup.addChild(_this.free2commAni);
                _this.free2commAni.resetPosition();
            }, this, 6200);
            egret.setTimeout(function () {
                _this.scene3.visible = true;
                _this.scene1.visible = false;
                _this.comm2freeGroup.visible = false;
                // game.UIUtils.removeSelf(this.bgAni);
                if (e.data) {
                    var isfast = e.data.isfast;
                    CF.dP(ENo.RDSG_START_FREE_GAME, { isfast: isfast });
                }
                else {
                    CF.dP(ENo.RDSG_START_FREE_GAME);
                }
            }, this, 7000);
        };
        RDSGMainScene.prototype.startFreeGame = function () {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.RDSG_START_FREE_GAME);
        };
        /**
         * 退出免费游戏
         */
        RDSGMainScene.prototype.quitFreeGame = function () {
            this.scene1.visible = true;
            this.scene3.visible = false;
            CF.dP(ENo.RDSG_ENTER_COMMOM_GAME);
        };
        return RDSGMainScene;
    }(game.BaseSlotMainScene));
    rdsg.RDSGMainScene = RDSGMainScene;
    __reflect(RDSGMainScene.prototype, "rdsg.RDSGMainScene");
})(rdsg || (rdsg = {}));
