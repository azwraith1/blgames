module zajinhua {
	export class ZajinhuaRecordBar extends game.BaseUI {
		private value: any;
		private pjbh: eui.Label;
		private roomtype: eui.Label;
		private w2f: eui.Label;
		private time: eui.Label;
		public constructor(data) {
			super();
			this.value = data;
			this.skinName = new ZajinhuaJiluBarSkin();
		}

		public createChildren() {
			super.createChildren();
			this.pjbh.text = this.value.roomId;
			this.roomtype.text = this.choseField(this.value.sceneId);
			let gold: number = this.value.gainGold;
			if (this.value.gainGold > 0) {
				this.w2f.textColor = 0xfcf06f;
				this.w2f.text = "+" + gold.toFixed(2);
			} else {
				this.w2f.textColor = 0x9bffab;
				this.w2f.text = gold.toFixed(2);
			}
			this.time.text =  DateUtils.dateFormat("yyyy-MM-dd hh:mm", this.value.gameTime);
		}


		private choseField(value) {
			switch (value) {
				case 1001:
					return "初级场";
				case 1002:
					return "中级场";
				case 1003:
					return "高级场";
				case 1004:
					return "王者场";

			}
		}
	}
}