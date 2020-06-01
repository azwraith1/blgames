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
 * @Date: 2019-06-12 14:35:44
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:20:28
 * @Description:
 */
var bskg;
(function (bskg) {
    var BSKGMainScene = (function (_super) {
        __extends(BSKGMainScene, _super);
        function BSKGMainScene() {
            var _this = _super.call(this) || this;
            _this.closeTipsNotify = PanelNotify.CLOSE_BSKG_TIPS_PANEL;
            _this.enterFreeNotify = ENo.BSKG_ENTER_FREE_GAME_SCENE;
            _this.quitFreeNotify = ENo.BSKG_QUIT_FREE_GAME;
            _this.startFreeSceneNotify = ENo.BSKG_START_FREE_GAME_SCENE;
            _this.closeSceneNotify = SceneNotify.CLOSE_BSKG;
            _this.closeAutNotify = PanelNotify.CLOSE_BSKG_AUTO_PANEL;
            _this.pmdKey = "slot";
            _this.gameId = "bskg";
            _this.isFastGame = false;
            _this.skinName = "BSKGMainSceneSkin";
            return _this;
        }
        BSKGMainScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initAni();
            game.LaohuUtils.currentSceneId = 1005;
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        };
        /**
         * 初始化过度场景动画
         */
        BSKGMainScene.prototype.initAni = function () {
            this.selectAni = DBComponent.create("bskg_bskg_select_1", "bskg_select_1");
            this.selectAni.horizontalCenter = 30;
            this.selectAni.bottom = 70;
            this.bskgRoleAni5 = DBComponent.create("bskg_bskgRoleAni5", "bskg_roleani5");
        };
        BSKGMainScene.prototype.closeGameCall = function () {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_BSKG);
            CF.sN(PanelNotify.CLOSE_BSKG_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_BSKG_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
        };
        /**
         * 正常游戏流程进入免费游戏选次数场景
         */
        BSKGMainScene.prototype.enterFreeGame = function (e) {
            var _this = this;
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            SoundManager.getInstance().playMusic("bskg_sactbackground_mus_mp3");
            this.scene1.bottomGroup.visible = false;
            this.selectAni.play("", 1);
            this.selectAni.scaleX = this.selectAni.scaleY = 0.8;
            this.scene1.resizeGroup.addChild(this.selectAni);
            this.selectAni.resetPosition();
            this.selectAni.callback = function () {
                game.UIUtils.removeSelf(_this.selectAni);
                _this.scene1.gameGroup.visible = false;
                _this.scene1.selectGroup.visible = true;
                if (game.LaohuUtils.free_time_times != 0) {
                    _this.scene1.freeTimeHandle(game.LaohuUtils.free_time_times);
                }
            };
        };
        /**
         * 选完次数后角色动画开始移动
         */
        BSKGMainScene.prototype.startFreeGame = function () {
            var _this = this;
            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni1);
            egret.Tween.get(this.scene1.bottomGroup).to({ bottom: -220 }, 500);
            game.BSKGUtils.bskgRoleAni4.play("", 1);
            egret.setTimeout(function () {
                SoundManager.getInstance().playEffect("bskg_role_press_mp3");
            }, this, 670);
            this.scene1.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni4);
            game.BSKGUtils.bskgRoleAni4.resetPosition();
            game.BSKGUtils.bskgRoleAni4.callback = function () {
                _this.roleAniGroup.visible = true;
                _this.scene3.freeTimesLabel.text = game.BSKGUtils.freeTimes + "";
                _this.bskgRoleAni5.horizontalCenter = _this.bskgRoleAni5.bottom = 0;
                _this.bskgRoleAni5.play("", 0);
                // SoundManager.getInstance().playEffect("bskg_role_go_mp3");
                // SoundManager.getInstance().playEffect("bskg_role_sing_mp3");
                SoundManager.getInstance().playEffect("bskg_role_travel_mp3");
                _this.roleAniGroup.addChild(_this.bskgRoleAni5);
                _this.bskgRoleAni5.resetPosition();
                game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni4);
                _this.scene2.gouduImag.source = "bskg_guodu_png";
                egret.Tween.get(_this.scene1).to({ left: -1855, right: 1855 }, 3000);
                egret.Tween.get(_this.scene2).to({ left: -575, right: 1280 }, 3000);
                egret.Tween.get(_this.scene3).to({ left: 0, right: 0 }, 3000);
                egret.setTimeout(function () {
                    _this.scene2.left = 1280;
                    _this.scene2.right = -575;
                    _this.scene1.left = 1855;
                    _this.scene1.right = -1855;
                    _this.resizeGroup.addChild(_this.scene1);
                    _this.resizeGroup.addChild(_this.scene2);
                    _this.resizeGroup.addChild(_this.scene3);
                    _this.resizeGroup.addChild(_this.roleAniGroup);
                    _this.resizeGroup.addChild(_this.deskMate);
                    _this.roleAniGroup.visible = false;
                    CF.dP(ENo.BSKG_START_FREE_GAME, { isfast: _this.isFastGame });
                    _this.scene1.box_5.source = "bskg_select4_1_png";
                    _this.scene1.box_10.source = "bskg_select3_1_png";
                    _this.scene1.box_15.source = "bskg_select2_1_png";
                    _this.scene1.box_20.source = "bskg_select1_2_png";
                }, _this, 3000);
            };
        };
        /**
         * 退出免费游戏
         */
        BSKGMainScene.prototype.quitFreeGame = function () {
            var _this = this;
            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni1);
            game.BSKGUtils.bskgRoleAni4.play("", 1);
            this.scene3.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni4);
            this.scene1.selectGroup.visible = false;
            egret.setTimeout(function () {
                SoundManager.getInstance().playEffect("bskg_role_press_mp3");
            }, this, 670);
            game.BSKGUtils.bskgRoleAni4.resetPosition();
            game.BSKGUtils.bskgRoleAni4.callback = function () {
                _this.roleAniGroup.visible = true;
                _this.scene1.scroller.showScatterHideIcon();
                _this.bskgRoleAni5.horizontalCenter = _this.bskgRoleAni5.bottom = 0;
                _this.bskgRoleAni5.play("", 0);
                // SoundManager.getInstance().playEffect("bskg_role_go_mp3");
                // SoundManager.getInstance().playEffect("bskg_role_sing_mp3");
                SoundManager.getInstance().playEffect("bskg_role_travel_mp3");
                _this.roleAniGroup.addChild(_this.bskgRoleAni5);
                _this.bskgRoleAni5.resetPosition();
                game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni4);
                _this.scene1.scroller.visible = _this.scene1.gameGroup.visible = true;
                _this.scene2.gouduImag.source = "bskg_guodu2_png";
                egret.Tween.get(_this.scene1).to({ left: 0, right: 0 }, 3000);
                egret.Tween.get(_this.scene2).to({ left: -575, right: 1280 }, 3000);
                egret.Tween.get(_this.scene3).to({ left: -1855, right: 1855 }, 3000);
                egret.Tween.get(_this.scene1.bottomGroup).to({ bottom: -220 }, 100);
                egret.setTimeout(function () {
                    _this.scene2.left = 1280;
                    _this.scene2.right = -575;
                    _this.scene3.left = 1855;
                    _this.scene3.right = -1855;
                    _this.resizeGroup.addChild(_this.scene3);
                    _this.resizeGroup.addChild(_this.scene2);
                    _this.resizeGroup.addChild(_this.scene1);
                    _this.resizeGroup.addChild(_this.roleAniGroup);
                    _this.resizeGroup.addChild(_this.deskMate);
                    _this.roleAniGroup.visible = false;
                    _this.scene1.isSelected = false;
                    _this.scene3.freeWinGroup.visible = true;
                    _this.scene1.bottomGroup.visible = true;
                    egret.Tween.get(_this.scene1.bottomGroup).to({ bottom: 0 }, 500);
                    CF.dP(ENo.BSKG_ENTER_COMMOM_GAME);
                }, _this, 3000);
            };
        };
        return BSKGMainScene;
    }(game.BaseSlotMainScene));
    bskg.BSKGMainScene = BSKGMainScene;
    __reflect(BSKGMainScene.prototype, "bskg.BSKGMainScene");
})(bskg || (bskg = {}));
