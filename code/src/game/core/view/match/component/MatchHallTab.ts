/*
 * @Author: MC Lee 
 * @Date: 2019-11-25 15:54:07 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-11-25 16:42:57
 * @Description: 左侧条
 */
class MatchHallTab extends game.BaseUI {
	private tabImage: eui.Image;
	private gameId: number;
	public constructor() {
		super();
		this.skinName = new MatchHallTabBarSkin();
	}

	public createChildren() {
		super.createChildren();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
	}

	public changeImageId(gameId: number) {
		this.gameId = gameId;
		this.changeImage();
	}

	public changeImage() {
		if (GameConst.MATCH_TAB_INDEX == this.gameId) {
			this.tabImage.source = RES.getRes(`match_hall_type${this.gameId}_1_png`);
		} else {
			this.tabImage.source = RES.getRes(`match_hall_type${this.gameId}_2_png`);
		}
	}

	public touchTap() {
		CF.dP(ENo.MATCH_TAB_TOUCH, this.gameId);
	}
}