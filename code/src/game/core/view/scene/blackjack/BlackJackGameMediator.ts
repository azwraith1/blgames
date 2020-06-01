class BlackJackGameMediator extends BaseMediator {
	public static NAME: string = "BlackJackGameMediator";
	public type: string = "scene";
	public constructor() {
		super(BlackJackGameMediator.NAME);
	}

	public viweComponent: BlackJackGameScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_BLACKJ_GAME,
			SceneNotify.CLOSE_BLACKJ_GAME
		];

	}

	public onRegister() {
		super.onRegister();
	}


	/**
 * 固有写法
 */
	public showViewComponent() {
		if (this.viewComponent) {
			return;
		}
		game.UIUtils.changeResize(2);
		RES.loadGroup("blackjack_back");
		this.viewComponent = new BlackJackGameScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_BLACKJ_GAME:
				//this.showViewComponent();
				RotationLoadingShu.instance.load(["blackjack_game"], "", () => {
					//RES.loadGroup("bjl_game");
					this.showViewComponent();
				});
				break;
			case SceneNotify.CLOSE_BLACKJ_GAME:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}