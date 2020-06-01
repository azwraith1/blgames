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
 * @Last Modified time: 2018-11-27 11:13:37
 * @Description: 面向玩家手牌
 */
var niuniu;
(function (niuniu) {
    var NiuniuCard = (function (_super) {
        __extends(NiuniuCard, _super);
        function NiuniuCard() {
            var _this = _super.call(this) || this;
            //是否选中
            _this.isSelect = false;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            if (!_this.skinName) {
                _this.skinName = new NiuniuCardSkin1();
            }
            return _this;
        }
        NiuniuCard.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        NiuniuCard.prototype.initWithNum = function (num) {
            this.number = num;
            this.color = Math.floor(num / 100);
            this.value = Math.floor(num % 100);
            this.changeImage();
            this.showB2Z();
        };
        /**
         * 牌面
         */
        NiuniuCard.prototype.changeImage = function () {
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
        NiuniuCard.prototype.showB2Z = function () {
            this.beiImage.visible = false;
            this.zhengGroup.visible = true;
        };
        /**
         * 正面变背面。
         */
        NiuniuCard.prototype.showZ2B = function () {
            this.beiImage.visible = true;
            this.zhengGroup.visible = false;
        };
        //smart
        NiuniuCard.prototype.selectDown = function () {
            this.isSelect = false;
            this.y = 0;
        };
        //smart
        NiuniuCard.prototype.selectUp = function () {
            this.isSelect = true;
            this.y = -20;
        };
        Object.defineProperty(NiuniuCard.prototype, "isSelected", {
            /**卡片选中的状态 */
            get: function () {
                return this.isSelect;
            },
            enumerable: true,
            configurable: true
        });
        return NiuniuCard;
    }(eui.Component));
    niuniu.NiuniuCard = NiuniuCard;
    __reflect(NiuniuCard.prototype, "niuniu.NiuniuCard");
})(niuniu || (niuniu = {}));
