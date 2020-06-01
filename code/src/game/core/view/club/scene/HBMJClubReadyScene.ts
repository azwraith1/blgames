class HBMJClubReadyScene extends BaseClubReadyScene {
	public static _instance: HBMJClubReadyScene;
	public GAME_NOTIFY: string = SceneNotify.OPEN_HBMJ;
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_HBMJ;
	public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_HBMJ;
    /**
	 * 背景音乐
	 */
	public bgMusic: string = "playingingame_mp3";

	private header1: majiang.WidgetHeader;
	private ready: boolean = false;
	private players = {};
	private isStart = false;
	private isInitHand = false;
	public constructor() {
		super();
		this.skinName = new HBMJClubReadySceneSkin();
	}

	public static get instance() {
		if (!HBMJClubReadyScene._instance) {
			HBMJClubReadyScene._instance = new HBMJClubReadyScene();
		}
		return HBMJClubReadyScene._instance;
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

	public async reconnectSuc() {
		await ClubManager.instance.flushClubTable(() => {
			this.hide();
		}, () => {
			this.hide();
		});
	}

	public createChildren() {
		super.createChildren();
		this.showRoomInfo();
		Global.gameProxy.lastGameConfig = {
			gameId: GAME_ID.HBMJ,
			sceneId: GAME_SCENEID.CLUB,
			diFen: this.proxy.roomInfo.betBase,
		}
		if (this.ready) {
			this.zuoxiaBtnTouch();
		}
	}

	public show(ready) {
		 game.UIUtils.changeResize(1);
		this.ready = ready;
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
			this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 3);
		} else {
			this.directions = NiuniuUtils.getDirectionByMine(1, 3);
		}
	}


	public hide() {
		game.UIUtils.removeSelf(this);
		HBMJClubReadyScene._instance = null;
	}


	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
		CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);

	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
		CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
	}


	private s_startNewRound(e: egret.Event) {
		let data = e.data;
		Global.gameProxy.roomInfo.dealer = data.dealer;
		this.isStart = true;
		this.checkStart();
	}

	private playerEnter(e: egret.Event) {
		let data = e.data;
		this.players[data.playerIndex] = data.player;
		Global.gameProxy.updatePlayer(data.playerIndex, data.player);
	}

	private enterResult(e: egret.Event) {
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
		let data = e.data;
		let roomInfo = Global.gameProxy.roomInfo;
		let hua = data.hua;
		// await Global.gameProxy.req2updateRoom();
		let mineData = Global.gameProxy.getMineGameData();
		mineData.cards = data.cards;
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

	private checkStart() {
		if (this.isInitHand && this.isStart) {
			//clubnew
			this.hide();
			CF.sN(this.GAME_SCENE_NOTIFY);
		}
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