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
var niuniu;
(function (niuniu) {
    var NiuniuCardList1 = (function (_super) {
        __extends(NiuniuCardList1, _super);
        function NiuniuCardList1() {
            return _super.call(this) || this;
            // this.skinName = new NiuniuCardListSkin1();
        }
        NiuniuCardList1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 其他人翻牌
         */
        NiuniuCardList1.prototype.turnOutPoker_others = function () {
        };
        NiuniuCardList1.prototype.renderByList = function (dataOrNum) {
            if (typeof (dataOrNum) != "number") {
                for (var i = 0; i < dataOrNum.length; i++) {
                    var data = dataOrNum[i];
                    var card = this['card' + i];
                    card.initWithNum(data);
                    card.showB2Z();
                    this.cardAnimation();
                }
            }
            else {
                for (var i = 0; i < dataOrNum; i++) {
                    var card = this['card' + i];
                    card.showZ2B();
                }
            }
        };
        /**
         * 发牌动画和展牌动画
         */
        NiuniuCardList1.prototype.cardAnimation = function () {
            this.alphaIs0();
            egret.Tween.get(this.card0).to({ x: 0, y: 0 }, 200);
            egret.Tween.get(this.card1).to({ x: 46, y: 0 }, 200);
            egret.Tween.get(this.card2).to({ x: 92, y: 0 }, 200);
            egret.Tween.get(this.card3).to({ x: 138, y: 0 }, 200);
            egret.Tween.get(this.card4).to({ x: 184, y: 0 }, 200);
        };
        /**
         * 隐藏
         */
        NiuniuCardList1.prototype.alphaIs0 = function () {
            for (var i = 0; i < 5; i++) {
                var card = this["card" + i];
                card.x = 0;
                card.y = 0;
            }
        };
        return NiuniuCardList1;
    }(game.BaseUI));
    niuniu.NiuniuCardList1 = NiuniuCardList1;
    __reflect(NiuniuCardList1.prototype, "niuniu.NiuniuCardList1");
})(niuniu || (niuniu = {}));
