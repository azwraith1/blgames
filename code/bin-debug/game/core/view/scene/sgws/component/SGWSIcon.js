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
var sgws;
(function (sgws) {
    var SGWSIcon = (function (_super) {
        __extends(SGWSIcon, _super);
        function SGWSIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = "SGWSIconSkin";
            return _this;
        }
        SGWSIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        /**
         * 白蛇传说游戏icon特效位置调整
         */
        SGWSIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 2:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 3:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 4:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 5:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 6:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 7:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 8:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 9:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 10:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 11:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
                case 12:
                    this.dbComp.x = 71;
                    this.dbComp.y = 75.5;
                    break;
            }
        };
        SGWSIcon.prototype.showRect = function () {
            this.visible = true;
        };
        SGWSIcon.prototype.hideRect = function () {
            this.visible = false;
        };
        return SGWSIcon;
    }(sgws.SGWSBaseIcon));
    sgws.SGWSIcon = SGWSIcon;
    __reflect(SGWSIcon.prototype, "sgws.SGWSIcon");
})(sgws || (sgws = {}));
