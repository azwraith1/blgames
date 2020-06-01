module sangong {
	export class SangongMatchingSceneHorizon extends SangongMatchingScene {
		/**
	 * 关闭匹配通知
	 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SANGONG_WATING_HORIZON;

		/**
		 * 打开游戏大厅
		 */
		public GAME_HALL_NOTIFY: string = SceneNotify.OPEN_SANGONG_HALL_HORIZON;

		/**
		 * 进入游戏通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_SANGONG_GAME_HORIZON;

		/**
         * 记录界面的通知
         */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_NIUGAMERECORD;

		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string = PanelNotify.OPEN_HELP_SHU_HORIZON;

		/**
		 * 设置界面的通知
		 */
		public SETTING_NOTIFY: string = PanelNotify.OPEN_SETTING;
		public constructor() {
			super();
			this.skinName = "resource/skins/scene/sangong/SangongWaitSkinHorizon.exml";
		}
	}
}