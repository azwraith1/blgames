class ClubTableManagePanel extends game.BaseComponent {

	public tableNumTxt: eui.EditableText;
	public setBtn: eui.Button;
	public saveBtn: eui.Button;
	private static _instance: ClubTableManagePanel;
	private clubDifenSet: ClubTableDiFenSetCom;
	private touchRect: eui.Rect;
	private difenSetGroup: eui.Group;
	private rects: eui.Rect;
	private tableDiFenData: Array<number> = [];
	private difenTxt: eui.Label;
	private closeBtn: eui.Button;
	public constructor() {
		super();
		this.skinName = `ClubTableManagePanelSkin${CF.tis}`//"ClubTableManagePanelSkin";
	}
	public static get instance(): ClubTableManagePanel {
		if (!ClubTableManagePanel._instance) {
			ClubTableManagePanel._instance = new ClubTableManagePanel();
		}
		return ClubTableManagePanel._instance;
	}
	protected onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();

		switch (e.target) {
			case this.setBtn:
				this.difenSetGroup.visible = true;
				this.clubDifenSet.setInputArr(this.tableDiFenData);

				// this.hide();
				break;
			case this.saveBtn:
				this.onTouchSaveBtn();
				break;
			case this.touchRect:
				this.difenSetGroup.visible = false;
				break;
			case this.rects:
				this.hide();
				break;
			case this.closeBtn:
				this.hide();
				break;
			default:
				break;
		}
	}
	/**初始化底分的值 */
	private point = ",";
	public initDiFen(data: Array<number>) {
		this.tableDiFenData = data;

		let text: string = "";
		let current: number;
		let next: number;
		for (let i = 0; i < this.tableDiFenData.length; ++i) {
			current = this.tableDiFenData[i];
			next = this.tableDiFenData[i + 1];
			if (next) {
				text = text + current + this.point;
			}
			else {
				text = text + current;
			}
		}
		this.difenTxt.text = text;
		let betBase = [];
		if (this.tableDiFenData.length > 0) {
			let txtArr: Array<string> = text.split(this.point);

			for (let i = 0; i < txtArr.length; ++i) {
				let tempt = Number(new Big(txtArr[i]));
				betBase.push(tempt);
			}
		}

		this.betBase = betBase;

	}
	private betBase: Array<any> = [];
	protected createChildren() {
		super.createChildren();
		this.tableNumTxt.restrict = "0-9";
		this.clubDifenSet.setRoot(this);
		this.tableNumTxt.addEventListener(egret.Event.FOCUS_OUT, this.onFouceOut, this);
	}
	private maxTableNum = 10;
	private onFouceOut(e: egret.Event) {
		var nameInput = <eui.TextInput>e.target;
		if (!nameInput.text || nameInput.text == "") {
			nameInput.text = 0 + "";
		}
		if (Number(nameInput.text) > this.maxTableNum) {
			nameInput.text = this.maxTableNum.toString();
		}
	}
	public hide() {
		game.UIUtils.removeSelf(this);
		ClubTableManagePanel._instance = null;
	}
	public show() {

		this.sendRequest();
	}
	private async onTouchSaveBtn() {
		let hander = ServerPostPath.hall_clubHandler_c_setClubTableConfig;
		let msg = {
			clubId: ClubManager.instance.currentClub.clubId,
			gameId: ClubManager.instance.lastClubGameId,
			config: {
				initNum: Number(this.tableNumTxt.text),
				betBases: this.betBase,
			}
		}
		let resp: any = await game.PomeloManager.instance.request(hander, msg);
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			// LogUtils.logD("====牌桌设置===" + JSON.stringify(resp));
			let data = resp["tableSetting"]["games"]["" + ClubManager.instance.lastClubGameId];
			Toast.launch(TextUtils.instance.getCurrentTextById(61), 1);

			this.refreshUI(data);

		}
	}
	private async showClubTable() {
		let handler = ServerPostPath.hall_clubHandler_c_enterClubHall;
		let resp: any = await game.PomeloManager.instance.request(handler, { clubId: ClubManager.instance.currentClub.clubId });
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
			this.hide();
			ClubInnerHallScene.instance.hide();
			CF.sN(SceneNotify.OPEN_CLUB_HALL);
			return;
		}
		ClubManager.instance.setClubData(resp);

	}
	private async sendRequest() {
		let hander = ServerPostPath.hall_clubHandler_c_getClubTableConfig;
		let msg = {
			clubId: ClubManager.instance.currentClub.clubId,
			gameId: ClubManager.instance.lastClubGameId
		}
		let resp: any = await game.PomeloManager.instance.request(hander, msg);
		if (resp.error && resp.error.code != 0) {
			Toast.launch(resp.error.msg, 1);
		}
		else {
			LogUtils.logD("===牌桌管理===" + JSON.stringify(resp));
			this.refreshUI(resp);
			//添加UI
			GameLayerManager.gameLayer().panelLayer.addChild(this);

		}
	}
	private refreshUI(resp) {
		this.tableDiFenData = resp["betBases"];
		this.betBase = this.tableDiFenData;
		//设置初始底分
		this.initDiFen(this.tableDiFenData);
		//设置初始桌数
		this.tableNumTxt.text = resp["initNum"];
	}
}