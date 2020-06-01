module majiang {
    export class HZMJGameMediator extends BaseMediator {
        public static NAME: string = "HZMJGameMediator";
        public type: string = "scene";
        public constructor() {
            super(HZMJGameMediator.NAME);
        }

        public viewComponent: HZMJGameScene;
        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.OPEN_HZMJ,
                SceneNotify.CLOSE_HZMJ,
                SceneNotify.FLUSH_HZMJ
            ];
        }

        public onRegister() {
            super.onRegister();
        }

        public showViewComponent() {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new HZMJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case SceneNotify.OPEN_HZMJ:
                    RotationLoading.instance.load(["hzmj_game"], "", () => {
                        RES.loadGroup("hzmj_back");
                        this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_HZMJ:
                    this.closeViewComponent(1);
                    break;
                case SceneNotify.FLUSH_HZMJ:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                        // Global.gameProxy.clearRoomInfo();
                        this.showViewComponent();
                    }
                    break;
            }
        }
    }
}