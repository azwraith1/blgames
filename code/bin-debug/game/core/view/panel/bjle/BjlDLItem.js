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
    var BjlDLItem = (function (_super) {
        __extends(BjlDLItem, _super);
        function BjlDLItem() {
            var _this = _super.call(this) || this;
            _this.createPoints();
            return _this;
        }
        BjlDLItem.prototype.createPoints = function () {
            this.points = {};
            this.points[1] = { x: 0, y: 0 };
            this.points[2] = { x: 0, y: 18 };
            this.points[3] = { x: 0, y: 36 };
            this.points[4] = { x: 0, y: 54 };
            this.points[5] = { x: 0, y: 72 };
            this.points[6] = { x: 0, y: 90 };
        };
        /**
         * 给每个点设置位置。
         */
        BjlDLItem.prototype.setPosition = function (image, index) {
            var point = this.points[index];
            image.x = point.x;
            image.y = point.y;
        };
        return BjlDLItem;
    }(eui.Component));
    bjle.BjlDLItem = BjlDLItem;
    __reflect(BjlDLItem.prototype, "bjle.BjlDLItem");
})(bjle || (bjle = {}));
