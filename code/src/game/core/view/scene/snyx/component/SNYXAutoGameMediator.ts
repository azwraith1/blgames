module snyx {
	export class SNYXAutoGameMediator extends BaseMediator {
		public static NAME: string = "SNYXAutoGameMediator";
		public static type: string = "panel";
		public constructor() {
			super(SNYXAutoGameMediator.NAME);
		}
		public viewComponent: SNYXAutoGame;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_SNYX_AUTO_PANEL,
				PanelNotify.CLOSE_SNYX_AUTO_PANEL
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
			this.viewComponent = new SNYXAutoGame();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_SNYX_AUTO_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_SNYX_AUTO_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}