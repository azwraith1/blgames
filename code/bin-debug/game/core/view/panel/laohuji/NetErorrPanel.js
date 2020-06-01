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
var game;
(function (game) {
    var NetErorrPanel = (function (_super) {
        __extends(NetErorrPanel, _super);
        function NetErorrPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = new NetErorrSkin();
            _this.init();
            return _this;
        }
        NetErorrPanel.prototype.init = function () {
            this.sure_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                CF.sN(PanelNotify.CLOSE_NETERORR_PANEL);
            }, this);
        };
        return NetErorrPanel;
    }(game.BaseComponent));
    game.NetErorrPanel = NetErorrPanel;
    __reflect(NetErorrPanel.prototype, "game.NetErorrPanel");
})(game || (game = {}));
