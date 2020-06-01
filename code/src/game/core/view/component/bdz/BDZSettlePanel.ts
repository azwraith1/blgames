class BDZSettlePanel extends eui.Component {
	private itemGroup: eui.Group;
	public constructor() {
		super();
		this.skinName = new BDZSettlePanelSkin();
	}

	public createChildren() {
		super.createChildren();
	}


	public showRoundLiushui(liushui) {
		let roomInfo = Global.roomProxy.roomInfo;
		let players = roomInfo.players;
		for (let key in liushui) {
			let item = liushui[key];
			let settleItem = new BDZSettleItem();
			let roundPattern = 16 - item.roundPattern;
			settleItem.showText(players[key].nickname, this.getPatternStr(roundPattern), item.gainGold, item.gainGold > 0, Global.roomProxy.checkIndexIsMe(key));
			this.itemGroup.addChild(settleItem);
		}
		egret.Tween.get(this).to({
			left: 0
		}, 400, egret.Ease.sineIn);
	}


	private getPatternStr(round) {
		switch (round) {
			case 1: return "골프";
			case 2: return "세컨드";
			case 3: return "써드";
			case 4: return "5탑";
			case 5: return "6탑";
			case 6: return "7탑";
			case 7: return "8탑";
			case 8: return "9탑";
			case 9: return "10탑";
			case 10: return "J탑";
			case 11: return "Q탑";
			case 12: return "K탑";
			case 13: return "베이스";
			case 14: return "투베이스";
			case 15: return "탑";
		}
	}

}