module baicao {
	export class BaiCaoTimebar extends rbwar.RBWarTimebar {
		private progressBar: eui.Image;
		private progressMaxWidth: number = 172;
		private progressBarMask: eui.Rect;
		public constructor() {
			super();
		}
		public createChildren() {
			super.createChildren();
			this.progressBar.mask = this.progressBarMask;
		}
		public reseateMask() {
			this.progressBarMask.width = 172;
			this.visible = false;
		}
		public restartTime() {
			this.progressBarMask.width = 172;
			this.visible = true;
		}
		public update(dt: number) {
			if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
				let endTime = Global.roomProxy.roomInfo.countdown.end;
				let startTime = game.DateTimeManager.instance.now;
				let start = Global.roomProxy.roomInfo.countdown.s;
				if (!start) {
					start = Global.roomProxy.roomInfo.countdown.end - Global.roomProxy.roomInfo.countdown.start;
				}
				let cha = endTime - startTime;
				let value = cha / start;
				if (cha <= 0) {
					this.timeLabel.text = "00";
					return;
				}
				this.timeLabel.text = NumberFormat.getNNTimeStr(cha);
				this.progressBarMask.width = 172 * value;
				this.progressBar.mask = this.progressBarMask;
			}
		}
	}
}