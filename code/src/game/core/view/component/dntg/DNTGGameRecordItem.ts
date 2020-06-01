module dntg {
	export class DNTGGameRecordItem extends game.BaseItemRender {
		public timeText: eui.Label;
		public gameNameText: eui.Label;
		public totalBetText: eui.Label;
		public totalWinText: eui.Label;
		public idLabel: eui.Label;

		public constructor() {
			super();
			this.skinName = new DNTGGameRecordItemSkin();
		}

		public createChildren() {
			super.createChildren();
		}

		protected dataChanged() {
			this.updateShow(this.data);
		}

		public updateShow(data: any) {
			if (data) {
				this.timeText.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", data.gameTime);
				if (data.sceneId == 1001) {
					this.gameNameText.text = "大闹天宫";
				} else if (data.sceneId == 1002) {
					this.gameNameText.text = "神雕侠侣";
				} else if (data.sceneId == 1003) {
					this.gameNameText.text = "赤壁之战";
				} else if (data.sceneId == 1004) {
					this.gameNameText.text = "四大美女";
				} else if (data.sceneId == 1005) {
					this.gameNameText.text = "宝石矿工";
				} else if (data.sceneId == 1006) {
					this.gameNameText.text = "热带水果";
				} else if (data.sceneId == 1007) {
					this.gameNameText.text = "暗夜猎手";
				} else if (data.sceneId == 1008) {
					this.gameNameText.text = "格斗之王";
				} else if (data.sceneId == 1009) {
					this.gameNameText.text = "白蛇传说";
				} else if (data.sceneId == 1010) {
					this.gameNameText.text = "嫦娥奔月";
				} else if (data.sceneId == 1011) {
					this.gameNameText.text = "招财锦鲤";
				} else if (data.sceneId == 1012) {
					this.gameNameText.text = "万兽之王";
				} else if (data.sceneId == 1013) {
					this.gameNameText.text = "lucky7";
				} else if (data.sceneId == 1014) {
					this.gameNameText.text = "财神到";
				} else if (data.sceneId == 1015) {
					this.gameNameText.text = "幸运水果";
				} else if (data.sceneId == 1016) {
					this.gameNameText.text = "星尘宝石";
				} else if (data.sceneId == 1017) {
					this.gameNameText.text = "水果武士";
				}else if (data.sceneId == 1018) {
					this.gameNameText.text = "鼠年有喜";
				}
				this.totalWinText.text = data.gainGold + "";
				this.totalBetText.text = data.betNum + "";
				this.idLabel.text = data.roundId + "";
			}

		}
		private fmtDate(obj) {
			var date = new Date(obj * 1000);
			var y = date.getFullYear();
			var m = "0" + (date.getMonth() + 1);
			var d = "0" + date.getDate();
			var h = "0" + date.getHours();
			var mins = "0" + date.getMinutes();
			var sc = "0" + date.getSeconds();
			return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + "\t" + h.substring(h.length - 2, h.length) + ":" + mins.substring(mins.length - 2, mins.length) + ":" + sc.substring(sc.length - 2, sc.length);
		}
	}
}