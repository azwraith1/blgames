module majiang {
	export class HBMJGameMediator extends BaseMediator {
		public static NAME: string = "HBMJGameMediator";
		public type: string = "scene";
		public constructor() {
			super(HBMJGameMediator.NAME);
		}

		public viewComponent: HBMJGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HBMJ,
				SceneNotify.CLOSE_HBMJ,
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
			this.viewComponent = new HBMJGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_HBMJ:
					RotationLoading.instance.load(["hbmj_game"], "", () => {
						RES.loadGroup("hbmj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_HBMJ:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}