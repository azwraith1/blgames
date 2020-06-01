class ClubInnerRecordTabItem extends game.BaseUI {

	protected gameIdImage: eui.Image;
	protected gameId: number;
	protected isSelect: boolean = false;
	public redPoint:eui.Image;
	public constructor(gameId) {
		super();
		this.gameId = gameId;
		this.skinName = "ClubInnerRecordTabItemSkin";
	}
	public get gameID() {
		return this.gameId;
	}
	public createChildren() {
		super.createChildren();
	}

	public showStatus(isSeelect: boolean) {
		this.isSelect = isSeelect;
		if (isSeelect) {
			this.gameIdImage.source = `club_game_${this.gameId}_down_png`;
			
		} else {
			this.gameIdImage.source = `club_game_${this.gameId}_up_png`;
		}
		if(TextUtils.instance.currentLanguage=="ko_kr"){
			TextUtils.instance.changeImage(this.gameIdImage);
		}
	}

	public onTouchTap(e: egret.TouchEvent) {
		if (this.isSelect) {
			return;
		}
		CF.dP(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this);
	}
}