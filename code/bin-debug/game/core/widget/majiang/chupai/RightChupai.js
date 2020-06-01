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
    var RightChupai = (function (_super) {
        __extends(RightChupai, _super);
        function RightChupai(value, row, col) {
            var _this = _super.call(this) || this;
            _this.direction = "right";
            _this.row = row;
            _this.col = col;
            _this.value = value;
            _this.skinName = new majiang.RightChupaiSkin();
            return _this;
        }
        RightChupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
        };
        /**
         * 根据之前记录的坐标绘制
         * @param  {} record
         */
        RightChupai.prototype.setByRecord = function (record) {
            this.record = record;
            this.x = record.x;
            this.y = record.y;
            if (this.record.source) {
                this.bgImage1.source = this.bgImage.source = RES.getRes(this.record.source);
            }
        };
        RightChupai.prototype.useBgSouce = function () {
            this.bgImage1.source = this.bgImage.source = RES.getRes("right_chupai_21_png");
        };
        RightChupai.prototype.settingColors = function (index) {
            this.colorImage.width = this.colorImage.width - 2;
            this.colorImage.height = this.colorImage.height - 2;
            this.colorImage.x = this.colorImage.x + 2;
            this.colorImage.y = this.colorImage.y - 2;
            switch (index) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    this.colorImage.skewX = -90;
                    this.colorImage.x -= 1;
                    // this.colorImage.skewY = 265;
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                    this.colorImage.skewX = -90;
                    this.colorImage.x -= 1;
                    // this.colorImage.skewY = 265;
                    break;
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                    this.colorImage.skewX = -90;
                    this.colorImage.x -= 1;
                    // this.colorImage.skewY = 264;
                    break;
            }
        };
        return RightChupai;
    }(majiang.BaseChupai));
    majiang.RightChupai = RightChupai;
    __reflect(RightChupai.prototype, "majiang.RightChupai");
})(majiang || (majiang = {}));
