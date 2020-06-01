class GYZJHallBar extends  game.BaseUI {
    protected config;
    protected index: number;
    protected gameType;
	public zhunRuLable: eui.Label;
	public dbGroup: eui.Group;
	public titleImage: eui.Image;
	public diZhuTxt: eui.Label;
	public touchCom: eui.Component;

	public touchRect5: eui.Rect;

	public constructor(data, index, gameType) {
		super();
		this.config = data;
		this.index = index;
		this.gameType = gameType;
		//	this.skinName = new DZMJHallBarSkin();
		this.skinName = "resource/skins/widget/gyzj/GYZJHallBarSkin.exml";

	}

	public onAdded() {
		super.onAdded();
		game.UIUtils.setAnchorPot(this);
		this.touchRect5.touchEnabled = true;
		this.touchRect5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
	}

	public createChildren() {
		super.createChildren();
		this.showBarByConfig(this.config);
	}


	private lock: boolean = false;
	private onTouchEnded() {
		majiang.MajiangUtils.playClick();//管理声音的
		if (!this.config.enable) {
			Global.alertMediator.addAlert("即将开放,敬请期待", null, null, true);
			return;
		}
		if (this.lock) {
			return;
		}
		this.lock = true;
		egret.setTimeout(function () {
			this.lock = false
		}, this, 1000);
		let playerGold = Global.playerProxy.playerData.gold;
		if (playerGold < this.config.gold_min) {
			let text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
			Global.alertMediator.addAlert(text, null, null, true);
			return;
		}

		RotationLoading.instance.load(["gyzjmj_game"], "", () => {
			CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(this.gameType), sceneId: this.config.id, diFen: this.config.bet_base, zhun: this.config.gold_min });
		});
		egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);//50
	}

	public showBarByConfig(num) {
		this.diZhuTxt.text = "底注:" + num.bet_base;
		this.zhunRuLable.text = "准入:" + num.gold_min;
		//this.setChildrenSortMode(num);
		let dbComponent = GameCacheManager.instance.getCache(this.DBName);
		if (!dbComponent) {
			dbComponent = new DBComponent(this.DBName);
			dbComponent.touchEnabled = false;
		}
		dbComponent.playByFilename(0);
		this.dbGroup.addChild(dbComponent);
		this.dbGroup.touchEnabled = false;
		this.dbGroup.touchChildren = false;
		//this.dbGroup.width=270;
		dbComponent.resetPosition();
		//this.setChildIndex(this.touchCom,this.numChildren);
		//this.titleImage.source = RES.getRes(`hzmj_scene_tip${this.index}_png`)
		// this.difenImage.source = RES.getRes(`dzmj_scene_df${this.index}_png`);
		// this.zhunruImage.source = RES.getRes(`dzmj_scene_zr${this.index}_png`);
		// this.difenLabel.font = `dzmj_scene_difen${this.index}_fnt`;
		// this.zhunruLabel.font = `dzmj_scene_zhunru${this.index}_fnt`;
	}
	private get DBName() {
		switch (this.index) {
			case 1:
				return `gyzj_xsc`;
			case 2:
				return `gyzj_zjc`;
			case 3:
				return `gyzj_gjc`;
			case 4:
				return `gyzj_thc`;
		}
	}
}