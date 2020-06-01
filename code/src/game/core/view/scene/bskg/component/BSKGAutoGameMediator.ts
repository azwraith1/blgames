// TypeScript file
module bskg {
    export class BSKGautoGamelMediator extends BaseMediator {
        public static NAME: string = "BSKGautoGamelMediator";
        public type: string = "panel";
        public constructor() {
            super(BSKGautoGamelMediator.NAME);
        }

        public viewComponent: BSKGAutoGamePanel;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BSKG_AUTO_PANEL,
                PanelNotify.CLOSE_BSKG_AUTO_PANEL
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
            this.viewComponent = new BSKGAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_BSKG_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_BSKG_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}