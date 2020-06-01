class BaiCaoGameMediator extends BaseMediator {
	public static NAME: string = "BaiCaoGameMediator";
	public type: string = "scene";
	public constructor() {
		super(BaiCaoGameMediator.NAME);
	}

	public viweComponent: BaiCaoGameScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_BAICAO_GAME,
			SceneNotify.CLOSE_BAICAO_GAME
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
		//RES.loadGroup("baicao_back");
		this.viewComponent = new BaiCaoGameScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_BAICAO_GAME:
				RotationLoadingShu.instance.load(["baicao_game"], "", () => {
					this.showViewComponent();
				});
				break;
			case SceneNotify.CLOSE_BAICAO_GAME:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}