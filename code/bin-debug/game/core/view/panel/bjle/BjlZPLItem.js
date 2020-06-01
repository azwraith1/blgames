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
    var BjlZPLItem = (function (_super) {
        __extends(BjlZPLItem, _super);
        function BjlZPLItem() {
            var _this = _super.call(this) || this;
            _this.createPoints();
            return _this;
        }
        BjlZPLItem.prototype.createPoints = function () {
            this.points = {};
            this.points[1] = { x: 1, y: 1 };
            this.points[2] = { x: 1, y: 37 };
            this.points[3] = { x: 1, y: 73 };
            this.points[4] = { x: 1, y: 109 };
            this.points[5] = { x: 1, y: 145 };
            this.points[6] = { x: 1, y: 181 };
        };
        /**
         * 给每个点设置位置。
         */
        BjlZPLItem.prototype.setPosition = function (image, index) {
            var point = this.points[index];
            image.x = point.x;
            image.y = point.y;
        };
        return BjlZPLItem;
    }(eui.Component));
    bjle.BjlZPLItem = BjlZPLItem;
    __reflect(BjlZPLItem.prototype, "bjle.BjlZPLItem");
})(bjle || (bjle = {}));
