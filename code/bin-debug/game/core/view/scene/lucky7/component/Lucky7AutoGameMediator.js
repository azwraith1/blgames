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
var lucky7;
(function (lucky7) {
    var LUCKY7AutogameMediator = (function (_super) {
        __extends(LUCKY7AutogameMediator, _super);
        function LUCKY7AutogameMediator() {
            var _this = _super.call(this, LUCKY7AutogameMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        LUCKY7AutogameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_LUCKY7_AUTO_PANEL,
                PanelNotify.CLOSE_LUCKY7_AUTO_PANEL
            ];
        };
        LUCKY7AutogameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        LUCKY7AutogameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new lucky7.LUCKY7AutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        LUCKY7AutogameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_LUCKY7_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_LUCKY7_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        LUCKY7AutogameMediator.NAME = "LUCKY7AutogameMediator";
        return LUCKY7AutogameMediator;
    }(BaseMediator));
    lucky7.LUCKY7AutogameMediator = LUCKY7AutogameMediator;
    __reflect(LUCKY7AutogameMediator.prototype, "lucky7.LUCKY7AutogameMediator");
})(lucky7 || (lucky7 = {}));
