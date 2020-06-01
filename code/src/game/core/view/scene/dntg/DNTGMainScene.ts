/*
 * @Author: wangtao 
 * @Date: 2019-03-27 14:23:49 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 19:21:03
 * @Description: 
 */
module dntg {
	export class DNTGMainScene extends game.BaseSlotMainScene {
		public scene1: DNTGScene1;
		public scene2: DNTGScene2;
		public scene3: DNTGScens3
		public closeTipsNotify = PanelNotify.CLOSE_LAOHUGAME_TIPS;
		public enterFreeNotify = ENo.DNTG_ENTER_FREE_GAME;
		public quitFreeNotify = ENo.DNTG_QUIT_FREE_GAME;
		public startFreeSceneNotify = ENo.DNTG_START_FREE_GAME;
		public closeSceneNotify = SceneNotify.CLOSE_DNTG;
		public closeAutNotify = PanelNotify.CLOSE_LAOHU_AUTO_PANEL;
		public gameId = "dntg"
		public pmdKey = "slot";
		public bgMusic: string;
		public constructor() {
			super();
			this.skinName = new DNTGMainSceneSkin();
		}

		public createChildren() {
			super.createChildren();
			game.LaohuUtils.currentSceneId = 1001;
			game.UIUtils.removeButtonScaleEffects(this);
			this.scene2.visible = this.scene3.visible = false;
			game.LaohuUtils.currentSceneId = 1001;
			let publicMsg = PMDComponent.instance;
			publicMsg.anchorOffsetY = 0;
			publicMsg.horizontalCenter = 0;
			publicMsg.top = 80;
			this.resizeGroup.addChild(publicMsg);
		}

		public isInScatter: boolean = false;


		public closeGameCall() {
			CF.sN(SceneNotify.OPEN_MAIN_HALL);
			CF.sN(SceneNotify.CLOSE_DNTG);
			CF.sN(PanelNotify.CLOSE_LAOHU_AUTO_PANEL);
			CF.sN(PanelNotify.CLOSE_LAOHUGAME_TIPS);
			CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
			CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
			SoundManager.getInstance().stopEffectByName("reel_dntg_mp3");
		}
		/**
		 * 进入免费游戏场景
		 */
		public enterFreeGame(e: egret.Event) {
			// if(!this.scene2.parent){
			// 	this.resizeGroup.addChild(this.scene2)
			// 	// this.scene2.listenOn();
			// }
			// if(!this.scene3.parent){
			// 	this.resizeGroup.addChild(this.scene3)
			// 	this.scene3.listenOn();

			// }
			if (e.data) {
				let isfast = e.data.isfast;
				CF.dP(ENo.DNTG_ENTER_FREE_GAME_SCENE, { isfast: isfast });
			} else {
				CF.dP(ENo.DNTG_ENTER_FREE_GAME_SCENE);
			}
			this.scene2.visible = this.scene3.visible = true;
			this.scene1.isInScatter = true;
			egret.Tween.get(this).to({ y: 1440 }, 1200).call(() => {
				this.scene1.visible = false;
				this.deskMate.verticalCenter -= 1440;
			});
		}

		// protected parseGame(){
		// 	super.parseGame();
		// 	Global.pomelo.disConnect();
		// }
		/**
		 * 继续免费游戏
		 */
		public startFreeGame() {
			// if(!this.scene2.parent){
			// 	this.resizeGroup.addChild(this.scene2)
			// 	// this.scene2.onAdded();
			// }
			// if(!this.scene3.parent){
			// 	this.resizeGroup.addChild(this.scene3)
			// 	this.scene3.listenOn();

			// }
			this.scene2.visible = this.scene3.visible = true;
			this.scene1.visible = false;
			this.scene1.isInScatter = true;
			egret.Tween.get(this).to({ y: 1440 }, 1200).call(() => {
				this.deskMate.verticalCenter -= 1440;
			});
			CF.dP(ENo.DNTG_START_FREE_GAME_SCENE);
		}
		/**
		 * 退出dntg
		 */
		public quitFreeGame() {
			this.scene1.isInScatter = false;
			this.scene1.visible = true;
			egret.Tween.get(this).to({ y: 0 }, 800).call(() => {
				this.deskMate.verticalCenter = -50;
				this.scene2.visible = this.scene3.visible = false;
			});
			this.scene1.runningType = 3;
			CF.dP(ENo.DNTG_ENTER_COMMON_GAME);
		}

	}
}