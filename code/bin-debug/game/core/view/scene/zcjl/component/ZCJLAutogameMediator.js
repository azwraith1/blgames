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
var zcjl;
(function (zcjl) {
    var ZCJLAutogameMediator = (function (_super) {
        __extends(ZCJLAutogameMediator, _super);
        function ZCJLAutogameMediator() {
            var _this = _super.call(this, ZCJLAutogameMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        ZCJLAutogameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_ZCJL_AUTO_PANEL,
                PanelNotify.CLOSE_ZCJL_AUTO_PANEL
            ];
        };
        ZCJLAutogameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        ZCJLAutogameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new zcjl.ZCJLAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ZCJLAutogameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_ZCJL_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_ZCJL_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        ZCJLAutogameMediator.NAME = "ZCJLAutogameMediator";
        return ZCJLAutogameMediator;
    }(BaseMediator));
    zcjl.ZCJLAutogameMediator = ZCJLAutogameMediator;
    __reflect(ZCJLAutogameMediator.prototype, "zcjl.ZCJLAutogameMediator");
})(zcjl || (zcjl = {}));
