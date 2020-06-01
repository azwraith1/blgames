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
// TypeScript file
var cbzz;
(function (cbzz) {
    var CBZZBaseIcon = (function (_super) {
        __extends(CBZZBaseIcon, _super);
        function CBZZBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "cbzz";
            return _this;
        }
        CBZZBaseIcon.prototype.changeSource = function (source) {
            this.icon.source = RES.getRes(source);
        };
        CBZZBaseIcon.prototype.changeSouceByValue = function (value) {
            this.value = value;
            this.icon.source = RES.getRes(this.iconKey + "_icon _" + value + "_png");
        };
        CBZZBaseIcon.prototype.changeSourceByNameValue = function (iconKey, value) {
            this.value = value;
            this.iconKey = iconKey;
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        CBZZBaseIcon.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            // this.rect.fillAlpha = 0.5;
            // this.rect.visible = false;
            // 神雕图标动画初始化
            this.cbzzIconBg = new DBComponent("cbzz_di");
            this.cbzzIconKuang = new DBComponent("cbzz_kuang");
            // this.cbzzIconkuangBot = new DBComponent("cbzz_kuang_bot");
            // this.cbzzIconKuangLeft = new DBComponent("cbzz_kuang_left");
            // this.cbzzIconKuangRight = new DBComponent("cbzz_kuang_right");
            // this.cbzzIconKuangTop = new DBComponent("cbzz_kuang_top");
            this.cbzzIconBg.x = 94;
            this.cbzzIconBg.y = 89;
            this.cbzzIconKuang.x = 94;
            this.cbzzIconKuang.y = 89;
            // this.cbzzIconKuangTop.x = 89
            // this.cbzzIconkuangBot.x = 89;
            // this.cbzzIconKuangTop.y = 94;
            // this.cbzzIconkuangBot.y = 99;
            // this.cbzzIconKuangLeft.y = 94
            // this.cbzzIconKuangRight.y = 94;
            // this.cbzzIconKuangLeft.x = 84;
            // this.cbzzIconKuangRight.x = 94;
            this.cbzzIconBg.visible = this.cbzzIconKuang.visible = false;
            // this.cbzzIconKuang.visible = this.cbzzIconKuangLeft.visible = this.cbzzIconKuangRight.visible = this.cbzzIconKuangTop.visible = this.cbzzIconkuangBot.visible = false;
            this.cbzzIconBg.callback = function () {
                game.UIUtils.removeSelf(_this.cbzzIconBg);
                // game.UIUtils.removeSelf(this.cbzzIconKuang);
            };
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        CBZZBaseIcon.prototype.addScatter = function (str) {
            var _this = this;
            this.scatterGuang = new DBComponent(str);
            if (str == "sdxl_icon_2") {
                this.icon.visible = false;
                this.scatterGuang.callback = function () { _this.icon.visible = true; game.UIUtils.removeSelf(_this.scatterGuang); };
            }
            this.scatterGuang.x = 94;
            this.scatterGuang.y = 89;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * scaterxiaoguo
         * @param  {string} str
         */
        CBZZBaseIcon.prototype.addScatter1 = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 94;
            this.scatterGuang.y = 89;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        CBZZBaseIcon.prototype.hideDbComponent = function () {
            if (this.dbComp) {
                this.dbComp.stop();
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            egret.Tween.removeTweens(this.icon);
            this.icon.scaleX = this.icon.scaleY = 1;
            this.icon.visible = true;
        };
        CBZZBaseIcon.prototype.clearIcon = function () {
            this.removeChildren();
        };
        /**
         * 中奖动画添加
         * @param  {number} dir1? 上方特效
         * @param  {number} dir2? 下方特效
         * @param  {number} dir3? 左边特效
         * @param  {number} dir4? 右边特效
         */
        CBZZBaseIcon.prototype.showSdDbComponet = function (dir1, dir2, dir3, dir4) {
            var _this = this;
            this.addChild(this.cbzzIconKuang);
            // if (dir1) {
            //     this.cbzzIconKuangTop.play("", 0);
            //     this.addChild(this.cbzzIconKuangTop)
            // }
            // if (dir2) {
            //     this.cbzzIconkuangBot.play("", 1);
            //     this.addChild(this.cbzzIconkuangBot)
            // } if (dir3) {
            //     this.cbzzIconKuangLeft.play("", 1);
            //     this.addChild(this.cbzzIconKuangLeft)
            // } if (dir4) {
            //     this.cbzzIconKuangRight.play("", 1);
            //     this.addChild(this.cbzzIconKuangRight)
            // }
            this.addChild(this.icon);
            this.cbzzIconBg.play("", 1);
            this.cbzzIconKuang.play1("", 1);
            if (this.value <= 8) {
                if (!this.dbComp) {
                    this.dbComp = new DBComponent("cbzz_" + ("icon_" + this.value));
                    this.dbComp.callback = function () {
                        if (_this.dbComp) {
                            _this.dbComp.visible = false;
                            _this.icon.visible = true;
                        }
                    };
                    this.dbComp.x = 94;
                    this.dbComp.y = 89;
                }
                else {
                    this.dbComp.visible = true;
                }
                this.icon.visible = false;
                this.addChild(this.dbComp);
                this.addChild(this.cbzzIconBg);
                // this.addChild(this.sdxlIconKuang);
                // this.addChild(this.icon);
                this.dbComp.play1("", 1);
            }
            else {
                this.addChild(this.cbzzIconKuang);
                this.addChild(this.iconbg);
                this.addChild(this.cbzzIconBg);
                this.addChild(this.icon);
                this.icon.visible = true;
            }
        };
        /**
         * 图标置灰
         */
        CBZZBaseIcon.prototype.setIconHui = function () {
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
        CBZZBaseIcon.prototype.resetIconHui = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.icon.filters = [colorFlilter];
        };
        CBZZBaseIcon.prototype.stopDbComponet = function () {
            egret.Tween.removeTweens(this.icon);
            this.icon.scaleX = this.icon.scaleY = 1;
            this.icon.visible = true;
            if (this.dbComp) {
                this.dbComp.visible = false;
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            this.stopKuangDB();
        };
        CBZZBaseIcon.prototype.stopKuangDB = function () {
            game.UIUtils.removeSelf(this.cbzzIconBg);
            game.UIUtils.removeSelf(this.cbzzIconKuang);
            // game.UIUtils.removeSelf(this.cbzzIconKuangLeft);
            // game.UIUtils.removeSelf(this.cbzzIconKuangRight);
            // game.UIUtils.removeSelf(this.cbzzIconKuangTop);
            // game.UIUtils.removeSelf(this.cbzzIconkuangBot);
        };
        return CBZZBaseIcon;
    }(eui.Component));
    cbzz.CBZZBaseIcon = CBZZBaseIcon;
    __reflect(CBZZBaseIcon.prototype, "cbzz.CBZZBaseIcon");
})(cbzz || (cbzz = {}));
