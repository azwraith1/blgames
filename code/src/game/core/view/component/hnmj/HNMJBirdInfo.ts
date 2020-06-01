/*
 * @Author: MC Lee 
 * @Date: 2019-08-12 10:51:17 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-08-12 11:40:59
 * @Description: 抓鸟动画
 */
class HNMJBirdInfo extends game.BaseUI {
	private pai1: majiang.GDMJMineShoupai;
	private pai2: majiang.GDMJMineShoupai;
	private zhuaniaoImage: eui.Image;
	private birdInfo: number[];
	private birdCardResultInfo: number[];
	public constructor(birdInfo: number[], birdCardResultInfo: number[]) {
		super();
		this.birdInfo = birdInfo;
		this.birdCardResultInfo = birdCardResultInfo;
		this.skinName = `HNMJBirdInfoSkin`;
	}

	public createChildren() {
		super.createChildren();
		this.zhuaniaoImage.visible = true;
		this.zhuaniaoImage.scaleX = this.zhuaniaoImage.scaleY = 0;
		egret.Tween.get(this.zhuaniaoImage).to({
			scaleX: 1,
			scaleY: 1
		}, 400, egret.Ease.backInOut);
		this.pai1.alpha = this.pai2.alpha = 0;
		this.setAutoTimeout(() => {
			if (this.birdInfo.length == 1) {
				this.pai1.resetValue(this.birdInfo[0]);
				this.pai1.visible = true;
				egret.Tween.get(this.pai1).to({
					alpha: 1
				}, 200, egret.Ease.backInOut).to({
					x: 25
				}, 200, egret.Ease.sineIn);
			} else {
				this.pai1.resetValue(this.birdInfo[0]);
				this.pai2.resetValue(this.birdInfo[1]);
				this.pai1.visible = true;
				this.pai2.visible = true;
				egret.Tween.get(this.pai1).to({
					alpha: 1
				}, 200, egret.Ease.sineIn).to({
					x: 25
				}, 200);
				egret.Tween.get(this.pai2).to({
					alpha: 1
				}, 200, egret.Ease.sineIn).to({
					x: this.width - 25
				}, 200, egret.Ease.sineIn);
			}
			egret.setTimeout(() => {
				this.addPaiAni();
			}, this, 400)
		}, this, 400);
	}


	private addPaiAni() {
		let result0 = this.birdCardResultInfo[0];
		if (result0 != null && result0 != undefined) {
			if (result0 == 0) {
				this.pai1.setLihight(true);
			} else {
				let db1 = DBComponent.create("birdAni_1", "hnmj_zn") as DBComponent;
				db1.playByFilename(0);
				db1.x = this.pai1.x;
				db1.y = this.pai1.y;
				this.addChild(db1);
				this.pai1.addBirdImage();

			}
		}


		let result1 = this.birdCardResultInfo[1];
		if (result1 != null && result1 != undefined) {
			if (result1 == 0) {
				this.pai2.setLihight(true);
			} else {
				let db2 = DBComponent.create("birdAni_2", "hnmj_zn");
				db2.x = this.pai2.x;
				db2.y = this.pai2.y;
				db2.playByFilename(0);
				this.addChild(db2);
				this.pai2.addBirdImage();
			}
		}
	}
}