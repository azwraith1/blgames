/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 17:26:34 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 18:23:12
 * @Description: 晋级界面
 */
class MatchPassPanel extends game.BaseScene {
	private static _instance: MatchPassPanel;
	public static get instance(): MatchPassPanel {
		if (!MatchPassPanel._instance) {
			MatchPassPanel._instance = new MatchPassPanel();
		}
		return MatchPassPanel._instance;
	}
	protected data;
	private dbGroup: eui.Group;
	private tipsLabel: eui.Label;
	private rankLabel: eui.BitmapLabel;
	private tipsLabel1: eui.Label;
	private tipsLabel2: eui.Label;
	private gongxiImage: eui.Image;
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "m_mjxzdd_bg1_mp3";
	private needDealer: boolean = true;
	public constructor() {
		super();
		this.skinName = new MatchPassPanelSkin();
	}

	public clubInvite(e: egret.Event) {

	}

	public s_pushRaceInvite() {

	}

	private loopRewardResult;
	public createChildren() {
		super.createChildren();
		this.showEffect();
		this.loopRewardResult = setInterval(() => {
			console.log(" this.loopRewardResult22222222-------------")
			this.c_queryGameState();
		}, 10000);
	}

	private showEffect() {
		let jinjiDb = GameCacheManager.instance.getCache("bsc_jinji") as DBComponent;
		if (!jinjiDb) {
			jinjiDb = new DBComponent("bsc_jinji", false);
			GameCacheManager.instance.setCache("bsc_jinji", jinjiDb);
		}
		jinjiDb.y = 220;
		this.dbGroup.addChild(jinjiDb);
		jinjiDb.playNamesAndLoop(['bsc_jinji', `bsc_jinji_loop`]);
		this.showAni();
	}

	protected showAni() {
		egret.Tween.get(this.tipGroup, { loop: true }).to({
			alpha: 0.4
		}, 800).to({
			alpha: 1
		}, 800)
	}


	private c_queryGameState() {
		this.reconnectSuc();
	}

	public show(data) {
		this.data = data;
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.showCount();
	}

	public hide() {
		if (MatchPassPanel._instance) {
			game.UIUtils.removeSelf(this);
			MatchPassPanel._instance = null;
			console.log("clear this.loopRewardResult2222222-------------")
			clearInterval(this.loopRewardResult);
		}
	}

	private countGroup: eui.Group;

	private tipGroup: eui.Group;

	public showCount() {
		if (!Global.gameProxy.roomInfo) {
			return;
		}
		let arr = Global.gameProxy.roomInfo.passLevels;
		if (arr) {
			let current = Global.gameProxy.roomInfo.curLevel;
			let index = arr.indexOf(current);
			for (let i = 0; i < arr.length; i++) {
				let item = new MatchPassItem();
				let type = i >= index ? 1 : 2;
				item.showData(type, arr[i]);
				this.countGroup.addChild(item)
			}
		}
	}

	public showLunKong() {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.rankLabel.visible = false;
		this.countGroup.visible = false;
		this.tipsLabel.text = "本轮轮空直接晋级,等待其他桌结束.";
		this.showAni();
		this.gongxiImage.visible = true;
		this.reconnectSuc();
	}

	/**
	 * 大力雏菊 淘汰截止
	 */
	public showRaceLast(data) {
		let roomInfo = Global.gameProxy.roomInfo;
		let reward = roomInfo.rewardDatas;
		if (reward && reward.rank) {
			MatchOverPanel.instance.show(roomInfo.rewardDatas);
			this.hide();
			return;
		}
		this.rankLabel.text = roomInfo.currentRank;
		this.tipsLabel2.text = roomInfo.currentRank;
		this.showCount();
		this.tipsLabel1.text = "当前排名:";
		let str = `<font color="#FFE67C" size="36">等待其他桌结束排定名次,剩余桌数：</font><font color="#2FE732" size="36">${Global.gameProxy.roomInfo.remainTableNum}</font>`;
		this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
		GameLayerManager.gameLayer().panelLayer.addChild(this);
	}

	private checkNumberIsLast() {
		let roomInfo = Global.gameProxy.roomInfo;
		if (roomInfo && roomInfo.remainTableNum != undefined && roomInfo.remainTableNum == 0) {
			this.checkReward();
		}
	}

	private checkReward() {
		let roomInfo = Global.gameProxy.roomInfo;
		let reward = roomInfo.rewardDatas;
		if (reward && reward.rank) {
			MatchOverPanel.instance.show(reward);
			this.hide();
		}
	}

	/**
	 * 定局积分
	 * @param  {} data
	 */
	public showRaceDingju(data) {
		let roomInfo = Global.gameProxy.roomInfo;
		this.rankLabel.text = roomInfo.tableRank;
		this.tipsLabel2.text = roomInfo.tableRank;
		this.tipsLabel1.text = "本桌排名:";
		let str = `<font color="#FFE67C" size="36">等待其他桌结束排定名次,剩余桌数：</font><font color="#2FE732" size="36">${Global.gameProxy.roomInfo.remainTableNum}</font>`;
		this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
		// this.tipsLabel.text = ;
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.showCount();
		let reward = roomInfo.rewardDatas;
		if (reward && reward.rank) {
			MatchOverPanel.instance.show(reward);
			this.hide();
			return;
		}
		this.checkNumberIsLast();
	}

	public showWating(rank = null, raceNum = null) {
		let roomInfo = Global.gameProxy.roomInfo;
		if (roomInfo) {
			let reward = roomInfo.rewardDatas;
			if (reward && reward.rank) {
				this.rankLabel.text = reward.rank;
				this.tipsLabel2.text = reward.rank;
			}
			let str = `<font color="#FFE67C" size="36">等待其他桌结束排定名次,剩余桌数：</font><font color="#2FE732" size="36">${Global.gameProxy.roomInfo.remainTableNum}</font>`;
			this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
			this.checkNumberIsLast();
		} else {
			this.tipsLabel.text = `等待其他桌结束排定名次.`;
			if (rank) {
				this.rankLabel.text = rank;
				this.tipsLabel2.text = rank;
			}
			if (raceNum) {
				let str = `<font color="#FFE67C" size="36">等待其他桌结束排定名次,剩余桌数：</font><font color="#2FE732" size="36">${raceNum}</font>`;
				this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
			}
		}
		this.showCount();
		GameLayerManager.gameLayer().panelLayer.addChild(this);
	}


	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.aE(ServerNotify.s_countdown, this.countdDown, this);
		CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
		CF.aE(ServerNotify.s_pushRemainTableNum, this.s_pushRemainTableNum, this);
		CF.aE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_countdown, this.countdDown, this);
		CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
		CF.rE(ServerNotify.s_pushRemainTableNum, this.s_pushRemainTableNum, this);
		CF.rE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
	}


	private async reconnectSuc() {
		// this.hide();
		let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {});
		if (!this.needDealer) {
			return;
		}
		Global.gameProxy.roomState = resp;
		Global.gameProxy.lastGameConfig = resp;
		if (Global.gameProxy.roomState && Global.gameProxy.roomState.state == 1) {
			var handler = ServerPostPath.hall_sceneHandler_c_enter;
			let resp: any = await game.PomeloManager.instance.request(handler, Global.gameProxy.roomState);
			if (!this.needDealer) {
				return;
			}
			if (resp.error) {
				Global.alertMediator.addAlert(resp.error.msg, () => {
				}, null, true);
				clearInterval(this.loopRewardResult);
				return;
			}
			if (resp.reconnect) {
				if (Global.gameProxy.roomState.raceState == 2) {
					HallForwardFac.redirectRaceScene(resp, Global.gameProxy.roomState, (isPlaying) => {
						if (isPlaying) {
							this.hide();
						}
					});
					return;
				}
			}
		} else if (Global.gameProxy.roomState.raceState == 3) {
			let roomInfo = Global.gameProxy.roomInfo;
			if (roomInfo) {
				roomInfo.rewardDatas = {
					rank: resp.rank,
					reward: resp.reward
				};
				this.hide();
				MatchOverPanel.instance.show(roomInfo.rewardDatas);
			}
		}
	}

	/**
	 * 得知结果
	 * @param  {egret.Event} e
	 */
	private s_pushRaceReward(e: egret.Event) {
		let data = e.data;
		let roomInfo = Global.gameProxy.roomInfo;
		if (roomInfo) {
			roomInfo.rewardDatas = data;
		}
		if (data && data.rank) {
			//淘汰了 or 获得奖励
			this.hide();
			MatchOverPanel.instance.show(data);
		}
	}

	/**
	 * 
	 * @param  {egret.Event} e
	 */
	protected s_pushRemainTableNum(e: egret.Event) {
		let tableNum = e.data.remainTableNum;
		if (Global.gameProxy.roomInfo) {
			Global.gameProxy.roomInfo.remainTableNum = tableNum;
		}
		let str = `<font color="#FFE67C" size="36">等待其他桌结束排定名次,剩余桌数：</font><font color="#2FE732" size="36">${tableNum}</font>`;
		this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
	}

	protected isStart = false;
	protected isInitHand = false;
	/**
	 * 轮空
	 * @param  {egret.Event} e
	 */
	private s_freePlayer(e: egret.Event) {
		MatchPassPanel.instance.hide();
		this.hide();
		CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
		MatchPassPanel.instance.showLunKong();
	}

	protected players = {};
	protected countdDown(e: egret.Event) {
		let resp = e.data;
		if (Global.gameProxy.roomInfo) {
			Global.gameProxy.roomInfo.countdown = resp;
		}
	}

	protected s_startNewRound(e: egret.Event) {
		this.needDealer = false;
		clearInterval(this.loopRewardResult);
		let data = e.data;
		Global.gameProxy.roomInfo.dealer = data.dealer;
		this.isStart = true;
		this.checkStart();
	}

	protected playerEnter(e: egret.Event) {
		this.needDealer = false;
		clearInterval(this.loopRewardResult);
		let data = e.data;
		this.players[data.playerIndex] = data.player;
		Global.gameProxy.updatePlayer(data.playerIndex, data.player);
	}


	protected enterResult(e: egret.Event) {
		clearInterval(this.loopRewardResult);
		this.loopRewardResult = null;
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

	protected checkStart() {
		if (this.isInitHand && this.isStart) {
			this.hide();
			CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
			CF.sN(SceneNotify.OPEN_MATCH_MJXZDD);
		}
	}
}