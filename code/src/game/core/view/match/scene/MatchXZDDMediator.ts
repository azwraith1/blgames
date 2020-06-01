class MatchXZDDMediator extends BaseMediator {
	public static NAME: string = "MatchXZDDMediator";
	public type: string = "scene";
	public constructor() {
		super(MatchXZDDMediator.NAME);
	}

	public viweComponent: majiang.MatchXZDDGameScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_MATCH_MJXZDD,
			SceneNotify.CLOSE_MATCH_MJXZDD
		];

	}

	public onRegister() {
		super.onRegister();
	}

	/**
 * 固有写法
 */
	public showViewComponent() {
		game.UIUtils.changeResize(1);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new majiang.MatchXZDDGameScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_MATCH_MJXZDD:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_MATCH_MJXZDD:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}