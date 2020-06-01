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
 * @Author: wangtao
 * @Date: 2019-04-19 17:42:55
 * @Last Modified by: wangtao
 * @Last Modified time: 2019-05-20 18:49:27
 * @Description:
 */
var dntg;
(function (dntg) {
    var DNTGIcon = (function (_super) {
        __extends(DNTGIcon, _super);
        function DNTGIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = new DNTGIconSKin();
            return _this;
        }
        // public playEffect(){}
        /**
         * 图标更换
         * @param  {} min=1
         * @param  {} max=12
         */
        DNTGIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 12; }
            this.changeSouceByValue(Math.floor(_.random(1, 12)));
        };
        /**
         * 图标动画位置校准
         */
        DNTGIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 92.5;
                    this.dbComp.y = 91.5;
                    break;
                case 2:
                    this.dbComp.x = 91;
                    this.dbComp.y = 92;
                    break;
                case 3:
                    this.dbComp.x = 91;
                    this.dbComp.y = 94;
                    break;
                case 4:
                    this.dbComp.x = 91;
                    this.dbComp.y = 93;
                    break;
                case 5:
                    this.dbComp.x = 90.5;
                    this.dbComp.y = 90;
                    break;
                case 6:
                    this.dbComp.x = 94;
                    this.dbComp.y = 88;
                    break;
                case 7:
                    this.dbComp.x = 94;
                    this.dbComp.y = 83;
                    break;
                case 8:
                    this.dbComp.x = 91;
                    this.dbComp.y = 87;
                    break;
            }
        };
        return DNTGIcon;
    }(lhj.BaseLhjIcon));
    dntg.DNTGIcon = DNTGIcon;
    __reflect(DNTGIcon.prototype, "dntg.DNTGIcon");
})(dntg || (dntg = {}));
