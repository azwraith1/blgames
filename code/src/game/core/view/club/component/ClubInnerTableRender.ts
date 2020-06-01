/*
 * @Author: MC Lee 
 * @Date: 2020-01-09 14:38:29 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-13 18:38:55
 * @Description: 条
 */
class ClubInnerTableRender extends game.BaseItemRender {
	private kongImage: eui.Image;
	private gameNameLabel: eui.Label;
	private difenLabel: eui.Label;
	private statusLabel: eui.Label;
	private tableSetImg: eui.Image;
	public infoGroup: eui.Group;
	public tableNum: eui.BitmapLabel;
	public tableNumGroup: eui.Group;
	public constructor() {
		super();
		let clubId = ClubInnerHallScene.instance.currentClubGameId;
		switch (clubId) {
			case GAME_ID.GDMJ:
			case GAME_ID.MJXZDD:
				this.skinName = new ClubInnerTableRenderSkin2();
				break;
			case GAME_ID.ERMJ:
				this.skinName = new ClubInnerTableRenderSkin3();
				break;
			case GAME_ID.BLNN:
				this.skinName = new ClubInnerTableRenderSkin5();
				break;
			case GAME_ID.BDZ:
			case GAME_ID.ZJH:
				this.skinName = new ClubInnerTableRenderSkin4();
				break;
			case GAME_ID.HBMJ:
				this.skinName = new ClubInnerTableRenderSkin6();
				break;
			default:
				this.skinName = new ClubInnerTableRenderSkin1();
				break;
		}
	}
	public setTableImg(isShow: boolean = true) {
		this.tableSetImg.visible = isShow;
		this.infoGroup.visible = !isShow;
		this.tableNumGroup.visible = !isShow;
	}

	protected dataChanged() {
		super.dataChanged();
		let data = this.data;
		// this.showTableInfo();
		this.gameNameLabel.text = `${data.usedSeatNum}/${data.seatNum}`;
		this.difenLabel.text = TextUtils.instance.getCurrentTextById(29) + ":" + data.betBase;
		this.tableNum.text = data["tableNum"];
		this.showTablePlayer();
		this.showRoomStatus();
		//smart
		if (data["isNew"] == -1) {
			this.setTableImg();
			//所有头像不能看见
			for (let i = 1; i < 9; i++) {
				if (this[`group${i}`]) this[`group${i}`].visible = false;
			}
		}
		else {
			this.setTableImg(false);

		}

	}


	public showRoomStatus() {
		let status = this.data.status;
		if (status == 1) {
			this.statusLabel.text = TextUtils.instance.getCurrentTextById(30);
			this.statusLabel.textColor = 0X43FD4C;
		} else if (status == 2) {
			this.statusLabel.text = TextUtils.instance.getCurrentTextById(31);
			this.statusLabel.textColor = 0XFD7843;
		} else {
			this.statusLabel.text = TextUtils.instance.getCurrentTextById(31);
			this.statusLabel.textColor = 0XFD7843;
		}
	}

	public showTablePlayer() {
		let tableListPlayerInfo = this.data.tableListPlayerInfo;
		for (let i = 1; i < 9; i++) {
			if (this[`group${i}`]) this[`group${i}`].visible = false;
		}
		if (tableListPlayerInfo) {
			for (let i = 0; i < tableListPlayerInfo.length; i++) {
				let data = tableListPlayerInfo[i];
				let seatId = data.seatId;
				this[`group${seatId}`].visible = true;
				this[`header${seatId}`].source = RES.getRes(`nns_${data.sex}_${data.figureUrl}_png`);
			}
		}
	}

	public createChildren() {
		super.createChildren();
		TextUtils.instance.changeImage(this.kongImage);
		TextUtils.instance.changeImage(this.tableSetImg);
	}

	public onTouchTap(e: egret.TouchEvent) {
		if (this.data["isNew"] == -1) {
			CF.dP(ENo.CLUB_INNER_TABLE_SET_TOUCH, this.data);
		}
		else {
			CF.dP(ENo.CLUB_INNER_TABLE_TOUCH, this.data);
		}

	}
}