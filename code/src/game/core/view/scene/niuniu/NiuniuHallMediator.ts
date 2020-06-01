module niuniu {
	export class NiuniuHallMediator extends BaseMediator {
		public static NAME: string = "NiuniuHallMediator";
		public type: string = "scene";
		public constructor() {
			super(NiuniuHallMediator.NAME);
		}

		public viweComponent: NiuniuHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_NIUNIUSELECT,
				SceneNotify.CLOSE_NIUNIUSELECT
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new niuniu.NiuniuSGameMediator());
			this.facade.registerMediator(new niuniu.NiuniuJSGameMediator());
			this.facade.registerMediator(new niuniu.NiuniuJSMatchingMediator());
			this.facade.registerMediator(new niuniu.NiuniuMatchingMediator());
			this.facade.registerMediator(new niuniu.NiuniuRecordMeditor());

		}


		/**
	 * 固有写法
	 */
		public showViewComponent() {
			game.UIUtils.changeResize(2);
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new NiuniuHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_NIUNIUSELECT:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_NIUNIUSELECT:
					if (this.viewComponent) {
						this.closeViewComponent(1);
					}
					break;
			}

		}

	}
}