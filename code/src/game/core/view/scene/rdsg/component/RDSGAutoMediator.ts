// TypeScript file
module rdsg {
    export class RDSGAutoMediator extends BaseMediator {
        public static NAME: string = "RDSGAutoMediator";
        public type: string = "panel";
        public constructor() {
            super(RDSGAutoMediator.NAME);
        }

        public viewComponent: RDSGAutoGame;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_RDSG_AUTO_PANEL,
                PanelNotify.CLOSE_RDSG_AUTO_PANEL
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
            this.viewComponent = new RDSGAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_RDSG_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_RDSG_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}