/*
 * @Author: MC Lee 
 * @Date: 2019-10-08 13:55:11 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 15:27:56
 * @Description: 热门条
 */
class HotBarItem extends eui.Component {
	private iconImage: eui.Image;
	private itemData;
	private isMaJiang: boolean;
	public constructor(itemData, isMaJiang: boolean = false) {
		super();
		this.itemData = itemData;
		this.isMaJiang = isMaJiang;
		this.skinName = new HotBarItemSkin();
		if (isMaJiang) this.skinName = "MaJiangHotBarItemSkin";
	}

	public createChildren() {
		super.createChildren();
		let name = this.itemData.groupCode;
		let resName = `hot_icon_${name}_png`;
		if (this.isMaJiang) resName = `hot_icon_mj_${name}_png`;
		ImageUtils.showRes(this.iconImage, resName);//smart
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	public onTouchTap() {
		egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100).call(() => {
			if (this.itemData.grade == GRADE.DEV) {
				Global.alertMediator.addAlert("暂未开放，敬请期待", null, null, true);
				return;
			} else if (this.itemData.grade == GRADE.MAINTENANCE) {
				Global.alertMediator.addAlert("游戏维护中", null, null, true);
				return;
			}
			//smart
			if (this.isMaJiang) {
				CF.dP(ENo.MJ_HOTBTN_ONCLICK, false);
			}
			else {
				GameLayerManager.gameLayer().hotHallBar.backBtnTouch();
			}
			CF.dP(ENo.GO_OTHERHALL_SCENE, { gameId: this.itemData.gameId });
		});
	}
}