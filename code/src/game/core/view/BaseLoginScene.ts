module game {
	export
		abstract class BaseLoginScene extends game.BaseScene {
		protected resGroups: string[];
		protected totalLoader: number = 0;;
		protected currentLoader: number = 0;
		protected clientVersion: eui.Label;
		protected resVersion: eui.Label;

		protected resLoadedOK: boolean = false;
		protected sceneConfigOK: boolean = false;
		public constructor() {
			super();
		}

		public clubInvite(e: egret.Event) {

		}

		public createChildren() {
			super.createChildren();
			this.initInternation();
			let node = document.getElementById("loadingDiv");
			node.parentNode.removeChild(node);
		}

		/**
        * 国际化
        * Create scene interface
        */
		protected initInternation() {
			let language = Utils.getURLQueryString("lan");
			if (language) {
				language = language.toLocaleLowerCase();
			} else {
				language = "zh_cn";
			}
			TextUtils.instance.changeLanguage(language);
		}


		/**
         * 先登录
         */
		public startLogin() {
			if (!ServerConfig.PATH_CONFIG.token_login) {
				LogUtils.logD("测试环境登陆")
				this.devLogin();
			} else {
				LogUtils.logD("正式环境登陆")
				this.envLogin();
			}
		}

		/**
		 *  用户登录成功
	 	 */
		public async userLoginSuc() {
			let publicMsg = PMDComponent.instance;
			publicMsg.anchorOffsetY = 24;
			publicMsg.horizontalCenter = 0;
			publicMsg.top = 100;
			GameLayerManager.gameLayer().loadLayer.addChild(publicMsg);
			GameLayerManager.gameLayer().createNetStatus();
			CF.dP(ServerNotify.s_broadcast, Global.gameProxy.pMd)
			await Global.gameProxy.people();
			if (NativeApi.instance.isiOSDevice) {
				if (NativeApi.instance.isSafari) {
					FrameUtils.checkSafariStart();
				} else if (NativeApi.instance.isChromeForIOS) {
					FrameUtils.postMessage("0");
				}
			}
			PomeloManager.instance.startPingTime();
			if (Global.gameProxy.roomState && Global.gameProxy.roomState.state == 1) {
				let club = Global.gameProxy.roomState.club;
				if (club) {
					ClubManager.instance.currentClub = club;
				}
				var handler = ServerPostPath.hall_sceneHandler_c_enter;
				let resp: any = await game.PomeloManager.instance.request(handler, Global.gameProxy.roomState);
				if (resp.error) {
					Global.gameProxy.clearAllRoomInfo();
					Global.alertMediator.addAlert(resp.error.msg, () => {
					}, null, true);
					HallForwardFac.redirectHall(() => {
						CF.sN(SceneNotify.CLOSE_LOADING);
					});
					return;
				}
				if (resp.reconnect) {
					if (Global.gameProxy.roomState.raceState == 2) {
						HallForwardFac.redirectRaceScene(resp, Global.gameProxy.roomState, (isPlaying) => {
							if (isPlaying) {
								CF.sN(SceneNotify.CLOSE_LOADING);
							} else {
								Global.gameProxy.clearAllRoomInfo();
								CF.sN(SceneNotify.OPEN_MATCH_HALL);
							}
						});
						return;
					}
					HallForwardFac.redirectScene(resp, Global.gameProxy.roomState, (isPlaying) => {
						if (isPlaying) {
							CF.sN(SceneNotify.CLOSE_LOADING);
						} else {
							Global.gameProxy.clearAllRoomInfo();
							CF.sN(SceneNotify.OPEN_MAIN_HALL);
						}
					});
				}
			} else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 1) {
				//可能会轮空
				MatchPassPanel.instance.showLunKong();
				CF.sN(SceneNotify.CLOSE_LOADING);
			} else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 4) {
				MatchPassPanel.instance.showWating(Global.gameProxy.roomState.rank, Global.gameProxy.roomState.runingRaceNum);
				CF.sN(SceneNotify.CLOSE_LOADING);
			} else if (Global.gameProxy.roomState && Global.gameProxy.roomState.club) {
				let club = Global.gameProxy.roomState.club;
				ClubManager.instance.currentClub = club;
				ClubManager.instance.flushClubTable(() => {
					CF.sN(SceneNotify.CLOSE_LOADING);
				}, () => {
					CF.sN(SceneNotify.CLOSE_LOADING);
				});
			}
			else {
				HallForwardFac.redirectHall(() => {
					CF.sN(SceneNotify.CLOSE_LOADING);
				});
			}
		}


		/**
		* 服务器获取授权
		* @param  {} data
		*/
		public async auth(data) {
			let gatePath = ServerConfig.PATH_CONFIG.httpPath
			egret.clearTimeout(this.timeout);
			this.timeout = egret.setTimeout(function () {
				Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(68), () => {
					FrameUtils.flushWindow();
				}, null, true);
			}, this, 10000);
			let resp: any = await Global.netProxy.sendRequestAsync(gatePath + "/gate/clientApi/auth", data);
			egret.clearTimeout(this.timeout);
			return new Promise((resolve, reject) => {
				if (resp.error) {
					Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(69), () => {
						FrameUtils.flushWindow();
					}, null, true);
				} else {
					let playerInfo = resp.data.playerInfo;
					let connectInfo = resp.data.connectInfo;
					Global.playerProxy.playerData = playerInfo;
					Global.playerProxy.token = playerInfo.token;
					Global.playerProxy.gametoken = playerInfo.sdkToken;
					Global.gameProxy.connectorInfo = connectInfo;
					this.showVersions(connectInfo.ver, GameConfig.JS_VERSION);
					ServerConfig.PATH_CONFIG.socketPath = connectInfo.ws;
					resolve();
				}
			});
		}


		public uploadPlayerAddress() {
			let browser = NativeApi.instance.getDeivice();
			let device = "PC";
			if (NativeApi.instance.isAndroidDevice) {
				device = "Android";
			} else if (NativeApi.instance.isiOSDevice) {
				device = "IOS";
			}
			let reqData = {
				token: Global.playerProxy.token,
				info: {
					browser: browser,
					devices: device,
					game_id: ServerConfig.gid
				}
			}
			let gatePath = ServerConfig.PATH_CONFIG.httpPath;
			Global.netProxy.sendRequest(gatePath + "/gate/clientApi/uploadStatistics", reqData, null);
		}

		/**
         * 开发模式登陆
         */
		public async devLogin() {
			let data1 = Date.now();
			let language = Utils.getURLQueryString("lan") || "zh_CN";
			let line = Utils.getURLQueryString("line") || "";
			await this.auth({
				operatorId: 1,
				channel_id: 1,
				authData: {
					username: ServerConfig.USER_NAME,
					password: '123654',
					figure_url: Math.floor(_.random(1, 6)),
					sex: Math.floor(_.random(0, 1)),
					lan: language,
					line: line
				},
				devType: 2,
				devId: NativeApi.instance.getDeivice()
			});
			await this.connect();
			let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {});
			Global.gameProxy.roomState = resp;
			Global.gameProxy.lastGameConfig = resp;
			if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState && Global.gameProxy.roomState.raceActivityId) {
				let resp1: any = await Global.pomelo.request(ServerPostPath.hall_userHandler_c_raceScenes, { activityId: Global.gameProxy.roomState.raceActivityId });
				if (resp1) {
					Global.gameProxy.matchItemData = resp1.raceScenesArray[0];
				}
			}
			this.calcResGroup();
			this.beganLoadResGroup();
			this.getSceneConfigInfo();
		}

		protected calcResGroup() {
			let res = RESUtils.getResNameByGid();
			LogUtils.logD("重连加载:" + JSON.stringify(res));
			if (res) {
				this.resGroups = res.now;
				this.backGroups = res.back.concat(["main"]);
			} else {
				this.resGroups = ["main"];
			}
			this.totalLoader = RESUtils.getGroupTotal(this.resGroups);
		}


		protected showVersions(serverVer, clientVer) {

		}

		protected beganLoadResGroup() {

		}

        /**
         * 正式环境登陆
         */

		protected backGroups = [];
		public async envLogin() {
			await this.loginByToken();
			this.showVersions(ServerConfig.PATH_CONFIG.serverVersion, GameConfig.JS_VERSION)
			// await this.queryEntry();
			Global.gameProxy.connectorInfo = {
				port: "",
				host: ""
			}
			await this.connect();
			let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {});
			Global.gameProxy.roomState = resp;
			Global.gameProxy.lastGameConfig = resp;
			if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState && Global.gameProxy.roomState.raceActivityId) {
				let resp1: any = await Global.pomelo.request(ServerPostPath.hall_userHandler_c_raceScenes, { activityId: Global.gameProxy.roomState.raceActivityId });
				if (resp1) {
					Global.gameProxy.matchItemData = resp1.raceScenesArray[0];
				}
			}
			this.calcResGroup();
			this.beganLoadResGroup();
			this.getSceneConfigInfo();
			// await this.getSceneConfigInfo();
		}

		protected timeout;
		protected async loginByToken() {
			egret.clearTimeout(this.timeout);
			let gatePath = ServerConfig.PATH_CONFIG.httpPath;
			let data = { token: Global.playerProxy.token };
			this.timeout = egret.setTimeout(function () {
				Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(64), () => {
					FrameUtils.flushWindow();
				}, null, true);
			}, this, 60000);
			let time = Date.now();
			let resp: any = await Global.netProxy.sendRequestAsync(gatePath + "/gate/clientApi/getPlayerInfo", data);
			egret.clearTimeout(this.timeout);
			return new Promise((resolve, reject) => {
				if (resp.error) {
					if (resp.error.code && resp.error.code == -107) {
						Global.alertMediator.addAlert(resp.error.msg, () => {
							FrameUtils.flushWindow();
						}, null, true);
						return;
					}
					Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(65), () => {
						FrameUtils.flushWindow();
					}, null, true);
				} else {
					LogUtils.logD(resp);
					Global.playerProxy.playerData = resp.data;
					Global.playerProxy.token = data.token;
					resolve();
				}
			})

		}

		/**
         * 使用token登陆
         */
		protected chaoshi;
		public async connect() {
			try {
				egret.clearTimeout(this.chaoshi);
				//先握手
				this.chaoshi = egret.setTimeout(() => {
					Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(69), () => {
						FrameUtils.flushWindow();
					}, null, true);
				}, this, 30000)
				await PomeloManager.instance.initServer(Global.gameProxy.connectorInfo.host, Global.gameProxy.connectorInfo.port);
				egret.clearTimeout(this.chaoshi);
				this.chaoshi = null;
				let resp: any = await PomeloManager.instance.request('connector.entryHandler.c_connect', {
					token: Global.playerProxy.token,
					version: GameConfig.JS_VERSION
				});
				if (resp.error && resp.error.code != 0) {
					Global.alertMediator.addAlert("当前客户端版本低于线上版本,请等待更新完成.", () => {
						FrameUtils.flushWindow();
					}, null, true);
					return;
				}
				egret.localStorage.setItem("firstlogin", "1");
				this.uploadPlayerAddress();
				Global.gameProxy.pMd = resp.broadcast;
				return new Promise(function (resolve, reject) {
					if (resp) {
						if (resp.error && resp.error.code != 0) {
							alert(TextUtils.instance.getCurrentTextById(69));
							return;
						}
						PomeloManager.instance.state = PomeloStateEnum.CONNECT;
					}
					resolve();
				})
				//登陆成功
			} catch (err) {
				egret.clearTimeout(this.chaoshi);
				this.chaoshi = null;
				PomeloManager.instance.state = PomeloStateEnum.DISCONNECT;
				egret.setTimeout(this.connect, this, 10000);
			}
		}

		public async getSceneList() {
			try {
				let resp: any = await PomeloManager.instance.request('hall.sceneHandler.c_getGameListInfo', {});
				let list = [];
				for (let i = 0; i < resp.length; i++) {
					let data = resp[i];
					if (data.grade != 6) {
						list.push(data);
					}
					if (data.groupCode) {
						data.gameId = data.groupCode;
					}
					if (data.gameCodes) {
						data.subGames = data.gameCodes;
					}

				}
				Global.gameProxy.sceneList = list;
				Global.gameProxy.backSceneList = resp;
				// this.checkAddRace();
				this.sceneConfigOK = true;
				this.checkLoginOver();
			} catch (err) {
				egret.error('********* 获取金币场场配置信息 err=', err);
			}
		}


		public async checkLoginOver() {
			if (this.resLoadedOK && this.sceneConfigOK) {
				this.userLoginSuc();
			}
		}


		//获取金币场场配置信息
		public async getSceneConfigInfo() {
			try {
				let resp: any = await PomeloManager.instance.request('hall.sceneHandler.c_getSceneConfigInfo', {});
				if (resp.gameConfigs) {
					Global.gameProxy.gameNums = resp.gameConfigs;
					Global.gameProxy.gameIds = resp.gameIds;
					if (resp.globalConfigs.slot) {
						Global.slotProxy = resp.globalConfigs.slot.SlotHallList;
						game.LaohuUtils.slotHallDataInit(Global.slotProxy);
					}
				} else {
					Global.gameProxy.gameNums = resp;
				}

				this.getSceneList();
			} catch (err) {
				egret.error('********* 获取金币场场配置信息 err=', err);
			}
		}
	}
}