class BJLRecordRenderer extends game.BaseUI {
	private values;
	private ids: any;
	private roomId: eui.Label;
	private roomType: eui.Label;
	private roomMoney: eui.Label;
	private roomTime: eui.Label;
	public constructor(data, id) {
		super();
		this.values = data;
		this.ids = id;
		this.skinName = new BJLRecordRendererSkin();
	}


	protected createChildren(): void {
		super.createChildren();
		let num = this.values;
		this.roomId.text = num["roomId"];
		this.roomType.text = this.choseField(num["sceneId"], this.ids);
		if (num["gainGold"] >= 0) {
			this.roomMoney.text = "+" + num["gainGold"];
			this.roomMoney.textColor = 0xf8c768;
		} else {
			this.roomMoney.text = num["gainGold"];
			this.roomMoney.textColor = 0xa5f868;
		}
		this.roomTime.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
	}


	private choseField(value, id) {
		switch (value) {
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