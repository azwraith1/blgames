module niuniu {
	export class NiuniuRecordPanlHorizon extends NiuniuRecordPanl {
		public constructor(gameId) {
			super(gameId);
			this.skinName = "NiuniusRecordSkinLandScape";
		}
		protected onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			if (e.target == this.closeBtn || e.target == this.rects) {
				this.rects.visible = false;
				CF.sN(PanelNotify.CLOSE_NIUGAMERECORD_HORIZON);
			}
		}
	}
}