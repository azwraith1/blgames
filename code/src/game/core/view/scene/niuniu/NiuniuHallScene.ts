/*
 * @Author: MC Lee 
 * @Date: 2019-05-21 10:04:33 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-17 09:27:34
 * @Description: 牛牛大厅界面
 */
module niuniu {
	export class NiuniuHallScene extends game.BaseHallScene {
		public hallId: string = "blnn";
		public pmdKey: string = "blnn";
		/**
		 * 头像前缀
		 */
		public headerFront: string = "nns";
		/**
		 * 背景音乐
		 */
		public bgMusic: string = "niuniu_bgm_mp3";

		/**
		 * 关闭当前界面的通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_NIUNIUSELECT;

		/**
		 * 进入正确匹配的通知
		 */
		public MATCHING_NOTIFY: string = SceneNotify.OPEN_NIUNIU_MATCHING;

		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string = PanelNotify.OPEN_HELP_SHU;

		/**
		 * 记录界面的通知
		 */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_NIUGAMERECORD;

		/**
		 * 设置界面的通知
		 */
		public SETTING_NOTIFY: string = null;

		/**
		 * 需要加载的资源组
		 */
		public loadGroups: string[] = ['niuniu_game'];

		protected centerGroup: eui.Group;
		protected centerGroup0: eui.Group;

		private btnGroup: eui.RadioButtonGroup;;
		private ptBtn: eui.RadioButton;
		private jsBtn: eui.RadioButton;
		private centerGroupPos: egret.Point;
		private moveGroup: eui.Group;
		public constructor() {
			super();
			this.skinName = new NiuniuHallSceneSkin();
		}

		public createChildren() {
			super.createChildren();
			FrameUtils.changeBgImage("./resource/gameAssets/niuniu_hall/nns_hall_bg.jpg");
			this.jsBtn.value = "1";
			this.ptBtn.value = "0";
			this.showHallBarMove();
			this.resetPMDPosition();
			this.centerGroupPos = new egret.Point(this.centerGroup.x, this.centerGroup.y);
			if (Global.gameProxy.lastGameConfig) {
				var playway = Global.gameProxy.lastGameConfig.playway;
				LogUtils.logD("============playway==========" + playway);
				if (playway) {
					if (playway == 0) {
						this.ptBtn.selected == true
					}
					else {
						this.jsBtn.selected = true;
					}
				}
				else {
					this.ptBtn.selected = true;
				}
			}
			else {
				this.ptBtn.selected = true;
			}

		}

		/**
		 * 修正跑马灯位子
		 */
		protected resetPMDPosition() {
			let publicMsg = PMDComponent.instance;
			publicMsg.anchorOffsetY = 24;
			publicMsg.horizontalCenter = -10;
			publicMsg.top = 120;
		}


		public onAdded() {
			super.onAdded();
			// window["onorientationchange"] = function () {
			// 	var or = window["orientation"];
			// 	if (or == 90 || or == -90) {
			// 		CF.dP(ENo.STAGE_ORITATIONCHANGE, "landscape");
			// 		//alert("横屏");
			// 	}
			// 	else {
			// 		CF.dP(ENo.STAGE_ORITATIONCHANGE, "vertical");
			// 		//	alert("竖屏");
			// 	}
			// }
			CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
			this.ptBtn.addEventListener(egret.Event.CHANGE, this.radioChangeHandler, this);
			this.jsBtn.addEventListener(egret.Event.CHANGE, this.radioChangeHandler, this);

			//CF.aE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
			this.ptBtn.removeEventListener(egret.Event.CHANGE, this.radioChangeHandler, this);
			this.jsBtn.removeEventListener(egret.Event.CHANGE, this.radioChangeHandler, this);
			//CF.rE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
		}
		private radioChangeHandler(evt: egret.Event): void {
			if (evt.target.value == "1") {
				if (Global.gameProxy.lastGameConfig)
					Global.gameProxy.lastGameConfig["playway"] = 1;
				egret.Tween.get(this.moveGroup).to({ x: -719 }, 300).call(() => {
				});
			}
			else {
				if (Global.gameProxy.lastGameConfig)
					Global.gameProxy.lastGameConfig["playway"] = 0;
				egret.Tween.get(this.moveGroup).to({ x: -719 }, 2).to({ x: 57 }, 300);
			}
		}
		/**
			 * 屏幕旋转
			 * */
		private oritationChange(e: egret.Event) {

			var _data = e.data;
			//	egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
			//横屏
			if (_data == "landscape") {
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(SceneNotify.OPEN_NIUNIUSELECT_LANDSCAPE);
				LogUtils.logD("==================横屏=============");
			}
			else {
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(SceneNotify.OPEN_NIUNIUSELECT);
				LogUtils.logD("==================竖屏=============");
			}
		}
		/**
		 * 进入匹配或者重新获取数据
		 * @param  {egret.Event} e?
		 */
		public async enterScene(event) {
			if (this.lockEnter) {
				return;
			}
			this.lockEnter = true;
			var data = event.data;
			//普通或急速场
			if (this.ptBtn.selected) {
				data["playway"] = 0;
				// Global.gameProxy.lastGameConfig["playway"] = 0;
			}
			else {
				this.MATCHING_NOTIFY = SceneNotify.OPEN_NIUNIU_JSMATCHING;
				data["playway"] = 1;
				// Global.gameProxy.lastGameConfig["playway"] = 1;
			}
			LogUtils.logD("=========牛牛=============" + JSON.stringify(data));
			RotationLoadingShu.instance.load(this.loadGroups, "", async () => {
				var handler = ServerPostPath.hall_sceneHandler_c_enter;
				let resp: any = await game.PomeloManager.instance.request(handler, data);
				if (this.enterSceneCall(resp, data)) {
					Global.gameProxy.lastGameConfig = data;
					Global.gameProxy.lastGameConfig.gameId = data.gameId;
				};
			})
		}

		/**
		 * 渲染hallScene
		 */
		public showHallBars() {
			this.centerGroup.alpha = 0;
			var nums = Global.gameProxy.gameNums["blnn"];
			let index = 1;
			var item: any;
			let fonts = [0, 0x083831, 0x0b1e3c, 0x472507, 0x762d09, 0x5a0937, 0x440707];
			for (let i in nums) {
				let barConfig = nums[i];
				let bar = this['bar' + index] as NiuNiuHallSceneBar;
				bar.showBarByConfig(barConfig, index, fonts[index]);
				game.UIUtils.removeSelf(this['yy' + index]);
				bar.visible = barConfig.enable;
				if (index == 6) {
					bar.y += 12;
				}
				index++;

			}
			egret.Tween.get(this.centerGroup).to({
				alpha: 1
			}, 800);
		}
		public showHallBarMove() {
			this.centerGroup0.alpha = 0;
			var nums = Global.gameProxy.gameNums["blnn"];
			let index = 1;
			var item: any;
			let fonts = [0, 0x083831, 0x0b1e3c, 0x472507, 0x762d09, 0x5a0937, 0x440707];
			for (let i in nums) {
				let barConfig = nums[i];
				let bar = this['bar' + index + "_M"] as NiuNiuHallSceneBar;
				bar.showBarByConfig(barConfig, index, fonts[index]);
				game.UIUtils.removeSelf(this['yy' + index + "_M"]);
				bar.visible = barConfig.enable;
				if (index == 6) {
					bar.y += 12;
				}
				index++;
			}
			egret.Tween.get(this.centerGroup0).to({
				alpha: 1
			}, 800);
		}
	}
}
