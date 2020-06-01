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
var sdmn;
(function (sdmn) {
    var SDMNautoGamelMediator = (function (_super) {
        __extends(SDMNautoGamelMediator, _super);
        function SDMNautoGamelMediator() {
            var _this = _super.call(this, SDMNautoGamelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        SDMNautoGamelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SDMN_AUTO_PANEL,
                PanelNotify.CLOSE_SDMN_AUTO_PANEL
            ];
        };
        SDMNautoGamelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        SDMNautoGamelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sdmn.SDMNAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SDMNautoGamelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SDMN_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SDMN_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SDMNautoGamelMediator.NAME = "SDMNautoGamelMediator";
        return SDMNautoGamelMediator;
    }(BaseMediator));
    sdmn.SDMNautoGamelMediator = SDMNautoGamelMediator;
    __reflect(SDMNautoGamelMediator.prototype, "sdmn.SDMNautoGamelMediator");
})(sdmn || (sdmn = {}));
