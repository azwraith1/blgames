module majiang {
	export class GYZJGameMediator extends BaseMediator {
		public static NAME: string = "GYZJGameMediator";
		public type: string = "scene";
		public constructor() {
			super(GYZJGameMediator.NAME);
		}

		public viewComponent: GYZJGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GYZJMJ,
				SceneNotify.CLOSE_GYZJMJ,
				SceneNotify.FLUSH_GYZJMJ
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			game.UIUtils.changeResize(1);
			this.viewComponent = new GYZJGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_GYZJMJ:
					RotationLoading.instance.load(["gyzjmj_game"], "", () => {
						RES.loadGroup("gyzjmj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_GYZJMJ:
					this.closeViewComponent(1);
					break;
				case SceneNotify.FLUSH_GYZJMJ:
					if (this.viewComponent) {
						this.closeViewComponent(1);
						Global.gameProxy.clearRoomInfo();
						this.showViewComponent();
					}
					break;

			}
		}
	}
}