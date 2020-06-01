module gdzw {
	export class GDZWMainMediator extends BaseMediator {
		public static NAME: string = "GDZWMainMediator";
		public type: string = "scene";
		public constructor() {
			super(GDZWMainMediator.NAME);
		}

		public viewComponent: GDZWMainScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GDZW,
				SceneNotify.CLOSE_GDZW
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new game.LaohujiHallMediator());
			this.facade.registerMediator(new GDZWTipsMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.CloseLaohuMediator());
			this.facade.registerMediator(new GDZWAutoGameSetMediator());
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
			this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());

		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new GDZWMainScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_GDZW:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_GDZW:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}