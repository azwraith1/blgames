module sangong {
	export class SangongFen extends game.BaseUI {
		private bgImage: eui.Image;
		private dbGroup: eui.Group;
		private beishuLabel: eui.BitmapLabel;
		private patternImage: eui.Image;
		private patternLabel: eui.BitmapLabel;
		private data: any;
		private dir: any;
		public wancheng: eui.Label;
		private bgImage0: eui.Image;
		private dbComp: DBComponent;
		private paiXinGroup: eui.Group;
		public constructor(data) {
			super();
			this.data = parseInt(data);
			this.skinName = new SangongFenSkin();
		}

		public createChildren() {
			this.beishuLabel.visible = false;
			super.createChildren();
			this.showFen(this.data);

		}

		/**
		 * 底板龙骨动画
		 */
		private createDbComp(fileName) {
			let dbComp = new DBComponent(fileName);
			dbComp.callback = () => {
			}
			this.dbGroup.addChild(dbComp);
			// dbComp.resetPosition();
			this.dbComp = dbComp;
			this.dbComp.x = 101;
			this.dbComp.y = 27;
		}


		/**
		 * 根据label定位位置
		 */
		private resetPositionByLabel() {
			this.beishuLabel.x = this.patternLabel.x + this.patternLabel.width;
		}

		/**
		 * 根据image定位位子
		 */
		private resetPositionByImage() {
			this.beishuLabel.x = this.patternImage.x + this.patternImage.width;
		}

		/**
		 * image放大缩小
		 */
		private showScalImageAni() {
			this.beishuLabel.visible = false;
			game.UIUtils.setAnchorPot(this.patternImage);
			this.patternImage.scaleX = this.patternImage.scaleY = 4;
			egret.Tween.get(this.patternImage).to({
				scaleX: 1,
				scaleY: 1
			}, 300, egret.Ease.backIn);
			this.setAutoTimeout(() => {
				this.beishuLabel.visible = true;
			}, this, 350);
		}


		private showFen(data) {
			switch (data) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					//this.bgImage.source = RES.getRes("sg_06_bg_png");
					//this.bgImage.visible = true;
					this.patternLabel.font = "sg_06_fnt";
					this.patternLabel.text = this.showFenshu(data);
					this.beishuLabel.font = "sg_huise_fnt"
					// this.beishuLabel.font = "sg_06bei_fnt";
					// this.beishuLabel.text = "(1倍)";
					this.beishuLabel.text = "(1b)";
					this.patternLabel.visible = true;
					this.resetPositionByLabel();
					this.niuFenFDSX(this.patternLabel, this.dir);
					break;
				case 7:
				case 8:
				case 9:
					// this.bgImage.source = RES.getRes("sg_79_bg_png");
					// this.bgImage.visible = true;
					this.patternLabel.font = "sg_79_fnt";
					this.patternLabel.text = this.showFenshu(data);
					this.beishuLabel.font = "sg_dsgzz_fnt"
					//this.beishuLabel.font = "sg_79bei_fnt"
					this.beishuLabel.text = "(2b)"
					this.patternLabel.visible = true;
					this.resetPositionByLabel();
					this.niuFenFDSX(this.patternLabel, this.dir);
					break;
				case 10:
					//smart 屏蔽
					// this.bgImage.source = RES.getRes("sg_sg_bg_png");
					// this.patternImage.visible = true;
					// this.patternImage.source = RES.getRes("sg_sg_png")
					//smart
					//smart override
					this.showPaiXinDB("sg_px_sg");
					this.bgImage.visible = false;
					//smart
					//this.beishuLabel.font = "sg_sgbei_fnt"
					this.beishuLabel.font = "sg_sgbeishu_fnt"
					this.beishuLabel.text = "(3b)"
					this.resetPositionByImage();
					this.showScalImageAni();
					break;
				case 11:
					//smart屏蔽
					// this.createDbComp("sg_dasangong");
					// this.dbComp.playDefault(1)
					//smart 
					//smart override
					//this.createDbComp("sg_px_dsg");
					this.showPaiXinDB("sg_px_dsg");
					//smart
					// this.patternImage.visible = true;
					this.bgImage.visible = false;
					// this.patternImage.source = RES.getRes("sg_dsg_png")
				//	this.beishuLabel.font = "sg_dsgbei_fnt"
					this.beishuLabel.font = "sg_dsgzz_fnt"
					this.beishuLabel.text = "(4b)"
					this.resetPositionByImage();
					this.showScalImageAni();
					break;
				case 12:
					//smart屏蔽
					// this.createDbComp("sg_zhizun");
					// this.dbComp.playDefault(1)
					//smart override
					this.showPaiXinDB("sg_px_zz");
					//smart
					// this.patternImage.visible = true;
					this.bgImage.visible = false;
					// this.patternImage.source = RES.getRes("sg_zz_png")
					//this.beishuLabel.font = "sg_zzbei_fnt"
					//this.beishuLabel.font = "sg_dsgbei_fnt"
					this.beishuLabel.font = "sg_dsgzz_fnt"
					this.beishuLabel.text = "(5b)"
					this.resetPositionByImage();
					this.showScalImageAni();
					break;
			}
		}
		/**
		 * smart
		 * 
		 */
		private showPaiXinDB(name: string) {
			this.paiXinGroup.removeChildren();
			var loopName: string = name + "_loop";
			let winDb = new DBComponent(name);
			this.paiXinGroup.addChild(winDb);
			winDb.playNamesAndLoop([name, loopName]);
		}
		private niuFenFDSX(num, dir) {
			game.UIUtils.setAnchorPot(num);
			num.alpha = 0;
			num.scaleX = num.scaleY = 0;
			egret.Tween.get(num).to({ alpha: 1, scaleX: 1.4, scaleY: 1.4 }, 300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300)
			this.setAutoTimeout(() => {
				this.beishuLabel.visible = true;
			}, this, 650)
		}

		private showFenshu(data) {
			switch (data) {
				case 0:
					return "零点";
				case 1:
					return "一点";
				case 2:
					return "二点";
				case 3:
					return "三点";
				case 4:
					return "四点";
				case 5:
					return "五点";
				case 6:
					return "六点";
				case 7:
					return "七点";
				case 8:
					return "八点";
				case 9:
					return "九点";

			}
		}

	}
}