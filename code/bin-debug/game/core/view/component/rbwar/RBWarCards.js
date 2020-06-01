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
var rbwar;
(function (rbwar) {
    var RBWarCards = (function (_super) {
        __extends(RBWarCards, _super);
        function RBWarCards() {
            var _this = _super.call(this) || this;
            _this.skinName = new RBWarCardSkin();
            return _this;
        }
        RBWarCards.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RBWarCards.prototype.initWithNum = function (num) {
            this.number = num;
            this.color = Math.floor(num / 100);
            this.value = Math.floor(num % 100);
            this.changeImage();
            this.showB2Z();
        };
        /**
         * 牌面
         */
        RBWarCards.prototype.changeImage = function () {
            this.valueLabel.text = PukerUtils.number2Puker(this.value);
            this.smallColorImg.source = RES.getRes("zjh_big_" + this.color + "_png");
            if (this.value >= 11 && this.value <= 13) {
                if (this.color == 1 || this.color == 3) {
                    this.bigColorImg.source = RES.getRes("zjh_" + this.value + "_1_png");
                }
                else {
                    this.bigColorImg.source = RES.getRes("zjh_" + this.value + "_2_png");
                }
            }
            else {
                this.bigColorImg.source = RES.getRes("zjh_big_" + this.color + "_png");
            }
            if (this.color == 1 || this.color == 3) {
                this.valueLabel.font = "zjh_poker_blcak_fnt";
            }
            else {
                this.valueLabel.font = "zjh_poker_red_fnt";
            }
        };
        /**
         * 背面变正面。
         */
        RBWarCards.prototype.showB2Z = function () {
            this.imageBei.visible = false;
            this.group.visible = true;
        };
        /**
         * 正面变背面。
         */
        RBWarCards.prototype.showZ2B = function () {
            this.imageBei.visible = true;
            this.group.visible = false;
        };
        RBWarCards.prototype.selectDown = function () {
            this.y = 0;
        };
        RBWarCards.prototype.selectUp = function () {
            this.y = -20;
        };
        return RBWarCards;
    }(eui.Component));
    rbwar.RBWarCards = RBWarCards;
    __reflect(RBWarCards.prototype, "rbwar.RBWarCards");
})(rbwar || (rbwar = {}));
