
/*
 * @Author: he bing 
 * @Date: 2018-08-13 11:05:43 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-21 18:44:59
 * @Description: 牛牛和三公游戏记录
 */

module niuniu {
	export class NiuniuRecordPanl extends game.BaseComponent {
		public resizeGroup: eui.Group;
		protected rects: eui.Rect;
		public LiuShuiGroup: eui.Group;
		protected closeBtn: eui.Button;
		private tishiyu: eui.Label;
		private gameId: any;
		public constructor(gameId) {
			super();
			this.gameId = gameId;
			this.skinName = new NiuniuRecordSkin();
		}

		protected createChildren() {
			super.createChildren();
			this.init();
		}
		public onRemoved() {
			super.onRemoved();
			CF.rE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
		}
		public onAdded() {
			super.onAdded();
			CF.aE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
		}
		/**
			  * 屏幕旋转
						  * */
		public oritationChange(e: egret.Event) {
			var _data = e.data;
			var currentSceneName: string = PanelNotify.OPEN_NIUGAMERECORD;
			var closeName: string = PanelNotify.CLOSE_NIUGAMERECORD;
			//横屏
			if (_data == "H") {
				CF.sN(closeName);
				CF.sN(currentSceneName + "_HORIZON", { type: this.gameId });
			}
			else {
				CF.sN(closeName + "_HORIZON");
				CF.sN(currentSceneName, { type: this.gameId });
			}
		}
		/**
		 * 初始化赋值
		 */
		private recordData;
		private async init() {
			let data = Global.gameProxy.gameIds[this.gameId];
			if (data) {
				this.gameId = data;
			}
			var handler = ServerPostPath.hall_userHandler_c_getReportInfo;
			let nums = {
				gameId: this.gameId,
				skip: 0,//表示已经获得的条数。
				limit: 10,//每次请求好多条。
			};
			let resp: any = await game.PomeloManager.instance.request(handler, nums);
			this.recordData = resp;
			this.fuZhi(this.gameId);
		}

		private fuZhi(id) {
			this.LiuShuiGroup.removeChildren();
			if (this.recordData.length == 0) {
				this.tishiyu.visible = true;
			} else {
				for (let i = 0; i < this.recordData.length; i++) {
					var items = new NiuniuRecordRenderer(this.recordData[i], id);
					this.LiuShuiGroup.addChild(items);
				}
			}
		}

		protected onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			if (e.target == this.closeBtn || e.target == this.rects) {
				this.rects.visible = false;
				CF.sN(PanelNotify.CLOSE_NIUGAMERECORD);
			}
		}
	}
}