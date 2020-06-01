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
var bjle;
(function (bjle) {
    var BJLHallPoint = (function (_super) {
        __extends(BJLHallPoint, _super);
        function BJLHallPoint() {
            var _this = _super.call(this) || this;
            _this.skinName = new BJLHallPointSkin();
            return _this;
        }
        BJLHallPoint.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BJLHallPoint.prototype.initNums = function (i) {
            this.imgs.source = RES.getRes("bjl_hall_" + i + "_png");
        };
        return BJLHallPoint;
    }(eui.Component));
    bjle.BJLHallPoint = BJLHallPoint;
    __reflect(BJLHallPoint.prototype, "bjle.BJLHallPoint");
})(bjle || (bjle = {}));
