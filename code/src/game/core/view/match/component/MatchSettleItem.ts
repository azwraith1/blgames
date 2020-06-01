class MatchSettleItem extends eui.Component {
	private label1: eui.Label;
	private label2: eui.Label;
	public constructor() {
		super();
		this.skinName = new MatchSettleItemSkin();
	}

	public createChildren() {
		super.createChildren();
	}

	public showItemData(bill, type, key) {
		if (type == 1) {
			this.label1.textColor = this.label2.textColor = 0xfbf5db;
			this.label1.strokeColor = this.label2.strokeColor = 0x92430b;
		} else {
			this.label1.textColor = this.label2.textColor = 0xfcfcf8;
			this.label1.strokeColor = this.label2.strokeColor = 0x0e5e62;
		}
		this.showXZDDData(bill, key);
	}


	private showXZDDData(bill, key) {
		let type = bill.type;
		let info = bill.info
		if (type == 6) {
			this.label1.text = "呼叫转移"
		} else {
			this.label1.text = majiang.MajiangUtils.getMatchBiliTypeStr(type, info.gainGold, info.from, key);
		}
		if (info.gainGold > 0) {
			this.label2.text = "+" + NumberFormat.formatGold_scence(info.gainGold);
		} else {
			this.label2.text = NumberFormat.formatGold_scence(info.gainGold);
		}

		if (info.gangType) {
			if (type == 6) {
				this.label1.text = "呼叫转移"
			} else {
				this.label1.text = majiang.MajiangUtils.getGangTypeStr(info.gangType, info.gainGold);
			}
		}
	}
}