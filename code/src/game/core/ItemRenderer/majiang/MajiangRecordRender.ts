class MajiangRecordRender extends eui.Component {
	private values;
	private roomIdLabel: eui.Label;
	private roomNameLabel: eui.Label;
	private goldLabel: eui.Label;
	private timeLabel: eui.Label;
	public constructor(data) {
		super();
		this.values = data;
		this.skinName = `MajiangRecordRenderSkin`;
	}

	protected createChildren(): void {
		super.createChildren();
		let num = this.values;
		this.roomIdLabel.text = num["roomId"];
		this.roomNameLabel.text = this.choseField(num["sceneId"]);
		if (num["gainGold"] >= 0) {
			this.goldLabel.text = "+" + NumberFormat.formatGold(num["gainGold"]);
			this.goldLabel.textColor = 0Xe21d1d;
		} else {
			this.goldLabel.text = NumberFormat.formatGold(num["gainGold"]);
			this.goldLabel.textColor = 0X0A850D;
		}
		this.timeLabel.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
	}

	private choseField(value) {
		let val = Number(value);
		switch (val) {
			case 1001:
				return CF.tigc(147);
			case 1002:
				return CF.tigc(148);
			case 1003:
				return CF.tigc(149);
			case 1004:
				return CF.tigc(150);
		}
	}
}