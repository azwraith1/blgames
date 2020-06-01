/**
 * 基础的奖金池类场景
 */
abstract class BaseJackeyGameScene extends game.BaseScene {
	protected gameName;
	protected proxy;//: game.GameProxy;

	//方位
	protected directions;
	protected mineIndex: number;
	protected diFen: eui.Label;
	public constructor(gameName: string = "default") {
		super();
		this.gameName = gameName;
	}

	public createChildren() {
		super.createChildren();
		this.initProxyByGameName();
		this.hideUI();
		this.renderSeats();
		this.showPlayingAni(true);
	}

	private initProxyByGameName() {
		switch (this.gameName) {
			case "blnn":
			case "zjh":
			case "bdz":
			case "gdmj":
				this['proxy'] = Global.roomProxy;
				break
			default:
				this['proxy'] = Global.gameProxy;
				break;
		}
	}

	protected hideUI() {
		this.hidePlayerHeader();
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.backBtn:
				this.backBtnTouch();
				return;
		}
		super.onTouchTap(e);
	}


	protected showPlayers(players) {
		for (let key in players) {
			let playerData = players[key];
			this.showPlayerHeader(key, playerData);
		}
	}

	protected showPlayerHeader(index, playerData) {
		let uiIndex = this.directions[index];
		if (this[`header${uiIndex}`]) {
			this[`header${uiIndex}`].initWithPlayer(playerData);
			this[`header${uiIndex}`].visible = true;
		}
		if (this[`player${uiIndex}`]) {
			this[`player${uiIndex}`].visible = true;
		}
	}

	/**
	 * 隐藏玩家头像(不同游戏重写即可)
	 */
	protected hidePlayerHeader() {
		for (let i = 1; i <= 6; i++) {
			let player = this[`player${i}`];
			if (player) {
				player.visible = false;
			}
			let header = this[`header${i}`];
			if (header) {
				header.visible = false;
			}
			if (this[`ready${i}`]) {
				this[`ready${i}`].visible = false;
			}
		}
	}


	/**
	 * 返回按钮
	 */
	protected async backBtnTouch() {
		let handler = ServerPostPath.hall_luckyHandler_c_quitLuckyGame;
		let data = {};
		let resp: any = await game.PomeloManager.instance.request(handler, data);
		Global.pomelo.clearLastLock();
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
		}
		this.proxy.clearRoomInfo();
		this.hide();
		game.AppFacade.instance.sendNotification(SceneNotify.OPEN_MATCH_HALL);
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		CF.aE(ServerNotify.s_pushLuckyTablePlayerInfo, this.syncTablePlayer, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		CF.rE(ServerNotify.s_pushLuckyTablePlayerInfo, this.syncTablePlayer, this);
	}

	protected syncTablePlayer(e: egret.Event) {
		let data = e.data;
		let playerArr = data.tablePlayerInfos;
		MatchManager.instance.tablePlayers = playerArr
		this.renderSeats();
	}


	protected renderSeats() {
		this.hidePlayerHeader();
		let playerArr = MatchManager.instance.tablePlayers;
		let playerJson = {};
		for (let i = 0; i < playerArr.length; i++) {
			let playerData = playerArr[i];
			playerData.gold = 0;
			playerJson[playerData.seatId] = playerData;
			if (Global.playerProxy.checkIsMe(playerData.uid)) {
				this.mineIndex = playerData.seatId;
			}
		}
		this.changeDirections();
		this.showPlayers(playerJson);
	}

	abstract changeDirections();

	abstract hide();

	abstract show(data?);

	abstract reconnectSuc();

	protected point1: eui.Image;
	protected point2: eui.Image;
	protected point3: eui.Image;
	protected tipsGroup: eui.Group;
	private showPlayingAni(show) {
		egret.Tween.removeTweens(this.tipsGroup);
		if (show) {
			let point = 1;
			this.point1.visible = this.point2.visible = this.point3.visible = false;
			egret.Tween.get(this.tipsGroup, { loop: true }).wait(1000).call(() => {
				this[`point${point}`].visible = true;
				point++;
			}, this).wait(1000).call(() => {
				this[`point${point}`].visible = true;
				point++;
			}, this).wait(1000).call(() => {
				this[`point${point}`].visible = true;
				point++;
			}, this).wait(1000).call(() => {
				point = 1;
				this.point1.visible = this.point2.visible = this.point3.visible = false;
			}, this)
		}
	}
}