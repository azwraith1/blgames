module majiang {
	export class HZMJGameRecordMediator extends BaseMediator {
		public static NAME: string = "HZMJGameRecordMediator";
		public type: string = "panel";
		public constructor(viewComponent: any = null) {
			super(HZMJGameRecordMediator.NAME, viewComponent);
		}
		public viewComponent: HZMJGameRecordPanel;
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
			this.viewComponent = new HZMJGameRecordPanel();
			this.showUI(this.viewComponent, false, 0, 0, 0);

		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_HZMJRECORD:
					if (this.viewComponent) {
						return;
					} else {
						this.showViewComponent();
					}
					break;
				case PanelNotify.CLOSE_HZMJRECORD:
					this.closeViewComponent(1);
					break;

			}
		}
	}
}