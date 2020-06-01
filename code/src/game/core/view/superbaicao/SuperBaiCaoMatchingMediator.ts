class SuperBaiCaoMatchingMediator extends BaseMediator {
	public static NAME: string = "SuperBaiCaoMatchingMediator";
	public type: string = "scene";
	public constructor() {
		super(SuperBaiCaoMatchingMediator.NAME);
	}

	public viweComponent: SuperBaiCaoMatchingScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_SUPERBAICAO_MATCHING,
			SceneNotify.CLOSE_SUPERBAICAO_MATCHING
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
		this.viewComponent = new SuperBaiCaoMatchingScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_SUPERBAICAO_MATCHING:
				RotationLoadingShu.instance.load(["superbaicao_game"], "", () => {
					this.showViewComponent();
				});
				break;
			case SceneNotify.CLOSE_SUPERBAICAO_MATCHING:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}