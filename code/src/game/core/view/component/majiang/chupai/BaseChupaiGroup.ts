
module majiang {
	export class BaseChupaiGroup extends game.BaseUI {
		public mainGroup: eui.Group;
		protected group1: eui.Group;
		protected group2: eui.Group;
		protected group3: eui.Group;
		protected recordsJson: any = {};
		public chupais: BaseChupai[] = [];
		public constructor() {
			super();

		}

		public createChildren() {
			super.createChildren();
			//记录坐标
			this.setRecords();
			this.group1.removeChildren();
			this.group2.removeChildren();
			this.group3.removeChildren();
		}

		public clearDatas() {
			this.group1.removeChildren();
			this.group2.removeChildren();
			this.group3.removeChildren();
		}


		/**
		 * 设置坐标点
		 */
		public setRecords() {
			for (var i = 1; i <= 21; i++) {
				var image: eui.Image = this['mj' + i];
				this.recordsJson[i] = {};
				this.recordsJson[i].source = image.source;
				this.recordsJson[i].x = image.x;
				this.recordsJson[i].y = image.y;
				this.recordsJson[i].scaleX = image.scaleX;
				this.recordsJson[i].scaleY = image.scaleY;
			}
		}

		public removeLastChupai() {
			let pai = this.chupais.pop();
			game.UIUtils.removeSelf(pai);
			pai = null;
		}

		public getLastChuipai() {
			if (this.chupais && this.chupais.length > 0) {
				return this.chupais[this.chupais.length - 1];
			}
			return null;
		}

		public onAdded() {
			super.onAdded();
			CF.aE(ENo.FIND_COLOR, this.findColor, this);
			CF.aE(ENo.FIND_GYZJ_JIPAICOLOR, this.findJiPaiColor, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.FIND_COLOR, this.findColor, this);
			CF.rE(ENo.FIND_GYZJ_JIPAICOLOR, this.findJiPaiColor, this);
		}

		/**
		 * 查找颜色相同的
		 * @param  {egret.Event} e
		 */
		public findColor(e: egret.Event) {
			let value = e.data;
			for (let i = 0; i < this.chupais.length; i++) {
				this.chupais[i].showMaskRect(value)
			}

		}
		/**	/贵阳捉鸡  把鸡牌标识显示*/
		public findJiPaiColor(e: egret.Event) {
			let value = e.data;
			if (value && value["gyzj"]) {
				var jipaiData = value["gyzj"];
				for (let i = 0; i < jipaiData.length; ++i) {
					for (let j = 0; j < this.chupais.length; j++) {
						if (this.chupais[j].value == jipaiData[i]) {
							this.chupais[j].maskRect.visible = true;
						}
					}
				}
			}
		}

		public showDianpaoAni(mainCard) {
			if (mainCard == true) {
				return 400;
			} else {
				let pai = this.chupais.pop();
				return pai.dianpaoAni();
			}

		}
	}
}