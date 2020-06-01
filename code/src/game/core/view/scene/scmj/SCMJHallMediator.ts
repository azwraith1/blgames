/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:36:22 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-08 17:27:38
 @Description: 选择游戏场景控制层
 */

module majiang {
	export class SCMJHallMediator extends BaseMediator {
		public static NAME: string = "SCMJHallMediator";
		public type: string = "scene";
		public constructor() {
			super(SCMJHallMediator.NAME);
		}

		public viewComponent: SCMJHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SCMJ_HALL,
				SceneNotify.CLOSE_SCMJ_HALL
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new SCMJMatchingMediator());
			this.facade.registerMediator(new SCMJGameMediator());
			this.facade.registerMediator(new SCMJOverMediator());
		}

		/**
		 * 固有写法
		 */
		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			game.UIUtils.changeResize(1);
			this.viewComponent = new SCMJHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}


		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SCMJ_HALL:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_SCMJ_HALL:
					this.closeViewComponent(1);
					break;
			}

		}
	}
}