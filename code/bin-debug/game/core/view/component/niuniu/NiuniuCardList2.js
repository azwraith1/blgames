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
 * @Last Modified time: 2018-11-22 17:50:01
 * @Description: 自己的手牌
 */
var niuniu;
(function (niuniu) {
    var NiuniuCardList2 = (function (_super) {
        __extends(NiuniuCardList2, _super);
        function NiuniuCardList2() {
            var _this = _super.call(this) || this;
            _this.touchonList = [];
            _this.skinName = new NiuniuCardListSkin2();
            return _this;
        }
        NiuniuCardList2.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.alphaIs0();
            // this.cardAnimation();
        };
        NiuniuCardList2.prototype.renderByList = function (listData) {
            for (var i = 0; i < listData.length; i++) {
                var card = this['card' + i];
                card.initWithNum(listData[i]);
            }
            // this.visible = true;
        };
        NiuniuCardList2.prototype.delTouch = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaped, this);
            for (var i = 0; i < 5; i++) {
                var card = this['card' + i];
                card.selectDown();
            }
        };
        NiuniuCardList2.prototype.addTouch = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaped, this);
        };
        /**
         * 获取手牌是否有牛 如果有牛 是哪些手牌 smart
         */
        NiuniuCardList2.prototype.getYNCards = function () {
            var arr = [this["card0"], this["card1"], this["card2"], this["card3"], this["card4"]];
            for (var i_1 = 0; i_1 < arr.length; ++i_1) {
                arr[i_1].selectDown();
            }
            var ynCardsArr = [];
            var yn = false;
            var temp1;
            var temp2;
            var temp3;
            for (var i = 0; i <= arr.length - 3; i++) {
                for (var j = i + 1; j <= arr.length - 2; j++) {
                    for (var k = j + 1; k <= arr.length - 1; k++) {
                        temp1 = arr[i].value > 10 ? 10 : arr[i].value;
                        temp2 = arr[j].value > 10 ? 10 : arr[j].value;
                        ;
                        temp3 = arr[k].value > 10 ? 10 : arr[k].value;
                        if (yn)
                            continue;
                        if ((temp1 + temp2 + temp3) % 10 == 0) {
                            yn = true;
                            ynCardsArr.push(arr[i], arr[j], arr[k]);
                            arr[i].selectUp();
                            arr[j].selectUp();
                            arr[k].selectUp();
                            break;
                        }
                    }
                }
            }
            CF.dP(ENo.CACULATOR_VALUE, ynCardsArr);
            return { hanveNiu: yn, ynCards: ynCardsArr };
        };
        /**
     * 自己翻牌
     */
        NiuniuCardList2.prototype.turnOutPoker_me = function (card) {
            this.renderByList(card);
            for (var i = 0; i < card.length; i++) {
                var card_1 = this["card" + i];
                card_1.showB2Z();
            }
        };
        /**
         * 发牌动画
         */
        NiuniuCardList2.prototype.cardAnimation = function () {
            this.alphaIs0();
            egret.Tween.get(this.card0).to({ x: 0, y: 0 }, 50).to({ x: 0, y: 0 }, 300);
            egret.Tween.get(this.card1).to({ x: 0, y: 0 }, 50).to({ x: 126, y: 0 }, 300);
            egret.Tween.get(this.card2).to({ x: 0, y: 0 }, 50).to({ x: 252, y: 0 }, 300);
            egret.Tween.get(this.card3).to({ x: 0, y: 0 }, 50).to({ x: 378, y: 0 }, 300);
            egret.Tween.get(this.card4).to({ x: 0, y: 0 }, 50).to({ x: 504, y: 0 }, 300);
        };
        NiuniuCardList2.prototype.alphaIs0 = function () {
            for (var i = 0; i < 5; i++) {
                var card = this["card" + i];
                card.x = 0;
                card.y = 0;
            }
        };
        NiuniuCardList2.prototype.onTouchTaped = function (e) {
            NiuniuUtils.playClick();
            var x = e.localX;
            var y = e.localY;
            var findCard = this.findTouchOn(x, y);
            if (!findCard) {
                return;
            }
            if (this.touchonList.indexOf(findCard) > -1) {
                findCard.selectDown();
                game.Utils.removeArrayItem(this.touchonList, findCard);
            }
            else {
                if (this.touchonList.length < 3) {
                    findCard.selectUp();
                    this.touchonList.push(findCard);
                }
                else {
                    return;
                }
            }
            this.findUnTounchOn();
            CF.dP(ENo.CACULATOR_VALUE, this.touchonList);
        };
        /**查找没有被点击的cards*/
        NiuniuCardList2.prototype.findUnTounchOn = function () {
            var unTouchList = [];
            var sum = 0;
            for (var i = 0; i <= 4; i++) {
                var card = this['card' + i];
                if (!card.isSelected) {
                    unTouchList.push(card);
                }
            }
            if (unTouchList.length == 2) {
                var niuniuCard;
                var value;
                for (var i = 0; i < unTouchList.length; ++i) {
                    niuniuCard = unTouchList[i];
                    value = niuniuCard.value;
                    if (value > 10) {
                        value = 10;
                    }
                    sum += value;
                }
                if (sum > 10) {
                    sum -= 10;
                }
                CF.dP(ENo.CACULATOR_UNTOUCH_VALUE, sum);
            }
        };
        NiuniuCardList2.prototype.findTouchOn = function (x, y) {
            for (var i = 0; i <= 4; i++) {
                var card = this['card' + i];
                var point = new egret.Point(x, y);
                var rectagle = new egret.Rectangle(card.x, card.y, card.width, card.height);
                if (rectagle.containsPoint(point)) {
                    return card;
                }
            }
        };
        return NiuniuCardList2;
    }(game.BaseUI));
    niuniu.NiuniuCardList2 = NiuniuCardList2;
    __reflect(NiuniuCardList2.prototype, "niuniu.NiuniuCardList2");
})(niuniu || (niuniu = {}));
