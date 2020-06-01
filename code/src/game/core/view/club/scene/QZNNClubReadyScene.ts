class QZNNClubReadyScene extends BaseClubReadyScene {
	public GAME_NOTIFY: string = SceneNotify.OPEN_NIUNIUGAMES;
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_NIUNIUGAMES;
	private static _instance: QZNNClubReadyScene;
	private header1: zajinhua.ZajinhuaHeader;
	private ready: boolean = false;
	private players = {};
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "niuniu_bgm_mp3";
	public static get instance(): QZNNClubReadyScene {
		if (!QZNNClubReadyScene._instance) {
			QZNNClubReadyScene._instance = new QZNNClubReadyScene();
		}
		return QZNNClubReadyScene._instance;
	}

	public constructor() {
		super("blnn");
		this.skinName = new BLNNClubReadySceneSkin();
	}

	public createChildren() {
		super.createChildren();
		this.showRoomInfo();
		Global.gameProxy.lastGameConfig = {
			gameId: GAME_ID.BLNN,
			sceneId: GAME_SCENEID.CLUB,
			diFen: this.proxy.roomInfo.betBase,
		}
		this.diFen.text = this.proxy.roomInfo.betBase;
	}

	public show(ready) {
		game.UIUtils.changeResize(2);
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
		let mineIndex = Global.roomProxy.getMineIndex()
		if (mineIndex && mineIndex > 0) {
			this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
		} else {
			this.directions = NiuniuUtils.getDirectionByMine(1, 4);
		}
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		QZNNClubReadyScene._instance = null;
	}


	public onAdded() {
		super.onAdded();

		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_playerEnter, this.s_playerEnter, this);
		CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.aE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_playerEnter, this.s_playerEnter, this);
		CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.rE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
	}
	protected s_tablePlayerStateInfo(e: egret.Event) {
		let data = e.data;
		let seatId = data.seatId;
		let playerData = this.proxy.roomInfo.players[seatId];
		playerData.status = data.status;

		let uiIndex = this.directions[seatId];
		if (playerData.status == TABLE_PLAYER_STATUS.READY) {
			this[`ready${uiIndex}`].visible = true;
		} else {
			this[`ready${uiIndex}`].visible = false;
		}
	}
	private s_playerEnter(e: egret.Event) {
		let data = e.data;
		this.players[data.playerIndex] = data.player;
		Global.roomProxy.updatePlayer(data.playerIndex, data.player);
	}

	private async enterResult(e: egret.Event) {
		let data = e.data;
		Global.roomProxy.clearRoomInfo()
		if (data.code && data.code != 0) {
			Global.alertMediator.addAlert(data.msg, () => {
			}, null, true);
			return;
		}
		Global.roomProxy.setRoomInfo(e.data);
		Global.roomProxy.roomInfo.dealer = e.data.dealerIndex;
	}

	public async s_startNewRound(e: egret.Event) {
		this.hide();
		CF.sN(this.GAME_NOTIFY);
	}

	public async reconnectSuc() {
		game.UIUtils.changeResize(2);
		await ClubManager.instance.flushClubTable(() => {
			this.hide();
		}, () => {
			this.hide();
		});
	}

	// public clubInvite(e: egret.Event) {
	// 	let invitedPanel = new ClubInvitedPanel();
	// 	//smart 给游戏大厅数复制
	// 	ClubManager.instance.currentClub = e.data;
	// 	invitedPanel.initData(e);
	// 	// invitedPanel.currentState = "shu";
	// 	// invitedPanel.validateNow();
	// 	GameLayerManager.gameLayer().maskLayer.addChild(this);
	// 	invitedPanel.horizontalCenter = invitedPanel.verticalCenter = 0;
	// }

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