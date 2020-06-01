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
    var MineChupai = (function (_super) {
        __extends(MineChupai, _super);
        function MineChupai(value) {
            var _this = _super.call(this) || this;
            _this.defaultSrouce = "7";
            _this.direction = "mine";
            _this.value = value;
            _this.skinName = new majiang.MineChupaiSkin();
            return _this;
        }
        MineChupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
        };
        /**
         * 设置牌的值。
         */
        MineChupai.prototype.setByRecord = function (record) {
            this.record = record;
            this.x = record.x;
            this.y = record.y;
            if (this.record.source) {
                this.bgImage.source = RES.getRes(this.record.source);
            }
        };
        MineChupai.prototype.initWithIndex = function (index) {
            switch (index % 7) {
                case 0:
                    this.colorImage.skewX = -2;
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                    this.colorImage.skewX = 2;
                    break;
                case 5:
                    this.colorImage.skewX = -1;
                    break;
                case 6:
                    this.colorImage.skewX = -1;
                    break;
            }
            this.bgImage1.source = this.bgImage.source = RES.getRes("mine_chupai_" + index + "_png");
        };
        /**
         * 设置牌面值的位置方向。
         */
        MineChupai.prototype.settingColors = function (index) {
            switch (index % 7) {
                case 1:
                    // case 8:
                    // case 15:
                    this.colorImage.skewX = 4;
                    break;
                case 2:
                    // case 9:
                    // case 16:
                    this.colorImage.skewX = 3;
                    break;
                case 3:
                    // case 10:
                    // case 17:
                    this.colorImage.skewX = 2;
                    break;
                case 4:
                    // case 11:
                    // case 18:
                    this.colorImage.skewX = 1;
                    break;
                case 5:
                    // case 12:
                    // case 19:
                    this.colorImage.skewX = 0;
                    break;
                case 6:
                    // case 13:
                    // case 20:
                    this.colorImage.skewX = -1;
                    break;
                case 0:
                    // case 14:
                    // case 21:
                    this.colorImage.skewX = -2;
                    break;
            }
        };
        return MineChupai;
    }(majiang.BaseChupai));
    majiang.MineChupai = MineChupai;
    __reflect(MineChupai.prototype, "majiang.MineChupai");
})(majiang || (majiang = {}));
