module majiang {
	export class XLCHOverMediator extends BaseMediator {
		public static NAME: string = "XLCHOverMediator";
		public type: string = "scene";
		public constructor() {
			super(XLCHOverMediator.NAME);
		}

		public viewComponent: XLCHOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_MJXLCH_OVER,
				SceneNotify.CLOSE_MJXLCH_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new XLCHOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_MJXLCH_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_MJXLCH_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}