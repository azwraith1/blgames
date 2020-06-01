class GYZJOverItem extends eui.Component {
	private headerImage: eui.Image;
	//private mineTip: eui.Image;
	private typeImage: eui.Image;
	private nameLabel: eui.Label;
	private scoreLabel: eui.BitmapLabel;
	private scorller: eui.Scroller;
	private mainGroup: eui.Group;
	private isWin: boolean = false;
	private panelImage: eui.Image;
	public weiZhi: eui.Image;
	public beishu: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/component/gyzj/GYZJOverItemSkin.exml";
	}

	public createChildren() {
		super.createChildren();
		//this.mineTip.visible = false;
	}
	/**设置倍数的值*/
	public setBeiShu(win: number) {
		var _txt: string;
		if (win > 0) {
			this.change2Win();
			_txt = "赢"
		}
		if (win < 0) {
			this.panelImage.source = RES.getRes("gyzj_over_biggreen_png");
			_txt = "输";
			this.beishu.textColor = 0Xaaf8ff;
		}
		else if (win == 0) {
			this.panelImage.source = RES.getRes("gyzj_over_biggreen_png");
			this.beishu.textColor = 0Xaaf8ff;
			_txt = "";
		}
		this.beishu.text = _txt + Math.abs(win) + "倍";
	}
	public setWeiZhiLable(direction: string) {
		var _resouce: string;
		switch (direction) {
			case "1":
				this.weiZhi.source = RES.getRes("gyzj_weizhi1_png");
				break;
			case "2":
				this.weiZhi.source = RES.getRes("gyzj_weizhi2_png");
				break;
			case "3":
				this.weiZhi.source = RES.getRes("gyzj_weizhi3_png");
				break;
			case "4":
				this.weiZhi.source = RES.getRes("gyzj_weizhi4_png");
				break;
			default:
				break;
		}
	}
	public change2Win() {
		this.isWin = true;
	}

	public showPlayerDatas(playerData) {
		this.nameLabel.text = playerData.nickname;
		this.headerImage.source = `hall_header_${playerData.sex}_${playerData.figureUrl}_png`;
	}


	public showDefeat(isDefeat) {
		if (isDefeat) {
			this.typeImage.visible = true;
			this.typeImage.source = RES.getRes("gyzj_over_renshu_png");
		}
	}


	public showWinFlag(type: Array<any>, iswin: boolean = false) {
		for (let i = 0; i < type.length; ++i) {
			var _type = type[i].rule;
			this.chooseFlag(_type, iswin);
		}

	}
	public chooseFlag(type: number, iswin: boolean = false) {
		var res: string;
		switch (type) {
			//自摸
			case 2:
				res = "gyzj_over_zimo_png";
				this.typeImage.source = RES.getRes(res);
				LogUtils.logD("资源的名字：" + res + "===否存在====" + this.typeImage.source);
				break;
			//点炮
			case 1:
				res = "gyzj_over_dianpao_png";
				if (iswin) {
					res = "gyzj_over_hupai_png";
				}
				this.typeImage.source = RES.getRes(res);
				LogUtils.logD("资源的名字：" + res + "===否存在====" + this.typeImage.source);
				break;
			//抢杠胡
			case 103:
				res = "gyzj_over_qgh_png";
				this.typeImage.source = RES.getRes(res);
				LogUtils.logD("资源的名字：" + res + "===否存在====" + this.typeImage.source);
				break;
		}
	}
	/**报听*/
	public chooseBaoTingFlag(isBaoting: boolean) {
		var res: string;
		if (isBaoting) {
			res = "gyzj_over_jiaozui_png";
		}
		else {
			res = "gyzj_weijiao_png";
		}
		this.typeImage.source = RES.getRes(res);
		LogUtils.logD("资源的名字：" + res + "===否存在====" + this.typeImage.source);
	}
	public showScore(score) {
		this.scoreLabel.text = "";
		if (score <= 0) {
			this.scoreLabel.font = "gyzj_over_lose_fnt"
		}
		this.scoreLabel.text = score > 0 ? "+" + score : score;
	}

	/**
	 * @param  {} winInfo
	 */
	public showWinInfo(winInfo) {
		this.scoreLabel.text = "";
		if (winInfo.gainGold <= 0) {
			this.scoreLabel.font = "gyzj_over_lose_fnt"
		}
		this.scoreLabel.text = winInfo.gainGold > 0 ? "+" + winInfo.gainGold : winInfo.gainGold;
	}





	/**
	 * 展示流水数据
	 */
	public showPlayerBills(bills, playerIndex, settleData, roundScoreRules: Array<any>) {
		//if(bills.length==0) this.setLiuShuiBgVis(false);
		for (let i = 0; i < bills.length; i++) {
			let bill = bills[i];
			let info = bill.info;
			let type = bill.type;
			let str1;
			let str2;
			let str3;
			let num;
			//方位
			str1 = majiang.MajiangUtils.getDirStr(info.from, playerIndex);
			str3 = info["score"] + "倍";
			if (type == 1) {
				var gangContent: string;
				var gangType = info["gangType"];
				switch (gangType) {
					case 1:
						gangContent = "爬坡豆";
						break;
					case 2:
					case 4:
						gangContent = "闷豆";
						break;
					case 3:
						gangContent = "点豆";
						break;
					case 5:
						gangContent = "杠上杠";
						break;
				}
				var bei: string = ""
				// str2 = "抢杠"
				if (info["score"] < 0) {
					bei = "被";
					//str2 = "被抢杠"
				}
				str2 = bei + gangContent;
			}
			else if (type == 2) {
				let _winType: number;
				for (let i = 0; i < roundScoreRules.length; ++i) {
					let _data = roundScoreRules[i];
					if (_data.rule == 104) {
						continue;
					}
					_winType = _data.rule;
				}
				if (_winType == 2) {
					str2 = "自摸";
				}
				else if (_winType == 101) {
					str2 = "杠上花";
				}
				else if (_winType == 102) {
					str2 = "热炮";
				}
				else if (_winType == 103) {
					str2 = "抢杠胡";
				}
				else if (_winType == 105) {
					str2 = "天胡";
				}
				else if (_winType == 107) {
					str2 = "地胡";
				}
				if (_winType == 1) {
					if (info["score"] > 0) {
						str2 = "接炮";
					}
					else {
						str2 = "点炮"
					}
				}
			}
			else if (type == 16) {
				let minechickType = info["type"];
				num = info["num"];
				str2 = this.getChickChinese(minechickType) + "(" + num + "张" + ")";
				//	LogUtils.logD("==============" + str2);
				// str3 = info["score"] + "倍";
				// let item = new GYZJOverItemRenderer();
				// item.showText(str1, str2, str3, this.isWin);
				// this.mainGroup.addChild(item)
			}
			else if (type == 3) {
				// let str = info.winner || info.from;
				if (info["score"] < 0) {
					str2 = "被查叫";
				} else {
					str2 = "查叫";
				}
			}
			let item = new GYZJOverItemRenderer();
			item.showText(str1, str2, str3, this.isWin);// this.isWin
			this.mainGroup.addChild(item)
		}
	}



	public getChickChinese(type: number): string {
		switch (type) {
			case 1:
				return "冲锋鸡";
			case 2:
				return "责任鸡";
			case 3:
				return "包鸡";
			case 4:
				return "捉鸡";
			case 5:
				return "幺鸡";
			case 6:
				return "八筒";
			default:
				return "你传的type 我这里没有";
		}
	}
}




