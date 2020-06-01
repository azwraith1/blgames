class HZMJOverItem extends eui.Component {

	private isWin: boolean = false;

	public panelImage: eui.Image;
	public headerImage: eui.Image;
	public mineTip: eui.Image;
	public typeImage: eui.Image;
	public nameLabel: eui.Label;
	public scoreLabel: eui.BitmapLabel;
	public beiShuLable: eui.Label;
	public zhuangImg: eui.Image;
	public hzmj_line: eui.Image;
	public nameBg: eui.Image;
	public renshu: eui.Image;
	public weizhiLable: eui.Label;
	public weiZhi: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/component/hzmj/HZMJOverItemSkin.exml";
	}
	public setWeiZhiLable(direction: string) {
		var _resouce: string;
		switch (direction) {
			case "1":
				this.weiZhi.source = RES.getRes("hzmj_weizhi1_png");
				break;
			case "2":
				this.weiZhi.source = RES.getRes("hzmj_weizhi2_png");
				break;
			case "3":
				this.weiZhi.source = RES.getRes("hzmj_weizhi3_png");
				break;
			case "4":
				this.weiZhi.source = RES.getRes("hzmj_weizhi4_png");
				break;
			default:
				break;
		}
	
	}
	public createChildren() {
		super.createChildren();
		this.mineTip.visible = false;
		this.zhuangImg.visible = false;
		this.renshu.visible = false;
		this.hzmj_line.scaleX=0.8;
	}

	/**改变面板头像为黄色 */
	public change2Win() {
		this.isWin = true;
		//this.panelImage.source = RES.getRes(`hzmj_over_panel_1_png`);
		this.hzmj_line.source = RES.getRes(`hzmj_lilne_1_png`);
		this.nameLabel.stroke = 2;
		this.nameLabel.strokeColor = 0x883d00;
		this.nameBg.source = RES.getRes(`hzmj_txt_bg_1_png`);
	}
	public setPlayerPanel() {
		this.panelImage.source = RES.getRes(`hzmj_over_panel_1_png`);
		this.change2Win();
	}
	/**显示玩家头像和名字*/
	public showPlayerDatas(playerData) {
		this.nameLabel.text = playerData.nickname;
		this.headerImage.source = `hall_header_${playerData.sex}_${playerData.figureUrl}_png`;
	}

	/**显示破产*/
	public showPoChan(data) {
		if (data <= 0) {
			this.renshu.visible = true;
		}
		else {
			this.renshu.visible = false;
		}//显示破产
	}
	public showDefeat(isDefeat) {
		if (isDefeat) {
			this.typeImage.visible = true;
			this.typeImage.source = RES.getRes(`gdmj_point_11_png`);
		}
	}
	public showScore(score) {
		this.scoreLabel.text = "";
		this.scoreLabel.letterSpacing = -5;
		if (score <= 0) {
			this.scoreLabel.font = "hzmj_over_font_2_fnt";
		}
		else {
			this.scoreLabel.font = "hzmj_over_fontyellow_fnt";
		}
		this.scoreLabel.text = score > 0 ? "+" + score : score;

	}

	/**
	 * @param  {} winInfo 
	 */
	public showWinInfo(winInfo) {
		this.scoreLabel.text = "";
		this.scoreLabel.letterSpacing = -5;
		if (winInfo.gainGold <= 0) {
			this.scoreLabel.font = "hzmj_over_font_2_fnt";
		}
		else {
			this.scoreLabel.font = "hzmj_over_fontyellow_fnt";
		}
		var _gainGold = winInfo.gainGold;
	
		this.scoreLabel.text = winInfo.gainGold > 0 ? "+" + _gainGold : _gainGold;
	}


	/**
	 * 展示流水数据 玩家的倍数 和总的分数
	 */
	public showPlayerBills(bills, playerIndex, settleData) {

	}
	/**设置赢和输了的倍数 */
	public showBeiShu(beiShu: number, isWin: boolean = false) {
		var _beishu = Math.abs(beiShu);
		if (isWin) {
			this.beiShuLable.text = "赢" + _beishu + "倍";
			this.beiShuLable.stroke = 2;
			this.beiShuLable.strokeColor = 0x984207;
			this.beiShuLable.textColor = 0xfde890;
		}
		else {
			this.beiShuLable.text = "输" + _beishu + "倍";
		}
	}

	public getGoldStr(gainGold) {
		//	return gainGold > 0 ? "+" + gainGold : gainGold;
	}

}

	// public getBillsStr(type, bill) {
	// 	let gainGold = bill.gainGold;
	// 	switch (type) {
	// 		case 1:
	// 			let gangType = bill.gangType;
	// 			if (gangType == 2 || gangType == 4) {
	// 				if (gainGold > 0) {
	// 					return "暗杠"
	// 				} else {
	// 					return "被暗杠"
	// 				}
	// 			} else {
	// 				if (gainGold > 0) {
	// 					return "杠"
	// 				} else {
	// 					return "被杠"
	// 				}
	// 			}
	// 		case 13:
	// 			return "买马";
	// 		case 15:
	// 			return "抓鸟"
	// 	}
	// }
	// public showWinFlag(flag, isWin, score, winIdex, mineIndex) {
	// 	let getDirStr = majiang.MajiangUtils.getDirStr(winIdex, mineIndex);
	// 	if (flag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
	// 		//自摸
	// 		if (isWin) {
	// 			this.typeImage.visible = true;
	// 			this.typeImage.source = RES.getRes(`gdmj_point_2_png`);
	// 			// let item = new GDMJOverItemRenderer();
	// 			// item.showText("自摸", `${Math.abs(score)}`, getDirStr, this.isWin);
	// 			// this.mainGroup.addChild(item);
	// 		} else {
	// 			// let item = new GDMJOverItemRenderer();
	// 			// item.showText("被自摸", `${score}倍`, getDirStr, this.isWin);
	// 			// this.mainGroup.addChild(item);
	// 		}
	// 	} else if (flag & MAJIANG_WIN_FLAG.DISCARD) {
	// 		if (isWin) {
	// 			this.typeImage.visible = true;
	// 			this.typeImage.source = RES.getRes(`gdmj_point_3_png`);
	// 		} else {
	// 			this.typeImage.visible = true;
	// 			this.typeImage.source = RES.getRes(`gdmj_point_1_png`);
	// 			// let item = new GDMJOverItemRenderer();
	// 			// item.showText("点炮", `${score}倍`, getDirStr, this.isWin);
	// 			// this.mainGroup.addChild(item);
	// 		}
	// 	} else if (flag & MAJIANG_WIN_FLAG.ABOUT_KONG) {
	// 		this.typeImage.source = RES.getRes(`gdmj_point_4_png`);
	// 	}
	// }