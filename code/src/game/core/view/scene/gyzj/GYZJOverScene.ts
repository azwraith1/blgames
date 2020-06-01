/*
 * @Author: He Bing 
 * @Date: 2018-07-06 16:29:49 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-31 16:22:24
 @Description: 麻将结算界面
 */

module majiang {
	export class GYZJOverScene extends game.BaseGameScene {
		//下一局
		protected restartBtn: eui.Button;
		protected backBtn: eui.Button;

		private item1: GYZJOverItem;
		private item2: GYZJOverItem;
		private item3: GYZJOverItem;
		private item4: GYZJOverItem;

		private group1: eui.Group;
		private group2: eui.Group;
		private group4: eui.Group;

		private settleData;
		private paiGroup: eui.Group;

		private huInfoGroup: eui.Group;
		private directions: any;

		private flushBtn: eui.Button;

		private huInfoLabel: eui.Label;
		private closeBtn: eui.Button;
		private liuju: eui.Image;
		public constructor(settleData) {
			super();
			this.settleData = settleData;
			//this.settleData = this.testJieSuanData;

			this.skinName = "resource/skins/scene/gyzj/GYZJOverSceneSkin.exml";
		}

		public onAdded() {
			super.onAdded();
			Global.runGame = false;
			CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
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
				let item = this[`item${direction}`];
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
			//创建一个图片一个倍数
			let image = new eui.Image(RES.getRes(`gyzj_over_hutip_${direction}_png`));
			this.huInfoGroup.addChild(image);
			// let label = new eui.BitmapLabel(`${winPlayerData.score}b`);
			// label.font = `gyzj_over_font_fnt`;
			// label.scaleX = label.scaleY = 1.05;
			// this.huInfoGroup.addChild(label);
		}



		/**
		 * 显示玩家名称头像
		 */
		private showPlayerInfos(index, item) {
			let playerData = Global.gameProxy.getPlayerByIndex(index);
			item.showPlayerDatas(playerData);
		}

		public createChildren() {
			super.createChildren();
			let mineIndex = Global.gameProxy.getMineIndex();
			this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
			this.huInfoGroup.removeChildren();
			let lossPlayer = this.settleData.lossPlayer || [];
			let winPlayer = this.settleData.winPlayer || [];
			let winFlag = this.settleData.winFlag;
			var baotingArr = [];
			this.liuju.visible = winPlayer.length <= 0;
			//赢家
			for (let i = 0; i < winPlayer.length; i++) {
				let playerIndex = winPlayer[i];
				var _direction = this.directions[playerIndex];
				let item = this[`item${_direction}`];
				//	let item = this[`item${playerIndex}`] as GYZJOverItem;
				let winPlayerData = this.settleData.players[playerIndex];
				var roundScoreRules = winPlayerData.roundScoreRules;
				item.showWinFlag(roundScoreRules, true);
				baotingArr.push(playerIndex);
				if (lossPlayer.length == 1) {
					for (let j = 0; j < lossPlayer.length; j++) {
						let loseIndex = lossPlayer[j];
						let losePlayerData = this.settleData.players[loseIndex];
						var _direction = this.directions[loseIndex];
						let loseitem = this[`item${_direction}`];
						// let loseitem = this[`item${loseIndex}`] as GYZJOverItem;
						// loseitem.showWinFlag(["1"]);
						loseitem.showWinFlag([{ "rule": 1 }]);
						baotingArr.push(loseIndex);
					}
					var difArr = _.difference([1, 2, 3, 4], baotingArr);
					this.showBaoTingFlag(difArr);
				}
				else {
					this.showBaoTingFlag(lossPlayer);
				}
			}
			let players = this.settleData.players;
			if (winPlayer.length < 1 && lossPlayer.length < 1) {
				this.showBaoTingFlag([1, 2, 3, 4]);

			}
			this.showWinPlayerInfos(winPlayer);


			for (let key in players) {
				let playerData = players[key];
				var _direction = this.directions[key];
				let item = this[`item${_direction}`];
				item.showScore(playerData.gainGold);
				item.setBeiShu(playerData.score);

				if (_direction == "1") {
					item.showPlayerBills(playerData.bills, Number(key), this.settleData, roundScoreRules);
				}
				item.setWeiZhiLable(_direction);
				this.showPlayerInfos(key, item);
				if (playerData.ownGold <= 0) {
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
			this.group1.alpha = this.group2.alpha = this.group4.alpha = 0;
			egret.Tween.get(this.group1).to({ alpha: 0 }).to({ alpha: 1 }, 500);
			egret.Tween.get(this.group2).wait(200).to({ alpha: 0 }).to({ alpha: 1 }, 500);
			egret.Tween.get(this.group4).wait(600).to({ alpha: 0 }).to({ alpha: 1 }, 500);
		}

		private currentIndex: number = 0;
		private maxIndex: number = 0;
		private createPai(value) {
			//LogUtils.logD("current value ====" + value);
			let shoupai = new GDMJMineShoupai(value);
			shoupai.resetValue(value);
			shoupai.maskRect.visible = false;
			shoupai.scaleX = shoupai.scaleY = 0.45;
			this.paiGroup.addChild(shoupai);
			let chicheckCards: Array<number> = this.settleData.chickCards;
			if (chicheckCards) {
				let _index = chicheckCards.indexOf(value);
				//LogUtils.logD("jipai====" + JSON.stringify(chicheckCards));
				if (_index >= 0) {
					//LogUtils.logD("current index>0 ====" + value);
					shoupai.setLihight(true);
					//改变颜色为橙色
					shoupai.maskRect.fillColor = 0XDD650B;
				}
			}
			return shoupai;
		}
		private showBaoTingFlag(data: Array<any>) {
			for (let j = 0; j < data.length; j++) {
				let loseIndex = data[j];
				let losePlayerData = this.settleData.players[loseIndex];
				var _direction = this.directions[loseIndex];
				let loseitem = this[`item${_direction}`];
				//	let loseitem = this[`item${loseIndex}`] as GYZJOverItem;
				let jiaozui = losePlayerData.isTing;
				//test
				loseitem.chooseBaoTingFlag(jiaozui);
			}
		}
		private showPais(playerData) {
			//吃 碰 杠
			let labelText = "";
			let roundPattern = playerData.roundPattern;
			let roundPatternScore = playerData.roundPatternScore;
			let roundScoreRules = playerData.roundScoreRules;

			var isBaoTing: boolean = false;
			for (let i = 0; i < roundScoreRules.length; ++i) {
				var _data = roundScoreRules[i];
				var content: string;
				switch (_data.rule) {
					case 2:
						content = "自摸";
						break;
					case 105:
						content = "天胡";
						break;
					case 107:
						content = "地胡";
						break;
					case 101:
						content = "杠上花";
						break;
					case 102:
						content = "热炮";
						break;
					case 103:
						content = " 抢杠胡";
						break;
					case 104:
						if (roundPattern == 1) {
							isBaoTing = true;
							content = "平胡(报听)";
						}
						else {
							content = "报听";
						}

						break;
					default:
						content = "没有这个胡牌类型";
						break;
				}
				if (_data.rule != 1) {
					labelText += content + " +" + _data.score + "    ";
				}
			}
			if (roundPattern == 1 && isBaoTing) {
				isBaoTing = false;
			}
			else {
				//	if (roundScoreRules.length == 0) {
				labelText += GYZJMJPattern[roundPattern] + " +" + roundPatternScore + "    ";
				//	}
			}
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
			// huCards = [13];
			let shoupai = this.createPai(huCards[0]);
			shoupai.showHuImage();
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
		public async onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			switch (e.target) {
				case this.restartBtn://下一局
					this.restartBtnTouch();
					break;
				case this.backBtn://退出
					let quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
					if (quitResp.gold != undefined && quitResp.gold != null) {
						Global.playerProxy.playerData.gold = quitResp.gold;
					}
					this.backHall();
					break;
				case this.closeBtn:
					CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
					CF.sN(this.CLOSE_NOTIFY);
					break;
				case this.flushBtn:
					this.showNext();
					break;
			}
		}


		/**
		 * 返回对应游戏大厅
		 */
		protected backHall() {
			CF.sN(this.GAME_SCENE_NOTIFY);
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.HALL_SCENE_NOTIFY);
		}

		/**
		 * 返回对应的匹配
		 */
		protected backMatching() {
			CF.sN(this.GAME_SCENE_NOTIFY);
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.MATCHING_SCENE_NOTIFY);
		}

		//new
		/**
		 * 打开游戏界面通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.CLOSE_GYZJMJ;

		/**
		 * 关闭游戏界面通知
		 */
		public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_GYZJMJ_HALL;

		/**
		 * 关闭当前界面通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_GYZJMJ_OVER;

		/**
		 * 对应匹配界面通知
		 */
		public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_GYZJ_MATCHING;

	}
}