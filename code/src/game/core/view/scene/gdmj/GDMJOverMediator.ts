module majiang {
	export class GDMJOverMediator extends BaseMediator {
		public static NAME: string = "GDMJOverMediator";
		public type: string = "scene";
		public constructor() {
			super(GDMJOverMediator.NAME);
		}

		public viewComponent: GDMJOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GDMJ_OVER,
				SceneNotify.CLOSE_GDMJ_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new GDMJOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_GDMJ_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_GDMJ_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}