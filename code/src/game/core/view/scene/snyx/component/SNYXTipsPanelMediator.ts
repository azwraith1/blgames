module snyx{
    export class SNYXTipsPanelMediator extends BaseMediator{
        public static NAME: string = "SNYXTipsPanelMediator";
		public type: string = "panel";
		public constructor() {
			super(SNYXTipsPanelMediator.NAME);
		}

		public viewComponent: SNYXTipsPanel;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_SNYX_TIPS_PANEL,
				PanelNotify.CLOSE_SNYX_TIPS_PANEL
			];
		}

		public onRegister() {
			super.onRegister();	
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new SNYXTipsPanel();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}	

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_SNYX_TIPS_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_SNYX_TIPS_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}