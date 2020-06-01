/*
 * @Author: real MC Lee 
 * @Date: 2019-06-04 16:24:40 
 * @Last Modified by:   real MC Lee 
 * @Last Modified time: 2019-06-04 16:24:40 
 * @Description: 
 */

module bskg{
    export class BSKGGameMediator extends BaseMediator{
        public static NAME: string = "BSKGGameMediator";
		public type: string = "scene";
		public constructor() {
			super(BSKGGameMediator.NAME);
		}

		public viewComponent: BSKGMainScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_BSKG,
				SceneNotify.CLOSE_BSKG
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new game.LaohujiHallMediator());
			this.facade.registerMediator(new BSKGTipsMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.CloseLaohuMediator());
			this.facade.registerMediator(new BSKGautoGamelMediator());
			this.facade.registerMediator(new MainHallMediator());
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
			this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());
			
		}

		public showViewComponent() {
			if(this.viewComponent){
				return;
			}
			this.viewComponent = new BSKGMainScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_BSKG:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_BSKG:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}