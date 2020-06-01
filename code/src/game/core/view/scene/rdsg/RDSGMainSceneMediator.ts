
module rdsg{
    export class RDSGMainSceneMediator extends BaseMediator{
        public static NAME: string = "RDSGMainSceneMediator";
		public type: string = "scene";
		public constructor() {
			super(RDSGMainSceneMediator.NAME);
		}

		public viewComponent: RDSGMainScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_RDSG,
				SceneNotify.CLOSE_RDSG
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new game.LaohujiHallMediator());
			this.facade.registerMediator(new RDSGTipsMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.CloseLaohuMediator());
			this.facade.registerMediator(new RDSGAutoMediator());
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
			
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new RDSGMainScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_RDSG:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_RDSG:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}