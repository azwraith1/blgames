/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 17:26:34 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-04 11:35:53
 * @Description: 晋级界面
 */
class MatchHelpPanel extends game.BaseScene {
	private static _instance: MatchHelpPanel;
	public static get instance(): MatchHelpPanel {
		if (!MatchHelpPanel._instance) {
			MatchHelpPanel._instance = new MatchHelpPanel();
		}
		return MatchHelpPanel._instance;
	}

	private image: eui.Image;
	private tab1: eui.Image;
	private tab2: eui.Image;
	private tabIndx: number = 1;
	private closeBtn: eui.Button;
	private scroller: eui.Scroller;
	public constructor() {
		super();
		this.skinName = new MatchHelpPanelSkin();
	}

	public createChildren() {
		super.createChildren();
		this.showTab();
	}

	private showTab() {
		this.scroller.stopAnimation();
		this.scroller.viewport.scrollV = 0;
		if (this.tabIndx == 1) {
			this.tab1.alpha = 1;
			this.tab2.alpha = 0;
			this.image.source = RES.getRes("match_hall_help_bg1_png")
		} else {
			this.tab1.alpha = 0;
			this.tab2.alpha = 1;
			this.image.source = RES.getRes("match_hall_help_bg3_png")
		}
	}

	public show() {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
	}

	public hide() {
		if (MatchHelpPanel._instance) {
			game.UIUtils.removeSelf(this);
			MatchHelpPanel._instance = null;
		}
	}


	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.tab1:
				this.tabIndx = 1;
				this.showTab();
				break;
			case this.tab2:
				this.tabIndx = 2;
				this.showTab();
				break;
			case this.closeBtn:
				this.hide();
				break;
		}
	}
}