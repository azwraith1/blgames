/*
 * @Author: real MC Lee 
 * @Date: 2019-05-30 15:32:14 
 * @Last Modified by:   real MC Lee 
 * @Last Modified time: 2019-05-30 15:32:14 
 * @Description: 
 */
module gdzw{
    export class GDZWTipsMediator extends BaseMediator{
        public static NAME: string = "GDZWTipsMediator";
		public type: string = "panel";
		public constructor() {
			super(GDZWTipsMediator.NAME);
		}

		public viewComponent: GDZWTips;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_GDZW_TIPS_PANEL,
				PanelNotify.CLOSE_GDZW_TIPS_PANEL
			];
		}

		public onRegister() {
			super.onRegister();	
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new GDZWTips();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}	

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_GDZW_TIPS_PANEL:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_GDZW_TIPS_PANEL:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}