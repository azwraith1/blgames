/*
 * @Author: MC Lee 
 * @Date: 2019-06-10 10:27:36 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-19 10:23:11
 * @Description: 21点 炒作bar
 */
class BlackJackGameBar extends game.BaseUI {
	private button1: eui.Button;
	private button2: eui.Button;
	private button3: eui.Button;
	private button4: eui.Button;
	public constructor() {
		super();
	}

	public createChildren() {
		super.createChildren();
	}

	public onTouchTap(e: egret.TouchEvent) {
		switch (e.target) {
			case this.button1:
				this.buttonTouch(ACTIONS.ADD_CARD);
				break;
			case this.button2:
				this.buttonTouch(ACTIONS.SPLIT_CARD);
				break;
			case this.button3:
				this.visible = false;
				this.buttonTouch(ACTIONS.DOUBLE_BET);
				break;
			case this.button4:
				this.visible = false;
				this.buttonTouch(ACTIONS.STOP_CARD);
				break;
		}
	}
	//分牌
	/**
	 * 操作
	 */
	private buttonTouch(action) {
		let roomInfo = Global.roomProxy.roomInfo;
		let data: any = {}
		data.tableIndex = roomInfo.currentTableIndex;
		data.type = action;
		data.index = roomInfo.currentCardGroupIndex;
		this.root.gameBarTouch(data);
	}


	public resize2Last() {
		this.initActions(this.lastData);
	}

	private lastData;
	public lockAll() {
		let data = [0, 0, 0, 0];
		for (let i = 0; i < data.length; i++) {
			let button = this[`button${i + 1}`] as eui.Button;
			if (data[i] == 0) {
				button.touchEnabled = false;
				button.currentState = "disabled";
			} else {
				button.touchEnabled = true;
				button.currentState = "up";
			}
		}
	}

	public initActions(data) {
		this.lastData = data;
		for (let i = 0; i < data.length; i++) {
			let button = this[`button${i + 1}`] as eui.Button;
			if (data[i] == 0) {
				button.touchEnabled = false;
				button.currentState = "disabled";
			} else {
				button.touchEnabled = true;
				button.currentState = "up";
			}
		}
	}

	private root: BlackJackGameScene;
	public setRoot(root: BlackJackGameScene) {
		this.root = root;
	}
}

const ACTIONS = {
	ADD_CARD: 1,
	SPLIT_CARD: 2,
	DOUBLE_BET: 3,
	STOP_CARD: 4
}