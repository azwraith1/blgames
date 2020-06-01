/*
 * @Author: MC Lee 
 * @Date: 2019-05-28 18:08:32 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-28 18:38:58
 * @Description: 竖版造型的帮助界面
 */
class BaseMajiangHelpScene extends game.BaseComponent {
	private tab1: eui.Image;
	private tab2: eui.Image;

	private tabName1: string;
	private tabName2: string;
	private imageName: string;
	private closeBtn: eui.Button;
	private contentImage: eui.Image;
	private scroller: eui.Scroller;
	private rects: eui.Rect;
	private static _instance: BaseMajiangHelpScene;
	private gameName: string;
	public static getInstance(skinName, tabName, gameName): BaseMajiangHelpScene {
		if (!BaseMajiangHelpScene._instance) {
			BaseMajiangHelpScene._instance = new BaseMajiangHelpScene(skinName, tabName, gameName);
		}
		return BaseMajiangHelpScene._instance;
	}

	/**
	 * @param  {} skinName 皮肤
	 * @param  {} tabName 
	 */
	public constructor(skinName, tabName, gameName) {
		super();
		this.skinName = skinName;
		this.gameName = gameName;
		this.imageName = tabName + "_tab_img";
		this.tabName1 = tabName + "_tab1_";
		this.tabName2 = tabName + "_tab2_";
	}

	public show() {
		RotationLoading.instance.load(["majiang_common"], "", () => {
			GameLayerManager.gameLayer().panelLayer.addChild(this);
		});
	}

	public hide() {
		game.UIUtils.removeFromParent(this);
		BaseMajiangHelpScene._instance = null;
	}

	public createChildren() {
		super.createChildren();
		this.selectIndex(1);
		this.scroller.scrollPolicyH = "off"
	}

	private currentIndex: number;


	public selectIndex(number) {
		if (this.currentIndex == number) {
			return;
		}
		if (!this.gameName) {
			return;
		}
		this.currentIndex = number;
		for (let i = 1; i <= 2; i++) {
			let tab = this[`tab${i}`] as eui.Image;
			if (i == number) {
				tab.source = this[`tabName${i}`] + "1_png";
			} else {
				tab.source = this[`tabName${i}`] + "2_png";
			}
		}
		this.scroller.stopAnimation();
		this.scroller.viewport.scrollV = 0;
		if (this.gameName == "gyzjmj") {
			this.contentImage.scaleX = 0.94;
			this.contentImage.scaleY = 0.94;
		}
		this.contentImage.source = RES.getRes(`${this.gameName}_help_${number}_png`);
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
			case this.closeBtn:
			case this.rects:
				this.hide();
				break;

		}

	}
}