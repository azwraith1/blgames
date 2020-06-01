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
// TypeScript file
var game;
(function (game) {
    var NetErorrMediator = (function (_super) {
        __extends(NetErorrMediator, _super);
        function NetErorrMediator() {
            var _this = _super.call(this, NetErorrMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        NetErorrMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_NETERORR_PANEL,
                PanelNotify.CLOSE_NETERORR_PANEL
            ];
        };
        NetErorrMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new majiang.MjiangSelectMediator());
        };
        NetErorrMediator.prototype.showViewComponent = function () {
            this.viewComponent = new game.NetErorrPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        NetErorrMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_NETERORR_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_NETERORR_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        NetErorrMediator.NAME = "NetErorrMediator";
        return NetErorrMediator;
    }(BaseMediator));
    game.NetErorrMediator = NetErorrMediator;
    __reflect(NetErorrMediator.prototype, "game.NetErorrMediator");
})(game || (game = {}));
