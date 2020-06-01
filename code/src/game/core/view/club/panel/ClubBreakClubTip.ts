class ClubBreakClubTip extends game.BaseComponent {
	private static _instance: ClubBreakClubTip;
	public rejectBtn: eui.Button;
	public saveBtn: eui.Button;
	private contentTxt: eui.Label;
	private onClickSave: Function;
	private thisObj: any;

	public constructor() {
		super();
		this.skinName = `ClubBreakClubPanelSkin${CF.tis}`//"ClubBreakClubPanelSkin";
	}
	protected onTouchTap(e: egret.TouchEvent) {
		super.onTouchTap(e);
		e.stopPropagation();
		switch (e.target) {
			case this.rejectBtn:
				this.hide();
				break;
			case this.saveBtn:
				if (this.onClickSave) this.onClickSave.call(this.thisObj);
				this.hide();
				break;
		}
	}
	public static get instance(): ClubBreakClubTip {
		if (!ClubBreakClubTip._instance) {
			ClubBreakClubTip._instance = new ClubBreakClubTip();
		}
		return ClubBreakClubTip._instance;
	}
	public hide() {
		game.UIUtils.removeSelf(this);
		ClubBreakClubTip._instance = null;
	}

	public show(content: string, onclickSave: Function = null, thisObj: any = null) {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.onClickSave = onclickSave;
		this.thisObj = thisObj;
		this.contentTxt.text = content;
	}

}