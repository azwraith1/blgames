class BaseClubMemberRender extends game.BaseComponent {
	protected headerImage: eui.Image;
	protected nameLabel: eui.Label;
	protected playerType: eui.Label;
	public playerId: any;
	public gameID: number
	protected headerMask: eui.Image;
	protected root: ClubMemberGroup;
	public setRoot(root) {
		this.root = root;
	}
	public constructor(gameid) {
		super();
		this.gameID = gameid;
		switch (this.gameID) {
			case MEMBER_NAME.CLUB_LIST:
				this.skinName = "ClubMemberRenderSkin";
				break;
			case MEMBER_NAME.CLUB_CHECK:
				this.skinName = `ClubMemberCheckSkin${CF.tis}`//"ClubMemberCheckSkin";
				break;
			case MEMBER_NAME.CLUB_MANAGE:
				this.skinName = "ClubMemberManageSkin";
				break;
		}
	}


	public setPlayType(num: number) {
		switch (num) {
			//1老板
			case 1:
				this.setPlayerTypTxt(45, 0xdce488);//老板
				break;
			//会员
			case 3:
				this.setPlayerTypTxt(47, 0x442301);//"lan:47||"
				break;
			//管理员
			case 2:
				this.setPlayerTypTxt(46, 0x862409);//"lan:46||"
				break;
		}
	}
	private setPlayerTypTxt(id: any, clor: any) {
		this.playerType.text = TextUtils.instance.getCurrentTextById(id);
		this.playerType.textColor = clor;
	}
	public showPlayerDatas(playerData) {
		this.nameLabel.text = playerData.nickname;
		this.headerImage.source = `hall_header_${playerData.sex}_${playerData.figureUrl}_png`;
	}
	public renderUI(data: any) {
		this.playerId = data["playerUid"] || data["id"];
		this.showPlayerDatas(data);
	}

	/**设置时间 */
	public fmtDate(obj) {
		var date = new Date(obj * 1000);
		var y = date.getFullYear();
		var m = "0" + (date.getMonth() + 1);
		var d = "0" + date.getDate();
		var h = "0" + date.getHours();
		var mins = "0" + date.getMinutes();
		var sc = "0" + date.getSeconds();
		return y + "." + m.substring(m.length - 2, m.length) + "." + d.substring(d.length - 2, d.length) + "\t" + h.substring(h.length - 2, h.length) + ":" + mins.substring(mins.length - 2, mins.length) + ":" + sc.substring(sc.length - 2, sc.length);
	}
}