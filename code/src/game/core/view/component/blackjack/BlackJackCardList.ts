/*
 * @Author: MC Lee 
 * @Date: 2019-06-10 13:46:47 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 13:49:04
 * @Description: 21点扑克
 */
class BlackJackCardList extends game.BaseUI {
	protected poker1: PokerCard;
	protected poker2: PokerCard;
	protected poker3: PokerCard;
	protected poker4: PokerCard;
	protected poker5: PokerCard;
	public currentCard: number = 1;
	public pokerGroup: eui.Group;

	private scoreGroup: eui.Group;
	private dbImage: eui.Image;
	private scoreLabel: eui.Label;

	private result;
	public constructor() {
		super();
	}

	public createChildren() {
		super.createChildren();
		this.scoreGroup.visible = false;
		this.resetLists();
	}

	/**
	 * 烦开当前牌
	 */
	public showCurrent(value: number) {
		let poker = this[`poker${this.currentCard}`] as PokerCard;
		if (value) {
			poker.changeByNumber(value);
		}
		poker.fanpai();
	}

	public resetLists() {
		for (let i = 1; i <= 5; i++) {
			this[`poker${i}`].visible = false;
			this[`poker${i}`].otherImage.source = RES.getRes(`blackj_point_sb${CF.tic}`);
			game.UIUtils.removeSelf(this[`poker${i}`]);
		}
		this.currentCard = 1;
	}

	public fanCurrentCard(value, poker) {
		poker.visible = true;
		this.pokerGroup.addChild(poker);
		if (value == 0) {
			return;
		}
		poker.changeByNumber(value);
		poker.fanpai();
	}

	public currentCardOther(index) {
		let poker = this[`poker${index}`] as PokerCard;
		if (!poker) {
			return;
		}
		poker.showOtherImage(true);
	}

	public getCurrentCard() {
		let poker = this[`poker${this.currentCard}`] as PokerCard;
		if (!poker) {
			return;
		}
		this.pokerGroup.addChild(poker);
		this.changeWidth();
		return poker;
	}

	public showMaskRect(visible: boolean = true) {
		if (this.result == BLACKJ_PATTERN.BOOM) {
			return;
		}
		for (let i = 1; i <= 5; i++) {
			this[`poker${i}`].showMask(visible);
		}
	}

	/**
	 * 展现分数
	 */
	public showPoint(pattern, point) {
		if (point == null || point[0] < 0) {
			return;
		}
		if (pattern == BLACKJ_PATTERN.BOOM || point > 21) {
			this.dbImage.source = RES.getRes(`blackj_point_1_png`);
			this.scoreLabel.text = CF.tigc(130);
			this.scoreGroup.visible = true;
			this.dbImage.visible = true;
			this.showMaskRect();
		} else if (pattern == BLACKJ_PATTERN.FIVE_LITTLE_DRAGONS) {
			this.scoreGroup.visible = false;
			this.dbImage.visible = true;
			this.playFiveLong();
		} else if (pattern == BLACKJ_PATTERN.BLACKJACK) {
			this.scoreGroup.visible = false;
			this.playBlackJ();
		} else {
			if (point[0] < 1) {
				return;
			}
			if (point[0] == 21) {
				this.dbImage.source = RES.getRes(`blackj_point_3_png`);
			} else {
				this.dbImage.source = RES.getRes(`blackj_point_2_png`);
			}
			this.dbImage.visible = true;
			this.setPoint(point);
			this.scoreGroup.visible = true;
		}
		this.result = pattern;
		// this.changeWidth();
		this.changePointPosition();
	}

	private setPoint(points) {
		if (points.length == 1) {
			this.scoreLabel.text = points[0];
			this.scoreLabel.size = 28;
			this.scoreLabel.scaleX = this.scoreLabel.scaleY = 1;
		} else {
			this.scoreLabel.text = points[0] + "/" + points[1];
			this.scoreLabel.size = 20;
		}
	}


	public playBoom() {
		let db = new DBComponent("21d_boom");
		db.x = this.pokerGroup.width / 2 + 20
		db.y = this.pokerGroup.height / 2
		this.addChild(db);
		db.playByFilename(1);
		SoundManager.getInstance().playEffect("blackj_boom_mp3");
	}

	public playBlackJ() {
		let db = new DBComponent(`21d_hjk${CF.tiAni}`);
		db.x = this.pokerGroup.width / 2 + 20;
		db.y = this.pokerGroup.height / 2 + 30;
		this.addChild(db);
		db.playNamesAndLoop([`21d_hjk${CF.tiAni}`, `21d_hjk_loop${CF.tiAni}`]);
		db.x = 222 / 2;
		db.y = 103;
	}

	public playFiveLong() {
		let db = new DBComponent(`21d_wxl${CF.tiAni}`);
		this.addChild(db);
		db.playNamesAndLoop([`21d_wxl${CF.tiAni}`, `21d_wxl_loop${CF.tiAni}`]);
		db.x = 222 / 2;
		db.y = 103;
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
			this.pokerGroup.addChild(poker);
		}
		this.currentCard = cards.length + 1;
		this.changeWidth();
	}

	/**
	 * 居中
	 */
	public changeWidth() {
		let arr = [62, 47, 31, 16, 0]
		let num = this.pokerGroup.numChildren;
		this.pokerGroup.x = arr[num - 1];

		let widthArr = [133, 177, 221, 265, 308];
		this.pokerGroup.width = widthArr[num - 1];
	}

	public changePointPosition() {
		// let arr = [61, 82, 103, 124, 145]
		// let num = this.pokerGroup.numChildren;
		switch (this.uiIndex) {
			case 2:
				this.scoreGroup.x = this.pokerGroup.x - this.scoreGroup.width
				break;
			default:
				this.scoreGroup.x = this.pokerGroup.x + this.pokerGroup.width * 0.72
				break;
		}
	}


	public changeLast2Double() {
		this.currentCardOther(this.currentCard - 1);
	}

	/**
	 * 改变分数组的位子
	 * @param  {} index
	 */
	private uiIndex: number;
	//是第一个还是第二个
	public cardIndex: number;
	public changeScoreGroup(index) {
		this.uiIndex = index;
		switch (index) {
			case 3:
			case 1:
				this.dbImage.scaleX = 1;
				// if (this.cardIndex == 1) {
				// 	this.scoreGroup.y = 0;
				// } else {
				// 	this.scoreGroup.y = 20;
				// }
				break;
			case 2:
				this.dbImage.scaleX = -1;
				// if (this.cardIndex == 1) {
				// 	this.scoreGroup.y = 0;
				// } else {
				// 	this.scoreGroup.y = 20;
				// }
				break;
			case 6:
				this.dbImage.scaleX = 1;
				// this.scoreGroup.y = 40;
				break;
		}

	}
}