/*
 * @Author: MC Lee 
 * @Date: 2019-05-22 10:20:39 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-19 15:28:12
 * @Description: 游戏场景基本类--主要实现功能 重连 -> 退出游戏-> 重新开始
 */
module game {
	export abstract class BaseGameScene extends game.BaseScene {
		/**
		 * 是否允许退出
		 */
		protected allowBack: boolean;

		/**
		 * 换桌按钮（重新开始）
		 */
		protected restartBtn: eui.Button;

		/**
		 * 打开游戏界面通知
		 */
		abstract GAME_SCENE_NOTIFY: string;

		/**
		 * 关闭游戏界面通知
		 */
		abstract HALL_SCENE_NOTIFY: string;

		/**
		 * 关闭当前界面通知
		 */
		abstract CLOSE_NOTIFY: string;

		/**
		 * 对应匹配界面通知
		 */
		abstract MATCHING_SCENE_NOTIFY: string;

		protected touchGroup: eui.Group;

		protected isClubGame: boolean = false;

		protected isLuckeyGame: boolean = false;

		protected proxy;

		public constructor() {
			super();
		}


		public onAdded() {
			super.onAdded();
			Global.runGame = true;
			CF.aE(ServerNotify.s_pushRaceInvite, this.s_pushRaceInvite, this);
			CF.aE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);

			//解散俱乐部 smart
			CF.aE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
			// //牌桌销毁 smart
			CF.aE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);

			CF.aE(ServerNotify.s_pushLuckySettlement, this.s_pushLuckySettlement, this);

		}


		public onRemoved() {
			super.onRemoved();
			Global.runGame = false;
			CF.rE(ServerNotify.s_pushRaceInvite, this.s_pushRaceInvite, this);
			CF.rE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);

			//解散俱乐部
			CF.rE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
			// //牌桌销毁 smart
			CF.rE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
			CF.rE(ServerNotify.s_pushLuckySettlement, this.s_pushLuckySettlement, this);
		}

		protected s_pushLuckySettlement(e: egret.TouchEvent) {
			// let data = e.data;
			// let players = data.players;
			// let mineGold = players[(this.proxy as RoomProxy).getMineIndex()];
			// if (mineGold.ownGold) Global.playerProxy.playerData.gold = mineGold.ownGold;
			// MatchJackeyResultPanel.instance.checkGoldBySHow(mineGold.gainGold);
			// for (let index in players) {
			// 	let goldData = players[index];
			// 	let header = this.getHeaderByDirection(index) as WidgetHeader;
			// 	goldData.ownGold = goldData.ownGold;
			// 	header.updateGold(goldData.ownGold);
			// }
		}

		protected luckyPoint: MatchLuckeyPoint;
		protected showLuckPoint() {
			this.luckyPoint = new MatchLuckeyPoint(this.proxy.roomInfo.backGold);
			this.setLuckPointPos();
			MatchManager.instance.selectGameId = this.proxy.roomInfo.codeId;
			MatchManager.instance.selectIndex = this.proxy.roomInfo.sceneIndex;
			MatchManager.instance.selectGameGold = this.proxy.roomInfo.entryFeeGold;
			GameConst.MATCH_TAB_INDEX = 2;
		}

		protected setLuckPointPos() {

		}

		/**服务器销毁新桌子*/
		private s_pushDestoryTables(e: egret.Event) {
			let data = e.data;
			let tableIds = data["tableIds"];
			if (tableIds) {
				ClubManager.instance.clearTableData(tableIds);
				// //刷新列表
				for (let i = 0; i < tableIds.length; ++i) {
					let tableID = tableIds[i];
					if (tableID == this.proxy.roomInfo["tableId"]) {
						CF.sN(this.CLOSE_NOTIFY);
						ClubInnerHallScene.instance.show();
						Toast.launch(TextUtils.instance.getCurrentTextById(24), 1);
					}
				}
			}
		}

		public dstoryClub(e: egret.Event) {
			if (this.isClubGame) {
				Toast.launch(TextUtils.instance.getCurrentTextById(56), 1);
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(SceneNotify.OPEN_CLUB_HALL);
			}

		}
		public s_pushRaceInvite() {
			egret.setTimeout(function () {
				MatchInvitePanel.instance.show();
			}, this, 2000);
		}

		protected s_clubTablePlayerLeave(e: egret.Event) {
			if (this.isClubGame) {
				let data = e.data.playerInfo;
				let seatId = data.seatId;
				//smart
				if (!this.proxy.roomInfo) return;
				//smart
				if (this.proxy.roomInfo.tableId == e.data.tableId && this.proxy.getMineIndex() == seatId && data.reason) {
					Global.gameProxy.clearAllRoomInfo();
					CF.dP(ENo.CLOSE_ALL);
					Global.alertMediator.addAlert(data.reason, null, null, true);
					if (data.type == 3) {
						CF.sN(SceneNotify.OPEN_CLUB_HALL);
					} else {
						ClubInnerHallScene.instance.show();
					}
				}
			}

		}

		/**
		 * 屏幕旋转
		 * */
		public oritationChange(e: egret.Event) {
			var _data = e.data;
			var currentSceneName: string = this.GAME_SCENE_NOTIFY;
			var sceneName: string;
			//横屏
			if (_data == "H") {
				sceneName = currentSceneName + "_HORIZON"
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(sceneName);
			}
			else {
				sceneName = currentSceneName.replace("_HORIZON", "");
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(sceneName);
			}
		}
		/**
		 * 重连上来的回调
		 * @param  {} reqData
		 */
		protected async reconnectCall(reqData, proxy: any = Global.roomProxy) {
			Global.playerProxy.updatePlayerInfo(async () => {
				if (this.allowBack) {
					return;
				}
				// let queryHandler = ServerPostPath.hall_sceneHandler_c_queryGameState;
				// let resp1: any = await game.PomeloManager.instance.request(queryHandler, reqData);
				// if(resp1.state == 0){
				// 	return;
				// }
				LogUtils.logD("center_3");
				let handler = ServerPostPath.hall_sceneHandler_c_enter;
				reqData['isContinue'] = false;
				if (proxy.roomInfo.sceneId) {
					reqData.sceneId = proxy.roomInfo.sceneId;
				}
				if (proxy.roomInfo['codeId']) {
					reqData.gameId = proxy.roomInfo['codeId'];
				}
				let resp: any = await game.PomeloManager.instance.request(handler, reqData);
				LogUtils.logDJ(resp);
				if (!resp) {
					return;
				}
				if (!resp.error) {
					resp.error = {};
					resp.error.code = 0;
				}
				//游戏房间已经解散
				if (resp.error.code == -213) {
					let text = TextUtils.instance.getCurrentTextById(63);
					Global.alertMediator.addAlert(text, null, null, true);
					this.backHall();
					//弹出提示
				} else if (resp.error.code == 0) {
					proxy.setRoomInfo(resp);
					this.reloadGame();
				}
			})

		}


		/**
		 * 换桌按钮
		 */
		public async restartBtnTouch() {
			this.restartBtn.touchEnabled = false;
			delete Global.gameProxy.lastGameConfig['roomId'];
			//俱乐部
			let quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {}, false);
			if (quitResp) {
				if (quitResp.gold != undefined && quitResp.gold != null) {
					Global.playerProxy.playerData.gold = quitResp.gold;
				}
				if (quitResp.error && quitResp.error.code != ErrorCode.ROOM_NOT_EXIST) {
					// Global.alertMediator.addAlert(quitResp.error.msg, null, null, true);
					if (quitResp.error.code != ErrorCode.ROOM_PLAYING) {
						this.backHall();
					}
					this.restartBtn.touchEnabled = true;
					return;
				}
				let data = Global.gameProxy.lastGameConfig;
				LogUtils.logD("center_4");
				let quitResp1: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data);
				if (!quitResp1) {
					this.backHall();
					return;
				}
				if (quitResp1 && quitResp1.error && quitResp1.error.code != 0) {
					Global.alertMediator.addAlert(quitResp1.error.msg);
					if (quitResp1.error.code == ErrorCode.GOLD_TOO_LOW) {
						this.backHall();
					}
					this.restartBtn.touchEnabled = true;
					return;
				} else {
					if (quitResp1 == null) {
						this.backHall();
						return;
					}
					this.backMatching();
				}
			} else {
				this.restartBtn.touchEnabled = true;
				Global.alertMediator.addAlert("操作失败,请重新操作!");
			}
		}

		/**
		 * 返回按钮
		 */
		public async backBtnTouch() {
			if (!this.allowBack) {
				let text = TextUtils.instance.getCurrentTextById(105);
				Global.alertMediator.addAlert(text, null, null, true);
				return;
			}
			var quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {}, false);
			if (quitResp) {
				if (quitResp.error && quitResp.error.code != ErrorCode.ROOM_NOT_EXIST) {
					// Global.alertMediator.addAlert(quitResp.error.msg, null, null, true);
					if (quitResp.error.code != ErrorCode.ROOM_PLAYING && quitResp.error.code != ErrorCode.CLUB_GAMING_PLAYING) {
						Global.gameProxy.clearLastGameConfig();
						this.backHall();
					} else {
						Global.alertMediator.addAlert(quitResp.error.msg, null, null, true);
					}
					return;
				}
				if (quitResp.gold != undefined && quitResp.gold != null) {
					Global.playerProxy.playerData.gold = quitResp.gold;
				}
				this.backHall();
			}
		}

		/**
		 * 返回对应游戏大厅
		 */
		protected backHall() {
			if (this.isClubGame) {
				ClubInnerHallScene.instance.show();
				CF.sN(this.CLOSE_NOTIFY);
				return;
			}
			if (this.isLuckeyGame) {
				MatchJackeyResultPanel.instance.hide();
				CF.sN(SceneNotify.OPEN_MATCH_HALL);
				CF.sN(this.CLOSE_NOTIFY);
				return;
			}
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.HALL_SCENE_NOTIFY);
		}

		/**
		 * 返回对应的匹配
		 */
		protected backMatching() {
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.MATCHING_SCENE_NOTIFY);
		}

		/**
		 * 重新打开当前界面
		 */
		protected reloadGame() {
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.GAME_SCENE_NOTIFY);
		}


		/**
		 * 房间结束停止发送pinggame
		 * @param  {egret.Event} e
		 */
		protected roomGameOver(e: egret.Event) {
			Global.runGame = false;
		}


		public createChildren() {
			super.createChildren();
			this.proxy = Global.gameProxy;
			if (this.proxy.roomInfo && this.proxy.roomInfo.club) {
				this.recordBtn.visible = false;
			}
		}

		/**
		 * 返回准备界面
		 */
		protected async back2ReadyScene(successCall: Function, failCall: Function) {
			await ClubManager.instance.flushClubTable(successCall, failCall);
		}
	}
}