module majiang {
	export class XLCHMediator extends BaseMediator {
		public static NAME: string = "XLCHMediator";
		public type: string = "scene";
		public constructor() {
			super(XLCHMediator.NAME);
		}

		public viewComponent: XLCHGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_MJXLCH,
				SceneNotify.CLOSE_MJXLCH,
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
			this.viewComponent = new XLCHGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_MJXLCH:
					RotationLoading.instance.load(["majiang_game"], "", () => {
						RES.loadGroup("majiang_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_MJXLCH:
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