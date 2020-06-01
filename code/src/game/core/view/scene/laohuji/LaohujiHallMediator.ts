/*
 * @Author: real MC Lee 
 * @Date: 2019-05-29 11:45:07 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-12-13 16:23:19
 * @Description: 
 */
module game {
	export class LaohujiHallMediator extends BaseMediator {
		public static NAME: string = "LaohujiHallMediator";
		public type: string = "scene";
		public constructor() {
			super(LaohujiHallMediator.NAME);
		}

		public viewComponent: slot.SlotHallScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_LAOHUJI_HALL,
				SceneNotify.CLOSE_LAOHUJI_HALL
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new DNTGGameMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new sdxl.SDXLGameMediator())
			this.facade.registerMediator(new cbzz.CBZZGameMediator())
			this.facade.registerMediator(new sdmn.SDMNGameMediator())
			this.facade.registerMediator(new bskg.BSKGGameMediator())
			this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
			this.facade.registerMediator(new rdsg.RDSGMainSceneMediator());
			this.facade.registerMediator(new ayls.AYLSMainMediator());
			this.facade.registerMediator(new gdzw.GDZWMainMediator());
			this.facade.registerMediator(new bscs.BSCSMainMediator());
			this.facade.registerMediator(new ceby.CEBYMainMediator());
			this.facade.registerMediator(new zcjl.ZCJLMainMediator());
			this.facade.registerMediator(new wszw.WSZWMainMediator());
			this.facade.registerMediator(new lucky7.LUCKY7MainMediator());
			this.facade.registerMediator(new csd.CSDMainMediator());
			this.facade.registerMediator(new xysg.XYSGMainMediator());
			this.facade.registerMediator(new xcbs.XCBSMainMediator());
			this.facade.registerMediator(new sgws.SGWSMainMediator());
			this.facade.registerMediator(new slot.SlotRankPanelMediator());
			this.facade.registerMediator(new snyx.SNYXMainMediator());
		}

		public showViewComponent() {
			game.UIUtils.changeResize(1);
			if (this.viewComponent) {
				return;
			}
			this.viewComponent = new slot.SlotHallScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_LAOHUJI_HALL:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_LAOHUJI_HALL:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}