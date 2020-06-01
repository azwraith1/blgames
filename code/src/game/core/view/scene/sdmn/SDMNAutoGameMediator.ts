// TypeScript file
module sdmn {
    export class SDMNautoGamelMediator extends BaseMediator {
        public static NAME: string = "SDMNautoGamelMediator";
        public type: string = "panel";
        public constructor() {
            super(SDMNautoGamelMediator.NAME);
        }

        public viewComponent: SDMNAutoGamePanel;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_SDMN_AUTO_PANEL,
                PanelNotify.CLOSE_SDMN_AUTO_PANEL
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
            this.viewComponent = new SDMNAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SDMN_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SDMN_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}