// TypeScript file SGWSMainSceneSkin
module sgws {
    export class SGWSGameScene extends game.BaseSlotMainScene {
        gameId = "sgws";
        public resizeGroup: eui.Group;
        public scene1: SGWSScene1;
        public scene3: SGWSScene3;
        public scatterGroup: eui.Group;
        public closeTipsNotify = PanelNotify.CLOSE_SGWS_TIPS_PANEL;
        public enterFreeNotify = ENo.SGWS_ENTER_FREE_GAME;
        public quitFreeNotify = ENo.SGWS_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.SGWS_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_SGWS;
        public closeAutNotify = PanelNotify.CLOSE_SGWS_AUTO_PANEL;
        public pmdKey = "slot";
        public chanegSceneAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "SGWSMainSceneSkin";
        }

        public createChildren() {
            super.createChildren();
            game.LaohuUtils.currentSceneId = 1017;
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
            CF.sN(SceneNotify.CLOSE_SGWS);
            CF.sN(PanelNotify.CLOSE_SGWS_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SGWS_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
        }

        public enterFreeGame(e: egret.Event) {
            // this.chanegSceneAni.play("", 1);
            // this[`free2CommomGroup`].addChild(this.chanegSceneAni);
            // this.chanegSceneAni.resetPosition();
            this.scene3.freeWin = game.LaohuUtils.freeWin;
            this.scene3.winNumLabel.text = game.LaohuUtils.freeWin + "";
            egret.setTimeout(() => {
                this.scene3.visible = true;
                this.scene1.visible = false;
                if (e.data) {
                    let isfast = e.data.isfast;
                    CF.dP(ENo.SGWS_START_FREE_GAME, { isfast: isfast });
                } else {
                    CF.dP(ENo.SGWS_START_FREE_GAME);
                }
            }, this, 500);

        }

        public startFreeGame() {
            // this.enterFreeGame();
        }

        public quitFreeGame() {
            // this.chanegSceneAni.play("", 1);
            // this[`free2CommomGroup`].addChild(this.chanegSceneAni);
            // this.chanegSceneAni.resetPosition();
            egret.setTimeout(() => {
                this.scene1.visible = true;
                this.scene3.visible = false;
                CF.dP(ENo.SGWS_ENTER_COMMOM_GAME);
            }, this, 500);

        }
    }
}