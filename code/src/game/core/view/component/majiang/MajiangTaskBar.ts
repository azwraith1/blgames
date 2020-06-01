/*
 * @Author: li mengchan 
 * @Date: 2018-07-11 19:23:30 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-11-19 18:38:00
 * @Description: 麻将功能条
 */
module majiang {
	export class MajiangTaskBar extends game.BaseUI {
		//胡
		private btn1: eui.Button;
		//杠
		private btn2: eui.Button;
		//碰
		private btn3: eui.Button;
		//过
		private btn10: eui.Button;
		//吃
		private btn4: eui.Button;
		//听
		private btn5: eui.Button;
		//亮
		private btn6: eui.Button;

		private effect1: egret.MovieClip;
		private effect2: egret.MovieClip;
		private effect3: egret.MovieClip;
		private effect4: egret.MovieClip;
		private effect5: egret.MovieClip;
		private majiangScene: BaseMajiangScene;
		private selectGang: SelectGang;
		public constructor() {
			super();
			this.skinName = new TaskBarSkin();
		}

		public setRoot(majiangScene) {
			this.majiangScene = majiangScene;
		}

		public onAdded() {
			super.onAdded();
			CF.aE(ENo.GANG_SELECT, this.gangSelect, this);
			CF.aE(ENo.CHI_SELECT, this.chiSelect, this);
		}
		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.GANG_SELECT, this.gangSelect, this);
			CF.rE(ENo.CHI_SELECT, this.chiSelect, this);
			// game.MCUtils.reclaim("gang_task", this.effect2);
			// game.MCUtils.reclaim("hu_task", this.effect1);
			// game.MCUtils.reclaim("peng_task", this.effect3);
		}

		public gangSelect(e: egret.TouchEvent) {
			;
			this.selectGang.visible = false;
			let value = e.data;
			this.sendGangReq(value);
		}

		public chiSelect(e: egret.TouchEvent) {
			;
			this.selectGang.visible = false;
			let value = e.data;
			this.sendChiReq(value);
		}

		/**
         * 胡碰杠
         * @param  {} direction
         * @param  {} effectName
         */
		private addEffectAni(effectName, callback) {
			GameCacheManager.instance.getMcCache(effectName, "mine_" + effectName, (mv: egret.MovieClip) => {
				callback && callback(mv);
			});
			// game.MCUtils.getMc(effectName, (mv: egret.MovieClip) => {
			// 	callback && callback(mv);
			// });
		}

		public createEffect() {
			let roomInfo = Global.gameProxy.roomInfo;
			this.addEffectAni("gang_task", (mv: egret.MovieClip) => {
				if (mv) {
					this.addChild(mv);
					mv.scaleX = mv.scaleY = 1.5;
					mv.x = this.btn2.x - 116;
					mv.y = this.btn2.y - 89 - 5;
					// game.UIUtils.setAnchorPot(mv);
					this.effect2 = mv;
					mv.visible = false;
					this.btn2.alpha = 0;
					mv.play(-1);
				}
			});
			this.addEffectAni("hu_task", (mv: egret.MovieClip) => {
				if (mv) {
					this.addChild(mv);
					mv.scaleX = mv.scaleY = 1.5;
					mv.x = this.btn1.x - 116;
					mv.y = this.btn1.y - 89 - 5;
					// game.UIUtils.setAnchorPot(mv);
					this.effect1 = mv;
					mv.visible = false;
					this.btn1.alpha = 0;
					mv.play(-1);
				}
			});
			this.addEffectAni("peng_task", (mv: egret.MovieClip) => {
				if (mv) {
					this.addChild(mv);
					mv.scaleX = mv.scaleY = 1.5;
					mv.x = this.btn3.x - 116;
					mv.y = this.btn3.y - 89 - 5;
					// game.UIUtils.setAnchorPot(mv);
					this.effect3 = mv;
					mv.visible = false;
					mv.play(-1);
					this.btn3.alpha = 0;
				}
			});
			this.addEffectAni("chi_task", (mv: egret.MovieClip) => {
				if (mv) {
					this.addChild(mv);
					mv.scaleX = mv.scaleY = 1.5;
					mv.x = this.btn4.x - 116;
					mv.y = this.btn4.y - 89 - 5;
					// game.UIUtils.setAnchorPot(mv);
					this.effect4 = mv;
					mv.visible = false;
					this.btn4.alpha = 0;
					mv.play(-1);
				}
			});
			if (roomInfo.gameId == "dzmj" || roomInfo.gameId == "gyzjmj" || roomInfo.gameId == "ermj") {
				this.addEffectAni("ting_task", (mv: egret.MovieClip) => {
					if (mv) {
						this.addChild(mv);
						mv.scaleX = mv.scaleY = 1.5;
						mv.x = this.btn5.x - 116;
						mv.y = this.btn5.y - 89 - 5;
						// game.UIUtils.setAnchorPot(mv);
						this.effect5 = mv;
						mv.visible = false;
						this.btn5.alpha = 0;
						mv.play(-1);
					}
				});
			}
			if (roomInfo.gameId == "hbmj") {
				this.addEffectAni("liangdao_task", (mv: egret.MovieClip) => {
					if (mv) {
						this.addChild(mv);
						mv.scaleX = mv.scaleY = 1.3;
						mv.x = this.btn6.x - 116;
						mv.y = -33;
						// game.UIUtils.setAnchorPot(mv);
						this['effect6'] = mv;
						mv.visible = false;
						this.btn6.alpha = 0;
						mv.play(-1);
					}
				});
			}
		}

		public createChildren() {
			super.createChildren();
			// this.scaleX = this.scaleY = 0.8;
			this.createEffect();
			this.clearAllUi();
			this.selectGang.hide();
		}

		public hideAllBtns() {
			let mineData = Global.gameProxy.getMineGameData();
			mineData.hangupTasks = {};
			this.clearAllUi();
			this.selectGang.hide();
		}


		public clearAllUi() {
			for (let i = 1; i <= 10; i++) {
				if (this['btn' + i]) {
					this['btn' + i].visible = false;
				}
			}
			for (var i = 1; i <= 10; i++) {
				if (this['effect' + i]) {
					this['effect' + i].visible = false;
					this['effect' + i].stop();
				}
			}
			this.selectGang.hide();
		}

		/**
		 * 
		 * 根据DATA显示
		 */
		private task1 = [];
		private task2 = [];
		private task3 = [];
		private task4 = [];
		private task5 = [];
		private task6 = [];
		private taskIndex: number;
		public showBtnsByData(taskData) {
			this.clearAllUi();
			LogUtils.logDJ(taskData);
			let tasks = taskData.hangupTasks;
			let showPass = taskData.hidePass;
			this.taskIndex = taskData.taskIndex;
			this.task1 = [];
			this.task2 = [];
			this.task3 = [];
			this.task4 = [];
			this.task5 = [];
			this.task6 = [];
			let flag = false;
			for (var key in tasks) {
				let task = tasks[key];
				if (!this['task' + key]) {
					this['task' + key] = [];
				}
				this['task' + key].push(task);
				if (this['btn' + key]) this['btn' + key].visible = true;
				flag = true;
			}
			// if(flag){
			this.visible = flag;
			// }
			this.btn10.visible = !showPass;
			this.setPositions();
		}

		public showAllBtns() {
			for (let i = 1; i <= 10; i++) {
				if (this[`btn${i}`]) {
					this[`btn${i}`].visible = true;
				}
			}
			this.setPositions();
		}


		public onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			switch (e.target) {
				case this.btn3:
					this.playerPeng();
					break;
				case this.btn2:
					this.playerGang();
					break;
				case this.btn1:
					if (this.m_hzmjHuCallBack) this.m_hzmjHuCallBack.call(this.m_thisObj);
					this.PlayerHu();
					break;
				case this.btn10:
					this.playerPass();
					break;
				case this.btn4:
					this.playerChi();
					break;
				case this.btn5:
					this.playerTing();
					break;
				case this.btn6:
					this.playerLiangDao();
					break;
			}
		}

		/**
		 * 亮倒
		 */
		private playerLiangDao() {
			this.visible = false;
			// if (resp.error.code == 0) {
			this.majiangScene['playerBrights'](this.task6);
		}

		/**
		 * 报听
		 */
		public async playerTing() {
			// let route = ServerPostPath.game_mjHandler_c_baoTing;
			// let resp: any = await Global.pomelo.request(route, {});
			this.visible = false;
			// if (resp.error.code == 0) {
			this.majiangScene['playerBaoTing'](this.task5);
			// this.hideAllBtns();
			// Global.gameProxy.clearTasks();
			// }else{
			// this.visible = true;
			// }
		}


		private async sendGangReq(value) {
			let route = ServerPostPath.game_mjHandler_c_gangTask;
			this.visible = false;
			let data = { selectGang: value, taskIndex: this.taskIndex };
			let resp: any = await Global.pomelo.request(route, data);
			if (resp.error.code == 0) {
				this.hideAllBtns();
				Global.gameProxy.clearTasks();
				this.majiangScene.lockChupai = true;
			}
		}

		private async sendChiReq(value) {
			let route = ServerPostPath.game_mjHandler_c_chiTask;
			this.visible = false;
			let data = { selectCard: value, taskIndex: this.taskIndex };
			let resp: any = await Global.pomelo.request(route, data);
			if (resp.error && resp.error.code == 0) {
				// this.majiangScene.lockChupai = true;
			} else {
				if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
					this.setAutoTimeout(() => {
						CF.dP(ENo.TING_FLUSH, resp);
					}, this, 100);
				}
			}
		}

		public async playerGang() {
			let gangArray = this.task2[0].gangArray;
			// this.task2 = [{card: 22}, {card: 34}];
			if (gangArray.length > 1) {
				this.selectGang.visible = true;
				this.selectGang.initWithTask(gangArray);
				this.selectGang.x = -this.selectGang.getMaxWidth() / 2 - (gangArray.length * 25);
				this.addChild(this.selectGang);
				return;
			}
			this.sendGangReq(gangArray[0].card);
		}


		public async playerChi() {
			let gangArray = this.task4[0].maxCards;
			// this.task2 = [{card: 22}, {card: 34}];
			if (gangArray.length > 1) {
				this.selectGang.visible = true;
				this.selectGang.initWithChiTask(gangArray);
				this.selectGang.x = -this.selectGang.getMaxWidth() / 2 - (gangArray.length * 25);
				this.addChild(this.selectGang);
				return;
			}
			this.sendChiReq(gangArray[0]);
		}




		public async playerPeng() {
			let route = ServerPostPath.game_mjHandler_c_pengTask;
			this.visible = false;
			let resp: any = await Global.pomelo.request(route, { taskIndex: this.taskIndex });
			if (resp.error && resp.error.code == 0) {
				this.hideAllBtns();
				Global.gameProxy.clearTasks();
				// this.majiangScene.lockChupai = true;
				// Global.gameProxy.clearCurPlay();
			} else {
				if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
					//	LogUtils.logD("PENG PAI +playerPeng==============="+JSON.stringify(resp.outCardTingCards,null,'\t'));
					let gameConfig = Global.gameProxy.lastGameConfig;
					let mineData = Global.gameProxy.getMineGameData();
					//过滤 贵阳捉鸡 杭州麻将
					if (gameConfig.gameId == 10019 || gameConfig.gameId == "gyzjmj" || gameConfig.gameId == "hzmj" || gameConfig.gameId == 10017) {
						this.setAutoTimeout(() => {
							CF.dP(ENo.TING_FLUSH, resp);
						}, this, 100);
					}
					else {
						this.setAutoTimeout(() => {
							CF.dP(ENo.TING_FLUSH, resp);
						}, this, 100);
					}
				}
			}
		}

		public async playerPass() {
			let route = ServerPostPath.game_mjHandler_c_passTask;
			this.visible = false;
			let resp: any = await Global.pomelo.request(route, { taskIndex: this.taskIndex });
			if (resp.error.code == 0) {
				this.hideAllBtns();
				// Global.gameProxy.clearTasks();
				// this.majiangScene.lockChupai = true;
				// Global.gameProxy.clearCurPlay();
			}
		}


		public async PlayerHu() {
			let route = ServerPostPath.game_mjHandler_c_huTask;
			this.visible = false;
			let resp: any = await Global.pomelo.request(route, { taskIndex: this.taskIndex });
			if (resp.error.code == 0) {
				this.hideAllBtns();
				Global.gameProxy.clearTasks();
				// this.majiangScene.lockChupai = true;
				// Global.gameProxy.clearCurPlay();
			}

		}
		private m_hzmjHuCallBack: Function;
		private m_thisObj: any;
		/**杭州麻将胡*/
		public addHZMJPlayHuCallBack(playHu: Function, thisObj: any) {
			this.m_hzmjHuCallBack = playHu;
			this.m_thisObj = thisObj;
		}
		public setPositions() {
			// let number = 0;
			let number = 140;
			let index = 5;
			for (let i = 10; i >= 1; i--) {
				if (this['btn' + i] && this['btn' + i].visible) {
					this['btn' + i].x = number * (index - 1);
					if (this['effect' + i]) {
						this['effect' + i].visible = true;
						this['effect' + i].x = this['btn' + i].x - 32 - 65;
						this['effect' + i].play(-1);
					}
					index--;
				}
			}
		}
	}
}