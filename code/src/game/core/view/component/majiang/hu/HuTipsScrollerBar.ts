module majiang {
	export class HuTipsScrollerBar extends game.BaseUI {
		private bgImage: eui.Image;
		private itemGroup: eui.Group;
		private scroller: eui.Scroller;
		private leftImage: eui.Image;
		private rightImage: eui.Image;
		public constructor() {
			super();
			this.skinName = `HuTipsScrollerBarSkin`;
		}

		public createChildren() {
			super.createChildren();
			this.visible = false;
			this.horizontalCenter = 0;
			if (!this.verticalCenter) {
				this.bottom = 150;
			}

		}

		public onAdded() {
			super.onAdded();
			this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
		}

		public onRemoved() {
			super.onRemoved();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
		}

		private enterFrame() {
			if (this.needCheck) {
				let scrollerX = this.scroller.viewport.scrollH;
				if (scrollerX == 0) {
					this.leftImage.visible = false;
				} else if (scrollerX == (this.scroller.viewport.contentWidth - this.scroller.viewport.width)) {
					this.rightImage.visible = false;
				} else {
					this.rightImage.visible = true;
					this.leftImage.visible = true;
				}
			}
		}

		private needCheck: boolean = false;
		public showBar(arr, length = 8) {
			this.itemGroup.removeChildren();
			let width = 0;
			let width2 = 0;
			for (var i = 0; i < arr.length; i++) {
				let data = arr[i];
				let item = new HuTipsItem(data);
				this.itemGroup.addChild(item);
				if (i < length) {
					// if (i != arr.length - 1) {
					width += item.width + 40;
					width2 += item.width + 30;
					// }
				}
			}
			this.bgImage.width = width;
			this.scroller.width = width2 - 30;
			this.visible = arr.length > 0;
			this.needCheck = arr.length > 8;
			this.leftImage.visible = this.rightImage.visible = arr.length > length;
			this.leftImage.x = 20;
			this.rightImage.x = width - 10;
			this.scroller.viewport.scrollH = 0;
		}

		public hideBar() {
			this.itemGroup.removeChildren();
			this.visible = false;
			this.needCheck = false;
		}
	}
}