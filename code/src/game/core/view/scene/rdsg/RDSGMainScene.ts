/*
 * @Author: real MC Lee 
 * @Date: 2019-07-08 18:11:54 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-31 15:11:51
 * @Description: 
 */
module rdsg {
    export class RDSGMainScene extends game.BaseSlotMainScene {
        public resizeGroup: eui.Group;
        public scene1: rdsg.RDSGScene1;
        public scene3: rdsg.RDSGScene3;
        public comm2freeGroup: eui.Group;
        public free2commAni: DBComponent;
        public freeTiemsImag: eui.Image;
        // public bgAni: DBComponent;
        public freeTiemsImag2: eui.Image;
        public effectGroup: eui.Group;
        public toFreeGroup: eui.Group;
        public pmdKey = "slot";
        public gameId = "rdsg";
        public closeTipsNotify = PanelNotify.CLOSE_RDSG_TIPS_PANEL;
        public enterFreeNotify = ENo.RDSG_ENTER_FREE_GAME;
        public quitFreeNotify = ENo.RDSG_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.RDSG_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_RDSG;
        public closeAutNotify = PanelNotify.CLOSE_RDSG_AUTO_PANEL;

        public constructor() {
            super();
            this.skinName = "RDSGMainSceneSkin";
        }

        public createChildren() {
            super.createChildren();
            game.LaohuUtils.currentSceneId = 1006;
            this.free2commAni = DBComponent.create("rdsg_free2commAni", "rdsg_comm2freeani");
            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);
        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_RDSG);
            CF.sN(PanelNotify.CLOSE_RDSG_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_RDSG_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
            SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
        }

        /**
         * 进入免费游戏
         */
        public enterFreeGame(e: egret.Event) {
            this.comm2freeGroup.visible = true;
            egret.Tween.get(this.toFreeGroup).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
            SoundManager.getInstance().playMusic("rdsg_intofree_mp3");
            this.freeTiemsImag.source = "rdsg_freespin_" + game.LaohuUtils.freeTimes + "_png";
            egret.setTimeout(() => {
                this.free2commAni.play("", 1);
                this.resizeGroup.addChild(this.free2commAni);
                this.free2commAni.resetPosition();
            }, this, 6200)
            egret.setTimeout(() => {
                this.scene3.visible = true;
                this.scene1.visible = false;
                this.comm2freeGroup.visible = false;
                // game.UIUtils.removeSelf(this.bgAni);
                if (e.data) {
                    let isfast = e.data.isfast;
                    CF.dP(ENo.RDSG_START_FREE_GAME, { isfast: isfast });
                } else {
                    CF.dP(ENo.RDSG_START_FREE_GAME);
                }

            }, this, 7000);

        }
        public startFreeGame() {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.RDSG_START_FREE_GAME);
        }
        /**
         * 退出免费游戏
         */
        public quitFreeGame() {
            this.scene1.visible = true;
            this.scene3.visible = false;
            CF.dP(ENo.RDSG_ENTER_COMMOM_GAME);
        }
    }
}