/*
 * @Author: MC Lee 
 * @Date: 2019-11-26 14:23:18 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-10 18:43:39
 * @Description: 带有自动放大缩小的面板
 */
class BaseScalePanel extends game.BaseScene {
	protected scaleGroup: eui.Group;
	protected closeBtn: eui.Button;
	public constructor() {
		super();
	}

	public createChildren() {
		super.createChildren();
		this.onShow();
	}

	public onShow() {
		let beforeScale = this.scaleGroup.scaleX;
		this.scaleGroup.scaleX = this.scaleGroup.scaleY = beforeScale - 0.2;
		egret.Tween.get(this.scaleGroup).to({
			scaleX: beforeScale,
			scaleY: beforeScale
		}, 300, egret.Ease.backOut);
	}

	protected closeBtnTouch() {

	}
}