/*
 * @Author: MC Lee 
 * @Date: 2019-07-04 17:00:58 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-27 15:27:20
 * @Description: 结束面板item
 */
class GDMJOverItemMine extends eui.Component {
	private headerImage: eui.Image;
	private typeImage: eui.Image;
	private nameLabel: eui.Label;
	private scoreLabel: eui.BitmapLabel;
	private scorller: eui.Scroller;
	private mainGroup: eui.Group;
	private isWin: boolean = false;
	private panelImage: eui.Image;
	public weiZhi: eui.Image;
	public constructor() {
		super();
		this.skinName = `GDMJOverItemMineSkin`;
	}

	public createChildren() {
		super.createChildren();
	}
	/**赢了的时候设置名字的颜色 */
	private setNameColor() {
		this.nameLabel.size = 24;
		this.nameLabel.textColor = 0xffedac;
		// this.nameLabel.stroke = 1;
		// this.nameLabel.strokeColor = 0x81280d;
	}
	public change2Win() {
		this.isWin = true;
		this.panelImage.source = RES.getRes(`gdmj_over_panel_1new_png`);
		this.setNameColor();
		//this.nameLabel.textColor = 0X64240A;
	}

	public showPlayerDatas(playerData) {
		this.nameLabel.text = playerData.nickname;
		this.headerImage.source = `hall_header_${playerData.sex}_${playerData.figureUrl}_png`;
	}


	public showDefeat(isDefeat) {
		if (isDefeat) {
			this.typeImage.visible = true;
			this.typeImage.source = RES.getRes(`gdmj_point_11_png`);
		}
	}


	public showWinFlag(flag, isWin, score, winIdex, mineIndex) {
		let getDirStr = majiang.MajiangUtils.getDirStr(winIdex, mineIndex);
		if (flag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
			//自摸
			if (isWin) {
				this.typeImage.visible = true;
				this.typeImage.source = RES.getRes(`gdmj_point_2_png`);
				// let item = new GDMJOverItemRenderer();
				// item.showText("自摸", `${Math.abs(score)}`, getDirStr, this.isWin);
				// this.mainGroup.addChild(item);
			} else {
				// let item = new GDMJOverItemRenderer();
				// item.showText("被自摸", `${score}倍`, getDirStr, this.isWin);
				// this.mainGroup.addChild(item);
			}
		} else if (flag & MAJIANG_WIN_FLAG.DISCARD) {
			if (isWin) {
				this.typeImage.visible = true;
				this.typeImage.source = RES.getRes(`gdmj_point_3_png`);
			} else {
				this.typeImage.visible = true;
				this.typeImage.source = RES.getRes(`gdmj_point_1_png`);
				// let item = new GDMJOverItemRenderer();
				// item.showText("点炮", `${score}倍`, getDirStr, this.isWin);
				// this.mainGroup.addChild(item);
			}
		} else if (flag & MAJIANG_WIN_FLAG.ABOUT_KONG) {
			this.typeImage.source = RES.getRes(`gdmj_point_4_png`);
		}
	}
	public setWeiZhiLable(direction: string) {
		var _resouce: string;
		switch (direction) {
			//本家
			case "1":
				this.weiZhi.source = RES.getRes("gdmj_weizhi1_png");
				break;
			//下家
			case "2":
				this.weiZhi.source = RES.getRes("gdmj_weizhi2_png");
				break;
			//对家
			case "3":
				this.weiZhi.source = RES.getRes("gdmj_weizhi3_png");
				break;
			//上家
			case "4":
				this.weiZhi.source = RES.getRes("gdmj_weizhi4_png");
				break;
			default:
				break;
		}
	}
	public showScore(score) {
		this.scoreLabel.text = "";
		if (score <= 0) {
			this.scoreLabel.font = "gdmj_lose_text_fnt"
		}
		this.scoreLabel.text = score > 0 ? "+" + score : score;
	}

	/**
	 * @param  {} winInfo
	 */
	public showWinInfo(winInfo) {
		this.scoreLabel.text = "";
		if (winInfo.gainGold <= 0) {
			this.scoreLabel.font = "gdmj_lose_text_fnt"
		}
		this.scoreLabel.text = winInfo.gainGold > 0 ? "+" + winInfo.gainGold : winInfo.gainGold;
	}

	/**
	 * 展示吗
	 * @param  {} maInfo
	 * @param  {} directions
	 * @param  {} mineIndex
	 */
	public showMaInfo(maInfo, mineIndex) {
		let mineMaInfo = maInfo[mineIndex][0];
		let item = new GDMJOverItemRenderer();
		let dir = majiang.MajiangUtils.getDirStr(mineMaInfo.maIndex, mineIndex)
		let score = this.getGoldStr(mineMaInfo.gainGold);
		item.showText(`${dir}买马(${majiang.MajiangUtils.getMJChinese(mineMaInfo.maCard)})`, score, null, this.isWin);
	}

	/**
	 * 湖北麻将
	 * @param  {} bills
	 * @param  {} playerIndex
	 * @param  {} settleData
	 */
	public showPlayerBillsByHBMJ(bills, playerIndex, settleData) {
		if (!bills) {
			return;
		}
		for (let i = 0; i < bills.length; i++) {
			let bill = bills[i];
			let info = bill.info;
			let type = bill.type;
			let str1;
			let str2;
			let str3;
			if (type == 2) {
				let winFlag = settleData.winFlag;
				if (winFlag & MAJIANG_WIN_FLAG.DISCARD) {
					if (info.gainGold < 0) {
						str1 = "点炮"
					} else {
						str1 = "接炮"
					}
				} else if (winFlag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
					if (info.gainGold < 0) {
						str1 = "被自摸"
					} else {
						str1 = "自摸"
					}
				} else if (winFlag & MAJIANG_WIN_FLAG.ABOUT_KONG) {
					str1 = "抢杠"
					if (info.gainGold < 0) {
						str1 = "被抢杠"
					}
				}
				str2 = this.getGoldStr(info.gainGold);
			} else if (type == 13) {
				let str = info.winner || info.from;
				str1 = majiang.MajiangUtils.getDirStrByHBMJ(str, playerIndex) + this.getBillsStr(type, info);
				let card = majiang.MajiangUtils.getMJChinese(info.card);
				str1 += `(${card})`
				str2 = this.getGoldStr(info.gainGold);
			} else if (type == 3) {
				let str = info.winner || info.from;
				if (info.gainGold < 0) {
					str1 = "被查叫";
				} else {
					str1 = "查叫";
				}
				str2 = `${majiang.MajiangUtils.getDirStrByHBMJ(str, playerIndex)}`;
				str3 = this.getGoldStr(info.gainGold);
			} else {
				let str = info.winner || info.from;
				str1 = this.getBillsStr(type, info);
				str2 = majiang.MajiangUtils.getDirStrByHBMJ(str, playerIndex);
				str3 = this.getGoldStr(info.gainGold);
			}
			let item = new GDMJOverItemRenderer();
			item.showText(str1, str2, str3, this.isWin,type);
			this.mainGroup.addChild(item);
		}
	}
	/**
	 * 展示流水数据
	 */
	public showPlayerBillsByHNMJ(bills, playerIndex, settleData) {
		for (let i = 0; i < bills.length; i++) {
			let bill = bills[i];
			let info = bill.info;
			let type = bill.type;
			let str1;
			let str2;
			let str3;
			if (type == 2) {
				let winFlag = settleData.winFlag;
				if (winFlag & MAJIANG_WIN_FLAG.DISCARD) {
					if (info.gainGold < 0) {
						str1 = "被抢杠"
					} else {
						str1 = "抢杠胡"
					}
				} else if (winFlag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
					if (info.gainGold < 0) {
						str1 = "被自摸"
					} else {
						str1 = "自摸"
					}
				} else if (winFlag & MAJIANG_WIN_FLAG.ABOUT_KONG) {
					str1 = "抢杠"
					if (info.gainGold < 0) {
						str1 = "被抢杠"
					}
				}
				str2 = this.getGoldStr(info.gainGold);
			} else if (type == 13) {
				let str = info.winner || info.from;
				str1 = majiang.MajiangUtils.getDirStr(str, playerIndex) + this.getBillsStr(type, info);
				let card = majiang.MajiangUtils.getMJChinese(info.card);
				str1 += `(${card})`

				str2 = this.getGoldStr(info.gainGold);
			} else {
				let str = info.winner || info.from;
				str1 = this.getBillsStr(type, info);
				str2 = majiang.MajiangUtils.getDirStr(str, playerIndex);
				str3 = this.getGoldStr(info.gainGold);
			}
			let item = new GDMJOverItemRenderer();
			item.showText(str1, str2, str3, this.isWin,type);
			this.mainGroup.addChild(item);
		}
	}

	/**
	 * 展示流水数据
	 */
	public showPlayerBills(bills, playerIndex, settleData) {
		for (let i = 0; i < bills.length; i++) {
			let bill = bills[i];
			let info = bill.info;
			let type = bill.type;
			let str1;
			let str2;
			let str3;
			if (type == 2) {
				let winFlag = settleData.winFlag;
				if (winFlag & MAJIANG_WIN_FLAG.DISCARD) {
					if (info.gainGold < 0) {
						str1 = "点炮"
					} else {
						str1 = "吃胡"
					}

				} else if (winFlag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
					if (info.gainGold < 0) {
						str1 = "被自摸"
					} else {
						str1 = "自摸"
					}
				} else if (winFlag & MAJIANG_WIN_FLAG.ABOUT_KONG) {
					str1 = "抢杠"
				}
				str2 = this.getGoldStr(info.gainGold);
			} else if (type == 13) {
				let str = info.winner || info.from;
				str1 = majiang.MajiangUtils.getDirStr(str, playerIndex) + this.getBillsStr(type, info);
				let card = majiang.MajiangUtils.getMJChinese(info.card);
				str1 += `(${card})`

				str2 = this.getGoldStr(info.gainGold);
			} else {
				str1 = this.getBillsStr(type, info);
				let str = info.winner || info.from;
				str2 = majiang.MajiangUtils.getDirStr(str, playerIndex);
				str3 = this.getGoldStr(info.gainGold);
			}
			let item = new GDMJOverItemRenderer();
			item.showText(str1, str2, str3, this.isWin,type);
			this.mainGroup.addChild(item);
		}
	}


	public getGoldStr(gainGold) {
		return gainGold > 0 ? "+" + gainGold : gainGold;
	}

	public getBillsStr(type, bill) {
		let gainGold = bill.gainGold;
		switch (type) {
			case 1:
				let gangType = bill.gangType;
				if (gangType == 2 || gangType == 4) {
					if (gainGold > 0) {
						return "暗杠"
					} else {
						return "被暗杠"
					}
				} else {
					if (gainGold > 0) {
						return "杠"
					} else {
						return "被杠"
					}
				}
			case 13:
				return "买马";
			case 15:
				return "抓鸟";
			case 17:
				return "以小博大";
		}
	}
}