module xyxm {
    export class XYXMBaseIcon extends game.BaseSlotIcon {
        public iconKey: string = "xyxm";
        protected icon: eui.Image;
        protected rect: eui.Rect;
        public dbName = "xyxm_icon2_guang";
        public scatterLightX = 100.5;
        public scatterLightY = 84;
        public scatterLightY2 = 84;

        /**
		 * @param  {string} str
		 * 添加sdxl scatter特效
		 */
        public addScatter(str: string) {
            this.dbKaung = new DBComponent("xyxm_icon_2_kuang");
            this.dbKaung.x = this.scatterLightX;
            this.dbKaung.y = this.scatterLightY;
            this.dbKaung.play("", 1);
            this.scatterGuang = new DBComponent(str);
            if (str == this.dbName) {
                this.icon.visible = false;
                this.scatterGuang.callback = () => { this.icon.visible = true; game.UIUtils.removeSelf(this.scatterGuang); };
            }
            this.scatterGuang.x = this.scatterLightX;
            this.scatterGuang.y = this.scatterLightY2;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
            this.addChild(this.dbKaung);            
        }
    }
}