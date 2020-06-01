module niuniu {
	export class NiuniuRecordRenderer extends game.BaseUI {
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
			this.skinName = new NiunisRecordRendererSkin();
		}


		protected createChildren(): void {
			super.createChildren();
			let num = this.values;
			this.roomId.text = num["roomId"];
			this.roomType.text = this.choseField(num["sceneId"], this.ids);
			if (num["gainGold"] >= 0) {
				this.roomMoney.text = "+" + num["gainGold"];
				this.roomMoney.textColor = 0xff6b12
			} else {
				this.roomMoney.text = num["gainGold"];
				this.roomMoney.textColor = 0x77df5f
			}
			this.roomTime.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);


		}


		private choseField(value, id) {
			if (id == Global.gameProxy.gameIds["sangong"]) {
				switch (value) {
					case 1001:
						return "新手场";
					case 1002:
						return "初级场";
					case 1003:
						return "中级场";
					case 1004:
						return "高级场";
					case 1005:
						return "王者场";
				}
			} else {
				switch (value) {
					case 1001:
						return "新手场";
					case 1002:
						return "初级场";
					case 1003:
						return "中级场";
					case 1004:
						return "高级场";
					case 1005:
						return "至尊场";
					case 1006:
						return "王者场";
				}
			}
		}
	}
}