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
    var TipsPanelMediator = (function (_super) {
        __extends(TipsPanelMediator, _super);
        function TipsPanelMediator() {
            var _this = _super.call(this, TipsPanelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        TipsPanelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_LAOHUGAME_TIPS,
                PanelNotify.CLOSE_LAOHUGAME_TIPS
            ];
        };
        TipsPanelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new majiang.MjiangSelectMediator());
        };
        TipsPanelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new game.TipsPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            this.viewComponent.height = GameConfig.curHeight();
            sceneLayer.addChild(this.viewComponent);
        };
        TipsPanelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_LAOHUGAME_TIPS:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_LAOHUGAME_TIPS:
                    this.closeViewComponent(1);
                    break;
            }
        };
        TipsPanelMediator.NAME = "TipsPanelMediator";
        return TipsPanelMediator;
    }(BaseMediator));
    game.TipsPanelMediator = TipsPanelMediator;
    __reflect(TipsPanelMediator.prototype, "game.TipsPanelMediator");
})(game || (game = {}));
