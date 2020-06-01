class MainHallScene extends game.BaseScene {
	public pmdKey: string = "common";
	public bgMusic: string = "main_bg_mp3";
	//适配group
	public resizeGroup: eui.Group;
	private topGroup: eui.Group;
	private backHomeBtn: eui.Button;
	private nameLabel: eui.Label;
	private headerImage: eui.Image;
	private gameScroller: eui.Scroller;
	private gameGroup: eui.Group;

	private personGroup: eui.Group;;
	private ruleBtn: eui.Button;
	private rechargeBtn: eui.Button;
	private btnGroup: eui.Group;
	private headerMask: eui.Image;
	private headerBtn: eui.Button;

	private light0: eui.Image;
	private tab0: eui.Image;
	private light1: eui.Image;
	private light2: eui.Image;
	private light3: eui.Image;
	private currentTab: number = 0;
	private bottomItemsArr: Array<GameMainHallTabItem> = [];
	public constructor() {
		super();
		this.skinName = new MainHallSceneSkin();
	}

	/**
	 * 不同平台展现不同LOGO
	 */
	private showPlatLogo() {
		if (Global.platfromType == "inner") {
			this.logoImage.visible = false;
		} else {
			this.logoImage.visible = true;
			let str = `./../logo/platform_${Global.platfromType}/plaform_logo_${Global.platfromType}.png`;
			RES.getResByUrl(str, (texture) => {
				this.logoImage.source = texture
			});
		}
	}

	/**
	 * 书写逻辑代码
	 */
	public createChildren() {
		super.createChildren();
		FrameUtils.changeBgImage("");
		this.showPlatLogo();
		game.UIUtils.changeResize(1);
		this.backHomeBtn.visible = ServerConfig.HOME_PAGE_URL.indexOf("http") > -1 && ServerConfig.OP_RETURN_TYPE != "3";
		this.rechargeBtn.visible = ServerConfig.RECHARGE_URL.indexOf("http") > -1;
		// this.fullScreenBtn.visible = !NativeApi.instance.isiOSDevice;
		this.createDbComponent();
		//给玩家的数据赋值
		this.nameLabel.text = Global.playerProxy.playerData.nickname;
		let headerImage = `hall_header_${Global.playerProxy.playerData.sex}_${Global.playerProxy.playerData.figure_url}_png`;
		this.headerImage.source = headerImage;
		this.headerImage.mask = this.headerMask;
		this.updateGold();

		Global.gameProxy.people();
		this.gameScroller.scrollPolicyV = "off";
		this.checkReconnectScene();
		this.gameScroller.bounces = true;
		let publicMsg = PMDComponent.instance;
		publicMsg.anchorOffsetY = 24;
		publicMsg.horizontalCenter = 0;
		publicMsg.top = 100;
		// this.showGame();
		this.setAutoTimeout(() => {
			this.showCreateAni();

			this.createList();
		}, this, 200)

		this.checkShowHotBar();

		//smart 初始化底部筛选按钮
		this.initBootomCaterogy();

		this.showDB();
	}
	private lineGroupDB: eui.Group;
	private coinDB: eui.Group;
	private showDB() {
		let db = new DBComponent("dt20_line");
		this.lineGroupDB.addChild(db);
		db.playByFilename(-1);
		//	Owen.UtilsString.playDB("dt20_line", this.lineGroupDB, -1);
		Owen.UtilsString.playDB("dt20_coin", this.coinDB, -1);
	}
	protected tabGroup: eui.Group;
	/**
	 * 热门标签现实不现实
	 */
	public checkShowHotBar() {
		let ui_a = game.Utils.getURLQueryString("ui_b");
		if (ui_a == "1") {
			this.tabGroup.visible = false;
		}
	}

	private showCreateAni() {
		// let startRight = this.personGroup.right;
		// this.personGroup.right -= 600;
		// egret.Tween.get(this.personGroup).to({
		// 	right: startRight
		// }, 400, egret.Ease.sineInOut);
		this.showPersonAni();
		this.gameScroller.alpha = 0;
		egret.Tween.get(this.gameScroller).to({
			alpha: 1
		}, 700, egret.Ease.circIn);

		this.topGroup.top -= 400;
		egret.Tween.get(this.topGroup).to({
			top: this.topGroup.top + 400
		}, 400, egret.Ease.bounceIn);

		this.btnGroup.left -= 500;
		egret.Tween.get(this.btnGroup).to({
			left: this.btnGroup.left + 500
		}, 400, egret.Ease.bounceIn);

	}

	private girlDBComponent: DBComponent;
	private createDbComponent() {
		Owen.UtilsString.playDB("dt20_role", this.personGroup, -1);
	}
	private showPersonAni() {
		this.personGroup.right = -1000;
		egret.Tween.removeTweens(this.personGroup);
		egret.Tween.get(this.personGroup).to({ right: -185 }, 1500, egret.Ease.quartOut);
		this.setAutoTimeout(() => {
			egret.Tween.removeTweens(this.personGroup);
			this.personGroup.right = -185;
		}, this, 1500);
	}
	protected onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.recordBtn:
				CF.sN(PanelNotify.OPEN_GAMERECORD, null);
				break;
			case this.settingBtn:
				CF.sN(PanelNotify.OPEN_SETTING, { setIndex: 1 });
				break;
			case this.ruleBtn:
				CF.sN(PanelNotify.OPEN_HELP)
				break;
			case this.rechargeBtn:
				FrameUtils.goRecharge();
				break;
			case this.backHomeBtn:
				FrameUtils.goHome();
				break;
			case this.headerBtn:
			case this.headerImage:
				CF.sN(PanelNotify.OPEN_HEADER);
				break;
		}
	}

	private initBootomCaterogy() {
		this.tabGroup.removeChildren();
		for (let i = 0; i < 4; ++i) {
			let item: GameMainHallTabItem = new GameMainHallTabItem(i);
			item.showStatus(item.gameID == this.currentTab);
			this.bottomItemsArr.push(item);
			this.tabGroup.addChild(item);
			if (i == 3) item.dividerLine.visible = false;
		}
	}

	private buttonLists: MainHallButton[] = [];

	private clearAllTab() {
		for (let i = 0; i < 4; i++) {
			this[`light${i}`].alpha = 0;
		}
		this[`light${this.currentTab}`].alpha = 1;
	}
	/**
	 * 
	 */
	private createList() {
		this.gameScroller.stopAnimation();
		this.gameScroller.viewport.scrollH = 0;
		for (let i = 0; i < this.buttonLists.length; i++) {
			let button = this.buttonLists[i];
			game.UIUtils.removeSelf(button);
		}
		this.buttonLists = [];
		this.gameGroup.removeChildren();
		let sceneList = _.sortBy(Global.gameProxy.sceneList, `index`);
		let list = [];
		if (this.currentTab == 0) {
			list = sceneList.concat([]);
		} else {
			//过滤一下
			list.push(sceneList[0]);
			for (let i = 1; i < sceneList.length; i++) {
				let data = sceneList[i];
				if (data.category == this.currentTab) {
					list.push(data);
				}
			}
		}

		let comment = list[0];
		comment.grade = GRADE.RECOMMEND;
		let first = this.getMainHallButton(comment);
		//smart
		first.showButtonAni(0 * 100);
		this.buttonLists.push(first);
		first.showHot();
		first.x = 30 + first.anchorOffsetX;
		first.y = 22.5 + first.anchorOffsetY;//75
		this.gameGroup.addChild(first);
		let xIndex = first.x + first.width / 2;
		for (let i = 1; i < list.length; i += 2) {
			let topData = list[i];
			if (topData.grade == GRADE.RECOMMEND) {
				topData.grade = GRADE.HOT;
			}
			let top = this.getMainHallButton(topData);

			this.buttonLists.push(top);
			top.x = xIndex + 5 + top.anchorOffsetX - 37.5;//255
			top.y = 47.5 + top.anchorOffsetY;//195
			console.log(`${top.x},${top.y}`)
			this.gameGroup.addChild(top);
			//smart
			top.showButtonAni(i * 80);
			let bottomData = list[i + 1];
			if (bottomData) {
				if (bottomData.grade == GRADE.RECOMMEND) {
					bottomData.grade = GRADE.HOT;
				}
				let bottom = this.getMainHallButton(bottomData);

				this.buttonLists.push(bottom);
				bottom.x = xIndex + 5 + bottom.anchorOffsetX - 37.5;//5
				bottom.y = top.height + 87.5 + bottom.anchorOffsetY;//bottom 增加高度 smart
				this.gameGroup.addChild(bottom);
				//smart
				bottom.showButtonAni(i * 80);
			}
			xIndex += top.width;
		}

		let top = this.getMainHallButton({ gameId: "" });
		this.buttonLists.push(top);
		top.x = xIndex - top.width / 2 + top.anchorOffsetX;;
		top.y = 30 + top.anchorOffsetY;
		this.gameGroup.addChild(top);
		top.visible = false;
	}
	/**
	 * 从缓存中获取
	 */
	private getMainHallButton(mainHallData) {
		let mainHallButton = GameCacheManager.instance.getCache(`hallbtn_${mainHallData.gameId}`, null) as MainHallButton;
		if (!mainHallButton) {
			mainHallButton = new MainHallButton(mainHallData);
			GameCacheManager.instance.setCache(`hallbtn_${mainHallData.gameId}`, mainHallButton);
		}
		mainHallButton.visible = true;
		return mainHallButton;
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ENo.UPDATE_PLAYER_COUNT, this.showPlayerCount, this);
		CF.aE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
		CF.aE(ENo.JOIN_SCENE_GAMEID, this.buttonTouch, this);
		//smart 底部筛选游戏按钮被点击
		CF.aE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.bottomItemTouch, this)
		this.gameScroller.addEventListener(egret.Event.CHANGE, this.showGame, this);
		this.startDs();
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.UPDATE_PLAYER_COUNT, this.showPlayerCount, this);
		CF.rE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
		CF.rE(ENo.JOIN_SCENE_GAMEID, this.buttonTouch, this);
		this.gameScroller.removeEventListener(egret.Event.CHANGE, this.showGame, this);
		CF.rE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.bottomItemTouch, this)
		egret.clearInterval(this.peopleCountInterval);
		this.peopleCountInterval = null;
	}
	//smart 底部筛选游戏按钮被点击
	private bottomItemTouch(e: egret.Event) {
		let data = e.data as GameMainHallTabItem;
		for (let i = 0; i < this.bottomItemsArr.length; i++) {
			let club = this.bottomItemsArr[i];
			club.showStatus(club == data);
		}
		this.currentTab = data.gameID;
		this.createList();
	}

	/**
	 * 显示虚拟
	 */
	private showGame() {
		this.gameScroller.bounces = true;
		let s = this.gameScroller.viewport.scrollH;
		for (let i = 0; i < this.buttonLists.length; i++) {
			let button = this.buttonLists[i];
			button.checkAlapa(s, this.gameGroup.width);
		}
	}


	private changHeader(e: egret.Event) {
		let data = e.data;
		this.headerImage.source = `hall_header_${data.sex}_${data.figureUrl}_png`;
		Global.playerProxy.playerData.figure_url = data.figureUrl;
		Global.playerProxy.playerData.sex = data.sex;
	}
	//重连后禁止点击
	private reconnectTouch: boolean = false;

	private buttonTouch(evt: egret.TouchEvent) {
		if (this.reconnectTouch) return;
		let gameId = evt.data.gameId;
		LogUtils.logD("=========gameId===" + gameId);
		let sourceName = `${gameId}_hall`;
		switch (gameId) {
			case "mjxzdd":
				sourceName = "xzdd_hall"; break;
			case "mjxlch":
			case "scmj":
				sourceName = "majiang_hall"; break;
			case "blnn":
				sourceName = "niuniu_hall"; break;
			case "zjh":
				sourceName = "zhajinhua_hall"; break;
			case "baccarat":
				sourceName = "bjl_hall"; break;
			case "slot":
				sourceName = "slot_hall_new"; break;
			case "race":
				sourceName = "match_hall"; break;
		}
		let resource = [sourceName];
		if (gameId.indexOf("mj") > -1) {
			resource.push("majiang_common");
		}
		LogUtils.logD("===scene===" + (`OPEN_${gameId.toLocaleUpperCase()}_HALL`));
		RotationLoading.instance.load(resource, "", () => {
			CF.sN(`OPEN_${gameId.toLocaleUpperCase()}_HALL`);
			CF.sN(SceneNotify.CLOSE_MAIN_HALL);
		});
	}

	private sendMsg(obj) {
		egret.Tween.get(obj).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }).call(() => {
			Global.alertMediator.addAlert("暂未开放，敬请期待", null, null, true);
		});
	}

	/**
	 * 更新玩家信息
	 */
	private showPlayerCount() {
		for (let i = 0; i < this.buttonLists.length; i++) {
			let button = this.buttonLists[i];
			button.updatePlayerCount();
		}
	}

	/**
		 * 检查回到界面
		 */
	private checkReconnectScene() {
		let roomState = Global.gameProxy.roomState;
		if (roomState && roomState.state == 1) {
			this.reconnectTouch = true;
			this.reconnectRoom(roomState);
		}
	}

	/**
	 * 开启在线人数请求
	 */
	private peopleCountInterval;
	public startDs() {
		this.peopleCountInterval = egret.setInterval(() => { Global.gameProxy.people() }, this, 60000, );
	}

	private async reconnectRoom(roomState) {
		var data = roomState;
		Global.gameProxy.lastGameConfig = data;
		LogUtils.logD("center_7");
		var handler = ServerPostPath.hall_sceneHandler_c_enter;
		let resp: any = await game.PomeloManager.instance.request(handler, data);
		try {
			if (resp.reconnect) {
				await HallForwardFac.redirectScene(resp, data, (isPlaying) => {
					if (isPlaying) {
						CF.sN(SceneNotify.CLOSE_MAIN_HALL);
					} else {
						this.reconnectTouch = false;
					}
				});
			}
		} catch (e) {
			Global.alertMediator.addAlert("加入房间失败");
		} finally {
			this.reconnectTouch = false;
		}
	}

	protected changeYcPos() {
		let child = GameLayerManager.gameLayer().netStatus;
		// child.validateNow();
	}
}