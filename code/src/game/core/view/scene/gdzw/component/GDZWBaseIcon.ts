/*
 * @Author: real MC Lee 
 * @Date: 2019-07-31 13:49:24 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-08-13 14:16:51
 * @Description: 
 */
module gdzw {
    export class GDZWBaseIcon extends game.BaseSlotIcon {
        protected icon: eui.Image;
        protected rect: eui.Rect;
        public dbName = "gdzw_icon_2_guang";
        public scatterLightX = 75.6;
        public scatterLightY = 97;
        public scatterLightY2 = 92.6;

        protected effectGroup: eui.Group;
        protected value: number;
        public iconKey: string = "gdzw";
        public dbComp: DBComponent;
        public dbKaung: DBComponent;

        /**
       * 展示中奖图标效果，特效
       */
        public showSdDbComponet() {
            // this.cbzzIconBg.play("", 1);
            // this.cbzzIconKuang.play1("", 1);
            if (this.value <= 6) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + `icon_${this.value}`);
                switch (this.value) {
                    case 1:
                        this.dbKaung = new DBComponent("gdzw_icon_1_cheek");
                        break;
                    case 3: case 4: case 5:
                        this.dbKaung = new DBComponent("gdzw_icon_2_cheek");
                        break;
                    case 6:
                        this.dbKaung = new DBComponent("gdzw_icon_3_cheek");
                        break;
                }
                this.dbKaung.x = 75;
                this.dbKaung.y = 92.2;
                this.dbComp.callback = () => {
                    if (this.dbComp) {
                        this.icon.visible = true;
                        game.UIUtils.removeSelf(this.dbComp);
                        this.dbComp = null;
                        game.UIUtils.removeSelf(this.dbKaung);
                        this.dbKaung = null;
                    }
                }
                this.icon.visible = false;
                this.changePosition();
                // this.addChild(this.cbzzIconKuang);
                this.dbComp.play("", 1);
                this.dbKaung.play("", 4);
                this.addChild(this.dbComp);
                this.addChild(this.dbKaung);
            } else {
                this.dbKaung = new DBComponent("gdzw_default");
                this.dbKaung.play("", 2);
                this.dbKaung.callback = () => {
                    game.UIUtils.removeSelf(this.dbKaung);
                    this.dbKaung = null;
                }
                this.dbKaung.x = 75.5;
                this.dbKaung.y = 92.5;
                this.addChild(this.dbKaung);
            }
        }

        public showScatterIcon() {
            this.icon.visible = true;
        }

    }
}