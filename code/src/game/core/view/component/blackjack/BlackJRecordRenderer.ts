class BlackJRecordRenderer extends game.BaseUI {
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
		this.skinName = new BlackJRecordRendererSkin();
	}


	protected createChildren(): void {
		super.createChildren();
		let num = this.values;
		this.roomId.text = num["roomId"];
		this.roomType.text = this.choseField(num["sceneId"], this.ids);
		if (num["gainGold"] >= 0) {
			this.roomMoney.text = "+" + num["gainGold"];
			this.roomMoney.textColor = 0xecb818;
		} else {
			this.roomMoney.text = num["gainGold"];
			this.roomMoney.textColor = 0x18ec40;
		}
		this.roomTime.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
	}


	private choseField(value, id) {
		if (id == 10024 || id == 10025) {
			switch (value) {
				case 1001:
					return CF.tigc(125);
				case 1002:
					return CF.tigc(126);
				case 1003:
					return CF.tigc(127);
				case 1004:
					return CF.tigc(128);
				case 1005:
					return CF.tigc(145);
				case 1006:
					return CF.tigc(146);
			}
		} else {
			switch (value) {
				case 1001:
					return CF.tigc(151);
				case 1002:
					return CF.tigc(152);
				case 1003:
					return CF.tigc(149);
				case 1004:
					return CF.tigc(150);
				case 1005:
					return CF.tigc(145);
				case 1006:
					return CF.tigc(146);
			}
		}
	}
}