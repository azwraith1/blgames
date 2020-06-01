// TypeScript file
module bscs {
    export class BSCSMainMediator extends BaseMediator {
        public static NAME: string = "BSCSMainMediator";
        public type: string = "scene";
        public constructor() {
            super(BSCSMainMediator.NAME);
        }

        public viewComponent: BSCSMainScene;
        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.OPEN_BSCS,
                SceneNotify.CLOSE_BSCS
            ];
        }

        public onRegister() {
            super.onRegister();
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new BSCSTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new BSCSAutoMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());

        }

        public showViewComponent() {
            if(this.viewComponent){
				return;
			}
            this.viewComponent = new BSCSMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case SceneNotify.OPEN_BSCS:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_BSCS:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}