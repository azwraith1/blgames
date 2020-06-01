module sgws {
	export class SGWSMainMediator extends BaseMediator {
		public static NAME: string = "SGWSMainMediator";
		public type: string = "scene";
		public constructor() {
			super(SGWSMainMediator.NAME);
		}

		public viewComponent: SGWSGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SGWS,
				SceneNotify.CLOSE_SGWS
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new game.LaohujiHallMediator());
			this.facade.registerMediator(new SGWSTipsPanelMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.CloseLaohuMediator());
			this.facade.registerMediator(new SGWSAutoGameMediator());
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
		}

		public showViewComponent() {
			if (this.viewComponent) {
                return;
            }
			this.viewComponent = new SGWSGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SGWS:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_SGWS:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}