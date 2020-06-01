/*
 * @Author: real MC Lee 
 * @Date: 2019-07-31 13:49:24 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-31 18:49:16
 * @Description: 
 */
module ayls {
    export class AYLSBaseIcon extends game.BaseSlotIcon {
        protected icon: eui.Image;
        protected rect: eui.Rect;
        public dbName = "ayls_icon_2_guang";
        public scatterLightX = 85.5;
        public scatterLightY = 71.5;
        public scatterLightY2 = 71.5;

        protected effectGroup: eui.Group;
        protected value: number;
        public iconKey: string = "ayls";
        public dbComp: DBComponent;

    }
}