/*
 * @Author: MC Lee 
 * @Date: 2019-12-02 17:02:30 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-02 17:28:36
 * @Description: 
 */
class MatchWaitingItem extends eui.Component {
	private rankLabel: eui.Label;
	private rankImage: eui.Image;
	private contentLabel: eui.Label;
	public constructor() {
		super();
		this.skinName = new MatchWaitItemSkin();
	}

	public createChildren() {
		super.createChildren();
	}

	public showData(rewardData, totalMoney) {
		let rankLevel = rewardData[0];
		if (rankLevel <= 3) {
			this.rankImage.visible = true;
			this.rankImage.source = RES.getRes(`m_wait_${rankLevel}_png`);
		} else {
			this.rankImage.visible = false;
		}
		let countNumber = rewardData[1] - rewardData[0] + 1;
		let gold = Math.floor(totalMoney * rewardData[2] / countNumber / 100);
		let countStr = countNumber == 1 ? `${rewardData[0]}` : `${rewardData[0]}-${rewardData[1]}`;
		this.contentLabel.text = gold + "元";
		this.rankLabel.text = `第${countStr}名:`;
	}
}