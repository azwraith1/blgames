module sangong {
	export class SangongGameSceneHorizon extends SangongGameScene {
		/**
	 * 关闭当前界面通知
	 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SANGONG_GAME_HORIZON;

		/**
		 * 对应匹配界面通知
		 */
		public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_SANGONG_WATING_HORIZON;
		//new
		/**
		 * 打开游戏界面通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_SANGONG_GAME_HORIZON;

		/**
		 * 关闭游戏界面通知
		 */
		public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_SANGONG_HALL_HORIZON;
		/**
	 * HELP界面
	 */
		public HELP_PANEL_NOTIFY: string = PanelNotify.OPEN_HELP_SHU_HORIZON;
			/**
		 * 记录界面
		 */
		public RECORD_PANEL_NOTIFY:string=PanelNotify.OPEN_NIUGAMERECORD_HORIZON;
		public constructor() {
			super();
			this.skinName = "SangongGameSceneSkinHorizon";
			GameConfig.CURRENT_ISSHU = false;
		}
		/**
			 * 展示点数
			 */
		protected showNiu(pt, direction) {
			let dir = this.directions[direction];
			let niuFen = new SangongFen(pt);
			let pl = this["player" + dir] as eui.Group;
			pl.addChild(niuFen);
			switch (dir) {
				case "1":
					niuFen.x = 350;
					niuFen.y = 150;
					break;
				case "2":
					niuFen.x = -163;
					niuFen.y = 150;
					niuFen.scaleX = niuFen.scaleY = 0.8;
					break;
				case "3":
					//niuFen.x = -170;
					niuFen.x = -163;
					niuFen.y = 180;
					niuFen.scaleX = niuFen.scaleY = 0.8;
					break;
				case "4":
					niuFen.x = 138;
					niuFen.y = 180;
					niuFen.scaleX = niuFen.scaleY = 0.8;
					break;
				case "5":
					niuFen.x = 138;
					niuFen.y = 150;
					niuFen.scaleX = niuFen.scaleY = 0.8;
					break;
			}

		}


	}
}