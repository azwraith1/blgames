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
var csd;
(function (csd) {
    var CSDAutogameMediator = (function (_super) {
        __extends(CSDAutogameMediator, _super);
        function CSDAutogameMediator() {
            var _this = _super.call(this, CSDAutogameMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        CSDAutogameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_CSD_AUTO_PANEL,
                PanelNotify.CLOSE_CSD_AUTO_PANEL
            ];
        };
        CSDAutogameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        CSDAutogameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new csd.CSDAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        CSDAutogameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_CSD_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_CSD_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        CSDAutogameMediator.NAME = "CSDAutogameMediator";
        return CSDAutogameMediator;
    }(BaseMediator));
    csd.CSDAutogameMediator = CSDAutogameMediator;
    __reflect(CSDAutogameMediator.prototype, "csd.CSDAutogameMediator");
})(csd || (csd = {}));
