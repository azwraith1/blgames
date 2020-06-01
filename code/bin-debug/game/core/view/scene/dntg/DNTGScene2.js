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
var dntg;
(function (dntg) {
    var DNTGScene2 = (function (_super) {
        __extends(DNTGScene2, _super);
        function DNTGScene2() {
            var _this = _super.call(this) || this;
            _this.skinName = new DNTGGameScene2Skin();
            return _this;
        }
        DNTGScene2.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return DNTGScene2;
    }(game.BaseComponent));
    dntg.DNTGScene2 = DNTGScene2;
    __reflect(DNTGScene2.prototype, "dntg.DNTGScene2");
})(dntg || (dntg = {}));
