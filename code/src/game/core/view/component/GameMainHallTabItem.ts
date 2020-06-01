class GameMainHallTabItem extends ClubInnerRecordTabItem {
	public dividerLine: eui.Image;
	private listDB: eui.Group;
	private dbCom: DBComponent;
	private txtBg:eui.Image;
	public constructor(gameId) {
		super(gameId);
		this.skinName = "GameMainTabItemSkin";
	}
	public createChildren() {
		super.createChildren();
	}
	public showStatus(isSeelect: boolean) {
		this.isSelect = isSeelect;
		this.listDB.removeChildren();

		if (isSeelect) {
			this.txtBg.visible=true;
			this.gameIdImage.source = `club_main_${this.gameId}_down_png`;
			this.listDB.visible = true;
			let mc: DBComponent = GameCacheManager.instance.getCache("dt20_list_1");
			if (!mc) {
				mc = new DBComponent("dt20_list");
				GameCacheManager.instance.setCache("dt20_list_1", mc);
			}
			//let db: DBComponent = new DBComponent("dt20_list");
			this.listDB.addChild(mc);
			mc.playByFilename(-1);
		} else {
			this.txtBg.visible=false;
			this.listDB.visible = false;
			this.gameIdImage.source = `club_main_${this.gameId}_up_png`;
		}
		if (TextUtils.instance.currentLanguage == "ko_kr") {
			TextUtils.instance.changeImage(this.gameIdImage);
		}
	}
}