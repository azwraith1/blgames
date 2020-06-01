class XZDDJackeyReadyScene extends BaseJackeyGameScene {
	private static _instance: XZDDJackeyReadyScene;
	public static get instance(): XZDDJackeyReadyScene {
		if (!XZDDJackeyReadyScene._instance) {
			XZDDJackeyReadyScene._instance = new XZDDJackeyReadyScene();
		}
		return XZDDJackeyReadyScene._instance;
	}

	public constructor() {
		super("mjxzdd");
		this.skinName = new XZDDJackeyReadySceneSkin();
	}

	private header1: zajinhua.ZajinhuaHeader;
	/**
	 * 背景音乐
	 */
	public GAME_NOTIFY: string = SceneNotify.OPEN_MJXZDD;
	public bgMusic: string = "playingingame_mp3";


	public show() {
		game.UIUtils.changeResize(1);
		GameLayerManager.gameLayer().sceneLayer.addChild(this);
	}


	public createChildren() {
		super.createChildren();
		this.showRoomInfo();
		this.diFen.text = "报名费:" + MatchManager.instance.selectGameGold;
		// Global.gameProxy.lastGameConfig = {
		// 	gameId: GAME_ID.MJXZDD,
		// 	sceneId: GAME_SCENEID.CLUB,
		// 	diFen: this.proxy.roomInfo.betBase,
		// }
	}


	public showRoomInfo() {
		// super.showRoomInfo();
		// this.changeDirections();
		// this.showPlayers();
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.aE(ServerNotify.s_countdown, this.countdDown, this);
		CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_countdown, this.countdDown, this);
		CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
	}


	public changeDirections() {
		let mineIndex = this.mineIndex;
		if (mineIndex && mineIndex > 0) {
			this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
		} else {
			this.directions = NiuniuUtils.getDirectionByMine(1, 4);
		}
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		XZDDJackeyReadyScene._instance = null;
	}

	private players = {};
	protected isStart = false;
	protected isInitHand = false;

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
		this.tipsGroup.visible = false;
		if (!Global.runBack) {
			WinNumberPanel.instance.show(Math.floor(this.proxy.roomInfo.backGold), () => {
				this.checkStart();
			});
		} else {
			this.checkStart();
		}

	}

	protected playerEnter(e: egret.Event) {
		let data = e.data;
		this.players[data.playerIndex] = data.player;
		Global.gameProxy.updatePlayer(data.playerIndex, data.player);
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
			CF.sN(this.GAME_NOTIFY);
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


	public async reconnectSuc() {
		let matchSuc: boolean = await this.proxy.reconnectRoom() as boolean;
		if (matchSuc) {
			if (this.proxy.roomInfo.playing) {
				this.hide();
				CF.sN(this.GAME_NOTIFY);
			}
		}
	}
}