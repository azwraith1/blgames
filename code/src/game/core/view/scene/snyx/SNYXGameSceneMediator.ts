module snyx {
	export class SNYXMainMediator extends BaseMediator {
		public static NAME: string = "SNYXMainMediator";
		public type: string = "scene";
		public constructor() {
			super(SNYXMainMediator.NAME);
		}

		public viewComponent: SNYXGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SNYX,
				SceneNotify.CLOSE_SNYX
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new game.LaohujiHallMediator());
			this.facade.registerMediator(new SNYXTipsPanelMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.CloseLaohuMediator());
			this.facade.registerMediator(new SNYXAutoGameMediator());
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
		}

		public showViewComponent() {
			if (this.viewComponent) {
                return;
            }
			this.viewComponent = new SNYXGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SNYX:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_SNYX:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}