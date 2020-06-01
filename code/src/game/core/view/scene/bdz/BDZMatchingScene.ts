class BDZMatchingScene extends game.BaseMatchingScene {
	private juhuaGroup: eui.Group;
	private scenceId: number = 0;
	private players = {};
	public pmdKey: string = "bdz";
	public GAME_ID: string = "bdz";
	// private helpBtn: eui.Button;
	// private jiluBtn: eui.Button;
	// private setBtn: eui.Button;
	/**
   * 关闭匹配通知
   */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BDZ_MATCHING;

	/**
	 * 打开游戏大厅
	 */
	public GAME_HALL_NOTIFY: string = SceneNotify.OPEN_BDZ_HALL;

	/**
	 * 进入游戏通知
	 */
	public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_BDZ;

	/**
	 * 记录界面的通知
	 */
	public RECORD_NOTIFY: string;

	/**
	 * 帮助界面的通知
	 */
	public HELP_NOTIFY: string;

	/**
	 * 设置界面的通知
	 */
	public SETTING_NOTIFY: string;


	public constructor() {
		super();
		this.skinName = new BDZMatchingSceneSkin();
		RES.loadGroup("bdz_back");
		// game.AudioManager.getInstance().playBackgroundMusic("zjh_bgm_mp3");
	}

	public async createChildren() {
		super.createChildren();
		egret.Tween.get(this.rotationImage, { loop: true }).to({
			rotation: 360
		}, 3000);
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
		CF.aE(ENo.s_initHandCards, this.s_initHandCards, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
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
		CF.sN(SceneNotify.CLOSE_BDZ_MATCHING);
		CF.sN(SceneNotify.OPEN_BDZ, this.scenceId);
	}


	private async enterResult(e: egret.Event) {
		let data = e.data;
		Global.roomProxy.clearRoomInfo()
		if (data.code && data.code != 0) {
			this.clearJoinTimeout();
			this.backHall();
			Global.alertMediator.addAlert(data.msg, () => {

			}, null, true);
			return;
		}
		Global.roomProxy.setRoomInfo(e.data);
	}

	private playerEnter(e: egret.Event) {
		let data = e.data;
		this.players[data.playerIndex] = data.player;
		Global.roomProxy.updatePlayer(data.playerIndex, data.player);
	}

	public async startNewRound(e: egret.Event) {
		//await Global.gameProxy.req2updateRoom();
		Global.roomProxy.roomInfo.dealer = e.data.dealer;
	}

}