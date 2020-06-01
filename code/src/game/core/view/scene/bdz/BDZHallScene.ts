class BDZHallScene extends game.BaseHallScene {
	private selectGroup: eui.Group;
	public hallId: string = "bdz";
	public pmdKey: string = "bdz";
	private goldLable: eui.Label;
	private nameLable: eui.Label;
	/**
	 * 头像前缀
	 */
	public headerFront: string = "nns";

	/**
	 * 关闭当前界面的通知
	 */
	public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BDZ_HALL;

	/**
	 * 进入正确匹配的通知
	 */
	public MATCHING_NOTIFY: string = SceneNotify.OPEN_BDZ_MATCHING;

	/**
	 * 帮助界面的通知
	 */
	public HELP_NOTIFY: string = PanelNotify.OPEN_HELP;

	/**
	 * 记录界面的通知
	 */
	public RECORD_NOTIFY: string = PanelNotify.OPEN_BJL_RECORD;

	/**
	 * 设置界面的通知
	 */
	public SETTING_NOTIFY: string = null;

	/**
	 * 需要加载的资源组
	 */
	public loadGroups: string[] = ['bdz_game'];

	public constructor() {
		super();
		this.skinName = new BDZHallSceneSkin();
	}


	public createChildren() {
		super.createChildren();
		this.renderPlayerInfo();
		this.checkReconnectScene();
		// game.AudioManager.getInstance().playBackgroundMusic("zjh_bgm_mp3");

	}

	public settingBtnTouch() {
		CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "bdz" });
	}

	public helpBtnTouch() {
		BaseMajiangHelpScene.getInstance(`BDZHelpSkin`, "", "").show();
	}

	public recordBtnTouch() {
		CF.sN(PanelNotify.OPEN_BASE_RECORD, "bdz");
	}

	public onAdded() {
		super.onAdded();
		CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
	}

	public onRemoved() {
		super.onRemoved()
		CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
		CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);

	}


	private enterResult(e: egret.Event) {
		let data = e.data;
		if (data.reconnect) {
			return;
		}
		if (data.code && data.code != 0) {
			Global.alertMediator.addAlert(data.msg, () => {
			}, null, true);
			return;
		}
		Global.roomProxy.setRoomInfo(e.data);
		try {
			CF.sN(SceneNotify.CLOSE_BDZ_HALL);
			// CF.sN(SceneNotify.OPEN_ZJHWAITE, data);
		} catch (e) {
			Global.alertMediator.addAlert("加入房间失败");
		} finally {
			this.lock = false;
		}
	}

	/**
	 * 检查回到界面
	 */
	private checkReconnectScene() {
		let roomState = Global.gameProxy.roomState;
		if (roomState && roomState.state == 1) {
			RotationLoading.instance.load(["bdz_game"], "", () => {
				this.enterScene({ data: roomState });
			});
		}
	}

	/**
	 * 获取对局信息
	 * @param  {egret.Event} e?
	 */
	private lock: boolean = false;
	public async enterScene(event) {
		if (this.lock) {
			return;
		}
		this.lock = true;
		var data = event.data;
		Global.gameProxy.lastGameConfig = data;
		var handler = ServerPostPath.hall_sceneHandler_c_enter;
		let resp: any = await game.PomeloManager.instance.request(handler, data);
		if (!resp) {
			this.lock = false;
			return;
		}
		try {
			if (resp.reconnect) {
				HallForwardFac.redirectScene(resp, data, () => {
					CF.sN(SceneNotify.CLOSE_BDZ_HALL);
				});
			} else {
				RotationLoading.instance.load(["bdz_game"], "", () => {
					CF.sN(SceneNotify.CLOSE_BDZ_HALL);
					CF.sN(SceneNotify.OPEN_BDZ_MATCHING, data);
				});
			}
		} catch (e) {
			Global.alertMediator.addAlert("加入房间失败");
		} finally {
			this.lock = false;
		}
	}




	public showHallBars() {
		var nums = Global.gameProxy.gameNums["bdz"];
		let index = 1;
		var item: any;
		for (let i in nums) {
			let barConfig = nums[i];
			item = new BDZHallBar(nums[i], index);
			item.name = "item" + i;
			this.selectGroup.addChild(item);
			// item.x = 25 + item.width / 2 + (index - 1) * (item.width + 20)
			index++;
			item.alpha = 1;
			egret.Tween.get(this.selectGroup).to({
				alpha: 1
			}, 800);
			this.lock = false;

		}
	}
}