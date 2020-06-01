module majiang {
	export class HNMJOverMediator extends BaseMediator {
		public static NAME: string = "HNMJOverMediator";
		public type: string = "scene";
		public constructor() {
			super(HNMJOverMediator.NAME);
		}

		public viewComponent: HNMJOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HNMJ_OVER,
				SceneNotify.CLOSE_HNMJ_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new HNMJOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_HNMJ_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_HNMJ_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}