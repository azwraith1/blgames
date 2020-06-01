module gdzw {
	export class GDZWAutoGameSetMediator extends BaseMediator {
		public static NAME: string = "GDZWAutoGameSetMediator";
		public static type: string = "panel";
		public constructor() {
			super(GDZWAutoGameSetMediator.NAME);
		}
		public viewComponent: GDZWAutoGameSet;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_GDZW_AUTO_PANEL,
				PanelNotify.CLOSE_GDZW_AUTO_PANEL
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
			this.viewComponent = new GDZWAutoGameSet();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_GDZW_AUTO_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_GDZW_AUTO_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}