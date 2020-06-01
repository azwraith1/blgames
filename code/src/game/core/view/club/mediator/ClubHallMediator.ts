class ClubHallMediator extends BaseMediator {
	public static NAME: string = "ClubHallMediator";
	public type: string = "scene";
	public constructor() {
		super(ClubHallMediator.NAME);
	}

	public viewComponent: ClubHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_CLUB_HALL,
			SceneNotify.CLOSE_CLUB_HALL
		];
	}

	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new MainHallMediator());
		this.facade.registerMediator(new SettingMediator());
	}

	public showViewComponent() {
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new ClubHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_CLUB_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_CLUB_HALL:
				this.closeViewComponent(1);
				break;
		}
	}
}