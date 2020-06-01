/*
 * @Author: real MC Lee 
 * @Date: 2019-05-31 16:24:57 
 * @Last Modified by:   real MC Lee 
 * @Last Modified time: 2019-05-31 16:24:57 
 * @Description: 
 */
module sdmn {
    export class SDMNAni extends game.BaseComponent {
        public ani: DBComponent;

        public constructor() {
            super();
            this.skinName = "SDMNAniSkin";
        }

        public createChildren() {
            super.createChildren();
        }
    }
}