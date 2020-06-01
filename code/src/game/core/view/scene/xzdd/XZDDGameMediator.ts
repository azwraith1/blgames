module majiang {
	export class XZDDGameMediator extends BaseMediator {
		public static NAME: string = "XZDDGameMediator";
		public type: string = "scene";
		public constructor() {
			super(XZDDGameMediator.NAME);
		}

		public viewComponent: XZDDGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_MJXZDD,
				SceneNotify.CLOSE_MJXZDD,
				SceneNotify.FLUSH_MAJIANG
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
			this.viewComponent = new XZDDGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_MJXZDD:
					RotationLoading.instance.load(["majiang_game"], "", () => {
						RES.loadGroup("majiang_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_MJXZDD:
					this.closeViewComponent(1);
					break;
				case SceneNotify.FLUSH_MAJIANG:
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