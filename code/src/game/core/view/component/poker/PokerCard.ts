class PokerCard extends eui.Component {
	public value: number;
	public color: number;
	public number: number;
	private beiImage: eui.Image;
	private zhengGroup: eui.Group;
	private valueLabel: eui.BitmapLabel;
	private bigColorImg: eui.Image;
	private smallColorImg: eui.Image;
	private maskImage: eui.Image;
	private otherImage: eui.Image;
	public constructor(isNew) {
		super();
		this.touchEnabled = false;
		this.touchChildren = false;
		if (isNew) {
			this.skinName = new PokerSkin();
		} else {
			this.skinName = "NewPokerSkin";
		}
	}

	public showOtherImage(visible) {
		this.otherImage.visible = visible;
	}


	public showMask(visible) {
		this.maskImage.visible = visible;
	}

	public createChildren() {
		super.createChildren();
	}

	public initWithNum(num: number) {
		this.number = num;
		if (num == 0) {
			this.showZ2B();
		} else {
			this.color = Math.floor(num / 100);
			this.value = Math.floor(num % 100);
			this.changeImage();
			this.showB2Z();
		}
	}


	public changeByNumber(num: number) {
		this.number = num;
		this.color = Math.floor(num / 100);
		this.value = Math.floor(num % 100);
		this.changeImage();
	}
	/**
	 * 牌面
	 */
	public changeImage() {
		this.valueLabel.text = PukerUtils.number2Puker(this.value);
		this.smallColorImg.source = RES.getRes(`zjh_big_${this.color}_png`);
		if (this.value >= 11 && this.value <= 13) {
			if (this.color == 1 || this.color == 3) {
				this.bigColorImg.source = RES.getRes(`zjh_${this.value}_1_png`);
			} else {
				this.bigColorImg.source = RES.getRes(`zjh_${this.value}_2_png`);
			}
		} else {
			this.bigColorImg.source = RES.getRes(`zjh_big_${this.color}_png`);
		}
		if (this.color == 1 || this.color == 3) {
			this.valueLabel.font = "zjh_poker_blcak_fnt";
		} else {
			this.valueLabel.font = "zjh_poker_red_fnt";
		}
	}

	/**
	 * 背面变正面。
	 */
	public showB2Z() {
		this.beiImage.visible = false;
		this.zhengGroup.visible = true;
	}

	/**
	 * 正面变背面。
	 */
	public showZ2B() {
		this.beiImage.visible = true;
		this.zhengGroup.visible = false;
	}

	public selectDown() {
		this.y = 0;
	}

	public selectUp() {
		this.y = - 20;
	}


	public fanpai() {
		if (Global.runBack) {
			this.showB2Z();
		}
		let scaleX = this.scaleX;
		egret.Tween.get(this).to({ scaleX: 0 }, 200)
			.call(() => {
				this.showB2Z();
			}).to({ scaleX: scaleX }, 150);
	}
}