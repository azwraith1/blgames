// TypeScript file
module lucky7 {
    export class LUCKY7MainMediator extends BaseMediator {
        public static NAME: string = "LUCKY7MainMediator";
        public type: string = "scene";
        public constructor() {
            super(LUCKY7MainMediator.NAME);
        }

        public viewComponent: LUCKY7GameScene;
        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.OPEN_LUCKY7,
                SceneNotify.CLOSE_LUCKY7
            ];
        }

        public onRegister() {
            super.onRegister();
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new LUCKY7AutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());

        }

        public showViewComponent() {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new LUCKY7GameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case SceneNotify.OPEN_LUCKY7:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_LUCKY7:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}