class XZDDHallBar extends game.BaseUI {
	private config;
	private dbGroup: eui.Group;
	private zhunruLabel: eui.Label;
	private dizhuLabel: eui.Label;
	private index: number;
	private gameType;
	private contentGroup: eui.Group;
	private dizhuImage: eui.Image;
	public constructor(data, index, gameType) {
		super();
		this.config = data;
		this.index = index;
		this.gameType = gameType;
		this.skinName = `XZDDHallBarSkin`;
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
		RotationLoading.instance.load(["majiang_game"], "", () => {
			CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(this.gameType), sceneId: this.config.id, diFen: this.config.bet_base, zhun: this.config.gold_min });
		});
		egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 50).to({ scaleX: 1.12, scaleY: 1.12 }, 50);
	}

	public showBarByConfig(num) {
		this.dizhuLabel.text = num.bet_base;
		this.dizhuLabel.stroke = 2;
		this.zhunruLabel.text = "准入:" + num.gold_min;

		let dbComponent: DBComponent = GameCacheManager.instance.getCache("db_mj" + this.config.icon);
		if (!dbComponent) {
			dbComponent = new DBComponent("db_mj");
			GameCacheManager.instance.setCache("db_mj" + this.config.icon, dbComponent);
		}
		dbComponent.touchEnabled = false;
		dbComponent.touchChildren = false;
		dbComponent.play("ani" + this.config.icon, -1);

		this.dbGroup.addChild(dbComponent);
		dbComponent.resetPosition();
	}
}