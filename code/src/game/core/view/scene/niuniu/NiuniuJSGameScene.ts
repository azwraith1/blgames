module niuniu {
	export class NiuniuJSGameScene extends NiuniuSGameScene {
		/**
	 * 打开游戏界面通知
	 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_NIUNIUJSGAMES;

		/**
		 * 关闭游戏界面通知
		 */
		public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_NIUNIUSELECT;

		/**
		 * 关闭当前界面通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_NIUNIUJSGAMES;

		/**
		 * 对应匹配界面通知
		 */
		public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_NIUNIU_JSMATCHING;
		public constructor() {
			super();
			this.skinName = "resource/skins/scene/niuniu/NiuniuJSGameSceneSkin.exml";
		}
		/**
		 * 结算
		 */
		protected roundSettlement(e: egret.Event) {
			//调用展示牌
			try {
				this.releaseKPUI();
				this.closeTipsGroup();
				let data = e.data;
				let roomInfo = Global.roomProxy.roomInfo as BaseRoomInfo;
				let keys = NiuniuUtils.getNNSort(roomInfo.dealer, Global.roomProxy.getPlayersLength());
				async.eachSeries(keys, (key, callback) => {
					let player = Global.roomProxy.getPlayerInfoByIndex(key);
					let ptn = player.roundPattern;
					let dir = this.directions[key];
					if (!Global.roomProxy.checkIndexIsMe(key)) {
						let resultCards = this.sortShoupai(player.handCards, player.selectCards);
						let list1 = this['cards' + dir] as NiuniuCardList1;
						list1.renderByList(resultCards);
					} else {
						let resultCards = this.sortShoupai(player.handCards, player.selectCards);
						let list1 = this['cards' + dir + "_" + dir] as NiuniuCardList1;
						list1.renderByList(resultCards);
					}
					this.setAutoTimeout(() => {
						let playerData = Global.roomProxy.getPlayerByIndex(key);
						if (playerData) {
							this.showNiu(ptn, dir);
							//播声音
							NiuniuUtils.playShowNiu(playerData.sex, ptn);
						}
					}, this, 100)
					//this.setAutoTimeout(() => {
					callback();
					// }, this, 1000);
				}, () => {
					this.setAutoTimeout(() => {
						this.goldAni(data);
					}, this, 1000)

				});
			} catch (e) {

			}
		}
		protected runXuanpaiStep() {
			let players = Global.roomProxy.getPlayers();
			this.qzBar.visible = false;
			this.yzBar.visible = false;
			this.cards1.addTouch();
			for (let key in players) {
				let player = players[key] as NNPlayerGameBean;
				let dirIndex = this.directions[key];
				let header = this.getHeaderByIndex(key) as NiuniuNewHeader;
				header.showBeishu(player.addAnte);
				if (Global.roomProxy.checkIndexIsMe(key)) {
					if (player.isPlayCards) {
						//选择了牌
						this.cards1_1.visible = true;
					} else {
						if (player.roundPattern == 13) {
							this.otherBtnGroups.visible = true;
							this.boomBtn.visible = true;

							//如果是自动模式
							if (NiuniuGuaJiConfig.Instance.autoStatus) {
								this.setAutoTimeout(() => {
									this.boomBtnTouch();
								}, this, this.autoDelayTime);
							}
						} else if (player.roundPattern == 14) {
							this.otherBtnGroups.visible = true;
							this.fiveBtn.visible = true;

							//如果是自动模式
							if (NiuniuGuaJiConfig.Instance.autoStatus) {
								this.setAutoTimeout(() => {
									this.fiveBtnTouch();
								}, this, this.autoDelayTime);
							}
						} else {
							this.caculatorGroup.visible = true;
							//smart 加上倒计时
							this.timeBar.visible = true;

							this.cards1.visible = true;
							this.cards1.renderByList(player.handCards);

							//如果是自动模式
							if (NiuniuGuaJiConfig.Instance.autoStatus) {
								this.setAutoTimeout(() => {
									//this.autoSelectCards();
									this.tpBtnTouchEnd();
								}, this, this.autoDelayTime);
							}
						}
					}
				} else {
					let cards = this['cards' + this.directions[key]] as NiuniuCardList1;
					cards.renderByList(5);
					cards.visible = true;
				}
			}
		}



		/**
		 * 服务器推送什么牌型  8
		 */
		protected playCards(e: egret.Event) {
			//展示有牛没牛，但是不给其他玩家展示
			let data = e.data;
			let cards = data.handCards;
			let roundPattern = data.roundPattern;
			let selectCards = data.selectedCards;
			let index = data.playerIndex;
			let player = Global.roomProxy.getPlayerInfoByIndex(index);
			player.handCards = cards;
			player.roundPattern = roundPattern;
			player.selectCards = selectCards;
			/**
			 * 显示完成
			 */
			let dir = this.directions[index];
			// this["wc" + dir].visbile = true;
			this.showWc(index);
			if (Global.roomProxy.checkIndexIsMe(index)) {
				//是我
				this.hideTouch();
				this.cards1.delTouch();
				this.cards1.visible = false;
				this.cards1_1.visible = true;
				if (this.findNotChooseOver()) {
					this.closeTipsGroup();
					//this.timeBar.visible = false;
				} else {
					//	this.showTipsGroup("等待其他玩家选牛")
				}
			} else {
				this[`cards${dir}`].visible = true;
				if (this.findNotChooseOver()) {
					this.closeTipsGroup();
					//this.timeBar.visible = false;
				}
			}
		}
	}
}