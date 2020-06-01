/*
 * @Author: MC Lee 
 * @Date: 2020-01-06 17:30:31 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-15 17:32:40
 * @Description: 俱乐部管理器
 */
class ClubManager {
	private static _instance: ClubManager;
	public static get instance(): ClubManager {
		if (!ClubManager._instance) {
			ClubManager._instance = new ClubManager();
		}
		return ClubManager._instance;
	}

	public constructor() {
		if (ClubManager._instance) {
			throw new Error("SocketManager使用单例");
		}
	}

	public clubIds: number[];

	public clubTableData: any = {};

	public lastClubGameId: number;

	public currentClub: any = {};
	public canShowPoint: boolean = false;
	public supportOpenGameId: Array<number>;
	public list: any = [];

	public setClubData(clubData) {
		this.clubIds = clubData.openGameId;
		//smart 可以设置得游戏ID
		this.supportOpenGameId = clubData.supportOpenGameId;
		//smart
		for (let i = 0; i < clubData.tableList.length; i++) {
			let data = clubData.tableList[i];
			this.clubTableData[data.tableId] = data;
		}
		if (clubData.clubInfo) {
			this.currentClub = clubData.clubInfo
		}
	}


	public addTableData(tableList) {
		for (let i = 0; i < tableList.length; i++) {
			let data = tableList[i];
			this.clubTableData[data.tableId] = data;
		}
	}
	public clearTableData(tableId) {
		LogUtils.logD("====clearTableData===" + tableId);
		for (let i = 0; i < tableId.length; ++i) {
			let temptID = tableId[i];
			if (this.clubTableData[temptID]) {
				delete this.clubTableData[temptID];
			}
		}
	}

	public clearClubDatas() {
		this.clubIds = [];
		this.clubTableData = [];
		this.currentClub = {};
	}
	//smart
	public clearOpenGameClubDatas() {
		this.clubIds = [];
		this.clubTableData = [];
		this.lastClubGameId=null;
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
		let handler = ServerPostPath.hall_clubHandler_c_getPlayerCurTableInfo;
		let data = {};
		let resp: any = await game.PomeloManager.instance.request(handler, data);
		egret.clearTimeout(this.lockTimeout);
		egret.setTimeout(() => {
			this.lockBack = false;
		}, this, 1000)
		if (resp.error && resp.error.code != 0) {
			failCall && failCall();
			ClubInnerHallScene.instance.show();
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
			return;
		}
		let roomInfo = resp.roomInfo;
		//进游戏了
		if (roomInfo.state == 3) {
			this.back2Game(roomInfo, successCall, failCall);
		} else {
			let players = {};
			for (let i = 0; i < resp.roomInfo.players.length; i++) {
				let player = resp.roomInfo.players[i];
				players[player.seatId] = player;
			}
			resp.roomInfo.players = players;
			successCall && successCall();
			switch (roomInfo.gameId) {
				case GAME_ID.ZJH:
					Global.roomProxy.setRoomInfo(resp);
					ZJHClubReadyScene.instance.show(false);
					break;
				case GAME_ID.ERMJ:
					Global.gameProxy.setRoomInfo(resp);
					ERenClubReadyScene.instance.show(false);
					break;
				case GAME_ID.BLNN:
					Global.roomProxy.setRoomInfo(resp);
					QZNNClubReadyScene.instance.show(false);
					break;
				case GAME_ID.MJXZDD:
					Global.gameProxy.setRoomInfo(resp);
					XZDDClubReadyScene.instance.show(false);
					break
				case GAME_ID.HBMJ:
					Global.gameProxy.setRoomInfo(resp);
					HBMJClubReadyScene.instance.show(false);
					break;
				case GAME_ID.BDZ:
					Global.roomProxy.setRoomInfo(resp);
					BDZClubReadyScene.instance.show(false);
					break;
				case GAME_ID.GDMJ:
					Global.gameProxy.setRoomInfo(resp);
					GDMJClubReadyScene.instance.show(false);
					break;
				case GAME_ID.BAICAO:
					Global.roomProxy.setRoomInfo(resp);
					BAICAOClubReadyScene.instance.show(false);
					break;
			}

		}
	}


	private async back2Game(roomInfo, successCall: Function, failCall: Function) {
		var handler = ServerPostPath.hall_sceneHandler_c_enter;
		let resp: any = await game.PomeloManager.instance.request(handler, { gameId: roomInfo.gameId, sceneId: GAME_SCENEID.CLUB });
		if (resp.error) {
			Global.gameProxy.clearAllRoomInfo();
			Global.alertMediator.addAlert(resp.error.msg, () => {
			}, null, true);
			failCall && failCall();
			ClubInnerHallScene.instance.show();
			return;
		}
		HallForwardFac.redirectScene(resp, Global.gameProxy.roomState, (isPlaying) => {
			if (isPlaying) {

			} else {
				Global.gameProxy.clearAllRoomInfo();
				CF.sN(SceneNotify.OPEN_CLUB_HALL);
			}
			successCall && successCall();
		});
	}


	public getTableListByGameId(gameId) {
		let result = [];
		for (let key in this.clubTableData) {
			let data = this.clubTableData[key];
			if (data.gameId == gameId) {
				result.push(data);
			}
		}
		return result;
	}

	public setTableNum(data: Array<any>) {
		for (let i = 0; i < data.length; ++i) {
			let tempt = data[i];
			tempt["tableNum"] = i + 1;
		}
	}

	public getTableData(tableId) {
		let clubData = this.clubTableData[tableId];
		return clubData;
	}

	public playerSiteDown(data) {
		let clubData = this.clubTableData[data.tableId];
		this.removePlayerData(data);
		clubData.tableListPlayerInfo.push(data.playerInfo);
		clubData.usedSeatNum = clubData.tableListPlayerInfo.length;
		return clubData;
	}

	public removePlayerData(data) {
		let clubData = this.clubTableData[data.tableId];
		if (!clubData) {
			return clubData;
		}
		let playerList = clubData.tableListPlayerInfo;
		for (let i = 0; i < playerList.length; i++) {
			let player = playerList[i];
			if (player.uid == data.playerInfo.uid) {
				game.Utils.removeArrayItem(playerList, player);
				i--;
			}
		}
		clubData.usedSeatNum = clubData.tableListPlayerInfo.length;
		return clubData;
	}


	public playerLeave(data) {
		return this.removePlayerData(data);
	}

}