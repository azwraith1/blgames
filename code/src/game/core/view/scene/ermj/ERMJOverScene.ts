/*
 * @Author: He Bing 
 * @Date: 2018-07-06 16:29:49 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-25 18:47:28
 @Description: 麻将结算界面
 */

module majiang {
	export class ERMJOverScene extends game.BaseComponent {
		//下一局
		private playBtn: eui.Button;
		private backBtn: eui.Button;
		private closeBtn: eui.Button;

		private contentGroup: eui.Group;
		private scrollers: eui.Scroller;
		private tipLabel: eui.Label;

		private headerbg1: eui.Image;
		private header1: eui.Image;
		private nameLabel1: eui.Label;
		private goldLabel1: eui.BitmapLabel;

		private headerbg2: eui.Image;
		private header2: eui.Image;
		private nameLabel2: eui.Label;
		private goldLabel2: eui.BitmapLabel;

		private bgImage: eui.Image;
		private typeImage: eui.Image;
		private winTypeImage: eui.Image;

		private goldLabel3: eui.BitmapLabel
		private fanLabel: eui.BitmapLabel;
		private settleData;
		private paiGroup: eui.Group;
		protected isClubGame: boolean = false;
		public constructor(settleData) {
			super();
			this.settleData = settleData;
			this.skinName = new ERMJOverSceneSkin();
		}

		public onAdded() {
			// roundPatternScore
			// roundPattern
			super.onAdded();
			this.isClubGame = Global.gameProxy.roomInfo.tableId != undefined;
			CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
		}

		public resetPosition(e?: egret.Event) {
			var data = e.data;
		}

		private initHeaders() {
			//排序
			let roomInfo = Global.gameProxy.roomInfo;
			let players = roomInfo.players;
			let settlePlayers = this.settleData.players;
			//赢家和第一的换
			let winSettle = [];
			let failSettle = [];
			for (let key in settlePlayers) {
				let settle = settlePlayers[key];
				if (settle.gainGold > 0) {
					winSettle.push(key);
				} else {
					failSettle.push(key);
				}
			}
			let mineIndex = Global.gameProxy.getMineIndex();
			let otherIndex = 2;
			if (mineIndex == 2) {
				otherIndex = 1;
			}
			let mineData = Global.gameProxy.getMineGameData();
			this.nameLabel1.text = mineData.nickname;
			let headerId = mineData['figureUrl'] || mineData.figure_url;
			this.header1.source = `hall_header_${mineData.sex}_${headerId}_png`;

			let mineGainGold = settlePlayers[mineIndex].gainGold;
			if (mineGainGold >= 0) {
				this.showMineWin();
			} else {
				this.showOtherWin();
			}
			if (settlePlayers[mineIndex].ownGold <= 0) {
				this[`renshu1`].visible = true;
			}
			this.goldLabel1.text = mineGainGold > 0 ? "+" + mineGainGold : mineGainGold;

			//2号玩家
			let otherData = Global.gameProxy.getPlayerByIndex(otherIndex);
			this.nameLabel2.text = otherData.nickname;
			let otherDataGold = settlePlayers[otherIndex].gainGold;
			if (settlePlayers[otherIndex].ownGold <= 0) {
				this[`renshu2`].visible = true;
			}
			let headerId1 = otherData['figureUrl'] || otherData.figure_url;
			this.header2.source = `hall_header_${otherData.sex}_${headerId1}_png`;
			this.goldLabel2.text = otherDataGold > 0 ? "+" + otherDataGold : otherDataGold;
			for (let i = 0; i < winSettle.length; i++) {
				let index = winSettle[i];
				let playerData = players[index];
				let settle = settlePlayers[index];
				this.goldLabel3.text = "+" + settle.gainGold;
				this.fanLabel.text = settle.roundPatternScore;
				if (settle.passHuTimes > 0) {
					settle.roundPattern.push(110);
					settle.roundPatternScoreArray.push(settle.passHuTimes);
				}
				this.showPais(settle);
				this.showFans(settle.roundPattern, settle.roundPatternScoreArray);
			}
		}


		private showOtherWin() {
			this.bgImage.source = RES.getRes("ermj_over_bg_1_png");
			this.headerbg2.source = RES.getRes(`ermj_over_headerbg_1_png`);
			this.headerbg1.source = RES.getRes("ermj_over_headerbg_2_png");
			this.nameLabel2.textColor = 0xfefab2;
			this.nameLabel2.strokeColor = 0xca7202;
			this.nameLabel1.textColor = 0xbdfde9;
			this.nameLabel1.strokeColor = 0x066d62;
			this.typeImage.source = RES.getRes(`ermj_over_type_2_png`);

			this.goldLabel2.font = "ermj_over_win1_fnt";
			this.goldLabel1.font = "ermj_over_lose_fnt";
			this.winTypeImage.source = RES.getRes("ermj_over_hutip_2_png");
		}

		/**
		 * 转换为赢家的样子
		 */
		private showMineWin() {
			this.bgImage.source = RES.getRes("ermj_over_bg_2_png");
			this.headerbg1.source = RES.getRes(`ermj_over_headerbg_1_png`);
			this.headerbg2.source = RES.getRes("ermj_over_headerbg_2_png");
			this.nameLabel1.textColor = 0xfefab2;
			this.nameLabel1.strokeColor = 0xca7202;
			this.nameLabel2.textColor = 0xbdfde9;
			this.nameLabel2.strokeColor = 0x066d62;
			this.typeImage.source = RES.getRes(`ermj_over_type_1_png`);

			this.goldLabel1.font = "ermj_over_win1_fnt";
			this.goldLabel2.font = "ermj_over_lose_fnt";
			this.winTypeImage.source = RES.getRes("ermj_over_hutip_1_png");


		}



		public createChildren() {
			super.createChildren();
			this.showPais(this.settleData.players[this.settleData.winPlayer]);
			this.initHeaders();
			this.paiGroup.touchChildren = false;
			this.paiGroup.touchThrough = false;
			this.alpha = 0;
			egret.Tween.get(this).to({
				alpha: 1
			}, 1000, egret.Ease.circIn);
		}


		private showFans(fans, scores) {
			for (let i = 0; i < fans.length; i++) {
				let fanCount = new ERMJPatternItem(fans[i], scores[i]);
				this.contentGroup.addChild(fanCount);
			}
		}


		private createPai(value) {
			let shoupai = new MineShoupai(value);
			shoupai.resetValue(value);
			shoupai.scaleX = shoupai.scaleY = 0.45;
			this.paiGroup.addChild(shoupai);
			return shoupai;
		}

		private showPais(playerData) {
			//吃 碰 杠
			let x = 0;
			let chiCards = playerData.chiCards;//selectCard
			// chiCards = [14];
			for (let i = 0; i < chiCards.length; i++) {
				for (let j = 2; j >= 0; j--) {
					let shoupai = this.createPai(chiCards[i].selectCard - j);
					shoupai.x = x;
					x += shoupai.width * shoupai.scaleX - 0.75;
				}
				x += 5;
			}

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
					if (gangData.gang == 2 || gangData.gang == 4) {
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
						shoupai.x = x;
						x += shoupai.width * shoupai.scaleX - 0.75;
					}
				}
				x += 5;
			}

			// return;
			let huaCards = playerData.huaCards;//Number
			// huaCards = [55, 56, 57, 58];
			for (let i = 0; i < huaCards.length; i++) {
				let shoupai = this.createPai(huaCards[i]);
				shoupai.x = x;
				x += shoupai.width * shoupai.scaleX - 0.75;
				// x += 5;
			}
			x += 5;
			// return;
			let handCards = playerData.handCards;//number	
			// handCards = { 12: 2, 13: 3, 14: 2 };
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
			// huCards = [13];
			let shoupai = this.createPai(huCards[0]);
			shoupai.x = x;
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
				CF.sN(SceneNotify.CLOSE_ERMJ_OVER);
				CF.sN(SceneNotify.CLOSE_ERMJ);
				CF.sN(SceneNotify.OPEN_ERMJ_HALL);
			}
			egret.setTimeout(() => {
				this.lockReq = false;
			}, this, 5000);
			let roomInfo = Global.gameProxy.roomInfo;

			let quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
			if (quitResp.gold != undefined && quitResp.gold != null) {
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
				let quitResp1: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)
				if (quitResp1) {
					CF.sN(SceneNotify.OPEN_ERMJ_MATCHING, Global.gameProxy.lastGameConfig);
					CF.sN(SceneNotify.CLOSE_ERMJ_OVER);
					CF.sN(SceneNotify.CLOSE_ERMJ);
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
		/**
		 * 关闭当前界面通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_ERMJ_OVER;
		public CLOSE_NOTIFY2: string = SceneNotify.CLOSE_ERMJ;

		/**
		 * 点击方法
		 */
		public async onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			switch (e.target) {
				case this.playBtn://下一局
					if (this.isClubGame) {
						this.back2ReadyScene(() => {
							ERenClubReadyScene.instance.show(true);
							CF.sN(this.CLOSE_NOTIFY);
							CF.sN(this.CLOSE_NOTIFY2);
						}, () => {
							CF.sN(this.CLOSE_NOTIFY);
							CF.sN(this.CLOSE_NOTIFY2);
						});
						return;
					}
					this.nextBtnTouch();
					break;
				case this.backBtn://退出
					CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
					CF.sN(SceneNotify.CLOSE_ERMJ_OVER);
					break;
			}
		}


		protected async back2ReadyScene(successCall: Function, failCall: Function) {
			await ClubManager.instance.flushClubTable(successCall, failCall);
		}
	}
}