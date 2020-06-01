/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 18:31:14
 @Description: 选择游戏场景控制层
 */

module majiang {
	export class DZMJHallMediator extends BaseMediator {
		public static NAME: string = "DZMJHallMediator";
		public type: string = "scene";
		public constructor() {
			super(DZMJHallMediator.NAME);
		}

		public viewComponent: DZMJHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_DZMJ_HALL,
				SceneNotify.CLOSE_DZMJ_HALL
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new majiang.DZMJGameMediator());
			this.facade.registerMediator(new majiang.DZMJMatchingMediator());
			this.facade.registerMediator(new majiang.DZMJOverMediator());
			this.facade.registerMediator(new dzmj.DZMJGameRecordMediator());
			this.facade.registerMediator(new dzmj.DZMJHelpMediator());
		}

		/**
		 * 固有写法
		 */
		public showViewComponent() {
			game.UIUtils.changeResize(1);
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new DZMJHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}


		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_DZMJ_HALL:
					RES.loadGroup("majiang_game");
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_DZMJ_HALL:
					this.closeViewComponent(1);
					break;
			}

		}
	}
}