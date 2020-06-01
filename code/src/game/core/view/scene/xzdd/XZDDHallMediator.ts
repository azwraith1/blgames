/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-08 17:27:46
 @Description: 选择游戏场景控制层
 */

module majiang {
	export class XZDDHallMediator extends BaseMediator {
		public static NAME: string = "XZDDHallMediator";
		public type: string = "scene";
		public constructor() {
			super(XZDDHallMediator.NAME);
		}

		public viewComponent: XZDDHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_MJXZDD_HALL,
				SceneNotify.CLOSE_MJXZDD_HALL
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new XZDDMatchingMediator());
			this.facade.registerMediator(new XZDDGameMediator());
			this.facade.registerMediator(new XZDDOverMediator());
		}

		/**
		 * 固有写法
		 */
		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			game.UIUtils.changeResize(1);
			this.viewComponent = new XZDDHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}


		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_MJXZDD_HALL:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_MJXZDD_HALL:
					this.closeViewComponent(1);
					break;
			}

		}
	}
}