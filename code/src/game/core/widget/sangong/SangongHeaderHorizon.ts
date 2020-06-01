module sangong {
	export class SangongHeaderHorizon extends SangongHeader {
		public constructor() {
			super();
			//this.skinName = "resource/skins/widget/sangong/HZMJGameSceneSkin.exml";
			//	D:\MuTouProject\code\resource\skins\widget\sangong
		}
		/**
 * @ smart
 * 抢庄或不抢庄
 */
		public showQZ(index: number, isQiangZhuang: boolean) {
			var resName: string = "sg_bq_png";
			if (isQiangZhuang) {
				resName = "sg_qz_png";
			}
			this.topQZ.visible = true;
			this.topQZ.source = RES.getRes(resName);
		}
		public exchange45(dir) {
			//smart 倍数位置修改
			if (dir == 1) {
			} else if (dir == 2) {
				this.beishuGroup.x = -102;
				this.beishuGroup.y = 33;
				this.beishuLabel.right = 14;
			}
			else if (dir == 3) {
				this.beishuGroup.x = -102;
				this.beishuGroup.y = 70;
				this.beishuLabel.right = 14;
			}
			else if (dir == 4) {
				this.beishuGroup.x = 143;
				this.beishuGroup.y = 70;
				this.beishuLabel.left = 19;
			}
			else if (dir == 5) {
				this.beishuGroup.x = 135;
				this.beishuGroup.y = 33;
				this.beishuLabel.left = 19;
			}
		}
	}
}