module majiang {
	export class GYZJFanPai extends eui.Component {

		public cardFront: eui.Group;
		public bgImage1: eui.Image;
		public bgImage: eui.Image;
		public colorImage: eui.Image;
		public colorImageback: eui.Image;
		public cardBack: eui.Group;
		public fanPaiGroup: eui.Group;

		public constructor(value: number, paiNum: number) {
			super();
			this.skinName = "resource/skins/component/gyzj/GYZJFanPai.exml";
		}

		/**牌的值设定 */
		public setCardVal(val: number) {
			this.colorImage.source = RES.getRes("color_value_" + val + "_png");
		}

		/**牌的值设定 */
		public setBackCardVal(val: number) {
			this.colorImageback.source = RES.getRes("color_value_" + val + "_png");
		}

		/**
		*翻牌的一个动画
		* @param  {eui.Component} penggang
		* @param  {} x
		* @param  {} y
		*/
		public fanPaiDB(fancard: number, chickeCard: number) {
			this.cardBack.visible=true;
			this.setBackCardVal(fancard);
			egret.setTimeout(() => {
				this.cardBack.visible=false;
				let db = new DBComponent("mj_turn");
				db.callback = () => {
					// if (afterfinish) afterfinish.call(thisobj);
					game.UIUtils.removeSelf(db)
					db = null;
					this.cardBack.visible=true;
					this.setBackCardVal(chickeCard);
				};
				this.fanPaiGroup.addChild(db);
				db.playByFilename(1);
			}, this, 500);
		}
	}
}