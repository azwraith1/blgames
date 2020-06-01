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
 * @Date: 2019-03-27 14:23:49
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:21:03
 * @Description:
 */
var dntg;
(function (dntg) {
    var DNTGMainScene = (function (_super) {
        __extends(DNTGMainScene, _super);
        function DNTGMainScene() {
            var _this = _super.call(this) || this;
            _this.closeTipsNotify = PanelNotify.CLOSE_LAOHUGAME_TIPS;
            _this.enterFreeNotify = ENo.DNTG_ENTER_FREE_GAME;
            _this.quitFreeNotify = ENo.DNTG_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.DNTG_START_FREE_GAME;
            _this.closeSceneNotify = SceneNotify.CLOSE_DNTG;
            _this.closeAutNotify = PanelNotify.CLOSE_LAOHU_AUTO_PANEL;
            _this.gameId = "dntg";
            _this.pmdKey = "slot";
            _this.isInScatter = false;
            _this.skinName = new DNTGMainSceneSkin();
            return _this;
        }
        DNTGMainScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1001;
            game.UIUtils.removeButtonScaleEffects(this);
            this.scene2.visible = this.scene3.visible = false;
            game.LaohuUtils.currentSceneId = 1001;
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        };
        DNTGMainScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_DNTG);
            CF.sN(PanelNotify.CLOSE_LAOHU_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_LAOHUGAME_TIPS);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
            SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
        };
        /**
         * 进入免费游戏场景
         */
        DNTGMainScene.prototype.enterFreeGame = function (e) {
            // if(!this.scene2.parent){
            // 	this.resizeGroup.addChild(this.scene2)
            // 	// this.scene2.listenOn();
            // }
            // if(!this.scene3.parent){
            // 	this.resizeGroup.addChild(this.scene3)
            // 	this.scene3.listenOn();
            var _this = this;
            // }
            if (e.data) {
                var isfast = e.data.isfast;
                CF.dP(ENo.DNTG_ENTER_FREE_GAME_SCENE, { isfast: isfast });
            }
            else {
                CF.dP(ENo.DNTG_ENTER_FREE_GAME_SCENE);
            }
            this.scene2.visible = this.scene3.visible = true;
            this.scene1.isInScatter = true;
            egret.Tween.get(this).to({ y: 1440 }, 1200).call(function () {
                _this.scene1.visible = false;
                _this.deskMate.verticalCenter -= 1440;
            });
        };
        // protected parseGame(){
        // 	super.parseGame();
        // 	Global.pomelo.disConnect();
        // }
        /**
         * 继续免费游戏
         */
        DNTGMainScene.prototype.startFreeGame = function () {
            // if(!this.scene2.parent){
            // 	this.resizeGroup.addChild(this.scene2)
            // 	// this.scene2.onAdded();
            // }
            // if(!this.scene3.parent){
            // 	this.resizeGroup.addChild(this.scene3)
            // 	this.scene3.listenOn();
            var _this = this;
            // }
            this.scene2.visible = this.scene3.visible = true;
            this.scene1.visible = false;
            this.scene1.isInScatter = true;
            egret.Tween.get(this).to({ y: 1440 }, 1200).call(function () {
                _this.deskMate.verticalCenter -= 1440;
            });
            CF.dP(ENo.DNTG_START_FREE_GAME_SCENE);
        };
        /**
         * 退出dntg
         */
        DNTGMainScene.prototype.quitFreeGame = function () {
            var _this = this;
            this.scene1.isInScatter = false;
            this.scene1.visible = true;
            egret.Tween.get(this).to({ y: 0 }, 800).call(function () {
                _this.deskMate.verticalCenter = -50;
                _this.scene2.visible = _this.scene3.visible = false;
            });
            this.scene1.runningType = 3;
            CF.dP(ENo.DNTG_ENTER_COMMON_GAME);
        };
        return DNTGMainScene;
    }(game.BaseSlotMainScene));
    dntg.DNTGMainScene = DNTGMainScene;
    __reflect(DNTGMainScene.prototype, "dntg.DNTGMainScene");
})(dntg || (dntg = {}));
