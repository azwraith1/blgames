class BaiCaoMatchingMediator extends BaseMediator {
	public static NAME: string = "BaiCaoMatchingMediator";
	public type: string = "scene";
	public constructor() {
		super(BaiCaoMatchingMediator.NAME);
	}

	public viweComponent: BaiCaoMatchingScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_BAICAO_MATCHING,
			SceneNotify.CLOSE_BAICAO_MATCHING
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
		this.viewComponent = new BaiCaoMatchingScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_BAICAO_MATCHING:
				RotationLoadingShu.instance.load(["baicao_game"], "", () => {
				//	RES.loadGroup("baicao_back");
					this.showViewComponent();
				});
				break;
			case SceneNotify.CLOSE_BAICAO_MATCHING:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}