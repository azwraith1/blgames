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
    var SelectGangItem = (function (_super) {
        __extends(SelectGangItem, _super);
        function SelectGangItem(value, isGang) {
            if (isGang === void 0) { isGang = true; }
            var _this = _super.call(this) || this;
            _this.value = value;
            _this.isGang = isGang;
            _this.skinName = new majiang.SelectGangItemSkin();
            return _this;
        }
        SelectGangItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.isGang) {
                this.initWithValue();
            }
            else {
                this.initWithChi();
            }
        };
        SelectGangItem.prototype.initWithChi = function () {
            this.pai4.visible = false;
            this.pai1.changeColor(this.value - 2);
            this.pai2.changeColor(this.value - 1);
            this.pai3.changeColor(this.value);
        };
        /**
         * 改变底牌颜色
         */
        SelectGangItem.prototype.initWithValue = function () {
            for (var i = 1; i <= 4; i++) {
                this['pai' + i].changeColor(this.value);
            }
        };
        SelectGangItem.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            if (this.isGang) {
                CF.dP(ENo.GANG_SELECT, this.value);
            }
            else {
                CF.dP(ENo.CHI_SELECT, this.value);
            }
        };
        return SelectGangItem;
    }(game.BaseUI));
    majiang.SelectGangItem = SelectGangItem;
    __reflect(SelectGangItem.prototype, "majiang.SelectGangItem");
})(majiang || (majiang = {}));
