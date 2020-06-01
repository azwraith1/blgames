// TypeScript file
module xysg {
    export class XYSGMainMediator extends BaseMediator {
        public static NAME: string = "XYSGMainMediator";
        public type: string = "scene";
        public constructor() {
            super(XYSGMainMediator.NAME);
        }

        public viewComponent: XYSGGameScene;
        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.OPEN_XYSG,
                SceneNotify.CLOSE_XYSG
            ];
        }

        public onRegister() {
            super.onRegister();
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new XYSGAutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());

        }

        public showViewComponent() {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new XYSGGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case SceneNotify.OPEN_XYSG:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_XYSG:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}