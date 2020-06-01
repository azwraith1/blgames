// TypeScript file
module gdzw {
    export class GDZWMainScene extends game.BaseSlotMainScene {
        gameId = "gdzw";
        public resizeGroup: eui.Group;
        public scene1: GDZWScene1;
        public scene3: GDZWScene3;
        public scatterGroup: eui.Group;
        public closeTipsNotify = PanelNotify.CLOSE_GDZW_TIPS_PANEL;
        public enterFreeNotify = ENo.GDZW_ENTER_FREE_GAME;
        public quitFreeNotify = ENo.GDZW_QUIT_FREE_GAME;
        public startFreeSceneNotify = ENo.GDZW_START_FREE_GAME_SCENE;
        public closeSceneNotify = SceneNotify.CLOSE_GDZW;
        public closeAutNotify = PanelNotify.CLOSE_GDZW_AUTO_PANEL;
        public pmdKey = "slot";

        public toFreeAni: DBComponent;
        private logoAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "GDZWMainSceneSkin";
        }

        public createChildren() {
            game.LaohuUtils.currentSceneId = 1008;
            super.createChildren();
            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.addChild(publicMsg);
        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_GDZW);
            CF.sN(PanelNotify.CLOSE_GDZW_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_GDZW_TIPS_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("gdzw_reel_mp3");
        }
        /**
         * 进入免费游戏
         */
        public enterFreeGame(e: egret.Event) {
            this.scene3.isReconnect = false;
            this.scatterAni();
            egret.setTimeout(() => {
                this.scene3.visible = true;
                this.scene1.visible = false;
                if (e.data) {
                    let isfast = e.data.isfast;
                    CF.dP(ENo.GDZW_START_FREE_GAME, { isfast: isfast });
                } else {
                    CF.dP(ENo.GDZW_START_FREE_GAME);
                }
            }, this, 6200 + this.scene1.yudiAtr2.length * 800)
        }
        /**
         * 免费游戏特效
         */
        public scatterAni() {
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playMusic("gdzw_scatmusic1_mp3");
            this.scatterGroup.visible = true;
            let arr = [];
            for (let i = 0; i < this.scene1.yudiAtr2.length; i++) {
                this.scene1.scroller.addFoGuang(this.scene1.yudiAtr2[i], this.scene1.yudiAtr[i], "gdzw_icon_2");
                let icon = new GDZWCardItem();
                this.scatterGroup.addChild(icon);
                arr.push(icon);
                icon.x = (this.scene1.yudiAtr2[i] - 1) * 158;
                icon.y = 189 * this.scene1.yudiAtr[i] + 2;
            }
            SoundManager.getInstance().playEffect("gdzw_scat_move_mp3");

            egret.setTimeout(() => {
                this.toFreeAni = DBComponent.create("gdzw_gdzw_free", "gdzw_free");
                this.toFreeAni.play("gdzw_free_start", 1);
                this.toFreeAni.horizontalCenter = 0;
                this.toFreeAni.bottom = -450;
                this.scene1.scaAniGroup.addChild(this.toFreeAni);
                this.toFreeAni.resetPosition();
                this.toFreeAni.callback = () => {
                    this.toFreeAni.play("gdzw_free_common", 0);
                }
                for (let i = 0; i < arr.length; i++) {
                    arr[i].removeCardAni();
                }
                let scatterInterval = egret.setInterval(() => {
                    if (j >= this.scene1.yudiAtr2.length) {
                        SoundManager.getInstance().playEffect("gdzw_scat_mp3");
                        egret.clearInterval(scatterInterval);
                        let scatterAni = new DBComponent("gdzw_icon_2");
                        scatterAni.play("", 1);
                        scatterAni.horizontalCenter = 3;
                        scatterAni.bottom = -17;
                        this.scatterGroup.addChild(scatterAni);
                        scatterAni.resetPosition();
                        scatterAni.callback = () => {
                            this.scatterGroup.removeChildren();
                            this.scatterGroup.visible = false;
                            this.toFreeAni.play("gdzw_free", 1);
                            SoundManager.getInstance().playEffect("gdzw_light_mp3");
                            egret.setTimeout(() => {
                                game.UIUtils.removeSelf(this.toFreeAni);
                                SoundManager.getInstance().stopEffectByName("gdzw_scat_move_mp3");
                            }, this, 1170)
                        }
                        return;
                    }
                    scattermove = arr[j];
                    this.scatterGroup.addChild(scattermove);
                    egret.Tween.get(scattermove).to({ x: 318, y: 398 }, 800, egret.Ease.circOut);
                    j++;
                }, this, 800);
            }, this, 2000)
            let j = 0;
            let scattermove;
        }

        public startFreeGame() {
            this.scene1.visible = false;
            this.scene3.visible = true;
            CF.dP(ENo.GDZW_START_FREE_GAME);
        }
        /**
         * 退出免费游戏
         */
        public quitFreeGame() {
            this.scene1.visible = true;
            this.scene3.visible = false;
            this.scene1.scroller.showScatterHideIcon();
            CF.dP(ENo.GDZW_ENTER_COMMOM_GAME);
        }
    }
}