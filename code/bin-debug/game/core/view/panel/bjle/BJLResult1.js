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
    var BJLResult1 = (function (_super) {
        __extends(BJLResult1, _super);
        function BJLResult1() {
            var _this = _super.call(this) || this;
            _this.skinName = new BJLResultSkin1();
            return _this;
        }
        BJLResult1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BJLResult1.prototype.initNums = function (i, j, ishe) {
            switch (j) {
                case 2://大路
                    this.show2(i, ishe);
                    break;
                case 3://大眼路
                    this.show3(i);
                    break;
                case 4://小眼路
                    this.show4(i);
                    break;
                case 5://甲由路
                    this.show5(i);
                    break;
                case 6://庄闲问路
                    break;
            }
        };
        //数据格式定义：1庄赢，5闲赢，9和局。
        BJLResult1.prototype.show2 = function (j, ishe) {
            if (j == 1) {
                this.zx_quan.visible = true;
                this.zx_quan.source = RES.getRes("bjl_red_big_quan_png");
            }
            if (j == 5) {
                this.zx_quan.visible = true;
                this.zx_quan.source = RES.getRes("bjl_blue_big_quan_png");
            }
            if (j == 9) {
                this.zx_hexiegang.visible = true;
                this.zx_hexiegang.visible = RES.getRes("bjl_blue_xie_png");
            }
        };
        //大眼路
        BJLResult1.prototype.show3 = function (j) {
            if (j == 1) {
                this.zx_xiaoyuan.visible = true;
                this.zx_xiaoyuan.source = RES.getRes("bjl_red_quan_png");
            }
            if (j == 2) {
                this.zx_xiaoyuan.visible = true;
                this.zx_xiaoyuan.source = RES.getRes("bjl_blue_quan_png");
            }
        };
        //小眼路
        BJLResult1.prototype.show4 = function (j) {
            if (j == 1) {
                this.zx_xiaoyuan.visible = true;
                this.zx_xiaoyuan.source = RES.getRes("bjl_red_dian_png");
            }
            if (j == 2) {
                this.zx_xiaoyuan.visible = true;
                this.zx_xiaoyuan.source = RES.getRes("bjl_blue_dian_png");
            }
        };
        //甲由路
        BJLResult1.prototype.show5 = function (j) {
            if (j == 1) {
                this.zx_xiegang.visible = true;
                this.zx_xiegang.source = RES.getRes("bjl_red_small_xie_png");
            }
            if (j == 2) {
                this.zx_xiegang.visible = true;
                this.zx_xiegang.source = RES.getRes("bjl_blue_small_xie_png");
            }
        };
        return BJLResult1;
    }(eui.Component));
    bjle.BJLResult1 = BJLResult1;
    __reflect(BJLResult1.prototype, "bjle.BJLResult1");
})(bjle || (bjle = {}));
