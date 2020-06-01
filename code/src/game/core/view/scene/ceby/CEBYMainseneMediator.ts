module ceby {
	export class CEBYMainMediator extends BaseMediator {
		public static NAME: string = "CEBYMainMediator";
		public type: string = "scene";
		public constructor() {
			super(CEBYMainMediator.NAME);
		}

		public viewComponent: CEBYMainScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_CEBY,
				SceneNotify.CLOSE_CEBY
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new game.LaohujiHallMediator());
			this.facade.registerMediator(new CEBYTipsMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.CloseLaohuMediator());
			this.facade.registerMediator(new CEBYAutoGameMediator());
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
		}

		public showViewComponent() {
			if (this.viewComponent) {
                return;
            }
			this.viewComponent = new CEBYMainScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_CEBY:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_CEBY:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}