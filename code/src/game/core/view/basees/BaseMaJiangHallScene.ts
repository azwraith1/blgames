class BaseMaJiangHallScene extends game.BaseHallScene {
	private gameIDName: eui.Image;
	private coinDB: eui.Group;
	/**
 * 头像前缀
 */
	public headerFront: string = "hall_header";
	public pmdKey: string;
	public hallId: string;
	/**
	 * 关闭当前界面的通知
	 */
	public CLOSE_NOTIFY: string;

	/**
	 * 进入正确匹配的通知
	 */
	public MATCHING_NOTIFY: string;

	/**
	 * 帮助界面的通知
	 */
	public HELP_NOTIFY: string;

	/**
	 * 记录界面的通知
	 */
	public RECORD_NOTIFY: string;

	/**
	 * 设置界面的通知
	 */
	public SETTING_NOTIFY: string = null;

	private mjHotBar: MaJiangHotHallBar;
	/**
	 * 需要加载的资源组
	 */
	public loadGroups: string[];
	public constructor() {
		super();
		this.skinName = "BaseMaJiangHallSceneSkin";
	}
	public createChildren() {
		super.createChildren();
		LogUtils.logD("======gameIDName=====" + ("mj_hallid_" + this.pmdKey + "_png"));
		this.gameIDName.source = "mj_hallid_" + this.pmdKey + "_png";

		Owen.UtilsString.playDB("dt20_coin", this.coinDB, -1);
		this.mjHotBar.bottom = 0;
		let ui_a = game.Utils.getURLQueryString("ui_a");
		if (ui_a == "1") {
			this.mjHotBar.visible = false;
		}
	}
	//大厅选场bar
	public showHallBars() {
		var nums = Global.gameProxy.gameNums[this.pmdKey];

		let index = 1;
		var item: BaseMJHallBar;
		for (let i in nums) {
			let barConfig = nums[i];
			item = new BaseMJHallBar(nums[i], index, this.pmdKey, this.loadGroups);
			item.name = "item" + i;
			this.contentGroup.addChild(item);
			item.showButtonAni(index * 100);
			//this.showButtonAni(item,index*150);
			item.x = 10 + item.width / 2 + (index - 1) * (item.width + 10);//20
			index++;
			item.alpha = 1;
		}
	}
	public onAdded() {
		super.onAdded();
		CF.aE(ENo.MJ_HOTBTN_ONCLICK, this.hotBtnOnCLick, this);
	}
	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.MJ_HOTBTN_ONCLICK, this.hotBtnOnCLick, this);
	}

	//热门游戏 
	protected showHotBar() {


	}
	private hotBtnOnCLick(e: egret.Event) {
		let isClick: boolean = e.data;
		if (isClick) {
			egret.Tween.get(this.mjHotBar).to({ bottom: 100 }, 500, egret.Ease.quadOut);
			this.setAutoTimeout(() => {
				egret.Tween.removeTweens(this.mjHotBar);
				this.mjHotBar.bottom = 100;
			}, this, 500);
		}
		else {
			egret.Tween.get(this.mjHotBar).to({ bottom: 0 }, 500, egret.Ease.quadOut);
			this.setAutoTimeout(() => {
				egret.Tween.removeTweens(this.mjHotBar);
				this.mjHotBar.bottom = 0;
			}, this, 500);
		}
	}
}