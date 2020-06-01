module sangong {
	export class SangongHallMediatorHorizon extends BaseMediator {
		public static NAME: string = "SangongHallMediatorHorizon";
		public type: string = "scene";
		public constructor() {
			super(SangongHallMediatorHorizon.NAME);
		}

		public viweComponent: SangongHallSceneHorizon;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SANGONG_HALL_HORIZON,
				SceneNotify.CLOSE_SANGONG_HALL_HORIZON
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new SangongGameMediatorHorizon);
			this.facade.registerMediator(new SangongMatchingMediatorHorizon);
			this.facade.registerMediator(new HelpMediatorHorizon());
		}


		/**
	 * 固有写法
	 */
		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			game.UIUtils.changeResize(1);
			this.viewComponent = new SangongHallSceneHorizon();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SANGONG_HALL_HORIZON:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_SANGONG_HALL_HORIZON:
					if (this.viewComponent) {
						this.closeViewComponent(1);
					}
					break;
			}

		}
	}
}