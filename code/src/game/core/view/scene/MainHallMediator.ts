class MainHallMediator extends BaseMediator {
	public static NAME: string = "MainHallMediator";
	public type: string = "scene";
	public constructor() {
		super(MainHallMediator.NAME);
	}

	public viewComponent: any;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_MAIN_HALL,
			SceneNotify.CLOSE_MAIN_HALL
		];

	}


	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new majiang.DZMJHallMediator());
		this.facade.registerMediator(new niuniu.NiuniuHallMediator());
		this.facade.registerMediator(new niuniu.NiuniuHallMediator_Landscape());
		this.facade.registerMediator(new sangong.SangongHallMediator());
		//	this.facade.registerMediator(new sangong.SangongHallMediatorHorizon());
		this.facade.registerMediator(new rbwar.RBWarHallMediator());
		this.facade.registerMediator(new HelpShuMediator());
		this.facade.registerMediator(new HelpMediator());
		this.facade.registerMediator(new SettingMediator());
		this.facade.registerMediator(new game.LaohujiHallMediator());
		this.facade.registerMediator(new game.CloseLaohuMediator());
		this.facade.registerMediator(new rbwar.RBWarHallMediator());
		this.facade.registerMediator(new zajinhua.ZajinhuaHallSceneMediator());
		this.facade.registerMediator(new bjle.BJLGameSceneMediator());
		this.facade.registerMediator(new bjle.BJLHallSceneMediator());
		this.facade.registerMediator(new BlackJackHallMediator());
		this.facade.registerMediator(new BaseRecordMediator());
		this.facade.registerMediator(new GDMJHallMediator());
		this.facade.registerMediator(new HNMJHallMediator());
		this.facade.registerMediator(new majiang.XLCHHallMediator());
		this.facade.registerMediator(new majiang.HZMJHallMedior());
		this.facade.registerMediator(new majiang.XZDDHallMediator());
		this.facade.registerMediator(new majiang.SCMJHallMediator());
		this.facade.registerMediator(new HBMJHallMediator());
		this.facade.registerMediator(new majiang.GYZJHallMediator());
		this.facade.registerMediator(new majiang.ERMJHallMediator());
		this.facade.registerMediator(new BDZHallSceneMediator());
		this.facade.registerMediator(new MatchHallMediator());
		this.facade.registerMediator(new ClubHallMediator());
		this.facade.registerMediator(new BaiCaoHallMediator());
		this.facade.registerMediator(new SuperBaiCaoHallMediator());
	}


	/**
	 * 固有写法
	 */
	public showViewComponent() {
		game.UIUtils.changeResize(1);
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new MainHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}


	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_MAIN_HALL:
				RotationLoading.instance.load(["main"], "", () => {
					this.showViewComponent();
				});
				break;
			case SceneNotify.CLOSE_MAIN_HALL:
				this.closeViewComponent(1);
				break;
		}

	}
}



