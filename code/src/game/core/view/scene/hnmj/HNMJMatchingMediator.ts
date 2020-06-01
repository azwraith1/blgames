module majiang {
	export class HNMJMatchingMediator extends BaseMediator {
		public static NAME: string = "HNMJMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(HNMJMatchingMediator.NAME);
		}

		public viewComponent: HNMJMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HNMJ_MATCHING,
				SceneNotify.CLOSE_HNMJ_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new HNMJMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_HNMJ_MATCHING:
					RotationLoading.instance.load(["hnmj_game"], "", () => {
						RES.loadGroup("hnmj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_HNMJ_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}