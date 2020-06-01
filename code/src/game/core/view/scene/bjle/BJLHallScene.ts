module bjle {
	export class BJLHallScene extends game.BaseHallScene {
		private centerGroup: eui.Group;
		private btn1: eui.Button;
		private btn2: eui.Button;
		private btn3: eui.Button;
		private btn4: eui.Button;

		public hallId: string = "baccarat";
		public pmdKey: string = "baccarat";
		/**
		 * 头像前缀
		 */
		public headerFront: string = "hall_header";
		/**
		 * 背景音乐
		 */
		public bgMusic: string = "bjl_bg_mp3";

		/**
		 * 关闭当前界面的通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BJLHALL;
		/**
	 * 进入正确匹配的通知
	 */
		public MATCHING_NOTIFY: string = SceneNotify.OPEN_BJLGAME;
		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string = PanelNotify.OPEN_HELP_SHU;//要改

		/**
		 * 记录界面的通知
		 */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_BJL_RECORD;//要改

		/**
		 * 设置界面的通知
		 */
		public SETTING_NOTIFY: string = PanelNotify.OPEN_SETTING;

		/**
		 * 需要加载的资源组
		 */
		public loadGroups: string[] = ['bjl_game'];

		private currentSceneId: number;

		private hallData: any[];

		private hallBars: BJLHallBar[] = [];

		public constructor() {
			super();
			this.skinName = `BJLHallSceneSkin${CF.tis}`;
		}

		public createChildren() {
			super.createChildren();
			FrameUtils.changeBgImage("./resource/gameAssets/bjl_hall/bjl_hall.jpg");
			this.resetPMDPosition();
			this.selectRoom(1001, 1);
			let hotBar = GameLayerManager.gameLayer().hotBar;
			hotBar.verticalCenter = -480;
			var nums = Global.gameProxy.gameNums["baccarat"];
			if (nums[1004] && !nums[1004].enable) {
				game.UIUtils.setGray(this.btn4);
				this.btn4.touchEnabled = false;
			}
			this.centerGroup.alpha = 0;
			egret.Tween.get(this.centerGroup).to({
				alpha: 1
			}, 300, egret.Ease.sineIn);

		}


		protected changeLanguageUI() {

		}

		protected backBtnTouch() {
			this.listenOffRoomstate();
			super.backBtnTouch();
		}

		/**
	 * 修正跑马灯位子
	 */
		protected resetPMDPosition() {
			let publicMsg = PMDComponent.instance;
			publicMsg.anchorOffsetY = 24;
			publicMsg.horizontalCenter = -10;
			publicMsg.top = 120;
		}

		/**
		 * 房间信息切换
		 */
		public roomStateChanged(e: egret.Event) {
			let data = e.data;
			this.findUpdateHallBar(data);
		}


		public onAdded() {
			super.onAdded();
			CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
			CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
			CF.aE(ServerNotify.s_roomStateChanged, this.roomStateChanged, this);
		}

		public onRemoved() {
			super.onRemoved()
			CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
			CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
			CF.rE(ServerNotify.s_roomStateChanged, this.roomStateChanged, this);
		}


		private async listenRoomState() {
			var handler = ServerPostPath.hall_sceneHandler_c_registerRoomStateInfo;
			let resp: any = await game.PomeloManager.instance.request(handler, { gameId: 10010, sceneId: this.currentSceneId });
			// hall_sceneHandler_c_registerRoomStateInfo
		}

		private async listenOffRoomstate() {
			if (this.currentSceneId) {
				var handler = ServerPostPath.connector_entryHandler_c_cancelRoomStateInfo;
				let resp: any = await game.PomeloManager.instance.request(handler, { gameId: 10010, sceneId: this.currentSceneId });
			}
		}

		// hall_sceneHandler_c_registerRoomStateInfo


		public enterResult(e: egret.Event) {
			let data = e.data;
			if (data.code && data.code != 0) {
				Global.alertMediator.addAlert(data.msg, () => {

				}, null, true);
				return;
			}
			Global.roomProxy.setRoomInfo(e.data);
			try {
				CF.sN(SceneNotify.CLOSE_BJLHALL);
				CF.sN(SceneNotify.OPEN_BJLGAME, data);
			} catch (e) {
				Global.alertMediator.addAlert("加入房间失败");
			} finally {
				this.lock = false;
			}
		}

		/**
		 * 玩家加入
		 */
		private playerEnter(e: egret.Event) {
			let roomInfo = Global.roomProxy.roomInfo;
			if (roomInfo) {
				// let richManList = roomInfo.playerList.richManList;
				// let data = e.data;
				// richManList.push(data.player);
			}
		}


		private joinScene(data) {
			RotationLoading.instance.load(["bjl_game"], "", () => {
				this.enterScene({ data: data });
			});
		}

		private selects: any;//路单数据
		private roomid: any;
		private lockReq: boolean = false;
		private selectImage: eui.Image;
		private async selectRoom(ids, buttonIndex) {
			if (this.currentSceneId == ids) {
				return;
			}
			if (this.lockReq) {
				return;
			}
			await this.listenOffRoomstate();
			this.currentSceneId = ids;
			this.lockReq = true;
			this.roomid = ids;
			var handler = ServerPostPath.hall_sceneHandler_c_getSceneStateInfo;
			let msg = { gameId: 10010, sceneId: ids };
			let resp: any = await game.PomeloManager.instance.request(handler, msg);
			// return;
			Global.pomelo.clearLastLock();
			if (resp) {
				if (resp.error && resp.error.code != 0) {
					this.lockReq = false;
					return;
				}
				this.hallData = resp;
				this.showHallBars1(resp);
				this.selectButton(buttonIndex);
			}
			this.lockReq = false;
		}

		private clearAllBars() {
			while (this.hallBars.length > 0) {
				let bar = this.hallBars.pop();
				game.UIUtils.removeSelf(bar);
				bar = null;
			}

		}

		private selectButton(buttonIndex) {
			for (let i = 1; i <= 4; i++) {
				let button = this[`btn${i}`] as eui.Button;
				if (i == buttonIndex) {
					// button.currentState = "disabled";
					this.selectImage.x = button.x - button.anchorOffsetX - 2;
					break;
				}
				// else{
				// button.currentState = "up";
				// }
			}
		}

		public async onTouchTap(e: egret.TouchEvent) {
			super.onTouchTap(e);
			switch (e.target) {
				case this.btn1:
					this.selectRoom(1001, 1);
					break;
				case this.btn2:
					this.selectRoom(1002, 2);
					break;
				case this.btn3:
					this.selectRoom(1003, 3);
					break;
				case this.btn4:
					this.selectRoom(1004, 4);
					break;
			}
			e.stopPropagation();
		}
		/**
		 * 检查回到界面
		 */
		private checkReconnectScene() {
			let roomState = Global.gameProxy.roomState;
			if (roomState && roomState.state == 1) {
				RotationLoading.instance.load(["bjl_game"], "", () => {
					this.enterScene({ data: roomState });
				});
			}
		}

		/**
		 * 获取对局信息
		 * @param  {egret.Event} e?
		 */
		private lock: boolean = false;
		public async enterScene(event) {
			var data = event.data;
			Global.gameProxy.lastGameConfig = data;
			if (this.lockEnter) {
				return;
			}
			this.lockEnter = true;
			/**
			 *  取消注册路单信息
			 */
			var handler = ServerPostPath.hall_sceneHandler_c_getSceneStateInfo;
			let msg = { gameId: 10010, sceneId: this.roomid };
			let resp1: any = await game.PomeloManager.instance.request(handler, msg);

			var handler = ServerPostPath.hall_sceneHandler_c_enter;
			let resp: any = await game.PomeloManager.instance.request(handler, data);
			this.lockEnter = false;
			//this.enterSceneCall(resp, data);
		}

		/**
		 * 更新选场的数据
		 * @param  {} newData
		 */
		public findUpdateHallBar(newData) {
			for (let i = 0; i < this.hallBars.length; i++) {
				let hallbar = this.hallBars[i] as BJLHallBar;
				if (hallbar) {
					hallbar.updateConfig(newData);
				}
			}

		}


		public showHallBars1(nums) {
			LogUtils.logD("====百家乐选场===" + JSON.stringify(nums))
			let index = 0;
			var item: any;
			this.clearAllBars();
			for (let i = 0; i < nums.length; i++) {
				item = new BJLHallBar(nums[i]);
				item.name = "item" + i;
				this.centerGroup.addChild(item);
				item.anchorOffsetX = item.width / 2;
				item.anchorOffsetY = item.height / 2;
				item.height = 238;
				item.y = index * (item.height + 20) + item.height / 2;
				index++;
				this.hallBars.push(item);
			}
			this.lock = false;
		}

		/**	
		 * 帮助按钮
		 */
		public helpBtnTouch() {
			BaseHelpShuPanel.getInstance(`BJLHelpSkin${CF.tis}`, "bjl_help", CF.tic).show();
		}
		public showHallBars() {

		}
	}
}