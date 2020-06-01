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
var cbzz;
(function (cbzz) {
    var CBZZIcon = (function (_super) {
        __extends(CBZZIcon, _super);
        function CBZZIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = new CBZZIconSkin();
            return _this;
        }
        CBZZIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        CBZZIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 91.5;
                    this.dbComp.y = 87;
                    break;
                case 2:
                    this.dbComp.x = 91.5;
                    this.dbComp.y = 87;
                    break;
                case 3:
                    this.dbComp.x = 91.5;
                    this.dbComp.y = 87;
                    break;
                case 4:
                    this.dbComp.x = 91.5;
                    this.dbComp.y = 87;
                    break;
                case 5:
                    this.dbComp.x = 91.5;
                    this.dbComp.y = 87;
                    break;
                case 6:
                    this.dbComp.x = 91.5;
                    this.dbComp.y = 87;
                    break;
                case 7:
                    this.dbComp.x = 91.5;
                    this.dbComp.y = 87;
                    break;
                case 8:
                    this.dbComp.x = 91.5;
                    this.dbComp.y = 87;
                    break;
            }
        };
        CBZZIcon.prototype.showRect = function () {
            this.rect.visible = true;
            this.addChild(this.rect);
        };
        CBZZIcon.prototype.hideRect = function () {
            this.rect.visible = false;
        };
        return CBZZIcon;
    }(cbzz.CBZZBaseIcon));
    cbzz.CBZZIcon = CBZZIcon;
    __reflect(CBZZIcon.prototype, "cbzz.CBZZIcon");
})(cbzz || (cbzz = {}));
