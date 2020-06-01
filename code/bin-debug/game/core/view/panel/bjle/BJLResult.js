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
    var BJLResult = (function (_super) {
        __extends(BJLResult, _super);
        function BJLResult() {
            var _this = _super.call(this) || this;
            _this.skinName = new BJLResultSkin();
            return _this;
        }
        BJLResult.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BJLResult.prototype.initNums = function (i) {
            switch (i) {
                case 1:
                case 2:
                case 3:
                case 4:
                    this.zx_w2l.visible = true;
                    this.zx_w2l.source = RES.getRes("bjl_zxh_1" + CF.tic);
                    this.show1(i);
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                    this.zx_w2l.visible = true;
                    this.zx_w2l.source = RES.getRes("bjl_zxh_2" + CF.tic);
                    this.show1(i - 4);
                    break;
                case 9:
                case 10:
                case 11:
                case 12:
                    this.zx_w2l.visible = true;
                    this.zx_w2l.source = RES.getRes("bjl_zxh_3" + CF.tic);
                    this.show1(i - 8);
                    break;
            }
        };
        BJLResult.prototype.show1 = function (j) {
            if (j == 2) {
                this.z_dui.visible = true;
                this.z_dui.source = RES.getRes("bjl_red_dian_png");
            }
            if (j == 3) {
                this.x_dui.visible = true;
                this.x_dui.source = RES.getRes("bjl_blue_dian_png");
            }
            if (j == 4) {
                this.z_dui.visible = true;
                this.z_dui.source = RES.getRes("bjl_red_dian_png");
                this.x_dui.visible = true;
                this.x_dui.source = RES.getRes("bjl_blue_dian_png");
            }
        };
        return BJLResult;
    }(eui.Component));
    bjle.BJLResult = BJLResult;
    __reflect(BJLResult.prototype, "bjle.BJLResult");
})(bjle || (bjle = {}));
