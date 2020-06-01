module majiang {
	export class HZMJHelpMediator extends BaseMediator {
	public static NAME: string = "HZMJHelpMediator";
		public type: string = "panel";
		public constructor(viewComponent: any = null) {
			super(HZMJHelpMediator.NAME, viewComponent);
		}
		public viewComponent: HZMJHelpPanel;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_HZMJ_HELP,
				PanelNotify.CLOSE_HZMJ_HELP
			];
		}
		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new HZMJHelpPanel();
			this.showUI(this.viewComponent, false, 0, 0, 0);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_HZMJ_HELP:
					if (this.viewComponent) {
						return;
					} else {
						this.showViewComponent();
						//this.showViewComponent(notification.getBody());
					}
					break;
				case PanelNotify.CLOSE_HZMJ_HELP:
					this.closeViewComponent(1);
					break;

			}
		}
	}
}