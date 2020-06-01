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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaCard = (function (_super) {
        __extends(ZajinhuaCard, _super);
        function ZajinhuaCard() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            if (!_this.skinName) {
                _this.skinName = new ZajinhuaCardSkin();
            }
            return _this;
        }
        ZajinhuaCard.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        ZajinhuaCard.prototype.initWithNum = function (num) {
            this.number = num;
            this.color = Math.floor(num / 100);
            this.value = Math.floor(num % 100);
            this.changeImage();
            //this.showB2Z();
        };
        /**
         * 牌面
         */
        ZajinhuaCard.prototype.changeImage = function () {
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
        ZajinhuaCard.prototype.showB2Z = function () {
            this.beiImage.visible = false;
            this.zhengGroup.visible = true;
        };
        /**
         * 正面变背面。
         */
        ZajinhuaCard.prototype.showZ2B = function () {
            this.beiImage.visible = true;
            this.zhengGroup.visible = false;
        };
        ZajinhuaCard.prototype.selectDown = function () {
            this.y = 0;
        };
        ZajinhuaCard.prototype.selectUp = function () {
            this.y = -20;
        };
        ZajinhuaCard.prototype.showMb = function (value) {
            this.poker_m.visible = 1 == value ? false : true;
        };
        return ZajinhuaCard;
    }(eui.Component));
    zajinhua.ZajinhuaCard = ZajinhuaCard;
    __reflect(ZajinhuaCard.prototype, "zajinhua.ZajinhuaCard");
})(zajinhua || (zajinhua = {}));
