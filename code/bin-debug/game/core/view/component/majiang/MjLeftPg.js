/*
 * @Author: he bing
 * @Date: 2018-07-12 14:13:42
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-19 10:43:08
 * @Description: 左边杠牌。
 */
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
var majiang;
(function (majiang) {
    var MjLeftPg = (function (_super) {
        __extends(MjLeftPg, _super);
        function MjLeftPg(type, color, lgth, pbg) {
            var _this = _super.call(this, type, color, lgth, pbg) || this;
            _this.nuberTime = []; //传了几个不同的花色。最多4种
            if (lgth == 1) {
                _this.skinName = new MjLeftPgSkin();
                _this.times = 1;
            }
            else if (lgth == 2) {
                _this.skinName = new MjLeftPgSkin2();
                _this.times = 2;
            }
            else if (lgth == 3) {
                _this.skinName = new MjLeftPgSkin3();
                _this.times = 3;
            }
            else if (lgth == 4) {
                _this.skinName = new MjLeftPgSkin4();
                _this.times = 4;
            }
            return _this;
        }
        MjLeftPg.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.rectGroup.visible = false;
            switch (this.times) {
                case 1:
                    this.showType(this.type, 1);
                    break;
                case 2:
                    this.showType(this.type, 4);
                    break;
                case 3:
                    this.showType(this.type, 7);
                    break;
                case 4:
                    this.showType(this.type, 10);
                    break;
            }
        };
        MjLeftPg.prototype.resetPGAniPos = function (db) {
            db.x = 55;
            db.y = 55;
        };
        /**
         * 显示第几堆牌
         */
        MjLeftPg.prototype.showType = function (type, time) {
            _super.prototype.showType.call(this, type, time);
            switch (this.type) {
                case 5://碰
                    this.showColor();
                    break;
                case 3:
                case 1://明杠
                    this.showColor_m();
                    break;
                case 2:
                case 4:
                    this.image3.source = "left_angang_" + time + "_png";
                    this.image2.source = "left_angang_" + (time + 1) + "_png";
                    this.image1.source = "left_angang_" + (time + 2) + "_png";
                    this.showColor_a();
                    break;
            }
        };
        //给碰牌麻将牌的牌面赋值。
        MjLeftPg.prototype.showColor = function () {
            this.image4.visible = false;
            this.value4.visible = false;
            this.value3.source = "color_value_" + this.color + "_png";
            this.value2.source = "color_value_" + this.color + "_png";
            this.value1.source = "color_value_" + this.color + "_png";
        };
        //给明杠牌麻将牌的牌面赋值。
        MjLeftPg.prototype.showColor_m = function () {
            this.value3.source = "color_value_" + this.color + "_png";
            this.value1.source = "color_value_" + this.color + "_png";
            this.value4.source = "color_value_" + this.color + "_png";
        };
        //碰变杠
        MjLeftPg.prototype.showColor_pbg = function () {
            this.image4.visible = true;
            this.value4.visible = true;
            this.value3.source = "color_value_" + this.color + "_png";
            this.value1.source = "color_value_" + this.color + "_png";
            this.value4.source = "color_value_" + this.color + "_png";
        };
        //给暗杠牌麻将牌的牌面赋值。
        MjLeftPg.prototype.showColor_a = function () {
            this.value4.source = "color_value_" + this.color + "_png";
        };
        /**
         * 杠变碰显动画；
        */
        MjLeftPg.prototype.dianpaoAni = function () {
            var _this = this;
            var mc1 = game.MCUtils.getMc("hu_up1");
            var mc2 = game.MCUtils.getMc("hu_up2");
            this.addChild(mc2);
            this.addChild(mc1);
            mc2.scaleX = mc2.scaleX = 1.5;
            mc2.x = this.width / 2;
            mc2.y = this.height / 2;
            mc1.scaleX = mc1.scaleY = 1.5;
            mc1.x = this.width / 2;
            mc1.y = this.height / 2 - 20;
            var mcCallback1 = function () {
                mc1.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback1, _this);
                game.UIUtils.removeSelf(mc1);
            };
            mc1.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback1, this);
            var mcCallback2 = function () {
                mc2.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback2, _this);
                game.UIUtils.removeSelf(mc2);
            };
            mc2.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback2, this);
            mc1.play(1);
            mc2.play(1);
        };
        return MjLeftPg;
    }(majiang.BasePGItem));
    majiang.MjLeftPg = MjLeftPg;
    __reflect(MjLeftPg.prototype, "majiang.MjLeftPg");
})(majiang || (majiang = {}));
