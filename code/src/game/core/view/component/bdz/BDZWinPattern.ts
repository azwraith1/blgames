/*
 * @Author: MC Lee 
 * @Date: 2020-03-16 16:24:47 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-19 18:07:57
 * @Description: 胜率 
 */
class BDZWinPattern extends eui.Component {
	private group1: eui.Group;
	private pBg1: eui.Image;
	private pName1: eui.Label
	private pPer1: eui.Label;
	public constructor() {
		super();
	}

	public createChildren() {
		super.createChildren();
	}

	public showPattern() {
		let mineInfo = Global.roomProxy.getMineGameData();
		let pattern = mineInfo.patternWinRateInfo;
		let mineRoundPattern = 16 - mineInfo.roundPattern;
		let rounPattenrArr = [];
		if (mineRoundPattern <= 3) {
			rounPattenrArr = [1, 2, 3, 4, 5];
		} else if (mineRoundPattern >= 13) {
			rounPattenrArr = [11, 12, 13, 14, 15];
		} else {
			rounPattenrArr = [mineRoundPattern - 2, mineRoundPattern - 1, mineRoundPattern, mineRoundPattern + 1, mineRoundPattern + 2];
		}
		this.visible = true;
		for (let i = 1; i <= 5; i++) {
			let round = rounPattenrArr[i - 1];
			let isCur = round == mineRoundPattern;
			this[`pBg${i}`].visible = isCur;
			this[`pName${i}`].text = this.getPatternStr(round);
			this[`pPer${i}`].text = pattern[16 - round] == 0 ? "-" : Math.floor(pattern[16 - round] * 100) + "%";
			this[`pPer${i}`].textColor = isCur ? 0X2bbe0a : 0Xbcbdbc;
			this[`pName${i}`].textColor = isCur ? 0X2bbe0a : 0X96adca
		}
	}

	private getPatternStr(round) {
		switch (round) {
			case 1: return "1.골프";
			case 2: return "2.세컨드";
			case 3: return "3.써드";
			case 4: return "4.5탑";
			case 5: return "5.6탑";
			case 6: return "6.7탑";
			case 7: return "7.8탑";
			case 8: return "8.9탑";
			case 9: return "9.10탑";
			case 10: return "10.J탑";
			case 11: return "11.Q탑";
			case 12: return "12.K탑";
			case 13: return "13.베이스";
			case 14: return "14.투베이스";
			case 15: return "15.탑";
		}
	}

}