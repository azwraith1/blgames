module majiang {
	export class HZMJMineShoupai extends GDMJMineShoupai {
		public constructor(value) {
			super(value);
			/**显示杭州麻将的癞子标示 */
			this.otherImage.source = RES.getRes("hzmj_tip_lai_png");
		}
	}
}