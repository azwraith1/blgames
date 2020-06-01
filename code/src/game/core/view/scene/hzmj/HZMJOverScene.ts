module majiang {
	export class HZMJOverScene extends game.BaseComponent {
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
		private currentIndex: number = 0;
		private maxIndex: number = 0;
		public constructor(settleData) {
			super();
			this.settleData = settleData;
			//LogUtils.logDJ(this.settleData);
			LogUtils.logD(" ========================game  is  HZMJOverScene=============================");
			//LogUtils.logD(JSON.stringify(this.settleData, null, "\t"));
			LogUtils.logDJ(this.settleData);
			LogUtils.logD(" ========================game  is  HZMJOverScene==============================");
			//this.skinName = new HNMJOverSceneSkin();
			this.skinName = "resource/skins/scene/hzmj/HZMJOverSceneSkin.exml";

		}

		public onAdded() {
			super.onAdded();
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
				let item = this[`item${winIndex}`] as HZMJOverItem;
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
			let image = new eui.Image(RES.getRes(`hzmj_over_hutip_${direction}_png`));
			this.huInfoGroup.addChild(image);
			var _allWinBeiShu = winPlayerData.roundPatternScore;
			let label = new eui.BitmapLabel(`${winPlayerData.roundPatternScore}` + "b");
			label.font = "hzmj_over_font_1_fnt";
			label.scaleX = label.scaleY = 1.05;
			this.huInfoGroup.addChild(label);
		}


		/**
		 * 显示玩家名称头像
		 */
		private showPlayerInfos(index) {
			let playerData = Global.gameProxy.getPlayerByIndex(index);
			let item = this[`item${index}`] as HZMJOverItem
			item.showPlayerDatas(playerData);
		}

		public createChildren() {
			super.createChildren();
			//LogUtils.logD("this is in gameover========================== create children");
			let mineIndex = Global.gameProxy.getMineIndex();
			// //=====>test
			// if (!mineIndex) mineIndex = 1;
			// //====>test
			let item = this[`item${mineIndex}`] as HZMJOverItem;
			this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
			this.huInfoGroup.removeChildren();
			let winPlayer = this.settleData.winPlayer || [];
			// //===>test
			// if (!winPlayer || winPlayer.length == 0) winPlayer = this.settleData.winPlayerIndex;
			// //test
			if (winPlayer.length > 0) {
				this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
				this.maxIndex = this.settleData.winPlayer.length;
				this.showPais(this.settleData.players[this.settleData.winPlayer[0]]);
				//改变赢家 的背景图 和线
				let item = this[`item${this.settleData.winPlayer[0]}`] as HZMJOverItem;
				// item.change2Win();
				//	this.flushBtn.visible = this.maxIndex >= 1;
			}
			//this.showPlayerInfos(winPlayer);
			this.setLiuShui(winPlayer, mineIndex);
			this.currentIndex = 0;
			this.paiGroup.touchChildren = false;
			this.paiGroup.touchThrough = false;
			this.alpha = 0;
			egret.Tween.get(this).to({
				alpha: 1
			}, 1000, egret.Ease.circIn);
		}

		/**流水 */
		public setLiuShui(winPlayer, mineIndex) {
			if (winPlayer.length <= 0) return;
			let _winPlayer = this.settleData.winPlayer[0];
			// //===>test
			// if (!winPlayer || winPlayer.length == 0) winPlayer = this.settleData.winPlayerIndex[0]
			// //test
			var _roomInfor = Global.gameProxy.roomInfo;
			var _beishu: number;
			var _score: number;
			for (var key in this.settleData.players) {
				var _item: HZMJOverItem = this[`item${key}`] as HZMJOverItem;
				// _item.setWeiZhiLable()
				var _data = this.settleData.players[key];
				var _direction = this.directions[key];
				_item.setWeiZhiLable(_direction);
				_score = _data["gainGold"];
				var _owenGold = Number(_data["ownGold"]);
				//_owenGold = 0;
				_item.showPoChan(_owenGold);

				if (Number(key) == Number(mineIndex)) _item.setPlayerPanel();
				_beishu = _data["score"];
				//渲染赢家和输家
				if (key == winPlayer) {
					/**设置赢的分数和倍数*/
					_item.showBeiShu(_beishu, true);
				}
				else {
					//	_beishu = Number(_data["bills"][0]["info"]["score"]);
					_item.showBeiShu(_beishu);
				}
				if (key == _roomInfor.dealer.toString()) {
					_item.zhuangImg.visible = true;
					_item.mineTip.visible = false;
				}
				this.showPlayerInfos(key);
				_item.showScore(_score);
			}
		}
		private createPai(value) {
			let shoupai = new HZMJMineShoupai(value);
			shoupai.resetValue(value);
			shoupai.scaleX = shoupai.scaleY = 0.45;
			this.paiGroup.addChild(shoupai);
			return shoupai;
		}
		private showPais(playerData) {
			let labelText = "";
			let roundPattern = playerData.roundPattern;
			let roundPatternScoreArray = playerData.roundPatternScoreArray;
			for (let i = 0; i < roundPattern.length; i++) {
				labelText += HZMJPattern[roundPattern[i]] + " X" + roundPatternScoreArray[i] + "    ";
			}
			this.huInfoLabel.text = labelText;
			//吃 碰 杠
			let x = 0;
			let handCards = playerData.handCards;//number	
			//癞子
			let baoCard = Global.gameProxy.roomInfo.baoCards[0];
			let handCount = handCards[baoCard];
			for (let i = 0; i < handCount; i++) {
				let shoupai = this.createPai(baoCard);
				shoupai.x = x;
				x += shoupai.width * shoupai.scaleX - 0.75;
				shoupai.showLaiziImage();
			}
			if (handCount > 0) x += 5;
			//癞子牌显示
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
			//x += 5;
			// return;
			// return;

			// handCards = { 12: 2, 13: 3, 14: 2 };
			for (let key in handCards) {
				if (key == baoCard + "") {
					continue
				}
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
		/**获取是否又财神牌 */
		private getHaveCaiShen(handCards: any): { caishenCard: any, shengYuHandCard: any } {
			var _caiShenCard: Object = {};
			var _shengYuHandCards: Object = {};
			for (var key in handCards) {
				let handCount = handCards[key];
				if (handCards[key] == 46) {//Global.roomProxy.roomInfo.bankerCard[0]
					_caiShenCard[key] = handCount;
				}
				else {
					_shengYuHandCards[key] = handCount;
				}
			}
			return { caishenCard: _caiShenCard, shengYuHandCard: _shengYuHandCards };
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
				CF.sN(SceneNotify.CLOSE_HZMJ_OVER);
				CF.sN(SceneNotify.CLOSE_HZMJ);
				CF.sN(SceneNotify.OPEN_HZMJ_HALL);
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
					let quitResp1: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)
					if (quitResp1) {
						CF.sN(SceneNotify.OPEN_HZMJ_MATCHING, Global.gameProxy.lastGameConfig);
						CF.sN(SceneNotify.CLOSE_HZMJ_OVER);
						CF.sN(SceneNotify.CLOSE_HZMJ);
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
		 * 点击方法
		 */
		public async onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			switch (e.target) {
				case this.playBtn://下一局
					this.nextBtnTouch();
					break;
				case this.backBtn://退出
					let quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
					if (quitResp.gold != undefined && quitResp.gold != null) {
						Global.playerProxy.playerData.gold = quitResp.gold;
					}
					Global.gameProxy.clearLastGameConfig();
					if (quitResp) {
						CF.sN(SceneNotify.CLOSE_HZMJ_OVER);
						CF.sN(SceneNotify.CLOSE_HZMJ);
						CF.sN(SceneNotify.OPEN_HZMJ_HALL);
					} else {
						CF.sN(SceneNotify.CLOSE_HZMJ_OVER);
						CF.sN(SceneNotify.CLOSE_HZMJ);
						CF.sN(SceneNotify.OPEN_HZMJ_HALL);
					}
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


	// private showPais(playerData) {
		// 	//吃 碰 杠
		// 	let labelText = "";
		// 	let roundPattern = playerData.roundPattern;
		// 	let roundPatternScoreArray = playerData.roundPatternScoreArray;
		// 	for (let i = 0; i < roundPattern.length; i++) {
		// 		labelText += HZMJPattern[roundPattern[i]] + " X" + roundPatternScoreArray[i] + "    ";
		// 	}
		// 	// let winFlag = this.settleData.winFlag;
		// 	// if (winFlag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
		// 	// 	let winPlayerData = this.settleData.players[this.settleData.winPlayer[0]];
		// 	// 	if (winPlayerData.isShowZiMo) {
		// 	// 		labelText += " 自摸 X2";
		// 	// 	}
		// 	// }
		// 	this.huInfoLabel.text = labelText;
		// 	let x = 0;
		// 	let pengCards = playerData.pengCards;//number
		// 	for (let i = 0; i < pengCards.length; i++) {
		// 		for (let j = 2; j >= 0; j--) {
		// 			let shoupai = this.createPai(pengCards[i]);
		// 			shoupai.x = x;
		// 			x += shoupai.width * shoupai.scaleX - 0.75;
		// 		}
		// 		x += 5;
		// 	}

		// 	let gangCards = playerData.gangCards;//card
		// 	// gangCards = [14];
		// 	for (let i = 0; i < gangCards.length; i++) {
		// 		let gangData = gangCards[i];
		// 		for (let j = 1; j <= 4; j++) {
		// 			if (gangData.gang == 2 || gangData.gang == 4) {
		// 				if (j == 4) {
		// 					let card = new eui.Image("mj_paibei_png");
		// 					card.scaleX = card.scaleY = 0.45;
		// 					card.x = x + 0.75;
		// 					card.y = 1;
		// 					this.paiGroup.addChild(card);
		// 					x += card.width * card.scaleX - 0.75;
		// 				} else {
		// 					let shoupai = this.createPai(gangCards[i].card);
		// 					shoupai.x = x;
		// 					x += shoupai.width * shoupai.scaleX - 0.75;
		// 				}
		// 			} else {
		// 				let shoupai = this.createPai(gangCards[i].card);
		// 				shoupai.x = x;
		// 				x += shoupai.width * shoupai.scaleX - 0.75;
		// 			}
		// 		}
		// 		x += 5;
		// 	}

		// 	// return;
		// 	let handCards = playerData.handCards;//number	
		// 	//癞子
		// 	let baoCard = Global.gameProxy.roomInfo.baoCards[0];
		// 	//let baoCard = 46;
		// 	let handCount = handCards[baoCard];
		// 	for (let i = 0; i < handCount; i++) {
		// 		let shoupai = this.createPai(baoCard);
		// 		shoupai.x = x;
		// 		x += shoupai.width * shoupai.scaleX - 0.75;
		// 		shoupai.showLaiziImage();
		// 	}
		// 	// handCards = { 12: 2, 13: 3, 14: 2 };
		// 	for (let key in handCards) {
		// 		if (key == baoCard + "") {
		// 			continue
		// 		}
		// 		let handCount = handCards[key];
		// 		for (let i = 0; i < handCount; i++) {
		// 			let shoupai = this.createPai(Number(key));
		// 			shoupai.x = x;
		// 			x += shoupai.width * shoupai.scaleX - 0.75;
		// 		}
		// 	}
		// 	//间隔
		// 	x += 5;
		// 	let huCards = playerData.huCards;//number	
		// 	// huCards = [13];
		// 	let shoupai = this.createPai(huCards[0]);
		// 	shoupai.showHuImage();
		// 	shoupai.x = x;
		// 	x += shoupai.width * shoupai.scaleX - 0.75 + 5;

		// 	// let birdCards = this.settleData.birdCardInfo;
		// 	// for (let i = 0; i < birdCards.length; i++) {
		// 	// 	let shoupai = this.createPai(Number(birdCards[i]));
		// 	// 	shoupai.x = x;
		// 	// 	x += shoupai.width * shoupai.scaleX - 0.75;
		// 	// 	shoupai.showOtherImageByRes("hnmj_icon_bird_png");
		// 	// }

		// }