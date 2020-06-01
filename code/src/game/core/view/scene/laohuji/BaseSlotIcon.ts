/*
 * @Author: reel MC Lee 
 * @Date: 2019-09-11 17:08:36 
 * @Last Modified by:   reel MC Lee 
 * @Last Modified time: 2019-09-11 17:08:36 
 * @Description: 
 */
module game {
    export abstract class BaseSlotIcon extends eui.Component {
        protected icon: eui.Image;
        protected rect: eui.Rect;
        protected value: number;
        public dbComp: DBComponent;
        public scatterGuang: DBComponent;
        public dbKaung: DBComponent;

        abstract iconKey: string; //游戏名称
        abstract dbName: string; //icon播放的特效名称
        abstract scatterLightX: number; //scatter特效的X
        abstract scatterLightY: number; //scatter特效的Y
        abstract scatterLightY2: number;//scatter特效闪一下的Y


        /**
         * 更换图标图案3
         * @param  {} source
         */
        public changeSource(source) {

            this.icon.source = RES.getRes(source);
        }
        /**
        * 更滑图标图案2
        * @param  {} value
        */
        public changeSouceByValue(value) {
            this.value = value;

            this.icon.source = RES.getRes(`${this.iconKey}_icon _${value}_png`);
        }
        /**
         * 更换图标图案
         * @param  {string} iconKey
         * @param  {} value
         */
        public changeSourceByNameValue(iconKey: string, value) {
            this.value = value;
            this.iconKey = iconKey;

            this.icon.source = RES.getRes(`${this.iconKey}_icon_${value}_png`);
        }

        /**
		 * @param  {string} str
		 * 添加sdxl scatter特效
		 */
        public addScatter(str: string) {
            this.scatterGuang = new DBComponent(str);
            if (str == this.dbName) {
                this.icon.visible = false;
                this.scatterGuang.callback = () => { this.icon.visible = true; game.UIUtils.removeSelf(this.scatterGuang); };
            }
            this.scatterGuang.x = this.scatterLightX;
            this.scatterGuang.y = this.scatterLightY2;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        }
        /**
         * @param  {string} str
         * 出现scatter图标亮一下的效果
         */
        public addScatter1(str: string) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = this.scatterLightX;
            this.scatterGuang.y = this.scatterLightY;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        }

        /**
         * 关闭所有icon渲染
         * @param  {any} value
         */
        protected showiconKuang(value: any) {
            this.icon.visible = true;
        }


        /**
        * 展示中奖图标效果，特效
        */
        public showSdDbComponet() {
            // this.cbzzIconBg.play("", 1);
            // this.cbzzIconKuang.play1("", 1);
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + `icon_${this.value}`);
                this.dbComp.callback = () => {
                    if (this.dbComp) {
                        this.icon.visible = true;
                        game.UIUtils.removeSelf(this.dbComp)
                    }
                }
                this.icon.visible = false;
                this.changePosition();
                // this.addChild(this.cbzzIconKuang);
                this.dbComp.play("", 1);
                this.addChild(this.dbComp);
            }
        }

        public iconEliminateAni: DBComponent; //图标消除动画

        /**
     * play icon eliminating animation
     */
        public showEliminateCom() {
            if (this.value) {
                this.iconEliminateAni = this.createDbCom(this.iconKey + "_" + `icon_${this.value}+"_eliminate"`);
                this.icon.visible = false;
                this.iconEliminateAni.callback = () => {

                }
                this.iconEliminateAni.play("", 0);
                this.changePosition();
                this.addChild(this.iconEliminateAni);
            }
        }
        /**
        * 调整icon动画位置
        */
        protected changePosition() {
        }

        /**
         * 创建icon动画，对象池控制动画占用内存
         * @param  {} name
         */
        public createDbCom(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name)

            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }

        /**
         * 动画结束隐藏
         */
        public hideDbComponent() {
            if (this.dbComp) {
                this.dbComp.stop();
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            if (this.iconEliminateAni) {
                this.iconEliminateAni.stop();
                game.UIUtils.removeSelf(this.iconEliminateAni);
                this.iconEliminateAni = null;
            }
            if (this.dbKaung) {
                game.UIUtils.removeSelf(this.dbKaung);
            }
            egret.Tween.removeTweens(this.icon);
            this.icon.visible = true;
        }
        /**
         * 动画完成移除
         */
        public stopDbComponet() {
            ObjectPool.cancelPool(this.iconKey + "_" + `icon_${this.value}`);
            ObjectPool.cancelPool(this.iconKey + "_" + `icon_${this.value}+"_eliminate"`);
            if (this.dbKaung) {
                game.UIUtils.removeSelf(this.dbKaung);
                this.dbKaung = null;
            }
            if (this.iconEliminateAni) {
                game.UIUtils.removeSelf(this.iconEliminateAni);
                this.iconEliminateAni = null;
            }
            egret.Tween.removeTweens(this.icon);
            this.icon.visible = true;
            game.UIUtils.removeSelf(this.dbComp);
            this.dbComp = null;
        }

    }
}