module baicao {
	export class BaiCaoPattern extends game.BaseUI {
		public patternBg: eui.Image;
		public patternTxt: eui.BitmapLabel;
		public patternImg: eui.Image;
		public constructor() {
			super();
			this.skinName = "BaiCaoPatternSkin";
		}
		/**
		 * 展现分数
		 */
		public showPattern(pattern: number, isWin: number) {
			this.patternBg.source = isWin > 0 ? "baicao_pattern_di_huang_png" : "baicao_paitern_di_hui_png";
			this.patternTxt.font = isWin > 0 ? "baicao_pattern_huang_fnt" : "baicao_pattern_hui_fnt";
			let _patter: number = pattern;
			switch (pattern) {
				case 0:
					this.setPatternImg("baicao_bu_png");
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
					this.patternTxt.visible = true;
					this.patternTxt.text = pattern + "n";
					this.patternImg.visible = false;
					break;
				case 10:
					this.setPatternImg("3n_png");
					break;
				case 11:
					this.setPatternImg("baicao_cao_png");
					break;
			}
		}
		public showSuperBaiCaoPattern(pattern: number, isWin: number) {
			this.patternBg.source = isWin > 0 ? "superbaicao_pattern_di_huang_png" : "superbaicao_paitern_di_hui_png";
			this.patternTxt.font = isWin > 0 ? "superbaicao_pattern_fnt" : "superbaicao_pattern_lose_fnt";
			let _patter: number = pattern;
			switch (pattern) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
					this.setPatternTxt(pattern, "d");//点
					break;
				case 10:
					this.setSpecialPattern("a");//Ảnh（公仔）
					break;
				case 11:
					this.setSpecialPattern("l");//Liêng（顺子）
					break;
				case 12:
					this.setSpecialPattern("s");//Sáp（三张）
					break;
			}
		}
		private setPatternTxt(pattern: number, type: string) {
			this.patternTxt.visible = true;
			this.patternTxt.text = pattern + type;
			this.patternImg.visible = false;
			this.patternTxt.y = 5;
		}
		private setSpecialPattern(type: string) {
			this.patternTxt.visible = true;
			this.patternTxt.text = type;
			this.patternImg.visible = false;
			this.patternTxt.y = 5;
		}
		private setPatternImg(src: string) {
			this.patternTxt.visible = false;
			this.patternImg.visible = true;
			this.patternImg.source = src;
		}
	}
}