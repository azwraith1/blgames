/*
 * @Author: real MC Lee 
 * @Date: 2019-06-04 16:24:50 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-12 17:27:33
 * @Description: 
 */
module bskg {
    export class BSKGIcon extends BSKGBaseIcon {
        public iconBg: eui.Image;
        public rect: eui.Rect;
        public iconShadow: eui.Image;
        public icon: eui.Image;
        public iconHead: eui.Image;
        public effectGroup:eui.Group;
        private dbAni: DBComponent;
        public constructor() {
            super();
            this.skinName = "BSKGIconSkin";
        }
        public changeRamdom(min = 1, max = 12) {
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
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