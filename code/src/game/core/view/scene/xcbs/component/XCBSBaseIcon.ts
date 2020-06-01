module xcbs {
    export class XCBSBaseIcon extends game.BaseSlotIcon {
        public iconKey: string = "xcbs";
        protected icon: eui.Image;
        protected rect: eui.Rect;
        public dbName = "xcbs_icon2_guang";
        public scatterLightX = 95;
        public scatterLightY = 90;
        public scatterLightY2 = 90;

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
        public showSdDbComponet() {
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + `icon_${this.value}`);
                if (this.value == 2) {
                    if (game.XCBSUtils.isFreeGame) {
                        this.dbComp.callback = () => {
                            if (this.dbComp) {
                                game.UIUtils.removeSelf(this.dbComp)
                            }
                            this.dbBoom = new DBComponent(this.iconKey + "_" + `icon_${this.value}` + "_boom");
                            this.dbBoom.x = 95; this.dbBoom.y = 87;
                            this.dbBoom.play("", 1);
                            this.addChild(this.dbBoom);
                            egret.setTimeout(() => { this.icon.visible = true }, this, 1500);
                        }
                    } else {
                        this.dbComp.callback = () => {
                            if (this.dbComp) {
                                game.UIUtils.removeSelf(this.dbComp)
                            }
                            egret.setTimeout(() => { this.icon.visible = true }, this, 1500);
                        }
                    }
                } else if (this.value == 1) {
                    this.dbComp.callback = () => {
                        if (this.dbComp) {
                            game.UIUtils.removeSelf(this.dbComp)
                        }
                        this.dbBoom = new DBComponent(this.iconKey + "_" + `icon_${this.value}` + "_boom");
                        this.dbBoom.x = 96; this.dbBoom.y = 90.5;
                        this.dbBoom.play("", 1);
                        this.addChild(this.dbBoom);
                        egret.setTimeout(() => { this.icon.visible = true }, this, 1500);
                    }
                }
                else if (this.value != 1 && this.value != 2) {
                    this.dbComp.callback = () => {
                        if (this.dbComp) {
                            game.UIUtils.removeSelf(this.dbComp)
                        }
                        this.dbBoom = new DBComponent(this.iconKey + "_" + `icon_${this.value}` + "_boom");
                        this.dbBoom.x = 95.3; this.dbBoom.y = 90.2;
                        this.dbBoom.play("", 1);
                        this.addChild(this.dbBoom);
                        egret.setTimeout(() => { this.icon.visible = true }, this, 1500);
                    }
                }

                this.icon.visible = false;
                this.changePosition();
                this.dbComp.play("", 1);
                this.addChild(this.dbComp);
            }
        }

        public showSmashingDB(time) {
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + `icon_${this.value}`);
                this.icon.visible = false;
                this.dbComp.play("", time);
                this.addChild(this.dbComp);
                this.changePosition();
                this.dbComp.callback = () => {
                    game.UIUtils.removeSelf(this.dbComp);
                    this.icon.visible = true;
                }
            }
        }


        /**
		 * @param  {string} str
		 * 添加sdxl scatter特效
		 */
        public addScatter(str: string) {
            this.scatterGuang = new DBComponent(str);
            this.icon.visible = false;
            this.scatterGuang.callback = () => { this.icon.visible = true; game.UIUtils.removeSelf(this.scatterGuang); };
            this.scatterGuang.x = 95
            this.scatterGuang.y = 90;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        }

        /**
         * @param  {string} str
         * 出现scatter图标亮一下的效果
         */
        public addScatter1(str: string) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 95;
            this.scatterGuang.y = 90;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        }
    }
}