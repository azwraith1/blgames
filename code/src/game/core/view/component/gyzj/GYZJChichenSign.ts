module majiang {
	export class GYZJChichenSign extends eui.Component {


		public cfChicken: GYZJSingleSign;
		public zrChicken: GYZJSingleSign;

		public constructor() {
			super();
			this.skinName = "resource/skins/component/gyzj/GYZJChichenSignSkin.exml";
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			//this.cfChicken.initDB();
			this.cfChicken.setChickType(1);
			this.zrChicken.setChickType(2);
			// this.zrChicken.initDB();

		}
		/**冲锋 */
		public setCFChickenVis() {
			this.cfChicken.visible = true;
			this.cfChicken.chickDB("gyzj_chong", () => {
			}, this)
		}
		/**责任*/
		public setZRchichenVis() {
			this.zrChicken.visible = true;
			this.zrChicken.chickDB("gyzj_ze", () => {
			}, this)
		}
		/**1是冲锋鸡 2是责任鸡*/
		public setChickenVisble(type: number) {
			if (this.cfChicken.visible == false) {
				if (type == 1) {
					this.cfChicken.visible = true;
					this.cfChicken.setChickType(type);
					if (type == 1) {
						this.cfChicken.chickDB("gyzj_chong", () => {
						}, this)
					}
					else {
						this.cfChicken.chickDB("gyzj_chong", () => {
						}, this)
					}
				}
				else {
					if (type == 2 && this.zrChicken.visible == false && this.cfChicken.visible==false) {
						this.zrChicken.visible = true;
						this.zrChicken.setChickType(2);
						this.zrChicken.chickDB("gyzj_ze", () => {
						}, this)
					}
					else {
						if (type == 2 && this.zrChicken.visible==true && this.cfChicken.visible==false) {
							this.cfChicken.visible=true;
							this.cfChicken.setChickType(2);
							this.cfChicken.chickDB("gyzj_ze", () => {
							}, this)
						}
					}
				}
			}
			else {
				if (this.cfChicken.visible) {
					this.zrChicken.visible = true;
					this.zrChicken.setChickType(type);
					if (type == 1) {
						this.zrChicken.chickDB("gyzj_ze", () => {
						}, this)
					}
					else {
						this.zrChicken.chickDB("gyzj_ze", () => {
						}, this)
					}
				}
			}
		}

	}
}