module majiang {
	export class HZMJHallMedior extends BaseMediator {
		public static NAME: string = "HZMJHallMediator";
		public type: string = "scene";
		public constructor() {
			super(HZMJHallMedior.NAME);
		}

		public viewComponent: HZMJHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_HZMJ_HALL,
				SceneNotify.CLOSE_HZMJ_HALL
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new majiang.HZMJGameMediator());
			this.facade.registerMediator(new majiang.HZMJMathingMedior());
			this.facade.registerMediator(new majiang.HZMJOverMedior());
			this.facade.registerMediator(new majiang.HZMJGameRecordMediator());
			this.facade.registerMediator(new majiang.HZMJHelpMediator());
		}

		/**
		 * 固有写法
		 */
		public showViewComponent() {
			game.UIUtils.changeResize(1);
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new HZMJHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}


		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_HZMJ_HALL:
					RES.loadGroup("majiang_game");
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_HZMJ_HALL:
					this.closeViewComponent(1);
					break;
			}

		}
	}
}