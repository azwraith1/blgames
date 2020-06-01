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
    var TopChupai = (function (_super) {
        __extends(TopChupai, _super);
        function TopChupai(value) {
            var _this = _super.call(this) || this;
            _this.direction = "top";
            _this.defaultSrouce = 7;
            _this.value = value;
            _this.skinName = new majiang.TopChupaiSkin();
            return _this;
        }
        TopChupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
        };
        TopChupai.prototype.setByRecord = function (record) {
            this.record = record;
            this.x = record.x;
            this.y = record.y;
            if (this.record.source) {
                this.bgImage.source = RES.getRes(this.record.source);
            }
        };
        TopChupai.prototype.initWithIndex = function (index) {
            this.bgImage.source = RES.getRes("top_chupai_" + index + "_png");
        };
        TopChupai.prototype.settingColors = function (index) {
            this.colorImage.y = this.colorImage.y + 0.5;
            switch (index % 7) {
                case 1:
                    // case 8:
                    // case 15:
                    this.colorImage.skewX = 177;
                    this.colorImage.x = this.colorImage.x + 0.5;
                    break;
                case 2:
                    // case 9:
                    // case 16:
                    this.colorImage.skewX = 178;
                    break;
                case 3:
                    // case 10:
                    // case 17:
                    this.colorImage.skewX = 179;
                    break;
                case 4:
                    // case 11:
                    // case 18:
                    this.colorImage.skewX = 180;
                    this.colorImage.x = this.colorImage.x - 0.5;
                    break;
                case 5:
                    // case 12:
                    // case 19:
                    this.colorImage.skewX = 181;
                    this.colorImage.x = this.colorImage.x - 1;
                    break;
                case 6:
                    // case 13:
                    // case 20:
                    this.colorImage.skewX = 182;
                    this.colorImage.x = this.colorImage.x - 1;
                    break;
                case 0:
                    // case 14:
                    // case 21:
                    this.colorImage.skewX = 183;
                    this.colorImage.x = this.colorImage.x - 2;
                    break;
            }
        };
        return TopChupai;
    }(majiang.BaseChupai));
    majiang.TopChupai = TopChupai;
    __reflect(TopChupai.prototype, "majiang.TopChupai");
})(majiang || (majiang = {}));
