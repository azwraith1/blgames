/*
 * @Author: MC Lee 
 * @Date: 2019-05-20 19:15:54 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-27 18:57:12
 * @Description: 游戏选场大厅基础类
 */
module game {
	export abstract class BaseHallScene extends BaseScene {
		/**
		 * 大厅主键
		 */
		abstract hallId: string;
		/**
		 * 返回按钮
		 */
		protected backBtn: eui.Button;
		/**
		 * 设置按钮
		 */
		protected settingBtn: eui.Button;
		/**
		 * 帮助按钮
		 */
		protected helpBtn: eui.Button;
		/**
		 * 记录按钮
		 */
		protected recordBtn: eui.Button;
		/**
		 * 充值按钮
		 */
		protected addGoldBtn: eui.Button;

		/**
		 * 玩家头像
		 */
		protected headerImage: eui.Image;
		/**
		 * 玩家名称
		 */
		protected nameLabel: eui.Label;

		/**
		 * 金币
		 */
		protected goldLabel: eui.Label;

		/**
		 * 头像前缀
		 */
		abstract headerFront: string;

		/**
		 * 关闭当前界面的通知
		 */
		abstract CLOSE_NOTIFY: string;

		/**
		 * 进入正确匹配的通知
		 */
		abstract MATCHING_NOTIFY: string;

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

		abstract loadGroups: string[];

		protected contentGroup: eui.Group;

		protected topGroup: eui.Group;


		public constructor() {
			super();

		}

		public createChildren() {
			super.createChildren();

			//控制返回按钮
			if (ServerConfig.OP_RETURN_TYPE == "3") {
				this.backBtn.visible = false;
			}
			if (ServerConfig.RECHARGE_URL && ServerConfig.RECHARGE_URL != "null") {
				if (this.addGoldBtn) {
					this.addGoldBtn.visible = true;
				}
				//  else {
				// 	this.addGoldBtn.visible = false;
				// }
			}
			this.renderPlayerInfo();
			this.checkReconnect();
			this.showHallBars();

			//热门游戏 hotBar
			this.showHotBar();
			if (this.contentGroup) {
				this.contentGroup.alpha = 0;
				egret.Tween.get(this.contentGroup).to({
					alpha: 1
				}, 500, egret.Ease.circIn);
			}
			if (this.topGroup) {
				this.topGroup.top = - this.topGroup.height;
				egret.Tween.get(this.topGroup).to({
					top: 0
				}, 300, egret.Ease.bounceIn);
			}


		}
		//热门游戏
		protected showHotBar() {
			let hotBar = GameLayerManager.gameLayer().hotBar;
			hotBar.left = 0;
			this.resizeGroup.addChild(hotBar);
			hotBar.init();
			if (GameConfig.CURRENT_ISSHU) {
				hotBar.verticalCenter = 460;
			} else {
				hotBar.verticalCenter = -200;
			}

		}
		/**
		 * 玩家信息
		 */
		protected renderPlayerInfo() {
			let playerInfo = Global.playerProxy.playerData;
			this.nameLabel.text = playerInfo.nickname;
			let headerImage = `${this.headerFront}_${Global.playerProxy.playerData.sex}_${Global.playerProxy.playerData.figure_url}_png`;
			this.headerImage.source = headerImage;
			this.updateGold();
		}

		abstract showHallBars();

		/**
		 * 重连检测
		 */
		protected checkReconnect() {
			let roomState = Global.gameProxy.roomState;
			if (roomState && roomState.state == 1) {
				if (GameConfig.CURRENT_ISSHU) {
					RotationLoadingShu.instance.load(this.loadGroups, "", () => {
						this.enterScene({ data: roomState });
					});
				} else {
					RotationLoading.instance.load(this.loadGroups, "", () => {
						this.enterScene({ data: roomState });
					});
				}
			}
		}

		/**
		 * 进入房间
		 */
		protected lockEnter: boolean = false;
		protected async enterScene(event) {
			this.lockEnter = true;
		};


		/**
		 * 进入房间回调
		 */
		protected enterSceneCall(resp, data) {
			this.lockEnter = false;
			if (!resp) {
				return false;
			}
			if (resp && resp.error && resp.error.code) {
				Global.alertMediator.addAlert(resp.error.msg, null, null, true);
				return false;
			}
			Global.gameProxy.lastGameConfig = data;
			Global.gameProxy.lastGameConfig.gameId = data.gameId;
			if (resp.reconnect) {
				HallForwardFac.redirectScene(resp, data, () => {
					CF.sN(this.CLOSE_NOTIFY);
				});
			} else {
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(this.MATCHING_NOTIFY, data);
			}
			return true;
		}


		public onTouchTap(event: egret.TouchEvent) {
			event.stopPropagation();
			switch (event.target) {
				case this.backBtn://
					this.backBtnTouch();
					break;
				case this.recordBtn:
					this.recordBtnTouch();
					break;
				case this.helpBtn:
					this.helpBtnTouch();
					break;
				case this.settingBtn:
					this.settingBtnTouch();
					break;
				case this.addGoldBtn:
					this.addGoldBtnTouch();
					break;
			}
		}

		protected addGoldBtnTouch() {
			FrameUtils.goRecharge();
		}

		/**
		 * 返回按钮
		 */
		protected backBtnTouch() {
			if (ServerConfig.OP_RETURN_TYPE == "2") {
				FrameUtils.goHome();
				return;
			}
			if (GameConfig.CURRENT_ISSHU) {
				RotationLoadingShu.instance.load(["main"], "", () => {
					CF.sN(this.CLOSE_NOTIFY);
					CF.sN(SceneNotify.OPEN_MAIN_HALL);
				}, 100)
			} else {
				RotationLoading.instance.load(["main"], "", () => {
					CF.sN(this.CLOSE_NOTIFY);
					CF.sN(SceneNotify.OPEN_MAIN_HALL);
				}, 100)
			}

		}

		/**
		 * 记录按钮
		 */
		public recordBtnTouch() {
			CF.sN(this.RECORD_NOTIFY, Global.gameProxy.gameIds[this.hallId]);
		}

		/**	
		 * 帮助按钮
		 */
		public helpBtnTouch() {
			CF.sN(this.HELP_NOTIFY, { type: this.hallId });
		}

		public settingBtnTouch() {
			CF.sN(this.SETTING_NOTIFY, { setIndex: this.hallId });
		}

		public onAdded() {
			super.onAdded();
			CF.aE(ENo.GO_OTHERHALL_SCENE, this.goOtherHall, this);
			CF.aE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
			if (this.headerImage) {
				this.headerImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.headerImageTouch, this);
			}
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.GO_OTHERHALL_SCENE, this.goOtherHall, this);
			CF.rE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
			if (this.headerImage) {
				this.headerImage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.headerImageTouch, this);
			}
		}


		protected changHeader(e: egret.Event) {
			let data = e.data;
			this.headerImage.source = `${this.headerFront}_${data.sex}_${data.figureUrl}_png`;
			Global.playerProxy.playerData.figure_url = data.figureUrl;
			Global.playerProxy.playerData.sex = data.sex;
		}

		/**
		 * 换头像
		 */
		protected headerImageTouch() {
			CF.sN(PanelNotify.OPEN_HEADER);
		}

		/**
		 * 
		 * 去其他热门
		 */
		private goOtherHall(evt: egret.TouchEvent) {
			let gameId = evt.data.gameId;
			if (gameId == this.pmdKey) {
				return;
			}
			let sourceName = `${gameId}_hall`;
			switch (gameId) {
				case "mjxzdd":
					sourceName = "xzdd_hall"; break;
				case "mjxlch":
				case "scmj":
					sourceName = "majiang_hall"; break;
				case "blnn":
					sourceName = "niuniu_hall"; break;
				case "zjh":
					sourceName = "zhajinhua_hall"; break;
				case "baccarat":
					sourceName = "bjl_hall"; break;
			}
			let resource = [sourceName];
			if (gameId.indexOf("mj") > -1) {
				resource.push("majiang_common");
			}
			FrameUtils.changeBgImage("");
			if (GameConfig.CURRENT_ISSHU) {
				RotationLoadingShu.instance.load(resource, "", () => {
					CF.sN(`OPEN_${gameId.toLocaleUpperCase()}_HALL`);
					CF.sN(this.CLOSE_NOTIFY);
				})
			} else {
				RotationLoading.instance.load(resource, "", () => {
					CF.sN(`OPEN_${gameId.toLocaleUpperCase()}_HALL`);
					CF.sN(this.CLOSE_NOTIFY);
				})
			}
		}


	}
}