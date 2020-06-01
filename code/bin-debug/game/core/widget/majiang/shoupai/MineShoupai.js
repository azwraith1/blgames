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
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-02 17:50:13
 * @Description: 面向玩家手牌
 */
var majiang;
(function (majiang) {
    var MineShoupai = (function (_super) {
        __extends(MineShoupai, _super);
        function MineShoupai(value) {
            var _this = _super.call(this) || this;
            //麻将存储数据格式
            _this.value = 0;
            _this.selected = false;
            _this.lock = false;
            _this.touchHeight = 30;
            _this.tingLock = false;
            _this.value = value;
            _this.skinName = new majiang.MineShoupaiSkin();
            return _this;
        }
        MineShoupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchEnabled = true;
            this.touchHeight = 30;
            this.initWithData(this.value);
            this.maskRect.mask = this.bgImage;
        };
        MineShoupai.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeTouch();
        };
        MineShoupai.prototype.addTouch = function () {
            if (this.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                return;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTap1, this);
        };
        MineShoupai.prototype.removeTouch = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTap1, this);
        };
        MineShoupai.prototype.setPosition = function (pos) {
            this.index = pos;
        };
        MineShoupai.prototype.initWithData = function (value) {
            if (value == 0) {
                this.visible = false;
            }
            this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
        };
        MineShoupai.prototype.resetValue = function (value) {
            this.value = value;
            if (this.value == 0) {
                this.colorImage.source = "";
            }
            else {
                this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
            }
        };
        MineShoupai.prototype.onTouchTap1 = function (e) {
            majiang.MajiangUtils.playClick();
            if (this.lock) {
                return;
            }
            this.touchOn();
        };
        MineShoupai.prototype.touchOn = function () {
            CF.dP(ENo.SHOUPAI_TOUCH, this);
        };
        MineShoupai.prototype.selectUp = function () {
            this.y = this.touchHeight;
            this.selected = true;
        };
        MineShoupai.prototype.selectDown = function () {
            this.y = this.anchorOffsetY;
            this.selected = false;
        };
        MineShoupai.prototype.isSelect = function () {
            if (this.y == this.touchHeight && this.selected) {
                return true;
            }
            return false;
        };
        /**
         * 如果选中就放下 ，否者就升起
         */
        MineShoupai.prototype.selectTouch = function () {
            if (!this.selected) {
                this.y = this.touchHeight;
                this.selected = true;
            }
            else {
                this.y = this.anchorOffsetY;
                this.selected = false;
            }
            return this.selected;
        };
        MineShoupai.prototype.change2NoSelect = function () {
            this.y = this.anchorOffsetY;
            this.selected = false;
        };
        /**
         * 做一个简单地下降动画
         */
        MineShoupai.prototype.showDownAni = function () {
            var _this = this;
            this.lock = true;
            this.y = 0;
            egret.Tween.get(this).to({
                y: this.anchorOffsetY
            }, 300).call(function () {
                _this.lock = false;
            });
        };
        /**
         * 显示遮罩层
         * @param  {} isVisible
         */
        MineShoupai.prototype.setLihight = function (isVisible) {
            this.maskRect.visible = isVisible;
        };
        MineShoupai.prototype.colorIsLight = function (color) {
            if (this.lock) {
                return;
            }
            if (this.tingLock) {
                return;
            }
            var mjColor = Math.floor(this.value / 10);
            this.setLihight(game.Utils.valueEqual(color, mjColor));
        };
        MineShoupai.prototype.huLight = function () {
            this.maskRect.visible = true;
            this.lock = true;
            this.touchEnabled = false;
        };
        MineShoupai.prototype.tingLight = function () {
            this.tingLock = true;
            // this.touchEnabled = false;
            this.maskRect.visible = true;
            this.change2NoSelect();
        };
        MineShoupai.prototype.huUnLight = function () {
            this.maskRect.visible = false;
            this.lock = false;
            this.touchEnabled = true;
        };
        return MineShoupai;
    }(game.BaseUI));
    majiang.MineShoupai = MineShoupai;
    __reflect(MineShoupai.prototype, "majiang.MineShoupai");
})(majiang || (majiang = {}));
