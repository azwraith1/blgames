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
 * @Author: real MC Lee
 * @Date: 2019-05-27 18:44:04
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-28 16:19:37
 * @Description:
 */
var sdmn;
(function (sdmn) {
    var SDMNIcon = (function (_super) {
        __extends(SDMNIcon, _super);
        function SDMNIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = new SDMNIconSkin();
            return _this;
        }
        SDMNIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        SDMNIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 94;
                    this.dbComp.y = 105.5;
                    break;
                case 2:
                    this.dbComp.x = 94;
                    this.dbComp.y = 105.5;
                    break;
                case 3:
                    this.dbComp.x = 94;
                    this.dbComp.y = 105.5;
                    break;
                case 4:
                    this.dbComp.x = 94;
                    this.dbComp.y = 105.5;
                    break;
                case 5:
                    this.dbComp.x = 94;
                    this.dbComp.y = 105.5;
                    break;
                case 6:
                    this.dbComp.x = 94;
                    this.dbComp.y = 105.5;
                    break;
                case 7:
                    this.dbComp.x = 94;
                    this.dbComp.y = 105.5;
                    break;
                case 8:
                    this.dbComp.x = 94;
                    this.dbComp.y = 105.5;
                    break;
            }
        };
        SDMNIcon.prototype.showRect = function () {
            this.rect.visible = true;
            this.addChild(this.rect);
        };
        SDMNIcon.prototype.hideRect = function () {
            this.rect.visible = false;
        };
        return SDMNIcon;
    }(sdmn.SDMNBaseIcon));
    sdmn.SDMNIcon = SDMNIcon;
    __reflect(SDMNIcon.prototype, "sdmn.SDMNIcon");
})(sdmn || (sdmn = {}));
