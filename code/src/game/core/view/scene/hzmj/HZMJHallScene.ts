module majiang {
	export class HZMJHallScene extends BaseMaJiangHallScene {
		public pmdKey: string = "hzmj";
		public hallId: string = "hzmj";
		private headerMask: eui.Image;
		/**
	 * 头像前缀
	 */
		//	public headerFront: string = "hall_header";
		// public headerFront: string = "nns";
		/**
		 * 背景音乐
		 */
		public bgMusic: string = "home_bg_mp3";

		/**
		 * 关闭当前界面的通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_HZMJ_HALL;

		/**
		 * 进入正确匹配的通知
		 */
		public MATCHING_NOTIFY: string = SceneNotify.OPEN_HZMJ_MATCHING;

		/**
		 * 帮助界面的通知
		 */
		public HELP_NOTIFY: string = PanelNotify.OPEN_HZMJ_HELP;

		/**
		 * 记录界面的通知
		 */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_HZMJRECORD;

		/**
		 * 设置界面的通知
		 */
		public SETTING_NOTIFY: string = null;

		/**
		 * 需要加载的资源组
		 */
		public loadGroups: string[] = ['majiang_game'];
		public constructor() {
			super();
			//	this.skinName = new majiang.DZMJHallSceneSkin();
		//	this.skinName = "resource/skins/scene/hzmj/HZMJHallSceneSkin.exml";
		}
		public onAdded() {
			super.onAdded();
			CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
		}

		/**头像渲染重写*/
		/**
	 * 玩家信息
	 */
		protected renderPlayerInfo() {
			super.renderPlayerInfo();
		}

		public helpBtnTouch() {
			BaseMajiangHelpScene.getInstance(`MajiangHelpSkin`, "mj_help", "hzmj").show();

		}
		public recordBtnTouch() {
			CF.sN(PanelNotify.OPEN_BASE_RECORD, "hzmj");

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
			RotationLoading.instance.load(["hzmj_game"], "", async () => {
				var hander = ServerPostPath.hall_sceneHandler_c_enter;
				/**这是什么意思 */
				data['isContinue'] = false;
				let resp = await game.PomeloManager.instance.request(hander, data);
				if (this.enterSceneCall(resp, data)) {
					Global.gameProxy.lastGameConfig = data;
					Global.gameProxy.lastGameConfig.gameId = data.gameId;
				};
			})

		}
		public createChildren() {
			super.createChildren();

		}

		// public showHallBars() {
		// 	var nums = Global.gameProxy.gameNums["hzmj"];
		// 	let index = 1;
		// 	var item: HZMJHallBar;
		// 	var bet = 1;
		// 	for (let i in nums) {
		// 		let barConfig = nums[i];
		// 		item = new HZMJHallBar(nums[i], index, "hzmj");
		// 		item.width = 288;
		// 		item.name = "item" + i;
		// 		this.contentGroup.addChild(item);
		// 		item.x = 20 + item.width / 2 + (index - 1) * (item.width + 30);
		// 		index++;
		// 		item.alpha = 1;
		// 	}
		// }
	}
}