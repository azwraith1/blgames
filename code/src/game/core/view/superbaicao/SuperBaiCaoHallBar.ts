class SuperBaiCaoHallBar extends game.BaseUI {
	private zhunruLabel: eui.BitmapLabel;
	private config;
	private effcGroup: eui.Group;
	private hallbarBg: eui.Image;
	private dizhuLable: eui.Label;
	public constructor() {
		super();
		this.skinName = "SuperBaiCaoHallBarSkin";
	}

	public onAdded() {
		super.onAdded();
		game.UIUtils.setAnchorPot(this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
	}

	public createChildren() {
		super.createChildren();
		this.zhunruLabel.text = "";
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
		if (playerGold < this.config.gold_min) {
			let text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
			let txt = TextUtils.instance.getCurrentTextById(139);
			Global.alertMediator.addAlert(txt, null, null, true);
			return;
		}
		RotationLoadingShu.instance.load(["superbaicao_game"], "", () => {
			EventManager.instance.dispatch(ENo.ENTER_GOLD_SCENE, { gameId: GAME_ID.BAICAO, sceneId: this.config.id, diFen: this.config.bet_base });
		});
		egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
	}

	public showBarByConfig(config, index, color) {
		let bgname = "superbaicao_xc" + index;
		this.hallbarBg.source = bgname + "_png";
		let dbName="ynbc2_xc" + index;
		let mc = new DBComponent(dbName);
		this.effcGroup.addChild(mc);
		mc.playByFilename(-1);
		this.visible = true;
		this.config = config;
		let id = config.id;
		let gold_min = config.gold_min;
		this.zhunruLabel.text = gold_min;
		/**底注 */
		this.dizhuLable.text = TextUtils.instance.getCurrentTextById(141) + ":" + config.bet_base;
	}

}