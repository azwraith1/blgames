class MatchXZDDSettlePanel extends game.BaseScene {
	private static _instance: MatchXZDDSettlePanel;
	public static get instance(): MatchXZDDSettlePanel {
		if (!MatchXZDDSettlePanel._instance) {
			MatchXZDDSettlePanel._instance = new MatchXZDDSettlePanel();
		}
		return MatchXZDDSettlePanel._instance;
	}
	protected data;

	public constructor() {
		super();
		this.skinName = new MatchXZDDSettlePanelSkin();
	}

	//eui----------
	private group1: eui.Group;
	private dbImage1: eui.Image;
	private nameLabel1: eui.Label;
	private rankImage: eui.Image;
	private scroller1: eui.Scroller;
	private contentGroup1: eui.Group;
	private scoreLabel1: eui.BitmapLabel;
	private textLabel: eui.Label;
	private enterBtn: eui.Button;
	private timeLabel: eui.Label;
	private directions;

	protected isStart = false;
	protected isInitHand = false;
	private loopRewardResult;
	protected needDealer: boolean = true;
	public show(data) {
		this.timeLabel.text = "";
		this.data = data;
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.resizeGroup.alpha = 0;
		egret.Tween.get(this.resizeGroup).to({
			alpha: 1
		}, 400);
		this.directions = majiang.MajiangUtils.getDirectionByMineNumber(Global.gameProxy.getMineIndex());
		this.showInfo();
		this.loopRewardResult = setInterval(() => {
			console.log("this.loopRewardResult1--------------");
			this.reconnectSuc();
		}, 10000);
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
		} else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 3) {
			//被淘汰
			let roomInfo = Global.gameProxy.roomInfo;
			if (roomInfo) {
				roomInfo.rewardDatas = {
					rank: resp.rank,
					reward: resp.reward
				};
				this.hide();
				CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
				MatchOverPanel.instance.show(roomInfo.rewardDatas);
			}

		}
	}

	public clubInvite(e: egret.Event) {

	}

	public s_pushRaceInvite() {

	}

	public hide() {
		if (MatchXZDDSettlePanel._instance) {
			game.UIUtils.removeSelf(this);
			MatchXZDDSettlePanel._instance = null;
			console.log("clear this.loopRewardResult1-------------")
			clearInterval(this.autoInterval);
			clearInterval(this.loopRewardResult);
		}
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.enterBtn:
				this.enterBtnTouch();
				break;
		}
	}

	private isTaotai;

	private enterType;
	public showInfo() {
		let roomInfo = Global.gameProxy.roomInfo;
		let players = this.data.players;
		for (var key in players) {
			let data = players[key]
			if (Global.gameProxy.checkIndexIsMe(key)) {
				let gainGold = data.gainGold;
				if (gainGold >= 0) {
					SoundManager.getInstance().playEffect("m_game_win_mp3");
				} else {
					SoundManager.getInstance().playEffect("m_game_lose_mp3");
				}
				this.showPlayerInfo(data, key, 1);//是自己，要调用的方法。
				if (roomInfo.raceType == 1) {
					this.isTaotai = data.eliminate == 1;
				}
			} else {
				this.showPlayerInfo(data, key, 2);
			}
		}

		this.enterBtn.visible = false;
		this.enterType = 0;
		let rewardInfo = roomInfo.rewardDatas; 3
		if (rewardInfo && rewardInfo.reward) {
			this.textLabel.text = "正在结算,请耐心等待.";
			this.enterBtn.visible = true;
			this.enterType = 1;
		} else if (this.isTaotai) {
			this.textLabel.text = "正在结算,请耐心等待.";
			this.enterBtn.visible = true;
			this.enterType = 1;
		} else {
			//大力雏菊
			if (roomInfo.raceType == 1) {
				this.enterType = 3;
				this.textLabel.text = "正在等待其他桌结束，请耐心等候.";
				if (this.data.iscutoff == 1) {
					//淘汰赛最后一轮
					this.enterType = 4;
					this.enterBtn.visible = true;
				}
			} else {
				if (roomInfo.raceNum == roomInfo.raceMaxNum) {
					if (roomInfo.lastRace == 1) {
						this.textLabel.text = "正在结算,请耐心等待.";
						this.enterBtn.visible = false;
						this.enterType = 3;
					}
					//最后一句
					this.enterType = 2;
					this.enterBtn.visible = true;
					this.textLabel.text = "正在等待其他桌结束，请耐心等候.";
				} else {
					this.enterType = 3;
					this.textLabel.text = "即将开始下一局,请等候."
					this.enterBtn.visible = true;
				}
			}
		}
		if (this.enterType != 3) {
			this.setEnterBtnTouch();
		}
		LogUtils.logD("当前结算类型:" + this.enterType);
		egret.Tween.get(this.textLabel, { loop: true }).to({
			alpha: 0
		}, 1000).to({
			alpha: 1
		}, 1000);
	}


	private autoInterval;
	private setEnterBtnTouch() {
		let count = 5;
		this.timeLabel.text = `(${count})`;
		this.autoInterval = setInterval(() => {
			console.log("淘汰：" + count);
			count--;
			this.timeLabel.text = `(${count})`;
			if (count == 0) {
				clearInterval(this.autoInterval);
				this.enterBtnTouch();
			}
		}, 1000);
	}


	protected checkStart() {
		if (this.isInitHand && this.isStart) {
			this.hide();
			CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
			CF.sN(SceneNotify.OPEN_MATCH_MJXZDD);
		}
	}

	private enterBtnTouch() {
		clearInterval(this.autoInterval);
		let roomInfo = Global.gameProxy.roomInfo;
		if (this.enterType == 1) {
			//显示淘汰界面
			this.hide();
			CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
			MatchOverPanel.instance.show(roomInfo.rewardDatas);
		} else if (this.enterType == 2) {
			//查看晋级路线界面
			this.hide()
			CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
			MatchPassPanel.instance.showRaceDingju({});
		} else if (this.enterType == 3) {
			//查看桌面
			this.visible = false;
		} else if (this.enterType == 4) {
			this.hide();
			CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
			MatchPassPanel.instance.showRaceLast(this.data);
		}
	}

	private db;
	/**
	 * 显示自己
	 */
	public showPlayerInfo(player, key, type) {
		let direction = this.directions[key];
		for (let i = 0; i < player.bills.length; i++) {//bills是data里面的值
			if (player.bills[i] && player.bills[i]["type"] != 0) {//去掉房费。
				var item = new MatchSettleItem();
				item.showItemData(player.bills[i], type, key);
				this[`contentGroup${direction}`].addChild(item);
			}
		}
		let playerData = Global.gameProxy.getPlayerByIndex(key);
		this[`nameLabel${direction}`].text = playerData.nickname;
		this[`scoreLabel${direction}`].text = player.score;
		let roomInfo = Global.gameProxy.roomInfo;
		let showAni = (playerData) => {
			let taotai = playerData.eliminate;
			let dbName;
			if (taotai == 1) {
				dbName = "bsc_end_no4";
				//淘汰
			} else {
				//晋级
				dbName = "bsc_end_no1";
			}
			let db = new DBComponent(dbName);
			this[`group${direction}`].addChild(db);
			db.playNamesAndLoop([dbName, dbName + "_loop"]);
			this[`rankImage${direction}`].visible = false;
			db.x = this[`rankImage${direction}`].x + 96 / 2;
			db.y = this[`rankImage${direction}`].y + 96 / 2;
		}

		if (roomInfo.raceType == 1) {
			//大力雏菊
			if (player.eliminate == 1) {
				showAni(player);
			}
		} else {
			let rank = player.rank;
			this[`rankImage${direction}`].visible = true;
			this[`rankImage${direction}`].source = RES.getRes(`m_mj_over_rank${rank}_png`);
			if (roomInfo.raceNum == roomInfo.raceMaxNum && roomInfo.lastRace != 1) {
				//如果定局积分最后一盘
				this.setAutoTimeout(() => {
					egret.Tween.get(this[`rankImage${direction}`]).to({
						alpha: 0
					}, 300)
					this.setAutoTimeout(() => {
						showAni(player);
					}, this, 300);
				}, this, 500);
			}
		}
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.aE(ServerNotify.s_countdown, this.countdDown, this);
		CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
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
		CF.rE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
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
		if (data && data.reward) {
			//淘汰了
			MatchOverPanel.instance.show(data);
			this.hide();
			CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
		}
	}
	/**
	 * 轮空
	 * @param  {egret.Event} e
	 */
	private s_freePlayer(e: egret.Event) {
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
		this.needDealer = false;
		clearInterval(this.loopRewardResult);
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
}