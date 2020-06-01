/*
 * @Author: real MC Lee
 * @Date: 2019-06-04 16:24:54
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-12 17:05:35
 * @Description:
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
var bskg;
(function (bskg) {
    var BSKGBaseIcon = (function (_super) {
        __extends(BSKGBaseIcon, _super);
        function BSKGBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "bskg";
            _this.isShowed1 = false;
            _this.isShowed2 = false;
            _this.isShowed3 = false;
            return _this;
        }
        /**
         * 更换图标图案3
         * @param  {} source
         */
        BSKGBaseIcon.prototype.changeSource = function (source) {
            switch (source) {
                case 1:
                case 2:
                    this.showiconHead(source);
                    break;
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    this.showiconShadow(source);
                    break;
                case 9:
                case 10:
                case 11:
                case 12:
                    this.hideIocnRender(source);
                    break;
            }
            this.icon.source = RES.getRes(source);
        };
        /**
         * 更滑图标图案2
         * @param  {} value
         */
        BSKGBaseIcon.prototype.changeSouceByValue = function (value) {
            this.value = value;
            switch (value) {
                case 1:
                case 2:
                    this.showiconHead(value);
                    break;
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    this.showiconShadow(value);
                    break;
                case 9:
                case 10:
                case 11:
                case 12:
                    this.hideIocnRender(value);
                    break;
            }
            this.icon.source = RES.getRes(this.iconKey + "_icon _" + value + "_png");
        };
        /**
         * 更换图标图案
         * @param  {string} iconKey
         * @param  {} value
         */
        BSKGBaseIcon.prototype.changeSourceByNameValue = function (iconKey, value) {
            this.value = value;
            this.iconKey = iconKey;
            switch (value) {
                case 1:
                case 2:
                    this.showiconHead(value);
                    break;
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    this.showiconShadow(value);
                    break;
                case 9:
                case 10:
                case 11:
                case 12:
                    this.hideIocnRender(value);
                    break;
            }
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        /**
         * icon_1,icon_2,展示图标字体
         * @param  {any} source
         */
        BSKGBaseIcon.prototype.showiconHead = function (source) {
            this.iconHead.visible = true;
            this.iconBg.source = RES.getRes("bskg_icon_bg4_png");
            this.iconHead.source = RES.getRes(this.iconKey + "_icon_" + source + "_bg_png");
            this.iconShadow.visible = false;
        };
        /**
         * icon影子
         * @param  {any} value
         */
        BSKGBaseIcon.prototype.showiconShadow = function (value) {
            switch (value) {
                case 3:
                case 4:
                case 5:
                    this.iconBg.source = RES.getRes("bskg_icon_bg3_png");
                    break;
                default:
                    this.iconBg.source = RES.getRes("bskg_icon_bg2_png");
                    break;
            }
            this.iconHead.visible = false;
            this.iconShadow.visible = true;
            this.iconShadow.source = RES.getRes(this.iconKey + "_icon_" + value + "_bg_png");
        };
        /**
         * 关闭所有icon渲染
         * @param  {any} value
         */
        BSKGBaseIcon.prototype.hideIocnRender = function (value) {
            this.iconShadow.visible = this.iconHead.visible = false;
            this.iconBg.source = RES.getRes("bskg_icon_bg1_png");
        };
        BSKGBaseIcon.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            // sdmn图标动画初始化
            this.cbzzIconBg = new DBComponent("bskg_icon_kuang");
            this.cbzzIconKuang = new DBComponent("bskg_icon_di");
            this.cbzzIconKuang2 = new DBComponent("bskg_icon_di2");
            this.cbzzIconKuang3 = new DBComponent("bskg_icon_di3");
            this.cbzzIconBg.x = 84;
            this.cbzzIconBg.y = 75;
            this.cbzzIconKuang3.x = this.cbzzIconKuang2.x = this.cbzzIconKuang.x = 84;
            this.cbzzIconKuang3.y = this.cbzzIconKuang2.y = this.cbzzIconKuang.y = 75;
            this.cbzzIconBg.visible = this.cbzzIconKuang.visible = false;
            this.cbzzIconKuang.callback = function () {
                game.UIUtils.removeSelf(_this.cbzzIconKuang);
                _this.isShowed1 = true;
            };
            this.cbzzIconKuang2.callback = function () {
                game.UIUtils.removeSelf(_this.cbzzIconKuang);
                _this.isShowed2 = true;
            };
            this.cbzzIconKuang3.callback = function () {
                game.UIUtils.removeSelf(_this.cbzzIconKuang);
                _this.isShowed3 = true;
            };
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        BSKGBaseIcon.prototype.addScatter = function (str) {
            this.scatterGuang = new DBComponent(str);
            // if (str == "bskg_icon_2") {
            //     this.scatterGuang.callback = () => { this.icon.visible = false; game.UIUtils.removeSelf(this.scatterGuang); };
            // }
            this.scatterGuang.x = 84;
            this.scatterGuang.y = 75;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * scatterxiaoguo
         * @param  {string} str
         */
        BSKGBaseIcon.prototype.addScatter1 = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 84;
            this.scatterGuang.y = 75;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * icon动画移除
         */
        BSKGBaseIcon.prototype.hideDbComponent = function () {
            if (this.dbComp) {
                this.dbComp.stop();
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            egret.Tween.removeTweens(this.icon);
            this.icon.scaleX = this.icon.scaleY = 1;
            this.icon.visible = true;
        };
        /**
         * 中奖动画添加
         * @param  {number} dir1? 上方特效
         * @param  {number} dir2? 下方特效
         * @param  {number} dir3? 左边特效
         * @param  {number} dir4? 右边特效
         */
        BSKGBaseIcon.prototype.showSdDbComponet = function (dir1, dir2, dir3, dir4) {
            if (this.value) {
                if (this.value != 1 && this.value != 2) {
                    this.iconBg.visible = false;
                    this.cbzzIconBg.visible = true;
                    this.cbzzIconBg.play("", 1);
                    switch (this.value) {
                        case 3:
                        case 4:
                        case 5:
                            if (!this.isShowed3) {
                                this.hierarchy(3);
                                this.cbzzIconKuang3.play("", 1);
                            }
                            this.addChild(this.cbzzIconBg);
                            this.dbCopm1();
                            break;
                        case 6:
                        case 7:
                        case 8:
                            if (!this.isShowed2) {
                                this.cbzzIconKuang2.play("", 1);
                                this.hierarchy(2);
                            }
                            this.addChild(this.cbzzIconBg);
                            this.dbCopm1();
                            break;
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                            if (!this.isShowed1) {
                                this.cbzzIconKuang.play("", 1);
                            }
                            this.hierarchy();
                            break;
                    }
                }
                else {
                    if (this.value == 1) {
                        this.hierarchy();
                        this.dbCopm1();
                    }
                }
            }
        };
        /**
         * 创建图标对应动画
         */
        BSKGBaseIcon.prototype.dbCopm1 = function () {
            var _this = this;
            if (!this.dbComp) {
                this.dbComp = new DBComponent("bskg_" + ("icon_" + this.value));
                this.dbComp.callback = function () {
                    if (_this.dbComp) {
                        _this.dbComp.visible = false;
                        _this.icon.visible = true;
                    }
                };
            }
            else {
                this.dbComp.visible = true;
            }
            this.changePosition();
            this.iconShadow.visible = false;
            this.icon.visible = false;
            this.addChild(this.dbComp);
            this.dbComp.play1("", 1);
        };
        BSKGBaseIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 84;
                    this.dbComp.y = 75;
                    break;
                case 2:
                    this.dbComp.x = 84;
                    this.dbComp.y = 74.5;
                    break;
                case 3:
                    this.dbComp.x = 84;
                    this.dbComp.y = 75;
                    break;
                case 4:
                    this.dbComp.x = 84.5;
                    this.dbComp.y = 75;
                    break;
                case 5:
                    this.dbComp.x = 84;
                    this.dbComp.y = 75;
                    break;
                case 6:
                    this.dbComp.x = 84;
                    this.dbComp.y = 74.5;
                    break;
                case 7:
                    this.dbComp.x = 84;
                    this.dbComp.y = 74.5;
                    break;
                case 8:
                    this.dbComp.x = 84;
                    this.dbComp.y = 74.5;
                    break;
            }
        };
        /**
         * 重新划分层级
         */
        BSKGBaseIcon.prototype.hierarchy = function (index) {
            this.addChild(this.iconBg);
            this.addChild(this.iconShadow);
            this.addChild(this.cbzzIconBg);
            this.addChild(this.icon);
            this.addChild(this.iconHead);
            if (index) {
                this.addChild(this["cbzzIconKuang" + index]);
            }
            else {
                this.addChild(this.cbzzIconKuang);
            }
        };
        /**
         * 图标置灰
         */
        BSKGBaseIcon.prototype.setIconHui = function () {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.icon.filters = [colorFlilter];
        };
        /**
         * 图标置灰还原
         */
        BSKGBaseIcon.prototype.resetIconHui = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.icon.filters = [colorFlilter];
        };
        BSKGBaseIcon.prototype.stopDbComponet = function () {
            egret.Tween.removeTweens(this.icon);
            this.icon.scaleX = this.icon.scaleY = 1;
            this.icon.visible = true;
            if (this.value >= 3 && this.value <= 8) {
                this.iconShadow.visible = true;
            }
            if (this.dbComp) {
                this.dbComp.visible = false;
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            this.stopKuangDB();
        };
        BSKGBaseIcon.prototype.resetIconBg = function () {
            this.iconBg.visible = true;
        };
        BSKGBaseIcon.prototype.stopKuangDB = function () {
            this.cbzzIconBg.visible = false;
            // game.UIUtils.removeSelf(this.cbzzIconBg);
            // game.UIUtils.removeSelf(this.cbzzIconKuang);
        };
        BSKGBaseIcon.prototype.showScatterIcon = function () {
            this.icon.visible = true;
        };
        return BSKGBaseIcon;
    }(eui.Component));
    bskg.BSKGBaseIcon = BSKGBaseIcon;
    __reflect(BSKGBaseIcon.prototype, "bskg.BSKGBaseIcon");
})(bskg || (bskg = {}));
