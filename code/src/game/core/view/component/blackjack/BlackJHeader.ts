/*
 * @Author: MC Lee 
 * @Date: 2019-06-13 11:37:56 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-10 17:09:56
 * @Description: 21点头像
 */
class BlackJHeader extends BaseHeader implements IUpdate {
	private angle: number = 0;
	private time: number = 0;
	protected timeShape: egret.Shape;
	public timeBg: eui.Image;
	protected liushuiGroup: eui.Group;
	protected liushuiLabel: eui.BitmapLabel;
	protected liushuiBg: eui.Image;
	private winAni1: DBComponent;
	private tipImage: eui.Image;
	private tipGroup: eui.Group;
	private tipLabel: eui.Label
	private indexGroup: eui.Group;
	private tipImage1: eui.Image;
	public constructor() {
		super();
	}
	public createChildren() {
		super.createChildren();
		this.timeShape = new egret.Shape();
		this.timeShape.rotation = -90;
		this.headerGroup.addChild(this.timeShape);
		this.timeShape.x = this.timeBg.x;
		this.timeShape.y = this.timeBg.y;
		this.timeBg.mask = this.timeShape;
		this.liushuiLabel.font = "";
	}

	public hideTipGroup() {
		this.tipGroup.visible = false;
	}

	public showTipsGroup(text, autoHide = true) {
		this.tipGroup.visible = true;
		this.tipLabel.text = text;
		if (autoHide) {
			egret.Tween.removeTweens(this.tipGroup);
			egret.Tween.get(this.tipGroup).wait(2000).call(() => {
				this.tipGroup.visible = false;
			});
		}
	}

	public changePos2Left() {
		this.tipImage1.scaleX = -1;
		this.tipGroup.x = - 40;
	}


	public changePos2Right(){
		this.indexGroup.x = -20;
	}


	public showLiushui(gainGold) {
		this.liushuiGroup.visible = true;
		if (gainGold > 0) {
			this.liushuiBg.source = RES.getRes("blackj_header_win_ls_db_png");
			this.liushuiLabel.font = RES.getRes("blackj_win_fnt");
			if (Global.runBack) {
				this.liushuiLabel.text = gainGold;
			} else {
				CountUpUtils.recordStart(this.liushuiLabel, 0, gainGold, 0.5);
			}

		} else if (gainGold < 0) {
			this.liushuiLabel.font = RES.getRes("blackj_lose_fnt");
			if (Global.runBack) {
				this.liushuiLabel.text = gainGold;
			} else {
				CountUpUtils.recordStart(this.liushuiLabel, 0, gainGold, 0.5);
			}
		} else {
			this.liushuiBg.source = RES.getRes("blackj_header_win_ls_db_png");
			this.liushuiLabel.font = "blackj_win_fnt";
			this.liushuiLabel.text = "0";

		}

	}

	/**
	 * 展现胜利动画
	 */
	public showWinAni() {
		// let db = new DBComponent("21d_win01");
		// this.headerGroup.addChild(db);
		// db.x = 72;
		// db.y = 90
		// db.playNamesAndLoop(["21d_win01", "21d_win01_loop"]);
	}

	public onAdded() {
		super.onAdded();
		this.showShapByPo(0);
	}

	public startTimer() {
		this.timeBg.visible = true;
		game.UpdateTickerManager.instance.add(this);
	}

	public removeTimer() {
		game.UpdateTickerManager.instance.remove(this);
		this.timeBg.visible = false;
	}

	public update() {
		if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
			let endTime = Global.roomProxy.roomInfo.countdown.end;
			let startTime = game.DateTimeManager.instance.now;
			let cha = endTime - startTime;
			let s = Global.roomProxy.roomInfo.countdown.s * 1000;
			let value = Math.floor(360 * cha / s);
			// * 360;
			if (value >= 0) {
				this.showShapByPo(value);
			}
		}
	}

	public onRemoved() {
		super.onRemoved();
		game.UpdateTickerManager.instance.remove(this);
	}

	protected showShapByPo(angle) {
		let r = 0;
		let shape = this.timeShape;
		shape.graphics.clear();
		shape.graphics.beginFill(0xff0000);
		shape.graphics.moveTo(r, r);//绘制点移动(r, r)点
		shape.graphics.lineTo(r * 2, r);//画线到弧的起始点
		shape.graphics.drawArc(0, 0, 65, 0, angle * Math.PI / -180, true);
		shape.graphics.lineTo(r, r)
		shape.graphics.endFill();
	}

	public isProxy: boolean = false;
	public proxyIndex;
	public proxyGroup: eui.Group;
	public proxyName: eui.Label;
	public showProxys(playerIndex) {
		this.visible = true;
		this.isProxy = true;
		this.proxyIndex = playerIndex;
		this.headerGroup.visible = false;
		this.proxyGroup.visible = true;
		let playerData = Global.roomProxy.getPlayerByIndex(playerIndex);
		this.proxyName.text = playerData.nickname;
	}

	/**
	 * 提示动画
	 * @param  {} isShow
	 */
	public showTipsImage(isShow) {
		if (!isShow) {
			egret.Tween.removeTweens(this.tipImage);
			this.tipImage.visible = false;
		} else {
			this.tipImage.visible = true;
			if (this.proxyGroup.visible) {
				this.tipImage.y = 64;
			} else {
				this.tipImage.y = -16
			}
			let startY = this.tipImage.y;
			egret.Tween.get(this.tipImage, { loop: true }).to({
				y: startY - 20
			}, 1000).to({
				y: startY
			}, 1000);
		}
	}
}