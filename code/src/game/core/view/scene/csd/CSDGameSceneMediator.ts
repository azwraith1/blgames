// TypeScript file
module csd {
    export class CSDMainMediator extends BaseMediator {
        public static NAME: string = "CSDMainMediator";
        public type: string = "scene";
        public constructor() {
            super(CSDMainMediator.NAME);
        }

        public viewComponent: CSDGameScene;
        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.OPEN_CSD,
                SceneNotify.CLOSE_CSD
            ];
        }

        public onRegister() {
            super.onRegister();
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new CSDAutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());

        }

        public showViewComponent() {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new CSDGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case SceneNotify.OPEN_CSD:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_CSD:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}