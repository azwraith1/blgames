/*
 * @Author: reel MC Lee 
 * @Date: 2019-09-11 17:16:16 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-09-11 17:18:22
 * @Description: 
 */
module bscs {
    export class BSCSIcon extends BSCSBaseIcon {
        private dbAni: DBComponent;
        public rect: eui.Rect;
        public constructor() {
            super();
            this.skinName = "BSCSIconSkin";
        }

        public changeRamdom(min = 1, max = 12) {
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        }
        /**
         * 白蛇传说游戏icon特效位置调整
         */
        public changePosition() {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 2:
                    this.dbComp.x = 101.6;
                    this.dbComp.y = 81;
                    break;
                case 3:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 4:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 5:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 6:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 7:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 8:
                    this.dbComp.x = 101.5;
                    this.dbComp.y = 80.6;
                    break;
                case 9:
                    this.dbComp.x = 101.5;
                    this.dbComp.y = 80.6;
                    break;
                case 10:
                    this.dbComp.x = 101.5;
                    this.dbComp.y = 81;
                    break;
                case 11:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81.1;
                    break;
                case 12:
                    this.dbComp.x = 101.5;
                    this.dbComp.y = 80.6;
                    break;

            }

        }
        public showRect() {
            this.rect.visible = true;
            this.addChild(this.rect);
        }
        public hideRect() {
            if (this.icon.source == "bscs_icon_2") return;
            this.rect.visible = false;
        }
    }
}