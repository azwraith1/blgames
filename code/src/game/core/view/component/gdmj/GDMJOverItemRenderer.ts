/*
 * @Author: MC Lee 
 * @Date: 2019-07-04 16:55:32 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-04 16:58:59
 * @Description: 流水条
 */
class GDMJOverItemRenderer extends eui.Component {
	protected label1: eui.Label;
	protected label2: eui.Label;
	protected label3: eui.Label;
	protected lineImage: eui.Image;
	public constructor() {
		super();
		this.skinName = `GDMJOverItemRendererSkin`;
	}

	public createChildren() {
		super.createChildren();
	}

	/**
	 * 显示文本
	 * @param  {} text1
	 * @param  {} text2
	 * @param  {} text3
	 * @param  {} color
	 */
	public showText(text1, text2, text3, isWin, type: number = 1) {
		if (isWin) {
			this.label1.textColor = this.label2.textColor = this.label3.textColor = 0XFEF6C8;
			this.lineImage.source = RES.getRes("gdmj_over_line_1_png");
		}
		if (!text3) {
			this.label1.text = text1;
			this.label3.text = text2
		} else {
			this.label1.text = text1;
			this.label2.text = text2;
			this.label3.text = text3;
		}
		//如果是以小博大 不显示本家
		if (type == 17) {
			this.label2.visible = false;
		}

	}
}