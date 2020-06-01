/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-21 17:56:16
 @Description: 选择游戏场景控制层
 */

module majiang {
	export class GYZJHallMediator extends BaseMediator {
		public static NAME: string = "GYZJHallMediator";
		public type: string = "scene";
		public constructor() {
			super(GYZJHallMediator.NAME);
		}

		public viewComponent: GYZJHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GYZJMJ_HALL,
				SceneNotify.CLOSE_GYZJMJ_HALL
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new majiang.GYZJMatchingMediator());
			this.facade.registerMediator(new majiang.GYZJGameMediator());
			this.facade.registerMediator(new majiang.GYZJOverMediator());
			this.facade.registerMediator(new majiang.GameRecordMediator())
		}

		/**
		 * 固有写法
		 */
		public showViewComponent() {
			game.UIUtils.changeResize(1);
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new GYZJHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}


		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_GYZJMJ_HALL:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_GYZJMJ_HALL:
					this.closeViewComponent(1);
					break;
			}

		}
	}
}