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
 * @Last Modified time: 2019-12-02 11:45:04
 * @Description: 面向玩家手牌
 */
var majiang;
(function (majiang) {
    var GDMJMineShoupai = (function (_super) {
        __extends(GDMJMineShoupai, _super);
        function GDMJMineShoupai(value) {
            var _this = _super.call(this) || this;
            //麻将存储数据格式
            _this.value = 0;
            _this.selected = false;
            _this.lock = false;
            _this.touchHeight = 30;
            _this.tingLock = false;
            _this.value = value;
            _this.skinName = new majiang.GDMJMineShoupaiSkin();
            return _this;
        }
        GDMJMineShoupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchEnabled = true;
            this.touchHeight = 30;
            this.initWithData(this.value);
            this.maskRect.mask = this.bgImage;
        };
        GDMJMineShoupai.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeTouch();
        };
        GDMJMineShoupai.prototype.addTouch = function () {
            if (this.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                return;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTap1, this);
        };
        GDMJMineShoupai.prototype.checkIsLaizi = function () {
            this.showOtherImage(this.value);
        };
        GDMJMineShoupai.prototype.removeTouch = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTap1, this);
        };
        GDMJMineShoupai.prototype.setPosition = function (pos) {
            this.index = pos;
        };
        GDMJMineShoupai.prototype.showOtherImage = function (value) {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo) {
                if (roomInfo.baoCards && roomInfo.baoCards.length > 0) {
                    this.otherImage.visible = Global.gameProxy.roomInfo.baoCards[0] == value;
                    return;
                }
                if (roomInfo.gameId == "hbmj") {
                    for (var key in roomInfo.players) {
                        if (!Global.gameProxy.checkIndexIsMe(key)) {
                            var playerData = roomInfo.players[key];
                            var huCards = playerData.canHuCards;
                            if (huCards && huCards.length > 0) {
                                for (var i = 0; i < huCards.length; i++) {
                                    if (value == huCards[i].card) {
                                        this.showPaoImage();
                                        return;
                                    }
                                }
                            }
                        }
                    }
                    this.otherImage.visible = false;
                }
            }
        };
        GDMJMineShoupai.prototype.showPaoImage = function () {
            this.otherImage.source = RES.getRes("hbmj_game_pao_png");
            this.otherImage.x = 41;
            this.otherImage.visible = true;
        };
        GDMJMineShoupai.prototype.isSelect = function () {
            if (this.y == this.touchHeight && this.selected) {
                return true;
            }
            return false;
        };
        GDMJMineShoupai.prototype.showLaiziImage = function () {
            this.otherImage.visible = true;
        };
        GDMJMineShoupai.prototype.hideLaiziImage = function () {
            this.otherImage.visible = false;
        };
        GDMJMineShoupai.prototype.showHuImage = function () {
            this.otherImage.source = RES.getRes("gdmj_tip_hu_png");
            this.otherImage.x = 0;
            this.otherImage.visible = true;
        };
        /**
         * 根据自己传入的显示
         */
        GDMJMineShoupai.prototype.showOtherImageByRes = function (sourceName) {
            this.otherImage.source = RES.getRes(sourceName);
            this.otherImage.visible = true;
        };
        GDMJMineShoupai.prototype.initWithData = function (value) {
            if (value <= 0) {
                this.visible = false;
            }
            this.showOtherImage(value);
            this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
        };
        GDMJMineShoupai.prototype.resetValue = function (value) {
            this.value = value;
            this.otherImage.visible = false;
            if (this.value <= 0) {
                this.colorImage.source = "";
            }
            else {
                this.showOtherImage(value);
                this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
            }
        };
        GDMJMineShoupai.prototype.onTouchTap1 = function (e) {
            majiang.MajiangUtils.playClick();
            if (this.lock) {
                return;
            }
            this.touchOn();
        };
        GDMJMineShoupai.prototype.touchOn = function () {
            CF.dP(ENo.SHOUPAI_TOUCH, this);
        };
        GDMJMineShoupai.prototype.selectUp = function () {
            this.y = this.touchHeight;
            this.selected = true;
        };
        GDMJMineShoupai.prototype.selectDown = function () {
            this.y = this.anchorOffsetY;
            this.selected = false;
        };
        /**
         * 如果选中就放下 ，否者就升起
         */
        GDMJMineShoupai.prototype.selectTouch = function () {
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
        GDMJMineShoupai.prototype.change2NoSelect = function () {
            this.y = this.anchorOffsetY;
            this.selected = false;
        };
        /**
         * 做一个简单地下降动画
         */
        GDMJMineShoupai.prototype.showDownAni = function () {
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
        GDMJMineShoupai.prototype.setLihight = function (isVisible) {
            this.maskRect.visible = isVisible;
        };
        GDMJMineShoupai.prototype.colorIsLight = function (color) {
            if (this.lock) {
                return;
            }
            if (this.tingLock) {
                return;
            }
            var mjColor = Math.floor(this.value / 10);
            this.setLihight(game.Utils.valueEqual(color, mjColor));
        };
        GDMJMineShoupai.prototype.huLight = function () {
            this.maskRect.visible = true;
            this.lock = true;
            this.touchEnabled = false;
        };
        GDMJMineShoupai.prototype.tingLight = function () {
            this.tingLock = true;
            // this.touchEnabled = false;
            this.maskRect.visible = true;
            this.change2NoSelect();
        };
        GDMJMineShoupai.prototype.huUnLight = function () {
            this.maskRect.visible = false;
            this.lock = false;
            this.touchEnabled = true;
        };
        GDMJMineShoupai.prototype.addBirdImage = function () {
            var image = new eui.Image("hnmj_icon_bird1_png");
            this.addChild(image);
            image.width = 77;
            image.height = 26;
            image.x = 1;
            image.y = 85;
        };
        return GDMJMineShoupai;
    }(game.BaseUI));
    majiang.GDMJMineShoupai = GDMJMineShoupai;
    __reflect(GDMJMineShoupai.prototype, "majiang.GDMJMineShoupai");
})(majiang || (majiang = {}));
