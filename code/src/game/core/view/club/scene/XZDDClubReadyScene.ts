class XZDDClubReadyScene extends BaseClubReadyScene {
	public GAME_NOTIFY: string = SceneNotify.OPEN_MJXZDD;
	public CLOSE_NOTIFY: string = SceneNotify.OPEN_MJXZDD;
	private static _instance: XZDDClubReadyScene;
	private header1: zajinhua.ZajinhuaHeader;
	private ready: boolean = false;
	private players = {};
	protected isStart = false;

	protected isInitHand = false;
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "playingingame_mp3";
	public static get instance(): XZDDClubReadyScene {
		if (!XZDDClubReadyScene._instance) {
			XZDDClubReadyScene._instance = new XZDDClubReadyScene();
		}
		return XZDDClubReadyScene._instance;
	}

	public constructor() {
		super("mjxzdd");
		this.skinName = new XZDDClubReadySceneSkin();
	}

	public createChildren() {
		super.createChildren();
		this.showRoomInfo();
		Global.gameProxy.lastGameConfig = {
			gameId: GAME_ID.MJXZDD,
			sceneId: GAME_SCENEID.CLUB,
			diFen: this.proxy.roomInfo.betBase,
		}
	}


	public show(ready) {
		 game.UIUtils.changeResize(1);
		this.ready = ready;
		if (this.ready) {
			this.zuoxiaBtnTouch();
		}
		GameLayerManager.gameLayer().sceneLayer.addChild(this);
	}

	public showRoomInfo() {
		super.showRoomInfo();
		this.changeDirections();
		this.showPlayers();
	}


	public changeDirections() {
		let mineIndex = Global.gameProxy.getMineIndex()
		if (mineIndex && mineIndex > 0) {
			this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
		} else {
			this.directions = NiuniuUtils.getDirectionByMine(1, 4);
		}
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		XZDDClubReadyScene._instance = null;
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
		await ClubManager.instance.flushClubTable(() => {
			this.hide();
		}, () => {
			this.hide();
		});
	}

	/**
	 * 帮助界面的通知
	 */
	public HELP_NOTIFY: string = PanelNotify.OPEN_ZJHHELP;

	/**
	 * 记录界面的通知
	 */
	public RECORD_NOTIFY: string = PanelNotify.OPEN_ZJHRECORD;

	/**
	 * 设置界面的通知
	 */
	public SETTING_NOTIFY: string = PanelNotify.OPEN_ZJHSET;
}