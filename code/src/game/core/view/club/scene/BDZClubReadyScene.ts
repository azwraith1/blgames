/*
 * @Author: MC Lee 
 * @Date: 2020-01-06 11:32:04 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-19 15:14:37
 * @Description: 
 */
class BDZClubReadyScene extends BaseClubReadyScene {
	public GAME_NOTIFY: string = SceneNotify.OPEN_BDZ;
	public CLOSE_NOTIFY: string = SceneNotify.OPEN_BDZ;
	private static _instance: BDZClubReadyScene;
	private header1: zajinhua.ZajinhuaHeader;
	private ready: boolean = false;
	private players = {};
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "bdz_background_mus_mp3";
	protected joinMp3: string = "bdz_entry_mp3";
	protected leaveMp3: string = "bdz_start_levor_mp3";
	protected otherLevelMp3: string = "bdz_exit_mp3";
	protected welComeMp3: string = "";
	public static get instance(): BDZClubReadyScene {
		if (!BDZClubReadyScene._instance) {
			BDZClubReadyScene._instance = new BDZClubReadyScene();
		}
		return BDZClubReadyScene._instance;
	}

	public constructor() {
		super("bdz");
		this.welComeMp3 = `bdz_welcome${Math.floor(_.random(1, 2))}_mp3`;
		this.skinName = new BDZClubReadySceneSkin();
	}

	public createChildren() {
		super.createChildren();
		this.showRoomInfo();
		Global.gameProxy.lastGameConfig = {
			gameId: GAME_ID.BDZ,
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
		BDZClubReadyScene._instance = null;
	}


	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_playerEnter, this.s_playerEnter, this);
		CF.aE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
		CF.aE(ENo.s_initHandCards, this.s_initHandCards, this);

	}

	public onRemoved() {
		super.onRemoved();
		
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_playerEnter, this.s_playerEnter, this);
		CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
		CF.rE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
		CF.rE(ENo.s_initHandCards, this.s_initHandCards, this);
	}

	private s_initHandCards(e: egret.Event) {
		let data = e.data;
		let roomInfo = Global.roomProxy.roomInfo;
		for (let key in roomInfo.players) {
			let player = roomInfo.players[key] as PlayerGameDataBean;
			player.handCardsNum = 4;
			if (Number(key) == data.playerIndex) {
				player.handCards = data.handCards;
				player.tipCards = data.tipCards || [];
				player.roundPattern = data.roundPattern;
			}
		}
		this.hide();
		CF.sN(SceneNotify.OPEN_BDZ);
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
	}

	public async s_startNewRound(e: egret.Event) {
		Global.roomProxy.roomInfo.dealer = e.data.dealer;
		// this.hide();
		// CF.sN(this.GAME_NOTIFY);
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
		if (playerData) {
			playerData.status = data.status;
			let uiIndex = this.directions[seatId];
			if (playerData.status == TABLE_PLAYER_STATUS.READY) {
				this[`ready${uiIndex}`].visible = true;
			} else {
				this[`ready${uiIndex}`].visible = false;
			}
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