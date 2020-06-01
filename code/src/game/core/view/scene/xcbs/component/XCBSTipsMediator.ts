module xcbs{
    export class XCBSTipsMediator extends BaseMediator{
        public static NAME: string = "XCBSTipsMediator";
		public type: string = "panel";
		public constructor() {
			super(XCBSTipsMediator.NAME);
		}

		public viewComponent: XCBSTipsPanel;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_XCBS_TIPS_PANEL,
				PanelNotify.CLOSE_XCBS_TIPS_PANEL
			];
		}

		public onRegister() {
			super.onRegister();	
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new XCBSTipsPanel();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}	

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_XCBS_TIPS_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_XCBS_TIPS_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}