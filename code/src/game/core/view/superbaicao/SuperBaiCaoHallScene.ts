class SuperBaiCaoHallScene extends game.BaseHallScene {
	public hallId: string = "superbaicao";
	public pmdKey: string = "superbaicao";

	private maskImage: eui.Image;
	/**
	 * 头像前缀
	 */
	public headerFront: string = "nns";
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "bc_bgm_mp3";

	/**
	 * 关闭当前界面的通知
	 */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SUPERBAICAO_HALL;

	/**
	 * 进入正确匹配的通知
	 */
	public MATCHING_NOTIFY: string = SceneNotify.OPEN_SUPERBAICAO_MATCHING;

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
	public loadGroups: string[] = ['superbaicao_game'];
	protected centerGroup: eui.Group;

	//========eui===========
	//测试
	private button1: eui.Button;
	private button2: eui.Button;
	public constructor() {
		super();
		this.skinName = "SuperBaiCaoHallSceneSkin";
	}


	public createChildren() {
		super.createChildren();
		let hotBar = GameLayerManager.gameLayer().hotBar;
		game.UIUtils.removeSelf(hotBar);
		hotBar.visible = false;

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
		this.centerGroup.alpha = 0;
		var nums = Global.gameProxy.gameNums["superbaicao"];
		let index = 1;
		var item: any;
		let fonts = [0, 0x083831, 0x0b1e3c, 0x472507, 0x762d09, 0x5a0937, 0x440707];
		for (let i in nums) {
			let barConfig = nums[i];
			let bar = this['bar' + index] as SuperBaiCaoHallBar;
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
		BaiCaoHelpPanel.instance.show("superbaicao");
	}
}