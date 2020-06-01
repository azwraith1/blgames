class GDMJClubReadyScene extends BaseClubReadyScene {
	public GAME_NOTIFY: string = SceneNotify.OPEN_GDMJ;
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_GDMJ;
	private static _instance: GDMJClubReadyScene;
	private header1: zajinhua.ZajinhuaHeader;
	private ready: boolean = false;
	private players = {};
	protected isStart = false;

	protected isInitHand = false;
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "playingingame_mp3";
	public static get instance(): GDMJClubReadyScene {
		if (!GDMJClubReadyScene._instance) {
			GDMJClubReadyScene._instance = new GDMJClubReadyScene();
		}
		return GDMJClubReadyScene._instance;
	}

	public constructor() {
		super("gdmj");
		this.skinName = "GDMJClubReadySceneSkin";
	}

	public createChildren() {
		super.createChildren();
		this.showRoomInfo();
		Global.gameProxy.lastGameConfig = {
			gameId: GAME_ID.GDMJ,
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
		GDMJClubReadyScene._instance = null;
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.aE(ServerNotify.s_countdown, this.countdDown, this);
		CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
		CF.aE(ServerNotify.s_roomBuyMa, this.s_roomBuyMa, this);
		CF.aE(ServerNotify.s_roomSetBaoCard, this.s_roomSetBaoCard, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_countdown, this.countdDown, this);
		CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
		CF.rE(ServerNotify.s_roomBuyMa, this.s_roomBuyMa, this);
		CF.rE(ServerNotify.s_roomSetBaoCard, this.s_roomSetBaoCard, this);
	}

	/**
	   * 买马
	   */
	public s_roomBuyMa(e: egret.TouchEvent) {
		let data = e.data;
		let roomInfo = Global.gameProxy.roomInfo;
		roomInfo.maCardNumPerSeat = data.maCardNumPerSeat;
		this.isInitHand = true;
		this.checkStart();
	}
	public s_roomSetBaoCard(e: egret.TouchEvent) {
		let data = e.data;
		LogUtils.logD("===s_roomSetBaoCard==" + JSON.stringify(data));
		let baoCard = data.baoCard;
		let fanCard = data.fanCard;
		let roomInfo = Global.gameProxy.roomInfo;
		roomInfo.baoCards = [baoCard];
		roomInfo.fanCard = fanCard;
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
		let data = e.data;
		// var resp = e.data as InitHandCardsResp;
		let roomInfo = Global.gameProxy.roomInfo;
		// await Global.gameProxy.req2updateRoom();
		let mineData = Global.gameProxy.getMineGameData();
		mineData.cards = e.data.cards;
		let hua = data.hua;
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