/*
 * @Author: MC Lee 
 * @Date: 2019-06-12 10:42:40 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-06-27 19:13:53
 * @Description: 基础筹码金币类
 */
class CoinComponent extends eui.Component {
	/**
	 * 金币底图
	 */
	public coinImage: eui.Image;
	/**
	 * 选中框
	 */
	public kImage: eui.Image;
	/**
	 * 分数
	 */
	public scoreLabel: eui.BitmapLabel;
	/**
	 * 分数值
	 */
	public score: number;

	public selected: boolean = false;
	private CoinType: number;
	public jiazhuImg: eui.Image;
	public constructor(coinType) {
		super();
		this.CoinType = coinType;
		switch (coinType) {
			case CoinType.BLACKJ:
				this.skinName = new BlackJCMSkin();
				break;
			case CoinType.BAICAO:
				this.skinName = "BaiCaoCMSkin";
				break;
			case CoinType.SUPERBAICAO:
				this.skinName = "SuperBaiCaoCMSkin";
				break;
		}
	}


	public createChildren() {
		super.createChildren();
		this.touchChildren = false;
		this.kImage.visible = false;
	}

	public setSelected(flag) {
		this.selected = flag;
		this.kImage.visible = flag;
	}

	/**
	 * 显示金币
	 */
	public showCoin(resourceName, value, betIndex: number = 0) {
		this.coinImage.source = RES.getRes(resourceName + "_png");
		this.scoreLabel.text = this.getCMNumber(value);
		this.score = value;
		this.betIndex = betIndex;
	}
	private betIndex: number;
	public get BetIndex() {
		return this.betIndex;
	}
	/**
	 * 显示金币
	 */
	public showBaiCaoCoin(resourceName, value, betIndex: number = 0) {
		this.coinImage.source = RES.getRes(resourceName + "_png");
		this.scoreLabel.text = NumberFormat.BaiCaoCoin(value)//NumberFormat.formatGold_scence(value) //this.getCMNumberBaiCao(value);
		this.score = value;
		this.betIndex = betIndex;
	}

	public updateNumber(value) {
		this.scoreLabel.text = this.getCMNumber(value);
		this.score = value;
	}
	/**
	 * 
	 */
	public getCMNumber(value) {
		// if (value > 1000) {
		// 	return Math.floor(value / 1000) + "k"
		// }
		return value;
	}
}


const CoinType = {
	BLACKJ: 1,
	BAICAO: 2,
	SUPERBAICAO: 3
}