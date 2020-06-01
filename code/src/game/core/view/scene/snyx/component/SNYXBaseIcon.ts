module snyx {
    export class SNYXBaseIcon extends game.BaseSlotIcon {
        public iconKey: string = "snyx";
        protected icon: eui.Image;
        protected rect: eui.Rect;
        public kuang: eui.Image;
        public dbName = "snyx_icon_2_guang";
        public scatterLightX = 85;
        public scatterLightY = 77.5;
        public scatterLightY2 = 77.5;

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
                // this.dbBoom = new DBComponent("snyx_default");
                // this.dbBoom.x = 84; this.dbBoom.y = 74.5;
                this.dbComp.callback = () => {
                    if (this.dbComp) {
                        // game.UIUtils.removeSelf(this.dbComp);
                        game.UIUtils.removeSelf(this.dbBoom);
                        this.icon.visible = true;
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
                this.dbLight.x = 85;
                this.dbLight.y = 77.5;
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
                this.dbLight.x = 85;
                this.dbLight.y = 77.5;
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
            // this.icon.source = "sgws_icon_2_mie_png";
            this.scatterGuang = new DBComponent(str);
            // this.icon.visible = false;
            this.scatterGuang.callback = () => {
                // this.icon.visible = true;
                game.UIUtils.removeSelf(this.scatterGuang);
            };
            this.scatterGuang.x = 83.1;
            this.scatterGuang.y = 76.9;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        }

        /**
         * @param  {string} str
         * 出现scatter图标亮一下的效果
         */
        public addScatter1(str: string) {
            // this.icon.visible = false;
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 84;
            this.scatterGuang.y = 77.5;
            this.scatterGuang.play("", 1);
            this.scatterGuang.callback = () => {
                // this.icon.visible = true;
                game.UIUtils.removeSelf(this.scatterGuang);
            }
            this.addChild(this.scatterGuang);
        }

    }
}