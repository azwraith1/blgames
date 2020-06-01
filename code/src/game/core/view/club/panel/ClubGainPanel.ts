class ClubGainPanel extends BaseInstanceScence {

	private touchBtnGroup: eui.Group;
	private personBtn: eui.Button;
	private clubBtn: eui.Button;
	private list: eui.List;
	private static _instance: ClubGainPanel;
	private hander;
	private msg = {};
	private ClubIncomeInfo: eui.Label;
	private closeBtn: eui.Button;
	private inComeGroup: eui.Group;
	private clubIncomeTxt: eui.BitmapLabel;
	private clubIncomeTotalTxt: eui.BitmapLabel;
	private scroller: eui.Scroller;
	private listBg: eui.Image;
	private gainType: number = 1;
	private currentId: number;
	private tabItemGroup: eui.Group;
	public constructor() {
		super();
		this.skinName = `ClubGainPanelSkin${CF.tis}`//"ClubGainPanelSkin";
	}
	private clubItems: Array<ClubInnerRecordTabItem> = [];
	public onAdded() {
		super.onAdded();
		CF.aE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.innerRecordItemTouch, this)
	}
	private flushUI() {
		let clubIds = ClubManager.instance.clubIds;
		this.flushId(clubIds[0])
		for (let i = 0; i < clubIds.length; i++) {
			let item = new ClubInnerRecordTabItem(clubIds[i]);
			this.tabItemGroup.addChild(item);
			item.showStatus(clubIds[i] == this.currentId);
			this.clubItems.push(item);
		}
	}
	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.innerRecordItemTouch, this)
	}
	private innerRecordItemTouch(e: egret.Event) {
		if (this.isLock) return;
		let data = e.data as ClubInnerRecordTabItem;
		for (let i = 0; i < this.clubItems.length; i++) {
			let club = this.clubItems[i];
			club.showStatus(club == data);
		}
		this.flushId(data.gameID);
		this.init();
	}
	private flushId(org: number) {
		this.currentId = org;
		this.msg["gameId"] = this.currentId;
	}

	protected onTouchTap(e: egret.TouchEvent) {
		super.onTouchTap(e);
		e.stopPropagation();
		switch (e.target) {
			case this.closeBtn:
				this.hide();
				break;
			case this.personBtn:
				if (this.isLock) return;
				this.personBtn.currentState = "down";
				this.clubBtn.currentState = "up";
				this.setClubType(1);
				this.init();
				break;
			case this.clubBtn:
				if (this.isLock) return;
				this.clubBtn.currentState = "down";
				this.personBtn.currentState = "up";
				this.setClubType(2);
				this.init();
				break;
		}
	}
	/**1是个人战绩 2是俱乐部战绩
	 * 默认显示俱乐部战绩
	 */
	private setClubType(type: number) {
		this.msg["type"] = type;
		this.gainType = type;
	}
	private isLock: boolean = false;

	public static get instance(): ClubGainPanel {
		if (!ClubGainPanel._instance) {
			ClubGainPanel._instance = new ClubGainPanel();
		}
		return ClubGainPanel._instance;
	}

	public async show() {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		if (ClubManager.instance.currentClub.role == 3) {
			this.touchBtnGroup.visible = false;
		}
		else {
			this.touchBtnGroup.visible = true;
		}
		this.personBtn.currentState = "down";
		this.clubBtn.currentState = "up";
		this.setClubType(1);
		this.flushUI();
		this.init();
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		ClubGainPanel._instance = null;
	}
	//======下面是私有方法====================================================
	public createChildren() {
		super.createChildren();
		this.list.dataProvider = null;
		this.list.itemRenderer = ClubPlayerGainItem;
		this.msg = {
			clubId: ClubManager.instance.currentClub.clubId,
			gameId: this.currentId,
			skip: 0,//是否分页
			limit: 50,//最大请求条数
			type: this.gainType
		}
		this.scroller.scrollPolicyH = "off";
	}
	private async init() {
		this.isLock = true;
		this.list.dataProvider = null;
		this.hander = ServerPostPath.hall_clubHandler_c_getClubReportInfo;
		let resp: any = await game.PomeloManager.instance.request(this.hander, this.msg);
		Global.pomelo.clearLastLock();
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
			// return;
		} else {

			LogUtils.logD("===战绩===" + JSON.stringify(resp));
			let reportInfo = resp["reportInfo"];
			let listData = _.sortBy(reportInfo, function (item) {
				return item["roomInfo"]["create_time"];
			});
			if (reportInfo.length <= 0) {
				this.listBg.source = "club_mem_kong_png";
				TextUtils.instance.changeImage(this.listBg);
			} else {
				this.listBg.source = "clug_gain_listbg_png";
			}
			for (var key in listData) {
				listData[key]["gainType"] = this.gainType;
				listData[key]["currentID"] = this.currentId;
			}
			if (ClubManager.instance.currentClub.role == 1 && this.gainType == 2) {
				this.inComeGroup.visible = true;
				let clubIncome = resp["ClubIncomeInfo"];
				let incomeVal = clubIncome["curGainGold"];
				let totalVal = Owen.Utils.additionFun(clubIncome["totalGainGold"], incomeVal);
				this.clubIncomeTxt.font = this.setTxtFont(incomeVal);
				this.clubIncomeTxt.text = incomeVal;

				this.clubIncomeTotalTxt.font = this.setTxtFont(totalVal);
				this.clubIncomeTotalTxt.text = totalVal + "";

			}
			else {
				this.inComeGroup.visible = false;
			}
			this.list.dataProvider = new eui.ArrayCollection(listData.reverse());
		}
		this.isLock = false;
	}
	private setTxtFont(val: number) {
		if (val >= 0) {
			return "club_win_fnt"
		}
		else {
			return "club_lose_fnt"
		}
	}

}