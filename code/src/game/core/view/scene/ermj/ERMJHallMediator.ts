/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-14 10:38:19
 @Description: 选择游戏场景控制层
 */

module majiang {
	export class ERMJHallMediator extends BaseMediator {
		public static NAME: string = "ERMJHallMediator";
		public type: string = "scene";
		public constructor() {
			super(ERMJHallMediator.NAME);
		}

		public viewComponent: ERMJHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_ERMJ_HALL,
				SceneNotify.CLOSE_ERMJ_HALL
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new ERMJGameMediator());
			this.facade.registerMediator(new ERMJMatchingMediator());
			this.facade.registerMediator(new ERMJOverMediator());
		}

		/**
		 * 固有写法
		 */
		public showViewComponent() {
			game.UIUtils.changeResize(1);
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new ERMJHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}


		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_ERMJ_HALL:
					RES.loadGroup("majiang_game");
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_ERMJ_HALL:
					this.closeViewComponent(1);
					break;
			}

		}
	}
}