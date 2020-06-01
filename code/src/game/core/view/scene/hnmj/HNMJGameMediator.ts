module majiang {
	export class HNMJGameMediator extends BaseMediator {
		public static NAME: string = "HNMJGameMediator";
		public type: string = "scene";
		public constructor() {
			super(HNMJGameMediator.NAME);
		}

		public viewComponent: HNMJGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HNMJ,
				SceneNotify.CLOSE_HNMJ,
				SceneNotify.CLOSE_MJ_JIESSUAN
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
			this.viewComponent = new HNMJGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_HNMJ:
					RotationLoading.instance.load(["hnmj_game"], "", () => {
						RES.loadGroup("hnmj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_HNMJ:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}