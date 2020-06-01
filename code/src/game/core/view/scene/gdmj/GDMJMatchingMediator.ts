module majiang {
	export class GDMJMatchingMediator extends BaseMediator {
		public static NAME: string = "GDMJMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(GDMJMatchingMediator.NAME);
		}

		public viewComponent: GDMJMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GDMJ_MATCHING,
				SceneNotify.CLOSE_GDMJ_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new GDMJMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_GDMJ_MATCHING:
					RotationLoading.instance.load(["gdmj_game"], "", () => {
						RES.loadGroup("gdmj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_GDMJ_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}