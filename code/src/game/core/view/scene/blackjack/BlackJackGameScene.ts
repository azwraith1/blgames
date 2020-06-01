/*
 * @Author: MC Lee 
 * @Date: 2019-06-05 10:08:17 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 12:02:00
 * @Description: 21点游戏场景
 */
class BlackJackGameScene extends game.BaseGameScene {
	/**
		 * 背景音乐
		 */
	public bgMusic: string = "blackjack_bgm_mp3";

	//new
	/**
	 * 打开游戏界面通知
	 */
	public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_BLACKJ_GAME;

	/**
	 * 关闭游戏界面通知
	 */
	public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_BLACKJ_HALL;

	/**
	 * 关闭当前界面通知
	 */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BLACKJ_GAME;

	/**
	 * 对应匹配界面通知
	 */
	public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_BLACKJ_MATCHING;

	//eui
	//0-5 0是庄家
	private group0: eui.Group;
	//1-5
	private header1: eui.Group;

	private cmGroup1: BlackJCMGroup;
	//庄家的牌
	private card0: BlackJackCardList;
	//第一组牌
	private card1_1: BlackJackCardList;
	//第二组牌
	private card1_2: BlackJackCardList;
	//下注的金额
	private scoreGroup1: eui.Group;
	//对应作为下注的总金额
	private scoreLabel1: eui.Label;
	//玩家操作条
	private gameBar: BlackJackGameBar;
	//下注bar
	private xzBar: BlackJackXZBar;

	private directions: any;

	private tabelDirections: any = {};

	private diFen: eui.Label;

	private effectGroup: eui.Group;

	private outGroup: eui.Group;

	private roomYZBets: number[];

	private dbGroup: eui.Group;

	private fapaiGroup: eui.Group;

	//保险group
	private baoxianGroup: eui.Group;

	private buyBtn: eui.Button;

	private noBuyBtn: eui.Button;
	/**smart 所有牌的终点 */
	private shouPaiPos: eui.Rect;


	public constructor() {
		super();
		this.skinName = `BlackJackGameSceneSkin${CF.tis}`;
	}

	/**
	 * 收牌动画
	*/
	private allCards: Array<PokerCard>;
	private shouPaiAni() {
		this.allCards = [];
		var tartgetPos = new egret.Point(this.shouPaiPos.localToGlobal().x, this.shouPaiPos.localToGlobal().y);
		var cardList: BlackJackCardList;
		for (let j = 0; j < 4; ++j) {
			if (j == 0) {
				cardList = this["card" + j];
				cardList.showMaskRect(false);
				this.groupShouCardAni(tartgetPos, cardList);
			}
			else {
				for (let i = 1; i <= 2; ++i) {
					cardList = this["card" + j + "_" + i];
					cardList.showMaskRect(false);
					this.groupShouCardAni(tartgetPos, cardList);
				}
			}

		}
		this.setAutoTimeout(() => {
			let count = 0;;
			async.eachSeries(this.allCards, (card, callback) => {
				let time = 1000;
				egret.Tween.get(card).wait(15 * (count / 2)).call(() => {//15 * (num / 2) samrt 金币中间等待时间变短
					count++;
					callback();
				}).to({
					x: this.fapaiGroup.x,
					y: this.fapaiGroup.y,
					scaleX: 0.4,
					scaleY: 0.4,
					alpha: 0,
					rotation: 0
				}, time, egret.Ease.cubicInOut).call(() => {
					card.visible = false;

					// game.UIUtils.removeSelf(card);
				});
			})
		}, this, 1100);
	}
	private groupShouCardAni(target: egret.Point, cardList: BlackJackCardList) {
		let arr = [];
		for (let j = 0; j < cardList.pokerGroup.numChildren; j++) {
			arr.push(cardList.pokerGroup.getChildAt(j));
			this.allCards.push(cardList.pokerGroup.getChildAt(j) as PokerCard);
		}
		let num = 0;
		async.eachSeries(arr, (card, callback) => {
			let time = 1000;
			let startPos = card.localToGlobal();
			// let waitTime = Math.random() * 2 * 15;
			this.effectGroup.addChild(card);
			card.x = startPos.x;
			card.y = startPos.y;
			egret.Tween.get(card).wait(15 * (num / 2)).call(() => {//15 * (num / 2) samrt 金币中间等待时间变短
				num++;
				callback();
			}).to({
				x: target.x,
				y: target.y,
			}, time, egret.Ease.cubicInOut).call(() => {
			});
		})

	}
	public createChildren() {
		super.createChildren();
		FrameUtils.changeBgImage("./resource/gameAssets/blackjack_hall/blackj_hall_bg.jpg");
		this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), 3);
		for (let key in this.directions) {
			this.tabelDirections[this.directions[key]] = key;
		}
		this.diFen.text = CF.tigc(29) + ": " + Global.gameProxy.lastGameConfig.diFen;
		this.initUI();
		this.xzBar.setRoot(this);
		this.gameBar.setRoot(this);
		let roomInfo = Global.roomProxy.roomInfo;
		this.roomYZBets = roomInfo.addBetMulti;
		if (Global.roomProxy.reconnect) {
			this.showReconnectUI();
			this.showCountDown();
			this.showRoomByStatus(true);
		} else {
			this.setAutoTimeout(() => {
				this.showStartAni();
			}, this, 400)
		}
		this.initCMList();
	}

	/**
	 * 重连显示倒计时
	 */
	private showCountDown() {
		let roomInfo = Global.roomProxy.roomInfo as BaseRoomInfo;
		let data = roomInfo.countdown;
		if (!data) {
			return;
		}
		if (data.route == "s_betCountDown" || data.route == "s_startInsurance") {
			for (let i = 1; i <= 3; i++) {
				let header = this[`header${i}`] as BlackJHeader;
				if (header.visible) {
					header.startTimer();
				}
			}
		}
	}

	private mineBet: number = 0;
	/**
	 * 显示重连数据
	 */
	private showReconnectUI() {
		let players = Global.roomProxy.getPlayers();
		for (let key in players) {
			let playerData = players[key];
			let proxys = playerData.proxys;
			this.showProxysData(proxys, key);
		}
		this.showDealerInfo();

	}

	/**
	 * 展现庄家的牌
	 */
	private showDealerInfo() {
		let roomInfo = Global.roomProxy.roomInfo;
		let dealerCardInfo = roomInfo.dealerCardInfo;
		if (dealerCardInfo) {
			this.card0.initWidthCard(dealerCardInfo.cards);
		}
	}


	private findCmGroupByIndex(index) {
		for (let i = 1; i <= 3; i++) {
			let cmGroup = this[`cmGroup${i}`] as BlackJCMGroup;
			if (cmGroup.index + "" == index + "") {
				return cmGroup;
			}
		}
		return null;
	}


	private showOneProxyData(key, playerIndex, proxyData) {
		let roomInfo = Global.roomProxy.roomInfo;
		let dir = this.directions[key];
		if (key != playerIndex) {
			//不是本人
			let tableHeader = this[`header${this.directions[key]}`] as BlackJHeader;
			tableHeader.showProxys(playerIndex);
		}
		let insuranceGold = proxyData.insuranceGold;
		let cardGroupInfo = proxyData.cardGroupInfo[0];
		if (cardGroupInfo) {
			let cmGroup = this.findCmGroupByIndex(key) as BlackJCMGroup;
			let addBetArr = [];
			for (let i = 0; i < roomInfo.addBetMulti.length; i++) {
				addBetArr.push(roomInfo.addBetMulti[i] * roomInfo.betBase);
			}
			let numbers = NumberFormat.chaifenScore(addBetArr, cardGroupInfo.totalBet);
			if (Global.roomProxy.checkIndexIsMe(key)) {
				this.mineBet = cardGroupInfo.totalBet;
			}
			for (let numKey in numbers) {
				let num = numbers[numKey];
				for (let i = 0; i < num; i++) {
					this.playerYZ(this.directions[key], key, numKey, false);
				}
			}
			this[`scoreGroup${dir}`].visible = true;
			this[`scoreLabel${dir}`].text = cardGroupInfo.totalBet + insuranceGold;
		}

		let size = 0;
		for (let i = 0; i <= 1; i++) {
			let cardGroupInfo = proxyData.cardGroupInfo[i];
			if (cardGroupInfo) {
				let cards = cardGroupInfo.cards;
				let pattern = cardGroupInfo.pattern;
				let point = cardGroupInfo.point;
				let cardList = this[`card${this.directions[key]}_${i + 1}`] as BlackJackCardList;
				let doubleCard = cardGroupInfo.doubleCard;
				cardList.initWidthCard(cards);
				cardList.showPoint(pattern, point);
				size++;
				if (doubleCard) {
					cardList.changeLast2Double();
				}
			}
		}

		//2个
		if (size == 2) {
			let cardList1 = this[`card${this.directions[key]}_1`] as BlackJackCardList;
			let cardList2 = this[`card${this.directions[key]}_2`] as BlackJackCardList;
			cardList1.verticalCenter -= 20;
			cardList2.verticalCenter += 60;
			//是这个牌组操作
			if (roomInfo.currentPlayerIndex == playerIndex && key == roomInfo.currentTableIndex) {
				if (roomInfo.currentCardGroupIndex == 0) {
					cardList2.showMaskRect();
				} else {
					cardList1.showMaskRect();
				}
			}
		}
	}


	/**
	 * 显示玩家代理数据
	 */
	private showProxysData(proxys, playerIndex) {
		for (let key in proxys) {
			let proxyData = proxys[key];
			this.showOneProxyData(key, playerIndex, proxyData);
		}
		//庄家牌


	}




	private showStartAni() {
		let startGame = new DBComponent(`21d_startgame${CF.tiAni}`);
		this.effectGroup.addChild(startGame);
		startGame.playByFilename(1);
		startGame.verticalCenter = -150;
		startGame.horizontalCenter = 0;
		SoundManager.getInstance().playEffect("blackj_start_mp3");
		// this.setAutoTimeout(() => {
		// 	this.timeBar.startTime(this);
		// 	this.timeBar.visible = true;
		// }, this, 1500);
	}

	/**
	 * 根据房间显示数据
	 */
	private showRoomByStatus(reconnect) {
		let roomInfo = Global.roomProxy.roomInfo;
		switch (roomInfo.roomState) {
			case BLACK_J_ROUND_STATUS.ADD_BET:
				this.runAddBet(reconnect);
				break;
			case BLACK_J_ROUND_STATUS.ACTION:
				for (let i = 1; i <= 3; i++) {
					let cmGroup = this[`cmGroup${i}`] as BlackJCMGroup;
					cmGroup.showCanYZTip(false);
				}
				this.xzBar.visible = false;
				this.runAction(reconnect);
				break;
			case BLACK_J_ROUND_STATUS.INSURANCE:
				for (let i = 1; i <= 3; i++) {
					let cmGroup = this[`cmGroup${i}`] as BlackJCMGroup;
					cmGroup.showCanYZTip(false);
				}
				this.xzBar.visible = false;
				this.runInsuance(reconnect);
				break;
			default:
				this.xzBar.visible = false;
				break;
		}
	}

	private runInsuance(reconnect) {
		if (reconnect) {
			this.checkCanMaiBx();
		}
	}


	private runAction(reconnect) {
		let roomInfo = Global.roomProxy.roomInfo;
		let playerData = Global.roomProxy.getMineData() as NNPlayerGameBean;
		// if (!playerData.addAnte) {
		this.showTableTips(roomInfo.currentTableIndex);
		let player = Global.roomProxy.getMineData() as PlayerGameDataBean;
		if (roomInfo.currentPlayerIndex == Global.roomProxy.getMineIndex()) {
			let proxys = this.getCurProxyData();
			this.gameBar.initActions(proxys.actions);
			this.gameBar.visible = true;
			// if (reconnect) {
			// 	this.gameBar.visible = true;
			// } else {
			// 	this.gameBar.horizontalCenter = -720;
			// 	this.gameBar.visible = true;
			// 	egret.Tween.get(this.gameBar).to({
			// 		horizontalCenter: 0
			// 	}, 400, egret.Ease.sineIn);
			// }
		} else {
			this.gameBar.visible = false;
		}
		let header = this[`header${this.directions[roomInfo.currentPlayerIndex]}`] as BlackJHeader;
		header.startTimer();
	}

	private outImage: eui.Image;
	private inImage: eui.Image;
	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.xlbtn:
				this.showBtnsType(2);
				return;
			case this.xlbtn1:
				this.showBtnsType(1);
				return;
			case this.buyBtn:
				this.buyBtnTouch();
				break;
			case this.noBuyBtn:
				this.noBuyBtnTouch();
				break;
			case this.restartBtn:
				this.allowBack = this.restartBtn.visible;
				this.restartBtnTouch();
				break;
			case this.backBtn:
				this.showBtnsType(1);
				this.allowBack = this.restartBtn.visible;
				this.backBtnTouch();
				break;
			case this.settingBtn:
				this.showBtnsType(1);
				CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "blackjack" });
				break;
			case this.recordBtn:
				this.showBtnsType(1);
				CF.sN(PanelNotify.OPEN_BASE_RECORD, "blackjack");
				break;
			case this.helpBtn:
				this.showBtnsType(1);
				BaseHelpShuPanel.getInstance(`BlackJHelpSkin${CF.tis}`, "blackj_help", CF.tic).show();
				break;
		}
		super.onTouchTap(e);
	}

	/**
	 * 购买按钮
	 * @param  {egret.TouchEvent} e
	 */
	private nextTableIndex;
	private async buyBtnTouch() {
		let data = {
			tableIndex: this.nextTableIndex,
			buy: 1
		}
		// this.baoxianGroup.visible = false;
		let resp: any = await Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_buyInsurance, data);
		Global.pomelo.clearLastLock();
		//成功
		if (resp && resp.error) {
			if (resp.error.code == 0) {
				let proxyData = this.getProxyData(Global.roomProxy.getMineIndex(), this.nextTableIndex);
				let header = this[`header${this.directions[this.nextTableIndex]}`] as BlackJHeader;
				header.showTipsImage(false);
				proxyData.insurance = true;
				this.checkCanMaiBx();
			} else if (resp.error.code != -10000) {
				Toast.launch(`${resp.error.msg}`);
				this.baoxianGroup.visible = true;
			}
		}
	}
	private checkCanMaiBx() {
		let roomInfo = Global.roomProxy.roomInfo;
		if (roomInfo.roomState != BLACK_J_ROUND_STATUS.INSURANCE) {
			return;
		}
		let playerData = Global.roomProxy.getMineInfo();
		let proxys = playerData.proxys;
		let nextTableIndex;
		for (let tableIndex in proxys) {
			let proxyData = proxys[tableIndex];
			if (proxyData.insurance == null || proxyData.insurance == undefined) {
				nextTableIndex = Number(tableIndex);
				break;
			}
		}
		if (nextTableIndex) {
			this.nextTableIndex = nextTableIndex;
			this.baoxianGroup.visible = true;
			this.showTableTips(this.nextTableIndex);
		} else {
			this.baoxianGroup.visible = false;
			let index = Global.roomProxy.getMineIndex();
			let header = this[`header${this.directions[index]}`] as BlackJHeader;
			header.removeTimer();
		}
	}

	/**
	 * 不买按钮
	 * @param  {egret.TouchEvent} e
	 */
	private async noBuyBtnTouch() {
		let data = {
			tableIndex: this.nextTableIndex,
			buy: 0
		}
		// this.baoxianGroup.visible = false;
		let resp: any = await Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_buyInsurance, data);
		//成功
		if (resp && resp.error && resp.error.code == 0) {
			let proxyData = this.getProxyData(Global.roomProxy.getMineIndex(), this.nextTableIndex);
			let header = this[`header${this.directions[this.nextTableIndex]}`] as BlackJHeader;
			header.showTipsImage(false);
			proxyData.insurance = false;
			this.checkCanMaiBx();
		}
	}

	/**
	 * 提示板子移动
	 * @param  {boolean} isShow
	 */
	private tipGroupShow(isShow: boolean) {
		egret.Tween.removeTweens(this.outGroup)
		if (isShow) {
			this.outImage.visible = false;
			this.inImage.visible = true;
			egret.Tween.get(this.outGroup).to({
				right: 0
			}, 300, egret.Ease.sineIn);
		} else {
			egret.Tween.get(this.outGroup).to({
				right: -261
			}, 300, egret.Ease.sineIn);
			this.setAutoTimeout(() => {
				this.outImage.visible = true;
				this.inImage.visible = false;
			}, this, 300);
		}
	}
	/**
	 * 倒计时推送
	 */
	private countdown(e: egret.Event) {
		let data = e.data;
		let roomInfo = Global.roomProxy.roomInfo as BaseRoomInfo;
		if (!roomInfo.countdown) {
			roomInfo.countdown = {};
		}
		if (data.route == "s_betCountDown" || data.route == "s_startInsurance") {
			for (let i = 1; i <= 3; i++) {
				let header = this[`header${i}`] as BlackJHeader;
				if (header.visible) {
					header.startTimer();
				}
			}
		}
		roomInfo.countdown = data;
		game.DateTimeManager.instance.updateServerTime(data.start);
	}

	/**
	 * 重连成功
	 */
	private reconnectSuc() {
		//对局已经结束不做处理
		if (this.allowBack) {
			Global.alertMediator.addAlert(CF.tigc(63), null, null, true);
			this.backHall();
			return;
		}
		let reqData = Global.gameProxy.lastGameConfig;
		if (!reqData) reqData = {};
		if (!Global.roomProxy.roomInfo || !Global.roomProxy.roomInfo.roomId) {
			this.backHall();
			return;
		}
		reqData.roomId = Global.roomProxy.roomInfo.roomId;
		this.reconnectCall(reqData)
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
		CF.aE(ServerNotify.s_actionsCardsIndex, this.s_actionsCardsIndex, this);
		CF.aE(ServerNotify.s_endInsurance, this.s_endInsurance, this);
		CF.aE(ServerNotify.s_dealHandCard, this.s_dealHandCard, this);
		CF.aE(ServerNotify.s_playerHandCard, this.s_playerHandCard, this);
		CF.aE(ServerNotify.s_finishBet, this.s_finishBet, this);
		CF.aE(ENo.CMGROUP_TOUCH, this.cmGroupTouch, this);
		CF.aE(ServerNotify.s_addCard, this.s_addCard, this);
		// CF.aE(ServerNotify.s_addCard, this.s_addCard, this);
		CF.aE(ServerNotify.s_doubleBet, this.s_doubleBet, this);
		CF.aE(ServerNotify.s_splitCard, this.s_splitCard, this);
		CF.aE(ServerNotify.s_playerBet, this.s_addBet, this);
		CF.aE(ServerNotify.s_startBet, this.s_startBet, this);
		CF.aE(ServerNotify.s_stopBet, this.s_stopBet, this);
		CF.aE(ServerNotify.s_countdown, this.countdown, this);
		CF.aE(ServerNotify.s_notifyPlayerAction, this.s_notifyPlayerAction, this);
		CF.aE(ServerNotify.s_startInsurance, this.s_startInsurance, this);
		CF.aE(ServerNotify.s_stopInsurance, this.s_stopInsurance, this);
		CF.aE(ServerNotify.s_insuranceSettlement, this.s_insuranceSettlement, this);
		CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		CF.aE(ServerNotify.s_dealCardsParttern, this.s_dealCardsParttern, this);
		CF.aE(ServerNotify.s_sendDealLastCards, this.s_sendDealLastCards, this);
		CF.aE(ServerNotify.s_stopCard, this.s_stopCard, this);
		CF.aE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
	}


	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_endInsurance, this.s_endInsurance, this);
		CF.rE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
		CF.rE(ServerNotify.s_actionsCardsIndex, this.s_actionsCardsIndex, this);
		CF.rE(ServerNotify.s_dealHandCard, this.s_dealHandCard, this);
		CF.rE(ServerNotify.s_playerHandCard, this.s_playerHandCard, this);
		CF.rE(ServerNotify.s_finishBet, this.s_finishBet, this);
		CF.rE(ENo.CMGROUP_TOUCH, this.cmGroupTouch, this);
		CF.rE(ServerNotify.s_addCard, this.s_addCard, this);
		CF.rE(ServerNotify.s_stopCard, this.s_stopCard, this);
		CF.rE(ServerNotify.s_doubleBet, this.s_doubleBet, this);
		CF.rE(ServerNotify.s_splitCard, this.s_splitCard, this);
		CF.rE(ServerNotify.s_playerBet, this.s_addBet, this);
		CF.rE(ServerNotify.s_startBet, this.s_startBet, this);
		CF.rE(ServerNotify.s_stopBet, this.s_stopBet, this);
		CF.rE(ServerNotify.s_countdown, this.countdown, this);
		CF.rE(ServerNotify.s_notifyPlayerAction, this.s_notifyPlayerAction, this);
		CF.rE(ServerNotify.s_startInsurance, this.s_startInsurance, this);
		CF.rE(ServerNotify.s_stopInsurance, this.s_stopInsurance, this);
		CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		CF.rE(ServerNotify.s_insuranceSettlement, this.s_insuranceSettlement, this);
		CF.rE(ServerNotify.s_sendDealLastCards, this.s_sendDealLastCards, this);
		CF.rE(ServerNotify.s_dealCardsParttern, this.s_dealCardsParttern, this);
		CF.rE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
	}

	/**
	 * 游戏结束
	 * @param  {egret.TouchEvent} e
	 */
	private s_roomFinished(e: egret.Event) {
		super.roomGameOver(e);
		let data = e.data;
		let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
		if (!roomInfo) {
			return;
		}
		roomInfo.roundStatus = data.status;
	}

	/**
	 * 
	 */
	private s_actionsCardsIndex(e: egret.Event) {
		let data = e.data;
		let tableIndex = data.tableIndex;
		let cardGroupIndex = data.cardsIndex;
		if (cardGroupIndex == 1) {
			let cardList1 = this[`card${this.directions[tableIndex]}_1`] as BlackJackCardList;
			cardList1.showMaskRect(false);
			let cardList2 = this[`card${this.directions[tableIndex]}_2`] as BlackJackCardList;
			cardList2.showMaskRect();
		} else {
			let cardList1 = this[`card${this.directions[tableIndex]}_1`] as BlackJackCardList;
			cardList1.showMaskRect();
			let cardList2 = this[`card${this.directions[tableIndex]}_2`] as BlackJackCardList;
			cardList2.showMaskRect(false);
		}
	}

	/**
	 * 玩家结束
	 * @param  {egret.Event} e
	 */
	private s_endInsurance(e: egret.Event) {
		let roomInfo = Global.roomProxy.roomInfo;
		this.playerTimeOver(e.data.playerIndex);
		let header = this[`header${this.directions[e.data.playerIndex]}`] as BlackJHeader;
		header.showTipsGroup(CF.tigc(118), false);
	}


	private s_dealCardsParttern(e: egret.Event) {
		let data = e.data;
		let isBlackJack = data.isBlackJack;
		if (!data.isBlackJack) {
			Toast.launch(CF.tigc(117));
		}
	}

	/**
	 * 拆牌
	 * @param  {egret.Event} e
	 */
	private s_splitCard(e: egret.Event) {
		let data = e.data;
		let cardsGroup1 = data.cardGroup1;
		let cardsGroup2 = data.cardGroup2
		let point1 = data.point1;
		let point2 = data.point2;
		let pattern1 = data.pattern1;
		let pattern2 = data.pattern2;
		let tableIndex = data.tableIndex;
		let playerIndex = data.playerIndex;
		let actions = data.actions;
		let header = this[`header${this.directions[e.data.playerIndex]}`] as BlackJHeader;
		header.showTipsGroup(CF.tigc(119))
		if (actions && Global.roomProxy.checkIndexIsMe(playerIndex)) {
			this.gameBar.initActions(actions)
			this.gameBar.visible = true;
		}
		let proxyData = this.getProxyData(data.playerIndex, data.tableIndex);
		if (!proxyData.cardGroupInfo) {
			proxyData.cardGroupInfo = {};
		}
		proxyData.cardGroupInfo[0] = {
			cards: cardsGroup1,
			point: point1,
			pattern: pattern1
		}
		proxyData.cardGroupInfo[1] = {
			cards: cardsGroup2,
			point: point2,
			pattern: pattern2
		}
		let roomInfo = Global.roomProxy.roomInfo;
		roomInfo.currentCardGroupIndex = 0;
		let cardList1 = this[`card${this.directions[tableIndex]}_1`] as BlackJackCardList;
		let cardList2 = this[`card${this.directions[tableIndex]}_2`] as BlackJackCardList;
		cardList1.initWidthCard([cardsGroup1[0]]);
		cardList2.initWidthCard([cardsGroup2[0]]);
		cardList2.showMaskRect(false);
		cardList1.showMaskRect(false);
		egret.Tween.get(cardList1).wait(50).to({
			verticalCenter: cardList1.verticalCenter - 20
		}, 100);
		egret.Tween.get(cardList2).wait(50).to({
			verticalCenter: cardList2.verticalCenter + 60
		}, 100);
		this.setAutoTimeout(() => {
			this.createPokers(1)
			this.poker2Player(tableIndex, 1, cardsGroup1[1], 1, false);
			this.setAutoTimeout(() => {
				cardList1.showPoint(pattern1, point1);
				this.createPokers(1)
				this.poker2Player(tableIndex, 2, cardsGroup2[1], 1, false);
				this.setAutoTimeout(() => {
					cardList2.showPoint(pattern2, point2);
				}, this, 800)
			}, this, 800);
		}, this, 800);

		// this.showOneProxyData(data.tableIndex, data.playerIndex, proxyData);
	}

	private showCurrentProxyData() {
		let roomInfo = Global.roomProxy.roomInfo;
	}


	/**
	 * 买保险
	 * @param  {egret.Event} e
	 */
	private s_startInsurance(e: egret.Event) {
		let roomInfo = Global.roomProxy.roomInfo;
		roomInfo.roomState = BLACK_J_ROUND_STATUS.INSURANCE;
		this.checkCanMaiBx();
		for (let i = 1; i <= 3; i++) {
			let header = this[`header${i}`] as BlackJHeader;
			header.hideTipGroup();
		}
		// this.baoxianGroup.visible = true;
	}

	/**
	 * 停止买保险
	 * @param  {egret.Event} e
	 */
	private s_stopInsurance(e: egret.Event) {
		this.baoxianGroup.visible = false;
		let data = e.data;
		for (let i = 1; i <= 3; i++) {
			let header = this[`header${i}`] as BlackJHeader;
			header.removeTimer();
			header.hideTipGroup();
		}
		if (data.num > 0) {
			Toast.launch(CF.tigc(120), 300);
		}
	}



	/**
	 * 发牌的信息
	 */
	private currentFapaiData: any = {};
	private fapaiLists: PokerCard[] = [];
	private fapaiIndexes: number[] = [];

	/**
	 * 庄家发牌
	 * @param  {egret.Event} e
	 */
	private s_dealHandCard(e: egret.Event) {
		let data = e.data;
		this.currentFapaiData[6] = { cards: data.cards };
		for (let i = 1; i <= 3; i++) {
			let header = this[`header${i}`] as BlackJHeader;
			header.hideTipGroup();
		}
		this.startFapai(2);
	}

	/**
	 * 停牌
	 * @param  {egret.Event} e
	 */
	private s_stopCard(e: egret.Event) {
		let data = e.data;
		let playerIndex = data.playerIndex;
		if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
			this.gameBar.visible = false;
		}
		this.playerTimeOver(playerIndex);
		let header = this[`header${this.directions[e.data.playerIndex]}`] as BlackJHeader;
		header.showTipsGroup(CF.tigc(121))
	}

	private playerTimeOver(playerIndex) {
		let header = this[`header${this.directions[playerIndex]}`] as BlackJHeader;
		header.removeTimer();
	}

	/**
	 * 要牌
	 * @param  {egret.Event} e
	 */
	private s_doubleBet(e: egret.Event) {
		let data = e.data;
		data.actions = null;
		let cardList = this.addCard(e);
		cardList.currentCardOther(cardList.currentCard - 1);
		let header = this[`header${this.directions[e.data.playerIndex]}`] as BlackJHeader;
		header.showTipsGroup(CF.tigc(122))
	}

	private addCard(e: egret.Event) {
		let data = e.data;
		let card = data.card;
		let cardGroupIndex = data.cardGroupIndex;
		let point = data.point;
		let result = data.result;
		let tableIndex = data.tableIndex;
		let playerIndex = data.playerIndex;
		let actions = data.actions;
		if (actions && Global.roomProxy.checkIndexIsMe(playerIndex)) {
			this.gameBar.initActions(actions)
			this.gameBar.visible = true;
		}
		this.createPokers(1);
		let cardList = this.poker2Player(tableIndex, cardGroupIndex + 1, card, 1, false);
		//不是正常牌型就停止timer
		if (result != BLACKJ_RESULT.NORMAL) {
			this.stopTimerByIndex(playerIndex);
			this.gameBar.visible = false;
		}
		this.setAutoTimeout(() => {
			if (result == BLACKJ_RESULT.BOOM) {
				cardList.showPoint(BLACKJ_PATTERN.BOOM, point);
				cardList.playBoom();
				if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
					if (data.isAllBurstCard) {
						this.setAutoTimeout(() => {
							this.restartBtn.visible = true;
						}, this, 500);
					}
					// this.gameBar.visible = false;
				}
				this.playerTimeOver(playerIndex);
			} else if (result == BLACKJ_RESULT.FIVE_LITTLE_DRAGONS) {
				cardList.showPoint(BLACKJ_PATTERN.FIVE_LITTLE_DRAGONS, point);
				if (tableIndex != 6) {
					cardList.parent.addChild(cardList);
					//重新设置一下
					this.setAutoTimeout(() => {
						let cardList1 = this[`card${this.directions[tableIndex]}_${1}`] as BlackJackCardList;
						let cardList2 = this[`card${this.directions[tableIndex]}_${2}`] as BlackJackCardList;
						cardList1.parent.addChild(cardList1);
						cardList2.parent.addChild(cardList2);
					}, this, 1000);
				}
				// if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
				// 	this.gameBar.visible = false;
				// }
				this.playerTimeOver(playerIndex);
				//todo 吴晓龙
			} else {
				// if (point == 21) {
				// 	if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
				// 		this.gameBar.visible = false;
				// 	}
				// }
				cardList.showPoint(BLACKJ_PATTERN.GENERAL_CARD, point);
			}
		}, this, 1100)
		return cardList;
	}

	/**
	 * 要牌
	 * @param  {egret.Event} e
	 */
	private s_addCard(e: egret.Event) {
		this.addCard(e);
		let header = this[`header${this.directions[e.data.playerIndex]}`] as BlackJHeader;
		header.showTipsGroup(CF.tigc(123))
	}

	/**
	 * 金币飞去庄家
	 */
	private cm2zhuang(tabelIndex) {
		let cmGroup = this.findCmGroupByIndex(tabelIndex);
		let coins = cmGroup.coinLists;
		let positon = new egret.Point()
		positon.x = GameConfig.curWidth() / 2;
		positon.y = - 100
		for (let i = 0; i < coins.length; i++) {
			let coin = coins[i];
			this.coinMoveAni(coin, positon, _.random(10, 50), 900);
		}
	}

	/**
	 * 金币飞去玩家
	 */
	private cm2Player(tabelIndex, playerIndex, realGainGold) {
		let cmGroup = this.findCmGroupByIndex(tabelIndex);

		let coins = cmGroup.coinLists;
		//从筹码盒子到玩家下注区域
		// let realGainGold = Number(new Big(gainGold).div(0.95).round(2, 0));
		let gaincoins = this.boxToXiaZhuQu(tabelIndex, playerIndex, realGainGold);
		let header = this[`header${this.directions[playerIndex]}`] as BlackJHeader
		coins.push.apply(coins, gaincoins);
		let positon = new egret.Point();
		let headerPoint = header.localToGlobal();
		positon.x = headerPoint.x + header.width / 2;
		positon.y = headerPoint.y + header.height / 2 - 30;
		//从玩家风向头像
		this.setAutoTimeout(() => {
			for (let i = 0; i < coins.length; i++) {
				let coin = coins[i];
				//	this.coinMoveAni(coin, positon, _.random(10, 50));
				this.coinMoveAniNew(coin, positon, _.random(10, 50));
			}
		}, this, 1300);
	}

	/**赢了的赢分后先从筹码盒飞出筹码到赢家筹码位置，再飞向玩家 */
	private coinArr: Array<CoinComponent> = [];
	private choumaGroup: eui.Group;
	private cmNumList: Array<number>;
	/**创建赢了得金币数组 */
	private createGainGoldArr(value, playerIndex, tabelIndex): Array<CoinComponent> {
		let gainCoinArr: Array<CoinComponent> = [];
		let numbers = NumberFormat.chaifenScore(this.cmNumList, value);
		//当分数不合法时候
		if (numbers == undefined || numbers == null) {
			let realValue = Math.floor(Number(new Big(value).div(this.cmNumList[0]).round(2, 0)));
			realValue *= this.cmNumList[0];
			numbers = NumberFormat.chaifenScore(this.cmNumList, realValue);
		}
		for (let key in numbers) {
			let num = numbers[key];
			for (let i = 0; i < num; i++) {
				let coin: CoinComponent = this.createGainCoin(playerIndex, tabelIndex, Number(key));
				coin.x = this.choumaGroup.x;
				coin.y = this.choumaGroup.y - coin.height * 0.4;
				this.touchGroup.addChild(coin);
				gainCoinArr.push(coin);
			}
		}
		return gainCoinArr;
	}
	private initCMList() {
		let addBetMulti = Global.roomProxy.roomInfo.addBetMulti;
		let bet = Global.roomProxy.roomInfo.betBase;
		this.cmNumList = _.clone(addBetMulti);
		this.cmNumList = _.map(this.cmNumList, function (num) { return num * bet; });
	}
	private boxToXiaZhuQu(tableIndex, playerIndex, gaingold): Array<CoinComponent> {
		var arr: Array<CoinComponent> = this.createGainGoldArr(gaingold, playerIndex, tableIndex);
		// let cmGroup = this.findCmGroupByIndex(tableIndex);
		let playercmGroup = this.findCmGroupByIndex(playerIndex);
		// let coins = cmGroup.coinLists;
		// let count = 0;
		// for (let i = 0; i < coins.length; ++i) {
		// 	let coin = ObjectPool.produce("blackjac_cm", null) as CoinComponent;
		// 	if (!coin) {
		// 		coin = new CoinComponent(CoinType.BLACKJ);
		// 		coin.touchEnabled = false;
		// 		game.UIUtils.setAnchorCenter(coin)
		// 		coin.scaleX = coin.scaleY = 0.6;
		// 	}
		// 	coin.coinImage.source = coins[i].coinImage.source;
		// 	coin.updateNumber(coins[i].score);
		// 	count += coins[i].score;
		// 	coin.x = this.choumaGroup.x;
		// 	coin.y = this.choumaGroup.y - coin.height * 0.4;
		// 	this.touchGroup.addChild(coin);
		// 	arr.push(coin);
		// 	game.UIUtils.removeSelf(coins[i]);
		// }
		// LogUtils.logD("==========分数是多少======tableIndex=======" + count);
		let endPoint = playercmGroup.localToGlobal();

		var num = 0;
		async.eachSeries(arr, (coin, callback) => {
			let endX = endPoint.x + _.random(10, 50);
			let endY = endPoint.y + _.random(10, 50);
			let time = 500;
			egret.Tween.get(coin).wait(15 * (num / 2)).call(() => {//15 * (num / 2) samrt 金币中间等待时间变短
				num++;
				callback();
			}).to({
				x: endX,
				y: endY,
			}, time).call(() => {//, egret.Ease.cubicInOut
				coin.x = endX;
				coin.y = endY;
			});
		})
		return arr;
	}
	/**金币从盒子产生 再飞向玩家*/

	/**
	 * 金币飞
	 * @param  {} coin
	 * @param  {} postion
	 * @param  {} waitTime
	 */
	private coinMoveAni(coin, postion, waitTime, time: number = 500) { //smart 修改time时间
		let point = coin.localToGlobal();
		this.effectGroup.addChild(coin);
		coin.x = point.x;
		coin.y = point.y;
		egret.Tween.get(coin).wait(waitTime).to({
			x: postion.x,
			y: postion.y
		}, time).call(() => {//egret.Ease.cubicInOut
			game.UIUtils.removeSelf(coin);
			// ObjectPool.reclaim("blackjac_cm", coin);
		});
	}

	/**金币从盒子产生 再飞向玩家*/

	/**
	 * 金币飞 smart
	 * @param  {} coin
	 * @param  {} postion
	 * @param  {} waitTime
	 */
	private coinMoveAniNew(coin, postion, waitTime, time: number = 500) { //smart 修改time时间
		if (!this.effectGroup.contains(coin)) {
			let point = coin.localToGlobal();
			this.effectGroup.addChild(coin);
			coin.x = point.x;
			coin.y = point.y;
		}
		egret.Tween.get(coin).wait(waitTime).to({
			x: postion.x,
			y: postion.y
		}, time).call(() => {// egret.Ease.cubicInOut
			game.UIUtils.removeSelf(coin);
			// ObjectPool.reclaim("blackjac_cm", coin);
		});
	}

	/**
	 * 庄家发牌
	 */
	private s_sendDealLastCards(e: egret.Event) {
		let data = e.data;
		this.showTableTips(0);
		this.gameBar.visible = false;
		for (let i = 1; i <= 3; i++) {
			let header = this[`header${i}`] as BlackJHeader;
			header.removeTimer();
			header.hideTipGroup();
			let cardList1 = this[`card${this.directions[i]}_${1}`] as BlackJackCardList;
			let cardList2 = this[`card${this.directions[i]}_${2}`] as BlackJackCardList;
			cardList1.showMaskRect(false);
			cardList2.showMaskRect(false);
		}
		this.showDealerCards(data);
	}
	private piaoFenDelay: number = 1000;

	/**
	 * 结算
	 * @param  {egret.Event} e
	 */
	private roundSettlement(e: egret.Event) {
		let data = e.data;
		// let dealerCardInfo = data.dealerCardInfo;
		// let time = this.showDealerCards(dealerCardInfo);
		// this.showTableTips(0);
		// this.gameBar.visible = false;
		// for (let i = 1; i <= 3; i++) {
		// 	let header = this[`header${i}`] as BlackJHeader;
		// 	header.removeTimer();
		// 	header.hideTipGroup();
		// 	let cardList1 = this[`card${this.directions[i]}_${1}`] as BlackJackCardList;
		// 	let cardList2 = this[`card${this.directions[i]}_${2}`] as BlackJackCardList;
		// 	cardList1.showMaskRect(false);
		// 	cardList2.showMaskRect(false);
		// }
		this.gameBar.visible = false;
		LogUtils.logD("结算数据" + JSON.stringify(data));
		this.setAutoTimeout(() => {

			//金币飞
			for (let i = 1; i <= 3; i++) {
				let gainInfo = data[i];
				if (gainInfo) {
					let settleData = gainInfo.proxysSettlementInfo;
					for (let tabelIndex in settleData) {
						let tableData = settleData[tabelIndex];
						if (tableData.win) {
							this.piaoFenDelay = 3000;
							this.setAutoTimeout(() => {
								let pattern = tableData.cardGroupInfo.pattern;
								let realGainGold;
								//处理gainGold
								if (pattern == BLACKJ_PATTERN.BLACKJACK || pattern == BLACKJ_PATTERN.FIVE_LITTLE_DRAGONS) {
									realGainGold = Number(new Big(gainInfo.gainGold).mul(1.5).round(2, 0));
								}
								else {
									realGainGold = Number(new Big(gainInfo.gainGold).div(0.95).round(2, 0));
								}
								this.cm2Player(tabelIndex, i, realGainGold);
								SoundManager.getInstance().playEffect("blackj_cm_mp3");
							}, this, 1300);
						} else {
							this.cm2zhuang(tabelIndex);
							SoundManager.getInstance().playEffect("blackj_cm_mp3");
						}
					}
					// this.setAutoTimeout(() => {
					// 	this.showRecords(gainInfo, i);
					// }, this, this.piaoFenDelay)//1000
				}
			}
			//smart
			for (let i = 0; i <= 3; ++i) {
				let gainInfo = data[i];
				if (gainInfo) {
					this.setAutoTimeout(() => {
						this.showRecords(gainInfo, i);
					}, this, this.piaoFenDelay)//1000
				}
			}
			this.setAutoTimeout(() => {
				this.gameBar.visible = false;
				this.restartBtn.visible = true;
			}, this, 2000);
		}, this, 1000);
	}
	/**
	 * 
	 * @param  {} roundSettlement
	 */
	private showRecords(gainInfo, playerIndex) {
		let header = this[`header${this.directions[playerIndex]}`] as BlackJHeader;
		//播放胜利
		if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold > 0) {
			this.playWinAni();
			// header.showWinAni();
			SoundManager.getInstance().playEffect("blackj_win_mp3");
		}
		header.updateGold(gainInfo.ownGold, false);
		header.showLiushui(gainInfo.gainGold);
	}

	private playWinAni() {
		let winDb = new DBComponent(`21d_win${CF.tiAni}`);
		winDb.horizontalCenter = 0;;
		winDb.verticalCenter = 0;;
		winDb.callback = function () {
		}
		this.effectGroup.addChild(winDb);
		winDb.playByFilename(1);
	}

	/**
	 * 展示庄家的牌
	 * @param  {} dealerCardInfo
	 */
	private showDealerCards(dealerCardInfo) {
		let cards = dealerCardInfo.cards as number[];
		let cardsList = this.card0;
		let points = dealerCardInfo.points;
		let patterns = dealerCardInfo.patterns;
		if (cards.length == 2) {
			cardsList.currentCard = 2;
			cardsList.showCurrent(cards[1]);
			SoundManager.getInstance().playEffect("blackj_fapai_mp3");
			cardsList.showPoint(patterns[0], points[0]);
			return 700;
		}
		let startIndex = 2;
		let pointIndex = 1;
		//先翻开当前牌
		cardsList.currentCard = 2;
		cardsList.showCurrent(cards[1]);
		cardsList.currentCard++;
		let time = 700;
		this.setAutoTimeout(() => {
			let newCard = cards.slice(2);
			cardsList.showPoint(patterns[0], points[0]);
			//然后发牌
			async.eachSeries(newCard, (card, callback) => {
				let point = [points[pointIndex]];
				let pattern = patterns[pointIndex];
				this.createPokers(1);
				this.poker2Player(6, 1, card, 1, false);
				this.setAutoTimeout(() => {
					if (pattern == BLACKJ_PATTERN.BOOM) {
						cardsList.showMaskRect(false);
						this.setAutoTimeout(() => {
							cardsList.playBoom();
							cardsList.showMaskRect();
							cardsList.showPoint(pattern, point)
						}, this, 800);
					} else {
						this.setAutoTimeout(() => {
							cardsList.showPoint(pattern, point)
						}, this, 400);
					}
					pointIndex++;
					this.setAutoTimeout(callback, this, 1000);
				}, this, time + 150);
			})
		}, this, time);

		return (cards.length - 1) * 700 + 1500;
	}

	/**
	 * 闲家玩家 
	 * @param  {egret.Event} e
	 */
	private s_playerHandCard(e: egret.Event) {
		let data = e.data;
		for (let i = 0; i < data.length; i++) {
			let infoCards = data[i];
			let playerIndex = infoCards.playerIndex;
			let tableIndex = infoCards.tableIndex;
			let proxyData = this.getProxyData(playerIndex, tableIndex);
			if (!proxyData.cardGroupInfo) {
				proxyData.cardGroupInfo = {}
				proxyData.cardGroupInfo[0] = infoCards;
			}
			let cards = infoCards.cards;
			this.currentFapaiData[tableIndex] = { cards: cards, pattern: infoCards.pattern, point: infoCards.point };
		}
	}

	/**
	 * 保险
	 */
	private s_insuranceSettlement(e: egret.Event) {
		let data = e.data;
		let gold = Math.abs(data.gold);
		let playerIndex = data.playerIndex;
		let tableIndex = data.tableIndex;
		let cmGroup = this.findCmGroupByIndex(tableIndex);
		let coin = cmGroup.findCoin();
		coin.updateNumber(gold);
		let positon = new egret.Point()
		positon.x = GameConfig.curWidth() / 2;
		positon.y = - 100;
		this.coinMoveAni(coin, positon, _.random(10, 50));
	}

	/**
	 * 发牌
	 */
	private startFapai(times: number) {
		let number = 0;
		for (let key in this.currentFapaiData) {
			let data = this.currentFapaiData[key];
			number += data.cards.length;
		}
		this.createPokers(number);
		let index = 0;
		let cardIndex = 0;
		while (index < times) {
			let keySet = _.keys(this.currentFapaiData);
			for (let i = 0; i < keySet.length; i++) {
				let key = keySet[i]
				let fapaiData = this.currentFapaiData[key];
				let cards = fapaiData.cards
				let pokerNum = cards[index];
				let cardList = this.poker2Player(key, 1, pokerNum, cardIndex, index == times - 1);
				cardIndex++;
				if (i == keySet.length - 1) {
					index++;
				}
			}
		}
	}
	/**
	 * @param  {} playerIndex tableIndex
	 * @param  {number=1} cardIndex 1
	 * @param  {} cardNum 排面值
	 * @param  {} index 1
	 * @param  {} showPoint true
	 */
	private poker2Player(playerIndex, cardIndex: number = 1, cardNum, index, showPoint) {
		let card = this.fapaiLists.pop();
		let cardList: BlackJackCardList;
		if (playerIndex == 6) {
			cardList = this[`card0`] as BlackJackCardList;
		} else {
			cardList = this[`card${this.directions[playerIndex]}_${cardIndex}`] as BlackJackCardList;
		}
		//找牌
		let cardListCard = cardList.getCurrentCard();
		cardList.currentCard++;
		cardList.changePointPosition();
		let position = cardListCard.localToGlobal();
		let time = 400;
		let moveTime = index * time
		if (Global.runBack) {
			time = 1;
		}
		this.setAutoTimeout(() => {
			SoundManager.getInstance().playEffect("blackj_fapai_mp3");
		}, this, moveTime);
		egret.Tween.get(card).wait(moveTime).to({
			x: position.x + card.anchorOffsetX,
			y: position.y + card.anchorOffsetY,
			rotation: 0
		}, time).call(() => {
			game.UIUtils.removeSelf(card);
			card = null;
		}, egret.Ease.circOut);
		this.setAutoTimeout(() => {
			cardList.fanCurrentCard(cardNum, cardListCard);
			if (showPoint) {
				let data = this.currentFapaiData[playerIndex];
				cardList.showPoint(data.pattern, data.point);
			}
		}, this, moveTime + 400);

		return cardList;
	}


	private createPokers(number) {
		for (let i = 0; i < number; i++) {
			let card = new PokerCard(true);
			game.UIUtils.setAnchorPot(card);
			card.showOtherImage(false);
			card.scaleX = card.scaleY = 0.72;
			card.rotation = -50;
			card.showZ2B();
			this.effectGroup.addChild(card);
			card.x = this.fapaiGroup.x;
			card.y = this.fapaiGroup.y;
			this.fapaiLists.push(card);
		}
	}

	/**
	 * @param  {egret.Event} e
	 */
	private s_finishBet(e: egret.Event) {
		let data = e.data;
		let playerIndex = data.playerIndex;
		let header = this[`header${this.directions[playerIndex]}`] as BlackJHeader;
		header.showTipsGroup(CF.tigc(118), false);
		header.removeTimer();
		if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
			//隐藏所有下注提示
			this.checkOtherCanXZ(false);
		}
	}


	private getProxyData(playerIndex, tabelIndex) {
		let roomInfp = Global.roomProxy.roomInfo;
		let players = Global.roomProxy.getPlayerByIndex(playerIndex);
		if (!players.proxys[tabelIndex]) {
			players.proxys[tabelIndex] = {};
		}
		return players.proxys[tabelIndex];
	}

	/**
	 * 获取当前
	 */
	private getCurProxyData() {
		let roomInfp = Global.roomProxy.roomInfo;
		let players = Global.roomProxy.getPlayerByIndex(roomInfp.currentPlayerIndex);
		return players.proxys[roomInfp.currentTableIndex];
	}


	private showTableTips(tableIndex) {
		for (let i = 1; i <= 3; i++) {
			let header = this[`header${i}`] as BlackJHeader;
			if (this.tabelDirections[i] == tableIndex) {
				header.showTipsImage(true);
			} else {
				header.showTipsImage(false);
			}
		}
	}

	/**
	 * 玩家操作
	 * @param  {egret.Event} e
	 */
	private s_notifyPlayerAction(e: egret.Event) {
		let data = e.data;
		let roomInfo = Global.roomProxy.roomInfo;
		roomInfo.roomState = BLACK_J_ROUND_STATUS.ACTION;
		let playerIndex = data.playerIndex;
		let tableIndex = data.tableIndex;
		this.showTableTips(tableIndex);
		this.clearLastRects();
		for (let i = 1; i <= 3; i++) {
			let header = this[`header${i}`] as BlackJHeader;
			header.removeTimer();
		}
		let cardGroupIndex = data.cardGroupIndex;
		if (cardGroupIndex == 0) {
			let cardList1 = this[`card${this.directions[tableIndex]}_1`] as BlackJackCardList;
			cardList1.showMaskRect(false);
			let cardList2 = this[`card${this.directions[tableIndex]}_2`] as BlackJackCardList;
			cardList2.showMaskRect();
		} else {
			let cardList1 = this[`card${this.directions[tableIndex]}_1`] as BlackJackCardList;
			cardList1.showMaskRect();
			let cardList2 = this[`card${this.directions[tableIndex]}_2`] as BlackJackCardList;
			cardList2.showMaskRect(false);
		}
		if (!Global.roomProxy.checkIndexIsMe(playerIndex)) {
			this.gameBar.visible = false;
		}
		roomInfo.currentPlayerIndex = playerIndex;
		roomInfo.currentTableIndex = tableIndex;
		roomInfo.currentCardGroupIndex = cardGroupIndex;
		roomInfo.roomState = BLACK_J_ROUND_STATUS.ACTION;
		let player = Global.roomProxy.getMineData() as PlayerGameDataBean;
		//代理对象
		let proxyData = this.getProxyData(playerIndex, tableIndex);
		proxyData.actions = data.actions;
		this.showRoomByStatus(false);
	}

	private clearLastRects() {
		for (let i = 1; i <= 3; i++) {
			// if (lastTableIndex) {
			let cardList1 = this[`card${i}_1`] as BlackJackCardList;
			cardList1.showMaskRect(false);
			let cardList2 = this[`card${i}_2`] as BlackJackCardList;
			cardList2.showMaskRect(false);
			// }
		}
		// let roomInfo = Global.roomProxy.roomInfo;
		// let lastTableIndex = roomInfo.currentTableIndex;

	}

	// /**
	//  * 金币从group飞回来
	//  */
	// private coin2Component(jinbi, playerIndex, component) {
	// 	let group = this['header' + playerIndex] as eui.Group;
	// 	let point1 = component.localToGlobal();
	// 	let point = group.globalToLocal(point1.x + 50, point1.y + 50);
	// 	egret.Tween.removeTweens(jinbi);
	// 	egret.Tween.get(jinbi).to({
	// 		x: point.x,
	// 		y: point.y
	// 	}, _.random(200, 400)).call(() => {
	// 		game.UIUtils.removeSelf(jinbi);
	// 		game.Utils.removeArrayItem(this['cmList' + type], jinbi);
	// 	});
	// }

	private getHeaderByIndex() {

	}

	public stopTimerByIndex(playerIndex) {
		let header = this[`header${this.directions[playerIndex]}`] as BlackJHeader;
		header.removeTimer();
	}


	private updateCurrentScore(tabelIndex, money) {


	}


	/**
	 * 筹码组点击
	 * @param  {egret.Event} e
	 */
	public lockYZ: boolean = false;
	private async cmGroupTouch(e: egret.Event) {
		if (this.lockYZ) {
			return;
		}
		let roomInfo = Global.roomProxy.roomInfo;
		if (roomInfo.roomState != BLACK_J_ROUND_STATUS.ADD_BET) {
			return;
		}
		let currentSelectGold = this.xzBar.currentScore;
		if (currentSelectGold) {
			this.lockYZ = true;
			let index = e.data;
			let player = Global.roomProxy.getMineData();
			let data2 = { tableIndex: Number(index), addBet: currentSelectGold };
			let resp: any = await Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_bet, data2);
			if (resp && resp.error && resp.error.code == 0) {
				this.xzBar.grayBtn(false);
			} else {
				if (resp.error.code == ErrorCode.BJL_BIGER2GOLD) {
					let max = Global.roomProxy.roomInfo.maxBet;
					Toast.launch(TextUtils.instance.setTextById(124, {
						"1": max
					}), 1);
				} else {
					Toast.launch(`${resp.error.msg}`, 1);
				}
			}
			this.lockYZ = false;
		}
	}

	/**
	 * 头像押注
	 */
	private header2Group(headerIndex, groupIndex, coinObj: CoinComponent, ani) {
		let header = this[`header${headerIndex}`] as BlackJHeader;
		let cmGroup = this.findCmGroupByIndex(groupIndex) as BlackJCMGroup;
		let headerPoint = header.localToGlobal();
		coinObj.x = headerPoint.x + header.width / 2;
		coinObj.y = headerPoint.y + header.height / 2 - coinObj.height * 0.4;
		this.touchGroup.addChild(coinObj);
		let endPoint = cmGroup.localToGlobal();
		let endX = endPoint.x + _.random(10, 50);
		let endY = endPoint.y + _.random(10, 50)
		if (ani) {
			egret.Tween.get(coinObj).to({
				x: endX,
				y: endY
			}, 300).call(() => {
				coinObj.x = endX;
				coinObj.y = endY;
				cmGroup.addCm(coinObj);
			});
			this.setAutoTimeout(() => {
				egret.Tween.removeTweens(coinObj);
				coinObj.x = endX;
				coinObj.y = endY;
				cmGroup.addCm(coinObj);
			}, this, 300);
		} else {
			coinObj.x = endX;
			coinObj.y = endY;
			cmGroup.addCm(coinObj);
		}
	}


	private getCMColor(coinNumber) {
		let roomInfo = Global.roomProxy.roomInfo;
		let betBase = roomInfo.betBase;
		let data = [0].concat(this.roomYZBets);
		if (coinNumber >= betBase * this.roomYZBets[this.roomYZBets.length - 1]) {
			return 4;
		}
		for (let i = 0; i < data.length; i++) {
			let small = data[i];
			let big = data[i + 1];
			if (!big) {
				big = 100000;
			}
			if (coinNumber > small * betBase && coinNumber <= big * betBase) {
				if (i >= 4) {
					return i;
				}
				return i + 1;
			}
		}
		return 1;
	}



	private playerYZ(playerIndex, tabelIndex, coinNumber, needAni) {
		coinNumber = Number(coinNumber);
		let coin = ObjectPool.produce("blackjac_cm", null) as CoinComponent;
		if (!coin) {
			coin = new CoinComponent(CoinType.BLACKJ);
			coin.touchEnabled = false;
			game.UIUtils.setAnchorCenter(coin)
			coin.scaleX = coin.scaleY = 0.6;
		}
		// let index = this.roomYZBets.indexOf(coinNumber / roomInfo.betBase) + 1;
		let index = this.getCMColor(coinNumber);
		coin.showCoin(`blackj_cm_${index}`, coinNumber);
		this.header2Group(playerIndex, tabelIndex, coin, needAni);
		return coin;
	}
	/**创建赢了得coin */
	private createGainCoin(playerIndex, tabelIndex, coinNumber): CoinComponent {
		//	LogUtils.logD("====coinNumber===" + coinNumber);
		coinNumber = Number(coinNumber);
		let coin = ObjectPool.produce("blackjac_cm", null) as CoinComponent;
		if (!coin) {
			coin = new CoinComponent(CoinType.BLACKJ);
			coin.touchEnabled = false;
			game.UIUtils.setAnchorCenter(coin)
			coin.scaleX = coin.scaleY = 0.6;
		}
		// let index = this.roomYZBets.indexOf(coinNumber / roomInfo.betBase) + 1;
		let index = this.getCMColor(coinNumber);
		coin.showCoin(`blackj_cm_${index}`, coinNumber);
		return coin;
	}
	/**
	 * 玩家动作操作
	 * @param  {} data
	 */
	public async gameBarTouch(data) {
		this.gameBar.lockAll();
		let resp: any = await Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_action, data);
		if (resp && resp.error && resp.error.code != 0) {
			//错误
			if (resp.error.code != ErrorCode.BUSY_REQUEST) {
				Toast.launch(resp.error.msg);
			}
			this.gameBar.visible = true;
			this.gameBar.resize2Last();
		} else {
			// if (resp && resp.isAllBurstCard) {
			// 	this.setAutoTimeout(() => {
			// 		this.restartBtn.visible = true;
			// 	}, this, 1000);
			// }
			// player.betInfo = resp;
		}
	}
	// /**
	//  * 头像押注
	//  */
	// private header2Dealer(headerIndex, coinObj: CoinComponent) {
	// 	let header = this[`header${headerIndex}`] as BlackJHeader;
	// 	let cmGroup = this[`cmGroup${groupIndex}`] as BlackJCMGroup;
	// 	let headerPoint = header.localToGlobal();
	// 	coinObj.x = headerPoint.x + header.width / 2;
	// 	coinObj.y = headerPoint.y + header.height / 2 - coinObj.height * 0.4;
	// 	this.touchGroup.addChild(coinObj);
	// 	let endPoint = cmGroup.localToGlobal();
	// 	egret.Tween.get(coinObj).to({
	// 		x: endPoint.x + _.random(10, 50),
	// 		y: endPoint.y + _.random(10, 50)
	// 	}, 300);

	// }
	private firstYz: boolean = true;
	/**
	 * 下注
	 * @param  {egret.Event} e
	 */
	private s_addBet(e: egret.Event) {
		let data = e.data;
		let playerIndex = data.playerIndex;
		let tableIndex = data.tableIndex;
		let betInfo = data.betInfo;
		let totalBet = data.totalBet;
		this.playerYZ(this.directions[playerIndex], tableIndex, betInfo, true);
		let scoreLabel = this[`scoreLabel${this.directions[tableIndex]}`] as eui.Label;
		scoreLabel.text = totalBet;
		this[`scoreGroup${this.directions[tableIndex]}`].visible = true;
		let header = this[`header${this.directions[playerIndex]}`] as BlackJHeader;
		header.updateGold(betInfo * - 1, true);
		//没有人占领
		let tableHeader = this[`header${this.directions[tableIndex]}`] as BlackJHeader;
		if (!tableHeader.visible && !tableHeader.isProxy) {
			tableHeader.showProxys(playerIndex);
		}
		if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
			this.checkOtherCanXZ();
		}
		let cmGroup = this.findCmGroupByIndex(tableIndex) as BlackJCMGroup;
		cmGroup.showCanYZTip(false);
		//proxys
		SoundManager.getInstance().playEffect("blackj_cm_mp3");
		this.recordPlayerYz(playerIndex, tableIndex, totalBet);
	}


	private checkOtherCanXZ(isVisible: boolean = true) {
		let players = Global.roomProxy.getPlayers();
		for (let i = 1; i <= 3; i++) {
			let header = this[`header${i}`] as BlackJHeader;
			if (!header.visible) {
				let cmGroup = this[`cmGroup${i}`] as BlackJCMGroup;
				cmGroup.showCanYZTip(isVisible);
			}
		}
	}

	/**
	 * 记录玩家押注
	 * @param  {} playerIndex
	 * @param  {} tableIndex
	 * @param  {} totalBet
	 */
	private recordPlayerYz(playerIndex, tableIndex, totalBet) {
		let player = Global.roomProxy.getPlayerByIndex(playerIndex);
		let proxyData = player.proxys[tableIndex];
		if (!proxyData) {
			proxyData = {};
			proxyData.cardGroupInfo = {
				totalBet: 0,
				pattern: 0,
				cards: [0, 0]
			}
			proxyData.insuranced = false;
		}
		proxyData.cardGroupInfo.totalBet = totalBet;
	}

	/**
	 * 开始下注
	 */
	private s_startBet(e: egret.Event) {
		let roomInfo = Global.roomProxy.roomInfo as BaseRoomInfo;
		roomInfo.roomState = BLACK_J_ROUND_STATUS.ADD_BET;
		this.showRoomByStatus(false);
	}

	/**
	 * 停止下注
	 */
	private s_stopBet(e: egret.Event) {
		for (let i = 1; i <= 3; i++) {
			let cmGroup = this[`cmGroup${i}`] as BlackJCMGroup;
			cmGroup.showCanYZTip(false);
			let header = this[`header${i}`] as BlackJHeader;
			header.removeTimer();
		}
		this.xzBar.hide();
	}

	/**
	 * 进入押注阶段
	 */
	private runAddBet(reconnect) {
		let playerData = Global.roomProxy.getMineData() as NNPlayerGameBean;
		if (!playerData.addAnte) {
			if (reconnect) {
				this.xzBar.verticalCenter = 560
				this.xzBar.visible = true;
			} else {
				this.xzBar.verticalCenter = 1500
				this.xzBar.visible = true;
				egret.Tween.get(this.xzBar).to({
					verticalCenter: 560
				}, 400, egret.Ease.sineIn);
			}
		}
		if (this.mineBet <= 0) {
			this.xzBar.grayBtn(true);
			this.cmGroup1.showCanYZTip(true);
		}

	}

	/**
	 * 主要用于起始隐藏一些UI
	 * 初始化UI
	 */
	private roomid: eui.Label;
	private initUI() {
		let roomInfo = Global.roomProxy.roomInfo;
		this.roomid.text = CF.tigc(54) + ":" + roomInfo.roomId;
		this.xzBar.visible = false;
		this.gameBar.visible = false;
		this.showBtnsType(1);
		this.card0.changeScoreGroup(6);
		for (let i = 1; i < 4; i++) {
			let card1 = this[`card${i}_1`] as BlackJackCardList;
			let card2 = this[`card${i}_2`] as BlackJackCardList;
			card1.changeScoreGroup(i);
			card1.cardIndex = 1;
			card2.changeScoreGroup(i);
			card2.cardIndex = 2;
			// card1.visible = false;
			// card2.visible = false;
			let scoreGroup = this[`scoreGroup${i}`] as eui.Group;
			scoreGroup.visible = false;
			let cmGroup = this[`cmGroup${i}`] as BlackJCMGroup;
			cmGroup.init(this.tabelDirections[i]);
			let header = this[`header${i}`] as BlackJHeader;
			header.visible = false;
		}
		this.showHeaders();
		this.initXZBar();
	}

	/**
	 * 初始化下注条
	 */
	private initXZBar() {
		let addBetMulti = Global.roomProxy.roomInfo.addBetMulti;
		this.xzBar.initWithArr(addBetMulti, Global.roomProxy.roomInfo.betBase);
	}

	/**
	 * 展现玩家头像
	 */
	private showHeaders() {
		let players = Global.roomProxy.getPlayers();
		let zhuangId = Global.roomProxy.roomInfo.dealer;//换到抢庄的地方去。
		for (let key in players) {
			let dir = this.directions[key];
			players[key].playerIndex = key;
			let header = this['header' + dir] as BlackJHeader;
			header.initWithPlayer(players[key]);
			header.visible = true;
			let scoreGroup = this[`scoreGroup${dir}`] as eui.Group;
			let scoreLabel = this[`scoreLabel${dir}`] as eui.Label;
			// scoreGroup.visible = true;
			scoreLabel.text = "0";
		}
		this[`header2`].changePos2Left();
		this[`header3`].changePos2Right();
		this[`header1`].changePos2Right();
	}

	/**
	 * 玩家押注
	 */
	private postCBet() {

	}
}

/**游戏状态定义*/
const BLACK_J_ROUND_STATUS = {
	WAITING: 1,   // 等待
	START: 2,     // 开始游戏
	ADD_BET: 3,   // 下注
	NEW_CARD: 4,   // 发牌
	INSURANCE: 5, // 买保险
	ACTION: 6, // 玩家操作
	DEAL_ACTION: 7,// 庄家操作
	SETTLEMENT: 8, // 结算
};

const BLACKJ_RESULT = {
	FIVE_LITTLE_DRAGONS: 1,
	BOOM: 2,
	NORMAL: 3
}


const BLACKJ_PATTERN = {
	// 黑夹克
	BLACKJACK: 3,
	// 五小龙
	FIVE_LITTLE_DRAGONS: 2,
	// 普通牌
	GENERAL_CARD: 1,

	BOOM: 0
}