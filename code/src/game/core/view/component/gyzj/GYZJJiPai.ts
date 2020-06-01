class GYZJJiPai extends eui.Component {
	public bgImage1: eui.Image;
	public bgImage: eui.Image;
	public colorImage: eui.Image;
	public otherImage: eui.Image;
	public huTip: eui.Image;
	public maskRect: eui.Rect;
	public paiNumLable: eui.Label;
	private paiValue: number;
	private jiPaiChong: eui.Image;

	public constructor(cardVal: number,paiNum: number, isJiaoZui: boolean,ischong:boolean=false) {
		super();
		this.skinName = "resource/skins/component/gyzj/GYZJJiPaiSkin.exml";
		this.paiValue = cardVal;
		this.initWithData();
		this.setJiPaiNum(cardVal, paiNum,ischong);
	}
	/**设置鸡牌的数量 */
	private setJiPaiNum(cardType: number, val: any,ischong:boolean) {
		var content: string;
		if(ischong) this.jiPaiChong.visible = true;
		switch (cardType) {
			case 21:
				content = "幺鸡";
				break;
			case 18:
				content = "八筒";
				break;
			default:
				content = "翻牌鸡";
				break;
		}
		this.paiNumLable.text = content + "✖" + val;
	}
	/**手牌数据 */
	private initWithData() {
		if (this.paiValue <= 0) {
			this.visible = false;
		}
		this.colorImage.source = RES.getRes("color_value_" + this.paiValue + "_png");
	}
	public setFont(iswin: boolean) {
		if (iswin)
			this.paiNumLable.textColor = 0Xffd87c;
	}
	// case 1:
	// 	content = "冲锋鸡";
	// 	this.jiPaiChong.visible = true;
	// 	break;
	// case 2:
	// 	content = "责任鸡";
	// 	break;
	// case 3:
	// 	content = "包鸡";
	// 	break;
	// case 4:
	// 	content = "翻牌鸡";
	// 	break;
	// case 5:
	// 	content = "幺鸡";
	// 	break;
	// case 6:
	// 	content = "八筒";
	// 	break;
	// case 7:
	// 	content = "烧鸡";
	// 	break;
	// default:
	// 	content = "没有这种类型的鸡";
	// 	break;
}