/*
 * @Author: real MC Lee 
 * @Date: 2019-07-31 13:49:24 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-09-10 14:51:19
 * @Description: 
 */
module bscs {
    export class BSCSBaseIcon extends game.BaseSlotIcon {
        public iconKey: string = "bscs";
        protected icon: eui.Image;
        protected rect: eui.Rect;
        public dbName = "bscq_icon_2_guang";
        public scatterLightX = 102;
        public scatterLightY = 81;
        public scatterLightY2 = 81;
    }
}