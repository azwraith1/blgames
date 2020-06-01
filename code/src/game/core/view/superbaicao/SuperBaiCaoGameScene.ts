class SuperBaiCaoGameScene extends BaiCaoGameScene {
	private giveupBtn: eui.Button;
	private tisiLable: eui.Label;
	private tisiGroup: eui.Group;
	private haveTouchBtn: boolean = false;
	private xzBar: SuperBaiCaoXZBar1;

	//new
	/**
	 * 打开游戏界面通知
	 */
	public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_SUPERBAICAO_GAME;

	/**
	 * 关闭游戏界面通知
	 */
	public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_SUPERBAICAO_HALL;

	/**
	 * 关闭当前界面通知
	 */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SUPERBAICAO_GAME;

	/**
	 * 对应匹配界面通知
	 */
	public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_SUPERBAICAO_MATCHING;
	private xzBarMask: eui.Rect;
	public constructor() {
		super();
		this.skinName = "SuperBaiCaoGameSceneSkin";
	}
	private hideAllColock() {
		for (let i = 1; i < 7; ++i) {
			(this["header" + i] as baicao.BaiCaoHeader).hideClock();
		}
	}
	private haveClickGiveUp: boolean = false;

	/**
* 开牌开始
* @param  {egret.TouchEvent} e
*/
	protected s_startOpenCard(e: egret.Event) {
		let data = e.data;
		this.hideAllBetState();
		this.xzBar.hide();
	}


	/**
 * 下注
 * @param  {egret.Event} e
 */
	protected setTotalBet(bet: number) {
		this.totalBet.text = bet.toString();
	}
	public createChildren() {
		super.createChildren();
		this.hideAllColock();
		this.xzBar.setRoot(this);
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
	}

	protected showPattern(pattern: number, isWin: number, direc: any) {
		let _pattern = this["pattern" + direc] as baicao.BaiCaoPattern;
		_pattern.visible = true;
		_pattern.showSuperBaiCaoPattern(pattern, isWin)
	}
	/**点击放弃 */
	private async onToucGiveUp() {
		this.xzBar.hide();
		let data = {
			type: 1
		}
		let resp: any = await Global.pomelo.request(ServerPostPath.game_superBaiCaoHandler_c_oprate, data);
		Global.pomelo.clearLastLock();
		//成功
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			this.haveClickGiveUp = true;
			LogUtils.logD("===========onToucGive==" + JSON.stringify(resp));
			this.haveTouchBtn = true;
			this.xzBar.hide(false);
			this.setAutoTimeout(() => {
				this.restartBtn.visible = true;
			}, this, 500);
			//可以开始下一局

		}
	}
	/**隐藏所有下注得状态*/
	private hideAllBetState() {
		let header: baicao.BaiCaoHeader;
		for (let i = 1; i < 7; ++i) {
			header = this["header" + i] as baicao.BaiCaoHeader;
			header.betState.visible = false;
		}
	}
	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_playerOprate, this.s_playerOprate, this);
		CF.aE(ServerNotify.s_playerOprateResult, this.s_playerOprateResult, this);
		CF.aE(ServerNotify.s_newTurnOprateNotify, this.s_newTurnOprateNotify, this);
	}
	/**
 * 倒计时推送
 */
	protected countdown(e: egret.Event) {
		let dataall = e.data;
		let data = dataall.countdownMS;
		let roomInfo = Global.roomProxy.roomInfo as BaseRoomInfo;
		let playerIndex = dataall["pIndex"];
		let direc = this.directions[playerIndex];
		if (!roomInfo.countdown) {
			roomInfo.countdown = {};
		}
		let s = data["s"];
		roomInfo.countdown = data;
		let header = this["header" + direc] as baicao.BaiCaoHeader;
		header.startTimer();
		header.showClock(s / 2);

	}



	protected s_newTurnOprateNotify(e: egret.Event) {
		// let data = e.data;
		// let validPlayerIndex: Array<any> = data["validPlayerIndex"];
		// if (validPlayerIndex.length == 0) {
		// 	this.hideAllHeaderKuang();
		// 	this.hideAllBetState();
		// }
		// else {
		// 	for (let i = 0; i < validPlayerIndex.length; ++i) {
		// 		let playerIndex = validPlayerIndex[i];
		// 		let direc = this.directions[playerIndex];
		// 		let header = (this["header" + direc] as baicao.BaiCaoHeader);
		// 		header.stopChuPaiDB();
		// 		header.betState.visible = false;

		// 	}
		// }
	}
	/**
	 * 展现玩家头像
	 */
	protected showHeaders() {
		let players = Global.roomProxy.getPlayers();
		for (let key in players) {
			let dir = this.directions[key];
			players[key].playerIndex = key;
			let header = this['header' + dir] as BlackJHeader;
			header.initWithPlayer(players[key], "nns");
			header.visible = true;
		}
	}
	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_playerOprate, this.s_playerOprate, this);
		CF.rE(ServerNotify.s_playerOprateResult, this.s_playerOprateResult, this);
		CF.rE(ServerNotify.s_newTurnOprateNotify, this.s_newTurnOprateNotify, this);
		for (let i = 1; i <= 6; ++i) {
			(this["header" + i] as baicao.BaiCaoHeader).removeTimer()
		}
	}

	private s_playerOprateResult(e: egret.Event) {
		// this.hideAllColock();
		// type 1是放弃 3加注 2 跟注
		let playerData = e.data;
		let playerIndex = playerData["pIndex"];
		let dirc = this.directions[playerIndex];
		let type = playerData["type"];
		let bet = playerData["bet"];
		//all in
		let allIn = playerData["allIn"]
		let dbGroup: eui.Group = this["db" + dirc] as eui.Group;
		if (allIn > 0) {
			if (!this["allInDB" + dirc]) {
				this["allInDB" + dirc] = Owen.UtilsString.playDB("ynbc_all_in", dbGroup, -1);
				SoundManager.getInstance().playEffect("bc_allin_mp3");
			}
		}
		let header: baicao.BaiCaoHeader = this["header" + dirc] as baicao.BaiCaoHeader;
		header.hideClock();
		header.removeTimer();
		let list: BaiCaoCardList = this["card" + dirc] as BaiCaoCardList;
		if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
			header.mineReseatLiushuiPos(false);
		}
		else {
			header.otherReseatLiushuiPos(false);
		}
		header.setBetState(type, bet);

		this.hideAllHeaderKuang();
		if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
			if (type != 1) {
				this.xzBar.hide();
				this.hideGiveBtn();
			}
			if (type == 1) {
				this.xzBar.hide();
				this.hideGiveBtn();
				this.xzBar.hide(false);
				this.setAutoTimeout(() => {
					this.restartBtn.visible = true;
				}, this, 300);

			}
		}
		if (type != 1) {
			if (bet > 0) {
				if (Global.runBack) {
					this.playerYZ(playerIndex, bet, false);
				}
				else {
					this.playerYZ(playerIndex, bet, true);
				}
			}
		}
		if (type == 1) {
			list.showMaskRect(true);
		}
		this.setTotalBet(playerData["totalBet"])

	}
	private s_playerOprate(e: egret.Event) {


		let playerData = e.data;
		let playerIndex = playerData["pIndex"];
		this.countdown(e);
		let dirc = this.directions[playerIndex];
		if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
			//if (this.giveupBtn.verticalCenter != 530) {
			this.showGiveBtnAni();
			// }
			if (this.xzBar.xzBarVis == false || this.haveClickGiveUp == false) {
				this.xzBar.show();
			}
		}
		let followBet: number = playerData["followBet"];
		this.showChuPaiHeader(playerIndex);
		if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
			this.initXZBar(followBet);
			this.xzBar.show();
		}

	}

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
				CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "superbaicao" });
				break;
			case this.recordBtn:
				this.showBtnsType(1);
				CF.sN(PanelNotify.OPEN_BASE_RECORD, GAME_ID.SUPERBAICAO);
				break;
			case this.helpBtn:
				this.showBtnsType(1);
				BaiCaoHelpPanel.instance.show("superbaicao");
				break;
			case this.giveupBtn:
				this.onToucGiveUp();
				break;

		}
	}
	private showChuPaiHeader(playIndex: number) {
		this.hideAllHeaderKuang();
		let dirc = this.directions[playIndex];
		let header = this["header" + dirc] as baicao.BaiCaoHeader;
		header.playChuPaiDB();
	}
	private hideAllHeaderKuang() {
		let header: baicao.BaiCaoHeader
		for (let i = 1; i <= 6; ++i) {
			header = this["header" + i] as baicao.BaiCaoHeader;
			header.stopChuPaiDB();
		}
	}
	/**
	 * 初始化下注条
	 */
	private initXZBar(followBet: number) {
		let addBetMulti = Global.roomProxy.roomInfo.addBetMulti;
		this.xzBar.initWithArr(addBetMulti, Global.roomProxy.roomInfo.betBase, followBet);
	}

	public showGiveBtnAni(needAni: boolean = true) {
		this.giveupBtn.visible = true;
		this.giveupBtn.alpha = 1;

		let delayTime = 400;
		if (needAni == false) {
			this.giveupBtn.verticalCenter = 530;
		}
		else {
			egret.Tween.get(this.giveupBtn).to({ verticalCenter: 530 }, delayTime, egret.Ease.quadOut);
			this.setAutoTimeout(() => {
				this.giveupBtn.verticalCenter = 530;


			}, this, delayTime);
		}
	}
	public hideGiveBtn() {
		let delayTime = 400;
		if (Global.runBack) {
			this.giveupBtn.verticalCenter = 1700;
			this.giveupBtn.visible = false;
		}
		else {
			egret.Tween.get(this.giveupBtn).to({ verticalCenter: 700, alpha: 0 }, delayTime, egret.Ease.quadOut);
			this.setAutoTimeout(() => {
				this.giveupBtn.verticalCenter = 1700;
				this.giveupBtn.visible = false;
			}, this, delayTime)
		}
	}
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
					// this.timeBar.visible = true;
				}, this, 350)
			}
			if (this.currentIndex == this.allNum && this.haveMine == false) {
				// this.timeBar.visible = true;
			}

			if (this.currentIndex == this.allNum) {

				this.showGiveBtnAni();
			}
		}, this, moveTime + time);//400

		return cardList;
	}
	private allCoinsArr: any = {};
	public playerYZ(playerIndex, coinNumber, needAni) {
		coinNumber = Number(coinNumber);
		let coin = ObjectPool.produce("superbaicao_cm", null) as CoinComponent;
		if (!coin) {
			coin = new CoinComponent(CoinType.SUPERBAICAO);
			coin.jiazhuImg.visible = false;
			coin.touchEnabled = false;
			game.UIUtils.setAnchorCenter(coin);
		}
		coin.scaleY = coin.scaleX = 0.9;
		let headerIndex = this.directions[playerIndex];
		this.pushCoin(headerIndex, coin);
		let index = this.getCMColor(coinNumber);
		coin.showBaiCaoCoin(`superbaicao_cm_${index}`, coinNumber);
		this.header2Group(headerIndex, coin, needAni);
		return coin;
	}




	private pushCoin(headerIndex: string, coin: CoinComponent) {
		if (!this.allCoinsArr[headerIndex]) {
			this.allCoinsArr[headerIndex] = [];
		}
		let temptArr: Array<CoinComponent> = this.allCoinsArr[headerIndex];
		temptArr.push(coin);
	}
	/**
	 * 结算
	 * @param  {egret.Event} e
	 */
	protected roundSettlement(e: egret.Event) {
		let data = e.data;
		// this.winPlayerIndex = 3;
		// let testData = { "1": { "gainGold": -19, "pumpGold": 0, "ownGold": 9981, "isDefeat": false, "backBet": 0 }, "2": { "gainGold": -26.01, "pumpGold": 0, "ownGold": 87.11, "isDefeat": false, "backBet": 2.9800000000000004 }, "3": { "gainGold": 67.47, "pumpGold": 3.56, "ownGold": 93.49, "isDefeat": false, "backBet": 0 }, "4": { "gainGold": -26.02, "pumpGold": 0, "ownGold": 53.43, "isDefeat": false, "backBet": 2 } };
		// let testdata = { "1": { "gainGold": -7, "pumpGold": 0, "ownGold": 999993, "isDefeat": false, "backBet": 0 }, "2": { "gainGold": -1, "pumpGold": 0, "ownGold": 254.65, "isDefeat": false, "backBet": 0 }, "3": { "gainGold": -1, "pumpGold": 0, "ownGold": 46.34, "isDefeat": false, "backBet": 0 }, "4": { "gainGold": -1, "pumpGold": 0, "ownGold": 35.23, "isDefeat": false, "backBet": 0 }, "5": { "gainGold": 9.5, "pumpGold": 0.5, "ownGold": 204.7, "isDefeat": false, "backBet": 0 }, "6": { "gainGold": -8, "pumpGold": 0, "ownGold": 101.88, "isDefeat": false, "backBet": 2 } };
		// data = testData;
		this.timeBar.removeTimer();
		this.xzBar.hide(false);
		this.hideGiveBtn();
		if (Global.runBack) {
			this.cmGroup.removeChildren();
		}
		LogUtils.logD("结算数据" + JSON.stringify(data));
		this.setAutoTimeout(() => {

			//smart
			for (var key in data) {
				let gainInfo = data[key];
				var gainPlayer: any;
				if (gainInfo.gainGold >= 0) {
					gainPlayer = key;
				}
				this.showLiuShui(this.piaoFenDelay, gainInfo, key);
			}
			this.setAutoTimeout(() => {
				this.cmPlay(data, this.winPlayerIndex);
			}, this, this.piaoFenDelay)//1000
			this.setAutoTimeout(() => {
				this.restartBtn.visible = true;
			}, this, 2000);
		}, this, 1000);
	}
	private showLiuShui(piaoFenDelay: number, gainInfo: any, key: any) {
		this.setAutoTimeout(() => { this.showRecords(gainInfo, key); }, this, piaoFenDelay);
	}

	/**
 * 
 * @param  {} roundSettlement
 */
	protected showRecords(gainInfo, playerIndex) {
		let header = this[`header${this.directions[playerIndex]}`] as baicao.BaiCaoHeader;
		let betBack: number = gainInfo["backBet"];

		//播放胜利
		if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold > 0) {
		}
		if (gainInfo.gainGold > 0) {
			//筹码重新设置为0
			this.setTotalBet(0);
		}
		if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold <= 0) {

		}
		header.updateGold(gainInfo.ownGold, false);
		if (gainInfo.gainGold <= 0) {
			if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
				header.mineReseatLiushuiPos(false);
			}
			else {
				header.otherReseatLiushuiPos(false);
			}
			header.showSuperLiushui(gainInfo.gainGold);
		}
		else {
			this.mineWinLabel.visible = true;
			this.mineWinLabel.text = "+" + gainInfo.gainGold + "";
		}
		if (betBack > 0) {

			if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
				header.mineReseatLiushuiPos(true);
			}
			else {
				header.otherReseatLiushuiPos(true);
			}
			header.rebackTxt.text = "nl" + betBack.toString();
		}
		else {
			header.mineReseatLiushuiPos(false);
			header.otherReseatLiushuiPos(false);
		}
	}
	/**飞筹码 */
	private cmPlay(data, gainPlayer) {
		let players: Object = Global.roomProxy.getPlayers();
		let playerLen: number = _.keys(players).length;
		if (this.haveWinPlayer == false) {

			for (let i = 1; i <= playerLen; ++i) {
				let header = this.directions[i];
				let coins = this.allCoinsArr[header];
				this.cm2Player(header, coins);
			}
		}
		else {
			let backArr = this.needCoinsPlay(data);
			if (backArr.length == 0) {
				let coins = _.values(this.allCoinsArr);

				let newCoins: Array<CoinComponent> = [];
				for (let i = 0; i < coins.length; ++i) {
					let tempt: Array<CoinComponent> = coins[i];
					for (let j = 0; j < tempt.length; ++j) {
						let one: CoinComponent = tempt[j];
						newCoins.push(one);
					}
				}
				let tableIndex = this.directions[gainPlayer];
				this.cm2Player(tableIndex, newCoins);
			}
			else {
				let allPlayer = [];//allPlayer
				for (let i = 1; i <= playerLen; ++i) {//playerLen
					allPlayer.push(i.toString());
				}
				let _diffrent = _.difference(allPlayer, backArr);
				let gainPlayerNew = gainPlayer + "";
				_diffrent = _.difference(_diffrent, [gainPlayerNew]);
				let dire = this.directions[gainPlayer];
				let winCoins: Array<CoinComponent> = this.allCoinsArr[dire];
				for (let i = 0; i < _diffrent.length; ++i) {
					let direc = this.directions[_diffrent[i]];
					let arr: Array<CoinComponent> = this.allCoinsArr[direc];
					for (let j = 0; j < arr.length; ++j) {
						winCoins.push(arr[j]);
					}
					this.allCoinsArr[direc] = [];
				}
				let _index = backArr.indexOf(gainPlayer);
				if (_index == -1) {
					this.cm2Player(gainPlayer, winCoins);
				}


				for (let i = 0; i < backArr.length; ++i) {
					let playerIndex = backArr[i];
					let direc = this.directions[playerIndex];
					let otherCoins = this.allCoinsArr[direc];
					if (playerIndex == gainPlayer) {
						this.cm2Player(playerIndex, winCoins);
					}
					else {
						this.cm2Player(playerIndex, otherCoins);
					}
				}
			}
		}
	}

	/**
 * 金币飞去玩家
 */
	protected cm2Player(tabelIndex, coins: Array<CoinComponent>, playerIndex = null, realGainGold = null) {
		//从筹码盒子到玩家下注区域
		let header = this[`header${tabelIndex}`] as baicao.BaiCaoHeader;
		let positon = new egret.Point();
		let headerPoint = header.coinTarget.localToGlobal();
		//从玩家风向头像
		SoundManager.getInstance().playEffect("bc_chip3_mp3");
		for (let i = 0; i < coins.length; i++) {
			let coin = coins[i];
			this.coinMoveAniNew(coin, headerPoint, _.random(10, 100), coins);//10, 50
		}
	}
	private needCoinsPlay(data): Array<any> {
		let needAni: Array<any> = [];
		for (var key in data) {
			let gainInfo = data[key];
			if (gainInfo["backBet"] > 0) {
				needAni.push(key);
			}
		}
		return needAni;
	}


	/**
 * 下注
 * @param  {egret.Event} e
 */
	protected s_NewAddBet(e: egret.Event) {
		let data = e.data;
		let playerIndex = data.playerIndex;
		let tableIndex = data.tableIndex;
		let betInfo = data.betInfo;
		let totalBet = data.totalBet;
		this.playerYZ(this.directions[playerIndex], betInfo, true);
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
		this.haveWinPlayer = winPlayer.length > 0;
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
			case SUPERROUND_STATUS.ADD_BET:
				for (var key in players) {
					let dirc = this.directions[key];
					let data = players[key];
					let allIn = data["allIn"];
					if (allIn) {
						if (!this["allInDB" + dirc]) {
							this.showAllIn(dirc);
						}
					}
				}
				break;
			case SUPERROUND_STATUS.COMPARE_CARD:
				this.hideAllInDB();
				this.showZhengInfor(Global.roomProxy.roomInfo.players);
				this.compareResult(roomInfo["outPlayer"], roomInfo["winPlayer"]);
				break;
			case SUPERROUND_STATUS.OPEN_CARD:
				this.hideAllBetState();
				this.showZhengInfor(Global.roomProxy.roomInfo.players);
				break;
			case BAICAO_ROUND_STATUS.NEW_CARD:
				this.showPaiInfor(Global.roomProxy.roomInfo.players)
				break;
			case SUPERROUND_STATUS.RAISE_BET:
				this.showZhengInfor(Global.roomProxy.roomInfo.players);
				//加注阶段 显示加注得状态 
				for (var key in players) {
					let dirc = this.directions[key];
					let data = players[key];
					let allIn = data["allIn"];
					if (allIn) {
						if (!this["allInDB" + dirc]) {
							this.showAllIn(dirc);
						}
					}
					let header: baicao.BaiCaoHeader = this["header" + dirc] as baicao.BaiCaoHeader;
					if (Global.roomProxy.checkIndexIsMe(key)) {
						if (data["operate"] == 0) {
							this.showGiveBtnAni(false);
						}
					}
					header.setBetState(data["operate"], data["bet"]);
					if (data["operate"] == 1) {
						(this["card" + dirc] as BaiCaoCardList).showMaskRect(true);
					}
				}
				break;
			default:
				break;
		}
	}

	protected showAllIn(dirc: any) {
		let dbGroup: eui.Group = this["db" + dirc] as eui.Group;
		this["allInDB" + dirc] = Owen.UtilsString.playDB("ynbc_all_in", dbGroup, -1);
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
			let betArr: Array<any> = onePlayer["betArray"];
			if (betInfo == 0) {
				continue;
			}
			let oneBet = betArr[0];
			this.playerYZ(this.directions[key], oneBet, false);

		}
		for (var key in players) {
			onePlayer = players[key];
			let betInfo = onePlayer["bet"];
			let betArr: Array<any> = onePlayer["betArray"];
			if (betInfo == 0) {
				continue;
			}
			let oneBet: any;
			for (let i = 1; i < betArr.length; ++i) {
				oneBet = betArr[i];
				if (oneBet > 0) {
					this.playerYZ(this.directions[key], oneBet, false);
				}
			}

		}

	}

	/**
	 * 筹码组点击
	 * @param  {egret.Event} e
	 */


}
const SUPERROUND_STATUS = {
	WAITING: 0,   // 等待其它玩家准备
	ADD_BET: 1, // 下注
	NEW_CARD: 2,   // 发牌
	RAISE_BET: 3,   // 加注
	OPEN_CARD: 4,   // 开牌
	COMPARE_CARD: 5, // 比牌
	SETTLEMENT: 6, // 结算
	STEP_WAIT: 7, // 步骤等待
};