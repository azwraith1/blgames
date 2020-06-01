/*
 * @Author: wangtao 
 * @Date: 2019-05-20 10:59:56 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:20:48
 * @Description: 
 */
module cbzz {
    export class CBZZMainScene extends game.BaseSlotMainScene {
        public resizeGroup: eui.Group;
        public scene3: cbzz.CBZZScene3;
        public scene1: cbzz.CBZZScene1;
        public effectGroup: eui.Group;
        public pmdKey = "slot";
        public gameId = "cbzz";
        public closeTipsNotify = PanelNotify.CLOSE_CBZZ_TIPS_PANEL;
        public enterFreeNotify = ENo.CBZZ_ENTER_FREE_GAME_SCENE;
        public quitFreeNotify = ENo.CBZZ_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.CBZZ_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_CBZZ;
        public closeAutNotify = PanelNotify.CLOSE_CBZZ_AUTO_PANEL;

        private tofreeAni: DBComponent;
        public bgMusic: string = null;
        public constructor() {
            super();
            this.skinName = new CBZZMainSceneSkin();
        }

        public createChildren() {
            super.createChildren();
            game.LaohuUtils.currentSceneId = 1003;
            this.tofreeAni = DBComponent.create("cb_tofree", "cbzz_tofree_ani");

            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_CBZZ);
            CF.sN(PanelNotify.CLOSE_CBZZ_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_CBZZ_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("cbzz_reel_mp3");
        }

        // protected parseGame() {
        //     super.parseGame();
        //     Global.pomelo.disConnect();
        // }
        /**
         * 免费游戏入场
         */
        public enterFreeGame(e: egret.Event) {
            SoundManager.getInstance().playEffect("cbzz_freesel_mp3");
            this.tofreeAni.play("", 1);
            this.tofreeAni.horizontalCenter = 0;
            this.tofreeAni.bottom = -280;
            this.effectGroup.addChild(this.tofreeAni);
            this.tofreeAni.resetPosition();
            this.effectGroup.visible = true;
            egret.setTimeout(() => {
                this.scene3.visible = true;
                this.scene1.visible = false;
            }, this, 300)
            this.tofreeAni.callback = () => {
                game.UIUtils.removeSelf(this.tofreeAni);
                this.effectGroup.visible = false;
                if (e.data) {
                    let isfast = e.data.isfast;
                    CF.dP(ENo.CBZZ_ENTER_FREE_GAME, { isfast: isfast });
                } else {
                    CF.dP(ENo.CBZZ_ENTER_FREE_GAME);
                }

            }

        }
        /**
         * 退出免费游戏
         */
        public quitFreeGame() {
            this.scene3.visible = false;
            this.scene1.visible = true;
            CF.dP(ENo.CBZZ_ENTER_COMMOM_GAME);
        }

        /**
		 * 直接进入免费游戏
		 */
        public startFreeGame() {
            // this.scene3.visible = true;
            // this.scene3.bottom = this.scene3.top = 0;
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.CBZZ_START_FREE_GAME);
        }
    }
}