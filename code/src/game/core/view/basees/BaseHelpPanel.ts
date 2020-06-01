/*
 * @Author: MC Lee 
 * @Date: 2019-05-28 18:08:32 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-28 18:38:58
 * @Description: 竖版造型的帮助界面
 */
class BaseHelpShuPanel extends game.BaseComponent {
	private tab1: eui.Image;
	private tab2: eui.Image;
	private tab3: eui.Image;

	private tabName1: string;
	private tabName2: string;
	private tabName3: string;
	private imageName: string;
	private closeBtn: eui.Button;
	private contentImage: eui.Image;
	private scroller: eui.Scroller;
	private rects: eui.Rect;
	private static _instance: BaseHelpShuPanel;
	private language: string;
	public static getInstance(skinName, tabName, language = ""): BaseHelpShuPanel {
		if (!BaseHelpShuPanel._instance) {
			BaseHelpShuPanel._instance = new BaseHelpShuPanel(skinName, tabName, language);
		}
		return BaseHelpShuPanel._instance;
	}

	/**
	 * @param  {} skinName 皮肤
	 * @param  {} tabName 
	 */
	public constructor(skinName, tabName, language) {
		super();
		this.skinName = skinName;
		this.language = language
		this.imageName = tabName + `_tab_img`;
		this.tabName1 = tabName + "_tab1_";
		this.tabName2 = tabName + "_tab2_";
		this.tabName3 = tabName + "_tab3_";
	}

	public show() {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
	}


	public hide() {
		game.UIUtils.removeFromParent(this);
		BaseHelpShuPanel._instance = null;
	}

	public createChildren() {
		super.createChildren();
		this.selectIndex(1);
	}

	private currentIndex: number;


	public selectIndex(number) {
		if (this.currentIndex == number) {
			return;
		}
		this.currentIndex = number;
		for (let i = 1; i <= 3; i++) {
			let tab = this[`tab${i}`] as eui.Image;
			if (i == number) {
				tab.source = this[`tabName${i}`] + `1${this.language}`;
			} else {
				tab.source = this[`tabName${i}`] + `2${this.language}`;
			}
		}
		this.scroller.stopAnimation();
		this.scroller.viewport.scrollV = 0;
		this.contentImage.source = RES.getRes(`${this.imageName}${number}${this.language}`);
	}


	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.tab1:
				majiang.MajiangUtils.playClick();
				this.selectIndex(1);
				break
			case this.tab2:
				majiang.MajiangUtils.playClick();
				this.selectIndex(2);
				break
			case this.tab3:
				majiang.MajiangUtils.playClick();
				this.selectIndex(3);
				break
			case this.closeBtn:
			case this.rects:
				this.rects.visible = false;
				this.hide();
				break;
		}
	}
}