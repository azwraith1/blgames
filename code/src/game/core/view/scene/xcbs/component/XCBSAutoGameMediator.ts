module xcbs {
	export class XCBSAutoGameMediator extends BaseMediator {
		public static NAME: string = "XCBSAutoGameMediator";
		public static type: string = "panel";
		public constructor() {
			super(XCBSAutoGameMediator.NAME);
		}
		public viewComponent: XCBSAutoGame;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_XCBS_AUTO_PANEL,
				PanelNotify.CLOSE_XCBS_AUTO_PANEL
			];
		}

		public onRegister() {
			super.onRegister();
			// this.facade.registerMediator(new sdxl.SDXLGameMediator());

		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new XCBSAutoGame();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_XCBS_AUTO_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_XCBS_AUTO_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}