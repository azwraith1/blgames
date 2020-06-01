/*
 * @Author: MC Lee 
 * @Date: 2019-06-05 10:15:29 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 10:37:00
 * @Description: 21点大厅场景
 */
class BlackJackHallScene extends game.BaseHallScene {
	public hallId: string = "blackjack";
	public pmdKey: string = "blackjack";

	private maskImage: eui.Image;
	/**
	 * 头像前缀
	 */
	public headerFront: string = "hall_header";
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "blackjack_bgm_mp3";

	/**
	 * 关闭当前界面的通知
	 */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BLACKJ_HALL;

	/**
	 * 进入正确匹配的通知
	 */
	public MATCHING_NOTIFY: string = SceneNotify.OPEN_BLACKJ_MATCHING;

	/**
	 * 帮助界面的通知
	 */
	public HELP_NOTIFY: string = PanelNotify.OPEN_HELP_SHU;

	/**
	 * 记录界面的通知
	 */
	public RECORD_NOTIFY: string = PanelNotify.OPEN_BASE_RECORD;

	/**
	 * 设置界面的通知
	 */
	public SETTING_NOTIFY: string = PanelNotify.OPEN_SETTING;

	/**
	 * 需要加载的资源组
	 */
	public loadGroups: string[] = ['blackjack_game'];

	//========eui===========
	//测试
	private button1: eui.Button;
	private button2: eui.Button;
	public constructor() {
		super();
		this.skinName = new BlackJackHallSceneSkin();
	}


	public createChildren() {
		super.createChildren();
		this.headerImage.mask = this.maskImage;
		FrameUtils.changeBgImage("./resource/gameAssets/blackjack_hall/blackj_hall_bg.jpg");
	}

	public onAdded() {
		super.onAdded();
		// CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
	}

	public onRemoved() {
		super.onRemoved()
		CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
		// CF.rE(ServerNotify.s_roomStateChanged, this.roomStateChanged, this);
	}

	public onTouchTap(e: egret.TouchEvent) {
		super.onTouchTap(e);
		switch (e.target) {

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
		data.gameId = Global.gameProxy.gameIds[this.hallId];
		RotationLoadingShu.instance.load(this.loadGroups, "", async () => {
			var handler = ServerPostPath.hall_sceneHandler_c_enter;
			let resp: any = await game.PomeloManager.instance.request(handler, data);
			if (this.enterSceneCall(resp, data)) {
				Global.gameProxy.lastGameConfig = data;
			};
		});
	}

	/**
	 * 渲染hallScene
	 */
	public showHallBars() {
		// this.contentGroup.alpha = 0;
		var nums = Global.gameProxy.gameNums["blackjack"];
		let index = 1;
		var item: BlackJHallBar;
		let fonts = [0, 0x253ca2, 0x255105, 0x552f07, 0x310741];
		for (let i in nums) {
			let barConfig = nums[i];
			item = new BlackJHallBar()
			item.y = (index - 1) * 230;
			item.showBarByConfig(barConfig, index, fonts[index]);
			item.visible = barConfig.enable;
			index++;
			this.contentGroup.addChild(item);
			item.resetPosition();
		}
		// egret.Tween.get(this.contentGroup).to({
		// 	alpha: 1
		// }, 800);
	}

	public resetPosition(item, index) {
		switch (index) {
			case 1:

				break;
			case 2:

				break;
			case 3:

				break;
			case 4:

				break;
		}

	}


	/**	
	 * 帮助按钮
	 */
	public helpBtnTouch() {
		BaseHelpShuPanel.getInstance(`BlackJHelpSkin${CF.tis}`, `blackj_help`, CF.tic).show();
	}
}