class BDZSettleItem extends eui.Component {
	private nameLabel: eui.Label;
	private typeLabel: eui.Label;
	private goldLabel: eui.Label;

	private winImage: eui.Image;
	private mineImage: eui.Image;
	public constructor() {
		super();
		this.skinName = new BDZSettleItemBarSkin();
	}

	public createChildren() {
		super.createChildren();
	}

	public showText(name, roundStr, gold, isWin, isMine) {
		this.nameLabel.text = name;
		this.typeLabel.text = roundStr;
		this.goldLabel.text = gold >= 0 ? "+" + gold : gold;
		if (isWin) {
			this.winImage.visible = true;
			this.nameLabel.textColor = this.typeLabel.textColor = this.goldLabel.textColor = 0xFBC145;
		}
		if (isMine) {
			this.mineImage.visible = true;
		}
	}



}