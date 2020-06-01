class ClubManagerPanel extends game.BaseComponent {
	private static _instance: ClubManagerPanel;
	public yongjin: eui.Label;
	public nameLable: eui.Label;
	public breakClub: eui.Button;
	public saveClub: eui.Button;
	public tiQuBtn: eui.Button;
	public setBtn: eui.Button;

	public static get instance(): ClubManagerPanel {
		if (!ClubManagerPanel._instance) {
			ClubManagerPanel._instance = new ClubManagerPanel();
		}
		return ClubManagerPanel._instance;
	}
	public constructor() {
		super();
		this.skinName = "ClubManagerPanelSkin";
	}

	protected async onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch (e.target) {
			case this.tiQuBtn:
				break;
			case this.setBtn:
				break;
			case this.breakClub:
				break;
			case this.saveClub:
				break;
		}
	}
	public hide() {
		game.UIUtils.removeSelf(this);
		ClubManagerPanel._instance = null;
	}
	public async show() {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		let hander = ServerPostPath.hall_clubHandler_c_getClubConfig;
		let resp: any = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
		LogUtils.logD("游戏管理：" + JSON.stringify(resp));
	}
}