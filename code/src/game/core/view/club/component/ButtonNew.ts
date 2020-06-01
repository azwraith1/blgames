module smart {
	export class ButtonNew extends eui.Button {
		public upImg: eui.Image;
		public downImg: eui.Image;
		public disableImg: eui.Image;
		public bitmapTxt: eui.BitmapLabel;
		public commonTxt: eui.Label;
		public constructor() {
			super();
			this.skinName = "NewButtonSkin";
		}
		public setUpImg(up: string, down: string) {
			this.upImg.source = up;
			this.downImg.source = down;
		}
		public setBitMapTxt(fontStyle: string, val: number) {
			this.bitmapTxt.font = fontStyle;
			this.bitmapTxt.text = val.toString();
		}
		public setTxt() {

		}

	}
}