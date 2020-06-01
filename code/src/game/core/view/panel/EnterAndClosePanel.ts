/*
 * @Author: MC Lee 
 * @Date: 2019-12-10 17:52:31 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-10 17:54:38
 * @Description: 只有一个通用的慢板的
 */
class EnterAndClosePanel extends BaseScalePanel {
	public constructor(skinName) {
		super();
		this.skinName = skinName;
	}

	private static _instance: EnterAndClosePanel;
	public static getInstance(skinName): EnterAndClosePanel {
		if (!EnterAndClosePanel._instance) {
			EnterAndClosePanel._instance = new EnterAndClosePanel(skinName);
		}
		return EnterAndClosePanel._instance;
	}


	public createChildren() {
		super.createChildren();
	}

	protected closeBtn: eui.Button;
	protected enterBtn: eui.Button;
	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.closeBtn:
			case this.enterBtn:
				this.hide();
				break
		}
	}

	public show() {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		EnterAndClosePanel._instance = null;
	}
}