/*
 * @Author: MC Lee 
 * @Date: 2019-05-21 17:10:27 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-09 15:39:01
 * @Description: 匹配界面基础类
 */
module game {
	export abstract class BaseMatchingScene extends game.BaseScene {
		/**
		 * 是否允许退出
		 */
		protected allowBack: boolean = true;
		/**
		 * 转动的图片
		 */
		protected rotationImage: eui.Image;

		/**
		 * 超时进入游戏定时器
		 */
		protected joinTimeout;

		/**
		 * 收到的enterResult但是没有开局
		 */
		protected reconnectTimeout;
		/**
		 * 自己的头像
		 */
		protected mineHeader;


		/**
		 * 记录界面的通知
		 */
		abstract RECORD_NOTIFY: string;

		/**
		 * 帮助界面的通知
		 */
		abstract HELP_NOTIFY: string;

		/**
		 * 设置界面的通知
		 */
		abstract SETTING_NOTIFY: string;

		abstract GAME_ID: string;

		public constructor() {
			super();
		}

		public createChildren() {
			super.createChildren();
			this.startRotationImage();
			this.startJoinTimeout();
			if (this.mineHeader && this.mineHeader.initWithData) {
				this.mineHeader.initWithData(Global.gameProxy.getMineGameData(), "mine");
			}
		}


		public onAdded() {
			super.onAdded();
			CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		}

		public onRemoved() {
			super.onRemoved();
			this.clearJoinTimeout();
			this.clearReconnectTimeout();
			CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
		}

		/**
		 * 开始旋转
		 */
		protected startRotationImage() {
			egret.Tween.get(this.rotationImage, { loop: true }).to({
				rotation: 360
			}, 3000);
		}

        /**
         * 更新金币
         */
		public updateGold() {
			if (this.mineHeader) {
				this.mineHeader.updateGold(Global.playerProxy.playerData.gold);
			}
		}


		protected clearJoinTimeout() {
			if (this.joinTimeout) {
				egret.clearTimeout(this.joinTimeout);
				this.joinTimeout = null;
			}
		}


		protected clearReconnectTimeout() {
			if (this.reconnectTimeout) {
				egret.clearTimeout(this.reconnectTimeout);
				this.reconnectTimeout = null;
			}
		}

		protected startReconnectTimeout() {
			this.clearReconnectTimeout();
			this.joinTimeout = egret.setTimeout(() => {
				this.reconnectSuc();
			}, this, 5000);
		}

		protected startJoinTimeout() {
			this.clearJoinTimeout();
			this.joinTimeout = egret.setTimeout(() => {
				// if (!this.allowBack) {
				// 	this.startReconnectTimeout();
				// 	return;
				// }
				this.allowBack = true;
				this.reconnectSuc();
			}, this, 20000);
		}

		public onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			switch (e.target) {
				case this.backBtn:
					this.backBtnTouch();
					break;
				case this.settingBtn:
					this.showBtnsType(1);
					CF.sN(this.SETTING_NOTIFY);
					break;
				case this.recordBtn:
					this.showBtnsType(1);
					CF.sN(this.RECORD_NOTIFY, Global.gameProxy.gameIds[this.GAME_ID]);
					break;
				case this.helpBtn:
					this.showBtnsType(1);
					CF.sN(PanelNotify.OPEN_HELP_SHU, { type: this.GAME_ID });
					break;
				case this.xlbtn:
					this.showBtnsType(2);
					break;
				case this.xlbtn1:
					this.showBtnsType(1);
					break;
			}
		}

        /**
		 * 超时匹配或者断线重连
         */
		protected async reconnectSuc() {
			this.startJoinTimeout();
			let matchSuc: boolean = await Global.gameProxy.reconnectRoom() as boolean;
			if (matchSuc) {
				if (Global.gameProxy.roomInfo.playing) {
					CF.sN(this.CLOSE_NOTIFY);
					CF.sN(this.GAME_SCENE_NOTIFY);
				}
			}
		}


		protected backHall() {
			Global.roomProxy.clearRoomInfo();
			Global.gameProxy.clearRoomInfo();
			Global.gameProxy.clearLastGameConfig();
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.GAME_HALL_NOTIFY);
		}

		protected async backBtnTouch() {
			if (!this.allowBack) {
				Global.alertMediator.addAlert(CF.tigc(144), null, null, true);
				return;
			}
			var handler = ServerPostPath.hall_sceneHandler_c_leave;
			let resp1: any = await game.PomeloManager.instance.request(handler, null);
			PomeloManager.instance.clearLastLock();
			if (resp1 && resp1.error) {
				if (resp1.error.code == 0) {
					Global.roomProxy.clearRoomInfo();
					Global.gameProxy.clearRoomInfo();
					Global.gameProxy.clearLastGameConfig();
					CF.sN(this.CLOSE_NOTIFY);
					CF.sN(this.GAME_HALL_NOTIFY);
				} else if (resp1.error.code != -10000) {
					Global.alertMediator.addAlert(CF.tigc(144), null, null, true);
				}
			}
		}
		/**
		 * 关闭匹配通知
		 */
		abstract CLOSE_NOTIFY: string;

		/**
		 * 打开游戏大厅
		 */
		abstract GAME_HALL_NOTIFY: string;

		/**
		 * 进入游戏通知
		 */
		abstract GAME_SCENE_NOTIFY: string;

	}
}