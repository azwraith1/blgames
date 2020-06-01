module rdsg {
    export class RDSGIcon extends RDSGBaseIcon {
        private dbAni: DBComponent;
        public rect: eui.Rect;
        public constructor() {
            super();
            this.skinName = "RDSGIconSkin";
        }

        public changeRamdom(min = 1, max = 12) {
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        }

        public changePosition() {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 76;
                    this.dbComp.y = 79;
                    break;
                case 2:
                    this.dbComp.x = 76.5;
                    this.dbComp.y = 81.5;
                    break;
                case 3:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 4:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 5:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 6:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 7:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 8:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;


            }

        }

        public showRect(){
        	this.rect.visible = true;
        	this.addChild(this.rect);
        }
        public hideRect(){
        	this.rect.visible = false;
        }
    }
}