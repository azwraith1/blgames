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
    var CloseLaohuMediator = (function (_super) {
        __extends(CloseLaohuMediator, _super);
        function CloseLaohuMediator() {
            var _this = _super.call(this, CloseLaohuMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        CloseLaohuMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_LEAVE_LAOHU_PANEL,
                PanelNotify.CLOSE_LEAVE_LAOHU_PANEL
            ];
        };
        CloseLaohuMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new CloseLaohuMediator());
            // this.facade.registerMediator(new majiang.MjiangSelectMediator());
        };
        CloseLaohuMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new game.CloseLaohuPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        CloseLaohuMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_LEAVE_LAOHU_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_LEAVE_LAOHU_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        CloseLaohuMediator.NAME = "CloseLaohuMediator";
        return CloseLaohuMediator;
    }(BaseMediator));
    game.CloseLaohuMediator = CloseLaohuMediator;
    __reflect(CloseLaohuMediator.prototype, "game.CloseLaohuMediator");
})(game || (game = {}));
