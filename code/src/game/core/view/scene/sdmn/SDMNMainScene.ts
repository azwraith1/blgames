/*
 * @Author: real MC Lee 
 * @Date: 2019-05-27 18:44:35 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:20:41
 * @Description: 
 */
module sdmn {
    export class SDMNMainScene extends game.BaseSlotMainScene {
        public resizeGroup: eui.Group;
        public scene3: SDMNScene3;
        public scene1: SDMNScene1;
        public pmdKey = "slot";
        public gameId = "sdmn";
        public closeTipsNotify = PanelNotify.CLOSE_SDMN_TIPS_PANEL;
        public enterFreeNotify = ENo.SDMN_ENTER_FREE_GAME_SCENE;
        public quitFreeNotify = ENo.SDMN_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.SDMN_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_SDMN;
        public closeAutNotify = PanelNotify.CLOSE_SDMN_AUTO_PANEL;

        private toFreeAni: DBComponent;//进入免费游戏入场动画

        public constructor() {
            super();
            this.skinName = "SDMNMainSceneSkin";
        }

        public createChildren() {
            super.createChildren();
            game.LaohuUtils.currentSceneId = 1004;
            this.toFreeAni = DBComponent.create("sdmn_toFreeAni", "sdmn_select1");

            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        }



        /**
        * 免费游戏入场
        */
        public enterFreeGame(e: egret.Event) {
            this.scene1.visible = false;
            this.toFreeAni.horizontalCenter = 8;
            this.toFreeAni.bottom = 8;
            this.toFreeAni.play("", 1);
            this.resizeGroup.addChild(this.toFreeAni);
            this.toFreeAni.resetPosition();
            this.toFreeAni.callback = () => {
                game.UIUtils.removeSelf(this.toFreeAni);
                this.scene3.visible = true;
                if (e.data) {
                    let isfast = e.data.isfast;
                    CF.dP(ENo.SDMN_ENTER_FREE_GAME, { isfast: isfast });
                } else {
                    CF.dP(ENo.SDMN_ENTER_FREE_GAME);
                }
            }
        }
        // protected parseGame() {
        //     super.parseGame();
        //     Global.pomelo.disConnect();
        // }
        /**
        * 直接进入免费游戏
        */
        public startFreeGame() {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.SDMN_START_FREE_GAME);
        }

        /**
         * 退出免费游戏
         */
        public quitFreeGame() {
            this.scene3.visible = false;
            this.scene1.visible = true;
            CF.dP(ENo.SDMN_ENTER_COMMOM_GAME);
        }



        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_SDMN);
            CF.sN(PanelNotify.CLOSE_SDMN_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SDMN_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
        }
    }
}