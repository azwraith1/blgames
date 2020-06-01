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
var ceby;
(function (ceby) {
    var CEBYMainScene = (function (_super) {
        __extends(CEBYMainScene, _super);
        function CEBYMainScene() {
            var _this = _super.call(this) || this;
            _this.gameId = "ceby";
            _this.closeTipsNotify = PanelNotify.CLOSE_CEBY_TIPS_PANEL;
            _this.enterFreeNotify = ENo.CEBY_ENTER_FREE_GAME;
            _this.quitFreeNotify = ENo.CEBY_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.CEBY_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_CEBY;
            _this.closeAutNotify = PanelNotify.CLOSE_CEBY_AUTO_PANEL;
            _this.pmdKey = "slot";
            _this.skinName = "CEBYMainSceneSkin";
            return _this;
        }
        CEBYMainScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.currentSceneId = 1010;
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);
        };
        CEBYMainScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_CEBY);
            CF.sN(PanelNotify.CLOSE_CEBY_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_CEBY_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("ceby_reel_mp3");
        };
        /**
         * 进入免费游戏
         */
        CEBYMainScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            this.enterFreeTimeOut = egret.setTimeout(function () {
                _this.scene3.visible = true;
                SoundManager.getInstance().playEffect("ceby_roll_mp3");
                _this.scene3.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                egret.Tween.get(_this.scene2).to({ bottom: -274, top: 720 }, 2000, egret.Ease.sineIn);
                egret.Tween.get(_this.scene1).to({ bottom: -994, top: 994 }, 2000, egret.Ease.sineIn);
                egret.Tween.get(_this.scene3).to({ bottom: 0, top: 0 }, 2000, egret.Ease.sineIn).call(function () {
                    if (e.data) {
                        var isfast = e.data.isfast;
                        CF.dP(ENo.CEBY_START_FREE_GAME, { isfast: isfast });
                    }
                    else {
                        CF.dP(ENo.CEBY_START_FREE_GAME);
                    }
                    _this.scene1.visible = false;
                    _this.scene1.freeLeftGroup.visible = false;
                    _this.scene1.getFreeGroup.visible = false;
                    _this.scene1.changeAni.horizontalCenter = 1000;
                });
            }, this, 1000);
        };
        /**
         * 免费游戏特效
         */
        CEBYMainScene.prototype.scatterAni = function () {
        };
        CEBYMainScene.prototype.startFreeGame = function () {
            var _this = this;
            this.scene3.visible = true;
            this.scene1.quitBtn.touchEnabled = false;
            SoundManager.getInstance().playEffect("ceby_roll_mp3");
            egret.Tween.get(this.scene2).to({ bottom: -274, top: 720 }, 2000, egret.Ease.sineIn);
            egret.Tween.get(this.scene1).to({ bottom: -994, top: 994 }, 2000, egret.Ease.sineIn);
            this.scene3.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
            egret.Tween.get(this.scene3).to({ bottom: 0, top: 0 }, 2000, egret.Ease.sineIn).call(function () {
                CF.dP(ENo.CEBY_START_FREE_GAME);
                _this.scene1.visible = false;
                _this.scene1.freeLeftGroup.visible = false;
                _this.scene1.getFreeGroup.visible = false;
                _this.scene1.changeAni.horizontalCenter = 1000;
            });
        };
        /**
         * 退出免费游戏
         */
        CEBYMainScene.prototype.quitFreeGame = function () {
            var _this = this;
            this.scene1.visible = true;
            egret.Tween.get(this.scene2).to({ bottom: 720, top: -274 }, 2000, egret.Ease.sineIn);
            egret.Tween.get(this.scene1).to({ bottom: 0, top: 0 }, 2000, egret.Ease.sineIn);
            egret.Tween.get(this.scene3).to({ bottom: 994, top: -994 }, 2000, egret.Ease.sineIn).call(function () {
                _this.scene3.visible = false;
                CF.dP(ENo.CEBY_ENTER_COMMOM_GAME);
            });
        };
        return CEBYMainScene;
    }(game.BaseSlotMainScene));
    ceby.CEBYMainScene = CEBYMainScene;
    __reflect(CEBYMainScene.prototype, "ceby.CEBYMainScene");
})(ceby || (ceby = {}));
