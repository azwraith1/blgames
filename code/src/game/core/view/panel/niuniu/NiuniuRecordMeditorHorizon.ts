module niuniu {
	export class NiuniuRecordMeditorHorizon extends BaseMediator {
		public static NAME: string = "NiuniuRecordMeditorHorizon";
		public type: string = "panel";
		public constructor(viewComponent: any = null) {
			super(NiuniuRecordMeditorHorizon.NAME, viewComponent);
		}
		public viewComponent: NiuniuRecordPanlHorizon;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_NIUGAMERECORD_HORIZON,
				PanelNotify.CLOSE_NIUGAMERECORD_HORIZON
			];
		}
		public onRegister() {
			super.onRegister();
		}

		public showViewComponent(num) {
			if (this.viewComponent) {
				return;
			}
			RotationLoading.instance.load(["record"], "", () => {
				this.viewComponent = new NiuniuRecordPanlHorizon(num);
				this.showUI(this.viewComponent, false, 0, 0, 0);
			});
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_NIUGAMERECORD_HORIZON:
					if (this.viewComponent) {
						return;
					} else {
						this.showViewComponent(notification.getBody());
					}
					break;
				case PanelNotify.CLOSE_NIUGAMERECORD_HORIZON:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}
