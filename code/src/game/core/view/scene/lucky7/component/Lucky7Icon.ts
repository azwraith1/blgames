// TypeScript file
module lucky7 {
    export class LUCKY7Icon extends eui.Component {
        public icon: eui.Image;
        public dbComp: DBComponent;
        protected value: number;
        public iconKey = "lucky7";

        public constructor() {
            super();
            this.skinName = new Lucky7IconSkin();
        }

        public createChildren() {
            super.createChildren();
        }

        public changeRamdom(min = 1, max = 3) {
            this.changeSouceByValue(Math.floor(_.random(1, 3)));
        }

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
        * 调整icon动画位置
        */
        protected changePosition() {
            this.dbComp.x = 109;
            this.dbComp.y = 82.5;
        }

        public showRect() {
        }
        public hideRect() {
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
            // if (this.dbKaung) {
            //     game.UIUtils.removeSelf(this.dbKaung);
            // }
            egret.Tween.removeTweens(this.icon);
            this.icon.visible = true;
        }
        /**
         * 动画完成移除
         */
        public stopDbComponet() {
            ObjectPool.cancelPool(this.iconKey + "_" + `icon_${this.value}`);
            // if (this.dbKaung) {
            //     game.UIUtils.removeSelf(this.dbKaung);
            //     this.dbKaung = null;
            // }
            egret.Tween.removeTweens(this.icon);
            this.icon.visible = true;
            game.UIUtils.removeSelf(this.dbComp);
            this.dbComp = null;
        }
    }
}