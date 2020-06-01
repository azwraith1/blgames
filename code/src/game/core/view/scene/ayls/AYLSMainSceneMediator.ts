// TypeScript file
module ayls {
    export class AYLSMainMediator extends BaseMediator {
        public static NAME: string = "AYLSMainMediator";
        public type: string = "scene";
        public constructor() {
            super(AYLSMainMediator.NAME);
        }

        public viewComponent: AYLSMainScene;
        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.OPEN_AYLS,
                SceneNotify.CLOSE_AYLS
            ];
        }

        public onRegister() {
            super.onRegister();
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new AYLSTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new AYLSAutoMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
            this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());

        }

        public showViewComponent() {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new AYLSMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case SceneNotify.OPEN_AYLS:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_AYLS:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}