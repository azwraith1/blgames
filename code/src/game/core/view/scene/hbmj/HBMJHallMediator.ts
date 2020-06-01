/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 18:30:40
 @Description: 选择游戏场景控制层
 */

class HBMJHallMediator extends BaseMediator {
	public static NAME: string = "HBMJHallMediator";
	public type: string = "scene";
	public constructor() {
		super(HBMJHallMediator.NAME);
	}

	public viewComponent: HBMJHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_HBMJ_HALL,
			SceneNotify.CLOSE_HBMJ_HALL
		];

	}

	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new majiang.HBMJGameMediator());
		this.facade.registerMediator(new majiang.HBMJMatchingMediator());
		this.facade.registerMediator(new majiang.HBMJOverMediator());
	}

	/**
	 * 固有写法
	 */
	public showViewComponent() {
		game.UIUtils.changeResize(1);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new HBMJHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}


	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_HBMJ_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_HBMJ_HALL:
				this.closeViewComponent(1);
				break;
		}

	}
}