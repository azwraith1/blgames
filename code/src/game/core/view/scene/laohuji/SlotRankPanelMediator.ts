/*
 * @Author: real MC Lee 
 * @Date: 2019-05-29 11:45:07 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-12-13 16:26:25
 * @Description: 
 */
module slot {
    export class SlotRankPanelMediator extends BaseMediator {
        public static NAME: string = "SlotRankPanelMediator";
        public type: string = "panel";
        public constructor() {
            super(SlotRankPanelMediator.NAME);
        }

        public viewComponent: SlotRankPanel;
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_SLOT_RANK,
                PanelNotify.CLOSE_SLOT_RANK
            ];
        }

        public onRegister() {
            super.onRegister();

        }

        public showViewComponent() {
            game.UIUtils.changeResize(1);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new SlotRankPanel();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SLOT_RANK:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SLOT_RANK:
                    this.closeViewComponent(1);
                    break;
            }
        }
    }
}