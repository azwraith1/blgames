// TypeScript file
module ayls {
    export class AYLSMainScene extends game.BaseSlotMainScene {
        public gameId = "ayls";
        public resizeGroup: eui.Group;
        public scene1: ayls.AYLSScene1;
        public scene3: ayls.AYLSScene3;
        public closeTipsNotify = PanelNotify.CLOSE_AYLS_TIPS_PANEL;
        public enterFreeNotify = ENo.AYLS_ENTER_FREE_GAME;
        public quitFreeNotify = ENo.AYLS_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.AYLS_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_AYLS;
        public closeAutNotify = PanelNotify.CLOSE_AYLS_AUTO_PANEL;
        public pmdKey = "slot";

        public toFreeAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "AYLSMainSceneSkin"
        }

        public createChildren() {
            super.createChildren();
            game.LaohuUtils.currentSceneId = 1007;
            this.toFreeAni = DBComponent.create("ayls_2freeani", "ayls_freeani");
            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);

        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_AYLS);
            CF.sN(PanelNotify.CLOSE_AYLS_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_AYLS_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("ayls_reel_mp3");
        }

        /**
         * 进入免费游戏
         */
        public enterFreeGame(e: egret.Event) {
            this.toFreeAni.play("", 1);
            this.toFreeAni.horizontalCenter = 0;
            this.toFreeAni.bottom = -230;
            this.resizeGroup.addChild(this.toFreeAni);
            SoundManager.getInstance().playEffect("ayls_thunder_mp3");
            this.toFreeAni.resetPosition();
            this.scene3.visible = true;
            this.scene1.visible = false;
            if (e.data) {
                let isfast = e.data.isfast;
                CF.dP(ENo.AYLS_START_FREE_GAME, { isfast: isfast });
            } else {
                CF.dP(ENo.AYLS_START_FREE_GAME);
            }

        }

        public startFreeGame() {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.AYLS_START_FREE_GAME);
        }
        /**
         * 退出免费游戏
         */
        public quitFreeGame() {
            this.scene1.visible = true;
            this.scene3.visible = false;
            CF.dP(ENo.AYLS_ENTER_COMMOM_GAME);
        }
    }
}