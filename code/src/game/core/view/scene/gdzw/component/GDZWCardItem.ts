/*
 * @Author: reel MC Lee 
 * @Date: 2019-08-27 16:38:06 
 * @Last Modified by:   reel MC Lee 
 * @Last Modified time: 2019-08-27 16:38:06 
 * @Description: 
 */
module gdzw {
    export class GDZWCardItem extends game.BaseComponent {
        public card: eui.Image;
        public cardAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "GDZWCardSkin";
        }

        public createChildren() {
            super.createChildren();
            this.cardAni = new DBComponent("gdzw_icon_1_cheek");
            this.cardAni.play("", 0);
            this.cardAni.x = 75.5;
            this.cardAni.y = 92.5;
            this.addChild(this.cardAni);
        }

        public removeCardAni(){
            game.UIUtils.removeSelf(this.cardAni);
        }
    }
}