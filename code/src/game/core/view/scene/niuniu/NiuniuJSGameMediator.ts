module niuniu {
	export class NiuniuJSGameMediator extends BaseMediator{
		public static NAME: string = "NiuniuJSGameMediator";
		public type: string = "scene";
		public constructor() {
			super(NiuniuJSGameMediator.NAME);
		}

		public viweComponent: NiuniuJSGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_NIUNIUJSGAMES,
				SceneNotify.CLOSE_NIUNIUJSGAMES
			];

		}

		public onRegister() {
			super.onRegister();
		}

		/**
	 * 固有写法
	 */
		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			game.UIUtils.changeResize(2);
			egret.MainContext.instance.stage.setContentSize(720, 1280);
			this.viewComponent = new NiuniuJSGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_NIUNIUJSGAMES:
					RotationLoadingShu.instance.load(["niuniu_game"], "", () => {
						RES.loadGroup("niuniu_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_NIUNIUJSGAMES:
					if (this.viewComponent) {
						this.closeViewComponent(1);
					}
					break;
			}

		}
	}
}