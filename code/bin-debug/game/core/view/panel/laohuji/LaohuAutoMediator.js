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
    var LaohuAutoMediator = (function (_super) {
        __extends(LaohuAutoMediator, _super);
        function LaohuAutoMediator() {
            var _this = _super.call(this, LaohuAutoMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        LaohuAutoMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_LAOHU_AUTO_PANEL,
                PanelNotify.CLOSE_LAOHU_AUTO_PANEL
            ];
        };
        LaohuAutoMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new majiang.MjiangSelectMediator());
        };
        LaohuAutoMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new game.LaohuAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        LaohuAutoMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_LAOHU_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_LAOHU_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        LaohuAutoMediator.NAME = "LaohuAutoMediator";
        return LaohuAutoMediator;
    }(BaseMediator));
    game.LaohuAutoMediator = LaohuAutoMediator;
    __reflect(LaohuAutoMediator.prototype, "game.LaohuAutoMediator");
})(game || (game = {}));
