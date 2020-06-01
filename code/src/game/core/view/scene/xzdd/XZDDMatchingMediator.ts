module majiang {
	export class XZDDMatchingMediator extends BaseMediator {
		public static NAME: string = "XZDDMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(XZDDMatchingMediator.NAME);
		}

		public viewComponent: XZDDMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_MJXZDD_MATCHING,
				SceneNotify.CLOSE_MJXZDD_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new XZDDMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_MJXZDD_MATCHING:
					RotationLoading.instance.load(["majiang_game"], "", () => {
						RES.loadGroup("majiang_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_MJXZDD_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}