class DZMJHallBar extends game.BaseUI {
	private config;
	private dbGroup: eui.Group;
	private titleImage: eui.Image;
	private zhunruLabel: eui.BitmapLabel;
	private zhunruImage: eui.Image;
	private difenLabel: eui.BitmapLabel;
	private difenImage: eui.Image;
	private index: number;
	private gameType;
	private touchGroup: eui.Group;
	public constructor(data, index, gameType) {
		super();
		this.config = data;
		this.index = index;
		this.gameType = gameType;
		this.skinName = new DZMJHallBarSkin();
		//	this.skinName = "resource/skins/widget/hzmj/HZMJHallBarSkin.exml";
	}

	public onAdded() {
		super.onAdded();
		game.UIUtils.setAnchorPot(this);
		this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
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
		egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
	}

	public showBarByConfig(num) {
		this.difenLabel.text = num.bet_base;
		this.zhunruLabel.text = num.gold_min;
		let dbComponent = GameCacheManager.instance.getCache(`dzmj_xc_${this.index}`) as DBComponent;
		if (!dbComponent) {
			dbComponent = new DBComponent(`dzmj_xc_${this.index}`);
			dbComponent.touchEnabled = false;
		}
		dbComponent.touchChildren = false;
		dbComponent.playDefault(0);
		this.dbGroup.addChild(dbComponent);
		dbComponent.resetPosition();
		this.titleImage.source = RES.getRes(`dzmj_scene_tip${this.index}_png`)
		this.difenImage.source = RES.getRes(`dzmj_scene_df${this.index}_png`);
		this.zhunruImage.source = RES.getRes(`dzmj_scene_zr${this.index}_png`);
		this.difenLabel.font = `dzmj_scene_difen${this.index}_fnt`;
		this.zhunruLabel.font = `dzmj_scene_zhunru${this.index}_fnt`;
	}
}