module niuniu {
	export class NiuniuJSMatchingScene extends NiuniuMatchingScene {
		/**
	/**
	 * 关闭匹配通知
	 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_NIUNIU_JSMATCHING;
		/**
 * 进入游戏通知
 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_NIUNIUJSGAMES;
		public constructor() {
			super();
		}
	}
}