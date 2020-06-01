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
var sdxl;
(function (sdxl) {
    var SDXLIcon = (function (_super) {
        __extends(SDXLIcon, _super);
        function SDXLIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = new SDXLIconSkin();
            return _this;
        }
        SDXLIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        SDXLIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 93;
                    this.dbComp.y = 92;
                    break;
                case 2:
                    this.dbComp.x = 93;
                    this.dbComp.y = 92;
                    break;
                case 3:
                    this.dbComp.x = 93;
                    this.dbComp.y = 92;
                    break;
                case 4:
                    this.dbComp.x = 93;
                    this.dbComp.y = 92;
                    break;
                case 5:
                    this.dbComp.x = 93;
                    this.dbComp.y = 92;
                    break;
                case 6:
                    this.dbComp.x = 93;
                    this.dbComp.y = 92;
                    break;
                case 7:
                    this.dbComp.x = 93;
                    this.dbComp.y = 92;
                    break;
                case 8:
                    this.dbComp.x = 93;
                    this.dbComp.y = 92;
                    break;
            }
        };
        SDXLIcon.prototype.showRect = function () {
            this.rect.visible = true;
            this.addChild(this.rect);
        };
        SDXLIcon.prototype.hideRect = function () {
            this.rect.visible = false;
        };
        return SDXLIcon;
    }(sdxl.SDXLBaseIcon));
    sdxl.SDXLIcon = SDXLIcon;
    __reflect(SDXLIcon.prototype, "sdxl.SDXLIcon");
})(sdxl || (sdxl = {}));
