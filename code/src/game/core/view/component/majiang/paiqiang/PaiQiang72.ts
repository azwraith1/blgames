/*
 * @Author: li mengchan 
 * @Date: 2018-08-20 16:52:36 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-14 11:32:07
 * @Description: 牌墙
 */
module majiang {
	export class PaiQiang72 extends eui.Component {
		public currentNumber: number = 1;
		public startNumber: number = 1;
		private topGroup: eui.Group;
		private mineGroup: eui.Group;
		private maxNumber: number = 72;
		private lastNumber: number;
		public constructor() {
			super();
		}

		public createChildren() {
			super.createChildren();
		}

		public showPaiQiangByData(directions, roomInfo) {
			let zhuangIndex = roomInfo.dealer;
			let seizi = roomInfo.diceNumber;
			let offerSet = seizi[1];
			let zhuang = directions[zhuangIndex];
			switch (zhuang) {
				case "mine":
					switch (offerSet) {
						case 1: case 3: case 5: this.startNumber = 1; break;
						case 2: case 4: case 6: this.startNumber = 37; break;
					}
					break;
				case "top":
				case "left":
				case "right":
					switch (offerSet) {
						case 1: case 3: case 5: this.startNumber = 37; break;
						case 2: case 4: case 6: this.startNumber = 1; break;
					}
					break;
			}
			this.startNumber += offerSet * 2;
			this.lastNumber = this.startNumber - 1;
			this.currentNumber = this.startNumber;
		}

		public showPaiQiang(directions) {
			let roomInfo = Global.gameProxy.roomInfo;
			let zhuangIndex = roomInfo.dealer;
			//todu 后端没有
			let seizi = roomInfo['diceNumber'];
			let offerSet = seizi[1];
			let zhuang = directions[zhuangIndex];
			switch (zhuang) {
				case "mine":
					switch (offerSet) {
						case 1: case 3: case 5: this.startNumber = 1; break;
						case 2: case 4: case 6: this.startNumber = 37; break;
					}
					break;
				case "top":
				case "left":
				case "right":
					switch (offerSet) {
						case 1: case 3: case 5: this.startNumber = 37; break;
						case 2: case 4: case 6: this.startNumber = 1; break;
					}
					break;
			}
			this.startNumber += offerSet * 2;
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
			return this.topGroup.numChildren
				+ this.mineGroup.numChildren;
		}

		public hidePaiQiang() {
			this.topGroup.visible = this.mineGroup.visible = false;
		}
	}
}