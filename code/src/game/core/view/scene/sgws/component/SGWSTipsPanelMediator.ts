module sgws{
    export class SGWSTipsPanelMediator extends BaseMediator{
        public static NAME: string = "SGWSTipsPanelMediator";
		public type: string = "panel";
		public constructor() {
			super(SGWSTipsPanelMediator.NAME);
		}

		public viewComponent: SGWSTipsPanel;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_SGWS_TIPS_PANEL,
				PanelNotify.CLOSE_SGWS_TIPS_PANEL
			];
		}

		public onRegister() {
			super.onRegister();	
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new SGWSTipsPanel();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}	

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_SGWS_TIPS_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_SGWS_TIPS_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}