class MatchManager {
	private static _instance: MatchManager;
	public static get instance(): MatchManager {
		if (!MatchManager._instance) {
			MatchManager._instance = new MatchManager();
		}
		return MatchManager._instance;
	}

	public constructor() {
		if (MatchManager._instance) {
			throw new Error("MatchManager使用单例");
		}
	}

	public luckyGameIds;

	public luckyConfigs;

	public selectIndex: number = 0;

	public selectGameId: number = 10002;

	public selectGameGold: number;

	public matchConfig;

	public tablePlayers;

	public clearSelect() {
		this.matchConfig = null;
		this.tablePlayers = null;
	}

	public setLuckyConfig(resp) {
		this.luckyGameIds = resp.openGameId;
		this.luckyConfigs = resp.gameConfigs;
	}


	public redirectScene(callback: Function) {
		callback();
		let gameId = this.matchConfig.gameId;
		switch (gameId) {
			case GAME_ID.MJXZDD:
				XZDDJackeyReadyScene.instance.show();
				break;
		}
	}

	/**
	 * 返回club
	 */
	private lockBack: boolean = false;
	private lockTimeout;
	public async flushClubTable(successCall: Function, failCall: Function) {
		if (this.lockBack) {
			return;
		}
		this.lockBack = true;
		this.lockTimeout = egret.setTimeout(() => {
			this.lockBack = false;
		}, this, 5000)
		// let handler = ServerPostPath.hall_clubHandler_c_getPlayerCurTableInfo;
		// let data = {};
		// let resp: any = await game.PomeloManager.instance.request(handler, data);
		// egret.clearTimeout(this.lockTimeout);
		// egret.setTimeout(() => {
		// 	this.lockBack = false;
		// }, this, 1000)
		// if (resp.error && resp.error.code != 0) {
		// 	failCall && failCall();
		// 	ClubInnerHallScene.instance.show();
		// 	Global.alertMediator.addAlert(resp.error.msg, null, null, true);
		// 	return;
		// }
		// let roomInfo = resp.roomInfo;
		// //进游戏了
		// if (roomInfo.state == 3) {
		// 	// this.back2Game(roomInfo, successCall, failCall);
		// } else {
		// 	Global.alertMediator.addAlert("请重新进入队列", null, null, true);
		// }
	}
}