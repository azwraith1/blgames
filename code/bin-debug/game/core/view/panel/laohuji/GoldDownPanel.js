var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: wangtao
 * @Date: 2019-04-12 11:11:18
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-10-12 09:59:53
 * @Description:
 */
var game;
(function (game) {
    var GoldDownPanel = (function () {
        function GoldDownPanel(num) {
            this.goldPool = [];
            this.num = num;
        }
        GoldDownPanel.prototype.createChildren = function () {
            //   this.createGoldPool();
            this.stop_bigWin_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendStopMessage, this);
        };
        /**
         * @param  {} name
         * 创建name名的金币动画
         */
        GoldDownPanel.createGold = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.play("", 1);
            gold_big.x = 700;
            gold_big.y = Math.ceil(Math.random() * 200) + 150;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        /**
        * @param  {} name
        * 创建name名的金币动画
        */
        GoldDownPanel.createZcjlGold = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.play("", 1);
            gold_big.x = Math.ceil(Math.random() * 1280);
            gold_big.y = Math.ceil(Math.random() * 720);
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        /**
       * @param  {} name
       * 创建name名的金币动画
       */
        GoldDownPanel.createCsdGold = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.play("", 1);
            gold_big.x = 620;
            gold_big.y = 350;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        /**
         * @param  {} name
         * 创建name名的金币动画
         */
        GoldDownPanel.createLeftGold = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.play("", 1);
            gold_big.x = 700;
            gold_big.y = Math.ceil(Math.random() * 200) + 150;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        GoldDownPanel.createsdxlGold = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.play("", 1);
            gold_big.x = 640;
            gold_big.y = Math.ceil(Math.random() * 200) + 200;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        /**
        * @param  {} name
        * 创建name名的金币动画
        */
        GoldDownPanel.createsdLeftGold = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.play("", 1);
            gold_big.x = 640;
            gold_big.y = Math.ceil(Math.random() * 200) + 250;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        /**
         * 四大美女bigwin 对象池
         * @param  {} name
         */
        GoldDownPanel.createsdxlGold2 = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.play("", 1);
            gold_big.x = 550 + Math.floor(Math.random() * 200);
            gold_big.y = 280;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        GoldDownPanel.createBskgGold2 = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.play("", 1);
            gold_big.x = 525 + Math.floor(Math.random() * 250);
            gold_big.y = 280;
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        GoldDownPanel.prototype.sendStopMessage = function () {
            CF.dP(ENo.LAOHU_GOLD_DOWN);
        };
        //免费游戏bingwin效果
        GoldDownPanel.addFreeGameBigwin = function (num) {
        };
        return GoldDownPanel;
    }());
    game.GoldDownPanel = GoldDownPanel;
    __reflect(GoldDownPanel.prototype, "game.GoldDownPanel");
})(game || (game = {}));
