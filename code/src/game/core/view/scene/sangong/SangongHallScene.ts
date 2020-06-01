/*
 * @Author: li mengchan 
 * @Date: 2018-11-22 15:24:58 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-22 15:06:19
 * @Description: 三公游戏
 */
module sangong {
	export class SangongHallScene extends game.BaseHallScene {
		public hallId: string = "sangong";
		public pmdKey: string = "sangong";

		private headerGroup: eui.Group;
		private headerImageMask: eui.Image;
		/**
		 * 头像前缀
		 */
		public headerFront: string = "hall_header";
		/**
		 * 背景音乐
		 */
		public bgMusic: string = "niuniu_bgm_mp3";

		/**
		 * 关闭当前界面的通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SANGONG_HALL;

		/**
		 * 进入正确匹配的通知
		 */
		public MATCHING_NOTIFY: string = SceneNotify.OPEN_SANGONG_WATING;

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
		public loadGroups: string[] = ['sangong_game'];

		public constructor() {
			super();
			this.skinName = new SangongHallSceneSkin();
		}

		public createChildren() {
			super.createChildren();
			FrameUtils.changeBgImage("./resource/gameAssets/sangong_hall/sg_hall_bg.jpg");
		}

		/**
		 * 修正跑马灯位子
		 */
		public resetPMDPosition() {
			let publicMsg = PMDComponent.instance;
			publicMsg.anchorOffsetY = 24;
			publicMsg.horizontalCenter = 10;
			publicMsg.top = 120;
		}


		public onAdded() {
			super.onAdded();
			CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
			CF.aE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
			CF.rE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
		}
		/**
			 * 屏幕旋转
						 * */
		public oritationChange(e: egret.Event) {
			var _data = e.data;
			var currentSceneName: string = this.CLOSE_NOTIFY.replace("CLOSE", "OPEN");
			var sceneName: string;
			//横屏
			if (_data == "H") {
				sceneName = currentSceneName + "_HORIZON"
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(sceneName);
			}
			else {
				sceneName = currentSceneName.replace("_HORIZON", "");
				CF.sN(this.CLOSE_NOTIFY);
				CF.sN(sceneName);
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
			RotationLoadingShu.instance.load(this.loadGroups, "", async () => {
				var handler = ServerPostPath.hall_sceneHandler_c_enter;
				let resp: any = await game.PomeloManager.instance.request(handler, data);
				if (this.enterSceneCall(resp, data)) {
					Global.gameProxy.lastGameConfig = data;
					Global.gameProxy.lastGameConfig.gameId = data.gameId;
				};
			})
		}

		public showHallBars() {
			var nums = Global.gameProxy.gameNums["sangong"];
			let index = 1;
			var item: any;
			for (let i in nums) {
				if (index > 5) {
					break;
				}
				let barConfig = nums[i];
				let bar = this['bar' + index] as SangongHallSceneBar;
				bar.showBarByConfig(barConfig, index);
				bar.visible = barConfig.enable;
				index++
			}
		}
	}
}
