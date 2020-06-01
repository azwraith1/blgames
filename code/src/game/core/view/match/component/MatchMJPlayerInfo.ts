/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 18:42:33 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-16 20:08:28
 * @Description: 比赛场玩家
 */
class MatchMJPlayerInfo extends game.BaseUI {
	private nameLabel: eui.Label;
	private scoreLabel: eui.Label;
	private emojiGroup: eui.Group;
	protected headerImage: eui.Image;
	public constructor() {
		super();
		this.skinName = new MatchMJPlayerInfoSkin();
	}

	public createChildren() {
		super.createChildren();
		let roomInfo = Global.gameProxy.roomInfo;
		let emojiData = roomInfo.emoji;
		if (!emojiData) {
			emojiData = { 1: { "gold": 10 }, 2: { "gold": 10 }, 3: { "gold": 10 }, 4: { "gold": 10 } };
		}
		for (let i = 1; i <= 4; i++) {
			let emojiItem = new MatchMJEmojiItem();
			emojiItem.initData(i, emojiData[i].gold);
			this.emojiGroup.addChild(emojiItem);
		}
	}

	public initPlayerInfo(playerData) {
		this.nameLabel.text = playerData.nickname + `(${playerData.loginIp})`;
		this.scoreLabel.text = playerData.gold;
		let headerId = playerData['figureUrl'] || playerData.figure_url;
		let headerSex = playerData['sex'] || playerData.sex;
		this.headerImage.source = `hall_header_${headerSex}_${headerId}_png`;
	}
}