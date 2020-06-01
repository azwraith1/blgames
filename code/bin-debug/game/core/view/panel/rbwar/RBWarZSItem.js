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
var rbwar;
(function (rbwar) {
    var RBWarZSItem = (function (_super) {
        __extends(RBWarZSItem, _super);
        function RBWarZSItem() {
            var _this = _super.call(this) || this;
            _this.images = {};
            _this.createPoints();
            return _this;
        }
        RBWarZSItem.prototype.getKongWei = function () {
            return 7 - this.numChildren;
        };
        RBWarZSItem.prototype.change2Points = function (images) {
            this.clearData();
            this.images = images;
            for (var key in images) {
                var image = ObjectPool.produce("zsitem", null);
                if (!image) {
                    image = new eui.Image();
                }
                image.source = images[key].source;
                // this.setPosition
                this.addChild(images[key]);
            }
        };
        RBWarZSItem.prototype.createPoints = function () {
            this.points = {};
            this.points[-1] = { x: 8, y: -36 };
            this.points[1] = { x: 8, y: 8 };
            this.points[2] = { x: 8, y: 56 };
            this.points[3] = { x: 8, y: 104 };
            this.points[4] = { x: 8, y: 152 };
            this.points[5] = { x: 8, y: 201 };
            this.points[6] = { x: 8, y: 248 };
            this.clearData();
        };
        RBWarZSItem.prototype.clearData = function () {
            if (this.typeImage) {
                this.typeImage.source = "";
            }
            for (var key in this.images) {
                var image = this.images[key];
                if (key) {
                    game.UIUtils.removeSelf(image);
                    ObjectPool.reclaim("zsitem", image);
                }
            }
            this.images = {};
        };
        RBWarZSItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RBWarZSItem.prototype.showType = function (type) {
            this.typeImage.source = RES.getRes("rbw_qs_p_" + type + "_png");
        };
        RBWarZSItem.prototype.setPosition = function (image, index) {
            var point = this.points[index];
            image.x = point.x;
            image.y = point.y;
            this.images[index] = image;
        };
        /**
         * 正序
         */
        RBWarZSItem.prototype.showArrAsc = function (arrData) {
            var winType = arrData[0];
            this.typeImage.source = RES.getRes("rbw_qs_p_" + winType + "_png");
        };
        RBWarZSItem.prototype.showImageByPoint = function (index, type) {
            var image = ObjectPool.produce("zsitem", null);
            if (!image) {
                image = new eui.Image();
            }
            image.source = RES.getRes("rbw_qs_" + type + "_quan_png");
            this.setPosition(image, index);
            this.addChild(image);
        };
        RBWarZSItem.prototype.findLastRow = function () {
            for (var index = 6; index > 0; index--) {
                if (!this.checkPointsHas(index)) {
                    return index;
                }
            }
        };
        RBWarZSItem.prototype.showImageByDesc = function (type) {
            var findIndex;
            for (var index = 6; index > 0; index--) {
                if (!this.checkPointsHas(index)) {
                    findIndex = index;
                    break;
                }
            }
            this.showImageByPoint(findIndex, type);
        };
        RBWarZSItem.prototype.checkPointsHas = function (index) {
            return !!this.images[index];
        };
        return RBWarZSItem;
    }(eui.Component));
    rbwar.RBWarZSItem = RBWarZSItem;
    __reflect(RBWarZSItem.prototype, "rbwar.RBWarZSItem");
})(rbwar || (rbwar = {}));
