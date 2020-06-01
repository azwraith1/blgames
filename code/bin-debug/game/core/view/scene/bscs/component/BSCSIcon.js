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
/*
 * @Author: reel MC Lee
 * @Date: 2019-09-11 17:16:16
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-09-11 17:18:22
 * @Description:
 */
var bscs;
(function (bscs) {
    var BSCSIcon = (function (_super) {
        __extends(BSCSIcon, _super);
        function BSCSIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = "BSCSIconSkin";
            return _this;
        }
        BSCSIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        /**
         * 白蛇传说游戏icon特效位置调整
         */
        BSCSIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 2:
                    this.dbComp.x = 101.6;
                    this.dbComp.y = 81;
                    break;
                case 3:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 4:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 5:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 6:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 7:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81;
                    break;
                case 8:
                    this.dbComp.x = 101.5;
                    this.dbComp.y = 80.6;
                    break;
                case 9:
                    this.dbComp.x = 101.5;
                    this.dbComp.y = 80.6;
                    break;
                case 10:
                    this.dbComp.x = 101.5;
                    this.dbComp.y = 81;
                    break;
                case 11:
                    this.dbComp.x = 102;
                    this.dbComp.y = 81.1;
                    break;
                case 12:
                    this.dbComp.x = 101.5;
                    this.dbComp.y = 80.6;
                    break;
            }
        };
        BSCSIcon.prototype.showRect = function () {
            this.rect.visible = true;
            this.addChild(this.rect);
        };
        BSCSIcon.prototype.hideRect = function () {
            if (this.icon.source == "bscs_icon_2")
                return;
            this.rect.visible = false;
        };
        return BSCSIcon;
    }(bscs.BSCSBaseIcon));
    bscs.BSCSIcon = BSCSIcon;
    __reflect(BSCSIcon.prototype, "bscs.BSCSIcon");
})(bscs || (bscs = {}));
