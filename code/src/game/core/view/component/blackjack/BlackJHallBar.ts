class BlackJHallBar extends game.BaseUI {
	private zhunruLabel: eui.Label;
	private difenImage: eui.Image;
	private dbGroup: eui.Group;
	private bottomScore: eui.BitmapLabel;
	private config;
	private mc: DBComponent;
	private fenGroup: eui.Group;
	private index: number;
	private gameId: any;
	private sceneindex: any;
	private zhunruImage: eui.Image;
	public constructor() {
		super();
		this.skinName = `BlackJHallBarSkin${CF.tis}`;
	}


	public showBarByConfig(config, index, color) {
		this.index = index;
		let name = this.getEffectNameByIndex(index);
		let mc: DBComponent = GameCacheManager.instance.getCache(name + index);
		if (!mc) {
			mc = new DBComponent(name);
			GameCacheManager.instance.setCache(name, mc);
		}
		mc.touchEnabled = false;
		this.dbGroup.addChild(mc);
		mc.playByFilename(-1);
		this.mc = mc;
		this.visible = true;
		this.config = config;
		let id = config.id;
		let gold_min = config.gold_min;
		this.bottomScore.text = config.bet_base;
		this.bottomScore.font = RES.getRes(`blackj_hall_score${index}_fnt`);
		this.difenImage.texture = RES.getRes(`blackj_hall_bar_df${index}${CF.tic}`);
		this.zhunruImage.texture = RES.getRes(`blackj_hall_bar_zr${index}${CF.tic}`);
		this.zhunruLabel.text = gold_min;
		this.zhunruLabel.strokeColor = color
	}




	public resetPosition() {
		this.mc.x = 606;
		this.mc.y = 207;
		switch (this.index) {
			case 1:
				this.y = -15 + this.anchorOffsetY;
				this.fenGroup.y = 53;
				break;
			case 2:
				this.y = 225 + this.anchorOffsetY;
				this.fenGroup.y = 39;
				break;
			case 3:
				this.y = 460 + this.anchorOffsetY;
				this.fenGroup.y = 39;
				break;
			case 4:
				this.y = 703 + this.anchorOffsetY;
				this.mc.x = 630
				this.fenGroup.y = 30;
				break;
		}
	}

	public getEffectNameByIndex(index) {
		switch (index) {
			case 1:
				return "21d_xsc" + TextUtils.instance.currentAniStr;
			case 2:
				return "21d_cjc" + TextUtils.instance.currentAniStr;
			case 3:
				return "21d_gjc" + TextUtils.instance.currentAniStr;
			case 4:
				return "21d_thc" + TextUtils.instance.currentAniStr;
		}

	}


	public onAdded() {
		super.onAdded();
		game.UIUtils.setAnchorPot(this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
	}

	public onRemoved() {
		super.onRemoved();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
	}

	private lock: boolean = false;
	private onTouchEnded() {
		majiang.MajiangUtils.playClick();//管理声音的
		if (this.lock) {
			return;
		}
		this.lock = true;
		egret.setTimeout(function () {
			this.lock = false
		}, this, 1000);
		let playerGold = Global.playerProxy.playerData.gold;
		RotationLoadingShu.instance.load(["blackjack_game"], "", () => {
			CF.dP(ENo.ENTER_GOLD_SCENE, { sceneId: this.config.id, diFen: this.config.bet_base });
		});
		egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
	}
}