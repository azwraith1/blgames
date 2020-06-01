class SuperBaiCaoHallMediator extends BaseMediator{
	public static NAME: string = "SuperBaiCaoHallMediator";
	public type: string = "scene";
	public constructor() {
		super(SuperBaiCaoHallMediator.NAME);
	}

	public viweComponent: SuperBaiCaoHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_SUPERBAICAO_HALL,
			SceneNotify.CLOSE_SUPERBAICAO_HALL
		];

	}

	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new SuperBaiCaoMatchingMediator());
		this.facade.registerMediator(new SuperBaiCaoGameMediator());
	}


	/**
 * 固有写法
 */
	public showViewComponent() {
		game.UIUtils.changeResize(2);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new SuperBaiCaoHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_SUPERBAICAO_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_SUPERBAICAO_HALL:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}