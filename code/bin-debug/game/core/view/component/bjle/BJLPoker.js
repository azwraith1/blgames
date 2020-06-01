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
var bjle;
(function (bjle) {
    var BJLPoker = (function (_super) {
        __extends(BJLPoker, _super);
        function BJLPoker() {
            var _this = _super.call(this) || this;
            /**是否是正面*/
            _this.isZheng = false;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            if (!_this.skinName) {
                _this.skinName = new BJLCardSkin();
            }
            return _this;
        }
        BJLPoker.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BJLPoker.prototype.initWithNum = function (num) {
            this.number = num;
            this.color = Math.floor(num / 100);
            this.value = Math.floor(num % 100);
            this.changeImage();
            //this.showB2Z();
        };
        /**
         * 牌面
         */
        BJLPoker.prototype.changeImage = function () {
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
        BJLPoker.prototype.showB2Z = function () {
            this.beiImage.visible = false;
            this.zhengGroup.visible = true;
            this.isZheng = true;
        };
        /**
         * 正面变背面。
         */
        BJLPoker.prototype.showZ2B = function () {
            this.beiImage.visible = true;
            this.zhengGroup.visible = false;
            this.isZheng = false;
        };
        Object.defineProperty(BJLPoker.prototype, "isZhengPoker", {
            get: function () {
                if (this)
                    return this.isZheng;
            },
            enumerable: true,
            configurable: true
        });
        BJLPoker.prototype.selectDown = function () {
            this.y = 0;
        };
        BJLPoker.prototype.selectUp = function () {
            this.y = -20;
        };
        BJLPoker.prototype.pokerScaleAni = function () {
            var _this = this;
            if (Global.runBack) {
                this.showB2Z();
            }
            egret.Tween.get(this).to({ scaleX: 0 }, 200).call(function () {
                _this.showB2Z();
            }).to({ scaleX: 0.6 }, 150);
        };
        return BJLPoker;
    }(eui.Component));
    bjle.BJLPoker = BJLPoker;
    __reflect(BJLPoker.prototype, "bjle.BJLPoker");
})(bjle || (bjle = {}));
