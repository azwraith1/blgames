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
var bskg;
(function (bskg) {
    var BSKGautoGamelMediator = (function (_super) {
        __extends(BSKGautoGamelMediator, _super);
        function BSKGautoGamelMediator() {
            var _this = _super.call(this, BSKGautoGamelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        BSKGautoGamelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_BSKG_AUTO_PANEL,
                PanelNotify.CLOSE_BSKG_AUTO_PANEL
            ];
        };
        BSKGautoGamelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        BSKGautoGamelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new bskg.BSKGAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        BSKGautoGamelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_BSKG_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_BSKG_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        BSKGautoGamelMediator.NAME = "BSKGautoGamelMediator";
        return BSKGautoGamelMediator;
    }(BaseMediator));
    bskg.BSKGautoGamelMediator = BSKGautoGamelMediator;
    __reflect(BSKGautoGamelMediator.prototype, "bskg.BSKGautoGamelMediator");
})(bskg || (bskg = {}));
