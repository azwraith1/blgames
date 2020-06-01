/*
 * @Author: MC Lee 
 * @Date: 2020-01-06 17:25:52 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-04 15:46:26
 * @Description: 俱乐部内部大厅
 */
class ClubInnerHallScene extends game.BaseScene {
	private static _instance: ClubInnerHallScene;

	public static get instance(): ClubInnerHallScene {
		if (!ClubInnerHallScene._instance) {
			ClubInnerHallScene._instance = new ClubInnerHallScene();
		}
		return ClubInnerHallScene._instance;
	}

	public constructor() {
		super();
		this.skinName = `ClubInnerHallSceneSkin${CF.tis}`;
	}

	//eui

	private bgImage1: eui.Image;
	private bgImage2: eui.Image;

	private clubRecordBtn: eui.Button;
	private memberBtn: eui.Button;
	private managetBtn: eui.Button;
	private managerBtn: eui.Button;
	private fastBtn: eui.Button;
	private fastImage: eui.Image;

	private ggBtn: eui.Button;

	public currentClubGameId: number;

	private clubNameLabel: eui.Label;
	private clubIdLabel: eui.Label;


	private tabGroup: eui.Group;

	private tabScroller: eui.Scroller;

	public tabItemGroup: eui.Group;

	private nameLabel: eui.Label;
	private headerImage: eui.Image;

	private tableScroller: eui.Scroller;
	private tableList: eui.List;

	private currentArryData: eui.ArrayCollection;

	protected dbGroup: eui.Group;
	//smart
	public redPointImg: eui.Image;

	private bgImg3: eui.Image;

	/**
	 * 背景音乐
	 */
	public bgMusic: string = "main_bg_mp3";
	protected showDBComponent() {
		let db = new DBComponent("jlb_tittle", false);
		db.playByFilename(-1);
		db.x = 0;
		db.y = 40;
		this.dbGroup.addChild(db);
	}
	public createChildren() {
		super.createChildren();
		this.fastBtn.touchEnabled = false;
		this.initList();
		this.ggBtn.visible = false;
		game.UIUtils.changeResize(1);
		this.showClubInfo();
		this.showDBComponent();

	}
	//当有新成员的审批的时候 显示红色暗点
	private async showRedPoint() {
		if (ClubManager.instance.currentClub.role == 3) return;
		if (!ClubManager.instance.currentClub || !ClubManager.instance.currentClub.clubId) return;
		let hander: any = ServerPostPath.hall_clubHandler_c_getClubApprovalMessages;
		let resp: any = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			ClubManager.instance.canShowPoint = this.redPointImg.visible = resp.length > 0;
		}
	}
	public onAdded() {
		super.onAdded();
		CF.aE(ENo.CLUB_INNER_ITEM_TOUCH, this.innerItemTouch, this);
		CF.aE(ENo.CLUB_INNER_TABLE_TOUCH, this.innerTableTouch, this)
		CF.aE(ServerNotify.s_clubPlayerSitdown, this.s_clubPlayerSitdown, this);
		CF.aE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
		CF.aE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
		CF.aE(ServerNotify.s_pushNewTables, this.s_pushNewTables, this);
		CF.aE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
		this.tableScroller.addEventListener(egret.Event.CHANGE, this.scrollerChange, this);
		//smart 牌桌设置
		CF.aE(ENo.CLUB_INNER_TABLE_SET_TOUCH, this.innerTableSet, this);
		//牌桌销毁 smart
		CF.aE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);

		/**smart 有新成员加入 */
		CF.aE(ServerNotify.s_pushNewApprovalMessagesEvent, this.s_pushNewApprovalMessagesEvent, this);
		/**踢出玩家 */
		CF.aE(ServerNotify.s_clubPlayerKick, this.s_clubPlayerKick, this);
		//游戏关闭 smart
		CF.aE(ServerNotify.s_pushClubOpenGameChange, this.s_pushClubOpenGameChange, this);
	}
	//牌桌设置
	private innerTableSet(e: egret.Event) {
		ClubTableManagePanel.instance.show();
	}
	public onRemoved() {
		super.onRemoved();


		CF.rE(ENo.CLUB_INNER_ITEM_TOUCH, this.innerItemTouch, this);
		CF.rE(ENo.CLUB_INNER_TABLE_TOUCH, this.innerTableTouch, this)
		CF.rE(ServerNotify.s_clubPlayerSitdown, this.s_clubPlayerSitdown, this);
		CF.rE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
		CF.rE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
		CF.rE(ServerNotify.s_pushNewTables, this.s_pushNewTables, this);
		this.tableScroller.removeEventListener(egret.Event.CHANGE, this.scrollerChange, this);
		CF.rE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
		//smart 牌桌设置
		CF.rE(ENo.CLUB_INNER_TABLE_SET_TOUCH, this.innerTableSet, this);
		//牌桌销毁 smart
		CF.rE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
		/**smart 有新成员加入 */
		CF.rE(ServerNotify.s_pushNewApprovalMessagesEvent, this.s_pushNewApprovalMessagesEvent, this);
		/**踢出玩家 */
		CF.rE(ServerNotify.s_clubPlayerKick, this.s_clubPlayerKick, this);
		//游戏关闭 smart
		CF.rE(ServerNotify.s_pushClubOpenGameChange, this.s_pushClubOpenGameChange, this);
	}

	public s_pushClubOpenGameChange(e: egret.Event) {
		ClubManager.instance.clearOpenGameClubDatas();
		ClubInnerHallScene.instance.showClubInfo();
	}
	private scrollerChange(e: egret.Event) {
		let scrollH = this.tableScroller.viewport.scrollH;
		this.bgImage1.x = scrollH / 20;
		this.bgImage2.x = -1860 + this.bgImage1.x;
	}
	private s_pushNewApprovalMessagesEvent(e: egret.Event) {
		let data = e.data;
		if (data.clubId != ClubManager.instance.currentClub.clubId || ClubManager.instance.currentClub.role == 3) {
			return;
		}
		this.redPointImg.visible = true;
		ClubManager.instance.canShowPoint = true;
	}

	private s_pushTableStateInfo(e: egret.Event) {
		let data = e.data;
		let clubData = ClubManager.instance.getTableData(data.tableId);
		clubData.status = data.status;
		this.updateItemData(clubData);
	}

	private updateItemData(clubData) {


		for (let i = 0; i < this.tableList.numChildren; i++) {
			let render = this.tableList.getChildAt(i) as ClubInnerTableRender;
			if (render.data.tableId == clubData.tableId) {
				render.data = clubData;
			}
		}
	}

	/**
	 * 服务器创建了新的桌子
	 */
	private s_pushNewTables(e: egret.Event) {
		let data = e.data;
		ClubManager.instance.addTableData(data.tableList);
		//smrat
		//刷新列表
		this.showCurrentGameList();
		//smart

		//=======================>
		// for (let i = 0; i < data.tableList.length; i++) {
		// 	let tableData = data.tableList[i];
		// 	if (tableData.gameId == this.currentClubGameId) {
		// 		this.currentArryData.addItem(data.tableList[i]);
		// 	}
		// }
	}
	/**服务器销毁新桌子*/
	private s_pushDestoryTables(e: egret.Event) {
		let data = e.data;
		LogUtils.logD("====s_pushDestoryTables===" + JSON.stringify(data));
		if (data["tableIds"]) {
			ClubManager.instance.clearTableData(data["tableIds"]);
			//刷新列表
			this.showCurrentGameList();
		}
	}
	/**
	 * 玩家坐下
	 * @param  {egret.Event} e
	 */
	private s_clubPlayerSitdown(e: egret.Event) {
		// 		gameId: 10005
		// playerInfo: {seatId: 3, figureUrl: "8", nickname: "test12", gold: 1000000, uid: 1100002, …}
		// playerNum: 1
		// status: 1
		// tableId: 374605
		let clubData = ClubManager.instance.playerSiteDown(e.data);
		this.updateItemData(clubData);
	}

	/**
	 * 玩家离开
	 * @param  {egret.Event} e
	 */
	private s_clubTablePlayerLeave(e: egret.Event) {
		let clubData = ClubManager.instance.playerLeave(e.data);
		this.updateItemData(clubData);
	}


	private lockReq: boolean = false;
	public async innerTableTouch(e: egret.Event) {

		if (this.lockReq) {
			return;
		}

		let data = e.data;
		this.joinScene(data)
	}

	// public joinSceneCall



	private innerItemTouch(e: egret.Event) {
		let data = e.data as ClubInnerTabItem;

		for (let i = 0; i < this.clubItems.length; i++) {
			let club = this.clubItems[i];
			club.showStatus(club == data);
		}
		this.currentClubGameId = data.gameId;
		ClubManager.instance.lastClubGameId = data.gameId;
		this.showCurrentGameList()
	}

	/**
	 * 玩家信息
    	*/
	protected renderPlayerInfo() {
		let playerInfo = Global.playerProxy.playerData;
		this.nameLabel.text = playerInfo.nickname;
		let headerImage = `hall_header_${Global.playerProxy.playerData.sex}_${Global.playerProxy.playerData.figure_url}_png`;
		this.headerImage.source = headerImage;
		this.updateGold();
	}


	public initList() {
		this.tableList.dataProvider = null;
		this.tableList.itemRenderer = ClubInnerTableRender;
	}

	public showClubInfo() {
		let clubData = ClubManager.instance.currentClub;
		this.clubIdLabel.text = "ID:" + clubData.clubId;
		this.clubNameLabel.text = clubData.name || "";
		this.renderPlayerInfo();
		this.showClubTable();
	}

	public show() {
		//smart
		GameLayerManager.gameLayer().sceneLayer.addChild(this);
	}

	private async showClubTable() {
		let handler = ServerPostPath.hall_clubHandler_c_enterClubHall;
		let resp: any = await game.PomeloManager.instance.request(handler, { clubId: ClubManager.instance.currentClub.clubId });
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
			this.hide();
			CF.sN(SceneNotify.OPEN_CLUB_HALL);
			return;
		}
		ClubManager.instance.setClubData(resp);
		this.fastBtn.touchEnabled = true;
		this.flushUI();
		//smrat
		this.showRedPoint();
	}

	/**
	 * 默认选择
	 */
	private clubItems: ClubInnerTabItem[] = [];
	public flushUI() {
		//smart 重置tabItemGroup的状态 
		this.tabItemGroup.removeChildren();
		this.tableList.dataProvider = null;
		let clubIds = ClubManager.instance.clubIds;
		if (ClubManager.instance.lastClubGameId) {
			this.currentClubGameId = ClubManager.instance.lastClubGameId;
		} else {
			if (clubIds.length > 0) {
				this.currentClubGameId = clubIds[0];
				ClubManager.instance.lastClubGameId = this.currentClubGameId;
			}
		}
		if(this.bgImg3)
		this.bgImg3.source = "club_inner_bg2_png"
		if (clubIds.length < 1) {
			if(this.bgImg3)
			this.bgImg3.source = "club_game_closeall_png";
			return;
		}

		LogUtils.logD("============this.currentClubGameId============" + this.currentClubGameId);
		for (let i = 0; i < clubIds.length; i++) {
			let item = new ClubInnerTabItem(clubIds[i]);
			this.tabItemGroup.addChild(item);
			item.showStatus(clubIds[i] == this.currentClubGameId);
			this.clubItems.push(item);
		}
		this.showCurrentGameList()
	}


	public showCurrentGameList() {
		this.tableScroller.stopAnimation();
		this.tableScroller.viewport.scrollV = 0;
		this.tableList.dataProvider = null;
		let tableData = ClubManager.instance.getTableListByGameId(this.currentClubGameId);
		let newTableData: Array<any> = tableData;
		tableData = _.sortBy(tableData, "createTime");
		ClubManager.instance.setTableNum(tableData);

		//smart 加条记录做牌桌管理
		if (ClubManager.instance.currentClub.role == 1) {
			let newData = { createTime: 0, "tableId": -10800, "gameId": 10020, "betBase": 0, "seatNum": 2, "usedSeatNum": 0, "tableListPlayerInfo": [], "status": 1, "isNew": -1 };
			// let newData = JSON.parse(JSON.stringify(tableData[0]));
			// newData["isNew"] = -1;
			// newData["tableId"] = -10800;
			tableData.unshift(newData);
		}
		// LogUtils.logD("==showCurrentGameList==" + JSON.stringify(tableData));
		if (!tableData || tableData.length == 0) return;
		this.currentArryData = new eui.ArrayCollection(tableData);
		this.tableList.dataProvider = this.currentArryData;

	}

	public hide() {
		game.UIUtils.removeSelf(this);
		ClubInnerHallScene._instance = null;
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.clubRecordBtn:
				//语言是韩国语言 战绩不开启
				// if (TextUtils.instance.currentLanguage == "ko_kr") {
				// 	Toast.launch("곧 개방되니 기대하세요", 1);
				// 	return;
				// }
				if (!this.currentClubGameId) {
					return;
				}
				ClubGainPanel.instance.show();
				break;
			case this.backBtn:
				this.backBtnTouch();

				break;
			case this.fastBtn:
				this.fastJoin();
				break;
			case this.memberBtn:
				ClubMemberPanel.instance.show();
				break;
			case this.managerBtn:
				ClubConfigPanel.instance.show();
				this.setAutoTimeout(() => { }, this, 5000);
				break;
		}
	}

	private async backBtnTouch() {
		let handler = ServerPostPath.hall_clubHandler_c_leaveClubHall;
		let data = {};
		let resp: any = await game.PomeloManager.instance.request(handler, data);
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
		}
		this.hide();
		ClubManager.instance.clearClubDatas();
		CF.sN(SceneNotify.OPEN_CLUB_HALL);
	}

	//clubnew
	private getResGroupById(gameId) {
		switch (gameId) {
			case GAME_ID.MJXZDD:
				return ['majiang_game'];
			case GAME_ID.ERMJ:
				return ['ermj_game', "majiang_game"];
			case GAME_ID.BLNN:
				return ['niuniu_game'];
			case GAME_ID.ZJH:
				return ['zhajinhua_game'];
			case GAME_ID.HBMJ:
				return ['hbmj_game'];
			case GAME_ID.BDZ:
				return ['bdz_game']
			case GAME_ID.GDMJ:
				return ['gdmj_game'];
			case GAME_ID.BAICAO:
				return ['baicao_game'];
		}
	}

	/**
	 * 快速加入
	 */
	private async fastJoin() {
		game.UIUtils.playScaleAni(this.fastImage);
		let gameId = this.currentClubGameId;
		let handler = ServerPostPath.hall_clubHandler_c_fastJoinTable;
		let data = { gameId: gameId };
		let resp: any = await game.PomeloManager.instance.request(handler, data);
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
		}
		let players = {};
		for (let i = 0; i < resp.roomInfo.players.length; i++) {
			let player = resp.roomInfo.players[i];
			players[player.seatId] = player;
		}
		resp.roomInfo.players = players;
		this.joinSceneCall(resp);
	}

	/**
	 * 
	 */
	public async joinScene(itemData) {
		let respGroup = this.getResGroupById(itemData.gameId);
		respGroup.unshift("club_hall");
		let instance = RotationLoading.instance as any;
		if (GameConfig.CURRENT_ISSHU) {
			instance = RotationLoadingShu.instance;
		}
		instance.load(respGroup, "", async () => {
			this.lockReq = true;
			egret.setTimeout(() => {
				this.lockReq = false;
			}, this, 5000);
			let handler = ServerPostPath.hall_clubHandler_c_enterClubTable;
			let data: any = { tableId: itemData.tableId };
			if (itemData.clubId) {
				data = { tableId: itemData.tableId, clubId: itemData.clubId };
			}
			let resp: any = await game.PomeloManager.instance.request(handler, data);
			if (resp.error && resp.error.code != 0) {
				this.lockReq = false;
				Toast.launch(resp.error.msg); return;
				// Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
			}
			let players = {};
			for (let i = 0; i < resp.roomInfo.players.length; i++) {
				let player = resp.roomInfo.players[i];
				players[player.seatId] = player;
			}
			resp.roomInfo.players = players;
			ClubManager.instance.currentClub.tableId = itemData.tableId;
			if (itemData.clubId) {
				ClubManager.instance.currentClub.clubId = itemData.clubId;
			}
			this.joinSceneCall(resp);
		});
	}

	//clubnew
	private joinSceneCall(resp) {
		let roomInfo = resp.roomInfo;
		Global.gameProxy.clearAllRoomInfo();
		CF.dP(ENo.CLOSE_ALL);
		switch (roomInfo.gameId) {
			case GAME_ID.BLNN:
				this.hide();
				Global.roomProxy.setRoomInfo(resp);
				QZNNClubReadyScene.instance.show(false);
				break;
			case GAME_ID.ERMJ:
				Global.gameProxy.setRoomInfo(resp);
				this.hide();
				ERenClubReadyScene.instance.show(false);
				break;
			case GAME_ID.MJXZDD:
				Global.gameProxy.setRoomInfo(resp);
				this.hide();
				XZDDClubReadyScene.instance.show(false);
				break;
			case GAME_ID.ZJH:
				Global.roomProxy.setRoomInfo(resp);
				this.hide();
				ZJHClubReadyScene.instance.show(false);
				break;
			case GAME_ID.HBMJ:
				Global.gameProxy.setRoomInfo(resp);
				this.hide();
				HBMJClubReadyScene.instance.show(false);
				break;
			case GAME_ID.BDZ:
				Global.roomProxy.setRoomInfo(resp);
				this.hide();
				BDZClubReadyScene.instance.show(false);
				break;
			case GAME_ID.GDMJ:
				Global.gameProxy.setRoomInfo(resp);
				this.hide();
				GDMJClubReadyScene.instance.show(false);
				break;
			case GAME_ID.BAICAO:
				Global.roomProxy.setRoomInfo(resp);
				this.hide();
				BAICAOClubReadyScene.instance.show(false);
				break;

		}
		this.lockReq = false;
	}

	public dstoryClub() {
		game.UIUtils.removeSelf(this);
		game.UIUtils.removeSelf(ClubInnerHallScene._instance);
		ClubInnerHallScene._instance = null;

		Toast.launch(TextUtils.instance.getCurrentTextById(56), 1);

		CF.sN(SceneNotify.OPEN_CLUB_HALL);
	}
	public s_clubPlayerKick() {
		game.UIUtils.removeSelf(this);
		game.UIUtils.removeSelf(ClubInnerHallScene._instance);
		ClubInnerHallScene._instance = null;
		Toast.launch(TextUtils.instance.getCurrentTextById(60), 1);
		CF.sN(SceneNotify.OPEN_CLUB_HALL);

	}
}