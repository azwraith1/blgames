// TypeScript file
module zcjl {
    export class ZCJLMainMediator extends BaseMediator {
        public static NAME: string = "ZCJLMainMediator";
        public type: string = "scene";
        public constructor() {
            super(ZCJLMainMediator.NAME);
        }

        public viewComponent: ZCJLGameScene;
        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.OPEN_ZCJL,
                SceneNotify.CLOSE_ZCJL
            ];
        }

        public onRegister() {
            super.onRegister();
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new ZCJLAutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());

        }

        public showViewComponent() {
            if(this.viewComponent){
				return;
			}
            this.viewComponent = new ZCJLGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case SceneNotify.OPEN_ZCJL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_ZCJL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}