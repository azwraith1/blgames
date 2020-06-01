module majiang {
	export class ERMJOverMediator extends BaseMediator {
		public static NAME: string = "ERMJOverMediator";
		public type: string = "scene";
		public constructor() {
			super(ERMJOverMediator.NAME);
		}

		public viewComponent: ERMJOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_ERMJ_OVER,
				SceneNotify.CLOSE_ERMJ_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new ERMJOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_ERMJ_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_ERMJ_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}