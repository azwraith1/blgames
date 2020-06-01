/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 18:31:21
 @Description: 选择游戏场景控制层
 */

class GDMJHallMediator extends BaseMediator {
	public static NAME: string = "GDMJHallMediator";
	public type: string = "scene";
	public constructor() {
		super(GDMJHallMediator.NAME);
	}

	public viewComponent: GDMJHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_GDMJ_HALL,
			SceneNotify.CLOSE_GDMJ_HALL
		];

	}

	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new majiang.GDMJGameMediator());
		this.facade.registerMediator(new majiang.GDMJMatchingMediator());
		this.facade.registerMediator(new majiang.GDMJOverMediator());
	}

	/**
	 * 固有写法
	 */
	public showViewComponent() {
		game.UIUtils.changeResize(1);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new GDMJHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}


	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_GDMJ_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_GDMJ_HALL:
				this.closeViewComponent(1);
				break;
		}

	}
}