// TypeScript file
module xcbs {
    export class XCBSGameScene extends game.BaseSlotMainScene {
        gameId = "xcbs";
        public resizeGroup: eui.Group;
        public scene1: XCBSScene1;
        public scene3: XCBSScene3;
        public scatterGroup: eui.Group;
        public closeTipsNotify = PanelNotify.CLOSE_XCBS_TIPS_PANEL;
        public enterFreeNotify = ENo.XCBS_ENTER_FREE_GAME;
        public quitFreeNotify = ENo.XCBS_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.XCBS_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_XCBS;
        public closeAutNotify = PanelNotify.CLOSE_XCBS_AUTO_PANEL;
        public pmdKey = "slot";
        public chanegSceneAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "XCBSMainSceneSkin";
        }

        public createChildren() {
            super.createChildren();
            game.LaohuUtils.currentSceneId = 1016;
            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
            this.chanegSceneAni = DBComponent.create("xcbs_changesceneani", "rdsg_comm2freeani");

        }

        public onAdded() {
            super.onAdded();
        }

        public onRemoved() {
            super.onRemoved();
        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_XCBS);
            CF.sN(PanelNotify.CLOSE_XCBS_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_XCBS_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
        }


        public enterFreeGame(e: egret.Event) {
            this.chanegSceneAni.play("", 1);
            this[`free2CommomGroup`].addChild(this.chanegSceneAni);
            this.chanegSceneAni.resetPosition();
            this.scene3.freeWin = game.LaohuUtils.freeWin;
            this.scene3.winNumLabel.text = game.LaohuUtils.freeWin + "";
            egret.setTimeout(() => {
                this.scene3.visible = true;
                this.scene1.visible = false;
                if (e.data) {
                    let isfast = e.data.isfast;
                    CF.dP(ENo.XCBS_START_FREE_GAME, { isfast: isfast });
                } else {
                    CF.dP(ENo.XCBS_START_FREE_GAME);
                }
            }, this, 500);

        }

        public startFreeGame() {
            // this.enterFreeGame();
        }

        public quitFreeGame() {
            this.chanegSceneAni.play("", 1);
            this[`free2CommomGroup`].addChild(this.chanegSceneAni);
            this.chanegSceneAni.resetPosition();
            egret.setTimeout(() => {
                this.scene1.visible = true;
                this.scene3.visible = false;
                CF.dP(ENo.XCBS_ENTER_COMMOM_GAME);
            }, this, 500);

        }
    }
}