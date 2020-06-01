module baicao {
	export class BaiCaoHeader extends BlackJHeader {
		private effectGroup: eui.Group;
		private db: DBComponent;
		public coinTarget: eui.Group;
		public rebackTxt: eui.BitmapLabel;
		private dbGroup: eui.Group;
		public betState: eui.BitmapLabel;
		private timeLabel: eui.Label;
		private timeGroup: eui.Group;
		public constructor() {
			super();
		}
		public createChildren() {
			super.createChildren();
			this.timeBg.alpha = 0.6;
		}
		private haveHide: boolean = false;
		public hideClock() {
			this.timeGroup.visible = false;
			this.haveHide = true;
			SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
		}
		public showClock(delay: number) {
			this.haveHide = false;
			this.setAutoTimeout(() => {
				if (this.haveHide) return;
				this.timeGroup.visible = true;
				SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
				SoundManager.getInstance().playEffect("bc_timer_mp3", true);
			}, this, delay)

		}
		public setBetState(type: number, bet: number) {
			if (type == 0) {
				this.betState.visible = false;
				return;
			}
			this.betState.visible = true;
			this.betState.font = null;
			this.betState.text = "";
			this.betState.font = type == 1 ? "superbaicao_lose_fnt" : "superbaicao_win_fnt";
			let txtVal: string;
			switch (type) {
				//放弃
				case 1:
					txtVal = "f";
					break;
				//跟注 
				case 2:
					txtVal = "g";
					break;
				//加注
				case 3:
					txtVal = "j" + "+" + bet;
					break;

			}
			this.betState.text = txtVal;

		}
		protected showShapByPo(angle) {
			let r = 0;
			let shape = this.timeShape;
			shape.graphics.clear();
			shape.graphics.beginFill(0xff0000);
			shape.graphics.moveTo(r, r);//绘制点移动(r, r)点
			shape.graphics.lineTo(r * 2, r);//画线到弧的起始点
			shape.graphics.drawArc(0, 0, 37, 0, angle * Math.PI / -180, true);//-
			shape.graphics.lineTo(r, r)
			shape.graphics.endFill();

		}

		private chupaiDB: DBComponent;
		public playChuPaiDB() {
			//this.chupaiDB = Owen.UtilsString.playDB("superbaicao_nc", this.dbGroup, -1);
		}
		public stopChuPaiDB() {
			if (this.chupaiDB) {
				game.UIUtils.removeSelf(this.chupaiDB);
				this.chupaiDB = null;
			}

		}
		public update() {
			if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
				let endTime = Global.roomProxy.roomInfo.countdown.end;
				let startTime = game.DateTimeManager.instance.now;
				let cha = endTime - startTime;
				let s = Global.roomProxy.roomInfo.countdown.s;
				let value = Math.floor(360 * cha / s);
				// * 360;
				if (value >= 0) {
					this.showShapByPo(value);
				}
				this.timeLabel.text = NumberFormat.getNNTimeStr(cha);
			}
		}

		public mineReseatLiushuiPos(haveBack: boolean) {
			if (haveBack) {
				this.rebackTxt.visible = true;
				this.liushuiGroup.visible = true;
				this.liushuiLabel.verticalCenter = -17;
				this.rebackTxt.verticalCenter = 23;
			}
			else {
				this.rebackTxt.visible = false;
				this.liushuiLabel.verticalCenter = 10;
				//this.liushuiGroup.visible = false;
			}
		}
		public otherReseatLiushuiPos(haveBack: boolean) {
			if (haveBack) {
				this.liushuiGroup.visible = true;
				this.rebackTxt.visible = true;
				this.liushuiLabel.verticalCenter = -17;
				this.rebackTxt.verticalCenter = 16;
			}
			else {
				this.rebackTxt.visible = false;
				this.liushuiLabel.verticalCenter = 10;
				//this.liushuiGroup.visible = false;
			}
		}

		public playDB() {
			this.db = Owen.UtilsString.createDBLoop("ynbc_win", this.effectGroup);
		}
		public disposeDB() {
			if (this.db) {
				game.UIUtils.removeSelf(this.db);
				SoundManager.getInstance().stopEffectByName("bc_win_mp3");
				this.db = null;
			}


		}
		public playWinMusic() {
			SoundManager.getInstance().playEffect("bc_win_mp3");
		}
		public showLiushui(gainGold) {
			this.liushuiGroup.visible = true;
			this.liushuiLabel.visible = true;
			if (gainGold > 0) {
				this.liushuiLabel.font = RES.getRes("baicao_common_fnt");
				if (Global.runBack) {
					this.liushuiLabel.text = gainGold;
				} else {
					this.liushuiLabel.text = gainGold + "";
				}

			} else if (gainGold <= 0) {
				this.liushuiLabel.font = RES.getRes("baicao_lose_fnt");

				if (Global.runBack) {
					this.liushuiLabel.text = gainGold;
				} else {
					this.liushuiLabel.text = gainGold + "";
				}
			}

		}
		public showSuperLiushui(gainGold) {
			this.liushuiGroup.visible = true;
			this.liushuiLabel.visible = true;
			if (gainGold > 0) {
				this.liushuiLabel.font = RES.getRes("superbaicao_win_fnt");
				if (Global.runBack) {
					this.liushuiLabel.text = gainGold;
				} else {
					this.liushuiLabel.text = gainGold + "";
				}

			} else if (gainGold < 0) {
				this.liushuiLabel.font = RES.getRes("superbaicao_lose_fnt");

				if (Global.runBack) {
					this.liushuiLabel.text = gainGold;
				} else {
					this.liushuiLabel.text = gainGold + "";
				}
			}
			else {
				this.liushuiLabel.visible = false;
			}

		}

	}
}