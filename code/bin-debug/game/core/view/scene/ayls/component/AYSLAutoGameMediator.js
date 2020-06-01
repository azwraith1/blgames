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
var ayls;
(function (ayls) {
    var AYLSAutoMediator = (function (_super) {
        __extends(AYLSAutoMediator, _super);
        function AYLSAutoMediator() {
            var _this = _super.call(this, AYLSAutoMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        AYLSAutoMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_AYLS_AUTO_PANEL,
                PanelNotify.CLOSE_AYLS_AUTO_PANEL
            ];
        };
        AYLSAutoMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        AYLSAutoMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new ayls.AYLSAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        AYLSAutoMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_AYLS_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_AYLS_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        AYLSAutoMediator.NAME = "AYLSAutoMediator";
        return AYLSAutoMediator;
    }(BaseMediator));
    ayls.AYLSAutoMediator = AYLSAutoMediator;
    __reflect(AYLSAutoMediator.prototype, "ayls.AYLSAutoMediator");
})(ayls || (ayls = {}));
