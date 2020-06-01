// TypeScript file
module snyx {
    export class SNYXGameScene extends game.BaseSlotMainScene {
        gameId = "snyx";
        public resizeGroup: eui.Group;
        public scene1: SNYXScene1;
        public scene3: SNYXScene3;
        public scatterGroup: eui.Group;
        public closeTipsNotify = PanelNotify.CLOSE_SNYX_TIPS_PANEL;
        public enterFreeNotify = ENo.SNYX_ENTER_FREE_GAME;
        public quitFreeNotify = ENo.SNYX_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.SNYX_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_SNYX;
        public closeAutNotify = PanelNotify.CLOSE_SNYX_AUTO_PANEL;
        public pmdKey = "slot";
        public free2comGroup: eui.Group;
        public free2commGroup: eui.Group;
        public freetimeIma: eui.BitmapLabel;


        public constructor() {
            super();
            this.skinName = new SNYXGameSceneSkin();
        }
        public createChildren() {
            super.createChildren();
            this.scene1 = new SNYXScene1();
            this.scene3 = new SNYXScene3();
            this.scene1.left = this.scene1.right = this.scene1.bottom = this.scene1.top = 0;
            this.scene3.left = this.scene3.right = this.scene3.bottom = this.scene3.top = 0; this.scene3.visible = false;
            this.resizeGroup.addChild(this.scene3);
            this.resizeGroup.addChild(this.scene1);
            this.resizeGroup.addChild(this[`free2comGroup`]);
            this.resizeGroup.addChild(this.deskMate);
            game.LaohuUtils.currentSceneId = 1016;
            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_SNYX);
            CF.sN(PanelNotify.CLOSE_SNYX_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SNYX_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
        }

        public enterFreeGame(e: egret.Event) {
            let isfast = false;
            let atr = [];
            if (e.data) {
                isfast = e.data.isfast;
                atr = e.data.atr;
            }
            this.free2comGroup.visible = true;
            this.freetimeIma.text = game.LaohuUtils.freeTimes + "";
            this.scene3.freeWin = game.LaohuUtils.freeWin;
            this.scene3.freewinLabel.text = game.LaohuUtils.freeWin + "";
            SoundManager.getInstance().playEffect("snyx_freegame_start_mp3");
            egret.Tween.get(this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(() => {
                egret.setTimeout(() => {
                    this.scene3.visible = true;
                    this.scene1.visible = false;
                    if (isfast) {
                        if (atr) {
                            CF.dP(ENo.SNYX_START_FREE_GAME, { isfast: isfast, atr: atr });
                        } else {
                            CF.dP(ENo.SNYX_START_FREE_GAME, { isfast: isfast });
                        }
                    } else {
                        if (atr) {
                            CF.dP(ENo.SNYX_START_FREE_GAME, { isfast: isfast, atr: atr });
                        } else {
                            CF.dP(ENo.SNYX_START_FREE_GAME);
                        }
                    }
                    this.free2comGroup.visible = false
                    this.free2commGroup.scaleX = this.free2commGroup.scaleY = 0;
                }, this, 3500);
            })
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
                CF.dP(ENo.SNYX_ENTER_COMMOM_GAME);
            }, this, 500);

        }
    }
}