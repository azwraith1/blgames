module bjle {
	export class BJLGameScene extends game.BaseGameScene {
		//路单模块1-6
		private ld1: BjlLd1Panel;
		private ld2: BjlLd2Panel;
		private ld3: BjlLd3Panel;
		private ld4: BjlLd4Panel;
		private ld5: BjlLd5Panel;
		private ld6: BjlLd6Panel;
		private pjbh: eui.Label;//牌局编号
		private dqjs: eui.Label;//当前局数
		private feipaiNums: eui.Label;//废牌数量
		private fpaiNums: eui.Label;//发牌器数量
		private mineheader: BJLMineHeader;
		private luckyheader: BJLPlayerHeader;
		private no1header: BJLPlayerHeader;
		private header2: BJLPlayerHeader;
		private header3: BJLPlayerHeader;
		private header4: BJLPlayerHeader;
		private header5: BJLPlayerHeader;//头像2-5号位
		private zpokerGroup: eui.Group;//庄家牌group
		private uiGroup: eui.Group;//UI层group
		//0-2
		private zpoker0: BJLPoker;
		private zpoker1: BJLPoker;
		private zpoker2: BJLPoker;//庄家牌0-2号
		private xpokerGroup: eui.Group;
		//0-2
		private xpoker0: BJLPoker;
		private xpoker1: BJLPoker;
		private xpoker2: BJLPoker;//闲家牌0-2号
		private roomState: eui.Image;//房间当前状态
		private timeBar: BJLTimeBar;//计时器
		private centerGroup: eui.Group;//押注区域group

		private gp1: eui.Group;//1-5号下注区域
		private war4: BJLHe;
		private war2: BJLXian;
		private war3: BJLZhuangDui;
		private war5: BJLXianDui;
		private war1: BJLZhuang;//1-5区域对象
		private playersBtn: eui.Button;//非场上玩家btn

		private yzbtn1: BJLCmBtn;//1-4号筹码押注
		private fapaiGroup: eui.Group;//发牌的位置
		private zdian: eui.BitmapLabel//庄家牌的点数
		private xdian: eui.BitmapLabel//闲家牌的点数
		private shuyinGroup: eui.Group;//展示输赢的group
		// private win_zi: eui.Image;
		// private win_bg: eui.Image;
		/**
		 * 背景音乐
		 */
		public bgMusic: string = "bjl_bg_mp3";

		//new
		/**
		 * 打开游戏界面通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_BJLGAME;

		/**
		 * 关闭游戏界面通知
		 */
		public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_BJLHALL;

		/**
		 * 关闭当前界面通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BJLGAME;

		/**
		 * 对应匹配界面通知
		 */
		public MATCHING_SCENE_NOTIFY: string = null;
		/**咪牌 */
		private miPai: bjle.BJLPokerMiPaiGroup;
		public constructor() {
			super();
			this.skinName = `BJLGameSceneSkin${CF.tis}`;
		}
		/**庄咪或者闲咪 */
		public get isZhuangMi() {
			let isZhungMi: number = MIPAI_DIRECTION.EMPTY;
			let zhuangBet = (this.war1 as BJLZhuang).Bet;
			let xianBet = (this.war2 as BJLXian).Bet;
			if (zhuangBet <= 0 && xianBet <= 0) {
				return isZhungMi;
			};
			if (zhuangBet < xianBet) {
				isZhungMi = MIPAI_DIRECTION.XIAN_MI;
			}
			else {
				isZhungMi = MIPAI_DIRECTION.ZHUANG_MI;
			}
			return isZhungMi;
		}
		/**断线 重绘咪牌ui */
		private rerenderMiPaiUI(reconnect) {
			if (!reconnect) return;
			this.miPai.visible = false;
			let roomInfo = Global.roomProxy.roomInfo;
			let mineData = Global.roomProxy.getMineData() as BJLRoomInfo;
			this.xianValue = roomInfo.idlePoint;
			this.zhuangValue = roomInfo.bankerPoint;
			this.mipaiXian = roomInfo.idleCard;
			this.mipaiZhuang = roomInfo.bankerCard;
			if (this.isZhuangMi != MIPAI_DIRECTION.EMPTY) {
				//新增牌 或者 首两张牌
				if (reconnect) {
					this.onLineCards(1);
					this.showPlayers();
					this.showHeaders();
					let isZhuang: number = this.isZhuangMi;
					if (roomInfo.roundStatus == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
						this.xpoker2.initWithNum(roomInfo.idleAddCards[0])
						this.changeRoomStatus(ROOM_STATUS1.MINI_IDLE_ADD_CARD);
						//this.roomState.source = "bjl_xmp_png";
						this.showZXPoker01();
						// if (roomInfo.idleAddCards.length == 0 && roomInfo.bankerAddCards.length == 0) {
						// 	this.showZhuangXianDian(roomInfo);
						// 	return;
						// }
						// if (roomInfo.idleAddCards.length == 0 || roomInfo.bankerAddCards.length == 0) {
						// 	this.pushXianAdd(roomInfo.idleAddCards, 0);
						// }
						if (roomInfo.idleAddCards.length > 0 && roomInfo.bankerAddCards.length > 0) {
							this.pushXianAdd(roomInfo.idleAddCards, 0);
						}
					}
					else if (roomInfo.roundStatus == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
						this.zpoker2.initWithNum(roomInfo.bankerAddCards[0]);
						this.showZXPoker01();
						this.changeRoomStatus(ROOM_STATUS1.MINI_BANKER_ADD_CARD);
						// this.roomState.source = "bjl_zmp_png";
						// if (roomInfo.idleAddCards.length == 0 || roomInfo.bankerAddCards.length == 0) {
						// 	this.pushZhuangAdd(roomInfo.bankerAddCards, 0);
						// }
						if (roomInfo.idleAddCards.length > 0 && roomInfo.bankerAddCards.length > 0) {
							this.xpoker2.initWithNum(roomInfo.idleAddCards[0]);
							if (!this.xpoker2.isZhengPoker && roomInfo.idleAddCards && roomInfo.idleAddCards.length > 0)
								this.addMiFanPai(1, this.xpoker2);
							this.pushZhuangAdd(roomInfo.bankerAddCards, 0);
						}
					}
					else if (roomInfo.roundStatus == ROOM_STATUS1.MINI_HAND_CARD) {
						this.miPai.visible = true;
						this.changeRoomStatus(ROOM_STATUS1.MINI_HAND_CARD);
						if (isZhuang == MIPAI_DIRECTION.ZHUANG_MI) {
							if (roomInfo.bankerInitCards && roomInfo.bankerInitCards.length > 0) {
								this.miPai.visible = true;
								this.miPai.setPokerValue(roomInfo.bankerAddCards, isZhuang);
							}
						}
						else if (isZhuang == MIPAI_DIRECTION.XIAN_MI) {
							if (roomInfo.idleInitCards && roomInfo.idleInitCards.length > 0) {
								this.miPai.visible = true;
								this.miPai.setPokerValue(roomInfo.idleAddCards, isZhuang);
							}
						}
					}

				}
			}
			else {
				if (reconnect) {
					this.onLineCards(1);
					this.showPlayers();
					this.showHeaders();
					//庄或则闲显示点数
					if (roomInfo.roundStatus == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
						this.zpoker2.initWithNum(roomInfo.bankerAddCards[0]);
						if (roomInfo.idleAddCards && roomInfo.idleAddCards.length > 0) {
							this.xpoker2.initWithNum(roomInfo.idleAddCards[0]);
						}
						this.showZXPoker01();
						if (!this.xpoker2.isZhengPoker && roomInfo.idleAddCards && roomInfo.idleAddCards.length > 0)
							this.addMiFanPai(1, this.xpoker2);
						this.buPaiAni_MI(2);
						this.changeRoomStatus(ROOM_STATUS1.MINI_BANKER_ADD_CARD);
					}
					else if (roomInfo.roundStatus == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
						this.xpoker2.initWithNum(roomInfo.idleAddCards[0]);
						this.showZXPoker01();
						this.buPaiAni_MI(1);
						this.changeRoomStatus(ROOM_STATUS1.MINI_IDLE_ADD_CARD);
					}
					else if (roomInfo.roundStatus == ROOM_STATUS1.MINI_HAND_CARD) {
						this.changeRoomStatus(ROOM_STATUS1.MINI_HAND_CARD);
					}
				}
			}

			this.timeBar.visible = true;
		}
		private setPokerAddValue() {

		}
		private hgtkInterval: any;
		private lockYZ: boolean = false;//锁定押注。
		public createChildren() {
			super.createChildren();
			FrameUtils.changeBgImage("./resource/gameAssets/bjl_hall/bjl_hall.jpg");
			this.showBtnsType(1);
			// let num3 = [1, 1, 5, 5, 3, 5, 5, 1, 1, 1, 3, 5, 5, 1, 1, 6, 5, 1, 1, 5, 5, 5, 9, 5, 6, 7, 5, 5, 6, 11, 6, 1, 5, 5, 1, 9, 1, 5, 5, 2, 1, 1, 9, 1, 1, 1, 1, 1]
			// this.ld1.testNums(num3);
			// this.ld2.testNums(num3);
			// this.ld3.testNums(num3);
			// this.ld4.testNums(num3);
			// this.ld5.testNums(num3);
			// this.ld6.zhangWin(num3);
			// this.ld6.xianWin(num3);
			// return;
			this.createDBComponents();
			this.init();
			this.timeBar.startTime(this);
			this.hgtkInterval = egret.setInterval(() => {
				if (this.lockYZ) {
					this.clearNormalJinbi();
				}
			}, this, 1000);
		}

		public onAdded() {
			super.onAdded();
			CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
			CF.aE(ENo.RBWAR_CM_TOUCH, this.rbwarTouch, this);
			CF.aE(ServerNotify.s_startNewRound, this.startNewRound, this);
			CF.aE(ServerNotify.s_roomInfo, this.s_roomInfo, this);
			CF.aE(ServerNotify.s_roomInitHandCards, this.roomInitHandCards, this);
			//CF.aE(ServerNotify.s_roomOpenCards, this.getNumsPokers, this);
			CF.aE(ServerNotify.s_roomStartBet, this.s_roomStartBet, this);
			CF.aE(ServerNotify.s_roomStopBet, this.s_roomStopBet, this);
			CF.aE(ServerNotify.s_playerBet, this.s_playerBet, this);
			CF.aE(ServerNotify.s_countdown, this.countdown, this);
			CF.aE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
			CF.aE(ServerNotify.s_VPlayerBet, this.vPlayerBet, this);
			CF.aE(ServerNotify.s_enterResult, this.s_enterResult, this);
			CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
			CF.aE(ServerNotify.s_kickGame, this.s_kickPlayer, this);
			CF.aE(ServerNotify.s_ruffleCard, this.s_ruffleCard, this);//洗牌
			CF.aE(ServerNotify.s_cardsNumInfo, this.s_cardsNumInfo, this);//牌的数量
			CF.aE(ServerNotify.s_sendWayBillInfo, this.s_sendWayBillInfo, this);//路单
			CF.aE(ENo.BJL_FANPAI, this.fanPai, this);//翻牌
			CF.aE(ServerNotify.s_miniAddCards, this.s_miniAddCards, this);//咪补牌
			CF.aE(ServerNotify.s_miniInitCards, this.s_miniInitCards, this);//咪手牌
		}
		private s_miniAddCards(e: egret.Event) {
			let num = e.data;
			let cloneData = JSON.parse(JSON.stringify(num))
			let roomInfo = Global.roomProxy.roomInfo;
			this.miPai.visible = false;
			if (cloneData.status == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
				this.changeRoomStatus(ROOM_STATUS1.MINI_IDLE_ADD_CARD);
			}
			else if (cloneData.status == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
				this.changeRoomStatus(ROOM_STATUS1.MINI_BANKER_ADD_CARD);
			}
			let cd1 = cloneData["camp1"];
			let cd2 = cloneData["camp2"];
			let addCardXian = cd1["addCards"];
			let addCardZhuang = cd2["addCards"];
			roomInfo.bankerCard = cd2["cards"];
			roomInfo.idleCard = cd1["cards"];
			roomInfo.idlePoint = cd1["value"];
			roomInfo.bankerPoint = cd2["value"];
			roomInfo.idleAddCards = cd1["addCards"];
			roomInfo.bankerAddCards = cd2["addCards"];
			this.xpaisValue(cd1["cards"]);
			this.zpaisValue(cd2["cards"]);
			this.showZXPoker01();
			let status: number = cloneData.status;
			if (status == ROOM_STATUS1.SETTLEMENT) {
				this.changeRoomStatus(ROOM_STATUS1.SETTLEMENT);
				this.showZhuangXianDian(roomInfo);
				return;
			}
			if (this.isZhuangMi == MIPAI_DIRECTION.EMPTY) {
				this.miPai.visible = false;
				if (status == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
					this.buPaiAni_MI(1);
				}
				else if (status == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
					//如果闲有补牌 把闲翻到正面
					if (addCardXian && addCardXian.length > 0) {
						if (!this.xpoker2.isZhengPoker)
							this.addMiFanPai(1, this.xpoker2);
					}
					this.buPaiAni_MI(2);
				}
				return;
			}
			if (addCardZhuang == undefined && addCardXian == undefined) {
				this.showZhuangXianDian(roomInfo);
				return;
			}
			if (addCardXian == undefined || addCardZhuang == undefined) {
				if (status == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
					this.pushXianAdd(addCardXian);
				}
				else if (status == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
					this.pushZhuangAdd(addCardZhuang, 400);
				}
			}
			if (addCardXian && addCardZhuang) {
				if (status == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
					this.pushXianAdd(addCardXian);
				}
				else if (status == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
					if (addCardXian && addCardXian.length > 0) {
						if (!this.xpoker2.isZhengPoker)
							this.addMiFanPai(1, this.xpoker2);
					}
					this.pushZhuangAdd(addCardZhuang);
				}
			}
		}

		/**展示0和1 
		 * 庄闲得手牌正面 */
		private showZXPoker01() {
			for (let i = 0; i < 2; ++i) {
				let poker: BJLPoker = this["xpoker" + i] as BJLPoker;
				if (!poker.isZhengPoker) {
					poker.pokerScaleAni();
				}
			}
			for (let i = 0; i < 2; ++i) {
				let poker: BJLPoker = this["zpoker" + i] as BJLPoker;
				if (!poker.isZhengPoker) {
					poker.pokerScaleAni();
				}
			}
		}
		/**
		 * 服务器推送闲家咪牌
		 * 服务器推送 status=8 代表闲家咪
		 *  */
		private pushXianAdd(addCardXian, delayAdd: number = 400) {
			this.changeRoomStatus(ROOM_STATUS1.MINI_IDLE_ADD_CARD);
			// this.roomState.source = RES.getRes("bjl_xmp_png");
			//补牌动画
			this.setAutoTimeout(() => {
				this.buPaiAni_MI(1);
			}, this, delayAdd)
			//房间状态
			if (this.isZhuangMi == MIPAI_DIRECTION.XIAN_MI) {
				this.setAutoTimeout(() => {
					this.miPai.visible = true;
					this.miPai.setAddCard(addCardXian, this.isZhuangMi);
				}, this, 900)
			}
		}
		/**服务器推送庄家咪
		 * status==9 代表庄咪
		 */
		private pushZhuangAdd(addCardZhuang, bupaiDelay: number = 0) {
			this.changeRoomStatus(ROOM_STATUS1.MINI_BANKER_ADD_CARD);
			this.setAutoTimeout(() => {
				this.buPaiAni_MI(2);
			}, this, bupaiDelay)
			// this.roomState.source = RES.getRes("bjl_zmp_png");
			if (this.isZhuangMi == MIPAI_DIRECTION.ZHUANG_MI) {
				this.setAutoTimeout(() => {
					this.miPai.visible = true;
					this.miPai.setAddCard(addCardZhuang, this.isZhuangMi);
				}, this, 600)
			}
		}
		private s_miniInitCards(e: egret.Event) {
			let num = e.data;
			let roomInfo = Global.roomProxy.roomInfo;
			let cd1 = num["camp1"];
			let cd2 = num["camp2"];
			let xian = cd1["initCards"];
			let zhuang = cd2["initCards"];
			roomInfo.idleInitCards = cd1["initCards"];
			roomInfo.bankerInitCards = cd2["initCards"];
			this.changeRoomStatus(ROOM_STATUS1.MINI_HAND_CARD);
			// this.xpaisValue(xian);
			// this.zpaisValue(zhuang);
			// //当庄闲都未下注 不弹出咪牌界面
			// if (this.isZhuangMi == MIPAI_DIRECTION.EMPTY) {
			// 	this.miPai.visible = false;
			// 	// this.showZheng();
			// 	return;
			// };
			// this.miPai.visible = true;
			// let cardsValue = this.isZhuangMi == MIPAI_DIRECTION.ZHUANG_MI ? zhuang : xian;
			// this.miPai.setPokerValue(cardsValue, this.isZhuangMi);
		}
		private mipaiZhuang: Array<any>;
		private mipaiXian: Array<any>;
		private fanPai(e: egret.Event) {
			let data = e.data;
			let id = data["id"];
			let pre = "z";
			if (data["isZhuang"] == MIPAI_DIRECTION.XIAN_MI) {
				pre = "x";
			}
			let poker = (this[pre + "poker" + id] as BJLPoker);
			poker.visible = true;
			poker.showB2Z();
			if (id == 2 && pre == "z") {
				this.showZhuangXianDian(Global.roomProxy.roomInfo);
			}
			if ((this[pre + "poker" + 0] as BJLPoker).isZhengPoker && (this[pre + "poker" + 1] as BJLPoker).isZhengPoker) {
				this.setAutoTimeout(() => {
					this.miPai.visible = false;
				}, this, 1000);
			}
		}
		public onRemoved() {
			super.onRemoved();
			CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
			CF.rE(ENo.RBWAR_CM_TOUCH, this.rbwarTouch, this);
			CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
			CF.rE(ServerNotify.s_roomInfo, this.s_roomInfo, this);
			CF.rE(ServerNotify.s_roomInitHandCards, this.roomInitHandCards, this);
			//CF.rE(ServerNotify.s_roomOpenCards, this.getNumsPokers, this);
			CF.rE(ServerNotify.s_roomStartBet, this.s_roomStartBet, this);
			CF.rE(ServerNotify.s_roomStopBet, this.s_roomStopBet, this);
			CF.rE(ServerNotify.s_playerBet, this.s_playerBet, this);
			CF.rE(ServerNotify.s_countdown, this.countdown, this);
			CF.rE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
			CF.rE(ServerNotify.s_VPlayerBet, this.vPlayerBet, this);
			CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
			CF.rE(ServerNotify.s_kickGame, this.s_kickPlayer, this);
			CF.rE(ServerNotify.s_enterResult, this.s_enterResult, this);
			CF.rE(ServerNotify.s_ruffleCard, this.s_ruffleCard, this);//洗牌
			CF.rE(ServerNotify.s_cardsNumInfo, this.s_cardsNumInfo, this);//牌的数量
			CF.rE(ServerNotify.s_sendWayBillInfo, this.s_sendWayBillInfo, this);//路单
			CF.rE(ENo.BJL_FANPAI, this.fanPai, this);//翻牌
			CF.rE(ServerNotify.s_miniAddCards, this.s_miniAddCards, this);//咪补牌
			CF.rE(ServerNotify.s_miniInitCards, this.s_miniInitCards, this);//咪手牌
			if (this.miPai) this.miPai.onRemoved();
		}

		/**
		 * 创建好所有需要的龙骨动画
		 */
		private dbGroup: eui.Group;//龙骨group
		private playerDb: DBComponent;//幸运星玩家龙骨组
		private playerDb1: DBComponent;//第一名玩家龙骨组
		private minewinDb: DBComponent;//自己赢龙骨
		private xipaiDb: DBComponent//洗牌龙骨
		private winerDb: DBComponent;//胜利龙骨
		private vsDBComponent: DBComponent;//开始龙骨

		/**
		 * 需要的龙骨动画
		 */
		private createDBComponents() {
			this.vsDBComponent = DBComponent.create("vsDb", `bjl_notice${TextUtils.instance.currentAniStr}`);
			this.dbGroup.addChild(this.vsDBComponent);
			this.vsDBComponent.visible = false;
			this.vsDBComponent.resetPosition();
			this.vsDBComponent.verticalCenter = -200;
			this.vsDBComponent.horizontalCenter = 365;



			this.playerDb1 = DBComponent.create("bjl_title1", "title");
			this.no1header.addDb(this.playerDb1);
			this.playerDb1.resetPosition();
			this.playerDb1.verticalCenter = -12;
			this.playerDb1.horizontalCenter = 0;
			this.playerDb1.play("title01", -1)

			this.playerDb = DBComponent.create("bjl_title", "title");
			this.luckyheader.addDb(this.playerDb);
			this.playerDb.resetPosition();
			this.playerDb.verticalCenter = 0;
			this.playerDb.horizontalCenter = 0;
			this.playerDb.play("title02", -1)



			this.xipaiDb = DBComponent.create("bjl_xipai", "xipai");
			this.dbGroup.addChild(this.xipaiDb);
			this.xipaiDb.visible = false;
			this.xipaiDb.resetPosition();
			this.xipaiDb.verticalCenter = -200;
			this.xipaiDb.horizontalCenter = 365;
			this.xipaiDb.callback = () => {
				this.xipaiDb.visible = false;
			}

		}
		/**
	 * 收牌动画
	*/
		private allCards: Array<BJLPoker>;
		private shouPaiPos: eui.Rect;
		private shouPaiGroup: eui.Group;
		private haveshowShouPaiAni: boolean = false;
		private shouPaiAni() {
			if (Global.runBack) return;
			if (this.haveshowShouPaiAni) return;
			this.haveshowShouPaiAni = true;
			this.allCards = [];
			//let tartgetPos = new egret.Point(this.shouPaiPos.localToGlobal().x, this.shouPaiPos.localToGlobal().y);
			let groupNameArr = ["xpoker", "zpoker"];
			let groupName: string;
			for (let j = 0; j < groupNameArr.length; ++j) {
				groupName = groupNameArr[j];
				this.groupShouCardAni(groupName);

			}
			this.zhengBianBei();
			this.zpokerGroup.visible = false;
			this.xpokerGroup.visible = false;
			this.setAutoTimeout(() => {
				let count = 0;

				async.eachSeries(this.allCards, (card, callback) => {
					let time = 500;
					egret.Tween.get(card).wait(15 * (count / 2)).call(() => {//15 * (num / 2) samrt 金币中间等待时间变短
						count++;
						callback();
					}).to({
						x: this.shouPaiGroup.x,
						y: this.shouPaiGroup.y,
						scaleX: 0.4,
						scaleY: 0.4,
						alpha: 0,
					}, time, egret.Ease.cubicInOut).call(() => {
						game.UIUtils.removeSelf(card);
					});
				})
			}, this, 1010);


		}
		private createBJLPoker(value, color, x, y, rotation, _scaleX, _scaleY, name, anchorX, anchorY): BJLPoker {
			let card: BJLPoker = new BJLPoker();
			card.value = value;
			card.color = color;
			card.x = x;
			card.y = y;
			card.rotation = rotation;
			card.scaleX = _scaleX;
			card.scaleY = _scaleY;
			card.anchorOffsetX = anchorX;
			card.anchorOffsetY = anchorY;
			card.name = name;
			return card;
		}
		private groupShouCardAni(groupNameKey: string = "xpoker") {//target: egret.Point,
			let arr = [];
			let cardGroup: eui.Group = this[groupNameKey + "Group"];
			let card: BJLPoker;
			let newCard: BJLPoker;
			for (let j = 0; j < 3; j++) {
				card = this[groupNameKey + j];
				let startPos = card.localToGlobal();
				if (card.visible) {
					newCard = this.createBJLPoker(card.value, card.color, startPos.x, startPos.y, card.rotation, card.scaleX, card.scaleY, name, card.anchorOffsetX, card.anchorOffsetY);
					newCard.name = groupNameKey + j;
					this.uiGroup.addChild(newCard);
					arr.push(newCard);
					this.allCards.push(newCard);
				}
			}
			let num = 0;
			async.eachSeries(arr, (card, callback) => {
				let time = 1000;
				// let startPos = card.localToGlobal();
				// let waitTime = Math.random() * 2 * 15;
				// this.uiGroup.addChild(card);
				// card.x = startPos.x;
				// card.y = startPos.y;
				egret.Tween.get(card).wait(15 * (num / 2)).call(() => {//15 * (num / 2) samrt 金币中间等待时间变短
					num++;
					callback();
				}).to({
					x: this.shouPaiPos.localToGlobal().x,
					y: this.shouPaiPos.localToGlobal().y,
					rotation: 0
				}, time, egret.Ease.cubicInOut).call(() => {
					let _index = arr.indexOf(card);
					arr.splice(_index, 1);
					card.x = this.shouPaiPos.localToGlobal().x;
					card.y = this.shouPaiPos.localToGlobal().y;
					card.rotation = 0;
					// cardGroup.addChild(card);
				});
			})

		}
		/**
		 * 洗牌
		 */
		private s_ruffleCard(e: egret.Event) {
			this.xipaiDb.play("xipai", 1);
			let roomInfo = Global.roomProxy.roomInfo;
			for (let i = 0; i < 5; i++) {
				this["ld" + (i + 1)].chushihua();
			}
			roomInfo.wayBillInfo = [];
		}

		/**
		 * 牌的数量
		 */
		private s_cardsNumInfo(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.roomProxy.roomInfo;
			roomInfo['remainNum'] = data.remainNum + 4;
			roomInfo['usedNum'] = data.usedNum - 4;
			this.fpaiNums.text = data.remainNum;
			this.feipaiNums.text = data.usedNum;
		}

		/**
		 * 路单
		 */
		private s_sendWayBillInfo(e: egret.Event) {
			let data = e.data;
			let num = data["bill"].concat([]);
			let roomInfo = Global.roomProxy.roomInfo;
			for (let i = 0; i < 5; i++) {
				this["ld" + (i + 1)].testNums(num);
			}
			this.ld6.zhangWin(num);
			this.ld6.xianWin(num);
			roomInfo.wayBillInfo = data["bill"];
		}

		private cmNumList = [];//筹码list
		private currentMoney: number;//下注的钱
		/**
		 * 初始化筹码
		 */
		private initCMList() {
			let roomInfo = Global.roomProxy.roomInfo as BJLRoomInfo;
			this.cmNumList = roomInfo.addBet;
		}

		/**
		 * 初始化项目并给数据赋值。
		 */
		private init() {
			this.initCMList();
			for (let i = 0; i < 5; i++) {
				this["war" + (i + 1)].init(this, 1);
			}
			for (let i = 1; i <= 4; i++) {
				let yzBtn = this['yzbtn' + i] as BJLCmBtn;
				yzBtn.setIndex(i);
				yzBtn.setContent(this.cmNumList[i - 1]);
			}
			//默认1
			this.currentMoney = this.cmNumList[0];
			this.showTouchValue(this.currentMoney);
			// //显示所有玩家头像信息
			let roomInfo = Global.roomProxy.roomInfo as BJLRoomInfo;
			let betMulti = roomInfo.betMulti;//玩家列表
			let wayBillInfo = roomInfo.wayBillInfo;//路单
			for (let i = 0; i < betMulti.length; i++) {
				let nums = 1 + ":" + betMulti[i];
				this["war" + (i + 1)].init_bili(nums);
			}
			this.fpaiNums.text = "" + roomInfo.remainNum;
			this.feipaiNums.text = "" + roomInfo.usedNum;
			this.renderRoomInfo();
			this.showPlayers();
			this.Waybill(wayBillInfo);
			this.dqjs.text = CF.tigc(136) + (wayBillInfo.length + 1);
			this.showRoomStatus(true);
		}

		/**
		 * 路单
		 */
		private Waybill(wayBillInfo) {
			if (wayBillInfo.length == 0) {
				return;
			}
			let lds = wayBillInfo.concat([]);
			for (let i = 0; i < 5; i++) {
				this["ld" + (i + 1)].testNums(lds);
			}
			this.ld6.zhangWin(lds);
			this.ld6.xianWin(lds);
		}

		/**
		 * 获取一个筹码
		 */
		private getNewBJLCm(index, value) {
			let jinbi: BJLCmBtn = ObjectPool.produce("bjl_cm", BJLCmBtn);
			if (!jinbi) {
				jinbi = new BJLCmBtn(true);
			}
			jinbi.setIndex(index);
			jinbi.setContent(value);
			return jinbi;
		}

		private img1: eui.Image;
		private cmValue: number;
		private players: eui.Button;
		private header1: zajinhua.ZajinhuaHeader;
		public async onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			switch (e.target) {
				case this.backBtn:
					this.showBtnsType(1);
					this.backBtnTouchEnded();
					break;
				case this.settingBtn:
					this.showBtnsType(1);
					CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "baccarat" });
					break;
				case this.recordBtn:
					this.showBtnsType(1);
					CF.sN(PanelNotify.OPEN_BJL_RECORD, "baccarat");
					break;
				case this.helpBtn:
					this.showBtnsType(1);
					BaseHelpShuPanel.getInstance(`BJLHelpSkin${CF.tis}`, "bjl_help", CF.tic).show();
					break;
				case this.xlbtn:
					this.showBtnsType(2);
					break;
				case this.xlbtn1:
					this.showBtnsType(1);
					break;
				case this.playersBtn:
					break;
			}
		}

		/**
		 * 减少内存
		 */
		private clearNormalJinbi() {
			let kongzhiNumber = 40;
			/**
			 * 清理
			 */
			let cleardata = (type, number) => {
				let list = this['cmList' + type];
				while (number > 0) {
					let jinbi = list.shift();
					game.UIUtils.removeSelf(jinbi);
					ObjectPool.reclaim("bjl_cm", jinbi);
					number--;
				}
			}
			if (this.cmList1.length > kongzhiNumber) {
				cleardata(1, this.cmList1.length - kongzhiNumber);
			}
			if (this.cmList2.length > kongzhiNumber) {
				cleardata(2, this.cmList2.length - kongzhiNumber);
			}
			if (this.cmList3.length > kongzhiNumber) {
				cleardata(3, this.cmList3.length - kongzhiNumber);
			}
			if (this.cmList4.length > kongzhiNumber) {
				cleardata(4, this.cmList4.length - kongzhiNumber);
			}
			if (this.cmList5.length > kongzhiNumber) {
				cleardata(5, this.cmList5.length - kongzhiNumber);
			}
		}

		private renderRoomInfo() {
			this.showHeaders();
			this.showCurrentBet();
		}




		/**
		 * 显示当前已经下注的筹码数·	
		 */
		private showCurrentBet() {
			let roomInfo = Global.roomProxy.roomInfo as BJLRoomInfo;
			if (roomInfo.roundStatus != ROOM_STATUS1.SETTLEMENT) {
				let roundBetInfo = roomInfo.roundBetInfo;
				if (roundBetInfo) {
					for (let key in roundBetInfo) {
						let num = roundBetInfo[key];
						this.updateWarScore(2, key, num, true);
						this.otherPeopleYZ(num, Number(key), null);

					}
				}
			}
			this.clearNormalJinbi();
			//显示自己的下注
			let mineData = Global.roomProxy.getMineData() as BJLRoomInfo;
			if (mineData) {
				let data = mineData["betInfo"];
				for (let i in data) {
					this.updateWarScore(1, i, data[i], false, true);
				}
			}
		}
		private zhengBianBei() {
			this.xpoker0.showZ2B();
			this.xpoker1.showZ2B();
			this.xpoker2.showZ2B();
			this.zpoker0.showZ2B();
			this.zpoker1.showZ2B();
			this.xpoker2.showZ2B();
		}
		/**
		 * 更新每个区域的筹码数量
		 * type:1 自己 2: total
		 */
		private updateWarScore(type, warIndex, total, isAdd, isRecont?) {
			let n = Number(warIndex);
			let war = this['war' + (n + 1)];
			if (type == 1) {
				war.updateMyValue(total, isAdd, isRecont);
			} else {
				war.updateTotalValue(total, isAdd);
			}
		}

		/**
		 * 显示玩家头像
		 */
		private showHeaders() {
			let roomInfo = Global.roomProxy.roomInfo as BJLRoomInfo;
			//LogUtils.logD("==========roomInfo======="+JSON.stringify(roomInfo));
			let richManList = roomInfo.playerList.richManList;
			//富豪
			let fuhao = richManList[0];
			this.no1header.initWithPlayer(fuhao, 1);

			let luckey = roomInfo.playerList.winRate1st as any;
			this.luckyheader.initWithPlayer(luckey, 10);

			let mineData = Global.roomProxy.getMineData();
			this.mineheader.initWithPlayer(mineData);

			if (mineData["uid"] == fuhao["pIndex"]) {
				this.no1header.initWithPlayer(mineData, 1); ""
			} else {
				this.no1header.initWithPlayer(fuhao, 1);
			}
			let index = 2;
			let i = 1;
			while (index < 6) {
				let player = richManList[i];
				let header = this['header' + index] as BJLPlayerHeader;
				index++;
				i++;
				if (!player) {
					header.visible = false;
					continue;
				} else {
					header.visible = true;
				}
				header.initWithPlayer(player, i);

			}
			this.pjbh.text = CF.tigc(77) + Global.roomProxy.roomInfo.roundId;
		}

		/**
		 * 找寻所有除了1之外的所有头像
		 */
		private updateTotalByHeaders(index, gold) {
			for (let i = 2; i <= 5; i++) {
				if (this['header' + i].index == index) {
					this['header' + i].updateGold(gold, false);
				}
			}
			if (this.no1header.index == index) {
				this.no1header.updateGold(gold, false);
			}
			if (this.luckyheader.index == index) {
				this.luckyheader.updateGold(gold, false);
			}
		}

		/**
		 * 结算
		 */
		private winPlayers = [];
		private updatePlayerGold = [];
		private showXianPai(num) {
			for (let i = 0; i < num.length; i++) {
				if (i == 2) {
					if (!this.xpoker2.isZhengPoker)
						this.addMiFanPai(1, this.xpoker2);
				}
				else {
					let poker: BJLPoker = this["xpoker" + i];
					poker.initWithNum(num[i]);
					if (!poker.isZhengPoker) poker.pokerScaleAni();
				}
			}
		}
		private showZhuangPai(num) {
			for (let i = 0; i < num.length; i++) {
				if (i == 2) {
					if (!this.zpoker2.isZhengPoker)
						this.addMiFanPai(2, this.zpoker2);
				}
				else {
					let poker: BJLPoker = this["zpoker" + i];
					poker.initWithNum(num[i]);
					if (!poker.isZhengPoker) poker.pokerScaleAni();
				}

			}
		}
		/**smart
		 * 展示庄闲得点数
		 *  */
		private showZhuangXianDian(roomInfo) {
			this.xdian.visible = true;
			this.xdian.text = roomInfo.idlePoint + ".";//点数	
			this.zdian.visible = true;
			this.zdian.text = roomInfo.bankerPoint + ".";//点数
		}
		private s_roundSettlement(e: egret.Event) {
			let data = e.data;
			//smart
			this.miPai.visible = false;
			let roomInfo = Global.roomProxy.roomInfo;
			if (roomInfo.playway == 2) {
				this.showXianPai(roomInfo.idleCard);
				this.showZhuangPai(roomInfo.bankerCard);
				this.showZhuangXianDian(roomInfo);
			}
			//smart
			//LogUtils.logD("==========结算数据=========="+JSON.stringify(data));
			this.winPlayers = [];
			this.changeRoomStatus(ROOM_STATUS1.SETTLEMENT);
			let winer = data.compareResult;//赢家
			let winZone = data.winZone;
			let playerwim = data.playerWinInfo;
			let failZone = data.failZone;
			let myInfo = data.myInfo;
			let lists = [];
			let list: any;
			for (let i = 0; i < failZone.length; i++) {
				list = this["cmList" + (failZone[i] + 1)];
				lists.push(list);
			}
			if (myInfo) {
				if (myInfo["gainGold"] > 0) {
					this.winPlayers.push(this.mineheader);
				}
			}

			for (let i in playerwim) {
				let p = this.getHeaderByIndex(i);
				if (p) {
					this.winPlayers.push(p);
				}
			}
			async.waterfall([
				(callback) => {
					this.showWin(winer);
					for (let i = 0; i < winZone.length; i++) {
						this["war" + (winZone[i] + 1)].winAni();
					}
					callback();
				},
				(callback) => {
					this.group2Group(lists, winZone);
					callback();
				},
				(callback) => {
					this.setAutoTimeout(() => {
						this.shouPaiAni();
					}, this, 1800);

					//飘分
					if (myInfo) {
						if (myInfo["gainGold"] > 0) {
							// if (!this.playerDb) {
							this.playerDb = new DBComponent("bjl_win2_vn");
							this.mineheader.addDb(this.playerDb);
							this.playerDb.resetPosition();
							this.playerDb.verticalCenter = -30;
							this.playerDb.horizontalCenter = 0;
							// }
							// this.mineheader.addDb(this.playerDb);
							this.playerDb.playNamesAndLoop(["bjl_win2_vn", "bjl_win2_loop_vn"])
							this.mineheader.showLiushuiLabel(myInfo["gainGold"]);
						}
						this.mineheader.updateGold(myInfo["totalGold"]);
						// this.setAutoTimeout(() => {
						// 	this.playerDb.stop();
						// 	game.UIUtils.removeSelf(this.playerDb);
						// }, this, 3000);
					}
				},
			], (data, callback) => {

			});

		}

		/**
		 * 显示输赢
		 */
		private showWin(player) {
			this.shuyinGroup.visible = true;
			let name: any;
			let name1: any;
			let houzhui = TextUtils.instance.currentAniStr
			switch (player) {
				case 0:
					name = "win_zy" + houzhui;
					name1 = "win_zy_loop" + houzhui;
					break;
				case 1:
					name = "win_xy" + houzhui;
					name1 = "win_xy_loop" + houzhui;
					break;
				case 3:
					name = "win_hj" + houzhui;
					name1 = "win_hj_loop" + houzhui;
					break;
			}
			this.shuyinGroup.removeChildren();
			this.winerDb = new DBComponent(`win${TextUtils.instance.currentAniStr}`);
			this.shuyinGroup.addChild(this.winerDb);
			this.winerDb.visible = false;
			this.winerDb.resetPosition();
			this.winerDb.verticalCenter = 0;
			this.winerDb.horizontalCenter = 0;
			this.winerDb.play(name, 1);
			this.winerDb.callback = () => {
				this.winerDb.play(name1, 2);
				this.winerDb.callback = () => {
					this.winerDb.visible = false;
					game.UIUtils.removeSelf(this.winerDb);
				}
			}
		}

		/**
		 * Group飞Group
		 */
		private group2Group(starLists, endGroup) {
			let allCms: BJLCmBtn[] = [];
			for (let i = 0; i < starLists.length; i++) {
				allCms = allCms.concat(starLists[i]);
			}
			let cm: BJLCmBtn;
			let item;
			let gp2: eui.Group;
			let point: egret.Point;
			while (allCms.length > 0) {
				cm = allCms.pop();
				item = endGroup[Math.floor(Math.random() * endGroup.length)];
				this["cmList" + (item + 1)].push(cm);
				gp2 = this["gp" + (item + 1)];
				point = gp2.globalToLocal(cm.localToGlobal().x, cm.localToGlobal().y);
				cm.x = point.x;
				cm.y = point.y;
				gp2.addChild(cm);
				egret.Tween.get(cm).to({
					x: _.random(25, (gp2.width - cm.width * 0.2)),
					y: _.random(25, (gp2.height - cm.height * 0.2))
				}, _.random(300, 600));
			}

			this.setAutoTimeout(() => {
				let cm1: BJLCmBtn;
				let starArray = [];
				if (endGroup.length > 1) {
					if (this.winPlayers.length > 0) {
						let index = endGroup.pop();
						let gp1 = this["gp" + (index + 1)];
						let list1 = this["cmList" + (index + 1)];
						this.g2ps(this.winPlayers, list1, gp1);
						this.qufen(endGroup);
					} else {
						this.qufen(endGroup);
					}
				} else {
					this.winer1Zone(endGroup);
				}
			}, this, 1000);
		}

		/**
		 * qufen
		 */
		private qufen(endGroup) {
			let cmsArray2;
			let gp2;
			for (let i = 0; i < endGroup.length; i++) {
				cmsArray2 = this["cmList" + (endGroup[i] + 1)];
				gp2 = this["gp" + (endGroup[i] + 1)];
				this.movieGroup(gp2, cmsArray2);
			}
		}

		/**
		 *胜利区域1个
		 */
		private winer1Zone(endGroup) {
			let starArray = this["cmList" + (endGroup[0] + 1)];
			let group = this["gp" + (endGroup[0] + 1)];
			let n: number = Math.floor(starArray.length / 4);
			let list: any;
			let list3: any;
			if (this.winPlayers.length > 0) {
				list = starArray.splice(0, n);
				list3 = starArray;
				this.g2ps(this.winPlayers, list, group);
				this.setAutoTimeout(() => {
					this.movieGroup(group, list3);
				}, this, 100);
			} else {
				this.movieGroup(group, starArray);
			}
		}

		/**
		 * group飞向玩家列表的动画
		 */
		private movieGroup(gp, list) {
			while (list.length > 0) {
				let cm = list.pop();
				let point: egret.Point = gp.globalToLocal(this.playersBtn.localToGlobal().x + 30, this.playersBtn.localToGlobal().y + 30);
				egret.Tween.get(cm).to({
					x: point.x,
					y: point.y
				}, _.random(300, 600)).call(() => {
					game.UIUtils.removeSelf(cm);
					ObjectPool.reclaim("bjl_cm", cm);
				});
			}
			this.setAutoTimeout(() => {
				this.clearRoom()
			}, this, 1000)
		}

		/**
		 * group飞玩家们；
		 */
		private g2ps(players, lists, group) {
			while (lists.length > 0) {
				let cm = lists.pop();
				let num = _.random(0, this.winPlayers.length - 1);
				let player = players[num];
				let point: egret.Point;
				if (player == this.luckyheader) {
					point = group.globalToLocal((player.localToGlobal().x + player.width * 0.7), (player.localToGlobal().y + player.height * 0.3));
				} if (player == this.no1header) {
					point = group.globalToLocal((player.localToGlobal().x + player.width * 0.7), (player.localToGlobal().y + player.height * 0.3));
				} if (player == this.mineheader) {
					point = group.globalToLocal((player.localToGlobal().x + player.width * 0.7), (player.localToGlobal().y + player.height * 0.3));
				} else {
					if (player) {
						point = group.globalToLocal((player.localToGlobal().x + player.width / 2), (player.localToGlobal().y + player.height / 2));
					}
				}
				if (point) {
					egret.Tween.get(cm).to({
						x: point.x,
						y: point.y
					}, _.random(300, 600)).call(() => {
						game.UIUtils.removeSelf(cm);
						ObjectPool.reclaim("bjl_cm", cm);
					});
				}
			}
		}

		private getHeaderByIndexType1(index) {
			for (let i = 2; i <= 5; i++) {
				if (this['header' + i].index == index) {
					return this['header' + i];
				}
			}
			return null;
		}

		/**
		 * 根据坐标找到头像
		 * @param  {} index
		 */
		private getHeaderByIndex(index) {
			for (let i = 2; i <= 5; i++) {
				if (this['header' + i].index == index) {
					return this['header' + i];
				}
			}
			if (this.no1header.index == index) {
				return this.no1header;
			}
			if (this.luckyheader.index == index) {
				return this.luckyheader;
			}

			return null;
		}

		/**
		 * 根据坐标找到头像
		 * @param  {} index
		 */
		private getHeaderMovieType(index) {//有问题，需要调整你
			for (let i = 2; i <= 3; i++) {
				if (this['header' + i].index == index) {
					return 3;
				}
			}
			for (let i = 4; i <= 5; i++) {
				if (this['header' + i].index == index) {
					return 5;
				}
			}
			if (this.no1header.index == index) {
				return 6;
			}
			if (this.luckyheader.index == index) {
				return 7;
			}
			if (this.mineheader.index == index) {
				return 1;
			}
		}

		/**
		 * 显示幸运星的选择
		 */
		// private start2Move(betInfo, ani, camp?) {
		// 	if (ani) {
		// 		let moveX = 0;
		// 		let type1 = betInfo[1];
		// 		let type2 = betInfo[2];
		// 		let type3 = betInfo[3];
		// 		if (!type1 && !type2 && !type3) {
		// 			return;
		// 		};
		// 		if (!type1 && !type2) {
		// 		} else {
		// 			moveX = !!type2 ? 585 : 225;
		// 			if (this.luckStar.x == 1000) {
		// 				egret.Tween.get(this.luckStar).to({
		// 					x: moveX
		// 				}, 800, egret.Ease.sineIn);
		// 			} else {
		// 				this.luckStar.x = moveX;
		// 			}

		// 		}
		// 		if (!type3) {
		// 		} else {
		// 			if (this.luckStar0.x == 1000) {
		// 				egret.Tween.get(this.luckStar0).to({
		// 					x: 470,
		// 					y: 150
		// 				}, 800, egret.Ease.sineIn);
		// 			} else {
		// 				this.luckStar0.x = 470;
		// 				this.luckStar0.y = 150;
		// 			}

		// 		}
		// 	} else {
		// 		let moveX1 = 0;
		// 		let camp1 = camp[1];
		// 		let camp2 = camp[2];
		// 		let camp3 = camp[3];
		// 		if (!camp1 && !camp2 && !camp3) {
		// 			return;
		// 		}
		// 		if (!camp1 && !camp2) {
		// 		} else {
		// 			moveX1 = !!camp2 ? 585 : 225;
		// 			this.luckStar.x = moveX1;
		// 		}
		// 		if (!camp3) {

		// 		} else {
		// 			this.luckStar0.x = 470;
		// 			this.luckStar0.y = 150;
		// 		}

		// 	}

		// }

		/**
		 *桌面上玩家下注，非自己和players
		 */
		private s_playerBet(e: egret.Event) {
			let data = e.data;
			//smart
			// this.zhengBianBei();
			let betInfo = data.betInfo;
			let playerIndex = data.pIndex;
			let updateHeaderAndMove = (playerHeader, moveType) => {
				if (playerHeader) {
					let total = 0;
					for (let type in betInfo) {
						let typeJSON = betInfo[type];
						for (let numValue in typeJSON) {
							let typeNumber = typeJSON[numValue];
							for (let i = 0; i < typeNumber; i++) {
								//smart
								playerHeader.headerMovie(moveType);
								this.playerYZ(parseInt(numValue), parseInt(type), playerHeader);
							}
						}
						let typeTotal = this.getBetInfoTotalByType(betInfo, type);
						total += typeTotal;
						this.updateWarScore(2, type, typeTotal, true);
					}
					//this.updateGoldByHeader(playerHeader, total * -1, true, false);
				} else {
					//LogUtils.logD(playerHeader.index + "不存在")
				}
			}

			let isLucky = false;
			let isNo1 = false;
			let total = this.getBetInfoTotal(betInfo);
			if (playerIndex == this.luckyheader.index) {
				isLucky = true;
				//this.start2Move(betInfo, true);
				if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
					//this.luckyheader.updateGold(total * -1, true);
				} else {
					updateHeaderAndMove(this.luckyheader, 7);
				}
			}

			if (playerIndex == this.no1header.index) {
				isNo1 = true;
				if (Global.roomProxy.checkIndexIsMe(playerIndex) || isLucky) {
					//this.no1header.updateGold(total * -1, true);
				} else {
					updateHeaderAndMove(this.no1header, 6);
				}
			}
			let playerHeader = this.getHeaderByIndexType1(playerIndex) as BJLPlayerHeader;
			updateHeaderAndMove(playerHeader, this.getHeaderMovieType(playerIndex));
			// if (playerHeader) {
			// 	if (Global.roomProxy.checkIndexIsMe(playerHeader.index)) {
			// 		playerHeader.updateGold(total * -1, true);
			// 	} else {
			// 		updateHeaderAndMove(playerHeader, this.getHeaderMovieType(playerIndex));
			// 	}
			// }
		}

		public countdown(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.roomProxy.roomInfo as BJLRoomInfo;
			if (!roomInfo.countdown) {
				roomInfo.countdown = {};
			}
			roomInfo.countdown = data;
			game.DateTimeManager.instance.updateServerTime(data.start);
		}

		/**
		 * 房间刷新,处理玩家列表
		 */
		private s_roomInfo(e: egret.Event) {
			this.clearRoom();
			this.changeRoomStatus(ROOM_STATUS1.FREE);
			this.onLineCards(3);
			//this.vsMovie(2);如有，在处理
			//修改玩家头像
			let data = e.data;
			let players = Global.roomProxy.roomInfo.players;
			Global.roomProxy.roomInfo = data;
			Global.roomProxy.roomInfo.players = players;
			this.showHeaders();
			CF.dP(ENo.ROOM_FULSH);
			this.playersBtn.labelDisplay.text = data.playerList.playerCount;
		}

		private s_roomStopBet() {
			this.changeRoomStatus(ROOM_STATUS1.STOP);
			if (TextUtils.instance.isChinese()) {
				rbwar.RBWUtils.beignOrStop(2);//声音文件
			}
			this.timeBar.visible = false;
		}

		private s_roomStartBet(e: egret.Event) {
			this.roomState.visible = false;
			this.vsDBComponent.play(`bjl_notice${TextUtils.instance.currentAniStr}`, 1);
			if (TextUtils.instance.isChinese()) {
				SoundManager.getInstance().playEffect("bjl_ksxz_mp3");
			}
			this.vsDBComponent.callback = () => {
				this.vsDBComponent.visible = false;
			}
			egret.setTimeout(() => {
				this.changeRoomStatus(ROOM_STATUS1.BET);
				this.timeBar.visible = true;
				this.roomState.visible = true;
				this.lockYZ = true;
			}, this, 1800);
		}

		/**
		 * 改变房间状态
		 */
		private changeRoomStatus(status) {
			let roomInfo = Global.roomProxy.roomInfo;
			if (roomInfo) {
				roomInfo.roundStatus = status;
				this.showRoomStatus();
			}
		}

		/**
		 * 开始新游戏
		 */
		private startNewRound(e: egret.Event) {
			this.roomState.visible = true;
			this.mineheader.lsfalse();
			let roomInfo = Global.roomProxy.roomInfo;
			roomInfo.bankerCard = null;
			roomInfo.idleCard = null;
			roomInfo.bankerPoint = null;
			roomInfo.idlePoint = null;
			//smart
			roomInfo.idleInitCards = null;
			roomInfo.bankerInitCards = null;
			roomInfo.bankerAddCards = null;
			roomInfo.idleAddCards = null;
			if (this.playerDb) {
				this.playerDb.stop();
				game.UIUtils.removeSelf(this.playerDb);
			}
			//smart
			this.cleanCards();
			//smart
			this.starCardsAin();
			this.zpokerGroup.visible = true;
			this.xpokerGroup.visible = true;
			this.dqjs.text = CF.tigc(136) + (roomInfo.wayBillInfo.length + 1);
			this.changeRoomStatus(ROOM_STATUS1.START);
		}


		/**
		 * 收到开牌消息
		 */
		private roomInitHandCards(e: egret.Event) {
			let data = e.data;
			this.openCards(data);
		}
        /**
		 * 收到咪牌消息
		 */
		private getMiPaiCards(e: egret.Event) {
			//庄或者闲咪牌

		}
		/**
		 * 断线重连后牌的2种展示；
		 * 1,展示背面。
		 * 3，隐藏。
		 * 2，展示正面并赋值。
		 */
		private onLineCards(type) {
			if (type == 1) {
				this.zpokerGroup.visible = true;
				this.xpokerGroup.visible = true;
				for (let i = 0; i < 2; i++) {
					let card = this["zpoker" + i] as BJLPoker;
					let card1 = this["xpoker" + i] as BJLPoker;
					card.visible = card1.visible = true;
				}
			} else if (type == 3) {
				//samrt
				this.zpokerGroup.visible = false;
				this.xpokerGroup.visible = false;
				this.haveshowShouPaiAni = false;
				// this.zpokerGroup.visible = true;
				// this.xpokerGroup.visible = true;
			} else {
				let data = Global.roomProxy.roomInfo;
				if (!data) {
					return;
				}
				let openCardInfo = data.openCardInfo;
			}
		}


		private showCards() {
			LogUtils.logD("======showCards======");
			let room = Global.roomProxy.roomInfo;
			if (room.bankerCard && room.idleCard) {
				this.initIdleCard(room.idleCard);
				this.initBankerCard(room.bankerCard);
			}
			if (room.bankerPoint != null && room.bankerPoint != undefined && room.bankerPoint > -1) {
				this.zdian.visible = true;
				this.zdian.text = room.bankerPoint + ".";
			}
			if (room.idlePoint != null && room.idlePoint != undefined && room.idlePoint > -1) {
				this.xdian.visible = true;
				this.xdian.text = room.idlePoint + ".";
			}

		}

		/**
		 * 展示玩家总人数
		 */
		private showPlayers() {
			let data = Global.roomProxy.roomInfo;
			let playerList = data.playerList;
			let playerCount = playerList.playerCount;
			this.playersBtn.labelDisplay.text = playerCount;
		}


		/**
		 * 清理牌，回到最初位置
		 */
		private cleanCards() {
			for (let i = 0; i < 3; i++) {
				let card = this["zpoker" + i] as BJLPoker;
				let card1 = this["xpoker" + i] as BJLPoker;
				card.showZ2B();
				card1.showZ2B();
				card.visible = card1.visible = false;
			}
			this.zdian.visible = false;
			this.xdian.visible = false;
		}

		/**
		 * 发牌两张牌。
		 */
		private async starCardsAin() {
			this.cleanCards();
			let count = 0;
			for (let i = 0; i < 4; i++) {
				let poker = this.getNewCar();
				poker.name = "poker" + i;
				this.fapaiGroup.addChild(poker);
				poker.x = 0;
				poker.y = 0;
				poker.rotation = -45;
				poker.scaleX = poker.scaleY = 0.3;
				if (i < 2) {
					this.starCardsAin_1(poker, this.xpokerGroup, i, i, count);
				} else {
					this.starCardsAin_1(poker, this.zpokerGroup, i - 2, i, count);
				}
				this.updatePaiCount();
				count++;
			}
		}

		/**
		 * 补牌 
		 * num=1闲补牌，num=2庄补牌
		 */
		private bupaiAin(num) {
			let poker = this.getNewCar();
			this.fapaiGroup.addChild(poker);
			poker.x = 0;
			poker.y = 0;
			poker.rotation = -45;
			poker.scaleX = poker.scaleY = 0.3;
			if (num == 1) {
				this.bupaiAin_1(poker, this.xpoker2, 1, this.xpokerGroup);
			}
			if (num == 2) {
				this.bupaiAin_1(poker, this.zpoker2, 2, this.zpokerGroup);
			}
		}
		/**咪牌补牌 
		 * num=1闲补牌，num=2庄补牌
		*/
		private buPaiAni_MI(num) {
			let poker = this.getNewCar();
			this.fapaiGroup.addChild(poker);
			poker.x = 0;
			poker.y = 0;
			poker.rotation = -45;
			poker.scaleX = poker.scaleY = 0.3;
			if (num == 1) {
				this.buPaiAniMi_1(poker, this.xpoker2, 1, this.xpokerGroup);
			}
			if (num == 2) {
				this.buPaiAniMi_1(poker, this.zpoker2, 2, this.zpokerGroup);
			}
		}

		/**
		 * 补牌动画
		 */
		private bupaiAin_1(poker, card, index, group) {
			this.updatePaiCount();
			let point = group.globalToLocal(poker.localToGlobal().x, poker.localToGlobal().y);
			group.addChild(poker);
			poker.x = point.x;
			poker.y = point.y;
			if (Global.runBack) {
				poker.x = card.x;
				poker.y = card.y;
				poker.rotation = -90;
				poker.scaleX = poker.scaleY = 0.6;
				card.visible = true;
				poker.visible = false;
				card.showB2Z();
				if (index == 1) {
					this.xdian.visible = true;
					this.xdian.text = this.xianValue + ".";//点数
				} else {
					this.zdian.visible = true;
					this.zdian.text = this.zhuangValue + ".";//点数
				}
				return;
			}
			SoundManager.getInstance().playEffect("bjl_fp_mp3");
			egret.Tween.get(poker).to({ x: card.x, y: card.y, rotation: -90, scaleX: 0.6, scaleY: 0.6 }, 300).call(() => {
				card.visible = true;
				poker.visible = false;
			}).wait(500).call(() => {
				egret.Tween.get(card).to({ scaleX: 0 }, 150).call(() => { card.showB2Z() }).to({ scaleX: 0.6 }, 150).call(() => {
					if (index == 1) {
						this.xdian.visible = true;
						this.xdian.text = this.xianValue + ".";//点数
					} else {
						this.zdian.visible = true;
						this.zdian.text = this.zhuangValue + ".";//点数
					}
				});
			});
		}
		/**咪牌补牌动画 */
		private buPaiAniMi_1(poker, card, index, group) {
			this.updatePaiCount();
			let point = group.globalToLocal(poker.localToGlobal().x, poker.localToGlobal().y);
			group.addChild(poker);
			poker.x = point.x;
			poker.y = point.y;
			if (Global.runBack) {
				poker.x = card.x;
				poker.y = card.y;
				poker.rotation = -90;
				poker.scaleX = poker.scaleY = 0.6;
				card.visible = true;
				poker.visible = false;
				//card.showB2Z();
				return;
			}
			SoundManager.getInstance().playEffect("bjl_fp_mp3");
			egret.Tween.get(poker).to({ x: card.x, y: card.y, rotation: -90, scaleX: 0.6, scaleY: 0.6 }, 300).call(() => {
				card.visible = true;
				poker.visible = false;
			}).wait(500).call(() => {
			});
		}
		/**咪牌 补牌
		 * 翻牌动画 1闲 2庄
		 */
		private addMiFanPai(index, card) {
			egret.Tween.get(card).to({ scaleX: 0 }, 150).call(() => { card.showB2Z() }).to({ scaleX: 0.6 }, 150).call(() => {
			});
		}
		/**
		 * 发牌刷新数量
		 */
		private updatePaiCount() {
			let roomInfo = Global.roomProxy.roomInfo;
			roomInfo.remainNum--;
			roomInfo.usedNum++;
			this.fpaiNums.text = roomInfo.remainNum + "";
			this.feipaiNums.text = roomInfo.usedNum + "";
		}

		/**
		 * 发牌动画
		 */
		private async starCardsAin_1(poker: BJLPoker, group: eui.Group, i, j, count) {
			// return new Promise((resolve, reject) => {
			let point = group.globalToLocal(poker.localToGlobal().x, poker.localToGlobal().y);
			poker.x = point.x;
			poker.y = point.y;
			group.addChild(poker);
			let card: BJLPoker;
			if (j < 2) {
				card = this["xpoker" + i];
			} else {
				card = this["zpoker" + i];
			}
			this.setAutoTimeout(() => {
				SoundManager.getInstance().playEffect("bjl_fp_mp3");
			}, this, 300 * count)
			egret.Tween.get(poker).wait(300 * count).to({ x: card.x, y: card.y, scaleX: 0.6, scaleY: 0.6, rotation: 0 }, 300)
			this.setAutoTimeout(() => {
				card.visible = true;
				poker.visible = false;
			}, this, 300 * count + 300);
		}


		private xianCards: any;
		private xianValue: any;
		private zhuangCards: any;
		private zhuangValue: any;
		/**
		 * 开牌动画
		 */
		private openCards(num) {
			this.roomState.visible = false;
			let cd1 = num["camp1"];
			let cd2 = num["camp2"];
			this.xianValue = cd1["value"];
			this.xianCards = cd1["cards"];
			this.zhuangCards = cd2["cards"];
			this.zhuangValue = cd2["value"];
			this.xpaisValue(this.xianCards);
			this.zpaisValue(this.zhuangCards);
			this.setAutoTimeout(() => {
				this.openCardsAni();
			}, this, 200);
		}

		/**
		 * 庄家牌赋值
		 */
		private zpaisValue(num) {
			for (let i = 0; i < num.length; i++) {
				this["zpoker" + i].initWithNum(num[i]);
			}
		}

		private initBankerCard(bankerCard) {
			for (let i = 0; i < bankerCard.length; i++) {
				this["zpoker" + i].visible = true;
				this["zpoker" + i].showB2Z();
				this["zpoker" + i].initWithNum(bankerCard[i]);
			}
		}


		private initIdleCard(bankerCard) {
			for (let i = 0; i < bankerCard.length; i++) {
				this["xpoker" + i].visible = true;
				this["xpoker" + i].showB2Z();
				this["xpoker" + i].initWithNum(bankerCard[i]);
			}
		}


		/**
		 * 闲家牌赋值
		 */
		private xpaisValue(num) {
			for (let i = 0; i < num.length; i++) {
				this["xpoker" + i].initWithNum(num[i]);
			}
		}

		/**
		 * 开牌动画
		 */
		private openCardsAni() {
			if (Global.runBack) {
				this.xpoker0.showB2Z();
				this.xpoker1.showB2Z();
				this.zpoker0.showB2Z();
				this.zpoker1.showB2Z();
				if (this.xianCards.length == 3) {
					this.bupaiAin(1);
				} else {
					this.xdian.visible = true;
					this.xdian.text = this.xianValue + ".";//点数					
				}
				if (this.zhuangCards.length == 3) {
					this.bupaiAin(2);
				} else {
					this.zdian.visible = true;
					this.zdian.text = this.zhuangValue + ".";//点数							}						
				}
				return;
			}

			let time = 200 + 150;
			this.xpoker0.pokerScaleAni();
			this.setAutoTimeout(() => {
				this.xpoker1.pokerScaleAni();
			}, this, time);

			this.setAutoTimeout(() => {
				this.zpoker0.pokerScaleAni();
			}, this, time * 2 + 150);

			this.setAutoTimeout(() => {
				this.zpoker1.pokerScaleAni();
			}, this, time * 3 + 150);


			this.setAutoTimeout(() => {
				if (this.xianCards.length == 3) {
					this.bupaiAin(1);
				} else {
					this.xdian.visible = true;
					this.xdian.text = this.xianValue + ".";//点数					
				}
			}, this, 1500);

			this.setAutoTimeout(() => {
				if (this.zhuangCards.length == 3) {
					this.bupaiAin(2);
				} else {
					this.zdian.visible = true;
					this.zdian.text = this.zhuangValue + ".";//点数							}						
				}
			}, this, 2000);

			// egret.Tween.get(this.xpoker0).to({ scaleX: 0 }, 200).call(() => { this.xpoker0.showB2Z() }).to({ scaleX: 0.6 }, 150).call(() => {
			// 	egret.Tween.get(this.xpoker1).to({ scaleX: 0 }, 150).call(() => { this.xpoker1.showB2Z() }).to({ scaleX: 0.6 }, 150).wait(100).call(() => {
			// 		egret.Tween.get(this.zpoker0).to({ scaleX: 0 }, 150).call(() => { this.zpoker0.showB2Z() }).to({ scaleX: 0.6 }, 150).call(() => {
			// 			egret.Tween.get(this.zpoker1).to({ scaleX: 0 }, 150).call(() => { this.zpoker1.showB2Z() }).to({ scaleX: 0.6 }, 150).wait(100).call(() => {
			// 				if (this.xianCards.length == 3) {
			// 					this.bupaiAin(1);
			// 				} else {
			// 					this.xdian.visible = true;
			// 					this.xdian.text = this.xianValue + ".";//点数					
			// 				}
			// 			}).wait(600).call(() => {
			// 				if (this.zhuangCards.length == 3) {
			// 					this.bupaiAin(2);
			// 				} else {
			// 					this.zdian.visible = true;
			// 					this.zdian.text = this.zhuangValue + ".";//点数							}						
			// 				}
			// 			})
			// 		});
			// 	});
			// });
		}

		/**
		 * 获取一张牌
		 */
		private getNewCar() {
			let card: BJLPoker = ObjectPool.produce("poker", BJLPoker);
			if (!card) {
				card = new BJLPoker();
			}
			return card;
		}

		/**
		 * 玩家加入，废弃
		 */
		private playerEnter(e: egret.Event) {
			let roomInfo = Global.roomProxy.roomInfo as RBWRoomInfo;
			let richManList = roomInfo.playerList.richManList;
			let data = e.data;
			//	richManList.push(data.player);
			//this.updateRichManNum();
		}

		/**
		 * 筹码选择
		 */
		public rbwarTouch(e: egret.Event) {
			let data = e.data;
			this.currentMoney = data;
			this.showTouchValue(this.currentMoney);
		}

		/**
		 * 选那个那个亮
		 */
		private showTouchValue(value) {
			for (let i = 1; i <= 4; i++) {
				let yzBtn = this['yzbtn' + i] as BJLCmBtn;
				yzBtn.setTouchon(value);
			}
		}

		/**
		 * 押庄
		 */
		public yzZhuang() {
			this.sendBetByMine(0);
		}

		/**
		 * 押闲
		 */
		public yzXian() {
			this.sendBetByMine(1);
		}

		/**
		 * 押庄对
		 */
		public yzZhuangDui() {
			this.sendBetByMine(2);
		}

		/**
		 * 押和
		 */
		public yzHe() {
			this.sendBetByMine(3);
		}

		/**
		 * 押闲对
		 */
		public yzXianDui() {
			this.sendBetByMine(4);
		}

		/**
		 * 自己下注
		 */
		private async sendBetByMine(type) {
			if (!this.lockYZ) {
				this.showTips(CF.tigc(138));
				return;
			}
			let currentMoney = this.currentMoney;
			let player = Global.roomProxy.getMineData();
			if (player.gold < currentMoney) {
				this.showTips(CF.tigc(139));
				return;
			}
			this.mineheader.headerMovie(1);
			player.gold -= currentMoney;
			this.mineheader.updateGold(player.gold);
			this.updateWarScore(1, type, currentMoney, true);
			this.updateWarScore(2, type, currentMoney, true);
			let data = { betInfo: {} };
			let info = data.betInfo[type] = {};
			info[currentMoney] = 1;
			let path = ServerPostPath.game_bccaratHandler_c_bet;
			let jinbi = this.playerYZ(currentMoney, type, this.mineheader);
			let resp: any = await Global.pomelo.request(path, data);
			if (resp && resp.error && resp.error.code != 0) {
				if (resp.error.code == ErrorCode.BJL_BIGER2GOLD) {
					let max = Global.roomProxy.roomInfo.zoneBetMax[type];
					this.showTips(TextUtils.instance.setTextById(124, {
						"1": max
					}));
				} else {
					this.showTips(resp.error.msg);
				}
				// this.noXiazhuCount = 0;
				player.gold += currentMoney;
				this.updateWarScore(1, type, -currentMoney, true);
				this.updateWarScore(2, type, -currentMoney, true);
				this.mineheader.updateGold(player.gold)
				this.coin2Component(jinbi, type, this.mineheader);
			} else {
				player.betInfo = resp;
			}
		}


		/**
		 * 显示提示
		 */
		private tipsGroup: eui.Group;
		private tipsLabel: eui.Label;
		private showTips(text) {
			if (!this.tipsGroup.visible) {
				this.tipsGroup.visible = true;
				this.tipsGroup.alpha = 0;
			}
			this.tipsLabel.text = text;
			this.tipsGroup.width = this.tipsLabel.width + 100;
			egret.Tween.removeTweens(this.tipsGroup);
			egret.Tween.get(this.tipsGroup).to({
				alpha: 1
			}, 100).wait(1000).to({
				alpha: 0
			}, 100).call(() => {
				this.tipsGroup.visible = false;
			});
		}

		/**
		 * 任何玩家下注
		 * @param  {number} num
		 * @param  {number} type
		 * @param  {eui.Component} component:那个玩家
		 */
		private playerYZ(value: number, type: number, component: eui.Component) {
			if (component != this.playersBtn) {
				rbwar.RBWUtils.minePlayFjb();//声音文件
			}
			let index = this.cmNumList.indexOf(value) + 1
			let jinbi: BJLCmBtn = this.getNewBJLCm(index, value);
			if (component == null) {
				this.coinMoveAni(jinbi, type, null);
			} else {
				let startPoint = component.localToGlobal();
				this.coinMoveAni(jinbi, type, startPoint);
			}
			return jinbi;
		}

		private cmList1: BJLCmBtn[] = [];
		private cmList2: BJLCmBtn[] = [];
		private cmList3: BJLCmBtn[] = [];
		private cmList4: BJLCmBtn[] = [];
		private cmList5: BJLCmBtn[] = [];
		/**
		 * 金币从group飞回来
		 */
		private coin2Component(jinbi, type, component) {
			let group = this['gp' + (type + 1)] as eui.Group;
			let point1 = component.localToGlobal();
			let point = group.globalToLocal(point1.x + 50, point1.y + 50);
			egret.Tween.removeTweens(jinbi);
			egret.Tween.get(jinbi).to({
				x: point.x,
				y: point.y
			}, _.random(200, 400)).call(() => {
				game.UIUtils.removeSelf(jinbi);
				game.Utils.removeArrayItem(this['cmList' + (type + 1)], jinbi);
			});
		}

		/**
		 * 金币move动画
		 * @param  {RBWarYzBtn} jinbi
		 * @param  {number} type
		 * @param  {egret.Point} startPoint
		 */
		private coinMoveAni(jinbi: BJLCmBtn, type: number, startPoint: egret.Point) {
			let group = this['gp' + (type + 1)] as eui.Group;
			game.UIUtils.setAnchorPot(jinbi);
			jinbi.rotation = 0;
			if (!startPoint) {
				group.addChild(jinbi);
				jinbi.scaleX = jinbi.scaleY = 0.4;
				jinbi.x = _.random(20, group.width - jinbi.width * 0.15);
				jinbi.y = _.random(20, group.height - jinbi.height * 0.15);
			} else {
				jinbi.scaleX = jinbi.scaleY = 0.45;
				startPoint = group.globalToLocal(startPoint.x + 40, startPoint.y + 40);
				jinbi.x = startPoint.x;
				jinbi.y = startPoint.y;
				group.addChild(jinbi);
				egret.Tween.get(jinbi).to({
					x: _.random(20, group.width - jinbi.width * 0.15),
					y: _.random(20, group.height - jinbi.height * 0.15),
					rotation: _.random(0, 360 * 2)
				}, _.random(400, 700), egret.Ease.sineOut).to({
					scaleX: 0.4,
					scaleY: 0.4
				}, _.random(300, 500), egret.Ease.sineOut);
			}
			this['cmList' + (type + 1)].push(jinbi);
			return jinbi;
		}

		/**
		 * 非场上玩家的押注
		 */
		private otherPeopleYZ(value: number, type: number, component = this.playersBtn) {
			let numbers = NumberFormat.chaifenScore(this.cmNumList, value);
			for (let key in numbers) {
				let num = numbers[key];
				for (let i = 0; i < num; i++) {
					this.playerYZ(parseInt(key), type, component);
				}
			}
		}

		/**
		 * 在界面打开后重新拉取房间数据
		 */
		private s_enterResult(e: egret.Event) {
			this.cleanCards();
			Global.roomProxy.clearRoomInfo();
			Global.roomProxy.setRoomInfo(e.data);
			CF.sN(SceneNotify.CLOSE_BJLGAME);
			CF.sN(SceneNotify.OPEN_BJLGAME);
			this.roomState.visible = true;
			this.roomState.source = RES.getRes(`bjle_game_zbz${CF.tic}`);
		}

		/**
		 * 超过几局没下注，就踢人。
		 */
		private s_kickPlayer(e: egret.Event) {
			// Global.roomProxy.clearRoomInfo();
			let resp = e.data;
			CF.sN(SceneNotify.CLOSE_BJLGAME);
			CF.sN(SceneNotify.OPEN_BJLHALL);
			Global.alertMediator.closeViewComponent(0);
			Global.alertMediator.addAlert(resp.reason, null, null, true);
		}

		/**
		 * 虚拟玩家投注
		 */
		private vPlayerBet(e: egret.Event) {
			let data = e.data;
			//smart
			//this.zhengBianBei();
			LogUtils.logD("vplayerbet" + JSON.stringify(data));
			let chuliData: Array<any> = this.getvPlayerBetData(data);

			for (let j = 0; j < chuliData.length; ++j) {
				let temp: Array<any> = chuliData[j];
				this.setAutoTimeout(() => {
					egret.Tween.get(this.playersBtn).to({ bottom: 122 }, 100).to({ bottom: 132 }, 100);
					for (let i = 0; i < temp.length; ++i) {
						let value = temp[i];
						let n = Number(i);
						let war = this['war' + (n + 1)];
						war.updateTotalValue(value + 0, true);
						rbwar.RBWUtils.otherPlayFjb();//声音文件
						this.otherPeopleYZ(value + 0, Number(i));
					}
					//smart
					// egret.Tween.get(this.playersBtn).to({ bottom: 122 }, 100).to({ bottom: 132 }, 100);
					// for (let i in data) {
					// 	let value = data[i];
					// 	let n = Number(i);
					// 	let war = this['war' + (n + 1)];
					// 	war.updateTotalValue(value + 0, true);
					// 	rbwar.RBWUtils.otherPlayFjb();//声音文件
					// 	// if (data[i] == null) {
					// 	// 	LogUtils.logD("=========")
					// 	// }
					// 	this.otherPeopleYZ(value + 0, parseInt(i));
					// }
				}, this, 280 * j);
			}
		}
		private getvPlayerBetData(data): Array<any> {
			var obj = {};
			let value: number;
			let min: number = 0;
			let max: number = 10000000;
			let arr = [];
			var fen: number = 3;
			var realData: any;
			for (var key in data) {
				let temp = this.ranAllo(data[key], min, max, fen, this.cmNumList[0]);
				obj[key] = temp;
				arr.push(temp);
			}
			return _.unzip(arr);
		}
		/**随机等额分配 */
		private ranAllo(value, min, max, length, danwei) {
			var ran = [], arrId;
			//循环存放数组最小值
			for (var i = 0; i < length; i++) {
				ran[i] = min;
			}
			//计算剩下的值
			var spare = value - (min * length);
			while (spare > 0) {
				//生成数组随机ID
				arrId = Math.round(Math.random() * length);
				if (ran[arrId] < max) {
					ran[arrId] += danwei;
					spare -= danwei;
				}
			}
			return ran;
		}
		/**
		 * 通过头像更新金币
		 */
		private updateGoldByHeader(header, gold, isAdd, bolen) {
			if (Global.roomProxy.checkIndexIsMe(header.index)) {
				this.mineheader.updateGold(0, isAdd);
				this.setAutoTimeout(() => {
					if (bolen) {
						this.mineheader.showLiushuiLabel(gold);
					}
				}, this, 1000);

			} else {
				if (header) {
					header.updateGold(gold, isAdd);
				}
			}
		}

		/**
		 * 通过Index更新金币
		 */
		private updateGoldByIndex(pIndex, gold, isAdd, bolen) {
			let header: any = this.getHeaderByIndex(pIndex);
			if (Global.roomProxy.checkIndexIsMe(pIndex)) {
				this.mineheader.updateGold(0, isAdd);
				this.setAutoTimeout(() => {
					if (bolen) {
						this.mineheader.showLiushuiLabel(gold);
					}
				}, this, 1000);

			} else {
				if (header) {
					header.updateGold(gold, isAdd);
				}
			}
		}

		/**
		 * 获取一波押注的总金额
		 */
		private getBetInfoTotal(betInfo) {
			let total = 0;
			for (let type in betInfo) {
				let typeJSON = betInfo[type];
				for (let numValue in typeJSON) {
					let sum = Number(numValue) * typeJSON[numValue];
					total += sum;
				}
			}
			return total;
		}

		/**
		 * 获取某一个类型的总投注
		 */
		private getBetInfoTotalByType(betInfo, type) {
			let total = 0;
			let types = betInfo[type];
			if (types) {
				for (let numValue in types) {
					let sum = Number(numValue) * types[numValue];
					total += sum;
				}
			}
			return total;
		}

		/**
		 * 清理房间数据
		 */
		public clearRoom() {
			for (let i = 0; i < 5; i++) {
				this["gp" + (i + 1)].removeChildren();
				this["cmList" + (i + 1)] = [];
			}
			for (let i = 0; i < 3; i++) {
				this["xpoker" + i].visible = false;
				this["zpoker" + i].visible = false;
			}
			this.zdian.visible = false;
			this.xdian.visible = false;
			this.shuyinGroup.visible = false;
			this.clearWarScores();
		}

		/**
		 * 清理所有押注区域的分数
		 */
		public clearWarScores() {
			for (let i = 0; i < 5; i++) {
				this.updateWarScore(1, i, 0, false);
				this.updateWarScore(2, i, 0, false);
			}
		}

		/**
		 * 退出
		 */
		private async backBtnTouchEnded() {
			var quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
			if (quitResp) {
				if (quitResp.error && quitResp.error.code != 0) {
					Global.alertMediator.addAlert(quitResp.error.msg, () => {
					}, null, true);
					if (quitResp.error.code != -200) {
						CF.sN(SceneNotify.CLOSE_BJLGAME);
						CF.sN(SceneNotify.OPEN_BJLHALL);
					}
					return;
				}
				// Global.roomProxy.clearRoomInfo();
				if (quitResp.gold != undefined && quitResp.gold != null) {
					Global.playerProxy.playerData.gold = quitResp.gold;
				}
				CF.sN(SceneNotify.CLOSE_BJLGAME);
				CF.sN(SceneNotify.OPEN_BJLHALL);
				return;
			}

		}

		/**
         * 断线重连
         */
		private async reconnectSuc(e: egret.Event) {
			//对局已经结束不做处理
			let reqData = Global.gameProxy.lastGameConfig;
			let handler = ServerPostPath.hall_sceneHandler_c_enter;
			reqData['isContinue'] = false;
			let resp: any = await game.PomeloManager.instance.request(handler, reqData);
			if (!resp) {
				return;
			}
			if (!resp.error) {
				resp.error = {};
				resp.error.code = 0;
			}
			//游戏房间已经解散
			if (resp.error.code == -213) {
				CF.sN(SceneNotify.OPEN_BJLHALL);
				CF.sN(SceneNotify.CLOSE_BJLGAME);
				let text = TextUtils.instance.getCurrentTextById(63);
				Global.alertMediator.addAlert(text, null, null, true);
				//弹出提示
			}
		}

		/**
		 * 显示房间当前的状态
		 */
		private showRoomStatus(reconnect: boolean = false) {
			let roomInfo = Global.roomProxy.roomInfo;
			switch (roomInfo.roundStatus) {
				case ROOM_STATUS1.MOREN:
					this.lockYZ = false;
					this.roomState.source = RES.getRes(`bjle_game_zbz${CF.tic}`);
					if (reconnect) {
						this.onLineCards(3);
						this.showPlayers();
						this.showHeaders();
					}
					this.timeBar.visible = false;
					break;
				case ROOM_STATUS1.FREE:
					this.lockYZ = false;
					this.roomState.source = RES.getRes(`bjle_game_zbz${CF.tic}`);
					if (reconnect) {
						this.onLineCards(1);
						this.showPlayers();
						this.showHeaders();
					}
					this.timeBar.visible = false;
					break;
				case ROOM_STATUS1.START:
					this.lockYZ = false;
					this.roomState.source = RES.getRes(`bjle_game_zb${CF.tic}`);
					if (reconnect) {
						this.onLineCards(1);
						this.showPlayers();
						this.showHeaders();

					}
					this.timeBar.visible = false;
					break;
				case ROOM_STATUS1.BET:
					this.lockYZ = true;
					if (roomInfo.playway == 1) {
						this.roomState.source = RES.getRes(`bjle_game_xzz${CF.tic}`);
					}
					else if (roomInfo.playway == 2) {
						if (roomInfo.roomState == ROOM_STATUS1.MINI_HAND_CARD) {
							return;
						}
						else {
							this.roomState.source = RES.getRes(`bjle_game_xzz${CF.tic}`);
						}
					}
					if (reconnect) {
						this.onLineCards(1);
						this.showPlayers();
						this.showHeaders();
					}
					//this.zhengBianBei();
					this.timeBar.visible = true;
					break;
				case ROOM_STATUS1.NEW_CARD:
				case ROOM_STATUS1.STOP:
					this.lockYZ = false;
					if (reconnect) {
						if (roomInfo.playway == 1) {
							this.onLineCards(1);
							this.showPlayers();
							this.showHeaders();
							this.showCards();
						}
						else if (roomInfo.playway == 2) {
							this.onLineCards(1);
							this.showPlayers();
							this.showHeaders();
						}

					} else {
						if (roomInfo.playway == 1) {
							this.roomState.source = RES.getRes(`bjle_game_bpz${CF.tic}`);
						}
						else if (roomInfo.playway == 2) {
							this.roomState.source = RES.getRes(`bjl_mpz${CF.tic}`);
						}
					}
					this.timeBar.visible = false;
					break;
				case ROOM_STATUS1.SETTLEMENT:
					this.lockYZ = false;
					this.timeBar.visible = false;
					if (reconnect) {
						this.onLineCards(2);
						this.showPlayers();
						this.showHeaders();
						this.showCards();
					} else {
						this.roomState.visible = true;
						this.roomState.source = RES.getRes(`bjle_game_pjz${CF.tic}`);
					}
					break;
				case ROOM_STATUS1.MINI_IDLE_ADD_CARD:
					this.roomState.visible = true;
					this.roomState.source = RES.getRes(`bjl_xmp${CF.tic}`);
					this.timeBar.visible = true;
					if (reconnect) {
						this.xpaisValue(roomInfo.idleInitCards);
						this.zpaisValue(roomInfo.bankerInitCards);
						this.rerenderMiPaiUI(reconnect);
					}
					break;
				case ROOM_STATUS1.MINI_BANKER_ADD_CARD:
					this.roomState.visible = true;
					this.roomState.source = RES.getRes(`bjl_zmp${CF.tic}`);
					this.timeBar.visible = true;
					if (reconnect) {
						this.xpaisValue(roomInfo.idleInitCards);
						this.zpaisValue(roomInfo.bankerInitCards);
						this.rerenderMiPaiUI(reconnect);
					}
					break;
				case ROOM_STATUS1.MINI_HAND_CARD:
					this.timeBar.visible = true;
					// LogUtils.logD(`=====当前的状态=showRoomStatus==` + roomInfo.roundStatus + `playway:` + roomInfo.playway);
					this.changeMiPaiSource();
					if (reconnect) {
						this.xpaisValue(roomInfo.idleInitCards);
						this.zpaisValue(roomInfo.bankerInitCards);
						this.rerenderMiPaiUI(reconnect);
					}
					else {
						this.xpaisValue(roomInfo.idleInitCards);
						this.zpaisValue(roomInfo.bankerInitCards);
						//当庄闲都未下注 不弹出咪牌界面
						if (this.isZhuangMi == MIPAI_DIRECTION.EMPTY) {
							this.miPai.visible = false;
							return;
						};
						this.miPai.visible = true;
						let cardsValue = this.isZhuangMi == MIPAI_DIRECTION.ZHUANG_MI ? roomInfo.bankerInitCards : roomInfo.idleInitCards;
						this.miPai.setPokerValue(cardsValue, this.isZhuangMi);
					}
					break;
			}
		}
		private changeMiPaiSource() {
			let resName: string;
			if (this.isZhuangMi == MIPAI_DIRECTION.ZHUANG_MI) {
				resName = `bjl_zmp${CF.tic}`;
			}
			else if (this.isZhuangMi == MIPAI_DIRECTION.XIAN_MI) {
				resName = `bjl_xmp${CF.tic}`;
			}
			else {
				resName = `bjl_mpz${CF.tic}`;
			}
			LogUtils.logD("======1111resName===" + resName);
			this.roomState.visible = true;
			this.roomState.source = RES.getRes(resName);
		}
	}
}
const ROOM_STATUS1 = {
	MOREN: 0,//默认
	FREE: 1, //空闲状态
	START: 2, //开始
	BET: 3, //押注
	STOP: 4, //停止
	NEW_CARD: 5, //发牌
	SETTLEMENT: 6, //结算
	MINI_HAND_CARD: 7,//咪手牌
	MINI_IDLE_ADD_CARD: 8,  // 闲家咪补牌
	MINI_BANKER_ADD_CARD: 9  // 庄家咪补牌
};