// TypeScript file
module ceby {
    export class CEBYIcon extends CEBYBaseIcon {
        private dbAni: DBComponent;
        public rect: eui.Rect;
        public constructor() {
            super();
            this.skinName = "CEBYIconSkin";
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
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 2:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 3:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84.3;
                    break;
                case 4:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 5:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 6:
                    this.dbComp.x = 99;
                    this.dbComp.y = 78;
                    break;
                case 7:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 8:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 9:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 10:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 11:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;
                case 12:
                    this.dbComp.x = 100.5;
                    this.dbComp.y = 84;
                    break;

            }

        }
        public showRect() {
            if (this.value == 2 && game.CEBYUtils.isScatter) return;
            this.alpha = 0.3;
        }
        public hideRect() {
            this.alpha = 1;
        }
    }
}