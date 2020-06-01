// TypeScript file
module csd {
    export class CSDAutogameMediator extends BaseMediator {
        public static NAME: string = "CSDAutogameMediator";
        public type: string = "panel";
        public constructor() {
            super(CSDAutogameMediator.NAME);
        }

        public viewComponent: CSDAutoGame;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_CSD_AUTO_PANEL,
                PanelNotify.CLOSE_CSD_AUTO_PANEL
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
            this.viewComponent = new CSDAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_CSD_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_CSD_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}