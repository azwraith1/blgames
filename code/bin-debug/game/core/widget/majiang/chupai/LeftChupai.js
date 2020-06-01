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
    var LeftChupai = (function (_super) {
        __extends(LeftChupai, _super);
        function LeftChupai(value, row, col) {
            var _this = _super.call(this) || this;
            _this.direction = "left";
            _this.row = row;
            _this.col = col;
            _this.value = value;
            _this.skinName = new majiang.LeftChupaiSkin();
            return _this;
        }
        LeftChupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
        };
        /**
         * 根据之前记录的坐标绘制
         * @param  {} record
         */
        LeftChupai.prototype.setByRecord = function (record) {
            this.record = record;
            this.x = record.x;
            this.y = record.y;
            if (this.record.source) {
                this.bgImage1.source = this.bgImage.source = RES.getRes(this.record.source);
            }
        };
        LeftChupai.prototype.useBgSouce = function () {
            this.bgImage1.source = this.bgImage.source = RES.getRes("left_chupai_21_png");
        };
        LeftChupai.prototype.settingColors = function (index) {
            // this.colorImage.skewX = 92;
            // this.colorImage.skewY = -262;
            // this.colorImage.x = this.colorImage.x + 2;
            switch (index) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    this.colorImage.skewX = 90;
                    // this.colorImage.skewY = -264;
                    this.colorImage.x = this.colorImage.x + 2;
                    this.colorImage.x -= 1.5;
                    this.colorImage.y -= 1;
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                    this.colorImage.skewX = 90;
                    // this.colorImage.skewY = -262;
                    this.colorImage.x = this.colorImage.x + 1;
                    this.colorImage.x -= 1.5;
                    this.colorImage.y -= 1;
                    break;
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                    this.colorImage.skewX = 90;
                    // this.colorImage.skewY = -261;
                    this.colorImage.x = this.colorImage.x + 2;
                    this.colorImage.x -= 1.5;
                    this.colorImage.y -= 1;
                    break;
            }
        };
        return LeftChupai;
    }(majiang.BaseChupai));
    majiang.LeftChupai = LeftChupai;
    __reflect(LeftChupai.prototype, "majiang.LeftChupai");
})(majiang || (majiang = {}));
