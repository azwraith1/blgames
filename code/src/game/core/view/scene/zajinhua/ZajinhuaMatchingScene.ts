module zajinhua {
	export class ZajinhuaMatchingScene extends game.BaseMatchingScene {
		private players = {};
		private diFen: eui.Label;
		public pmdKey: string = "zjh";
		public bgMusic: string = "zjh_bgm_mp3";
		public GAME_ID: string = "zjh";
		/**
	   * 关闭匹配通知
	   */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_ZJH_MATCHING;

		/**
		 * 打开游戏大厅
		 */
		public GAME_HALL_NOTIFY: string = SceneNotify.OPEN_ZJHSELECT;

		/**
		 * 进入游戏通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_ZJHGAME;

		/**
         * 记录界面的通知
         */
		public RECORD_NOTIFY: string;

		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string;

		/**
		 * 设置界面的通知
		 */
		public SETTING_NOTIFY: string;


		public constructor() {
			super();
			this.skinName = new ZajinhuaMatchingSceneSkin();
		}

		public async createChildren() {
			super.createChildren();
			this.diFen.text = "底分：" + Global.gameProxy.lastGameConfig.diFen;
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
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
			CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
			CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
		}


		private async enterResult(e: egret.Event) {
			let data = e.data;
			Global.roomProxy.clearRoomInfo()
			if (data.code && data.code != 0) {
				this.clearJoinTimeout();
				this.backHall();
				Global.alertMediator.addAlert(data.msg, () => {

				}, null, true);
				return;
			}
			Global.roomProxy.setRoomInfo(e.data);
			Global.roomProxy.roomInfo.dealer = e.data.dealerIndex;
		}


		private playerEnter(e: egret.Event) {
			let data = e.data;
			this.players[data.playerIndex] = data.player;
			Global.roomProxy.updatePlayer(data.playerIndex, data.player);
		}

		public async startNewRound(e: egret.Event) {
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.GAME_SCENE_NOTIFY);
		}
	}
}