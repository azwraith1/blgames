module ceby {
	export class CEBYAutoGameMediator extends BaseMediator {
		public static NAME: string = "CEBYAutoGameMediator";
		public static type: string = "panel";
		public constructor() {
			super(CEBYAutoGameMediator.NAME);
		}
		public viewComponent: CEBYAutoGame;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_CEBY_AUTO_PANEL,
				PanelNotify.CLOSE_CEBY_AUTO_PANEL
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
			this.viewComponent = new CEBYAutoGame();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_CEBY_AUTO_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_CEBY_AUTO_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}
