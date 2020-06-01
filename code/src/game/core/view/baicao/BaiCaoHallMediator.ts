// TypeScript file
class BaiCaoHallMediator extends BaseMediator {
	public static NAME: string = "BaiCaoHallMediator";
	public type: string = "scene";
	public constructor() {
		super(BaiCaoHallMediator.NAME);
	}

	public viweComponent: BaiCaoHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_BAICAO_HALL,
			SceneNotify.CLOSE_BAICAO_HALL
		];

	}

	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new BaiCaoMatchingMediator());
		this.facade.registerMediator(new BaiCaoGameMediator());
	}


	/**
 * 固有写法
 */
	public showViewComponent() {
		game.UIUtils.changeResize(2);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new BaiCaoHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}

	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_BAICAO_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_BAICAO_HALL:
				if (this.viewComponent) {
					this.closeViewComponent(1);
				}
				break;
		}

	}
}