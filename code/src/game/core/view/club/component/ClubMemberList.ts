class ClubMemberList extends BaseClubMemberRender {
	public roomTime: eui.Label;

	public constructor(gameid) {
		super(gameid);
	

	}
	public renderUI(data: any) {
		this.setPlayType(data["role"]);
		this.showPlayerDatas(data);
		this.roomTime.text = TextUtils.instance.getCurrentTextById(44)+"：" + this.fmtDate(data["lastTime"]);
	}
	protected createChildren(): void {
		super.createChildren();
		this.headerImage.mask = this.headerMask;
	}
}