class ClubMemberCheck extends BaseClubMemberRender {

	public btnGroup: eui.Group;
	public rejectBtn: eui.Button;
	public agreeBtn: eui.Button;
	private IPValue: eui.Label;

	public constructor(gameid) {
		super(gameid);
		//this.skinName = "ClubMemberCheckSkin";
	}

	public renderUI(data) {
		this.IPValue.text = "ip：" + data.apply_player_ip;
		this.showPlayerDatas(data);
	}
	public showPlayerDatas(playerData) {
		this.playerId = playerData["playerUid"] || playerData["id"];
		this.nameLabel.text = playerData.apply_player_nickname;
		this.headerImage.source = `hall_header_${playerData.apply_player_sex}_${playerData.apply_player_figureUrl}_png`;
	}
	protected createChildren(): void {
		super.createChildren();
		this.headerImage.mask = this.headerMask;
	}
	protected async onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		let data: any = {
			clubId: ClubManager.instance.currentClub.clubId,
			playerUid: this.playerId,
		};
		let hander: any = ServerPostPath.hall_clubHandler_c_clubMembersApproval;
		let resp: any;
		switch (e.target) {
			case this.rejectBtn:

				data["operate"] = 0;
				//同意
				break;
			case this.agreeBtn:
				data["operate"] = 1;
				//拒绝
				break;
		}
		resp = await game.PomeloManager.instance.request(hander, data);
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			LogUtils.logD("成员 审批" + JSON.stringify(resp));
			
			this.root.setData(resp, this.gameID);
		}
	}
}