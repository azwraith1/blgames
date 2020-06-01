class MainHallButton extends game.BaseUI {
	private hotImage: eui.Image;
	private titleImage: eui.Image;
	private dbComponent: DBComponent;
	private dbGroup: eui.Group;
	private hotImageGroup: eui.Group;
	private buttonData: any;
	private newImage: eui.Image;
	// private minX: number;
	// private maxX: number;
	private pepleCountLabel: eui.Label;
	private peopleImage: eui.Image;
	private titleDB: eui.Group;
	private aniGroup: eui.Group;
	private titleGroup: eui.Group;
	public constructor(buttonData) {
		super();
		this.buttonData = buttonData;
		if (this.buttonData.grade == GRADE.RECOMMEND) {
			this.skinName = new MainHallBigBtnSkin();
		} else {
			this.skinName = new MainHallSmallBtnSkin();
		}
	}

	public showButtonAni(delay: number) {
	//	this.time1 = delay;
		egret.Tween.removeTweens(this.aniGroup);
		this.aniGroup.scaleX = 0;
		this.aniGroup.scaleY = 0;
		this.aniGroup.alpha = 0;
		this.visible = false;
		egret.Tween.get(this.aniGroup).wait(delay).call(() => {
			this.visible = true;
		}).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut).to({ scaleX: 0.95, scaleY: 0.95 }, 100, egret.Ease.quadOut).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.quadOut);
		egret.Tween.get(this.aniGroup).wait(delay).to({ alpha: 0.6 }, 280, egret.Ease.quadOut).to({ alpha: 0.95 }, 280, egret.Ease.quadOut).to({ alpha: 1 }, 50, egret.Ease.quadOut);
	}



	public createChildren() {
		super.createChildren();

		let grade = this.buttonData.grade;
		if (grade == GRADE.HOT) {
			this.showHot();
		} else if (grade == GRADE.NEW) {
			this.showNew();
		}
		this.peopleImage.visible = this.pepleCountLabel.visible = !(this.buttonData.baseCountHide == 1);
		this.dbGroup.touchEnabled = false;
		this.dbGroup.touchChildren = false;
		if (this.buttonData.gameId == "mjxzdd" && this.buttonData.grade == GRADE.RECOMMEND) {
			this.titleImage.source = RES.getRes(`main_title_mjxlch_big_png`);
		} else {
			let str = `main_title_${this.buttonData.gameId}${CF.tic}`;
			if (!RES.hasRes(str)) {
				str = `main_title_${this.buttonData.gameId}_png`;
			}
			this.titleImage.source = RES.getRes(str);
		}
		this.createDb();
		Owen.UtilsString.playDB("dt20_tittle", this.titleDB, -1);
	}

	public onAdded() {
		super.onAdded();
		game.UIUtils.setAnchorPot(this);
	}

	public onTouchTap(e: egret.TouchEvent) {
		LogUtils.logD("=====onTouchTap======" + this.buttonData.gameId);
		majiang.MajiangUtils.playClick()
		egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100).call(() => {
			if (this.buttonData.grade == GRADE.DEV) {
				Global.alertMediator.addAlert("暂未开放，敬请期待", null, null, true);
				return;
			} else if (this.buttonData.grade == GRADE.MAINTENANCE) {
				Global.alertMediator.addAlert("游戏维护中", null, null, true);
				return;
			}
			CF.dP(ENo.JOIN_SCENE_GAMEID, { gameId: this.buttonData.gameId });
		});
	}


	public updatePlayerCount() {
		if (this.buttonData.grade == GRADE.DEV) {
			this.pepleCountLabel.text = "敬请期待";
			return;
		}
		if (this.buttonData.grade == GRADE.MAINTENANCE) {
			this.pepleCountLabel.text = "维护中";
			return;
		}
		this.pepleCountLabel.text = Global.gameProxy.peoplesCounts[this.buttonData.gameId];
	}

	public checkAlapa(offersetX, width) {
		// if (this.buttonData.gameId != "mjxzdd") {
		return;
		// }
		egret.Tween.removeTweens(this);
		let alpha = -1;
		if (offersetX > 0) {
			let maxX = this.x + this.width - this.anchorOffsetX
			let minX = this.x - this.anchorOffsetX + this.width / 3;
			let nowPoint = offersetX;
			if (nowPoint < minX) {
				alpha = 1;
			} else {
				if (nowPoint >= minX && nowPoint < maxX) {
					let cha = nowPoint - minX;
					alpha = this.getChaAlphaByRight(cha);
				}
			}
		} else {
			let maxX = this.x + this.width / 2 - this.width / 4 + this.anchorOffsetX;
			let minX = this.x - this.width / 2 - this.width / 4 + this.anchorOffsetX;
			let nowPoint = width + offersetX;
			if (this.buttonData.gameId == "slot" || this.buttonData.gameId == "dzmj") {
				let pOffersetX = maxX + offersetX;
				if (nowPoint >= maxX) {
					alpha = 1;
				} else {
					if (nowPoint >= minX && nowPoint < maxX) {
						let cha = maxX - nowPoint;
						alpha = this.getChaAlphaByRight(cha);
					}
				}
			}
		}
		if (alpha && alpha > -1) {
			egret.Tween.get(this).to({
				alpha: alpha
			}, 50)
		}
	}

	public getChaAlphaByRight(cha) {
		if (cha > 0 && cha < this.width / 95) {
			return 1;
		} else
			if (cha >= this.width / 95 && cha < this.width / 80) {
				return 0.6;
			}
			else if (cha >= this.width / 80 && cha < this.width / 70) {
				return 0.5;
			} else if (cha >= this.width / 70 && cha < this.width / 50) {
				return 0.4;
			} else if (cha >= this.width / 50 && cha < this.width / 30) {
				return 0.3;
			} else if (cha >= this.width / 30 && cha < this.width) {
				return 0.2;
			}
	}

	private mc: DBComponent;
	private createDb() {
		if (!this.buttonData.gameId) {
			return;
		}
		let mc: DBComponent = GameCacheManager.instance.getCache(`mian_button${this.buttonData.gameId}`) as DBComponent;
		if (!mc) {
			if (this.buttonData.gameId == "scmj") {
				mc = new DBComponent(`mjxzdd`, false);
			} else if (this.buttonData.gameId == "mjxzdd" && this.buttonData.grade == GRADE.RECOMMEND) {
				mc = new DBComponent(`mjxzdd_big`, false);
			}
			else {
				mc = new DBComponent(`${this.buttonData.gameId}`, false);
			}
		}
		if (mc) {
			this.dbGroup.addChild(mc);
			let gameId = this.buttonData.gameId;
			if (gameId == "sicbo" || gameId == "texaspoker" || this.buttonData.gameId == "mjxzdd" && this.buttonData.grade == GRADE.RECOMMEND) {
				mc.playDefault(-1);
			}
			else {
				mc.playByFilename(-1);
			}

			mc.verticalCenter = 0;
			mc.horizontalCenter = 0;
			this.mc = mc;
		}
	}

	private hotDb: DBComponent;
	public showHot() {
		//this.hotImage.visible = true;
		this.hotImageGroup.visible = true;
		if (!this.hotDb) {
			this.hotDb = new DBComponent("dt20_hot", false);//fire
		}
		this.hotImageGroup.addChild(this.hotDb);
		this.hotDb.verticalCenter = 0;
		this.hotDb.horizontalCenter = 0;
		this.hotDb.play("dt20_hot", -1);//fire
	}

	public showNew() {
		//	this.newImage.visible = true;

		this.hotImageGroup.removeChildren();
		Owen.UtilsString.playDB("dt20_update", this.hotImageGroup, -1);

	}

}


//游戏级别
const GRADE = {
	RECOMMEND: 1, //推荐
	HOT: 2, //火爆
	NEW: 3, //新游戏
	COMMON: 4, //一般
	DEV: 5, //敬请期待
	HIDE: 6, //隐藏
	MAINTENANCE: 7//维护
};