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
/**
 * 大眼路，小眼路，甲由路
 */
var bjle;
(function (bjle) {
    var BjlDXJYItem = (function (_super) {
        __extends(BjlDXJYItem, _super);
        function BjlDXJYItem() {
            var _this = _super.call(this) || this;
            _this.createPoints();
            return _this;
        }
        BjlDXJYItem.prototype.createPoints = function () {
            this.points = {};
            this.points[1] = { x: 0.5, y: 1 };
            this.points[2] = { x: 0.5, y: 9.5 };
            this.points[3] = { x: 0.5, y: 19 };
            this.points[4] = { x: 0.5, y: 27.5 };
            this.points[5] = { x: 0.5, y: 37 };
            this.points[6] = { x: 0.5, y: 45.5 };
        };
        /**
         * 给每个点设置位置。
         */
        BjlDXJYItem.prototype.setPosition = function (image, index) {
            var point = this.points[index];
            image.x = point.x;
            image.y = point.y;
        };
        return BjlDXJYItem;
    }(eui.Component));
    bjle.BjlDXJYItem = BjlDXJYItem;
    __reflect(BjlDXJYItem.prototype, "bjle.BjlDXJYItem");
})(bjle || (bjle = {}));
