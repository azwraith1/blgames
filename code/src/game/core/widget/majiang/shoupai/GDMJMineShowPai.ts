class GDMJMineShowPai extends majiang.MineShowPai {
	public constructor(arr, stus) {
		super(arr, stus);
	}

	/**
	 * 重写一下这个
	 */
	public showColors() {
		let mineInfo = Global.gameProxy.getMineGameData();
		mineInfo.cards = this.colorArr
		this.colorArr1 = Global.gameProxy.getMineSHoupaiArrLz();
		this.show();
	}

	public show() {
		if (this.value == 2) {
			let baoCard = Global.gameProxy.roomInfo.baoCards[0];
			let imgs: eui.Image;
			this.mineHuShow.visible = true;
			for (let i = 0; i <= 13; i++) {
				let color = this.colorArr1[i];
				imgs = this['color' + i] as eui.Image;
				if (color) {
					let value = this.colorArr1[i];
					this['image' + i].visible = true;
					imgs.source = RES.getRes("color_value_" + value + "_png");
					// if(value == baoCard){
					// let img = new eui.Image("gdmj_tip_lai_png")
					// img.scaleX = img.scaleY = 0.7;
					// imgs.parent.addChild(img);
					// img.x = this['image' + i].x;
					// img.y = this['image' + i].y;
					// }
				} else {
					this['image' + i].visible = false;
					imgs.source = "";
				}
			}
		}
	}
}