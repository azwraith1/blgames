module majiang {
	export class HZMJPaiQiang136 extends PaiQiang136 {
		public constructor() {
			super();
		}
		public reloadPaiQiang() {
			let roomInfo = Global.gameProxy.roomInfo;
			let lessNum = roomInfo.publicCardNum;
			var _shengyu=136-lessNum;
			for (let i = 0; i < this.maxNumber - lessNum; i++) {
				this.removeNumByIndex();
			}
		}
	}
}