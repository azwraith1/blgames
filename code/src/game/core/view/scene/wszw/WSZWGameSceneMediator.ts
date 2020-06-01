// TypeScript file
module wszw {
    export class WSZWMainMediator extends BaseMediator {
        public static NAME: string = "WSZWMainMediator";
        public type: string = "scene";
        public constructor() {
            super(WSZWMainMediator.NAME);
        }

        public viewComponent: WSZWGameScene;
        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.OPEN_WSZW,
                SceneNotify.CLOSE_WSZW
            ];
        }

        public onRegister() {
            super.onRegister();
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new WSZWAutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());

        }

        public showViewComponent() {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new WSZWGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case SceneNotify.OPEN_WSZW:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_WSZW:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}