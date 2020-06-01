// TypeScript file
module gdzw {
    export class GDZWIcon extends GDZWBaseIcon {
        private dbAni: DBComponent;
        public rect: eui.Rect;
        public constructor() {
            super();
            this.skinName = "GDZWGIconSkin";
        }

        public changeRamdom(min = 1, max = 12) {
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        }
        public changePosition() {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 75.2;
                    this.dbComp.y = 91.8;
                    break;
                case 2:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.5;
                    break;
                case 3:
                    this.dbComp.x = 75.1;
                    this.dbComp.y = 92.2;
                    break;
                case 4:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 5:
                    this.dbComp.x = 75.2;
                    this.dbComp.y = 92.3;
                    break;
                case 6:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 7:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 8:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 9:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 10:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 11:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 12:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;

            }

        }
        public showRect() {
            this.rect.visible = true;
            this.addChild(this.rect);
        }
        public hideRect() {
            this.rect.visible = false;
        }
    }
}