// TypeScript file
module xysg {
    export class XYSGAutogameMediator extends BaseMediator {
        public static NAME: string = "XYSGAutogameMediator";
        public type: string = "panel";
        public constructor() {
            super(XYSGAutogameMediator.NAME);
        }

        public viewComponent: XYSGAutoGame;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_XYSG_AUTO_PANEL,
                PanelNotify.CLOSE_XYSG_AUTO_PANEL
            ];
        }

        public onRegister() {
            super.onRegister();
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());\

        }

        public showViewComponent() {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new XYSGAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_XYSG_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_XYSG_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}