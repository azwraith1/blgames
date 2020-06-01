class BJLRecordMediator extends BaseMediator {
	public static NAME: string = "BJLRecordMediator";
	public type: string = "panel";
	public constructor(viewComponent: any = null) {
		super(BJLRecordMediator.NAME, viewComponent);
	}
	public viewComponent: BJLRecordPanel;
	public listNotificationInterests(): Array<any> {
		return [
			PanelNotify.OPEN_BJL_RECORD,
			PanelNotify.CLOSE_BJL_RECORD
		];
	}
	public onRegister() {
		super.onRegister();
	}

	public showViewComponent(num) {
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new BJLRecordPanel(num);
		this.showUI(this.viewComponent, false, 0, 0, 0);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case PanelNotify.OPEN_BJL_RECORD:
				if (this.viewComponent) {
					return;
				} else {
					this.showViewComponent(notification.getBody());
				}
				break;
			case PanelNotify.CLOSE_BJL_RECORD:
				this.closeViewComponent(1);
				break;

		}
	}
}