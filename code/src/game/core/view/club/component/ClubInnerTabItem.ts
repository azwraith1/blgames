class ClubInnerTabItem extends game.BaseUI {
	private selectImage: eui.Image;
	private gameIdImage: eui.Image;
	public gameId: number;
	public constructor(gameId) {
		super();
		this.gameId = gameId;
		this.skinName = new ClubInnerTabItemSkin();
	}

	public createChildren() {
		super.createChildren();
	}

	public showStatus(isSeelect: boolean) {
		if (isSeelect) {
			this.selectImage.visible = true;
			this.gameIdImage.source = RES.getRes(`club_game_${this.gameId}_2_png`);
		} else {
			this.selectImage.visible = false;
			this.gameIdImage.source = RES.getRes(`club_game_${this.gameId}_1_png`);
		}
	}

	public onTouchTap(e: egret.TouchEvent) {
		if (this.selectImage.visible) {
			return;
		}
		CF.dP(ENo.CLUB_INNER_ITEM_TOUCH, this);
	}
}