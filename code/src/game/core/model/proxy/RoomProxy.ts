module game {
	export class RoomProxy extends ResourceProxyBase {
		public static NAME: string = "RoomProxy";
		public roomInfo: BaseRoomInfo;
		public playerInfo;
		//当前对局玩法
		public currentSceneId: number;
		public reconnect: boolean = false;
		//红黑记录时间
		public rbwRecord_time: number = 0;
		//扎金花记录时间
		public zjhRecord_time: number = 0;
		//扎金花押注
		public zjh_minbet: number = 0;

		public fcsIndex: number = 1;

		public playing: boolean = true;

		//扎金花记录
		public zjh_rect: any;
		//红黑记录
		public rbw_rect: any;
		//百家乐 1咪牌 0 普通
		public playway: any;
		public diWen: any;
		private init() {
			Global.roomProxy = this;
			this.listenOnCall();
		}

		public listenOnCall() {

		}

		public async req2updateRoom() {
			var handler = ServerPostPath.game_roomHandler_c_queryRoomInfo;
			let resp: EnterSceneResp = await game.PomeloManager.instance.request(handler, Global.gameProxy.lastGameConfig) as EnterSceneResp;
			// LogUtils.logD("resp %j=", resp)
			return new Promise((resolve, reject) => {
				if (resp && resp.roomInfo) {
					if (this.roomInfo) {
						this.clearRoomInfo();
					}
					resp.reconnect = true;
					this.setRoomInfo(resp);
					if (resp.roomInfo['serverTime']) {
						DateTimeManager.instance.updateServerTime(resp.roomInfo['serverTime']);
					}
					resolve();
				}
			});
		}


		public isDealer(index) {
			return game.Utils.valueEqual(index, this.roomInfo.dealer);
		}

		/**
		 * 重新连接room
		 */
		public async reconnectRoom() {
			LogUtils.logD("center_2");
			var handler = ServerPostPath.hall_sceneHandler_c_enter;
			let config = Global.gameProxy.lastGameConfig;
			config['isContinue'] = false;
			// if (!config.sceneId) {
			// 	config.sceneId = this.roomInfo.sceneId;
			// }
			// if (!config.gameId || this.roomInfo['codeId']) {
			// 	config.gameId = this.roomInfo['codeId'];
			// }
			if (this.roomInfo.sceneId) {
				config.sceneId = this.roomInfo.sceneId;
			}
			if (this.roomInfo['codeId']) {
				config.gameId = this.roomInfo['codeId'];
			}
			let resp: any = await game.PomeloManager.instance.request(handler, config);
			// LogUtils.logD("reconnect %j=", resp)
			return new Promise((resolve, reject) => {
				if (resp && resp.code == 0) {
					//还在匹配中
					resolve(false);
					return
				}
				else if (resp.roomInfo) {
					this.reconnect = resp.reconnect;
					this.setRoomInfo(resp);
					resolve(true);
				}
			});
		}

		/**
		 * 设置游戏房间数据
		 * @param  {} roomInfo
		 */
		public setRoomInfo(enterSceneResp: EnterSceneResp) {
			this.clearRoomInfo();
			LogUtils.logDJ(enterSceneResp);
			Global.roomProxy.currentSceneId = enterSceneResp.roomInfo.sceneId;
			if (enterSceneResp.reconnect != undefined) {
				this.reconnect = enterSceneResp.reconnect;
			}
			this.reconnect = enterSceneResp.reconnect;
			this.playerInfo = enterSceneResp.playerInfo
			if (this.roomInfo == null) {
				this.roomInfo = enterSceneResp.roomInfo
			}
			if (enterSceneResp.roomInfo['serverTime']) {
				DateTimeManager.instance.updateServerTime(enterSceneResp.roomInfo['serverTime']);
			}
		}

		public updatePlayer(index, player) {
			if (!this.roomInfo) {
				return;
			}
			this.roomInfo.players[index] = player;

		}

		public curIndexIsMe() {
			return game.Utils.valueEqual(this.roomInfo.curPlay, this.playerInfo.playerIndex);
		}

		/**
			 * 获取玩家
			 * @param  {} playerIndex
			 */
		public getPlayerByIndex(playerIndex): PlayerGameDataBean {
			if (!this.roomInfo) {
				return;
			}
			return this.roomInfo.players[playerIndex];
		}

		/**
		 * 得到游戏玩家
		 */
		public getPlayers() {
			if (!this.roomInfo) {
				return [];
			}
			return this.roomInfo.players;
		}

		public getPlayersLength() {
			return _.keys(this.roomInfo.players).length;
		}

		/**
		 * 获取玩家本人的index
		 */
		public getMineIndex() {
			if (!this.playerInfo) {
				return null;
			}
			return this.playerInfo.playerIndex;
		}


		public getAllPlayers() {
			if (!this.roomInfo) {
				return null;
			}
			return this.roomInfo.players;
		}

		public getMineGameData(): PlayerGameDataBean {
			if (!this.roomInfo) {
				return;
			}
			return this.roomInfo.players[this.getMineIndex()];
		}

		public getMineData() {
			if (!this.playerInfo) {
				return null;
			}
			return this.roomInfo.players[this.playerInfo.playerIndex];
		}

		/**
		 * 当前Index是否是我自己
		 * @param  {} index
		 */
		public checkIndexIsMe(index) {
			return game.Utils.valueEqual(index, this.playerInfo.playerIndex);
		}

		public getMineInfo(): NNPlayerGameBean {
			return this.roomInfo.players[this.playerInfo.playerIndex];
		}

		public getPlayerInfoByIndex(index) {
			return this.roomInfo.players[index];
		}

		public checkGold(gold) {
			let mine = this.getMineData();
			return mine.gold >= gold;
		}

		public clearRoomInfo() {
			this.roomInfo = null;
			this.playerInfo = null;
			this.reconnect = false;
		}

		/**
	 * 根据自己的位子获取方位
	 * @param  {number} mineIndex
	 */
		public static getDirectionByMine(mineIndex: number) {
			var direction: any = {};
			switch (mineIndex) {
				case 1:
					direction["1"] = "1";
					direction["2"] = "2";
					direction["3"] = "3";
					direction['4'] = "4";
					break;
				case 2:
					direction["2"] = "1";
					direction["3"] = "2";
					direction["4"] = "3";
					direction['1'] = "4";
					break;
				case 3:
					direction["3"] = "1";
					direction["4"] = "2";
					direction["1"] = "3";
					direction['2'] = "4";
					break;
				case 4:
					direction["4"] = "1";
					direction["1"] = "2";
					direction["2"] = "3";
					direction['3'] = "4";
					break;
			}
			return direction;
		}
	}
}