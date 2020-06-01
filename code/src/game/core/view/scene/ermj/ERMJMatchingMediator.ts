module majiang {
	export class ERMJMatchingMediator extends BaseMediator {
		public static NAME: string = "ERMJMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(ERMJMatchingMediator.NAME);
		}

		public viewComponent: ERMJMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_ERMJ_MATCHING,
				SceneNotify.CLOSE_ERMJ_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new ERMJMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_ERMJ_MATCHING:
					RotationLoading.instance.load(["majiang_game"], "", () => {
						RES.loadGroup("ermj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_ERMJ_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}