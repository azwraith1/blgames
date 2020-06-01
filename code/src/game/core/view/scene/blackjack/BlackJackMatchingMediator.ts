class BlackJackMatchingMediator extends BaseMediator {
	public static NAME: string = "BlackJackMatchingMediator";
	public type: string = "scene";
	public constructor() {
		super(BlackJackMatchingMediator.NAME);
	}

	public viweComponent: BlackJackMatchingScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_BLACKJ_MATCHING,
			SceneNotify.CLOSE_BLACKJ_MATCHING
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
		this.viewComponent = new BlackJackMatchingScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_BLACKJ_MATCHING:
				RotationLoadingShu.instance.load(["blackjack_game"], "", () => {
					RES.loadGroup("blackjack_back");
					this.showViewComponent();
				});
				break;
			case SceneNotify.CLOSE_BLACKJ_MATCHING:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}