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
 * @Author: Li MengChan
 * @Date: 2018-06-28 10:10:59
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-22 15:34:08
 * @Description: 面向玩家手牌
 */
var sangong;
(function (sangong) {
    var SangongCard = (function (_super) {
        __extends(SangongCard, _super);
        function SangongCard() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            if (!_this.skinName) {
                _this.skinName = new SangongCardSkin1();
            }
            return _this;
        }
        SangongCard.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SangongCard.prototype.initWithNum = function (num) {
            this.number = num;
            this.color = Math.floor(num / 100);
            this.value = Math.floor(num % 100);
            this.changeImage();
            //this.showB2Z();
        };
        /**
         * 牌面
         */
        SangongCard.prototype.changeImage = function () {
            this.valueLabel.text = PukerUtils.number2Puker(this.value);
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
            this.smallColorImg.source = RES.getRes("zjh_big_" + this.color + "_png");
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
        SangongCard.prototype.showB2Z = function () {
            this.beiImage.visible = false;
            this.zhengGroup.visible = true;
        };
        /**
         * 正面变背面。
         */
        SangongCard.prototype.showZ2B = function () {
            this.beiImage.visible = true;
            this.zhengGroup.visible = false;
        };
        SangongCard.prototype.selectDown = function () {
            this.y = 0;
        };
        SangongCard.prototype.selectUp = function () {
            this.y = -20;
        };
        return SangongCard;
    }(eui.Component));
    sangong.SangongCard = SangongCard;
    __reflect(SangongCard.prototype, "sangong.SangongCard");
})(sangong || (sangong = {}));
