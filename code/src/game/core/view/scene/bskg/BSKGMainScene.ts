/*
 * @Author: real MC Lee 
 * @Date: 2019-06-12 14:35:44 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:20:28
 * @Description: 
 */
module bskg {
    export class BSKGMainScene extends game.BaseSlotMainScene {
        public resizeGroup: eui.Group;
        public scene1: bskg.BSKGScene1;
        public scene2: bskg.BSKGScene2;
        public scene3: bskg.BSKGScene3;
        public roleAniGroup: eui.Group;
        public closeTipsNotify = PanelNotify.CLOSE_BSKG_TIPS_PANEL;
        public enterFreeNotify = ENo.BSKG_ENTER_FREE_GAME_SCENE;
        public quitFreeNotify = ENo.BSKG_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.BSKG_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_BSKG;
        public closeAutNotify = PanelNotify.CLOSE_BSKG_AUTO_PANEL;
        public pmdKey = "slot";
        public gameId = "bskg";

        public selectAni: DBComponent;//选择免费次数框动画;
        public bskgRoleAni5: DBComponent;//哥布林前进动画

        public constructor() {
            super();
            this.skinName = "BSKGMainSceneSkin";
        }

        public createChildren() {
            super.createChildren();
            this.initAni();
            game.LaohuUtils.currentSceneId = 1005;

            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        }

        /**
         * 初始化过度场景动画
         */
        protected initAni() {
            this.selectAni = DBComponent.create("bskg_bskg_select_1", "bskg_select_1");
            this.selectAni.horizontalCenter = 30; this.selectAni.bottom = 70;
            this.bskgRoleAni5 = DBComponent.create("bskg_bskgRoleAni5", "bskg_roleani5");
        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_BSKG);
            CF.sN(PanelNotify.CLOSE_BSKG_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_BSKG_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
        }

        public isFastGame: boolean = false;

        /**
         * 正常游戏流程进入免费游戏选次数场景
         */
        public enterFreeGame(e: egret.Event) {
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            SoundManager.getInstance().playMusic("bskg_sactbackground_mus_mp3");
            this.scene1.bottomGroup.visible = false;
            this.selectAni.play("", 1);
            this.selectAni.scaleX = this.selectAni.scaleY = 0.8;
            this.scene1.resizeGroup.addChild(this.selectAni);
            this.selectAni.resetPosition();
            this.selectAni.callback = () => {
                game.UIUtils.removeSelf(this.selectAni);
                this.scene1.gameGroup.visible = false;
                this.scene1.selectGroup.visible = true;
                if (game.LaohuUtils.free_time_times != 0) {
                    this.scene1.freeTimeHandle(game.LaohuUtils.free_time_times);
                }
            }
        }
        /**
         * 选完次数后角色动画开始移动
         */
        public startFreeGame() {
            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni1);
            egret.Tween.get(this.scene1.bottomGroup).to({ bottom: -220 }, 500);
            game.BSKGUtils.bskgRoleAni4.play("", 1);
            egret.setTimeout(() => {
                SoundManager.getInstance().playEffect("bskg_role_press_mp3");
            }, this, 670)
            this.scene1.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni4);
            game.BSKGUtils.bskgRoleAni4.resetPosition();
            game.BSKGUtils.bskgRoleAni4.callback = () => {
                this.roleAniGroup.visible = true;
                this.scene3.freeTimesLabel.text = game.BSKGUtils.freeTimes + "";
                this.bskgRoleAni5.horizontalCenter = this.bskgRoleAni5.bottom = 0;
                this.bskgRoleAni5.play("", 0);
                // SoundManager.getInstance().playEffect("bskg_role_go_mp3");
                // SoundManager.getInstance().playEffect("bskg_role_sing_mp3");
                SoundManager.getInstance().playEffect("bskg_role_travel_mp3");
                this.roleAniGroup.addChild(this.bskgRoleAni5);
                this.bskgRoleAni5.resetPosition();
                game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni4);
                this.scene2.gouduImag.source = "bskg_guodu_png";
                egret.Tween.get(this.scene1).to({ left: -1855, right: 1855 }, 3000)
                egret.Tween.get(this.scene2).to({ left: -575, right: 1280 }, 3000)
                egret.Tween.get(this.scene3).to({ left: 0, right: 0 }, 3000);
                egret.setTimeout(() => {
                    this.scene2.left = 1280;
                    this.scene2.right = -575;
                    this.scene1.left = 1855;
                    this.scene1.right = -1855;
                    this.resizeGroup.addChild(this.scene1);
                    this.resizeGroup.addChild(this.scene2);
                    this.resizeGroup.addChild(this.scene3);
                    this.resizeGroup.addChild(this.roleAniGroup);
                    this.resizeGroup.addChild(this.deskMate);
                    this.roleAniGroup.visible = false;
                    CF.dP(ENo.BSKG_START_FREE_GAME, { isfast: this.isFastGame });
                    this.scene1.box_5.source = "bskg_select4_1_png";
                    this.scene1.box_10.source = "bskg_select3_1_png";
                    this.scene1.box_15.source = "bskg_select2_1_png";
                    this.scene1.box_20.source = "bskg_select1_2_png";
                }, this, 3000)
            }

        }
        /**
         * 退出免费游戏
         */
        public quitFreeGame() {
            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni1);
            game.BSKGUtils.bskgRoleAni4.play("", 1);
            this.scene3.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni4);
            this.scene1.selectGroup.visible = false;
            egret.setTimeout(() => {
                SoundManager.getInstance().playEffect("bskg_role_press_mp3");
            }, this, 670)
            game.BSKGUtils.bskgRoleAni4.resetPosition();
            game.BSKGUtils.bskgRoleAni4.callback = () => {
                this.roleAniGroup.visible = true;
                this.scene1.scroller.showScatterHideIcon();
                this.bskgRoleAni5.horizontalCenter = this.bskgRoleAni5.bottom = 0;
                this.bskgRoleAni5.play("", 0);
                // SoundManager.getInstance().playEffect("bskg_role_go_mp3");
                // SoundManager.getInstance().playEffect("bskg_role_sing_mp3");
                SoundManager.getInstance().playEffect("bskg_role_travel_mp3");
                this.roleAniGroup.addChild(this.bskgRoleAni5);
                this.bskgRoleAni5.resetPosition();
                game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni4);
                this.scene1.scroller.visible = this.scene1.gameGroup.visible = true;
                this.scene2.gouduImag.source = "bskg_guodu2_png";
                egret.Tween.get(this.scene1).to({ left: 0, right: 0 }, 3000)
                egret.Tween.get(this.scene2).to({ left: -575, right: 1280 }, 3000)
                egret.Tween.get(this.scene3).to({ left: -1855, right: 1855 }, 3000);
                egret.Tween.get(this.scene1.bottomGroup).to({ bottom: -220 }, 100);
                egret.setTimeout(() => {
                    this.scene2.left = 1280;
                    this.scene2.right = -575;
                    this.scene3.left = 1855;
                    this.scene3.right = -1855;
                    this.resizeGroup.addChild(this.scene3);
                    this.resizeGroup.addChild(this.scene2);
                    this.resizeGroup.addChild(this.scene1);
                    this.resizeGroup.addChild(this.roleAniGroup);
                    this.resizeGroup.addChild(this.deskMate);
                    this.roleAniGroup.visible = false;
                    this.scene1.isSelected = false;
                    this.scene3.freeWinGroup.visible = true;
                    this.scene1.bottomGroup.visible = true;
                    egret.Tween.get(this.scene1.bottomGroup).to({ bottom: 0 }, 500);
                    CF.dP(ENo.BSKG_ENTER_COMMOM_GAME);
                }, this, 3000);
            }
        }
    }
}