module niuniu {
	export class NiuniuNewHeader extends BaseHeader {
		public goldLabel: eui.BitmapLabel;
		public nameLabel: eui.Label;
		public headerImage: eui.Image;
		public playerInfo;
		private beishuLabel: eui.BitmapLabel;
		private beishuGroup: eui.Group;
		public zhuangImage: eui.Image;
		public indexLabel: eui.Label;
		private bqImage: eui.Image;
		private liushuiLabel: eui.BitmapLabel;
		private gold: number;
		public headerImage_k: eui.Image;
		public index;

		private winGroup: eui.Group;
		//w1-w3
		private w1: eui.Image;
		private w2: eui.Image;
		private w3: eui.Image;
		public constructor() {
			super();
			this.skinName = new NiuniuNewHeaderSkin();
		}

		public createChildren() {
			super.createChildren();
			this.liushuiLabel.text = "";
		}

		public hideLiushuiLabel() {
			this.liushuiLabel.visible = false;
		}

		public setIndex(index) {
			this.index = index;
			// this.indexLabel.text = index + "";
		}

		public showBeishu(value) {
			this.bqImage.visible = value <= 0;
			this.beishuLabel.visible = value > 0;
			if (value > 0) {
				this.beishuLabel.text = "x" + value;
			}
			this.beishuGroup.visible = true;
		}

		public showYZshu(value) {
			this.bqImage.visible = false;
			this.beishuLabel.visible = true;
			this.beishuGroup.visible = true;
			this.beishuLabel.text = "x" + value;
		}

		public hideBeishu() {
			this.bqImage.visible = false;
			this.beishuGroup.visible = false;
		}

		public showBeishuGroup() {
			this.beishuGroup.visible = true;
		}

		public initWithPlayer(playerInfo) {
			if (!playerInfo) {
				this.nameLabel.text = Global.playerProxy.playerData.nickname;
				this.headerImage.source = `hall_header_${Global.playerProxy.playerData.sex}_${Global.playerProxy.playerData.figure_url}_png`;
				this.goldLabel.text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
			} else {
				this.playerInfo = playerInfo;
				this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.gold);
				this.nameLabel.text = playerInfo.nickname;
				let headerId = playerInfo['figureUrl'] || playerInfo.figure_url;
				let headerSex = playerInfo['sex'] || playerInfo.sex;
				this.headerImage.source = `hall_header_${headerSex}_${headerId}_png`;
			}
			this.gold = Global.playerProxy.playerData.gold;
		}

		public showIsZhuang(isZhuang) {
			this.zhuangImage.visible = isZhuang;
			if (isZhuang) {
				if (!Global.runBack) {
					this.zhuangImage.scaleX = this.zhuangImage.scaleY = 0;
					egret.Tween.get(this.zhuangImage).to({ scaleX: 0, scaleY: 0 }, 50).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
				}
				this.setAutoTimeout(() => {
					this.headerImage_k.visible = true;
				}, this, 600);
			}
		}

		public change2Left() {
			this.beishuGroup.x = -40;
			this.zhuangImage.x = 140;
		}



		public showWinPng(gainGold) {
			if (gainGold > 0) {
				this.winGroup.visible = true;
				this.w1.y = this.w2.y = this.w3.y = this.w1.y + 140;
				this.w1.x = this.w1.x + 40;
				this.w2.x = this.w2.x;
				this.w3.x = this.w3.x - 40;
				for (let i = 0; i < 3; i++) {
					game.UIUtils.setAnchorPot(this["w" + (i + 1)]);
					this["w" + (i + 1)].alpha = 0;
					this["w" + (i + 1)].visible = true;
					this["w" + (i + 1)].scaleX = this["w" + (i + 1)].scaleY = 0;

				}

				egret.Tween.get(this.w1).to({ scaleX: 1.4, scaleY: 1.4, alpha: 1, x: this.w1.x - 40, y: this.w1.y - 140 }, 300).to({ scaleX: 1, scaleY: 1, }, 100);
				egret.Tween.get(this.w2).to({ scaleX: 1.4, scaleY: 1.4, alpha: 1, x: this.w2.x, y: this.w1.y - 140 }, 400).to({ scaleX: 1, scaleY: 1, }, 100);
				egret.Tween.get(this.w3).to({ scaleX: 1.4, scaleY: 1.4, alpha: 1, x: this.w3.x + 40, y: this.w1.y - 140 }, 500).to({ scaleX: 1, scaleY: 1, }, 100);



			}
		}

		private gainGold;
		private moveGold: number;
		public showLiushuiLabel(gainGold) {
			this.gainGold = gainGold;
			this.moveGold = 0;
			let str;
			if (gainGold >= 0) {
				str = "+" + gainGold;
				this.liushuiLabel.font = RES.getRes("nn_win_fnt_fnt")
			} else {
				str = gainGold + "";
				this.liushuiLabel.font = RES.getRes("nn_lose_fnt_fnt")
			}
			this.liushuiLabel.text = "";
			this.liushuiLabel.alpha = 0;
			this.liushuiLabel.y = this.liushuiLabel.y + 20;
			egret.Tween.get(this.liushuiLabel).to({ alpha: 0, y: this.liushuiLabel.y }, 50).to({ alpha: 1, y: this.liushuiLabel.y - 20 }, 200);
			let player = Global.roomProxy.getPlayerInfoByIndex(this.index);
			this.goldLabel.text = NumberFormat.formatGold_scence(player.gold);
			egret.setTimeout(() => {
				this.updatePlayerGold();
			}, this, 300);
		}

		public updatePlayerGold() {
			let player = Global.roomProxy.getPlayerInfoByIndex(this.index);
			egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this }).to({ moveGold: this.gainGold }, 500, egret.Ease.quadInOut);
		}

		private onChange(): void {
			let gold = NumberFormat.handleFloatDecimal(this.moveGold);
			if (this.moveGold != this.gainGold) {
				gold = Math.floor(gold);
			}
			if (gold >= 0) {
				this.liushuiLabel.text = "+" + gold;
			} else {
				this.liushuiLabel.text = "" + gold;
			}
		}
	}
}