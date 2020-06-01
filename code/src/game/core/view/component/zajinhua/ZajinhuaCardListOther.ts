module zajinhua {
	export class ZajinhuaCardListOther extends game.BaseUI {
		public card0: ZajinhuaCard;
		public card1: ZajinhuaCard;
		public card2: ZajinhuaCard;
		private fenGroup: eui.Group;
		private fenImage: eui.Image;
		private bpw2l: eui.Image;
		private xPoint: number[] = [33, 77, 120];
		private yPoint: number[] = [47, 47, 47];
		public constructor() {
			super();
			//this.skinName = new ZajinhuaOtherCardsSkin();
		}

		public createChildren() {
			super.createChildren();
			this.db();
		}

		public renderByList(listData, isAin) {
			let k = listData.length;
			this.resetPosition();
			for (let i = 0; i < k; i++) {
				let card = this['card' + (k - 1 - i)] as ZajinhuaCard;
				card.visible = true;
				card.initWithNum(listData[i]);
				card.showB2Z();
			}
			if (isAin) {
				this.cardAnimation();
			}
		}

		/**
		 * 后台运行写死
		 */
		public houtaiRun(listData) {
			let k = listData.length;
			for (let i = 0; i < k; i++) {
				let card = this['card' + i] as ZajinhuaCard;
				card.visible = true;
				card.initWithNum(listData[i]);
				card.showB2Z();
				this.addChild(card);
			}
			//this.cardAnimation();
		}


		private sortPais() {
			let group = [];
			this.addChild(this.card0);
			this.addChild(this.card1);
			this.addChild(this.card2);
			this.addChild(this.fenGroup);
		}

		/**
		 * 发牌动画和展牌动画
		 */
		private runCardAni: boolean = false;
		public cardAnimation() {
			this.resetPosition();
			this.alphaIs0();
			egret.Tween.get(this.card0).to({ x: this.xPoint[0], y: this.yPoint[0] }, 200)
			egret.Tween.get(this.card1).to({ x: this.xPoint[1], y: this.yPoint[1] }, 200)
			egret.Tween.get(this.card2).to({ x: this.xPoint[2], y: this.yPoint[2] }, 200);
			egret.setTimeout(() => {
				this.sortPais();
			}, this, 300);

		}

		/**
		 * 隐藏
		 */
		public alphaIs0() {
			this.card0.rotation = this.card2.rotation = 0;
			this.card0.x = this.xPoint[0]; this.card0.y = this.yPoint[0]
			this.card2.x = this.xPoint[0]; this.card2.y = this.yPoint[2]
			this.card1.x = this.xPoint[0]; this.card1.y = this.yPoint[1]
		}




		/**
		 * 看牌动画
		 */
		public showLookPai(isAni) {
			if (isAni || !Global.runBack) {
				this.card0.x += 10;
				this.card2.x -= 10;
				egret.Tween.get(this.card0).to({ rotation: -7 }, 200);
				egret.Tween.get(this.card1).to({ y: 40 }, 200);
				egret.Tween.get(this.card2).to({ rotation: 7 }, 200);
				this.addChild(this.fenGroup);
			} else {
				this.card0.x += 10;
				this.card2.x -= 10;
				this.card0.rotation = -7;
				this.card1.y = 40;
				this.card2.rotation = 7;
			}
		}


		public resetPosition() {
			this.addChild(this.card0);
			this.addChild(this.card1);
			this.addChild(this.card2);
			egret.Tween.removeTweens(this.card0);
			this.card0.rotation = 0;
			this.card0.x = this.xPoint[0];
			this.card0.y = this.yPoint[0]
			egret.Tween.removeTweens(this.card1);
			this.card1.x = this.xPoint[1];
			this.card1.y = this.yPoint[1]
			egret.Tween.removeTweens(this.card2);
			this.card2.x = this.xPoint[2];
			this.card2.y = this.yPoint[2]
			this.card2.rotation = 0;
			this.addChild(this.fenGroup);
		}

		/**
		 * 恢复最初状态
		 */
		public setNomal() {
			for (let i = 2; i >= 0; i--) {
				let cd = this["card" + i] as ZajinhuaCard;
				cd.scaleX = 0.5;
				cd.scaleY = 0.5;
				cd.alpha = 1;
				// this.addChild(cd);
				cd.showZ2B();
				cd.showMb(1);
				cd.visible = false;
				cd.rotation = 0;
				cd.x = this.xPoint[i];
				cd.y = this.yPoint[i];
			}
		}

		/**
		 * 三合一，未开牌合拢
		 */
		public setNomal1() {
			egret.Tween.get(this.card0).to({ x: 129 }, 150);
			egret.Tween.get(this.card1).to({ x: 84 }, 150).wait(50).call(() => {
			})
		}

		/**
		 * 三合一,开牌合拢；
		 */
		public setNomal2() {
			egret.Tween.get(this.card0).to({ x: this.xPoint[0], y: this.yPoint[0], rotation: 0 }, 150);
			egret.Tween.get(this.card1).to({ x: this.xPoint[1], y: this.yPoint[1], rotation: 0 }, 150);
			egret.Tween.get(this.card2).to({ x: this.xPoint[2], y: this.yPoint[2], rotation: 0 }, 150).wait(50).call(() => {
			})
		}
		/**
		 * 展示分数
		 */
		public showFen(num) {
			//10表示隐藏。
			this.db();
			this.addChild(this.fenGroup);
			this.fenGroup.visible = (num == 10) ? false : true;
			if (num != 10) {
				if (num >= 3 && num < 6) {
					this.fenImage.visible = false;
					this.word.play(this.chose(num), 1);
				} else {
					this.fenImage.source = "zjh_px_" + num + "_png";
					if (num == 6) {
						this.fenImage.x = -15;
					} else {
						this.fenImage.x = 0;
					}
					this.fenImage.y = 7;
				}
			}
		}

		private word: DBComponent;
		private db() {
			this.fenGroup.removeChildren();
			this.word = new DBComponent("zjh_px");
			this.fenGroup.addChild(this.fenImage);
			this.fenGroup.addChild(this.word);
			this.word.horizontalCenter = -5;
			this.word.verticalCenter = 5;
			this.word.visible = false;
			this.word.callback = () => {

			}
		}


		private chose(num) {
			switch (num) {
				case 3:
					return "zjh_px_jinhua";
				case 4:
					return "zjh_px_shunjin";
				case 5:
					return "zjh_px_baozi";
			}
		}

		public showCardByIndex(index) {
			if (this["card" + index]) {
				this["card" + index].visible = true;
			}
		}



		public paiBianHui() {
			this.resetPosition();
			for (let i = 0; i < 3; i++) {
				this["card" + i].showMb(2);
			}
		}
	}
}