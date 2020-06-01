/*
 * @Author: MC Lee 
 * @Date: 2019-11-25 13:42:42 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-02 10:09:33
 * @Description: 比赛场大厅
 */
class MatchHallScene extends game.BaseHallScene {
	public hallId: string = "blackjack";
	public pmdKey: string = "blackjack";
	private maskImage: eui.Image;
	/**
	 * 头像前缀
	 */
	public headerFront: string = "hall_header";
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "match_hall_bg_mp3";
	/**
	 * 关闭当前界面的通知
	 */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_MATCH_HALL;

	/**
	 * 进入正确匹配的通知
	 */
	public MATCHING_NOTIFY: string = SceneNotify.OPEN_BLACKJ_MATCHING;

	/**
	 * 帮助界面的通知
	 */
	public HELP_NOTIFY: string = PanelNotify.OPEN_HELP_SHU;

	/**
	 * 记录界面的通知
	 */
	public RECORD_NOTIFY: string = PanelNotify.OPEN_BASE_RECORD;

	/**
	 * 设置界面的通知
	 */
	public SETTING_NOTIFY: string = PanelNotify.OPEN_SETTING;

	/**
	 * 需要加载的资源组
	 */
	public loadGroups: string[] = [];

	//血战到底
	private currentGameId: number = 10001;

	private tabScroller: eui.Scroller;

	private tabGroup: eui.Group;

	public tabItems: MatchHallTab[] = [];

	private gameScroller: eui.Scroller;

	private gameGroup: eui.List;

	private noItemImage: eui.Image;

	private jackeyGroup: eui.Group;
	public constructor() {
		super();
		this.skinName = new MatchHallSceneSkin();
	}

	public createChildren() {
		super.createChildren();
		this.initList();
		// game.UIUtils.removeSelf(GameLayerManager.gameLayer().hotBar);
		this.initTabList();
		this.tabScroller.scrollPolicyH = "off";
		this.checkFirstIn();
		let hotBar = GameLayerManager.gameLayer().hotBar;
		hotBar.verticalCenter = 260;
	}

	private checkFirstIn() {
		let playerId = Global.playerProxy.playerData.id;
		let data = localStorage.getItem("match_first");
		if (!data) {
			localStorage.setItem("match_first", "1");
			EnterAndClosePanel.getInstance(new MatchHallFirstSkin()).show();
		}
	}

	/**
		 * 初始化List
		 */
	private initList() {
		this.gameGroup.dataProvider = null;
		this.gameGroup.itemRenderer = MatchHallListRender;
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ENo.MATCH_TAB_TOUCH, this.matchTabTouch, this);
		CF.aE(ENo.ENTER_MATCH, this.enterMatch, this);
		CF.aE(ENo.JACKEY_ITEM_TOUCH, this.jackyItemTouch, this);
		CF.aE(ServerNotify.s_pushRaceRewardChange, this.s_pushRaceRewardChange, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.MATCH_TAB_TOUCH, this.matchTabTouch, this);
		CF.rE(ENo.ENTER_MATCH, this.enterMatch, this);
		CF.rE(ENo.JACKEY_ITEM_TOUCH, this.jackyItemTouch, this);
		CF.rE(ServerNotify.s_pushRaceRewardChange, this.s_pushRaceRewardChange, this);
		egret.clearTimeout(this.interval);
		this.interval = null;
	}

	private interval;
	private startInterval() {
		this.interval = egret.setInterval(() => {
			if (GameConst.MATCH_TAB_INDEX == 2) {
				return;
			}
			let update = false;
			for (let i = 0; i < this.dataSources.length; i++) {
				let itemData = this.dataSources[i];
				let startRaceTime = itemData.startRaceTime;
				let now = game.DateTimeManager.instance.now;
				if (now >= startRaceTime) {
					game.Utils.removeArrayItem(this.dataSources, itemData);
					i--;
					update = true;
					continue;
				};
			}
			if (update) {
				this.gameGroup.dataProvider = new eui.ArrayCollection(this.dataSources);
			}
			for (let i = 0; i < this.gameGroup.numChildren; i++) {
				let item = this.gameGroup.getChildAt(i) as MatchHallListRender;
				item.flushState();
			}
			//检查活动是否都没了
			this.noItemImage.visible = this.gameGroup.numChildren == 0;
		}, this, 1000);
	}


	private s_pushRaceRewardChange(e: egret.Event) {
		let data = e.data;
		for (let i = 0; i < this.gameGroup.numChildren; i++) {
			let item = this.gameGroup.getChildAt(i) as MatchHallListRender;
			let itemData = item.data;
			if (itemData.activityId == data.activityId) {
				itemData.contest_allreward = data.contest_allreward;
				item.flushReward();
			}
		}
	}

	/**
	 * 进入匹配
	 */
	public async enterMatch(e: egret.Event) {
		if (this.lockEnter) {
			return;
		}
		let data = e.data;
		RotationLoading.instance.load(['match_mjxzdd'], "", async () => {
			this.lockEnter = true;
			Global.gameProxy.lastGameConfig = {};
			Global.gameProxy.lastGameConfig.gameId = data.gameId;
			let route = ServerPostPath.hall_userHandler_c_enterRace;
			let resp: any = await Global.pomelo.request(route, { id: data.activityId });
			Global.gameProxy.matchItemData = data;
			egret.setTimeout(() => { this.lockEnter = false; }, this, 1000);
			if (resp.error && resp.error.code != 0) {
				Global.alertMediator.addAlert(resp.error.msg, null, null, true);
			} else {
				Global.gameProxy.matchItemData.enterNum = resp.enterNum;
				MatchWaitPanel.instance.show();
				CF.sN(this.CLOSE_NOTIFY);
			}
		})
	}

	/**
	 * 左侧条
	 */
	private initTabList() {
		// let list = [1, 3, 2];
		// if (ServerConfig.PATH_TYPE == PathTypeEnum.WAI_PRODUCT || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
		// 	list = [1, 2];
		// }
		let sceneList = Global.gameProxy.backSceneList;
		let list = [1];
		for (let i = 0; i < sceneList.length; i++) {
			let sceneConfig = sceneList[i];
			if (sceneConfig.gameId == "luckyAwardPool") {
				list.push(2);
			}
		}
		this.tabGroup.removeChildren();
		for (let i = 0; i < list.length; i++) {
			let id = list[i];
			let tab = new MatchHallTab();
			tab.changeImageId(id);
			tab.x = 14;
			tab.y = i * tab.height;
			this.tabGroup.addChild(tab);
			this.tabItems.push(tab);
		}
		// Global.pomelo.request()
		// this.getGameList();
		this.initCurrentTab();
	}

	private matchTabTouch(e: egret.TouchEvent) {
		let data = e.data as number;
		if (this.lockTab) {
			return;
		}
		if (data == GameConst.MATCH_TAB_INDEX) {
			return;
		}
		GameConst.MATCH_TAB_INDEX = data;
		for (let i = 0; i < this.tabItems.length; i++) {
			let tab = this.tabItems[i];
			tab.changeImage();
		}
		this.initCurrentTab();
	}

	private lockTab;
	public initCurrentTab() {
		this.lockTab = true;
		switch (GameConst.MATCH_TAB_INDEX) {
			case 1:
				this.jackeyGroup.visible = false;
				this.gameScroller.visible = true;
				this.noItemImage.visible = false;
				this.getGameList();
				break;
			case 2:
				this.gameScroller.visible = false;
				this.jackeyGroup.visible = false;
				this.noItemImage.visible = false;
				this.getJackeyList();
				break;
			case 3:
				this.jackeyGroup.visible = false;
				this.gameScroller.visible = true;
				this.noItemImage.visible = false;
				this.getGameList();
				break;
		}
	}

	/**
	 * 获取游戏列表
	 * @param  {} gameId=10001
	 */
	public async getGameList(gameId = 10002) {
		let route = ServerPostPath.hall_userHandler_c_raceScenes;
		let resp: any = await Global.pomelo.request(route, { gameId: gameId });
		this.lockTab = false;
		Global.pomelo.clearLastLock();
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
		} else {
			this.showDatas(resp);
		}
	}

	public async getJackeyList() {
		if (MatchManager.instance.luckyConfigs && MatchManager.instance.luckyGameIds) {
			this.lockTab = false;
			this.showLuckeyData();
			return;
		}
		let route = ServerPostPath.hall_luckyHandler_c_getLuckyGameListInfo;
		let resp: any = await Global.pomelo.request(route, {});
		this.lockTab = false;
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
		} else {
			MatchManager.instance.setLuckyConfig(resp)
			this.showLuckeyData();
		}
	}

	public jackyItemTouch(e: egret.TouchEvent) {
		let index = e.data;
		if (index == MatchManager.instance.selectIndex) {
			return;
		}
		let gameConfigs = MatchManager.instance.luckyConfigs;
		let currentGameConfig = gameConfigs[MatchManager.instance.selectGameId];
		MatchManager.instance.selectIndex = index;
		MatchManager.instance.selectGameGold = currentGameConfig[index].entryFeeGold;
		for (let i = 0; i < this.luckyItems.length; i++) {
			this.luckyItems[i].showPoint();
		}
	}


	public backBtnTouch() {
		super.backBtnTouch();
		MatchManager.instance.luckyConfigs = null;
		MatchManager.instance.luckyGameIds = null;
	}

	private luckyItems: MatchJackeyItem[] = [];
	private jItemGroup: eui.Group;
	private switchBtn: eui.Button;
	private jJoinBtn: eui.Button;
	public showLuckeyData() {
		let openGameId = MatchManager.instance.luckyGameIds;
		let gameConfigs = MatchManager.instance.luckyConfigs;
		if (!openGameId || !gameConfigs) {
			this.noItemImage.visible = true;
			this.jackeyGroup.visible = false;
			return;
		}

		let currentGameConfig = gameConfigs[MatchManager.instance.selectGameId];
		MatchManager.instance.selectGameGold = currentGameConfig[MatchManager.instance.selectIndex].entryFeeGold;
		this.switchBtn.visible = openGameId.length > 1;
		if (this.luckyItems.length == currentGameConfig.length) {
			for (let i = 0; i < this.luckyItems.length; i++) {
				let item = this.luckyItems[i];
				item.changeConfig(currentGameConfig[i]);
			}
		} else {
			for (let i = 0; i < currentGameConfig.length; i++) {
				let matchItem = new MatchJackeyItem(i, currentGameConfig[i]);
				this.luckyItems.push(matchItem);
				this.jItemGroup.addChild(matchItem);
			}
		}
		this.noItemImage.visible = false;
		this.jackeyGroup.visible = true;
	}

	private dataSources = [];
	private totalBet: number = 0;
	public showDatas(listData) {
		let scenes = listData.raceScenesArray;
		if (listData.totalBet != undefined) {
			this.totalBet = listData.totalBet
		}
		let newList = [];
		for (let i = 0; i < scenes.length; i++) {
			let sceneData = scenes[i];
			let startTime = sceneData.startRaceTime;
			if (startTime > game.DateTimeManager.instance.now && sceneData.state != 2) {
				let joinType = sceneData.joinTypeAndGold;
				if (GameConst.MATCH_TAB_INDEX == 1 && joinType[0] == 1) {
					//免费赛
					newList.push(sceneData);
				} if (GameConst.MATCH_TAB_INDEX == 3 && joinType[0] == 2) {
					newList.push(sceneData);
				}
			}
		}
		let sortList = _.sortBy(newList, "startRaceTime");
		//最近的一个报名
		let alertData;
		for (let i = 0; i < sortList.length; i++) {
			let sceneData = sortList[i];
			sceneData.totalBet = this.totalBet;
			if (!alertData && sceneData.state == 1) {
				alertData = sceneData;
			}
		}
		this.dataSources = sortList;
		this.gameGroup.dataProvider = new eui.ArrayCollection(sortList);
		this.noItemImage.visible = sortList.length == 0;
		if (alertData) {
			let startTime = alertData.startRaceTime;
			if (startTime - game.DateTimeManager.instance.now < Const.LAST_TIME_RACE) {
				Global.alertMediator.addAlert(`你报名的 ${alertData.title} 即将开赛,是否立即进入?`, () => {
					CF.dP(ENo.ENTER_MATCH, alertData);
				});
			}
		}
		this.startInterval();
	}


	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.jJoinBtn:
				let resGroup = this.getResourceGroup();
				resGroup.push("match_common");
				RotationLoading.instance.load(resGroup, "", () => {
					this.jJoinBtnTouch();
				});
				return;
		}
		super.onTouchTap(e);
	}

	public showHallBars() {

	}

	private getResourceGroup() {
		switch (MatchManager.instance.selectGameId) {
			case GAME_ID.MJXZDD:
				return ["majiang_game", "majiang_common"];
		}

	}

	/**
	 * 新模式加入
	 */
	public async jJoinBtnTouch() {
		let route = ServerPostPath.hall_luckyHandler_c_joinLuckyGame;
		let data = {
			gameId: MatchManager.instance.selectGameId,
			entryFeeGold: MatchManager.instance.selectGameGold,
			sceneIndex: MatchManager.instance.selectIndex
		}
		let resp: any = await Global.pomelo.request(route, data);
		this.lockTab = false;
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
		} else {
			MatchManager.instance.tablePlayers = resp;
			MatchManager.instance.matchConfig = data;
			MatchManager.instance.redirectScene(() => {
				CF.sN(this.CLOSE_NOTIFY);
			});
		}
	}

	public helpBtnTouch() {
		// WinNumberPanel.instance.show(Math.floor(100000), null);
		MatchHelpPanel.instance.show();
		// EnterAndClosePanel.getInstance(new MatchHelpPanelSkin()).show();
	}
}