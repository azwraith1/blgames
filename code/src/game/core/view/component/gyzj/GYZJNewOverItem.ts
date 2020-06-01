class GYZJNewOverItem extends eui.Component {
	public panelImage: eui.Image;
	public typeImage: eui.Image;
	public touxiang: eui.Group;
	public headerImage: eui.Image;
	public nameLabel: eui.Label;
	public scoreLabel: eui.BitmapLabel;
	public beishu: eui.Label;
	public weiZhi: eui.Image;
	private isWin: boolean = false;
	public constructor() {
		super();
		this.skinName = "resource/skins/component/gyzj/GYZJNewOverItemSkin.exml";
	}

	/**设置倍数的值*/
	public setBeiShu(win: number) {
		var _txt: string;
		if (win > 0) {
			_txt = "赢"
			this.panelImage.source = RES.getRes("gyzj_over_smallyellow_png");
			this.beishu.textColor = 0Xffe9c2;
		}
		if (win < 0) {
			_txt = "输";
		}
		else if (win == 0) {
			_txt = "";
		}
		this.beishu.text = _txt + Math.abs(win) + "倍";
	}
	public change2Win() {
		this.isWin = true;
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
		if (winInfo.gainGold <=0) {
			this.scoreLabel.font = "gyzj_over_lose_fnt"
		}
		this.scoreLabel.text = winInfo.gainGold > 0 ? "+" + winInfo.gainGold : winInfo.gainGold;
	}


}