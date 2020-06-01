module majiang {
	export class RecordItemRender extends game.BaseItemRender {
		private typeLabel: eui.Label;
		private beishuLabel: eui.Label;
		private valueLabel: eui.Label;
		public constructor() {
			super();
			this.skinName = new RecordItemSkin();
		}

		public createChildren() {
			super.createChildren();
			this.beishuLabel.visible = false
		}

		protected dataChanged() {
			this.updateShow(this.data);
		}


		private renderTypeByScmj(type, info, value) {
			let mineIndex = Global.gameProxy.getMineIndex();
			var form = info.from;
			var texcontent: string;
			var texDirec: string = "(" + MajiangUtils.getDirStr(info.from, mineIndex) + ")";
			texDirec = "";
			if (type == 1) {
				// texcontent = MajiangUtils.getGangTypePTStr(info.gangType, value);
				//smart
				//this.setTextStyle(this.typeLabel, texcontent, texDirec);
				this.typeLabel.text = MajiangUtils.getGangTypeStr(info.gangType, value);//,info.from,mineIndex
				// this.typeLabel.text = texcontent + texDirec;
			} else if (type == 2) {

				texcontent = MajiangUtils.getHuTypeStr(type, value, info.from, mineIndex);
				//	this.typeLabel.text = MajiangUtils.getHuTypeStr(type, value, info.from, mineIndex);
				this.typeLabel.text = texcontent + texDirec;

			} else if (type == 6) {
				this.typeLabel.text = "呼叫转移";
			} else {
				texcontent = MajiangUtils.getBiliTypeStr(type, value, info.from);
				//this.typeLabel.text = MajiangUtils.getBiliTypeStr(type, value, info.from);
				this.typeLabel.text = texcontent + texDirec;
			}
		}
		public updateShow(data: any) {
			let type = data.type;
			let info = data.info;
			let value = info.gainGold;
			this.valueLabel.text = value.toFixed(2) > 0 ? "+" + value : value;
			let gameId = Global.gameProxy.roomInfo['codeId'];
			if (gameId == 10001 || gameId == 10002) {
				this.renderTypeByScmj(type, info, value);
			} else {
				this.renderTypeByOtherMj(type, info, value);
			}
			// let dizhu = Global.gameProxy.getSceneDizhu();
			// this.beishuLabel.text = Math.floor(Math.abs(value / dizhu)) + "倍";
			this.changeColor(value);
		}


		private renderTypeByOtherMj(type, info, value) {
			let mineIndex = Global.gameProxy.getMineIndex();
			if (type == 1) {
				this.typeLabel.text = MajiangUtils.getGangTypePTStr(info.gangType, value);
			} else if (type == 2) {
				this.typeLabel.text = MajiangUtils.getHuTypeStr(type, value, info.from, mineIndex);
			} else {
				this.typeLabel.text = MajiangUtils.getBiliTypeStr(type, value, info.from);
			}
		}

		/**
		 * 改变底色
		 * @param  {} value
		 */
		public changeColor(value) {
			let color = 0xffffff;
			if (value > 0) {
				color = 0xfff729;
			}
			this.valueLabel.textColor = this.beishuLabel.textColor = this.typeLabel.textColor = color;
		}
	}
}