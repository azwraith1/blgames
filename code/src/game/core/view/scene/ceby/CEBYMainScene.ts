// TypeScript file
module ceby {
    export class CEBYMainScene extends game.BaseSlotMainScene {
        gameId = "ceby";
        public resizeGroup: eui.Group;
        public scene1: CEBYScene1;
        public scene3: CEBYScene3;
        public scatterGroup: eui.Group;
        public closeTipsNotify = PanelNotify.CLOSE_CEBY_TIPS_PANEL;
        public enterFreeNotify = ENo.CEBY_ENTER_FREE_GAME;
        public quitFreeNotify = ENo.CEBY_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.CEBY_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_CEBY;
        public closeAutNotify = PanelNotify.CLOSE_CEBY_AUTO_PANEL;
        public pmdKey = "slot";

        private logoAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "CEBYMainSceneSkin";
        }

        public createChildren() {
            super.createChildren();
            game.LaohuUtils.currentSceneId = 1010;
            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);
        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_CEBY);
            CF.sN(PanelNotify.CLOSE_CEBY_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_CEBY_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("ceby_reel_mp3");
        }

        public scene2: CEBYScene2;
        public enterFreeTimeOut: any;
        /**
         * 进入免费游戏
         */
        public enterFreeGame(e: egret.Event) {
            this.enterFreeTimeOut = egret.setTimeout(() => {
                this.scene3.visible = true;
                SoundManager.getInstance().playEffect("ceby_roll_mp3");
                this.scene3.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                egret.Tween.get(this.scene2).to({ bottom: -274, top: 720 }, 2000, egret.Ease.sineIn);
                egret.Tween.get(this.scene1).to({ bottom: -994, top: 994 }, 2000, egret.Ease.sineIn)
                egret.Tween.get(this.scene3).to({ bottom: 0, top: 0 }, 2000, egret.Ease.sineIn).call(() => {
                    if (e.data) {
                        let isfast = e.data.isfast;
                        CF.dP(ENo.CEBY_START_FREE_GAME, { isfast: isfast });
                    } else {
                        CF.dP(ENo.CEBY_START_FREE_GAME);
                    }
                    this.scene1.visible = false;
                    this.scene1.freeLeftGroup.visible = false;
                    this.scene1.getFreeGroup.visible = false;
                    this.scene1.changeAni.horizontalCenter = 1000;
                })
            }, this, 1000)
        }
        /**
         * 免费游戏特效
         */
        public scatterAni() {

        }

        public startFreeGame() {
            this.scene3.visible = true;
            this.scene1.quitBtn.touchEnabled = false;
            SoundManager.getInstance().playEffect("ceby_roll_mp3");
            egret.Tween.get(this.scene2).to({ bottom: -274, top: 720 }, 2000, egret.Ease.sineIn);
            egret.Tween.get(this.scene1).to({ bottom: -994, top: 994 }, 2000, egret.Ease.sineIn);
            this.scene3.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
            egret.Tween.get(this.scene3).to({ bottom: 0, top: 0 }, 2000, egret.Ease.sineIn).call(() => {
                CF.dP(ENo.CEBY_START_FREE_GAME);
                this.scene1.visible = false;
                this.scene1.freeLeftGroup.visible = false;
                this.scene1.getFreeGroup.visible = false;
                this.scene1.changeAni.horizontalCenter = 1000;
            })
        }
        /**
         * 退出免费游戏
         */
        public quitFreeGame() {
            this.scene1.visible = true;
            egret.Tween.get(this.scene2).to({ bottom: 720, top: -274 }, 2000, egret.Ease.sineIn);
            egret.Tween.get(this.scene1).to({ bottom: 0, top: 0 }, 2000, egret.Ease.sineIn)
            egret.Tween.get(this.scene3).to({ bottom: 994, top: -994 }, 2000, egret.Ease.sineIn).call(() => {
                this.scene3.visible = false;
                CF.dP(ENo.CEBY_ENTER_COMMOM_GAME);
            })
        }
    }
}