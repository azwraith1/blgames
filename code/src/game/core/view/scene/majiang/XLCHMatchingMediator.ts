module majiang {
	export class XLCHMatchingMediator extends BaseMediator {
		public static NAME: string = "XLCHMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(XLCHMatchingMediator.NAME);
		}

		public viewComponent: XLCHMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_MJXLCH_MATCHING,
				SceneNotify.CLOSE_MJXLCH_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new XLCHMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_MJXLCH_MATCHING:
					RotationLoading.instance.load(["majiang_game"], "", () => {
						RES.loadGroup("majiang_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_MJXLCH_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}