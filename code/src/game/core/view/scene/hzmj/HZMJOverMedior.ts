module majiang {
	export class HZMJOverMedior extends BaseMediator{
	public static NAME: string = "HZMJOverMediator";
		public type: string = "scene";
		public constructor() {
			super(HZMJOverMedior.NAME);
		}

		public viewComponent: HZMJOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HZMJ_OVER,
				SceneNotify.CLOSE_HZMJ_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new HZMJOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_HZMJ_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_HZMJ_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}