class SuperBaiCaoGameMediator extends BaseMediator{
	public static NAME: string = "SuperBaiCaoGameMediator";
	public type: string = "scene";
	public constructor() {
		super(SuperBaiCaoGameMediator.NAME);
	}

	public viweComponent: SuperBaiCaoGameScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_SUPERBAICAO_GAME,
			SceneNotify.CLOSE_SUPERBAICAO_GAME
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
		this.viewComponent = new SuperBaiCaoGameScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_SUPERBAICAO_GAME:
				RotationLoadingShu.instance.load(["superbaicao_game"], "", () => {
					this.showViewComponent();
				});
				break;
			case SceneNotify.CLOSE_SUPERBAICAO_GAME:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}