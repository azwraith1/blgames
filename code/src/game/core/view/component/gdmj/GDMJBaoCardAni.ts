class GDMJBaoCardAni extends game.BaseUI {
	public pai: majiang.GDMJMineShoupai;
	private dbGroup: eui.Group;
	private color: number;
	private db: DBComponent
	public constructor(color) {
		super();
		this.color = color;
		this.skinName = `GDMJBaoCardAniSkin`
	}

	public createChildren() {
		super.createChildren();
		this.pai.resetValue(this.color)
		this.pai.hideLaiziImage();
		game.UIUtils.setAnchorPot(this.pai);
		this.pai.scaleX = this.pai.scaleY = 0;
		egret.Tween.get(this.pai).to({
			scaleX: 1.23,
			scaleY: 1.23
		}, 300, egret.Ease.sineIn);
		this.setAutoTimeout(() => {
			this.createDb();
		}, this, 200);
	}

	public createDb() {
		let db = new DBComponent("gdmj_laizi") as DBComponent;
		this.dbGroup.addChild(db);
		db.playByFilename(0);
		db.y = -10;
		this.db = db;
	}

	public onRemoved() {
		super.onRemoved();
		this.db.stop();
		game.UIUtils.removeSelf(this.db);
		this.db = null;
	}
}

