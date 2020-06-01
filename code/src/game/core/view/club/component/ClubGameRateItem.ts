class ClubGameRateItem extends game.BaseComponent {
	public setGroup: eui.Group;
	public setBtn: eui.Button;
	public saveBtn: eui.Button;
	public tiQuGroup: eui.Group;
	public tiQuBtn: eui.Button;
	public incomeGoldTxt: eui.Label;
	public clubRate: ClubRateSet;
	private per: string = "%";
	public clubSetGroup: eui.Group;
	private inPutGold: eui.TextInput;
	public tiQuTip: eui.Group;
	private okBtn: eui.Button;

	private memCheckBtn: eui.ToggleButton;
	private seatBtn: eui.ToggleButton;
	private touchTiQu: eui.Image;
	private ClubRateShowItemGroup: eui.Group;
	private clubItems: Array<ClubRateShowItem> = [];
	private clubSetTitle:eui.Label;
	public constructor() {
		super();
		//this.skinName = "ClubGameRateSkin";
	}
	/**隐藏税率设置 */
	private hideRateSet(isShow:boolean){
		this.clubSetTitle.visible=isShow;
		this.ClubRateShowItemGroup.visible=isShow;
		this.setBtn.visible=isShow;
	}
	public flushUI() {
		this.ClubRateShowItemGroup.removeChildren();
		this.clubItems=[];
		let clubIds = ClubManager.instance.clubIds;
		for (let i = 0; i < clubIds.length; i++) {
			let item = new ClubRateShowItem(clubIds[i]);
			this.ClubRateShowItemGroup.addChild(item);
			this.clubItems.push(item);
		}
	}
	protected createChildren() {
		super.createChildren();
		this.inPutGold.addEventListener(egret.Event.CHANGE, this.onChange, this)
		this.initInputGold();

	}
	private onChange(e: egret.Event) {
		this.inPutGold.text = Owen.UtilsString.ForceTrim(this.inPutGold.text, 1);
	}
	private initInputGold() {
		let editable = (this.inPutGold.textDisplay as eui.EditableText);
		this.inPutGold.restrict = ".0-9";
		editable.textColor = 0xad5f34;
		editable.size = 24;
	}
	protected onTouchTap(e: egret.TouchEvent) {
		super.onTouchTap(e);
		if (e.target != this.setBtn)
			this.clubRate.visible = false;

		if (e.target == this.touchTiQu) this.tiQuTip.visible = false;
		e.stopPropagation();
		switch (e.target) {
			case this.saveBtn:
				if (this.isSaveLock) return;
				this.setClubConfig();
				break;
			case this.setBtn:
				this.clubRate.visible = true;
				this.clubRate.flushInputRate(this.inputRateValue);
				break;
			case this.okBtn:
				this.receiveClubIncome();
				this.tiQuTip.visible = false;
				break;
			case this.tiQuBtn:
				this.tiQuTip.visible = true;
				this.inPutGold.text = this.incomeGoldTxt.text;
				break;
			// case this.memCheckBtn:
			// 	break;
			// case this.seatBtn:
			// 	break;
		}
	}

	/**获取金币 */
	public async getClubIncome() {
		let hander = ServerPostPath.hall_clubHandler_c_getClubIncomeInfo;
		let resp: any = await game.PomeloManager.instance.request(hander, {});
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
		}
		else {
			LogUtils.logD("getClubIncome" + JSON.stringify(resp));
			this.incomeGoldTxt.text = "" + resp["curGainGold"];
		}
	}
	/**领取金币 */
	public async receiveClubIncome() {
		let hander = ServerPostPath.hall_clubHandler_c_receiveClubIncome;
		let val = Number(this.inPutGold.text);
		let msg = {
			"receiveGold": val
		}
		let resp: any = await game.PomeloManager.instance.request(hander, msg);
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			Toast.launch(TextUtils.instance.getCurrentTextById(25), 1);
			LogUtils.logD("receiveClubIncome" + JSON.stringify(resp));
			Global.playerProxy.playerData.gold = resp["ownGold"];
			CF.dP(ServerNotify.s_payGold, { "ownGold": resp["ownGold"] })
			this.incomeGoldTxt.text = "" + resp["curGainGold"];
		}
	}
	private platPumpRate: number;
	private resp: any;
	private isLock: boolean = false;
	public get requestLock() {
		return this.isLock;
	}
	private get inputRateValue(): any {
		let rateData: Object = {};
		for (let i = 0; i < this.clubItems.length; ++i) {
			let club: ClubRateShowItem = this.clubItems[i];
			rateData[club.gameId] = club.rateVal;
		}
		return rateData;
	}

	public async getClubConfig() {

		this.isLock = true;
		this.clubRate.flushUI();
		let hander = ServerPostPath.hall_clubHandler_c_getClubConfig;
		let resp: any = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
		Global.pomelo.clearLastLock();
		if (resp.error && resp.error.code != 0) {
			this.panel.hide();
			Toast.launch(resp.error.msg, 1);
			// return;
		}
		else {
			GameLayerManager.gameLayer().panelLayer.addChild(this.panel);
			LogUtils.logD("getClubConfig" + JSON.stringify(resp));
			this.resp = resp;
			let gameClubPumpRates = resp["gameClubPumpRates"];
			this.hideRateSet(this.resp["bossIsPump"]);
			//smart
			this.flushUI();
			//smart
			for (let i = 0; i < this.clubItems.length; ++i) {
				let club: ClubRateShowItem = this.clubItems[i];
				club.setRateVal(gameClubPumpRates);
			}
  
			this.memCheckBtn.selected = this.resp["approvalSwitch"] == 1;
			this.seatBtn.selected = this.resp["isOpen"] == 0;
			this.platPumpRate = resp["platPumpRate"];

		}
		this.isLock = false;
	}

	private panel: ClubConfigPanel;
	public setRoot(target: ClubConfigPanel) {
		this.panel = target;
	}

	public setTxt(type: number, target1: eui.Label, data: number) {
		let _id = "" + type;
		let _val = data[_id];
		target1.text = Owen.Utils.multipleFun(_val, 100) + this.per;
	}
	private isSaveLock: boolean = false;
	private isSave: boolean = false;
	public async setClubConfig() {
		this.isSaveLock = true;
		let hander = ServerPostPath.hall_clubHandler_c_setClubConfig;
		let clubRate: ClubRateSet = this.clubRate;
		let rateData: Object = {};
		for (let i = 0; i < this.clubItems.length; ++i) {
			let club: ClubRateShowItem = this.clubItems[i];
			let _x = new Big(Number(club.rateVal));
			let _y = new Big(100);
			rateData[club.gameId] = _x.div(_y);// / 100
		}
		LogUtils.logD("rateData" + JSON.stringify(rateData));
		let data = this.inputRateValue;
		let isSeat = this.memCheckBtn.selected ? 1 : 0;
		let isOpen = this.seatBtn.selected ? 0 : 1;
		let msg = {
			clubId: ClubManager.instance.currentClub.clubId,
			config: { "platPumpRate": this.resp["platPumpRate"], "notice": this.resp["notice"], "gameClubPumpRates": rateData, "isOpen": isOpen, "isRank": this.resp["isRank"], "clubName": this.resp["clubName"], approvalSwitch: isSeat }//this.resp["isOpen"]
		}

		let resp: any = await game.PomeloManager.instance.request(hander, msg);
		Global.pomelo.clearLastLock();
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
			this.isSaveLock = false;


			//===>重置为之前的值
			this.isLock = true;
			let hander = ServerPostPath.hall_clubHandler_c_getClubConfig;
			let resp1: any = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
			Global.pomelo.clearLastLock();
			if (resp1.error && resp1.error.code != 0) {
				this.panel.hide();
				Toast.launch(resp1.error.msg, 1);

			}
			else {

				LogUtils.logD("getClubConfig" + JSON.stringify(resp));
				this.resp = resp1;
				let gameClubPumpRates = resp1["gameClubPumpRates"];
				for (let i = 0; i < this.clubItems.length; ++i) {
					let club: ClubRateShowItem = this.clubItems[i];
					club.setRateVal(gameClubPumpRates);
				}
				this.platPumpRate = resp1["platPumpRate"];
			}
			this.isLock = false;
		}
		else {
			this.isSaveLock = false;
			this.isSave = true;
			LogUtils.logD("setClubConfig" + JSON.stringify(resp));
			Toast.launch(TextUtils.instance.getCurrentTextById(61), 1);
			// this.incomeGoldTxt.text = "" + resp["curGainGold"];
		}
	}
}
