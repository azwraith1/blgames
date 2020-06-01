module majiang {
	export class GYZJHelpMediator extends BaseMediator {
	public static NAME: string = "GYZJHelpMediator";
		public type: string = "panel";
		public constructor(viewComponent: any = null) {
			super(GYZJHelpMediator.NAME, viewComponent);
		}
		public viewComponent: GYZJHelpPanel;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_GYZJ_HELP,
				PanelNotify.CLOSE_GYZJ_HELP
			];
		}
		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			
			this.viewComponent = new GYZJHelpPanel();
			this.showUI(this.viewComponent, false, 0, 0, 0);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_GYZJ_HELP:
					if (this.viewComponent) {
						return;
					} else {
						this.showViewComponent();
						//this.showViewComponent(notification.getBody());
					}
					break;
				case PanelNotify.CLOSE_GYZJ_HELP:
					this.closeViewComponent(1);
					break;

			}
		}
	}
}