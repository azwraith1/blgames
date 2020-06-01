module bjle {
	export class BJLPokerMiPaiGroup extends eui.Component {
		public poker0: BJLPokerMiPai;
		public poker1: BJLPokerMiPai;
		public poker2: BJLPokerMiPai;
		private miPaiPlayer: eui.Image;
		// public miPaiPlayer: eui.Label;
		public constructor() {
			super();
			this.skinName = "BJLCardSkinMiPaiGroupSkin";
		}
		public onRemoved() {
			for (let i = 0; i < 3; ++i) {
				(this["poker" + i] as BJLPokerMiPai).removeLisen();
			}
		}
		protected createChildren() {
			super.createChildren();
			this.poker0.id = 0;
			this.poker1.id = 1;
			this.poker2.id = 2;
		}

		/**设置poker得值*/
		public setPokerValue(nums, isZhuang = MIPAI_DIRECTION.ZHUANG_MI) {
			this.poker0.visible = true;
			this.poker1.visible = true;
			this.poker0.reseatPos();
			this.poker1.reseatPos();
			this.setMiPaiDirec(isZhuang);
			this.poker2.visible = false;
			for (let i = 0; i < nums.length; i++) {
				this["poker" + i].initWithNum(nums[i]);
				this["poker" + i].isZhuang = isZhuang;
			}
		}
    //    public resetPos(){
	// 	   this.poker0.reseatPos();
	// 	   this.poker1.reseatPos();
	// 	   this.poker2.reseatPos();
	//    }
		/**
		 * 庄或闲咪牌
		 */
		private setMiPaiDirec(isZhuang: number) {
			let res: string = "bjl_qzmp_png";
			if (isZhuang == MIPAI_DIRECTION.XIAN_MI) res = "bjl_qxmp_png";
			this.miPaiPlayer.source = res;
		}

		/**补牌 */
		public setAddCard(num, isZhuang = MIPAI_DIRECTION.ZHUANG_MI) {
			this.poker0.visible = false;
			this.poker1.visible = false;
			this.poker2.visible = true;
			this.poker2.reseatPos();
			this.poker2.initWithNum(num);
			this.poker2.isZhuang = isZhuang;
		}
	}
}
const MIPAI_DIRECTION = {
	EMPTY: 0,//都不咪
	ZHUANG_MI: 1, //庄咪
	XIAN_MI: 2, //闲咪
};