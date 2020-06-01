module bjle {
	export class BJLHallPointItem extends eui.Component {
		private points: any;
		public constructor() {
			super();
			this.createPoints();
		}

		private createPoints() {
			this.points = {};
			this.points[1] = { x: 0, y: 3 };
			this.points[2] = { x: 0, y: 30 };
			this.points[3] = { x: 0, y: 57 };
			this.points[4] = { x: 0, y: 84 };
			this.points[5] = { x: 0, y: 111 };
			this.points[6] = { x: 0, y: 138 };
		}

		/**
		 * 给每个点设置位置。
		 */
		public setPosition(image, index) {
			let point = this.points[index];
			image.x = point.x;
			image.y = point.y;
		}
	}
}