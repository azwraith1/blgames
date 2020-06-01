// TypeScript file
module bscs {
    export class BSCSMainScene extends game.BaseSlotMainScene {
        gameId = "bscs";
        public resizeGroup: eui.Group;
        public scene1: bscs.BSCSScene1;
        public scene3: bscs.BSCSScene3;
        public closeTipsNotify = PanelNotify.CLOSE_BSCS_TIPS_PANEL;
        public enterFreeNotify = ENo.BSCS_ENTER_FREE_GAME;
        public quitFreeNotify = ENo.BSCS_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.BSCS_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_BSCS;
        public closeAutNotify = PanelNotify.CLOSE_BSCS_AUTO_PANEL;
        public pmdKey = "slot";

        public toFreeAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "BSCSMainSceneSkin"
        }

        public createChildren() {
            super.createChildren();
            game.LaohuUtils.currentSceneId = 1009;
            this.toFreeAni = DBComponent.create("bscs_tofreeani", "bscs_freeani");
            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);

        }


        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_BSCS);
            CF.sN(PanelNotify.CLOSE_BSCS_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_BSCS_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("gdzw_reel_mp3");
        }

        /**
         * 进入免费游戏
         */
        public enterFreeGame(e: egret.Event) {
            this.toFreeAni.play("", 1);
            this.toFreeAni.horizontalCenter = 0;
            this.toFreeAni.bottom = -230;
            this.resizeGroup.addChild(this.toFreeAni);
            SoundManager.getInstance().playEffect("bscs_thunder_mp3");
            this.toFreeAni.resetPosition();
            this.scene3.visible = true;
            this.scene1.visible = false;
            if (e.data) {
                let isfast = e.data.isfast;
                CF.dP(ENo.BSCS_START_FREE_GAME, { isfast: isfast });
            } else {
                CF.dP(ENo.BSCS_START_FREE_GAME);
            }
        }

        public startFreeGame() {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.BSCS_START_FREE_GAME);
        }
        /**
         * 退出免费游戏
         */
        public quitFreeGame() {
            this.scene1.visible = true;
            this.scene3.visible = false;
            CF.dP(ENo.BSCS_ENTER_COMMOM_GAME);
        }
    }
}