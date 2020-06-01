/*
 * @Author: MC Lee 
 * @Date: 2019-06-12 11:36:05 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 11:58:00
 * @Description: 筹码组
 */
class BlackJCMGroup extends game.BaseUI {
	private cmGroup: eui.Group;
	public coinLists: CoinComponent[] = [];
	private tipImage: eui.Image;
	public index: number;
	private indexLabel: eui.Label;
	private tipLabel: eui.Label;
	public constructor() {
		super();
	}

	public createChildren() {
		super.createChildren();
		this.tipLabel.text = CF.tigc(143);
	}

	public init(index) {
		this.index = index;
		this.indexLabel.text = index;
	}

	/**
	 * 可以下注的提示
	 * @param  {} visible
	 */
	public showCanYZTip(visible) {
		this.tipImage.visible = visible;
		if (visible) {
			egret.Tween.get(this.tipImage, { loop: true }).to({
				y: -54
			}, 300).to({
				y: -44
			}, 300);
		} else {
			egret.Tween.removeTweens(this.tipImage);
			this.tipImage.y = -44;
			game.UIUtils.removeSelf(this.tipImage);
		}
	}


	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.tipImage:
				return;
		}
		this.cmTouch();
	}

	/**
	 * 可以押注的时候点击
	 */
	private cmTouch() {
		let roomInfo = Global.roomProxy.roomInfo as BaseRoomInfo;
		if (roomInfo.roomState == BLACK_J_ROUND_STATUS.ADD_BET) {
			CF.dP(ENo.CMGROUP_TOUCH, this.index);
		}
	}


	public addCm(coin: CoinComponent) {
		let point = this.cmGroup.globalToLocal(coin.x, coin.y);
		coin.x = point.x;
		coin.y = point.y
		this.cmGroup.addChild(coin);
		this.coinLists.push(coin);
	}


	public findCoin() {
		return this.coinLists.pop();
	}
}