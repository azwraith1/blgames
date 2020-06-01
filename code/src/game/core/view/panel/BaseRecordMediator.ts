class BaseRecordMediator extends BaseMediator {
	public static NAME: string = "BaseRecordMediator";
	public type: string = "panel";
	public constructor(viewComponent: any = null) {
		super(BaseRecordMediator.NAME, viewComponent);
	}
	public viewComponent;
	public listNotificationInterests(): Array<any> {
		return [
			PanelNotify.OPEN_BASE_RECORD,
			PanelNotify.CLOSE_BASE_RECORD
		];
	}

	public onRegister() {
		super.onRegister();
	}

	public showViewComponent(gameId) {
		if (this.viewComponent) {
			return;
		}
		switch (gameId) {
			case Global.gameProxy.gameIds["blackjack"]:
			case "blackjack":
			case 10024:
			case 10025:
				this.viewComponent = new BlackJRecordPanel(gameId);
				break;
			case "dzmj":
			case "gdmj":
				this.viewComponent = new BaseMajiangRecordScene(gameId);
				break;
			default:
				this.viewComponent = new BaseMajiangRecordScene(gameId);
				break;
		}

		if (this.viewComponent) {
			this.showUI(this.viewComponent, false, 0, 0, 0);
		}
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case PanelNotify.OPEN_BASE_RECORD:
				let inded = notification.getBody();
				if (GameConfig.CURRENT_ISSHU) {
					this.showViewComponent(inded);
				} else {
					RotationLoading.instance.load(["majiang_common"], "", () => {
						this.showViewComponent(inded);
					});
				}
				break;
			case PanelNotify.CLOSE_BASE_RECORD:
				this.closeViewComponent(0);
				break;

		}
	}
}