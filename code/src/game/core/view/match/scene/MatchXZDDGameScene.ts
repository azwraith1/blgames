/*
 * @Author: MC Lee 
 * @Date: 2019-11-27 14:34:11 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-23 11:56:04
 * @Description: 血战到底比赛场
 */
module majiang {
	export class MatchXZDDGameScene extends XZDDGameScene {
		/**
		 * 打开游戏界面通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_MATCH_MJXZDD;

		/**
		 * 关闭游戏界面通知
		 */
		public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_MATCH_HALL;

		/**
		 * 关闭当前界面通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_MATCH_MJXZDD;

		/**
		 * 对应匹配界面通知
		 */
		public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_MJXZDD_MATCHING;

        /**
         * 结算界面
         */
		public GAME_OVER_NOTIFY: string = SceneNotify.CLOSE_MATCH_OVER_MJXZDD;

		//截止人数
		protected totalLabel: eui.Label;
		//晋级人数
		protected passLabel: eui.Label;
		//当前排名
		protected peopleLabel: eui.Label;

		protected peopleGroup: eui.Group;

		protected peopleImage: eui.Image;

		/**
		 * 背景音乐
		 */
		public bgMusic: string = "m_mjxzdd_bg1_mp3";

		private group1: eui.Group;
		private group2: eui.Group;
		private group3: eui.Group;
		private group4: eui.Group;
		private group5: eui.Group;

		private group2Label1: eui.Label;
		private group2Label2: eui.Label;
		private group3Label1: eui.Label;
		private group4Label1: eui.Label;
		private group4Label2: eui.Label;
		private group5Label1: eui.Label;
		private titleLabel: eui.Label;

		protected mineHeader: WidgetHeader;
		public constructor() {
			super();
			this.skinName = new majiang.XZDDMatchSceneSkin();
		}

		public s_pushRaceInvite() {

		}

		public clubInvite(e: egret.Event) {

		}
		public updateGold() {

		}

		public async createChildren() {
			super.createChildren();
			RES.loadGroup("match_back");
			RES.loadGroup("majiang_back");
			this.showMatchInfo();
		}

		/**
		 * 显示比赛场的信息
		 */
		protected showMatchInfo() {
			let roomInfo = Global.gameProxy.roomInfo;
			let mineData = Global.gameProxy.getMineGameData();
			let mineRank = 1;
			if (roomInfo.raceType == 2) {
				//定局积分
				this.peopleGroup.visible = false;
				this.group4Label1.text = `${roomInfo.raceNum}/${roomInfo.raceMaxNum}`;
				let players = roomInfo.players;
				for (let key in players) {
					let playerData = players[key];
					if (key != Global.gameProxy.getMineIndex() + "") {
						//对比分数
						if (playerData.gold > mineData.gold) {
							mineRank++;
						}
					} else {
						if (!Global.gameProxy.reconnect) {
							if (roomInfo.raceNum == 1) {
								let beforeScore = playerData.beforeScore;
								if (beforeScore) {
									TipsCompoment.instance.show(`您的上一轮积分${beforeScore},转换为本轮积分${playerData.gold}`)
								}
							}
						}
					}
				}

				this.group4Label2.text = `${mineRank}/4`;
				this.group1.visible = this.group2.visible = this.group3.visible = false;
				this.group5.visible = this.group4.visible = true;
				this.group5.alpha = 0;
				let passLevels = roomInfo.passLevels;
				let index = passLevels.indexOf(roomInfo.curLevel);
				if (index == passLevels.length - 1) {
					this.group5Label1.text = `决赛`;
				} else {
					let before = passLevels[index - 1];
					this.group5Label1.text = `当前${before}进${roomInfo.curLevel}`;
				}
				this.showDJYFAni();
			} else {
				//group1
				this.totalLabel.text = roomInfo.cutoffNum + "";
				this.passLabel.text = roomInfo.advanceNum;
				//group2
				this.group2Label1.text = `第${roomInfo.raceNum}局`;
				this.group2Label2.text = roomInfo.betBase;
				//group3
				this.group3Label1.text = `${roomInfo.outScore}`;
				this.group5.visible = this.group4.visible = false;
				this.group1.visible = this.group2.visible = this.group3.visible = true;
				this.group2.alpha = this.group3.alpha = 0;
				this.group1.alpha = 1;
				this.peopleLabel.text = mineData.raceRank + "/" + roomInfo.remainPlayerSize;
				this.showDaliChujuAni();
			}
			let activityData = Global.gameProxy.matchItemData;
			this.titleLabel.text = activityData.title;
		}

		/**
		 * 显示打立出局动画
		 */
		private groupAniInterval;
		private groupIndex = 1;
		private showDaliChujuAni() {
			let time = 3000;
			this.groupAniInterval = egret.setInterval(() => {
				egret.Tween.get(this[`group${this.groupIndex}`]).to({
					alpha: 0
				}, 300)
				let nextGroup = this.groupIndex + 1;
				if (nextGroup > 3) {
					nextGroup = 1;
				}
				egret.Tween.get(this[`group${nextGroup}`]).wait(300).to({
					alpha: 1
				}, 300)
				this.groupIndex = nextGroup;
			}, this, 3000);
		}

		/**
		 * 定局积分东华
		 */
		private showDJYFAni() {
			let time = 3000;
			this.groupIndex = 4;
			this.groupAniInterval = egret.setInterval(() => {
				egret.Tween.get(this[`group${this.groupIndex}`]).to({
					alpha: 0
				}, 300)
				let nextGroup = this.groupIndex + 1;
				if (nextGroup > 5) {
					nextGroup = 4;
				}
				egret.Tween.get(this[`group${nextGroup}`]).wait(300).to({
					alpha: 1
				}, 300)
				this.groupIndex = nextGroup;
			}, this, 3000);
		}

		/**
		 * 定局积分
		 */
		protected showDingju() {
			let roomInfo = Global.gameProxy.roomInfo;
			let db;
			if (roomInfo.raceType == 2) {
				if (roomInfo.lastRace) {
					db = new DBComponent("bsc_notice1");
				} else {
					db = new DBComponent("bsc_notice2");
				}
				if (db) {
					db.playByFilename(1);
					this.effectGroup.addChild(db);
					db.horizontalCenter = 0;
					db.verticalCenter = 0;
				}
			}
		}

		protected showLunciAni() {

		}
		/**
         * 牌局开始的动画
         * @param  {} callback
         */
		protected showStartAni(callback) {
			let nickname = Global.playerProxy.playerData.nickname;
			let roomInfo = Global.gameProxy.roomInfo;
			let db;
			if (roomInfo.raceType == 2) {
				if (roomInfo.lastRace == 1) {
					db = new DBComponent("bsc_notice1");
				} else {
					db = new DBComponent("bsc_notice2");
				}
				if (db) {
					db.playByFilename(1);
					this.effectGroup.addChild(db);
					if (roomInfo.lastRace == 1) {
						db.armature.x = 280;
					} else {
						db.armature.x = 500;
					}
					db.horizontalCenter = -200;
					db.verticalCenter = 0;
				}
			} else {
				let startDb = new DBComponent("bsc_startgame");
				this.effectGroup.addChild(startDb);
				startDb.playByFilename(1);
				startDb.horizontalCenter = 0;
				startDb.verticalCenter = 0;
			}
			SoundManager.getInstance().playEffect("m_match_start_mp3");
			this.setAutoTimeout(() => {
				callback();
			}, this, 500);
		}

		public onAdded() {
			super.onAdded();
			CF.aE(ServerNotify.s_pushRaceSettlementInfo, this.matchSettlement, this);
			CF.aE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
			CF.aE(ServerNotify.s_pushRaceWaitInfo, this.s_pushRaceWaitInfo, this);
			CF.aE(ServerNotify.s_pushRemainTableNum, this.s_pushRemainTableNum, this);
			CF.aE(ENo.RANK_FLUSH, this.rankFlush, this);

		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ServerNotify.s_pushRaceSettlementInfo, this.matchSettlement, this);
			CF.rE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
			CF.rE(ServerNotify.s_pushRaceWaitInfo, this.s_pushRaceWaitInfo, this);
			CF.rE(ENo.RANK_FLUSH, this.rankFlush, this);
			CF.rE(ServerNotify.s_pushRemainTableNum, this.s_pushRemainTableNum, this);
			egret.clearInterval(this.groupAniInterval);
		}


		/**
         * 断线重连
         */
		protected async reconnectSuc(e: egret.Event) {
			//对局已经结束不做处理
			if (this.majiangStatus == MajiangStatusEnum.OVER) {
				return;
			}
			if (this.allowBack) {
				Global.pomelo.disConnect();
				Global.alertMediator.addAlert("网络错误,请重新进入游戏!", () => {
					FrameUtils.flushWindow();
				}, null, true);
				return;
			}

			let reqData = Global.gameProxy.lastGameConfig;
			if (!reqData) reqData = {};
			if (!Global.gameProxy.roomInfo || !Global.gameProxy.roomInfo.roomId) {
				this.backHall();
				return;
			}
			if (Global.gameProxy.lastGameConfig && !Global.gameProxy.lastGameConfig.gameId) {
				Global.gameProxy.lastGameConfig.gameId = Global.gameProxy.roomInfo.gameId;
			}
			reqData.roomId = Global.gameProxy.roomInfo.roomId;
			reqData.gameId = Global.gameProxy.roomInfo.gameId;
			reqData.sceneId = 1001;
			if (reqData)
				this.reconnectCall(reqData, Global.gameProxy);
		}


		protected rankFlush(e: egret.Event) {
			let rank = e.data;
			this.peopleLabel.text = rank + "/" + Global.gameProxy.roomInfo.remainPlayerSize;
		}


		private s_pushRemainTableNum(e: egret.Event) {
			let tableNum = e.data.remainTableNum;
			Global.gameProxy.roomInfo.remainTableNum = tableNum;
		}

		public async onTouchTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this.peopleImage:
					this.showRankPanel();
					break;
				default:
					super.onTouchTap(e);
			}
		}


		private showRankPanel() {
			MatchRankPanel.instance.show();
		}

		private s_pushRaceReward(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.gameProxy.roomInfo;
			roomInfo.rewardDatas = data;
		}

		private s_pushRaceWaitInfo(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.gameProxy.roomInfo;
			roomInfo.levelDatas = data;

		}

		/**
         * 展现玩家头像
         */
		public showHeaders() {
			let players = Global.gameProxy.getPlayers();
			let zhuangId = Global.gameProxy.roomInfo.dealer;
			for (let key in players) {
				let playerData = players[key];
				let dir = this.directions[key];
				let header: WidgetHeader = this[dir + 'Header'];
				header.initWithData(playerData, dir);
				header.showIsZhuang(game.Utils.valueEqual(zhuangId, key));
				header.visible = true;
				if (playerData.isBaoTing) {
					header.showTingImages(false);
				}
			}
		}

		private matchSettlement(e: egret.TouchEvent) {
			this.restartBtn.visible = false;
			this.majiangStatus = MajiangStatusEnum.OVER;
			this.gameTipsGroup.visible = this.gameTipsGroup2.visible = false;
			this.timeDirectionBar.removeTimer();
			this.timeDirectionBar.removeAllTween();
			this.taskBar.hideAllBtns();
			Global.gameProxy.roomInfo.curPlay = 0;
			this.showHeaderTips(Global.gameProxy.roomInfo);
			this.tgGroup.visible = false;
			let resp = e.data;
			LogUtils.logD("======血流成河结算数据==========" + JSON.stringify(resp));
			let players = resp.players;
			this.gameOverShow(players);
			let roomInfo = Global.gameProxy.roomInfo;
			if (resp.rank) {
				roomInfo.currentRank = resp.rank;
			}
			this.showDuijuAni(() => {
				if (!Global.gameProxy.roomInfo) {
					return;
				}
				//修改所有玩家金币至抽水过后的金币
				for (let index in players) {
					let goldData = players[index];
					//本桌排名
					if (goldData.rank && Global.gameProxy.checkIndexIsMe(index)) {
						roomInfo.tableRank = goldData.rank;
					}
					let header = this.getHeaderByDirection(index) as WidgetHeader;
					goldData.ownGold = goldData.score;
					header.updateGold(goldData.score);
				}
				let mineData = Global.gameProxy.getMineGameData();
				MatchRankPanel.instance.hide();
				MatchXZDDSettlePanel.instance.show(resp);
			})
		}

		public checkPlayerIsOver() {

		}

		/*
         * 更新金币。
         */
		protected syncGold(syncData) {
			for (let key in syncData) {
				let dirction = this.directions[key];
				let info = syncData[key].info;
				info.gainGold = info.gainGold;
				info.ownGold = info.ownGold;
				LogUtils.logD("info.gainGold= " + info.gainGold);
				if (dirction == "mine") {
					Global.gameProxy.getMineGameData().gold = info.ownGold;
					Global.gameProxy.addRecord(syncData[key]);
				}
				if (syncData[key].type == 6) {
					this.setAutoTimeout(() => {
						if (info.gainGold < 0) {
							this.createHJZYByDirection(dirction, info.gainGold);
						} else {
							this.createFontByDirection(dirction, info.gainGold);
						}
					}, this, 1000);
				} else {
					this.createFontByDirection(dirction, info.gainGold);
				}
				this.getHeaderByDirection(key).updateGold(info.ownGold);
			}
			this.flushDJJFRank();
		}

		/**
         * 显示血战到底胡牌的提示
         */
		protected addXZDDHuTip(from, playerIndex, ani = false) {
			let roomInfo = Global.gameProxy.roomInfo;
			if (roomInfo.gameId != MajiangConfig.MJXZDD) {
				return;
			}
			let name = "player_zimo_png";
			if (from != playerIndex) {
				name = "player_hu_png";
			}
			let direction = this.directions[playerIndex];
			let image = new eui.Image(name);
			image.scaleX = image.scaleY = 1.5;
			this.effectGroup.addChild(image);
			switch (direction) {
				case "mine":
					image.horizontalCenter = 0;
					image.bottom = 148;
					this.tgGroup.visible = false;
					break;
				case "left":
					image.left = 220;
					image.verticalCenter = -80;
					break;
				case "right":
					image.right = 220;
					image.verticalCenter = -80;
					break;
				case "top":
					image.horizontalCenter = 0;
					image.top = 80;
					break;
			}
			if (ani) {
				image.alpha = 0;
				egret.Tween.get(image).to({
					alpha: 1
				}, 200);
			}

		}


		private flushDJJFRank() {
			let roomInfo = Global.gameProxy.roomInfo;
			let mineRank = 1;
			let mineData = Global.gameProxy.getMineGameData();
			if (roomInfo.raceType == 2) {
				//定局积分
				let players = roomInfo.players;
				for (let key in players) {
					let playerData = players[key];
					if (key != Global.gameProxy.getMineIndex() + "") {
						//对比分数
						if (playerData.gold > mineData.gold) {
							mineRank++;
						}
					}
				}
				this.group4Label2.text = `${mineRank}/4`;
			}
		}
	}
}