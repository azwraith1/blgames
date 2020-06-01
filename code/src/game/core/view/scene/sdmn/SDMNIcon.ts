/*
 * @Author: real MC Lee 
 * @Date: 2019-05-27 18:44:04 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-28 16:19:37
 * @Description: 
 */
module sdmn {
	export class SDMNIcon extends SDMNBaseIcon {
		private dbAni: DBComponent;
		public rect: eui.Rect;
		public constructor() {
			super();
			this.skinName = new SDMNIconSkin();
		}

		public changeRamdom(min = 1, max = 12) {
			this.changeSouceByValue(Math.floor(_.random(1, 12)));
		}

		public changePosition() {
			switch (this.value) {
				case 1:
					this.dbComp.x = 94;
					this.dbComp.y = 105.5;
					break;
				case 2:
					this.dbComp.x = 94;
					this.dbComp.y = 105.5;
					break;
				case 3:
					this.dbComp.x = 94;
					this.dbComp.y = 105.5;
					break;
				case 4:
					this.dbComp.x = 94;
					this.dbComp.y = 105.5;
					break;
				case 5:
					this.dbComp.x = 94;
					this.dbComp.y = 105.5;
					break;
				case 6:
					this.dbComp.x = 94;
					this.dbComp.y = 105.5;
					break;
				case 7:
					this.dbComp.x = 94;
					this.dbComp.y = 105.5;
					break;
				case 8:
					this.dbComp.x = 94;
					this.dbComp.y = 105.5;
					break;


			}

		}

		public showRect() {
			this.rect.visible = true;
			this.addChild(this.rect);
		}
		public hideRect() {
			this.rect.visible = false;
		}
	}
}