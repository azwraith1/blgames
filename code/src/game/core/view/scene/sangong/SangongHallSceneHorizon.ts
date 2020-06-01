module sangong {
	export class SangongHallSceneHorizon extends SangongHallScene {
		/**
 * 关闭当前界面的通知
 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SANGONG_HALL_HORIZON;

		/**
		 * 进入正确匹配的通知
		 */
		public MATCHING_NOTIFY: string = SceneNotify.OPEN_SANGONG_WATING_HORIZON;

		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string = PanelNotify.OPEN_HELP_SHU_HORIZON;

		/**
		 * 记录界面的通知
		 */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_NIUGAMERECORD_HORIZON;
		public constructor() {
			super();
			this.skinName = "SangongHallSceneSkinHorizon";
		}
		/**
 * 进入匹配或者重新获取数据
 * @param  {egret.Event} e?
 */
		public async enterScene(event) {
			if (this.lockEnter) {
				return;
			}
			this.lockEnter = true;
			var data = event.data;
			RotationLoading.instance.load(this.loadGroups, "", async () => {
				Global.gameProxy.lastGameConfig = data;
				var handler = ServerPostPath.hall_sceneHandler_c_enter;
				let resp: any = await game.PomeloManager.instance.request(handler, data);
				if (this.enterSceneCall(resp, data)) {
					Global.gameProxy.lastGameConfig = data;
					Global.gameProxy.lastGameConfig.gameId = data.gameId;
				};
			})
		}
	}
}