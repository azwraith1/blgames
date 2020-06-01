class GDMJHallBar extends game.BaseUI {
	private config;
	private dbGroup: eui.Group;
	private zhunruLabel: eui.Label;
	private dizhuLabel: eui.BitmapLabel;
	private index: number;
	private gameType;
	public constructor(data, index, gameType) {
		super();
		this.config = data;
		this.index = index;
		this.gameType = gameType;
		this.skinName = new GDMJHallBarSkin();
	}

	public onAdded() {
		super.onAdded();
		game.UIUtils.setAnchorPot(this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
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
		RotationLoading.instance.load(["gdmj_game"], "", () => {
			CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(this.gameType), sceneId: this.config.id, diFen: this.config.bet_base, zhun: this.config.gold_min });
		});
		egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
	}

	public showBarByConfig(num) {
		this.dizhuLabel.text = "dz:" + num.bet_base;
		this.zhunruLabel.text = "准入:" + num.gold_min;
		let dbComponent = GameCacheManager.instance.getCache(`gdmj_xc_${this.index}`) as DBComponent;
		if (!dbComponent) {
			dbComponent = new DBComponent(this.getDBName());
			dbComponent.touchEnabled = false;
		}
		dbComponent.playByFilename(0);
		this.dbGroup.addChild(dbComponent);
		dbComponent.resetPosition();
	}


	private getDBName() {
		switch (this.index) {
			case 1:
				return `gdmj_cjc`;
			case 2:
				return `gdmj_zjc`;
			case 3:
				return `gdmj_gjc`;
			case 4:
				return `gdmj_thc`;

		}
	}
}