// TypeScript file
module lucky7 {
    export class LUCKY7AutogameMediator extends BaseMediator {
        public static NAME: string = "LUCKY7AutogameMediator";
        public type: string = "panel";
        public constructor() {
            super(LUCKY7AutogameMediator.NAME);
        }

        public viewComponent: LUCKY7AutoGame;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_LUCKY7_AUTO_PANEL,
                PanelNotify.CLOSE_LUCKY7_AUTO_PANEL
            ];
        }

        public onRegister() {
            super.onRegister();
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());

        }

        public showViewComponent() {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new LUCKY7AutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_LUCKY7_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_LUCKY7_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}