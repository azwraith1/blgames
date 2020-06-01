/*
 * @Author: li mengchan 
 * @Date: 2018-10-24 14:02:31 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-22 17:50:01
 * @Description: 自己的手牌
 */
module niuniu {
	export class NiuniuCardList2 extends game.BaseUI {
		private card0: NiuniuCard;
		private card1: NiuniuCard;
		private card2: NiuniuCard;
		private card3: NiuniuCard;
		private card4: NiuniuCard;
		private touchonList: NiuniuCard[] = [];
		public constructor() {
			super();
			this.skinName = new NiuniuCardListSkin2();
		}

		public createChildren() {
			super.createChildren();
			// this.alphaIs0();
			// this.cardAnimation();

		}

		public renderByList(listData) {
			for (let i = 0; i < listData.length; i++) {
				let card = this['card' + i] as NiuniuCard;
				card.initWithNum(listData[i]);
			}
			// this.visible = true;
		}

		public delTouch() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaped, this);
			for (let i = 0; i < 5; i++) {
				let card = this['card' + i] as NiuniuCard;
				card.selectDown();
			}
		}

		public addTouch() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaped, this);
		}
		/**
		 * 获取手牌是否有牛 如果有牛 是哪些手牌 smart
		 */
		public getYNCards(): { hanveNiu: any, ynCards: Array<NiuniuCard> } {
			var arr: Array<NiuniuCard> = [this["card0"], this["card1"], this["card2"], this["card3"], this["card4"]];
			for (let i = 0; i < arr.length; ++i) {
				arr[i].selectDown();
			}
			let ynCardsArr: Array<any> = [];
			let yn: boolean = false;
			let temp1: number;
			let temp2: number;
			let temp3: number;
			for (var i = 0; i <= arr.length - 3; i++) {
				for (var j = i + 1; j <= arr.length - 2; j++) {
					for (var k = j + 1; k <= arr.length - 1; k++) {
						temp1 = arr[i].value > 10 ? 10 : arr[i].value;
						temp2 = arr[j].value > 10 ? 10 : arr[j].value;;
						temp3 = arr[k].value > 10 ? 10 : arr[k].value;
						if (yn) continue;
						if ((temp1 + temp2 + temp3) % 10 == 0) {
							yn = true;
							ynCardsArr.push(arr[i], arr[j], arr[k]);
							arr[i].selectUp();
							arr[j].selectUp();
							arr[k].selectUp();
							break;
						}
					}
				}
			}
			CF.dP(ENo.CACULATOR_VALUE, ynCardsArr);
			return { hanveNiu: yn, ynCards: ynCardsArr };
		}
		/**
	 * 自己翻牌
	 */
		public turnOutPoker_me(card) {
			this.renderByList(card);
			for (let i = 0; i < card.length; i++) {
				let card = this["card" + i] as NiuniuCard;
				card.showB2Z();
			}
		}

		/**
		 * 发牌动画
		 */
		public cardAnimation() {
			this.alphaIs0();
			egret.Tween.get(this.card0).to({ x: 0, y: 0 }, 50).to({ x: 0, y: 0 }, 300)
			egret.Tween.get(this.card1).to({ x: 0, y: 0 }, 50).to({ x: 126, y: 0 }, 300)
			egret.Tween.get(this.card2).to({ x: 0, y: 0 }, 50).to({ x: 252, y: 0 }, 300)
			egret.Tween.get(this.card3).to({ x: 0, y: 0 }, 50).to({ x: 378, y: 0 }, 300)
			egret.Tween.get(this.card4).to({ x: 0, y: 0 }, 50).to({ x: 504, y: 0 }, 300)
		}

		public alphaIs0() {
			for (let i = 0; i < 5; i++) {
				let card = this["card" + i] as NiuniuCard;
				card.x = 0;
				card.y = 0;
			}
		}

		private onTouchTaped(e: egret.TouchEvent) {
			NiuniuUtils.playClick();
			let x = e.localX;
			let y = e.localY;
			let findCard = this.findTouchOn(x, y);
			if (!findCard) {
				return;
			}
			if (this.touchonList.indexOf(findCard) > -1) {
				findCard.selectDown();
				game.Utils.removeArrayItem(this.touchonList, findCard);
			} else {
				if (this.touchonList.length < 3) {
					findCard.selectUp();
					this.touchonList.push(findCard);
				} else {
					return;
				}
			}
			this.findUnTounchOn();
			CF.dP(ENo.CACULATOR_VALUE, this.touchonList);
		}
		/**查找没有被点击的cards*/
		private findUnTounchOn() {
			var unTouchList = [];
			var sum: number = 0;
			for (let i = 0; i <= 4; i++) {
				let card = this['card' + i] as NiuniuCard;
				if (!card.isSelected) {
					unTouchList.push(card);
				}
			}
			if (unTouchList.length == 2) {
				var niuniuCard: NiuniuCard;
				var value: number;
				for (let i = 0; i < unTouchList.length; ++i) {
					niuniuCard = unTouchList[i];
					value = niuniuCard.value;
					if (value > 10) {
						value = 10;
					}
					sum += value;
				}
				if (sum > 10) {
					sum -= 10;
				}
				CF.dP(ENo.CACULATOR_UNTOUCH_VALUE, sum);
			}
		}
		private findTouchOn(x, y) {
			for (let i = 0; i <= 4; i++) {
				let card = this['card' + i] as NiuniuCard;
				let point = new egret.Point(x, y);
				let rectagle = new egret.Rectangle(card.x, card.y, card.width, card.height);
				if (rectagle.containsPoint(point)) {
					return card;
				}

			}
		}
	}
}