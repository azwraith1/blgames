var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Author: li mengchan
 * @Date: 2018-10-24 14:02:31
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-22 17:51:55
 * @Description: 自己的手牌
 */
var sangong;
(function (sangong) {
    var SangongCardList2 = (function (_super) {
        __extends(SangongCardList2, _super);
        function SangongCardList2() {
            var _this = _super.call(this) || this;
            _this.touchonList = [];
            _this.skinName = new SangongCardListSkin2();
            return _this;
        }
        SangongCardList2.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.alphaIs0();
            // this.cardAnimation();
        };
        /**
         * 显示牌的背面
         */
        SangongCardList2.prototype.renderByList1 = function (listData) {
            for (var i = 0; i < listData.length; i++) {
                var card = this['card' + i];
                card.showZ2B();
            }
        };
        SangongCardList2.prototype.renderByList2 = function (num) {
            for (var i = 0; i < num; i++) {
                var card = this['card' + i];
                card.showZ2B();
            }
        };
        SangongCardList2.prototype.renderByList = function (listData, num) {
            for (var i = 0; i < listData.length; i++) {
                var card = this['card' + i];
                card.initWithNum(listData[i]);
                card.showB2Z();
                if (num == 1) {
                }
                else {
                    this.cardAnimation();
                }
            }
        };
        SangongCardList2.prototype.delTouch = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaped, this);
            for (var i = 0; i < 3; i++) {
                var card = this['card' + i];
                card.selectDown();
            }
        };
        SangongCardList2.prototype.addTouch = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaped, this);
        };
        /**
     * 自己翻牌
     */
        SangongCardList2.prototype.turnOutPoker_me = function (card) {
            this.renderByList(card);
            for (var i = 0; i < card.length; i++) {
                var card_1 = this["card" + i];
                card_1.showB2Z();
            }
        };
        /**
         * 发牌动画
         */
        SangongCardList2.prototype.cardAnimation = function () {
            this.alphaIs0();
            egret.Tween.get(this.card0).to({ x: 0, y: 0 }, 50).to({ x: 0, y: 0 }, 300);
            egret.Tween.get(this.card1).to({ x: 0, y: 0 }, 50).to({ x: 140, y: 0 }, 300);
            egret.Tween.get(this.card2).to({ x: 0, y: 0 }, 50).to({ x: 280, y: 0 }, 300);
        };
        SangongCardList2.prototype.alphaIs0 = function () {
            for (var i = 0; i < 3; i++) {
                var card = this["card" + i];
                card.x = 0;
                card.y = 0;
            }
        };
        SangongCardList2.prototype.setRoot = function (root) {
            this.root = root;
        };
        SangongCardList2.prototype.onTouchTaped = function (e) {
            NiuniuUtils.playClick();
            //发送请求选择好了牌	
        };
        return SangongCardList2;
    }(game.BaseUI));
    sangong.SangongCardList2 = SangongCardList2;
    __reflect(SangongCardList2.prototype, "sangong.SangongCardList2");
})(sangong || (sangong = {}));
