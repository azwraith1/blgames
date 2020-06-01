/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 18:34:59 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-17 16:58:07
 * @Description: 麻将比赛付费表情
 */
class MatchMJEmojiItem extends eui.Component {
	private numberLabel: eui.Label;
	private iconImage: eui.Image;
	private gold: number;
	private index;
	public constructor() {
		super();
		this.skinName = new MatchMJEmojiItemSkin();
	}

	public createChildren() {
		super.createChildren();
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
	}

	public initData(index, gold) {
		this.index = index;
		this.gold = gold;
		this.iconImage.source = RES.getRes(`emoji_icon_${index}_png`);
		this.numberLabel.text = gold + "元";
	}

	public onTouch() {
		CF.dP(ENo.EMOJI_SEND, {index:this.index, gold: this.gold});
	}
}