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
var niuniu;
(function (niuniu) {
    var NiuniuNewCaculatorBar = (function (_super) {
        __extends(NiuniuNewCaculatorBar, _super);
        function NiuniuNewCaculatorBar() {
            var _this = _super.call(this) || this;
            _this.skinName = new NiuniuNewCaculatorBarSkin();
            return _this;
        }
        NiuniuNewCaculatorBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        NiuniuNewCaculatorBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.CACULATOR_VALUE, this.countResult, this);
        };
        NiuniuNewCaculatorBar.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.CACULATOR_VALUE, this.countResult, this);
        };
        NiuniuNewCaculatorBar.prototype.countResult = function (e) {
            var resultArr = e.data;
            var sum = 0;
            for (var i = 0; i < 4; i++) {
                this['number' + i].text = "";
            }
            for (var i = 0; i < resultArr.length; i++) {
                var card = resultArr[i];
                var value = card.value;
                if (value > 10) {
                    value = 10;
                }
                sum += value;
                this['number' + i].text = value;
            }
            if (!sum) {
                this.number3.text = "";
            }
            else {
                // if (resultArr.length == 3) {
                this.number3.text = "" + sum;
                // }
                //
            }
        };
        return NiuniuNewCaculatorBar;
    }(game.BaseUI));
    niuniu.NiuniuNewCaculatorBar = NiuniuNewCaculatorBar;
    __reflect(NiuniuNewCaculatorBar.prototype, "niuniu.NiuniuNewCaculatorBar");
})(niuniu || (niuniu = {}));
