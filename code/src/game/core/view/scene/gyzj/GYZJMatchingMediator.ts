module majiang {
	export class GYZJMatchingMediator extends BaseMediator {
		public static NAME: string = "GYZJMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(GYZJMatchingMediator.NAME);
		}

		public viewComponent: GYZJMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GYZJ_MATCHING,
				SceneNotify.CLOSE_GYZJ_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new GYZJMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_GYZJ_MATCHING:
					RotationLoading.instance.load(["gyzjmj_game"], "", () => {
						RES.loadGroup("gyzjmj_back");
						this.showViewComponent();

					});
					break;
				case SceneNotify.CLOSE_GYZJ_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}