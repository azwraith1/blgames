/*
 * @Author: MC Lee 
 * @Date: 2019-11-27 10:51:34 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-19 05:13:40
 * @Description: 进入匹配界面
 */
class MatchWaitPanel extends game.BaseScene {
	protected static _instance;
	public static get instance(): MatchWaitPanel {
		if (!MatchWaitPanel._instance) {
			MatchWaitPanel._instance = new MatchWaitPanel();
		}
		return MatchWaitPanel._instance;
	}

	protected timeLabel: eui.Label;

	protected backBtn: eui.Button;

	private itemData;

	protected players = {};
	protected lockReq: boolean = false;
	protected isStart = false;
	protected isInitHand = false;

	protected scroller: eui.Scroller;
	private contentGroup: eui.Group;

	private totalLabel: eui.Label;
	private needLabel: eui.Label;
	private titleLabel: eui.Label;

	private tipLabel1: eui.Label;
	private tipGroup: eui.Group;
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "m_mjxzdd_bg_mp3";
	public constructor() {
		super();
		this.skinName = new MatchWaitPanelSkin();
	}

	public clubInvite(e: egret.Event) {

	}

	public s_pushRaceInvite() {

	}

	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_raceStartResult, this.s_raceStartResult, this)
		CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.aE(ServerNotify.s_countdown, this.countdDown, this);
		CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_enterRace, this.s_enterRace, this);
		CF.aE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
		CF.aE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
		CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
		CF.rE(ServerNotify.s_countdown, this.countdDown, this);
		CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
		CF.rE(ServerNotify.s_raceStartResult, this.s_raceStartResult, this)
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_enterRace, this.s_enterRace, this);
		CF.rE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
		CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		clearInterval(this.interval);
		this.interval = null;
	}

	private async reconnectSuc() {
		// this.hide();
		let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {});
		Global.gameProxy.roomState = resp;
		Global.gameProxy.lastGameConfig = resp;
		if (Global.gameProxy.roomState && Global.gameProxy.roomState.state == 1) {
			var handler = ServerPostPath.hall_sceneHandler_c_enter;
			let resp: any = await game.PomeloManager.instance.request(handler, Global.gameProxy.roomState);
			if (resp.error) {
				Global.alertMediator.addAlert(resp.error.msg, () => {
				}, null, true);
				return;
			}
			if (resp.reconnect) {
				if (Global.gameProxy.roomState.raceState == 2) {
					HallForwardFac.redirectRaceScene(resp, Global.gameProxy.roomState, (isPlaying) => {
						if (isPlaying) {
							this.hide();
						} else {
							Global.gameProxy.clearAllRoomInfo();
							CF.sN(SceneNotify.OPEN_MATCH_HALL);
						}
					});
					return;
				}
			}
		} else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 3) {
			Global.alertMediator.addAlert("您已经被淘汰.", null, null, true);
			this.hide();
		}
		else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 1) {
			//可能会轮空
			MatchPassPanel.instance.showLunKong();
			this.hide();
		} else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 4) {
			MatchPassPanel.instance.showWating();
			this.hide();
		}
		else {
			Global.alertMediator.addAlert("您掉线了,请退出后重新加入比赛", null, null, true);
		}
		// CF.sN(SceneNotify.OPEN_MATCH_HALL);
	}

	/**
	 * 奖励
	 */
	private s_pushRaceReward(e: egret.Event) {
		let data = e.data;
		let roomInfo = Global.gameProxy.roomInfo;
		roomInfo.rewardDatas = data;
		if (data && data.reward) {
			//淘汰了
			MatchOverPanel.instance.show(roomInfo.rewardDatas);
			this.hide();
		}
	}

	/**
	 * 轮空
	 * @param  {egret.Event} e
	 */
	private s_freePlayer(e: egret.Event) {
		this.hide();
		MatchPassPanel.instance.showLunKong();
	}

	protected textLabel: eui.Label;
	private s_enterRace(e: egret.Event) {
		let data = e.data;
		let enterNum = data.enterNum;
		let count = (this.itemData.cutoffNum - enterNum);
		if (count < 0) {
			count = 0;
		}
		let str = `<font color="#E7D6B5" size="32">当前进入比赛人数 </font><font color="#67C62E" size="32">${data.enterNum}</font>`
			+ `<font color="#E7D6B5" size="32"> 人,还需 </font><font color="#67C62E" size="32">${count}</font><font color="#E7D6B5" size="32"> 人即可开赛</font>`;
		this.textLabel.textFlow = (new egret.HtmlTextParser).parser(str);
		this.totalLabel.text = enterNum + "";
		this.needLabel.text = count + "";
	}

	private startCountDown(e: egret.Event) {
		let data = e.data;
	}

	public show() {
		this.itemData = Global.gameProxy.matchItemData;
		this.showInfo();
		GameLayerManager.gameLayer().panelLayer.addChild(this);
	}


	protected showInfo() {
		this.startInterval();
		let data = Global.gameProxy.matchItemData;
		this.totalLabel.text = data.enterNum;
		let needCount = this.itemData.cutoffNum - data.enterNum;
		if (needCount < 0) {
			needCount = 0;
		}
		this.needLabel.text = needCount + "";
		let str = `<font color="#E7D6B5" size="32">当前进入比赛人数 </font><font color="#67C62E" size="32">${data.enterNum}</font>`
			+ `<font color="#E7D6B5" size="32"> 人,还需 </font><font color="#67C62E" size="32">${needCount}</font><font color="#E7D6B5" size="32"> 人即可开赛</font>`;
		this.textLabel.textFlow = (new egret.HtmlTextParser).parser(str);
		this.titleLabel.text = this.itemData.title;
		let reward = this.itemData.contest_rankreward;
		let totalMoney = this.itemData.contest_allreward;
		for (let i = 0; i < reward.length; i++) {
			let rewardItem = new MatchWaitingItem();
			rewardItem.showData(reward[i], totalMoney);
			this.contentGroup.addChild(rewardItem);
		}
	}

	public hide() {
		if (MatchWaitPanel._instance) {
			SoundManager.getInstance().stopAllEffects();
			game.UIUtils.removeSelf(this);
			MatchWaitPanel._instance = null;
		}
	}

	public createChildren() {
		super.createChildren();
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.backBtn:
				this.backBtnTouch();
				break;
		}
	}

	public async backBtnTouch() {
		Global.alertMediator.addAlert("少侠，记得即时回来参赛哦(不参赛视为自动放弃)", async () => {
			let route = ServerPostPath.hall_userHandler_quitRace;
			let resp: any = await Global.pomelo.request(route, { id: this.itemData.activityId });
			if (resp.error && resp.error.code != 0) {
				Global.alertMediator.addAlert(resp.error.msg);
			} else {
				this.hide();
				CF.sN(SceneNotify.OPEN_MATCH_HALL);
			}
		}, null, false);
	}

	private interval;
	private startInterval() {
		this.calcTime();
		this.interval = setInterval(() => {
			this.calcTime();
		}, 1000);
	}

	private isPlaySound;
	private calcTime() {
		let startRaceTime = this.itemData.startRaceTime;
		let cha = startRaceTime - game.DateTimeManager.instance.now;
		if (cha > 0) {
			if (cha < 60000) {
				this.timeLabel.textColor = 0XFF0000;
			}
			let timeArr = NumberFormat.getTimeDaojishi(cha);
			this.timeLabel.text = timeArr[0] + ":" + timeArr[1];
			if (cha < 30000) {
				egret.Tween.get(this.timeLabel).to({
					scaleX: 3,
					scaleY: 3
				}, 300, egret.Ease.circIn).to({
					scaleX: 1,
					scaleY: 1
				}, 400, egret.Ease.circOut);
			}
			if (Math.floor(cha / 1000) == 11) {
				SoundManager.getInstance().playEffect("m_match_countdown_mp3");
				this.isPlaySound = true;
			}
		} else {
			this.timeLabel.text = "00:00";
		}
	}

	protected enterResult(e: egret.Event) {
		let data = e.data;
		if (data.code && data.code != 0) {
			Global.alertMediator.addAlert(data.msg, () => {
			}, null, true);
			return;
		}
		Global.gameProxy.setRoomInfo(e.data);
		Global.gameProxy.roomInfo.playing = true;
		// e.data.roomInfo['players'] = this.players;
	}


	/**
	 * 
	 */
	private s_raceStartResult(e: egret.Event) {
		let data = e.data;
		if (data.result == 0) {
			//s失败
			Global.alertMediator.addAlert("人数未达到开赛最低要求，比赛取消", () => {
				this.hide();
				CF.sN(SceneNotify.OPEN_MATCH_HALL);
			}, null, true)
		}
	}

	protected countdDown(e: egret.Event) {
		let resp = e.data;
		if (Global.gameProxy.roomInfo) {
			Global.gameProxy.roomInfo.countdown = resp;
		}
	}

	protected s_startNewRound(e: egret.Event) {
		let data = e.data;
		Global.gameProxy.roomInfo.dealer = data.dealer;
		this.isStart = true;
		this.checkStart();
	}

	protected playerEnter(e: egret.Event) {
		let data = e.data;
		this.players[data.playerIndex] = data.player;
		Global.gameProxy.updatePlayer(data.playerIndex, data.player);
	}


	/**
         * 发牌
         * 收到发牌的消息跳转界面
         * @param  {egret.Event} e
         */
	public async initHandCards(e: egret.Event) {
		// var resp = e.data as InitHandCardsResp;
		let roomInfo = Global.gameProxy.roomInfo;
		// await Global.gameProxy.req2updateRoom();
		let mineData = Global.gameProxy.getMineGameData();
		mineData.cards = e.data.cards;
		mineData.hszCardsTip = e.data.hszCardsTip;
		for (let key in roomInfo.players) {
			if (!game.Utils.valueEqual(key, Global.gameProxy.getMineIndex())) {
				let playerData = roomInfo.players[key];
				if (game.Utils.valueEqual(key, roomInfo.dealer)) {
					playerData.cardNum = 14;
				} else {
					playerData.cardNum = 13;
				}
			}
		}
		this.isInitHand = true;
		this.checkStart();
	}

	protected checkStart() {
		if (this.isInitHand && this.isStart) {
			this.hide();
			CF.sN(SceneNotify.OPEN_MATCH_MJXZDD);
		}
	}

	/**
	 * 开始游戏
	 */
	public startNewRound(e: egret.Event) {
		Global.gameProxy.roomInfo.setRoundData(e.data);
		this.isStart = true;
		this.checkStart();
	}

	/**
	 * 玩家加入
	 * @param  {egret.Event} e
	 */
	public playerjoin(e: egret.Event) {
		let resp: any = e.data;
		Global.gameProxy.joinPlayer(resp.playerIndex, resp.player);
	}
}