module sgws {
	export class SGWSAutoGameMediator extends BaseMediator {
		public static NAME: string = "SGWSAutoGameMediator";
		public static type: string = "panel";
		public constructor() {
			super(SGWSAutoGameMediator.NAME);
		}
		public viewComponent: SGWSAutoGame;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_SGWS_AUTO_PANEL,
				PanelNotify.CLOSE_SGWS_AUTO_PANEL
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
			this.viewComponent = new SGWSAutoGame();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_SGWS_AUTO_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_SGWS_AUTO_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}