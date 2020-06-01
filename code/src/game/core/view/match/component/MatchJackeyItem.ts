class MatchJackeyItem extends game.BaseUI {
	private pointImage: eui.Image;
	private winLabel: eui.BitmapLabel;
	private needLabel: eui.BitmapLabel;
	private dbImage: eui.Image;
	public index: number;
	public scoreData;
	private touchRect: eui.Rect;
	private selectImage: eui.Image;
	public constructor(index, scoreData) {
		super();
		this.index = index;
		this.scoreData = scoreData;
		this.skinName = new MatchJackeyItemSkin();
	}

	public createChildren() {
		super.createChildren();
		this.dbImage.source = `match_jackey_type_${this.index + 1}_png`;
		this.winLabel.text = this.scoreData.maxWinGold;
		this.needLabel.text = this.scoreData.entryFeeGold;
		switch (this.index) {
			case 1:
			case 2:
				this.pointImage.x = 123;
				break;
			case 0:
				this.pointImage.x = 120;
				break;
			case 3:
				this.pointImage.x = 122;
				break;
		}
		this.showPoint()
	}

	public showPoint(index: number = MatchManager.instance.selectIndex) {
		this.selectImage.visible = this.pointImage.visible = this.index == index;
	}

	public changeConfig(scoreData) {
		this.scoreData = scoreData;
		this.winLabel.text = this.scoreData.maxWinGold;
		this.needLabel.text = this.scoreData.entryFeeGold;
	}


	public onTouchTap(e: egret.TouchEvent) {
		CF.dP(ENo.JACKEY_ITEM_TOUCH, this.index);
	}
}