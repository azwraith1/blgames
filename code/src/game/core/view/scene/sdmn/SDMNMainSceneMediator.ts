/*
 * @Author: wangtao 
 * @Date: 2019-05-08 11:26:12 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-05-30 16:09:36
 * @Description: 
 */

module sdmn{
    export class SDMNGameMediator extends BaseMediator{
        public static NAME: string = "SDMNGameMediator";
		public type: string = "scene";
		public constructor() {
			super(SDMNGameMediator.NAME);
		}

		public viewComponent: SDMNMainScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_SDMN,
				SceneNotify.CLOSE_SDMN
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new game.LaohujiHallMediator());
			this.facade.registerMediator(new SDMNTipsMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.CloseLaohuMediator());
			this.facade.registerMediator(new SDMNautoGamelMediator());
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
			this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());
			
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new SDMNMainScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_SDMN:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_SDMN:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}