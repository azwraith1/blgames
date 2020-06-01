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
var cbzz;
(function (cbzz) {
    var CBZZTipsPanelMediator = (function (_super) {
        __extends(CBZZTipsPanelMediator, _super);
        function CBZZTipsPanelMediator() {
            var _this = _super.call(this, CBZZTipsPanelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        CBZZTipsPanelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_CBZZ_TIPS_PANEL,
                PanelNotify.CLOSE_CBZZ_TIPS_PANEL
            ];
        };
        CBZZTipsPanelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new cbzz.CBZZGameMediator());
        };
        CBZZTipsPanelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new cbzz.CBZZTipsPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        CBZZTipsPanelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_CBZZ_TIPS_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_CBZZ_TIPS_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        CBZZTipsPanelMediator.NAME = "CBZZTipsPanelMediator";
        return CBZZTipsPanelMediator;
    }(BaseMediator));
    cbzz.CBZZTipsPanelMediator = CBZZTipsPanelMediator;
    __reflect(CBZZTipsPanelMediator.prototype, "cbzz.CBZZTipsPanelMediator");
})(cbzz || (cbzz = {}));
