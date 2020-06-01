module bjle {
	export class BJLPoker extends eui.Component {
		public value: number;
		public color: number;
		public number: number;
		public beiImage: eui.Image;
		protected zhengGroup: eui.Group;
		protected valueLabel: eui.BitmapLabel;
		private bigColorImg: eui.Image;
		protected smallColorImg: eui.Image;
		/**是否是正面*/
		private isZheng: boolean = false;
		public constructor() {
			super();
			this.touchEnabled = false;
			this.touchChildren = false;
			if (!this.skinName) {
				this.skinName = new BJLCardSkin();
			}
		}

		public createChildren() {
			super.createChildren();
		}

		public initWithNum(num: number) {
			this.number = num;
			this.color = Math.floor(num / 100);
			this.value = Math.floor(num % 100);
			this.changeImage();
			//this.showB2Z();
		}
		/**
		 * 牌面
		 */
		public changeImage() {
			this.valueLabel.text = PukerUtils.number2Puker(this.value);
			this.smallColorImg.source = RES.getRes(`zjh_big_${this.color}_png`);
			if (this.value >= 11 && this.value <= 13) {
				if (this.color == 1 || this.color == 3) {
					this.bigColorImg.source = RES.getRes(`zjh_${this.value}_1_png`);
				} else {
					this.bigColorImg.source = RES.getRes(`zjh_${this.value}_2_png`);
				}
			} else {
				this.bigColorImg.source = RES.getRes(`zjh_big_${this.color}_png`);
			}

			if (this.color == 1 || this.color == 3) {
				this.valueLabel.font = "zjh_poker_blcak_fnt";
			} else {
				this.valueLabel.font = "zjh_poker_red_fnt";
			}
		}

		/**
		 * 背面变正面。
		 */
		public showB2Z() {
			this.beiImage.visible = false;
			this.zhengGroup.visible = true;
			this.isZheng = true;
		}

		/**
		 * 正面变背面。
		 */
		public showZ2B() {
			this.beiImage.visible = true;
			this.zhengGroup.visible = false;
			this.isZheng = false;
		}
		public get isZhengPoker() {
			if (this)
				return this.isZheng;
		}
		public selectDown() {
			this.y = 0;
		}
		public selectUp() {
			this.y = - 20;
		}


		public pokerScaleAni() {
			if (Global.runBack) {
				this.showB2Z();
			}
			egret.Tween.get(this).to({ scaleX: 0 }, 200).call(() => {
				this.showB2Z();
			}).to({ scaleX: 0.6 }, 150);
		}
	}
}