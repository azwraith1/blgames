// TypeScript file
module ayls {
    export class AYLSAutoMediator extends BaseMediator {
        public static NAME: string = "AYLSAutoMediator";
        public type: string = "panel";
        public constructor() {
            super(AYLSAutoMediator.NAME);
        }

        public viewComponent: AYLSAutoGamePanel;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_AYLS_AUTO_PANEL,
                PanelNotify.CLOSE_AYLS_AUTO_PANEL
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
            this.viewComponent = new AYLSAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_AYLS_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_AYLS_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}