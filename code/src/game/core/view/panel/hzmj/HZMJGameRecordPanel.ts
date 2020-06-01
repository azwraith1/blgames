module majiang {
	export class HZMJGameRecordPanel extends game.BaseComponent {
		public resizeGroup: eui.Group;
		private rect: eui.Rect;
		public recordGroup: eui.Group;
		private closeBtn: eui.Button;
		private tishiyu: eui.Label;
		private num: any;
		public constructor() {
			super();
			this.skinName = new DZMJGameRecordSkin();
		}

		protected createChildren() {
			super.createChildren();
			this.init();
		}


		/**
		 * 初始化赋值
		 */
		private async init() {
			let id = "hzmj";
			let data = Global.gameProxy.gameIds[id];
			if (data) {
				id = data;
			}
			var handler = ServerPostPath.hall_userHandler_c_getReportInfo;
			let nums = {
				gameId: id,
				skip: 0,//表示已经获得的条数。
				limit: 10,//每次请求好多条。
			};
			let resp: any = await game.PomeloManager.instance.request(handler, nums);
			this.fuZhi(resp);
		}

		private fuZhi(resp) {
			this.recordGroup.removeChildren();
			if (resp.length == 0) {
				this.tishiyu.visible = true;
			} else {
				for (let i = 0; i < resp.length; i++) {
					/**此处要修改 */
					var items = new dzmj.DZMJGameRecordBar(resp[i]);
					this.recordGroup.addChild(items);
				}
			}
		}

		protected onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			if (e.target == this.closeBtn || e.target == this.rect) {
				this.rect.visible = false;
				CF.sN(PanelNotify.CLOSE_HZMJRECORD);
			}
		}
	}
}