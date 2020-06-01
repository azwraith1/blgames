/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:11:47 
 * @Last Modified time: 2018-07-06 11:53:44
 * @Description: 游戏选择场景。
 */
class HBMJHallScene extends BaseMaJiangHallScene {
	public pmdKey: string = "hbmj";
	public hallId: string = "majiang";
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
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_HBMJ_HALL;

	/**
	 * 进入正确匹配的通知
	 */
	public MATCHING_NOTIFY: string = SceneNotify.OPEN_HBMJ_MATCHING;

	/**
	 * 帮助界面的通知
	 */
	public HELP_NOTIFY: string = PanelNotify.OPEN_GDMJ_HELP;

	/**
	 * 记录界面的通知
	 */
	public RECORD_NOTIFY: string = PanelNotify.OPEN_GDMJRECORD;

	/**
	 * 设置界面的通知
	 */
	public SETTING_NOTIFY: string = null;

	/**
	 * 需要加载的资源组
	 */
	public loadGroups: string[] = ['hbmj_game'];

	public helpBtnTouch() {
		BaseMajiangHelpScene.getInstance(`MajiangHelpSkin`, "mj_help", "hbmj").show();
	}

	public recordBtnTouch() {
		CF.sN(PanelNotify.OPEN_BASE_RECORD, "hbmj");
	}

	public constructor() {
		super();
	//	this.skinName = `majiang.HBMJHallSceneSkin`;
	}
	public onAdded() {
		super.onAdded();
		CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);

	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
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
		RotationLoading.instance.load(["hbmj_game"], "", async () => {
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
		// this.headerImage.mask = this.headerMask;
	}

	private dbGroup: eui.Group;

	// public showHallBars() {
	// 	var nums = Global.gameProxy.gameNums["hbmj"];
	// 	let index = 1;
	// 	var item: any;
	// 	for (let i in nums) {
	// 		let barConfig = nums[i];
	// 		item = new HBMJHallBar(nums[i], index, "hbmj");
	// 		item.name = "item" + i;
	// 		this.contentGroup.addChild(item);
	// 		item.x = 15 + item.width / 2 + (index - 1) * (item.width + 15)
	// 		index++;
	// 		item.alpha = 1;
	// 	}
	// }
}