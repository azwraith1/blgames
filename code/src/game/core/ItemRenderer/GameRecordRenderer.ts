module majiang {
	export class GameRecordRenderer extends game.BaseUI {
		private values;
		private i;
		private paijunumber: eui.Label;
		private room: eui.Label;
		private winOrLose: eui.Label;
		private gametimes: eui.Label;
		private hfbtn: eui.Image;
		public constructor(data, i) {
			super();
			this.values = data;
			this.i = i;
			this.skinName = new GameRecordRendererSkin();
		}

		private async getHFData() {
			let roomId = this.values.roomId;
			let path = ServerPostPath.hall_userHandler_c_getPlaybackInfo;
			let resp: any = await Global.pomelo.request(path, { roomId: roomId });
			if (resp.code) {
				Global.alertMediator.addAlert("信息错误");
				return;
			}
			RotationLoading.instance.load(["majiang_game"], "", () => {
				CF.sN(PanelNotify.CLOSE_GAMERECORD);
				CF.sN(SceneNotify.OPEN_CESI);
			});
		}

		public onTouchTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this.hfbtn:
					egret.Tween.get(this.hfbtn).to({ scaleX: 0.9, scaleY: 0.9 }, 70).to({ scaleX: 1, scaleY: 1 }, 70);
					this.getHFData();
					break;
			}
		}

		protected createChildren(): void {
			super.createChildren();
			this.hfbtn.visible = ServerConfig.PATH_TYPE == PathTypeEnum.NEI_TEST3
			let num = this.values;
			this.paijunumber.text = num["roomId"];
			this.room.text = this.choseField(num["sceneId"]);
			if (num["gainGold"] >= 0) {
				this.winOrLose.text = "+" + num["gainGold"].toFixed(2);
				this.winOrLose.textColor = 0xf43c3c
			} else {
				this.winOrLose.text = num["gainGold"].toFixed(2);
				this.winOrLose.textColor = 0x29ab17
			}
			this.gametimes.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
		}


		private choseField(value) {
			let val = Number(value);
			switch (val) {
				case 1001:
					return "初级场";
				case 1002:
					return "中级场";
				case 1003:
					return "高级场";
				case 1004:
					return "土豪场";
			}
		}
	}
}