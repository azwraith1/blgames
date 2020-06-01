/*
 * @Author: MC Lee 
 * @Date: 2020-01-06 10:19:47 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-18 17:11:25
 * @Description: 俱乐部玩家准备界面
 */
abstract class BaseClubReadyScene extends game.BaseScene {
	protected zuoxiaBtn: eui.Button;
	protected qiliBtn: eui.Button;

	protected yaoqingBtn: eui.Button;
	protected yaoqingImag: eui.Image;

	protected tableIdLabel: eui.Label;
	protected diFen: eui.Label;

	/**
	 * 关闭当前界面的通知
	 */
	abstract CLOSE_NOTIFY: string;

	/**
	 * 游戏界面通知
	 */
	abstract GAME_NOTIFY: string;

	protected backBtn: eui.Button;

	protected gameName;

	protected proxy;//: game.GameProxy;

	protected isSiteDown: boolean = false;
	//方位
	protected directions;

	protected buttonGroup: eui.Group;

	protected buttonGroupTop: number;

	/**
	 * 记录界面的通知
	 */
	abstract RECORD_NOTIFY: string;

	/**
	 * 帮助界面的通知
	 */
	abstract HELP_NOTIFY: string;

	/**
	 * 设置界面的通知
	 */
	abstract SETTING_NOTIFY: string;

	protected playingGroup: eui.Group;

	protected point1: eui.Image;
	protected point2: eui.Image;
	protected point3: eui.Image;

	protected joinMp3: string;
	protected leaveMp3: string;
	protected otherLevelMp3: string;
	protected welComeMp3: string;

	public constructor(gameName: string = "default") {
		super();
		this.gameName = gameName;
	}

	public createChildren() {
		super.createChildren();
		this.initProxyByGameName();
		this.hideUI();
	}


	private showPlayingAni(show) {
		LogUtils.logD("================showPlayingAni=======" + show);
		egret.Tween.removeTweens(this.playingGroup);
		if (show) {
			this.playingGroup.visible = true;
			let point = 1;
			this.point1.visible = this.point2.visible = this.point3.visible = false;
			egret.Tween.get(this.playingGroup, { loop: true }).wait(1000).call(() => {
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
		} else {
			this.playingGroup.visible = false;
		}
	}

	protected showRoomInfo() {
		this.tableIdLabel.text = TextUtils.instance.getCurrentTextById(54) + ":" + this.proxy.roomInfo.tableId;
		this.diFen.text = TextUtils.instance.getCurrentTextById(29) + ":" + this.proxy.roomInfo.betBase;
		let roomInfo = this.proxy.roomInfo;
		let mineData = this.proxy.getMineGameData();
		//有我的数据
		if (mineData) {
			if (mineData.status == TABLE_PLAYER_STATUS.READY) {
				this.isSiteDown = true;
				this.zuoxiaBtn.visible = false;
			} else {
				this.isSiteDown = false;
				this.zuoxiaBtn.visible = true;
				// this.zuoxiaBtn.labelDisplay.text = "准备";
			}
		} else {
			this.isSiteDown = false;
			this.zuoxiaBtn.visible = true;
		}
		let state = this.proxy.roomInfo.state;
		this.showPlayingAni(state == 3)
		if (state == 3) {
			this.zuoxiaBtn.visible = false;
			this.hideAllReady();
		}
	}

	private initProxyByGameName() {
		switch (this.gameName) {
			case "blnn":
			case "zjh":
			case "bdz":
				this['proxy'] = Global.roomProxy;
				break
			case "gdmj":
				this['proxy'] = Global.gameProxy;
				break;
			default:
				this['proxy'] = Global.gameProxy;
				break;
		}
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.zuoxiaBtn:
				this.zuoxiaBtnTouch();
				return;
			case this.backBtn:
				this.backBtnTouch();
				return;
			case this.xlbtn1:
				return this.showButtonGroup(false);
			case this.xlbtn:
				return this.showButtonGroup(true);
			case this.recordBtn:
				this.recordBtnTouch();
				return;
			case this.helpBtn:
				this.helpBtnTouch();
				return;
			case this.settingBtn:
				this.settingBtnTouch();
				return;
			case this.yaoqingBtn:
				this.invitePlayer();
				break;
			case this[`touchGroup`]:
				this.closeInvite();
				break;

		}
		super.onTouchTap(e);
	}


	protected recordBtnTouch() {
		CF.sN(this.RECORD_NOTIFY, Global.gameProxy.gameIds[this.gameName]);
	}

	protected helpBtnTouch() {
		CF.sN(this.HELP_NOTIFY, { type: this.gameName });
	}

	protected settingBtnTouch() {
		CF.sN(this.SETTING_NOTIFY);
	}

	protected showButtonGroup(show: boolean) {
		egret.Tween.removeTweens(this.buttonGroup);
		if (show) {
			this.xlbtn.visible = false;
			this.xlbtn1.visible = true;
			egret.Tween.get(this.buttonGroup).to({
				top: this.buttonGroupTop
			}, 100, egret.Ease.sineIn)
		} else {
			this.xlbtn1.visible = false;
			this.xlbtn.visible = true;
			egret.Tween.get(this.buttonGroup).to({
				top: -this.buttonGroup.height
			}, 100, egret.Ease.sineIn)
		}
	}


	protected async zuoxiaBtnTouch() {
		let handler = ServerPostPath.hall_clubHandler_c_clubPlayerSitdown;
		let data = {};
		let resp: any = await game.PomeloManager.instance.request(handler, data);
		if (resp.error && resp.error.code != 0) {
			//smrat 游戏底分改变返回大厅 // CLUB_TABLE_SCORE_DESTORY: -576,  //金币不足返回大厅
			if (resp.error.code == -576 || resp.error.code == ErrorCode.GOLD_TOO_LOW || resp.error.code == ErrorCode.GAME_CLOSEDE) {
				this.hide();
				ClubManager.instance.clearOpenGameClubDatas();
				ClubInnerHallScene.instance.show();
				Toast.launch(resp.error.msg, 1);
				return;
			}

			Toast.launch(resp.error.msg, 1000);
			return;
			// ClubInnerHallScene.instance.show();
			// Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
		}
		if (this.welComeMp3) {
			SoundManager.getInstance().playEffect(this.welComeMp3);
		}
		this.zuoxiaBtn.visible = false;
	}

	protected hideUI() {
		this.hidePlayerHeader();
		this.zuoxiaBtn.visible = false;
		if (this.buttonGroup) {
			this.buttonGroupTop = this.buttonGroup.top;
			this.buttonGroup.top = -this.buttonGroup.height;
		}
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_clubPlayerSitdown, this.s_clubPlayerSitdown, this);
		CF.aE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
		CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		CF.aE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
		CF.aE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
		CF.aE(ENo.CLUB_INVITE_PLAYER, this.invite, this);
		//smart
		CF.aE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
		CF.aE(ENo.CLOSE_ALL, this.hide, this);
		//牌桌销毁 smart
		CF.aE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
		//游戏关闭 smart
		CF.aE(ServerNotify.s_pushClubOpenGameChange, this.s_pushClubOpenGameChange, this);



	}
	public s_pushClubOpenGameChange(e: egret.Event) {

		//判断是否当前房间关闭
		let data = e.data;
		let openGameId = data["openGameId"];
		if (_.contains(openGameId, Global.gameProxy.lastGameConfig["gameId"])) return;
		this.hide();
		ClubManager.instance.clearOpenGameClubDatas();
		ClubInnerHallScene.instance.show();
		Global.alertMediator.addAlert("游戏关闭", null, null, true);

	}
	public onRemoved() {
		super.onRemoved();
		CF.rE(ServerNotify.s_clubPlayerSitdown, this.s_clubPlayerSitdown, this);
		CF.rE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
		CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		CF.rE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
		CF.rE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
		CF.rE(ENo.CLUB_INVITE_PLAYER, this.invite, this);
		CF.rE(ENo.CLOSE_ALL, this.hide, this);
		//smart
		CF.rE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);

		//牌桌销毁 smart
		CF.rE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
		//游戏关闭 smart
		CF.rE(ServerNotify.s_pushClubOpenGameChange, this.s_pushClubOpenGameChange, this);
	}

	/**服务器销毁新桌子*/
	private s_pushDestoryTables(e: egret.Event) {
		let data = e.data;
		let tableIds = data["tableIds"];
		ClubManager.instance.clearTableData(tableIds);
		//刷新列表
		ClubInnerHallScene.instance.showCurrentGameList();
		for (let i = 0; i < tableIds.length; ++i) {
			let tableID = tableIds[i];
			if (tableID == this.proxy.roomInfo["tableId"]) {
				this.hide();
				ClubInnerHallScene.instance.show();
				Toast.launch(TextUtils.instance.getCurrentTextById(24), 1);
			}
		}

	}
	protected dstoryClub(e: egret.Event) {
		this.hide();
		Toast.launch(TextUtils.instance.getCurrentTextById(56), 1);
		CF.sN(SceneNotify.OPEN_CLUB_HALL);
	}

	protected s_pushTableStateInfo(e: egret.Event) {
		let data = e.data;
		if (data.tableId == this.proxy.roomInfo.tableId) {
			this.proxy.roomInfo.state = data.status;
			if (!this.isSiteDown) {
				this.showPlayingAni(data.status == 3);
				if (data.status == 3) {
					this.zuoxiaBtn.visible = false;
					this.hideAllReady();
				}
			}
			if (data.status == 1) {
				this.zuoxiaBtn.visible = true;
				this.hideAllReady();
				for (let key in this.proxy.roomInfo.players) {
					this.proxy.roomInfo.players[key].status = TABLE_PLAYER_STATUS.NONE;
				}
			}
		}
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

	protected hideAllReady() {
		for (let i = 1; i <= 6; i++) {
			if (this[`ready${i}`]) {
				this[`ready${i}`].visible = false;
			}
		}
	}

	/**
	 * 坐下
	 * @param  {egret.Event} e
	 */
	protected s_clubPlayerSitdown(e: egret.Event) {
		let data = e.data;
		if (this.proxy.roomInfo.tableId != data.tableId) {
			return;
		}
		let players = this.proxy.roomInfo.players;
		let playerInfo = data.playerInfo;
		players[playerInfo.seatId] = playerInfo;
		playerInfo.status = TABLE_PLAYER_STATUS.READY;
		ClubInvitePanel.instance.initMember();
		if (Global.playerProxy.playerData.id == playerInfo.uid) {
			this.proxy.playerInfo.playerIndex = playerInfo.seatId;
			this.isSiteDown = true;
			this.changePosition();
			let clubData = ClubManager.instance.getTableData(this.proxy.roomInfo.tableId);
			if (e.data.remainPlayerSize > 0) {
				if (this.yaoqingImag) this.yaoqingImag.visible = true;
				if (this.yaoqingBtn) this.yaoqingBtn.visible = true;
			}
		} else {
			this.showPlayerHeader(playerInfo.seatId, playerInfo);

		}
		if (e.data.remainPlayerSize <= 0) {
			if (this.yaoqingImag) this.yaoqingImag.visible = false;
			if (this.yaoqingBtn) this.yaoqingBtn.visible = false;
			if (ClubInvitePanel._instance) {
				ClubInvitePanel.instance.hide();
			}
		}
		if (this.joinMp3) {
			SoundManager.getInstance().playEffect(this.joinMp3);
		}
	}

	protected showPlayers() {
		let roomInfo = this.proxy.roomInfo;
		for (let key in roomInfo.players) {
			let playerData = roomInfo.players[key];
			this.showPlayerHeader(key, playerData);
		}
	}

	/**
	 * 更换座位
	 */
	public changePosition() {
		this.hideUI();
		this.changeDirections();
		this.showPlayers();
	}


	protected showPlayerHeader(index, playerData) {
		let uiIndex = this.directions[index];
		let roomStatus = this.proxy.roomInfo.state;
		if (this[`header${uiIndex}`]) {
			this[`header${uiIndex}`].initWithPlayer(playerData);
			this[`header${uiIndex}`].visible = true;
		}
		if (this[`player${uiIndex}`]) {
			this[`player${uiIndex}`].visible = true;
		}
		if (this[`ready${uiIndex}`] && roomStatus != 3) {
			this[`ready${uiIndex}`].visible = playerData.status == TABLE_PLAYER_STATUS.READY;
		}
	}

	abstract changeDirections();

	/**
	 * 起立或者离开
	 * @param  {egret.Event} e
	 */
	protected s_clubTablePlayerLeave(e: egret.Event) {
		let data = e.data;
		if (!data) return;
		if (this.proxy.roomInfo.tableId != data.tableId) {
			return;
		}
		if (e.data.remainPlayerSize > 0 && this.isSiteDown) {
			if (this.yaoqingImag) this.yaoqingImag.visible = true;
			if (this.yaoqingBtn) this.yaoqingBtn.visible = true;
		}
		let playerInfo = data.playerInfo;
		let playerIndex = playerInfo.seatId;
		let uiIndex = this.directions[playerIndex];
		if (this[`player${uiIndex}`]) this[`player${uiIndex}`].visible = false;
		if (this[`header${uiIndex}`]) this[`header${uiIndex}`].visible = false;
		if (this[`ready${uiIndex}`]) this[`ready${uiIndex}`].visible = false;
		if (this.proxy.roomInfo) {
			delete this.proxy.roomInfo.players[playerIndex];
		}
		if (playerInfo == this.proxy.getMineIndex()) {
			if (this.leaveMp3) {
				SoundManager.getInstance().playEffect(this.leaveMp3);
			}
		} else {
			if (this.otherLevelMp3) {
				SoundManager.getInstance().playEffect(this.otherLevelMp3);
			}
		}
		if ((playerInfo.type == 2 || playerInfo.type == 4) && playerIndex == this.proxy.getMineIndex()) {
			Global.alertMediator.addAlert(playerInfo.reason, null, null, true);
			//显示为坐下
			this.proxy.clearRoomInfo();
			this.hide();
			ClubInnerHallScene.instance.show();
			return;
		}
		if (playerInfo.type == 3) {
			Global.alertMediator.addAlert(playerInfo.reason, null, null, true);
			//显示为坐下
			this.proxy.clearRoomInfo();
			this.hide();
			CF.sN(SceneNotify.OPEN_CLUB_HALL);
			return;
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
		let handler = ServerPostPath.hall_clubHandler_c_leaveClubTable;
		let data = {};
		let resp: any = await game.PomeloManager.instance.request(handler, data);
		Global.pomelo.clearLastLock();
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
		}
		this.proxy.clearRoomInfo();
		this.hide();
		game.UIUtils.removeSelf(ClubInvitePanel._instance);
		ClubInvitePanel._instance = null;
		ClubInnerHallScene.instance.show();
	}

	abstract hide();

	abstract show(data?);

	abstract reconnectSuc();

	private currentInvitePanel: ClubInvitePanel;
	public async invitePlayer() {
		if (this.currentInvitePanel) {
			this.currentInvitePanel.hide();
			this.currentInvitePanel = null;
			return;
		}
		let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_getInvitePlayerList, {});
		Global.pomelo.clearLastLock();
		if (resp && !resp.error) {
			let atr = [];
			for (let i = 0; i < resp.length; i++) {
				atr.push(resp[i]);
			}
			this.currentInvitePanel = ClubInvitePanel.instance.show(atr)
			this.resizeGroup.addChild(this.currentInvitePanel);
		}
	}

	protected async invite(e: egret.Event) {
		let playerId = e.data.playerId;
		let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_inviteOtherPlayer, { tableId: this.proxy.roomInfo.tableId, playerUid: playerId });
		Global.pomelo.clearLastLock();
		if (resp) {
			// ClubInvitePanel.instance.initMember();
			Toast.launch(TextUtils.instance.getCurrentTextById(55), 1);
		}
	}

	protected closeInvite() {
		if (this.currentInvitePanel) {
			this.currentInvitePanel.hide();
			this.currentInvitePanel = null;
		}
	}
}