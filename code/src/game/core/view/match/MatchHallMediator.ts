class MatchHallMediator extends BaseMediator {
	public static NAME: string = "MatchHallMediator";
	public type: string = "scene";
	public constructor() {
		super(MatchHallMediator.NAME);
	}

	public viweComponent: MatchHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_MATCH_HALL,
			SceneNotify.CLOSE_MATCH_HALL
		];

	}

	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new MatchXZDDMediator());
	}

	/**
 * 固有写法
 */
	public showViewComponent() {
		game.UIUtils.changeResize(1);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new MatchHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_MATCH_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_MATCH_HALL:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}