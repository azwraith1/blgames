class ClubMemerManage extends BaseClubMemberRender {
	public btnGroup: eui.Group;
	public jzImg: eui.Image;//降职
	private role: any;
	private kickBtn: smart.ButtonNew;

	public constructor(gameid) {
		super(gameid);
		//this.skinName = "ClubMemberManageSkin";
	}
	public renderUI(data) {
		super.renderUI(data);
		let role = data["role"];
		this.role = role;
		switch (role) {
			case 1://老板
				this.btnGroup.visible = false;
				break;
			case 2://管理员
				this.btnGroup.visible = true;
				this.jzImg.source = "club_mem_jiangzhi_png";
				break;
			case 3://成员
				this.btnGroup.visible = true;
				this.jzImg.source = "club_mem_shenzhi_png";
				break;
		}
		this.setPlayType(role);
	}
	protected createChildren() {
		super.createChildren();
		this.kickBtn.skinName = "NewButtonSkin";
		this.headerImage.mask = this.headerMask;
		let src = `club_mem_tichu${CF.tic}`;
		this.kickBtn.setUpImg(src, src);

		// TextUtils.instance.changeImage(this.kickBtn.upImg);
		// this.tichuImg.touchEnabled = true;
		// this.tichuImg.source = "club_mem_tichu_png";
		// TextUtils.instance.changeImage(this.tichuImg);
	}

	protected async onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		let data: any = {
			clubId: ClubManager.instance.currentClub.clubId,
			playerUid: this.playerId,
		};
		let hander: any = ServerPostPath.hall_clubHandler_c_clubMembersAdminister;
		let resp: any;
		switch (e.target) {
			case this.jzImg:
				if (this.role == 3) {
					data["operate"] = 0;
				}
				else if (this.role == 2) {
					data["operate"] = 1;
				}
				resp = await game.PomeloManager.instance.request(hander, data);
				if (resp.error && resp.error.code != 0) {
					Toast.launch(resp.error.msg, 1);
				}
				else {
					LogUtils.logD("成员 管理" + JSON.stringify(resp));
					this.root.setData(resp, this.gameID);
				}
				//同意
				break;
			case this.kickBtn://this.tichuImg:
				data["operate"] = 2;
				resp = await game.PomeloManager.instance.request(hander, data);
				if (resp.error && resp.error.code != 0) {
					Toast.launch(resp.error.msg, 1);
				}
				else {
					LogUtils.logD("成员 管理" + JSON.stringify(resp));
					this.root.setData(resp, this.gameID);
				}
				//拒绝
				break;
		}

	}
}