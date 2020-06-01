module majiang {
	export class GYZJOverMediator extends BaseMediator {
		public static NAME: string = "GYZJOverMediator";
		public type: string = "scene";
		public constructor() {
			super(GYZJOverMediator.NAME);
		}

		public viewComponent: GYZJOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GYZJMJ_OVER,
				SceneNotify.CLOSE_GYZJMJ_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new GYZJOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_GYZJMJ_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_GYZJMJ_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}