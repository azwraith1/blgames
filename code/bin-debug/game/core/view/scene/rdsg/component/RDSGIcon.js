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
var rdsg;
(function (rdsg) {
    var RDSGIcon = (function (_super) {
        __extends(RDSGIcon, _super);
        function RDSGIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = "RDSGIconSkin";
            return _this;
        }
        RDSGIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        RDSGIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 76;
                    this.dbComp.y = 79;
                    break;
                case 2:
                    this.dbComp.x = 76.5;
                    this.dbComp.y = 81.5;
                    break;
                case 3:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 4:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 5:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 6:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 7:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 8:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
            }
        };
        RDSGIcon.prototype.showRect = function () {
            this.rect.visible = true;
            this.addChild(this.rect);
        };
        RDSGIcon.prototype.hideRect = function () {
            this.rect.visible = false;
        };
        return RDSGIcon;
    }(rdsg.RDSGBaseIcon));
    rdsg.RDSGIcon = RDSGIcon;
    __reflect(RDSGIcon.prototype, "rdsg.RDSGIcon");
})(rdsg || (rdsg = {}));
