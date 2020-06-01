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
var sangong;
(function (sangong) {
    var SangongCardList1 = (function (_super) {
        __extends(SangongCardList1, _super);
        function SangongCardList1() {
            return _super.call(this) || this;
            // this.skinName = new SangongCardListSkin1();
        }
        SangongCardList1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SangongCardList1.prototype.turnOutPoker_others = function () {
        };
        SangongCardList1.prototype.renderByList = function (dataOrNum) {
            if (typeof (dataOrNum) != "number") {
                for (var i = 0; i < dataOrNum.length; i++) {
                    var data = dataOrNum[i];
                    var card = this['card' + i];
                    if (card) {
                        card.initWithNum(data);
                        card.showB2Z();
                        this.cardAnimation();
                    }
                }
            }
            else {
                for (var i = 0; i < dataOrNum; i++) {
                    var card = this['card' + i];
                    if (card) {
                        card.showZ2B();
                    }
                }
            }
        };
        /**
         * 发牌动画和展牌动画
         */
        SangongCardList1.prototype.cardAnimation = function () {
            this.alphaIs0();
            egret.Tween.get(this.card0).to({ x: 0, y: 0 }, 200);
            egret.Tween.get(this.card1).to({ x: 34, y: 0 }, 200);
            egret.Tween.get(this.card2).to({ x: 67, y: 0 }, 200);
        };
        /**
         * 隐藏
         */
        SangongCardList1.prototype.alphaIs0 = function () {
            for (var i = 0; i < 3; i++) {
                var card = this["card" + i];
                card.x = 0;
                card.y = 0;
            }
        };
        return SangongCardList1;
    }(game.BaseUI));
    sangong.SangongCardList1 = SangongCardList1;
    __reflect(SangongCardList1.prototype, "sangong.SangongCardList1");
})(sangong || (sangong = {}));
