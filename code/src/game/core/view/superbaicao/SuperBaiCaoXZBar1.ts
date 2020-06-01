class SuperBaiCaoXZBar1 extends game.BaseUI {
	private coin1: CoinComponent;
	private coin2: CoinComponent;
	private coin3: CoinComponent;
	private coin4: CoinComponent;
	public currentScore: number = 0;
	private genZhuBtn: smart.ButtonNew;
	private rootName: SuperBaiCaoGameScene;
	private betIndex: number;
	public constructor() {
		super();
		this.skinName = "SuperBaiCaoXZBarSkin";

	}
	public setRoot(root: SuperBaiCaoGameScene) {
		this.rootName = root;
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
				this.betIndex = coin.BetIndex;
				// this.currentScore = coin.score;
			}
		}
	}
	public hide(needAni: boolean = true) {
		egret.Tween.get(this).to({
			verticalCenter: 1700,
			alpha: 0
		}, 400, egret.Ease.quadOut);
		this.setAutoTimeout(() => {
			egret.Tween.removeTweens(this);
			this.verticalCenter = 1700;
			this.xzVisible = false;
		}, 200, this);
		if (Global.runBack) {
			egret.Tween.removeTweens(this);
			this.verticalCenter = 1700;
			this.xzVisible = false;
		}
		if (needAni == false) {
			egret.Tween.removeTweens(this);
			this.verticalCenter = 1700;
			this.xzVisible = false;
		}
	}


	private xzVisible: boolean = false;
	public get xzBarVis() {
		return this.xzVisible;
	}
	public show() {
		this.visible = true;
		egret.Tween.get(this).to({
			verticalCenter: 532,
			alpha: 1
		}, 400, egret.Ease.quadOut);
		this.setAutoTimeout(() => {
			this.verticalCenter = 532;
			this.xzVisible = true;
			this.alpha = 1;
			this.visible = true;
		}, 200, this);
	}
	public initWithArr(xzArr, betBase, genzhuVal: number) {
		for (let i = 0; i < xzArr.length; i++) {
			let coinNumber = xzArr[i];
			let coin = this[`coin${i + 1}`] as CoinComponent;
			let realCoinVal = new Big(coinNumber * betBase).add(genzhuVal)//coinNumber * betBase + genzhuVal;
			coin.showBaiCaoCoin(`superbaicao_cm_${i + 1}`, realCoinVal, i);//coinNumber * betBase
			coin.kImage.source = `superbaicao_cm_on_${i + 1}` + "_png"
		}
		this.selectByIndex(1);
		this.setFlowBtnTxt(genzhuVal);
	}
	private setFlowBtnTxt(val: number) {
		let targetTxt: eui.Label = this.genZhuBtn.commonTxt;
		targetTxt.size = 24;
		targetTxt.verticalCenter = 15;
		targetTxt.textColor = 0xfef9d3;
		targetTxt.bold = true;
		let realVal: any = val;
		targetTxt.text=NumberFormat.formatGold_scence(val)
		targetTxt.visible = val > 0;
		LogUtils.logD("=====vis===="+targetTxt.visible+"val:"+val);
	}
	// private onTouch
	public onTouchTap(e: egret.TouchEvent) {
		if (this.canTouchCoin == false) return;
		switch (e.target) {
			case this.coin1:
				this.selectByIndex(1);
				this.onTouchJiaZhu();
				break;
			case this.coin2:
				this.selectByIndex(2);
				this.onTouchJiaZhu();
				break;
			case this.coin3:
				this.selectByIndex(3);
				this.onTouchJiaZhu();
				break;
			case this.coin4:
				this.selectByIndex(4);
				this.onTouchJiaZhu();
				break;
			case this.genZhuBtn:
				this.onTouchFollow();
				break;
		}
	}
	private canTouchCoin: boolean = true;


	private async onTouchJiaZhu() {


		let data = {
			type: 3,
			betIndex: this.betIndex,
		}
		let resp: any = await Global.pomelo.request(ServerPostPath.game_superBaiCaoHandler_c_oprate, data);
		Global.pomelo.clearLastLock();
		//成功
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			this.hide();
			this.rootName.hideGiveBtn();
		}
	}


	private async onTouchFollow() {
		let data = {
			type: 2
		}
		let resp: any = await Global.pomelo.request(ServerPostPath.game_superBaiCaoHandler_c_oprate, data);
		Global.pomelo.clearLastLock();
		//成功
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			this.hide();
		}
	}


}