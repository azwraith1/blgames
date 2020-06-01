module zajinhua {
	export class ZajinhuaGameScene extends game.BaseGameScene {
		public pmdKey: string = "zjh";
		//玩家组 1-5；
		private player1: eui.Group;
		//头像 1 - 5；
		private header1: ZajinhuaHeader;
		//自己的牌组
		private cards1: ZajinhuaCardListMine;
		//其他玩家的牌组2-5
		private cards2: ZajinhuaCardListOther;
		//座位号
		private directions: any;
		//动画组
		private effectGroup: eui.Group;
		//状态
		private status: number;
		//测试按钮
		private btns: eui.Button;
		//下拉
		private xlBtn: eui.Button;
		//弃牌
		private qpBtn: eui.Button;
		//弃牌灰
		private qpBtn0: eui.Button;
		//比牌
		private bpBtn: eui.Button;
		//比牌灰
		private bpBtn0: eui.Image;
		//加注
		private jzBtn: eui.Button;
		//加注灰
		private jzBtn0: eui.Image;
		//跟注
		private gzBtn: eui.Button;
		//自动跟注
		private zdgzBtn: eui.Button;
		//押注筹码
		private yzBtn1: ZajinhuaYzBtn;
		//操作按钮组
		private btnGroup: eui.Group;
		private btns0: eui.Button;
		//押注筹码组
		private yzGroup: eui.Group;
		//设置帮助组
		private setGroup: eui.Group;
		//防超时
		private fcs: eui.Image;
		private fcs1: eui.Image;
		//筹码Group
		private cmsGroup: eui.Group;
		private statusLabel: eui.Label;
		//点击看牌
		private openCard: eui.Button;
		//时间bar
		private timeBar: ZajinhuaTimerBar;
		//每个玩家占位1-4
		private p1: eui.Image;
		//弃牌操作语言
		//单次押注
		private dyz: eui.Label;
		//轮次
		private lunci: eui.Label;
		//总押注
		private zyz: eui.Label;
		//房间Id
		private roomid: eui.Label
		//跟注加注
		private gz2jz1: eui.Image;
		//点击组
		private bpGroup: eui.Group;
		private bpGroup1: eui.Group;
		private bpGroup2: eui.Group;
		private bpCard1: eui.Group;
		private bpCard2: eui.Group;
		private bpGroupEffect: eui.Group;
		private zdgzDB: eui.Group;
		private pokerGroup: eui.Group;
		private cd0: ZajinhuaCard;
		private gzyzGroup1: eui.Group;
		private box_texts: eui.Group;
		private zyzGroup: eui.Group;
		private fcsSet: boolean = true;
		private playerYzGroup2: eui.Group;
		private playerYzLabel2: eui.Label;

		private diFen: eui.Label;
		public constructor() {
			super();
			this.skinName = new ZajinhuaGameSkin();
		}

		public async createChildren() {
			super.createChildren();
			this.proxy = Global.roomProxy;
			this.timeBar.visible = false;
			let sceneId = Global.roomProxy.roomInfo.sceneId;
			let gameConfig = Global.gameProxy.lastGameConfig;
			this.diFen.text = "底分：" + gameConfig.diFen;
			this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), 5);
			this.chushihua();
			this.createDBComponents();
			if (!Global.roomProxy.reconnect) {
				this.createPokers();
			}
			this.showHeaders();
			SoundManager.getInstance().playMusic("zjh_bgm_mp3");
			// this.gzBtn["gzLable"].letterSpacing = -6;
			let publicMsg = PMDComponent.instance;
			publicMsg.anchorOffsetY = 24;
			publicMsg.horizontalCenter = 10;
			publicMsg.top = 40;
			this.recordBtn.top = this.helpBtn.top = this.settingBtn.top = this.xlBtn.top;
			let players = Global.roomProxy.getPlayers();
			for (let key in players) {
				if (Global.roomProxy.getMineIndex() == key) {
					if (Global.roomProxy.fcsIndex == 1) {
						this.fcs.alpha = 1;
					} else {
						this.fcs.alpha = 0;
					}
				}
				let dir = this.directions[key];
				this.playerSetNumber.push(Number(dir));
			}
			this.inits();
			for (let i = 1; i <= 5; i++) {
				let button = this[`yzBtn${i}`] as ZajinhuaYzBtn;
				button.addTouchOn();
			}
			var handler = ServerPostPath.game_zjhHandler_c_timeOutProject;
			let data = { project: Global.roomProxy.fcsIndex }
			let resp: any = await game.PomeloManager.instance.request(handler, data);
			if (resp && resp.error && resp.error.code == 0) {
			}
			//clubnew
			this.isClubGame = Global.roomProxy.roomInfo.tableId != undefined;
			if(this.isClubGame){
				this.recordBtn.visible = false;
			}
		}

		public onAdded() {
			super.onAdded();
			CF.aE(ENo.ZJH_CM_TOUCH, this.rbwarTouch, this);
			CF.aE(ENo.ZJH_HEADER_TOUCH, this.playerTouch, this);
			CF.aE(ServerNotify.s_addBet, this.s_addBet, this);
			CF.aE(ServerNotify.s_abandonCard, this.s_abandonCard, this);
			CF.aE(ServerNotify.s_lookCard, this.s_lookCard, this);
			CF.aE(ServerNotify.s_compareCardResult, this.s_compareCardResult, this);
			CF.aE(ServerNotify.s_playerHandCard, this.s_playerHandCard, this);
			CF.aE(ServerNotify.s_curPlay, this.s_curPlay, this);
			CF.aE(ServerNotify.s_countdown, this.s_countdown, this);
			CF.aE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
			CF.aE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
			CF.aE(ServerNotify.s_guZhuYiZhi, this.s_guZhuYiZhi, this);
			CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
			CF.aE(ServerNotify.s_roundMaxTurn, this.s_roundMaxTurn, this);
			CF.aE(ServerNotify.s_notify, this.guZhuYiZhiNotify, this);
			CF.aE(ServerNotify.s_operation, this.operation, this);


		}

		public onRemoved() {
			super.onRemoved();
			this.removeAllListen();
			this.clearAllTimeout();
		}

		private removeAllListen() {
			CF.rE(ENo.ZJH_CM_TOUCH, this.rbwarTouch, this);
			CF.rE(ENo.ZJH_HEADER_TOUCH, this.playerTouch, this);
			CF.rE(ServerNotify.s_addBet, this.s_addBet, this);
			CF.rE(ServerNotify.s_abandonCard, this.s_abandonCard, this);
			CF.rE(ServerNotify.s_lookCard, this.s_lookCard, this);
			CF.rE(ServerNotify.s_compareCardResult, this.s_compareCardResult, this);
			CF.rE(ServerNotify.s_playerHandCard, this.s_playerHandCard, this);
			CF.rE(ServerNotify.s_curPlay, this.s_curPlay, this);
			CF.rE(ServerNotify.s_countdown, this.s_countdown, this);
			CF.rE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
			CF.rE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
			CF.rE(ServerNotify.s_guZhuYiZhi, this.s_guZhuYiZhi, this);
			CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
			CF.rE(ServerNotify.s_roundMaxTurn, this.s_roundMaxTurn, this);
			CF.rE(ServerNotify.s_notify, this.guZhuYiZhiNotify, this);
			CF.rE(ServerNotify.s_operation, this.operation, this);
			this.box.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.box1, this);
		}


		/**
		 * 判断玩家是否能操作
		 */
		private isQp: boolean = false;
		private isBp: boolean = false;
		private isKp: boolean = false;
		private isJz: boolean = false;
		private isGz: boolean = false;
		private operation(e: egret.Event) {
			let data = e.data;
			this.isBp = data.Compare;
			this.isQp = data.canAbandon;
			this.isKp = data.canLook;
			this.isJz = data.Add;
			this.isGz = data.follow;
			if (this.btnGroup) {
				this.qpBtn.visible = this.isQp;
				this.qpBtn0.visible = !this.isQp;

				if (!this.isZdgz) {
					this.bpBtn.visible = this.isBp;
					this.bpBtn0.visible = !this.isBp;
				}
				this.openCard.visible = this.isKp;
			}
		}

		/**
		 * 测试所用，后期要删除
		 */
		private notifyCardsForTest(e: egret.Event) {
			let data = e.data;
			let playerIndex = data.playerIndex;
			let pattern = data.roundPattern;
			let cards = data.cards.value;
			let pais = this.exchangeCards(cards);
			if (Global.roomProxy.getMineIndex() == playerIndex) {
				if (pais.length > 0) {
					this.cards1.renderByList(this.sortPokers(pais), true);
					this.openCard.visible = false;
					this['timeout1'] = this.setAutoTimeout(() => {
						this.cards1.showFen(pattern);
					}, this, 150);
				}
			} else {
				let pi = this.directions[playerIndex];
				let cd = this["cards" + pi] as ZajinhuaCardListOther;
				let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
				if (!roomInfo) {
					return;
				}
				let players = roomInfo.players;
				if (pais.length > 0) {
					cd.renderByList(this.sortPokers(pais), true);
					this.setAutoTimeout(() => {
						cd.showFen(pattern);
					}, this, 150);
				}
			}
		}

		private box1(e: egret.TouchEvent) {
			if (this.box_texts.visible) {
				return;
			}
			this.box_texts.left = 10;
			this.box_texts.verticalCenter = -170;
			this.box_texts.visible = true;
			this.box_texts.scaleX = this.box_texts.scaleY = 0;
			egret.Tween.get(this.box_texts).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1, scaleY: 1 }, 100).wait(3000).call(() => {
				this.box_texts.visible = false;
			});
		}
		private clearAllTimeout() {
			for (let i = 1; i <= 50; i++) {
				egret.clearTimeout(this['timeout' + i]);
				this['timeout' + i] = null;
			}
		}


		/**
         * 断线重连
         */
		private async reconnectSuc(e: egret.Event) {
			//对局已经结束不做处理
			if (this.allowBack) {
				Global.alertMediator.addAlert("对局已经结束", null, null, true);
				this.backHall();
				return;
			}
			let reqData = Global.gameProxy.lastGameConfig;
			if (!reqData) reqData = {};
			if (!Global.roomProxy.roomInfo || !Global.roomProxy.roomInfo.roomId) {
				this.backHall();
				return;
			}
			reqData.roomId = Global.roomProxy.roomInfo.roomId;
			this.reconnectCall(reqData)
		}

		/**
		 * 最大上限后比牌
		 */
		private s_roundMaxTurn(e: egret.Event) {
			let d = e.data;
			game.UIUtils.removeSelf(this.timeBar);
			let startImage = new eui.Image("zjh_yxks_png_png");
			this.addChild(startImage);
			game.UIUtils.setAnchorPot(startImage);
			startImage.scaleX = 1;
			startImage.scaleY = 1;
			startImage.verticalCenter = -20;
			startImage.horizontalCenter = 0;
			egret.Tween.get(startImage).to({
				scaleX: 0.8,
				scaleY: 0.8,
			}, 500, egret.Ease.backOut).wait(700).to({ alpha: 0 }, 300).call(() => {
				game.UIUtils.removeSelf(startImage);
			}, this).call(() => {
				this.s_roundMaxTurn_next(d);
			}, this);
		}

		private s_roundMaxTurn_next(d) {
			let pi = d.playerIndex;
			let result = d.result;
			let header = this.directions[pi];
			let pais = this.exchangeCards(d.cards.value);
			if (Global.roomProxy.getMineIndex() == pi) {
				this.openCard.visible = false;
				if (pais.length > 0) {
					if (!this.isShowCardsNum(pi)) {
						this.cards1.renderByList(this.sortPokers(pais), true);
						this['timeout13'] = this.setAutoTimeout(() => {
							this.cards1.showFen(d.roundPattern);
						}, this, 150);
					}
				}
				this.caozuoBtnGroup(1);
				if (result == 1) {
					let ti = this.header1.getChildByName("1");
					if (ti) {
						ti.visible = false;
						game.UIUtils.removeSelf(ti);
					}
				} else {
					this.setAutoTimeout(() => {
						this.header1.bpwin2lose(true);
						this.cards1.paiBianHui();
						this.header1.bplose(true);
					}, this, 1500);
				}
			}
			if (header != 1) {
				let cd1 = this["cards" + header] as ZajinhuaCardListOther;
				cd1.renderByList(this.sortPokers(pais), true);
				this['timeout14'] = this.setAutoTimeout(() => {
					cd1.showFen(d.roundPattern);
				}, this, 150);
				if (result == 1) {
					this.otherPlayerTimeVisible(pi);
				} else {
					this.setAutoTimeout(() => {
						this["header" + header].bpwin2lose();
						cd1.paiBianHui();
						this["gz2jz" + header].source = "";
						this["header" + header].bplose(true);
					}, this, 1500);
				}
			}
		}

		/**
		 * 孤注一掷；
				playerIndex: 1, //玩家座位号
				result: 0, // 0.失败  1.成功
				design:true;
		*/
		private s_guZhuYiZhi(e: egret.Event) {
			let d = e.data;
			let pi = d.playerIndex;
			let header = this.directions[pi];
			let design = d.design;
			let image = this["gz2jz" + header] as eui.Image;
			image.visible = false;
			this['gzyzGroup' + header].visible = false;
			image.source = "";
			if (Global.roomProxy.checkIndexIsMe(pi)) {
				this.header1.updateGold(0);
			}
			//自己孤注一掷成功
			if (d.result == 1) {
				//this.sourcePlayer(d.playerIndex);
				let pais1 = this.exchangeCards(d.cards.value);
				if (Global.roomProxy.getMineIndex() == pi) {
					if (design) {
						this.player2plyerbyboom(pi);
					}
					this.caozuoBtnGroup(1);
					this.openCard.visible = false;
					//这里不需要给牌面赋值，会在另一个接口推牌。
				}
				if (header != 1) {
					let cd1 = this["cards" + header] as ZajinhuaCardListOther;
					if (design) {
						this.player2plyerbyboom(pi);
					}
					this["gz2jz" + header].source = "";
				}
			}
			//自己孤注一掷失败，只返回自己。
			if (d.result == 2) {
				//标记失败玩家。
				//this.sourcePlayer(d.playerIndex);
				this.setPlayerStus(4, pi);
				this["header" + header].bplose(true);
				let pais = this.exchangeCards(d.cards.value);
				if (Global.roomProxy.getMineIndex() == pi) {
					if (pais.length > 0) {
						this.boom2plyer(header);
						let ti = this.header1.getChildByName("1");
						if (ti) {
							ti.visible = false;
							game.UIUtils.removeSelf(ti);
						}
						this['timeout15'] = this.setAutoTimeout(() => {
							this.caozuoBtnGroup(1);
							this.header1.bpwin2lose(true);
							this.cards1.paiBianHui();
							this.openCard.visible = false;
							this['timeout16'] = this.setAutoTimeout(() => {
								this.showRestartBtn();
							}, this, 200);
							if (this.isShowCardsNum(pi)) {
								return;
							}
							this.cards1.renderByList(this.sortPokers(pais), true);
							this['timeout17'] = this.setAutoTimeout(() => {
								this.cards1.showFen(d.roundPattern);
							}, this, 150);
						}, this, 1500);
					}
				}
				if (header != 1) {
					this.boom2plyer(header);
					this.otherPlayerTimeVisible(header);
					this['timeout18'] = this.setAutoTimeout(() => {
						let cd1 = this["cards" + header] as ZajinhuaCardListOther;
						this["header" + header].bpwin2lose();
						cd1.paiBianHui();
						cd1.showFen(10);
						this["gz2jz" + header].source = "";
					}, this, 1500);
				}
			}
			//广播孤注一掷失败的玩家。
			if (d.result == 0) {
				let pais = this.exchangeCards(d.cards.value);
				if (Global.roomProxy.getMineIndex() == pi) {
					if (pais.length > 0) {
						this.cards1.renderByList(this.sortPokers(pais), true);
						this['timeout19'] = this.setAutoTimeout(() => {
							this.cards1.showFen(d.roundPattern);
						}, this, 150);
						this.header1.bpwin2lose(true);
						this.cards1.paiBianHui();
						this.openCard.visible = false;
						this.caozuoBtnGroup(1);
					}
				}
				this["header" + header].bplose(true);
				if (header != 1) {
					let cd1 = this["cards" + header] as ZajinhuaCardListOther;
					cd1.renderByList(this.sortPokers(pais), true);
					this['timeout20'] = this.setAutoTimeout(() => {
						cd1.showFen(d.roundPattern);
					}, this, 150);
					this["header" + header].bpwin2lose();
					cd1.paiBianHui();
					this["gz2jz" + header].source = "";
				}
			}
		}

		/**
		 * 广播孤注一掷
		 */
		private guZhuYiZhiNotify(e: egret.Event) {
			let d = e.data;
			let pi = this.directions[d.index];
			let gp = this["gzyzGroup" + pi] as eui.Group;
			let img = this["gz2jz" + pi] as eui.Image;
			img.visible = false;
			if (Global.roomProxy.getMineIndex() == d.index) {
				this.gzyzMine = new DBComponent("zjh_gzyz");
				this.gzyzGroup1.addChild(this.gzyzMine);
				this.gzyzMine.x = 0;
				this.gzyzMine.y = 10;
				this.gzyzMine.scaleX = this.gzyzMine.scaleY = 0.8;
				let time: any = this.header1.getChildByName(pi);
				if (time) {
					game.UIUtils.removeSelf(time);
				}
				this.gzyzMine.playByFilename(1);
				zjh.ZajinhuaUtils.playGzyz(this.findPlayerSex(d.index));
				this.gzyzMine.callback = () => {
					this['timeout21'] = this.setAutoTimeout(() => {
						this.gzyzMine.visible = false;
					}, this, 800);
				}
			} else {
				if (pi != 1) {
					img.source = "";
					let gzyz = new DBComponent("zjh_gzyz");
					this.otherPlayerTimeVisible(pi);
					gp.addChild(gzyz);
					gzyz.scaleX = gzyz.scaleY = 0.5;
					gzyz.x = -18;
					gzyz.y = 10;
					gzyz.playByFilename(1);
					zjh.ZajinhuaUtils.playGzyz(this.findPlayerSex(d.index));
					gzyz.callback = () => {
						this['timeout22'] = this.setAutoTimeout(() => {
							gzyz.visible = false;
						}, this, 800);
					}
				}
			}
		}

		/**
		 * 其他玩家时间操作
		 */
		private otherPlayerTimeVisible(player) {
			let header = this["header" + player] as ZajinhuaCardListOther;
			let ti = header.getChildByName(player);
			if (ti) {
				ti.visible = false;
				game.UIUtils.removeSelf(ti);
			}
		}

		/**
		 * 是否看牌
		 */
		private isShowCardsNum(index) {
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			let players = roomInfo.players;
			for (let i in players) {
				if (i = index) {
					let s = players[i]["isLookCards"];
					return s;
				}
			}
		}

		/**
		 * 炸弹炸自己。
		 */
		private boom2plyer(header) {
			if (Global.runBack) {
				return;
			}
			let gp = this["player" + header] as eui.Group;
			let hd = this["header" + header] as ZajinhuaHeader;
			this.boom = new DBComponent("bomb");
			gp.addChild(this.boom);
			this.boom.name = "boom";
			this.boom.scaleX = this.boom.scaleY = 0.6;
			this.boom.x = hd.x + 50;
			this.boom.y = 50;
			this.boom.play("fire_drop", 1);
			zjh.ZajinhuaUtils.PlayBoom();
			this.boom.callback = () => {
				this.boom.play("boom", 1);
				this.boom.callback = () => {
					this.boom.visible = false;
					if (gp.getChildByName("boom")) {
						game.UIUtils.removeSelf(gp.getChildByName("boom"));
					}
				}
			}
		}

		/**
		 * 炸弹炸别人
		 */
		private async player2plyerbyboom(pi) {
			if (Global.runBack) {
				return;
			}
			let header = this.directions[pi];
			let gp = this["player" + header] as eui.Group;
			let hd = this["header" + header] as ZajinhuaHeader;
			let players = this.findLivePlayer(pi);
			if (!players) {
				return;
			}
			for (let i = 0; i < players.length; i++) {
				let boom = new DBComponent("bomb");
				boom.name = "boom" + i;
				gp.addChild(boom);
				boom.x = hd.x + 20;
				boom.y = hd.y + 60;
				boom.scaleX = boom.scaleY = 0.6;
				boom.play("rotation", -1);
				let pi = this.directions[players[i]];
				let gp1 = this["player" + pi] as eui.Group;
				let hd1 = this["header" + pi] as ZajinhuaHeader;
				let point = gp1.globalToLocal(boom.localToGlobal().x, boom.localToGlobal().y);
				boom.x = point.x;
				boom.y = point.y;
				gp1.addChild(boom);
				if (!Global.runBack) {
					egret.Tween.get(boom).to({ x: hd1.x + 50, y: 60 }, 600 + (i * 200));
					this.setAutoTimeout(() => {
						boom.play("boom", 1);
						zjh.ZajinhuaUtils.PlayBoom();
						boom.callback = () => {
							if (gp1.getChildByName(boom.name)) {
								game.UIUtils.removeSelf(gp1.getChildByName(boom.name));
							}
						}
					}, this, 600 + (i * 200));
				}
			}
		}

		/**
		 * 初始化玩家。
		 */
		private inits() {
			let room = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			this.box.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.box1, this);
			this.lunci.text = "第" + room.curGameTurn + "/" + room.maxTurn + "轮"
			this.roomid.text = "牌局编号：" + room.roomId;
		}

		/**
	     * 展现玩家头像
	     */
		private showHeaders() {
			let players = Global.roomProxy.getPlayers();
			for (let key in players) {
				let dir = this.directions[key];
				let player = this['player' + dir] as eui.Group;
				let header = this['header' + dir] as ZajinhuaHeader;
				if (Global.roomProxy.checkIndexIsMe(key)) {
					let cards = this['cards' + dir] as ZajinhuaCardListMine;
				} else {
					let cards = this['cards' + dir] as ZajinhuaCardListOther;
				}
				header.initWithPlayer(players[key]);
				header.setIndex(key);
				player.visible = true;
				header.visible = true;
				let goldGroup = this[`playerYZGroup${dir}`] as eui.Group;
				if (goldGroup) {
					goldGroup.visible = true;
				}
				this.updateShowPlayerBet(key, players[key]);
			}
			if (Global.roomProxy.reconnect || Global.runBack) {
				this.timeBar.startTime(this);
				this.timeBar.visible = true;
				let roomInfo = Global.roomProxy.roomInfo;
				this.showRunTimeByStep(roomInfo);
			} else {
				this.setAutoTimeout(() => {
					this.showStartAni();
				}, this, 500);
			}
		}

		/**
		 * 开始游戏动画
		 */
		private showStartAni() {
			this.fapai_Promise();
		}

		/**
		 * 倒计时
		 */
		public s_countdown(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			if (!roomInfo.countdown) {
				roomInfo.countdown = {};
			}
			roomInfo.countdown = data;
			game.DateTimeManager.instance.updateServerTime(data.start);
		}

		/**
		 * 展现玩家当前下注总额
		 * @param  {} playerIndex
		 * @param  {} playerData
		 */
		private updateShowPlayerBet(playerIndex, playerData) {
			let dir = this.directions[playerIndex];
			let playerYzGroup = this[`playerYZGroup${dir}`];
			if (playerYzGroup) {
				playerYzGroup.visible = true;
				this[`playerYzLabel${dir}`].text = playerData.playerBet;
			}
		}

		/**
		 *  // 玩家加注(玩家加注、跟注都返回这个消息)
                playerIndex: 1, //玩家座位号
                addBet: 10, //本次押注金额
                type: 0,//1，不加2，加,3比牌；
                playerBet: 205, //玩家总押注
                sumPlayerBet: 1200, //房间玩家总押注
		 */
		private s_addBet(e: egret.Event) {
			let data = e.data;
			this.zyzs(data.sumPlayerBet);
			let player = this.directions[data.playerIndex];
			let header = this["header" + player] as ZajinhuaHeader;
			let playerGroup = this["player" + player] as eui.Group;
			let playerData = Global.roomProxy.getPlayerByIndex(data.playerIndex);
			playerData['playerBet'] = data.playerBet;
			this.updateShowPlayerBet(data.playerIndex, playerData);
			if (data.isAdd == 1) {
				this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, false), this["header" + player], 3);
				header.updateGold(data.ownGold, false);
			} else {
				if (data.playerIndex == Global.roomProxy.getMineIndex() && data.type == 1) {
					let player = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;

					if (!player) {
						return;
					}
					if (player.isLookCards) {
						this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, true), this.header1, player.sex);
					} else {
						this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, false), this.header1, player.sex);
					}
					this.header1.updateGold(data.ownGold, false);
					this.cmYzGroup(2)
					this.showBtnType(2);
				} else {
					if (player != 1) {
						let pi = Global.roomProxy.getPlayerInfoByIndex(data.playerIndex) as ZajinhuaRoomInfoBean;
						if (pi.isLookCards) {
							this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, true), this["header" + player], pi.sex);
						} else {
							this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, false), this["header" + player], pi.sex);
						}
						header.updateGold(data.ownGold, false);
						if (data.ownGold > 0) {
							if (data.type == 3) {
								let image = this["gz2jz" + player] as eui.Image;
								image.visible = true;
								image.source = "";
							}
							if (data.type != 3) {
								let image = this["gz2jz" + player] as eui.Image;
								image.visible = true;
								image.alpha = 0;
								image.source = RES.getRes(this.cz(data.type, player));
								egret.Tween.get(image).to({ alpha: 1 }, 200);
							}
						}
					}
				}
			}
		}

		/**
		 * 单注
		 */
		private dyzs(num) {
			this.dyz.text = "单注：" + num;
		}

		/**
		 * 总下注
		 */
		private flt: number = 0;
		private zyzs(num) {
			this.zyz.text = "总注：" + num;
			if (num / Global.roomProxy.roomInfo.betBase > 150 && this.flt == 0) {
				this.flt = 1;
			}
		}

		/**
		 * 根据玩家找性别。
		 */
		private findPlayerSex(index) {
			let player = Global.roomProxy.getPlayerByIndex(index);
			return player.sex;
		}

		/**
		 * 跟注还是加注，还是弃牌
		 */
		private cz(num, index) {
			switch (num) {
				case 1:
					// if (index == 2 || index == 3) {
					return "zjh_gz_1_png"
				// }
				// return "zjh_gz_2_png"
				case 2:
					// if (index == 2 || index == 3) {
					return "zjh_jz_1_png"
				// }
				// return "zjh_jz_2_png";
				// case 3:
				// 	if (index == 2 || index == 3) {
				// 		return "zjh_qp_1_png"
				// 	}
				// 	return "zjh_qp_2_png";
			}
		}

		/**
		 * 玩家弃牌
			playerIndex: 1, //玩家座位号
			addBet: 10, //本次押注金额
			playerBet: 205, //玩家总押注
                sumPlayerBet: 1200, //房间玩家总押注
		 */
		private s_abandonCard(e: egret.Event) {
			let data = e.data;
			let pi = this.directions[data.playerIndex];
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			let players = roomInfo.players;
			for (let i in players) {
				if (Global.roomProxy.getMineIndex() == data.playerIndex) {
					this['timeout23'] = this.setAutoTimeout(() => {
						this.mineDiscard(2);
					}, this, 210);
				}
				if (i == data.playerIndex) {
					players[i]["status"] = 2;
				}
			}
			if (pi != 1) {
				this.otherDiscard(pi);
			}
		}

		/**
		 * 广播玩家看牌
                playerIndex: 1, //玩家座位号
		 */
		private s_lookCard(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			let players = roomInfo.players;
			for (let i in players) {
				if (i == data.playerIndex) {
					players[i]["isLookCards"] = true;
				}
			}
			let pi = this.directions[data.playerIndex];
			if (pi != 1) {
				let card = this["cards" + pi] as ZajinhuaCardListOther;
				card.showLookPai(true);
				card.showFen(6);
			}
		}

		/**
		 * 创建好所有需要的龙骨动画
		 */
		private box: DBComponent;
		private pkDb: DBComponent;
		private zdgzDBs: DBComponent;
		private win: DBComponent;
		private boom: DBComponent;
		// private win1: DBComponent;
		// private win2: DBComponent;
		private gzyz: DBComponent;
		private word: DBComponent;
		private createDBComponents() {
			this.pkDb = DBComponent.create("zjh_vs", "zjh_vs");
			this.bpGroupEffect.addChild(this.pkDb);
			this.pkDb.x = 400;
			this.pkDb.y = 140;
			this.pkDb.visible = false;
			this.pkDb.play_first("zjh_vs", 1);
			this.pkDb.callback = () => {
			}

			this.box = new DBComponent("zjh_xq");
			this.touchGroup.addChild(this.box);
			this.box.x = 50;
			this.box.y = GameConfig.curHeight() / 2 - 100;
			this.box.visible = false;
			this.box.playByTime("zjh_xq_wait", -1);


			this.zdgzDBs = DBComponent.create("zjh_autobutton", "zjh_autobutton");
			this.zdgzDB.addChild(this.zdgzDBs);
			this.zdgzDBs.x = 78;
			this.zdgzDBs.y = 35;
			this.zdgzDBs.visible = false;
			this.zdgzDBs.callback = () => {
			}

			this.win = new DBComponent("zjh_win");
			this.effectGroup.addChild(this.win);
			this.win.scaleX = this.win.scaleY = 0.6;
			this.win.horizontalCenter = 0;
			this.win.verticalCenter = -100;
			this.win.visible = false;
			this.win.callback = () => {
			}

			// this.win1 = new DBComponent("win_2_wait");
			// this.effectGroup.addChild(this.win1);
			// this.win1.width = 512;
			// this.win1.height = 512;
			// this.win1.visible = false;
			// this.win1.callback = () => {
			// }

			// this.win2 = new DBComponent("win_2");
			// this.effectGroup.addChild(this.win2);
			// this.win2.visible = false;
			// this.win2.width = 512;
			// this.win2.height = 512;
			// this.win2.callback = () => {
			// }
		}

		private niuFenFDSX(num) {
			game.UIUtils.setAnchorPot(num);
			egret.Tween.get(num).to({ alpha: 1, scaleX: 1, scaleY: 1 }).to({ alpha: 1, scaleX: 0.6, scaleY: 0.6 }, 300)
		}


		/**
		 * 玩家比牌
			winIndex: 1, //赢家座位号
			FailIndex: 2, //输家座位号
			sourceIndex: 2, //比牌发起者
			targetIndex: 1, //被比牌者
		 */
		private s_compareCardResult(e: egret.Event) {
			let data = e.data;
			this.timeBar.visible = false;
			this.bipai_Promise(data);
			this.closebiPai();
		}

		//比牌发起者,扣钱。
		private sourcePlayer(sourceIndex) {
			if (Global.roomProxy.getMineIndex() == sourceIndex) {
				let player = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
				if (!player) {
					return;
				}
				if (player.isLookCards) {
					if (player.gold <= Global.roomProxy.roomInfo.minYZ * 2) {
						this.playerYzAni(player.gold, 3, this.findCmByMoney(player.gold, true), this.header1, 3);
						this.header1.updateGold(-player.gold, true);
					} else {
						this.playerYzAni(Global.roomProxy.roomInfo.minYZ * 2, 3, this.findCmByMoney(Global.roomProxy.roomInfo.minYZ * 2, true), this.header1, 3);
						this.header1.updateGold(-Global.roomProxy.roomInfo.minYZ * 2, true);
					}
				} else {
					if (player.gold <= Global.roomProxy.roomInfo.minYZ) {
						this.playerYzAni(player.gold, 3, this.findCmByMoney(player.gold, false), this.header1, 3);
						this.header1.updateGold(-player.gold, true);
					} else {
						this.playerYzAni(Global.roomProxy.roomInfo.minYZ, 3, this.findCmByMoney(Global.roomProxy.roomInfo.minYZ, false), this.header1, 3);
						this.header1.updateGold(-Global.roomProxy.roomInfo.minYZ, true);
					}
				}
				this.showBtnType(2);
			}
		}

		/**
		 * 比牌动画
		 */
		private windex: any;
		private lindex: any;
		private async bipai_Promise(data1: [any]) {
			let showCount = data1.length;
			let lists = data1.concat();
			async.eachSeries(lists, (data, callback) => {
				let sourceIndex = data.sourceIndex;
				zjh.ZajinhuaUtils.playBp(this.findPlayerSex(sourceIndex));//比牌声音；
				let targetIndex = data.targetIndex;
				let winIndex = data.winIndex;
				this.windex = data.winIndex;
				let FailIndex = data.FailIndex;
				this.lindex = data.FailIndex;
				this.sourcePlayer(sourceIndex);
				let p1 = this.directions[sourceIndex];
				let p2 = this.directions[targetIndex];
				let p3 = this.directions[winIndex];
				let p4 = this.directions[FailIndex];
				if (Global.roomProxy.getMineIndex() == sourceIndex || Global.roomProxy.getMineIndex() == targetIndex) {
					//比牌发起者，或者被比牌。
					this.openCard.visible = false;
					this.caozuoBtnGroup(1);
				}
				if (Global.roomProxy.getMineIndex() == sourceIndex) {
					//移除时间
					let time: any = this.header1.getChildByName("1");
					if (time) {
						game.UIUtils.removeSelf(time);
					}
				}
				//设置输家。
				this.setPlayerStus(4, FailIndex)
				//比牌动画。
				this.tweenSync1(p1, p2, p3, p4);
				this.setAutoTimeout(callback, this, 2500);
			});
		}

		/**
		 * 设置玩家状态
		 */
		private setPlayerStus(value, index) {
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			let players = roomInfo.players;
			for (let i in players) {
				if (i == index) {
					players[i]["status"] = value;
				}
			}
		}

		/**
		 * 比牌动画。
		 * 玩家playerIndex
		 */
		private vsDb: any;
		private bpGroupRect: eui.Rect;
		private async tweenSync1(player1, player2, p3, p4) {
			this.bpGroup.visible = true;
			this.bpGroupRect.visible = true;
			this.touchGroup.addChild(this.bpGroupRect);
			this.touchGroup.addChild(this.bpGroup);
			let cd1;
			let cd2;
			if (player1 == 1) {//等于自己。
				cd1 = this["cards" + player1] as ZajinhuaCardListMine;
			} else {
				cd1 = this["cards" + player1] as ZajinhuaCardListOther;
			}
			if (player2 == 1) {
				cd2 = this["cards" + player2] as ZajinhuaCardListMine;
			} else {
				cd2 = this["cards" + player2] as ZajinhuaCardListOther;
			}
			cd1.visible = cd2.visible = false;
			this["gz2jz" + player2].visible = false;
			let hd1 = this["header" + player1] as ZajinhuaHeader;
			let hd2 = this["header" + player2] as ZajinhuaHeader;
			let point1 = this.bpGroup1.globalToLocal(hd1.localToGlobal().x, hd1.localToGlobal().y);
			let point2 = this.bpGroup2.globalToLocal(hd2.localToGlobal().x, hd2.localToGlobal().y);
			hd1.x = point1.x;
			hd1.y = point1.y;
			this.bpGroup1.addChild(hd1);
			hd2.x = point2.x;
			hd2.y = point2.y;
			this.bpGroup2.addChild(hd2);
			if (Global.runBack) {
				hd1.x = 0; hd1.y = 0;
				hd2.x = this.bpGroup2.width - hd2.width;
				hd2.y = 0;
			} else {
				egret.Tween.get(hd1).to({ x: 0, y: 0 }, 400);
				egret.Tween.get(hd2).to({ x: this.bpGroup2.width - hd2.width, y: 0 }, 400);
			}
			this.setAutoTimeout(() => {
				this.bpCard1.visible = this.bpCard2.visible = true;
				this.pkDb.playByTime("zjh_vs", 1);
				this.pkDb.callback = () => {
					this.findheaders(player1, p3);
				}
			}, this, 550);
			setTimeout(() => {
				this.bipaiOver(player1, player2, hd1, hd2, p3, p4);
			}, 3000);
		}

		/**
		 * 比牌结束
		 */
		private bipaiOver(player1, player2, hd1, hd2, p3, p4) {
			this.pkDb.visible = false;
			this.bpGroup.visible = false;
			this.bpGroupRect.visible = false;
			this.bpCard1.visible = false;
			this.bpCard2.visible = false;
			let gp1 = this["player" + player1] as eui.Group;
			let gp2 = this["player" + player2] as eui.Group;
			let point3 = gp1.globalToLocal(hd1.localToGlobal().x, hd1.localToGlobal().y);
			let point4 = gp2.globalToLocal(hd2.localToGlobal().x, hd2.localToGlobal().y);
			hd1.x = point3.x;
			hd1.y = point3.y;
			gp1.addChild(hd1);
			hd2.x = point4.x;
			hd2.y = point4.y;
			gp2.addChild(hd2);
			this.overBipaishowPlayer(player1, p3, gp1, hd1);
			this.overBipaishowPlayer(player2, p3, gp2, hd2);
		}
		/**
		 * 比牌结束后显示玩家状态。
		 */
		private overBipaishowPlayer(player1, p3, gp1, hd1) {
			let setX: any;
			let setY: any;
			switch (player1) {
				case "1":
				case 1:
					setX = 0;
					setY = 0;
					break;
				case "2":
				case 2:
					setX = 177;
					setY = 0;
					break;
				case "3":
				case 3:
					setX = 177;
					setY = 0;
					break;
				case "4":
				case 4:
					setX = 0;
					setY = 0;
					break;
				case "5":
				case 5:
					setX = 0;
					setY = 0;
					break;
			}
			// if (player1 != 2 && player1 != 3) {//比牌发起者设置坐标位置。2,3号位是一组，其他另一组。
			// 	setX = -15; setY = 0;
			// } else {
			// 	setX = gp1.width - hd1.width + 11; setY = 0;
			// }
			egret.Tween.removeTweens(hd1);
			if (Global.runBack) {
				hd1.x = setX;
				hd1.y = setY
			} else {
				egret.Tween.get(hd1).to({ x: setX, y: setY }, 400);
			}
			this.setAutoTimeout(() => {
				if (player1 == p3) {//比牌发起者同时也是比牌赢家情况
					if (Global.roomProxy.getMineIndex() == this.windex) {
						this.caozuoBtnGroup(3);
						let isLook = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
						if (!isLook) {
							return;
						}
						this.cards1.visible = true;
						if (!isLook.isLookCards) {
							this.openCard.visible = true;
						}
					} else {
						this.winPlayer(player1);
					}
				} else {
					//比牌发起者同时也是比牌输家情况
					if (Global.roomProxy.getMineIndex() == this.lindex) {
						this.openCard.visible = false;
						this.header1.bpwin2lose(true);
						this.header1.bplose(true)
						this.cards1.paiBianHui();
						this.cards1.visible = true;
						this.setAutoTimeout(() => {
							this.showRestartBtn();
						}, this, 400);
					} else {
						this.losePlayer(player1);
					}
				}
				if (Global.roomProxy.getMineIndex() == this.windex) {
					if (this.isTwoPlayer) {
						this.caozuoBtnGroup(1);
					}
				}
				if (!this.findLivePlayer()) {
					return;
				}
				if (this.findLivePlayer().length == 0 && Global.roomProxy.getMineIndex() == this.windex) {
					this.caozuoBtnGroup(1);
				}
			}, this, 400);
		}

		private createBoom() {
			if (Global.runBack) {
				return;
			}
			this.boom = new DBComponent("bomb");
			this.bpGroup.addChild(this.boom);
			this.boom.name = "boom1";
			this.boom.width = 169;
			this.boom.height = 160;
			this.boom.scaleX = this.boom.scaleY = 0.8;
			this.boom.visible = false;
			this.boom.callback = () => {
			}
			return this.boom;
		}


		/**
		 * 找炸弹的头像
		 */
		private findheaders(p1, p3) {
			let boom = this.createBoom();
			if (p1 == p3) {
				boom.x = 170;
				boom.y = 110;
				boom.play("rotation", -1);
				egret.Tween.get(this.boom).to({ x: 1120, y: 160 }, 800, egret.Ease.sineIn).call(() => {
					this.boom.play("boom", 1);
					zjh.ZajinhuaUtils.PlayBoom();
					this.boom.callback = () => {
						if (this.bpGroup.getChildByName("boom1")) {
							game.UIUtils.removeSelf(this.bpGroup.getChildByName("boom1"));
						}
					}
				})
			} else {
				boom.x = 1120;
				boom.y = 160;
				boom.play("rotation", -1);
				egret.Tween.get(this.boom, ).to({ x: 170, y: 110 }, 800, egret.Ease.sineIn).call(() => {
					this.boom.play("boom", 1);
					zjh.ZajinhuaUtils.PlayBoom();
					this.boom.callback = () => {
						if (this.bpGroup.getChildByName("boom1")) {
							game.UIUtils.removeSelf(this.bpGroup.getChildByName("boom1"));
						}
					}
				})
			}
		}

		/**
		 * 操作按钮组效果
		 */
		private caozuoBtnGroup(num) {
			egret.Tween.removeTweens(this.btnGroup);
			if (num == 1) {
				this.yzGroup.visible = false;
				egret.Tween.get(this.btnGroup).to({ right: -this.btnGroup.width }, 200);
				this.setAutoTimeout(() => {
					this.btnGroup.visible = false;
				}, this, 200);
			} else if (num == 2) {
				this.btnGroup.right = -this.btnGroup.width;
				this.btnGroup.visible = true;
				egret.Tween.get(this.btnGroup).to({ right: 0 }, 200);
			} else if (num == 3) {
				this.btnGroup.right = 0;
				this.btnGroup.visible = true;
			}
		}

		/**
		 * 筹码组动态。
		 */
		private cmYzGroup(num) {
			if (num == 1) {
				this.yzGroup.right = -437;
				egret.Tween.get(this.yzGroup).to({ right: 0 }, 100);
				this.yzGroup.visible = true;
			} else {
				egret.Tween.get(this.yzGroup).to({ right: -437 }, 100).call(() => {
					this.yzGroup.visible = false;
				});
			}
		}

		/**
		 *移除比牌
		 */
		private ycBiPai() {
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			let players = roomInfo.players;
			for (let i in players) {
				let pi = this.directions[i];
				this["header" + pi].showBiPai(false);
			}
		}

		/**
		 * 广播玩家手牌(看牌、比牌)；
                playerIndex: 1, //玩家座位号
                cards: [], //扑克
                pattern: 0, //牌型
				:boolean;
		 */
		private qpcards: any;
		private s_playerHandCard(e: egret.Event) {
			let data = e.data;
			let playerIndex = data.playerIndex;
			let pattern = data.roundPattern;
			let cards = data.cards.value;
			let pais = this.exchangeCards(cards);
			if (data.isAbandon) {
				this.qpcards = data;
				return;
			}
			if (Global.roomProxy.getMineIndex() == playerIndex) {
				if (pais.length > 0) {
					if (this.isShowCardsNum(playerIndex)) {
						return;
					}
					if (Global.runBack) {
						this.cards1.renderByList(this.sortPokers(pais), false);
						this.openCard.visible = false;
						this.caozuoBtnGroup(1);
						this.cards1.showFen(pattern);
						return;
					}
					this.cards1.renderByList(this.sortPokers(pais), true);
					this.openCard.visible = false;
					this['timeout1'] = this.setAutoTimeout(() => {
						this.cards1.showFen(pattern);
					}, this, 150);
				}
			} else {
				let pi = this.directions[playerIndex];
				let cd = this["cards" + pi] as ZajinhuaCardListOther;
				let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
				if (!roomInfo) {
					return;
				}
				cd.resetPosition();
				let players = roomInfo.players;
				for (let i in players) {
					if (players[i]["status"] == 2 && i == playerIndex) {
						cd.paiBianHui();
					}
				}
				if (Global.runBack) {
					cd.houtaiRun(this.sortPokers(pais));
					cd.showFen(pattern);
					return;
				}
				if (pais.length > 0) {
					cd.renderByList(this.sortPokers(pais), true);
					this.setAutoTimeout(() => {
						cd.showFen(pattern);
					}, this, 150);
				}
			}
		}


		/**
		 * 把poker转换成数组。
		 */
		private exchangeCards(cards) {
			let cars = [];
			for (let i in cards) {
				if (i.length == 3) {
					cars.push(Number(i));
				}
			}
			return cars;
		}

		/**
		 * 播放输掉动画
		 */
		private playLoseDb() {
			let lose = new DBComponent("zjh_lose") as DBComponent;
			lose.scaleX = lose.scaleY = 0.6;
			this.touchGroup.addChild(lose);
			lose.horizontalCenter = 0;
			lose.verticalCenter = -100;
			lose.playByFilename(1);
		}


		/**
		 * 结算
		 */
		private fcsGroup1: eui.Group;
		private s_roundSettlement(e: egret.Event) {
			let data = e.data;
			this.timeBar.removeTimer();
			this.timeBar.visible = false;
			this.openCard.visible = false;
			this.fcsGroup.visible = false;
			this.fcsGroup1.visible = false;
			if (data) {
				for (let i in data) {
					if (Global.roomProxy.checkIndexIsMe(i)) {
						this.header1.updateGold(data[i]["ownGold"]);
						this.header1.showLiushuiLabel(data[i]["gainGold"], data[i]["happyGold"]);
						if (data[i]["gainGold"] > 0) {
							let cars = data[i]["cards"]["value"];
							let roundptn = data[i]["roundPattern"];
							this.coin2Component(this.header1, 1, cars, roundptn, data[i]["happyGold"], true);
							this.caozuoBtnGroup(1);
							this.gz2jz1.source = "";
							this.openCard.visible = false;
							let ti = this.header1.getChildByName("1");
							if (ti) {
								game.UIUtils.removeSelf(ti);
							}
							this.win.playByFilename(1);
						} else {
							//播放输了
							this.playLoseDb();
						}
					} else {
						if (i != "dealerIndex") {
							let pi = this.directions[i];
							let header = this["header" + pi] as ZajinhuaHeader;
							header.updateGold(data[i]["ownGold"]);
							header.showLiushuiLabel(data[i]["gainGold"], data[i]["happyGold"]);
							if (data[i]["gainGold"] > 0) {
								let cars = data[i]["cards"]["value"];
								let roundptn = data[i]["roundPattern"];
								this.coin2Component(header, pi, cars, roundptn, data[i]["happyGold"], false);
								this["gz2jz" + pi].source = "";
								this.otherPlayerTimeVisible(pi);
							}
						}
					}
				}
			}
		}

		/**
		 * 游戏结束
		 * @param  {egret.TouchEvent} e
		 */
		private s_roomFinished(e: egret.Event) {
			super.roomGameOver(e);
			let data = e.data;
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			roomInfo.roundStatus = data.status;
			this.timeBar.visible = false;
			this.timeBar.removeTimer();
		}

		/**
		 * 当前玩家操作。
		 * playerIndex: 1,
           curGameTurn: 4, //当前游戏轮数
           minBet:1 // 最低跟注(是未看牌)
		 */
		private minYZ: any;
		private curPlayer: any;
		private s_curPlay(e: egret.Event) {
			let data = e.data;
			this.curPlayer = data.playerIndex;
			this.lunci.text = "第" + data.curGameTurn + "/" + Global.roomProxy.roomInfo.maxTurn + "轮"
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			this.cmNumList = roomInfo.betRatio;
			let playerIndex = this.directions[data.playerIndex];
			let headerGroup = this["header" + playerIndex] as ZajinhuaHeader;
			this.timeBar.startTime(this);
			this.timeBar.visible = true;
			headerGroup.addChild(this.timeBar);
			this.timeBar.name = playerIndex;
			this.timeBar.x = headerGroup.headerImage_mask.x;
			this.timeBar.y = headerGroup.headerImage_mask.y;
			roomInfo.minYZ = data.minBet;
			let currentLunci = roomInfo['curTurns'];
			this[`gz2jz${playerIndex}`].visible = false;
			Global.roomProxy.roomInfo['curTurns'] = data.curGameTurn;
			this.dyzs(data.minBet);
			if (Global.roomProxy.checkIndexIsMe(data.playerIndex)) {
				this.closebiPai();
				if (this.isZdgz) {//自动跟注。
					this.bpBtn.visible = false;
					this.bpBtn0.visible = true;
					this.jzBtn.visible = false;
					this.jzBtn0.visible = true;
					this['timeout2'] = this.setAutoTimeout(() => {
						this.gz();
					}, this, 500);
				} else {
					this.showBtnType(1);
					this.showBtnS();
				}
			}

		}

		private cleatAllTalkAbout() {
			for (let i = 1; i <= 5; i++) {
				this[`gz2jz${i}`].source = "";
				this[`gz2jz${i}`].visible = false;
			}
		}

		/**
		 * 展示下次加注按钮的状态
		 */
		private showBtnS() {
			this.initCMList();
			let islook = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
			if (!islook) {
				return;
			}
			if (islook.isLookCards) {
				if (this.cmNumList[this.cmNumList.length - 1] * 2 <= Global.roomProxy.roomInfo.minYZ * 2 || islook.gold < this.choseMoney(Global.roomProxy.roomInfo.minYZ * 2)) {
					this.jzBtn0.visible = true;
				} else {
					this.jzBtn.visible = true;
				}
				this.gzBtn["gzLable"].text = Global.roomProxy.roomInfo.minYZ * 2;
			} else {
				if (this.cmNumList[this.cmNumList.length - 1] <= Global.roomProxy.roomInfo.minYZ || islook.gold < this.choseMoney(Global.roomProxy.roomInfo.minYZ)) {
					this.jzBtn0.visible = true;
				} else {
					this.jzBtn.visible = true;
				}
				this.gzBtn["gzLable"].text = Global.roomProxy.roomInfo.minYZ;
			}

		}

		//找下次押注的钱。
		private choseMoney(money) {
			for (let i = 0; i < this.cmNumList.length; i++) {
				if (this.cmNumList[i] == money) {
					if (i != 4) {
						return this.cmNumList[i + 1];
					} else {
						return this.cmNumList[i];
					}
				}
			}
		}

		/**
		 * 自带监听
		 */
		private flag: boolean = false;
		private flag1: boolean = false;
		private flag2: boolean = false;
		public async onTouchTap(e: egret.TouchEvent) {
			let sum = 0;
			e.stopPropagation();
			switch (e.target) {
				case this.restartBtn:
					this.allowBack = this.restartBtn.visible;
					let roomInfo = Global.roomProxy.roomInfo;
					//clubnew
					if (this.isClubGame) {
						this.back2ReadyScene(() => {
							ZJHClubReadyScene.instance.show(true);
							CF.sN(this.CLOSE_NOTIFY);
						}, () => {
							CF.sN(this.CLOSE_NOTIFY);
						});
						return;
					}
					this.restartBtnTouch();
					break;
				case this.backBtn:
					this.allowBack = this.restartBtn.visible;
					this.backBtnTouch();
					break;
				case this.settingBtn:
					this.flag = false;
					this.gnBtnAni(false);
					CF.sN(PanelNotify.OPEN_ZJHSET);
					break;
				case this.xlBtn:
					var type = (this.flag = !this.flag) ? true : false;
					this.gnBtnAni(type);
					break;
				case this.helpBtn:
					this.flag = false;
					this.gnBtnAni(false);
					CF.sN(PanelNotify.OPEN_ZJHHELP);
					break;
				case this.recordBtn:
					this.flag = false;
					this.gnBtnAni(false);
					CF.sN(PanelNotify.OPEN_ZJHRECORD);
					break
				case this.qpBtn:
					this.qpBtn.enabled = false;
					let isLook = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
					if (!isLook) {
						return;
					}
					if (isLook.isLookCards) {
						this.mineDiscard(1);
					} else {
						Global.alertMediator.addAlert("你未看牌，确定要弃牌", () => {
							this.mineDiscard(1);
						}, () => {
							this.qpBtn.enabled = true;
						}, false);
					}
					break;
				case this.bpBtn:
					this.bpBtn.enabled = false;
					this.bp();
					if (this.yzGroup) {
						this.cmYzGroup(2)
					}
					break;
				case this.jzBtn:
					if (!this.yzGroup) {
						this.cmYzGroup(2)
					} else {
						this.mineAddBet()
					}
					break;
				case this.gzBtn:
					this.gzBtn.enabled = false;
					this.gzBtn.visible = false;
					this.zdgzBtn.visible = true;
					this.jzBtn.visible = false;
					this.jzBtn0.visible = true;
					this.bpBtn.visible = false;
					this.bpBtn0.visible = true
					this.gz();
					if (this.yzGroup) {
						this.cmYzGroup(2)
					}
					break;
				case this.openCard:
					this.openMineCards();
					if (this.yzGroup) {
						this.cmYzGroup(2)
					}
					break;
				case this.zdgzBtn:
					var type = (this.flag1 = !this.flag1) ? true : false;
					this.zdgz(type);
					break;
				case this.fcs:
					this.overTimeProtect();
					break;
				// case this.fcs1:
				// 	// this.fcs.visible = true;
				// 	this.overTimeProtect(false);
				// 	break;
				case this.touchGroup:
					if (this.yzGroup) {
						this.cmYzGroup(2)
					}
					this.closebiPai();
					this.flag = false;
					this.gnBtnAni(false);
					break;
			}
		}

		/**
		 * 跟注
		 */
		private async gz() {
			this.closebiPai();
			var handler = ServerPostPath.game_zjhHandler_c_followBet;
			let cardss = {};
			let resp: any = await game.PomeloManager.instance.request(handler, cardss);
			if (resp.error && resp.error.code != 0) {
				if (resp.error.msg != "成功") {
					Global.alertMediator.addAlert(resp.error.msg);
					this.gzBtn.enabled = true;
					game.PomeloManager.instance.disConnectAndReconnect();
					return;
				}
			}
			this.gzBtn.enabled = true;
			this.showBtnType(2);
		}

		private isZdgz: boolean = false;//自动跟注;
		private light: any;
		private zdgz(type) {
			this.isZdgz = type;
			if (type) {
				this.zdgzDBs.playByTime("zjh_autobutton", -1);
			} else {
				this.zdgzDBs.visible = false;
			}
		}

		/**
		 * 展示按钮组，加注，跟注状态
		 */
		private showBtnType(num) {
			this.bpBtn.visible = num == 1 ? true : false;
			this.jzBtn.visible = num == 1 ? true : false;
			this.gzBtn.visible = num == 1 ? true : false;

			this.zdgzBtn.visible = num == 1 ? false : true;
			this.bpBtn0.visible = num == 1 ? false : true;
			this.jzBtn0.visible = num == 1 ? false : true;
		}

		/**
		 * 自己点击开牌
		 */
		private async openMineCards() {
			let islook = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
			if (!islook) {
				return;
			}
			if (Global.roomProxy.getMineIndex() == this.curPlayer) {
				this.gzBtn["gzLable"].text = Global.roomProxy.roomInfo.minYZ * 2;
				if (islook.gold < Global.roomProxy.roomInfo.minYZ * 2 || Global.roomProxy.roomInfo.minYZ == this.cmNumList[this.cmNumList.length - 1]) {
					this.jzBtn0.visible = true;
					this.jzBtn.visible = false;
				} else {
					this.jzBtn.visible = true;
					this.jzBtn0.visible = false;
				}
			}
			var handler = ServerPostPath.game_zjhHandler_c_lookCard;
			let cardss = {};
			let resp: any = await game.PomeloManager.instance.request(handler, cardss);
			if (!resp || !resp.cards) {
				return;
			}
			this.openCard.visible = false;
			if (this.isKp) {
				this.isKp = false;
			}
			this.isKp = false;
			let data = resp.cards.value;
			let pais = this.exchangeCards(data);
			if (pais.length > 0) {
				this.cards1.renderByList(this.sortPokers(pais), true);
				this['timeout3'] = this.setAutoTimeout(() => {
					this.cards1.showFen(resp.roundPattern);
				}, this, 150);
			}
		}

		/**
		 * 比牌
		 */
		private isTwoPlayer: boolean = false;
		private async bp() {
			let plList = this.findLivePlayer();
			if (plList.length > 1) {
				for (let i = 0; i < plList.length; i++) {
					let pi = this.directions[plList[i]];
					this["header" + pi].showBiPai(true);
				}
			} else {
				this.isTwoPlayer = true;
				var handler = ServerPostPath.game_zjhHandler_c_compareCard;
				let cardss = { playerIndex: plList[0] };
				let resp: any = await game.PomeloManager.instance.request(handler, cardss);
				if (resp.error && resp.error.code != 0 && resp.error.msg != "成功") {
					Global.alertMediator.addAlert(resp.error.msg);
					return;
				}
			}
		}


		/**
		 * 寻找可操作玩家
		 */
		private findLivePlayer(header?) {
			let plList = [];
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			let players = roomInfo.players;
			if (header) {
				for (let i in players) {
					if (i != header) {
						let s = players[i]["status"];
						if (s != 2 && s != 4) {
							plList.push(i);
						}
					}
				}
				return plList;
			} else {
				for (let i in players) {
					if (i != Global.roomProxy.getMineIndex()) {
						let s = players[i]["status"];
						if (s != 2 && s != 4) {
							plList.push(i);
						}
					}
				}
				return plList;
			}
		}

		/**
		 * 比牌赢家展示其他客户端
		 */
		private winPlayer(index) {
			let hd = this["header" + index] as ZajinhuaHeader;
			let cd = this["cards" + index] as ZajinhuaCardListOther;
			let gzjz = this["gz2jz" + index] as eui.Image;
			// cd.resetPosition();
			cd.visible = true;
			hd.bplose(false);
			gzjz.source = "";
		}

		/**
		 * 比牌输家展示其他客户端
		 */
		private losePlayer(index) {
			let hd = this["header" + index] as ZajinhuaHeader;
			let gzjz = this["gz2jz" + index] as eui.Image;
			let cd = this["cards" + index] as ZajinhuaCardListOther;
			this["header" + index].bpwin2lose();
			cd.paiBianHui();
			cd.showFen(10);
			hd.bplose(true);
			gzjz.source = "";
			cd.visible = true;
		}

		/**
		 * 创牌
		 */
		private createPokers() {
			if (Global.runBack) {
				return;
			}
			// let length = this.playerSetNumber.length;
			let players = Global.roomProxy.roomInfo.players;
			let length = _.keys(players).length;
			for (let i = 0; i <= length * 3 - 1; i++) {
				let tempPokers: ZajinhuaCard = ObjectPool.produce("zjh_poker", ZajinhuaCard);
				if (!tempPokers) {
					tempPokers = new ZajinhuaCard();
				}
				game.UIUtils.setAnchorPot(tempPokers);
				this.touchGroup.addChild(tempPokers);
				tempPokers.name = "poker" + i;
				tempPokers.scaleX = 0.5;
				tempPokers.scaleY = 0.5;
				tempPokers.alpha = 0;
				tempPokers.rotation = -90;
				tempPokers.x = GameConfig.CURRENT_WIDTH / 2;
				tempPokers.y = 0;
			}
		}



		/**
		 * 给每个玩家一张一张的发牌;
		 * 根据每个玩家本地座位号实现。
		 */
		private playerSetNumber = [];
		private showCount = 0;
		private async fapai_Promise() {
			this.showCount = 3;
			let after = [];
			let startIndex = Global.roomProxy.roomInfo.dealer;
			let before = [];
			for (let i = 0; i < this.playerSetNumber.length; i++) {
				let index = this.playerSetNumber[i];
				if (index >= startIndex) {
					before.push(index)
				} else {
					after.push(index);
				}
			}
			let arr = before.concat(after);
			this.playerSetNumber = arr;
			let count = 0;
			do {
				for (let i = 0; i < this.playerSetNumber.length; i++) {
					this.tweenSync(i + this.playerSetNumber.length * (3 - this.showCount), this.playerSetNumber[i], this.showCount, count);
					count++;
				}
				this.showCount--;
				if (this.showCount == 0) {
					let player = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
					if (player) {
						if (player["status"] < 2) {
							this.setAutoTimeout(() => {
								this.openCard.visible = this.isKp;
							}, this, 1000);
							this.caozuoBtnGroup(2);
						}
					}
				}
			} while (this.showCount > 0);
		}



		private tweenSync(i, number, showCount, index) {
			let poker = this.touchGroup.getChildByName("poker" + ((this.playerSetNumber.length * 3 - 1) - i));
			this.setAutoTimeout(() => {
				zjh.ZajinhuaUtils.fapai();
			}, this, (index - 1) * 155 / 2);
			let time1 = index * 155 / 2;
			let moveTime = 150;
			if (number == 1) {
				let targetCard = this.cards1[`card${this.showCount - 1}`] as eui.Component;
				let pos = targetCard.localToGlobal();
				egret.Tween.get(poker).wait(time1).to({ x: pos.x + targetCard.width / 2 * 0.75, y: pos.y + targetCard.height / 2 * 0.75, scaleX: 0.75, scaleY: 0.75, rotation: 0, alpha: 1 }, moveTime, egret.Ease.circOut)
				this.setAutoTimeout(() => {
					egret.Tween.removeTweens(poker);
					game.UIUtils.removeSelf(poker);
					ObjectPool.reclaim("zjh_poker", poker);
					targetCard.visible = true;
				}, this, time1 + moveTime);
			} else {
				let targetCard = this[`cards${number}`][`card${this.showCount - 1}`] as eui.Component;
				let pos = targetCard.localToGlobal();
				egret.Tween.get(poker).wait(time1).to({ x: pos.x + targetCard.width / 4, y: pos.y + targetCard.height / 4, scaleX: 0.5, scaleY: 0.5, rotation: 0, alpha: 1 }, moveTime, egret.Ease.circOut)
				this.setAutoTimeout(() => {
					egret.Tween.removeTweens(poker);
					game.UIUtils.removeSelf(poker);
					ObjectPool.reclaim("zjh_poker", poker);
					targetCard.visible = true;
				}, this, time1 + moveTime);
			}
		}

		private box2player(header: eui.Component) {
			let pos = header.localToGlobal();
			let boxX = this.box.x;
			let boxY = this.box.y;
			egret.Tween.get(this.box).to({ x: pos.x + 55, y: pos.y + 50 }, 200).call(() => {
				this.box.playNamesAndLoop(["zjh_xq_win", "zjh_xq_wait"]);
			}).wait(2000).to({ x: boxX, y: boxY }, 200);
		}

		protected showRestartBtn(realyShow = false) {
			if (this.isClubGame && !realyShow) {
				return;
			}
			this.restartBtn.visible = true;
		}

		/**
		 * 筹码飞赢的玩家
		 */
		private coin2Component(playerGroup, id, cards?, roundptn?, happyGold?, isWin: boolean = false) {
			async.waterfall([
				(callback) => {
					zjh.ZajinhuaUtils.otherPlayFjb();
					while (this.cmList1.length > 0) {
						let jinbi = this.cmList1.pop();
						let point = playerGroup.globalToLocal(jinbi.localToGlobal().x, jinbi.localToGlobal().y);
						jinbi.x = point.x;
						jinbi.y = point.y;
						playerGroup.addChild(jinbi);
						egret.Tween.get(jinbi).to({
							x: playerGroup.width / 2,
							y: playerGroup.height / 2
						}, _.random(400, 800)).call(() => {
							game.UIUtils.removeSelf(jinbi);
						});
					}
					this['timeout4'] = this.setAutoTimeout(() => {
						callback();
					}, this, 850);
				},
				(callback) => {
					this.showRestartBtn(true);
					if (happyGold > 0) {
						this.box2player(this[`header${id}`]);
					}
					if (roundptn >= 3) {
						// this.win2.play("default", 1);
						// this.win2.verticalCenter = 300;
						// this.win2.horizontalCenter = 240;
						// this.win2.callback = () => {
						// 	this.win2.visible = false;
						// 	let pais = this.exchangeCards(cards);
						// 	this.tsPais(pais);
						// 	this.win1.play("default", 1);
						// 	let img = new eui.Image(`zjh_nyl${roundptn}_png`)
						// 	this.effectGroup.addChild(img);
						// 	img.name = "bz";
						// 	img.verticalCenter = 45;
						// 	img.horizontalCenter = -20;
						// 	this.niuFenFDSX(img);
						// 	this.win1.verticalCenter = 0;
						// 	this.win1.horizontalCenter = 240;
						// 	this.win1.callback = () => {
						// 		this.win1.visible = false;
						// 		if (this.effectGroup.getChildByName("bz")) {
						// 			game.UIUtils.removeSelf(this.effectGroup.getChildByName("bz"));
						// 		}
						// 		this.tsPais(null);
						// 	}
						// }
					}
					else {

					}
				}
			], (data, callback) => {
			});
		}

		/**
		 * 展示特殊牌型。
		 */
		private tsPais(cds?) {
			if (cds != null) {
				this.pokerGroup.visible = true;
				for (let i = 0; i < cds.length; i++) {
					let cd = this["cd" + i] as ZajinhuaCard;
					cd.initWithNum(cds[i]);
					cd.showB2Z();
					cd.visible = true;
					if (i == 0) {
						egret.Tween.get(cd).to({ rotation: -15 }, 300);
					} else if (i == 1) {
						egret.Tween.get(cd).to({ y: 0 }, 300);
					} else {
						egret.Tween.get(cd).to({ rotation: 15 }, 300);
					}
				}
			} else {
				this.pokerGroup.visible = false;
				for (let i = 0; i < 3; i++) {
					let cd = this["cd" + i] as ZajinhuaCard;
					cd.visible = false;
					if (i == 0) {
						cd.rotation = 0;
					} else if (i == 1) {
						cd.y = 13;
					} else {
						cd.rotation = 0;
					}
				}
			}
		}

		/**
		 * 宝箱飞玩家
		 */
		private boxIcon2header(header) {
			let icons = this.createIcon();
			while (icons.length > 0) {
				let jinbi = icons.pop();
				let point = header.globalToLocal(jinbi.localToGlobal().x, jinbi.localToGlobal().y);
				jinbi.x = point.x;
				jinbi.y = point.y;
				header.addChild(jinbi);
				egret.Tween.get(jinbi).to({
					x: header.x + 40,
					y: header.y + 40
				}, _.random(600, 800)).call(() => {
					game.UIUtils.removeSelf(jinbi);
				});
			}
		}

		/**
		 * 创造金币
		 */
		private iconList = [];
		private createIcon() {
			let icon: eui.Image;
			for (let i = 0; i < 20; i++) {
				icon = new eui.Image();
				icon.name = "icon" + i;
				icon.source = RES.getRes("zjh_gold_png");
				this.effectGroup.addChild(icon);
				icon.x = 55; icon.y = 155;
				this.iconList.push(icon);
			}
			return this.iconList;
		}

		/**
		 * 获取一个筹码
		 * index :筹码颜色大小
		 * value :值
		 */
		private getNewZJHYz(index, value) {
			let color: any;
			let jinbi: ZajinhuaYzBtn = new ZajinhuaYzBtn(true);
			if (value == 1) {
				color = 1;
			} else {
				color = index;
			}
			jinbi.setIndex(color);
			jinbi.setContent(value);
			return jinbi;
		}

		/**
	 * 任何玩家下注
	 * @param  {number} value 押注金额
	 * @param  {number} type  是否加注
	 *  @param  {number} index  筹码颜色
	 */
		private gzyzMine;
		private cmList1: ZajinhuaYzBtn[] = [];
		private playerYzAni(value: number, type: number, index: number, component: eui.Component, sex) {
			if (type == 1) {
				zjh.ZajinhuaUtils.playGz(sex);
			}
			if (type == 2) {
				zjh.ZajinhuaUtils.playJz(sex);
			}
			let jinbi: ZajinhuaYzBtn = this.getNewZJHYz(index, Math.ceil(value));
			if (component == null) {
				this.coinMoveAni(jinbi, null);
			} else {
				let startPoint = component.localToGlobal();
				this.coinMoveAni(jinbi, startPoint);
			}
			return jinbi;

		}

		/**
		 * 金币move动画
		 * @param  {RBWarYzBtn} jinbi
		 * @param  {number} type
		 * @param  {egret.Point} startPoint 若果这个为空那么表示重连
		 */
		private coinMoveAni(jinbi: ZajinhuaYzBtn, startPoint: egret.Point) {
			zjh.ZajinhuaUtils.PlayFcm();
			let group = this.cmsGroup;
			game.UIUtils.setAnchorPot(jinbi);
			jinbi.rotation = 0;
			jinbi.scaleX = jinbi.scaleY = 0.8;
			startPoint = group.globalToLocal(startPoint.x + 30, startPoint.y + 60);
			jinbi.x = startPoint.x;
			jinbi.y = startPoint.y;
			group.addChild(jinbi);
			egret.Tween.get(jinbi).to({
				x: _.random(20, group.width - jinbi.width * 0.15),
				y: _.random(20, group.height - jinbi.height * 0.15),
				rotation: _.random(0, 360)
			}, _.random(200, 400), egret.Ease.sineOut);
			this.cmList1.push(jinbi);
			return jinbi;
		}



		/**
		 * 其他玩家弃牌
		 * 
		 */
		private otherDiscard(playerIndex) {
			let card = this["cards" + playerIndex] as ZajinhuaCardListOther;
			let header = this["header" + playerIndex] as ZajinhuaCardListOther;
			this.otherPlayerTimeVisible(playerIndex);
			this["gz2jz" + playerIndex].source = "";
			card.setNomal2();//先恢复
			card.showFen(10);
			this['timeout5'] = this.setAutoTimeout(() => {
				this.otherDiscardAni(card, playerIndex);
			}, this, 200);
		}

		/**
		 * 其他玩家弃牌效果
		 * 
		 */
		private otherDiscardAni(card, playerIndex) {
			let header = this["header" + playerIndex] as ZajinhuaHeader;
			let playerGroup = this["player" + playerIndex] as eui.Group;
			header.qpVisible(true);
			for (let i = 2; i >= 0; i--) {
				let cd = card["card" + i];
				let point = this.cmsGroup.globalToLocal(cd.localToGlobal().x, cd.localToGlobal().y);
				cd.x = point.x;
				cd.y = point.y;
				this.cmsGroup.addChild(cd);
				egret.Tween.get(cd).to({
					x: this.cmsGroup.width / 2,
					y: this.cmsGroup.height / 2,
					rotation: 720,
					scaleX: 0.5,
					scaleY: 0.5,
					alpha: 0.3
				}, 300 + (i * 200)).call(() => {
					card.addChild(cd);
					cd.visible = false;
					this['timeout6'] = this.setAutoTimeout(() => {
						card.setNomal();
					}, this, 1000);
				});
			}
		}

		/**
		 * 自己弃牌
		 * 
		 */
		private async mineDiscard(num) {
			if (num == 1) {
				var handler = ServerPostPath.game_zjhHandler_c_abandonCard;
				let cardss = {};
				let resp: any = await game.PomeloManager.instance.request(handler, cardss);
				if (resp.error && resp.error.code != 0) {
					Global.alertMediator.addAlert(resp.error.msg, null, null, true);
					// if (resp.error.code != 10711) {
					// 	game.PomeloManager.instance.disConnectAndReconnect();
					// }
					return;
				}

			}
			if (Global.runBack) {
				this.showRestartBtn();
				this.openCard.visible = false;
				this.caozuoBtnGroup(1);
				this.closebiPai();

				this.cards1.setNomal(2);
				let isLook = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
				if (!isLook) {
					return;
				}
				if (isLook.isLookCards) {
					this.header1.qpVisible(true);
					this.cards1.showFen1(1)
				} else {
					let playerIndex = this.qpcards.playerIndex;
					let pattern = this.qpcards.roundPattern;
					let cards = this.qpcards.cards.value;
					this.header1.qpVisible(true);
					let pais = this.exchangeCards(cards);
					if (pais.length > 0) {
						this.cards1.paiBianHui();
						this.cards1.renderByList(this.sortPokers(pais), true);
						this['timeout8'] = this.setAutoTimeout(() => {
							this.cards1.showFen(pattern);
						}, this, 150);
					}
				}
				this.allowBack = true;
				this.showRestartBtn();
				return;
			}
			this.openCard.visible = false;
			this.qpBtn.enabled = true;
			this.caozuoBtnGroup(1);
			this.closebiPai();
			let ti = this.header1.getChildByName("1");
			if (ti) {
				ti.visible = false;
				game.UIUtils.removeSelf(ti);
			}
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			let players = roomInfo.players;
			this.cards1.zhongjianShouPai();
			this.cards1.showFen1(2);
			if (num == 2) {
				this.setAutoTimeout(() => {
					this.mineDiscardAni();
				}, this, 150);
			}
		}

		/**
		 * 自己弃牌动画。
		 * 
		 */
		private mineDiscardAni() {
			for (let i = 2; i >= 0; i--) {
				let cd = this.cards1["card" + i] as eui.Component;
				let point = this.cards1.globalToLocal(this.effectGroup.width / 2, this.effectGroup.height / 2);
				this.header1.qpVisible(true);
				egret.Tween.get(cd).to({
					x: point.x,
					y: point.y,
					scaleX: 0.2,
					scaleY: 0.2,
					rotation: 720,
					alpha: 0.3
				}, (400 + (i * 200))).call(() => {
					cd.visible = false;
					this.cards1.addChild(cd);
				});
			}
			this['timeout7'] = egret.setTimeout(() => {
				this.cards1.setNomal(2);
				let isLook = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
				if (!isLook) {
					return;
				}
				if (isLook.isLookCards) {
					this.cards1.showFen1(1)
				} else {
					let playerIndex = this.qpcards.playerIndex;
					let pattern = this.qpcards.roundPattern;
					let cards = this.qpcards.cards.value;
					let pais = this.exchangeCards(cards);
					if (Global.roomProxy.getMineIndex() == playerIndex) {
						if (pais.length > 0) {
							this.cards1.renderByList(this.sortPokers(pais), true);
							this['timeout8'] = this.setAutoTimeout(() => {
								this.cards1.showFen(pattern);
							}, this, 150);
						}
					}
				}
				this.allowBack = true;
				this.showRestartBtn();
			}, this, 2000);
		}

		private cmNumList: number[] = [];//玩家加注时候的筹码数字大小
		private initCMList() {
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			this.cmNumList = roomInfo.betRatio;
		}

		/**
		 * 初始化筹码，并赋值。
		 */
		private init() {
			this.initCMList();
			for (let i = 1; i <= 5; i++) {
				let yzBtn = this['yzBtn' + i] as ZajinhuaYzBtn;
				let isLook = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
				if (!isLook) {
					return;
				}
				if (isLook.isLookCards) {
					if (this.cmNumList[i - 1] * 2 > Global.roomProxy.roomInfo.minYZ * 2) {
						if (isLook.gold < this.cmNumList[i - 1] * 2) {//判断加注能点击的上线
							yzBtn.setTouchon(2);
							yzBtn.alpha = 0.5;
						} else {
							yzBtn.setTouchon(1);
						}
					} else {
						yzBtn.setTouchon(2);
						yzBtn.alpha = 0.5;
					}
					yzBtn.setContent(this.cmNumList[i - 1] * 2);
				} else {
					if (this.cmNumList[i - 1] > Global.roomProxy.roomInfo.minYZ) {
						if (isLook.gold < this.cmNumList[i - 1]) {//判断加注能点击的上线
							yzBtn.setTouchon(2);
							yzBtn.alpha = 0.5;
						} else {
							yzBtn.setTouchon(1);
						}
					} else {
						yzBtn.setTouchon(2);
						yzBtn.alpha = 0.5;
					}
					yzBtn.setContent(this.cmNumList[i - 1]);
				}
				yzBtn.setIndex(i);
			}
		}

		/**
		 * 自己下注
		 */
		private mineAddBet() {
			this.closebiPai();
			this.cmYzGroup(1)
			this.init();
		}


		/**
		 * 根据押注金额返回筹码颜色；
		 */
		private findCmByMoney(num, isK) {
			this.initCMList();
			if (isK) {
				let twoList = [];
				for (let i = 0; i < this.cmNumList.length; i++) {
					twoList.push(this.cmNumList[i] * 2);
				}
				if (twoList.indexOf(num) > -1) {
					return twoList.indexOf(num) + 1;
				} else {
					for (let i = 0; i < twoList.length; i++) {
						if (twoList[i] > num) {
							return i + 1;
						}
					}
				}
			} else {
				if (this.cmNumList.indexOf(num) > -1) {
					return this.cmNumList.indexOf(num) + 1;
				} else {
					for (let i = 0; i < this.cmNumList.length; i++) {
						if (this.cmNumList[i] > num) {
							return i + 1;
						}
					}
				}
			}
		}

		private currentMoney: number;//加注金额
		/**
		 * 玩家加注
		 */
		private lock: boolean = false;
		public async rbwarTouch(e: egret.Event) {
			let data = e.data;
			this.currentMoney = data;
			let player = Global.roomProxy.getMineData() as ZajinhuaRoomInfoBean;
			if (!player) {
				return;
			}
			if (player.isLookCards) {
				if (data <= Global.roomProxy.roomInfo.minYZ * 2 || player.gold < data) {
					return;
				}
			} else {
				if (data <= Global.roomProxy.roomInfo.minYZ || player.gold < data) {
					return;
				}
			}
			if (this.lock) {
				return;
			}
			this.lock = true;
			var handler = ServerPostPath.game_zjhHandler_c_addBet;
			let cardss = { addBet: this.currentMoney };
			let resp: any = await game.PomeloManager.instance.request(handler, cardss);
			if (resp.error && resp.error.code != 0) {
				if (resp.error.msg != "成功") {
					Global.alertMediator.addAlert(resp.error.msg);
					return;
				}
			}
			this.lock = false;
			if (player.isLookCards) {
				if (player.gold <= data) {
					this.playerYzAni(player.gold, 2, this.findCmByMoney(this.currentMoney, true), this.header1, player.sex);
					this.header1.updateGold(-player.gold, true);
				} else {
					this.playerYzAni(this.currentMoney, 2, this.findCmByMoney(this.currentMoney, true), this.header1, player.sex);
					this.header1.updateGold(-this.currentMoney, true);
				}
			} else {
				if (player.gold <= data) {
					this.playerYzAni(player.gold, 2, this.findCmByMoney(this.currentMoney, false), this.header1, player.sex);
					this.header1.updateGold(-player.gold, true);
				} else {
					this.playerYzAni(this.currentMoney, 2, this.findCmByMoney(this.currentMoney, false), this.header1, player.sex);
					this.header1.updateGold(-this.currentMoney, true);
				}
			}
			this.cmYzGroup(2)
			this.showBtnType(2);
		}

		private playerindex: number;
		/**
		 * 玩家比牌选择的玩家
		 */
		private async playerTouch(e: egret.Event) {
			let data = e.data;
			this.playerindex = data.index;
			let value = data.value;
			if (value) {
				let pi = this.directions[this.playerindex];
				this.closebiPai();
				var handler = ServerPostPath.game_zjhHandler_c_compareCard;
				let cardss = { playerIndex: this.playerindex };
				let resp: any = await game.PomeloManager.instance.request(handler, cardss);
				if (resp.error && resp.error.code != 0) {
					//Global.alertMediator.addAlert(resp.error.msg);
					return;
				}
			}
		}


		/**
		 * 功能按钮效果动画
		 */
		private gnBtnAni(type) {
			if (type) {
				this.recordBtn.visible = this.helpBtn.visible = this.settingBtn.visible = true;
				this.recordBtn.top = this.helpBtn.top = this.settingBtn.top = this.xlBtn.top;
				if(this.isClubGame){
					this.recordBtn.visible = false;
				}
				egret.Tween.get(this.helpBtn).to({ top: 165 }, 200);
				egret.Tween.get(this.settingBtn).to({ top: 91 }, 200);
				egret.Tween.get(this.recordBtn).to({ top: 239 }, 200);
			} else {
				egret.Tween.get(this.helpBtn).to({ top: this.xlBtn.top }, 200);
				egret.Tween.get(this.recordBtn).to({ top: this.xlBtn.top }, 200);
				egret.Tween.get(this.settingBtn).to({ top: this.xlBtn.top }, 200).call(() => {
					this.recordBtn.visible = this.helpBtn.visible = this.settingBtn.visible = false;
				});
			}

		}

		/**
		 * 超时保护
		 */

		private fcsGroup: eui.Group;
		private async overTimeProtect() {
			let value = Global.roomProxy.fcsIndex;
			var handler = ServerPostPath.game_zjhHandler_c_timeOutProject;
			let data = { project: value }
			if (value == 1) {
				data.project = 0;
			} else {
				data.project = 1;
			}
			this.fcs.touchEnabled = false;
			this.fcs1.touchEnabled = false;
			let resp: any = await game.PomeloManager.instance.request(handler, data);
			if (resp && resp.error && resp.error.code == 0) {
				if (data.project == 1) {
					Global.roomProxy.fcsIndex = 1;
					this.fcs.alpha = 1;
				} else {
					Global.roomProxy.fcsIndex = 0;
					this.fcs.alpha = 0;
				}
				egret.setTimeout(() => {
					this.fcs1.touchEnabled = true
					this.fcs.touchEnabled = true;
				}, this, 2000);
			} else {
				egret.setTimeout(() => {
					this.fcs1.touchEnabled = true
					this.fcs.touchEnabled = true;
				}, this, 2000);
			}
		}

		/**
		 * 取消比牌
		 */
		private closebiPai() {
			this.bpBtn.enabled = true;
			let roomInfo = Global.roomProxy.roomInfo as ZajinhuaRoomInfoBean;
			if (!roomInfo) {
				return;
			}
			let players = roomInfo.players;
			for (let i in players) {
				let pi = this.directions[i];
				this["header" + pi].closeBipai();
			}
		}

		/**
		 * 初始化
		 */
		private chushihua() {
			this.playerSetNumber = [];
			for (let i = 1; i <= 5; i++) {
				let hd = this["header" + i] as ZajinhuaHeader;
				hd.visible = false;
				let goldGroup = this[`playerYZGroup${i}`] as eui.Group;
				if (goldGroup) {
					goldGroup.visible = false;
				}
				let cd;
				if (i == 1) {
					cd = this["cards" + i] as ZajinhuaCardListMine;
					cd.setNomal(1);
				} else {
					cd = this["cards" + i] as ZajinhuaCardListOther;
					cd.setNomal();
				}
			}
		}

		/**
		 * 展示玩家,重连。
		 */
		private onlineCM = [];
		private playerCaozuo: any;
		private showRunTimeByStep(room) {
			let players = room.players;
			this.dyzs(room.betBase);
			this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), 5);
			Global.roomProxy.roomInfo.minYZ = room.betBase;
			this.playerCaozuo = room.checkOperaInfo;
			this.cmNumList = room.betRatio;
			this.zyzs(room.totalBet);
			this.lunci.text = "第" + room.curGameTurn + "/" + room.maxTurn + "轮"
			for (let key in players) {
				let dir = this.directions[key];
				this.playerSetNumber.push(Number(dir));
				let player = this['player' + dir] as eui.Group;
				let header = this['header' + dir] as ZajinhuaHeader;
				let cms = players[key]["turnBet"];
				for (let i = 0; i < cms.length; i++) {
					if (typeof (cms[i]) == "number") {
						this.onlineCM.push(cms[i]);
					}
				}
				if (Global.roomProxy.checkIndexIsMe(key)) {
					let cards = this['cards' + dir] as ZajinhuaCardListMine;
					this.showMineStat(players[key], room.curPlay, key);
				} else {
					let cards = this['cards' + dir] as ZajinhuaCardListOther;
					this.showOtherStat(key, players[key], room.curPlay);
				}
				header.initWithPlayer(players[key]);
				header.setIndex(key);
				player.visible = true;
				header.visible = true;
			}
			for (let i = 0; i < this.onlineCM.length; i++) {
				let nums = Math.floor(this.onlineCM[i]);
				let jinbi: ZajinhuaYzBtn = this.getNewZJHYz(this.clcm(nums), nums);
				this.cmList1.push(jinbi);
				this.cmsGroup.addChild(jinbi);
				jinbi.scaleX = jinbi.scaleY = 0.8;
				jinbi.x = _.random(10, this.cmsGroup.width - 10);
				jinbi.y = _.random(10, this.cmsGroup.height - 10);
			}
		}

		/**
		 * 重连设置操作按钮状态
		 */
		private setStus(num) {
			for (let i in num) {
				switch (i) {
					case "Add":
						// this.isJz = num[i];
						// this.jzBtn.visible = num[i];
						// this.jzBtn0.visible = !num[i];
						break;
					case "Compare":
						this.isBp = num[i];
						this.bpBtn.visible = num[i];
						this.bpBtn0.visible = !num[i];
						break;
					case "canAbandon":
						this.isQp = num[i];
						this.qpBtn.visible = num[i];
						if (this.isQp) {
							this.qpBtn.currentState = "disabled";
							this.qpBtn.currentState = "disabled";
						}
						this.qpBtn0.visible = !num[i];
						break;
					case "canLook":
						this.isKp = num[i];
						break;
					case "follow":
						// this.isGz = num[i];
						// this.gzBtn.visible = num[i];
						// this.zdgzBtn.visible = !num[i];
						break;

				}
			}
		}

		/**
		 * 重连找筹码。
		 */
		private clcm(num) {
			if (this.cmNumList.indexOf(num) > -1) {
				return this.cmNumList.indexOf(num) + 1;
			}
			if (this.cmNumList[this.cmNumList.length - 1] > num) {
				for (let i = 0; i < this.cmNumList.length; i++) {
					if (this.cmNumList[i] > num) {
						return i + 1;
					}
				}
			} else {
				let twoList = []
				for (let i = 0; i < this.cmNumList.length; i++) {
					twoList.push(this.cmNumList[i] * 2);
				}
				if (twoList.indexOf(num) > -1) {
					return twoList.indexOf(num) + 1;
				}
				for (let i = 0; i < twoList.length; i++) {
					if (twoList[i] > num) {
						return i + 1;
					}
				}
			}
		}



		/**
		 * 展示自己的状态
		 */
		private showMineStat(mine, curPlay, key) {
			let status = mine.status;
			let islook = mine.isLookCards;
			switch (status) {
				case 0:
				case 1:
					this.mineType(islook, mine);
					this.caozuoBtnGroup(3);
					if (curPlay == key) {
						this.curPlayer = curPlay;
						this.timeBar.startTime(this);
						this.timeBar.visible = true;
						this.header1.addChild(this.timeBar);
						this.timeBar.name = "1";
						this.timeBar.x = this.header1.headerImage_mask.x - 3;
						this.timeBar.y = this.header1.headerImage_mask.y - 3;
						888
						this.showBtnType(1);
						this.setStus(this.playerCaozuo);
						this.showBtnS();

					}
					else {
						this.showBtnType(2);
						this.setStus(this.playerCaozuo);
					}
					break;
				case 2:
					game.UIUtils.removeSelf(this.timeBar);
					let pattern2 = mine.cardValue;
					let cards2 = mine.handCards;
					if (cards2.length > 0) {
						this.cards1.renderByList(this.sortPokers(cards2), false);
						this['timeout10'] = this.setAutoTimeout(() => {
							this.cards1.showFen(pattern2, true);
						}, this, 150);
					}
					for (let i = 0; i < 3; i++) {
						this.cards1.showCardByIndex(i);
					}
					this.header1.qpVisible(true);
					this.cards1.paiBianHui();
					this.yzGroup.visible = false;
					this.btnGroup.visible = false;
					this.showRestartBtn();
					this.caozuoBtnGroup(1);
					break;
				case 4:
					game.UIUtils.removeSelf(this.timeBar);
					let pattern4 = mine.cardValue;
					let cards4 = mine.handCards;
					if (cards4.length > 0) {
						this.cards1.showFen(pattern4, true);
						this['timeout11'] = this.setAutoTimeout(() => {
							this.cards1.renderByList(this.sortPokers(cards4), false);
						}, this, 150);
					}
					for (let i = 0; i < 3; i++) {
						this.cards1.showCardByIndex(i);
					}
					this.header1.bplose(true);
					this.header1.bpwin2lose(false);
					this.cards1.paiBianHui();
					this.yzGroup.visible = false;
					this.btnGroup.visible = false;
					this.showRestartBtn();
					this.caozuoBtnGroup(1);
					break;
				case 5:
				case 6:
					this.mineType(islook, mine);
					this.caozuoBtnGroup(3);
					this.showBtnType(2);
					this.setStus(this.playerCaozuo);
					break;
				case 7:
					game.UIUtils.removeSelf(this.timeBar);
					this.mineType(islook, mine);
					this.caozuoBtnGroup(3);
					this.showBtnType(2);
					break;
			}
		}

		/**
		 * 展示其他玩家的状态
		 */
		private showOtherStat(key, other, curPlay) {
			let status = other.status;
			let islook = other.isLookCards;
			let dir = this.directions[key];
			let header = this["header" + dir] as ZajinhuaHeader;
			let cd = this["cards" + dir] as ZajinhuaCardListOther;
			switch (status) {
				case 1:
					if (islook) {
						let card = this["cards" + dir] as ZajinhuaCardListOther;
						for (let i = 0; i < 3; i++) {
							this["cards" + dir].showCardByIndex(i);
						}
						card.showLookPai(false);
						card.showFen(6);
					} else {
						for (let i = 0; i < 3; i++) {
							this["cards" + dir].showCardByIndex(i);
						}
					}
					if (key == curPlay) {
						this.timeBar.startTime(this);
						this.timeBar.visible = true;
						header.addChild(this.timeBar);
						this.timeBar.name = "dir";
						this.timeBar.x = this.header1.headerImage_mask.x - 3;
						this.timeBar.y = this.header1.headerImage_mask.y - 3;
					}
					if (other.lastOperate == 5) {
						this["gz2jz" + dir].visible = true;
						this["gz2jz" + dir].source = this.cz(1, dir);
					};
					if (other.lastOperate == 6) {
						this["gz2jz" + dir].visible = true;
						this["gz2jz" + dir].source = this.cz(2, dir);
					}
					break;
				case 7:
				case 0:
					this.otherType(islook, dir);
					break;
				case 2:
					header.qpVisible(true);
					break;
				case 4:
					if (islook) {
						cd.showLookPai(false);
						cd.showFen(6);
					}
					for (let i = 0; i < 3; i++) {
						this["cards" + dir].showCardByIndex(i);
					}
					header.bpwin2lose(false);
					cd.paiBianHui();
					cd.showFen(10);
					header.bplose(true);
					cd.visible = true;
					break;
				case 5:
					this.otherType(islook, dir);
					this["gz2jz" + dir].visible = true;
					this["gz2jz" + dir].source = this.cz(1, dir);
					break;
				case 6:
					this.otherType(islook, dir);
					this["gz2jz" + dir].visible = true;
					this["gz2jz" + dir].source = this.cz(2, dir);
					break;
			}
		}

		private mineType(islook, mine) {
			if (islook) {
				//看牌展示牌值
				let pattern = mine.cardValue;
				let cards = mine.handCards;
				if (cards.length > 0) {
					this.cards1.renderByList(this.sortPokers(cards), false);
					this['timeout12'] = this.setAutoTimeout(() => {
						this.cards1.showFen(pattern, true);
					}, this, 150);
				}
				for (let i = 0; i < 3; i++) {
					this.cards1.showCardByIndex(i);
				}
			} else {
				for (let i = 0; i < 3; i++) {
					this.cards1.showCardByIndex(i);
				}
				this.openCard.visible = true;
			}
		}

		private otherType(islook, dir) {
			if (islook) {
				let card = this["cards" + dir] as ZajinhuaCardListOther;
				for (let i = 0; i < 3; i++) {
					this["cards" + dir].showCardByIndex(i);
				}
				card.showLookPai(false);
				card.showFen(6);
			} else {
				for (let i = 0; i < 3; i++) {
					this["cards" + dir].showCardByIndex(i);
				}
			}
		}

		/**
		 * 扑克特殊排序；
		 */
		private sortPokers(listData) {
			let newList = [];
			let t;
			for (let i = 0; i < listData.length; i++) {
				for (let j = i + 1; j < listData.length; j++) {
					let i1 = listData[i] % 100;
					let j1 = listData[j] % 100;
					if (i1 <= j1) {
						t = listData[i];
						listData[i] = listData[j];
						listData[j] = t;
					}
				}
			}
			for (let j = 0; j < listData.length; j++) {
				if (listData[j] % 100 == 1) {
					newList.push(listData[j]);
				}
			}
			newList.sort();
			for (let k = 0; k < newList.length; k++) {
				listData.pop();
			}
			for (let m = newList.length - 1; m >= 0; m--) {
				listData.unshift(newList[m]);
			}
			return listData;
		}

		//new
		/**
		 * 打开游戏界面通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_ZJHGAME;

		/**
		 * 对应游戏大厅
		 */
		public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_ZJHSELECT;

		/**
		 * 关闭当前界面通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_ZJHGAME;

		/**
		 * 对应匹配界面通知
		 */
		public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_ZJH_MATCHING;
	}
}

const PLAYER_STATUS = {
	WAIT: 1, // 等待
	ABANDON: 2, // 弃牌
	FAIL: 4, // 比牌失败
	GEN: 5,  //跟
	ADD: 6, //加
	COMPARE: 7 // 比牌
};