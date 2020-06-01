module sangong {
	export class SangongHeader extends BaseHeader {
		public goldLabel: eui.BitmapLabel;
		public nameLabel: eui.Label;
		public headerImage: eui.Image;
		public playerInfo;
		protected beishuLabel: eui.BitmapLabel;
		protected beishuGroup: eui.Group;
		public zhuangImage: eui.Image;
		public indexLabel: eui.Label;
		private liushuiLabel: eui.BitmapLabel;
		private gold: number;
		public headerImage_k: eui.Image;
		public index;

		private winGroup: eui.Group;
		private beishuDb: eui.Image;
		//w1-w3
		protected fenshuGroup: eui.Group;
		//smart
		private leftQZ: eui.Image;
		private rightQZ: eui.Image;
		protected topQZ: eui.Image;
		public constructor() {
			super();
			this.skinName = new SangongHeaderSkin();
		}

		public createChildren() {
			super.createChildren();
			this.liushuiLabel.text = "";
		}
		/**
		 * @ smart
		 * 抢庄或不抢庄
		 */
		public showQZ(index: number, isQiangZhuang: boolean) {
			var resName: string = "sg_bq_png";
			if (isQiangZhuang) {
				resName = "sg_qz_png";
			}
			//LogUtils.logD("============自己是否强壮============" + isQiangZhuang+index);
			switch (index) {
				case 2:
				case 3:
					this.leftQZ.visible = true;
					this.leftQZ.source = RES.getRes(resName);
					break;
				case 4:
				case 5:
					this.rightQZ.visible = true;
					this.rightQZ.source = RES.getRes(resName);
					break;
				case 1:
					this.topQZ.visible = true;
					this.topQZ.source = RES.getRes(resName);

					break;
			}
		}
		/**
		 * @ smart
		 * 隐藏抢庄或不抢庄
		 */
		private hideQZ() {
			this.leftQZ.visible = false;
			this.rightQZ.visible = false;
			this.topQZ.visible = false;
		}
		public setIndex(index) {
			this.index = index;
			// this.indexLabel.text = index + "";
		}

		public showText(text) {
			this.beishuGroup.visible = true;
			this.beishuLabel.text = text;
		}

		public showBeishu(value) {
			this.hideQZ();
			this.beishuLabel.visible = value > 0;
			this.beishuLabel.y = this.beishuLabel.y - 1;
			if (value > 0) {
				this.beishuLabel.text = "x" + value;
			}
			this.beishuGroup.visible = true;
		}

		public hideBeishu() {
			this.beishuGroup.visible = false;
			this.hideQZ();
		}


		public showYZshu(value) {
			this.hideQZ();
			this.beishuLabel.visible = true;
			this.beishuGroup.visible = true;
			this.beishuLabel.text = "x" + value;
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
			if (!Global.runBack) {
				this.zhuangImage.scaleX = this.zhuangImage.scaleY = 0;
				egret.Tween.get(this.zhuangImage).to({ scaleX: 0, scaleY: 0 }, 50).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
			}
		}

		public exchange45(dir) {
			// if (dir == 1) {
			// 	this.beishuGroup.y = 10;
			// } else if (dir == 2 || dir == 3) {
			// 	this.beishuGroup.x = -143;
			// }
			// if (dir == 4 || dir == 5) {
			// 	this.beishuGroup.x = 173;
			// }


			//smart 倍数位置修改
			if (dir == 1) {
				this.beishuGroup.x = 7;//19
				this.beishuGroup.y = 17;
				this.beishuLabel.horizontalCenter = 2.5;
			} else if (dir == 2 || dir == 3) {
				this.beishuGroup.x = -97;
				this.beishuGroup.y = 111;
				this.beishuLabel.right = 14;
			}
			if (dir == 4 || dir == 5) {
				this.beishuGroup.x = 90;
				this.beishuGroup.y = 111;
				this.beishuLabel.left = 54;
			}
		}

		public change2Left() {
			this.beishuGroup.x = 30 - this.beishuGroup.width;
		}


		private timer: any;
		private gainGold: any;
		public showLiushuiLabel(gainGold) {
			//this.beishuGroup.visible = false;
			//smart
			this.hideQZ();
			this.fenshuGroup.visible = true;
			//smart 自己的时候 飘分上移动
			if(this.beishuGroup.visible && this.beishuGroup.x==7) this.fenshuGroup.y-=30;
			this.liushuiLabel.visible = true;
			this.gainGold = gainGold;
			this.liushuiLabel.visible = true;
			this.liushuiLabel.alpha = 0;
			this.liushuiLabel.y = this.liushuiLabel.y + 20;
			egret.Tween.get(this.liushuiLabel).to({ alpha: 0, y: this.liushuiLabel.y }, 50).to({ alpha: 1, y: this.liushuiLabel.y - 20 }, 200);
			this.timer = egret.setInterval(() => {
				this.scoreAddOrNo();
			}, this, 30);
			let player = Global.roomProxy.getPlayerInfoByIndex(this.index);
			this.goldLabel.text = NumberFormat.formatGold_scence(player.gold);
			// egret.setTimeout(()=>{
			// 	this.updatePlayerGold();
			// }, this, 500);
		}

		/**
		 * 分数加减动画
		 */
		private count: number = 0;
		private sumFen: number = 0;
		//	private goldTime: number = 0;//根据金币不同来调用速度
		private scoreAddOrNo() {
			this.count++;
			let finalNum = this.gainGold;
			let step = Math.abs(finalNum) / 30;
			this.sumFen = this.sumFen + Math.ceil(step);
			if (this.count >= 20) {
				egret.clearInterval(this.timer);
				if (this.gainGold >= 0) {
					// this.liushuiLabel.letterSpacing = -8;
					this.liushuiLabel.font = "sangong_win_fnt"
					this.liushuiLabel.text = "+" + finalNum;
				} else {
					// this.liushuiLabel.letterSpacing = -4;
					this.liushuiLabel.font = "sangong_lose_fnt"
					this.liushuiLabel.text = "" + finalNum;
				}

			} else {
				if (this.gainGold >= 0) {
					// this.liushuiLabel.letterSpacing = -8;
					this.liushuiLabel.font = "sangong_win_fnt"
					this.liushuiLabel.text = "+" + this.sumFen;
				} else {
					// this.liushuiLabel.letterSpacing = -4;
					this.liushuiLabel.font = "sangong_lose_fnt"
					this.liushuiLabel.text = "-" + this.sumFen;
				}

			}
		}

		public updatePlayerGold() {
			let player = Global.roomProxy.getPlayerInfoByIndex(this.index);
			egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this }).to({ gold: player.gold }, 500, egret.Ease.quadInOut);
		}

		private onChange(): void {
			this.goldLabel.text = NumberFormat.formatGold_scence(this.gold);
		}
	}
}