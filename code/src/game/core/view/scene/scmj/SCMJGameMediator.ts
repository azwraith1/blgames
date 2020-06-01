module majiang {
	export class SCMJGameMediator extends BaseMediator {
		public static NAME: string = "SCMJGameMediator";
		public type: string = "scene";
		public constructor() {
			super(SCMJGameMediator.NAME);
		}

		public viewComponent: SCMJGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SCMJ,
				SceneNotify.CLOSE_SCMJ,
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
			this.viewComponent = new SCMJGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SCMJ:
					RotationLoading.instance.load(["majiang_game"], "", () => {
						RES.loadGroup("majiang_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_SCMJ:
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