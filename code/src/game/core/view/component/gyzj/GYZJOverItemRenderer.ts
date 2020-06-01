class GYZJOverItemRenderer extends GDMJOverItemRenderer {

	public constructor() {
		super();
		this.skinName ="resource/skins/component/gyzj/GYZJOverItemRenderSkin.exml";
	}
		/**
	 * 显示文本
	 * @param  {} text1
	 * @param  {} text2
	 * @param  {} text3
	 * @param  {} color
	 */
	public showText(text1, text2, text3, isWin) {
		if(isWin){
			this.label1.textColor = this.label2.textColor = this.label3.textColor = 0XFEF6C8;
			this.lineImage.source = RES.getRes("gyzj_over_line_1_png");
		}
		if (!text3) {
			this.label1.text = text1;
			this.label3.text = text2
		} else {
			this.label1.text = text1;
			this.label2.text = text2;
			this.label3.text = text3;
		}
	}
}