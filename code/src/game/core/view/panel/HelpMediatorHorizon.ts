class HelpMediatorHorizon extends BaseMediator {
    public static NAME: string = "HelpMediatorHorizon";
    public type: string = "panel";
    public constructor(viewComponent: any = null) {
        super(HelpMediatorHorizon.NAME, viewComponent);
    }
    public viewComponent: HelpPanelHorizon;
    public listNotificationInterests(): Array<any> {
        return [
            PanelNotify.OPEN_HELP_SHU_HORIZON,
            PanelNotify.CLOSE_HELP_SHU_HORIZON
        ];
    }

    public onRegister() {
        super.onRegister();
    }

    public showViewComponent(type) {
        game.UIUtils.changeResize(1);
        if (this.viewComponent) {
            return;
        }
        RotationLoading.instance.load(["help"], "", () => {
            this.viewComponent = new HelpPanelHorizon(type);
            LogUtils.logD("横板" + this.viewComponent.skinName + "宽:" + this.viewComponent.width, "高：" + this.viewComponent.height);
            this.showUI(this.viewComponent, false, 0, 0, 0);
        });
    }

    public handleNotification(notification: puremvc.INotification): void {
        switch (notification.getName()) {
            case PanelNotify.OPEN_HELP_SHU_HORIZON:
                let type = notification.getBody().type;
                this.showViewComponent(type);
                break;
            case PanelNotify.CLOSE_HELP_SHU_HORIZON:
                this.closeViewComponent(1);
                break;

        }
    }
}