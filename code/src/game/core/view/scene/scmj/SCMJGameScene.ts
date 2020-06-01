module majiang {
    export class SCMJGameScene extends XLCHGameScene {
        public pmdKey: string = "mjxlch";
		/**
		 * 打开游戏界面通知
		 */
        public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_SCMJ;

		/**
		 * 关闭游戏界面通知
		 */
        public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_SCMJ_HALL;

		/**
		 * 关闭当前界面通知
		 */
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SCMJ;

		/**
		 * 对应匹配界面通知
		 */
        public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_SCMJ_MATCHING;


        /**
         * 结算界面
         */
        public GAME_OVER_NOTIFY: string = SceneNotify.OPEN_SCMJ_OVER;


        public showWanfa() {
            if (Global.gameProxy.diWen == "mjxlch") {
                this.wanfaImage.source = RES.getRes("xlch_hsz_png");
                this.pmdKey = "mjxlch";
            } else {
                this.wanfaImage.source = RES.getRes("xzdd_hsz_png");
                this.pmdKey = "mjxzdd";
            }
        }
    }


}