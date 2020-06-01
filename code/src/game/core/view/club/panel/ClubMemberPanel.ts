class ClubMemberPanel extends BaseInstanceScence {
	private gameId: any;
	private buttonGroup: eui.Group;
	public resizeGroup: eui.Group;
	private rects: eui.Rect;
	private content1: ClubMemberGroup;

	private static _instance: ClubMemberPanel;
	private closeBtn: eui.Button;
	private btnGroup: eui.Group;
	private memberID = [];
	private currentID: number;
	private clubListBg: eui.Image;



	public constructor() {
		super();
		this.skinName = `ClubMemberPanelSkin${CF.tis}`;//ClubMemberPanelSkin

	}
	public static get instance(): ClubMemberPanel {
		if (!ClubMemberPanel._instance) {
			ClubMemberPanel._instance = new ClubMemberPanel();
		}
		return ClubMemberPanel._instance;
	}
	public setListBg(num: number) {
		if (this.currentID == MEMBER_NAME.CLUB_CHECK) {
			if (num > 0) {
				this.clubListBg.source = "club_mem_list_kuang_png";
			}
			else {
				this.clubListBg.source = "club_mem_check_no_png";
				TextUtils.instance.changeImage(this.clubListBg);
			}
		}
		else {
			this.clubListBg.source = "club_mem_list_kuang_png";
		}

	}
	private clubItems: Array<ClubInnerRecordTabItem> = [];
	private async createItems() {
		for (let i = 0; i < this.memberID.length; ++i) {
			let temp = this.memberID[i];
			let item = new ClubInnerRecordTabItem(temp);
			item.showStatus(this.currentID == temp);
			if (ClubManager.instance.currentClub.role != 1 && temp == MEMBER_NAME.CLUB_MANAGE || ClubManager.instance.currentClub.role != 1 && temp == MEMBER_NAME.CLUB_CHECK) {
				item.visible = false;
			}
			else {
				item.visible = true;
			}
			if (ClubManager.instance.currentClub.role == 2) {
				item.visible = true;
			}
			if (ClubManager.instance.currentClub.role != 3 && temp == MEMBER_NAME.CLUB_CHECK) {
				// let hander: any = ServerPostPath.hall_clubHandler_c_getClubApprovalMessages;
				// let resp: any = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
				// if (resp.error && resp.error.code != 0) {
				// 	Toast.launch(resp.error.msg, 1);
				// }
				// else {
				// 	item.redPoint.visible = resp.length > 0;
				// 	LogUtils.logD("成员审批" + JSON.stringify(resp));

				// }
				item.redPoint.visible = ClubManager.instance.canShowPoint;
			}
			this.btnGroup.addChild(item);
			this.clubItems.push(item);
		}
	}

	public getCheckItem(): ClubInnerRecordTabItem {
		for (let i = 0; i < this.clubItems.length; ++i) {
			let item: ClubInnerRecordTabItem = this.clubItems[i];
			if (item.gameID == MEMBER_NAME.CLUB_CHECK) {
				return item;
			}
		}
	}

	protected onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch (e.target) {
			case this.closeBtn:
				this.hide();
				break;
			default:
				break;
		}
	}
	public hide() {
		game.UIUtils.removeSelf(this);
		ClubMemberPanel._instance = null;
	}
	public show() {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.createItems();
		this.content1.hide();
		this.sendRequest();
	}


	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.innerRecordItemTouch, this);

		/**smart 有新成员加入 */
		CF.rE(ServerNotify.s_pushNewApprovalMessagesEvent, this.s_pushNewApprovalMessagesEvent, this);
	}
	public onAdded() {
		super.onAdded();
		CF.aE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.innerRecordItemTouch, this);

		/**smart 有新成员加入 */
		CF.aE(ServerNotify.s_pushNewApprovalMessagesEvent, this.s_pushNewApprovalMessagesEvent, this);
	}
	private s_pushNewApprovalMessagesEvent(e: egret.Event) {

		ClubManager.instance.canShowPoint = true;
		if (ClubManager.instance.currentClub.role != 3) {
			this.getCheckItem().redPoint.visible = true;
		}
	}


	private innerRecordItemTouch(e: egret.Event) {
		let data = e.data as ClubInnerRecordTabItem;
		if (this.isLock) return;
		this.currentID = data.gameID;
		for (let i = 0; i < this.clubItems.length; i++) {
			let club = this.clubItems[i];
			club.showStatus(club == data);
		}
		this.content1.hide();
		this.sendRequest();
	}
	protected createChildren() {
		super.createChildren();
		this.currentID = MEMBER_NAME.CLUB_LIST;
		this.memberID = [MEMBER_NAME.CLUB_LIST, MEMBER_NAME.CLUB_CHECK, MEMBER_NAME.CLUB_MANAGE];
		this.content1.setRoot(this);
		this.setListBg(-1);
	}


	private currentRatioValue: string;
	private hander: string;
	private isLock: boolean = false;
	private async sendRequest() {
		if (this.isLock) return;
		this.isLock = true;
		let hander: any;
		let resp: any;
		switch (this.currentID) {
			//成员列表
			case MEMBER_NAME.CLUB_LIST:
				this.setListBg(-1);
				hander = ServerPostPath.hall_clubHandler_c_getClubPlayers;
				resp = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
				if (resp.error && resp.error.code != 0) {
					Toast.launch(resp.error.msg, 1);
				}
				else {
					LogUtils.logD("成员列表：" + JSON.stringify(resp));
					let listData = _.values(resp);
					this.content1.setData(listData, this.currentID);
				}
				break;
			//成员审批
			case MEMBER_NAME.CLUB_CHECK:

				hander = ServerPostPath.hall_clubHandler_c_getClubApprovalMessages;
				resp = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
				if (resp.error && resp.error.code != 0) {
					Toast.launch(resp.error.msg, 1);

				}
				else {
					LogUtils.logD("成员审批" + JSON.stringify(resp));
					this.setListBg(resp.length);
					let listData = _.values(resp);
					this.content1.setData(listData, this.currentID);
				}
				break;
			//成员管理
			case MEMBER_NAME.CLUB_MANAGE:
				this.setListBg(-1);
				hander = ServerPostPath.hall_clubHandler_c_getClubMembersAdministerInfo;
				resp = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
				if (resp.error && resp.error.code != 0) {
					Toast.launch(resp.error.msg, 1);
				}
				else {
					// LogUtils.logD("成员审批" + JSON.stringify(resp));
					// let listData = _.values(resp);
					this.content1.setData(resp, this.currentID);
				}

				break;

		}
		this.isLock = false;

	}

}
const MEMBER_NAME = {
	CLUB_LIST: 1,
	CLUB_CHECK: 2,
	CLUB_MANAGE: 3,
}