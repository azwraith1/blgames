module majiang {
	export class XZDDGameScene extends XLCHGameScene {
		public pmdKey: string = "mjxzdd";
		/**
		 * 打开游戏界面通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_MJXZDD;

		/**
		 * 关闭游戏界面通知
		 */
		public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_MJXZDD_HALL;

		/**
		 * 关闭当前界面通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_MJXZDD;

		/**
		 * 对应匹配界面通知
		 */
		public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_MJXZDD_MATCHING;


        /**
         * 结算界面
         */
		public GAME_OVER_NOTIFY: string = SceneNotify.OPEN_MJXZDD_OVER;


		public showWanfa() {
			if (this.isLuckeyGame) {
				this.wanfaImage.source = RES.getRes("match_mj_xyjjs_png");
				this.dizhu.text = "报名费:" + Global.gameProxy.roomInfo.entryFeeGold;
				this.dizhu.verticalCenter = 118;
			} else {
				this.wanfaImage.source = RES.getRes("xzdd_hsz_png");
				this.dizhu.text = "底注:" + Global.gameProxy.roomInfo.betBase;
			}
		}

		protected helpBtnTouch() {
			BaseMajiangHelpScene.getInstance(`MajiangHelpSkin`, "mj_help", "xzdd").show();
		}
	}


}
