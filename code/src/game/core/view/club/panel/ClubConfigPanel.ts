class ClubConfigPanel extends BaseInstanceScence {
	private static _instance: ClubConfigPanel;
	private clubSet: ClubGameRateItem;
	private closeBtn: eui.Button;
	private rateSetPanel: ClubRateSet;
	public static clubId: number;


	public clubSetBtn: eui.RadioButton;
	public clubTiQuBtn: eui.RadioButton;
	private clubOpenGameBtn: eui.RadioButton;
	public rects0: eui.Rect;
	private breakBtn: eui.Button;
	private openGameBar: ClubOpenGameBar;
	private clubSetGroup: eui.Group;


	public constructor() {
		super();
		this.skinName = `ClubConfigPanelSkin${CF.tis}`;//"ClubConfigPanelSkin";
	}
	public static get instance(): ClubConfigPanel {
		if (!ClubConfigPanel._instance) {
			ClubConfigPanel._instance = new ClubConfigPanel();
		}
		return ClubConfigPanel._instance;
	}
	protected onTouchTap(e: egret.TouchEvent) {
		super.onTouchTap(e);
		this.clubSet.visible = true;
		if(TextUtils.instance.currentLanguage == "zh_cn")
		this.openGameBar.visible = false;
		switch (e.target) {
			case this.closeBtn:
				this.hide();
				break;
			case this.clubSetBtn:
				//this.clubSet.flushUI();
				this.clubSet.getClubConfig();
				this.clubSet.setGroup.visible = true;
				this.clubSet.tiQuGroup.visible = false;
				// this.clubSet.getClubIncome();
				break;
			case this.clubTiQuBtn:
				this.clubSet.setGroup.visible = false;
				this.clubSet.tiQuGroup.visible = true;
				this.clubSet.getClubIncome();
				break;
			case this.clubOpenGameBtn:
				this.openGameBar.visible = true;
				this.clubSet.visible = false;
				break;
			case this.rects0:
				this.clubSet.clubRate.visible = false;
				this.clubSet.tiQuTip.visible = false;
				break;
			case this.breakBtn:
				ClubBreakClubTip.instance.show(TextUtils.instance.getCurrentTextById(62), this.breakClub, this);
				break;
		}
	}

	public async breakClub() {
		let hander = ServerPostPath.hall_clubHandler_c_disbandClub;
		let resp: any = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
		Global.pomelo.clearLastLock();
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			//并将俱乐部玩家拉回首页游戏大厅
			this.hide();
			ClubInnerHallScene.instance.hide();
			ClubManager.instance.clearClubDatas();
			CF.sN(SceneNotify.OPEN_CLUB_HALL);
		}
	}
	protected createChildren() {
		super.createChildren();
	}
	public hide() {
		game.UIUtils.removeSelf(this);
		ClubConfigPanel._instance = null;
	}
	public show() {
		if (this.clubSet.requestLock) return;
		// this.clubSet.flushUI();
		this.clubSet.setRoot(this);
		this.clubSet.getClubConfig();
		this.clubSetBtn.selected = true;
		this.clubSet.setGroup.visible = true;
		this.clubSet.tiQuGroup.visible = false;
		if (TextUtils.instance.currentLanguage == "zh_cn") {
			this.openGameBar.initOpenGameItems();
			this.showOpenGameBtn();
		}
	}

	private showOpenGameBtn() {
		this.clubOpenGameBtn.visible = false;
		if (ClubManager.instance.currentClub.role == 1) {
			this.clubOpenGameBtn.visible = true;
		}
	}

}