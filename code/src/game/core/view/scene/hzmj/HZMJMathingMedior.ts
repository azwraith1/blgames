module majiang {
	export class HZMJMathingMedior extends BaseMediator {
		public static NAME: string = "HZMJMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(HZMJMathingMedior.NAME);
		}

		public viewComponent: HZMJMathingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HZMJ_MATCHING,
				SceneNotify.CLOSE_HZMJ_MATCHING
			];
		}

		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new HZMJMathingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_HZMJ_MATCHING:
					RotationLoading.instance.load(["hzmj_game"], "", () => {
						RES.loadGroup("hzmj_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_HZMJ_MATCHING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}