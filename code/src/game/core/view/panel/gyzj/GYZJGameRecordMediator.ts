module majiang {
	export class GYZJGameRecordMediator extends BaseMediator {
		public static NAME: string = "GYZJGameRecordMediator";
		public type: string = "panel";
		public constructor(viewComponent: any = null) {
			super(GYZJGameRecordMediator.NAME, viewComponent);
		}
		public viewComponent: GYZJGameRecordPanel;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_DZMJRECORD,
				PanelNotify.CLOSE_DZMJRECORD
			];
		}
		public onRegister() {
			super.onRegister();
		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new GYZJGameRecordPanel();
			this.showUI(this.viewComponent, false, 0, 0, 0);

		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_GYZJRECORD:
					if (this.viewComponent) {
						return;
					} else {
						this.showViewComponent();
					}
					break;
				case PanelNotify.CLOSE_GYZJRECORD:
					this.closeViewComponent(1);
					break;

			}
		}
	}
}