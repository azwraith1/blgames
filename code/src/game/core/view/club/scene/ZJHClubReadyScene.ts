/*
 * @Author: MC Lee 
 * @Date: 2020-01-06 11:32:04 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-17 09:27:48
 * @Description: 
 */
class ZJHClubReadyScene extends BaseClubReadyScene {
	public GAME_NOTIFY: string = SceneNotify.OPEN_ZJHGAME;
	public CLOSE_NOTIFY: string = SceneNotify.OPEN_ZJHGAME;
	private static _instance: ZJHClubReadyScene;
	private header1: zajinhua.ZajinhuaHeader;
	private ready: boolean = false;
	private players = {};
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "zjh_bgm_mp3";
	public static get instance(): ZJHClubReadyScene {
		if (!ZJHClubReadyScene._instance) {
			ZJHClubReadyScene._instance = new ZJHClubReadyScene();
		}
		return ZJHClubReadyScene._instance;
	}

	public constructor() {
		super("zjh");
		this.skinName = new ZJHClubReadySceneSkin();
	}

	public createChildren() {
		super.createChildren();
		this.showRoomInfo();
		Global.gameProxy.lastGameConfig = {
			gameId: GAME_ID.ZJH,
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
		let mineIndex = Global.roomProxy.getMineIndex()
		if (mineIndex && mineIndex > 0) {
			this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 5);
		} else {
			this.directions = NiuniuUtils.getDirectionByMine(1, 5);
		}
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		ZJHClubReadyScene._instance = null;
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
		await ClubManager.instance.flushClubTable(() => {
			this.hide();
		}, () => {
			this.hide();
		});
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