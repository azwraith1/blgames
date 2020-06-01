class BaiCaoHelpPanel extends BaseInstanceScence {
	private static _instance;
	private closeBtn: eui.Button;
	private contentImage:eui.Image;
	public constructor() {
		super();
		this.skinName = `BaiCaoHelpSkin`;
	}
	public async show(gameId:string) {
		this.contentImage.source=gameId+"_help_tab_img1_png";
		GameLayerManager.gameLayer().panelLayer.addChild(this);
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		BaiCaoHelpPanel._instance = null;
	}
	public static get instance(): BaiCaoHelpPanel {
		if (!BaiCaoHelpPanel._instance) {
			BaiCaoHelpPanel._instance = new BaiCaoHelpPanel();
		}
		return BaiCaoHelpPanel._instance;
	}
	protected onTouchTap(e: egret.TouchEvent) {
		super.onTouchTap(e);
		e.stopPropagation();
		switch (e.target) {
			case this.closeBtn:
				this.hide();
				break;
		}
	}
}