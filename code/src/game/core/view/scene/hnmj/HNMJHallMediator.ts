/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 18:31:35
 @Description: 选择游戏场景控制层
 */

class HNMJHallMediator extends BaseMediator {
	public static NAME: string = "HNMJHallMediator";
	public type: string = "scene";
	public constructor() {
		super(HNMJHallMediator.NAME);
	}

	public viewComponent: HNMJHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_HNMJ_HALL,
			SceneNotify.CLOSE_HNMJ_HALL
		];

	}

	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new majiang.HNMJGameMediator());
		this.facade.registerMediator(new majiang.HNMJMatchingMediator());
		this.facade.registerMediator(new majiang.HNMJOverMediator());
	}

	/**
	 * 固有写法
	 */
	public showViewComponent() {
		game.UIUtils.changeResize(1);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new HNMJHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}


	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_HNMJ_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_HNMJ_HALL:
				this.closeViewComponent(1);
				break;
		}

	}
}