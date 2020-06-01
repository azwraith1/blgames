/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 14:43:44 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-13 21:07:05
 * @Description: 比赛结束
 */
class MatchInvitePanel extends BaseScalePanel {
	private static _instance: MatchInvitePanel;
	public static get instance(): MatchInvitePanel {
		if (!MatchInvitePanel._instance) {
			MatchInvitePanel._instance = new MatchInvitePanel();
		}
		return MatchInvitePanel._instance;
	}
	protected data;

	public constructor() {
		super();
		if (GameConfig.CURRENT_ISSHU) {
			this.skinName = new MatchInvitePanelShuSkin();
			return;
		}
		this.skinName = new MatchInvitePanelSkin();
	}

	public show() {
		GameLayerManager.gameLayer().maskLayer.addChild(this);
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		MatchInvitePanel._instance = null;
	}

	public s_pushRaceInvite() {

	}

	public clubInvite(e: egret.Event) {

	}
	private enterBtn: eui.Button;
	private guangImage: eui.Image;
	public createChildren() {
		super.createChildren();
		egret.Tween.get(this.guangImage, { loop: true }).to({
			rotation: 360
		}, 5000)
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.enterBtn:
				this.enterBtnTouch();
				break;
			case this.closeBtn:
				this.closeBtnTouch();
				break;
		}
	}

	public closeBtnTouch() {
		this.hide();
	}

	private enterBtnTouch() {
		if (GameConfig.CURRENT_ISSHU) {
			RotationLoadingShu.instance.load(['match_hall'], "", () => {
				this.hide();
				CF.dP(ENo.CLOSE_ALL);
				CF.sN(SceneNotify.OPEN_MATCH_HALL);
			})
		} else {
			RotationLoading.instance.load(['match_hall'], "", () => {
				this.hide();
				CF.dP(ENo.CLOSE_ALL);
				CF.sN(SceneNotify.OPEN_MATCH_HALL);
			})
		}
	}
}