/*
 * @Author: Li MengChan 
 * @Date: 2018-07-02 10:10:54 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-10 11:07:08
 * @Description: 服务器通讯类
 */
module game {
	export class PomeloManager {
		public pomelo: PomeloForEgret.Pomelo;
		private static _instance: PomeloManager;
		public state: PomeloStateEnum = PomeloStateEnum.INIT;
		private pomeloFuncmap: HashMap<string, string> = new HashMap<string, string>();
		public lockReq: boolean = false;
		public lockResp: boolean = false;
		private requestTimeout;
		private lastRequestHandler: string;
		private filterRequests: string[];
		public constructor() {
			if (PomeloManager._instance) {
				throw new Error("PomeloManager使用单例");
			}
		}

		public static get instance(): PomeloManager {
			if (!PomeloManager._instance) {
				PomeloManager._instance = new PomeloManager();
				PomeloManager._instance.pomelo = new PomeloForEgret.Pomelo();
				PomeloManager._instance.listenOnAll();
				Global.pomelo = PomeloManager._instance;
				CF.aE(PomeloForEgret.Pomelo.EVENT_CLOSE, PomeloManager._instance.onClose, this);
				CF.aE("disconnect", PomeloManager._instance.reConnect, this);
				CF.aE(PomeloForEgret.Pomelo.EVENT_IO_ERROR, PomeloManager._instance.onError, this);
			}
			return PomeloManager._instance;
		}

		private onClose() {
			PomeloManager._instance.clearRequestOutTime();
			if (Global.runBack) {
				// console.log("type5 dianxian");
				// Global.alertMediator.addAlert("网络错误请重新连接", () => {
				PomeloManager._instance.reConnect();
				// }, null, true);
			}
			// Global.pomelo.state = PomeloStateEnum.DISCONNECT;
		}

		private lastLockTimeout;

		public clearLastLock() {
			clearTimeout(this.lastLockTimeout);
			this.lastRequestHandler = null;
		}

		private startRequestOutTime() {
			if (this.requestTimeout) {
				return;
			}
			this.requestTimeout = setTimeout(() => {
				Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(68), () => {
					console.log("type4 dianxian");
					PomeloManager._instance.reConnect();
				}, null, true);
			}, 8000);
		}

		private clearRequestOutTime() {
			clearTimeout(this.requestTimeout);
			this.requestTimeout = null;
		}
		/**
		 * 发送请求
		 * @param  {string} roteName
		 * @param  {any} param
		 */
		public request(roteName: string, param: any, needLock: boolean = true) {
			return new Promise((resolve, reject) => {
				if (!param) {
					param = {};
				}
				if (this.lastRequestHandler == roteName && needLock) {
					resolve({ error: { code: ErrorCode.BUSY_REQUEST, msg: TextUtils.instance.getCurrentTextById(115) } });
					return;
				} else {
					this.lastRequestHandler = null;
				}
				//过滤cbet
				if (roteName.indexOf("c_bet") < 0) {
					this.lastRequestHandler = roteName;
					this.lastLockTimeout = setTimeout(() => {
						this.lastRequestHandler = null;
					}, 1000);
				}
				LogUtils.logD(roteName + "请求参数 %j=", param);
				param.token = Global.playerProxy.token;
				if (Global.playerProxy.gametoken) {
					param.sdkToken = Global.playerProxy.gametoken;
				}
				this.startRequestOutTime();
				this.pomelo.request(roteName, param, (resp) => {
					this.clearRequestOutTime();
					LogUtils.logD(roteName + "反悔 %j=", resp);
					if (resp && resp.code === 500 && roteName != ServerPostPath.game_roomHandler_c_queryRoomInfo) {
						if (roteName == ServerPostPath.game_mjHandler_c_pingGame) {
							return;
						}
						if (roteName == ServerPostPath.game_roomHandler_c_quitRoom) {
							return;
						}
						NetErrorTips.instance.show(TextUtils.instance.getCurrentTextById(66));
						return;
					}
					if (resp.error && resp.error.code && resp.error.code == -107) {
						Global.alertMediator.addAlert(resp.error.msg, () => {
							FrameUtils.flushWindow();
							// resolve(null);
						}, null, true);
					}
					if (roteName == ServerPostPath.hall_sceneHandler_c_enter) {
						if (resp.error && resp.error.code != 0 && resp.error.code != -213) {
							if (resp.error.code == -19 || resp.error.code == -22) {
								Global.alertMediator.addAlert(resp.error.msg, () => {

								}, null, true);
								resolve(resp);
								return;
							}
							if (resp.error.code == -9) {
								resolve(resp);
								return;
							}
							if (resp.error.code == -219) {
								resolve(resp);
								return;
							}
							if (resp.error.code == -101) {
								Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(65), () => {
									// FrameUtils.flushWindow();
									resolve(null);
								}, null, true);
								return;
							}
							Global.alertMediator.addAlert(resp.error.msg, () => {
								// FrameUtils.flushWindow();
								resolve(null);
							}, null, true);
							return;
						}
					}
					if (resp.data) {
						if (resp.data.serverTime) {
							game.DateTimeManager.instance.updateServerTime(resp.data.serverTime);
						}
						resolve(resp.data);
					} else if (resp.error) {
						resolve(resp);
					} else {
						resolve({ error: { code: 0 } });
					}
				});
			})
		}


		public requestByCallback(roteName: string, param: any, callback) {
			if (!param) {
				param = {};
			}
			if (this.lastRequestHandler == roteName) {
				return;
			}
			this.lastRequestHandler = roteName;
			setTimeout(() => {
				this.lastRequestHandler = null;
			}, 500);
			LogUtils.logD(roteName + "请求参数 %j=", param);
			param.token = Global.playerProxy.token;
			if (Global.playerProxy.gametoken) {
				param.sdkToken = Global.playerProxy.gametoken;
			}
			this.startRequestOutTime();
			this.pomelo.request(roteName, param, (resp) => {
				this.clearRequestOutTime();
				LogUtils.logD(roteName + "反悔 %j=", _.clone(resp));
				if (resp && resp.code === 500 && (roteName != ServerPostPath.game_roomHandler_c_queryRoomInfo)) {
					if (roteName == ServerPostPath.game_roomHandler_c_quitRoom) {
						return;
					}
					if (roteName == ServerPostPath.game_mjHandler_c_pingGame) {
						return;
					}
					NetErrorTips.instance.show(TextUtils.instance.getCurrentTextById(66));
					return;
				}
				if (resp.error && resp.error.code && resp.error.code == -107) {
					Global.alertMediator.addAlert(resp.error.msg, () => {
						FrameUtils.flushWindow();
						// resolve(null);
					}, null, true);
				}
				if (roteName == ServerPostPath.hall_sceneHandler_c_enter) {
					if (resp.error && resp.error.code != 0 && resp.error.code != -213) {
						Global.alertMediator.addAlert(resp.error.msg, () => {
							// FrameUtils.flushWindow();
							callback && callback(null);
						}, null, true);
						return;
					}

				}
				if (resp.data) {
					callback && callback(resp.data);
				} else if (resp.error) {
					callback && callback(resp.error);
				} else {
					callback && callback({ error: { code: 0 } });
				}
			});
		}

		public listenOnAll() {
			var allNotify = _.extendOwn(ServerNotify);
			for (var key in allNotify) {
				this.pomelo.on(allNotify[key], (event, resp) => {
					let data = JSON.stringify(resp);
					if (event != "s_broadcast") {
						LogUtils.logD(Date.now() + "," + event + "收到推送:  %j=", JSON.parse(data));
					}
					if (event == ServerNotify.s_robLogin) {
						NetReconnect.instance.active = false;
						NetErrorTips.instance.show(TextUtils.instance.getCurrentTextById(67));
						return;
					}
					//提示 以小博大 smart
					if (event == ServerNotify.s_overloadBackInfo) {
						let initGold = resp.initGold;
						let curGainGold = resp.curGainGold;
						let overloadBackGold = resp.overloadBackGold;
						let text = `本局携带金额为${initGold}，当前赢取${curGainGold}，以小博大退还${overloadBackGold}`
						Global.alertMediator.addColorAller({ "initGold": initGold, "curGainGold": curGainGold, "overloadBackGold": overloadBackGold }, true, null, null, true);
						return;
					}
					/**退税 smart */
					if (event == ServerNotify.s_leaveBackGold) {
						let types: Array<any> = _.uniq(resp.types);

						let gaingold = resp.gainGold;
						if (Global.playerProxy.playerData)
							Global.playerProxy.playerData.gold = resp["ownGold"];
						CF.dP(ServerNotify.s_payGold, { "ownGold": resp["ownGold"] })
						let txtVal = "";
						for (let i = 0; i < types.length; ++i) {
							let temptVal = Owen.UtilsString.getType(Number(types[i]));
							let pot: string = "";
							if (i > 0) {
								pot = "、"
							}
							let realVal = pot + temptVal;
							txtVal += realVal;
						}
						let showTxt = "历史对局玩家未胡牌，" + txtVal + "金额[" + gaingold + "]元已自动到账!"
						Global.alertMediator.addAlert(showTxt, null, null, true);
					}
					if (event == ServerNotify.s_pushRaceStartCountDown) {
						TipsCompoment.instance.show(resp[`raceName`] + "还有" + resp[`time`] + "分钟开始,超时将自动放弃哦~");
						return;
					}
					if (event == ServerNotify.s_kickPlayer) {
						Global.alertMediator.addAlert(resp.reason, () => {
							FrameUtils.flushWindow();
						}, null, true);
						return;
					}
					if (event == ServerNotify.s_roomInfo) {
						let players1 = Global.gameProxy.getAllPlayers();
						let players2 = Global.roomProxy.getAllPlayers();
						let players3 = resp.players;
						if (players3 && _.keys(players3).length > 0) {
							if (players1) {
								for (let key in players1) {
									players1[key].gold = players3[key].gold
								}
							}
							if (players2) {
								for (let key in players2) {
									players2[key].gold = players3[key].gold
								}
							}
						}

					}
					if (event == ServerNotify.s_payGold) {
						if (resp.ownGold != null && resp.ownGold != undefined) {
							LogUtils.logD("修改玩家金币:" + resp.ownGold);
							Global.playerProxy.playerData.gold = resp.ownGold;
							CF.dP(event, resp);
							return;
						}
					}
					// if (this.lockReq) {
					// 	return;
					// }
					CF.dP(event, resp);
				});
			}
		}

		public listenOn(funcName: string, callback) {
			this.pomelo.on(funcName, (resp) => {

			});
		}

		/**
		 * 取消监听
		 * @param  {string} funcName
		 */
		public listenOff(funcName: string) {
			this.pomelo.off(funcName, null);
		}

		/**
		 * 请求服务器，无返回
		 * @param  {string} roteName
		 * @param  {any} param
		 * @param  {boolean} isShow?
		 */
		public notify(roteName: string, param: any, isShow?: boolean) {
			// if (!isShow) {
			// 	Global.showWaritPanel();
			// }
			this.pomelo.notify(roteName, param);
		}

		/**
		 * 初始化服务器
		 * @param  {} host
		 * @param  {} port
		 */
		public initServer(host, port) {
			host = host;//ServerConfig.PATH_CONFIG.socket_path;
			port = port;
			return new Promise((resolve, reject) => {
				this.pomelo.init({
					host: host,
					port: port,
					log: true
				}, (socket) => {
					if (socket.code == 200) {
						resolve(true);
					} else {
						resolve(false);
					}
				});
			});
		}

		public disConnect() {
			console.log("type1 dianxian");
			if (Global.pomelo.state != PomeloStateEnum.DISCONNECT) {
				Global.pomelo.state = PomeloStateEnum.DISCONNECT;
				this.pomelo.disconnect();
				this.clearRequestOutTime();
				this.reConnect();
			}
		}


		public disConnectBySelf() {
			console.log("type2 dianxian");
			Global.pomelo.state = PomeloStateEnum.DISCONNECT;
			this.pomelo.disconnect();
		}


		public reConnect() {
			console.log("type6 dianxian");
			//  &&
			if (!Global.runBack && Global.pomelo.state == PomeloStateEnum.DISCONNECT) {
				NetReconnect.instance.show();
			} else {
				Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(66), () => {
					NetReconnect.instance.show()
				}, null, true);
				Global.pomelo.state = PomeloStateEnum.DISCONNECT;
			}
		}


		public onError() {
			Global.pomelo.state = PomeloStateEnum.DISCONNECT;
			NetErrorTips.instance.show(TextUtils.instance.getCurrentTextById(66));
		}

		public disConnectAndReconnect() {
			console.log("type3 dianxian");
			let self = this;
			if (Global.pomelo.state != PomeloStateEnum.DISCONNECT) {
				Global.pomelo.state = PomeloStateEnum.DISCONNECT;
				this.pomelo.disconnect();
				this.clearRequestOutTime();
				setTimeout(() => {
					self.reConnect();
				}, 200);
			}
		}

		private lastPingTime;
		public ping = 0;
		public startPingTime() {
			if (Global.runGame) {
				this.pingGame();
			} else {
				this.pingHall()
			}
			setTimeout(() => {
				this.startPingTime();
			}, 10000);
		}

		public pingHall() {
			this.lastPingTime = Date.now();
			let routeName = ServerPostPath.connector_entryHandler_c_ping;
			this.pomelo.request(routeName, {}, (resp) => {
				this.ping = Date.now() - this.lastPingTime;
				GameLayerManager.gameLayer().showPingTime();
			});
		}

		public pingGame() {
			this.lastPingTime = Date.now();
			let routeName = ServerPostPath.game_mjHandler_c_pingGame;
			let param: any = {};
			param.ping = this.ping;
			this.pomelo.request(routeName, param, (resp) => {
				this.ping = Date.now() - this.lastPingTime;
				GameLayerManager.gameLayer().showPingTime();
			});
		}

		/**
		 * 断开的原因
		 * @param  {} code
		 */
		public sendReconnectReason(code) {
			this.lastPingTime = Date.now();
			let routeName = ServerPostPath.game_mjHandler_c_pingGame;
			LogUtils.logD("sendReconnectReason")
			let param: any = {};
			param.ping = code;
			Global.pomelo.requestByCallback(routeName, param, () => { });
		}
	}
}
// BILL_TYPE: {
//         TF: 0, //桌费用
//         GANG: 1, //杠牌
//         HU: 2, //胡牌
//         PEI_JIAO: 3, //陪叫
//         HUA_ZHU: 4, //花猪
//         BACK_TAX: 5, //退税
//         TRANSFER: 6, //呼叫转移
//         ROUND_SETTLEMENT: 7, //牌局结算
//         ROUND_BET: 8, //牌局投注
//         GU_ZHU_YI_ZHI_BACK: 9, //孤注一掷返还
//         SPECIAL_PATTERN_REWARD: 10, // (喜钱)当赢家牌型为特定牌型时，系统为额外为玩家加一定数量分数
//         ROUND_SETTLEMENT_BACK: 11, // 结算返还
//         SYNC: 12, // 金币同步
//         BUY_MA: 13, //买马
//         INSURANCE: 14,// 保险结算
//         CATCH_BIRD: 15,// 抓鸟
//         CATCH_CHICK: 16,// 捉鸡
//         OVERLOAD_BACK: 17,// 以小博大
//     },