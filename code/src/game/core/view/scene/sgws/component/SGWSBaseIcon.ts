module sgws {
    export class SGWSBaseIcon extends game.BaseSlotIcon {
        public iconKey: string = "sgws";
        protected icon: eui.Image;
        protected rect: eui.Rect;
        public dbName = "sgws_icon_2_guang";
        public scatterLightX = 71;
        public scatterLightY = 75.5;
        public scatterLightY2 = 75.5;

        // /**
        //  * @param  {string} str
        //  * 添加sdxl scatter特效
        //  */
        // public addScatter(str: string) {
        //     this.dbKaung = new DBComponent("ceby_icon_2_kuang");
        //     this.dbKaung.x = this.scatterLightX;
        //     this.dbKaung.y = this.scatterLightY;
        //     this.dbKaung.play("", 1);
        //     this.scatterGuang = new DBComponent(str);
        //     if (str == this.dbName) {
        //         this.icon.visible = false;
        //         this.scatterGuang.callback = () => { this.icon.visible = true; game.UIUtils.removeSelf(this.scatterGuang); };
        //     }
        //     this.scatterGuang.x = this.scatterLightX;
        //     this.scatterGuang.y = this.scatterLightY2;
        //     this.scatterGuang.play("", 1);
        //     this.addChild(this.scatterGuang);
        //     this.addChild(this.dbKaung);            
        // }
        public dbBoom: DBComponent;
        public dbLight: DBComponent;
        public showSdDbComponet() {
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + `icon_${this.value}`);
                if (this.value == 2) {
                    this.dbComp = new DBComponent("sgws_icon_2_boom");
                    this.dbComp.callback = () => {
                        if (this.dbComp) {
                            game.UIUtils.removeSelf(this.dbComp)
                        }
                        egret.setTimeout(() => { this.icon.visible = true }, this, 2000);
                    }
                } else if (this.value == 1) {
                    this.dbComp.callback = () => {
                        if (this.dbComp) {
                            game.UIUtils.removeSelf(this.dbComp)
                        }
                        egret.setTimeout(() => { this.icon.visible = true }, this, 2000);
                    }
                }
                else if (this.value != 1 && this.value != 2) {
                    this.dbComp.callback = () => {
                        if (this.dbComp) {
                            game.UIUtils.removeSelf(this.dbComp)
                        }

                        egret.setTimeout(() => { this.icon.visible = true }, this, 2000);
                    }
                }

                this.icon.visible = false;
                this.changePosition();
                this.dbComp.play("", 1);
                this.addChild(this.dbComp);
            }
        }

        public showDiComp() {
            if (this.value) {
                this.dbLight = new DBComponent("sgws_light");
                this.dbLight.x = 71;
                this.dbLight.y = 75.5;
                this.dbLight.play("", 1);
                this.addChild(this.dbLight);
                this.addChild(this.icon);
            }
        }

        public stopDiCom() {
            game.UIUtils.removeSelf(this.dbLight)
        }

        public showSmashingDB(time) {
            if (this.value) {
                this.dbLight = new DBComponent("sgws_light");
                this.dbLight.x = 71;
                this.dbLight.y = 75.5;
                this.dbLight.play("", time);
                this.addChild(this.dbLight);
                this.addChild(this.icon);
            }
        }


        /**
		 * @param  {string} str
		 * 添加sdxl scatter特效
		 */
        public addScatter(str: string) {
            this.icon.source = "sgws_icon_2_mie_png";
            this.scatterGuang = new DBComponent(str);
            this.icon.visible = false;
            this.scatterGuang.callback = () => { this.icon.visible = true; game.UIUtils.removeSelf(this.scatterGuang); };
            this.scatterGuang.x = 71
            this.scatterGuang.y = 75.5;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        }

        /**
         * @param  {string} str
         * 出现scatter图标亮一下的效果
         */
        public addScatter1(str: string) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 71
            this.scatterGuang.y = 75.5;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        }
    }
}