class BlackJackHallMediator extends BaseMediator {
	public static NAME: string = "BlackJackHallMediator";
	public type: string = "scene";
	public constructor() {
		super(BlackJackHallMediator.NAME);
	}

	public viweComponent: BlackJackHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_BLACKJ_HALL,
			SceneNotify.CLOSE_BLACKJ_HALL
		];

	}

	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new BlackJackMatchingMediator());
		this.facade.registerMediator(new BlackJackGameMediator());
	}


	/**
 * 固有写法
 */
	public showViewComponent() {
		game.UIUtils.changeResize(2);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new BlackJackHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_BLACKJ_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_BLACKJ_HALL:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}