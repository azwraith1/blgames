// TypeScript file
module zcjl {
    export class ZCJLAutogameMediator extends BaseMediator {
        public static NAME: string = "ZCJLAutogameMediator";
        public type: string = "panel";
        public constructor() {
            super(ZCJLAutogameMediator.NAME);
        }

        public viewComponent: ZCJLAutoGame;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_ZCJL_AUTO_PANEL,
                PanelNotify.CLOSE_ZCJL_AUTO_PANEL
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
            this.viewComponent = new ZCJLAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_ZCJL_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_ZCJL_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}