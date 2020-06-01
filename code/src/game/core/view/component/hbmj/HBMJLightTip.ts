/*
 * @Author: MC Lee 
 * @Date: 2019-09-23 10:43:14 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-24 19:36:30
 * @Description: 卡五星灯泡提示
 */
class HBMJLightTip extends game.BaseUI {
	private tipBtn: eui.Button;
	private tipScroller: majiang.HuTipsScrollerBar;
	private playerIndex;
	public constructor() {
		super();
	}

	public createChildren() {
		super.createChildren();
		this.tipBtn.visible = this.tipScroller.visible = false;
	}

	public setPlayerIndex(index) {
		this.playerIndex = index;
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.tipBtn:
				this.tipBtnTouch();
				break;
		}
	}

	private tipBtnTouch() {
		if (this.tipScroller.visible) {
			this.tipScroller.visible = false;
		} else {
			let playerData = Global.gameProxy.getPlayerByIndex(this.playerIndex);
			let cards = playerData.canHuCards;
			for(let i = 0; i < cards.length; i++){
				let cardData = cards[i];
				let count = majiang.MajiangUtils.findValueLess(cardData.card);
				cardData[`count`] = count;
			}
			this.tipScroller.showBar(playerData.canHuCards, 3);
		}
	}

	public showLightTip() {
		this.tipBtn.visible = true;
		this.visible = true;
	}
}