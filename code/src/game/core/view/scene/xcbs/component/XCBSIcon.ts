module xcbs {
    export class XCBSIcon extends XCBSBaseIcon {
        private dbAni: DBComponent;
        public rect: eui.Rect;
        public constructor() {
            super();
            this.skinName = "XCBSIconSkin";
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
                    this.dbComp.x = 96;
                    this.dbComp.y = 90.5;
                    break;
                case 2:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 3:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 4:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 5:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 6:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 7:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 8:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 9:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 10:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 11:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;
                case 12:
                    this.dbComp.x = 95;
                    this.dbComp.y = 90;
                    break;

            }

        }
        public showRect() {
            this.visible = true;
        }
        public hideRect() {
            this.visible = false;
        }
    }
}