/*
 * @Author: MC Lee 
 * @Date: 2019-10-08 10:41:42 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-27 18:49:56
 * @Description: 选场场景热门条
 */
class HotHallBar extends game.BaseUI {
	private group1: eui.Group;
	private group2: eui.Group;
	private backBtn: eui.Button;
	private scroller: eui.Scroller;
	private itemGroup: eui.Group;
	public constructor() {
		super();
		this.skinName = new HotHallBar1Skin();
	}

	public createChildren() {
		super.createChildren();
		//初始化造型
		let hallData = Global.gameProxy.sceneList;
		let index = 0;
		for (let i = 0; i < hallData.length; i++) {
			let hallItemData = hallData[i];
			if (hallItemData.gameId == "club") {
				continue;
			}
			if (hallItemData.grade == 2 || hallItemData.grade == 1) {
				let item = new HotBarItem(hallItemData);
				item.x = index * (item.width + 10);
				this.itemGroup.addChild(item);
				index++;
			}
		}
		this.init();
	}

	public init() {
		// this.group1.visible = false;
		this.group1.x = 0;
		this.group2.x = - this.group2.width;
		this.group2.visible = false;
		this.setAutoTimeout(() => {
			this.scroller.viewport.scrollH = this.scroller.viewport.contentWidth - 376;
		}, this, 100)
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.group1:
				majiang.MajiangUtils.playClick();
				this.group1Touch();
				break;
			case this.backBtn:
				this.backBtnTouch();
				break;
		}
	}

	/**
	 */
	public group1Touch() {
		let time = 100;
		egret.Tween.removeTweens(this.group2);
		egret.Tween.removeTweens(this.group1);
		this.group2.visible = true;
		this.scroller.viewport.scrollH = this.scroller.viewport.contentWidth - 376
		egret.Tween.get(this.group1).to({
			x: - this.group1.width
		}, time).call(() => {
			egret.Tween.get(this.group2).to({
				x: 0
			}, time);
		});
		// this.group2.visible = true;
		// this.group1.visible = false;
	}

	/**
	 */
	public backBtnTouch() {
		let time = 100;
		egret.Tween.removeTweens(this.group2);
		egret.Tween.removeTweens(this.group1);
		this.scroller.viewport.scrollH = this.scroller.viewport.contentWidth - 376;
		egret.Tween.get(this.group2).to({
			x: - this.group2.width
		}, time).call(() => {
			this.group2.visible = false;
			egret.Tween.get(this.group1).to({
				x: 0
			}, time);
		});
	}
}
