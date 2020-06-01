/*
 * @Author: He Bing 
 * @Date: 2018-07-06 16:29:49 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-04 11:52:08
 @Description: 麻将结算界面
 */

module majiang {
	export class HBMJOverScene extends game.BaseComponent {
		//下一局
		private playBtn: eui.Button;
		private backBtn: eui.Button;

		private item1: GDMJOverItem;
		private item2: GDMJOverItem;
		private item3: GDMJOverItem;
		private item4: GDMJOverItem;

		private group1: eui.Group;
		private group2: eui.Group;
		private group4: eui.Group;

		private settleData;
		private paiGroup: eui.Group;

		private huInfoGroup: eui.Group;
		private directions: any;

		private flushBtn: eui.Button;

		private huInfoLabel: eui.Label;

		protected isClubGame: boolean = false;
		public constructor(settleData) {
			super();
			this.settleData = settleData;
			LogUtils.logDJ(this.settleData);
			this.skinName = new HBMJOverSceneSkin();
		}

		public onAdded() {
			super.onAdded();
			Global.runGame = false;
			CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
			CF.aE(ENo.CLOSE_ALL, this.hide, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.EVENT_RESIZE, this.resetPosition, this);
			CF.rE(ENo.CLOSE_ALL, this.hide, this);
		}

		public hide() {
			CF.sN(SceneNotify.CLOSE_HBMJ_OVER);
			CF.sN(SceneNotify.CLOSE_HBMJ);
		}

		public resetPosition(e?: egret.Event) {
			var data = e.data;
		}

		private showWinPlayerInfos(winPlayers) {
			let mineIndex = Global.gameProxy.getMineIndex();
			for (let i = 0; i < winPlayers.length; i++) {
				let winIndex = winPlayers[i];
				let direction = this.directions[winIndex];
				let winPlayerData = this.settleData.players[winIndex];
				//创建一个图片一个倍数
				let item = this[`item${winIndex}`] as GDMJOverItem;
				item.showWinInfo(winPlayerData);
			}
		}


		/**
		 * 展示赢家的牌
		 */
		private showWinPlayers(winPlayerIndex) {
			let winPlayerData = this.settleData.players[winPlayerIndex];
			let index = this.settleData.winPlayer[this.currentIndex]
			let direction = this.directions[index];
			if (direction == 3 || direction == "3") {
				direction = 4;
			}
			//创建一个图片一个倍数
			let image = new eui.Image(RES.getRes(`gdmj_over_hutip_${direction}_png`));
			this.huInfoGroup.addChild(image);
			let roundPattern = winPlayerData.roundPattern;
			let roundPatternScoreArray = winPlayerData.roundPatternScoreArray;
			let beishu = winPlayerData.roundPatternScore;
			for (let i = 0; i < roundPattern.length; i++) {
				if (roundPattern[i] == 22 && roundPatternScoreArray[i] == 4) {
					let mineData = Global.gameProxy.getMineGameData();
					if (!mineData.displayCard) {
						beishu /= 2;
						break;
					}
				}
			}
			let label = new eui.BitmapLabel(`${beishu}b`);
			label.font = RES.getRes(`gdmj_over_count_fnt`);
			label.scaleX = label.scaleY = 1.05;
			this.huInfoGroup.addChild(label);
		}

		/**
		 * 展示买马的
		 */
		private showMaInfos() {
			let buyMaInfo = this.settleData.buyMaInfo;
			for (let key in buyMaInfo) {
				let mineData = buyMaInfo[key][0]
				let item = this[`item${key}`] as GDMJOverItem;
				let mineIndex = Number(key);
				item.showMaInfo(buyMaInfo, mineIndex);
			}
		}

		/**
		 * 显示玩家名称头像
		 */
		private showPlayerInfos(index) {
			let playerData = Global.gameProxy.getPlayerByIndex(index);
			let item = this[`item${index}`] as GDMJOverItem
			item.showPlayerDatas(playerData);
		}

		public createChildren() {
			super.createChildren();
			this.isClubGame = Global.gameProxy.roomInfo.tableId != undefined;
			let mineIndex = Global.gameProxy.getMineIndex();
			let item = this[`item${mineIndex}`] as GDMJOverItem;
			item.change2Win();
			this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 3);
			this.huInfoGroup.removeChildren();
			let lossPlayer = this.settleData.lossPlayer || [];
			let winPlayer = this.settleData.winPlayer || [];
			let winFlag = this.settleData.winFlag;
			//赢家
			for (let i = 0; i < winPlayer.length; i++) {
				let winIndex = winPlayer[i];
				let item = this[`item${winIndex}`] as GDMJOverItem;
				for (let j = 0; j < lossPlayer.length; j++) {
					let loseIndex = lossPlayer[j];
					let winPlayerData = this.settleData.players[loseIndex];
					if (item.showWinFlag) {
						item.showWinFlag(winFlag, true, winPlayerData.gainGold, loseIndex, winIndex);
					}
				}
			}

			//输家
			for (let i = 0; i < lossPlayer.length; i++) {
				let loseIndex = lossPlayer[i];
				let item = this[`item${loseIndex}`] as GDMJOverItem;
				for (let j = 0; j < winPlayer.length; j++) {
					let winPlayerIndex = winPlayer[j];
					let winPlayerData = this.settleData.players[winPlayerIndex];
					if (item.showWinFlag) {
						item.showWinFlag(winFlag, false, winPlayerData.gainGold, winPlayerIndex, loseIndex);
					}
				}
			}

			this.showWinPlayerInfos(winPlayer);

			let players = this.settleData.players;
			for (let key in players) {
				let playerData = players[key];
				let item = this[`item${key}`] as GDMJOverItem;
				item.showScore(playerData.gainGold);
				item.showPlayerBillsByHBMJ(playerData.bills, Number(key), this.settleData);
				this.showPlayerInfos(key);
				if (playerData.isDefeat) {
					item.showDefeat(true);
				}
			}

			// this.showMaInfos();
			this.currentIndex = 0;
			if (winPlayer.length > 0) {
				this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
				this.maxIndex = this.settleData.winPlayer.length;
				this.showPais(this.settleData.players[this.settleData.winPlayer[0]]);
				this.flushBtn.visible = this.maxIndex > 1;
			}
			this.paiGroup.touchChildren = false;
			this.paiGroup.touchThrough = false;
			this.alpha = 0;
			egret.Tween.get(this).to({
				alpha: 1
			}, 1000, egret.Ease.circIn);
		}

		private currentIndex: number = 0;
		private maxIndex: number = 0;
		private createPai(value) {
			let shoupai = new GDMJMineShoupai(value);
			shoupai.resetValue(value);
			shoupai.scaleX = shoupai.scaleY = 0.45;
			this.paiGroup.addChild(shoupai);
			return shoupai;
		}

		private showPais(playerData) {
			//吃 碰 杠
			let labelText = "";
			let roundPattern = playerData.roundPattern;
			let roundPatternScoreArray = playerData.roundPatternScoreArray;
			for (let i = 0; i < roundPattern.length; i++) {
				if (roundPattern[i] == 22 && roundPatternScoreArray[i] == 4) {
					let mineData = Global.gameProxy.getMineGameData();
					if (!mineData.displayCard) {
						labelText += HBMJPattern[roundPattern[i]] + " X" + (roundPatternScoreArray[i] / 2) + "    ";
						continue;
					}
				}
				labelText += HBMJPattern[roundPattern[i]] + " X" + roundPatternScoreArray[i] + "    ";
			}
			let winFlag = this.settleData.winFlag;
			// if (winFlag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
			let winPlayerData = this.settleData.players[this.settleData.winPlayer[0]];
			if (winPlayerData.isBaoPai) {
				labelText += " 包牌";
			}
			// }
			this.huInfoLabel.text = labelText;
			let x = 0;
			let pengCards = playerData.pengCards;//number
			for (let i = 0; i < pengCards.length; i++) {
				for (let j = 2; j >= 0; j--) {
					let shoupai = this.createPai(pengCards[i]);
					shoupai.x = x;
					x += shoupai.width * shoupai.scaleX - 0.75;
				}
				x += 5;
			}

			let gangCards = playerData.gangCards;//card
			// gangCards = [14];
			for (let i = 0; i < gangCards.length; i++) {
				let gangData = gangCards[i];
				for (let j = 1; j <= 4; j++) {
					if (gangData.realGang == 2 || gangData.realGang == 4) {
						if (j == 4) {
							let card = new eui.Image("mj_paibei_png");
							card.scaleX = card.scaleY = 0.45;
							card.x = x + 0.75;
							card.y = 1;
							this.paiGroup.addChild(card);
							x += card.width * card.scaleX - 0.75;
						} else {
							let shoupai = this.createPai(gangCards[i].card);
							shoupai.x = x;
							x += shoupai.width * shoupai.scaleX - 0.75;
						}
					} else {
						let shoupai = this.createPai(gangCards[i].card);
						shoupai.hideLaiziImage();
						shoupai.x = x;
						x += shoupai.width * shoupai.scaleX - 0.75;
					}
				}
				x += 5;
			}

			// return;
			let handCards = playerData.handCards;//number	
			for (let key in handCards) {
				let handCount = handCards[key];
				for (let i = 0; i < handCount; i++) {
					let shoupai = this.createPai(Number(key));
					shoupai.x = x;
					x += shoupai.width * shoupai.scaleX - 0.75;
				}
			}
			//间隔
			x += 5;
			let huCards = playerData.huCards;//number	
			if (huCards && huCards.length > 0) {
				// huCards = [13];
				let shoupai = this.createPai(huCards[0]);
				shoupai.showHuImage();
				shoupai.x = x;
				x += shoupai.width * shoupai.scaleX - 0.75 + 5;
			}
		}




		/**
		 * 判断分数正负颜色
		 */
		public socreW2L(color) {
			if (color < 0) {
				return 0x9EAEEE;
			} else {
				return 0xffffff;
			}
		}

		private lockReq: boolean;
		private async nextBtnTouch() {
			if (this.lockReq) {
				return;
			}
			this.lockReq = true;
			let backHall = () => {
				CF.sN(SceneNotify.CLOSE_HBMJ_OVER);
				CF.sN(SceneNotify.CLOSE_HBMJ);
				CF.sN(SceneNotify.OPEN_HBMJ_HALL);
			}
			egret.setTimeout(() => {
				this.lockReq = false;
			}, this, 5000);
			let roomInfo = Global.gameProxy.roomInfo;
			let sceneConfig = Global.gameProxy.getSceneConfigByGame(roomInfo.gameId, roomInfo.sceneId);
			let betMin = sceneConfig.gold_min;
			if (Global.playerProxy.playerData.gold <= 0 || Global.playerProxy.playerData.gold < betMin) {
				Global.alertMediator.addAlert("金币不足", null, null, true);
				backHall();
				return;
			} else {
				let quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
				if (quitResp.gold) {
					Global.playerProxy.playerData.gold = quitResp.gold;
				}
				if (quitResp) {
					if (quitResp.error && quitResp.error.code != ErrorCode.ROOM_NOT_EXIST) {
						if (quitResp.error.code != ErrorCode.ROOM_PLAYING) {
							backHall();
						}
						Global.alertMediator.addAlert(quitResp.error.msg, () => {
						}, null, true);
						return;
					}
					delete Global.gameProxy.lastGameConfig['roomId'];
					let data = _.clone(Global.gameProxy.lastGameConfig);
					data['isContinue'] = true;
					LogUtils.logD("center_6");
					let quitResp1: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)
					if (quitResp1) {
						CF.sN(SceneNotify.OPEN_HBMJ_MATCHING, Global.gameProxy.lastGameConfig);
						CF.sN(SceneNotify.CLOSE_HBMJ_OVER);
						CF.sN(SceneNotify.CLOSE_HBMJ);
					} else {
						Global.alertMediator.addAlert("开始失败，请重新开始!", () => {
							backHall();
						}, null, true);
					}
				} else {
					Global.alertMediator.addAlert("开始失败，请重新开始!", () => {
						backHall();
					}, null, true);
				}
			}

		}

		/**
		 * 返回准备界面
		 */
		protected async back2ReadyScene(successCall: Function, failCall: Function) {
			await ClubManager.instance.flushClubTable(successCall, failCall);
		}

		/**
		 * 点击方法
		 */
		public async onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			switch (e.target) {
				case this.playBtn://下一局
					if (this.isClubGame) {
						this.back2ReadyScene(() => {
							CF.sN(SceneNotify.CLOSE_HBMJ_OVER);
							CF.sN(SceneNotify.CLOSE_HBMJ);
							HBMJClubReadyScene.instance.show(true);
						}, () => {
							CF.sN(SceneNotify.CLOSE_HBMJ_OVER);
							CF.sN(SceneNotify.CLOSE_HBMJ);
						});
						return;
					}
					this.nextBtnTouch();
					break;
				case this.backBtn://退出
					CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
					CF.sN(SceneNotify.CLOSE_HBMJ_OVER);
					break;
				case this.flushBtn:
					this.showNext();
					break;
			}
		}

		public showNext() {
			this.currentIndex++;
			if (this.currentIndex >= this.maxIndex) {
				this.currentIndex = 0;
			}
			this.paiGroup.removeChildren();
			this.huInfoGroup.removeChildren();
			this.showPais(this.settleData.players[this.settleData.winPlayer[this.currentIndex]]);
			this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
		}
	}
}