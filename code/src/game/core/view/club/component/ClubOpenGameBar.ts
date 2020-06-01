class ClubOpenGameBar extends game.BaseUI {
	private openGameItems: Array<ClubOpenGameItemCom> = [];
	private clubOpenGameItemGroup: eui.Group;
	public constructor() {
		super();
		this.skinName = "ClubOpenGameBarSkin";
	}
	public initOpenGameItems() {
		this.clubOpenGameItemGroup.removeChildren();
		//初始化openGameId
		let clubIds = ClubManager.instance.clubIds;
		for (let i = 0; i < clubIds.length; i++) {
			let item = new ClubOpenGameItemCom(clubIds[i]);
			this.clubOpenGameItemGroup.addChild(item);
			this.openGameItems.push(item);
		}
		let differntClubIds = _.difference(ClubManager.instance.supportOpenGameId, clubIds);
		for (let i = 0; i < differntClubIds.length; i++) {
			let item = new ClubOpenGameItemCom(differntClubIds[i], false);
			this.clubOpenGameItemGroup.addChild(item);
			this.openGameItems.push(item);
		}
	}
	/**获取开放得游戏ID */
	private get CurrentOpenGameIds(): Array<number> {
		let item: ClubOpenGameItemCom;
		let openGameId: Array<number> = [];
		for (let i = 0; i < this.openGameItems.length; ++i) {
			item = this.openGameItems[i];
			if (item.setBtn.selected) {
				openGameId.push(item.gameId);
			}
		}
		return openGameId;
	}
	protected onAdded() {
		super.onAdded();
		CF.aE(ENo.CLUB_CLICK_OPENGAME, this.onOpenGameItemChange, this);

	}

	protected onRemoved() {
		super.onRemoved();
		CF.rE(ENo.CLUB_CLICK_OPENGAME, this.onOpenGameItemChange, this);
	}
	protected async onOpenGameItemChange() {
		let hander = ServerPostPath.hall_clubHandler_c_setOpenGame;
		let msg = {
			clubId: ClubManager.instance.currentClub.clubId,
			openGameId: this.CurrentOpenGameIds,
		}
		let resp: any = await game.PomeloManager.instance.request(hander, msg);
		Global.pomelo.clearLastLock();
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			// ClubManager.instance.clearOpenGameClubDatas();
			// ClubInnerHallScene.instance.showClubInfo();
		}
	}
	protected createChildren() {
		super.createChildren();
	}
}