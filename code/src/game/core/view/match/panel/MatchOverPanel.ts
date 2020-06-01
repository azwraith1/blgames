/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 14:43:44 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-24 18:19:25
 * @Description: 比赛结束
 */
class MatchOverPanel extends game.BaseScene {
	private static _instance: MatchOverPanel;
	public static get instance(): MatchOverPanel {
		if (!MatchOverPanel._instance) {
			MatchOverPanel._instance = new MatchOverPanel();
		}
		return MatchOverPanel._instance;
	}
	protected data;
	protected isShowed: boolean = false;
	protected winLabel: eui.Label;
	public constructor() {
		super();
		this.skinName = new MatchOverPanelSkin();
	}

	public clubInvite(e: egret.Event) {

	}
	public show(data) {
		if (this.isShowed) {
			return;
		}
		this.isShowed = true;
		this.data = data;
		let roomInfo = Global.gameProxy.roomInfo;
		let reward = roomInfo.rewardDatas || {};
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		if (!reward || !reward.reward) {
			this.showLose();
		} else {
			this.showWin();
		}
		if (reward.rank) {
			this.rankLabel.text = reward.rank;
		} else {
			if (roomInfo.currentRank) {
				this.rankLabel.text = roomInfo.currentRank;
			} else {
				this.rankLabel.text = "?";
			}
			// this.failLabel.text = "您以淘汰，请等待其他桌结算排定名次.";
		}
		if (reward.reward) {
			LogUtils.logD("reward:" + reward.reward);
			this.winLabel.text = "x" + reward.reward + "y";
			this.failLabel.visible = true;
			if (roomInfo.lastRace) {
				this.failLabel.text = "奖励将在稍后发放到您的账户，请注意查收.";
			} else {
				this.failLabel.text = "奖励将在决赛后统一发放到您的账户，请注意查收.";
			}
		}
		this.rankLabel.alpha = 0;
		egret.Tween.get(this.rankLabel).to({
			alpha: 1
		}, 400);
	}

	private showLose() {
		let jinjiDb = GameCacheManager.instance.getCache("bsc_no2") as DBComponent;
		if (!jinjiDb) {
			jinjiDb = new DBComponent("bsc_no2", false);
			GameCacheManager.instance.setCache("bsc_no2", jinjiDb);
		}
		jinjiDb.y = 220;
		this.dbGroup.addChild(jinjiDb);
		jinjiDb.playNamesAndLoop(['bsc_no2', `bsc_no2_loop`]);
		this.failLabel.visible = true;
		this.winGroup.visible = false;
		SoundManager.getInstance().playEffect("m_game_lose_mp3");
	}


	private showWin() {
		let jinjiDb = GameCacheManager.instance.getCache("bsc_no1") as DBComponent;
		if (!jinjiDb) {
			jinjiDb = new DBComponent("bsc_no1", false);
			GameCacheManager.instance.setCache("bsc_no1", jinjiDb);
		}
		jinjiDb.y = 220;
		this.dbGroup.addChild(jinjiDb);
		jinjiDb.playNamesAndLoop(['bsc_no1', `bsc_no1_loop`]);
		this.failLabel.visible = false;
		this.winGroup.visible = true;
		SoundManager.getInstance().playEffect("m_game_win_mp3");
	}

	public hide() {
		game.UIUtils.removeSelf(this);
		MatchOverPanel._instance = null;
	}

	private dbGroup: eui.Group;
	private rankLabel: eui.BitmapLabel;
	private winGroup: eui.Group;
	private failLabel: eui.Label;
	private enterBtn: eui.Button;

	public createChildren() {
		super.createChildren();
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.enterBtn:
				this.enterBtnTouch();
				break;
		}
	}

	private enterBtnTouch() {
		let matchRType = game.Utils.getURLQueryString("race_rtype") || "1";
		//返回之前的选厂游戏大厅
		if (matchRType == "2" && this.data.lastGameCode) {
			// ServerConfig.gid = this.data/
			HallForwardFac.redirectHall(() => {
				this.hide();
			}, this.data.lastGameCode);
			return;
		}
		this.hide();
		CF.sN(SceneNotify.OPEN_MATCH_HALL);
	}

}