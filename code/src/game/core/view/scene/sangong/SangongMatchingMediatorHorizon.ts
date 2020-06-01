module sangong {
	export class SangongMatchingMediatorHorizon extends BaseMediator {
		public static NAME: string = "SangongMatchingMediatorHorizon";
		public type: string = "scene";
		public constructor() {
			super(SangongMatchingMediatorHorizon.NAME);
		}

		public viweComponent: SangongMatchingSceneHorizon;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SANGONG_WATING_HORIZON,
				SceneNotify.CLOSE_SANGONG_WATING_HORIZON
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
			game.UIUtils.changeResize(1);
			this.viewComponent = new SangongMatchingSceneHorizon();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SANGONG_WATING_HORIZON:
					RotationLoading.instance.load(["sangong_game"], "", () => {
						RES.loadGroup("sangong_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_SANGONG_WATING_HORIZON:
					if (this.viewComponent) {
						this.closeViewComponent(1);
					}
					break;
			}

		}
	}
}