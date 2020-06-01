class BaiCaoCardList extends game.BaseUI {
	protected poker1: PokerCard;
	protected poker2: PokerCard;
	protected poker3: PokerCard;
	//	public currentCard: number = 1;
	public pokerGroup: eui.Group;
	private xPoint: number[] = [65, 144, 223];
	private yPoint: number[] = [93, 93, 93];
	public constructor() {
		super();
		this.skinName = "BaiCaoCardListSkin";
	}
	public getCurrentCard(currentIndex: number) {
		return this["poker" + currentIndex];
	}

	public showMaskRect(visible: boolean = true) {
		for (let i = 1; i <= 3; i++) {
			this[`poker${i}`].showMask(visible);
		}
	}
	public resetLists() {
		for (let i = 1; i <= 3; i++) {
			this[`poker${i}`].visible = false;
			(this[`poker${i}`] as PokerCard).showZ2B();
			(this[`poker${i}`] as PokerCard).showMask(false);
		}
	}
	public showBei() {
		for (let i = 1; i <= 3; i++) {
			this[`poker${i}`].visible = true;
			(this[`poker${i}`] as PokerCard).showZ2B();
		}
	}
	public showZheng(cards) {
		if (!cards) {
			return
		}
		this.resetLists();
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];
			let index = i + 1;
			let poker = this[`poker${index}`] as PokerCard;
			poker.initWithNum(card);
			poker.visible = true;
			poker.showB2Z();
		}
	}
	public fanCards() {
		for (let i = 1; i <= 3; i++) {
			this[`poker${i}`].visible = true;
			(this[`poker${i}`] as PokerCard).showB2Z();
		}
	}
	/**
 * 根据传入手牌显示
 * @param  {} cards
 */
	public initWidthCard(cards) {
		if (!cards) {
			return
		}
		this.resetLists();
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];
			let index = i + 1;
			let poker = this[`poker${index}`] as PokerCard;
			poker.initWithNum(card);
			poker.visible = true;
		}
	}

	/**初始化卡牌数据 */
	public initCardsData(cards) {
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];
			let index = i + 1;
			let poker = this[`poker${index}`] as PokerCard;
			poker.changeByNumber(card);
		}
	}
	/**
		 * 展牌动画
		 */
	public cardAnimation() {

		if (Global.runBack) {
			//后台
			this.poker1.x = this.xPoint[0]; this.poker1.y = this.yPoint[0];
			this.poker2.x = this.xPoint[1]; this.poker2.y = this.yPoint[0];
			this.poker3.x = this.xPoint[2]; this.poker3.y = this.yPoint[0];
			return
		}
		SoundManager.getInstance().playEffect("bc_resultturn_mp3");
		this.alphaIs0();
		egret.Tween.get(this.poker1).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[0], y: this.yPoint[0] }, 300)
		egret.Tween.get(this.poker2).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[1], y: this.yPoint[1] }, 300)
		egret.Tween.get(this.poker3).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[2], y: this.yPoint[2] }, 300)

	}
	public alphaIs0() {
		for (let i = 1; i <= 3; i++) {
			let card = this["poker" + i] as PokerCard;
			card.x = this.xPoint[0];
			card.y = this.yPoint[0];
		}
	}
}