module niuniu {
	export class NiuniuJSMatchingMediator extends BaseMediator{
	public static NAME: string = "NiuniuJSMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(NiuniuJSMatchingMediator.NAME);
		}

		public viweComponent: NiuniuJSMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_NIUNIU_JSMATCHING,
				SceneNotify.CLOSE_NIUNIU_JSMATCHING
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
			this.viewComponent = new NiuniuJSMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_NIUNIU_JSMATCHING:
					RotationLoadingShu.instance.load(["niuniu_game"], "", () => {
						RES.loadGroup("niuniu_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_NIUNIU_JSMATCHING:
					if (this.viewComponent) {
						this.closeViewComponent(1);
					}
					break;
			}

		}
	}
}