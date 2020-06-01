module majiang {
	export class paiQiang108 extends eui.Component {
		public currentNumber: number = 1;
		public startNumber: number = 1;
		private leftGroup: eui.Group;
		private rightGroup: eui.Group;
		private topGroup: eui.Group;
		private mineGroup: eui.Group;
		protected maxNumber: number = 108;
		private lastNumber: number;
		public constructor() {
			super();
		}

		public createChildren() {
			super.createChildren();
		}

		/**
		 * 从最后删除
		 */
		public removeLast() {
			let pai = this['pai' + this.lastNumber];
			if (pai) {
				game.UIUtils.removeSelf(pai);
				pai = null;
				this.lastNumber--;
				if (this.lastNumber <= 0) {
					this.lastNumber = 108;
				}
			}
		}

		public showPaiQiangByData(directions, roomInfo) {
			let zhuangIndex = roomInfo.dealer;
			let seizi = roomInfo.diceNumber;
			let offerSet = seizi[0] + seizi[1];
			let min = seizi[0];
			let zhuang = directions[zhuangIndex];
			switch (zhuang) {
				case "mine":
					switch (offerSet) {
						case 1: case 5: case 9: this.startNumber = 1; break;
						case 2: case 6: case 10: this.startNumber = 1 + 26 * 2 + 28; break;
						case 3: case 7: case 11: this.startNumber = 1 + 26 + 28; break;
						case 4: case 8: case 12: this.startNumber = 1 + 26; break;
					}
					break;
				case "left":
					switch (offerSet) {
						case 1: case 5: case 9: this.startNumber = 1 + 28; break;
						case 2: case 6: case 10: this.startNumber = 1; break;
						case 3: case 7: case 11: this.startNumber = 1 + 28 * 2 + 26; break;
						case 4: case 8: case 12: this.startNumber = 1 + 26 + 28; break;
					}
					break;
				case "top":
					switch (offerSet) {
						case 1: case 5: case 9: this.startNumber = 1 + 26 + 28; break;
						case 2: case 6: case 10: this.startNumber = 1 + 26 * 1; break;
						case 3: case 7: case 11: this.startNumber = 1; break;
						case 4: case 8: case 12: this.startNumber = 1 + 26 * 2 + 28; break;
					}
					break;
				case "right":
					switch (offerSet) {
						case 1: case 5: case 9: this.startNumber = 1 + 28 * 2 + 26; break;
						case 2: case 6: case 10: this.startNumber = 1 + 26 + 28; break;
						case 3: case 7: case 11: this.startNumber = 1 + 28 * 1; break;
						case 4: case 8: case 12: this.startNumber = 1; break;
					}
					break;
			}

			this.startNumber += min * 2;
			this.lastNumber = this.startNumber - 1;
			this.currentNumber = this.startNumber;
		}

		public showPaiQiang(directions) {
			let roomInfo = Global.gameProxy.roomInfo;
			let zhuangIndex = roomInfo.dealer;
			//todu 后端没有
			let seizi = roomInfo['diceNumber'];
			let offerSet = seizi[0] + seizi[1];

			let min = seizi[0];
			let zhuang = directions[zhuangIndex];
			switch (zhuang) {
				case "mine":
					switch (offerSet) {
						case 1: case 5: case 9: this.startNumber = 1; break;
						case 2: case 6: case 10: this.startNumber = 1 + 34 * 3; break;
						case 3: case 7: case 11: this.startNumber = 1 + 34 * 2; break;
						case 4: case 8: case 12: this.startNumber = 1 + 34; break;
					}
					break;
				case "left":
					switch (offerSet) {
						case 1: case 5: case 9: this.startNumber = 1 + 34; break;
						case 2: case 6: case 10: this.startNumber = 1; break;
						case 3: case 7: case 11: this.startNumber = 1 + 34 * 3; break;
						case 4: case 8: case 12: this.startNumber = 1 + 34 * 2; break;
					}
					break;
				case "top":
					switch (offerSet) {
						case 1: case 5: case 9: this.startNumber = 1 + 34 * 2; break;
						case 2: case 6: case 10: this.startNumber = 1 + 34 * 1; break;
						case 3: case 7: case 11: this.startNumber = 1; break;
						case 4: case 8: case 12: this.startNumber = 1 + 34 * 3; break;
					}
					break;
				case "right":
					switch (offerSet) {
						case 1: case 5: case 9: this.startNumber = 1 + 34 * 3; break;
						case 2: case 6: case 10: this.startNumber = 1 + 34 * 2; break;
						case 3: case 7: case 11: this.startNumber = 1 + 34 * 1; break;
						case 4: case 8: case 12: this.startNumber = 1; break;
					}
					break;
			}
			this.startNumber += min * 2;
			this.lastNumber = this.startNumber - 1;
			this.currentNumber = this.startNumber;
		}

		public reloadPaiQiang() {
			let roomInfo = Global.gameProxy.roomInfo;
			let lessNum = roomInfo.publicCardNum;
			for (let i = 0; i < this.maxNumber - lessNum; i++) {
				this.removeNumByIndex();
			}
		}

		public reloadPaiQiangByRoomInfo(roomInfo) {
			let lessNum = roomInfo.publicCardNum;
			for (let i = 0; i < this.maxNumber - lessNum; i++) {
				this.removeNumByIndex();
			}
		}

		public removeNumByIndex() {
			let pai = this['pai' + this.currentNumber];
			if (pai) {
				game.UIUtils.removeSelf(pai);
				pai = null;
				this.currentNumber += 1;
				if (this.currentNumber > this.maxNumber) {
					this.currentNumber = 1;
				}
			}
		}

		// public removePaiByOfferset(offerSet) {
		// 	this.currentNumber = this.currentNumber + offerSet
		// 	this.removeNumByIndex();
		// }
		public removePaiByOfferset(offerSet) {
			this.currentNumber = this.currentNumber + offerSet
			if (this.currentNumber > this.maxNumber) {
				this.currentNumber -= this.maxNumber;
			} else if (this.currentNumber < 0) {
				this.currentNumber += this.maxNumber;
			}
			this.removeNumByIndex();
		}

		public getPaiQiangNum() {
			return this.leftGroup.numChildren + this.rightGroup.numChildren
				+ this.topGroup.numChildren + this.mineGroup.numChildren;
		}

		public hidePaiQiang() {
			this.leftGroup.visible = this.topGroup.visible = this.rightGroup.visible = this.mineGroup.visible = false;
		}
	}
}