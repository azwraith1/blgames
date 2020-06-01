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
var majiang;
(function (majiang) {
    var BasePGItem = (function (_super) {
        __extends(BasePGItem, _super);
        function BasePGItem(type, color, lgth, pbg) {
            var _this = _super.call(this) || this;
            _this.color = color;
            _this.type = type;
            _this.pbg = pbg;
            return _this;
        }
        //碰牌变吃牌
        BasePGItem.prototype.peng2Chi = function (maxCard) {
            this.type = 10;
            this.color = maxCard;
            this.value2.source = "color_value_" + (maxCard - 1) + "_png";
            this.value3.source = "color_value_" + (maxCard) + "_png";
            this.value1.source = "color_value_" + (maxCard - 2) + "_png";
        };
        BasePGItem.prototype.checkShowRect = function (value) {
            var chaju = this.color - value;
            this.rectGroup.visible = true;
            if (0 <= chaju && chaju <= 2) {
                this["rect" + (3 - chaju)].visible = true;
            }
        };
        BasePGItem.prototype.showRect = function (value) {
            if (value == 0) {
                this.rect1.visible = this.rect2.visible = this.rect3.visible = false;
                this.rectGroup.visible = false;
            }
            else {
                this.rect1.visible = this.rect2.visible = this.rect3.visible = true;
                this.rectGroup.visible = true;
            }
        };
        BasePGItem.prototype.showType = function (type, time) {
            // if (type == 5) {
            // 	this.showPengAni();
            // }
        };
        BasePGItem.prototype.showPengAni = function () {
            var db = new DBComponent("mj_peng");
            this.resetPGAniPos(db);
            var group = this.getChildAt(0);
            db.callback = function () {
                game.UIUtils.removeSelf(db);
                db = null;
            };
            this.addChild(db);
            this.addChild(group);
            db.playByFilename(1);
        };
        return BasePGItem;
    }(eui.Component));
    majiang.BasePGItem = BasePGItem;
    __reflect(BasePGItem.prototype, "majiang.BasePGItem");
})(majiang || (majiang = {}));
