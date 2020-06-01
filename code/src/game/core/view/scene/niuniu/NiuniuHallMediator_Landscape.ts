module niuniu {
	export class NiuniuHallMediator_Landscape extends BaseMediator {
		public static NAME: string = "NiuniuHallMediator_Landscape";
		public type: string = "scene";
		public constructor() {
			super(NiuniuHallMediator_Landscape.NAME);
		}

		public viweComponent: NiuniuHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_NIUNIUSELECT_LANDSCAPE,
				SceneNotify.CLOSE_NIUNIUSELECT_LANDSCAPE
			];

		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new niuniu.NiuniuSGameMediator());
			this.facade.registerMediator(new niuniu.NiuniuMatchingMediator());
			this.facade.registerMediator(new niuniu.NiuniuRecordMeditorHorizon());
		}


		/**
	 * 固有写法
	 */
		public showViewComponent() {
			game.UIUtils.changeResize(1);
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new NiuniuHallScene_Landscape();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_NIUNIUSELECT_LANDSCAPE:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_NIUNIUSELECT_LANDSCAPE:
					if (this.viewComponent) {
						this.closeViewComponent(1);
					}
					break;
			}

		}


	}
}