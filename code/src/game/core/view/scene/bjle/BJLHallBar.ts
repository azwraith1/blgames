module bjle {
	export class BJLHallBar extends game.BaseUI implements IUpdate {
		private zhunru: eui.Label;//限额
		private runGame: eui.Button;//进入游戏
		private runstats: eui.Image;//房间状态
		private config;
		private item1: BJLHallPointItem;//路单
		private timeLable: eui.Label;
		private rbw_zh: eui.Image;
		public constructor(data) {
			super();
			this.config = data;
			this.skinName = new BJLHallBarSkin();
		}

		public onAdded() {
			super.onAdded();
			game.UIUtils.setAnchorPot(this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
			game.UpdateTickerManager.instance.add(this);
		}

		protected changeLanguageUI() {
			TextUtils.cBtnRes(this.runGame, "bjl_hall_jryx");
		}

		public onRemoved() {
			super.onRemoved();
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
			game.UpdateTickerManager.instance.remove(this);
		}

		public createChildren() {
			super.createChildren();
			let res = this.config["playway"] == 2 ? `bjl_mipai_bar${CF.tic}` : `bjl_hall_ld_png`;
			this.rbw_zh.source = res;
			if (this.config["playway"] == 2) this.rbw_zh.y = -22;
			this.showBarByConfig(this.config);
		}

		protected change

		public updateConfig(newData) {
			if (newData.sceneId == this.config.sceneId && newData.sceneIndex == this.config.sceneIndex) {
				this.config = newData;
				this.showBarByConfig(this.config);
			}
		}

		public update(dt: number) {
			let endTime = this.config.remainTime;
			let cha = endTime - game.DateTimeManager.instance.now;
			let timeStr = "";
			if (cha <= 0) {
				timeStr = "00"
			} else {
				timeStr = NumberFormat.getTimeStrByDown(cha);
			}
			this.timeLable.text = timeStr;
		}

		private lock: boolean = false;
		private onTouchEnded() {
			majiang.MajiangUtils.playClick();//管理声音的
			if (this.lock) {
				return;
			}
			this.lock = true;
			egret.setTimeout(function () {
				this.lock = false
			}, this, 1000);
			let playerGold = Global.playerProxy.playerData.gold;
			RotationLoadingShu.instance.load(["bjl_game"], "", () => {
				CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10010, sceneId: this.gameId, sceneIndex: this.sceneindex });
			});
			egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
		}

		private sceneindex: any;
		private gameId: any;
		public showBarByConfig(num) {
			let zt = num["roomState"];
			this.showRoomStatus(zt);
			let xiane = num["betRang"];
			this.zhunru.text = CF.tigc(133) + "\n" + xiane[0] + " - " + xiane[1]
			let ludan = num["wayBillInfoSet"];
			this.sceneindex = num["sceneIndex"];
			this.gameId = num["sceneId"];
			this.testNums(ludan);
		}

		private showRoomStatus(stus) {
			switch (stus) {
				case 0:
					this.runstats.source = RES.getRes(`bjle_game_zbz${CF.tic}`);
					break;
				case 1:
					this.runstats.source = RES.getRes(`bjle_game_zbz${CF.tic}`);
					break;
				case 2:
					this.runstats.source = RES.getRes(`bjle_game_zbz${CF.tic}`);
					break;
				case 3:
					this.runstats.source = RES.getRes(`bjle_game_xzz${CF.tic}`);
					break;
				// case 4:
				case 5:
					this.runstats.source = RES.getRes(`bjle_game_bpz${CF.tic}`);
					break;
				case 6:
					this.runstats.source = RES.getRes(`bjle_game_pjz${CF.tic}`);
					break;
				case 7:
				case 8:
				case 9:
					this.runstats.source = RES.getRes(`bjl_mpz${CF.tic}`);
					break;
			}
		}

		/**
		 * 路单赋值
		 */
		public testNums(num) {
			let index = 1;
			//数据格式定义：1庄赢，2庄对，3闲对 ，4庄闲对；
			//				5闲赢，6庄对，7闲对，8庄闲对；
			//             9和局 ，10庄对，11闲对，12庄闲对。
			//数据处理
			let dataArr = num.concat([]);
			if (num.length == 0) {
				return;
			}
			let newList = bjle.BaseBjlLd.changVlue(dataArr);
			let lists = bjle.BaseBjlLd.arryIntoArry(newList);
			let arry: any[];
			if (lists.length <= 20) {
				this.initQizi(lists);
			} else {
				let index = 0;
				let nums = lists.splice(-20);
				let num = nums[nums.length - 1];
				if (num.length > 6) {
					index = num.length - 6;
				}
				let nums1 = nums.splice((-20 + index));
				this.initQizi(nums1);
			}
		}

		/**
		 * 初始化棋子，并装入到对应的组里面。
		 */
		private tesu9 = 0;
		private maxLie = 0;
		private startLength = 1;//第几列
		private MaxLength = 6;//每列最大长度
		private index = 0;
		private idx = 1;
		private initQizi(arryList) {
			if (!arryList || arryList.length == 0) {
				return;
			}
			this.chushihua();
			let islock = true;
			for (let i = 0; i < arryList.length; i++) {
				if (i >= 20) {
					return;
				}
				islock = true;
				this.startLength = i + 1;
				this.index = 0;
				let list = arryList[i];
				for (let j = 0; j < list.length; j++) {
					let qizi = new BJLHallPoint();
					if (this.maxLie <= i) {
						this.MaxLength = 6;
					}
					if (this.index >= this.MaxLength) {
						if (this.MaxLength < 2) {
							return;
						}
						if (islock) {
							this.MaxLength--;
							islock = false;
						}
						qizi.initNums(list[j]);
						if (list[j] == 9) {
							this.startLength;
						} else {
							this.startLength++;
						}
						if (this.startLength > this.maxLie) {
							this.maxLie = this.startLength;
						}
						if (this["item" + this.startLength]) {
							this["item" + this.startLength].setPosition(qizi, this.MaxLength + 1);
							this["item" + this.startLength].addChild(qizi);
						}
						this.index++;
					} else {
						if (list[j] == 9) {
							if (j == 0) {
								this["item" + (i + 1)].setPosition(qizi, 1);
								this.tesu9 = 1;
							} else {
								if (list[j - 1] == 9) {
									this["item" + (i + 1)].setPosition(qizi, this.tesu9);
								} else {
									this.index;
									this.tesu9 = this.index;
									this["item" + (i + 1)].setPosition(qizi, this.index);
								}
							}
							qizi.initNums(list[j]);
						} else {
							this.index++;
							qizi.initNums(list[j]);
							this["item" + (i + 1)].setPosition(qizi, this.index);
						}

						this["item" + (i + 1)].addChild(qizi);
					}
				}
			}
		}
		private chushihua() {
			this.MaxLength = 6;
			this.maxLie = 0;
			this.startLength = 1;//第几列
			this.MaxLength = 6;//每列最大长度
			this.index = 0;
			this.idx = 1;
			for (let i = 0; i < 20; i++) {
				this["item" + (i + 1)].removeChildren();
			}
		}
	}
}