module majiang {
	export class HBMJOverMediator extends BaseMediator {
		public static NAME: string = "HBMJOverMediator";
		public type: string = "scene";
		public constructor() {
			super(HBMJOverMediator.NAME);
		}

		public viewComponent: HBMJOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HBMJ_OVER,
				SceneNotify.CLOSE_HBMJ_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if (this.viewComponent) {
				this.closeViewComponent(1);
				// return;
			}
			this.viewComponent = new HBMJOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_HBMJ_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_HBMJ_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}