module niuniu {
	export class NiuniuMatchingScene extends game.BaseMatchingScene {
		public pmdKey: string = "blnn";
		public GAME_ID: string = "blnn";
		private players = {};
		private diFen: eui.Label;
		public bgMusic: string = "niuniu_bgm_mp3";
		/**
		/**
		 * 关闭匹配通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_NIUNIU_MATCHING;

		/**
		 * 打开游戏大厅
		 */
		public GAME_HALL_NOTIFY: string = SceneNotify.OPEN_NIUNIUSELECT;

		/**
		 * 进入游戏通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_NIUNIUGAMES;


		/**
         * 记录界面的通知
         */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_NIUGAMERECORD;

		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string = PanelNotify.OPEN_HELP_SHU;

		/**
		 * 设置界面的通知
		 */
		public SETTING_NOTIFY: string = PanelNotify.OPEN_SETTING;
		/**挂机功能*/
		public autoBar: NiuniuAutoBar;
		public rectMask: eui.Rect;
		/**挂机按钮*/
		protected autoBtn: eui.Image;
		private autoBtnSelecIcon = "niuniu_guaji_select_png";
		private autoBtnUnSelecIcon = "niuniu_gj_unselect_png";
		public constructor() {
			super();
			this.skinName = new NiuniuMatchingSceneSkin();
		}
		/**挂机tios */
		private tisiGroup0: eui.Group;
		private tisiLable0: eui.Label
		/**挂机tips弹窗 */
		private showGuaJiTips(text: string) {
			this.tisiGroup0.visible = true;
			this.tisiGroup0.alpha = 1;
			this.tisiLable0.text = text;
			egret.Tween.get(this.tisiGroup0).to({ alpha: 0 }, 2000);
		}
		public async createChildren() {
			super.createChildren();
			this.diFen.text = Global.gameProxy.lastGameConfig.diFen;
			LogUtils.logD("===========最后的配置===========" + JSON.stringify(Global.gameProxy.lastGameConfig));
			if (NiuniuGuaJiConfig.Instance.autoStatus) {
				this.autoBtn.source = this.autoBtnSelecIcon;
			}
			else {
				this.autoBtn.source = this.autoBtnUnSelecIcon;
			}
		}

		public resetPMDPosition() {
			let publicMsg = PMDComponent.instance;
			publicMsg.anchorOffsetY = 24;
			publicMsg.horizontalCenter = 10;
			publicMsg.top = 50;
		}


		public onAdded() {
			super.onAdded();
			CF.aE(ServerNotify.s_startNewRound, this.startNewRound, this);
			CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
			CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
			CF.aE(ENo.NIUNIU_GUAJI, this.setAutoBtnState, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
			CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
			CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
			CF.rE(ENo.NIUNIU_GUAJI, this.setAutoBtnState, this);
		}
		/**重置挂机按钮得状态 */
		private setAutoBtnState(e: egret.Event) {
			let isAuto = e.data;
			NiuniuGuaJiConfig.Instance.setAutoStatus(isAuto);
			if (isAuto) {
				this.autoBtn.source = this.autoBtnSelecIcon;
			}
			else {
				this.autoBtn.source = this.autoBtnUnSelecIcon;
			}
			this.autoBar.resetState();
			if (!isAuto) {
				this.autoBar.visible = false;
				this.rectMask.visible = false;
			}
		}
		private enterResult(e: egret.Event) {
			let data = e.data;
			if (data.code && data.code != 0) {
				this.clearJoinTimeout();
				this.backHall();
				Global.alertMediator.addAlert(data.msg, () => {

				}, null, true);
				return;
			}
			Global.roomProxy.setRoomInfo(e.data);
		}


		private playerEnter(e: egret.Event) {
			let data = e.data;
			this.players[data.playerIndex] = data.player;
			Global.roomProxy.updatePlayer(data.playerIndex, data.player);
		}

		public startNewRound(e: egret.Event) {
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.GAME_SCENE_NOTIFY);
		}

		// public onTouchTap(event: egret.TouchEvent) {
		// 	super.onTouchTap(event);
		// 	switch (event.target) {
		// 		case this.recordBtn:
		// 			this.showBtnsType(1);
		// 			CF.sN(PanelNotify.OPEN_NIUGAMERECORD, "blnn");
		// 			break;
		// 		case this.helpBtn:
		// 			this.showBtnsType(1);
		// 			CF.sN(PanelNotify.OPEN_HELP_SHU, { type: "blnn" });
		// 			break;
		// 		case this.settingBtn:
		// 			this.showBtnsType(1);
		// 			CF.sN(PanelNotify.OPEN_SETTING, {});
		// 			break;
		// 		case this.xlbtn:
		// 			this.showBtnsType(2);
		// 			break;
		// 		case this.xlbtn1:
		// 			this.showBtnsType(1);
		// 			break;
		// 	}
		// }

		public onTouchTap(e: egret.TouchEvent) {
			super.onTouchTap(e);
			//挂机功能 点击弹窗外其他区域关闭窗口
			if (e.target == this.rectMask) {
				LogUtils.logD("===当前点击得目标===" + e.target);
				if (this.autoBar && this.autoBar.visible)
					CF.dP(ENo.NIUNIU_GUAJI, false);
			}
			switch (e.target) {
				//点击autoBtn
				case this.autoBtn:
					if (this.autoBtn.source == this.autoBtnSelecIcon) {
						CF.dP(ENo.NIUNIU_GUAJI, false);
                       this.showGuaJiTips("停止挂机");
						//Global.alertMediator.addAlert("停止挂机", null, null, true);
						this.autoBtn.source = this.autoBtnUnSelecIcon;
					}
					else {
						this.rectMask.visible = true;
						this.autoBar.visible = true;
						this.autoBar.resetState();
					}
					break;
			}
		}
	}
}