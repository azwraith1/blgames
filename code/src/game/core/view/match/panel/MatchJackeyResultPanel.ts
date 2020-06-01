/*
 * @Author: MC Lee 
 * @Date: 2020-03-02 11:22:14 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-03 14:20:50
 * @Description: 奖金池玩法
 */
class MatchJackeyResultPanel extends game.BaseScene {
	private static _instance: MatchJackeyResultPanel;
	public static get instance(): MatchJackeyResultPanel {
		if (!MatchJackeyResultPanel._instance) {
			MatchJackeyResultPanel._instance = new MatchJackeyResultPanel();
		}
		return MatchJackeyResultPanel._instance;
	}

	private winLabel: eui.BitmapLabel;
	private winGroup: eui.Group;
	private dbGroup: eui.Group;
	private buttonGroup: eui.Group;
	private closeCallback: Function
	public constructor() {
		super();
		this.skinName = new MatchJackeyResultPanelSkin();
	}

	public clubInvite(e: egret.Event) {

	}
	public s_pushRaceInvite() {

	}

	public createChildren() {
		super.createChildren();
	}

	public onAdded(){
		super.onAdded();
		CF.aE(ENo.CLOSE_ALL, this.hide, this);
	}

	public onRemoved(){
		super.onRemoved();
		CF.rE(ENo.CLOSE_ALL, this.hide, this);
	}

	public checkGoldBySHow(winGold: number, closeCallback: Function) {
		this.closeCallback = closeCallback;
		let dbName;
		if (winGold > 0) {
			dbName = "jjc_win";
		} else {
			dbName = "jjc_lose";
		}
		let db = new DBComponent(dbName, false);
		this.dbGroup.addChild(db);
		db.playNamesAndLoop([dbName, dbName + "_loop"]);
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		egret.setTimeout(() => {
			if (winGold > 0) {
				this.winGroup.visible = true;
				this.winLabel.text = winGold + "";
			}
			this.buttonGroup.visible = true;
		}, this, 500);
	}

	public hide() {
		if (MatchJackeyResultPanel._instance) {
			game.UIUtils.removeSelf(this);
			MatchJackeyResultPanel._instance = null;
		}
	}

	private restartBtn: eui.Button;
	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.backBtn:
				this.backBtnTouch();
				break;
			case this.restartBtn:
				this.restartBtnTouch();
				break;
		}
	}

	private backBtnTouch() {
		MatchManager.instance.clearSelect();
		this.closeCallback && this.closeCallback();
		game.AppFacade.instance.sendNotification(SceneNotify.OPEN_MATCH_HALL);
		this.hide();
	}

	private lockReq: boolean = false;
	public async restartBtnTouch() {
		let route = ServerPostPath.hall_luckyHandler_c_joinLuckyGame;
		let data = {
			gameId: MatchManager.instance.selectGameId,
			entryFeeGold: MatchManager.instance.selectGameGold,
			sceneIndex: MatchManager.instance.selectIndex
		}
		let resp: any = await Global.pomelo.request(route, data);
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
			this.backBtnTouch();
			return;
		} else {
			MatchManager.instance.tablePlayers = resp;
			MatchManager.instance.matchConfig = data;
			MatchManager.instance.redirectScene(() => {
				this.closeCallback && this.closeCallback();
				this.hide();
			});
		}
	}
}