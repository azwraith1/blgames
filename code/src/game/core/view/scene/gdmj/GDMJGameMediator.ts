module majiang {
	export class GDMJGameMediator extends BaseMediator {
		public static NAME: string = "GDMJGameMediator";
		public type: string = "scene";
		public constructor() {
			super(GDMJGameMediator.NAME);
		}

		public viewComponent: GDMJGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GDMJ,
				SceneNotify.CLOSE_GDMJ,
				SceneNotify.FLUSH_GDMJ
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
			this.viewComponent = new GDMJGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_GDMJ:
					RotationLoading.instance.load(["gdmj_game"], "", () => {
						RES.loadGroup("gdmj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_GDMJ:
					this.closeViewComponent(1);
					break;
				case SceneNotify.FLUSH_GDMJ:
					if (this.viewComponent) {
						this.closeViewComponent(1);
						// Global.gameProxy.clearRoomInfo();
						this.showViewComponent();
					}
					break;
			}
		}
	}
}