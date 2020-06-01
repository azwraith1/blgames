/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:11:47 
 * @Last Modified time: 2018-07-06 11:53:44
 * @Description: 游戏选择场景。
 */

module majiang {
	export class ERMJHallScene extends BaseMaJiangHallScene {
		public pmdKey: string = "ermj";
		public hallId: string = "ermj";
		private headerMask: eui.Image;

		// /**
		//  * 头像前缀
		//  */
		// public headerFront: string = "hall_header";
		/**
		 * 背景音乐
		 */
		public bgMusic: string = "home_bg_mp3";

		/**
		 * 关闭当前界面的通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_ERMJ_HALL;

		/**
		 * 进入正确匹配的通知
		 */
		public MATCHING_NOTIFY: string = SceneNotify.OPEN_ERMJ_MATCHING;

		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string = PanelNotify.OPEN_DZMJ_HELP;

		/**
		 * 记录界面的通知
		 */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_DZMJRECORD;

		/**
		 * 设置界面的通知
		 */
		public SETTING_NOTIFY: string = null;

		/**
		 * 需要加载的资源组
		 */
		public loadGroups: string[] = ['ermj_game'];//smart

		public constructor() {
			super();
		//	this.skinName = new majiang.ERMJHallSceneSkin();
		}
		public onAdded() {
			super.onAdded();
			CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
		}

		public helpBtnTouch() {
			BaseMajiangHelpScene.getInstance(`MajiangHelpSkin`, "mj_help", "ermj").show();
		}

		public recordBtnTouch() {
			CF.sN(PanelNotify.OPEN_BASE_RECORD, "ermj");
		}

		/**
		 * 获取对局信息
		 * @param  {egret.Event} e?
		 */
		public async enterScene(e) {
			if (this.lockEnter) {
				return;
			}
			this.lockEnter = true;
			var data = e.data;
			RotationLoading.instance.load(["majiang_game"], "", async () => {
				var handler = ServerPostPath.hall_sceneHandler_c_enter;
				data['isContinue'] = false;
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
			RES.loadGroup("majiang_common");
			this.headerImage.mask = this.headerMask;
		}


		// public showHallBars() {
		// 	var nums = Global.gameProxy.gameNums["ermj"];
		// 	let index = 1;
		// 	var item: any;
		// 	for (let i in nums) {
		// 		let barConfig = nums[i];
		// 		item = new ERMJHallBar(nums[i], index, "ermj");
		// 		item.name = "item" + i;
		// 		this.contentGroup.addChild(item);
		// 		item.x = this.getXIndex(index);
		// 		index++;
		// 		item.alpha = 1;
		// 	}
		// }

		public getXIndex(index) {
			switch (index) {
				case 1:
					return 170;
				case 2:
					return 485;
				case 3:
					return 800;
				case 4:
					return 1115;
			}
		}
	}
}