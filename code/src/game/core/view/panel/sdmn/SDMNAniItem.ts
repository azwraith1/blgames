module sdmn {
    export class SDMNAniItem extends game.BaseComponent {
        public ani1: sdmn.SDMNAni;
        public ani2: sdmn.SDMNAni;
        public ani3: sdmn.SDMNAni;

        public constructor() {
            super();
            this.skinName = "SDMNAniItemSkin";
        }

        public createChildren() {
            super.createChildren();
        }

    }
}