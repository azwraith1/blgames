module majiang {
	export class XZDDOverMediator extends BaseMediator {
		public static NAME: string = "XZDDOverMediator";
		public type: string = "scene";
		public constructor() {
			super(XZDDOverMediator.NAME);
		}

		public viewComponent: XZDDOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_MJXZDD_OVER,
				SceneNotify.CLOSE_MJXZDD_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new XZDDOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_MJXZDD_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_MJXZDD_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}