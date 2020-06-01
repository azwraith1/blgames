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
var sdxl;
(function (sdxl) {
    var SDXLBaseIcon = (function (_super) {
        __extends(SDXLBaseIcon, _super);
        function SDXLBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "sdxl";
            return _this;
        }
        SDXLBaseIcon.prototype.changeSource = function (source) {
            this.icon.source = RES.getRes(source);
        };
        SDXLBaseIcon.prototype.changeSouceByValue = function (value) {
            this.value = value;
            this.icon.source = RES.getRes(this.iconKey + "_icon _" + value + "_png");
        };
        SDXLBaseIcon.prototype.changeSourceByNameValue = function (iconKey, value) {
            this.value = value;
            this.iconKey = iconKey;
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        SDXLBaseIcon.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            this.rect.fillAlpha = 0.5;
            this.rect.visible = false;
            // 神雕图标动画初始化
            this.sdxlIconBg = new DBComponent("sdxl_icon_di");
            this.sdxlIconKuang = new DBComponent("sdxl_kuang");
            this.sdxlIconBg.x = this.sdxlIconKuang.x = 93;
            this.sdxlIconBg.y = this.sdxlIconKuang.y = 89;
            this.sdxlIconBg.visible = false;
            this.sdxlIconKuang.visible = false;
            this.sdxlIconBg.callback = function () {
                game.UIUtils.removeSelf(_this.sdxlIconBg);
                game.UIUtils.removeSelf(_this.sdxlIconKuang);
            };
            this.sdxlIconKuang.callback = function () {
            };
        };
        SDXLBaseIcon.prototype.clearIcon = function () {
            this.removeChildren();
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        SDXLBaseIcon.prototype.addScatter = function (str) {
            var _this = this;
            this.scatterGuang = new DBComponent(str);
            if (str == "sdxl_icon_2") {
                this.icon.visible = false;
                this.scatterGuang.callback = function () { _this.icon.visible = true; game.UIUtils.removeSelf(_this.scatterGuang); };
            }
            this.scatterGuang.x = 93;
            this.scatterGuang.y = 88.5;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        SDXLBaseIcon.prototype.addScatter1 = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 93;
            this.scatterGuang.y = 88.5;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        SDXLBaseIcon.prototype.hideDbComponent = function () {
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
         * sd 图标特效播放
         */
        SDXLBaseIcon.prototype.showSdDbComponet = function () {
            var _this = this;
            this.addChild(this.sdxlIconKuang);
            this.addChild(this.icon);
            this.sdxlIconBg.play1("", 1);
            this.sdxlIconKuang.play1("", 0);
            if (this.value <= 6) {
                if (!this.dbComp) {
                    this.dbComp = new DBComponent("sdxl_" + ("icon_" + this.value));
                    this.dbComp.callback = function () {
                        if (_this.dbComp) {
                            _this.dbComp.visible = false;
                            _this.icon.visible = true;
                        }
                    };
                    this.dbComp.x = 93;
                    this.dbComp.y = 88.5;
                }
                else {
                    this.dbComp.visible = true;
                }
                this.icon.visible = false;
                this.addChild(this.dbComp);
                this.addChild(this.sdxlIconKuang);
                // this.addChild(this.icon);
                this.dbComp.play1("", 1);
            }
            else {
                this.addChild(this.sdxlIconBg);
                this.addChild(this.icon);
                this.addChild(this.sdxlIconKuang);
                this.icon.visible = true;
            }
        };
        /**
         * 图标置灰
         */
        SDXLBaseIcon.prototype.setIconHui = function () {
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
        SDXLBaseIcon.prototype.resetIconHui = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.icon.filters = [colorFlilter];
        };
        SDXLBaseIcon.prototype.stopDbComponet = function () {
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
        SDXLBaseIcon.prototype.stopKuangDB = function () {
            game.UIUtils.removeSelf(this.sdxlIconBg);
            game.UIUtils.removeSelf(this.sdxlIconKuang);
        };
        return SDXLBaseIcon;
    }(eui.Component));
    sdxl.SDXLBaseIcon = SDXLBaseIcon;
    __reflect(SDXLBaseIcon.prototype, "sdxl.SDXLBaseIcon");
})(sdxl || (sdxl = {}));
