/*
 * @Author: MC Lee 
 * @Date: 2019-12-17 10:43:29 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-08 15:05:22
 * @Description: 比赛场条条
 */
class MatchHallListRender extends game.BaseItemRender {
	private titleLabel: eui.Label;
	private currentLabel: eui.Label;
	private group1: eui.Group;
	private group2: eui.Group;

	private fenLabel: eui.Label;
	private miaoLabel: eui.Label;

	private diImage: eui.Image;
	private touzhuLabel: eui.Label;

	private minCountLabel: eui.Label;
	private startLabel: eui.Label;

	private touchRect: eui.Rect;

	private totalBet: number[];
	//0 没有报名, 1等待进入, 2可以进入
	private status: number;
	public itemData;

	protected touchRect1: eui.Rect;
	protected joinTimeLabel: eui.Label;

	private typeLabel: eui.Label;
	private type2Label: eui.Label;
	private joinType: number;
	public constructor() {
		super();
		this.skinName = new MatchHallItemListSkin();
	}

	public createChildren() {
		super.createChildren();
	}

	protected dataChanged() {
		this.itemData = this.data;
		//投注额
		this.totalBet = this.itemData.totalBet;
		this.titleLabel.text = this.itemData.title;
		this.currentLabel.text = this.itemData.currentNum;
		let state = this.itemData.state;
		let joinTypeAndGold = this.itemData.joinTypeAndGold;
		if (joinTypeAndGold[0] == 1) {
			this.typeLabel.text = "满足投注额可免费报名";
			this.type2Label.text = "查看比赛详情";
			this.joinType = 1;
		} else {
			this.joinType = 2;
			this.typeLabel.text = "查看比赛详情";
			this.type2Label.text = "总奖金：" + this.itemData.contest_allreward;
		}
		this.flushState();
		this.showBisaiTime();
	}

	public flushReward() {
		this.type2Label.text = "总奖金：" + this.itemData.contest_allreward;
	}

	/**
	 * 刷新
	 */
	public flushState() {
		if (this.itemData.lock == 1) {
			this.showLock();
			return;
		}
		let joinTypeAndGold = this.itemData.joinTypeAndGold;
		let joinType = joinTypeAndGold[0];
		if (joinType == 1) {
			//免费赛
			this.showState();
		} else {
			//报名赛
			this.showBaoMingState();
		}

	}


	private showBaoMingState() {
		let state = this.itemData.state;
		this.minCountLabel.text = `不少于${this.itemData.cutoffNum}人`;
		if (state == 0) {
			//没有报名
			if (this.clickDb) {
				this.clickDb.visible = false;
			}
			this.group2.visible = false;
			this.group1.visible = true;
			this.diImage.source = RES.getRes("match_hall_bar5_png");
			let joinTypeAndGold = this.itemData.joinTypeAndGold;
			let joinType = joinTypeAndGold[0];
			let gold = joinTypeAndGold[1];
			this.touzhuLabel.text = `${gold}`;
			this.status = 0;
		} else if (state == 1) {
			let joinTypeAndGold = this.itemData.joinTypeAndGold;
			let joinType = joinTypeAndGold[0];
			let gold = joinTypeAndGold[1];
			if (joinType == 2) {
				this.touzhuLabel.textColor = 0X51FF48;
				this.touzhuLabel.text = "已报名"
			}
			//报名了
			this.showBaoMingStatus();
		}
		this.joinTimeLabel.text = "";
	}

	public showLock() {
		this.group2.visible = false;
		this.group1.visible = true;
		let joinTypeAndGold = this.itemData.joinTypeAndGold;
		let joinType = joinTypeAndGold[0];
		if (joinType == 1) {
			this.diImage.source = RES.getRes("match_hall_bar4_png");
		} else {
			this.diImage.source = RES.getRes("match_hall_bar8_png");
		}
		this.status = 5;
		this.touzhuLabel.textColor = 0X51FF48;
		let startRaceTime = this.itemData.startRaceTime;
		this.touzhuLabel.text = "";
		this.minCountLabel.text = `不少于${this.itemData.cutoffNum}人`;
		this.joinTimeLabel.text = game.Utils.dateFormatMS("MM.dd", +startRaceTime) + "号开放";
	}

	private getMianFeiType(type) {
		switch (type) {
			case 1:
				return "本日投注额:"
			case 2:
				return "本周投注额:"
			case 3:
				return "本月投注额:"
		}

	}

	/**
	 * 展示参赛按钮和投注额状态，当日投注额≥配置额，显示为绿色。反之为红色。未
	   满足投注额，点击后提示：投注额不足，无法参赛。
	 */
	private showState() {
		let state = this.itemData.state;
		this.minCountLabel.text = `不少于${this.itemData.cutoffNum}人`;
		let joinTypeAndGold = this.itemData.joinTypeAndGold;
		let joinType = joinTypeAndGold[0];
		let gold = joinTypeAndGold[1];
		let type = joinTypeAndGold[2];
		if (state == 0) {
			//没有报名
			if (this.clickDb) {
				this.clickDb.visible = false;
			}
			this.group2.visible = false;
			this.group1.visible = true;
			this.diImage.source = RES.getRes("match_hall_bar1_png");
			let needGold = Math.floor(this.totalBet[type - 1]);
			if (joinType == 1) {
				//投注额
				if (needGold >= gold) {
					this.touzhuLabel.textColor = 0X51FF48;
					this.touzhuLabel.text = this.getMianFeiType(type) + "已达标";
				} else {
					this.touzhuLabel.text = this.getMianFeiType(type) + `${needGold}/${gold}`;
					this.touzhuLabel.textColor = 0XFFF10B;
				}
			}
			this.status = 0;
		} else if (state == 1) {
			if (joinType == 1) {
				this.touzhuLabel.textColor = 0X51FF48;
				this.touzhuLabel.text = this.getMianFeiType(type) + "已达标"
			}
			//报名了
			this.showBaoMingStatus();
		}
		this.joinTimeLabel.text = "";
	}

	private clickDb: DBComponent
	private checkJoinDb() {
		if (!this.clickDb) {
			this.clickDb = new DBComponent("bsc_click", false);
			this[`group3`].addChild(this.clickDb);
			this.clickDb.playByFilename(-1);
			this.clickDb.x = this.diImage.width / 2;
			this.clickDb.y = this.diImage.height / 2;
		}
		this.clickDb.visible = true;
	}

	public showBaoMingStatus() {
		let startRaceTime = this.itemData.startRaceTime;
		let cha = startRaceTime - game.DateTimeManager.instance.now;
		if (cha >= Const.LAST_TIME_RACE) {
			//还早
			this.status = 1;
			this.diImage.source = RES.getRes("match_hall_bar2_png");
			this.group2.visible = false;
			this.group1.visible = true;
			if (this.clickDb) {
				this.clickDb.visible = false;
			}
		} else {
			//可以进入
			this.status = 2;
			this.diImage.source = RES.getRes("match_hall_bar3_png");
			this.group1.visible = false;
			this.group2.visible = true;
			if (cha > 0) {
				let timeArr = NumberFormat.getTimeDaojishi(cha);
				this.fenLabel.text = timeArr[0] + "";
				this.miaoLabel.text = timeArr[1] + "";
			} else {
				this.fenLabel.text = "00";
				this.miaoLabel.text = "00";
			}
			this.checkJoinDb();
		}
	}

	public checkOutTime() {
		let startRaceTime = this.itemData.startRaceTime;
		let now = game.DateTimeManager.instance.now;
		return now >= startRaceTime;
	}

	private showBisaiTime() {
		let startRaceTime = this.itemData.startRaceTime;
		// let raceType = startRaceTime[0];
		// if (raceType == 1) {
		// 	//每天
		// 	this.startLabel.text = startRaceTime[1] + ":00";
		// }
		this.startLabel.text = game.Utils.dateFormatMS("MM-dd hh:mm", +startRaceTime);
	}

	private showJoinType(joinTypeAndGold) {
		let joinType = joinTypeAndGold[0];
		let gold = joinTypeAndGold[1];
	}


	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.touchRect:
				this.touchRectTouch();
				break;
			case this.touchRect1:
				if (this.joinType == 1) {
					this.mianfeiBaoming();
				} else {
					this.useBaomingfei();
				}
				// MatchInfoPanel.instance.show(this);
				break;
		}
	}

	private mianfeiBaoming() {
		if (this.status == 1) {
			Global.alertMediator.addAlert("开赛前5分钟才能进入比赛，请耐心等待", null, null, true);
			return;
		}
		if (this.status == 2) {
			CF.dP(ENo.ENTER_MATCH, this.itemData);
			return;
		}
		if (this.status == 5) {
			let startRaceTime = this.itemData.startRaceTime;
			let kaifangTime = game.Utils.dateFormatMS("MM-dd", +startRaceTime);
			Global.alertMediator.addAlert(`该场次将在${kaifangTime}号开放报名,请耐心等待`, null, null, true);
			return;
		}
		this.baoming();
	}

	/**
	 * 使用报名费
	 */
	private useBaomingfei() {
		let joinTypeAndGold = this.itemData.joinTypeAndGold;
		let joinType = joinTypeAndGold[0];
		let gold = joinTypeAndGold[1];
		Global.alertMediator.addAlert(`需要花费${gold}金币报名`, () => {
			this.baoming();
		}, null, true);
	}

	private async baoming() {
		let path = ServerPostPath.hall_userHandler_c_joinRace;
		let resp: any = await Global.pomelo.request(path, { id: this.itemData.activityId });
		if (resp.error && resp.error.code != 0) {
			if (resp.error.code == -306) {
				Global.alertMediator.addAlert("投注额不足，无法参赛(参与金币对局可增加投注额)", null, null, true);
				return;
			}
			Global.alertMediator.addAlert(resp.error.msg, null, null, true);
			return;
		}
		if (resp.ownGold != undefined) {
			Global.playerProxy.playerData.gold = resp.ownGold;
			CF.dP(ServerNotify.s_payGold, { ownGold: resp.ownGold });
		}
		this.joinType = 1;
		if (this.joinType == 1) {
			Global.alertMediator.addAlert("报名成功,须开赛前5分钟进入,超时视为放弃比赛.", null, null, true);
			this.itemData.state = resp.state;
			this.flushState();
		} else {
			//todu直接进入比赛等待
		}
	}

	private touchRectTouch() {
		let joinTypeAndGold = this.itemData.joinTypeAndGold[0];
		let joinType = joinTypeAndGold[0];
		let gold = joinTypeAndGold[1];
		// if (this.totalBet < gold) {
		// 	Global.alertMediator.addAlert("投注额不足，无法参赛.", null, null, true);
		// 	return;
		// }
		// //可以进入游戏
		MatchInfoPanel.instance.show(this);
	}
}