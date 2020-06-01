/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 14:43:44 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-13 16:24:23
 * @Description: 比赛的排行榜数据
 */
class MatchRankPanel extends BaseScalePanel {
	private static _instance: MatchRankPanel;
	public static get instance(): MatchRankPanel {
		if (!MatchRankPanel._instance) {
			MatchRankPanel._instance = new MatchRankPanel();
		}
		return MatchRankPanel._instance;
	}

	private nameLabel: eui.Label;
	private myRankLabel: eui.Label;
	public constructor() {
		super();
		this.skinName = new MatchRankPanelSkin();
	}

	public clubInvite(e: egret.Event) {

	}
	
	public show() {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.showWorldInfo();
	}

	protected list: eui.List;
	/**
	 * 显示世界排行
	 */
	public async showWorldInfo() {
		let matchItemData = Global.gameProxy.matchItemData;
		this.nameLabel.text = matchItemData.title;

		let roomInfo = Global.gameProxy.roomInfo;
		let reqData = { id: roomInfo.activityId };
		let resp: any = await Global.pomelo.request(ServerPostPath.hall_userHandler_c_scoreRank, reqData);
		//返回扣牌成功
		if (resp.error && resp.error.code != 0) {
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);

		} else {
			// this.maxTouchShoupai = 3;
			this.myRankLabel.text = resp.myRank;
			CF.dP(ENo.RANK_FLUSH, resp.myRank);
			let datas = _.sortBy(resp.rankInfoArray, (data1) => {
				return data1['rank']
			});
			this.list.dataProvider = new eui.ArrayCollection(datas);
		}
		// 	let data = [];
		// for (let i = 1; i <= 100; i++) {
		// 	data.push({ score: 100 - i, rank: i, nickname: `test${i}`, avatar: Math.floor(_.random(1, 10)), sex: Math.floor(_.random(1, 2)) })
		// }
		// 
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		MatchRankPanel._instance = null;
	}

	public createChildren() {
		super.createChildren();
		this.list.dataProvider = null;
		this.list.itemRenderer = MatchRankListItem;
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.closeBtn:
				this.hide();
				break;
		}
	}
}