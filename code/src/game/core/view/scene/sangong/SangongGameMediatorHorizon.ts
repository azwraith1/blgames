module sangong {
	export class SangongGameMediatorHorizon extends BaseMediator {
		public static NAME: string = "SangongGameMediatorHorizon";
		public type: string = "scene";
		public constructor() {
			super(SangongGameMediatorHorizon.NAME);
		}

		public viweComponent: SangongGameSceneHorizon;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SANGONG_GAME_HORIZON,
				SceneNotify.CLOSE_SANGONG_GAME_HORIZON
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
			egret.MainContext.instance.stage.setContentSize(1280, 720);
			this.viewComponent = new SangongGameSceneHorizon();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
			
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SANGONG_GAME_HORIZON:
					RotationLoading.instance.load(["sangong_game"], "", () => {
						RES.loadGroup("sangong_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_SANGONG_GAME_HORIZON:
					if (this.viewComponent) {
						this.closeViewComponent(1);
					}
					break;
			}

		}
	}
}