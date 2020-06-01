/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-08 17:27:18
 @Description: 选择游戏场景控制层
 */

module majiang {
	export class XLCHHallMediator extends BaseMediator {
		public static NAME: string = "XLCHHallMediator";
		public type: string = "scene";
		public constructor() {
			super(XLCHHallMediator.NAME);
		}

		public viewComponent: XLCHHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_MJXLCH_HALL,
				SceneNotify.CLOSE_MJXLCH_HALL
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new majiang.XLCHMatchingMediator());
			this.facade.registerMediator(new majiang.XLCHMediator());
			this.facade.registerMediator(new majiang.XLCHOverMediator());
			this.facade.registerMediator(new majiang.GameRecordMediator())
		}

		/**
		 * 固有写法
		 */
		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			game.UIUtils.changeResize(1);
			this.viewComponent = new XLCHHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}


		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_MJXLCH_HALL:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_MJXLCH_HALL:
					this.closeViewComponent(1);
					break;
			}

		}
	}
}