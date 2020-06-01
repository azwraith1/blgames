/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:11:47 
 * @Last Modified time: 2018-07-06 11:53:44
 * @Description: 游戏选择场景。
 */

module majiang {
	export class GYZJHallScene extends BaseMaJiangHallScene {
		public pmdKey: string = "gyzjmj";
		public hallId: string = "gyzjmj";

		private headerMask: eui.Image;

		/**
	//  * 头像前缀
	//  */
		// 	public headerFront: string = "hall_header";
		/**
		 * 背景音乐
		 */
		public bgMusic: string = "home_bg_mp3";

		/**
		 * 关闭当前界面的通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_GYZJMJ_HALL;

		/**
		 * 进入正确匹配的通知
		 */
		public MATCHING_NOTIFY: string = SceneNotify.OPEN_GYZJ_MATCHING;

		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string = PanelNotify.OPEN_HELP;

		/**
		 * 记录界面的通知
		 */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_GYZJRECORD;

		/**
		 * 设置界面的通知
		 */
		public SETTING_NOTIFY: string = null;


		/**
		 * 需要加载的资源组
		 */
		public loadGroups: string[] = ['gyzjmj_game'];

		// public helpBtnTouch() {
		// 	BaseMajiangHelpScene.getInstance(`MajiangHelpSkin`, "mj_help", "hnmj").show();
		// }

		public constructor() {
			super();
			//this.skinName = `XLCHHallSceneSkin`;
			//	this.skinName = "resource/skins/scene/gyzj/GYZJHallSceneSkin.exml";
		}

		public helpBtnTouch() {
			BaseMajiangHelpScene.getInstance(`MajiangHelpSkin`, "mj_help", "gyzjmj").show();
		}
		public onAdded() {
			super.onAdded();
			CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
		}
		public recordBtnTouch() {
			CF.sN(PanelNotify.OPEN_BASE_RECORD, "gyzjmj");
		}
		/**
		 * 检查回到界面
		 */
		private checkReconnectScene() {
			let roomState = Global.gameProxy.roomState;
			if (roomState && roomState.state == 1) {
				RotationLoading.instance.load(["gyzjmj_game"], "", () => {
					this.enterScene({ data: roomState });
				});
			}
		}


		/**
		 * 进入匹配或者重新获取数据
		 * @param  {egret.Event} e?
		 */
		public async enterScene(event) {
			var data = event.data;
			if (this.lockEnter) {
				return;
			}
			this.lockEnter = true;
			RotationLoading.instance.load(this.loadGroups, "", async () => {
				var handler = ServerPostPath.hall_sceneHandler_c_enter;
				let resp: any = await game.PomeloManager.instance.request(handler, data);
				if (this.enterSceneCall(resp, data)) {
					Global.gameProxy.lastGameConfig = data;
					Global.gameProxy.lastGameConfig.gameId = data.gameId;
				};
			})
		}

		/**
	 * 书写逻辑代码
	 */

		private choseType: number;//记录上次选择的游戏种类。
		public createChildren() {
			super.createChildren();
			this.headerImage.mask = this.headerMask;
		}
		/**头像渲染重写*/
		/**
	 * 玩家信息
	 */
		protected renderPlayerInfo() {
			super.renderPlayerInfo();
			// this.headerImage.scaleX = 1.7;
			// this.headerImage.scaleY = 1.7;
		}
		private dbGroup: eui.Group;

		// public showHallBars() {
		// 	var nums = Global.gameProxy.gameNums["gyzjmj"];
		// 	let index = 1;
		// 	var item: any;
		// 	for (let i in nums) {
		// 		let barConfig = nums[i];
		// 		item = new GYZJHallBar(nums[i], index, "gyzjmj");
		// 		item.width = 288;
		// 		item.name = "item" + i;
		// 		this.contentGroup.addChild(item);
		// 		// item.x = 32 + item.width / 2 + (index - 1) * (item.width + 32)
		// 		item.x = 20 + item.width / 2 + (index - 1) * (item.width + 30);
		// 		index++;
		// 		item.alpha = 1;
		// 	}
		// }
	}
}