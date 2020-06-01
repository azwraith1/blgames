// TypeScript file
module snyx {
    export class SNYXIcon extends SNYXBaseIcon {
        private dbAni: DBComponent;
        public rect: eui.Rect;
        public constructor() {
            super();
            this.skinName = "SNYXIconSkin";
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
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 2:
                    this.dbComp.x = 83.1;
                    this.dbComp.y = 76.9;
                    break;
                case 3:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 4:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 5:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 6:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 7:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 8:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 9:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 10:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 11:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 12:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;

            }

        }
        public showRect() {
            this.rect.visible = true;
        }
        public hideRect() {
            this.rect.visible = false;
        }
    }
}