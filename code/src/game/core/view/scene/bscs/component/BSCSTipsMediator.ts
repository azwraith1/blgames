/*
 * @Author: real MC Lee 
 * @Date: 2019-05-30 15:32:14 
 * @Last Modified by:   real MC Lee 
 * @Last Modified time: 2019-05-30 15:32:14 
 * @Description: 
 */
module bscs{
    export class BSCSTipsMediator extends BaseMediator{
        public static NAME: string = "BSCSTipsMediator";
		public type: string = "panel";
		public constructor() {
			super(BSCSTipsMediator.NAME);
		}

		public viewComponent: BSCSTips;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_BSCS_TIPS_PANEL,
				PanelNotify.CLOSE_BSCS_TIPS_PANEL
			];
		}

		public onRegister() {
			super.onRegister();	
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new BSCSTips();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}	

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_BSCS_TIPS_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_BSCS_TIPS_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}