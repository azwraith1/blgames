module xcbs {
	export class XCBSMainMediator extends BaseMediator {
		public static NAME: string = "XCBSMainMediator";
		public type: string = "scene";
		public constructor() {
			super(XCBSMainMediator.NAME);
		}

		public viewComponent: XCBSGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_XCBS,
				SceneNotify.CLOSE_XCBS
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new game.LaohujiHallMediator());
			this.facade.registerMediator(new XCBSTipsMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.CloseLaohuMediator());
			this.facade.registerMediator(new XCBSAutoGameMediator());
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
		}

		public showViewComponent() {
			if (this.viewComponent) {
                return;
            }
			this.viewComponent = new XCBSGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_XCBS:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_XCBS:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}