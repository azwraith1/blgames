/*
 * @Author: he bing
 * @Date: 2018-07-12 14:13:49
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-19 10:45:19
 * @Description: 自家牌碰杠渲染赋值
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
    var MjziPg = (function (_super) {
        __extends(MjziPg, _super);
        function MjziPg(type, color, lgth, pbg) {
            var _this = _super.call(this, type, color, lgth, pbg) || this;
            if (lgth == 1) {
                _this.skinName = new MjziPgSkin();
                _this.times = 1;
            }
            else if (lgth == 2) {
                _this.skinName = new MjziPgSkin2();
                _this.times = 2;
            }
            else if (lgth == 3) {
                _this.skinName = new MjziPgSkin3();
                _this.times = 3;
            }
            else if (lgth == 4) {
                _this.skinName = new MjziPgSkin4();
                _this.times = 4;
            }
            return _this;
        }
        MjziPg.prototype.createChildren = function () {
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
        MjziPg.prototype.resetPGAniPos = function (db) {
            db.x = 80;
            db.y = 55;
        };
        /**
         * 显示第几堆牌
         */
        MjziPg.prototype.showType = function (type, time) {
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
                    this.image1.source = "mine_angang_" + time + "_png";
                    this.image2.source = "mine_angang_" + (time + 1) + "_png";
                    this.image3.source = "mine_angang_" + (time + 2) + "_png";
                    this.showColor_a();
                    break;
            }
        };
        //给碰牌麻将牌的牌面赋值。
        MjziPg.prototype.showColor = function () {
            this.image4.visible = false;
            this.value4.visible = false;
            this.value3.source = "color_value_" + this.color + "_png";
            this.value2.source = "color_value_" + this.color + "_png";
            this.value1.source = "color_value_" + this.color + "_png";
        };
        //给明杠牌麻将牌的牌面赋值。
        MjziPg.prototype.showColor_m = function () {
            this.image4.visible = true;
            this.value4.visible = true;
            this.value3.source = "color_value_" + this.color + "_png";
            //	this.value2.visible = false;
            this.value1.source = "color_value_" + this.color + "_png";
            this.value4.source = "color_value_" + this.color + "_png";
        };
        //碰变杠特有方法
        MjziPg.prototype.showColor_pbg = function () {
            this.image4.visible = true;
            this.value4.visible = true;
            this.value3.source = "color_value_" + this.color + "_png";
            this.value1.source = "color_value_" + this.color + "_png";
            this.value4.source = "color_value_" + this.color + "_png";
        };
        //给暗杠牌麻将牌的牌面赋值。
        MjziPg.prototype.showColor_a = function () {
            this.value4.source = "color_value_" + this.color + "_png";
        };
        /**
         * 杠变碰显动画；
         */
        MjziPg.prototype.dianpaoAni = function () {
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
            mc1.addEventListener(egret.MovieClipEvent.COMPLETE, function () {
                game.UIUtils.removeSelf(mc1);
                // game.MCUtils.reclaim("hu_up1", mc1);
            }, this);
            mc2.addEventListener(egret.MovieClipEvent.COMPLETE, function () {
                game.UIUtils.removeSelf(mc2);
                // game.MCUtils.reclaim("hu_up2", mc2);
            }, this);
            mc1.play(1);
            mc2.play(1);
        };
        return MjziPg;
    }(majiang.BasePGItem));
    majiang.MjziPg = MjziPg;
    __reflect(MjziPg.prototype, "majiang.MjziPg");
})(majiang || (majiang = {}));
