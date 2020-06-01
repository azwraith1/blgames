/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 17:46:34 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-13 17:32:39
 * @Description: 晋级人数条
 */
class MatchPassItem extends eui.Component {
	private typeImage1: eui.Image;
	private typeImage2: eui.Image;
	private countLabel: eui.BitmapLabel;
	public constructor() {
		super();
		this.skinName = new MatchPassItemSkin();
	}

	public createChildren() {
		super.createChildren();
	}

	public showData(type, number) {
		this.typeImage2.source = RES.getRes(`match_pass_type${type}_png`);
		this.typeImage1.source = RES.getRes(`match_pass_bar${type}_png`);
		this.countLabel.font = `match_pass_num${type}_fnt`;
		this.countLabel.text = number;
		egret.Tween.removeTweens(this.typeImage1);
		if (type == 2) {
			egret.Tween.get(this.typeImage1, { loop: true }).to({
				alpha: 0.5
			}, 1000).to({
				alpha: 1
			}, 1000);
		}
	}
}