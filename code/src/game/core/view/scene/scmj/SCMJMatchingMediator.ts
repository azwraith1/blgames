module majiang {
	export class SCMJMatchingMediator extends BaseMediator {
		public static NAME: string = "SCMJMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(SCMJMatchingMediator.NAME);
		}

		public viewComponent: SCMJMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SCMJ_MATCHING,
				SceneNotify.CLOSE_SCMJ_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new SCMJMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SCMJ_MATCHING:
					RotationLoading.instance.load(["majiang_game"], "", () => {
						RES.loadGroup("majiang_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_SCMJ_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}