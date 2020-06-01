module majiang {
	export class ERMJGameMediator extends BaseMediator {
		public static NAME: string = "ERMJGameMediator";
		public type: string = "scene";
		public constructor() {
			super(ERMJGameMediator.NAME);
		}

		public viewComponent: ERMJGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_ERMJ,
				SceneNotify.CLOSE_ERMJ,
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
			this.viewComponent = new ERMJGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_ERMJ:
					RotationLoading.instance.load(["majiang_game"], "", () => {
						RES.loadGroup("ermj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_ERMJ:
					this.closeViewComponent(1);
					break;
				case SceneNotify.FLUSH_MAJIANG:
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