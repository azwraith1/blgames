class GDMJOverItemOther extends eui.Component {
	public panelImage: eui.Image;
	public typeImage: eui.Image;
	public touxiang: eui.Group;
	public headerImage: eui.Image;
	public nameLabel: eui.Label;
	public scoreLabel: eui.BitmapLabel;
	public weiZhi: eui.Image;
	private isWin: boolean = false;
	public constructor() {
		super();
		this.skinName = "GDMJOverItemOtherSkin";
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
	}
	public winBg(gainGold:number) {
		if(gainGold<=0) return;
		this.panelImage.source = RES.getRes("gdmj_over_yellow_png");
		this.setNameColor();
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
			} else {
			}
		} else if (flag & MAJIANG_WIN_FLAG.DISCARD) {
			if (isWin) {
				this.typeImage.visible = true;
				this.typeImage.source = RES.getRes(`gdmj_point_3_png`);
			} else {
				this.typeImage.visible = true;
				this.typeImage.source = RES.getRes(`gdmj_point_1_png`);
			}
		} else if (flag & MAJIANG_WIN_FLAG.ABOUT_KONG) {
			this.typeImage.source = RES.getRes(`gdmj_point_4_png`);
		}
	}
	public showPlayerDatas(playerData) {
		this.nameLabel.text = playerData.nickname;
		this.headerImage.source = `hall_header_${playerData.sex}_${playerData.figureUrl}_png`;
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

}