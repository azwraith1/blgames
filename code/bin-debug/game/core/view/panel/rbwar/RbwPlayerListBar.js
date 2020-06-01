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
    var RbwPlayerListBar = (function (_super) {
        __extends(RbwPlayerListBar, _super);
        function RbwPlayerListBar(data, n) {
            var _this = _super.call(this) || this;
            _this.value = data;
            _this.n = n;
            _this.skinName = new RbwarPlayerListBarSkin();
            return _this;
        }
        RbwPlayerListBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.n == 0) {
                this.title_fh.source = RES.getRes("rbw_luckey_png");
                this.mingci.text = "";
            }
            else {
                this.title_fh.source = RES.getRes("rbw_fh_png");
                this.mingci.text = this.n;
            }
            this.playerHeader.source = RES.getRes("hall_header_" + this.value.sex + "_" + this.value.url + "_png");
            this.playerName.text = this.value.name;
            this.playerMoney.text = this.value.gold.toFixed(2);
            this.playerXz.text = "下注：" + this.value.lastBet;
            this.playerYz.text = "压中：" + this.value.lastWin;
        };
        return RbwPlayerListBar;
    }(game.BaseUI));
    rbwar.RbwPlayerListBar = RbwPlayerListBar;
    __reflect(RbwPlayerListBar.prototype, "rbwar.RbwPlayerListBar");
})(rbwar || (rbwar = {}));
