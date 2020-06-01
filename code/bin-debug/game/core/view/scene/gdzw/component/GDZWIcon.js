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
var gdzw;
(function (gdzw) {
    var GDZWIcon = (function (_super) {
        __extends(GDZWIcon, _super);
        function GDZWIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = "GDZWGIconSkin";
            return _this;
        }
        GDZWIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        GDZWIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 75.2;
                    this.dbComp.y = 91.8;
                    break;
                case 2:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.5;
                    break;
                case 3:
                    this.dbComp.x = 75.1;
                    this.dbComp.y = 92.2;
                    break;
                case 4:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 5:
                    this.dbComp.x = 75.2;
                    this.dbComp.y = 92.3;
                    break;
                case 6:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 7:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 8:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 9:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 10:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 11:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
                case 12:
                    this.dbComp.x = 75.6;
                    this.dbComp.y = 92.8;
                    break;
            }
        };
        GDZWIcon.prototype.showRect = function () {
            this.rect.visible = true;
            this.addChild(this.rect);
        };
        GDZWIcon.prototype.hideRect = function () {
            this.rect.visible = false;
        };
        return GDZWIcon;
    }(gdzw.GDZWBaseIcon));
    gdzw.GDZWIcon = GDZWIcon;
    __reflect(GDZWIcon.prototype, "gdzw.GDZWIcon");
})(gdzw || (gdzw = {}));
