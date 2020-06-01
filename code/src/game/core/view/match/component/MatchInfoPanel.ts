/*
 * @Author: MC Lee 
 * @Date: 2019-11-25 18:09:21 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-08 15:05:08
 * @Description: 
 */
class MatchInfoPanel extends BaseScalePanel {
	private static _instance: MatchInfoPanel;
	public static get instance(): MatchInfoPanel {
		if (!MatchInfoPanel._instance) {
			MatchInfoPanel._instance = new MatchInfoPanel();
		}
		return MatchInfoPanel._instance;
	}
	private tab1: eui.Button;
	private tab2: eui.Button;
	private tab3: eui.Button;

	//group1
	private group1: eui.Group;
	private label1: eui.Label;
	private label2: eui.Label;
	private label3: eui.Label;
	private label4: eui.Label;
	//group2
	private group2: eui.Group;
	private reward2: eui.BitmapLabel;
	private reward1: eui.BitmapLabel;
	private reward3: eui.BitmapLabel;

	private countLabel2: eui.BitmapLabel;
	private countLabel1: eui.BitmapLabel;
	private countLabel3: eui.BitmapLabel;

	private otherGroup: eui.Group;
	//group3
	private group3: eui.Group;
	private scroller: eui.Scroller;
	private contentImage: eui.Image;

	private enterImage: eui.Image;
	private enterBtn: eui.Button;

	private item: MatchHallListRender;
	private itemData;
	public constructor() {
		super();
		this.skinName = new MatchInfoSkin();
	}

	public createChildren() {
		super.createChildren();
	}

	public show(item: MatchHallListRender) {
		this.showGroup(1);
		this.item = item;
		this.itemData = item.itemData;
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.showGroup1Data();
		this.showGroup2Data();
		this.showGroup3Data();
		if (this.itemData.state == 1) {
			this.enterImage.visible = true;
			this.enterBtn.visible = false;
		}
		if (this.itemData.lock == 1) {
			this.enterBtn.visible = false;
			this.enterImage.visible = false;
		}
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.closeBtn:
				this.closeBtnTouch();
				break;
			case this.tab1:
				this.showGroup(1);
				break;
			case this.tab2:
				this.showGroup(2);
				break;
			case this.tab3:
				this.showGroup(3);
				break;
			case this.enterBtn:
				this.enterBtnTouch();
				break;
		}
	}

	private showGroup(number) {
		for (let i = 1; i <= 3; i++) {
			let group = this[`group${i}`];
			group.visible = number == i;
			let button = this[`tab${i}`] as eui.Button;
			button.currentState = number == i ? "disabled" : "up";
			button.touchEnabled = !(number == i);
		}
	}


	private showGroup1Data() {
		this.label1.text = this.itemData.title;
		this.label2.text = game.Utils.dateFormatMS("MM-dd hh:mm", this.itemData.startRaceTime);
		let joinType = this.itemData.joinTypeAndGold[0];
		let gold = this.itemData.joinTypeAndGold[1];
		if (joinType == 1) {
			this.label3.text = `金币场投注额>=${gold}即可免费参赛`;
		} else {
			this.label3.text = `需使用${gold}购买参赛资格`;
		}
		this.label4.text = `不少于${this.itemData.cutoffNum}人`;
	}


	private showGroup2Data() {
		let totalMoney = this.itemData.contest_allreward;
		let rewards = this.itemData.contest_rankreward;
		let first = rewards[0], second = rewards[1], third = rewards[2];

		let count1 = first[1] - first[0] + 1;
		this.reward1.text = Math.floor(totalMoney * first[2] / count1 / 100) + "y";;
		this.countLabel1.text = count1 == 1 ? `${first[0]}` : `${first[0]}-${first[1]}`;

		if (second) {
			let count2 = second[1] - second[0] + 1;
			this.reward2.text = Math.floor(totalMoney * second[2] / count2 / 100) + "y"
			this.countLabel2.text = count2 == 1 ? `${second[0]}` : `${second[0]}-${second[1]}`;
		}

		if (third) {
			let count3 = third[1] - third[0] + 1;
			this.reward3.text = Math.floor(totalMoney * third[2] / count3 / 100) + "y";
			this.countLabel3.text = count3 == 1 ? `${third[0]}` : `${third[0]}-${third[1]}`;
		}

		for (let i = 3; i < rewards.length; i++) {
			let rewardData = rewards[i];
			let countNumber = rewardData[1] - rewardData[0] + 1;
			let gold = Math.floor(totalMoney * rewardData[2] / countNumber / 100);
			let label = new eui.Label();
			label.textColor = 0X935e3d;
			label.size = 26;
			let countStr = countNumber == 1 ? `${rewardData[0]}` : `${rewardData[0]}-${rewardData[1]}`;
			label.text = `第${countStr}名:${gold}元`
			this.otherGroup.addChild(label);
		}
		// let count = 1;
		// this.rankLabel1.text = `第${count}名:${first[2]}元`;
		// count += first[1];
		// this.rankLabel2.text = `第${count}-${count + second[1]}名:${second[2]}元`;
		// count += second[1];
		// this.rankLabel3.text = `第${count}-${count + third[1]}名:${third[2]}元`;
	}

	private showGroup3Data() {

	}

	protected closeBtnTouch() {
		if (MatchInfoPanel._instance) {
			egret.Tween.removeTweens(this.scaleGroup);
			game.UIUtils.removeSelf(this)
			MatchInfoPanel._instance = null;
		}
	}

	/**
	 * 报名按钮
	 */
	protected async enterBtnTouch() {
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
		Global.alertMediator.addAlert("报名成功,须开赛前5分钟进入,超时视为放弃比赛.", null, null, true);
		this.itemData.state = resp.state;
		this.enterBtn.visible = false;
		this.enterImage.visible = true;
		this.item.flushState();
	}
}