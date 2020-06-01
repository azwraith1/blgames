// TypeScript file
module bscs {
    export class BSCSAutoMediator extends BaseMediator {
        public static NAME: string = "BSCSAutoMediator";
        public type: string = "panel";
        public constructor() {
            super(BSCSAutoMediator.NAME);
        }

        public viewComponent: BSCSAutoGamePanel;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BSCS_AUTO_PANEL,
                PanelNotify.CLOSE_BSCS_AUTO_PANEL
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
            this.viewComponent = new BSCSAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_BSCS_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_BSCS_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}