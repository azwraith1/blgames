/*
 * @Author: MC Lee 
 * @Date: 2019-06-12 10:53:08 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 11:37:09
 * @Description: 下注条
 */
class BlackJackXZBar extends game.BaseUI {
	private coin1: CoinComponent;
	private coin2: CoinComponent;
	private coin3: CoinComponent;
	private coin4: CoinComponent;
	private okBtn: eui.Button;
	public currentScore: number = 0;
	public constructor() {
		super();
	}

	public createChildren() {
		super.createChildren();
		TextUtils.cBtnRes(this.okBtn, "blackj_xz_btn");
	}

	private root: BlackJackGameScene;
	public setRoot(root: BlackJackGameScene) {
		this.root = root;
	}


	public grayBtn(flag) {
		this.okBtn.touchEnabled = !flag;
		game.UIUtils.setGray(this.okBtn, flag);
	}


	public hide() {
		egret.Tween.get(this).to({
			verticalCenter: 1500
		}, 400, egret.Ease.sineIn);
		this.setAutoTimeout(() => {
			this.visible = false;
		}, 400, this);
	}

	public initWithArr(xzArr, betBase) {
		for (let i = 0; i < xzArr.length; i++) {
			let coinNumber = xzArr[i];
			let coin = this[`coin${i + 1}`] as CoinComponent;
			coin.showCoin(`blackj_cm_${i + 1}`, coinNumber * betBase);
		}
		this.selectByIndex(1);
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.coin1:
				this.selectByIndex(1);
				break;
			case this.coin2:
				this.selectByIndex(2);
				break;
			case this.coin3:
				this.selectByIndex(3);
				break;
			case this.coin4:
				this.selectByIndex(4);
				break;
			case this.okBtn:
				this.okBtnTouch();
				break;
		}
	}

	/**
	 * 结束下注
	 */
	private async okBtnTouch() {
		let data2 = {};
		let resp: any = await Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_finishBet, data2);
		if (resp && resp.error && resp.error.code == 0) {
			this.hide();
			this.root.lockYZ = true;
			this.root.stopTimerByIndex(Global.roomProxy.getMineIndex());
		}
	}

	/**
	 * 选择
	 * @param  {number} index
	 */
	public selectByIndex(index: number) {
		for (let i = 1; i <= 4; i++) {
			let coin = this[`coin${i}`] as CoinComponent;
			coin.setSelected(i == index)
			if (i == index) {
				this.currentScore = coin.score;
			}
		}
	}
}