module majiang {
	export class HBMJMatchingMediator extends BaseMediator {
		public static NAME: string = "HBMJMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(HBMJMatchingMediator.NAME);
		}

		public viewComponent: HBMJMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HBMJ_MATCHING,
				SceneNotify.CLOSE_HBMJ_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new HBMJMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_HBMJ_MATCHING:
					RotationLoading.instance.load(["hbmj_game"], "", () => {
						RES.loadGroup("hbmj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_HBMJ_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}