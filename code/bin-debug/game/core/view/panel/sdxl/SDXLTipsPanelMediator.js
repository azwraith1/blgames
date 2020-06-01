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
var sdxl;
(function (sdxl) {
    var SDXLTipsPanelMediator = (function (_super) {
        __extends(SDXLTipsPanelMediator, _super);
        function SDXLTipsPanelMediator() {
            var _this = _super.call(this, SDXLTipsPanelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        SDXLTipsPanelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SDXL_TIPS,
                PanelNotify.CLOSE_SDXL_TIPS
            ];
        };
        SDXLTipsPanelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new majiang.MjiangSelectMediator());
        };
        SDXLTipsPanelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sdxl.SDXLTipsPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SDXLTipsPanelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SDXL_TIPS:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SDXL_TIPS:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SDXLTipsPanelMediator.NAME = "SDXLTipsPanelMediator";
        return SDXLTipsPanelMediator;
    }(BaseMediator));
    sdxl.SDXLTipsPanelMediator = SDXLTipsPanelMediator;
    __reflect(SDXLTipsPanelMediator.prototype, "sdxl.SDXLTipsPanelMediator");
})(sdxl || (sdxl = {}));
