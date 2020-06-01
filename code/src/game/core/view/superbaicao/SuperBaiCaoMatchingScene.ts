class SuperBaiCaoMatchingScene extends game.BaseMatchingScene {
	public pmdKey: string = "superbaicao";
	public GAME_ID: string = "superbaicao";
	private players = {};
	private diFen: eui.Label;
	public bgMusic: string = "bc_bgm_mp3";
	private bg:eui.Image;
	/**
	/**
	 * 关闭匹配通知
	 */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SUPERBAICAO_MATCHING;

	/**
	 * 打开游戏大厅
	 */
	public GAME_HALL_NOTIFY: string = SceneNotify.OPEN_SUPERBAICAO_HALL;

	/**
	 * 进入游戏通知
	 */
	public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_SUPERBAICAO_GAME;


	/**
	 * 记录界面的通知
	 */
	public RECORD_NOTIFY: string = PanelNotify.OPEN_NIUGAMERECORD;

	/**
	 * 帮助界面的通知
	 */
	public HELP_NOTIFY: string = PanelNotify.OPEN_HELP_SHU;

	/**
	 * 设置界面的通知
	 */
	public SETTING_NOTIFY: string = PanelNotify.OPEN_SETTING;

	public constructor() {
		super();
		this.skinName = "BaiCaoMatchingSceneSkin";
	}

	public async createChildren() {
		super.createChildren();
		this.diFen.text = "Điểm Thấp Nhất: " + Global.gameProxy.lastGameConfig.diFen;
		this.bg.source="superbaicao_bg1_jpg";
	}

	public resetPMDPosition() {
		let publicMsg = PMDComponent.instance;
		publicMsg.anchorOffsetY = 24;
		publicMsg.horizontalCenter = 10;
		publicMsg.top = 50;
	}


	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_startNewRound, this.startNewRound, this);
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
	}

	private enterResult(e: egret.Event) {
		this.allowBack = false;
		let data = e.data;
		if (data.code && data.code != 0) {
			this.clearJoinTimeout();
			this.backHall();
			Global.alertMediator.addAlert(data.msg, () => {

			}, null, true);
			return;
		}
		if (!data.reconnect) {
			Global.roomProxy.setRoomInfo(e.data);
		}
	}


	private playerEnter(e: egret.Event) {
		let data = e.data;
		this.players[data.playerIndex] = data.player;
		Global.roomProxy.updatePlayer(data.playerIndex, data.player);
	}

	public startNewRound(e: egret.Event) {
		this.allowBack = false;
		CF.sN(this.CLOSE_NOTIFY);
		CF.sN(this.GAME_SCENE_NOTIFY);
	}

	/**
	 * 超时匹配或者断线重连
	 */
	protected async reconnectSuc() {
		this.startJoinTimeout();
		let matchSuc: boolean = await Global.roomProxy.reconnectRoom() as boolean;
		if (matchSuc) {
			if (Global.roomProxy.roomInfo.playing) {
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(this.GAME_SCENE_NOTIFY);
			}
		}
	}
}