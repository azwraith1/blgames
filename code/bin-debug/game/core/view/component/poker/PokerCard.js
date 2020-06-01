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
var PokerCard = (function (_super) {
    __extends(PokerCard, _super);
    function PokerCard(isNew) {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        if (isNew) {
            _this.skinName = new PokerSkin();
        }
        else {
            _this.skinName = "NewPokerSkin";
        }
        return _this;
    }
    PokerCard.prototype.showOtherImage = function (visible) {
        this.otherImage.visible = visible;
    };
    PokerCard.prototype.showMask = function (visible) {
        this.maskImage.visible = visible;
    };
    PokerCard.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    PokerCard.prototype.initWithNum = function (num) {
        this.number = num;
        if (num == 0) {
            this.showZ2B();
        }
        else {
            this.color = Math.floor(num / 100);
            this.value = Math.floor(num % 100);
            this.changeImage();
            this.showB2Z();
        }
    };
    PokerCard.prototype.changeByNumber = function (num) {
        this.number = num;
        this.color = Math.floor(num / 100);
        this.value = Math.floor(num % 100);
        this.changeImage();
    };
    /**
     * 牌面
     */
    PokerCard.prototype.changeImage = function () {
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
    PokerCard.prototype.showB2Z = function () {
        this.beiImage.visible = false;
        this.zhengGroup.visible = true;
    };
    /**
     * 正面变背面。
     */
    PokerCard.prototype.showZ2B = function () {
        this.beiImage.visible = true;
        this.zhengGroup.visible = false;
    };
    PokerCard.prototype.selectDown = function () {
        this.y = 0;
    };
    PokerCard.prototype.selectUp = function () {
        this.y = -20;
    };
    PokerCard.prototype.fanpai = function () {
        var _this = this;
        if (Global.runBack) {
            this.showB2Z();
        }
        var scaleX = this.scaleX;
        egret.Tween.get(this).to({ scaleX: 0 }, 200)
            .call(function () {
            _this.showB2Z();
        }).to({ scaleX: scaleX }, 150);
    };
    return PokerCard;
}(eui.Component));
__reflect(PokerCard.prototype, "PokerCard");
