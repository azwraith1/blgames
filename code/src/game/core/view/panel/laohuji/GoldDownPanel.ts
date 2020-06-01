/*
 * @Author: wangtao 
 * @Date: 2019-04-12 11:11:18 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-10-12 09:59:53
 * @Description: 
 */
module game {
    export class GoldDownPanel {
        private num;
        private stop_bigWin_rect: eui.Rect;
        private goldPool: Array<any> = [];
        public constructor(num: number) {
            this.num = num;
        }
        protected createChildren() {

            //   this.createGoldPool();
            this.stop_bigWin_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendStopMessage, this);
        }
        /**
         * @param  {} name
         * 创建name名的金币动画
         */
        public static createGold(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.play("", 1);
            gold_big.x = 700;
            gold_big.y = Math.ceil(Math.random() * 200) + 150;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }

        /**
        * @param  {} name
        * 创建name名的金币动画
        */
        public static createZcjlGold(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.play("", 1);
            gold_big.x = Math.ceil(Math.random() * 1280);
            gold_big.y = Math.ceil(Math.random() * 720);
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }

        /**
       * @param  {} name
       * 创建name名的金币动画
       */
        public static createCsdGold(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.play("", 1);
            gold_big.x = 620;
            gold_big.y = 350;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }
        /**
         * @param  {} name
         * 创建name名的金币动画
         */
        public static createLeftGold(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name)
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.play("", 1);
            gold_big.x = 700;
            gold_big.y = Math.ceil(Math.random() * 200) + 150;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }

        public static createsdxlGold(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name)
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.play("", 1);
            gold_big.x = 640;
            gold_big.y = Math.ceil(Math.random() * 200) + 200;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }
        /**
        * @param  {} name
        * 创建name名的金币动画
        */
        public static createsdLeftGold(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name)
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.play("", 1);
            gold_big.x = 640;
            gold_big.y = Math.ceil(Math.random() * 200) + 250;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }
        /**
         * 四大美女bigwin 对象池
         * @param  {} name
         */
        public static createsdxlGold2(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name)
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.play("", 1);
            gold_big.x = 550 + Math.floor(Math.random() * 200);
            gold_big.y = 280;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }

        public static createBskgGold2(name) {
            let gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name)
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = () => {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            }
            gold_big.play("", 1);
            gold_big.x = 525 + Math.floor(Math.random() * 250);
            gold_big.y = 280;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        }

        public sendStopMessage() {
            CF.dP(ENo.LAOHU_GOLD_DOWN);
        }
        //免费游戏bingwin效果
        public static addFreeGameBigwin(num) {
        }
    }
}