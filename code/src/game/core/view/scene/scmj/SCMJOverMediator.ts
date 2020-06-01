module majiang {
	export class SCMJOverMediator extends BaseMediator {
		public static NAME: string = "SCMJOverMediator";
		public type: string = "scene";
		public constructor() {
			super(SCMJOverMediator.NAME);
		}

		public viewComponent: SCMJOverScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SCMJ_OVER,
				SceneNotify.CLOSE_SCMJ_OVER
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(nums) {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new SCMJOverScene(nums);
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {

			switch (notification.getName()) {
				case SceneNotify.OPEN_SCMJ_OVER:
					this.showViewComponent(notification.getBody());
					break;
				case SceneNotify.CLOSE_SCMJ_OVER:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}