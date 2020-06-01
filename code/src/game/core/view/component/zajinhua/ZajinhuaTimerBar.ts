module zajinhua {
	export class ZajinhuaTimerBar extends game.BaseUI implements IUpdate {
		private time: number = 0;
		private timeShape: egret.Shape;
		private djs_cirl: eui.Image;
		public constructor() {
			super();
			this.skinName = new ZajinhuaTimerBarSkin();
		}

		public createChildren() {
			super.createChildren();
			this.timeShape = new egret.Shape();
			this.timeShape.rotation = -90;
			this.addChild(this.timeShape);
			this.timeShape.x = -40;
			this.timeShape.y = 135;
		}

		private showShapByPo(angle) {
			let shape = this.timeShape;
			shape.graphics.clear();
			shape.graphics.beginFill(0x53a7ce);
			shape.graphics.moveTo(90, 90);
			shape.graphics.drawArc(90, 90, 90, 0, angle * Math.PI / -180, true);
			shape.graphics.lineTo(90, 90);
			shape.graphics.endFill();
			this.djs_cirl.mask = shape;
		}



		private root;
		public startTime(root) {
			this.root = root;
			game.UpdateTickerManager.instance.add(this);
		}

		public update(dt: number) {
			if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
				let endTime = Global.roomProxy.roomInfo.countdown.end;
				let startTime = game.DateTimeManager.instance.now;
				let start = Global.roomProxy.roomInfo.countdown.s * 1000;
				if (!start) {
					start = Global.roomProxy.roomInfo.countdown.end - Global.roomProxy.roomInfo.countdown.start;
				}
				let cha = endTime - startTime;
				let value = Math.floor(360 * cha / start);
				if (value >= 0) {
					this.showShapByPo(value);
				}
				if (cha <= 0) {
					return;
				}
			}
		}

		public removeTimer() {
			game.UpdateTickerManager.instance.remove(this);
		}

	}
}