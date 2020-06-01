module majiang {
	export class HuTipsItem extends eui.Component {
		public pai: MineZhengpai;
		public syLabel: eui.Label;
		public fanLabel: eui.Label;
		public majiangData
		private laiziImage: eui.Image;
		public constructor(majiangData) {
			super();
			this.majiangData = majiangData;
			this.skinName = new HuTipsItemSkin();
		}

		public createChildren() {
			super.createChildren();
			let value = this.majiangData.value || this.majiangData.card;
			this.pai.changeColor(value);
			let gameConfig = Global.gameProxy.lastGameConfig;
			if (gameConfig.gameId == "hzmj" || gameConfig.gameId == 10017) {
				this.laiziImage.source = "hzmj_tip_lai_png";
			}
			this.laiziImage.visible = Global.gameProxy.checkCardIsLaizi(value);
			if (this.majiangData.count != undefined) {
				this.syLabel.text = this.majiangData.count;
				if (this.majiangData.count < 1) {
					this.pai.alpha = 0.5;
				}
			} else {
				this.syLabel.text = "未知";
			}
			if (this.majiangData.fan == undefined) {
				this.fanLabel.text = "未知";
			} else {
				// this.fanLabel.text = this.majiangData.fan;
				if (this.majiangData.fan == 0) {
					this.fanLabel.text = "1";
				} else {
					if (gameConfig.gameId == 10006 || gameConfig.gameId == "dzmj") {
						this.fanLabel.text = this.majiangData.fan;
					} else if (gameConfig.gameId == 10015 || gameConfig.gameId == "gdmj") {
						this.fanLabel.text = this.majiangData.fan;
					} else if (gameConfig.gameId == "hzmj" || gameConfig.gameId == 10017) {
						this.fanLabel.text = this.majiangData.fan;
					} else if (gameConfig.gameId == 10018 || gameConfig.gameId == "hbmj") {
						this.fanLabel.text = this.majiangData.fan;
					}
					else if (gameConfig.gameId == 10019 || gameConfig.gameId == "gyzjmj") {
						this.fanLabel.text = this.majiangData.fan;
					}else if (gameConfig.gameId == 10020 || gameConfig.gameId == "ermj") {
						this.fanLabel.text = this.majiangData.fan;
					}
					else {
						this.fanLabel.text = Math.pow(2, this.majiangData.fan) + "";
					}
				}
			}
		}
	}
}