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
var snyx;
(function (snyx) {
    var SNYXIcon = (function (_super) {
        __extends(SNYXIcon, _super);
        function SNYXIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = "SNYXIconSkin";
            return _this;
        }
        SNYXIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        /**
         * 白蛇传说游戏icon特效位置调整
         */
        SNYXIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 2:
                    this.dbComp.x = 83.1;
                    this.dbComp.y = 76.9;
                    break;
                case 3:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 4:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 5:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 6:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 7:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 8:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 9:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 10:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 11:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
                case 12:
                    this.dbComp.x = 84;
                    this.dbComp.y = 77.7;
                    break;
            }
        };
        SNYXIcon.prototype.showRect = function () {
            this.rect.visible = true;
        };
        SNYXIcon.prototype.hideRect = function () {
            this.rect.visible = false;
        };
        return SNYXIcon;
    }(snyx.SNYXBaseIcon));
    snyx.SNYXIcon = SNYXIcon;
    __reflect(SNYXIcon.prototype, "snyx.SNYXIcon");
})(snyx || (snyx = {}));
