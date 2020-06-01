// TypeScript file
module wszw {
    export class WSZWAutogameMediator extends BaseMediator {
        public static NAME: string = "WSZWAutogameMediator";
        public type: string = "panel";
        public constructor() {
            super(WSZWAutogameMediator.NAME);
        }

        public viewComponent: WSZWAutoGame;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_WSZW_AUTO_PANEL,
                PanelNotify.CLOSE_WSZW_AUTO_PANEL
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
            this.viewComponent = new WSZWAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_WSZW_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_WSZW_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}