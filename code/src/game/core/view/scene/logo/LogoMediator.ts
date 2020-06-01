
module game {
	export class LogoMediator extends BaseMediator {
		public static NAME: string = "LogoMediator";
		public type: string = "scene";
		public constructor() {
			super(LogoMediator.NAME);
		}

		public viewComponent: BaseLoginScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_LOADING,
				SceneNotify.CLOSE_LOADING
			];
		}
		/**
		 * 这里是注册的意思
		 */
		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new UserHeaderMediator());
		}

		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			let webviewType = Utils.getURLQueryString("webview")
			let gid = Utils.getURLQueryString("gid")
			let scene = Utils.getURLQueryString("scene")
			if (webviewType == "app" && gid == "slot" && scene != undefined) {
				this.viewComponent = new BaseSlotLoadingScene(scene);
			} else {
				this.viewComponent = new LogoScene();
			}
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_LOADING:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_LOADING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}