module bjle {
	export class BJLHallPoint extends eui.Component {
		private imgs: eui.Image;
		public constructor() {
			super();
			this.skinName = new BJLHallPointSkin();
		}

		public createChildren() {
			super.createChildren();
		}

		public initNums(i) {
			this.imgs.source = RES.getRes(`bjl_hall_${i}_png`)
		}


	}
}