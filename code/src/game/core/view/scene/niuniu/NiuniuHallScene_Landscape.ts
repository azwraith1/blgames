module niuniu {
	export class NiuniuHallScene_Landscape extends NiuniuHallScene {
		/**
 * 关闭当前界面的通知
 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_NIUNIUSELECT_LANDSCAPE;
			/**
		 * 记录界面的通知
		 */
		public RECORD_NOTIFY: string = PanelNotify.OPEN_NIUGAMERECORD_HORIZON;

	
		public constructor() {
			super();
			this.skinName = "resource/skins/scene/niuniu/NiuniuHallSceneSkin_LandScape.exml";
		}
		
			/**
		 * 渲染hallScene
		 */
		public showHallBars() {
			this.centerGroup.alpha = 0;
			var nums = Global.gameProxy.gameNums["blnn"];
			let index = 1;
			var item: any;
			let fonts = [0, 0x083831, 0x0b1e3c, 0x472507, 0x762d09, 0x5a0937, 0x440707];
			for (let i in nums) {
				let barConfig = nums[i];
				let bar = this['bar' + index] as NiuNiuHallSceneBar;
				bar.showBarByConfig(barConfig, index, fonts[index]);
				//game.UIUtils.removeSelf(this['yy' + index]);
				bar.visible = barConfig.enable;
				if (index == 6) {
					bar.y += 12;
				}
				index++;

			}
			egret.Tween.get(this.centerGroup).to({
				alpha: 1
			}, 800);
		}
	}
}