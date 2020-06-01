class BaiCaoGameScene extends game.BaseGameScene {
	/**
		 * 背景音乐
		 */
	public bgMusic: string = "bc_bgm_mp3";

	//new
	/**
	 * 打开游戏界面通知
	 */
	public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_BAICAO_GAME;

	/**
	 * 关闭游戏界面通知
	 */
	public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_BAICAO_HALL;

	/**
	 * 关闭当前界面通知
	 */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BAICAO_GAME;

	/**
	 * 对应匹配界面通知
	 */
	public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_BAICAO_MATCHING;

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


	protected directions: any;

	private tabelDirections: any = {};

	private diFen: eui.Label;

	private effectGroup: eui.Group;

	private outGroup: eui.Group;

	protected roomYZBets: number[];

	private dbGroup: eui.Group;

	private fapaiGroup: eui.Group;

	//保险group
	private baoxianGroup: eui.Group;

	private buyBtn: eui.Button;

	private noBuyBtn: eui.Button;
	/**smart 所有牌的终点 */
	private shouPaiPos: eui.Rect;

	protected timeBar: baicao.BaiCaoTimebar;

	protected totalBet: eui.Label;
	protected mineWinLabel: eui.BitmapLabel;
	private count: number = 0;

	public constructor() {
		super();
		this.skinName = "BaiCaoGameSceneSkin";
	}
	private targetGold: number = 0;


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
	protected hideAllInDB() {
		for (let i = 1; i <= 6; ++i) {
			let dbGroup: eui.Group = this["db" + i] as eui.Group;
			dbGroup.removeChildren();
			let allInDB = this["allInDB" + i] as DBComponent;
			if (allInDB) {
				allInDB.dbDispose();
				allInDB = null;
			}
		}
	}
	public createChildren() {
		super.createChildren();
		this.hideAllInDB();
		//	FrameUtils.changeBgImage("./resource/gameAssets/blackjack_hall/blackj_hall_bg.jpg");
		let players: Object = Global.roomProxy.getPlayers();
		this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), _.keys(players).length);
		LogUtils.logD("=========createChildren==========" + _.keys(players).length);

		this.diFen.text = TextUtils.instance.getCurrentTextById(29) + ":" + Global.gameProxy.lastGameConfig.diFen;//"Điểm Thấp Nhất: "
		this.initUI();
		let roomInfo = Global.roomProxy.roomInfo;
		this.roomYZBets = roomInfo.addBetMulti;

		if (Global.roomProxy.reconnect) {
			// this.showReconnectUI();
			this.showCountDown();
			this.showRoomByStatus(true);
		} else {
			this.currentFapaiData = [];
			for (let key in this.directions) {
				let obj = { tableIndex: this.directions[key], playerIndex: key };
				this.currentFapaiData.push(obj);
			}
			this.setAutoTimeout(() => {
				this.showStartAni();
			}, this, 400)
		}
		this.initCMList();
	}

	/**
	 * 重连显示倒计时
	 */
	protected showCountDown() {
		let roomInfo = Global.roomProxy.roomInfo as BaseRoomInfo;
		let data = roomInfo.countdown;
		LogUtils.logD("--showCountDown==" + data.s + "当前得状态：" + roomInfo.roundStatus + "============");
		if (!data || data.s == 0) {
			this.timeBar.visible = false;
			SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
			return;
		}


		this.timeBar.reseateMask();
		this.timeBar.restartTime();
		game.DateTimeManager.instance.updateServerTime(data.start);
		//SoundManager.getInstance().playEffect("bc_timer_mp3", true);

		// this.timeBar.visible = false;


	}

	private mineBet: number = 0;



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







	private showStartAni() {
		let startDBName = "ynbc_startgame";
		let startGame = new DBComponent(startDBName);
		this.effectGroup.addChild(startGame);
		startGame.playByFilename(1);
		startGame.verticalCenter = 0;
		startGame.horizontalCenter = 0;
		SoundManager.getInstance().playEffect("bc_bigin_mp3");
		// this.setAutoTimeout(() => {
		// 	this.timeBar.startTime(this);
		// 	this.timeBar.visible = true;
		// }, this, 1500);
	}

	/**
	 * 根据房间显示数据
	 */
	protected showRoomByStatus(reconnect) {
		let roomInfo = Global.roomProxy.roomInfo;
		let players = roomInfo.players;
		//输家显示点数
		let outPlayer: Array<any> = roomInfo["outPlayer"];
		if (outPlayer != null || outPlayer != undefined || outPlayer.length != 0) {
			//输得玩家全部灰色
			for (let i = 0; i < outPlayer.length; ++i) {
				let player = outPlayer[i];
				let direc = this.directions[player.playerIndex];
				let patternNum = player.pattern;
				let cards: BaiCaoCardList = this["card" + direc] as BaiCaoCardList;
				this.showPattern(patternNum, 0, direc);
				cards.showMaskRect(true);
			}
		}
		let winPlayer: Array<any> = roomInfo["winPlayer"];
		//赢了 重新发牌
		this.currentFapaiData = [];
		for (let i = 0; i < winPlayer.length; ++i) {
			let player1 = winPlayer[i];
			let direc1 = this.directions[player1.playerIndex];
			let obj = { tableIndex: direc1, playerIndex: player1.playerIndex };
			this.currentFapaiData.push(obj);

		}
		this.runAddBet(reconnect);
		switch (roomInfo.roundStatus) {
			case BAICAO_ROUND_STATUS.ADD_BET:
				this.runAddBet(reconnect);
				break;
			case BAICAO_ROUND_STATUS.COMPARE_CARD:
				this.showZhengInfor(Global.roomProxy.roomInfo.players);
				this.compareResult(roomInfo["outPlayer"], roomInfo["winPlayer"]);
				break;
			case BAICAO_ROUND_STATUS.OPEN_CARD:
				this.showZhengInfor(Global.roomProxy.roomInfo.players);
				break;
			case BAICAO_ROUND_STATUS.NEW_CARD:
				this.showPaiInfor(Global.roomProxy.roomInfo.players)
				break;
			default:
				break;
		}
	}
	protected showZhengInfor(players) {
		let dirc: any;
		let cardList: BaiCaoCardList;
		for (var key in players) {
			dirc = this.directions[key];
			let data = players[key];
			cardList = (this["card" + dirc] as BaiCaoCardList);
			let handCards: Array<any> = data.handCards;
			if (handCards == null || handCards == undefined || handCards.length == 0) {
				cardList.showBei();
			}
			else {
				cardList.showZheng(handCards);
			}
		}
	}

	protected showPaiInfor(players) {
		let cardList: BaiCaoCardList;
		let dirc: any;
		for (var key in players) {
			let data = players[key];
			dirc = this.directions[key];
			cardList = (this["card" + dirc] as BaiCaoCardList)
			let handCards: Array<any> = data["handCards"];
			if (handCards == null || handCards == undefined || handCards.length == 0) {
				cardList.showBei();
			}
			else {
				cardList.showZheng(handCards);
			}
		}
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
				CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "baicao" });
				break;
			case this.recordBtn:
				this.showBtnsType(1);
				CF.sN(PanelNotify.OPEN_BASE_RECORD, GAME_ID.BAICAO);
				break;
			case this.helpBtn:
				this.showBtnsType(1);
				BaiCaoHelpPanel.instance.show("baicao");
				break;
		}
		super.onTouchTap(e);
	}

	/**
	 * 购买按钮
	 * @param  {egret.TouchEvent} e
	 */
	private nextTableIndex;




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
	protected countdown(e: egret.Event) {
		let dataall = e.data;
		let data = dataall.countdownMS;
		let roomInfo = Global.roomProxy.roomInfo as BaseRoomInfo;
		if (!roomInfo.countdown) {
			roomInfo.countdown = {};
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
			Global.alertMediator.addAlert("对局已经结束", null, null, true);
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
		CF.aE(ServerNotify.s_initHandCards, this.s_initHandCards, this);
		CF.aE(ServerNotify.s_playerBet, this.s_addBet, this);
		CF.aE(ServerNotify.s_countdown, this.countdown, this);
		CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		CF.aE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
		CF.aE(ServerNotify.s_startOpenCard, this.s_startOpenCard, this)
		CF.aE(ServerNotify.s_endOpenCard, this.s_endOpenCard, this);
		CF.aE(ServerNotify.s_openCardResult, this.s_openCardResult, this);
		/**比牌结果 */
		CF.aE(ServerNotify.s_compareCardResult, this.s_compareCardResult, this);

		/**跟新金币 */
		/**比牌结果 */
		CF.aE(ServerNotify.s_asyncGoldToClient, this.s_asyncGoldToClient, this);
	}


	public onRemoved() {
		super.onRemoved();

		CF.rE(ServerNotify.s_roundSettlement, this.roundSettlement, this);

		CF.rE(ServerNotify.s_initHandCards, this.s_initHandCards, this);



		CF.rE(ServerNotify.s_playerBet, this.s_addBet, this);

		CF.rE(ServerNotify.s_countdown, this.countdown, this);

		CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);

		CF.rE(ServerNotify.s_roomFinished, this.s_roomFinished, this);

		CF.rE(ServerNotify.s_startOpenCard, this.s_startOpenCard, this);
		CF.rE(ServerNotify.s_endOpenCard, this.s_endOpenCard, this);

		CF.rE(ServerNotify.s_openCardResult, this.s_openCardResult, this);
		/**比牌结果 */
		CF.rE(ServerNotify.s_compareCardResult, this.s_compareCardResult, this);
		/**比牌结果 */
		CF.rE(ServerNotify.s_asyncGoldToClient, this.s_asyncGoldToClient, this);
		this.timeBar.removeTimer();
		SoundManager.getInstance().stopEffectByName("bc_timer_mp3");

	}
	private s_asyncGoldToClient(e: egret.Event) {
		let data: string = e.data;
		let playerIndex = data["playerIndex"];
		let ownGold = data["ownGold"];
		let direc = this.directions[playerIndex];
		LogUtils.logD("==========s_asyncGoldToClient==========" + JSON.stringify(this.directions));
		this["header" + direc].updateGold(ownGold, false);
	}

	protected s_compareCardResult(e: egret.Event) {
		this.hideAllInDB();
		let data = e.data;
		let outPlayer: Array<any> = data.outPlayer;
		let winPlayer: Array<any> = data.winPlayer;
		this.compareResult(outPlayer, winPlayer);
	}
	private resetHeader() {
		for (let i = 1; i <= 6; ++i) {
			(this["header" + i] as baicao.BaiCaoHeader).disposeDB();
		}
	}
	protected haveWinPlayer: boolean = false;
	protected winPlayerIndex: any;
	protected compareResult(outPlayer: Array<any>, winPlayer: Array<any>) {
		this.currentFapaiData = [];;
		let patternNum: number;
		let player: any;
		let direc: any;
		//输得玩家全部灰色
		for (let i = 0; i < outPlayer.length; ++i) {
			player = outPlayer[i];
			direc = this.directions[player.playerIndex];
			patternNum = player.pattern;
			let cards: BaiCaoCardList = this["card" + direc] as BaiCaoCardList;
			this.showPattern(patternNum, 0, direc);
			cards.showMaskRect(true);
		}
		//赢了 重新发牌
		for (let i = 0; i < winPlayer.length; ++i) {
			player = winPlayer[i];
			direc = this.directions[player.playerIndex];
			let cards: BaiCaoCardList = this["card" + direc] as BaiCaoCardList;
			patternNum = player.pattern;
			this.showPattern(patternNum, 1, direc);

			let obj = { tableIndex: direc, playerIndex: player.playerIndex };
			this.currentFapaiData.push(obj);
			let header: baicao.BaiCaoHeader = this['header' + direc] as baicao.BaiCaoHeader;
			header.playDB();
		}
		if (this.haveMine && winPlayer.length == 1) {

			SoundManager.getInstance().playEffect("bc_win_mp3");
		}
		if (winPlayer.length == 1) {
			this.winPlayerIndex = winPlayer[0]["playerIndex"];
		}
		if (winPlayer.length > 1) {
			SoundManager.getInstance().playEffect("bc_tied_mp3");
		}

		if (this.haveMine == false && winPlayer.length == 1) {
			SoundManager.getInstance().playEffect("bc_lose_mp3");
		}
		this.haveWinPlayer = winPlayer.length > 0;
	}

	protected showPattern(pattern: number, isWin: number, direc: any) {
		let _pattern = this["pattern" + direc] as baicao.BaiCaoPattern;
		_pattern.visible = true;
		_pattern.showPattern(pattern, isWin)
	}
	private s_openCardResult(e: egret.Event) {
		let data = e.data;
		let playerIndex = data.playerIndex;
		let handCards = data.handCards;
		let pattern = data.pattern;
		let dire = this.directions[playerIndex];
		let patternCom: baicao.BaiCaoPattern = this["pattern" + dire] as baicao.BaiCaoPattern;
		let cardList: BaiCaoCardList = this["card" + dire] as BaiCaoCardList;
		cardList.initWidthCard(handCards);
		if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
			return;
		}
		cardList.cardAnimation();
	}
	/**
* 开牌结束
* @param  {egret.TouchEvent} e
*/
	private s_endOpenCard(e: egret.Event) {
		let data = e.data;
		// this.timeBar.visible = false;
		this.timeBar.reseateMask();
		SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
	}
	/**
* 开牌开始
* @param  {egret.TouchEvent} e
*/
	protected s_startOpenCard(e: egret.Event) {

		let data = e.data;
		this.countdown(e);

		this.timeBar.reseateMask();
		this.timeBar.restartTime();
		SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
		SoundManager.getInstance().playEffect("bc_timer_mp3", true);
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








	private showCurrentProxyData() {
		let roomInfo = Global.roomProxy.roomInfo;
	}






	/**
	 * 发牌的信息
	 */
	protected currentFapaiData: Array<any> = [];
	protected fapaiLists: PokerCard[] = [];
	private fapaiIndexes: number[] = [];





	private playerTimeOver(playerIndex) {
		let header = this[`header${this.directions[playerIndex]}`] as BlackJHeader;
		header.removeTimer();
	}


	/**赢了的赢分后先从筹码盒飞出筹码到赢家筹码位置，再飞向玩家 */
	protected coinArr: Array<CoinComponent> = [];
	private choumaGroup: eui.Group;
	protected cmNumList: Array<number>;
	private initCMList() {
		let addBetMulti = Global.roomProxy.roomInfo.addBetMulti;
		let bet = Global.roomProxy.roomInfo.betBase;
		this.cmNumList = _.clone(addBetMulti);
		this.cmNumList = _.map(this.cmNumList, function (num) { return num * bet; });
		LogUtils.logD("list" + this.cmNumList);
	}





	protected piaoFenDelay: number = 1000;

	/**
	 * 结算
	 * @param  {egret.Event} e
	 */
	protected roundSettlement(e: egret.Event) {
		let data = e.data;
		this.timeBar.removeTimer();
		LogUtils.logD("结算数据" + JSON.stringify(data));
		this.setAutoTimeout(() => {

			//smart
			for (var key in data) {
				let gainInfo = data[key];
				// if (gainInfo) {
				// 	this.setAutoTimeout(() => {
				this.showRecords(gainInfo, key);
				// 	}, this, this.piaoFenDelay)//1000
				// }
			}
			if (Global.runBack) {
				this.removeCoins();
			}
			this.timeBar.visible = false;
			this.setAutoTimeout(() => {
				this.restartBtn.visible = true;
			}, this, 2000);
		}, this, 1000);
	}
	/**
	 * 
	 * @param  {} roundSettlement
	 */
	protected showRecords(gainInfo, playerIndex) {
		let header = this[`header${this.directions[playerIndex]}`] as baicao.BaiCaoHeader;
		//播放胜利
		if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold > 0) {
		}
		if (gainInfo.gainGold > 0) {

			this.cm2Player(this.directions[playerIndex]);
			//筹码重新设置为0
			this.setTotalBet(0);
		}
		if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold <= 0) {

		}
		header.updateGold(gainInfo.ownGold, false);
		if (gainInfo.gainGold <= 0) {
			header.showLiushui(gainInfo.gainGold);
		}
		else {
			this.mineWinLabel.visible = true;
			this.mineWinLabel.text = "+" + gainInfo.gainGold + "";
		}
	}
	/**
 * 金币飞去玩家
 */
	protected cm2Player(tabelIndex, playerIndex = null, realGainGold = null) {
		let coins = this.coinArr;
		//从筹码盒子到玩家下注区域
		let header = this[`header${tabelIndex}`] as baicao.BaiCaoHeader;
		let positon = new egret.Point();
		let headerPoint = header.coinTarget.localToGlobal();
		//从玩家风向头像
		SoundManager.getInstance().playEffect("bc_chip3_mp3");
		for (let i = 0; i < coins.length; i++) {
			let coin = coins[i];
			this.coinMoveAniNew(coin, headerPoint, _.random(10, 100), this.coinArr);//10, 50
		}
	}
	private removeCoins() {
		let coins = this.coinArr;
		this.cmGroup.removeChildren();
		this.coinArr = [];
	}
	/**
	 * 金币飞 smart
	 * @param  {} coin
	 * @param  {} postion
	 * @param  {} waitTime
	 */
	protected coinMoveAniNew(coin, postion, waitTime, coinsArr: Array<CoinComponent>, time: number = 500, ) { //smart 修改time时间
		if (!this.effectGroup.contains(coin)) {
			let point = coin.localToGlobal();
			this.effectGroup.addChild(coin);
			coin.x = point.x;
			coin.y = point.y;
		}
		egret.Tween.get(coin).wait(waitTime).to({
			x: postion.x,
			y: postion.y,
		}, time).call(() => {// egret.Ease.cubicInOut
			game.UIUtils.removeSelf(coin);
			let index = coinsArr.indexOf(coin);
			if (index > -1) {
				coinsArr.splice(index, 1);
			}
			// ObjectPool.reclaim("blackjac_cm", coin);
		});
		this.setAutoTimeout(() => {
			game.UIUtils.removeSelf(coin);
			let index = this.coinArr.indexOf(coin);
			if (index > -1) {
				this.coinArr.splice(index, 1);
			}
		}, this, waitTime + time)
	}

	private playWinAni() {
		let winDb = new DBComponent("ynbc_win");
		winDb.horizontalCenter = 0;;
		winDb.verticalCenter = 0;;
		winDb.callback = function () {
		}
		this.effectGroup.addChild(winDb);
		winDb.playByFilename(1);
	}

	/**
	 * 闲家玩家 
	 * @param  {egret.Event} e
	 */
	private s_initHandCards(e: egret.Event) {
		let data = e.data;
		let player = data.playerIndex;
		this.resetHeader();
		let handCards: Array<any> = data.cards;
		let pattern = data.pattern;
		let dirc = this.directions[player];
		if (handCards.length != 0) {
			(this["card" + dirc] as BaiCaoCardList).initCardsData(handCards);
		}
		this.startFapai(3, data.startFapaiIndex);
	}


	/**
	 * 发牌
	 */
	private hideCardsAndPattern(directions) {
		(this["card" + directions] as BaiCaoCardList).resetLists();//pattern
		(this["pattern" + directions] as baicao.BaiCaoPattern).visible = false;
	}
	protected showCount = 0;
	protected allNum: number;
	private startFapai(times: number, startFapaiIndex) {
		this.allNum = 0;
		this.showCount = 3;
		let startIndex: number = startFapaiIndex;
		// let keys = _.keys(this.currentFapaiData);
		let curentFaiPaiData: Array<any> = _.sortBy(this.currentFapaiData, "tableIndex");
		for (let i = 0; i < curentFaiPaiData.length; ++i) {
			let data = curentFaiPaiData[i];
			//data是玩家的index;
			this.hideCardsAndPattern(data["tableIndex"]);
			this.allNum += 3;
		}
		let fapaiArr = [];
		//创建手牌个数
		this.createPokers(this.allNum);



		let count = 0;
		this.currentIndex = 0;

		do {
			for (let i = 0; i < curentFaiPaiData.length; i++) {
				let playIndex = curentFaiPaiData[i]["playerIndex"];
				this.poker2Player(playIndex, i, count);
				count++;
			}
			this.showCount--;
		} while (this.showCount > 0);

	}

	protected get haveMine() {
		let haveMine: boolean = false
		for (let i = 0; i < this.currentFapaiData.length; ++i) {
			let data = this.currentFapaiData[i];
			if (data["playerIndex"] == Global.roomProxy.getMineIndex()) {
				haveMine = true;
			}
		}
		return haveMine;
	}
	protected currentIndex: number;
	/**
	 * @param  {} playerIndex tableIndex
	 * @param  {number=1} cardIndex 1
	 * @param  {} cardNum 排面值
	 * @param  {} index 1
	 * @param  {} showPoint true
	 */
	protected poker2Player(playerIndex, index, count) {
		let card = this.fapaiLists.pop();
		let cardList: BaiCaoCardList;

		cardList = this[`card${this.directions[playerIndex]}`] as BaiCaoCardList;
		let cradNum = this.showCount;
		if (this.showCount == 3) cradNum = 1;
		if (this.showCount == 1) cradNum = 3;
		//找牌
		let cardListCard: PokerCard = cardList.getCurrentCard(cradNum);
		let _scaleX = playerIndex == Global.roomProxy.getMineIndex() ? 0.94 : 0.65;
		let _scaley = playerIndex == Global.roomProxy.getMineIndex() ? 0.94 : 0.65;
		let deltaX = 423.3 - 398;
		let deltaY = 276.8 - 245;
		if (playerIndex == Global.roomProxy.getMineIndex()) {
			deltaX = 305.4 - 290;
			deltaY = 1031.85 - 1010;
		}
		let position = cardListCard.localToGlobal();
		let posX = position.x + card.anchorOffsetX - deltaX;
		let posY = position.y + card.anchorOffsetY - deltaY;

		let time = 150;
		let moveTime = count * 155 / 2;//index * time
		let time1 = this.currentIndex * 155 / 2;
		if (Global.runBack) {
			time = 1;
		}

		this.setAutoTimeout(() => {
			SoundManager.getInstance().playEffect("bc_deal_mp3");
		}, this, moveTime);
		egret.Tween.get(card).wait(moveTime).call(() => {
		}).to({
			x: posX, //+ card.anchorOffsetX,
			y: posY,// + card.anchorOffsetY,
			rotation: 0,
			scaleX: _scaleX,
			scaleY: _scaley
		}, time).call(() => {
			cardListCard.visible = true;
		}, egret.Ease.circOut);
		this.setAutoTimeout(() => {
			this.currentIndex++;
			card.x = posX;
			card.y = posY;
			card.scaleX = _scaleX;
			card.scaleY = _scaley;
			egret.Tween.removeTweens(card);
			game.UIUtils.removeSelf(card);
			//如果是自己把牌翻过来
			cardListCard.visible = true;
			card = null;
			if (this.currentIndex == this.allNum && this.haveMine) {
				let card1 = (this["card1"] as BaiCaoCardList);
				card1.fanCards();
				card1.cardAnimation();
				this.setAutoTimeout(() => {
					this.timeBar.visible = true;
				}, this, 350)
			}
			if (this.currentIndex == this.allNum && this.haveMine == false) {
				this.timeBar.visible = true;
			}
		}, this, moveTime + time);//400

		return cardList;
	}


	private createPokers(number) {
		for (let i = 0; i < number; i++) {
			let card = new PokerCard(false);
			card.scaleX = card.scaleY = 0.65;
			game.UIUtils.setAnchorPot(card);
			card.showOtherImage(false);

			// card.rotation = -50;
			card.showZ2B();
			this.effectGroup.addChild(card);
			card.x = this.fapaiGroup.x;
			card.y = this.fapaiGroup.y;
			this.fapaiLists.push(card);
		}
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






	private getHeaderByIndex() {

	}

	public stopTimerByIndex(playerIndex) {
		let header = this[`header${this.directions[playerIndex]}`] as BlackJHeader;
		header.removeTimer();
	}

	protected cmGroup: eui.Group;
	protected cmGroupAddCm(coin: CoinComponent, headIndex: any = null) {
		let point = this.cmGroup.globalToLocal(coin.x, coin.y);
		coin.x = point.x;
		coin.y = point.y
		this.cmGroup.addChild(coin);
	}


	/**
	 * 头像押注
	 */
	protected header2Group(headerIndex, coinObj: CoinComponent, ani) {
		SoundManager.getInstance().playEffect("bc_chip_mp3");
		let header = this[`header${headerIndex}`] as baicao.BaiCaoHeader;
		let headerPoint = header.localToGlobal();
		coinObj.x = headerPoint.x + header.coinTarget.x;
		coinObj.y = headerPoint.y + header.coinTarget.y;
		// coinObj.x = headerPoint.x + header.width / 2;
		// coinObj.y = headerPoint.y + header.height / 2 - coinObj.height * 0.4;
		this.touchGroup.addChild(coinObj);
		let endPoint = this.cmGroup.localToGlobal();//cmGroup
		let endX = endPoint.x + _.random(10, 50);
		let endY = endPoint.y + _.random(10, 50);
		let time = 200//200;
		if (ani) {
			egret.Tween.get(coinObj).to({
				x: endX,
				y: endY
			}, time);
			if (Global.runBack) {
				egret.Tween.removeTweens(coinObj);
				coinObj.x = endX;
				coinObj.y = endY;
				this.cmGroupAddCm(coinObj);
			}
			else {
				this.setAutoTimeout(() => {
					egret.Tween.removeTweens(coinObj);
					coinObj.x = endX;
					coinObj.y = endY;
					this.cmGroupAddCm(coinObj);
				}, this, time);
		}
		} else {
			coinObj.x = endX;
			coinObj.y = endY;
			this.cmGroupAddCm(coinObj);
		}
	}


	protected getCMColor(coinNumber) {
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


	private get coinColorIndex(): number {
		let _index: number;
		let roomInfo = Global.roomProxy.roomInfo
		let betBase = roomInfo.betBase;
		if (betBase > 0) {
			_index = 2;
		}
		if (betBase > 10) {
			_index = 4;
		}
		if (betBase > 30) {
			_index = 3;
		}
		else {
			_index = 1;
		}
		return _index;
	}
	public playerYZ(playerIndex, coinNumber, needAni) {
		coinNumber = Number(coinNumber);
		let coin = ObjectPool.produce("baicao_cm", null) as CoinComponent;
		if (!coin) {
			coin = new CoinComponent(CoinType.BAICAO);
			coin.touchEnabled = false;
			game.UIUtils.setAnchorCenter(coin);
		}
		coin.scaleY = coin.scaleX = 0.9;
		this.coinArr.push(coin);
		let index = this.coinColorIndex;//this.getCMColor(coinNumber);
		coin.showCoin(`baicao_cm_${index}`, coinNumber);
		this.header2Group(playerIndex, coin, needAni);
		return coin;
	}
	/**创建赢了得coin */
	private createGainCoin(coinNumber): CoinComponent {
		coinNumber = Number(coinNumber);
		let coin = ObjectPool.produce("baicao_cm", null) as CoinComponent;
		if (!coin) {
			coin = new CoinComponent(CoinType.BAICAO);
			coin.touchEnabled = false;
			game.UIUtils.setAnchorCenter(coin)
		}
		let index = this.getCMColor(coinNumber);
		coin.showCoin(`baicao_cm_${index}`, coinNumber);
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
	private delayShowAddBet(delay: number, playerIndex, betInfo) {
		this.setAutoTimeout(() => {
			this.setTotalBet(betInfo + this.getTotalBet());
			if (Global.runBack) {
				this.playerYZ(this.directions[playerIndex], betInfo, false);
			}
			else {
				this.playerYZ(this.directions[playerIndex], betInfo, true);
			}

		}, this, delay);
	}
	private firstYz: boolean = true;

	/**
	 * 下注
	 * @param  {egret.Event} e
	 */
	protected setTotalBet(bet: number) {
		this.totalBet.text = "Tổng:" + bet;
	}
	private getTotalBet() {
		let txt = this.totalBet.text;
		let val = Number(txt.replace("Tổng:", ""));
		return val;
	}
	protected allInDB1: DBComponent;
	protected allInDB2: DBComponent;
	protected allInDB3: DBComponent;
	protected allInDB4: DBComponent;
	protected allInDB5: DBComponent;
	protected allInDB6: DBComponent;
	protected s_addBet(e: egret.Event) {


		//

		let data = e.data;
		let playerIndex: number;
		let totalBet = data.totalBet;
		let betInfo = data.bet;
		let delayCtrl: Array<any> = data.delayCtrl;
		let delay: number;
		let onePlayerData: any;
		let betDatas = _.sortBy(delayCtrl, 'delay');

		for (let i = 0; i < betDatas.length; ++i) {
			onePlayerData = betDatas[i];
			playerIndex = onePlayerData.playerIndex;
			delay = onePlayerData.delay;
			let allIn = onePlayerData["allIn"];
			let dirc = this.directions[playerIndex];
			let dbGroup: eui.Group = this["db" + dirc] as eui.Group;
			this.delayShowAddBet(delay, playerIndex, betInfo);
			if (allIn > 0) {
				this["allInDB" + dirc] = Owen.UtilsString.playDB("ynbc_all_in", dbGroup, -1);
				SoundManager.getInstance().playEffect("bc_allin_mp3");
			}
		}
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
		// this.xzBar.hide();
	}

	/**
	 * 进入押注阶段
	 */
	protected runAddBet(reconnect) {
		if (reconnect == false) return;
		let roomInfo = Global.roomProxy.roomInfo;
		let players = roomInfo.players;
		let onePlayer: any;
		for (var key in players) {
			onePlayer = players[key];
			let betInfo = onePlayer["bet"];
			if (betInfo == 0) {
				continue;
			}
			this.playerYZ(this.directions[key], betInfo, false);
		}
	}

	/**
	 * 主要用于起始隐藏一些UI
	 * 初始化UI
	 */
	private roomid: eui.Label;
	private initUI() {
		this.timeBar.startTime(this);
		let roomInfo = Global.roomProxy.roomInfo;
		this.roomid.text = TextUtils.instance.getCurrentTextById(48) + ":" + roomInfo.roomId;//"房间编号:"
		if (roomInfo.totalBet) {
			this.setTotalBet(roomInfo.totalBet);
		}
		else {
			this.setTotalBet(0);
		}
		this.showBtnsType(1);
		for (let i = 1; i <= 6; i++) {
			let card1 = this[`card${i}`] as BaiCaoCardList;
			let pattern = this[`pattern${i}`] as baicao.BaiCaoPattern;
			card1.resetLists();
			pattern.visible = false;
			let header = this[`header${i}`] as baicao.BaiCaoHeader;
			header.visible = false;
		}
		this.showHeaders();
	}


	/**
	 * 展现玩家头像
	 */
	protected showHeaders() {
		for (let i = 1; i <= 6; ++i) {
			let header = this['header' + 1] as BlackJHeader;
			header.visible = false;
		}
		let players = Global.roomProxy.getPlayers();
		for (let key in players) {
			let dir = this.directions[key];
			players[key].playerIndex = key;
			let header = this['header' + dir] as BlackJHeader;
			header.initWithPlayer(players[key]);
			header.visible = true;
		}
	}

	/**
	 * 玩家押注
	 */
	private postCBet() {

	}
}
//比较规则：0(Bù)<1<2<3<4<5<6<7<8<9<3 Tiên<3 Cào
const BAICAO_PATTERN = {
	BU: 0,      // 当3张牌分数加起来为0时，称为Bù
	TIEN3: 10,  // 当3张牌都为花牌时，称为3 Tiên
	CAO3: 11    // 当3张牌为3，3，3时，称为3 Cào
}

//  WA

// 黑，红，梅，方 
//  J: 11,
//     Q: 12,
//     K: 13,
//     A: 1,


//  WAITING: 0,   // 等待其它玩家准备
//     ADD_BET: 1, // 下注
//     NEW_CARD: 2,   // 发牌
//     OPEN_CARD: 3,   // 开牌
//     COMPARE_CARD: 4, // 比牌
//     SETTLEMENT: 5, // 结算
//     STEP_WAIT: 6, // 步骤等待


/**游戏状态定义*/
const BAICAO_ROUND_STATUS = {
	WAITING: 0,   // 等待其它玩家准备
	ADD_BET: 1,     // 下注
	NEW_CARD: 2,   // 发牌
	OPEN_CARD: 3,   // 开牌
	COMPARE_CARD: 4, // 比牌
	SETTLEMENT: 5,// 结算
	STEP_WAIT: 6, // 步骤等待
};
