module majiang {
	export abstract class BaseMajiangScene extends game.BaseGameScene {
		//剩余多少牌
		protected syLabel: eui.BitmapLabel;
		//我手牌UI
		abstract mineShoupaiGroup;;
		//我出牌UI
		protected mineChupaiGroup: MineChupaiGroup;

		protected topChupaiGroup: TopChupaiGroup;

		protected leftChupaiGroup: LeftChupaiGroup;

		protected rightChupaiGroup: RightChupaiGroup;
		//计时器组件
		protected timeDirectionBar: TimerDirectionBar;
		//上家手牌UI
		protected leftShoupaiGroup: LeftShoupaiGroup;
		//右侧玩家手牌UI
		protected rightShoupaiGroup: RightShoupaiGroup;
		//对家手牌UI
		protected topShoupaiGroup: TopShoupaiGroup;

		protected leftGroup: eui.Group;

		protected rightGroup: eui.Group;

		protected mineGroup: eui.Group;

		protected topGroup: eui.Group;

		protected directions: any;

		protected leftPgGroup: MjLeftGroup;

		protected rightPgGroup: MjRightGroup;

		protected topPgGroup: MjTopGroup;

		protected minePgGroup: MjMineGroup;

		abstract touchShoupai;
		//最大手牌可以同时选定
		protected maxTouchShoupai: number = 0;
		//胡牌group
		protected mineHupaiGroup: MajiangHupaiGroup;
		protected leftHupaiGroup: MajiangHupaiGroup;
		protected rightHupaiGroup: MajiangHupaiGroup;
		protected topHupaiGroup: MajiangHupaiGroup;
		//胡牌展示group
		protected leftHuShowGroup: LeftShowPai;
		protected rightHuShowGroup: RightShowPai;
		protected topHuShowGroup: TopShowPai;
		protected mineHuShowGroup: MineShowPai;

		protected chupaiTips: eui.Image;
		//右上角功能按钮
		protected gnBtn: eui.Button;
		//功能组
		protected gnGroup: eui.Group;
		protected btn_shou: eui.Button;
		protected btn_set: eui.Button;
		protected btn_help: eui.Button;

		//----UI层级
		//ui麻将牌组
		protected uiGroup: eui.Group;
		//动画效果的group
		protected effectGroup: eui.Group;
		//弹出的层级
		protected panelGroup: eui.Group;

		protected mineKoupaiGroup: MineKoupai;
		//底注
		protected dizhu: eui.Label;
		//提示其他玩家正在选择。
		public otherChose: eui.Group;
		//房间信息
		protected roomIdLable: eui.Label;
		//x血流还是血战
		protected wanfaImage: eui.Image;

		protected lastChupai: eui.Component;

		protected effectGroup2: eui.Group;

		abstract startNumber: number;

		protected majiangStatus: MajiangStatusEnum;

		protected lockChupaiTimeout;

		/**
         * 听牌提示按钮
         */
		protected tipBtn: eui.Button;
        /**
         * 流水按钮
         */
		protected lsBtn: eui.Button;
        /**
         * 聊天按钮
         */
		protected chatBtn: eui.Button;

		abstract huTipsBar;

		protected recordBar: RecordBar;

		protected ctBar: ChatBar;

		/**
         * 检查任务状态
         */
		protected taskBar: MajiangTaskBar;
		//托管
		protected tgGroup: eui.Group;
		//取消托管
		protected qxtgBtn: eui.Button;

		//gm
		protected gmGroup: eui.Group;
		protected gmBtn: eui.Button;
		protected gmStop: eui.Button;
		protected gmRun: eui.Button;

		protected recordBtn: eui.Button;

		protected beforeShow: boolean = true;

		protected playerInfoPanel: MatchMJPlayerInfo;


		protected constructor() {
			super();
		}

		public onAdded() {
			super.onAdded();
			CF.aE(ENo.HEADER_TOUCH, this.headerTouch, this);
			CF.aE(ServerNotify.s_playerEmoji, this.s_playerEmoji, this);
			CF.aE(ENo.EMOJI_SEND, this.emojiSend, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.HEADER_TOUCH, this.headerTouch, this);
			CF.rE(ServerNotify.s_playerEmoji, this.s_playerEmoji, this);
			CF.rE(ENo.EMOJI_SEND, this.emojiSend, this);
		}

		protected async emojiSend(e: egret.Event) {
			let data = e.data;
			let index = data.index;
			let gold = data.gold
			let mineIndex = Global.gameProxy.getMineIndex();
			if (this.headerIndex == mineIndex) {
				TipsCompoment.instance.show("不能对自己使用表情.");
				return;
			}
			let roomInfo = Global.gameProxy.roomInfo;
			let sendData = {
				activityId: roomInfo.activityId,
				emojiId: index,
				from: mineIndex,
				to: this.headerIndex
			}
			let resp: any = await Global.pomelo.request(ServerPostPath.hall_userHandler_c_playerEmoji, sendData);
			if (resp.error && resp.error.code != 0) {
				Global.alertMediator.addAlert(resp.error.msg, null, null, true);
				return;
			}
			if (this.playerInfoPanel) {
				this.playerInfoPanel.visible = false;
			}
			if (resp.gold) {
				Global.playerProxy.playerData.gold = resp.gold;
			} else if (gold) {
				Global.playerProxy.playerData.gold -= gold;
			}
		}

		/**
		 * 玩家发送表情
		 * @param  {egret.Event} e
		 */
		public s_playerEmoji(e: any) {
			let data = e.data;
			let from = data.from;
			let to = data.to;
			let emojiId = data.emojiId;
			let fromHeader = this.getHeaderByDirection(from);
			let toHeader = this.getHeaderByDirection(to);
			let mcName = "emoji_" + emojiId;
			let db = new DBComponent(mcName, false);
			db.callback = () => {

			}
			SoundManager.getInstance().playEffect(`m_xzdd_e_sound${emojiId}_mp3`);
			this.touchGroup.addChild(db);
			db.x = fromHeader.localToGlobal().x + fromHeader.width / 2;
			db.y = fromHeader.localToGlobal().y + fromHeader.height / 3;
			db.play("animation1", 1);
			egret.Tween.get(db).to({
				x: toHeader.localToGlobal().x + fromHeader.width / 2,
				y: toHeader.localToGlobal().y + fromHeader.height / 3
			}, 300);
			this.setAutoTimeout(() => {
				db.play("animation2", 1);
				this.setAutoTimeout(() => {
					game.UIUtils.removeSelf(db);
				}, this, 1000);
			}, this, 300);
		}

		/**
		 * 玩家头像点击
		 */
		private headerIndex;
		protected headerTouch(e: egret.Event) {
			let roomInfo = Global.gameProxy.roomInfo;
			if (!roomInfo.emoji) {
				return;
			}
			// this.s_playerEmoji({ data: {} });
			// return;
			let data = e.data as WidgetHeader;
			if (!this.playerInfoPanel) {
				this.playerInfoPanel = new MatchMJPlayerInfo();
				this.touchGroup.addChild(this.playerInfoPanel);
			}
			let mineIndex = Global.gameProxy.getMineIndex();
			this.playerInfoPanel.visible = true;
			this.playerInfoPanel.x = data.localToGlobal().x;
			this.playerInfoPanel.y = data.localToGlobal().y;
			switch (data.direction) {
				case "mine":
					this.playerInfoPanel.x += 100;
					this.playerInfoPanel.y -= 70;
					break;
				case "left":
					this.playerInfoPanel.x += 100;
					this.playerInfoPanel.y -= 40;
					break;
				case "right":
					this.playerInfoPanel.x -= 300;
					this.playerInfoPanel.y -= 70;
					break;
				case "top":
					this.playerInfoPanel.x -= 100;
					this.playerInfoPanel.y += 100;
					break;

			}
			for (let key in this.directions) {
				if (this.directions[key] == data.direction) {
					this.headerIndex = key;
				}
			}
			this.playerInfoPanel.initPlayerInfo(data.playerInfo);
		}

		public createChildren() {
			super.createChildren();
			if (this.gmGroup) {
				if (ServerConfig.PATH_TYPE == PathTypeEnum.DEMO_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.WAI_PRODUCT || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
					this.gmGroup.visible = false;
				} else {
					this.gmGroup.visible = true;
				}
			}
			this.gnGroup.visible = false;
			if (this.recordBtn) {
				this.recordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.recordBtnTouch, this);
			}
			this.isClubGame = Global.gameProxy.roomInfo.tableId != undefined;
			this.isLuckeyGame = Global.gameProxy.roomInfo.backGold != undefined;
			if (this.isClubGame || this.isLuckeyGame) {
				if (!this.recordBtn.anchorOffsetX) {
					game.UIUtils.setAnchorPot(this.recordBtn);
				}
				this.recordBtn.visible = false;
				this.fullScreenBtn.x = this.recordBtn.x;
				this.fullScreenBtn.y = this.recordBtn.y;
			}
			if (this.isLuckeyGame) {
				this.showLuckPoint();
				this.luckyPoint.show();
			}
		}


		protected setLuckPointPos() {
			this.uiGroup.addChild(this.luckyPoint);
			this.luckyPoint.right = 15;
			this.luckyPoint.bottom = 112;
			this.luckyPoint.visible = false;
		}

		protected checkAllIsJihu() {
			let playerData = Global.gameProxy.getMineGameData();
			let flag = true;
			for (let key in playerData.tingCards) {
				let tingInfo = playerData.tingCards[key];
				if (tingInfo.fan > 2) {
					flag = false;
					break;
				}
			}
			if (flag) {
				this.showGameTipGroup(4);
			}
		}

		protected showMajiangTest() {
			let majiangTest = new MajiangTestScene();
			this.addChild(majiangTest);
			majiangTest.initData();
		}

		protected changGnBtnStat(e?: egret.Event) {
			this.gnBtn.visible = true;
			this.gnGroup.x = 2560;
		}

		public lsBtnTouch() {
			if (!this.recordBar) {
				this.recordBar = new RecordBar();
				this.panelGroup.addChild(this.recordBar);
			}
			if (this.recordBar.visible) {
				this.recordBar.hide();
				return;
			}
			this.recordBar.show();
			this.recordBar.bottom = 150;
			this.recordBar.right = 150;
		}

		/**
         * 倒计时推送
         * @param  {egret.Event} e
         */
		public countDownPush(e: egret.Event) {
			let resp = e.data;
			game.DateTimeManager.instance.updateServerTime(resp.start);
			if (Global.gameProxy.roomInfo) {
				Global.gameProxy.roomInfo.countdown = resp;
			}
		}

		/**
         * 牌局结束，暂时没有用。
         */
		protected roomGameOver(e: egret.Event) {
			super.roomGameOver(e);
			let resp = e.data;
			// this.restartBtn.visible = true;
			// this.restartBtn.alpha = 0;
			this.allowBack = false;
		}

		/**
		 * 游戏积分变化
		 * @param  {egret.Event} e
		 */
		public syncGoldPush(e: egret.Event) {
			let resp: any = e.data;
			this.setAutoTimeout(() => {
				this.syncGold(resp);
			}, this, 800);
		}

		//回显玩家胡碰杠的牌
		public publicCardChangedPush(e: egret.Event) {
			let resp = e.data;
			if (resp.cardNum == 55) {
				return;
			}
			if (resp.cardNum != this.getPaiqiangCount - 1) {
				game.PomeloManager.instance.disConnect();
			}
			// this.syLabel.text = resp.cardNum;
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
				Global.alertMediator.addAlert("对局已经结束", null, null, true);
				this.backHall();
				return;
			}
			let reqData = Global.gameProxy.lastGameConfig;
			if (!reqData) reqData = {};
			if (!Global.gameProxy.roomInfo || !Global.gameProxy.roomInfo.roomId) {
				this.backHall();
				return;
			}
			reqData.roomId = Global.gameProxy.roomInfo.roomId;
			this.reconnectCall(reqData, Global.gameProxy);
		}


		/**
		* 玩家过操作
		*/
		protected passTaskPush(e: egret.Event) {
			let resp = e.data;
			let playerIndex = resp.playerIndex;
			if (Global.gameProxy.checkIndexIsMe(playerIndex)) {
				this.taskBar.hideAllBtns();
			}
		}


		/**
         * 清除倒计时
         * @param  {egret.TouchEvent} e
         */
		protected clearCountDown() {
			if (Global.gameProxy.roomInfo) {
				Global.gameProxy.roomInfo.countdown = null;
			}
			this.taskBar.visible = false;
		}


		/**
		 * 托管推送
		 * @param  {egret.TouchEvent} e
		 */
		protected tuoguanStatusPush(e: egret.TouchEvent) {
			let resp = e.data;
			this.tgGroup.visible = resp.isTrustee;
		}

		/**
         * 给玩家广播消息。
         */
		protected sendMessage(e: egret.TouchEvent) {
			let data = e.data;
			let playerIndex = data.playerIndex;
			let message = data.message;
			let direction = this.directions[playerIndex];
			let header: WidgetHeader = this[direction + 'Header'];
			if (MajiangConfig.msgType.Word == data.type) {
				for (let i = 0; i < MajiangConfig.commonMessage.length; i++) {
					let item = MajiangConfig.commonMessage[i];
					if (item["id"] == message) {
						header.showMsgAndImg(direction, item["message"], message, playerIndex, 0);
					}
				}
			} else {
				header.showMsgAndImg(direction, 0, 0, 0, message);
			}
		}

		/**
		 * 取消托管
		 */
		protected async cacelTuoguan() {
			var handler = ServerPostPath.game_mjHandler_c_cancelTrustee;
			let resp: any = await game.PomeloManager.instance.request(handler, null);
		}

		protected touchShoupaiClear() {
			if (this.touchShoupai) {
				this.touchShoupai.selectDown();
				this.touchShoupai = null;
				CF.dP(ENo.FIND_COLOR, 0);
			}
		}

		/**
		 * 玩家碰牌
		 * {"playerIndex":1,"from":2,"card":12}
		 * @param  {egret.Event} e
		 */
		protected playerPengCardPush(e: egret.Event) {
			let resp = e.data;
			let playerIndex = resp.playerIndex;
			let from = resp.from;
			let color = resp.card;
			this.taskBar.hideAllBtns();
			//记录玩家碰牌
			Global.gameProxy.recordPlayerPengs(playerIndex, resp.card, resp.from);
			//碰牌吧最后一张出牌UI删掉
			Global.gameProxy.recordChu2Dianpao(from);
			let lastDirection = this.directions[from];
			this[lastDirection + "ChupaiGroup"].removeLastChupai();
			let playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
			//以上玩家数据修改 以下 玩家UI修改
			let direction = this.directions[playerIndex];
			//调用碰
			this[direction + "ShoupaiGroup"].removeShoupaiByPeng(color);
			//播放碰牌动画
			this.addEffectAni(direction, "peng");
			this.hideChupaiTips();
			switch (direction) {
				case "left":
					//这里Add方法里面的两个参数第一个是1，2，3.1代表碰，2明杠，3暗杠。   color是牌面的花色值,还有个可选参数pbg?即碰变杠。
					this.leftShoupaiGroup.changeLast2Mopai(0);
					let pg = this.leftPgGroup.add(5, color);
					this.showPengAni(pg, 55, 55);
					break;
				case "right":
					this.rightShoupaiGroup.changeLast2Mopai(0);
					let pg1 = this.rightPgGroup.add(5, color);
					this.showPengAni(pg1, 40, 55);
					break;
				case "top":
					this.topShoupaiGroup.changeLast2Mopai(0);
					let pg2 = this.topPgGroup.add(5, color);
					this.showPengAni(pg2, 55, 55);
					break;
				case "mine":
					this.touchShoupaiClear();
					this.mineShoupaiGroup.sortShoupais();
					this.mineShoupaiGroup.changeLast2Mopai();
					this.hideBars();
					this.taskBar.hideAllBtns();
					let pg3 = this.minePgGroup.add(5, color);
					this.showPengAni(pg3, 80, 55);
					this.mineShoupaiGroup.checkHuTips();
					Global.gameProxy.roomInfo.curPlay = Global.gameProxy.getMineIndex();
					this.checkShowTips();
					break;
			}
		}


		abstract checkTask();
		/**
          * 玩家task推送
          * @param  {egret.Event} e
          */
		protected hangupTaskPush(e: egret.Event) {
			let resp: any = e.data;
			let mine = Global.gameProxy.getMineGameData();
			mine.hidePass = resp.hidePass;
			mine.hangupTasks = resp.task;
			mine.taskIndex = resp.taskIndex;
			this.clearTingStatus()
			Global.gameProxy.roomInfo.hangupTaskSource = {};
			this.checkTask();
			this.checkHuTips();
		}

		public clearTingStatus() {

		}

		protected createTaskBar() {
			if (!this.taskBar) {
				this.taskBar = new MajiangTaskBar();
				this.touchGroup.addChild(this.taskBar);
				this.taskBar.width = 520;
				this.taskBar.height = 132;
				this.taskBar.setRoot(this);
				this.taskBar.right = 230;
				this.taskBar.bottom = 160;
			}
		}

		/**
         * 胡碰杠
         * @param  {} direction
         * @param  {} effectName
         */
		protected addEffectAni(direction, effectName) {
			if (Global.runBack) {
				return;
			}
			GameCacheManager.instance.getMcCache(effectName, direction + "_" + effectName, (mv: egret.MovieClip) => {
				if (mv) {
					mv.scaleX = mv.scaleY = 1.2;
					let mcCallback = () => {
						mv.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, this);
						game.UIUtils.removeSelf(mv);
					}

					mv.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, this);
					this.effectGroup.addChild(mv);
					switch (direction) {
						case "mine":
							mv.x = GameConfig.curWidth() * 0.5;
							mv.y = GameConfig.curHeight() * 0.75;
							break;
						case "left":
							mv.x = GameConfig.curWidth() * 0.22;
							mv.y = GameConfig.curHeight() * 0.4;
							break;
						case "right":
							mv.x = GameConfig.curWidth() * 0.77;
							mv.y = GameConfig.curHeight() * 0.4;
							break;
						case "top":
							mv.x = GameConfig.curWidth() * 0.5;
							mv.y = GameConfig.curHeight() * 0.2;
							break;
					}
					mv.gotoAndPlay(1, 1);
				}
			});

		}

		protected checkGangError() {



		}

		/**
         * 显示出牌group
         */
		public renderChupaiGroups() {
			this.mineChupaiGroup.visible = true;
			this.mineChupaiGroup.clearDatas();
			let data = [];
			this.mineChupaiGroup.createByArr(data)

			this.leftChupaiGroup.visible = true;
			this.leftChupaiGroup.clearDatas();
			this.leftChupaiGroup.createByArr(data);

			this.topChupaiGroup.visible = true;
			this.topChupaiGroup.clearDatas();
			this.topChupaiGroup.createByArr(data);

			this.rightChupaiGroup.visible = true;
			this.rightChupaiGroup.clearDatas();
			this.rightChupaiGroup.createByArr(data);
		}


		protected hideChupaiTips() {
			this.lastChupai = null;
			if (this.chupaiTips) {
				this.chupaiTips.visible = false;
				egret.Tween.removeTweens(this.chupaiTips);
			}
		}

		/**
		 * 碰牌的一个动画
		 * @param  {eui.Component} penggang
		 * @param  {} x
		 * @param  {} y
		 */
		protected showPengAni(penggang: eui.Component, x, y) {
			let db = new DBComponent("mj_peng");
			db.x = penggang.localToGlobal().x + x;
			db.y = penggang.localToGlobal().y + y;
			db.callback = () => {
				game.UIUtils.removeSelf(db)
				db = null;
			};
			this.effectGroup2.addChild(db);
			db.playByFilename(1);
		}


		abstract playerGangCard(e: egret.Event);


		//---回显玩家打过的牌
		protected reloadPlayerChupais() {
			let players = Global.gameProxy.getPlayers();
			for (let key in players) {
				let playerData: PlayerGameDataBean = players[key];
				let direction = this.directions[key];
				this[direction + 'PgGroup'].removeChildren();
				this[direction + "ChupaiGroup"].createByArr(playerData.playCards || [])
			}
			this.reloadPlayerPengs();
			// egret.setTimeout(()=>{
			// 	this.showLastPlayCard();
			// }, this, 100);
		}
		//---回显玩家打过的牌

		/**
         * 回显玩家碰牌
         */
		protected reloadPlayerPengs() {
			let players = Global.gameProxy.getPlayers();
			for (let key in players) {
				let playerData: PlayerGameDataBean = players[key];
				let direction = this.directions[key];
				let pengs = playerData.pengCards;
				for (let i = 0; i < pengs.length; i++) {
					this[direction + 'PgGroup'].add(5, pengs[i], 2);
				}
			}
			this.reloadPlayerGangs();
		}

        /**
         * 回显玩家杠牌
         */
		protected reloadPlayerGangs() {
			let players = Global.gameProxy.getPlayers();
			for (let key in players) {
				let playerData: PlayerGameDataBean = players[key];
				let direction = this.directions[key];
				let pengs = playerData.gangCards;
				for (let i = 0; i < pengs.length; i++) {
					this[direction + 'PgGroup'].add(pengs[i].gang, pengs[i].card, 2);
				}
			}
			this.reloadPlayerChis();
		}

		/**
		 * 回显玩家吃牌
		 */
		protected reloadPlayerChis() {
			let players = Global.gameProxy.getPlayers();
			for (let key in players) {
				let playerData: PlayerGameDataBean = players[key];
				let direction = this.directions[key];
				let chiCards = playerData.chiCards || [];
				for (let i = 0; i < chiCards.length; i++) {
					let chiItem = this[direction + 'PgGroup'].add(5, chiCards[i].selectCard, 2) as BasePGItem;
					chiItem.peng2Chi(chiCards[i].selectCard);
				}
			}
		}


		abstract paiQiang;
		//--回显玩家胡碰杠的牌

		//---更新剩余牌
		protected updateSypai() {
			this.syLabel.text = this.paiQiang.getPaiQiangNum();//Global.gameProxy.addPublicCardPush(num) + "";
		}
		/**this is a Test */
		public get getPaiqiangCount() {
			let paiqiang = this.paiQiang as PaiQiangComponent
			return paiqiang.getPaiQiangNum();
		}

		protected showLastPlayCard() {
			let roomInfo = Global.gameProxy.roomInfo;
			let lastPlayCardIndex = roomInfo.lastPlayCardIndex;
			if (lastPlayCardIndex < 1) {
				return;
			}
			let dir = this.directions[lastPlayCardIndex];
			let chupaiGroup = this[`${dir}ChupaiGroup`] as BaseChupaiGroup;
			if (!chupaiGroup) {
				return;
			}
			let card = chupaiGroup.getLastChuipai() as eui.Component;
			if (!card) {
				return;
			}
			let pos = card.localToGlobal() as any;
			this.showChupaiTips(pos, dir);
		}

		/**
         * 显示出牌的提示
         * @param  {eui.Component} image
         */
		protected showChupaiTips(image: eui.Component, dirction: string) {
			if (!this.chupaiTips) {
				this.chupaiTips = new eui.Image("img_cptip_png");
				this.effectGroup.addChild(this.chupaiTips);
			}
			egret.Tween.removeTweens(this.chupaiTips);
			this.chupaiTips.visible = true;
			let lastChupai = this[`${dirction}ChupaiGroup`].getLastChuipai();
			if (lastChupai) {
				lastChupai.addChild(this.chupaiTips);
				switch (dirction) {
					case "mine":
						this.chupaiTips.x = lastChupai.width / 2 - 39 / 2;
						this.chupaiTips.y = - 10;
						break;
					case "left":
						this.chupaiTips.x = lastChupai.width / 2 - 39 / 2;
						this.chupaiTips.y = - 20;
						break;
					case "right":
						this.chupaiTips.x = lastChupai.width / 2 - 39 / 2;
						this.chupaiTips.y = - 20;
						break;
					case "top":
						this.chupaiTips.x = lastChupai.width / 2 - 39 / 2;
						this.chupaiTips.y = -5;
						break;
				}
			}
			let y = this.chupaiTips.y;
			egret.Tween.get(this.chupaiTips, { loop: true }).to({
				y: y - 3
			}, 1000).to({
				y: y
			}, 1000);
		}


		/**
		* 开始发牌动画
		*/
		protected fapaiAni() {
			this.majiangStatus = MajiangStatusEnum.FAPAI;
			//庄家几号位
			this.syLabel.text = this.startNumber + "";
			Global.gameProxy.roomInfo.publicCardNum = this.startNumber;
			let zhuangIndex = Global.gameProxy.roomInfo.dealer;
			let sortDir = MajiangUtils.getDirectionSortByZhuang(zhuangIndex);
			//开始第一轮发牌
			this.fapaiRound1(sortDir);
		}

        /**
         * 4张牌4张牌落下动画
         * @param  {} num
         */
		protected mineFapaiAni(num) {
			let mineNum = this.mineShoupaiGroup.mainGroup.numChildren;
			for (let i = num; i < num + 4; i++) {
				// this.paiQiang.removeNumByIndex();
				let minePai = this.mineShoupaiGroup.mainGroup.getChildByName("mj" + i) as MineShoupai;
				if (minePai && minePai.value) {
					let y = minePai.y;
					minePai.visible = true;
					if (!Global.runBack) {
						minePai.y -= minePai.height / 2;
						egret.Tween.get(minePai).to({
							y: y
						}, game.UIUtils.getTweenTime(150));
					}
				}
			}
		}

        /**
         * 其他人得手牌，改变visible属性
         * @param  {} index
         * @param  {} num
         */
		protected otherFapaiAni(index, num) {
			let direction = this.directions[index];
			let mineNum = this[direction + 'ShoupaiGroup'].mainGroup.numChildren;
			for (let i = num; i < num + 4; i++) {
				// this.paiQiang.removeNumByIndex();
				let minePai = this[direction + 'ShoupaiGroup'].mainGroup.getChildByName("mj" + i);
				if (minePai) {
					minePai.visible = true;
				}
			}
		}

        /**
         * 展现剩余的牌数量
         */
		protected showShengyuPai() {
			this.syLabel.text = Global.gameProxy.roomInfo.publicCardNum.toString();
		}


		//----回显胡牌 
		protected getHupaiArrByHuTask(playerIndex) {
			let roomInfo = Global.gameProxy.roomInfo;
			let huTasks = roomInfo.huTasks;
			let huTaskGroup = _.groupBy(huTasks, "playerIndex");
			let findArr = huTaskGroup[playerIndex];
			return findArr || [];
		}

		/**
		* 检查玩家是已经输光
		*/
		protected checkPlayerIsOver() {
			let players = Global.gameProxy.roomInfo.players;
			for (let playerIndex in players) {
				let player = players[playerIndex] as PlayerGameDataBean;
				if (player.gold <= 0) {
					let direction = this.directions[playerIndex];
					this.createRenshuFont(direction);
					if (Global.gameProxy.roomInfo.publicCardNum != 0) {
						this.huPaiOrGameOver(direction);
					}
				}
			}
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

		/**
         * 检查托管状态
         */
		protected checkTrusteeStatus() {
			let mineData = Global.gameProxy.getMineGameData();
			this.tgGroup.visible = mineData.isTrustee == true;
		}

        /**
         * 第一轮发牌
         */
		protected fapaiRound1(sortDir) {
			let fapaiCall = (index) => {
				if (index == Global.gameProxy.playerInfo.playerIndex + "") {//Global.gameProxy.playerInfo.playerIndex){
					this.mineFapaiAni(1);
				} else {
					this.otherFapaiAni(index, 1)
				}
				this.updateSypai();
				this.removePaiQiang(4);
			}
			if (Global.runBack) {
				for (let i = 0; i < sortDir.length; i++) {
					fapaiCall(sortDir[i]);
				}
				this.fapaiRound2(sortDir);
			} else {
				async.eachSeries(sortDir, (index, callback) => {
					fapaiCall(index);
					this.setAutoTimeout(callback, this, GameConfig.time_config['200']);
				}, () => {
					this.fapaiRound2(sortDir);
				})
			}
		}

		protected removePaiQiang(length) {
			for (var i = 0; i < length; i++) {
				this.paiQiang.removeNumByIndex();
			}
		}

        /**
         * 第二轮发牌
         */
		protected fapaiRound2(sortDir) {
			let fapaiCall = (index) => {
				if (index == Global.gameProxy.playerInfo.playerIndex + "") {//Global.gameProxy.playerInfo.playerIndex){
					this.mineFapaiAni(5);
				} else {
					this.otherFapaiAni(index, 5)
				}
				this.updateSypai();
				this.removePaiQiang(4);
			}
			if (Global.runBack) {
				for (let i = 0; i < sortDir.length; i++) {
					fapaiCall(sortDir[i]);
				}
				this.fapaiRound3(sortDir);
			} else {
				async.eachSeries(sortDir, (index, callback) => {
					fapaiCall(index);
					this.setAutoTimeout(callback, this, GameConfig.time_config['200']);
				}, () => {
					this.fapaiRound3(sortDir);
				})
			}
		}


        /**
         * 第三轮发牌
         */
		protected fapaiRound3(sortDir) {
			let fapaiCall = (index) => {
				if (index == Global.gameProxy.playerInfo.playerIndex + "") {//Global.gameProxy.playerInfo.playerIndex){
					this.mineFapaiAni(9);
				} else {
					this.otherFapaiAni(index, 9)
				}
				this.updateSypai();
				this.removePaiQiang(4);
			}

			if (Global.runBack) {
				for (let i = 0; i < sortDir.length; i++) {
					fapaiCall(sortDir[i]);
				}
				this.fapaiRound4(sortDir);
			} else {
				async.eachSeries(sortDir, (index, callback) => {
					fapaiCall(index);
					this.setAutoTimeout(callback, this, GameConfig.time_config['200']);
				}, () => {
					this.fapaiRound4(sortDir);
				})
			}
		}

		/**
        * 第四轮发牌，发完牌过后吧主玩家手牌顺序排序
        */
		abstract fapaiRound4(sortDir);
		abstract fapaiRoundOver();
		/**
         * 手动适配组件位子
         */
		public eventResize(data?: any) {
			super.eventResize();
			if (egret.Capabilities.isMobile) {
				if (GameConfig.WINSIZE_BILI_WIDTH >= 1) {
					this.mineGroup.scaleX = this.mineShoupaiGroup.scaleY = GameConfig.WINSIZE_BILI_WIDTH;
					this.mineGroup.bottom = 0;
				}
			}
			if (this.chupaiTips) {
				this.chupaiTips.visible = false;
			}
		}


		/**
         * 牌局开始的动画
         * @param  {} callback
         */
		protected showStartAni(callback) {
			let mc: egret.MovieClip = GameCacheManager.instance.getMcCache("start", "mine_start", null);//game.MCUtils.getMc("start")
			this.effectGroup.addChild(mc);
			mc.x = GameConfig.curWidth() / 2 + 5;
			mc.y = GameConfig.curHeight() * 0.42;
			let mcCallback = () => {
				mc.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, this);
				game.UIUtils.removeSelf(mc);
			}
			this.setAutoTimeout(callback, this, 500);
			mc.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, this);
			mc.play(1);
		}



		public updateGold() {
			this['mineHeader'].updateGold(Global.playerProxy.playerData.gold);
		}

		/**
         * 更新该谁打牌
         * 
         * {"curPlay":2,"newCard":true}
         * @param  {egret.TouchEvent} e
         */
		protected roundMe: boolean = false;
		protected curPlayPush(e: egret.TouchEvent) {
			let resp = e.data;
			this.maxTouchShoupai = 1;
			this.timeDirectionBar.showLightByDirection(this.directions[resp.curPlay]);
			Global.gameProxy.roomInfo.curPlay = resp.curPlay;
			this.checkOutPutByDirection();
			this.showHeaderTips(Global.gameProxy.roomInfo);
		}

		/**
         * 玩家出牌
         */
		public lockChupai: boolean = false;
		public async chupaiReq(touchShoupai) {
			this.majiangStatus = MajiangStatusEnum.BLANK;
			let pai = this.touchShoupai as MineShoupai;
			// this.touchShoupaiClear();
			let resp: any = await Global.pomelo.request('game.mjHandler.c_playCard', { card: pai.value, ting: false });
			if (resp && resp.error && resp.error.code == 0) {
				CF.dP(ENo.SHOUPAI_TOUCH_SUC, touchShoupai);
				this.majiangStatus = MajiangStatusEnum.OTHER_CHUPAI;
				// this.touchShoupaiClear();
			} else if (resp && resp.error && resp.error.code == -10101) {
				Global.pomelo.disConnect();
			} else if (resp && resp.error && resp.error.code == -10235) {
				Toast.launch("癞子牌不能打出~");
			} else {
				this.majiangStatus = MajiangStatusEnum.MINE_CHUPAI;
			}
		}


		protected chupaiCallback() {
			this.mineShoupaiGroup.hideMopai();
			Global.gameProxy.clearTasks();
			Global.gameProxy.clearCurPlay();
			this.mineShoupaiGroup.shoupaiDowns();
			if (this.mineShoupaiGroup.isMopais(this.mineShoupaiGroup.shoupais.length)) {
				this.mineShoupaiGroup.removeLastPai();
			}
		}

		/**
		* 展现header
		*/
		protected showHeaderTips(roomInfo) {
			for (let key in roomInfo.players) {
				this.getHeaderByDirection(key).showTip(game.Utils.valueEqual(key, roomInfo.curPlay));
			}
		}

		/**
         * 根据座位选择谁开始打牌
         */
		protected checkOutPutByDirection() {
			let roomInfo = Global.gameProxy.roomInfo;
			let curPlay = roomInfo.curPlay;
			let direction = this.directions[curPlay];
			if (direction == "mine") {
				this.majiangStatus = MajiangStatusEnum.MINE_CHUPAI;
			} else {
				this.majiangStatus = MajiangStatusEnum.OTHER_CHUPAI;
			}
		}


		abstract renderContent();

		protected addXZDDHuTip(from, playerIndex, ani = false) {

		}

		public renderHupaiGroup() {
			let roomInfo = Global.gameProxy.roomInfo;
			for (let key in roomInfo.players) {
				let player: PlayerGameDataBean = roomInfo.players[key];
				let direction = this.directions[key];
				let hupaiGroup: MajiangHupaiGroup = this[direction + "HupaiGroup"];
				hupaiGroup.removeChildren();
				hupaiGroup.initWithDirection(direction);
				hupaiGroup.visible = true;
				let huCardsArr = this.getHupaiArrByHuTask(key);
				if (huCardsArr && huCardsArr.length > 0) {
					this.addXZDDHuTip(huCardsArr[0].from, huCardsArr[0].playerIndex, true);
				}
				if (direction == "mine") {
					if (Global.gameProxy.roomInfo.gameId.indexOf("xlch") > -1 && huCardsArr.length > 0) {
						this.showGameTipGroup(3);
					}
				}
				// let hus = player.huCards || [];
				hupaiGroup.initWithArr(huCardsArr);
			}
		}

		/**
         * 在重新连接上来过后或者才发完手牌之后改变最后一张为摸牌
         * @param  {} direction
         */
		protected showShoupai(direction) {
			this[direction + "ShoupaiGroup"].changeLast2Mopai();
		}

		/**
         * 展示我的手牌
         */
		protected showShoupaiByMine(flag: boolean = true) {
			let cardsArr = Global.gameProxy.getMineShuopaiArr();
			if (!flag) {
				cardsArr = _.shuffle(cardsArr);
			}
			this.mineShoupaiGroup.initWithArr(cardsArr, flag);
		}

        /**
         * 显示其他玩家的手牌, 如果新创建则隐藏起来，做动画
         * @param  {number} index
         */
		protected showShoupaiByIndex(index: number, isVisible: boolean = true) {
			//显示重连
			let direction = this.directions[index];
			let mineData: PlayerGameDataBean = Global.gameProxy.getPlayerByIndex(index);
			if (direction == "mine") {
				this.showShoupaiByMine(isVisible);
				if (mineData.huCards.length > 0) {
					this.mineShoupaiGroup.lockHu();
				}
				return;
			}

			if (mineData) {
				if (mineData.cards && this[direction + 'ShoupaiGroup'].initWithCards) {
					this[direction + 'ShoupaiGroup'].initWithCards(index, isVisible);
					return;
				}
				let number = mineData.cardNum;
				this[direction + 'ShoupaiGroup'].initWithArr(number, isVisible);
			}
		}

		/**
        *  玩家回显胡牌展示。
        */
		protected backMovie() {
			let roomInfo = Global.gameProxy.roomInfo;
			for (let key in roomInfo.players) {
				let player: PlayerGameDataBean = roomInfo.players[key];
				let direction = this.directions[key];
				switch (direction) {
					case "left":
						if (player.huCards.length > 0) {
							this.huPaiOrGameOver(direction);
						}
						break;
					case "top":
						if (player.huCards.length > 0) {
							this.huPaiOrGameOver(direction);
						}
						break;
					case "right":
						if (player.huCards.length > 0) {
							this.huPaiOrGameOver(direction);
						}
						break;
				}
			}
		}


		/**
         * 正常胡牌与牌局结束牌面展示
         */
		protected huPaiOrGameOver(direction) {
			switch (direction) {//添加胡牌扣牌的效果。
				case "left":
					this.leftHuShowGroup.removeChildren();
					let lefts = new LeftShowPai(this.leftShoupaiGroup.shoupais, 1);
					this.leftHuShowGroup.addChild(lefts);
					this.leftHuShowGroup.visible = true;
					this.leftShoupaiGroup.shoupaisVisible();//手牌影藏。
					break;
				case "top":
					this.topHuShowGroup.removeChildren();
					let tops = new TopShowPai(this.topShoupaiGroup.shoupais, 1);
					this.topHuShowGroup.addChild(tops);
					this.topHuShowGroup.visible = true;
					this.topShoupaiGroup.shoupaisVisible();
					break;
				case "right":
					this.rightHuShowGroup.removeChildren();
					let rights = new RightShowPai(this.rightShoupaiGroup.shoupais, 1);
					this.rightHuShowGroup.addChild(rights);
					this.rightHuShowGroup.visible = true;
					this.rightShoupaiGroup.shoupaisVisible();
					break;
			}
		}

        /**
         * 显示换桌子按钮
         */
		protected checkShowrestartBtn() {
			if (this.isClubGame || this.isLuckeyGame) {
				return;
			}
			let roomInfo = Global.gameProxy.roomInfo;
			let notHuIndex = 0;
			for (let key in roomInfo.players) {
				if (roomInfo.players[key].huCards && roomInfo.players[key].huCards.length < 1) {
					notHuIndex++;
				}
			}
			this.checkShowTips();
			this.restartBtn.visible = !(notHuIndex == 1);
			//因某次需求 去掉提示
			//  && ServerConfig.PATH_TYPE != PathTypeEnum.WAI_PRODUCT
			if (this.restartBtn.visible) {
				let count = NativeApi.instance.showIsFirstLogin();
				// if (parseInt(count) % 3 == 1) {
					// this.showGameTipGroup2();
				// }
				NativeApi.instance.addPlayCount();
			}
		}


		/**
         * 创建金币减少
         * @param  {} direction
         * @param  {} value
         */
		protected createFontByDirection(direction, value) {
			if (Global.runBack) {
				return;
			}
			let text = NumberFormat.handleFloatDecimalStr(value);
			if (value >= 0) {
				text = "+" + text;
			} else {
				text = text + "";
			}
			let label = new eui.BitmapLabel(text);
			if (value >= 0) {
				label.font = "ying_font_fnt"; //RES.getRes("");
			} else {
				label.font = "shu_font_fnt";//RES.getRes("");
			}
			label.text = text;
			label.alpha = 0;
			label.scaleX = label.scaleY = 0.5;
			this.effectGroup.addChild(label);
			let pos = { x: 0, y: 0 };
			game.UIUtils.setAnchorPot(label);
			let endX;
			let endY;
			switch (direction) {
				case "mine":
					label.x = GameConfig.curWidth() * 0.5 + pos.x;
					label.y = GameConfig.curHeight() * 0.7 + pos.y;
					break;
				case "left":
					label.x = GameConfig.curWidth() * 0.28 + pos.x;
					label.y = GameConfig.curHeight() * 0.4 + pos.y;
					break;
				case "right":
					label.x = GameConfig.curWidth() * 0.72 + pos.x;
					label.y = GameConfig.curHeight() * 0.4 + pos.y;
					break;
				case "top":
					label.x = GameConfig.curWidth() * 0.5 + pos.x;
					label.y = GameConfig.curHeight() * 0.2 + pos.y;
					break;
			}

			egret.Tween.get(label).to({
				x: label.x + 30,
				alpha: 1
			}, 300).to({
				alpha: 0
			}, 1000);
			this.setAutoTimeout(() => {
				egret.Tween.removeTweens(label);
				game.UIUtils.removeSelf(label);
			}, this, 1300)
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
					Global.playerProxy.playerData.gold = info.ownGold;
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
				//输光了豆子
				if (info.isDefeat) {
					this.setAutoTimeout(() => {
						this.createRenshuFont(dirction);
						if (dirction == "mine") {
							this.mineShoupaiGroup.lockHu();
						}
						if (Global.gameProxy.roomInfo.publicCardNum != 0) {
							this.huPaiOrGameOver(dirction);
						}
					}, this, 1000);
				}
			}
		}


		/**
		* 展现漂分动画
		* type score
		* @param  {} scoreData
		*/
		protected showScoreAni(playerIndex, scoreData) {
			let directionStr = this.directions[playerIndex];
			if (Global.runBack) {
				let playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
				this.getHeaderByDirection(playerIndex).updateGold(playerData.gold);
				return;
			}
			let image = new eui.Image(RES.getRes("over_type_" + scoreData.type + "_png"));
			var _id = Global.gameProxy.roomInfo.gameId;
			if (_id == "gyzjmj") {
				image.scaleX = 0.6;
				image.scaleY = 0.6;
			}
			image.alpha = 0;
			game.UIUtils.resetAnchorPoint(image);
			this.effectGroup.addChild(image);
			game.UIUtils.setAnchorPot(image);
			switch (directionStr) {
				case "mine":
					image.x = GameConfig.curWidth() * 0.5;
					image.y = GameConfig.curHeight() * 0.7;
					break;
				case "left":
					image.x = GameConfig.curWidth() * 0.24;
					image.y = GameConfig.curHeight() * 0.4;
					break;
				case "right":
					image.x = GameConfig.curWidth() * 0.72;
					image.y = GameConfig.curHeight() * 0.4;
					break;
				case "top":
					image.x = GameConfig.curWidth() * 0.5
					image.y = GameConfig.curHeight() * 0.2
					break;
			}
			if (scoreData.score > 0) {
				image.visible = false;
			}
			egret.Tween.get(image).to({ alpha: 1, x: image.x + 50 }, 300).wait(1000).call(() => {
				game.UIUtils.removeSelf(image);
                /**
                 * @param  {} directionStr
                 */
				if (_id == "gyzjmj") return;
				this.createFontByDirection(directionStr, scoreData.score);
				let playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
				this.getHeaderByDirection(playerIndex).updateGold(playerData.gold);
			}, this)
			// }
		}

		/**
         * 获取玩家头像
         * @param  {number} index
         */
		protected getHeaderByDirection(index): WidgetHeader {
			return this[this.directions[index] + "Header"]
		}

		/**
         * 获取玩家头像
         * @param  {number} index
         */
		protected getHeader(direction): WidgetHeader {
			return this[direction + "Header"];
		}
		/**
         * 牌局结束显示自己手上的牌。
         */
		protected gameOverShow(players) {
			for (var key in players) {
				let data = players[key]
				if (Global.gameProxy.checkIndexIsMe(key)) {
					let mines = new MineShowPai(data["handCards"], 2);
					this.mineHuShowGroup.addChild(mines);
					this.mineHuShowGroup.visible = true;
					this.mineGroup.removeChildren();
				} else {
					this.showOthers(data, key);
				}
			}
		}

		/**
         * 牌局结束显示别人手上的牌。
         */
		protected showOthers(data, key) {
			//this.directions = MajiangUtils.getDirectionByMine(Global.gameProxy.getMineIndex());
			var players = Global.gameProxy.getPlayers();
			switch (this.directions[key]) {
				case "left":
					this.leftHuShowGroup.removeChildren();
					let lefts = new LeftShowPai(data["handCards"], 2);
					this.leftHuShowGroup.addChild(lefts);
					this.leftHuShowGroup.visible = true;
					this.leftGroup.removeChildren();
					break;
				case "top":
					this.topHuShowGroup.removeChildren();

					let tops = new TopShowPai(data["handCards"], 2);
					this.topHuShowGroup.addChild(tops);
					this.topHuShowGroup.visible = true;
					this.topGroup.removeChildren();
					break;
				case "right":
					this.rightHuShowGroup.removeChildren();
					let rights = new RightShowPai(data["handCards"], 2);
					this.rightHuShowGroup.addChild(rights);
					this.rightHuShowGroup.visible = true;
					this.rightGroup.removeChildren();
			}
		}


		protected chatBtnTouch() {
			if (!this.ctBar) {
				this.ctBar = new ChatBar();
				this.panelGroup.addChild(this.ctBar);
			}

			if (this.ctBar.visible) {
				this.ctBar.hide();
				return;
			}
			this.ctBar.show();
			this.ctBar.scaleX = this.ctBar.scaleY = 1.5
			this.ctBar.x = GameConfig.curWidth() * 0.8 - this.ctBar.width;
			this.ctBar.y = GameConfig.curHeight() * 0.7 - this.ctBar.height;
		}

		protected hideBars() {
			if (this.recordBar) {
				this.recordBar.hide();
			}
			if (this.huTipsBar) {
				this.huTipsBar.hideBar();
			}
			if (this.ctBar) {
				this.ctBar.hideBar();
			}
			if (this.playerInfoPanel) {
				this.playerInfoPanel.visible = false;
			}
		}

		/**
	   * 抢杠胡牌
	   */
		protected g2p: number = 0;
		protected qiangGangHu(e: egret.TouchEvent) {
			this.g2p = 1;
			let resp = e.data;
			let direction = this.directions[resp.playerIndex];
			let color = resp.gangInfo["card"];
			this[direction + 'PgGroup'].add(5, color, 3);
			if (direction == "mine") {
				Global.gameProxy.changeGang2Peng(color);
				this.checkHuTips();
			}
		}


		/**
		 * 四川麻将专用
		 */
		protected gameTipsGroup: eui.Group;
		protected gameTipsLabel: eui.Label;
		protected gameTipTimeOut;
		protected currentTipsType: number;
		protected gameTipsLabel2: eui.Label;
		protected gameTipsGroup2: eui.Group;
		protected checkHuTips() { };
		protected createHJZYByDirection(direction, value) { }
		protected checkShowTips() { };
		protected showGameTipGroup2() {
			this.gameTipsGroup2.visible = true;
			this.gameTipsLabel2.text = "牌局结束前离开可能收不到退税的收入";
			this.gameTipsGroup2.visible = true;
			this.gameTipsGroup2.alpha = 1;
		}

		private showType1: boolean = false;
		protected showGameTipGroup(type) {
			if (this.currentTipsType == 3) {
				return;
			}
			if (type == 1 && this.showType1) {
				return;
			}
			this.currentTipsType = type;
			this.clearAutoTimeout(this.gameTipTimeOut);
			egret.Tween.removeTweens(this.gameTipsGroup);
			this.gameTipsGroup.visible = true;
			this.gameTipsGroup.alpha = 1;
			if (type == 1) {
				this.showType1 = true;
				this.gameTipsLabel.text = "你是庄家,请先出牌";
			} else if (type == 2) {
				this.gameTipsLabel.text = "牌局结束未打完缺牌会被扣分哦";
			} else if (type == 3) {
				this.gameTipsLabel.text = "胡牌后将由系统代打";
			} else if (type == 4) {
				this.gameTipsLabel.text = "鸡胡只能自摸或抢杠胡";
			}
			if (type != 3) {
				this.gameTipTimeOut = this.setAutoTimeout(() => {
					this.closeGameTipsGroup();
				}, this, 2000);
			}
		}
		/**杭州麻将的Tips提示*/
		protected showHZMJGameTips(type: number) {

		}

		protected closeGameTipsGroup() {
			if (this.currentTipsType == 3) {
				return;
			}
			this.clearAutoTimeout(this.gameTipTimeOut);
			this.gameTipTimeOut = null;
			egret.Tween.get(this.gameTipsGroup).to({
				alpha: 0
			}, 200).call(() => {
				this.gameTipsGroup.visible = false;
				this.gameTipsGroup.alpha = 1;
			})

		}
		/**
         * 玩家认输
         * @param  {} direction
         */
		protected createRenshuFont(direction) {
			let roomInfo = Global.gameProxy.roomInfo;
			if (roomInfo.publicCardNum < 1) {
				return;
			}
			//认输使用缓存
			let image = new eui.Image();
			image.source = RES.getRes("wz_rs_png");
			game.UIUtils.setAnchorPot(image);
			image.alpha = 0;
			this.effectGroup.addChild(image);
			switch (direction) {
				case "mine":
					image.horizontalCenter = 0;
					image.bottom = 120;
					break;
				case "left":
					image.left = 210;
					image.verticalCenter = -50;
					break;
				case "right":
					image.right = 210;
					image.verticalCenter = -50;
					break;
				case "top":
					image.horizontalCenter = 0;
					image.top = 100;
					break;
			}
			if (Global.runBack) {
				image.alpha = 1;
			} else {
				egret.Tween.get(image).to({
					alpha: 1
				}, 1000);
			}
			if (direction == "mine") {
				this.allowBack = true;
			}
		}

		protected helpBtnTouch() {
			BaseMajiangHelpScene.getInstance(`MajiangHelpSkin`, "mj_help", this.pmdKey).show();
		}

		protected settingBtnTouch() {
			CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "majiang" });
		}

		protected recordBtnTouch() {
			this.gnGroup.visible = false;
			this.gnBtn.visible = true;
			CF.sN(PanelNotify.OPEN_BASE_RECORD, this.pmdKey);
		}

		/**
		 * 杠牌UI回调
		 * @param  {} resp
		 * @param  {} direction
		 */
		protected gangCallbackUI(resp, direction) {
			//以上玩家数据修改 以下 玩家UI修改
			let pg = null;
			switch (resp.gang) {
				case 1://碰变杠,吊4个正面，巴雨
					switch (direction) {
						case "left":
							this.leftPgGroup.add(1, resp.card, 1);
							break;
						case "right":
							this.rightPgGroup.add(1, resp.card, 1);
							break
						case "top":
							this.topPgGroup.add(1, resp.card, 1);
							break;
						case "mine":
							this.minePgGroup.add(1, resp.card, 1);
							break;
					}

					break;
				case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
					switch (direction) {
						case "left":
							pg = this.leftPgGroup.add(4, resp.card);
							break;
						case "right":
							pg = this.rightPgGroup.add(4, resp.card);
							break
						case "top":
							pg = this.topPgGroup.add(4, resp.card);
							break;
						case "mine":
							pg = this.minePgGroup.add(4, resp.card);
							break;
					}
					break;
				case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
					switch (direction) {
						case "left":
							pg = this.leftPgGroup.add(2, resp.card);
							break;
						case "right":
							pg = this.rightPgGroup.add(2, resp.card);
							break
						case "top":
							pg = this.topPgGroup.add(2, resp.card);
							break;
						case "mine":
							pg = this.minePgGroup.add(2, resp.card);
							break;
					}

					break;
				case 3://碰变杠,调4个正面，这里是自己碰，别人点。
					switch (direction) {
						case "left":
							pg = this.leftPgGroup.add(3, resp.card);
							break;
						case "right":
							pg = this.rightPgGroup.add(3, resp.card);
							break;
						case "top":
							pg = this.topPgGroup.add(3, resp.card);
							break;
						case "mine":
							pg = this.minePgGroup.add(3, resp.card);
							break;
					}
					break;
			}

			if (pg) {
				switch (direction) {
					case "left":
						this.showPengAni(pg, 55, 55);
						break;
					case "right":
						this.showPengAni(pg, 40, 55);
						break;
					case "top":
						this.showPengAni(pg, 55, 55);
						break;
					case "mine":
						this.showPengAni(pg, 80, 55);
						break;
				}
			}
		}
	}

}